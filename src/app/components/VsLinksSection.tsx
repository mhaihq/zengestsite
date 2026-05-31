import { Link } from "react-router";

const COMPARISONS = [
  {
    slug: "/vs/chatgpt",
    competitor: "ChatGPT",
    label: "ZenGest vs ChatGPT",
    description: "Perché usare ChatGPT per le note cliniche è un rischio GDPR reale — e cosa usare invece.",
  },
  {
    slug: "/vs/psicogest",
    competitor: "PsicoGest",
    label: "ZenGest vs PsicoGest",
    description: "PsicoGest risolve la fatturazione. ZenGest risolve la documentazione clinica. Non si escludono.",
  },
  {
    slug: "/vs/gesto",
    competitor: "Gesto",
    label: "ZenGest vs Gesto",
    description: "Gesto a 4,99€/mese per le fatture. ZenGest per eliminare le note manuali. Confronto onesto.",
  },
  {
    slug: "/vs/appuntoo",
    competitor: "Appuntoo",
    label: "ZenGest vs Appuntoo",
    description: "Appuntoo gestisce l'agenda e i reminder. ZenGest trasforma la seduta in documentazione intelligente.",
  },
];

export function VsLinksSection() {
  return (
    <section className="py-24 px-6 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-5">
            Confronta
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] max-w-xl">
            Come si confronta{" "}
            <span style={{ background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              ZenGest?
            </span>
          </h2>
          <p className="font-['DM_Sans'] text-base text-slate-500 mt-3 max-w-lg leading-relaxed">
            Confronti onesti con gli strumenti che gli psicologi italiani usano già.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMPARISONS.map((item) => (
            <Link
              key={item.slug}
              to={item.slug}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#3B6FD4]/40 hover:shadow-md transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.08em] uppercase text-[#0D9488]">
                  vs {item.competitor}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="group-hover:stroke-[#3B6FD4] group-hover:translate-x-0.5 transition-all duration-200"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <h3 className="font-['Instrument_Serif'] text-[20px] text-[#00122F] leading-[1.2] group-hover:opacity-80 transition-opacity">
                {item.label}
              </h3>
              <p className="font-['DM_Sans'] text-[13px] text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
