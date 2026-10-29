import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Home, Clock, FileText, Users, HelpCircle, AudioLines, ChevronsUpDown, ChevronDown,
  ChevronUp, Pencil, Download, MoreVertical, Paperclip, Copy, Sparkles, Pin, Mic, X,
  RefreshCw, UserCheck, User, Minimize2, Undo2, Globe, Plus, Monitor, Check, Pause,
  Loader2, AlertTriangle, FileAudio, Image as ImageIcon, ChevronLeft, ShieldCheck,
  IdCard, ClipboardList, NotebookPen, Files, Puzzle, Search,
} from "lucide-react";

/*
  React recreations of app.zengest.it screens for the /guida walkthrough.
  Used instead of screenshots where the real screen would show clinical content
  or can't be captured without recording. All patient data is invented.

  Every mockup is drawn on a fixed 1392×787 canvas — the same size as the real
  captures — so hotspot percentages work the same way for both. MockStage
  scales it down to fit the frame.
*/

export const MOCK_W = 1392;
export const MOCK_H = 787;

const TEAL = "#3E9C9A"; // client avatar colour in the app
const REC_BLUE = "#3b82f6";
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, system-ui, sans-serif';
const DISABLED_GRAD = "linear-gradient(90deg, #9ca3af 0%, #b4b8bf 50%, #8b8f96 100%)";

// ── Stage: scales the fixed canvas to its container ──────────────────────────

export function MockStage({ children, fixedScale }: { children: ReactNode; fixedScale?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(fixedScale ?? 0);
  useLayoutEffect(() => {
    if (fixedScale !== undefined) return;
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / MOCK_W);
    fit();
    const obs = new ResizeObserver(fit);
    obs.observe(el);
    return () => obs.disconnect();
  }, [fixedScale]);
  const s = fixedScale ?? scale;
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden" style={fixedScale !== undefined ? { width: MOCK_W * s, height: MOCK_H * s } : undefined}>
      <div aria-hidden="true" className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
        style={{ width: MOCK_W, height: MOCK_H, transform: `scale(${s})`, fontFamily: FONT, color: "#0a0a0a", background: "#fff", textAlign: "left", lineHeight: 1.5, opacity: s ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
}

// ── Shared chrome ────────────────────────────────────────────────────────────

const NAV = [
  { key: "home", label: "Home", Icon: Home },
  { key: "sessioni", label: "Sessioni", Icon: Clock },
  { key: "modelli", label: "Modelli", Icon: FileText },
  { key: "clienti", label: "Clienti", Icon: Users },
] as const;

function ZenIcon({ size = 18 }: { size?: number }) {
  return <img src="/guida/app/zen-ai.svg" alt="" width={size} height={size} />;
}

function Avatar({ initials, size = 28, text = 13 }: { initials: string; size?: number; text?: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0"
      style={{ width: size, height: size, background: TEAL, fontSize: text }}>{initials}</span>
  );
}

function TopNav({ active }: { active: "home" | "sessioni" | "modelli" | "clienti" | "assistente" }) {
  return (
    <div className="h-16 border-b border-[#e5e7eb] flex items-center px-5 bg-white">
      <img src="/guida/app/zengest-logo.webp" alt="" className="h-[38px] w-auto mr-9" />
      <div className="flex items-center gap-2 text-[14px]">
        {NAV.map(({ key, label, Icon }) => (
          <span key={key} className={`flex items-center gap-2 px-3 py-2 rounded-full ${active === key ? "bg-[#f3f4f6]" : ""}`}>
            <Icon className="w-4 h-4" strokeWidth={1.8} /> {label}
          </span>
        ))}
        <span className={`flex items-center gap-2 px-3 py-2 rounded-full ${active === "assistente" ? "bg-[#f3f4f6]" : ""}`}>
          <ZenIcon size={16} /> Assistente
        </span>
      </div>
      <div className="ml-auto flex items-center gap-7 text-[14px]">
        <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4" strokeWidth={1.8} /> Supporto</span>
        <span className="flex items-center gap-2.5 text-[15px]">Ciao Matteo! <Avatar initials="MG" size={32} /></span>
      </div>
    </div>
  );
}

function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white ${className}`}>{children}</span>;
}

function Overlay() {
  return <div className="absolute inset-0 bg-black/50" />;
}

// ── Invented clinical content ────────────────────────────────────────────────

const NOTE_SECTIONS = [
  {
    title: "Motivo della seduta e temi principali",
    paras: [
      "Il paziente riferisce un aumento dell'ansia legata al carico di lavoro nelle ultime due settimane, con difficoltà ad addormentarsi e risvegli precoci.",
      "È stato ripreso il tema della difficoltà a delegare e del timore di deludere le aspettative del responsabile.",
      "Riferisce di aver praticato l'esercizio di respirazione concordato due volte, con beneficio parziale sull'addormentamento.",
      "Si è lavorato sulla ristrutturazione del pensiero «se chiedo aiuto sembro incapace» ed è stato introdotto il diario dei pensieri automatici.",
    ],
  },
  {
    title: "Compiti concordati",
    paras: [
      "Compilare il diario dei pensieri automatici nelle situazioni lavorative più critiche.",
      "Proseguire l'esercizio di respirazione ogni sera prima di dormire.",
      "Annotare i risvegli notturni per discuterli nella prossima seduta.",
    ],
  },
];

const PREP = {
  clinician: "Verificare l'andamento del sonno e la frequenza dei risvegli notturni. Riprendere il diario dei pensieri automatici e discutere le situazioni lavorative annotate, in particolare la richiesta di aiuto ai colleghi.",
  patient: "Compilare il diario dei pensieri automatici. Praticare l'esercizio di respirazione ogni sera prima di dormire.",
  next: "Giovedì 5 novembre 2026, ore 18:00.",
  summary: "Davide è in carico da 6 sedute per ansia legata al lavoro e difficoltà del sonno. Nell'ultima seduta ha riferito un aumento del carico lavorativo e la difficoltà a delegare. Si è lavorato sulla ristrutturazione cognitiva del timore di apparire incapace ed è stato introdotto il diario dei pensieri automatici, da riprendere nel prossimo incontro.",
};

const TRANSCRIPT: { who: "A" | "B"; text: string }[] = [
  { who: "A", text: "Come sono andate queste due settimane?" },
  { who: "B", text: "Meglio della volta scorsa, credo. Il lavoro però non molla." },
  { who: "A", text: "Mi racconti com'è andata con la scadenza di venerdì?" },
  { who: "B", text: "Alla fine l'ho consegnata, ma ci ho passato due notti. Continuavo a pensare che se avessi chiesto una mano al mio collega avrebbe pensato che non sono all'altezza. La mattina dopo ero distrutto e il pomeriggio facevo fatica a concentrarmi. L'esercizio di respirazione l'ho fatto un paio di volte, la sera, e un po' mi ha aiutato ad addormentarmi. Però poi alle quattro ero di nuovo sveglio a pensare alle mail." },
];

// ── Session screen (sidebar + note) ──────────────────────────────────────────

const SESSION_CARDS = [
  { date: "29 ott 2026", time: "10:30 AM", selected: true },
  { date: "22 ott 2026", time: "10:30 AM" },
  { date: "15 ott 2026", time: "10:30 AM" },
  { date: "8 ott 2026", time: "11:00 AM" },
  { date: "1 ott 2026", time: "10:30 AM" },
];

function SessionScreen({ tab = "nota", children }: { tab?: "nota" | "trascrizione"; children?: ReactNode }) {
  return (
    <div className="relative h-full">
      <TopNav active="sessioni" />
      <div className="flex h-[723px]">
        {/* Sidebar */}
        <div className="w-[320px] border-r border-[#e5e7eb] shrink-0">
          <div className="p-4 pb-0">
            <div className="h-[36px] mt-[1px] rounded-full bg-[#0a0a0a] text-white flex items-center justify-center gap-2 text-[15px] font-medium">
              <AudioLines className="w-4 h-4" /> Nuova sessione
            </div>
            <p className="text-[13px] text-[#6b7280] mt-[30px] mb-2">Cliente</p>
            <div className="h-[48px] rounded-full border border-[#e5e7eb] flex items-center px-3 gap-2.5 text-[15px]">
              <Avatar initials="D" /> Davide <ChevronsUpDown className="w-4 h-4 ml-auto text-[#6b7280]" />
            </div>
          </div>
          <div className="border-t border-[#e5e7eb] mt-[17px] px-4 pt-4">
            <p className="text-[13px] text-[#6b7280] mb-3 pl-2">6 Sessioni</p>
            <div className="space-y-3">
              {SESSION_CARDS.map((c) => (
                <div key={c.date} className={`rounded-xl border px-3 py-2.5 shadow-sm ${c.selected ? "bg-[#e5e7eb] border-[#d1d5db]" : "border-[#e5e7eb]"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium">COMPLETATA</span>
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  </div>
                  <p className="text-[13px] text-[#6b7280] mt-1">{c.date}</p>
                  <p className="text-[13px] text-[#6b7280]">{c.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between px-4 pt-[18px]">
            <div>
              <p className="text-[24px] font-bold leading-tight">Davide</p>
              <p className="text-[15px] text-[#6b7280] mt-1 flex items-center gap-2">29 ott 2026 | 10:30 AM <Pencil className="w-3.5 h-3.5" /></p>
            </div>
            <div className="flex gap-3 pr-0 mt-[9px]">
              <Pill className="h-9 px-4 text-[15px] font-medium"><Download className="w-4 h-4" /> Esporta</Pill>
              <Pill className="h-9 px-4 text-[15px] font-medium"><MoreVertical className="w-4 h-4" /> Azioni</Pill>
            </div>
          </div>
          <div className="flex gap-1 px-4 mt-[22px] border-b border-[#e5e7eb] text-[15px]">
            {[["nota", "Nota", FileText], ["trascrizione", "Trascrizione", AudioLines], ["file", "File", Paperclip]].map(([k, l, I]) => {
              const Icon = I as typeof FileText;
              const on = k === tab;
              return (
                <span key={k as string} className={`flex items-center gap-2 px-4 pb-3 border-b-2 ${on ? "border-[#0a0a0a] text-[#0a0a0a] font-medium" : "border-transparent text-[#6b7280]"}`}>
                  <Icon className="w-4 h-4" /> {l as string}
                </span>
              );
            })}
          </div>
          {tab === "nota" ? <NoteBody /> : <TranscriptBody />}
        </div>
      </div>
      {children}
    </div>
  );
}

function NoteBody() {
  return (
    <div className="px-6 pt-6">
      <div className="flex items-center justify-between">
        <Pill className="h-9 px-4 text-[15px] font-medium"><FileText className="w-4 h-4" /> Nota di follow-up <ChevronDown className="w-4 h-4" /></Pill>
        <span className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white inline-flex items-center gap-2 text-[15px] font-medium"><Copy className="w-4 h-4" /> Copia nota</span>
      </div>
      <div className="mt-4 space-y-4">
        {NOTE_SECTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-[#e5e7eb] p-4">
            <p className="text-[17px] font-semibold flex items-center gap-2 mb-3">{s.title} <ChevronUp className="w-4 h-4" /></p>
            <div className="rounded-xl border border-[#e5e7eb] px-3 py-2.5 space-y-3 text-[15px] leading-[20px]">
              {s.paras.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="flex gap-2 mt-3 text-[13px]">
              <Pill className="h-8 px-3"><Sparkles className="w-3.5 h-3.5" /> Modifica magica</Pill>
              <Pill className="h-8 px-3"><Copy className="w-3.5 h-3.5" /> Copia sezione</Pill>
              <Pill className="h-8 px-3"><Pencil className="w-3.5 h-3.5" /> Modifica</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptBody() {
  return (
    <div className="px-6 pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[20px] font-semibold">Trascrizione sessione</p>
          <p className="text-[13px] text-[#6b7280] mt-1">142 segmenti di conversazione</p>
        </div>
        <span className="rounded-xl bg-[#f3f4f6] px-3 py-3 text-[13px]">142 voci</span>
      </div>
      <div className="mt-2 space-y-3">
        {TRANSCRIPT.map((t, i) => t.who === "A" ? (
          <div key={i} className="flex gap-3">
            <span className="w-8 h-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center shrink-0"><UserCheck className="w-4 h-4" /></span>
            <div className="max-w-[716px]">
              <p className="text-[13px] font-semibold mb-1.5">Oratore A</p>
              <p className="rounded-2xl border border-[#e5e7eb] bg-[#f5f5f5] px-5 py-3.5 text-[15px] leading-[24px]">{t.text}</p>
            </div>
          </div>
        ) : (
          <div key={i} className="flex gap-3 justify-end">
            <div className="max-w-[716px] flex flex-col items-end">
              <p className="text-[13px] font-semibold mb-1.5 text-[#2563eb]">Oratore B</p>
              <p className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-5 py-3.5 text-[15px] leading-[24px]">{t.text}</p>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0"><User className="w-4 h-4" /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockSessioneNota() {
  return <SessionScreen />;
}

export function MockSessioneTrascrizione() {
  return <SessionScreen tab="trascrizione" />;
}

export function MockSessioneEsporta() {
  return (
    <SessionScreen>
      <div className="absolute right-[125px] top-[132px] whitespace-nowrap rounded-xl border border-[#e5e7eb] bg-white shadow-lg p-1.5 text-[15px]">
        <p className="px-2 py-1.5 rounded-md bg-[#f3f4f6]">Esporta nota</p>
        <p className="px-2 py-1.5">Esporta trascrizione</p>
      </div>
    </SessionScreen>
  );
}

export function MockModificaMagica() {
  return (
    <SessionScreen>
      <Overlay />
      <div className="absolute right-0 top-0 bottom-0 w-[448px] bg-white px-6 pt-6">
        <span className="absolute right-3 top-3 w-6 h-6 rounded-full border border-[#374151] flex items-center justify-center"><X className="w-3.5 h-3.5" /></span>
        <p className="text-[19px] font-semibold flex gap-2 leading-[28px] pr-6"><Sparkles className="w-4 h-4 mt-1.5 shrink-0" /> Modifica magica: Motivo della seduta e temi principali</p>
        <p className="text-[15px] text-[#6b7280] mt-2">Dì a ZEN come migliorare la sezione Motivo della seduta e temi principali</p>
        <p className="text-[12px] font-medium tracking-wider text-[#6b7280] mt-6 mb-2">SPUNTI FISSATI</p>
        <div className="space-y-2">
          {["Rendi questa sezione più concisa", "Rimuovi le citazioni dirette", "Riformula in tono più professionale"].map((s) => (
            <div key={s} className="h-[38px] rounded-full border border-[#e5e7eb] px-4 flex items-center justify-between text-[15px]">{s} <Pin className="w-3.5 h-3.5 text-[#6b7280]" /></div>
          ))}
        </div>
        <p className="text-[15px] font-medium mt-6 mb-2">Istruzioni</p>
        <div className="relative h-[138px] rounded-2xl border border-[#d1d5db] px-3 py-3 text-[15px]">
          Trasforma in elenco puntato
          <Mic className="absolute right-3 bottom-3 w-4 h-4 text-[#6b7280]" />
        </div>
        <div className="mt-5 rounded-2xl border border-[#e5e7eb] p-4 flex justify-between gap-3">
          <div>
            <p className="text-[15px] font-medium">Applica a tutte le sezioni</p>
            <p className="text-[13px] text-[#6b7280] mt-1">Esegui la stessa istruzione su ogni sezione di questa nota.</p>
          </div>
          <span className="w-9 h-5 rounded-full bg-[#e5e7eb] relative shrink-0"><span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow" /></span>
        </div>
        <div className="mt-5 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center gap-2 text-[15px] font-medium"><Sparkles className="w-4 h-4" /> Modifica sezione</div>
        <p className="text-center text-[15px] mt-5 flex items-center justify-center gap-1.5"><X className="w-4 h-4" /> Annulla</p>
      </div>
    </SessionScreen>
  );
}

export function MockRigenera() {
  return (
    <SessionScreen>
      <Overlay />
      <div className="absolute left-[484px] top-[263px] w-[424px] rounded-2xl bg-white p-6">
        <X className="absolute right-6 top-6 w-4 h-4" />
        <p className="text-[19px] font-semibold flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Rigenera nota</p>
        <p className="text-[15px] text-[#4b5563] mt-4">Seleziona un modello per rigenerare la nota per questa sessione.</p>
        <div className="mt-4 h-9 rounded-full border border-[#d1d5db] px-4 flex items-center justify-between text-[15px]">SOAP (Generico) <ChevronsUpDown className="w-4 h-4 text-[#6b7280]" /></div>
        <div className="mt-8 h-9 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center gap-2 text-[15px] font-medium"><RefreshCw className="w-4 h-4" /> Rigenera</div>
      </div>
    </SessionScreen>
  );
}

// ── Home with a client selected ──────────────────────────────────────────────

function PrepCards({ compact = false }: { compact?: boolean }) {
  const body = compact ? "text-[14px] leading-[20px]" : "text-[15px] leading-[20px]";
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#e5e7eb] p-4 shadow-sm">
        <p className="text-[19px] font-semibold mb-3">Follow-up</p>
        <p className="text-[15px] font-medium">Compiti del clinico</p>
        <p className={`${body} text-[#4b5563] mt-1`}>{PREP.clinician}</p>
        <p className="text-[15px] font-medium mt-4">Compiti per il paziente</p>
        <p className={`${body} text-[#4b5563] mt-1`}>{PREP.patient}</p>
        <p className="text-[15px] font-medium mt-4">Prossima sessione</p>
        <p className={`${body} text-[#4b5563] mt-1`}>{PREP.next}</p>
      </div>
      <div className="rounded-2xl border border-[#e5e7eb] p-4 shadow-sm">
        <p className="text-[19px] font-semibold mb-3">Riepilogo ultima sessione</p>
        <p className={`${body} text-[#4b5563]`}>{PREP.summary}</p>
      </div>
    </div>
  );
}

function ClientCard({ changeLink = true }: { changeLink?: boolean }) {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar initials="D" size={48} text={17} />
        <span className="text-[20px] font-semibold">Davide</span>
      </div>
      {changeLink && <p className="text-[15px] text-[#4b5563] mt-3 flex items-center gap-2"><Undo2 className="w-4 h-4" /> Cambia cliente</p>}
    </div>
  );
}

function HomeWithClient({ template, children }: { template?: string; children?: ReactNode }) {
  return (
    <div className="relative h-full">
      <TopNav active="home" />
      <div className="flex h-[723px]">
        <div className="w-[752px] border-r border-[#e5e7eb] flex flex-col items-center pt-[38px]">
          <p className="text-[34px] font-bold">Inizia nuova sessione</p>
          <p className="text-[17px] text-[#6b7280] mt-1">Seleziona un cliente e un modello per iniziare</p>
          <div className="w-[448px] mt-[26px] space-y-3">
            <div className="h-12 rounded-full border border-[#e5e7eb] flex items-center justify-center gap-2 text-[15px] font-medium"><ZenIcon /> Assistente Zen</div>
            <ClientCard />
            <p className="text-[15px] font-medium pt-4">Seleziona un modello</p>
            <div className={`h-12 rounded-full border border-[#e5e7eb] px-4 flex items-center justify-between text-[15px] ${template ? "" : "text-[#6b7280]"}`}>
              {template ?? "Seleziona un modello"} <ChevronsUpDown className="w-4 h-4 text-[#6b7280]" />
            </div>
            <div className="flex items-center justify-between px-0.5">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#4b5563]" />
                <div><p className="text-[12px] text-[#6b7280]">Lingua della seduta</p><p className="text-[15px] font-semibold -mt-0.5">Italiano</p></div>
              </div>
              <span className="text-[13px] flex items-center gap-1.5 text-[#4b5563]"><Pencil className="w-3.5 h-3.5" /> Modifica</span>
            </div>
            <div className="h-12 rounded-full text-white flex items-center justify-center gap-2 text-[17px] font-medium"
              style={{ background: template ? "#0a0a0a" : DISABLED_GRAD }}>
              <Mic className="w-4 h-4" /> Registra sessione
            </div>
            <div className="h-12 rounded-full border border-[#e5e7eb] flex items-center justify-center gap-2 text-[17px] text-[#4b5563]"><Plus className="w-4 h-4" /> Crea sessione senza registrare</div>
          </div>
          <p className="text-[24px] font-bold mt-[46px]">Sessioni recenti</p>
        </div>
        <div className="flex-1 px-6 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-[24px] font-bold">Davide</p>
            <Pill className="h-9 px-3 text-[13px]"><Minimize2 className="w-3.5 h-3.5" /> Nascondi</Pill>
          </div>
          <div className="mt-5 h-10 rounded-full bg-[#f3f4f6] grid grid-cols-3 text-[15px] text-[#4b5563]">
            <span className="rounded-full bg-[#0a0a0a] text-white flex items-center justify-center">Preparazione</span>
            <span className="flex items-center justify-center">Riepilogo</span>
            <span className="flex items-center justify-center">Assistente</span>
          </div>
          <div className="mt-6"><PrepCards compact /></div>
        </div>
      </div>
      {children}
    </div>
  );
}

export function MockHomeCliente() {
  return <HomeWithClient template="Nota di follow-up" />;
}

const PICKER_ITEMS = [
  "Colloquio anamnestico completo",
  "Colloquio di coppia iniziale",
  "Colloquio di fine trattamento e chiusura",
  "Colloquio di follow up post trattamento",
  "Colloquio di orientamento scolastico o professionale",
  "Colloquio di restituzione psicodiagnostica",
  "Colloquio di sostegno alla genitorialità",
  "Colloquio di sostegno psicologico (seduta singola)",
  "Colloquio di sportello di ascolto scolastico",
  "Colloquio di triage psicologico in emergenza",
];

export function MockPickerModelli() {
  return (
    <HomeWithClient>
      <div className="absolute left-[152px] top-[77px] w-[448px] h-[362px] rounded-2xl border border-[#e5e7eb] bg-white shadow-lg overflow-hidden">
        <div className="h-[41px] border-b border-[#e5e7eb] px-3 flex items-center gap-2 text-[15px]"><Search className="w-4 h-4 text-[#9ca3af]" /> colloquio</div>
        <div className="p-1">
          {PICKER_ITEMS.map((t, i) => (
            <p key={t} className={`px-8 py-[6px] text-[15px] rounded-lg ${i === 0 ? "bg-[#f3f4f6]" : ""}`}>{t}</p>
          ))}
        </div>
      </div>
    </HomeWithClient>
  );
}

// ── Recording ────────────────────────────────────────────────────────────────

// Deterministic "speech" amplitudes for the waveform bars
const BARS = Array.from({ length: 220 }, (_, i) => {
  const env = 0.35 + 0.65 * Math.abs(Math.sin(i / 17)) * (0.55 + 0.45 * Math.sin(i / 5.3 + 1));
  const jitter = 0.5 + 0.5 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
  return Math.max(0.03, env * jitter);
});

function RecordingScreen({ children }: { children?: ReactNode }) {
  return (
    <div className="relative h-full bg-white">
      <TopNav active="home" />
      <div className="flex flex-col items-center pt-6">
        <div className="w-[448px] space-y-3">
          <div className="h-12 rounded-full border border-[#e5e7eb] flex items-center justify-center gap-2 text-[15px] font-medium"><ZenIcon /> Assistente Zen</div>
          <ClientCard changeLink={false} />
        </div>
        <div className="w-[600px] px-8 mt-[46px]">
          <div className="rounded-xl bg-white p-6 flex flex-col gap-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <svg viewBox="0 0 536 120" className="w-full h-[120px]">
              {BARS.map((a, i) => {
                const h = Math.max(1, a * 114);
                return <rect key={i} x={i * (536 / 220)} y={60 - h / 2} width={1.4} height={h} fill={REC_BLUE} />;
              })}
            </svg>
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-medium text-[#1f2937]">Seleziona microfono:</p>
              <div className="h-10 rounded-lg border border-[#d1d5db] px-3 flex items-center justify-between text-[14px]">Microfono MacBook Pro (integrato) <ChevronDown className="w-4 h-4 text-[#6b7280]" /></div>
            </div>
            <div>
              <div className="h-11 rounded-lg border border-[#e5e7eb] flex items-center justify-center gap-2 text-[15px] font-medium"><Monitor className="w-4 h-4" /> Aggiungi audio tab</div>
              <p className="text-[12px] text-[#6b7280] mt-2 text-center">Clicca per catturare l'audio da una scheda del browser (es. YouTube, Google Meet)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-12 rounded-lg text-white flex items-center justify-center gap-2 text-[15px] font-medium" style={{ background: REC_BLUE }}><Check className="w-4 h-4" /> Termina sessione</div>
              <span className="w-12 h-12 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#6b7280]"><Pause className="w-4 h-4" /></span>
              <span className="w-12 h-12 rounded-full border border-[#d1d5db] flex items-center justify-center text-[#ef4444]"><X className="w-4 h-4" /></span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export function MockRegistrazione() {
  return <RecordingScreen />;
}

export function MockCaricamento() {
  return (
    <RecordingScreen>
      <Overlay />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[448px] rounded-3xl bg-white p-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#0a0a0a]/10 flex items-center justify-center"><Loader2 className="w-8 h-8" /></div>
        <p className="text-[24px] font-semibold mt-6">Caricamento audio</p>
        <p className="text-[14px] text-[#6b7280] mt-6">Attendere mentre l'audio viene caricato.</p>
        <p className="text-[14px] font-medium mt-1">Non chiudere questa finestra né uscire dalla pagina.</p>
        <p className="text-[14px] font-medium text-[#6b7280] mt-6">Progresso</p>
        <p className="text-[18px] font-semibold mt-1">12 / 18 chunks</p>
      </div>
    </RecordingScreen>
  );
}

// ── Manual session: file upload ──────────────────────────────────────────────

export function MockUpload() {
  const rows: { name: string; Icon: typeof FileText; status: "done" | "uploading" | "failed" | "pending"; pct?: number }[] = [
    { name: "seduta-29-ottobre.m4a", Icon: FileAudio, status: "done" },
    { name: "relazione-neuropsichiatra.pdf", Icon: FileText, status: "uploading", pct: 64 },
    { name: "appunti-scritti-a-mano.jpg", Icon: ImageIcon, status: "failed" },
    { name: "questionario-STAI.docx", Icon: FileText, status: "pending" },
  ];
  return (
    <div className="relative h-full">
      <TopNav active="sessioni" />
      <div className="w-[448px] mx-auto pt-6 space-y-6">
        <div className="flex items-start gap-3 rounded-lg border border-[#fde68a] bg-[#fffbeb] p-3 text-[14px]">
          <AlertTriangle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#dc2626]">Caricamento incompleto</p>
            <p className="text-[#6b7280]">Alcuni file non sono stati caricati. Riprova.</p>
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-[14px] font-medium">Caricamento file</p>
          <p className="text-[12px] text-[#6b7280]">1/4</p>
        </div>
        <div className="rounded-xl border border-[#e5e7eb] divide-y divide-[#e5e7eb]">
          {rows.map(({ name, Icon, status, pct }) => (
            <div key={name} className="flex items-center gap-3 px-4 py-3">
              <span className="w-4 shrink-0">
                {status === "done" && <Check className="w-4 h-4 text-[#16a34a]" />}
                {status === "uploading" && <Loader2 className="w-4 h-4 text-[#0a0a0a]" />}
                {status === "failed" && <X className="w-4 h-4 text-[#dc2626]" />}
                {status === "pending" && <span className="block w-4 h-4 rounded-full border-2 border-[#d1d5db]" />}
              </span>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="flex items-center gap-2 text-[14px]"><Icon className="w-4 h-4 text-[#6b7280]" /> {name}</p>
                {status === "uploading" && <div className="h-1 rounded-full bg-[#e5e7eb]"><div className="h-1 rounded-full bg-[#0a0a0a]" style={{ width: `${pct}%` }} /></div>}
              </div>
              <span className="text-[12px] shrink-0">
                {status === "done" && <span className="text-[#16a34a]">Completato</span>}
                {status === "uploading" && <span className="text-[#6b7280]">{pct}%</span>}
                {status === "failed" && <span className="text-[#dc2626] flex items-center gap-1 px-2"><RefreshCw className="w-3 h-3" /> Riprova</span>}
                {status === "pending" && <span className="text-[#6b7280]">In attesa</span>}
              </span>
            </div>
          ))}
        </div>
        <div className="h-10 rounded-full border border-[#e5e7eb] flex items-center justify-center gap-2 text-[14px] font-medium"><RefreshCw className="w-4 h-4" /> Riprova file falliti</div>
      </div>
    </div>
  );
}

// ── Client page: Prep Sessione ───────────────────────────────────────────────

const CLIENT_TABS = [
  ["Anagrafica e fatturazione", IdCard], ["Sessioni", Mic], ["Prep Sessione", ClipboardList], ["Riepilogo", FileText],
  ["Note", NotebookPen], ["Documenti", Files], ["Contesto", Puzzle],
] as const;

export function MockClientePrep() {
  return (
    <div className="relative h-full">
      <TopNav active="clienti" />
      <div className="w-[1104px] mx-auto pt-[30px]">
        <p className="text-[15px] flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Torna ai Clienti</p>
        <div className="flex items-start justify-between mt-[30px]">
          <div className="flex items-center gap-4">
            <Avatar initials="D" size={80} text={22} />
            <div><p className="text-[32px] font-bold leading-tight">Davide</p><p className="text-[17px] text-[#6b7280] mt-1">Ultima sessione: 29 ott 2026</p></div>
          </div>
          <div className="flex gap-3 text-[15px]">
            <span className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white inline-flex items-center gap-2"><Mic className="w-4 h-4" /> Inizia sessione</span>
            <Pill className="h-9 px-4"><ZenIcon /> Assistente</Pill>
            <Pill className="h-9 px-4"><ShieldCheck className="w-4 h-4" /> Consenso <span className="w-2 h-2 rounded-full bg-[#22c55e]" /> <ChevronDown className="w-4 h-4" /></Pill>
          </div>
        </div>
        <div className="mt-6 h-11 rounded-2xl bg-[#f3f4f6] flex items-center justify-around px-2 text-[15px]">
          {CLIENT_TABS.map(([l, Icon]) => (
            <span key={l} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${l === "Prep Sessione" ? "bg-[#e5e7eb]" : ""}`}><Icon className="w-4 h-4" /> {l}</span>
          ))}
        </div>
        <div className="mt-6"><PrepCards /></div>
      </div>
    </div>
  );
}
