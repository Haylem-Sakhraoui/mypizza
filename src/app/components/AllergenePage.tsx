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

export function AllergenePage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Hero strip */}
      <div
        className="py-14 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
      >
        {/* Back button */}
        <div className="max-w-5xl mx-auto mb-6 flex justify-start">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors"
          >
            ← Zurück zum Menü
          </a>
        </div>
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
          <span className="text-sm font-bold text-orange-400">TRANSPARENZ & SICHERHEIT</span>
        </div>
        <h1
          className="text-white mb-3"
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900 }}
        >
          Allergene
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
          Zum Schutz unserer Gäste kennzeichnen wir alle 14 deklarierten Hauptallergene
          gemäß EU-Lebensmittelinformationsverordnung (LMIV).
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {ALLERGENS.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center p-4 gap-2"
            >
              {/* Code badge */}
              <span
                className="text-white text-xs font-black px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: "#ec6408" }}
              >
                {a.code}
              </span>
              {/* Emoji */}
              <span className="text-3xl leading-none">{a.emoji}</span>
              {/* Name */}
              <p className="text-gray-900 font-bold leading-tight" style={{ fontSize: "0.78rem" }}>
                {a.label}
              </p>
              {/* Note (sub-text) */}
              {a.note && (
                <p className="text-gray-400 leading-tight" style={{ fontSize: "0.68rem" }}>
                  {a.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-10 rounded-2xl p-6 border border-orange-100 bg-orange-50 flex flex-col sm:flex-row gap-4 items-start">
          <span className="text-3xl mt-0.5">⚠️</span>
          <div>
            <p className="font-bold text-gray-900 mb-1">Hinweis zu Allergenen</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Unsere Gerichte werden in einer Küche zubereitet, in der alle 14 Hauptallergene
              verarbeitet werden. Kreuzkontaminationen können daher nicht vollständig ausgeschlossen
              werden. Bei Fragen oder schweren Allergien kontaktiere uns bitte direkt vor deiner Bestellung.
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
    </main>
  );
}
