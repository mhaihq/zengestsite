export function CTAFinal() {
  return (
    <section className="bg-[#00122F] py-20 md:py-28 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.025em] mb-6">
          Porta l'AI nella tua pratica clinica, con controllo.
        </h2>
        <p className="font-['DM_Sans'] text-base md:text-lg text-slate-400 leading-relaxed mb-10">
          Partecipa all'accesso anticipato di ZenGest e aiutaci a costruire la cartella clinica AI pensata per psicologi e psicoterapeuti italiani.
        </p>
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center h-14 px-12 rounded-xl font-['DM_Sans'] font-semibold text-base text-[#00122F] bg-white hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
        >
          Richiedi accesso anticipato
        </a>
        <p className="font-['DM_Sans'] text-xs text-slate-500 mt-5">
          Posti limitati nella prima fase · Nessuna carta richiesta · 30 giorni gratuiti al lancio
        </p>
      </div>
    </section>
  );
}
