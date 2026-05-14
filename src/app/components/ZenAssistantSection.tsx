"use client";
import React, { useState, useEffect, useRef } from "react";

type Message = { from: "user" | "zen"; text: string };
type Tab = {
  id: string;
  label: string;
  sublabel: string;
  userPrompt: string;
  example: string;
  messages: Message[];
};

const ICONS: Record<string, React.ReactNode> = {
  prepara: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  approfondisci: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  adatta: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  bozza: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
};

const TABS: Tab[] = [
  {
    id: "prepara",
    label: "Prepara una seduta",
    sublabel: "Recupera il contesto del paziente prima dell'incontro.",
    userPrompt: "Preparami la prossima seduta con Marco.",
    example: "Preparami la prossima seduta con Marco.",
    messages: [
      { from: "user", text: "Preparami la prossima seduta con Marco." },
      {
        from: "zen",
        text: "Nell'ultima seduta sono emersi ansia anticipatoria, conflitto lavorativo e difficoltà nel sonno.\n\nPotrebbe essere utile riprendere l'esercizio assegnato e verificare se ci sono stati episodi di evitamento durante la settimana.\n\nVuoi che prepari uno schema per la seduta?",
      },
    ],
  },
  {
    id: "approfondisci",
    label: "Approfondisci il caso",
    sublabel: "Individua pattern, temi ricorrenti e aspetti da monitorare.",
    userPrompt: "Quali temi ricorrono nelle ultime sedute?",
    example: "Quali temi ricorrono nelle ultime sedute?",
    messages: [
      { from: "user", text: "Quali temi ricorrono nelle ultime sedute?" },
      {
        from: "zen",
        text: "Nelle ultime sedute emergono tre aree ricorrenti:\n\n• Evitamento nelle situazioni lavorative\n• Anticipazione negativa del giudizio\n• Difficoltà nella regolazione emotiva dopo momenti di stress\n\nQueste aree appaiono collegate e si rinforzano a vicenda. Vuoi approfondire una di queste?",
      },
    ],
  },
  {
    id: "adatta",
    label: "Adatta al tuo metodo",
    sublabel: "Organizza note e sintesi secondo il tuo modello clinico.",
    userPrompt: "Riorganizza questa nota secondo il mio modello clinico.",
    example: "Riorganizza questa nota secondo il mio modello clinico.",
    messages: [
      { from: "user", text: "Riorganizza questa nota secondo il mio modello clinico." },
      {
        from: "zen",
        text: "Ho riorganizzato la nota evidenziando:\n\n• Temi principali\n• Ipotesi cliniche\n• Interventi effettuati\n• Risorse del paziente\n• Obiettivi terapeutici\n• Punti da riprendere\n\nCompatibile con: EMDR, sistemico, ACT, terapia familiare, modelli personalizzati.",
      },
    ],
  },
  {
    id: "bozza",
    label: "Crea una bozza clinica",
    sublabel: "Genera materiali modificabili prima di salvarli o esportarli.",
    userPrompt: "Crea una sintesi del percorso.",
    example: "Crea una sintesi del percorso.",
    messages: [
      { from: "user", text: "Crea una sintesi del percorso." },
      {
        from: "zen",
        text: "Ho preparato una bozza modificabile con:\n\n• Anamnesi rilevante\n• Andamento del percorso\n• Temi principali emersi\n• Obiettivi terapeutici\n• Indicazioni per il lavoro futuro\n\nPuoi modificarla, esportarla o salvarla direttamente in cartella.",
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
      if (i.current >= text.length) { clearInterval(id); onDone(); }
    }, 10);
    return () => clearInterval(id);
  }, [text]);

  return <span className="whitespace-pre-wrap">{displayed}</span>;
}

export function ZenAssistantSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const tab = TABS[activeTab];

  useEffect(() => {
    setVisibleCount(0);
    const t = setTimeout(() => showNext(0), 300);
    return () => clearTimeout(t);
  }, [activeTab]);

  function showNext(count: number) {
    const next = count + 1;
    if (next > tab.messages.length) return;
    setVisibleCount(next);
    if (tab.messages[next - 1].from === "user") {
      setTimeout(() => showNext(next), 700);
    }
  }

  function handleZenDone(idx: number) {
    setTimeout(() => showNext(idx + 1), 500);
  }

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleCount]);

  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="font-['DM_Sans'] text-sm font-semibold text-[#3B6FD4]">Zen AI</span>
            <span className="font-['DM_Sans'] text-xs border border-slate-300 text-slate-400 rounded-full px-2.5 py-0.5">Beta</span>
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Non una chat generica.<br className="hidden md:block" /> <span style={{ background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Un assistente clinico.</span>
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-2">
            Zen usa note, trascrizioni, riepiloghi e modelli terapeutici per aiutarti a preparare le sedute, leggere il percorso del paziente, adattare il materiale al tuo metodo e creare bozze cliniche modificabili.
          </p>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Senza perdere tempo in documentazione. E alla fine della seduta, ti fa la fattura in automatico.
          </p>
          <p className="font-['DM_Sans'] text-sm text-slate-400 leading-relaxed max-w-xl mx-auto mt-4 italic">
            Non hai studiato per diventare psicologo, non per fare il commercialista.
          </p>
        </div>

        {/* Tab selector — 4 cards above the chat */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(i)}
              className={[
                "group text-left rounded-2xl border p-4 transition-all duration-200",
                i === activeTab
                  ? "border-[#3B6FD4] bg-[#F0F5FF] shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
              ].join(" ")}
            >
              <div className={`mb-3 ${i === activeTab ? "text-[#3B6FD4]" : "text-slate-400"}`}>
                {ICONS[t.id]}
              </div>
              <p className={`font-['DM_Sans'] text-sm font-semibold leading-tight mb-1 ${i === activeTab ? "text-[#00122F]" : "text-slate-700"}`}>
                {t.label}
              </p>
              <p className="font-['DM_Sans'] text-[11px] text-slate-400 leading-snug hidden md:block">
                {t.sublabel}
              </p>
              {i === activeTab && (
                <div className="mt-2 w-4 h-0.5 rounded-full bg-[#3B6FD4]" />
              )}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">

          {/* Chat area */}
          <div
            ref={chatRef}
            className="bg-slate-50 px-4 sm:px-6 py-5 flex flex-col gap-4 overflow-y-auto"
            style={{ minHeight: 260, maxHeight: 380, scrollbarWidth: "none" }}
          >
            {tab.messages.slice(0, visibleCount).map((msg, idx) => (
              <div
                key={`${activeTab}-${idx}`}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start items-start gap-2.5"}`}
                style={{ animation: "fadeSlideIn 0.2s ease forwards" }}
              >
                {msg.from === "zen" && (
                  <div className="w-7 h-7 rounded-full bg-[#3B6FD4] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-['Instrument_Serif'] text-white text-xs">Z</span>
                  </div>
                )}
                <div className={[
                  "max-w-[80%] rounded-2xl px-4 py-3 font-['DM_Sans'] text-sm leading-relaxed",
                  msg.from === "user"
                    ? "bg-[#00122F] text-white rounded-tr-sm"
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm",
                ].join(" ")}>
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
              <span className="flex-1 font-['DM_Sans'] text-sm text-slate-400 truncate">{tab.example}</span>
              <div className="w-6 h-6 rounded-full bg-[#00122F] flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="https://app.zengest.it/sign-up/"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg font-['DM_Sans'] font-semibold text-sm text-[#00122F] border border-[#00122F]/20 hover:bg-slate-50 transition-colors"
          >
            Prova gratis
          </a>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
