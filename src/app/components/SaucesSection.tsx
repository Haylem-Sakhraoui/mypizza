const sauces = [
  { name: "Curry", emoji: "🟡", color: "#f59e0b", bg: "#fffbeb" },
  { name: "BBQ", emoji: "🟤", color: "#92400e", bg: "#fef3c7" },
  { name: "Ketchup", emoji: "🔴", color: "#dc2626", bg: "#fef2f2" },
  { name: "Mayonnaise", emoji: "⚪", color: "#d97706", bg: "#fffbeb" },
  { name: "Algerisch", emoji: "🟠", color: "#ea580c", bg: "#fff7ed" },
  { name: "Käse Sauce", emoji: "🧀", color: "#ca8a04", bg: "#fefce8" },
];

export function SaucesSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
          <span>🥫</span>
          <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
            SAUCEN
          </span>
        </div>
        <h2
          className="text-gray-900 mb-3"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}
        >
          Deine Lieblingssauce
        </h2>
        <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto">
          Wähle beim Bestellen aus unseren 6 hausgemachten Saucen – einfach deinen Wunsch angeben!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {sauces.map((sauce) => (
            <div
              key={sauce.name}
              className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border-2 cursor-pointer hover:scale-110 hover:shadow-md transition-all duration-200"
              style={{
                backgroundColor: sauce.bg,
                borderColor: sauce.color + "40",
              }}
            >
              <span className="text-3xl">{sauce.emoji}</span>
              <span
                className="text-sm font-bold"
                style={{ color: sauce.color }}
              >
                {sauce.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-gray-400">
          * Saucen können beim telefonischen Bestellen angegeben werden. Einfach anrufen! 📞
        </p>
      </div>
    </section>
  );
}
