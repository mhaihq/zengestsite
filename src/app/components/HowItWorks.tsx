'use client';

import { useEffect, useRef, useState } from "react";

const WAVEFORM = [3,6,11,16,12,8,4,12,18,14,9,5,15,20,14,10,6,14,19,13,9,5,14,18,12,8,4,11,15,9];

function CardPrima() {
  const [step, setStep] = useState(0);
  // step 0: blank lines; step 1-3: lines reveal one by one; step 4: hold; loop
  useEffect(() => {
    const seq = [800, 500, 500, 3000, 600];
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    function next() {
      i = (i + 1) % (seq.length + 1);
      setStep(i === seq.length ? 0 : i);
      t = setTimeout(next, seq[Math.min(i, seq.length - 1)]);
    }
    t = setTimeout(next, seq[0]);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-3 flex-1">
      <div className="text-center pb-2 border-b border-slate-100">
        <p className="font-['DM_Sans'] font-bold text-sm text-[#00122F]">Giovanni Rossi</p>
        <p className="font-['DM_Sans'] text-xs text-slate-400">Mercoledì, ore 10:00</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[#00122F] text-xs">✦</span>
        <p className="font-['DM_Sans'] text-xs font-semibold text-[#00122F]">Riepilogo ultima sessione</p>
      </div>
      <div className="flex flex-col gap-1.5">
        {[["w-full", 1], ["w-5/6", 2], ["w-4/6", 3]].map(([w, s]) => (
          <div
            key={s as number}
            className={`h-2 rounded-full transition-all duration-500 ${step >= (s as number) ? "bg-[#3B6FD4]" : "bg-[#D6E4F0]"}`}
            style={{ width: step >= (s as number) ? undefined : "20%", transition: "width 0.5s ease, background-color 0.3s ease" }}
          >
            <div className={`h-full rounded-full bg-[#3B6FD4] transition-all duration-700 ${w}`} style={{ opacity: step >= (s as number) ? 1 : 0 }} />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-2 border-t border-slate-100">
        <p className="font-['DM_Sans'] text-[11px] text-[#00122F]/60 mb-2">Chiedi qualsiasi cosa su questo paziente</p>
        <div className="flex items-center justify-end gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          <div className="w-6 h-6 rounded-full bg-[#00122F] flex items-center justify-center">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardDurante() {
  const frameRef = useRef(0);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function animate() {
      frameRef.current++;
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const base = WAVEFORM[i];
        const phase = (frameRef.current * 0.06 + i * 0.45);
        const scale = 0.5 + 0.5 * Math.abs(Math.sin(phase));
        bar.style.height = `${base * 1.8 * scale + 4}px`;
        bar.style.opacity = String(0.3 + 0.7 * scale);
      });
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-4 flex-1">
      <div className="text-center">
        <p className="font-['DM_Sans'] font-bold text-sm text-[#00122F]">Sessione in corso...</p>
        <p className="font-['DM_Sans'] text-xs text-slate-400">Mercoledì, ore 10:00</p>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-red-50 border border-red-100 px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="font-['DM_Sans'] text-[11px] font-semibold text-red-600">REC</span>
      </div>
      <div className="flex items-center gap-[3px] h-12 justify-center w-full">
        {WAVEFORM.map((h, i) => (
          <div
            key={i}
            ref={el => { barsRef.current[i] = el; }}
            className="rounded-full bg-[#00122F]"
            style={{ width: 2.5, height: `${h * 1.8}px`, opacity: 0.6, transition: "height 0.08s ease, opacity 0.08s ease" }}
          />
        ))}
      </div>
      <button className="w-full font-['DM_Sans'] text-xs font-medium text-[#00122F] border border-slate-200 rounded-full py-2 flex items-center justify-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00122F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Termina Sessione
      </button>
    </div>
  );
}

const NOTE_TEXT = "Seduta caratterizzata da significativa apertura emotiva. Il paziente ha esplorato il tema del distacco familiare, ricollegandolo a dinamiche già emerse nelle sessioni precedenti…";

function CardDopo() {
  const [displayed, setDisplayed] = useState("");
  const [btnPulse, setBtnPulse] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function typeNext() {
      if (indexRef.current < NOTE_TEXT.length) {
        indexRef.current++;
        setDisplayed(NOTE_TEXT.slice(0, indexRef.current));
        timerRef.current = setTimeout(typeNext, 22);
      } else {
        timerRef.current = setTimeout(() => {
          setBtnPulse(true);
          timerRef.current = setTimeout(() => {
            setBtnPulse(false);
            timerRef.current = setTimeout(() => {
              indexRef.current = 0;
              setDisplayed("");
              timerRef.current = setTimeout(typeNext, 400);
            }, 600);
          }, 800);
        }, 1200);
      }
    }
    timerRef.current = setTimeout(typeNext, 600);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-3 flex-1">
      <p className="font-['DM_Sans'] font-bold text-sm text-[#00122F]">Giovanni Rossi</p>
      <div className="flex items-center flex-wrap gap-2">
        {[{ icon: "📋", label: "Codici" }, { icon: "✉️", label: "Lettere" }, { icon: "📈", label: "Piano" }, { icon: "📄", label: "Anamnesi" }].map((t) => (
          <div key={t.label} className="flex items-center gap-1 bg-slate-50 rounded-full px-2 py-0.5 border border-slate-100">
            <span className="text-[10px]">{t.icon}</span>
            <span className="font-['DM_Sans'] text-[10px] text-[#00122F] font-medium">{t.label}</span>
          </div>
        ))}
        <div className="relative flex items-center gap-1 bg-slate-50 rounded-full px-2 py-0.5 border border-slate-100">
          <span className="text-[10px]">🧾</span>
          <span className="font-['DM_Sans'] text-[10px] text-[#00122F] font-medium">Fattura</span>
          <span className="absolute -top-2 -right-1 font-['DM_Sans'] text-[8px] font-bold bg-amber-100 text-amber-700 rounded-full px-1 py-px whitespace-nowrap leading-none">Set 2026</span>
        </div>
      </div>
      <div className="flex-1 relative">
        <p className="font-['DM_Sans'] text-[11px] text-slate-600 leading-relaxed">
          {displayed}
          <span className="inline-block w-0.5 h-3 bg-[#3B6FD4] ml-px align-middle animate-pulse" />
        </p>
      </div>
      <div className="mt-auto pt-2">
        <button
          className={`w-full font-['DM_Sans'] text-xs font-semibold text-white rounded-xl py-2.5 flex items-center justify-center gap-1.5 transition-all duration-300 ${btnPulse ? "bg-[#3B6FD4] scale-105 shadow-lg" : "bg-[#00122F]"}`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          Copia nel gestionale
        </button>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="come-funziona" className="py-24 md:py-32 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-5">
            Cartella clinica
          </div>
          <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-[-0.025em] mb-5">
            Non dimenticarti di niente: registra e <span style={{ background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ricordati di tutto.</span>
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Ogni seduta aggiunge contesto: temi ricorrenti, obiettivi aperti, cambiamenti, intuizioni, dubbi clinici.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {/* Card 1 — Prima */}
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6" style={{ minHeight: 320 }}>
              <div className="bg-[#D6E4F0] rounded-2xl p-4 h-full flex flex-col">
                <CardPrima />
              </div>
            </div>
            <h3 className="font-['Instrument_Serif'] text-2xl text-black mb-1">Prima della seduta</h3>
            <p className="font-['DM_Sans'] text-sm text-slate-400 mb-2">Trovi già il riepilogo pronto.</p>
            <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">
              Apri la scheda del paziente e ritrovi subito il contesto: ultima seduta, temi emersi, obiettivi aperti e punti da riprendere. Generato automaticamente dopo ogni seduta, senza nulla da scrivere.
            </p>
          </div>

          {/* Card 2 — Durante */}
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6" style={{ minHeight: 320 }}>
              <div className="bg-[#D6E4F0] rounded-2xl p-4 h-full flex flex-col">
                <CardDurante />
              </div>
            </div>
            <h3 className="font-['Instrument_Serif'] text-2xl text-black mb-1">Durante la seduta</h3>
            <p className="font-['DM_Sans'] text-sm text-slate-400 mb-2">ZenGest ascolta. Tu parli col paziente.</p>
            <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">
              Registra dal computer o dal telefono. ZenGest trascrive la seduta e prepara il materiale per la nota clinica. Se preferisci, puoi anche caricare un audio o dettare un riepilogo a fine seduta.
            </p>
          </div>

          {/* Card 3 — Dopo */}
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6" style={{ minHeight: 320 }}>
              <div className="bg-[#D6E4F0] rounded-2xl p-4 h-full flex flex-col">
                <CardDopo />
              </div>
            </div>
            <h3 className="font-['Instrument_Serif'] text-2xl text-black mb-1">Dopo la seduta</h3>
            <p className="font-['DM_Sans'] text-sm text-slate-400 mb-2">Nota pronta. Storico aggiornato.</p>
            <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">
              ZenGest genera una nota strutturata, aggiorna lo storico del paziente e ti permette di fare domande sul caso: cosa è cambiato, quali temi ricorrono, cosa riprendere la prossima volta.
            </p>
          </div>

        </div>

        <div className="flex justify-center">
          <a
            href="https://app.zengest.it/sign-up/"
            className="inline-flex items-center justify-center h-14 px-12 rounded-xl font-['DM_Sans'] font-semibold text-base text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
          >
            Prova gratis
          </a>
        </div>

      </div>
    </section>
  );
}
