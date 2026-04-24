import { ProductCard } from "./ProductCard";
import { useProducts, formatPrice } from "../lib/useProducts";

const TACOS_EXTRAS = [
  "Extra Käse",
  "Extra Sauce",
  "Keine Zwiebeln",
  "Extra Scharf 🌶️",
  "Doppelt Fleisch (+2€)",
  "Glutenfrei (+1€)",
];

export function FrenchTacosSection() {
  const { products, loading, error } = useProducts("french-tacos");

  return (
    <section id="french-tacos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🌯</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              FRENCH TACOS
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Authentische French Tacos
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Großzügig gefüllt, perfekt gerollt – French Tacos nach Originalrezept, angepasst an deinen Geschmack.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-6">
            Produkte konnten nicht geladen werden.
          </p>
        )}

        <div
          className="rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-4 justify-between"
          style={{ background: "linear-gradient(135deg, #ec640815 0%, #ec640805 100%)", border: "1px solid #ec640820" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌯</span>
            <div>
              <p className="font-bold text-gray-900" style={{ fontSize: "0.95rem" }}>
                Wähle deine Sauce!
              </p>
              <p className="text-gray-500" style={{ fontSize: "0.8rem" }}>
                Curry, BBQ, Algerisch, Käse, Ketchup oder Mayonnaise
              </p>
            </div>
          </div>
          <a href="tel:01771313310">
            <button
              className="px-5 py-2 rounded-full text-white text-sm font-bold"
              style={{ backgroundColor: "#ec6408" }}
            >
              Jetzt anrufen
            </button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
              ))
            : products.map((taco) => (
                <ProductCard
                  key={taco.id}
                  image={taco.image_url ?? ""}
                  title={taco.name}
                  description={taco.description ?? ""}
                  price={formatPrice(taco.base_price)}
                  badge={taco.badge ?? undefined}
                  extras={TACOS_EXTRAS}
                  allergene={taco.allergene}
                  productId={taco.id}
                  hasSizes={taco.has_sizes}
                  sizes={taco.sizes}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
