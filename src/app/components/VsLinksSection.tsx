import { Link } from "react-router";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

function Yes() {
  return (
    <div className="flex justify-center">
      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function No() {
  return (
    <div className="flex justify-center">
      <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

function Soon() {
  return (
    <div className="flex justify-center">
      <span className="font-['DM_Sans'] text-[11px] text-slate-400 italic">In arrivo</span>
    </div>
  );
}

function Partial({ label }: { label: string }) {
  return (
    <div className="flex justify-center">
      <span className="font-['DM_Sans'] text-[11px] text-amber-500 italic">{label}</span>
    </div>
  );
}

type Cell = "yes" | "no" | "soon" | { partial: string };

type FeatureRow = {
  label: string;
  zengest: Cell;
  chatgpt: Cell;
  psicogest: Cell;
  gesto: Cell;
  appuntoo: Cell;
};

type Group = { title: string; rows: FeatureRow[] };

const GROUPS: Group[] = [
  {
    title: "Documentazione clinica AI",
    rows: [
      { label: "Note cliniche generate dall'AI",        zengest: "yes",  chatgpt: { partial: "Manuale" }, psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Registrazione e trascrizione seduta",   zengest: "yes",  chatgpt: "no",                   psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Anonimizzazione automatica pre-AI",     zengest: "yes",  chatgpt: "no",                   psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Memoria sedute e contesto paziente",    zengest: "yes",  chatgpt: "no",                   psicogest: "no",  gesto: "no",  appuntoo: "no"  },
      { label: "Terminologia DSM-5 / CBT / DBT",        zengest: "yes",  chatgpt: { partial: "Parziale" }, psicogest: "no", gesto: "no",  appuntoo: "no"  },
    ],
  },
  {
    title: "Conformità e sicurezza",
    rows: [
      { label: "Server esclusivamente in Europa",        zengest: "yes",  chatgpt: "no",                      psicogest: "yes", gesto: "yes", appuntoo: "yes" },
      { label: "DPA incluso per liberi professionisti",  zengest: "yes",  chatgpt: { partial: "Solo enterprise" }, psicogest: "yes", gesto: "yes", appuntoo: "yes" },
      { label: "Conforme Codice Deontologico CNOP",      zengest: "yes",  chatgpt: { partial: "Non verif." },  psicogest: "yes", gesto: "yes", appuntoo: "yes" },
    ],
  },
  {
    title: "Gestione studio",
    rows: [
      { label: "Scheda paziente",                zengest: "yes",  chatgpt: "no",  psicogest: "yes", gesto: "yes",  appuntoo: "yes"  },
      { label: "Fatturazione + STS",             zengest: "soon", chatgpt: "no",  psicogest: "yes", gesto: "yes",  appuntoo: "yes"  },
      { label: "Agenda e promemoria",            zengest: "soon", chatgpt: "no",  psicogest: "yes", gesto: "no",   appuntoo: "yes"  },
    ],
  },
];

const COMPETITORS = [
  { key: "chatgpt",   label: "ChatGPT",   slug: "/vs/chatgpt",   logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/ChatGPT-Logo.png", bg: "#10A37F" },
  { key: "psicogest", label: "PsicoGest", slug: "/vs/psicogest", logo: null,                                                                     bg: "#1D4ED8" },
  { key: "gesto",     label: "Gesto",     slug: "/vs/gesto",     logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/66c5b467eb620c5977db795f/0x0.png", bg: "#7C3AED" },
  { key: "appuntoo",  label: "Appuntoo",  slug: "/vs/appuntoo",  logo: "https://appuntoo.com/images/logo.webp", bg: "#0891B2" },
];

function renderCell(cell: Cell) {
  if (cell === "yes")  return <Yes />;
  if (cell === "no")   return <No />;
  if (cell === "soon") return <Soon />;
  if (typeof cell === "object") return <Partial label={cell.partial} />;
  return null;
}

export function VsLinksSection() {
  return (
    <section className="py-20 px-6 bg-white">
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
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="bg-slate-50 text-left px-5 py-3.5 font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-widest text-slate-400 border-b border-slate-200 w-[36%]" />
                {/* ZenGest */}
                <th className="px-3 py-4 text-center border-b border-[#00122F] w-[13%]" style={{ background: "#00122F" }}>
                  <img src="https://cdn.prod.website-files.com/6985ec3788addb8b6efcb94f/6985ec3788addb8b6efcba5a_3-p-500.png" alt="ZenGest" className="h-5 w-auto object-contain mx-auto" style={{ filter: "brightness(0) invert(1)" }} />
                </th>
                {COMPETITORS.map(c => (
                  <th key={c.key} className="px-3 py-5 text-center border-b w-[13%]" style={{ background: c.bg, borderBottomColor: c.bg }}>
                    <Link to={c.slug} className="flex items-center justify-center">
                      {c.logo
                        ? <img src={c.logo} alt={c.label} className="h-6 w-auto object-contain max-w-[80px]" />
                        : <span className="font-['DM_Sans'] text-[11px] font-bold text-white tracking-wide">{c.label}</span>
                      }
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((group, gi) => (
                <>
                  <tr key={`g-${gi}`}>
                    <td colSpan={6} className="bg-slate-50 px-5 py-2 border-y border-slate-100">
                      <span className="font-['DM_Sans'] text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        {group.title}
                      </span>
                    </td>
                  </tr>
                  {group.rows.map((row, ri) => (
                    <tr key={`${gi}-${ri}`} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-2.5">
                        <span className="font-['DM_Sans'] text-[13px] text-slate-600">{row.label}</span>
                      </td>
                      <td className="px-3 py-2.5 bg-[#F0F5FF] border-x border-[#3B6FD4]/15">
                        {renderCell(row.zengest)}
                      </td>
                      <td className="px-3 py-2.5">{renderCell(row.chatgpt)}</td>
                      <td className="px-3 py-2.5">{renderCell(row.psicogest)}</td>
                      <td className="px-3 py-2.5">{renderCell(row.gesto)}</td>
                      <td className="px-3 py-2.5">{renderCell(row.appuntoo)}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend + CTA */}
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5 font-['DM_Sans'] text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><Yes /> Sì</span>
            <span className="flex items-center gap-1.5"><No /> No</span>
            <span className="italic">In arrivo — prossimamente</span>
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
