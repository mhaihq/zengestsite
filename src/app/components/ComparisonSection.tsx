const cons = [
  {
    title: "Non progettata per dati clinici",
    description: "Ogni copia-incolla aumenta il rischio di errore, perdita di contesto o uso improprio dei dati.",
  },
  {
    title: "Contesto da ricostruire ogni volta",
    description: "Devi spiegare chi è il paziente, cosa è successo prima e cosa vuoi ottenere.",
  },
  {
    title: "Nessuna memoria clinica",
    description: "Non collega automaticamente sedute, note, obiettivi e documenti.",
  },
  {
    title: "Risposte isolate",
    description: "Ti dà testo, ma non aggiorna la cartella clinica.",
  },
];

const pros = [
  {
    title: "Pensato per la pratica clinica",
    description: "Dati organizzati in uno spazio sicuro, con anonimizzazione e controllo del professionista.",
  },
  {
    title: "Contesto già disponibile",
    description: "Ogni paziente ha il proprio storico clinico, consultabile prima e dopo la seduta.",
  },
  {
    title: "Continuità nel tempo",
    description: "ZenGest collega sedute, note, obiettivi e temi ricorrenti.",
  },
  {
    title: "Azioni cliniche pronte",
    description: "Genera note, sintesi, riepiloghi e aggiornamenti della cartella.",
  },
];

export function ComparisonSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Stai ancora copiando le note su ChatGPT?
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Gli strumenti generici non sono progettati per lavorare sullo storico clinico di un paziente. ZenGest nasce per quello.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Left — Generic AI */}
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
            {/* AI logos image */}
            <div className="mb-6">
              <img src="/logos.png" alt="ChatGPT, Gemini, Claude" className="h-11 w-auto object-contain" />
            </div>

            <h3 className="font-['DM_Sans'] text-xl font-bold text-[#00122F] mb-1">
              AI Generica <span className="font-normal text-slate-400 text-base">(ChatGPT, Gemini, Claude)</span>
            </h3>

            <div className="mt-6 flex flex-col divide-y divide-slate-100">
              {cons.map((item) => (
                <div key={item.title} className="flex gap-3 py-4">
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <div>
                    <p className="font-['DM_Sans'] text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="font-['DM_Sans'] text-sm text-slate-500 leading-snug mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — ZenGest */}
          <div className="rounded-2xl bg-white border border-slate-100 p-8 shadow-xl">
            {/* ZenGest logo */}
            <div className="mb-6">
              <img src="https://cdn.prod.website-files.com/6985ec3788addb8b6efcb94f/6985ec3788addb8b6efcba5a_3-p-500.png" alt="ZenGest" className="h-11 w-auto object-contain" />
            </div>

            <h3 className="font-['DM_Sans'] text-xl font-bold text-[#00122F] mb-1">
              ZenGest
            </h3>

            <div className="mt-6 flex flex-col divide-y divide-slate-100">
              {pros.map((item) => (
                <div key={item.title} className="flex gap-3 py-4">
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p className="font-['DM_Sans'] text-sm font-semibold text-emerald-600">{item.title}</p>
                    <p className="font-['DM_Sans'] text-sm text-slate-500 leading-snug mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
