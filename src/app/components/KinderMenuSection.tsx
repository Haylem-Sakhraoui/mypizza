import { ProductCard } from "./ProductCard";
import { useProducts, useExtras, formatPrice } from "../lib/useProducts";

export function KinderMenuSection() {
  const { products, loading, error } = useProducts("kinder_menue");
  const { extras } = useExtras("kinder_menue");

  return (
    <section id="kinder-menu" className="py-16" style={{ backgroundColor: "#fffbeb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-1.5 mb-4">
            <span>👶</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              KINDER MENÜ
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3 tracking-tight"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 900,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            Für unsere kleinen Gäste 🎉
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Jedes Menü enthält Pommes, Caprisonne &amp; Chocofun Cup — alles, was Kinderherzen höher schlagen lässt.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-6">
            Produkte konnten nicht geladen werden.
          </p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-72 animate-pulse border-2 border-yellow-100" />
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

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Alle Menüs sind speziell für Kinder portioniert.
        </p>
      </div>
    </section>
  );
}

