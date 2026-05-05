import { X, Minus, Plus, Trash2, ShoppingBag, Clock, Banknote, CreditCard, Smartphone } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PayPalButton } from "./PayPalButton";
import { OfflineOrderButton } from "./CashOrderButton";
import { DeliveryForm } from "./DeliveryForm";
import { PromoCodeInput, type AppliedPromo } from "./PromoCodeInput";
import { useState, useCallback } from "react";
import type { CustomerInfo } from "../lib/supabase";
import { useStoreStatus } from "../lib/useBusinessHours";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const { open: isOpen, reason } = useStoreStatus();
  // null = form not yet valid; CustomerInfo = form valid and ready to pay
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const handleValid = useCallback((info: CustomerInfo) => setCustomer(info), []);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "ec" | "paypal">("cash");

  const discountedTotal = appliedPromo
    ? Math.max(0.01, total - appliedPromo.discountAmount)
    : total;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} style={{ color: "#ec6408" }} />
              <h2 className="text-lg font-bold text-gray-900">Warenkorb</h2>
            </div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Alles löschen
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingBag size={48} className="mb-3 opacity-40" />
                <p className="font-medium">Ihr Warenkorb ist leer</p>
                <p className="text-sm mt-1">Fügen Sie leckere Artikel hinzu!</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </p>
                    {item.sizeLabel && (
                      <p className="text-xs font-medium mt-0.5" style={{ color: "#ec6408" }}>
                        {item.sizeLabel}
                      </p>
                    )}
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-[0.67rem] text-gray-400 mt-0.5 leading-snug">
                        + {item.extras.join(", ")}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.price.toFixed(2).replace(".", ",")} € pro Stück
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1 bg-white rounded-full px-1.5 py-0.5 border border-gray-200">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus size={12} className="text-gray-500" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-800">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus size={12} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Price + remove */}
                  <div className="text-right flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 whitespace-nowrap">
                      {(item.price * item.qty).toFixed(2).replace(".", ",")} €
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Total + Promo + Delivery Form + PayPal */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-4 space-y-4 overflow-y-auto max-h-[60vh]">
              {/* Order total */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Zwischensumme</span>
                  <span className="text-sm text-gray-700">
                    {total.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="text-sm">{appliedPromo.label}</span>
                    <span className="text-sm font-semibold">
                      − {appliedPromo.discountAmount.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                  <span className="text-base font-bold text-gray-900">Gesamtbetrag</span>
                  <span className="text-xl font-bold" style={{ color: "#ec6408" }}>
                    {discountedTotal.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
              </div>

              {/* Promo code */}
              <PromoCodeInput
                cartTotal={total}
                onApply={setAppliedPromo}
                applied={appliedPromo}
              />

              {/* Closed notice — replaces checkout flow outside business hours */}
              {!isOpen ? (
                <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: "#1a1a1a" }}>
                  <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "#ec6408" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#f3f4f6" }}>
                      Wir haben momentan geschlossen
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                      {reason ?? "Bestellungen nehmen wir ab 18:00 Uhr entgegen."} Ihr Warenkorb bleibt gespeichert.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step 1: Delivery form — always visible when there are items */}
                  <DeliveryForm onValid={handleValid} />

                  {/* Step 2: Payment method selector — only after form is valid */}
                  {customer && (
                    <div className="pt-1 space-y-3">
                      {/* Payment method toggle */}
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Zahlungsmethode
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setPaymentMethod("cash")}
                          className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-colors ${
                            paymentMethod === "cash"
                              ? "border-orange-400 bg-orange-50 text-orange-700"
                              : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <Banknote size={16} />
                          Barzahlung
                        </button>
                        <button
                          onClick={() => setPaymentMethod("ec")}
                          className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-colors ${
                            paymentMethod === "ec"
                              ? "border-orange-400 bg-orange-50 text-orange-700"
                              : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <CreditCard size={16} />
                          EC-Karte
                        </button>
                        <button
                          onClick={() => setPaymentMethod("paypal")}
                          className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-semibold transition-colors ${
                            paymentMethod === "paypal"
                              ? "border-blue-400 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <Smartphone size={16} />
                          PayPal
                        </button>
                      </div>

                      {/* Step 3: Payment action */}
                      {paymentMethod === "cash" || paymentMethod === "ec" ? (
                        <OfflineOrderButton
                          method={paymentMethod}
                          customer={customer}
                          discountedTotal={discountedTotal}
                          promoCode={appliedPromo?.code ?? null}
                          discountAmount={appliedPromo?.discountAmount ?? 0}
                        />
                      ) : (
                        <PayPalButton
                          customer={customer}
                          discountedTotal={discountedTotal}
                          promoCode={appliedPromo?.code ?? null}
                          discountAmount={appliedPromo?.discountAmount ?? 0}
                        />
                      )}
                    </div>
                  )}

                  {/* Hint shown before form is complete */}
                  {!customer && (
                    <p className="text-center text-xs text-gray-400">
                      Bitte füllen Sie die Lieferadresse aus, um fortzufahren.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
