import { useState, useEffect } from "react";
import { Phone, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { openAllergenModal } from "./AllergeneModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/loghero.png"
              alt="My Pizza Notdienst"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {[
              { label: "Kinder Menü", id: "kinder-menu" },
              { label: "Pizzen", id: "pizza" },
              { label: "French Tacos", id: "french-tacos" },
              { label: "Snacks", id: "snacks" },
              { label: "Burger", id: "burger" },
              { label: "Angebote", id: "offers" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ backgroundColor: "#ec6408" }}
                />
              </button>
            ))}
            <button
              onClick={openAllergenModal}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Allergene
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ backgroundColor: "#ec6408" }}
              />
            </button>
          </div>

          {/* Phone + CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:01771313310"
              className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#ec640815" }}
              >
                <Phone size={14} style={{ color: "#ec6408" }} />
              </div>
              <span className="font-bold text-sm">01771313310</span>
            </a>
            <a href="tel:01771313310">
              <button
                className="px-4 py-2 rounded-full text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                style={{ backgroundColor: "#ec6408" }}
              >
                Jetzt bestellen
              </button>
            </a>
            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-orange-50 transition-colors"
            >
              <ShoppingBag size={22} style={{ color: "#ec6408" }} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  {itemCount}
                </span>
              )}
            </button>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {[
              { label: "👶 Kinder Menü", id: "kinder-menu" },
              { label: "🍕 Unsere Pizzen", id: "pizza" },
              { label: "🌯 French Tacos", id: "french-tacos" },
              { label: "🍟 Snacks", id: "snacks" },
              { label: "🍔 Burger", id: "burger" },
              { label: "🎁 Angebote", id: "offers" },
              { label: "📍 Kontakt", id: "contact" },
              { label: "🥤 Getränke", id: "getraenke" },
              { label: "🍦 Nachtisch", id: "nachtisch" },

            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 rounded-xl transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { openAllergenModal(); setMenuOpen(false); }}
              className="w-full text-left block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 rounded-xl transition-colors"
            >
              ⚠️ Allergene
            </button>
            <div className="px-4 pt-2">
              <a href="tel:01771313310" className="flex items-center gap-2 text-gray-700">
                <Phone size={16} style={{ color: "#ec6408" }} />
                <span className="font-bold">01771313310</span>
              </a>
            </div>
          </div>
        )}
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}