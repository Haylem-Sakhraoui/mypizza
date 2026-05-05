import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const ALLERGEN_EVENT = "open-allergene";

/** Call this from anywhere to open the allergen modal */
export function openAllergenModal() {
  window.dispatchEvent(new CustomEvent(ALLERGEN_EVENT));
}

const ALLERGENS = [
  { id: "gluten",          code: "A1",  label: "Glutenhaltiges Getreide",  note: "Weizen, Roggen, Gerste, Hafer, Dinkel", emoji: "🌾" },
  { id: "krebstiere",      code: "A2",  label: "Krebstiere",               note: null,                                    emoji: "🦐" },
  { id: "eier",            code: "A3",  label: "Eier",                     note: null,                                    emoji: "🥚" },
  { id: "fisch",           code: "A4",  label: "Fisch",                    note: null,                                    emoji: "🐟" },
  { id: "erdnuesse",       code: "A5",  label: "Erdnüsse",                 note: null,                                    emoji: "🥜" },
  { id: "soja",            code: "A6",  label: "Soja",                     note: null,                                    emoji: "🫘" },
  { id: "milch",           code: "A7",  label: "Milch",                    note: "inkl. Laktose",                         emoji: "🥛" },
  { id: "schalenfruechte", code: "A8",  label: "Schalenfrüchte",           note: "Mandeln, Haselnüsse, Walnüsse, Cashew u.a.", emoji: "🌰" },
  { id: "sellerie",        code: "A9",  label: "Sellerie",                 note: null,                                    emoji: "🌿" },
  { id: "senf",            code: "A10", label: "Senf",                     note: null,                                    emoji: "🌻" },
  { id: "sesam",           code: "A11", label: "Sesamsamen",               note: null,                                    emoji: "🌱" },
  { id: "sulfite",         code: "A12", label: "Schwefeldioxid & Sulfite", note: null,                                    emoji: "⚗️" },
  { id: "lupinen",         code: "A13", label: "Lupinen",                  note: null,                                    emoji: "🌼" },
  { id: "weichtiere",      code: "A14", label: "Weichtiere",               note: "Muscheln, Schnecken u.a.",              emoji: "🐚" },
];

export function AllergeneModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(ALLERGEN_EVENT, handler);
    return () => window.removeEventListener(ALLERGEN_EVENT, handler);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{ background: "linear-gradient(160deg, #1e293b 0%, #0f172a 100%)" }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Header */}
        <div className="px-6 pt-8 pb-6 text-center border-b border-white/10">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-3">
            <span className="text-sm font-bold text-orange-400">TRANSPARENZ & SICHERHEIT</span>
          </div>
          <h2 className="text-white mb-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900 }}>
            Allergene
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
            Alle 14 deklarierten Hauptallergene gemäß EU-Lebensmittelinformationsverordnung (LMIV).
          </p>
        </div>

        {/* Allergen grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {ALLERGENS.map((a) => (
              <div
                key={a.id}
                className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center text-center p-3 gap-1.5 hover:bg-white/10 transition-colors"
              >
                {/* Code badge */}
                <span
                  className="text-white text-xs font-black px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: "#ec6408" }}
                >
                  {a.code}
                </span>
                {/* Emoji */}
                <span className="text-2xl leading-none">{a.emoji}</span>
                {/* Name */}
                <p className="text-white font-bold leading-tight" style={{ fontSize: "0.72rem" }}>
                  {a.label}
                </p>
                {/* Note */}
                {a.note && (
                  <p className="text-gray-400 leading-tight" style={{ fontSize: "0.62rem" }}>
                    {a.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Warning box */}
          <div className="mt-6 rounded-2xl p-5 border border-orange-500/20 bg-orange-500/10 flex flex-col sm:flex-row gap-4 items-start">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <p className="font-bold text-white mb-1">Hinweis zu Allergenen</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Unsere Gerichte werden in einer Küche zubereitet, in der alle 14 Hauptallergene
                verarbeitet werden. Kreuzkontaminationen können daher nicht vollständig ausgeschlossen
                werden. Bei schweren Allergien bitte vor der Bestellung anrufen.
              </p>
              <a
                href="tel:01771313310"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-white text-sm font-bold hover:scale-105 transition-transform"
                style={{ backgroundColor: "#ec6408" }}
              >
                📞 01771313310 – Jetzt anfragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
