'use client';

import { useEffect, useRef } from "react";

const FIELDS = [
  { id: "f-num",    label: "Fattura n.",          val: "2026/047",          mono: false },
  { id: "f-date",   label: null,                   val: "03 maggio 2026",    mono: false },
  { id: "f-client", label: "Cliente",              val: "Maria Rossi",       mono: false },
  { id: "f-cf",     label: "Codice fiscale",       val: "RSSMRA85T10A562S",  mono: true  },
  { id: "f-import", label: "Prestazione sanitaria",val: "€80,00",            mono: false },
  { id: "f-iva",    label: "IVA esente · art. 10", val: "N2.2",              mono: false },
  { id: "f-bollo",  label: "Marca da bollo",       val: "€2,00 assolto",     mono: false },
];

const APPS = [
  { key: "excel", color: "#1a7e3e", abbr: "X",   name: "Excel Sedute.xlsx",           detail: "Riga 247 da compilare manualmente",  badge: "In sospeso", badgeType: "warn", notif: "!" },
  { key: "aruba", color: "#ff6b35", abbr: "A",   name: "Aruba Crea fattura",          detail: "12 campi, codice fiscale, marca da bollo…", badge: "Bozza", badgeType: "warn", notif: "!" },
  { key: "sdi",   color: "#003d80", abbr: "SDI", name: "Sistema di Interscambio",       detail: "Errore: codice natura non valido (N2.1)", badge: "Scartata", badgeType: "err", notif: "3" },
  { key: "ts",    color: "#c8102e", abbr: "TS",  name: "Sistema TS 730",              detail: "Carica spesa sanitaria · scadenza domani", badge: "Da fare", badgeType: "warn", notif: "!" },
  { key: "email", color: "#4a90e2", abbr: "@",   name: "Email commercialista@studio.it", detail: '"Mi mandi il riepilogo del mese?"', badge: "Risposta", badgeType: "warn", notif: "!" },
  { key: "bank",  color: "#2db84a", abbr: "€",   name: "Home banking",                 detail: "Verifica bonifico · 4 sospesi",       badge: "Manuale", badgeType: "warn", notif: "4" },
];

const STATUS_ROWS = [
  { key: "sdi",  label: "Inviata al Sistema di Interscambio", meta: "SDI" },
  { key: "ts",   label: "Trasmessa a Tessera Sanitaria",      meta: "730" },
  { key: "paid", label: "Pagamento ricevuto",                 meta: "€80,00" },
];

export function FatturazioneSection() {
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function tt(fn: () => void, ms: number) {
    timersRef.current.push(setTimeout(fn, ms));
  }

  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  useEffect(() => {
    let chaosTime = 0;

    function chaosStep(appKey: string) {
      const row = document.querySelector<HTMLElement>(`.fattRow[data-app="${appKey}"]`);
      if (!row) return;
      row.classList.add("shaking");
      const dot = row.querySelector<HTMLElement>(".notifDot");
      if (dot) dot.classList.add("show");
      tt(() => row.classList.remove("shaking"), 500);
    }

    function chaosLoop() {
      document.querySelectorAll(".notifDot").forEach(d => d.classList.remove("show"));
      APPS.forEach((app, i) => { tt(() => chaosStep(app.key), 400 + i * 700); });
      tt(() => {
        chaosTime++;
        const el = document.getElementById("timer-prima");
        if (el) el.textContent = `~${22 + chaosTime} min`;
      }, 2000);
    }

    function resetDopo() {
      const card = document.getElementById("inv-card");
      if (card) card.classList.remove("show");
      FIELDS.forEach(f => {
        const el = document.getElementById(f.id);
        if (el) { el.classList.remove("show"); el.textContent = "···"; }
      });
      const total = document.getElementById("f-total");
      if (total) { total.classList.remove("show"); total.textContent = "···"; }
      STATUS_ROWS.forEach(s => {
        document.querySelector(`.statusRow[data-status="${s.key}"]`)?.classList.remove("show");
      });
      const toast = document.getElementById("toast-ok");
      if (toast) { toast.style.opacity = "0"; toast.style.transform = "translateY(8px)"; }
      const btn = document.getElementById("gen-btn") as HTMLButtonElement | null;
      if (btn) { btn.textContent = "Genera fattura"; btn.disabled = false; }
    }

    function dopoFlow() {
      resetDopo();
      const btn = document.getElementById("gen-btn") as HTMLButtonElement | null;

      tt(() => {
        if (btn) { btn.classList.add("tapped"); tt(() => btn.classList.remove("tapped"), 150); }
      }, 100);
      tt(() => {
        if (btn) btn.textContent = "Generazione…";
        document.getElementById("inv-card")?.classList.add("show");
      }, 300);

      FIELDS.forEach((f, i) => {
        tt(() => {
          const el = document.getElementById(f.id);
          if (el) { el.textContent = f.val; el.classList.add("show"); }
        }, 600 + i * 130);
      });
      tt(() => {
        const el = document.getElementById("f-total");
        if (el) { el.textContent = "€82,00"; el.classList.add("show"); }
      }, 600 + FIELDS.length * 130);

      const base = 600 + FIELDS.length * 130 + 200;
      STATUS_ROWS.forEach((s, i) => {
        tt(() => {
          document.querySelector(`.statusRow[data-status="${s.key}"]`)?.classList.add("show");
        }, base + i * 350);
      });
      tt(() => {
        if (btn) { btn.textContent = "Fattura inviata"; btn.disabled = true; }
        const toast = document.getElementById("toast-ok");
        if (toast) { toast.style.opacity = "1"; toast.style.transform = "translateY(0)"; }
      }, base + 3 * 350 + 200);
    }

    function fullCycle() {
      chaosTime = 0;
      const tp = document.getElementById("timer-prima");
      if (tp) tp.textContent = "~22 min";
      chaosLoop();
      dopoFlow();
      tt(fullCycle, 8000);
    }

    setTimeout(fullCycle, 600);
    return () => clearAll();
  }, []);

  return (
    <section className="bg-slate-50 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans']">
              In arrivo
            </div>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-500 font-['DM_Sans']">
              🕐 Estate 2026
            </div>
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-[-0.025em] mb-4">
            Le fatture si fanno mentre lavori.<br className="hidden md:block" /> <span style={{ background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Non la sera.</span>
          </h2>
          <p className="font-['DM_Sans'] text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Per gli psicologi italiani: addio Excel, Aruba, SDI, Sistema TS. Una sola app fa tutto.
          </p>
        </div>

        {/* Two-phone stage */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 max-w-3xl mx-auto">

          {/* LEFT — Before */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-1.5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="font-['DM_Sans'] text-sm font-semibold text-red-600 uppercase tracking-widest">Prima</span>
              </div>
              <span id="timer-prima" className="font-mono text-xs text-red-400 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">~22 min</span>
            </div>
            <div className="rounded-[28px] border border-red-100 p-4 flex-1 relative overflow-hidden" style={{ minHeight: 540, background: "linear-gradient(160deg, #fff8f7 0%, #ffffff 60%)", boxShadow: "0 1px 3px rgba(220,60,60,0.06), 0 8px 32px rgba(220,60,60,0.05)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[12px] text-slate-400 font-medium">
                  <div className="w-5 h-5 rounded-md bg-slate-300 flex items-center justify-center text-white text-[10px]">⋯</div>
                  Schermata Home
                </div>
                <span className="font-mono text-[11px] text-slate-400">15:50</span>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 rounded-[10px] mb-3 text-[12px] text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                Maria R. · Seduta conclusa · €80,00
              </div>

              <div className="flex flex-col gap-1.5">
                {APPS.map(app => (
                  <div key={app.key} className="fattRow relative flex items-center gap-2.5 px-3 py-2.5 bg-white border border-slate-100 rounded-[10px]" data-app={app.key}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-semibold shrink-0" style={{ background: app.color, fontSize: app.abbr.length > 1 ? 8 : 11 }}>
                      {app.abbr}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-slate-800 truncate">{app.name}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{app.detail}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${app.badgeType === "err" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                      {app.badge}
                    </span>
                    <span className="notifDot absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center opacity-0 scale-75 transition-all duration-300">
                      {app.notif}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-[#1f1f23] text-white text-[12px] px-3.5 py-2.5 rounded-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span><strong className="font-medium">Una fattura.</strong> 5 login. 22 minuti.</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center px-1 mt-8">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                <path d="M5 11H17M13 6L17 11L13 16" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* RIGHT — After */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-1.5 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-['DM_Sans'] text-sm font-semibold text-emerald-700 uppercase tracking-widest">Dopo</span>
              </div>
              <span className="font-mono text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">0,8 sec</span>
            </div>
            <div className="rounded-[28px] border border-emerald-100 p-4 flex-1 relative overflow-hidden" style={{ minHeight: 540, background: "linear-gradient(160deg, #f5fdf8 0%, #ffffff 60%)", boxShadow: "0 1px 3px rgba(16,185,129,0.06), 0 8px 32px rgba(16,185,129,0.05)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                  <div className="w-5 h-5 rounded-md bg-[#00122F] flex items-center justify-center text-white text-[10px] font-semibold">Z</div>
                  ZenGest
                </div>
                <span className="font-mono text-[11px] text-slate-400">15:50</span>
              </div>

              {/* Session card + CTA */}
              <div className="border border-slate-100 rounded-xl p-3 mb-2.5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center justify-center shrink-0">MR</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800">Maria R.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Seduta · 50 min · €80,00</p>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Conclusa</span>
                </div>
                <button
                  id="gen-btn"
                  className="w-full py-2.5 bg-orange-400 hover:bg-orange-500 text-white text-[12px] font-medium rounded-lg transition-transform duration-150 active:scale-95"
                  onClick={() => {
                    clearAll();
                    const el = document.getElementById("gen-btn") as HTMLButtonElement | null;
                    if (el) { el.textContent = "Genera fattura"; el.disabled = false; }
                    document.getElementById("inv-card")?.classList.remove("show");
                    STATUS_ROWS.forEach(s => document.querySelector(`.statusRow[data-status="${s.key}"]`)?.classList.remove("show"));
                    const toast = document.getElementById("toast-ok");
                    if (toast) { toast.style.opacity = "0"; toast.style.transform = "translateY(8px)"; }
                    setTimeout(() => document.getElementById("gen-btn")?.dispatchEvent(new MouseEvent("click")), 0);
                  }}
                >
                  Genera fattura
                </button>
              </div>

              {/* Invoice card */}
              <div id="inv-card" className="border border-slate-100 rounded-xl px-3.5 py-3 mb-2.5 opacity-0 translate-y-2 transition-all duration-400" style={{ transition: "opacity .4s ease, transform .4s ease" }}>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[12px] font-medium text-slate-800">
                    Fattura n. <span id="f-num" className="text-slate-400 transition-all duration-200">···</span>
                  </span>
                  <span id="f-date" className="text-[11px] text-slate-400 transition-all duration-200">···</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {FIELDS.slice(2).map(f => (
                    <div key={f.id} className="flex justify-between items-center text-[12px]">
                      <span className="text-slate-400">{f.label}</span>
                      <span id={f.id} className={`font-medium text-slate-800 transition-all duration-200 ${f.mono ? "font-mono text-[11px]" : ""}`}>···</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-[12px] text-slate-400">Totale</span>
                  <span id="f-total" className="text-[16px] font-medium text-slate-800 transition-all duration-200">···</span>
                </div>
              </div>

              {/* Status rows */}
              <div className="flex flex-col gap-1.5">
                {STATUS_ROWS.map(s => (
                  <div key={s.key} className="statusRow flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-lg opacity-0 translate-y-2 transition-all duration-300" data-status={s.key} style={{ transition: "opacity .35s ease, transform .35s ease" }}>
                    <div className="w-[18px] h-[18px] rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="flex-1 text-[12px] text-slate-700">{s.label}</span>
                    <span className="font-mono text-[11px] text-slate-400">{s.meta}</span>
                  </div>
                ))}
              </div>

              <div id="toast-ok" className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-[#1f1f23] text-white text-[12px] px-3.5 py-2.5 rounded-[10px]" style={{ opacity: 0, transform: "translateY(8px)", transition: "opacity .4s ease, transform .4s ease" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span><strong className="font-medium">Tutto fatto.</strong> Tempo speso: 0,8 secondi.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-10 text-center max-w-2xl mx-auto px-6 py-5 bg-white border border-slate-100 rounded-2xl">
          <p className="font-['Instrument_Serif'] italic text-xl md:text-2xl text-slate-800 leading-snug mb-6">
            Hai studiato per diventare <span className="not-italic text-orange-400">psicologo</span>,<br />non commercialista.
          </p>
          <a
            href="https://app.zengest.it/sign-up/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-['DM_Sans'] font-semibold text-base text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
          >
            Prova gratis
          </a>
        </div>

      </div>

      <style>{`
        .fattRow { transition: border-color .3s ease; }
        .fattRow.shaking { animation: fattShake .45s ease-in-out; border-color: #ef4444; }
        @keyframes fattShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
        .notifDot { transition: opacity .3s ease, transform .3s ease; }
        .notifDot.show { opacity: 1 !important; transform: scale(1) !important; }
        #inv-card.show { opacity: 1 !important; transform: translateY(0) !important; }
        .statusRow.show { opacity: 1 !important; transform: translateY(0) !important; }
        #gen-btn.tapped { transform: scale(0.96); }
      `}</style>
    </section>
  );
}
