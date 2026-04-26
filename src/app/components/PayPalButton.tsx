import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import { upsertPendingOrder, markOrderPaid, type CustomerInfo } from "../lib/supabase";
import { generateReceipt } from "../lib/receipt";
import { fetchStoreSettings } from "../lib/useBusinessHours";
import { useState, useRef } from "react";

function isNetworkError(err: unknown): boolean {
  if (err instanceof ProgressEvent) return true;
  if (err instanceof TypeError) {
    const msg = (err as TypeError).message.toLowerCase();
    return msg.includes("network") || msg.includes("failed to fetch") || msg.includes("load");
  }
  return !navigator.onLine;
}

interface PayPalButtonProps {
  customer: CustomerInfo;
  discountedTotal: number;
  promoCode: string | null;
  discountAmount: number;
}

export function PayPalButton({ customer, discountedTotal, promoCode, discountAmount }: PayPalButtonProps) {
  const { items, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error" | "cancelled">("idle");
  const [message, setMessage] = useState("");
  const [orderRef, setOrderRef] = useState<string>("");

  // Hold the Supabase order UUID between createOrder → onApprove
  const supabaseOrderIdRef = useRef<string | null>(null);
  // Set to true the instant capture() resolves — guards onError / onCancel from overwriting success
  const capturedRef = useRef<boolean>(false);

  const safeTotal = Math.max(0.01, discountedTotal);

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {status === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-1">
          <p className="text-green-700 font-bold text-sm">✓ Zahlung erfolgreich bestätigt!</p>
          <p className="text-green-600 text-sm">
            Ihre Bestellung wurde aufgenommen. Wir bereiten sie jetzt vor.
          </p>
          {orderRef && (
            <p className="text-green-600 text-xs font-mono mt-1">
              Bestellnummer: <span className="font-bold">#{orderRef}</span>
            </p>
          )}
          <p className="text-green-500 text-xs mt-1">Ihre Rechnung wird geöffnet…</p>
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✗ {message}
        </div>
      )}
      {status === "cancelled" && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl text-sm font-medium">
          Zahlung abgebrochen. Sie können es jederzeit erneut versuchen.
        </div>
      )}
      {status === "processing" && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">
          ⏳ Zahlung wird verarbeitet… Bitte warten und Seite nicht schließen.
        </div>
      )}

      {/* Hide the button once payment is confirmed — prevents any repeat payment attempt */}
      {status !== "success" && (
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", label: "pay" }}
          disabled={status === "processing"}
          createOrder={async (_data, actions) => {
            if (!navigator.onLine) {
              setStatus("error");
              setMessage("Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung.");
              throw new Error("offline");
            }

            // ── 0. Server-side guard: re-check store open status before any charge ──
            const settings = await fetchStoreSettings();
            const isOpen =
              !settings ||
              settings.mode === "force_open" ||
              (settings.mode === "automatic" &&
                (() => { const h = new Date().getHours(); return h >= 18 || h < 4; })());
            if (!isOpen) {
              const msg =
                settings?.reason?.trim() ||
                "Wir haben momentan geschlossen. Bestellungen ab 18:00 Uhr.";
              setStatus("error");
              setMessage(msg);
              throw new Error("store_closed");
            }

            setStatus("processing");
            setMessage("");
            capturedRef.current = false; // reset for this attempt

            // ── 1. Insert pending order into Supabase ─────────────────────────────
            const dbOrderId = await upsertPendingOrder({
              customer_name: customer.name,
              phone: customer.phone,
              delivery_address: customer.address,
              items: items.map((i) => ({
                name: i.name,
                price: i.price,
                qty: i.qty,
                sizeLabel: i.sizeLabel,
              })),
              total_price: safeTotal,
              promo_code: promoCode ?? undefined,
              discount_amount: discountAmount,
            });
            supabaseOrderIdRef.current = dbOrderId;

            // ── 2. Create the PayPal order ─────────────────────────────────────────
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "EUR",
                    value: safeTotal.toFixed(2),
                  },
                  description: `My Pizza – ${items.length} Artikel`,
                  shipping: {
                    name: { full_name: customer.name },
                    address: {
                      address_line_1: customer.address.street,
                      admin_area_2: customer.address.city,
                      postal_code: customer.address.plz,
                      country_code: "DE",
                    },
                  },
                  custom_id: dbOrderId,
                },
              ],
              application_context: {
                shipping_preference: "SET_PROVIDED_ADDRESS",
                user_action: "PAY_NOW",
                brand_name: "My Pizza",
                locale: "de-DE",
              },
            });
          }}
          onApprove={async (_data, actions) => {
            // ── Step A: Capture the payment (money transaction) ──────────────────
            // Separate try/catch so only a real capture failure shows an error.
            let details: any;
            try {
              details = await actions.order!.capture();
            } catch (captureErr) {
              // Capture failed — no money was taken
              console.error("PayPal capture failed:", captureErr);
              setStatus("error");
              setMessage(
                "Zahlung fehlgeschlagen. Es wurde kein Betrag abgebucht. Bitte versuchen Sie es erneut."
              );
              return;
            }

            // ── Money is captured. Immediately lock success state so nothing can overwrite it ──
            capturedRef.current = true;
            const paypalOrderId = details.id as string;
            const payerId = details.payer?.payer_id ?? "unknown";
            const captureStatus: string =
              details?.purchase_units?.[0]?.payments?.captures?.[0]?.status ?? "";

            console.log("[PayPal] Capture response:", {
              paypalOrderId,
              payerId,
              captureStatus,
            });

            // ── Step B: Show success immediately — do NOT block on DB or PDF ──────
            const supabaseId = supabaseOrderIdRef.current ?? paypalOrderId;
            setOrderRef(supabaseId.slice(0, 8).toUpperCase());
            setStatus("success");
            clearCart();

            // ── Step C: Persist paid status to DB (non-fatal) ────────────────────
            if (supabaseOrderIdRef.current) {
              try {
                await markOrderPaid(supabaseOrderIdRef.current, paypalOrderId, payerId);
              } catch (dbErr) {
                // Payment succeeded but DB write failed.
                // Log all details for manual reconciliation — do NOT touch UI.
                console.error(
                  "[CRITICAL] Payment captured but DB update failed. Manual reconciliation required.",
                  {
                    supabaseOrderId: supabaseOrderIdRef.current,
                    paypalOrderId,
                    payerId,
                    captureStatus,
                    error: dbErr,
                  }
                );
              }
            }

            // ── Step D: Generate PDF receipt (non-fatal) ──────────────────────────
            try {
              generateReceipt({ orderID: paypalOrderId, items, total: safeTotal });
            } catch (receiptErr) {
              console.warn("[PayPal] Receipt generation failed (non-fatal):", receiptErr);
            }
          }}
          onCancel={() => {
            // Ignore cancel events that arrive after a successful capture
            if (capturedRef.current) return;
            setStatus("cancelled");
          }}
          onError={(err) => {
            // CRITICAL GUARD: PayPal SDK can fire onError after a successful capture
            // (e.g. SDK internal cleanup errors). Never overwrite a confirmed payment.
            if (capturedRef.current) {
              console.warn(
                "[PayPal] onError fired after successful capture — suppressed to prevent false failure UI.",
                err
              );
              return;
            }
            console.error("[PayPal] SDK error:", err);
            if (isNetworkError(err)) {
              setStatus("error");
              setMessage(
                "Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut."
              );
            } else {
              setStatus("error");
              setMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
            }
          }}
        />
      )}
    </div>
  );
}


