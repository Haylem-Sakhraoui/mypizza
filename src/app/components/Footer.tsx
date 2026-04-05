import { Phone, MapPin, Clock, Instagram, Facebook, Twitter } from "lucide-react";

const navLinks = [
  { label: "🍕 Unsere Pizzen", id: "pizza" },
  { label: "🌯 French Tacos", id: "french-tacos" },
  { label: "🍟 Snacks", id: "snacks" },
  { label: "🍔 Burger", id: "burger" },
  { label: "🎁 Angebote", id: "offers" },
  { label: "🛠️ Pizza Builder", id: "build-pizza" },
  { label: "📍 Kontakt", id: "contact" },
];

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top CTA Banner */}
      <div className="py-10 px-4 text-center border-b border-white/10"
        style={{ background: "linear-gradient(135deg, #ec6408, #ff8c42)" }}>
        <h3 className="text-white mb-2" style={{ fontWeight: 800, fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}>
          Hunger? Wir liefern bis 03:00 Uhr! 🍕
        </h3>
        <p className="text-orange-100 text-sm mb-5">
          Einfach anrufen – frisch zubereitet, schnell geliefert.
        </p>
        <a href="tel:01771313310">
          <button className="px-8 py-3 bg-white rounded-full font-black text-base hover:scale-105 hover:shadow-xl transition-all duration-200"
            style={{ color: "#ec6408" }}>
            📞 01771313310
          </button>
        </a>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logohero.png"
                alt="My Pizza Notdienst"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dein lokales Fast-Food-Restaurant in Erfurt. Frische Zutaten, schnelle Lieferung, unschlagbarer Geschmack.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon size={16} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <p className="text-white font-bold mb-4 text-sm">Menü</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-gray-400 text-sm hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold mb-4 text-sm">Kontakt</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} style={{ color: "#ec6408" }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Schmiedstedter Str 28</p>
                  <p className="text-gray-400 text-xs">99084 Erfurt</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: "#ec6408" }} className="flex-shrink-0" />
                <a href="tel:01771313310" className="text-gray-300 text-sm hover:text-white transition-colors font-bold">
                  01771313310
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} style={{ color: "#ec6408" }} className="flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">17:00 – 03:00</p>
                  <p className="text-gray-400 text-xs">Täglich</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loyalty */}
          <div>
            <p className="text-white font-bold mb-4 text-sm">Treue-Programm</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-2xl mb-2">🎁</div>
              <p className="text-white font-bold text-sm mb-1">Jede 8. Pizza GRATIS!</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Bestelle regelmäßig und erhalte deine 8. Pizza kostenlos. Frag beim Bestellen nach!
              </p>
              <div className="mt-3 flex gap-1 flex-wrap">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-xs text-gray-400"
                  >
                    {i + 1}
                  </div>
                ))}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  🍕
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2024 My Pizza Erfurt. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Impressum</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-gray-300 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}