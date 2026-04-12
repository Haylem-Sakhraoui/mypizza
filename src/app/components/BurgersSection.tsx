import { ProductCard } from "./ProductCard";

const burgers = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlZXNlYnVyZ2VyfGVufDB8fDB8fHww",
    title: "CheeseBurger",
    description: "Rindfleischpatty, Cheddar, Salat, Tomate, Zwiebeln, Ketchup & Senf",
    price: "10,00€",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1669490882811-703aa7f0d7a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWNrZW5oYW1idXJnZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Chicken Burger",
    description: "Knuspriges Hähnchen, Eisbergsalat, Tomate, Mayo, Brioche-Bun",
    price: "8,50€",
    badge: "Beliebt",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1552526881-721ce8509abb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG91YmxlJTIwaGFtYnVyZ2VyfGVufDB8fDB8fHww",
    title: "Dopple Hamburger",
    description: "Doppeltes Rindfleischpatty, doppelter Käse, karamellisierte Zwiebeln, BBQ",
    price: "10,00€",
    badge: "🔥 XXL",
  },
  {
    id: 4,
    image:
    "https://plus.unsplash.com/premium_photo-1775581876773-704f7dcfc3cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGklMjBjaGVlc2UlMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Chili Cheeseburger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
    badge: "🔥 XXL",
  },
  {
    id: 5,
    image:
    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9wcGVsJTIwY2hpbGklMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Doppel Chili Cheeseburger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
    badge: "🔥 XXL",
  },
  {
    id: 6,
    image:
    "https://images.unsplash.com/photo-1768933227584-f9be340e7f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Dopple Cheese Burger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
    badge: "🔥 XXL",
  },
  {
    id: 7,
    image:
    "https://images.unsplash.com/photo-1768933227584-f9be340e7f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Chicken Cheese Burger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
    badge: "🔥 XXL",
  },
  {
    id: 8,
    image:
    "https://images.unsplash.com/photo-1585238341710-4d3ff484184d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bnVnZ2V0cyUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Nuggets burger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
    badge: "🔥 XXL",
  },
  {
    id: 9,
    image:
    "https://images.unsplash.com/photo-1610970878459-a0e464d7592b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFtYnVyZ2VyfGVufDB8fDB8fHww",
    title: "Hamburger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
    badge: "🔥 XXL",
  },
  {
    id: 10,
    image:
    "https://images.unsplash.com/photo-1585238340764-c6f1f6fe1a6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG51Z2dldHMlMjBjaGVlc2UlMjBidXJnZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Nuggets Cheeseburger",
    description: "Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce",
    price: "8,50€",
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
