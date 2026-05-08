import { ProductCard } from "./ProductCard";
import { useProducts, useExtras, formatPrice } from "../lib/useProducts";

export function SalatSection() {
  const { products, loading, error } = useProducts("salat");
  const { extras } = useExtras("salat");

  // Hide the section entirely when there are no products
  if (!loading && products.length === 0) return null;

  return (
    <section id="salat" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-1.5 mb-4">
            <span>🥗</span>
            <span className="text-sm font-bold text-green-700">
              SALATE
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Frische Salate
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Knackfrisch und bunt – unsere Salate als leichte Beilage oder vollwertiges Hauptgericht.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-6">
            Produkte konnten nicht geladen werden.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-gray-100" />
              ))
            : products.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image_url ?? ""}
                  title={item.name}
                  description={item.description ?? ""}
                  price={formatPrice(item.base_price)}
                  badge={item.badge ?? undefined}
                  extras={extras}
                  allergene={item.allergene}
                  productId={item.id}
                  hasSizes={item.has_sizes}
                  sizes={item.sizes}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
