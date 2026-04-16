import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../lib/supabase";
import { generateReceipt } from "../lib/receipt";
import { useState } from "react";

// Detect if the failure is a network connectivity issue
function isNetworkError(err: unknown): boolean {
  if (err instanceof ProgressEvent) return true;
  if (err instanceof TypeError && typeof (err as TypeError).message === "string") {
    const msg = (err as TypeError).message.toLowerCase();
    return msg.includes("network") || msg.includes("failed to fetch") || msg.includes("load");
  }
  return !navigator.onLine;
}

export function PayPalButton() {
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error" | "cancelled">("idle");
  const [message, setMessage] = useState("");

  if (items.length === 0) return null;

  // Guard: prevent createOrder from being called with a zero/negative total
  const safeTotal = Math.max(0.01, total);

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
        createOrder={(_data, actions) => {
          // Check network before even trying
          if (!navigator.onLine) {
            setStatus("error");
            setMessage("Verbindung unterbrochen. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
            return Promise.reject(new Error("offline"));
          }

          setStatus("processing");
          setMessage("");

          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                // Value must be a string with exactly 2 decimal places
                amount: {
                  currency_code: "EUR",
                  value: safeTotal.toFixed(2),
                },
                description: `My Pizza - ${items.length} Artikel`,
              },
            ],
            // Forces PayPal popup to use the payer's saved address & profile
            // instead of prompting for billing/shipping info — reduces friction
            application_context: {
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              brand_name: "My Pizza",
              locale: "de-DE",
            },
          });
        }}
        onApprove={async (_data, actions) => {
          try {
            const details = await actions.order!.capture();
            const orderID = details.id!;
            const payerID = details.payer?.payer_id ?? "unknown";

            console.log("Payment captured:", { orderID, payerID });

            // Save to Supabase
            await saveOrder({
              items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
              total: safeTotal,
              order_id: orderID,
              payer_id: payerID,
              created_at: new Date().toISOString(),
            });

            // Generate and open PDF receipt
            generateReceipt({ orderID, items, total: safeTotal });

            setStatus("success");
            clearCart();
          } catch (err) {
            console.error("Payment processing error:", err);
            if (isNetworkError(err)) {
              setStatus("error");
              setMessage("Verbindung unterbrochen. Ihre Zahlung wurde möglicherweise verarbeitet. Bitte kontaktieren Sie uns unter 01771313310.");
            } else {
              setStatus("error");
              setMessage("Fehler bei der Zahlungsverarbeitung. Bitte kontaktieren Sie uns unter 01771313310.");
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
            setMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder wählen Sie eine andere Zahlungsmethode.");
          }
        }}
      />
    </div>
  );
}
