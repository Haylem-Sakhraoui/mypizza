import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../lib/supabase";
import { generateReceipt } from "../lib/receipt";
import { useState } from "react";

export function PayPalButton() {
  const { items, total, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error" | "cancelled">("idle");
  const [message, setMessage] = useState("");

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
          ✗ {message || "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut."}
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
          setStatus("processing");
          setMessage("");
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: total.toFixed(2),
                },
                description: `My Pizza Bestellung - ${items.length} Artikel`,
              },
            ],
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
              total,
              order_id: orderID,
              payer_id: payerID,
              created_at: new Date().toISOString(),
            });

            // Generate receipt PDF
            generateReceipt({ orderID, items, total });

            setStatus("success");
            clearCart();
          } catch (err) {
            console.error("Payment processing error:", err);
            setStatus("error");
            setMessage("Fehler bei der Zahlungsverarbeitung. Bitte kontaktieren Sie uns.");
          }
        }}
        onCancel={() => {
          setStatus("cancelled");
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          setStatus("error");
          setMessage("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
        }}
      />
    </div>
  );
}
