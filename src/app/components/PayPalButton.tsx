import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { upsertPendingOrder, markOrderPaid, type CustomerInfo } from "../lib/supabase";
import { useState, useRef } from "react";
import { OrderSuccessToast } from "./CashOrderButton";

interface PayPalButtonProps {
  customer: CustomerInfo;
  discountedTotal: number;
  deliveryFee: number;
  deliveryDistanceKm: number | null;
  customerCoords: { lat: number; lng: number } | null;
  orderMode: "delivery" | "pickup";
  promoCode: string | null;
  discountAmount: number;
  onSuccess?: () => void;
}

export function PayPalButton({ customer, discountedTotal, deliveryFee, deliveryDistanceKm, customerCoords, orderMode, promoCode, discountAmount, onSuccess }: PayPalButtonProps) {
  const { items, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "error" | "cancelled">("idle");
  const [message, setMessage] = useState("");

  // Guards onError / onCancel from overwriting a confirmed payment
  const capturedRef = useRef<boolean>(false);

  const finalTotal = Math.max(0.01, discountedTotal + deliveryFee);
  const safeTotal = finalTotal;

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
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

      {status !== "processing" && (
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", label: "pay" }}
          /**
           * createOrder MUST stay synchronous — any async Supabase call here
           * breaks the browser's user-gesture chain and causes PayPal to get
           * stuck on "loading" instead of redirecting to the payment page.
           * All DB work is deferred to onApprove (after the popup closes).
           */
          createOrder={(_data, actions) => {
            capturedRef.current = false;
            setMessage("");
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
            setStatus("processing");

            // ── Snapshot all data NOW while component is still mounted ────────
            // clearCart() later unmounts this component — we must capture
            // everything we need before that happens.
            const capturedItems = items.map((i) => ({
              name: i.name,
              price: i.price,
              qty: i.qty,
              sizeLabel: i.sizeLabel,
              extras: i.extras,
            }));
            const snap = {
              customerName: customer.name,
              phone: customer.phone,
              address: customer.address,
              notes: customer.notes,
              subtotal: discountedTotal,
              fee: deliveryFee,
              total: safeTotal,
              mode: orderMode,
              lat: customerCoords?.lat,
              lng: customerCoords?.lng,
              distKm: deliveryDistanceKm ?? undefined,
              promo: promoCode ?? undefined,
              discount: discountAmount,
            };

            // ── Step A: Capture the payment ───────────────────────────────────
            let details: any;
            try {
              details = await actions.order!.capture();
            } catch (captureErr) {
              console.error("PayPal capture failed:", captureErr);
              setStatus("error");
              setMessage(
                "Zahlung fehlgeschlagen. Es wurde kein Betrag abgebucht. Bitte versuchen Sie es erneut."
              );
              return;
            }

            capturedRef.current = true;
            const paypalOrderId = details.id as string;
            const payerId = details.payer?.payer_id ?? "unknown";

            // ── Step B: Save order to DB BEFORE clearing cart ────────────────
            // Component must still be mounted so the Supabase call runs reliably.
            try {
              const dbOrderId = await upsertPendingOrder({
                customer_name: snap.customerName,
                phone: snap.phone,
                delivery_address: snap.address,
                items: capturedItems,
                subtotal: snap.subtotal,
                delivery_fee: snap.fee,
                total_price: snap.total,
                order_mode: snap.mode,
                customer_lat: snap.lat,
                customer_lng: snap.lng,
                delivery_distance_km: snap.distKm,
                promo_code: snap.promo,
                discount_amount: snap.discount,
                notes: snap.notes ?? undefined,
              });
              await markOrderPaid(dbOrderId, paypalOrderId, payerId);
            } catch (dbErr) {
              // Payment was captured but DB save failed.
              // Do NOT clear cart — keep state intact so the error is visible.
              console.error("[CRITICAL] Payment captured but DB save failed.", {
                paypalOrderId,
                payerId,
                error: dbErr,
              });
              setStatus("error");
              setMessage(
                `Zahlung erhalten (${paypalOrderId}), aber Bestellung konnte nicht gespeichert werden. ` +
                `Bitte rufen Sie uns an und teilen Sie uns diese Nummer mit: ${paypalOrderId}`
              );
              return;
            }

            // ── Step C: Only now clear cart and show success ──────────────────
            setStatus("idle");
            clearCart();
            toast.custom((t) => <OrderSuccessToast method="paypal" toastId={t} />, { duration: 7000 });
            onSuccess?.();
          }}
          onCancel={() => {
            if (capturedRef.current) return;
            setStatus("cancelled");
          }}
          onError={(err) => {
            // PayPal SDK can fire onError after a successful capture — suppress it
            if (capturedRef.current) {
              console.warn("[PayPal] onError after capture — suppressed.", err);
              return;
            }
            console.error("[PayPal] SDK error:", err);
            setStatus("error");
            setMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
          }}
        />
      )}
    </div>
  );
}


