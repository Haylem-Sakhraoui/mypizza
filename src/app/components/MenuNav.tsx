import { useEffect, useRef, useState } from "react";

const categories = [
  { label: "🍕 Pizza", id: "pizza" },
  { label: "🌯 French Tacos", id: "french-tacos" },
  { label: "🍟 Snacks", id: "snacks" },
  { label: "👶 Kinder Menü", id: "kinder-menu" },
  { label: "🍔 Burger", id: "burger" },
  { label: "🥤 Getränke", id: "getraenke" },
  { label: "🍦 Nachtisch", id: "nachtisch" },
];

export function MenuNav() {
  const [active, setActive] = useState("pizza");
  const [sticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
