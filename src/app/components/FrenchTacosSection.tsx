import { ProductCard } from "./ProductCard";



const tacos = [
  {
    id: 1,
    image: "https://frenchtacoslondon.com/_astro/spicy@601w.c5e0fc31.webp",
    title: "French Tacos Tonno",
    description: "Thunfisch, Salat, Tomate, Zwiebeln, Mais, Sauce nach Wahl",
    price: "9,50€",
  },
  {
    id: 2,
    image: "https://frenchtacoslondon.com/_astro/classic@601w.4a3b31f0.webp",
    title: "French Tacos Hähnchen",
    description: "Knuspriges Hähnchen, Salat, Tomate, Mais, Käsesauce",
    price: "9,90€",
    badge: "Beliebt",
  },
  {
    id: 3,
    image: "https://frenchtacoslondon.com/_astro/falafil@601w.0f3e6941.webp",
    title: "French Tacos Sucuk",
    description: "Türkische Wurst (Sucuk), Salat, Tomate, Zwiebeln, BBQ",
    price: "10,50€",
  },
  {
    id: 4,
    image: "https://frenchtacoslondon.com/_astro/french@601w.6a642404.webp",
    title: "French Tacos Hackfleisch",
    description: "Gewürztes Hackfleisch, Käse, Salat, Tomate, Algerische Sauce",
    price: "10,50€",
    badge: "Top-Seller",
  },
  {
    id: 5,
    image: "https://frenchtacoslondon.com/_astro/veggie@601w.9441998d.webp",
    title: "French Tacos Vegetarisch",
    description: "Gegrilltes Gemüse, Halloumi, Salat, Tomate, Joghurtsauce",
    price: "9,00€",
    badge: "🌿 Vegi",
  },
];

export function FrenchTacosSection() {
  return (
    <section id="french-tacos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
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

        {/* Info Banner */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tacos.map((taco) => (
            <ProductCard
              key={taco.id}
              image={taco.image}
              title={taco.title}
              description={taco.description}
              price={taco.price}
              badge={taco.badge}
              extras={[
                "Extra Käse",
                "Extra Sauce",
                "Keine Zwiebeln",
                "Extra Scharf 🌶️",
                "Doppelt Fleisch (+2€)",
                "Glutenfrei (+1€)",
              ]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
