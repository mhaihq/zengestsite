import { useEffect, useRef, useState } from "react";

const CHAT_SEQUENCE = [
  { role: "zen", text: "Seduta attiva. Come posso aiutarti con Giovanni?" },
  { role: "user", text: "Come sta rispondendo alle tecniche ACT?" },
  { role: "zen", text: "Nelle ultime tre sedute ha mostrato maggiore apertura. Il tema familiare torna spesso — è un filo conduttore ricorrente." },
  { role: "user", text: "Approfondisco il conflitto col fratello oggi?" },
  { role: "zen", text: "Ne ha parlato in quattro sedute su dodici. Hai già trascrizioni con quel contesto se vuoi rileggere prima." },
];

// Generation bar states: idle → loading → done → showing note → idle (loop)
type GenState = "loading" | "done" | "note";

export function HeroDashboard() {
  const [time, setTime] = useState("21:41");
  const [activeTab, setActiveTab] = useState<"riepilogo" | "note">("riepilogo");
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [genState, setGenState] = useState<GenState>("loading");
  const chatRef = useRef<HTMLDivElement>(null);

  const [waveHeights] = useState(() => {
    const N = 44;
    return Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1);
      const h = 0.18 + Math.sin(t * Math.PI) * 0.82 * (0.45 + Math.random() * 0.55);
      return Math.round(h * 22);
    });
  });

  // Timer
  useEffect(() => {
    let s = 21 * 60 + 41;
    const id = setInterval(() => {
      s++;
      const m = String(Math.floor(s / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      setTime(`${m}:${sec}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Generation bar loop: fill (2s) → done (1.5s) → show note (3s) → reset
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setGenState("loading");
        await delay(2400);
        if (cancelled) return;
        setGenState("done");
        await delay(1400);
        if (cancelled) return;
        setGenState("note");
        await delay(3500);
        if (cancelled) return;
      }
    };
    run();
    return () => { cancelled = true; };
  }, []);

  // Chat animation — reveal messages one by one, loop
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        for (let i = 1; i <= CHAT_SEQUENCE.length; i++) {
          if (cancelled) return;
          if (CHAT_SEQUENCE[i - 1].role === "zen") {
            setIsTyping(true);
            await delay(1200);
            if (cancelled) return;
            setIsTyping(false);
          }
          setVisibleMessages(i);
          if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
          await delay(i === CHAT_SEQUENCE.length ? 4000 : CHAT_SEQUENCE[i - 1].role === "user" ? 1000 : 1800);
        }
        await delay(800);
        setVisibleMessages(0);
        await delay(400);
      }
    };
    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleMessages, isTyping]);

  return (
    <div
      className="relative w-full mx-auto select-none"
      style={{ height: 540, maxWidth: 900 }}
    >
      {/* LEFT: Clinical notes card */}
      <div
        className="absolute z-10 bg-white rounded-2xl overflow-hidden"
        style={{
          left: 0, top: 0, width: 370,
          boxShadow: "0 1px 0 rgba(255,255,255,.6) inset, 0 0 0 1px rgba(0,18,47,.06), 0 8px 24px -8px rgba(0,18,47,.12), 0 28px 56px -20px rgba(0,18,47,.18)",
        }}
      >
        {/* Tabs */}
        <div className="flex items-center gap-0.5 px-2 pt-2 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <button
            onClick={() => setActiveTab("riepilogo")}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] rounded-t-lg transition-colors ${activeTab === "riepilogo" ? "font-semibold text-[#00122F] bg-white border border-slate-200 border-b-white -mb-px relative z-10" : "text-slate-400 hover:text-slate-600"}`}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Riepilogo seduta
          </button>
          <button
            onClick={() => setActiveTab("note")}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] rounded-t-lg transition-colors ${activeTab === "note" ? "font-semibold text-[#00122F] bg-white border border-slate-200 border-b-white -mb-px relative z-10" : "text-slate-400 hover:text-slate-600"}`}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            Note cliente
          </button>
          <div className="flex-1" />
          <span className="text-[11px] font-semibold text-[#1f9d62] px-2 pb-2 cursor-pointer">+ Nuova</span>
        </div>

        {/* Body */}
        <div className="p-4">
          {activeTab === "riepilogo" ? (
            <>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mb-3 cursor-pointer">
                Panoramica sessioni
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 mb-2">
                <span className="font-semibold text-[#00122F]">Cliente:</span>
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#cfb697] to-[#8b6c44] flex items-center justify-center text-white text-[8px] font-bold">M</div>
                <span className="text-[#00122F]">Marco Bellini <span className="text-slate-400">(44315)</span></span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-violet-50 text-violet-600">CBT</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-600">ACT</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  4 Giu 2025
                </span>
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  16:00 – 17:30 (90 min)
                </span>
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Online
                </span>
              </div>

              <div className="mb-3">
                <p className="text-[11px] font-bold text-[#00122F] mb-1">Soggettivo</p>
                <p className="text-[11px] leading-relaxed text-slate-500">Tensioni familiari e difficoltà comunicative col coniuge. Lieve resistenza verso alcune indicazioni terapeutiche.</p>
              </div>
              <div className="mb-4">
                <p className="text-[11px] font-bold text-[#00122F] mb-1">Oggettivo</p>
                <p className="text-[11px] leading-relaxed text-slate-500">Atteggiamento collaborativo. Buona alleanza terapeutica. Momenti di chiusura emotiva sul tema familiare.</p>
              </div>

              {/* Generation bar — one-shot fill, then done, then note appears */}
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
                {genState !== "note" ? (
                  <>
                    <div className="flex items-center gap-2 text-[10px] font-semibold mb-2" style={{ color: genState === "done" ? "#1f9d62" : "#00122F" }}>
                      {genState === "done" ? (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          Riepilogo generato
                        </>
                      ) : (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                          Generazione riepilogo…
                        </>
                      )}
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden relative">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                        style={{
                          background: genState === "done"
                            ? "linear-gradient(90deg, #6ee7b7 0%, #1f9d62 100%)"
                            : "linear-gradient(90deg, #A7BCF5 0%, #00122F 60%, #A7BCF5 100%)",
                          width: genState === "done" ? "100%" : "0%",
                          animation: genState === "loading" ? "barFill 2.2s ease-out forwards" : "none",
                          transition: genState === "done" ? "background 0.4s ease" : "none",
                        }}
                      >
                        {genState === "loading" && (
                          <div className="absolute inset-0" style={{
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)",
                            animation: "shimmer 1.2s linear infinite",
                          }} />
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ animation: "fadeSlideIn 0.4s ease forwards" }}>
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-[#1f9d62] mb-2">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Riepilogo pronto
                    </div>
                    <p className="text-[10.5px] leading-relaxed text-slate-500 italic">
                      "Marco ha mostrato apertura ma resistenza sul tema coniugale. Alleanza solida. Il pattern comunicativo con il coniuge ricorre dalla seduta 7."
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="text-[11px] font-bold text-[#00122F] mb-3">Note del terapeuta</p>
              <div className="flex flex-col gap-3">
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5">
                  <p className="text-[10px] font-bold text-amber-700 mb-1">02 Giu 2025</p>
                  <p className="text-[11px] leading-relaxed text-slate-600">Paziente mostra progressi nell'identificazione dei pattern cognitivi distorsivi. Esercizio di ristrutturazione cognitiva completato.</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">28 Mag 2025</p>
                  <p className="text-[11px] leading-relaxed text-slate-600">Discusso obiettivi a medio termine. Marco ha espresso disponibilità a provare tecniche di mindfulness tra le sessioni.</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">21 Mag 2025</p>
                  <p className="text-[11px] leading-relaxed text-slate-600">Prima seduta con la nuova modalità ibrida. Buona risposta al setting online. Alleanza terapeutica solida.</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Radial glow behind portrait */}
      <div
        className="absolute pointer-events-none z-[14]"
        style={{
          left: "50%", top: -40,
          width: 480, height: 480,
          transform: "translateX(-50%)",
          background: "radial-gradient(closest-side, rgba(167,188,245,0.35), transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* CENTER: Portrait — circle, contained, centered */}
      <div
        className="absolute z-[15]"
        style={{
          left: "50%",
          top: 30,
          transform: "translateX(-50%)",
          width: 280,
          height: 280,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src="/portrait.png"
          alt="Psicologa"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 10%",
            display: "block",
          }}
        />
      </div>

      {/* CENTER: Recorder card */}
      <div
        className="absolute z-20 bg-white rounded-2xl text-center"
        style={{
          left: "50%", bottom: 20, transform: "translateX(-50%)", width: 240,
          padding: "14px 18px 16px",
          boxShadow: "0 1px 0 rgba(255,255,255,.6) inset, 0 0 0 1px rgba(0,18,47,.06), 0 12px 32px -10px rgba(0,18,47,.16), 0 36px 72px -28px rgba(0,18,47,.22)",
        }}
      >
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium mb-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Le note AI sono <strong className="text-[#00122F]">ATTIVE</strong>
        </div>
        <div className="font-['DM_Sans'] font-bold text-4xl tracking-tight text-[#00122F] tabular-nums my-2">
          {time}
        </div>
        <div className="flex items-center justify-center gap-[2px] h-6 mb-3 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)" }}>
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="rounded-full bg-[#00122F]"
              style={{
                width: 2,
                height: h,
                opacity: Math.abs(i - waveHeights.length / 2) < 6 ? 0.9 : 0.35,
                animation: `wave ${(0.85 + (i % 7) * 0.12).toFixed(2)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.04).toFixed(2)}s`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          </button>
          <button className="flex items-center gap-1.5 px-4 h-8 rounded-full border border-slate-200 text-[11px] font-semibold text-[#00122F] hover:bg-slate-50 transition-colors">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>
            Termina
          </button>
        </div>
      </div>

      {/* RIGHT: AI chat card */}
      <div
        className="absolute z-10 bg-white rounded-2xl flex flex-col overflow-hidden"
        style={{
          right: 0, top: 0, width: 280, height: 480,
          boxShadow: "0 1px 0 rgba(255,255,255,.6) inset, 0 0 0 1px rgba(0,18,47,.06), 0 8px 24px -8px rgba(0,18,47,.12), 0 28px 56px -20px rgba(0,18,47,.18)",
        }}
      >
        {/* Patient header — face avatar */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-slate-100">
          <div
            className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-[13px] font-bold"
            style={{ background: "linear-gradient(135deg, #7ba7d4 0%, #3a6ea5 100%)" }}
          >
            G
          </div>
          <div>
            <div className="text-[12px] font-bold text-[#00122F]">Giovanni Rossi</div>
            <div className="text-[9.5px] text-slate-400">Cartella clinica n#8629</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 border-b border-slate-100">
          {[["ETÀ", "34 anni"], ["SEDUTA", "12ª"]].map(([k, v]) => (
            <div key={k} className="text-center py-2 border-r border-slate-50 last:border-r-0">
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">{k}</div>
              <div className="text-[11px] font-bold text-[#00122F]">{v}</div>
            </div>
          ))}
        </div>

        {/* Chat label */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-50">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#A7BCF5"><path d="M12 2l2.39 6.96L22 10l-5.5 4.78L18.18 22 12 18.27 5.82 22 7.5 14.78 2 10l7.61-1.04z"/></svg>
          <span className="text-[11px] font-bold text-[#00122F]">Zen AI</span>
          <span className="ml-auto text-[9px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">ATTIVO</span>
        </div>

        {/* Messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-2.5 flex flex-col gap-2.5" style={{ scrollbarWidth: "none" }}>
          {CHAT_SEQUENCE.slice(0, visibleMessages).map((msg, i) => (
            <div
              key={i}
              className={`flex gap-1.5 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              style={{ animation: "fadeSlideIn 0.3s ease forwards" }}
            >
              <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[8px] font-bold text-white ${msg.role === "zen" ? "bg-gradient-to-br from-[#A7BCF5] to-[#00122F]" : "bg-gradient-to-br from-[#cfb697] to-[#8b6c44]"}`}>
                {msg.role === "zen" ? "Z" : "DR"}
              </div>
              <div className={`max-w-[180px] px-2.5 py-1.5 text-[10.5px] leading-relaxed ${
                msg.role === "zen"
                  ? "bg-slate-100 text-slate-600 rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl"
                  : "bg-[#00122F] text-white rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-xl"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-1.5 items-end" style={{ animation: "fadeSlideIn 0.2s ease forwards" }}>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#A7BCF5] to-[#00122F] flex items-center justify-center text-[8px] font-bold text-white shrink-0">Z</div>
              <div className="bg-slate-100 px-3 py-2 rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl flex gap-1 items-center">
                {[0, 0.18, 0.36].map((d, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" style={{ animation: "typingDot 1s ease-in-out infinite", animationDelay: `${d}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-slate-100 px-2.5 py-2">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
            <input className="flex-1 text-[11px] bg-transparent outline-none text-[#00122F] placeholder:text-slate-400 font-['DM_Sans']" placeholder="Chiedi a Zen…" readOnly />
            <button className="w-6 h-6 rounded-full bg-[#00122F] flex items-center justify-center shrink-0">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
          <p className="text-center text-[8px] tracking-widest uppercase text-slate-300 font-semibold mt-1.5">AI Assistant · Zen</p>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes barFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}
