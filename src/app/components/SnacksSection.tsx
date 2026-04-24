import { ProductCard } from "./ProductCard";
import { useProducts, formatPrice } from "../lib/useProducts";

const SNACKS_EXTRAS = [
  "Extra Dip-Sauce",
  "Extra Scharf 🌶️",
  "Extra Portion (+1,50€)",
  "Mit Käse überbacken",
  "Ohne Salz",
];

export function SnacksSection() {
  const { products, loading, error } = useProducts("snacks");

  return (
    <section id="snacks" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🍟</span>
            <span
              className="text-sm font-bold"
              style={{ color: "#ec6408" }}
            >
              SNACKS
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
            }}
          >
            Snacks &amp; Beilagen
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Perfekte Ergänzung zu jeder Bestellung – knusprig,
            lecker &amp; frisch zubereitet.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-6">
            Produkte konnten nicht geladen werden.
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
              ))
            : products.map((snack) => (
                <ProductCard
                  key={snack.id}
                  image={snack.image_url ?? ""}
                  title={snack.name}
                  description={snack.description ?? ""}
                  price={formatPrice(snack.base_price)}
                  badge={snack.badge ?? undefined}
                  extras={SNACKS_EXTRAS}
                  allergene={snack.allergene}
                  productId={snack.id}
                  hasSizes={snack.has_sizes}
                  sizes={snack.sizes}
                />
              ))}
        </div>
      </div>
    </section>
  );
}