import { ProductCard } from "./ProductCard";

const snacks = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Chicken Nuggets",
    description:
      "6 oder 9 knusprige Chicken Nuggets mit Dip-Sauce deiner Wahl",
    price: "4,90€",
    badge: "Kinder-Fav",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Wings",
    description:
      "6 BBQ- oder Buffalo-Chicken Wings, würzig & knusprig",
    price: "6,90€",
    badge: "🔥 Hot",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Pommes",
    description:
      "Goldene Pommes frites, knusprig & heiß – mit Ketchup oder Mayo",
    price: "3,50€",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Crispy Chicken",
    description:
      "Knusprig paniertes Hähnchenfilet, serviert mit Dip-Sauce",
    price: "5,90€",
    badge: "Neu",
  },
];

export function SnacksSection() {
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {snacks.map((snack) => (
            <ProductCard
              key={snack.id}
              image={snack.image}
              title={snack.title}
              description={snack.description}
              price={snack.price}
              badge={snack.badge}
              extras={[
                "Extra Dip-Sauce",
                "Extra Scharf 🌶️",
                "Extra Portion (+1,50€)",
                "Mit Käse überbacken",
                "Ohne Salz",
              ]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}