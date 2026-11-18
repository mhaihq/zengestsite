import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

/**
 * Sticky stacked panels, one per ZenGest product. Each card carries a looping
 * line drawing that acts out the product's capabilities in order; the chip for
 * the capability on screen lights up under it.
 *
 * Each scene is a pure function of its clock `t` (seconds into the loop): things
 * draw in, act, and the whole frame fades out before the loop starts again. The
 * clock only runs while the card is on screen, and stops on reduced motion.
 *
 * Adapted from a 21st.dev "services stack" component; the drawings are ZenGest's.
 */

type Pt = [number, number];
type Step = [from: number, to: number, capability: string];
type Scene = { loop: number; still: number; steps: Step[]; Draw: (props: { t: number }) => ReactNode };

const W = 1280;
const H = 536;
const INK = "#00122F";
const ACCENT = "#3B6FD4";
const OK = "#0D9488";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const prog = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const inOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
const out = (p: number) => 1 - (1 - p) ** 3;
const back = (p: number) => (p <= 0 ? 0 : 1 + 2.70158 * (p - 1) ** 3 + 1.70158 * (p - 1) ** 2);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const mix = (a: Pt, b: Pt, p: number): Pt => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const quad = (a: Pt, c: Pt, b: Pt, p: number): Pt => mix(mix(a, c, p), mix(c, b, p), p);
const cubic = (a: Pt, c1: Pt, c2: Pt, b: Pt, p: number): Pt => quad(mix(a, c1, p), mix(c1, c2, p), mix(c2, b, p), p);
const pt = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const fade = (t: number, loop: number) => prog(t, 0, 0.25) * (1 - prog(t, loop - 0.7, loop));
const pad = (n: number) => String(n).padStart(2, "0");

/** Stroke-draw a shape from 0 (nothing) to 1 (whole outline). */
const draw = (p: number) =>
  ({ pathLength: 1, strokeDasharray: "1 1", strokeDashoffset: 1 - p, visibility: p > 0 ? "visible" : "hidden" }) as const;

const line = { fill: "none", stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const hair = { ...line, strokeWidth: 2, strokeOpacity: 0.22 } as const;
const mono = { fontFamily: MONO_FONT, letterSpacing: 1 } as const;

function Label({ x, y, children, o = 1, anchor = "start", size = 20, color = INK, strong = false }: {
  x: number; y: number; children: ReactNode; o?: number; anchor?: "start" | "middle" | "end"; size?: number; color?: string; strong?: boolean;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color} fillOpacity={strong ? 1 : 0.6} opacity={o} style={mono}>
      {children}
    </text>
  );
}

function Tick({ at, s, color = OK }: { at: Pt; s: number; color?: string }) {
  if (s <= 0) return null;
  return (
    <g transform={`translate(${pt(at)}) scale(${s})`}>
      <circle r={12} fill={color} />
      <path d="M-5 0l3.5 4l7 -8" {...line} stroke="#fff" strokeWidth={2.5} />
    </g>
  );
}

function Person({ at, color = INK, s = 1, opacity = 1 }: { at: Pt; color?: string; s?: number; opacity?: number }) {
  return (
    <g transform={`translate(${pt(at)}) scale(${s})`} opacity={opacity}>
      <circle cy={-12} r={8} fill={color} />
      <path d="M-13 16Q0 -4 13 16" {...line} stroke={color} />
    </g>
  );
}

/** A small file with a folded corner, 50×64, anchored at its top-left. */
function File({ at, s = 1, label, opacity = 1, fill = "#fff" }: { at: Pt; s?: number; label?: string; opacity?: number; fill?: string }) {
  return (
    <g transform={`translate(${pt(at)}) scale(${s})`} opacity={opacity}>
      <path d="M0 0H34L50 16V64H0Z" {...line} strokeWidth={2} fill={fill} />
      <path d="M34 0V16H50" {...line} strokeWidth={2} />
      {label && (
        <text x={25} y={48} textAnchor="middle" fontSize={15} fill={INK} fillOpacity={0.7} style={mono}>
          {label}
        </text>
      )}
    </g>
  );
}

function Chip({ x, y, w, text, on, dashed = false, o = 1 }: { x: number; y: number; w: number; text: string; on: boolean; dashed?: boolean; o?: number }) {
  return (
    <g opacity={o}>
      <rect x={x} y={y} width={w} height={34} rx={17} {...line} strokeWidth={2} strokeOpacity={on ? 1 : 0.35} strokeDasharray={dashed && !on ? "5 6" : undefined} fill={on ? INK : "#fff"} />
      <text x={x + w / 2} y={y + 23} textAnchor="middle" fontSize={17} fill={on ? "#fff" : INK} fillOpacity={on ? 1 : 0.7} style={mono}>
        {text}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * Cartella clinica: the consent is signed, the patient card fills with the    *
 * session prep, the sessions and their summary, the clinical context, the     *
 * documents, and a progress note that saves itself.                          *
 * ------------------------------------------------------------------------- */

const C_PREP = [150, 120, 165];
const C_SESSIONS = [450, 490, 530, 570, 610];
const C_CONTEXT = [180, 150, 170, 110];
const C_DOCS = [
  { label: "PDF", from: [985, 300] as Pt, to: [680, 300] as Pt },
  { label: "IMG", from: [1055, 300] as Pt, to: [737, 300] as Pt },
  { label: "DOC", from: [1125, 300] as Pt, to: [794, 300] as Pt },
];
const C_NOTE = [170, 120];

function Cartella({ t }: { t: number }) {
  const sent = inOut(prog(t, 1.8, 2.2));
  const ctxMove = (i: number) => inOut(prog(t, 6.8 + i * 0.12, 7.4 + i * 0.12));
  const typing = prog(t, 10, 11.2);

  return (
    <g opacity={fade(t, 13)}>
      {/* Consenso: the form is written, signed, and the card shows it */}
      <path d="M90 70H280L310 100V430H90Z" {...line} {...draw(inOut(prog(t, 0.1, 0.8)))} />
      <path d="M280 70V100H310" {...line} {...draw(prog(t, 0.7, 0.9))} />
      <line x1={115} y1={115} x2={235} y2={115} {...line} strokeWidth={5} {...draw(prog(t, 0.5, 0.9))} />
      {[180, 150, 190, 130, 170, 100].map((w, i) => (
        <line key={i} x1={115} y1={150 + i * 24} x2={115 + w} y2={150 + i * 24} {...line} strokeWidth={2} strokeOpacity={0.35} {...draw(prog(t, 0.6 + i * 0.08, 0.9 + i * 0.08))} />
      ))}
      <line x1={115} y1={390} x2={280} y2={390} {...hair} {...draw(prog(t, 1, 1.2))} />
      <path d="M120 380C135 348 145 390 158 368S180 348 185 376S210 388 220 360S242 368 270 372" {...line} {...draw(inOut(prog(t, 1.1, 1.7)))} />
      {sent > 0 && sent < 1 && <circle {...(() => { const [cx, cy] = quad([200, 375], [460, -10], [727, 100], sent); return { cx, cy }; })()} r={7} fill={OK} />}

      {/* The patient card */}
      <rect x={400} y={50} width={500} height={400} rx={18} {...line} fill="#fff" {...draw(inOut(prog(t, 0.2, 1)))} />
      <circle cx={450} cy={100} r={24} {...line} strokeWidth={2} {...draw(prog(t, 0.6, 1))} />
      <Person at={[450, 104]} s={0.75} opacity={prog(t, 0.8, 1.1)} />
      <line x1={490} y1={94} x2={630} y2={94} {...line} strokeWidth={5} {...draw(prog(t, 0.8, 1.2))} />
      <line x1={490} y1={114} x2={580} y2={114} {...line} strokeWidth={2} strokeOpacity={0.35} {...draw(prog(t, 0.9, 1.3))} />
      <line x1={400} y1={148} x2={900} y2={148} {...hair} {...draw(prog(t, 0.9, 1.4))} />
      <line x1={655} y1={168} x2={655} y2={430} {...hair} strokeDasharray="3 9" opacity={prog(t, 1, 1.4)} />
      <g opacity={prog(t, 2, 2.2)}>
        <rect x={705} y={82} width={170} height={36} rx={18} {...line} strokeWidth={2} strokeOpacity={0.3} />
        <Label x={748} y={106} size={18}>consenso</Label>
      </g>
      <Tick at={[727, 100]} s={back(prog(t, 2.1, 2.4))} />

      {/* Prep Sessione: what to pick up before the patient arrives */}
      {C_PREP.map((w, i) => {
        const y = 185 + i * 34;
        const p = out(prog(t, 2.3 + i * 0.25, 2.7 + i * 0.25));
        return (
          <g key={i} opacity={p} transform={`translate(${(1 - p) * 10} 0)`}>
            <rect x={425} y={y - 10} width={20} height={20} rx={5} {...line} strokeWidth={2} strokeOpacity={0.5} />
            <path d={`M429 ${y}l4 5l8 -9`} {...line} stroke={OK} {...draw(prog(t, 3.3 + i * 0.25, 3.5 + i * 0.25))} />
            <line x1={458} y1={y} x2={458 + w} y2={y} {...line} strokeWidth={2} strokeOpacity={0.4} />
          </g>
        );
      })}

      {/* Sessioni e riepilogo: the sessions line up, and a summary is drawn from them */}
      <line x1={440} y1={340} x2={625} y2={340} {...hair} {...draw(inOut(prog(t, 4, 4.5)))} />
      {C_SESSIONS.map((x, i) => (
        <circle key={x} cx={x} cy={340} r={7 * back(prog(t, 4.1 + i * 0.15, 4.4 + i * 0.15))} fill={INK} />
      ))}
      {C_SESSIONS.map((x, i) => {
        const p = prog(t, 4.9 + i * 0.08, 5.4 + i * 0.08);
        if (p <= 0 || p >= 1) return null;
        const [cx, cy] = mix([x, 340], [530, 302], inOut(p));
        return <circle key={`s${i}`} cx={cx} cy={cy} r={4} fill={ACCENT} opacity={Math.sin(Math.PI * p)} />;
      })}
      <rect x={425} y={288} width={210} height={28} rx={8} {...hair} {...draw(inOut(prog(t, 5, 5.5)))} />
      <line x1={438} y1={302} x2={600} y2={302} {...line} stroke={ACCENT} strokeWidth={3} {...draw(prog(t, 5.4, 5.9))} />

      {/* Contesto clinico: the anamnesis is pasted in from outside */}
      <g opacity={1 - prog(t, 7.4, 7.8)}>
        <rect x={960} y={70} width={220} height={160} rx={12} {...line} strokeWidth={2} {...draw(inOut(prog(t, 6, 6.5)))} />
        <Label x={980} y={102} size={18} o={prog(t, 6.2, 6.5)}>anamnesi</Label>
      </g>
      {C_CONTEXT.map((w, i) => {
        const p = ctxMove(i);
        const [x, y] = mix([980, 130 + i * 24], [680, 190 + i * 22], p);
        const len = lerp(w, w * 0.9, p);
        return <line key={i} x1={x} y1={y} x2={x + len} y2={y} {...line} strokeWidth={2} strokeOpacity={0.45} {...draw(prog(t, 6.2 + i * 0.1, 6.6 + i * 0.1))} />;
      })}
      <line x1={680} y1={172} x2={720} y2={172} {...line} stroke={ACCENT} strokeWidth={4} opacity={prog(t, 7.4, 7.7)} />

      {/* Documenti: reports, photos and files go into the record */}
      {C_DOCS.map(({ label, from, to }, i) => {
        const appear = back(prog(t, 7.9 + i * 0.12, 8.2 + i * 0.12));
        const p = inOut(prog(t, 8.5 + i * 0.3, 9.1 + i * 0.3));
        if (appear <= 0) return null;
        const pos = quad(from, [(from[0] + to[0]) / 2, 200], to, p);
        return <File key={label} at={pos} s={appear * lerp(1, 0.88, p)} label={label} />;
      })}

      {/* Note di andamento: dictated, written, and saved as a draft */}
      <g opacity={prog(t, 9.8, 10.1)}>
        <rect x={426} y={378} width={12} height={20} rx={6} {...line} strokeWidth={2} />
        <path d="M421 392a11 11 0 0 0 22 0M432 403v6" {...line} strokeWidth={2} />
        {typing > 0 && typing < 1 && <circle cx={432} cy={390} r={14 + ((t * 30) % 14)} {...line} stroke={ACCENT} strokeWidth={2} strokeOpacity={0.5 * (1 - ((t * 30) % 14) / 14)} />}
      </g>
      {C_NOTE.map((w, i) => (
        <line key={i} x1={460} y1={385 + i * 24} x2={460 + w} y2={385 + i * 24} {...line} strokeWidth={2} strokeOpacity={0.55} {...draw(prog(t, 10 + i * 0.6, 10.6 + i * 0.6))} />
      ))}
      <Tick at={[625, 397]} s={back(prog(t, 11.3, 11.6))} />
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * Note cliniche AI: the session is recorded, transcribed by speaker, turned   *
 * into a note in the chosen format, edited with one instruction, and shared.  *
 * ------------------------------------------------------------------------- */

const N_ROWS = [
  { who: "T", w: 240 },
  { who: "P", w: 180 },
  { who: "P", w: 260 },
  { who: "T", w: 150 },
  { who: "P", w: 220 },
  { who: "T", w: 250 },
];
const N_FORMATS = [
  { at: 0, name: "SOAP" },
  { at: 6.7, name: "DAP" },
  { at: 7.3, name: "BIRP" },
  { at: 7.9, name: "SOAP" },
];
const N_CHIPS = [
  { text: "SOAP", x: 850, w: 82 },
  { text: "DAP", x: 942, w: 70 },
  { text: "BIRP", x: 1022, w: 82 },
  { text: "il tuo", x: 1114, w: 98 },
];
const N_SECTIONS: [number, number][] = [[200, 150], [220, 170], [190, 130], [210, 120]];
const N_SHARE = [
  { text: "PDF", x: 850, w: 76 },
  { text: "email", x: 936, w: 96 },
  { text: "WhatsApp", x: 1042, w: 128 },
];

function NoteAI({ t }: { t: number }) {
  const amp = prog(t, 0.6, 0.9) * (1 - 0.75 * prog(t, 2.2, 2.6));
  const fmtIdx = N_FORMATS.reduce((acc, f, i) => (t >= f.at ? i : acc), 0);
  const fmt = N_FORMATS[fmtIdx];
  const redraw = fmtIdx === 0 ? 4.7 : fmt.at;
  const stagger = fmtIdx === 0 ? 0.35 : 0.08;
  const shrink = inOut(prog(t, 8.8, 9.4));
  const mins = Math.floor(t * 3.8);
  const secs = Math.floor(t * 228) % 60;

  return (
    <g opacity={fade(t, 13)}>
      {/* Registrazione */}
      <circle cx={170} cy={240} r={46} {...line} {...draw(inOut(prog(t, 0.1, 0.6)))} />
      <circle cx={170} cy={240} r={(14 + 2 * Math.sin(t * 6)) * back(prog(t, 0.5, 0.8))} fill={ACCENT} />
      {Array.from({ length: 8 }, (_, i) => {
        const h = (0.25 + 0.75 * Math.abs(Math.sin(t * 6 + i * 0.9))) * 70 * amp + 4;
        const x = 245 + i * 14;
        return <line key={i} x1={x} y1={240 - h / 2} x2={x} y2={240 + h / 2} {...line} strokeWidth={5} strokeOpacity={0.75} opacity={prog(t, 0.5, 0.8)} />;
      })}
      <Label x={170} y={325} anchor="middle" size={20} o={prog(t, 0.5, 0.8)}>
        {pad(mins)}:{pad(secs)}
      </Label>

      {/* Trascrizione per oratore */}
      <rect x={400} y={60} width={380} height={380} rx={14} {...hair} {...draw(inOut(prog(t, 2.2, 2.7)))} />
      {N_ROWS.map(({ who, w }, i) => {
        const y = 105 + i * 56;
        const s = 2.5 + i * 0.28;
        const p = prog(t, s, s + 0.35);
        const pk = prog(t, s - 0.4, s);
        return (
          <g key={i}>
            {pk > 0 && pk < 1 && <circle {...(() => { const [cx, cy] = quad([345, 240], [390, y], [440, y], pk); return { cx, cy }; })()} r={5} fill={who === "P" ? ACCENT : INK} />}
            <g opacity={p}>
              <Label x={425} y={y + 6} size={17} color={who === "P" ? ACCENT : INK} strong>
                {who}
              </Label>
              <line x1={455} y1={y} x2={455 + w} y2={y} {...line} strokeWidth={2} strokeOpacity={0.4} {...draw(p)} />
              <line x1={455} y1={y + 18} x2={455 + w * 0.6} y2={y + 18} {...line} strokeWidth={2} strokeOpacity={0.25} {...draw(p)} />
            </g>
          </g>
        );
      })}

      {/* Modelli Zen: the format chips */}
      {N_CHIPS.map((c, i) => (
        <Chip key={c.text} x={c.x} y={56} w={c.w} text={c.text} on={t >= 6.4 && N_CHIPS[i].text === fmt.name && i < 3} dashed={i === 3} o={prog(t, 6.4 + i * 0.08, 6.7 + i * 0.08)} />
      ))}

      {/* The note */}
      <rect x={850} y={110} width={350} height={330} rx={14} {...line} fill="#fff" {...draw(inOut(prog(t, 4.4, 5)))} />
      <rect x={890} y={198} width={290} height={62} rx={8} fill={ACCENT} fillOpacity={0.12 * prog(t, 8.4, 8.6) * (1 - prog(t, 9.8, 10.2))} />
      {N_SECTIONS.map(([w1, w2], i) => {
        const letter = fmt.name[i];
        if (!letter) return null;
        const y = 160 + i * 72;
        const p = inOut(prog(t, redraw + i * stagger, redraw + 0.4 + i * stagger));
        const k = i === 1 ? shrink : 0;
        return (
          <g key={i}>
            <Label x={872} y={y + 16} size={24} o={p} strong>
              {letter}
            </Label>
            <line x1={905} y1={y + 2} x2={905 + w1 * lerp(1, 0.6, k)} y2={y + 2} {...line} strokeWidth={2} strokeOpacity={0.45} {...draw(p)} />
            <line x1={905} y1={y + 24} x2={905 + w2 * lerp(1, 0, k)} y2={y + 24} {...line} strokeWidth={2} strokeOpacity={0.3} opacity={1 - k} {...draw(p)} />
          </g>
        );
      })}

      {/* Modifica magica */}
      <g opacity={prog(t, 8.3, 8.6) * (1 - prog(t, 9.8, 10.2))}>
        <rect x={990} y={118} width={198} height={32} rx={16} fill={ACCENT} fillOpacity={0.1} />
        <path d="M0 -10L2.5 -2.5L10 0L2.5 2.5L0 10L-2.5 2.5L-10 0L-2.5 -2.5Z" fill={ACCENT} transform={`translate(1010 134) rotate(${t * 60})`} />
        <Label x={1176} y={140} anchor="end" size={17} color={ACCENT} strong>
          «più concisa»
        </Label>
      </g>
      <Tick at={[1160, 229]} s={back(prog(t, 9.5, 9.8)) * (1 - prog(t, 10, 10.2))} />

      {/* Export */}
      {N_SHARE.map((c, i) => {
        const p = out(prog(t, 10.4 + i * 0.3, 10.8 + i * 0.3));
        return (
          <g key={c.text} transform={`translate(0 ${(1 - p) * -24})`}>
            <Chip x={c.x} y={456} w={c.w} text={c.text} on={false} o={p} />
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * Assistente Zen: questions about the patient, answered from their record;    *
 * an approach agent, your own agent, an editable document, an attachment.     *
 * ------------------------------------------------------------------------- */

const Z_SOURCES = ["sedute", "note", "documenti"];
const Z_AGENTS = [
  { text: "CBT", x: 90, y: 292, w: 64 },
  { text: "EMDR", x: 164, y: 292, w: 76 },
  { text: "forense", x: 250, y: 292, w: 108 },
  { text: "sistemico", x: 90, y: 340, w: 132 },
  { text: "psicodinamico", x: 232, y: 340, w: 176 },
];
const Z_MINE = { text: "+ il tuo", x: 90, y: 388, w: 118 };
const Z_EX = [
  { a: 0.3, b: 2.2, q: "prepara la seduta", lines: [200, 170, 220], bullets: true },
  { a: 2.3, b: 4.4, q: "quali temi ricorrono?", lines: [270, 230, 250, 140], bullets: false },
  { a: 4.5, b: 6.2, q: "rileggi in chiave CBT", lines: [240, 270, 180], bullets: false },
  { a: 6.3, b: 8, q: "usa il mio protocollo", lines: [230, 260, 200], bullets: false },
  { a: 8.1, b: 10.2, q: "scrivi una relazione", lines: [150], bullets: false },
  { a: 10.3, b: 13.5, q: "cosa ne pensi?", lines: [250, 220, 160], bullets: false },
];

function Assistente({ t }: { t: number }) {
  const ex = Z_EX.find((e) => t >= e.a && t < e.b);
  const mineOn = t >= 6.9 && t < 8;
  const clip = inOut(prog(t, 10.4, 10.9));

  return (
    <g opacity={fade(t, 13)}>
      {/* The patient's record, the only thing the assistant reads */}
      {Z_SOURCES.map((s, i) => {
        const y = 70 + i * 60;
        const lit = ex ? prog(t, ex.a + 0.7, ex.a + 0.9) * (1 - prog(t, ex.a + 1.2, ex.a + 1.5)) : 0;
        return (
          <g key={s}>
            <rect x={90} y={y} width={250} height={44} rx={10} {...line} strokeWidth={2} stroke={lit > 0.5 ? ACCENT : INK} strokeOpacity={0.5 + 0.5 * lit} {...draw(inOut(prog(t, 0.1 + i * 0.1, 0.6 + i * 0.1)))} />
            <Label x={112} y={y + 28} size={18} o={prog(t, 0.4 + i * 0.1, 0.7 + i * 0.1)}>
              {s}
            </Label>
          </g>
        );
      })}

      {/* Agents: the built-in approaches, then your own */}
      {Z_AGENTS.map((a, i) => (
        <Chip key={a.text} x={a.x} y={a.y} w={a.w} text={a.text} on={a.text === "CBT" && t >= 4.8 && t < 6.2} o={prog(t, 4.5 + i * 0.1, 4.8 + i * 0.1)} />
      ))}
      <Chip x={Z_MINE.x} y={Z_MINE.y} w={Z_MINE.w} text={mineOn ? "il tuo" : Z_MINE.text} on={mineOn} dashed o={prog(t, 6.3, 6.5)} />
      {(() => {
        const p = inOut(prog(t, 6.4, 6.9));
        if (p <= 0 || p >= 1) return null;
        return <File at={quad([230, 440], [280, 380], [150, 392], p)} s={0.5} label="" />;
      })()}
      {(t >= 4.8 && t < 6.2) || mineOn ? (
        <path d={mineOn ? "M202 405C300 405 330 250 420 250" : "M156 309C300 309 330 250 420 250"} {...hair} strokeOpacity={0.4} strokeDasharray="4 8" />
      ) : null}

      {/* Chat */}
      <rect x={420} y={50} width={400} height={400} rx={16} {...line} fill="#fff" {...draw(inOut(prog(t, 0.1, 0.7)))} />
      <rect x={440} y={396} width={360} height={38} rx={19} {...hair} {...draw(prog(t, 0.5, 0.8))} />
      {ex && (() => {
        const typed = Math.floor(prog(t, ex.a, ex.a + 0.6) * ex.q.length);
        const sent = t >= ex.a + 0.7;
        const exit = 1 - prog(t, ex.b - 0.25, ex.b);
        const qw = ex.q.length * 11.2 + 36;
        const ah = ex.lines.length * 28 + 24;
        const answer = prog(t, ex.a + 1, ex.a + 1.2);
        const attach = ex.a === 10.3;
        return (
          <g opacity={exit}>
            {!sent && (
              <Label x={460} y={421} size={17} strong>
                {ex.q.slice(0, typed)}
                {(t * 2) % 1 < 0.5 ? "_" : ""}
              </Label>
            )}
            {sent && (
              <g opacity={prog(t, ex.a + 0.7, ex.a + 0.85)}>
                <rect x={800 - qw} y={70} width={qw} height={38} rx={12} fill={INK} />
                <text x={800 - qw / 2} y={95} textAnchor="middle" fontSize={17} fill="#fff" style={mono}>
                  {ex.q}
                </text>
                {attach && <File at={[800 - qw - 40, 70]} s={0.55} label="" />}
              </g>
            )}
            {Z_SOURCES.map((_, i) => {
              const p = prog(t, ex.a + 0.75 + i * 0.08, ex.a + 1.15 + i * 0.08);
              if (p <= 0 || p >= 1) return null;
              const [cx, cy] = quad([340, 92 + i * 60], [400, 140], [455, 145], inOut(p));
              return <circle key={i} cx={cx} cy={cy} r={5} fill={ACCENT} opacity={Math.sin(Math.PI * p)} />;
            })}
            {answer > 0 && (
              <g opacity={answer}>
                <rect x={440} y={126} width={340} height={ah} rx={12} fill={ACCENT} fillOpacity={0.08} />
                {ex.lines.map((w, i) => {
                  const y = 150 + i * 28;
                  const p = prog(t, ex.a + 1.1 + i * 0.15, ex.a + 1.4 + i * 0.15);
                  return (
                    <g key={i}>
                      {ex.bullets && <rect x={458} y={y - 8} width={16} height={16} rx={4} {...line} strokeWidth={2} strokeOpacity={0.5} opacity={p} />}
                      <line x1={ex.bullets ? 486 : 460} y1={y} x2={(ex.bullets ? 486 : 460) + w} y2={y} {...line} strokeWidth={2} strokeOpacity={0.5} {...draw(p)} />
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        );
      })()}

      {/* Documenti modificabili: the report opens as a document, gets edited, keeps versions */}
      <g opacity={1 - prog(t, 12.3, 12.6)}>
        <rect x={912} y={52} width={270} height={290} rx={10} {...hair} opacity={prog(t, 9.6, 9.9)} />
        <rect x={900} y={64} width={270} height={290} rx={10} {...hair} opacity={prog(t, 9.6, 9.9)} />
        <rect x={888} y={76} width={270} height={290} rx={10} {...line} fill="#fff" {...draw(inOut(prog(t, 8.6, 9.2)))} />
        <line x1={910} y1={110} x2={1030} y2={110} {...line} strokeWidth={5} {...draw(prog(t, 8.9, 9.2))} />
        {[200, 180, 210, 150, 190, 120].map((w, i) => {
          const edited = i === 2;
          const e = prog(t, 9.3, 9.7);
          return (
            <line key={i} x1={910} y1={150 + i * 30} x2={910 + (edited ? lerp(w, 160, e) : w)} y2={150 + i * 30} {...line} strokeWidth={2} stroke={edited && e > 0 ? ACCENT : INK} strokeOpacity={edited && e > 0 ? 0.9 : 0.35} {...draw(prog(t, 9 + i * 0.06, 9.3 + i * 0.06))} />
          );
        })}
        {t >= 9.3 && t < 9.8 && <line x1={1072} y1={200} x2={1072} y2={220} {...line} stroke={ACCENT} opacity={(t * 4) % 1 < 0.5 ? 1 : 0} />}
        <Label x={1170} y={42} anchor="end" size={17} o={prog(t, 9.6, 9.9)}>
          v1 · v2
        </Label>
        <Label x={888} y={392} size={18} o={prog(t, 9.9, 10.2)}>
          PDF · Word
        </Label>
      </g>

      {/* Allegati: a file or a photo goes into the question */}
      {t >= 10.2 && clip < 1 && <File at={mix([1060, 410], [450, 398], clip)} s={lerp(0.9, 0.55, clip)} label="IMG" opacity={prog(t, 10.2, 10.4)} />}
    </g>
  );
}

/* ------------------------------------------------------------------------- *
 * Fatturazione: unbilled sessions become an invoice, ENPAP and stamp duty are *
 * added, it goes to Sistema TS (or SdI for companies), the forfettario        *
 * threshold fills, and the year's files go to the accountant.                 *
 * ------------------------------------------------------------------------- */

const F_SESSIONS = [
  { label: "seduta 29/10", billed: true },
  { label: "seduta 05/11", billed: true },
  { label: "seduta 12/11", billed: false },
  { label: "seduta 19/11", billed: false },
];
const F_EXPORT = [
  { label: "CSV", start: 10 },
  { label: "XML", start: 10.4 },
];

function Fatturazione({ t }: { t: number }) {
  const toTs = inOut(prog(t, 4.2, 5));
  const toSdi = inOut(prog(t, 6.2, 7));
  const fill = inOut(prog(t, 8.1, 9.2));

  return (
    <g opacity={fade(t, 13)}>
      {/* Sessions not yet invoiced are picked */}
      <rect x={90} y={70} width={250} height={250} rx={14} {...hair} {...draw(inOut(prog(t, 0.1, 0.6)))} />
      {F_SESSIONS.map(({ label, billed }, i) => {
        const y = 115 + i * 52;
        const p = out(prog(t, 0.3 + i * 0.12, 0.7 + i * 0.12));
        return (
          <g key={label} opacity={p * (billed ? 0.4 : 1)}>
            <rect x={110} y={y - 11} width={22} height={22} rx={5} {...line} strokeWidth={2} strokeOpacity={0.5} />
            {(billed || t >= 0.9 + (i - 2) * 0.2) && <path d={`M114 ${y}l5 5l9 -10`} {...line} stroke={billed ? INK : OK} {...draw(billed ? 1 : prog(t, 0.9 + (i - 2) * 0.2, 1.1 + (i - 2) * 0.2))} />}
            <Label x={146} y={y + 6} size={18}>
              {label}
            </Label>
          </g>
        );
      })}
      {[2, 3].map((i) => {
        const p = prog(t, 1.3 + (i - 2) * 0.2, 1.8 + (i - 2) * 0.2);
        if (p <= 0 || p >= 1) return null;
        const [cx, cy] = quad([320, 115 + i * 52], [380, 120], [450, 160 + (i - 2) * 36], inOut(p));
        return <circle key={i} cx={cx} cy={cy} r={6} fill={OK} />;
      })}

      {/* The invoice */}
      <path d="M420 60H690L720 90V440H420Z" {...line} fill="#fff" {...draw(inOut(prog(t, 0.2, 1)))} />
      <path d="M690 60V90H720" {...line} {...draw(prog(t, 0.9, 1.1))} />
      <Label x={445} y={110} size={20} o={prog(t, 0.8, 1.1)} strong>
        FATTURA
      </Label>
      {["seduta 12/11", "seduta 19/11"].map((l, i) => {
        const y = 160 + i * 36;
        const p = prog(t, 1.7 + i * 0.2, 1.9 + i * 0.2);
        return (
          <g key={l} opacity={p}>
            <Label x={445} y={y + 6} size={18}>
              {l}
            </Label>
            <line x1={650} y1={y} x2={695} y2={y} {...line} strokeWidth={2} strokeOpacity={0.5} />
          </g>
        );
      })}
      <line x1={440} y1={232} x2={700} y2={232} {...hair} {...draw(prog(t, 2.2, 2.5))} />
      {["ENPAP 2%", "bollo €2"].map((l, i) => {
        const y = 265 + i * 36;
        const p = out(prog(t, 2.4 + i * 0.5, 2.8 + i * 0.5));
        return (
          <g key={l} opacity={p} transform={`translate(${(1 - p) * 12} 0)`}>
            <Label x={445} y={y + 6} size={18} color={ACCENT} strong>
              {l}
            </Label>
            <line x1={660} y1={y} x2={695} y2={y} {...line} stroke={ACCENT} strokeWidth={2} />
          </g>
        );
      })}
      <Label x={445} y={366} size={18} o={prog(t, 3.4, 3.7)} strong>
        totale
      </Label>
      <line x1={620} y1={360} x2={695} y2={360} {...line} strokeWidth={5} {...draw(prog(t, 3.4, 3.8))} />

      {/* Where it goes: Sistema TS for patients, SdI for companies */}
      {[
        { y: 90, label: "Sistema TS", note: "protocollo", go: toTs, done: 5.2 },
        { y: 250, label: "SdI", note: "consegnata", go: toSdi, done: 7.2 },
      ].map(({ y, label, note, go, done }, i) => {
        const flash = prog(t, done - 0.2, done + 0.4);
        const [ex, ey] = cubic([720, 250], [820, 250], [900, y + 40], [1000, y + 40], go);
        return (
          <g key={label}>
            <path d={`M720 250C820 250 900 ${y + 40} 1000 ${y + 40}`} {...hair} strokeDasharray="4 8" opacity={prog(t, 3.9 + i * 0.1, 4.2 + i * 0.1)} />
            <rect x={1000} y={y} width={190} height={80} rx={14} {...line} fill="#fff" {...draw(inOut(prog(t, 3.8 + i * 0.15, 4.3 + i * 0.15)))} />
            <Label x={1095} y={y + 47} anchor="middle" size={18} o={prog(t, 4.1 + i * 0.15, 4.4 + i * 0.15)} strong>
              {label}
            </Label>
            {flash > 0 && flash < 1 && <rect x={1000 - 14 * out(flash)} y={y - 14 * out(flash)} width={190 + 28 * out(flash)} height={80 + 28 * out(flash)} rx={20} {...line} stroke={OK} strokeWidth={2} strokeOpacity={1 - flash} />}
            {go > 0 && go < 1 && (
              <g transform={`translate(${ex - 18} ${ey - 12})`}>
                <rect width={36} height={24} rx={4} {...line} strokeWidth={2} fill="#fff" stroke={ACCENT} />
                <path d="M0 0L18 13L36 0" {...line} strokeWidth={2} stroke={ACCENT} />
              </g>
            )}
            <Tick at={[1016, y + 108]} s={back(prog(t, done, done + 0.3))} />
            <Label x={1038} y={y + 114} size={18} o={prog(t, done + 0.1, done + 0.4)}>
              {note}
            </Label>
          </g>
        );
      })}

      {/* Forfettario: the year's revenue against the threshold */}
      <g opacity={prog(t, 7.8, 8.1)}>
        <rect x={90} y={356} width={276} height={34} rx={17} {...hair} />
        <rect x={92} y={358} width={152} height={30} rx={15} fill={INK} />
        <text x={168} y={379} textAnchor="middle" fontSize={17} fill="#fff" style={mono}>
          forfettario
        </text>
        <Label x={305} y={379} anchor="middle" size={17}>
          ordinario
        </Label>
        <line x1={90} y1={428} x2={340} y2={428} {...line} strokeWidth={10} strokeOpacity={0.1} />
        <line x1={90} y1={428} x2={90 + 250 * 0.42 * fill} y2={428} {...line} strokeWidth={10} stroke={OK} opacity={fill > 0 ? 1 : 0} />
        <line x1={340} y1={414} x2={340} y2={442} {...line} strokeWidth={2} strokeOpacity={0.5} />
        <Label x={90} y={466} size={17}>
          fatturato · soglia
        </Label>
      </g>

      {/* Export per il commercialista */}
      <Person at={[1058, 452]} s={1.1} opacity={prog(t, 9.8, 10.1)} />
      <Label x={1086} y={460} size={18} o={prog(t, 9.9, 10.2)}>
        commercialista
      </Label>
      {F_EXPORT.map(({ label, start }, i) => {
        const p = inOut(prog(t, start, start + 0.8));
        if (p <= 0) return null;
        const pos = quad([560, 380], [800, 520], [940 + i * 34, 420], p);
        return <File key={label} at={pos} s={lerp(0.5, 0.8, p)} label={label} />;
      })}
      <Tick at={[1016, 420]} s={back(prog(t, 11.2, 11.5))} />
    </g>
  );
}

const scenes: Record<string, Scene> = {
  cartella: {
    loop: 13,
    still: 11.9,
    Draw: Cartella,
    steps: [
      [0, 2.2, "Consenso digitale"],
      [2.2, 4, "Prep Sessione"],
      [4, 6, "Sessioni e riepilogo"],
      [6, 7.8, "Contesto clinico"],
      [7.8, 9.8, "Documenti"],
      [9.8, 13, "Note di andamento"],
    ],
  },
  note: {
    loop: 13,
    still: 11.8,
    Draw: NoteAI,
    steps: [
      [0, 2.2, "Registrazione"],
      [2.2, 4.4, "Trascrizione per oratore"],
      [4.4, 6.4, "Nota SOAP, DAP, BIRP"],
      [6.4, 8.2, "Modelli Zen"],
      [8.2, 10.2, "Modifica magica"],
      [10.2, 13, "Export e condivisione"],
    ],
  },
  assistente: {
    loop: 13,
    still: 9.95,
    Draw: Assistente,
    steps: [
      [0, 2.2, "Prepara la seduta"],
      [2.2, 4.4, "Ragiona sul caso"],
      [4.4, 6.2, "Agenti per approccio"],
      [6.2, 8, "I tuoi agenti"],
      [8, 10.2, "Documenti modificabili"],
      [10.2, 13, "Allegati"],
    ],
  },
  fatturazione: {
    loop: 13,
    still: 11.9,
    Draw: Fatturazione,
    steps: [
      [0, 2.2, "Fattura dalle sedute"],
      [2.2, 4, "ENPAP e marca da bollo"],
      [4, 6, "Invio al Sistema TS"],
      [6, 7.8, "Fattura elettronica SdI"],
      [7.8, 9.8, "Forfettario o ordinario"],
      [9.8, 13, "Export per il commercialista"],
    ],
  },
};

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

function ServiceAnimation({ id, title, onStep }: { id: string; title: string; onStep?: (capability: string | undefined) => void }) {
  const scene = scenes[id];
  const svg = useRef<SVGSVGElement>(null);
  const [clock, setClock] = useState(0);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const loop = scene?.loop ?? 1;

  useEffect(() => {
    const el = svg.current;
    if (!el || reduced) return;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      if (last) elapsed += Math.min(0.1, (now - last) / 1000);
      last = now;
      setClock(elapsed % loop);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, loop]);

  const t = reduced ? (scene?.still ?? 0) : clock;
  const step = scene?.steps.find(([a, b]) => t >= a && t < b)?.[2];

  useEffect(() => {
    onStep?.(step);
  }, [step, onStep]);

  if (!scene) return null;
  const { Draw, steps } = scene;

  return (
    <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={title}>
      <Draw t={t} />
      {steps.map(([a, b, name]) => {
        const o = prog(t, a, a + 0.3) * (1 - prog(t, b - 0.3, b));
        return o > 0 ? (
          <text key={name} x={90} y={514 + (1 - o) * 8} fontSize={24} fill={INK} fillOpacity={0.55} opacity={o} style={mono}>
            {name}
          </text>
        ) : null;
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------------- *
 * The section: full-height panels stack while scrolling (sticky cards), and   *
 * the sticky background cross-fades per active product.                       *
 * ------------------------------------------------------------------------- */

export type Service = {
  /** Which built-in drawing: "cartella" | "note" | "assistente" | "fatturazione". */
  id: string;
  title: string;
  text: string;
  /** Must match the scene's step names so the chip lights up with the drawing. */
  capabilities: string[];
  href?: string;
  price?: string;
  /** CSS background for this panel (gradient or url()). */
  bg?: string;
};

const FALLBACK_BG = "linear-gradient(180deg, #00122F 0%, #1E3A7A 55%, #3B6FD4 100%)";

const panelClass =
  "sticky top-0 mx-auto grid min-h-screen w-full max-w-[104.5rem] origin-top content-center items-center px-4 py-6 sm:px-16 md:px-9 lg:grid-cols-[5fr_7fr] lg:gap-10 lg:px-0 lg:py-20 lg:[@media(max-height:910px)]:py-10";

const capabilityClass =
  "relative items-baseline gap-2 rounded-lg bg-[#E4ECFA] px-2.5 pt-1.5 pb-2 transition-colors duration-500 before:bg-[#00122F] before:transition-colors before:duration-500 lg:flex lg:pt-2.5 lg:pb-3 lg:before:size-2 lg:before:shrink-0 lg:before:-translate-y-[20%] lg:before:rounded-full";

const activeCapabilityClass = "bg-[#C7D8F6] before:bg-[#3B6FD4]";

// Film grain drawn inline (no external image).
const GRAIN_SVG = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
);
const GRAIN_CSS = `
.ss-grain::after{content:"";position:absolute;top:0;left:0;width:140%;height:140%;opacity:.07;
background-image:url("data:image/svg+xml,${GRAIN_SVG}");animation:ss-grain 8s steps(10) infinite}
@keyframes ss-grain{0%{transform:translate(0)}10%,30%,50%,70%,90%{transform:translate(-5%,-10%)}20%,40%,60%,80%,100%{transform:translate(-15%,-20%)}}
@media (prefers-reduced-motion: reduce){.ss-grain::after{animation:none}}
`;

export type ServicesStackProps = {
  services: Service[];
  /** The line that sits above each title. */
  eyebrow?: string;
  className?: string;
};

export function ServicesStack({ services, eyebrow = "In un solo posto", className }: ServicesStackProps) {
  const root = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-panel]"));
    let raf = 0;
    // A panel taller than the viewport sticks by its bottom edge, so the whole card stays reachable.
    const fit = () => {
      const vh = window.innerHeight;
      panels.forEach((panel) => {
        panel.style.top = `${Math.min(0, vh - panel.offsetHeight)}px`;
      });
    };
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      let idx = 0;
      panels.forEach((panel, i) => {
        if (panel.getBoundingClientRect().top <= vh * 0.5) idx = i;
        const next = panels[i + 1];
        const card = cards.current[i];
        if (!card) return;
        const covered = next ? Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / vh)) : 0;
        card.style.opacity = String(Math.max(0, 1 - covered * 1.4));
        card.style.transform = `scale(${1 - covered * 0.06}) translateY(${-covered * 40}px)`;
      });
      setActive(idx);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      fit();
      schedule();
    };
    fit();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [services.length]);

  return (
    <section ref={root} className={cn("relative isolate w-full text-[#00122F] lg:px-9", className)}>
      <style>{GRAIN_CSS}</style>
      {services.map((s, i) => (
        <div key={s.id} data-panel className={panelClass}>
          <div
            className="mx-auto w-full max-w-[36rem] lg:col-start-2 lg:mx-0 lg:max-w-[56rem]"
            ref={(el) => {
              cards.current[i] = el;
            }}
            style={{ transformOrigin: "top center", willChange: "transform, opacity" }}
          >
            <h2 className="font-['Instrument_Serif'] text-3xl text-white lg:sr-only">
              <span className="block text-white/55">{eyebrow}</span>
              <span className="block">{s.title}</span>
            </h2>
            <div className="mt-6 lg:mt-0">
              <ServiceCard service={s} />
            </div>
          </div>
        </div>
      ))}

      {/* Sticky background: left-hand titles + cross-fading gradients + grain */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="sticky top-0 grid h-screen w-full overflow-hidden py-20">
          <div className="mx-auto hidden w-full max-w-[104.5rem] grid-cols-12 px-9 font-['Instrument_Serif'] text-[clamp(2.5rem,1.2vw+1.8rem,3.5rem)] leading-[1.05] tracking-[-0.02em] text-white lg:grid">
            <div className="col-span-5 flex h-full flex-col">
              <div className="flex h-1/2 flex-col justify-end">
                <p className="text-white/55">{eyebrow}</p>
              </div>
              <div className="relative h-1/2">
                {services.map((s, i) => (
                  <span key={s.id} className={cn("absolute inset-0 transition duration-300", i !== active && "translate-y-10 opacity-0")}>
                    {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="ss-grain absolute inset-0 -z-10 overflow-hidden" />
          {services.map((s, i) => (
            <div
              key={s.id}
              className={cn("absolute inset-0 -z-20 transition-opacity duration-1000", i !== active && "opacity-0")}
              style={{ background: s.bg ?? FALLBACK_BG }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }: { service: Service }) {
  const [step, setStep] = useState<string>();
  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-b from-[#E8EEF9] to-[#F8F9FC] px-3 pt-4 lg:rounded-2xl lg:px-4 lg:pt-6">
      <div className="px-0 lg:px-2">
        <ServiceAnimation id={s.id} title={`${s.title}: ${s.capabilities.join(", ")}`} onStep={setStep} />
      </div>
      <div className="p-5 pt-6 font-['DM_Sans'] lg:px-10 lg:py-9 lg:[@media(max-height:910px)]:py-8">
        <p className="text-[1.125rem] leading-snug text-[#00122F]">{s.text}</p>
        <p
          id={`service-list-title-${s.id}`}
          className="mt-9 text-[0.6875rem] leading-tight font-medium tracking-[0.055rem] text-[#00122F]/70 uppercase lg:[@media(max-height:910px)]:mt-6"
          style={{ fontFamily: MONO_FONT }}
        >
          Cosa comprende
        </p>
        <ul className="mt-3.5 grid grid-cols-2 gap-1.5 text-[0.9375rem] leading-tight lg:gap-2 lg:[@media(max-height:910px)]:mt-2" aria-labelledby={`service-list-title-${s.id}`}>
          {s.capabilities.map((c) => (
            <li key={c} className={cn(capabilityClass, c === step && activeCapabilityClass)}>
              {c}
            </li>
          ))}
        </ul>
        {(s.href || s.price) && (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 lg:[@media(max-height:910px)]:mt-5">
            {s.price && <span className="text-sm text-slate-500">{s.price}</span>}
            {s.href && (
              <Link to={s.href} className="inline-flex items-center gap-1.5 rounded-xl bg-[#00122F] px-5 h-10 text-sm font-semibold text-white hover:bg-[#00122F]/90 transition-colors">
                Scopri di più
                <span aria-hidden="true">→</span>
                <span className="sr-only">: {s.title}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesStack;
