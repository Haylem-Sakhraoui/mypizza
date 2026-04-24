import { ProductCard } from "./ProductCard";
import { useProducts, formatPrice } from "../lib/useProducts";

const BURGER_EXTRAS = [
  "Extra Käse",
  "Extra Patty (+2€)",
  "Keine Zwiebeln",
  "Extra Bacon (+1,50€)",
  "Extra Scharf 🌶️",
  "Glutenfrei Bun (+1€)",
];

export function BurgersSection() {
  const { products, loading, error } = useProducts("burger");

  return (
    <section id="burger" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🍔</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              BURGER
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Unsere Burger
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Saftige Patties, premium Zutaten, frisch gebackene Brötchen – Burger auf höchstem Niveau.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-6">
            Produkte konnten nicht geladen werden.
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
              ))
            : products.map((burger) => (
                <ProductCard
                  key={burger.id}
                  image={burger.image_url ?? ""}
                  title={burger.name}
                  description={burger.description ?? ""}
                  price={formatPrice(burger.base_price)}
                  badge={burger.badge ?? undefined}
                  extras={BURGER_EXTRAS}
                  allergene={burger.allergene}
                  productId={burger.id}
                  hasSizes={burger.has_sizes}
                  sizes={burger.sizes}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
