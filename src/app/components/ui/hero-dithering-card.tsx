import { ArrowRight } from "lucide-react";
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
      <div className="relative z-10 mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300/60 bg-white/40 backdrop-blur-sm">
        <span className="text-xs text-slate-500 font-['DM_Sans'] whitespace-nowrap">
          AI clinica per psicologi italiani
        </span>
        <a
          href="#waitlist"
          className="flex items-center gap-1 text-xs text-[#00122F] hover:text-[#00122F]/70 transition-colors font-['DM_Sans'] font-medium whitespace-nowrap"
        >
          Entra in waitlist <ArrowRight size={12} />
        </a>
      </div>

      {/* Headline */}
      <h1 className="relative z-10 font-['Instrument_Serif'] text-4xl md:text-6xl lg:text-7xl text-center max-w-4xl leading-[1.05] tracking-[-0.025em] mb-6 text-[#00122F]">
        Porta l'AI nella tua pratica clinica, senza perdere il controllo.
      </h1>

      {/* Subheadline */}
      <p className="relative z-10 font-['DM_Sans'] text-base md:text-xl text-center max-w-2xl text-slate-600 mb-10 leading-relaxed">
        ZenGest genera note cliniche, organizza lo storico dei pazienti e ti permette di interrogare ogni caso con un assistente AI sicuro, costruito da psicologi per psicologi e psicoterapeuti.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-16">
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-['DM_Sans'] font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md text-base"
        >
          Richiedi accesso anticipato
        </a>
        <a
          href="#come-funziona"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-['DM_Sans'] font-medium text-[#00122F] border border-[#00122F]/10 bg-white/60 hover:bg-white/80 hover:scale-105 active:scale-95 transition-all duration-200 text-base"
        >
          Scopri di più <ArrowRight size={16} />
        </a>
      </div>

      {/* Trust microcopy */}
      <p className="relative z-10 font-['DM_Sans'] text-xs text-slate-400 mb-12 text-center">
        Conforme GDPR · Dati in Europa · Anonimizzazione automatica
      </p>

      {/* Dashboard preview */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        <HeroDashboard />
      </div>

      {/* Blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #F8FAFC)" }} />
    </section>
  );
}
