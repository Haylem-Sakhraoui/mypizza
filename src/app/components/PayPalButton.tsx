import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import { upsertPendingOrder, markOrderPaid, type CustomerInfo } from "../lib/supabase";
import { generateReceipt } from "../lib/receipt";
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
}

export function PayPalButton({ customer }: PayPalButtonProps) {
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error" | "cancelled">("idle");
  const [message, setMessage] = useState("");

  // Hold the Supabase order UUID between createOrder → onApprove
  const supabaseOrderIdRef = useRef<string | null>(null);

  const safeTotal = Math.max(0.01, total);

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {status === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✓ Zahlung erfolgreich! Ihre Rechnung wird geöffnet...
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

      <PayPalButtons
        style={{ layout: "vertical", shape: "rect", label: "pay" }}
        disabled={status === "processing"}
        createOrder={async (_data, actions) => {
          if (!navigator.onLine) {
            setStatus("error");
            setMessage("Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung.");
            throw new Error("offline");
          }

          setStatus("processing");
          setMessage("");

          // ── 1. Insert pending order into Supabase first ───────────────────
          const dbOrderId = await upsertPendingOrder({
            customer_name: customer.name,
            phone: customer.phone,
            delivery_address: customer.address,
            items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
            total_price: safeTotal,
          });
          supabaseOrderIdRef.current = dbOrderId;

          // ── 2. Create PayPal order with delivery address pre-filled ───────
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: safeTotal.toFixed(2),
                },
                description: `My Pizza – ${items.length} Artikel`,
                // Pre-fill the shipping address so PayPal skips address forms
                shipping: {
                  name: { full_name: customer.name },
                  address: {
                    address_line_1: customer.address.street,
                    admin_area_2: customer.address.city,
                    postal_code: customer.address.plz,
                    country_code: "DE",
                  },
                },
                // Embed our DB order ID so it's in the PayPal transaction log
                custom_id: dbOrderId,
              },
            ],
            application_context: {
              // Use the address we already provided — skip PayPal's address form
              shipping_preference: "SET_PROVIDED_ADDRESS",
              // Jump straight to the pay confirmation, no review page
              user_action: "PAY_NOW",
              brand_name: "My Pizza",
              locale: "de-DE",
            },
          });
        }}
        onApprove={async (_data, actions) => {
          try {
            const details = await actions.order!.capture();
            const paypalOrderId = details.id!;
            const payerId = details.payer?.payer_id ?? "unknown";

            console.log("Payment captured:", { paypalOrderId, payerId });

            // ── 3. Flip order status to paid in Supabase ──────────────────
            if (supabaseOrderIdRef.current) {
              await markOrderPaid(supabaseOrderIdRef.current, paypalOrderId, payerId);
            }

            // ── 4. Generate PDF receipt ───────────────────────────────────
            generateReceipt({ orderID: paypalOrderId, items, total: safeTotal });

            setStatus("success");
            clearCart();
          } catch (err) {
            console.error("onApprove error:", err);
            if (isNetworkError(err)) {
              setStatus("error");
              setMessage(
                "Verbindung unterbrochen. Ihre Zahlung wurde möglicherweise verarbeitet. Bitte kontaktieren Sie uns: 01771313310."
              );
            } else {
              setStatus("error");
              setMessage("Fehler bei der Zahlungsverarbeitung. Bitte kontaktieren Sie uns: 01771313310.");
            }
          }
        }}
        onCancel={() => {
          setStatus("cancelled");
        }}
        onError={(err) => {
          console.error("PayPal SDK error:", err);
          if (isNetworkError(err)) {
            setStatus("error");
            setMessage("Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
          } else {
            setStatus("error");
            setMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
          }
        }}
      />
    </div>
  );
}
