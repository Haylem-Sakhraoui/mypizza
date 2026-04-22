import { Phone, Clock, MapPin, ChevronDown } from "lucide-react";

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
  .hero-line-1 { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.15s; }
  .hero-line-2 { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.35s; }
  .hero-line-3 { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.52s; }
  .hero-cta    { animation: heroFadeUp 0.65s cubic-bezier(.22,.68,0,1.2) both; animation-delay: 0.70s; }
  .hero-pills  { animation: heroFadeIn 0.8s ease both; animation-delay: 0.95s; }
  .hero-cta-primary { animation: heroPulse 2.2s ease-in-out 1.8s infinite; }
`;

export function Hero() {
  const scrollDown = () => {
    document.getElementById("menu-nav")?.scrollIntoView({ behavior: "smooth" });
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
          <p
            className="hero-line-1 text-white mb-3"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 600, opacity: 0.95 }}
          >
            Frisch, schnell & lecker
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
              <Clock size={14} className="text-white" />
              <span className="text-white text-sm font-semibold">18:00 – 04:00</span>
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