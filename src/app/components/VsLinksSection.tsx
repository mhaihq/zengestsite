import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";
import { DEEP_BLUE, SHEET } from "./ui/deep-blue";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as const;
const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const MINT = "#5EEAD4";

type Cell = "yes" | "no" | "soon" | { partial: string };
type CompetitorKey = "chatgpt" | "psicogest" | "gesto" | "appuntoo";
type FeatureRow = { label: string; zengest: Cell } & Record<CompetitorKey, Cell>;
type Group = { title: string; rows: FeatureRow[] };

const GROUPS: Group[] = [
  {
    title: "Documentazione clinica AI",
    rows: [
      { label: "Note cliniche generate dall'AI",                zengest: "yes", chatgpt: { partial: "Manuale" },  psicogest: "no", gesto: "no", appuntoo: "no" },
      { label: "Registrazione e trascrizione della seduta",     zengest: "yes", chatgpt: "no",                    psicogest: "no", gesto: "no", appuntoo: "no" },
      { label: "Pseudonimizzazione automatica prima dell'AI",   zengest: "yes", chatgpt: "no",                    psicogest: "no", gesto: "no", appuntoo: "no" },
      { label: "Memoria delle sedute e contesto del paziente",  zengest: "yes", chatgpt: "no",                    psicogest: "no", gesto: "no", appuntoo: "no" },
      { label: "Agenti per approccio: CBT, EMDR, sistemico…",   zengest: "yes", chatgpt: { partial: "Parziale" }, psicogest: "no", gesto: "no", appuntoo: "no" },
    ],
  },
  {
    title: "Conformità e sicurezza",
    rows: [
      { label: "Cartella archiviata in Europa",          zengest: "yes", chatgpt: "no",                           psicogest: "yes", gesto: "yes", appuntoo: "yes" },
      { label: "DPA incluso per liberi professionisti",  zengest: "yes", chatgpt: { partial: "Solo enterprise" }, psicogest: "yes", gesto: "yes", appuntoo: "yes" },
      { label: "Conforme al Codice Deontologico CNOP",   zengest: "yes", chatgpt: { partial: "Non verificabile" }, psicogest: "yes", gesto: "yes", appuntoo: "yes" },
    ],
  },
  {
    title: "Gestione dello studio",
    rows: [
      { label: "Scheda del paziente",          zengest: "yes",  chatgpt: "no", psicogest: "yes", gesto: "yes", appuntoo: "yes" },
      { label: "Fatturazione e Sistema TS",    zengest: "yes",  chatgpt: "no", psicogest: "yes", gesto: "yes", appuntoo: "yes" },
      { label: "Agenda e promemoria",          zengest: "soon", chatgpt: "no", psicogest: "yes", gesto: "no",  appuntoo: "yes" },
    ],
  },
];

const COMPETITORS: { key: CompetitorKey; label: string; kind: string; slug: string }[] = [
  { key: "chatgpt",   label: "ChatGPT",   kind: "AI generica", slug: "/vs/chatgpt" },
  { key: "psicogest", label: "PsicoGest", kind: "Gestionale",  slug: "/vs/psicogest" },
  { key: "gesto",     label: "Gesto",     kind: "Gestionale",  slug: "/vs/gesto" },
  { key: "appuntoo",  label: "Appuntoo",  kind: "Gestionale",  slug: "/vs/appuntoo" },
];

// On desktop each competitor has its own column (3 to 6); on phones only the selected one shows, in column 3.
const DESK_COL = ["lg:col-start-3", "lg:col-start-4", "lg:col-start-5", "lg:col-start-6"];

// Header + (title + rows) per group + footer: the grid needs explicit rows so the ZenGest pillar can span them all.
const TOTAL_ROWS = 1 + GROUPS.reduce((n, g) => n + 1 + g.rows.length, 0) + 1;

const CSS = `
@keyframes vs-pop{0%{transform:scale(.4);opacity:.2}60%{transform:scale(1.14);opacity:1}100%{transform:scale(1);opacity:1}}
.vs-live .vs-mark{animation:vs-pop .5s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i) * 55ms)}
@media (prefers-reduced-motion: reduce){.vs-live .vs-mark{animation:none}}
`;

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** One cell's answer. `own` is the ZenGest column, drawn on the deep blue. */
function Mark({ cell, own = false, order = 0 }: { cell: Cell; own?: boolean; order?: number }) {
  const pop = own ? { className: "vs-mark", style: { "--i": order } as CSSProperties } : { className: "", style: undefined };
  if (cell === "yes") {
    return (
      <span className={`${pop.className} flex h-7 w-7 items-center justify-center rounded-full ${own ? "text-[#00122F]" : "bg-emerald-100 text-emerald-700"}`} style={own ? { ...pop.style, background: MINT } : undefined}>
        <Check className="h-3.5 w-3.5" />
        <span className="sr-only">Sì</span>
      </span>
    );
  }
  if (cell === "no") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    );
  }
  const text = cell === "soon" ? "In arrivo" : cell.partial;
  return (
    <span
      className={`${pop.className} rounded-full px-2.5 py-1 text-center font-['DM_Sans'] text-[11px] font-semibold leading-tight ${own ? "border border-white/30 text-white/85" : "bg-amber-50 text-amber-700"}`}
      style={pop.style}
    >
      {text}
    </span>
  );
}

function Cellbox({ col, row, className = "", role = "cell", children }: { col: string; row: number; className?: string; role?: string; children?: ReactNode }) {
  return (
    <div role={role} className={`${col} relative z-10 items-center justify-center px-2 py-3.5 ${className}`} style={{ gridRow: row }}>
      {children}
    </div>
  );
}

export function VsLinksSection() {
  const root = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [picked, setPicked] = useState<CompetitorKey>("chatgpt");

  // The ZenGest ticks pop in, top to bottom, the first time the chart scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setLive(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const compClass = (i: number) => `col-start-3 ${DESK_COL[i]} ${COMPETITORS[i].key === picked ? "flex" : "hidden lg:flex"}`;
  let row = 1;
  let order = 0;

  return (
    <section className={`${SHEET} bg-slate-50 px-4 pt-24 pb-20 sm:px-6 md:pt-32 md:pb-28`}>
      <style>{CSS}</style>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-5 inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-white">
            Confronta
          </div>
          <h2 className="font-display text-4xl leading-[1.1] tracking-[-0.015em] text-[#00122F] md:text-5xl">
            Come si confronta <span style={G}>ZenGest?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-['DM_Sans'] text-base leading-relaxed text-slate-500">
            Accanto agli strumenti che gli psicologi italiani usano già, funzione per funzione.
          </p>
        </div>

        {/* Phones: pick who to compare with */}
        <div className="mb-5 grid grid-cols-4 gap-1 rounded-2xl bg-slate-200/70 p-1 lg:hidden" role="group" aria-label="Scegli con chi confrontare ZenGest">
          {COMPETITORS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setPicked(c.key)}
              aria-pressed={picked === c.key}
              className={`rounded-xl px-1 py-2 font-['DM_Sans'] text-[12.5px] font-semibold transition-colors ${picked === c.key ? "bg-white text-[#00122F] shadow-sm" : "text-slate-500"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* The chart */}
        <div className="rounded-[28px] border border-slate-200/80 bg-white px-3 py-4 shadow-[0_30px_80px_-45px_rgba(0,18,47,0.35)] sm:px-6">
          <div
            ref={root}
            role="table"
            aria-label="Confronto tra ZenGest e altri strumenti"
            className={`relative grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,2.2fr)_repeat(5,minmax(0,1fr))] ${live ? "vs-live" : ""}`}
            style={{ gridTemplateRows: `repeat(${TOTAL_ROWS}, auto)` }}
          >
            {/* ZenGest pillar: one deep-blue column running the full height, standing proud of the card */}
            <div
              aria-hidden="true"
              className="col-start-2 row-span-full -my-8 rounded-[22px]"
              style={{ background: DEEP_BLUE, boxShadow: "0 30px 60px -20px rgba(0,18,47,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
            />

            {/* Header row */}
            <div role="row" className="contents">
              <Cellbox col="col-start-1 flex" row={row} role="columnheader" className="!justify-start !px-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400" style={{ fontFamily: MONO }}>Funzione</span>
              </Cellbox>
              <Cellbox col="col-start-2 flex" row={row} role="columnheader" className="py-5">
                <img
                  src="https://cdn.prod.website-files.com/6985ec3788addb8b6efcb94f/6985ec3788addb8b6efcba5a_3-p-500.png"
                  alt="ZenGest"
                  className="h-5 w-auto object-contain sm:h-6"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Cellbox>
              {COMPETITORS.map((c, i) => (
                <Cellbox key={c.key} col={compClass(i)} row={row} role="columnheader" className="flex-col py-5">
                  <span className="font-['DM_Sans'] text-[14px] font-bold text-[#00122F] sm:text-[15px]">{c.label}</span>
                  <span className="font-['DM_Sans'] text-[11px] text-slate-400">{c.kind}</span>
                </Cellbox>
              ))}
            </div>

            {GROUPS.map((group) => {
              const titleRow = ++row;
              return (
                <div key={group.title} className="contents">
                  {/* Group title: only in the first column, so the pillar runs through */}
                  <div role="row" className="contents">
                    <div role="rowheader" className="col-start-1 z-10 border-t border-slate-200/80 px-3 pt-5 pb-1.5" style={{ gridRow: titleRow }}>
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#0D9488]" style={{ fontFamily: MONO }}>{group.title}</span>
                    </div>
                    {COMPETITORS.map((c, i) => (
                      <div key={c.key} aria-hidden="true" className={`${compClass(i)} border-t border-slate-200/80`} style={{ gridRow: titleRow }} />
                    ))}
                  </div>
                  {group.rows.map((r) => {
                    const at = ++row;
                    const n = order++;
                    return (
                      <div key={r.label} role="row" className="group contents">
                        <div role="rowheader" className="col-start-1 z-10 flex items-center border-t border-slate-100 px-3 py-3.5 transition-colors group-hover:bg-slate-50" style={{ gridRow: at }}>
                          <span className="font-['DM_Sans'] text-[13.5px] leading-snug text-slate-700 lg:text-[15px]">{r.label}</span>
                        </div>
                        <Cellbox col="col-start-2 flex" row={at}>
                          <Mark cell={r.zengest} own order={n} />
                        </Cellbox>
                        {COMPETITORS.map((c, i) => (
                          <Cellbox key={c.key} col={compClass(i)} row={at} className="border-t border-slate-100 transition-colors group-hover:bg-slate-50">
                            <Mark cell={r[c.key]} />
                          </Cellbox>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Footer row: the trial button closes the pillar, each competitor links to its full comparison */}
            <div role="row" className="contents">
              <div className="col-start-1 z-10 flex items-center border-t border-slate-200/80 px-3 pt-5 pb-3" style={{ gridRow: TOTAL_ROWS }}>
                <span className="font-['DM_Sans'] text-[12.5px] text-slate-400">Confronto completo</span>
              </div>
              <Cellbox col="col-start-2 flex" row={TOTAL_ROWS} className="pt-5 pb-3">
                <a
                  href="https://app.zengest.it/sign-up/"
                  className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg bg-white px-2 font-['DM_Sans'] text-[11.5px] font-semibold text-[#00122F] transition-colors hover:bg-white/90 sm:px-4 sm:text-[13px]"
                >
                  Prova gratis
                </a>
              </Cellbox>
              {COMPETITORS.map((c, i) => (
                <Cellbox key={c.key} col={compClass(i)} row={TOTAL_ROWS} className="border-t border-slate-200/80 pt-5 pb-3">
                  <Link to={c.slug} className="font-['DM_Sans'] text-[12.5px] font-semibold text-[#0D9488] hover:underline">
                    Leggi <span aria-hidden="true">→</span>
                    <span className="sr-only">: ZenGest e {c.label}</span>
                  </Link>
                </Cellbox>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-['DM_Sans'] text-[12px] text-slate-500">
          <span className="flex items-center gap-2"><Mark cell="yes" /> Sì</span>
          <span className="flex items-center gap-2"><Mark cell="no" /> No</span>
          <span className="flex items-center gap-2"><Mark cell={{ partial: "Parziale" }} /> Con limiti</span>
          <span className="flex items-center gap-2"><span className="rounded-full border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-500">In arrivo</span> In sviluppo</span>
        </div>
      </div>
    </section>
  );
}
