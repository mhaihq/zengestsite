const cons = [
  {
    title: "Server fuori dall'Unione Europea",
    description: "I dati clinici escono dai confini UE. Trasferimento extra-UE non documentato (Art. 44 GDPR).",
  },
  {
    title: "Dati che possono finire nei modelli pubblici",
    description: "Anche con le impostazioni \"no training\", non hai garanzia contrattuale né audit trail.",
  },
  {
    title: "Pseudonimizzazione manuale",
    description: "Sei tu a dover anonimizzare ogni nome, ogni dettaglio. E dimenticarsene una volta basta.",
  },
  {
    title: "Nessuna base giuridica per dati sanitari",
    description: "Trattare dati sanitari richiede Art. 9 GDPR. ChatGPT non è progettato per esso.",
  },
  {
    title: "Nessun contesto clinico",
    description: "Non conosce i tuoi pazienti, non ricorda le sedute precedenti. Ricominci da zero ogni volta.",
  },
  {
    title: "La responsabilità è solo tua",
    description: "In caso di reclamo o ispezione del Garante, sei tu a rispondere.",
  },
];

const pros = [
  {
    title: "Server in Unione Europea",
    description: "Tutti i dati restano nell'UE. Conformità GDPR documentata e auditabile.",
  },
  {
    title: "Mai usati per addestrare modelli di terzi",
    description: "Garanzia contrattuale, non solo impostazione UI. I tuoi dati restano tuoi.",
  },
  {
    title: "Pseudonimizzazione automatica",
    description: "Avviene prima dell'elaborazione. Niente da ricordare, niente da fare a mano.",
  },
  {
    title: "Costruito su Art. 9 GDPR",
    description: "Pensato per dati sanitari sin dal disegno. Base giuridica chiara, ruoli definiti.",
  },
  {
    title: "Conosce ogni paziente",
    description: "Storico, sedute, obiettivi, temi ricorrenti. Sempre richiamabili in linguaggio naturale.",
  },
  {
    title: "Contratto di trattamento dati incluso",
    description: "DPA standard, ruoli chiari, responsabilità condivisa. Audit-ready.",
  },
];

export function ComparisonSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 font-['DM_Sans'] mb-5">
            Il vero rischio
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Stai ancora copiando le note su ChatGPT?
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            ChatGPT, Gemini e Claude sono troppo utili per rinunciarci — ma ogni volta che ci copi i dati di un paziente, stai facendo qualcosa che il GDPR e il Codice Deontologico non ti permettono. ZenGest fa le stesse cose, costruito per la clinica.
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
