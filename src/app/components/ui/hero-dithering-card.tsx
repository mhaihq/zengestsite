import { HeroDashboard } from "../HeroDashboard";

export function CTASection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)",
      }}
    >
      {/* Badge — Alessandro + label */}
      <div className="relative z-10 mb-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm">
        <img
          src="/ale.png"
          alt="Alessandro Lombardo"
          className="w-8 h-8 rounded-full object-cover object-top shrink-0"
        />
        <span className="font-['DM_Sans'] text-sm font-medium text-[#00122F]">
          Sviluppato da psicologi italiani
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 font-['Instrument_Serif'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-4xl leading-[1.05] tracking-[-0.025em] mb-5 text-[#00122F] px-2">
        AI per Psicologi.<br />
        Note, Assistente e Cartelle,<br className="hidden sm:block" /> in modo intelligente.
      </h1>

      {/* Subheadline */}
      <p className="relative z-10 font-['DM_Sans'] text-base md:text-lg text-center max-w-2xl text-slate-600 mb-8 leading-relaxed px-2">
        Trascrivi le sedute, aggiorna le cartelle e usa l'AI per note, piani di trattamento e analisi cliniche — conforme al GDPR e al Codice Deontologico.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <a
          href="https://app.zengest.it/sign-up/"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-['DM_Sans'] font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md text-base"
        >
          Prova gratis
        </a>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-12">

        {/* GDPR */}
        <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 shadow-md">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const cx = 14 + 11 * Math.cos(angle);
              const cy = 14 + 11 * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#aaa" />;
            })}
          </svg>
          <div>
            <p className="font-['DM_Sans'] text-[12px] font-bold text-[#00122F] leading-none mb-0.5">GDPR</p>
            <p className="font-['DM_Sans'] text-[11px] text-slate-500 leading-none">Dati clinici protetti</p>
          </div>
        </div>

        {/* EU AI Act */}
        <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 shadow-md">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const cx = 14 + 11 * Math.cos(angle);
              const cy = 14 + 11 * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#aaa" />;
            })}
            <rect x="9" y="9" width="10" height="10" rx="1.5" stroke="#555" strokeWidth="1.4" fill="none"/>
            <rect x="11" y="11" width="6" height="6" rx="0.5" stroke="#555" strokeWidth="1" fill="none" strokeDasharray="1.5 0.8"/>
            <line x1="11" y1="7" x2="11" y2="9" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="14" y1="7" x2="14" y2="9" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="17" y1="7" x2="17" y2="9" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="11" y1="19" x2="11" y2="21" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="14" y1="19" x2="14" y2="21" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="17" y1="19" x2="17" y2="21" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="7" y1="11" x2="9" y2="11" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="7" y1="14" x2="9" y2="14" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="7" y1="17" x2="9" y2="17" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="19" y1="11" x2="21" y2="11" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="19" y1="14" x2="21" y2="14" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="19" y1="17" x2="21" y2="17" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <div>
            <p className="font-['DM_Sans'] text-[12px] font-bold text-[#00122F] leading-none mb-0.5">EU AI Act</p>
            <p className="font-['DM_Sans'] text-[11px] text-slate-500 leading-none">AI ad alto rischio conforme</p>
          </div>
        </div>

        {/* Dati in EU */}
        <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 shadow-md">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <ellipse cx="14" cy="9" rx="6" ry="2.5" stroke="#555" strokeWidth="1.4" fill="none"/>
            <path d="M8 9v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V9" stroke="#555" strokeWidth="1.4" fill="none"/>
            <path d="M8 14v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-5" stroke="#555" strokeWidth="1.4" fill="none"/>
          </svg>
          <div>
            <p className="font-['DM_Sans'] text-[12px] font-bold text-[#00122F] leading-none mb-0.5">Dati in EU</p>
            <p className="font-['DM_Sans'] text-[11px] text-slate-500 leading-none">Server solo europei</p>
          </div>
        </div>

      </div>

      {/* Dashboard preview */}
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
