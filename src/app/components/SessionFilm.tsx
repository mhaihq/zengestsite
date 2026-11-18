import { useEffect, useLayoutEffect, useReducer, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion, useInView } from "motion/react"

// "Film" di prodotto di ZenGest per la home (portato dal sito Unozen, con la palette di ZenGest): un'unica sequenza che segue una
// seduta dall'inizio alla fine — registri → trascrive → scrive la nota →
// fattura — con una "camera" che si sposta e stringe sul punto in cui succede
// qualcosa. Niente finestra finta: i quattro pannelli stanno su un piano più
// grande dell'inquadratura e la camera li percorre.
//
// Tutto lo stato visibile è una funzione pura di (scena, millisecondi nella
// scena): così si può saltare a una scena dalla barra in basso senza stati
// intermedi sbagliati. Dati fittizi, illustrativi.
//
// Palette ZenGest: PINE = navy #00122F · GREEN = teal #0D9488 · GREEN_TINT #E7F5F3
const PINE = "#00122F"
const GREEN = "#0D9488"
const GREEN_TINT = "#E7F5F3"
const INK = "#00122F"
const RED = "#c0564c"
const SERIF = 'var(--zg-serif)'
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
const MINT = "#5EEAD4"

const ICON = {
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  check: "M5 12.5l4.5 4.5L19 7.5",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6",
  receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1z M8 7h8 M8 11h8 M8 15h5",
}

function Glyph({ d, className = "w-4 h-4", sw = 2 }: { d: string; className?: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/* ───────────────────────── Contenuti ───────────────────────── */

// Frammenti di un turno: testo, token PII ({t}) o frase che finirà nella nota ({h}).
type Frag = string | { t: string } | { h: number; s: string }
type Turn = { who: "Terapeuta" | "Paziente"; frags: Frag[] }

const TRANSCRIPT: Turn[] = [
  { who: "Terapeuta", frags: ["Ciao, come è andata la settimana?"] },
  { who: "Paziente", frags: ["Difficile. ", { t: "[PERSONA]" }, " mi ha fatto una critica in riunione e ", { h: 0, s: "l'ansia è tornata" }, "."] },
  { who: "Terapeuta", frags: ["Hai provato l'", { h: 1, s: "esercizio di respirazione" }, " che avevamo visto ", { t: "[DATA]" }, "?"] },
  { who: "Paziente", frags: ["Sì, un paio di volte. ", { h: 2, s: "Un po' mi ha aiutato" }, "."] },
]

const NOTE = [
  { label: "Motivo", text: "Ritorno dell'ansia dopo una critica in riunione." },
  { label: "Intervento", text: "Esercizio di respirazione, provato due volte." },
  { label: "Esito", text: "Beneficio parziale riferito dalla paziente." },
]

const fragLen = (f: Frag) => (typeof f === "string" ? f.length : "t" in f ? 6 : f.s.length)
const turnLen = (t: Turn) => t.frags.reduce((n, f) => n + fragLen(f), 0)

/* ───────────────────────── Tempi ───────────────────────── */

const CPS = 0.05 // caratteri per millisecondo
const TURN_GAP = 380
const TYPE_START = 1000

// Istante in cui parte ogni turno della trascrizione (dentro la scena 1).
const TURN_START = TRANSCRIPT.reduce<number[]>((acc, _t, i) => {
  acc.push(i === 0 ? TYPE_START : acc[i - 1] + turnLen(TRANSCRIPT[i - 1]) / CPS + TURN_GAP)
  return acc
}, [])
const TYPE_END = TURN_START[TRANSCRIPT.length - 1] + turnLen(TRANSCRIPT[TRANSCRIPT.length - 1]) / CPS

// Scena 2: ogni frase si evidenzia, vola nella nota e lì diventa una riga.
const H_START = (i: number) => 1000 + i * 1900
const FLY_FROM = 450
const FLY_MS = 700
const NOTE_READY = H_START(NOTE.length - 1) + FLY_FROM + FLY_MS + NOTE[NOTE.length - 1].text.length / CPS + 250

const DUR = [2500, TYPE_END + 1000, NOTE_READY + 1100, 5200, 3400]
const LAST = DUR.length - 1

const STEPS = ["Registri", "Trascrive", "Nota", "Fattura"]

// Didascalia cinetica: una parola grande per scena, accanto al film.
const SCENES = [
  { n: "01", word: "Registri.", line: "Un clic e la seduta parte: in presenza, online o da un audio." },
  { n: "02", word: "Trascrive.", line: "Chi parla e cosa dice. Nomi e date diventano etichette neutre." },
  { n: "03", word: "Scrive la nota.", line: "Le frasi che contano entrano nella bozza, nel tuo formato." },
  { n: "04", word: "Fattura.", line: "Bollo calcolato e invio al Sistema TS, dalla stessa scheda." },
  { n: "Fine", word: "Fatto.", line: "Bozza in cartella, fattura inviata. A te resta solo rileggere." },
]

/* ───────────────────────── Piano e camera ───────────────────────── */

// Posizioni dei pannelli sul piano (px logici).
const P = {
  rec: { x: 40, y: 170, w: 250, h: 260 },
  tr: { x: 320, y: 100, w: 330, h: 390 },
  note: { x: 680, y: 100, w: 290, h: 226 },
  inv: { x: 680, y: 340, w: 290, h: 150 },
}

type Shot = { cx: number; cy: number; z: number }
// Inquadratura per scena. Da 640px in su il film occupa un riquadro 780x640
// (accanto, o sotto, la didascalia); su telefono la finestra è stretta e
// verticale e la camera sta su un pannello alla volta.
const VIEW = {
  desk: {
    w: 780,
    h: 640,
    shots: [
      { cx: 165, cy: 300, z: 1.85 },
      { cx: 345, cy: 296, z: 1.18 },
      { cx: 645, cy: 296, z: 1.12 },
      { cx: 825, cy: 385, z: 1.85 },
      { cx: 505, cy: 296, z: 0.8 },
    ] as Shot[],
  },
  phone: {
    w: 420,
    h: 500,
    shots: [
      { cx: 165, cy: 300, z: 1.4 },
      { cx: 485, cy: 296, z: 1.18 },
      { cx: 800, cy: 250, z: 1.2 },
      { cx: 825, cy: 392, z: 1.3 },
      { cx: 825, cy: 296, z: 1.1 },
    ] as Shot[],
  },
}

type Clock = { scene: number; ms: number }
type Action = { type: "tick"; dt: number } | { type: "jump"; scene: number }
const TICK = 50
function clockReducer(c: Clock, a: Action): Clock {
  if (a.type === "jump") return { scene: a.scene, ms: 0 }
  return c.ms + a.dt >= DUR[c.scene] ? { scene: (c.scene + 1) % DUR.length, ms: 0 } : { scene: c.scene, ms: c.ms + a.dt }
}

/* ───────────────────────── Pezzi ───────────────────────── */

// Un pannello sul piano. `show` lo fa entrare quando la storia ci arriva.
function Panel({ box, children, show = true, still = false }: { box: { x: number; y: number; w: number; h: number }; children: ReactNode; show?: boolean; still?: boolean }) {
  return (
    <motion.div
      className="absolute overflow-hidden rounded-2xl border bg-white"
      style={{ left: box.x, top: box.y, width: box.w, height: box.h, borderColor: "rgba(255,255,255,0.55)", boxShadow: "0 26px 70px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.28)", fontFamily: SANS }}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 26, scale: show ? 1 : 0.95, filter: show ? "blur(0px)" : "blur(10px)" }}
      transition={{ duration: still ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1]
const lineV = {
  enter: { y: "112%" },
  show: { y: "0%", transition: { duration: 0.65, ease: EASE } },
  exit: { y: "-112%", transition: { duration: 0.28, ease: "easeIn" as const } },
}
const fadeV = {
  enter: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
}

// La didascalia: numero, parola grande e una riga. A ogni scena la riga vecchia
// esce verso l'alto e la nuova sale da sotto, dietro una maschera.
function Kinetic({ scene, still }: { scene: number; still: boolean }) {
  const s = SCENES[scene]
  const body = (
    <>
      <div className="overflow-hidden">
        <motion.div variants={lineV} className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ fontFamily: MONO, color: MINT }}>
          {s.n}
        </motion.div>
      </div>
      <div className="mt-2 overflow-hidden pb-[0.14em]">
        <motion.div variants={lineV} className="text-[2.3rem] leading-[1.06] tracking-[-0.01em] text-white lg:text-[2.6rem] xl:text-[3.3rem]" style={{ fontFamily: SERIF }}>
          {s.word}
        </motion.div>
      </div>
      <motion.p variants={fadeV} className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-white/65 lg:text-[15px]">
        {s.line}
      </motion.p>
    </>
  )
  return (
    <div className="min-h-[10.5rem] lg:min-h-[17rem]">
      {still ? (
        <motion.div initial={false} animate="show">{body}</motion.div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={scene} initial="enter" animate="show" exit="exit" transition={{ staggerChildren: 0.07 }}>
            {body}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

const GRAIN = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)
const STAGE_BG = "linear-gradient(150deg, #00122F 0%, #06203F 55%, #0A2F4B 100%)"
const GRID_BG = "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
// Dove sta la luce in ogni scena (in % del palco) e quanto pesano il blu e il verde acqua.
const GLOW = [
  { x: "52%", y: "40%", blue: 0.55, teal: 0.05 },
  { x: "58%", y: "45%", blue: 0.5, teal: 0.2 },
  { x: "70%", y: "42%", blue: 0.35, teal: 0.4 },
  { x: "74%", y: "58%", blue: 0.22, teal: 0.55 },
  { x: "64%", y: "48%", blue: 0.38, teal: 0.45 },
]

function Caret() {
  return <motion.span aria-hidden className="ml-px inline-block h-[1em] w-[1.5px] translate-y-[2px]" style={{ background: GREEN }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
}

export function SessionFilm() {
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const recBtnRef = useRef<HTMLDivElement>(null)
  const invBtnRef = useRef<HTMLDivElement>(null)
  const srcRefs = useRef<(HTMLSpanElement | null)[]>([])
  const dstRefs = useRef<(HTMLDivElement | null)[]>([])
  const inView = useInView(stageRef, { margin: "-80px" })

  const [clock, dispatch] = useReducer(clockReducer, { scene: 0, ms: 0 })
  const [stageW, setStageW] = useState<number | null>(null)
  const [phone, setPhone] = useState(false)

  // Con prefers-reduced-motion: fotogramma finale, fermo.
  const scene = reduce ? LAST : clock.scene
  const ms = reduce ? DUR[LAST] : clock.ms

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const mq = window.matchMedia("(min-width: 640px)")
    const update = () => {
      setStageW(el.clientWidth)
      setPhone(!mq.matches)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    mq.addEventListener("change", update)
    return () => {
      ro.disconnect()
      mq.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (reduce || !inView) return
    // Il tempo avanza del tempo reale trascorso, non di un passo fisso: su un
    // dispositivo lento il film perde fotogrammi ma non rallenta.
    let last = performance.now()
    const id = setInterval(() => {
      const now = performance.now()
      dispatch({ type: "tick", dt: Math.min(250, now - last) })
      last = now
    }, TICK)
    return () => clearInterval(id)
  }, [reduce, inView])

  /* ── Stato derivato da (scena, ms) ── */
  const recPressed = scene === 0 && ms >= 1400 && ms < 1600
  const recording = scene === 0 ? ms >= 1600 : scene === 1
  const recDone = scene >= 2
  const seconds = scene === 0 ? Math.max(0, Math.floor((ms - 1600) / 1000)) : 1 + Math.floor(ms / 1000)

  const typing = scene === 1 && ms >= TYPE_START && ms < TYPE_END
  const turnChars = (i: number) => (scene > 1 ? Infinity : scene < 1 ? -1 : ms < TURN_START[i] ? -1 : (ms - TURN_START[i]) * CPS)

  const highlighted = (i: number) => scene > 2 || (scene === 2 && ms >= H_START(i))
  const flyIndex = scene === 2 ? NOTE.findIndex((_n, i) => ms >= H_START(i) + FLY_FROM && ms < H_START(i) + FLY_FROM + FLY_MS + 100) : -1
  const noteChars = (i: number) => (scene > 2 ? Infinity : scene < 2 ? 0 : Math.max(0, (ms - H_START(i) - FLY_FROM - FLY_MS) * CPS))
  const noteReady = scene > 2 || (scene === 2 && ms >= NOTE_READY)

  const invShown = scene >= 3
  const invPressed = scene === 3 && ms >= 2100 && ms < 2300
  const invSending = scene === 3 && ms >= 2300 && ms < 3400
  const invSent = scene > 3 || (scene === 3 && ms >= 3400)

  const cursorKey = scene === 0 && ms >= 350 && ms < 1900 ? "rec" : scene === 3 && ms >= 900 && ms < 2700 ? "inv" : null
  const pressed = recPressed || invPressed

  /* ── Misure sul piano (indipendenti da camera e scala) ── */
  const toWorld = (el: Element | null) => {
    const world = worldRef.current
    if (!el || !world) return null
    const w = world.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const k = w.width / 1000
    if (!k) return null
    return { x: (r.left - w.left) / k, y: (r.top - w.top) / k, w: r.width / k, h: r.height / k }
  }

  const [cursor, setCursor] = useState<{ key: string; x: number; y: number } | null>(null)
  useLayoutEffect(() => {
    if (!cursorKey) return setCursor(null)
    const b = toWorld(cursorKey === "rec" ? recBtnRef.current : invBtnRef.current)
    if (b) setCursor({ key: cursorKey, x: b.x + b.w * 0.62, y: b.y + b.h * 0.55 })
  }, [cursorKey])

  const [fly, setFly] = useState<{ i: number; from: { x: number; y: number }; to: { x: number; y: number } } | null>(null)
  useLayoutEffect(() => {
    if (flyIndex < 0) return setFly(null)
    const a = toWorld(srcRefs.current[flyIndex])
    const b = toWorld(dstRefs.current[flyIndex])
    if (a && b) setFly({ i: flyIndex, from: { x: a.x, y: a.y - 2 }, to: { x: b.x, y: b.y + 14 } })
  }, [flyIndex])

  /* ── Camera ── */
  const view = phone ? VIEW.phone : VIEW.desk
  const shot = view.shots[scene]
  const fit = stageW ? stageW / view.w : 1
  const cam = { x: view.w / 2 - shot.cx * shot.z, y: view.h / 2 - shot.cy * shot.z, scale: shot.z }
  // Dissolvenza tra la fine del film e il nuovo inizio.
  const veil = !reduce && ((scene === LAST && ms > DUR[LAST] - 450) || (scene === 0 && ms < 150))

  const glow = GLOW[scene]

  return (
    <div className="mx-auto max-w-[1200px]" style={{ fontFamily: SANS }}>
      <div
        className="relative isolate overflow-hidden rounded-[26px] md:rounded-[36px]"
        style={{ background: STAGE_BG, boxShadow: "0 40px 100px -30px rgba(0,18,47,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
      >
        {/* Fondo: griglia sottile, due luci che si spostano con la storia, grana */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRID_BG, backgroundSize: "48px 48px", maskImage: "radial-gradient(90% 80% at 60% 45%, #000 30%, transparent 85%)", WebkitMaskImage: "radial-gradient(90% 80% at 60% 45%, #000 30%, transparent 85%)" }} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10 h-[90%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, #3B6FD4 0%, transparent 62%)", filter: "blur(60px)" }}
          initial={false}
          animate={{ left: glow.x, top: glow.y, opacity: glow.blue }}
          transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10 h-[80%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 62%)", filter: "blur(70px)" }}
          initial={false}
          animate={{ left: `calc(${glow.x} + 14%)`, top: `calc(${glow.y} + 22%)`, opacity: glow.teal }}
          transition={{ duration: reduce ? 0 : 1.4, ease: "easeInOut" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,${GRAIN}")` }} />

        <div className="grid lg:grid-cols-[36%_64%] lg:grid-rows-[1fr_auto]">
          {/* Didascalia cinetica */}
          <div className="px-6 pt-7 sm:px-9 sm:pt-9 lg:flex lg:flex-col lg:justify-center lg:px-12 lg:pt-12 xl:px-14">
            <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/40 lg:mb-8" style={{ fontFamily: MONO }}>
              Una seduta, dall'inizio alla fine
            </p>
            <Kinetic scene={scene} still={!!reduce} />
          </div>

          {/* Il film */}
          <div
            ref={stageRef}
            className="relative aspect-[420/500] w-full overflow-hidden sm:aspect-[780/640] lg:col-start-2 lg:row-span-2 lg:row-start-1"
            aria-label="Animazione illustrativa: ZenGest registra la seduta, la trascrive, scrive la bozza di nota clinica e invia la fattura"
            role="img"
          >
        {stageW !== null && (
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: view.w, height: view.h, transform: `scale(${fit})` }}>
            <motion.div className="absolute inset-0" animate={{ opacity: veil ? 0 : 1 }} transition={{ duration: 0.4 }}>
              <motion.div
                ref={worldRef}
                className="absolute left-0 top-0 origin-top-left"
                style={{ width: 1000, height: 600 }}
                initial={false}
                animate={cam}
                transition={reduce || scene === 0 ? { duration: 0 } : { duration: 1.15, ease: [0.65, 0, 0.2, 1] }}
              >
                {/* Onde attorno al registratore mentre la seduta è in corso */}
                {recording && !reduce && [0, 1].map((k) => (
                  <motion.span
                    key={k}
                    aria-hidden
                    className="absolute rounded-full border"
                    style={{ left: 165 - 150, top: 300 - 150, width: 300, height: 300, borderColor: "rgba(232,121,110,0.55)" }}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: [0.7, 1.55], opacity: [0.55, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: k * 1.1, ease: "easeOut" }}
                  />
                ))}

                {/* 1 · Registrazione */}
                <Panel box={P.rec} still={!!reduce}>
                  {!recording && !recDone ? (
                    <div className="flex h-full flex-col justify-center p-4">
                      <div className="mb-3.5 rounded-xl p-3" style={{ background: "#f6f5f2" }}>
                        <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[1.4px] text-stone-400">Paziente</div>
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: GREEN }}>GR</span>
                          <div className="min-w-0">
                            <div className="text-[13px] font-semibold text-stone-900">Giulia Rinaldi</div>
                            <div className="truncate text-[11px] text-stone-500">Seduta n. 14 · ansia</div>
                          </div>
                        </div>
                      </div>
                      <motion.div ref={recBtnRef} className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-semibold text-white" style={{ background: INK }} animate={{ scale: recPressed ? 0.95 : 1 }} transition={{ duration: 0.12 }}>
                        <Glyph d={ICON.mic} /> Registra sessione
                      </motion.div>
                      <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                        <span style={{ color: GREEN }}><Glyph d={ICON.shield} className="h-3 w-3" /></span> Consenso già acquisito
                      </p>
                    </div>
                  ) : (
                    <motion.div className="flex h-full flex-col items-center justify-center p-4 text-center" initial={{ opacity: reduce ? 1 : 0 }} animate={{ opacity: 1, backgroundColor: recDone ? GREEN_TINT : "#fbeceb" }} transition={{ duration: 0.4 }}>
                      <motion.span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-white" animate={{ backgroundColor: recDone ? GREEN : RED, scale: recDone || reduce ? 1 : [1, 1.07, 1] }} transition={recDone || reduce ? { duration: 0.4 } : { scale: { duration: 1.2, repeat: Infinity }, backgroundColor: { duration: 0.4 } }}>
                        <Glyph d={recDone ? ICON.check : ICON.mic} className="h-6 w-6" sw={recDone ? 2.6 : 2} />
                      </motion.span>
                      <div className="text-[13px] font-semibold text-stone-900">{recDone ? "Seduta registrata" : "Registrazione in corso"}</div>
                      <div className="mb-3 text-[11px] text-stone-500">Giulia Rinaldi · Seduta n. 14</div>
                      <div className="flex h-7 items-center gap-[3px]" aria-hidden>
                        {[10, 18, 8, 24, 12, 20, 9, 16, 11, 21, 13].map((h, i) => (
                          <motion.span key={i} className="w-[3px] rounded-full" style={{ background: recDone ? GREEN : RED, opacity: recDone ? 0.45 : 1 }} animate={recDone || reduce ? { height: h * 0.5 } : { height: [h, h * 0.3, h * 0.8, h * 0.4, h] }} transition={recDone || reduce ? { duration: 0.3 } : { duration: 1 + (i % 4) * 0.17, repeat: Infinity, ease: "easeInOut" }} />
                        ))}
                      </div>
                      <div className="mt-3 text-[12px] font-semibold tabular-nums text-stone-600">{recDone ? "52 min" : `00:00:${String(Math.min(59, seconds)).padStart(2, "0")}`}</div>
                    </motion.div>
                  )}
                </Panel>

                {/* 2 · Trascrizione */}
                <Panel box={P.tr} show={scene >= 1 && scene !== 3} still={!!reduce}>
                  <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "#f0efec", background: "#fbfcfb" }}>
                    <span className="text-[9.5px] font-bold uppercase tracking-[1px] text-stone-400">Trascrizione</span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold" style={{ background: GREEN_TINT, color: GREEN }}>
                      <Glyph d={ICON.shield} className="h-3 w-3" /> Pseudonimizzata
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    {TRANSCRIPT.map((turn, i) => {
                      let left = turnChars(i)
                      if (left < 0) return null
                      const live = typing && left < turnLen(turn)
                      return (
                        <div key={i}>
                          <div className="mb-0.5 text-[9.5px] font-bold uppercase tracking-[0.5px]" style={{ color: turn.who === "Terapeuta" ? GREEN : "#a8a29e" }}>{turn.who}</div>
                          <p className="m-0 text-[13px] leading-[1.55] text-stone-700">
                            {turn.frags.map((f, j) => {
                              if (left <= 0) return null
                              const n = fragLen(f)
                              const take = Math.min(n, Math.floor(left))
                              left -= n
                              if (typeof f === "string") return <span key={j}>{f.slice(0, take)}</span>
                              if ("t" in f) return <span key={j} className="mx-0.5 inline-flex items-center rounded px-1.5 py-0.5 align-baseline text-[10.5px] font-semibold" style={{ background: GREEN_TINT, color: GREEN }}>{f.t}</span>
                              const on = highlighted(f.h)
                              return (
                                <span
                                  key={j}
                                  ref={(el) => { srcRefs.current[f.h] = el }}
                                  className="rounded-[4px] transition-[background-color,box-shadow,color] duration-300"
                                  style={on ? { background: "rgba(13,148,136,0.16)", boxShadow: "0 0 0 2px rgba(13,148,136,0.16)", color: PINE } : undefined}
                                >
                                  {f.s.slice(0, take)}
                                </span>
                              )
                            })}
                            {live && <Caret />}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </Panel>

                {/* 3 · Nota clinica */}
                <Panel box={P.note} show={scene >= 2} still={!!reduce}>
                  <div className="flex items-center gap-2 border-b px-3.5 py-2.5" style={{ borderColor: "#f0efec" }}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: GREEN_TINT, color: GREEN }}><Glyph d={ICON.doc} className="h-3.5 w-3.5" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12px] font-semibold text-stone-900">Nota · Seduta n. 14</div>
                    </div>
                    <motion.span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold text-white" style={{ background: GREEN }} initial={false} animate={{ opacity: noteReady ? 1 : 0, scale: noteReady ? 1 : 0.7 }} transition={{ type: "spring", stiffness: 420, damping: 18 }}>
                      <Glyph d={ICON.check} className="h-2.5 w-2.5" sw={3.2} /> Bozza pronta
                    </motion.span>
                  </div>
                  <div className="flex flex-col gap-2 px-3.5 py-3">
                    {NOTE.map((n, i) => {
                      const c = noteChars(i)
                      const shown = n.text.slice(0, Math.floor(c))
                      const live = scene === 2 && c > 0 && c < n.text.length
                      return (
                        <div key={n.label} ref={(el) => { dstRefs.current[i] = el }} className="min-h-[46px]">
                          <div className="text-[9.5px] font-bold uppercase tracking-[0.6px]" style={{ color: c > 0 ? GREEN : "#d6d3d1" }}>{n.label}</div>
                          {c > 0 ? (
                            <p className="m-0 text-[12px] leading-[1.45] text-stone-700">{shown}{live && <Caret />}</p>
                          ) : (
                            <div className="mt-1.5 flex flex-col gap-1.5" aria-hidden>
                              <span className="h-[7px] w-[88%] rounded-full bg-stone-100" />
                              <span className="h-[7px] w-[56%] rounded-full bg-stone-100" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Panel>

                {/* 4 · Fattura */}
                <Panel box={P.inv} show={invShown} still={!!reduce}>
                    <div className="flex h-full flex-col px-3.5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: GREEN_TINT, color: GREEN }}><Glyph d={ICON.receipt} className="h-3.5 w-3.5" /></span>
                        <div className="min-w-0 flex-1 truncate text-[12px] font-semibold text-stone-900">Fattura n. 47</div>
                        <div className="text-[15px] text-stone-900" style={{ fontFamily: SERIF, fontWeight: 500 }}>€ 82,00</div>
                      </div>
                      <div className="mt-2 flex flex-col gap-0.5 text-[10.5px] text-stone-500">
                        <div className="flex justify-between"><span>Seduta di psicoterapia</span><span>€ 80,00</span></div>
                        <div className="flex justify-between"><span>Marca da bollo</span><span>€ 2,00</span></div>
                      </div>
                      <div className="relative mt-auto">
                        <motion.div
                          ref={invBtnRef}
                          className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11.5px] font-semibold"
                          animate={{ scale: invPressed ? 0.95 : 1, backgroundColor: invSent ? GREEN_TINT : INK, color: invSent ? GREEN : "#ffffff" }}
                          transition={{ duration: 0.15 }}
                        >
                          {invSent ? (
                            <><Glyph d={ICON.check} className="h-3.5 w-3.5" sw={3} /> Inviata al Sistema TS</>
                          ) : invSending ? (
                            <>
                              <motion.span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }} />
                              Invio in corso…
                            </>
                          ) : (
                            "Crea e invia a TS"
                          )}
                        </motion.div>
                      </div>
                    </div>
                </Panel>

                {/* Un anello che si allarga quando la fattura parte */}
                {scene === 3 && invSent && !reduce && (
                  <motion.span
                    key="sent"
                    aria-hidden
                    className="absolute rounded-2xl"
                    style={{ left: P.inv.x, top: P.inv.y, width: P.inv.w, height: P.inv.h, border: `2px solid ${MINT}` }}
                    initial={{ opacity: 0.9, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                )}

                {/* Frase che vola dalla trascrizione alla nota */}
                {fly && (
                  <motion.span
                    key={fly.i}
                    aria-hidden
                    className="absolute left-0 top-0 z-20 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[13px] font-medium text-white"
                    style={{ background: GREEN, boxShadow: "0 8px 24px rgba(0,18,47,0.30)" }}
                    initial={{ x: fly.from.x, y: fly.from.y, opacity: 1, scale: 1 }}
                    animate={{ x: fly.to.x, y: fly.to.y, opacity: [1, 1, 0], scale: [1.06, 1, 0.9] }}
                    transition={{ duration: FLY_MS / 1000, ease: [0.6, 0, 0.2, 1], opacity: { duration: FLY_MS / 1000, times: [0, 0.75, 1] } }}
                  >
                    {(TRANSCRIPT.flatMap((t) => t.frags).find((f) => typeof f !== "string" && "h" in f && f.h === fly.i) as { s: string }).s}
                  </motion.span>
                )}

                {/* Cursore */}
                {cursor && (
                  <motion.span
                    key={cursor.key}
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 z-30"
                    initial={{ x: cursor.x + 70, y: cursor.y + 80, opacity: 0 }}
                    animate={{ x: cursor.x, y: cursor.y, opacity: 1, scale: pressed ? 0.82 : 1 }}
                    transition={{ x: { duration: 0.9, ease: [0.3, 0, 0.2, 1] }, y: { duration: 0.9, ease: [0.3, 0, 0.2, 1] }, opacity: { duration: 0.25 }, scale: { duration: 0.12 } }}
                  >
                    {pressed && <motion.span className="absolute -left-3 -top-3 h-7 w-7 rounded-full" style={{ background: "rgba(13,148,136,0.35)" }} initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.45 }} />}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={INK} stroke="#fff" strokeWidth="1.3" className="relative drop-shadow"><path d="M5 2l15 9-7 1.2 3.4 7-2.8 1.3-3.3-7L5 18z" /></svg>
                  </motion.span>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
          </div>

          {/* Barra dei passaggi: mostra dove siamo e permette di saltare */}
          <div className="grid grid-cols-4 gap-2 px-6 pb-7 pt-4 sm:px-9 sm:pb-9 lg:gap-2.5 lg:px-12 lg:pb-12 lg:pt-0 xl:px-14" role="group" aria-label="Passaggi dell'animazione">
            {STEPS.map((label, i) => {
              const done = scene > i
              const active = scene === i
              const fill = done ? 1 : active ? Math.min(1, ms / DUR[i]) : 0
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => dispatch({ type: "jump", scene: i })}
                  disabled={!!reduce}
                  aria-label={`Vai al passaggio ${i + 1}: ${label}`}
                  className="group min-w-0 rounded-md py-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                >
                  <span className="block h-[3px] overflow-hidden rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                    <span className="block h-full origin-left rounded-full" style={{ background: `linear-gradient(90deg, ${MINT}, #A7BCF5)`, transform: `scaleX(${fill})`, transition: active ? "transform 80ms linear" : "transform 300ms ease" }} />
                  </span>
                  <span className="mt-2 flex items-baseline gap-1.5 text-[11.5px] font-semibold transition-colors" style={{ color: active || done ? "#ffffff" : "rgba(255,255,255,0.45)" }}>
                    <span className="hidden text-[10.5px] tabular-nums lg:inline" style={{ fontFamily: MONO }}>0{i + 1}</span>
                    <span className="truncate lg:hidden">{label}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[12px] text-slate-400">Interfaccia illustrativa: paziente e dati sono inventati.</p>
    </div>
  )
}
