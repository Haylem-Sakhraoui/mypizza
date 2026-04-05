import { ImageWithFallback } from "./figma/ImageWithFallback";

const offers = [
  {
    id: 1,
    emoji: "🍕🍟🥤",
    title: "Pizza Combo",
    subtitle: "Pizza + Pommes + Getränk",
    description: "Wähle eine beliebige Pizza (bis Ø 30cm), dazu knusprige Pommes und ein 0,5L Getränk deiner Wahl.",
    oldPrice: "17,80€",
    price: "13,90€",
    badge: "SPARE 22%",
    color: "#ec6408",
    image:
      "https://images.unsplash.com/photo-1612040906977-1110aa1bdb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    id: 2,
    emoji: "🍔🍟🥤",
    title: "Burger Deal",
    subtitle: "Burger + Pommes + Getränk",
    description: "Dein Lieblingsburger, goldene Pommes und ein 0,5L Softdrink – das perfekte Trio.",
    oldPrice: "16,90€",
    price: "12,90€",
    badge: "BESTSELLER",
    color: "#1e293b",
    image:
      "https://images.unsplash.com/photo-1763689389824-dd2cea2e5772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    id: 3,
    emoji: "🌯🍟🥤",
    title: "Tacos Combo",
    subtitle: "French Tacos + Nuggets + Getränk",
    description: "Ein French Tacos deiner Wahl, 6 Chicken Nuggets und ein 0,5L Getränk.",
    oldPrice: "19,30€",
    price: "14,90€",
    badge: "BELIEBT",
    color: "#7c3aed",
    image:
      "https://images.unsplash.com/photo-1719282431987-2382e77e5a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
];

export function SpecialOffers() {
  return (
    <section id="offers" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <span>🎁</span>
            <span className="text-sm font-bold text-orange-400">SONDERANGEBOTE</span>
          </div>
          <h2
            className="text-white mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Combo-Angebote
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Kombiniere und spare – unsere Combos sind unschlagbar günstig!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className="text-white text-xs font-black px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  {offer.badge}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 h-72 flex flex-col justify-end">
                <div className="text-3xl mb-2">{offer.emoji}</div>
                <h3 className="text-white mb-1" style={{ fontWeight: 800, fontSize: "1.25rem" }}>
                  {offer.title}
                </h3>
                <p className="text-orange-300 text-sm font-semibold mb-2">{offer.subtitle}</p>
                <p className="text-gray-300 text-xs mb-4 leading-relaxed">{offer.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 line-through text-sm mr-2">{offer.oldPrice}</span>
                    <span className="text-white text-2xl" style={{ fontWeight: 900, color: "#ec6408" }}>
                      {offer.price}
                    </span>
                  </div>
                  <a href="tel:01771313310">
                    <button
                      className="px-4 py-2 rounded-full text-white text-sm font-bold hover:scale-105 transition-transform"
                      style={{ backgroundColor: "#ec6408" }}
                    >
                      Bestellen
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loyalty Banner */}
        <div className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #ec6408, #ff8c42)" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              🎁
            </div>
            <div>
              <p className="text-white font-black text-lg">Jede 8. Pizza ist GRATIS!</p>
              <p className="text-orange-100 text-sm">Bestelle 7 Pizzen und die 8. bekommst du kostenlos.</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div
                key={n}
                className="w-8 h-8 bg-white/30 border-2 border-white/50 rounded-full flex items-center justify-center text-xs text-white font-bold"
              >
                {n}
              </div>
            ))}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-lg ml-1">
              🍕
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
