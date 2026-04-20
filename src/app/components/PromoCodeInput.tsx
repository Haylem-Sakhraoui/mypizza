import { useState } from "react";
import { Tag, X, Check, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export interface AppliedPromo {
  code: string;
  discountAmount: number;
  label: string;
}

interface PromoCodeInputProps {
  cartTotal: number;
  onApply: (promo: AppliedPromo | null) => void;
  applied: AppliedPromo | null;
}

export function PromoCodeInput({ cartTotal, onApply, applied }: PromoCodeInputProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleApply() {
    const code = value.trim().toUpperCase();
    if (!code) return;

    setStatus("loading");
    setErrorMsg("");

    const { data, error } = await supabase
      .from("promocodes")
      .select("code, discount_percentage, fixed_amount, expiration_date, is_active")
      .eq("code", code)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) {
      setStatus("error");
      setErrorMsg("Ungültiger oder abgelaufener Aktionscode.");
      return;
    }

    if (data.expiration_date && new Date(data.expiration_date) < new Date()) {
      setStatus("error");
      setErrorMsg("Dieser Aktionscode ist abgelaufen.");
      return;
    }

    let discountAmount: number;
    let label: string;

    if (data.discount_percentage != null) {
      discountAmount = Math.round(cartTotal * (data.discount_percentage / 100) * 100) / 100;
      label = `${data.discount_percentage}% Rabatt`;
    } else {
      discountAmount = Math.min(data.fixed_amount, cartTotal);
      label = `${Number(data.fixed_amount).toFixed(2).replace(".", ",")} € Rabatt`;
    }

    setStatus("idle");
    onApply({ code: data.code, discountAmount, label });
  }

  function handleRemove() {
    setValue("");
    setStatus("idle");
    setErrorMsg("");
    onApply(null);
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
        <div className="flex items-center gap-2 text-green-700 text-sm">
          <Check size={15} />
          <span className="font-semibold">{applied.code}</span>
          <span className="text-green-600">– {applied.label}</span>
        </div>
        <button
          onClick={handleRemove}
          className="p-1 rounded-full hover:bg-green-100 text-green-600 transition-colors"
          aria-label="Aktionscode entfernen"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              if (status === "error") setStatus("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Aktionscode eingeben"
            className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
              status === "error"
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            }`}
          />
        </div>
        <button
          onClick={handleApply}
          disabled={status === "loading" || !value.trim()}
          className="px-4 py-2.5 rounded-xl text-white text-sm font-bold disabled:opacity-50 transition-all hover:opacity-90 active:scale-95 flex items-center gap-1.5"
          style={{ backgroundColor: "#ec6408" }}
        >
          {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : null}
          Anwenden
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500">{errorMsg}</p>
      )}
    </div>
  );
}
