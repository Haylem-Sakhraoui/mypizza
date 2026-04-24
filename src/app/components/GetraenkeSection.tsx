import { ProductCard } from "./ProductCard";
import { useProducts, formatPrice } from "../lib/useProducts";

export function GetraenkeSection() {
  const { products, loading, error } = useProducts("alkoholfreie_getraenke");

  return (
    <section id="getraenke" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🥤</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              GETRÄNKE
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Alkoholfreie Getränke
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Erfrischende Getränke für jeden Geschmack – der perfekte Begleiter zu deiner Bestellung.
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
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
              ))
            : products.map((drink) => (
                <ProductCard
                  key={drink.id}
                  image={drink.image_url ?? ""}
                  title={drink.name}
                  description={drink.description ?? ""}
                  price={formatPrice(drink.base_price)}
                  badge={drink.badge ?? undefined}
                  allergene={drink.allergene}
                  productId={drink.id}
                  hasSizes={drink.has_sizes}
                  sizes={drink.sizes}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
