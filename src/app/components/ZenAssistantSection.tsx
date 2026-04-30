"use client";
import { useState, useEffect, useRef } from "react";

type Message = { from: "user" | "zen"; text: string };

type Tab = {
  id: string;
  label: string;
  userPrompt: string;
  messages: Message[];
};

const TABS: Tab[] = [
  {
    id: "start",
    label: "Inizio giornata",
    userPrompt: "Preparami la giornata",
    messages: [
      { from: "zen", text: "Buongiorno. Come posso aiutarti oggi?" },
      { from: "user", text: "Preparami la giornata" },
      {
        from: "zen",
        text: "Hai 3 sedute oggi.\n\n10:00 — Marco B.\nTemi aperti: conflitto lavorativo, ansia anticipatoria. Ultima seduta: ha completato l'esercizio di ristrutturazione cognitiva.\n\n14:30 — Giulia R. (nuova paziente)\nPrima seduta. Anamnesi da completare.\n\n16:00 — Luca F.\nUltima seduta 3 settimane fa. Ha accennato a difficoltà col sonno.",
      },
    ],
  },
  {
    id: "checkin",
    label: "Tra le sedute",
    userPrompt: "Prepara la prossima seduta",
    messages: [
      { from: "user", text: "Prepara la prossima seduta" },
      {
        from: "zen",
        text: "Prossima seduta: Giulia R. alle 14:30.\n\nÈ la prima seduta. Non ci sono note precedenti.\n\nPunti da tenere presenti: raccogliere l'anamnesi, chiarire la richiesta, definire la frequenza degli incontri.\n\nVuoi che prepari uno schema per la prima seduta?",
      },
      { from: "user", text: "Sì, preparalo" },
      {
        from: "zen",
        text: "Schema prima seduta — Giulia R.\n\n1. Presentazione e setting\n2. Motivo della richiesta\n3. Storia clinica essenziale\n4. Obiettivi del percorso\n5. Accordo su frequenza e metodo\n\nHo salvato lo schema nella scheda paziente.",
      },
    ],
  },
  {
    id: "after",
    label: "Dopo la seduta",
    userPrompt: "Genera la nota di Marco",
    messages: [
      { from: "user", text: "Genera la nota della seduta di Marco" },
      {
        from: "zen",
        text: "Nota clinica — Marco B. — 29 aprile 2026\n\nS: Il paziente riferisce riduzione dell'ansia anticipatoria rispetto alla settimana precedente. Riporta un confronto con il responsabile che descrive come «meno pesante del previsto».\n\nO: Atteggiamento collaborativo. Buona presenza emotiva. Nessun segnale di evitamento.\n\nA: Progressi nell'esposizione graduata al contesto lavorativo.\n\nP: Continuare con il diario degli episodi ansiosi. Approfondire la relazione con il responsabile nella prossima seduta.",
      },
      { from: "user", text: "Salva e aggiorna lo storico" },
      { from: "zen", text: "Nota salvata. Storico di Marco aggiornato. Il riepilogo per la prossima seduta è già pronto." },
    ],
  },
  {
    id: "end",
    label: "Fine giornata",
    userPrompt: "Cosa è rimasto in sospeso?",
    messages: [
      { from: "user", text: "Cosa è rimasto in sospeso oggi?" },
      {
        from: "zen",
        text: "3 elementi aperti:\n\n• Giulia R. — anamnesi non ancora completata\n• Luca F. — nota della seduta delle 16:00 non ancora generata\n• Marco B. — ha chiesto di spostare la prossima seduta, nessuna risposta ancora inviata",
      },
      { from: "user", text: "Genera la nota di Luca" },
      {
        from: "zen",
        text: "Nota clinica — Luca F. — 29 aprile 2026\n\nS: Il paziente riferisce difficoltà nel sonno persistenti, con risvegli notturni frequenti. Collega il problema allo stress lavorativo delle ultime settimane.\n\nO: Tono dell'umore lievemente deflesso. Collaborativo e aperto al dialogo.\n\nA: Pattern di iperattivazione coerente con ansia da prestazione.\n\nP: Introdurre igiene del sonno nella prossima seduta. Assegnare diario del sonno per la settimana.",
      },
    ],
  },
];

function AnimatedMessage({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const i = useRef(0);

  useEffect(() => {
    i.current = 0;
    setDisplayed("");
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i.current + 1));
      i.current++;
      if (i.current >= text.length) {
        clearInterval(id);
        onDone();
      }
    }, 12);
    return () => clearInterval(id);
  }, [text]);

  return <span className="whitespace-pre-wrap">{displayed}</span>;
}

export function ZenAssistantSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const tab = TABS[activeTab];

  useEffect(() => {
    setVisibleCount(0);
    setAnimating(false);
    const t = setTimeout(() => showNext(0), 400);
    return () => clearTimeout(t);
  }, [activeTab]);

  function showNext(count: number) {
    const next = count + 1;
    if (next > tab.messages.length) return;
    setVisibleCount(next);
    if (tab.messages[next - 1].from === "user") {
      setTimeout(() => showNext(next), 800);
    }
    // zen messages wait for animation to finish (handled by onDone)
  }

  function handleZenDone(idx: number) {
    setTimeout(() => showNext(idx + 1), 600);
  }

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleCount]);

  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="font-['DM_Sans'] text-sm font-semibold text-[#3B6FD4]">Zen AI</span>
            <span className="font-['DM_Sans'] text-xs border border-slate-300 text-slate-400 rounded-full px-2.5 py-0.5">Beta</span>
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Chiedi. Zen lo fa.
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
            Dal riepilogo del mattino alla nota di fine giornata — Zen lavora sul contesto reale dei tuoi pazienti, non su prompt generici.
          </p>
        </div>

        {/* Tab card */}
        <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">

          {/* Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(i)}
                className={[
                  "font-['DM_Sans'] text-xs md:text-sm font-medium py-3.5 px-2 transition-colors border-b-2 -mb-px",
                  i === activeTab
                    ? "text-[#00122F] border-[#3B6FD4] bg-slate-50"
                    : "text-slate-400 border-transparent hover:text-slate-600",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="bg-slate-50 px-3 sm:px-5 py-4 sm:py-5 flex flex-col gap-3 sm:gap-4 overflow-y-auto"
            style={{ minHeight: 280, maxHeight: 400, scrollbarWidth: "none" }}
          >
            {tab.messages.slice(0, visibleCount).map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start items-start gap-2.5"}`}
                style={{ animation: "fadeSlideIn 0.25s ease forwards" }}
              >
                {msg.from === "zen" && (
                  <div className="w-7 h-7 rounded-full bg-[#3B6FD4] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-['Instrument_Serif'] text-white text-xs">Z</span>
                  </div>
                )}
                <div
                  className={[
                    "max-w-[80%] rounded-2xl px-4 py-2.5 font-['DM_Sans'] text-sm leading-relaxed",
                    msg.from === "user"
                      ? "bg-[#00122F] text-white rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm",
                  ].join(" ")}
                >
                  {msg.from === "zen" && idx === visibleCount - 1 ? (
                    <AnimatedMessage text={msg.text} onDone={() => handleZenDone(idx)} />
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div className="border-t border-slate-200 px-4 py-3 bg-white">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <span className="flex-1 font-['DM_Sans'] text-sm text-slate-400">
                {tab.userPrompt}
              </span>
              <div className="w-6 h-6 rounded-full bg-[#00122F] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Discover more */}
        <div className="flex justify-center mt-10">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg font-['DM_Sans'] font-semibold text-sm text-[#00122F] border border-[#00122F]/20 hover:bg-slate-50 transition-colors"
          >
            Richiedi accesso anticipato
          </a>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
