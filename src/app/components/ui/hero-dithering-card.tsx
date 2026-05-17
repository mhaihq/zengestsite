import { HeroDashboard } from "../HeroDashboard";

export function CTASection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)",
      }}
    >
      {/* Badge */}
      <div className="relative z-10 mb-8 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-slate-300/60 bg-white/40 backdrop-blur-sm">
        <span className="text-xs text-slate-600 font-['DM_Sans'] font-medium">
          Conforme GDPR · Dati in Europa · Sviluppato da psicologi
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 font-['Instrument_Serif'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-4xl leading-[1.05] tracking-[-0.025em] mb-5 text-[#00122F] px-2">
        AI per Psicologi.<br />
        Note, Assistente e cartelle,<br className="hidden sm:block" /> in modo intelligente.
      </h1>

      {/* Subheadline */}
      <p className="relative z-10 font-['DM_Sans'] text-base md:text-lg text-center max-w-2xl text-slate-600 mb-8 leading-relaxed px-2">
        Tutto quello che fai prima, durante e dopo una seduta, in un unico spazio. Conforme al GDPR, sviluppato da psicologi italiani.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <a
          href="https://app.zengest.it/sign-up/"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-['DM_Sans'] font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md text-base"
        >
          Prova gratis
        </a>
      </div>

      {/* Trust microcopy */}
      <p className="relative z-10 font-['DM_Sans'] text-xs text-slate-400 mb-12 text-center">
        Conforme GDPR · Dati in Europa · Anonimizzazione automatica
      </p>

      {/* Dashboard preview — scales down on mobile to keep all cards visible */}
      <div className="relative z-10 w-full max-w-5xl px-4 dash-wrap">
        <div className="dash-inner">
          <HeroDashboard />
        </div>
      </div>
      <style>{`
        .dash-wrap { overflow: hidden; height: ${Math.round(540 * 0.42)}px; }
        .dash-inner { transform-origin: top center; transform: scale(0.42); }
        @media (min-width: 400px) {
          .dash-wrap { height: ${Math.round(540 * 0.52)}px; }
          .dash-inner { transform: scale(0.52); }
        }
        @media (min-width: 500px) {
          .dash-wrap { height: ${Math.round(540 * 0.64)}px; }
          .dash-inner { transform: scale(0.64); }
        }
        @media (min-width: 640px) {
          .dash-wrap { height: ${Math.round(540 * 0.78)}px; }
          .dash-inner { transform: scale(0.78); }
        }
        @media (min-width: 768px) {
          .dash-wrap { height: ${Math.round(540 * 0.88)}px; }
          .dash-inner { transform: scale(0.88); }
        }
        @media (min-width: 900px) {
          .dash-wrap { height: ${Math.round(540 * 0.94)}px; }
          .dash-inner { transform: scale(0.94); }
        }
        @media (min-width: 1024px) {
          .dash-wrap { height: 540px; }
          .dash-inner { transform: scale(1); }
        }
      `}</style>

      {/* Blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #F8FAFC)" }} />
    </section>
  );
}
