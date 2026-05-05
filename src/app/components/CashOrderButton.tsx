import { useState } from "react";
import { Banknote, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { placeOfflineOrder, type CustomerInfo } from "../lib/supabase";

interface OfflineOrderButtonProps {
  method: "cash" | "ec";
  customer: CustomerInfo;
  discountedTotal: number;
  promoCode: string | null;
  discountAmount: number;
}

function OrderSuccessToast({ method }: { method: "cash" | "ec" | "paypal" }) {
  const paymentLine =
    method === "ec"
      ? "💳 Zahlung per EC-Karte bei Lieferung"
      : method === "cash"
      ? "💵 Zahlung bar bei Lieferung"
      : "✅ Zahlung per PayPal erhalten";

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "20px 20px 16px",
        boxShadow: "0 12px 48px rgba(0,0,0,0.18)",
        border: "2px solid #ec6408",
        maxWidth: "340px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontSize: "30px", lineHeight: 1 }}>🍕</span>
        <span style={{ fontWeight: 800, fontSize: "16px", color: "#1a1a1a" }}>
          Bestellung erhalten!
        </span>
      </div>
      <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6", margin: 0 }}>
        Vielen Dank für Ihre Bestellung! Wir freuen uns sehr, für Sie kochen zu dürfen.
        Ihre Bestellung wird liebevoll zubereitet und so schnell wie möglich zu Ihnen geliefert. 🎉
      </p>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#6b7280",
          marginTop: "10px",
          marginBottom: "2px",
        }}
      >
        {paymentLine}
      </p>
      <p
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "#ec6408",
          margin: 0,
        }}
      >
        My Pizza – Wir lieben es, für Sie zu kochen! ❤️
      </p>
    </div>
  );
}

export { OrderSuccessToast };

export function OfflineOrderButton({
  method,
  customer,
  discountedTotal,
  promoCode,
  discountAmount,
}: OfflineOrderButtonProps) {
  const { items, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (items.length === 0) return null;

  const isCash = method === "cash";
  const label = isCash
    ? "Jetzt bestellen – Barzahlung bei Lieferung"
    : "Jetzt bestellen – EC-Karte bei Lieferung";
  const Icon = isCash ? Banknote : CreditCard;

  async function handleOrder() {
    if (status === "processing") return;

    setStatus("processing");
    setErrorMsg("");

    try {
      await placeOfflineOrder(method, {
        customer_name: customer.name,
        phone: customer.phone,
        delivery_address: customer.address,
        items: items.map((i) => ({
          name: i.name,
          price: i.price,
          qty: i.qty,
          sizeLabel: i.sizeLabel,
        })),
        total_price: discountedTotal,
        promo_code: promoCode ?? undefined,
        discount_amount: discountAmount,
        notes: customer.notes ?? undefined,
      });

      clearCart();
      setStatus("idle");
      toast.custom(() => <OrderSuccessToast method={method} />, { duration: 7000 });
    } catch (err) {
      console.error("[OfflineOrder] Error:", err);
      setStatus("error");
      setErrorMsg("Fehler beim Aufgeben der Bestellung. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <div className="space-y-3">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          ✗ {errorMsg}
        </div>
      )}

      {status === "processing" ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">
          ⏳ Bestellung wird aufgegeben… Bitte warten.
        </div>
      ) : (
        <button
          onClick={handleOrder}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white transition-opacity"
          style={{ backgroundColor: "#ec6408" }}
        >
          <Icon size={18} />
          {label}
        </button>
      )}
    </div>
  );
}

