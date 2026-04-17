import { Phone, Clock, MapPin, ChevronDown } from "lucide-react";

export function Hero() {
  const scrollDown = () => {
    document.getElementById("menu-nav")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <img
          src="/logomobile.png"
          alt="My Pizza hero background"
          className="w-full h-full object-cover object-center scale-105 block md:hidden"
        />
        {/* Desktop image */}
        <img
          src="/logover.png"
          alt="My Pizza hero background"
          className="w-full h-full object-cover object-center scale-105 hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        {/* Loyalty Badge */}
        {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
          <span className="text-lg">🎁</span>
          <span className="text-white text-sm font-semibold">Jede 8. Pizza ist GRATIS!</span>
        </div> */}

        <p
          className="text-white mb-3"
          style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 600, opacity: 0.95 }}
        >
          Frisch, schnell & lecker
        </p>
        <p className="text-gray-300 mb-2 text-base font-medium">
          Jetzt bestellen und zu Hause genießen
        </p>
        <p className="mb-10 text-base" style={{ color: "#ec6408", fontWeight: 600 }}>
          Einfach telefonisch bestellen und wir liefern 🚀
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a href="tel:01771313310">
            <button
              className="px-10 py-4 rounded-full text-white font-black text-lg shadow-2xl hover:scale-105 hover:shadow-orange-500/40 transition-all duration-300"
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
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Phone size={14} className="text-white" />
            <span className="text-white text-sm font-bold">01771313310</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Clock size={14} className="text-white" />
            <span className="text-white text-sm font-semibold">17:00 – 03:00</span>
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
  );
}