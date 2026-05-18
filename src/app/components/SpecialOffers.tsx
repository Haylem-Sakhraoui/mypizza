import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useProducts, formatPrice } from "../lib/useProducts";
import { useCart } from "../context/CartContext";
import { useStoreStatus } from "../lib/useBusinessHours";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "../lib/useProducts";

/** Dark overlay card — used for both Combo and Kinder Menü products */
function DarkProductCard({
  product,
  topLabel,
}: {
  product: Product;
  topLabel?: { text: string; className: string };
}) {
  const { addItem } = useCart();
  const { open: isOpen } = useStoreStatus();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!isOpen) return;
    addItem({ id: product.id, name: product.name, price: product.base_price ?? 0 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 group">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={product.image_url ?? ""}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
      </div>

      {/* Top-right badge from DB */}
      {product.badge && (
        <div className="absolute top-4 right-4">
          <span className="text-white text-xs font-black px-3 py-1 rounded-full" style={{ backgroundColor: "#ec6408" }}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Optional top-left label (e.g. category pill) */}
      {topLabel && (
        <div className="absolute top-4 left-4">
          <span className={`text-white text-xs font-black px-3 py-1 rounded-full ${topLabel.className}`}>
            {topLabel.text}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 h-72 flex flex-col justify-end">
        <h3 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
          {product.name}
        </h3>
        <p className="text-orange-300 text-xs mb-3 leading-relaxed line-clamp-2">
          {product.description ?? ""}
        </p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          <span className="text-white text-2xl" style={{ fontWeight: 900, color: "#ec6408" }}>
            {formatPrice(product.base_price)}
          </span>
          <button
            onClick={handleAdd}
            disabled={!isOpen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-bold transition-all hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: added ? "#16a34a" : "#ec6408" }}
          >
            {added ? <><Check size={14} /> Hinzugefügt!</> : <><ShoppingCart size={14} /> Bestellen</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SpecialOffers() {
  const { products: comboProducts, loading: comboLoading } = useProducts("combo_angebot");
  const { products: kinderProducts, loading: kinderLoading } = useProducts("kinder_menue");

  return (
    <section id="offers" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span>🎁</span>
            <span className="text-sm font-bold text-orange-400">SONDERANGEBOTE</span>
          </div>
          <h2
            className="text-white mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Combo-Angebote
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Kombiniere und spare – unsere Combos sind unschlagbar günstig!
          </p>
        </div>

        {/* Dynamic Combo Products Grid */}
        {comboLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl h-72 animate-pulse bg-white/10" />
            ))}
          </div>
        ) : comboProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {comboProducts.map((p) => (
              <DarkProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">Keine Angebote verfügbar.</p>
        )}

        {/* Kinder Menü row */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">👶</span>
            <h3 className="text-white font-black text-xl">Kinder Menü</h3>
          </div>

          {kinderLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl h-72 animate-pulse bg-white/10" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {kinderProducts.map((p) => (
                <DarkProductCard
                  key={p.id}
                  product={p}
                  topLabel={{ text: "👶 Kinder Menü", className: "bg-yellow-500/90" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Loyalty Banner */}
        <div className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #ec6408, #ff8c42)" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              🎁
            </div>
            <div>
              <p className="text-white font-black text-lg">Jede 5. Pizza ist GRATIS!</p>
              <p className="text-orange-100 text-sm">Bestelle 4 Pizzen und die 5. bekommst du kostenlos.</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-8 h-8 bg-white/30 border-2 border-white/50 rounded-full flex items-center justify-center text-xs text-white font-bold"
              >
                {n}
              </div>
            ))}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-lg ml-1">
              🍕
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


