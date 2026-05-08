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
  promoCode: string | null;
  discountAmount: number;
}

export function PayPalButton({ customer, discountedTotal, deliveryFee, deliveryDistanceKm, customerCoords, promoCode, discountAmount }: PayPalButtonProps) {
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

            // Snapshot items before clearCart
            const capturedItems = items.map((i) => ({
              name: i.name,
              price: i.price,
              qty: i.qty,
              sizeLabel: i.sizeLabel,
            }));

            // ── Step B: Show success immediately ─────────────────────────────
            setStatus("idle");
            clearCart();
            toast.custom(() => <OrderSuccessToast method="paypal" />, { duration: 7000 });

            // ── Step C: Persist order to Supabase (non-fatal) ────────────────
            try {
              const dbOrderId = await upsertPendingOrder({
                customer_name: customer.name,
                phone: customer.phone,
                delivery_address: customer.address,
                items: capturedItems,
                subtotal: discountedTotal,
                delivery_fee: deliveryFee,
                total_price: safeTotal,
                customer_lat: customerCoords?.lat,
                customer_lng: customerCoords?.lng,
                delivery_distance_km: deliveryDistanceKm ?? undefined,
                promo_code: promoCode ?? undefined,
                discount_amount: discountAmount,
                notes: customer.notes ?? undefined,
              });
              await markOrderPaid(dbOrderId, paypalOrderId, payerId);
            } catch (dbErr) {
              console.error(
                "[CRITICAL] Payment captured but DB save failed. Manual reconciliation required.",
                { paypalOrderId, payerId, error: dbErr }
              );
            }
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


