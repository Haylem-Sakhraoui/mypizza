import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export function LocationContact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>📍</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              STANDORT & KONTAKT
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Finde uns in Erfurt
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Besuche uns oder bestelle telefonisch – wir liefern direkt zu dir!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info Cards */}
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ec640815" }}
              >
                <MapPin style={{ color: "#ec6408" }} size={22} />
              </div>
              <div>
                <p className="text-gray-900 font-bold" style={{ fontSize: "0.95rem" }}>
                  Adresse
                </p>
                <p className="text-gray-600 text-sm mt-0.5">Schmiedstedter Str 28</p>
                <p className="text-gray-600 text-sm">99084 Erfurt</p>
                <a
                  href="https://maps.google.com?q=Schmiedstedter+Str+28+99084+Erfurt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: "#ec6408" }}
                >
                  <Navigation size={12} />
                  Route berechnen
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-5 rounded-2xl border-2"
              style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa" }}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ec640825" }}
              >
                <Phone style={{ color: "#ec6408" }} size={22} />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-bold" style={{ fontSize: "0.95rem" }}>
                  Telefonisch bestellen
                </p>
                <p className="text-gray-500 text-xs mt-0.5 mb-2">
                  Ruf uns an und wir liefern zu dir!
                </p>
                <a href="tel:01771313310">
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm hover:scale-105 hover:shadow-lg transition-all duration-200"
                    style={{ backgroundColor: "#ec6408" }}
                  >
                    <Phone size={14} />
                    01771313310
                  </button>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ec640815" }}
              >
                <Clock style={{ color: "#ec6408" }} size={22} />
              </div>
              <div>
                <p className="text-gray-900 font-bold" style={{ fontSize: "0.95rem" }}>
                  Öffnungszeiten
                </p>
                <div className="mt-1 space-y-1">
                  {[
                    { day: "Montag – Freitag", hours: "17:00 – 03:00" },
                    { day: "Samstag & Sonntag", hours: "17:00 – 03:00" },
                  ].map((row) => (
                    <div key={row.day} className="flex items-center justify-between gap-6">
                      <span className="text-gray-500 text-sm">{row.day}</span>
                      <span className="text-gray-900 text-sm font-bold">{row.hours}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Jetzt geöffnet (bis 03:00)
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="p-5 rounded-2xl border border-gray-100"
              style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <p className="text-white font-bold" style={{ fontSize: "0.95rem" }}>
                  Schnelle Lieferung
                </p>
              </div>
              <p className="text-gray-300 text-sm">
                Einfach telefonisch bestellen – wir liefern frisch zubereitet direkt zu dir nach Hause.
                Durchschnittliche Lieferzeit: <span className="text-orange-400 font-bold">30–45 Min.</span>
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-3xl overflow-hidden shadow-md border border-gray-100 h-96 lg:h-full min-h-80 relative bg-gray-100">
            <iframe
              title="My Pizza Erfurt"
              width="100%"
              height="100%"
              loading="lazy"
              className="w-full h-full"
              style={{ filter: "saturate(1.1) contrast(1.05)", minHeight: "320px" }}
              src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&q=Schmiedstedter+Str+28,+99084+Erfurt`}
            />
            {/* Fallback overlay for when API key doesn't work */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 pointer-events-none opacity-0">
              <MapPin size={40} style={{ color: "#ec6408" }} />
              <p className="mt-3 font-bold text-gray-700">My Pizza Erfurt</p>
              <p className="text-gray-500 text-sm">Schmiedstedter Str 28, 99084</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
