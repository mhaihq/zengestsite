import { useCallback, useState } from "react";
import { Link } from "react-router";
import { SessionFilm } from "./SessionFilm";
import { AssistantWall } from "./ui/assistant-wall";
import { SHEET } from "./ui/deep-blue";

// Two homepage sections ported from the Unozen site (unozen.ai): the product
// "film" that follows one session from recording to invoice, and the Assistente
// Zen wall of example questions. Patient and answers are invented.

const SIGN_UP = "https://app.zengest.it/sign-up/";
const NAVY = "#00122F";
const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" } as const;

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-5">
      {children}
    </div>
  );
}

function Cta({ to, more, className = "" }: { to: string; more: string; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 font-['DM_Sans'] ${className}`}>
      <a href={SIGN_UP} className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#00122F] text-white text-sm font-semibold hover:bg-[#00122F]/90 transition-colors shadow-md">
        Prova gratis
      </a>
      <Link to={to} className="text-sm font-medium text-[#0D9488] hover:underline">
        {more} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/* ───────────────────────── Dashboard: una seduta, dall'inizio alla fattura ───────────────────────── */

export function SessionFilmSection() {
  return (
    <section id="come-funziona" className={`${SHEET} z-10 scroll-mt-20 bg-white px-4 pt-24 pb-28 sm:px-6 md:pt-32 md:pb-36`}>
      <div className="mx-auto max-w-[1200px]">
        {/* Headline on the left, the one-line pitch and the button on the right: the film does the talking */}
        <div className="mb-10 grid gap-6 px-2 md:mb-14 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-12">
          <div>
            <Eyebrow>Dalla seduta alla fattura</Eyebrow>
            <h2 className="font-['Instrument_Serif'] text-[2.75rem] md:text-6xl lg:text-7xl text-[#00122F] leading-[1.02] tracking-[-0.03em]">
              Tu ascolti.<br />
              <span style={G}>Alla nota pensa ZenGest.</span>
            </h2>
          </div>
          <div className="md:pb-3">
            <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed mb-6 max-w-[44ch]">
              Registri la seduta, ZenGest la trascrive e prepara la bozza di nota clinica. Tu la rivedi, e la fattura parte dallo stesso posto.
            </p>
            <Cta to="/note-cliniche-ai" more="Come funzionano le note" />
          </div>
        </div>
        <SessionFilm />
      </div>
    </section>
  );
}

/* ───────────────────────── Assistente Zen ───────────────────────── */

// The answers sit on a wall card: short, six lines at most.
const QUESTIONS = [
  {
    q: "Su cosa eravamo rimasti?",
    a: "Seduta 13: la critica in riunione e il ritorno dell’ansia. Avevate concordato la respirazione prima delle riunioni.",
    source: "Dalla nota della seduta n. 13",
  },
  {
    q: "Quali temi ricorrenti emergono?",
    a: "Perfezionismo sul lavoro, in 9 sedute su 13. Paura del giudizio dei colleghi. Fatica a staccare la sera, in calo.",
    source: "Dallo storico delle sedute",
  },
  {
    q: "Scrivi una relazione per il medico curante",
    a: "Bozza pronta come documento. La apri, la correggi e la esporti in PDF o Word.",
    source: "Dalle note e dal contesto clinico",
  },
  {
    q: "Cosa dovrei tenere presente oggi?",
    a: "Chiedi della riunione di lunedì: era ciò che temeva di più. E del diario dei pensieri, dimenticato a casa.",
    source: "Dalla preparazione della seduta",
  },
];

// Side-column cards: background only, they don't answer the questions.
const SIDE = [
  "Nelle ultime tre sedute l’umore è in miglioramento.",
  "Ho trovato due sedute in cui parla del padre.",
  "Dall’ultima nota: riprendere il tema del sonno.",
  "Obiettivo concordato: dormire almeno sei ore.",
  "Compito aperto: diario dei pensieri, tre sere a settimana.",
  "In chiave CBT: il pensiero «devo essere perfetta» da mettere alla prova.",
  "Nel referto caricato non risultano terapie farmacologiche in corso.",
  "La bozza del riepilogo del percorso è tra i documenti.",
];

const WALL = { background: "#1E3A7A", glow: "#EAF0FB", haze: "#7F9BE0", glass: "#8FA6DA" };
const WALL_MESSAGES = [...QUESTIONS.map((it) => it.a), ...SIDE];
const WALL_FONT = '"DM Sans", system-ui, sans-serif';

// A light wash that picks up the hero's blue and gold, so the full-screen wall has air around it.
const ASK_BG = [
  "radial-gradient(55% 60% at 88% 16%, rgba(167,188,245,0.55) 0%, transparent 62%)",
  "radial-gradient(50% 55% at 100% 94%, rgba(247,214,140,0.42) 0%, transparent 64%)",
  "radial-gradient(45% 50% at 0% 100%, rgba(122,155,232,0.22) 0%, transparent 60%)",
  "#F8FAFC",
].join(", ");

// The wall fills the screen. On phones it fades at the edges; on desktop it also
// dissolves towards the left, under the text column.
const ASK_CSS = `
.ask-wall{-webkit-mask-image:linear-gradient(to bottom,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 12%,#000 88%,transparent)}
@media (min-width:1024px){.ask-wall{-webkit-mask-image:linear-gradient(to right,transparent 15%,#000 36%),linear-gradient(to bottom,transparent 2%,#000 16%,#000 86%,transparent 99%);mask-image:linear-gradient(to right,transparent 15%,#000 36%),linear-gradient(to bottom,transparent 2%,#000 16%,#000 86%,transparent 99%);-webkit-mask-composite:source-in;mask-composite:intersect}}
`;

export function AskZenSection() {
  // -1 = a side card is in the centre: no question highlighted
  const [i, setI] = useState(0);
  const item = i >= 0 ? QUESTIONS[i] : null;
  const onSelect = useCallback((idx: number) => setI(idx < QUESTIONS.length ? idx : -1), []);

  const notes = (
    <>
      <p className="flex min-h-[1.5em] flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-slate-400">
        {item ? <span className="font-medium text-slate-600">{item.source}</span> : null}
        <span>Esempio illustrativo: paziente e risposte sono inventati.</span>
      </p>
      <p className="mt-1.5 text-xs text-slate-400">Un supporto, non una diagnosi: ogni valutazione clinica resta tua.</p>
    </>
  );

  return (
    <section className={`${SHEET} overflow-hidden font-['DM_Sans']`} style={{ background: ASK_BG }}>
      <style>{ASK_CSS}</style>

      <div className="pointer-events-none relative z-10 mx-auto max-w-[1200px] px-6 lg:flex lg:min-h-[100svh] lg:items-center">
        <div className="pointer-events-auto pt-24 pb-6 lg:max-w-[26rem] lg:pt-28 lg:pb-20 xl:max-w-[30rem]">
          <Eyebrow>Assistente Zen</Eyebrow>
          <h2 className="font-['Instrument_Serif'] text-[2.75rem] md:text-5xl lg:text-[2.7rem] xl:text-[2.9rem] text-[#00122F] leading-[1.04] tracking-[-0.03em] mb-5">
            Chiedi quello che di solito <br className="hidden xl:block" /><span style={G}>cercheresti a mano.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-7">
            L'Assistente Zen lavora sullo storico del paziente che selezioni: sedute, note, contesto e documenti. Prova una domanda.
          </p>
          <div className="flex flex-wrap gap-2.5 lg:flex-col lg:flex-nowrap lg:gap-2" role="group" aria-label="Domande di esempio">
            {QUESTIONS.map((it, idx) => {
              const on = i === idx;
              return (
                <button
                  key={it.q}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-pressed={on}
                  className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] lg:py-3"
                  style={on ? { background: NAVY, borderColor: NAVY, color: "#fff" } : { background: "rgba(255,255,255,0.85)", borderColor: "rgba(0,18,47,0.12)", color: "#334155" }}
                >
                  <span>{it.q}</span>
                  <span aria-hidden="true" className={`hidden lg:inline transition-opacity ${on ? "opacity-100" : "opacity-30"}`}>→</span>
                </button>
              );
            })}
          </div>
          <div className="mt-7 hidden lg:block">
            {notes}
            <Cta to="/assistente-ai" more="Scopri l'Assistente Zen" className="mt-7" />
          </div>
        </div>
      </div>

      {/* The wall: the rest of the screen on desktop, a tall band on phones */}
      <div className="ask-wall relative h-[78svh] min-h-[520px] lg:absolute lg:inset-y-0 lg:left-[32%] lg:right-[-12%] lg:h-auto lg:min-h-0">
        <AssistantWall
          decorative
          backdrop={false}
          messages={WALL_MESSAGES}
          focusIndex={i}
          onSelect={onSelect}
          interval={8}
          placeholder="Scrivi o parla…"
          badge="zen"
          font={WALL_FONT}
          background={WALL.background}
          glow={WALL.glow}
          haze={WALL.haze}
          glass={WALL.glass}
          accent={NAVY}
          text="#F4F7FD"
          style={{ minHeight: 0 }}
        />
      </div>

      {/* The centre answer, also for those who can't see the wall */}
      <p className="sr-only" aria-live="polite">{item ? `${item.q} ${item.a}` : ""}</p>

      <div className="relative z-10 px-6 pt-5 pb-28 text-center lg:hidden">
        <div className="flex flex-col items-center">{notes}</div>
        <Cta to="/assistente-ai" more="Scopri l'Assistente Zen" className="mt-7 justify-center" />
      </div>
    </section>
  );
}
