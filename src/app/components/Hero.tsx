import { Phone, Clock, MapPin, ChevronDown } from "lucide-react";
import { useStoreStatus } from "../lib/useBusinessHours";

const heroTextStyles = `
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes heroPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(236,100,8,0.45); }
    60%       { box-shadow: 0 0 0 10px rgba(236,100,8,0); }
  }
  @keyframes statusPop {
    0%   { opacity: 0; transform: translateY(-10px) scale(0.9); }
    60%  { transform: translateY(2px) scale(1.04); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.7); }
  }
  @keyframes glowOpen {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    60%       { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
  }
  @keyframes glowClosed {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
    60%       { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
  }
  .hero-line-1 { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.15s; }
  .hero-line-2 { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.35s; }
  .hero-line-3 { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.52s; }
  .hero-cta    { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.70s; }
  .hero-pills  { animation: heroFadeIn 0.8s ease both; animation-delay: 0.95s; }
  .hero-cta-primary { animation: heroPulse 2.2s ease-in-out 1.8s infinite; }
  .status-badge { animation: statusPop 0.55s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 1.1s; }
  .status-dot-open   { animation: dotPulse 1.6s ease-in-out infinite, glowOpen 2s ease-in-out 1.5s infinite; }
  .status-dot-closed { animation: dotPulse 2s ease-in-out infinite; }
`;

export function Hero() {
  const { open, reason, settings } = useStoreStatus();

  // Display label: use reason from DB if available, otherwise derive from mode/time
  const openLabel = reason ?? "Jetzt geöffnet";
  const closedLabel = reason ?? "Momentan geschlossen";
  const hoursLabel = settings?.reason ?? null;

  const scrollDown = () => {
    document.getElementById("kinder-menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{heroTextStyles}</style>
      {/* mt-16 offsets the fixed 64px navbar so hero starts below it */}
      <section className="relative min-h-[calc(100vh-4rem)] mt-16 flex items-center justify-center overflow-hidden">
        {/* Background — no animation, just clean static display */}
        <div className="absolute inset-0 bg-black">
          {/* Mobile image */}
          <img
            src="/logomobile.png"
            alt="My Pizza hero background"
            className="w-full h-full object-contain object-center block md:hidden"
          />
          {/* Desktop image */}
          <img
            src="/logover.png"
            alt="My Pizza hero background"
            className="w-full h-full object-contain object-center hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/80" />
        </div>

        {/* Content — animated text only */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

          {/* ── Store status badge ── */}
          <div className="status-badge flex justify-center mb-5" style={{ opacity: 0 }}>
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border backdrop-blur-sm"
              style={{
                backgroundColor: open ? "rgba(21,128,61,0.25)" : "rgba(185,28,28,0.25)",
                borderColor: open ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)",
              }}
            >
              {/* Pulsing dot */}
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  open ? "bg-green-400 status-dot-open" : "bg-red-400 status-dot-closed"
                }`}
              />
              <span
                className="text-sm font-bold tracking-wide"
                style={{ color: open ? "#86efac" : "#fca5a5" }}
              >
                {open ? "✓ Geöffnet" : "✕ Geschlossen"}
              </span>
              {/* Hours / reason hint */}
              {hoursLabel && (
                <>
                  <span
                    className="text-xs"
                    style={{ color: open ? "rgba(134,239,172,0.6)" : "rgba(252,165,165,0.6)" }}
                  >
                    ·
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: open ? "rgba(134,239,172,0.85)" : "rgba(252,165,165,0.85)" }}
                  >
                    {hoursLabel}
                  </span>
                </>
              )}
            </div>
          </div>

          <p
            className="hero-line-1 text-white mb-3"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 600, opacity: 0.95 }}
          >
            Frisch, schnell &amp; lecker
          </p>
          <p className="hero-line-2 text-gray-300 mb-2 text-base font-medium">
            Jetzt bestellen und zu Hause genießen
          </p>
          <p className="hero-line-3 mb-10 text-base" style={{ color: "#ec6408", fontWeight: 600 }}>
            Einfach telefonisch bestellen und wir liefern 🚀
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a href="tel:01771313310">
              <button
                className="hero-cta-primary px-10 py-4 rounded-full text-white font-black text-lg shadow-2xl hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300"
                style={{ backgroundColor: "#ec6408", fontSize: "1.1rem" }}
              >
                📞 Jetzt bestellen
              </button>
            </a>
            <button
              onClick={scrollDown}
              className="px-8 py-4 rounded-full text-white font-bold border-2 border-white/40 hover:bg-white/10 transition-all duration-300"
              style={{ fontSize: "1rem" }}
            >
              Menü ansehen →
            </button>
          </div>

          {/* Info pills */}
          <div className="hero-pills flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Phone size={14} className="text-white" />
              <span className="text-white text-sm font-bold">01771313310</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <MapPin size={14} className="text-white" />
              <span className="text-white text-sm font-semibold">Erfurt, 99084</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>
    </>
  );
}