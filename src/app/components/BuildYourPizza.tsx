import { useState } from "react";
import { Check, Phone } from "lucide-react";

const sizes = [
  { label: "Small", detail: "Ø 26cm", price: 0 },
  { label: "Medium", detail: "Ø 30cm", price: 2 },
  { label: "Large", detail: "Ø 36cm", price: 4 },
  { label: "Family", detail: "Ø 42cm", price: 7 },
];

const crusts = ["Klassisch", "Dünn & Knusprig", "Thick Crust", "Gefüllter Rand (+1,50€)"];

const sauces = ["Tomatensauce", "BBQ Sauce", "Weiße Sauce (Béchamel)", "Pesto"];

const toppings = [
  { name: "Mozzarella", icon: "🧀" },
  { name: "Salami", icon: "🍕" },
  { name: "Schinken", icon: "🥩" },
  { name: "Champignons", icon: "🍄" },
  { name: "Paprika", icon: "🫑" },
  { name: "Zwiebeln", icon: "🧅" },
  { name: "Jalapeños", icon: "🌶️" },
  { name: "Thunfisch", icon: "🐟" },
  { name: "Ananas", icon: "🍍" },
  { name: "Oliven", icon: "🫒" },
  { name: "Spinat", icon: "🌿" },
  { name: "Hähnchen", icon: "🐔" },
];

export function BuildYourPizza() {
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedCrust, setSelectedCrust] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState(0);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(["Mozzarella"]);

  const toggleTopping = (name: string) => {
    setSelectedToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const basePrice = 8.9;
  const totalPrice = (basePrice + sizes[selectedSize].price).toFixed(2);

  return (
    <section id="build-pizza" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🛠️</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              BUILD YOUR PIZZA
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Stelle deine Pizza zusammen
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Wähle Größe, Boden, Sauce und Toppings – wir bereiten deine individuelle Pizza frisch zu!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8">
          {/* Size */}
          <div>
            <h3 className="text-gray-900 mb-4" style={{ fontWeight: 700, fontSize: "1rem" }}>
              1. Größe wählen
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {sizes.map((size, i) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(i)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center ${
                    selectedSize === i ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className="text-sm font-bold mb-1"
                    style={{ color: selectedSize === i ? "#ec6408" : "#374151" }}
                  >
                    {size.label}
                  </div>
                  <div className="text-xs text-gray-400">{size.detail}</div>
                  {size.price > 0 && (
                    <div className="text-xs mt-1" style={{ color: "#ec6408", fontWeight: 700 }}>
                      +{size.price}€
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Crust */}
          <div>
            <h3 className="text-gray-900 mb-4" style={{ fontWeight: 700, fontSize: "1rem" }}>
              2. Teig wählen
            </h3>
            <div className="flex flex-wrap gap-2">
              {crusts.map((crust, i) => (
                <button
                  key={crust}
                  onClick={() => setSelectedCrust(i)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                    selectedCrust === i
                      ? "text-white border-transparent"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                  style={selectedCrust === i ? { backgroundColor: "#ec6408", borderColor: "#ec6408" } : {}}
                >
                  {crust}
                </button>
              ))}
            </div>
          </div>

          {/* Sauce */}
          <div>
            <h3 className="text-gray-900 mb-4" style={{ fontWeight: 700, fontSize: "1rem" }}>
              3. Sauce wählen
            </h3>
            <div className="flex flex-wrap gap-2">
              {sauces.map((sauce, i) => (
                <button
                  key={sauce}
                  onClick={() => setSelectedSauce(i)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                    selectedSauce === i
                      ? "text-white border-transparent"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                  style={selectedSauce === i ? { backgroundColor: "#ec6408", borderColor: "#ec6408" } : {}}
                >
                  {sauce}
                </button>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <h3 className="text-gray-900 mb-4" style={{ fontWeight: 700, fontSize: "1rem" }}>
              4. Toppings wählen
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {toppings.map((topping) => {
                const active = selectedToppings.includes(topping.name);
                return (
                  <button
                    key={topping.name}
                    onClick={() => toggleTopping(topping.name)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                      active ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {active && (
                      <div
                        className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#ec6408" }}
                      >
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                    <span className="text-xl">{topping.icon}</span>
                    <span
                      className="text-xs font-semibold text-center leading-tight"
                      style={{ color: active ? "#ec6408" : "#6b7280" }}
                    >
                      {topping.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary + Order */}
          <div
            className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ backgroundColor: "#fff7ed", border: "2px solid #fed7aa" }}
          >
            <div>
              <p className="text-gray-900 font-bold mb-1" style={{ fontSize: "0.95rem" }}>
                Deine Pizza:
              </p>
              <p className="text-gray-600 text-sm">
                {sizes[selectedSize].label} · {crusts[selectedCrust].split("(")[0].trim()} ·{" "}
                {sauces[selectedSauce]} ·{" "}
                {selectedToppings.length > 0 ? selectedToppings.join(", ") : "Keine Toppings"}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-400">ab</p>
                <p className="font-black text-2xl" style={{ color: "#ec6408" }}>
                  {totalPrice}€
                </p>
              </div>
              <a href="tel:01771313310">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold hover:scale-105 hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  <Phone size={16} />
                  Jetzt anrufen
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
