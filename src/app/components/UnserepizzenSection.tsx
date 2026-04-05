import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const specialPizzas = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1718801594801-feba5ddcb2a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "My Pizza Special",
    description: "Hausgemachte Tomatensauce, Mozzarella, Rinderhack, Sucuk, Paprika, Zwiebeln, Jalapeños",
    price: "13,90€",
    stars: 5,
    tag: "⭐ Signature",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1759311943662-5ff7fc6ee5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Meat Lovers",
    description: "Salami, Hähnchen, Sucuk, Schinken, Rinderhack, Mozzarella, BBQ-Sauce",
    price: "14,90€",
    stars: 5,
    tag: "🥩 Fleischliebhaber",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1683759368323-1d40d4473e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    title: "Veggie Deluxe",
    description: "Gegrilltes Gemüse, Feta, Rucola, Kirschtomaten, Pesto, Mozzarella",
    price: "12,90€",
    stars: 4,
    tag: "🌿 Vegetarisch",
  },
];

export function UnserepizzenSection() {
  return (
    <section id="unsere-pizzen" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>⭐</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              SIGNATURE PIZZEN
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Unsere Pizzen – Hausrezepte
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Diese Pizzen sind nach unseren eigenen Rezepten kreiert – eine Hommage an echten Geschmack.
          </p>
        </div>

        {/* Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={pizza.image}
                  alt={pizza.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div
                  className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  {pizza.tag}
                </div>
                {/* Price circle */}
                <div
                  className="absolute bottom-3 right-3 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-xl"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  <span style={{ fontSize: "0.65rem", fontWeight: 700 }}>ab</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 900 }}>{pizza.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 bg-white">
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[...Array(pizza.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      style={{ color: "#ec6408", fill: "#ec6408" }}
                    />
                  ))}
                  {[...Array(5 - pizza.stars)].map((_, i) => (
                    <Star key={i} size={12} className="text-gray-200 fill-gray-200" />
                  ))}
                </div>
                <h3 className="text-gray-900 mb-1" style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {pizza.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  {pizza.description}
                </p>
                <a href="tel:01771313310" className="block">
                  <button
                    className="w-full py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#ec6408" }}
                  >
                    Jetzt bestellen
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
