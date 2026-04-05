import { ProductCard } from "./ProductCard";

const burgers = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1766589221110-b19445b6d677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Cheeseburger",
    description: "Rindfleischpatty, Cheddar, Salat, Tomate, Zwiebeln, Ketchup & Senf",
    price: "7,50€",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Chicken Burger",
    description: "Knuspriges Hähnchen, Eisbergsalat, Tomate, Mayo, Brioche-Bun",
    price: "8,90€",
    badge: "Beliebt",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1768933227584-f9be340e7f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Double Burger",
    description: "Doppeltes Rindfleischpatty, doppelter Käse, karamellisierte Zwiebeln, BBQ",
    price: "10,90€",
    badge: "🔥 XXL",
  },
];

export function BurgersSection() {
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

        {/* Grid - centered when 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {burgers.map((burger) => (
            <ProductCard
              key={burger.id}
              image={burger.image}
              title={burger.title}
              description={burger.description}
              price={burger.price}
              badge={burger.badge}
              extras={[
                "Extra Käse",
                "Extra Patty (+2€)",
                "Keine Zwiebeln",
                "Extra Bacon (+1,50€)",
                "Extra Scharf 🌶️",
                "Glutenfrei Bun (+1€)",
              ]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
