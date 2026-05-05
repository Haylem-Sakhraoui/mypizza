import { useState } from "react";
import { Plus, Minus, Check, ChevronDown, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../context/CartContext";
import { useStoreStatus } from "../lib/useBusinessHours";
import { StoreGate } from "./StoreGate";
import { openAllergenModal } from "./AllergeneModal";
import type { ProductSize } from "../lib/useProducts";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;          // formatted base price (shown when no size selected)
  badge?: string;
  extras?: string[];
  allergene?: string | null;
  productId: string;
  hasSizes?: boolean;
  sizes?: ProductSize[];
}

/** Maps Supabase allergen slugs → display codes */
const ALLERGEN_CODE: Record<string, string> = {
  gluten:          "A1",
  krebstiere:      "A2",
  eier:            "A3",
  fisch:           "A4",
  erdnuesse:       "A5",
  soja:            "A6",
  milch:           "A7",
  schalenfruechte: "A8",
  sellerie:        "A9",
  senf:            "A10",
  sesam:           "A11",
  sulfite:         "A12",
  lupinen:         "A13",
  weichtiere:      "A14",
};

const defaultExtras = [
  "Extra Käse",
  "Extra Sauce",
  "Keine Zwiebeln",
  "Extra Scharf 🌶️",
  "Keine Oliven",
];

export function ProductCard({
  image,
  title,
  description,
  price,
  badge,
  extras,
  allergene,
  productId,
  hasSizes = false,
  sizes = [],
}: ProductCardProps) {
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [sizeShake, setSizeShake] = useState(false);
  const { addItem } = useCart();
  const { open: isOpen, reason } = useStoreStatus();

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const extrasList = extras ?? [];

  /** Parse the numeric extra price from label strings like "Edmar (+1,50 €)" */
  function parseExtraPrice(label: string): number {
    const m = label.match(/\+([\d,\.]+)/);
    if (!m) return 0;
    return parseFloat(m[1].replace(",", "."));
  }

  const extrasPrice = selected.reduce((sum, s) => sum + parseExtraPrice(s), 0);

  const resolvedPrice = selectedSize
    ? selectedSize.price
    : null;

  const basePrice = resolvedPrice !== null
    ? resolvedPrice
    : hasSizes && sizes.length > 0
    ? Math.min(...sizes.map((s) => s.price))
    : parseFloat(price.replace("€", "").replace(",", ".").trim());

  const totalUnitPrice = basePrice + extrasPrice;

  const displayPrice = selectedSize
    ? (selectedSize.price + extrasPrice).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
    : hasSizes && sizes.length > 0
    ? "Ab " + (Math.min(...sizes.map((s) => s.price)) + extrasPrice).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
    : (parseFloat(price.replace("€", "").replace(",", ".").trim()) + extrasPrice).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const canAddToCart = !hasSizes || sizes.length === 0 || selectedSize !== null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badge */}
        {badge && (
          <div
            className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
            style={{ backgroundColor: "#ec6408" }}
          >
            {badge}
          </div>
        )}
        {/* Price Badge */}
        <div
          className="absolute bottom-3 right-3 min-w-[56px] h-14 rounded-full flex flex-col items-center justify-center text-white shadow-lg px-2"
          style={{ backgroundColor: "#ec6408" }}
        >
          <span style={{ fontSize: "0.78rem", fontWeight: 900, lineHeight: 1.1, textAlign: "center" }}>{displayPrice}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1rem" }}>
          {title}
        </h3>
        <p className="text-gray-500 mt-1" style={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
          {description}
        </p>
        {allergene && (
          <div className="mt-1.5 flex flex-wrap gap-1 items-center">
            <span className="text-xs font-semibold text-gray-500 mr-0.5">Allergene:</span>
            {allergene.split(/[,\s]+/).filter(Boolean).map((raw) => {
              const code = ALLERGEN_CODE[raw.trim().toLowerCase()] ?? raw.trim();
              return (
                <button
                  key={raw}
                  type="button"
                  onClick={openAllergenModal}
                  className="text-white text-[0.6rem] font-black px-1.5 py-0.5 rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#ec6408" }}
                  title="Allergene ansehen"
                >
                  {code}
                </button>
              );
            })}
          </div>
        )}

        {/* Size selector */}
        {hasSizes && sizes.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-bold text-gray-600 mb-1.5">Größe wählen:</p>
            <div
              className="flex flex-wrap gap-1.5"
              style={sizeShake ? { animation: "shake 0.4s ease-in-out", outline: "2px solid #ef4444", borderRadius: "8px", padding: "4px" } : {}}
            >
              <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`}</style>
              {sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSize(selectedSize?.id === s.id ? null : s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-150 ${
                    selectedSize?.id === s.id
                      ? "text-white border-transparent"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                  style={selectedSize?.id === s.id ? { backgroundColor: "#ec6408", borderColor: "#ec6408" } : {}}
                >
                  {s.label}
                  <span className="ml-1 font-normal opacity-80">
                    {s.price.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </span>
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className={`text-xs text-orange-500 mt-1 font-medium transition-all ${sizeShake ? "font-black text-red-500" : ""}`}>👆 Bitte eine Größe wählen</p>
            )}
          </div>
        )}

        {/* Customize toggle — only shown when extras are available */}
        {extrasList.length > 0 && (
        <button
          onClick={() => setCustomizeOpen(!customizeOpen)}
          className="mt-3 flex items-center gap-1 text-xs font-bold transition-colors"
          style={{ color: "#ec6408" }}
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${customizeOpen ? "rotate-180" : ""}`}
          />
          Zutaten anpassen
        </button>
        )}

        {/* Customize Panel */}
        {customizeOpen && (
          <div className="mt-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-xs font-bold text-gray-700 mb-2">Extras & Wünsche:</p>
            <div className="space-y-1">
              {extrasList.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer group/item"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      selected.includes(item)
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}
                    style={selected.includes(item) ? { backgroundColor: "#ec6408" } : {}}
                    onClick={() => toggle(item)}
                  >
                    {selected.includes(item) && <Check size={10} className="text-white" />}
                  </div>
                  <span
                    className="text-xs text-gray-600 group-hover/item:text-gray-900 transition-colors"
                    onClick={() => toggle(item)}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Qty + Add */}
        <StoreGate open={isOpen} reason={reason}>
          <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus size={12} className="text-gray-600" />
            </button>
            <span className="w-5 text-center text-sm font-bold text-gray-800">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Plus size={12} className="text-gray-600" />
            </button>
          </div>
          <button
            disabled={!isOpen}
            title={!isOpen ? "Bestellungen ab 18:00 Uhr" : undefined}
            className={`flex-1 py-2 rounded-full text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              !isOpen
                ? "bg-gray-300 cursor-not-allowed opacity-60"
                : added
                ? "bg-green-500"
                : "hover:opacity-90 hover:scale-105"
            }`}
            style={!isOpen || added ? {} : { backgroundColor: "#ec6408" }}
            onClick={() => {
              if (!isOpen) return;
              if (!canAddToCart) {
                toast.error("Bitte zuerst eine Größe auswählen", { duration: 3000 });
                setSizeShake(true);
                setTimeout(() => setSizeShake(false), 800);
                return;
              }
              // Cart id encodes product + size + extras so same product with different extras = separate lines
              const extrasKey = selected.length > 0 ? "_" + selected.map((e) => e.replace(/\s/g, "")).join("-") : "";
              const cartId = selectedSize
                ? `${productId}_${selectedSize.id}${extrasKey}`
                : `${productId}${extrasKey}`;
              for (let i = 0; i < qty; i++) {
                addItem({
                  id: cartId,
                  name: title,
                  price: totalUnitPrice,
                  sizeLabel: selectedSize?.label,
                  extras: selected.length > 0 ? [...selected] : undefined,
                });
              }
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
          >
            {added ? (
              <>
                <Check size={14} /> Hinzugefügt
              </>
            ) : (
              <>
                <ShoppingCart size={14} /> In den Warenkorb
              </>
            )}
          </button>
          </div>
        </StoreGate>
      </div>
    </div>
  );
}
