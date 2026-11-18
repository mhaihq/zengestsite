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

function Cta({ to, more }: { to: string; more: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-['DM_Sans']">
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
    <section id="come-funziona" className={`${SHEET} z-10 scroll-mt-20 bg-white px-6 pt-24 pb-28 md:pt-32 md:pb-36`}>
      <div className="mx-auto max-w-[1080px]">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>Dalla seduta alla fattura</Eyebrow>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Tu ascolti.<br />
            <span style={G}>Alla nota pensa ZenGest.</span>
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-[52ch]">
            Registri la seduta, ZenGest la trascrive e prepara la bozza di nota clinica. Tu la rivedi, e la fattura parte dallo stesso posto.
          </p>
          <Cta to="/note-cliniche-ai" more="Come funzionano le note cliniche AI" />
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

// Side-column cards: background only, they don't answer the chips.
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
const EDGE_FADE =
  "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent), linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)";
const WALL_MESSAGES = [...QUESTIONS.map((it) => it.a), ...SIDE];
const WALL_FONT = '"DM Sans", system-ui, sans-serif';

export function AskZenSection() {
  // -1 = a side card is in the centre: no question highlighted
  const [i, setI] = useState(0);
  const item = i >= 0 ? QUESTIONS[i] : null;
  const onSelect = useCallback((idx: number) => setI(idx < QUESTIONS.length ? idx : -1), []);

  return (
    <section className={`${SHEET} overflow-hidden bg-slate-50 px-6 pt-24 pb-28 md:pt-32 md:pb-40`}>
      <div className="mx-auto max-w-[1080px] font-['DM_Sans']">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>Assistente Zen</Eyebrow>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Chiedi quello che di solito <span style={G}>cercheresti a mano.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-[52ch]">
            L'Assistente Zen lavora sullo storico del paziente che selezioni: sedute, note, contesto e documenti. Prova una domanda.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Domande di esempio">
            {QUESTIONS.map((it, idx) => (
              <button
                key={it.q}
                type="button"
                onClick={() => setI(idx)}
                aria-pressed={i === idx}
                className="rounded-2xl border px-4 py-2.5 text-left text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
                style={i === idx ? { background: NAVY, borderColor: NAVY, color: "#fff" } : { background: "#fff", borderColor: "rgba(0,18,47,0.14)", color: "#334155" }}
              >
                {it.q}
              </button>
            ))}
          </div>
        </div>

        {/* Only the cards, no panel: the edges fade into the section */}
        <div className="relative h-[500px] md:h-[600px]" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}>
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
        <p className="mt-5 flex min-h-[1.5em] flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-center text-xs text-slate-400">
          {item ? <span className="text-slate-500">{item.source}</span> : null}
          <span>Esempio illustrativo: paziente e risposte sono inventati.</span>
        </p>
        <p className="mt-2 mb-8 text-center text-xs text-slate-400">Un supporto, non una diagnosi: ogni valutazione clinica resta tua.</p>
        <Cta to="/assistente-ai" more="Scopri l'Assistente Zen" />
      </div>
    </section>
  );
}
