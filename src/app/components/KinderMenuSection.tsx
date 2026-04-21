import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface KinderMenuItem {
  id: number;
  emoji: string;
  image: string;
  title: string;
  tagline: string;
  price: string;
  includes: { icon: string; label: string }[];
  badge?: string;
}

const kinderMenu: KinderMenuItem[] = [
  {
    id: 1,
    emoji: "🌯",
    image: "/tacos menu.png",
    title: "Tacos Menü",
    tagline: "Mini French Tacos für kleine Helden",
    price: "9,99 €",
    badge: "Kids Fav ⭐",
    includes: [
      { icon: "🌯", label: "Mini French Tacos" },
      { icon: "🍟", label: "Kleine Pommes frites" },
      { icon: "🧃", label: "Caprisonne" },
      { icon: "🍮", label: "Chocofun Cup" },
    ],
  },
  {
    id: 2,
    emoji: "🍗",
    image: "/wings menu.png",
    title: "Wings Menü",
    tagline: "4 knusprige Wings — unwiderstehlich lecker",
    price: "9,99 €",
    badge: "🔥 Crispy",
    includes: [
      { icon: "🍗", label: "4 Chicken Wings" },
      { icon: "🍟", label: "Kleine Pommes frites" },
      { icon: "🧃", label: "Caprisonne" },
      { icon: "🍮", label: "Chocofun Cup" },
    ],
  },
  {
    id: 3,
    emoji: "🍘",
    image:
      "/nuggets menu.png",
    title: "Nuggets Menü",
    tagline: "5 goldene Nuggets — der Kinderklassiker",
    price: "9,99 €",
    includes: [
      { icon: "🍘", label: "6 Chicken Nuggets" },
      { icon: "🍟", label: "Kleine Pommes frites" },
      { icon: "🧃", label: "Caprisonne" },
      { icon: "🍮", label: "Chocofun Cup" },
    ],
  },
  {
    id:4 ,
    emoji: "🍔",
    image:
      "/cheeseburger .png",
    title: "Cheeseburger Menü",
    tagline: "CheeseBurger Menü für kleine Burgerfans",
    price: "9,99 €",
    includes: [
      { icon: "�", label: "CheeseBurger" },
      { icon: "🍟", label: "Kleine Pommes frites" },
      { icon: "🧃", label: "Caprisonne" },
      { icon: "🍮", label: "Chocofun Cup" },
    ],
  },
];

function KinderCard({ item }: { item: KinderMenuItem }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border-2 border-yellow-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Colorful gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />


        {/* Emoji bubble */}
        <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-xl">
          {item.emoji}
        </div>

        {/* Price tag */}
        <div
          className="absolute bottom-3 right-3 rounded-2xl px-3 py-1.5 flex flex-col items-center shadow-lg"
          style={{ backgroundColor: "#ec6408" }}
        >
          <span className="text-white text-xs font-bold leading-none">nur</span>
          <span className="text-white font-extrabold leading-tight" style={{ fontSize: "1.1rem" }}>
            {item.price}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3
          className="text-gray-900 tracking-tight"
          style={{ fontWeight: 900, fontSize: "1.25rem", fontFamily: "'Nunito', sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="text-gray-500 mt-0.5 text-sm leading-snug">{item.tagline}</p>

        {/* Divider */}
        <div className="my-4 border-t border-dashed border-yellow-200" />

        {/* Includes */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Im Menü enthalten
        </p>
        <ul className="space-y-1.5 flex-1">
          {item.includes.map((inc) => (
            <li key={inc.label} className="flex items-center gap-2.5">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                style={{ backgroundColor: "#fff7ed" }}
              >
                {inc.icon}
              </span>
              <span className="text-sm text-gray-700 font-medium">{inc.label}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={handleAddToCart}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white transition-all duration-300 active:scale-95"
          style={{
            backgroundColor: added ? "#16a34a" : "#ec6408",
          }}
        >
          {added ? (
            <>
              <Check size={16} />
              Hinzugefügt!
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              In den Warenkorb
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function KinderMenuSection() {
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
            Jedes Menü enthält Pommes, Caprisonne &amp; Tiramisu — alles, was Kinderherzen höher schlagen lässt.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {kinderMenu.map((item) => (
            <KinderCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Alle Menüs sind speziell für Kinder portioniert. Allergene auf Anfrage.
        </p>
      </div>
    </section>
  );
}
