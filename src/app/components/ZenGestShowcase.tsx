"use client"

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react"
import { Check } from "lucide-react"

// Vetrina prodotto: una finestra "app" che scorre automaticamente tra le
// quattro schermate principali del gestionale, fedele all'interfaccia reale
// (app.zengest.it). Dati fittizi, illustrativi.
//
// Palette del sito: NAVY #00122F (primario) · BLUE #3B6FD4 (stato attivo) ·
// GREEN #0D9488 (solo badge di stato, uso minimo) · SUCCESS #059669 (spunte)
const PINE = "#00122F" // navy del brand ZenGest
const BLUE = "#3B6FD4" // blu di accento per stati attivi/selezionati
const GREEN = "#0D9488" // teal del brand ZenGest — riservato ai soli badge di stato
const GREEN_TINT = "#f0fdfa"
const SUCCESS = "#059669" // verde di conferma, coerente con FatturazioneSection
const NEUTRAL_TINT = "#F0F5FF" // tinta neutra per bolle e sfondi icona
const SLATE = "#475569"
const INK = "#00122F" // stesso navy dei pulsanti primari del sito
const SERIF = '"Instrument Serif", "Times New Roman", serif'
const SANS = '"DM Sans", system-ui, sans-serif'

// Icone lucide-style (path 24×24), inline per non aggiungere dipendenze.
const ZI = {
  home: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
  clock: "M12 7v5l3 2 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1z M8 7h8 M8 11h8 M8 15h5",
  swap: "M16 3l4 4-4 4 M20 7H8 M8 21l-4-4 4-4 M4 17h12",
  chevron: "M6 9l6 6 6-6",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.3-4.3",
  lock: "M5 11h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V11z M7 11V7a5 5 0 0 1 10 0v4",
  arrowLeft: "M19 12H5 M11 18l-6-6 6-6",
  arrowRight: "M5 12h14 M13 18l6-6-6-6",
  refresh: "M3 12a9 9 0 0 1 15.3-6.5L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15.3 6.5L3 16 M3 21v-5h5",
  star: "M12 2l2.6 6.6 7.1.5-5.5 4.5 1.9 6.9L12 16.9 5.9 20.5l1.9-6.9-5.5-4.5 7.1-.5z",
}

function Glyph({ d, className = "w-5 h-5", sw = 2, style }: { d: string; className?: string; sw?: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
      <path d={d} />
    </svg>
  )
}

// Ogni tab della vetrina è una schermata reale; path = ciò che appare nella
// barra dell'indirizzo del browser.
const TABS = [
  { label: "Inizia sessione", path: "home" },
  { label: "Assistente Zen", path: "assistente" },
  { label: "Cartella clinica", path: "clienti/giulia-rinaldi" },
  { label: "Fatture", path: "clienti/giulia-rinaldi/fatture" },
] as const

// ── Pane 1 · REGISTRA SEDUTA ──────────────────────────────────────────────────
// Flusso: schermata → tocca "Inizia seduta" → parte la registrazione → sulla
// destra, in diretta e affiancata, appare la TRASCRIZIONE DELLA CONVERSAZIONE
// (turni Terapeuta/Paziente), già pseudo-anonimizzata (PII → token). Loop.
//
// Ogni turno ha uno speaker e frammenti (stringhe = testo, {t} = token PII).
type Frag = string | { t: string }
type Turn = { who: "Terapeuta" | "Paziente"; frags: Frag[] }
const TRANSCRIPT: Turn[] = [
  { who: "Terapeuta", frags: ["Ciao, come è andata la settimana?"] },
  { who: "Paziente", frags: ["Difficile. ", { t: "[PERSONA]" }, " mi ha fatto una critica in riunione e l'ansia è tornata."] },
  { who: "Terapeuta", frags: ["Hai provato l'esercizio di respirazione che avevamo visto ", { t: "[DATA]" }, "?"] },
  { who: "Paziente", frags: ["Sì, un paio di volte. Un po' mi ha aiutato."] },
]

function IniziaSessionePane() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<0 | 1 | 2>(0) // 0 idle · 1 recording · 2 trascrizione
  const [tap, setTap] = useState(false)
  const [turns, setTurns] = useState(0) // turni di conversazione visibili

  useEffect(() => {
    if (reduce) { setPhase(2); setTurns(TRANSCRIPT.length); return }
    const timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setPhase(0); setTap(false); setTurns(0)
      timers.push(setTimeout(() => setTap(true), 1300))
      timers.push(setTimeout(() => setTap(false), 1600))
      timers.push(setTimeout(() => setPhase(1), 1650))         // parte la registrazione
      timers.push(setTimeout(() => setPhase(2), 2500))         // appare il pannello trascrizione
      TRANSCRIPT.forEach((_, i) => timers.push(setTimeout(() => setTurns(i + 1), 2800 + i * 850)))
    }
    run()
    const total = 2800 + TRANSCRIPT.length * 850 + 2000
    const loop = setInterval(run, total)
    return () => { clearInterval(loop); timers.forEach(clearTimeout) }
  }, [reduce])

  const recording = phase >= 1

  // Fase idle: schermata d'ingresso semplice, centrata, senza scroll.
  if (phase === 0) {
    return (
      <div className="h-full overflow-hidden flex flex-col items-center justify-center px-6 py-6 text-center" style={{ fontFamily: SANS }}>
        <h2 className="text-stone-900 mb-1.5" style={{ fontFamily: SERIF, fontSize: "clamp(20px,2.8vw,28px)", fontWeight: 500, lineHeight: 1.1 }}>
          Ciao Matteo, da dove partiamo?
        </h2>
        <p className="text-[13px] text-stone-500 mb-7">Scegli un cliente e premi registra — al resto pensa ZEN</p>
        <div className="w-full max-w-[420px] rounded-2xl border bg-white p-5 text-left" style={{ borderColor: "#e7e5e4", boxShadow: "0 4px 24px rgba(0,18,47,0.05)" }}>
          <div className="rounded-xl p-3.5 mb-4" style={{ background: "#f6f5f2" }}>
            <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-stone-400 mb-2">Cliente</div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full text-white text-[13px] font-bold shrink-0" style={{ background: PINE }}>GR</span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-stone-900">Giulia Rinaldi</div>
                <div className="text-[12px] text-stone-500">Seduta n. 14 · ansia, perfezionismo</div>
              </div>
              <span className="inline-flex items-center gap-1 text-[12px] text-stone-500 shrink-0"><Glyph d={ZI.swap} className="w-3.5 h-3.5" /> Cambia</span>
            </div>
          </div>
          <div className="relative">
            <motion.button className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-white text-[14px] font-semibold" animate={reduce ? {} : { scale: tap ? 0.97 : 1 }} transition={{ duration: 0.15 }} style={{ background: INK }}>
              <Glyph d={ZI.mic} className="w-4 h-4" /> Inizia seduta con Giulia
            </motion.button>
            {!reduce && (
              <motion.span aria-hidden className="absolute right-8 -bottom-1 pointer-events-none" initial={false} animate={{ opacity: tap ? 1 : 0, scale: tap ? 0.92 : 1 }} transition={{ duration: 0.15 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#1c1917" stroke="#fff" strokeWidth="1.2"><path d="M6 3l14 8-6 1 3 6-3 1-3-6-5 4z" /></svg>
              </motion.span>
            )}
          </div>
          <p className="text-center text-[11px] text-stone-400 mt-3 inline-flex items-center gap-1.5 w-full justify-center">
            <span style={{ color: SLATE }}><Glyph d={ZI.shield} className="w-3.5 h-3.5" /></span> Consenso registrazione di Giulia già acquisito
          </p>
        </div>
      </div>
    )
  }

  // Fase registrazione: pannello registrazione a SINISTRA + trascrizione della
  // conversazione a DESTRA, affiancati (niente cambio schermata).
  return (
    <div className="h-full overflow-hidden flex gap-3 p-4 md:p-5" style={{ fontFamily: SANS }}>
      {/* SINISTRA · registrazione */}
      <div className="w-[38%] max-w-[220px] shrink-0 rounded-xl border flex flex-col items-center justify-center text-center p-4" style={{ borderColor: "#f3d4d0", background: "#fbeceb" }}>
        <motion.span className="flex items-center justify-center w-14 h-14 rounded-full text-white mb-3" style={{ background: "#c0564c" }} animate={reduce ? {} : { scale: [1, 1.06, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <Glyph d={ZI.mic} className="w-6 h-6" />
        </motion.span>
        <div className="text-[13px] font-semibold text-stone-900">Registrazione in corso</div>
        <div className="text-[11px] text-stone-500 mb-3">Giulia Rinaldi · Seduta n. 14</div>
        {/* waveform */}
        <div className="flex items-end gap-[3px] h-7" aria-hidden>
          {[10, 18, 8, 22, 12, 20, 9, 16, 11].map((h, i) => (
            <motion.span key={i} className="w-[3px] rounded-full" style={{ background: "#c0564c", height: h }} animate={reduce ? {} : { height: [h, h * 0.45, h] }} transition={{ duration: 0.9 + (i % 3) * 0.2, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </div>
        <div className="text-[12px] font-semibold tabular-nums text-stone-600 mt-3">00:0{Math.min(9, turns * 2)}:14</div>
      </div>

      {/* DESTRA · trascrizione conversazione, pseudo-anonimizzata */}
      <motion.div className="flex-1 min-w-0 rounded-xl border overflow-hidden flex flex-col" style={{ borderColor: "#e7e5e4" }} initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: phase >= 2 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center gap-2 px-4 py-2 border-b shrink-0" style={{ borderColor: "#f0efec", background: "#fbfcfb" }}>
          <span className="text-[10px] font-bold uppercase tracking-[1px] text-stone-400">Trascrizione conversazione</span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: GREEN_TINT, color: GREEN }}>
            <Glyph d={ZI.shield} className="w-3 h-3" /> Pseudo-anonimizzata
          </span>
        </div>
        <div className="p-4 flex flex-col gap-3 overflow-hidden">
          {TRANSCRIPT.slice(0, turns).map((turn, i) => (
            <motion.div key={i} initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.5px] mb-0.5" style={{ color: turn.who === "Terapeuta" ? PINE : "#a8a29e" }}>{turn.who}</div>
              <p className="text-[13px] leading-[1.55] text-stone-700 m-0">
                {turn.frags.map((f, j) =>
                  typeof f === "string" ? (
                    <span key={j}>{f}</span>
                  ) : (
                    <span key={j} className="inline-flex items-center rounded px-1.5 py-0.5 mx-0.5 text-[11px] font-semibold align-baseline" style={{ background: "#f1f5f9", color: SLATE }}>{f.t}</span>
                  ),
                )}
              </p>
            </motion.div>
          ))}
          {recording && turns < TRANSCRIPT.length && phase >= 2 && (
            <div className="flex items-center gap-1 text-stone-400" aria-hidden>
              <motion.span className="w-1.5 h-1.5 rounded-full bg-stone-400" animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} />
              <motion.span className="w-1.5 h-1.5 rounded-full bg-stone-400" animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
              <motion.span className="w-1.5 h-1.5 rounded-full bg-stone-400" animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Pane 2 · ASSISTENTE ZEN ───────────────────────────────────────────────────
// Zen apre con "Ciao, come posso aiutarti?", l'utente chiede un report e Zen lo
// genera: dentro la chat si compone un documento (titolo + sezioni) → "Apri".
const USER_ASK = "Genera il report clinico dell'ultima seduta di Giulia."
const REPORT_SECTIONS = [
  "Motivo della seduta",
  "Contenuti emersi e temi chiave",
  "Stato emotivo e mentale",
  "Obiettivi per la prossima seduta",
]

function AssistenteZenPane() {
  const reduce = useReducedMotion()
  // 0 solo saluto · 1 domanda utente · 2 "genero il report…" · 3+ sezioni · 4 pronto
  const [step, setStep] = useState(0)
  const [sections, setSections] = useState(0)

  useEffect(() => {
    if (reduce) { setStep(4); setSections(REPORT_SECTIONS.length); return }
    const timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setStep(0); setSections(0)
      timers.push(setTimeout(() => setStep(1), 1200))   // domanda utente
      timers.push(setTimeout(() => setStep(2), 2000))   // "genero il report…"
      timers.push(setTimeout(() => setStep(3), 2700))   // appare il documento
      REPORT_SECTIONS.forEach((_, i) => timers.push(setTimeout(() => setSections(i + 1), 3000 + i * 500)))
      timers.push(setTimeout(() => setStep(4), 3000 + REPORT_SECTIONS.length * 500 + 200))
    }
    run()
    const total = 3000 + REPORT_SECTIONS.length * 500 + 2200
    const loop = setInterval(run, total)
    return () => { clearInterval(loop); timers.forEach(clearTimeout) }
  }, [reduce])

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: SANS }}>
      <div className="flex items-center gap-2.5 px-5 h-11 border-b shrink-0" style={{ borderColor: "#f0efec" }}>
        <span className="flex items-center justify-center w-6 h-6 rounded-full text-white" style={{ background: PINE }}><Glyph d={ZI.spark} className="w-3.5 h-3.5" /></span>
        <span className="text-[13px] font-semibold text-stone-800">Assistente Zen</span>
        <span className="text-[11px] text-stone-400 ml-1">· Giulia Rinaldi</span>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden p-4 md:p-5 flex flex-col gap-3">
        {/* saluto */}
        <div className="flex justify-start">
          <div className="max-w-[80%] text-[13px] leading-relaxed rounded-2xl px-3.5 py-2.5" style={{ background: NEUTRAL_TINT, color: "#1e293b", borderBottomLeftRadius: 4 }}>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.5px] mb-1" style={{ color: PINE }}><Glyph d={ZI.spark} className="w-3 h-3" /> Zen</span>
            <p className="m-0">Ciao, come posso aiutarti?</p>
          </div>
        </div>

        {/* domanda utente */}
        {step >= 1 && (
          <motion.div initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-end">
            <div className="max-w-[80%] text-[13px] leading-relaxed rounded-2xl px-3.5 py-2.5" style={{ background: PINE, color: "#fff", borderBottomRightRadius: 4 }}>{USER_ASK}</div>
          </motion.div>
        )}

        {/* Zen genera il documento */}
        {step >= 2 && (
          <motion.div initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-start">
            <div className="w-full max-w-[300px] text-[13px] rounded-2xl px-3.5 py-2.5" style={{ background: NEUTRAL_TINT, color: "#1e293b", borderBottomLeftRadius: 4 }}>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.5px] mb-2" style={{ color: PINE }}><Glyph d={ZI.spark} className="w-3 h-3" /> Zen</span>
              <p className="m-0 mb-2.5">{step === 2 ? "Genero il report…" : "Ecco il report della seduta:"}</p>

              {/* documento generato */}
              {step >= 3 && (
                <motion.div initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="rounded-xl border bg-white overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: "#f0efec" }}>
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg shrink-0" style={{ background: NEUTRAL_TINT, color: PINE }}><Glyph d={ZI.doc} className="w-3.5 h-3.5" /></span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold text-stone-900 truncate">Report seduta n. 14</div>
                      <div className="text-[10px] text-stone-400">Giulia Rinaldi · Nota CBT</div>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 flex flex-col gap-1.5">
                    {REPORT_SECTIONS.map((s, i) => (
                      <motion.div key={s} className="flex items-center gap-2" initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -6 }} animate={{ opacity: i < sections ? 1 : 0, x: i < sections ? 0 : -6 }} transition={{ duration: 0.3 }}>
                        <Check className="w-3 h-3 shrink-0" strokeWidth={3} style={{ color: SUCCESS }} />
                        <span className="text-[11.5px] text-stone-600 truncate">{s}</span>
                      </motion.div>
                    ))}
                  </div>
                  {step >= 4 && (
                    <div className="flex items-center justify-between px-3 py-2 border-t" style={{ borderColor: "#f0efec", background: "#fbfcfb" }}>
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: SUCCESS }}><Check className="w-3 h-3" strokeWidth={3} /> Report pronto</span>
                      <span className="text-[11px] font-semibold text-white rounded-md px-2.5 py-1" style={{ background: INK }}>Apri</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="shrink-0 p-3 border-t" style={{ borderColor: "#f0efec" }}>
        <div className="flex items-center gap-2 rounded-full border px-4 py-2.5" style={{ borderColor: "#e7e5e4", background: "#fbfcfb" }}>
          <span className="text-[13px] text-stone-400 flex-1">Chiedi a Zen…</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full text-white shrink-0" style={{ background: PINE }}>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Pane 3 · CARTELLA CLINICA DIGITALE E FATTURE ──────────────────────────────
// Le sezioni reali della cartella, mostrate come tab (non dropdown).
const CLIENT_TABS = ["Anagrafica e fatturazione", "Sessioni", "Prep Sessione", "Riepilogo", "Note", "Documenti", "Contesto", "Fatture"]

function ClientePane() {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col h-full" style={{ fontFamily: SANS }}>
      {/* intestazione cartella + tab */}
      <div className="px-5 pt-3.5 shrink-0 border-b" style={{ borderColor: "#f0efec" }}>
        <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-stone-400 mb-2">Cartella clinica digitale</div>
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-white text-[13px] font-bold" style={{ background: PINE }}>GR</span>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold text-stone-900 leading-tight">Giulia Rinaldi</div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-full px-2 py-0.5 mt-0.5" style={{ background: "#ecfdf5", color: SUCCESS }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: SUCCESS }} /> Attivo
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 shrink-0 border" style={{ borderColor: "#e7e5e4", color: SLATE }}>
            <Glyph d={ZI.shield} className="w-3.5 h-3.5" /> Consenso
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white rounded-lg px-3 py-1.5 shrink-0" style={{ background: INK }}>
            <Glyph d={ZI.mic} className="w-3.5 h-3.5" /> Inizia sessione
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto -mb-px pb-0">
          {CLIENT_TABS.map((t, i) => (
            <span key={t} className="whitespace-nowrap text-[12px] font-medium pb-2.5 border-b-2" style={i === 0 ? { color: BLUE, borderColor: BLUE } : { color: "#78716c", borderColor: "transparent" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* corpo Panoramica */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-5">
        <div className="rounded-xl border bg-white p-4 mb-3" style={{ borderColor: "#e7e5e4" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[13px] font-semibold text-stone-900">Anagrafica e fatturazione</div>
              <div className="text-[11px] text-stone-500">Dati anagrafici, contatto e dati per la fattura</div>
            </div>
            <span className="text-[11px] font-semibold text-white rounded-lg px-2.5 py-1.5" style={{ background: PINE }}>Salva</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["Email", "giulia.rinaldi@email.it"], ["Telefono", "+39 340 55 12 890"], ["Codice fiscale", "RNLGLI90A41F205X"], ["Ultima sessione", "21 giu 2026"]].map(([l, v], i) => (
              <motion.div key={l} initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.06 }}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.5px] text-stone-400">{l}</div>
                <div className="text-[13px] text-stone-800 mt-0.5 truncate">{v}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[["Sedute totali", "14"], ["Questo mese", "3"], ["Aderenza", "91%"]].map(([l, v]) => (
            <div key={l} className="rounded-xl border bg-white p-3" style={{ borderColor: "#e7e5e4" }}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.5px] text-stone-400">{l}</div>
              <div className="text-[22px] leading-none mt-1" style={{ fontFamily: SERIF, color: PINE }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Pane 4 · FATTURE ──────────────────────────────────────────────────────────
// Animazione: si apre la fattura → "Crea e invia a TS" (tocco) → stato inviata,
// con protocollo del Sistema TS. Loop.
const INVOICE_LINES = [
  { desc: "Seduta di psicoterapia individuale", amt: "€ 80,00" },
  { desc: "Marca da bollo", amt: "€ 2,00" },
]

function FatturePane() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<0 | 1 | 2>(0) // 0 fattura · 1 invio · 2 inviata
  const [tap, setTap] = useState(false)

  useEffect(() => {
    if (reduce) { setPhase(2); return }
    const timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      setPhase(0); setTap(false)
      timers.push(setTimeout(() => setTap(true), 1600))
      timers.push(setTimeout(() => setTap(false), 1900))
      timers.push(setTimeout(() => setPhase(1), 1950))   // "invio in corso…"
      timers.push(setTimeout(() => setPhase(2), 3100))   // inviata
    }
    run()
    const loop = setInterval(run, 5600)
    return () => { clearInterval(loop); timers.forEach(clearTimeout) }
  }, [reduce])

  return (
    <div className="h-full overflow-hidden flex flex-col items-center justify-center px-6 py-6" style={{ fontFamily: SANS }}>
      <div className="w-full max-w-[420px] rounded-2xl border bg-white overflow-hidden" style={{ borderColor: "#e7e5e4", boxShadow: "0 8px 30px rgba(0,18,47,0.06)" }}>
        {/* intestazione documento */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b" style={{ borderColor: "#f0efec" }}>
          <span className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0" style={{ background: NEUTRAL_TINT, color: PINE }}><Glyph d={ZI.receipt} className="w-4 h-4" /></span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold text-stone-900">Fattura 2026/045</div>
            <div className="text-[11px] text-stone-500">Giulia Rinaldi · 12 lug 2026</div>
          </div>
          {/* badge stato in alto a destra */}
          <AnimatePresence mode="wait">
            {phase < 2 ? (
              <motion.span key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#f1f5f9", color: SLATE }}>Bozza</motion.span>
            ) : (
              <motion.span key="sent" initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#eafaf1", color: "#059669" }}>
                <Check className="w-3 h-3" strokeWidth={3} /> Inviata a TS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* righe fattura */}
        <div className="px-4 py-3">
          {INVOICE_LINES.map((l) => (
            <div key={l.desc} className="flex items-center justify-between py-1.5 text-[12.5px]">
              <span className="text-stone-600">{l.desc}</span>
              <span className="text-stone-800 font-medium tabular-nums">{l.amt}</span>
            </div>
          ))}
          <div className="flex items-center justify-between mt-2 pt-2.5 border-t" style={{ borderColor: "#f0efec" }}>
            <span className="text-[12px] font-semibold text-stone-500 uppercase tracking-[0.5px]">Totale</span>
            <span className="text-[18px] font-semibold tabular-nums" style={{ color: PINE }}>€ 82,00</span>
          </div>
        </div>

        {/* pié: azione o esito */}
        <div className="px-4 py-3 border-t" style={{ borderColor: "#f0efec", background: "#fbfcfb" }}>
          <AnimatePresence mode="wait">
            {phase === 2 ? (
              <motion.div key="done" initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full shrink-0" style={{ background: "#eafaf1", color: "#059669" }}><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold text-stone-900">Inviata al Sistema TS</div>
                  <div className="text-[11px] text-stone-500">Protocollo TS-2026-00841 · spesa sanitaria registrata</div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="action" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
                <motion.button className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-white text-[13.5px] font-semibold" animate={reduce ? {} : { scale: tap ? 0.97 : 1 }} transition={{ duration: 0.15 }} style={{ background: INK }}>
                  {phase === 1 ? (
                    <>
                      <motion.span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                      Invio in corso…
                    </>
                  ) : (
                    <>Crea e invia a Sistema TS</>
                  )}
                </motion.button>
                {!reduce && (
                  <motion.span aria-hidden className="absolute right-10 -bottom-1 pointer-events-none" initial={false} animate={{ opacity: tap ? 1 : 0, scale: tap ? 0.92 : 1 }} transition={{ duration: 0.15 }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#1c1917" stroke="#fff" strokeWidth="1.2"><path d="M6 3l14 8-6 1 3 6-3 1-3-6-5 4z" /></svg>
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-[11px] text-stone-400 mt-3">Fattura elettronica e invio al Sistema TS in un clic.</p>
    </div>
  )
}

// ── Finestra "app": vera barra browser (tab + indirizzo) + header snello ──────
function AppWindow({ tab, children }: { tab: number; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white overflow-hidden text-left ring-1 ring-black/5" style={{ boxShadow: "0 60px 140px -24px rgba(0,18,47,0.30), 0 24px 48px -20px rgba(0,18,47,0.16)" }}>
      {/* barra dei tab del browser */}
      <div className="flex items-end gap-1.5 px-3.5 pt-2.5" style={{ background: "linear-gradient(#e9ece7, #e2e5e0)" }}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57] mb-2.5 ml-0.5 shrink-0" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e] mb-2.5 shrink-0" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#28c840] mb-2.5 mr-3 shrink-0" aria-hidden="true" />
        <div className="flex items-center gap-2 bg-white rounded-t-lg px-4 py-2 min-w-0" style={{ boxShadow: "0 -1px 0 rgba(0,0,0,0.03) inset" }}>
          <span className="flex items-center justify-center w-4 h-4 rounded shrink-0" style={{ background: PINE }}><span className="text-white text-[9px] leading-none" style={{ fontFamily: SERIF }}>Z</span></span>
          <span className="text-[12px] font-medium text-stone-700 truncate" style={{ fontFamily: SANS }}>ZenGest — {TABS[tab].label}</span>
        </div>
      </div>

      {/* barra indirizzo: navigazione + URL reale */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b" style={{ borderColor: "#e7e5e4" }}>
        <div className="flex items-center gap-2.5 text-stone-300 shrink-0">
          <Glyph d={ZI.arrowLeft} className="w-4 h-4" sw={2.2} />
          <Glyph d={ZI.arrowRight} className="w-4 h-4" sw={2.2} />
          <Glyph d={ZI.refresh} className="w-3.5 h-3.5 text-stone-400" sw={2.2} />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5" style={{ background: "#f2f3f1" }}>
          <Glyph d={ZI.lock} className="w-3 h-3 shrink-0" sw={2.2} style={{ color: "#94a3b8" }} />
          <span className="text-[12px] text-stone-600 font-medium truncate" style={{ fontFamily: SANS }}>
            app.zengest.it<span className="text-stone-400">/{TABS[tab].path}</span>
          </span>
        </div>
        <Glyph d={ZI.star} className="w-3.5 h-3.5 text-stone-300 shrink-0" sw={2} />
      </div>

      {/* header snello dell'app: logo + avatar (niente nav) */}
      <div className="flex items-center px-4 h-11 border-b bg-white shrink-0" style={{ borderColor: "#f0efec" }}>
        <span className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg" style={{ background: PINE }}><span className="text-white text-[12px]" style={{ fontFamily: SERIF }}>Z</span></span>
          <span className="text-[13px] font-semibold text-stone-800">zengest</span>
        </span>
        <span className="ml-auto flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold" style={{ background: "#e2e8f0", color: "#334155" }}>MG</span>
      </div>

      {/* banner prova gratuita */}
      <div className="flex items-center gap-2 px-4 py-2 text-[11.5px] border-b" style={{ background: "#fdf6ef", borderColor: "#f3e6d6", color: "#8a6d3b" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#c8a45c" }} />
        Prova gratuita — ti restano <strong className="mx-0.5">9 sedute</strong>.<span className="underline ml-1">Abbonati</span> per continuare.
      </div>

      {/* corpo schermata */}
      <div className="h-[440px] sm:h-auto sm:aspect-[16/9] sm:max-h-[600px] overflow-hidden bg-white">{children}</div>
    </div>
  )
}

// ── Tour: le tab in alto scorrono da sole (pausa su hover) ─────────────────────
export function ZenGestShowcase() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: "-120px" })

  useEffect(() => {
    if (reduce || paused || !inView) return
    const id = setInterval(() => setTab((t) => (t + 1) % TABS.length), 5200)
    return () => clearInterval(id)
  }, [reduce, paused, inView])

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-[1180px] mx-auto">
        {/* tab switcher */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-full border" style={{ background: "rgba(0,18,47,0.04)", borderColor: "rgba(0,18,47,0.08)" }}>
            {TABS.map((t, i) => (
              <button key={t.label} onClick={() => setTab(i)} aria-pressed={tab === i}
                className="relative overflow-hidden px-3.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-semibold transition-colors"
                style={tab === i ? { background: "#fff", color: PINE } : { color: "#57534e" }}>
                {tab === i && !reduce && !paused && (
                  <motion.span key={`fill-${tab}`} aria-hidden className="absolute inset-0" style={{ background: "rgba(59,111,212,0.14)", originX: 0 }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5.2, ease: "linear" }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AppWindow tab={tab}>
          <AnimatePresence mode="wait">
            <motion.div key={tab} className="h-full" initial={{ opacity: 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : -8 }} transition={{ duration: 0.35 }}>
              {tab === 0 && <IniziaSessionePane />}
              {tab === 1 && <AssistenteZenPane />}
              {tab === 2 && <ClientePane />}
              {tab === 3 && <FatturePane />}
            </motion.div>
          </AnimatePresence>
        </AppWindow>
        <p className="text-center text-[12px] text-stone-500 mt-4" style={{ fontFamily: SANS }}>Interfaccia illustrativa. Registri la seduta, lo scribe scrive la nota, tutto resta in cartella.</p>
      </div>
    </div>
  )
}
