import { ProductCard } from "./ProductCard";
import { useProducts, useExtras, formatPrice } from "../lib/useProducts";

export function PizzabroetcheEckenSection() {
  const { products, loading, error } = useProducts("pizzabroetche_ecken");
  const { extras } = useExtras("pizzabroetche_ecken");

  // Hide the section entirely when there are no products
  if (!loading && products.length === 0) return null;

  return (
    <section id="pizzabroetche-ecken" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🥖</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              PIZZABRÖTCHE &amp; ECKEN
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Pizzabrötche &amp; Ecken
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Knusprige Brötchen und herzhafte Ecken – der perfekte Snack für zwischendurch.
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
                <div key={i} className="bg-gray-50 rounded-2xl h-72 animate-pulse border border-gray-100" />
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
