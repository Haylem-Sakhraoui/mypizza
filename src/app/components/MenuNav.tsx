import { useEffect, useRef, useState } from "react";
import { useActiveSlugs } from "../lib/useProducts";

const ALL_CATEGORIES = [
  { label: "👶 Kinder Menü",            id: "kinder-menu",          slug: "kinder_menue" },
  { label: "🍕 Pizza",                  id: "pizza",                slug: "pizza" },
  { label: "🥖 Pizzabrötche & Ecken",   id: "pizzabroetche-ecken",  slug: "pizzabroetche_ecken" },
  { label: "🥗 Salat",                  id: "salat",                slug: "salat" },
  { label: "🌯 French Tacos",           id: "french-tacos",         slug: "french-tacos" },
  { label: "🍟 Snacks",                 id: "snacks",               slug: "snacks" },
  { label: "🍔 Burger",                 id: "burger",               slug: "burger" },
  { label: "🥤 Getränke",               id: "getraenke",            slug: "alkoholfreie_getraenke" },
  { label: "🍦 Nachtisch",              id: "nachtisch",            slug: "nachtisch" },
];

// Slugs whose nav button always appears (existing sections)
const ALWAYS_SHOW = new Set([
  "kinder_menue", "pizza", "french-tacos", "snacks",
  "burger", "alkoholfreie_getraenke", "nachtisch",
]);

export function MenuNav() {
  const [active, setActive] = useState("kinder-menu");
  const [sticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeSlugs = useActiveSlugs();

  // Filter: always-show categories + new categories that have products
  const categories = ALL_CATEGORIES.filter(
    (c) => ALWAYS_SHOW.has(c.slug) || activeSlugs.has(c.slug)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-65px 0px 0px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map((c) => document.getElementById(c.id));
      let current = categories[0].id;
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140) current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActive(id);
  };

  return (
    <>
      {/* Placeholder div to detect position */}
      <div ref={ref} className="h-0" />

      <div
        className={`transition-all duration-300 z-40 ${
          sticky
            ? "fixed top-16 left-0 right-0 shadow-md"
            : "relative"
        } bg-white border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto py-3 scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  active === cat.id
                    ? "text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={
                  active === cat.id
                    ? { backgroundColor: "#ec6408" }
                    : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
