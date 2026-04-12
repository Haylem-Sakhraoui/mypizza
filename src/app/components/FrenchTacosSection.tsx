import { ProductCard } from "./ProductCard";



const tacos = [
  {
    id: 1,
    image: "https://frenchtacoslondon.com/_astro/spicy@601w.c5e0fc31.webp",
    title: "French Tacos Tonno",
    description: "Teigtasche, Thunfisch, Pommes, Käse Sauce und Ei",
    price: "9,00€",
  },
  {
    id: 2,
    image: "https://frenchtacoslondon.com/_astro/classic@601w.4a3b31f0.webp",
    title: "French Tacos Hähnchen",
    description: "Teigtasche, gegrillte hähnchenbrust, Pommes, Käse Sauce und Ei ",
    price: "9,00€",
    badge: "Beliebt",
  },
  {
    id: 3,
    image: "https://frenchtacoslondon.com/_astro/falafil@601w.0f3e6941.webp",
    title: "French Tacos Sucuk",
    description: "Türkische Wurst (Sucuk), Salat, Tomate, Zwiebeln, BBQ",
    price: "9,00€",
  },
  {
    id: 4,
    image: "https://frenchtacoslondon.com/_astro/french@601w.6a642404.webp",
    title: "French Tacos Hackfleisch",
    description: "Teigtasche, Hackfleisch, Pommes, Käse Sauce und EI",
    price: "9,00€",
    badge: "Top-Seller",
  },
  {
    id: 5,
    image: "https://frenchtacoslondon.com/_astro/veggie@601w.9441998d.webp",
    title: "French Tacos Vegetarisch",
    description: "Teigtasche, Rote zwiebeln, Paprika, Pommes und Ei",
    price: "9,00€",
    badge: "🌿 Vegi",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1615535248235-253d93813ca5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGFjb3MlMjBudWdnZXRzfGVufDB8fDB8fHww",
    title: "Tacos Nuggets",
    description: "TEIGTASCHE,  NUGGETS, POMMES, KÄSESAUCE UND EI",
    price: "9,00€",
    badge: "",
  },
  {
    id: 7,
    image: "https://media.istockphoto.com/id/824639360/fr/photo/tacos-de-porc-mexicain.webp?a=1&b=1&s=612x612&w=0&k=20&c=XQM13BLD-tR4UhWSA-BpGfenBtepxH4_6jnxPteP2bg=",
    title: "Tacos gemischtes Fleisch",
    description: "Teigtasche, gegrillte Hähnchenbrust, Rinder-Hackfleisch, Pommes, Käse Sauce und Ei",
    price: "9,00€",
    badge: "🌿 Vegi",
  },
  {
    id: 8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjYsdynycod8fj5dp8Oe40pxVn8DnUekpgg&s",
    title: "Tacos Halloumi",
    description: "Teigtasche, Halloumi, Pommes, Käse Sauce und Ei",
    price: "9,00€",
    badge: "🌿 Vegi",
  },
  {
    id: 9,
    image: "data:image/jpeg;base64,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",
    title: "Tacos Hollandaise",
    description: "Teigtasche, Hähnchenfleisch, Pommes, Hollandaise Sauce ,Ei",
    price: "9,00€",
    badge: "🌿 Vegi",
  },
  {
    id: 10,
    image: "https://media.istockphoto.com/id/2181787560/fr/photo/taco-de-longe-de-porc.webp?a=1&b=1&s=612x612&w=0&k=20&c=9BN4VcPCW2wQxHjJyshGPrZN63mF4S3KyuSUkLsZo8o=",
    title: "Tacos BBQ",
    description: "Teigtasche, Hähnchenfleisch, Pommes, BBQ Sauce ,Ei",
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
