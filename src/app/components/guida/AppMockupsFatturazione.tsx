import type { ReactNode } from "react";
import {
  Receipt, CreditCard, Database, Shield, FileCheck, MessageSquare, ListChecks, FileText, User,
  ChevronDown, ChevronLeft, ChevronsUpDown, Calendar, Send, Download, Plus, Search, SlidersHorizontal,
  RefreshCw, ExternalLink, Trash2, Check, Info, FileMinus, Ban, Mic, IdCard, ClipboardList,
  NotebookPen, Files, Puzzle, ShieldCheck, Building2, Send as SendIcon,
} from "lucide-react";
import { TopNav, Avatar, Pill, ZenIcon, type NavKey } from "./AppMockups";

/*
  Invoicing screens for the /guida "Fatturazione" chapter, drawn on the same
  1392×787 canvas as the other mockups (see AppMockups.tsx). Built from the
  zengestplatform invoice pages; every name, tax code and amount is invented.
  Amounts follow the app's rules: ENPAP 2% is extracted from the gross the
  clinician types, and a €2 marca da bollo applies above €77,47.
*/

const CLINICIAN = { name: "Giulia", initials: "GR" };

// ── Small building blocks ────────────────────────────────────────────────────

function Field({ label, value, muted = false, select = false, icon, className = "" }: {
  label: string; value: string; muted?: boolean; select?: boolean; icon?: ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[13px] font-medium mb-1">{label}</p>
      <div className={`h-9 rounded-lg border border-[#e5e7eb] px-3 flex items-center justify-between text-[14px] ${muted ? "text-[#9ca3af]" : ""}`}>
        <span className="truncate">{value}</span>
        {select && <ChevronDown className="w-4 h-4 text-[#9ca3af] shrink-0" />}
        {icon}
      </div>
    </div>
  );
}

function Switch({ on = true }: { on?: boolean }) {
  return (
    <span className={`w-9 h-5 rounded-full relative shrink-0 ${on ? "bg-[#0a0a0a]" : "bg-[#e5e7eb]"}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow ${on ? "left-[18px]" : "left-0.5"}`} />
    </span>
  );
}

function Checkbox({ on = true }: { on?: boolean }) {
  return (
    <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${on ? "bg-[#0a0a0a] border-[#0a0a0a] text-white" : "border-[#9ca3af]"}`}>
      {on && <Check className="w-3 h-3" strokeWidth={3} />}
    </span>
  );
}

function Card({ title, desc, children, className = "" }: { title?: string; desc?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#e5e7eb] bg-white p-5 ${className}`}>
      {title && <p className="text-[17px] font-semibold">{title}</p>}
      {desc && <p className="text-[13px] text-[#6b7280] mt-0.5">{desc}</p>}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </div>
  );
}

const BADGE = {
  green: "bg-[#dcfce7] text-[#15803d]",
  amber: "bg-[#fef3c7] text-[#b45309]",
  red: "bg-[#fee2e2] text-[#b91c1c]",
  blue: "bg-[#dbeafe] text-[#1d4ed8]",
  gray: "bg-[#f3f4f6] text-[#4b5563]",
} as const;

function Badge({ tone, children }: { tone: keyof typeof BADGE; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-medium ${BADGE[tone]}`}>{children}</span>;
}

function DarkButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[14px] font-medium ${className}`}>{children}</span>;
}

// ── Settings layout (sidebar with the Fatturazione section) ──────────────────

type SettingsKey = "fiscale" | "credits" | "prestazioni" | "fatture";

const PERSONAL = [
  ["Account", User], ["Abbonamento", CreditCard], ["Gestione dati", Database],
  ["Sicurezza", Shield], ["Modulo di consenso cliente", FileCheck], ["Contattaci", MessageSquare],
] as const;

const BILLING: [SettingsKey, string, typeof Receipt][] = [
  ["fiscale", "Profilo Fiscale", Receipt], ["credits", "Credits", CreditCard],
  ["prestazioni", "Prestazioni", ListChecks], ["fatture", "Fatture pazienti", FileText],
];

function SettingsShell({ active, nav = null, title, desc, actions, children }: {
  active: SettingsKey; nav?: NavKey | null; title: string; desc?: string; actions?: ReactNode; children: ReactNode;
}) {
  return (
    <div className="h-full">
      <TopNav active={nav} billing user={CLINICIAN} />
      <div className="flex h-[723px]">
        <div className="w-[256px] shrink-0 border-r border-[#e5e7eb] bg-[#fafafa]">
          <p className="text-[19px] font-semibold px-4 py-[22px] border-b border-[#e5e7eb]">Impostazioni</p>
          <div className="px-2 pt-3 text-[14px] whitespace-nowrap">
            <p className="text-[12px] font-semibold text-[#6b7280] px-3 py-2">Personale</p>
            {PERSONAL.map(([l, Icon]) => (
              <p key={l} className="flex items-center gap-3 h-10 px-3 rounded-xl"><Icon className="w-4 h-4" strokeWidth={1.8} /> {l}</p>
            ))}
            <p className="text-[12px] font-semibold text-[#6b7280] px-3 py-2 mt-2">Fatturazione</p>
            {BILLING.map(([k, l, Icon]) => (
              <p key={k} className={`flex items-center gap-3 h-10 px-3 rounded-xl ${k === active ? "bg-[#ececec]" : ""}`}><Icon className="w-4 h-4" strokeWidth={1.8} /> {l}</p>
            ))}
          </div>
        </div>
        <div className="flex-1 px-8 pt-[26px] overflow-hidden">
          <div className="max-w-[880px]">
            <p className="text-[13px] text-[#6b7280]">Fatturazione</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[24px] font-bold leading-tight">{title}</p>
                {desc && <p className="text-[14px] text-[#6b7280] mt-1">{desc}</p>}
              </div>
              {actions && <div className="flex gap-2 shrink-0">{actions}</div>}
            </div>
            <div className="border-b border-[#e5e7eb] mt-3 mb-5" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="inline-flex h-10 rounded-full bg-[#f3f4f6] p-1 text-[14px] mb-4">
      {items.map((t) => (
        <span key={t} className={`px-4 flex items-center rounded-full ${t === active ? "bg-white shadow-sm font-medium" : "text-[#6b7280]"}`}>{t}</span>
      ))}
    </div>
  );
}

const FISCAL_DESC = "Dati fiscali per fatture ai pazienti e per il pagamento dell'abbonamento.";

// ── Profilo Fiscale ──────────────────────────────────────────────────────────

export function MockProfiloFiscale() {
  return (
    <SettingsShell active="fiscale" title="Profilo Fiscale" desc={FISCAL_DESC}>
      <Tabs items={["Dati fiscali", "Assicurazione", "Sistema TS"]} active="Dati fiscali" />
      <Card>
        <div className="flex items-center justify-between -mt-0.5">
          <p className="text-[17px] font-semibold">Identità Fiscale</p>
          <DarkButton>Salva</DarkButton>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
          <Field label="Nome e Cognome" value="Giulia Rossi" />
          <Field label="Partita IVA" value="01234567890" />
          <Field label="Codice Fiscale" value="RSSGLI00A00H000X" />
          <Field label="PEC" value="giulia.rossi@pec.it" />
          <Field label="Via e numero civico" value="Via Garibaldi 12" />
          <div className="grid grid-cols-3 gap-3">
            <Field label="CAP" value="20121" />
            <Field label="Comune" value="Milano" />
            <Field label="Provincia" value="MI" />
          </div>
          <Field label="Codice destinatario SDI (opzionale)" value="0000000" />
          <Field label="Regime Fiscale" value="Regime forfettario" select />
          <Field label="Marca da bollo a carico di" value="Cliente" select />
          <div className="rounded-xl border border-[#e5e7eb] px-3 py-2 flex items-start gap-3 self-end">
            <div className="flex-1">
              <p className="text-[13px] font-medium">Applica ENPAP di default (2%)</p>
              <p className="text-[12px] text-[#6b7280] leading-snug">Contributo integrativo ENPAP sulle nuove fatture.</p>
            </div>
            <Switch />
          </div>
        </div>
        <p className="text-[12px] text-[#6b7280] mt-3">Se (importo + ENPAP) &gt; €77,47 è richiesta una marca da bollo di €2,00.</p>
      </Card>
    </SettingsShell>
  );
}

export function MockSistemaTS() {
  return (
    <SettingsShell active="fiscale" title="Profilo Fiscale" desc={FISCAL_DESC}>
      <Tabs items={["Dati fiscali", "Assicurazione", "Sistema TS"]} active="Sistema TS" />
      <Card title="Tessera Sanitaria" desc="Credenziali per il portale Sistema Tessera Sanitaria per la trasmissione delle spese sanitarie.">
        <Field label="Profilo operatore Sistema TS" value="Libero professionista" select className="max-w-[420px]" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
          <Field label="Username Sistema TS" value="RSSGLI00A00H000X" />
          <Field label="Password" value="••••••••••" />
          <Field label="PinCode" value="••••••••••" />
          <Field label="cf_proprietario" value="RSSGLI00A00H000X" />
        </div>
        <div className="mt-4 rounded-xl border border-[#e5e7eb] px-4 py-3 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[14px] font-medium">Invio automatico a TS</p>
            <p className="text-[13px] text-[#6b7280]">Trasmetti automaticamente le fatture pagate alla Tessera Sanitaria.</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-[13px] text-[#6b7280]">Non hai ancora le credenziali? Registrati su <span className="underline">sistemats1.sanita.finanze.it</span></p>
          <DarkButton>Salva</DarkButton>
        </div>
      </Card>
    </SettingsShell>
  );
}

// ── Prestazioni ──────────────────────────────────────────────────────────────

function ServiceCard({ name, price, minutes, category, isDefault }: { name: string; price: string; minutes: string; category: string; isDefault: boolean }) {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] p-4">
      <div className="flex items-center justify-between">
        {isDefault
          ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a0a0a] text-white px-3 py-1 text-[12px] font-medium"><Check className="w-3 h-3" /> Predefinita</span>
          : <span className="inline-flex items-center rounded-full border border-[#e5e7eb] px-3 py-1 text-[12px]">Rendi predefinita</span>}
        <Trash2 className="w-4 h-4 text-[#9ca3af]" />
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr_1.4fr] gap-3 mt-3">
        <Field label="Nome prestazione" value={name} />
        <Field label="Prezzo (€)" value={price} />
        <Field label="Durata (min)" value={minutes} />
        <Field label="Categoria" value={category} select />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-xl bg-[#f9fafb] px-3 py-2 flex items-start gap-3">
          <div className="flex-1"><p className="text-[13px] font-medium">Prestazione sanitaria</p><p className="text-[12px] text-[#6b7280] leading-snug">Esente IVA. Necessaria per inviare la spesa al Sistema TS.</p></div>
          <Switch />
        </div>
        <div className="rounded-xl bg-[#f9fafb] px-3 py-2 flex items-start gap-3">
          <div className="flex-1"><p className="text-[13px] font-medium">Contributo ENPAP</p><p className="text-[12px] text-[#6b7280] leading-snug">Applica il 2% alla prestazione</p></div>
          <Switch />
        </div>
      </div>
    </div>
  );
}

export function MockPrestazioni() {
  return (
    <SettingsShell active="prestazioni" title="Prestazioni"
      desc="Aggiungi, modifica o elimina le prestazioni del tuo listino. Una prestazione predefinita verrà pre-selezionata per le nuove fatture.">
      <div className="space-y-3">
        <ServiceCard name="Seduta individuale" price="80,00" minutes="50" category="Psicoterapia" isDefault />
        <ServiceCard name="Colloquio di coppia" price="100,00" minutes="60" category="Psicoterapia" isDefault={false} />
      </div>
      <span className="mt-3 inline-flex items-center gap-2 h-9 px-4 rounded-full border border-[#e5e7eb] text-[14px] font-medium"><Plus className="w-4 h-4" /> Aggiungi prestazione</span>
      <p className="text-[12px] text-[#6b7280] mt-3">Le prestazioni sanitarie a persone fisiche sono esenti IVA.</p>
    </SettingsShell>
  );
}

// ── Client: Anagrafica e fatturazione ────────────────────────────────────────

const CLIENT_TABS = [
  ["Anagrafica e fatturazione", IdCard], ["Sessioni", Mic], ["Prep Sessione", ClipboardList], ["Riepilogo", FileText],
  ["Note", NotebookPen], ["Documenti", Files], ["Contesto", Puzzle], ["Fatture", Receipt],
] as const;

export function MockClienteFiscale() {
  return (
    <div className="h-full">
      <TopNav active="clienti" billing user={CLINICIAN} />
      <div className="w-[1104px] mx-auto pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar initials="D" size={52} text={18} />
            <div><p className="text-[26px] font-bold leading-tight">Davide</p><p className="text-[15px] text-[#6b7280]">Ultima sessione: 29 ott 2026</p></div>
          </div>
          <div className="flex gap-3 text-[15px]">
            <DarkButton><Mic className="w-4 h-4" /> Inizia sessione</DarkButton>
            <Pill className="h-9 px-4"><ZenIcon /> Assistente</Pill>
            <Pill className="h-9 px-4"><ShieldCheck className="w-4 h-4" /> Consenso <span className="w-2 h-2 rounded-full bg-[#22c55e]" /> <ChevronDown className="w-4 h-4" /></Pill>
          </div>
        </div>
        <div className="mt-4 h-11 rounded-2xl bg-[#f3f4f6] flex items-center justify-around px-1 text-[14px]">
          {CLIENT_TABS.map(([l, Icon]) => (
            <span key={l} className={`flex items-center gap-2 px-2.5 py-2 rounded-xl ${l === "Anagrafica e fatturazione" ? "bg-[#e5e7eb]" : ""}`}><Icon className="w-4 h-4" /> {l}</span>
          ))}
        </div>
        <Card className="mt-4" title="Dati fiscali (Italia)" desc="Usati per fatture, SistemaTS e importi predefiniti sulle nuove fatture.">
          <p className="text-[13px] font-medium mb-2">Tipo cliente (fatturazione)</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border-2 border-[#0a0a0a] px-4 py-2.5 flex gap-3"><User className="w-4 h-4 mt-0.5" /><div><p className="text-[14px] font-semibold">Persona fisica</p><p className="text-[12px] text-[#6b7280]">Un privato o una coppia che paga personalmente</p></div></div>
            <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5 flex gap-3"><Building2 className="w-4 h-4 mt-0.5 text-[#6b7280]" /><div><p className="text-[14px] font-semibold">Organizzazione</p><p className="text-[12px] text-[#6b7280]">Un'azienda o una pubblica amministrazione, fatturata via SdI</p></div></div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
            <Field label="Fatturato come" value="Individuale" select />
            <Field label="Codice fiscale*" value="BNCDVD00A01H000X" />
            <Field label="Tariffa seduta predefinita (€)*" value="80,00" />
            <Field label="Metodo di pagamento predefinito*" value="Bonifico" select />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-6 text-[13px]">
              <span className="flex items-center gap-2"><Checkbox on={false} /> Paziente in opposizione alla comunicazione spese TS</span>
              <span className="flex items-center gap-2"><Checkbox on={false} /> Paziente straniero (senza CF in TS)</span>
            </div>
            <DarkButton>Salva</DarkButton>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Nuova fattura ────────────────────────────────────────────────────────────

function InvoicePage({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <TopNav active="fatturazione" billing user={CLINICIAN} />
      <div className="w-[848px] mx-auto pt-5">{children}</div>
    </div>
  );
}

function Segmented({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="inline-flex h-9 rounded-full bg-[#f3f4f6] p-1 text-[14px]">
      {items.map((t) => (
        <span key={t} className={`px-4 flex items-center rounded-full ${t === active ? "bg-[#0a0a0a] text-white font-medium" : "text-[#4b5563]"}`}>{t}</span>
      ))}
    </div>
  );
}

export function MockNuovaFattura() {
  return (
    <InvoicePage>
      <p className="text-[14px] text-[#4b5563] flex items-center gap-1.5"><ChevronLeft className="w-4 h-4" /> Fatture</p>
      <p className="text-[28px] font-bold mt-2 leading-tight">Nuova Fattura</p>
      <p className="text-[15px] text-[#6b7280]">Compila i dettagli qui sotto per creare una nuova fattura o documento.</p>
      <div className="mt-4"><Segmented items={["Paziente", "Azienda / Ente"]} active="Paziente" /></div>
      <Card className="mt-4" title="Dettagli fattura">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tipo documento" value="Fattura" select />
          <Field label="Data emissione" value="29/10/2026" icon={<Calendar className="w-4 h-4 text-[#9ca3af]" />} />
        </div>
        <p className="text-[13px] font-medium mt-3 mb-1">Paziente</p>
        <div className="h-11 rounded-lg border border-[#e5e7eb] px-3 flex items-center gap-2.5 text-[14px]"><Avatar initials="D" size={26} text={11} /> Davide <ChevronsUpDown className="w-4 h-4 ml-auto text-[#9ca3af]" /></div>
        <p className="text-[13px] text-[#6b7280] mt-1.5">CF paziente: BNCDVD00A01H000X</p>
        <div className="mt-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 flex items-center gap-3">
          <SendIcon className="w-4 h-4 text-[#6b7280]" />
          <div className="flex-1"><p className="text-[12px] text-[#6b7280]">Canale di trasmissione</p><p className="text-[15px] font-semibold">SistemaTS</p></div>
          <Badge tone="green">Prestazione sanitaria</Badge>
        </div>
        <p className="text-[13px] font-medium mt-3 mb-1">Prestazione</p>
        <div className="h-9 rounded-lg border border-[#e5e7eb] px-3 flex items-center gap-2 text-[14px]">Seduta individuale — €80,00 <Badge tone="gray">default</Badge><ChevronDown className="w-4 h-4 ml-auto text-[#9ca3af]" /></div>
        <p className="text-[13px] font-medium mt-3 mb-1">Descrizione</p>
        <div className="h-[58px] rounded-lg border border-[#e5e7eb] px-3 py-2 text-[14px]">Seduta individuale</div>
      </Card>
    </InvoicePage>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between text-[14px] ${strong ? "font-semibold border-t border-[#e5e7eb] pt-2 mt-1" : "text-[#4b5563]"}`}>
      <span>{label}</span><span className="tabular-nums">{value}</span>
    </div>
  );
}

export function MockNuovaFatturaImporti() {
  return (
    <InvoicePage>
      <Segmented items={["Fattura manuale", "Da sedute (3)"]} active="Fattura manuale" />
      <Card className="mt-4" title="Importi">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Field label="Importo (€) (ENPAP incluso)" value="80,00" />
            <p className="text-[13px] flex items-center gap-2 mt-3"><Checkbox /> Includi contributo ENPAP (2%) in tariffa</p>
            <p className="text-[12px] text-[#6b7280] mt-2">Inserisci il totale che paga il paziente — l'ENPAP viene estratto da quella cifra.</p>
          </div>
          <div className="rounded-xl bg-[#f9fafb] border border-[#e5e7eb] px-4 py-3 space-y-1.5">
            <p className="text-[13px] font-semibold mb-1">Riepilogo calcolo</p>
            <SummaryRow label="Compenso professionale" value="€78,43" />
            <SummaryRow label="Contributo ENPAP (2%)" value="+€1,57" />
            <SummaryRow label="Marca da bollo (Cliente)" value="+€2,00" />
            <SummaryRow label="Totale" value="€82,00" strong />
          </div>
        </div>
      </Card>
      <Card className="mt-4" title="Coordinate di pagamento">
        <p className="text-[14px] flex items-center gap-2"><Checkbox /> Il cliente ha già pagato</p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Field label="Metodo di pagamento" value="Bonifico" select />
          <Field label="Data pagamento" value="29/10/2026" icon={<Calendar className="w-4 h-4 text-[#9ca3af]" />} />
        </div>
      </Card>
      <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 mt-4">
        <p className="text-[13px] font-semibold">Testo standard fattura</p>
        <p className="text-[12px] text-[#6b7280] mt-0.5 leading-snug">Operazione effettuata ai sensi dell'articolo 1, commi da 54 a 89, della Legge n. 190/2014 – Regime Forfettario. Operazione non soggetta a ritenuta alla fonte a titolo di acconto ai sensi dell'articolo 1, comma 67, L. n. 190/2014. Imposta di bollo da 2 euro assolta sull'originale per importi maggiori di 77,47 euro.</p>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <Pill className="h-9 px-4 text-[14px] font-medium">Annulla</Pill>
        <Pill className="h-9 px-4 text-[14px] font-medium">Salva bozza</Pill>
        <DarkButton>Crea fattura</DarkButton>
      </div>
    </InvoicePage>
  );
}

// ── Elenco fatture ───────────────────────────────────────────────────────────

const ROWS: { num: string; draft?: boolean; date: string; who: string; amount: string; total: string; paid: boolean; ch: "TS" | "SdI" | null; status?: [string, keyof typeof BADGE] }[] = [
  { num: "2026/418", date: "29/10/2026", who: "Davide", amount: "€80,00", total: "€82,00", paid: true, ch: "TS", status: ["In attesa", "amber"] },
  { num: "Bozza", draft: true, date: "29/10/2026", who: "Luca Ferri", amount: "€80,00", total: "€82,00", paid: false, ch: null },
  { num: "2026/417", date: "28/10/2026", who: "Sara Conti", amount: "€70,00", total: "€70,00", paid: true, ch: "TS", status: ["Accettata", "green"] },
  { num: "2026/416", date: "27/10/2026", who: "Studio Bianchi S.r.l.", amount: "€150,00", total: "€152,00", paid: false, ch: "SdI", status: ["Consegnata", "blue"] },
  { num: "2026/415", date: "24/10/2026", who: "Chiara Esposito", amount: "€80,00", total: "€82,00", paid: true, ch: "TS", status: ["Errore", "red"] },
];

export function MockFattureLista() {
  return (
    <SettingsShell active="fatture" nav="fatturazione" title="Fatture" desc="Gestisci le tue fatture e invia al Sistema Tessera Sanitaria"
      actions={<>
        <Pill className="h-8 px-3 text-[13px]"><Download className="w-3.5 h-3.5" /> Esporta CSV</Pill>
        <Pill className="h-8 px-3 text-[13px]"><Download className="w-3.5 h-3.5" /> Esporta XML</Pill>
        <DarkButton className="h-8 text-[13px]"><Plus className="w-3.5 h-3.5" /> Nuova Fattura</DarkButton>
      </>}>
      <div className="rounded-2xl border border-[#e5e7eb] px-5 py-3 flex items-center gap-6">
        <div className="w-[220px]"><p className="text-[15px] font-semibold">Ricavi forfettario 2026</p><p className="text-[12px] text-[#6b7280]">Monitora la soglia annuale di €85.000</p></div>
        <div className="flex-1">
          <div className="flex justify-between text-[13px] mb-1.5"><span>Imponibile <b>€31.420,00</b></span><span className="text-[#6b7280]">37% di €85.000</span></div>
          <div className="h-2 rounded-full bg-[#f3f4f6]"><div className="h-2 rounded-full bg-[#0a0a0a]" style={{ width: "37%" }} /></div>
        </div>
        <p className="text-[13px] text-[#6b7280] w-[140px] text-right">€53.580 rimanenti</p>
      </div>
      <div className="grid grid-cols-5 gap-3 mt-3">
        {[["Totale", "418"], ["Pagate", "401"], ["TS In attesa", "1"], ["Incassato", "€32.050,00"], ["ENPAP incassato", "€628,43"]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-[#e5e7eb] px-4 py-2.5"><p className="text-[12px] text-[#6b7280]">{l}</p><p className="text-[20px] font-bold">{v}</p></div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1 h-9 rounded-lg border border-[#e5e7eb] px-3 flex items-center gap-2 text-[14px] text-[#9ca3af]"><Search className="w-4 h-4" /> Cerca per paziente o numero...</div>
        <Pill className="h-9 px-4 text-[14px]"><SlidersHorizontal className="w-4 h-4" /> Filtri</Pill>
        <Pill className="h-9 w-9 justify-center"><RefreshCw className="w-4 h-4" /></Pill>
      </div>
      <div className="mt-3 rounded-2xl border border-[#e5e7eb] overflow-hidden text-[14px]">
        <div className="grid grid-cols-[28px_1.2fr_1fr_1.6fr_0.8fr_0.8fr_0.9fr_1.2fr_20px] gap-3 px-4 h-9 items-center bg-[#f9fafb] text-[12px] font-medium text-[#6b7280]">
          <Checkbox on={false} /><span>Numero</span><span>Data</span><span>Paziente</span><span>Importo</span><span>Totale</span><span>Pagato</span><span>Trasmissione</span><span />
        </div>
        {ROWS.map((r) => (
          <div key={r.num + r.who} className="grid grid-cols-[28px_1.2fr_1fr_1.6fr_0.8fr_0.8fr_0.9fr_1.2fr_20px] gap-3 px-4 h-11 items-center border-t border-[#e5e7eb]">
            <Checkbox on={false} />
            <span className="flex items-center gap-1.5">{r.draft ? <Badge tone="gray">Bozza</Badge> : <span className="font-medium">{r.num}</span>}</span>
            <span className="text-[#4b5563]">{r.date}</span>
            <span className="truncate">{r.who}</span>
            <span className="tabular-nums">{r.amount}</span>
            <span className="tabular-nums font-medium">{r.total}</span>
            <span>{r.paid ? <Badge tone="green">Pagata</Badge> : <Badge tone="amber">Non pagata</Badge>}</span>
            <span className="flex items-center gap-1.5">{r.ch && r.status
              ? <><span className="text-[11px] text-[#9ca3af] w-6">{r.ch}</span><Badge tone={r.status[1]}>{r.status[0]}</Badge></>
              : <span className="text-[#9ca3af]">—</span>}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af]" />
          </div>
        ))}
      </div>
    </SettingsShell>
  );
}

// ── Dettaglio fattura ────────────────────────────────────────────────────────

function KV({ k, v, strong = false }: { k: string; v: ReactNode; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 text-[14px] ${strong ? "font-semibold" : ""}`}>
      <span className={strong ? "" : "text-[#6b7280]"}>{k}</span><span className="tabular-nums text-right">{v}</span>
    </div>
  );
}

function MockFattura({ accepted }: { accepted: boolean }) {
  return (
    <InvoicePage>
      <p className="text-[14px] text-[#4b5563] flex items-center gap-1.5"><ChevronLeft className="w-4 h-4" /> Fatture</p>
      <div className="flex items-center gap-3 mt-2">
        <p className="text-[28px] font-bold leading-tight">2026/418</p>
        <Badge tone="gray">Fattura</Badge>
        <Badge tone="green">Confermata</Badge>
        <span className="text-[14px] text-[#6b7280]">29 ott 2026</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 text-[14px]">
        {accepted ? (<>
          <Pill className="h-9 px-4 font-medium"><Download className="w-4 h-4" /> Scarica PDF</Pill>
          <Pill className="h-9 px-4 font-medium"><RefreshCw className="w-4 h-4" /> Rigenera PDF</Pill>
          <Pill className="h-9 px-4 font-medium"><FileMinus className="w-4 h-4" /> Crea nota di credito</Pill>
        </>) : (<>
          <DarkButton><Send className="w-4 h-4" /> Invia a TS</DarkButton>
          <Pill className="h-9 px-4 font-medium"><FileText className="w-4 h-4" /> Genera PDF</Pill>
          <Pill className="h-9 px-4 font-medium text-[#b91c1c] border-[#fecaca]"><Ban className="w-4 h-4" /> Annulla fattura</Pill>
        </>)}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <Card title="Paziente">
            <div className="space-y-1.5"><KV k="Nome" v="Davide" /><KV k="Email" v="davide@email.it" /><KV k="Codice fiscale" v="BNCDVD00A01H000X" /></div>
          </Card>
          <Card title="Dettagli fattura">
            <KV k="Descrizione" v="Seduta individuale" />
          </Card>
        </div>
        <Card title="Importi">
          <div className="space-y-1.5">
            <KV k="Prestazione" v="€78,43" />
            <KV k="Contributo ENPAP (2%)" v="€1,57" />
            <KV k="Marca da bollo" v="€2,00" />
            <div className="border-t border-[#e5e7eb] pt-1.5"><KV k="Totale" v="€82,00" strong /></div>
            <div className="h-1" />
            <KV k="Metodo di pagamento" v="Bonifico" />
            <KV k="Data pagamento" v="29/10/2026" />
            <KV k="Pagato" v={<Badge tone="green">Pagata</Badge>} />
            <KV k="Canale di compliance" v="Sistema TS" />
          </div>
        </Card>
      </div>
      <Card className="mt-4" title="Storico TS">
        {accepted ? (
          <div className="grid grid-cols-4 gap-4 text-[14px]">
            <div><p className="text-[12px] text-[#6b7280]">Stato TS</p><Badge tone="green">Accettata</Badge></div>
            <div><p className="text-[12px] text-[#6b7280]">Inviato il</p><p>29/10/2026 10:42</p></div>
            <div><p className="text-[12px] text-[#6b7280]">Protocollo</p><p>TS-2026-00841</p></div>
            <div><p className="text-[12px] text-[#6b7280]">Tentativi di trasmissione</p><p>1</p></div>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-[14px]">
            <div><p className="text-[12px] text-[#6b7280]">Stato TS</p><Badge tone="amber">In attesa</Badge></div>
            <p className="flex items-center gap-1.5 text-[13px] text-[#6b7280]"><Info className="w-4 h-4" /> La fattura è pagata e pronta per l'invio al Sistema TS.</p>
            <Pill className="h-8 px-3 ml-auto text-[13px]"><RefreshCw className="w-3.5 h-3.5" /> Riprova</Pill>
          </div>
        )}
      </Card>
    </InvoicePage>
  );
}

export function MockFatturaDettaglio() {
  return <MockFattura accepted={false} />;
}

export function MockFatturaAccettata() {
  return <MockFattura accepted />;
}
