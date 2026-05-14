const cons = [
  {
    title: "Rischi di conformità",
    description: "Non è conforme al GDPR. Ogni volta che ci copi dati di un paziente, rischi una violazione.",
  },
  {
    title: "Nessuna memoria clinica",
    description: "Non conosce i tuoi pazienti. Devi rispiegare il contesto da zero ad ogni seduta.",
  },
  {
    title: "Inserimento manuale",
    description: "Copi, incolli, anonimizzi a mano. E dimenticarsene una volta basta.",
  },
  {
    title: "Solo risposte, nessuna azione",
    description: "Ti dà del testo da incollare altrove. Non gestisce note, cartelle né fatture.",
  },
];

const pros = [
  {
    title: "Conforme al GDPR by design",
    description: "Dati in UE, pseudonimizzazione automatica, DPA incluso. Nessun rischio legale.",
  },
  {
    title: "Conosce ogni paziente",
    description: "Storico, sedute, obiettivi e temi ricorrenti. Sempre disponibili, senza ripetere nulla.",
  },
  {
    title: "Zero inserimento manuale",
    description: "Trascrive, struttura e archivia in automatico. Tu parli, ZenGest si occupa del resto.",
  },
  {
    title: "Agisce, non solo risponde",
    description: "Genera note, aggiorna la cartella e, a fine seduta, prepara la fattura in automatico.",
  },
];

export function ComparisonSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-5">
            Il vero rischio
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Stai ancora copiando le note su ChatGPT?
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            L'AI generica non è conforme al GDPR, non conosce i tuoi pazienti e non gestisce il tuo calendario. Usa ZenGest per fare meglio la cosa che sai fare: la clinica.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Left — Generic AI */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 md:p-8 shadow-sm">
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
          <div className="rounded-2xl bg-white border border-slate-100 p-5 md:p-8 shadow-xl">
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

        {/* Closing statement */}
        <div className="mt-14 text-center">
          <p className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] leading-snug italic mb-6">
            Non si tratta di smettere di usare l'AI.<br />Si tratta di farlo bene.
          </p>
          <a
            href="#come-funziona"
            className="inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-semibold text-[#00122F] hover:text-[#00122F]/70 transition-colors"
          >
            Vedi come funziona ZenGest
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

      </div>
    </section>
  );
}
