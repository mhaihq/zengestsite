import { Link } from "react-router";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function Yes() {
  return (
    <div className="flex justify-center">
      <div className="w-5 h-5 rounded-full bg-[#3B6FD4]/15 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function YesGrey() {
  return (
    <div className="flex justify-center">
      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function No() {
  return <div className="flex justify-center"><span className="text-slate-200 text-lg leading-none">—</span></div>;
}

function Soon() {
  return <div className="flex justify-center"><span className="font-['DM_Sans'] text-[11px] text-slate-400 italic">In arrivo</span></div>;
}

function Partial({ label }: { label: string }) {
  return <div className="flex justify-center"><span className="font-['DM_Sans'] text-[11px] text-amber-500 italic">{label}</span></div>;
}

type Cell = "yes" | "no" | "soon" | "grey" | { partial: string };

type FeatureRow = {
  label: string;
  zengest: Cell;
  chatgpt: Cell;
  psicogest: Cell;
  gesto: Cell;
  appuntoo: Cell;
};

type Group = {
  title: string;
  rows: FeatureRow[];
};

const GROUPS: Group[] = [
  {
    title: "Documentazione clinica AI",
    rows: [
      { label: "Note cliniche generate dall'AI",        zengest: "yes",  chatgpt: { partial: "Con input manuale" }, psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Registrazione e trascrizione seduta",   zengest: "yes",  chatgpt: "no",                            psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Anonimizzazione automatica pre-AI",     zengest: "yes",  chatgpt: "no",                            psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Audio eliminato dopo trascrizione",     zengest: "yes",  chatgpt: "no",                            psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Memoria sedute e contesto paziente",    zengest: "yes",  chatgpt: "no",                            psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Terminologia clinica italiana (DSM-5)", zengest: "yes",  chatgpt: { partial: "Parziale" },         psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Formati SOAP, DAP, BIRP",              zengest: "yes",  chatgpt: "no",                            psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Analisi pattern clinici nel tempo",     zengest: "yes",  chatgpt: "no",                            psicogest: "no",  gesto: "no",  appuntoo: "no"  },
    ],
  },
  {
    title: "Conformità e sicurezza",
    rows: [
      { label: "Server esclusivamente in Europa",       zengest: "yes",  chatgpt: "no",                            psicogest: "grey", gesto: "grey", appuntoo: "grey" },
      { label: "DPA incluso per liberi professionisti", zengest: "yes",  chatgpt: { partial: "Solo enterprise" },  psicogest: "grey", gesto: "grey", appuntoo: "grey" },
      { label: "Conforme Codice Deontologico CNOP",     zengest: "yes",  chatgpt: { partial: "Non verificabile" }, psicogest: "grey", gesto: "grey", appuntoo: "grey" },
    ],
  },
  {
    title: "Gestione studio",
    rows: [
      { label: "Scheda paziente",                       zengest: "yes",  chatgpt: "no",   psicogest: "grey", gesto: "grey",  appuntoo: "grey" },
      { label: "Sistema Tessera Sanitaria (STS)",       zengest: "soon", chatgpt: "no",   psicogest: "grey", gesto: "grey",  appuntoo: "grey" },
      { label: "Fatturazione integrata",                zengest: "soon", chatgpt: "no",   psicogest: "grey", gesto: "grey",  appuntoo: "grey" },
      { label: "Agenda appuntamenti",                   zengest: "soon", chatgpt: "no",   psicogest: "grey", gesto: "no",    appuntoo: "grey" },
      { label: "Promemoria WhatsApp automatici",        zengest: "soon", chatgpt: "no",   psicogest: "no",   gesto: "no",    appuntoo: "grey" },
      { label: "Supporto multi-professione",            zengest: "no",   chatgpt: "no",   psicogest: "no",   gesto: "no",    appuntoo: "grey" },
    ],
  },
];

const COMPETITORS = [
  { key: "chatgpt",   label: "ChatGPT",   slug: "/vs/chatgpt"   },
  { key: "psicogest", label: "PsicoGest", slug: "/vs/psicogest" },
  { key: "gesto",     label: "Gesto",     slug: "/vs/gesto"     },
  { key: "appuntoo",  label: "Appuntoo",  slug: "/vs/appuntoo"  },
];

function renderCell(cell: Cell) {
  if (cell === "yes")  return <Yes />;
  if (cell === "grey") return <YesGrey />;
  if (cell === "no")   return <No />;
  if (cell === "soon") return <Soon />;
  if (typeof cell === "object" && "partial" in cell) return <Partial label={cell.partial} />;
  return null;
}

export function VsLinksSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-5">
            Confronta
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em]">
            Come si confronta{" "}
            <span style={G}>ZenGest?</span>
          </h2>
          <p className="font-['DM_Sans'] text-base text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
            Confronto diretto con gli strumenti che gli psicologi italiani usano già.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200" style={{ boxShadow: "0 4px 24px rgba(0,18,47,0.06)" }}>
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr>
                {/* Feature column header */}
                <th className="bg-slate-50 text-left px-5 py-4 font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-200 w-[38%]">
                  Funzionalità
                </th>
                {/* ZenGest — highlighted */}
                <th className="bg-[#00122F] px-4 py-4 text-center border-b border-[#00122F]/80 w-[13%]">
                  <span className="font-['DM_Sans'] text-[12px] font-bold text-white tracking-wide">ZenGest</span>
                </th>
                {/* Competitors */}
                {COMPETITORS.map(c => (
                  <th key={c.key} className="bg-slate-50 px-4 py-4 text-center border-b border-slate-200 w-[13%]">
                    <Link to={c.slug} className="font-['DM_Sans'] text-[12px] font-semibold text-slate-500 hover:text-[#3B6FD4] transition-colors">
                      {c.label}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((group, gi) => (
                <>
                  {/* Group header row */}
                  <tr key={`g-${gi}`}>
                    <td colSpan={6} className="bg-slate-50 px-5 py-2.5 border-y border-slate-100">
                      <span className="font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                        {group.title}
                      </span>
                    </td>
                  </tr>
                  {/* Feature rows */}
                  {group.rows.map((row, ri) => (
                    <tr key={`${gi}-${ri}`} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-['DM_Sans'] text-[13px] text-slate-700">{row.label}</span>
                      </td>
                      {/* ZenGest cell */}
                      <td className="px-4 py-3.5 bg-[#F0F5FF] border-x border-[#3B6FD4]/15">
                        {renderCell(row.zengest)}
                      </td>
                      <td className="px-4 py-3.5">{renderCell(row.chatgpt)}</td>
                      <td className="px-4 py-3.5">{renderCell(row.psicogest)}</td>
                      <td className="px-4 py-3.5">{renderCell(row.gesto)}</td>
                      <td className="px-4 py-3.5">{renderCell(row.appuntoo)}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend + CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5 font-['DM_Sans'] text-[12px] text-slate-400">
            <span className="flex items-center gap-1.5"><YesGrey /> Disponibile</span>
            <span className="flex items-center gap-1.5 text-slate-300">— Non disponibile</span>
            <span className="italic text-slate-400">In arrivo — prossimamente</span>
          </div>
          <a
            href="https://app.zengest.it/sign-up/"
            className="inline-flex items-center justify-center h-10 px-6 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shrink-0"
          >
            Prova gratis →
          </a>
        </div>

      </div>
    </section>
  );
}
