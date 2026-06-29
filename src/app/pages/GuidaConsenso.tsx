import { useState, useRef, useEffect, useReducer } from "react";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { breadcrumbSchema } from "../components/SEO";
import {
  Copy, Check, ChevronDown, ChevronUp, AlertTriangle,
  ShieldCheck, BookOpen, MessageSquare,
  Wand2, PlayCircle, ClipboardList, RotateCcw, ArrowRight,
  ThumbsUp, HelpCircle, XCircle, Frown,
} from "lucide-react";

// Brand tokens
const NAVY = "#00122F";
const BLUE = "#3B6FD4";
const BLUE_GRAD = "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)";
const HERO_GRAD = "linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)";
const SERIF = "font-['Instrument_Serif']"; // large display headings ONLY
const SANS = "font-['DM_Sans']";
// Card/widget heading style — DM Sans bold, not the thin display serif (more readable at small sizes)
const HEAD = "font-['DM_Sans'] font-bold tracking-[-0.01em]";

// ── Types ────────────────────────────────────────────────────────────────────

interface Script {
  id: number;
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  text: string;
}

interface FAQ { q: string; a: string; }

interface PatientResponse {
  id: string;
  label: string;
  tone: "positive" | "hesitant" | "resistant" | "curious";
  coaching: { doSay: string; doNot: string; note?: string };
}

interface RolePlayScript { scriptId: number; patientResponses: PatientResponse[]; }
interface ChecklistItem { id: string; label: string; phase: "pre" | "durante" | "post"; }

// ── Static data ───────────────────────────────────────────────────────────────

const SCRIPTS: Script[] = [
  {
    id: 1,
    title: "\"Ti do la mia piena attenzione\"",
    tag: "Beneficio per il paziente",
    tagColor: "bg-[#D6E4F0] text-[#00122F]",
    description: "Per chi vuole mettere al centro il beneficio concreto per il paziente.",
    text: "Voglio dirti come gestisco la documentazione delle nostre sedute. Uso uno strumento — si chiama ZenGest — che registra la conversazione e genera una bozza delle mie note cliniche. Il vantaggio per te è concreto: posso concentrarmi completamente su di te, senza scrivere mentre parliamo. Io poi leggo ogni riga della bozza, la correggo, e solo dopo la salvo nel tuo fascicolo. L'audio viene eliminato una volta generate le note. Hai domande? Vuoi che ti spieghi qualcosa meglio prima di decidere?",
  },
  {
    id: 2,
    title: "\"Privacy prima di tutto\"",
    tag: "Alta sensibilità",
    tagColor: "bg-violet-100 text-violet-700",
    description: "Per pazienti più riservati, o in contesti ad alta sensibilità (trauma, dipendenze, sessualità).",
    text: "Prima di iniziare, voglio essere trasparente su come lavoro. Ho uno strumento digitale che mi aiuta a scrivere le note dopo la seduta — non durante. Registra la nostra conversazione, poi elabora il testo e l'audio viene cancellato. Le note le scrivo io: lo strumento mi dà solo una bozza che poi modifico. I tuoi dati non vengono usati per addestrare algoritmi, non li vede nessun altro. Puoi dire no — e non cambia nulla nel nostro lavoro insieme.",
  },
  {
    id: 3,
    title: "\"Sei tu in controllo\"",
    tag: "Paziente controllante",
    tagColor: "bg-amber-100 text-amber-700",
    description: "Per pazienti che tendono al controllo, hanno vissuto violazioni della privacy, o lavorano nella sicurezza.",
    text: "Uso uno strumento che mi aiuta con la documentazione, ma voglio che tu sappia che sei tu ad avere il controllo. Se in qualsiasi momento — anche a metà seduta — vuoi che spenga la registrazione, basta dirmelo e lo faccio subito. Ogni riga che lo strumento genera viene letta e approvata da me prima di entrare nel tuo fascicolo. Non firma nulla senza che io lo abbia rivisto. Possiamo provare oggi e vedere come ti senti?",
  },
  {
    id: 4,
    title: "Versione breve",
    tag: "Tech-friendly",
    tagColor: "bg-emerald-100 text-emerald-700",
    description: "Veloce, diretto, non burocratico. Per pazienti già a proprio agio con la tecnologia.",
    text: "Una cosa veloce: uso uno strumento AI per le note cliniche — registra la seduta, genera una bozza, io la rivedo. L'audio viene eliminato dopo. Se preferisci che non lo usi, nessun problema. Ok per te?",
  },
  {
    id: 5,
    title: "Paziente già in carico",
    tag: "Mid-terapia",
    tagColor: "bg-rose-100 text-rose-700",
    description: "Quando stai introducendo ZenGest in una relazione terapeutica già avviata.",
    text: "Volevo aggiornarti su qualcosa prima di iniziare. Ho introdotto uno strumento nuovo per la documentazione — si chiama ZenGest. Mi aiuta con le note cliniche: registra la seduta, genera una bozza, io la rivedo e approvo. Volevo dirtelo direttamente, non fartelo trovare in un modulo, perché penso che la trasparenza sia importante nel modo in cui lavoriamo insieme. Come la vedi?",
  },
];

const FAQS: FAQ[] = [
  { q: "Chi vede la registrazione?", a: "Solo io. I dati sono cifrati e accessibili esclusivamente a me. ZenGest tratta i dati per mio conto, ma non ha accesso ai contenuti delle sessioni." },
  { q: "L'audio viene conservato per sempre?", a: "No. Viene eliminato dopo che ho generato e salvato le note. Non rimane nulla sui server una volta che ho completato la documentazione." },
  { q: "L'AI capisce quello che dico? E se sbaglia?", a: "Lo strumento trascrive e organizza — non interpreta clinicamente. Se genera qualcosa di impreciso, lo correggo io prima che diventi nota ufficiale. Non copio mai alla cieca." },
  { q: "I miei dati vengono usati per addestrare l'AI?", a: "No. ZenGest non usa le sessioni per addestrare modelli. I tuoi dati sono tuoi." },
  { q: "Posso chiedere di cancellare tutto?", a: "Sì. Hai il diritto alla cancellazione dei dati in qualsiasi momento. Gestisco io la richiesta." },
  { q: "Se accetto oggi, posso cambiare idea?", a: "Sempre. Puoi revocare il consenso in qualsiasi momento — anche a metà seduta. Basta dirmelo." },
  { q: "Stai usando l'AI per decidere cosa fare con me?", a: "No. L'AI non prende nessuna decisione clinica. Io ascolto, valuto, e decido — come ho sempre fatto. Lo strumento mi aiuta solo a scrivere le note." },
];

const SENSITIVE_PATIENTS = [
  { label: "Trauma da sorveglianza", desc: "La registrazione può attivare risposte di allarme anche se razionalmente la capiscono." },
  { label: "Disturbi paranoidi o deliranti", desc: "Valuta caso per caso se introdurre la tecnologia." },
  { label: "Minorenni", desc: "Il consenso va ottenuto sia dal minore (se in grado) che dai genitori/tutori." },
  { label: "Percorsi legali o forensi", desc: "Verifica le implicazioni specifiche prima di procedere." },
  { label: "Persone-pleaser", desc: "Assicurati che il \"sì\" sia davvero libero, non compiacenza." },
];

const ROLEPLAY_DATA: RolePlayScript[] = [
  {
    scriptId: 1,
    patientResponses: [
      { id: "1-ok", label: "Va bene, non ho problemi.", tone: "positive", coaching: { doSay: "Ottimo. Se dovesse cambiarti idea in qualsiasi momento, dimmelo — posso spegnerlo subito.", doNot: "Non aggiungere ulteriori spiegazioni. Il sì è arrivato: lascia che respiri.", note: "Accettazione immediata. Documentala e vai avanti." } },
      { id: "1-who-sees", label: "Chi vede la registrazione?", tone: "curious", coaching: { doSay: "Solo io. I dati sono cifrati e nessun altro vi ha accesso — nemmeno ZenGest può vedere il contenuto. L'audio viene poi cancellato.", doNot: "Non dire «non preoccuparti» — minimizza la legittimità della domanda." } },
      { id: "1-prefer-no", label: "Preferisco di no.", tone: "resistant", coaching: { doSay: "Assolutamente. Nessun problema — continueremo come sempre.", doNot: "Non chiedere perché, non insistere, non mostrarti deluso. Il no è completo.", note: "Torna al lavoro. Documenta nel fascicolo che hai informato e che il paziente ha declinato." } },
      { id: "1-change-mind", label: "Posso cambiare idea dopo?", tone: "curious", coaching: { doSay: "Sempre. Puoi dirmi di smettere anche durante una seduta — basta dirmelo.", doNot: "Non dire «speriamo di no» o qualcosa che implichi che il tuo lavoro dipenda dal suo sì." } },
    ],
  },
  {
    scriptId: 2,
    patientResponses: [
      { id: "2-ok", label: "Ok, capisco.", tone: "positive", coaching: { doSay: "Bene. Se vuoi, posso darti anche il documento informativo scritto. Andiamo avanti?", doNot: "Non aggiungere dettagli tecnici non richiesti." } },
      { id: "2-training", label: "I miei dati non vengono usati per addestrare l'AI?", tone: "curious", coaching: { doSay: "No. ZenGest non usa le sessioni per addestrare modelli. È una condizione contrattuale — i tuoi dati sono tuoi.", doNot: "Non dire «almeno credo» o esprimere incertezza tecnica — studia la risposta in anticipo.", note: "Paziente informato digitalmente. Apprezza la precisione tecnica." } },
      { id: "2-no-tech", label: "Non mi piace molto questa cosa dell'AI.", tone: "hesitant", coaching: { doSay: "È una reazione comprensibile. Se vuoi, possiamo rimandare la decisione. Non hai bisogno di rispondere adesso.", doNot: "Non cercare di convincerlo. Non è un problema da risolvere — è un confine da rispettare." } },
      { id: "2-prefer-no", label: "Preferisco di no.", tone: "resistant", coaching: { doSay: "Assolutamente. Nessun problema — continueremo come prima.", doNot: "Non mostrarti sorpreso — lo script 2 è pensato proprio per chi è più riservato." } },
    ],
  },
  {
    scriptId: 3,
    patientResponses: [
      { id: "3-can-stop", label: "Posso davvero fermarlo quando voglio?", tone: "curious", coaching: { doSay: "Sì. Puoi dirmelo anche a metà frase — spengo subito. Nessuna parte di questa seduta viene registrata senza il tuo consenso esplicito.", doNot: "Non aggiungere «ma tanto non cambia nulla» — per questo paziente cambia tutto.", note: "Ogni conferma della tua serietà rafforza l'alleanza con questo paziente." } },
      { id: "3-who-approves", label: "Chi approva quello che scrive?", tone: "curious", coaching: { doSay: "Io. Leggo ogni riga prima che diventi una nota. Lo strumento non produce nulla che non sia passato dalla mia revisione.", doNot: "Non dire «di solito» o «in genere» — deve essere una certezza assoluta." } },
      { id: "3-let-try", label: "Proviamo, ma mi riservo di fermarlo.", tone: "hesitant", coaching: { doSay: "Perfetto. E se lo vuoi fermare, basta un gesto. Iniziamo?", doNot: "Non sottolineare «vedi che alla fine hai detto sì» — è condiscendente.", note: "Questa è spesso la risposta migliore: il paziente mantiene il controllo pur partecipando." } },
      { id: "3-prefer-no", label: "No, preferisco senza.", tone: "resistant", coaching: { doSay: "Capito. Lavoriamo come abbiamo sempre fatto.", doNot: "Non riformulare la domanda sperando in un sì diverso." } },
    ],
  },
  {
    scriptId: 4,
    patientResponses: [
      { id: "4-ok", label: "Ok, nessun problema.", tone: "positive", coaching: { doSay: "Perfetto.", doNot: "Non aggiungere nulla. Lo script breve è apprezzato proprio perché è breve." } },
      { id: "4-how", label: "Come funziona esattamente?", tone: "curious", coaching: { doSay: "Registra la seduta, genera una bozza delle mie note, poi io la rivedo e l'audio viene cancellato. Tutto qui.", doNot: "Non entrare in dettagli tecnici non richiesti — mantieni lo stesso tono diretto dello script." } },
      { id: "4-prefer-no", label: "Preferisco di no.", tone: "resistant", coaching: { doSay: "Nessun problema.", doNot: "Non spiegare ulteriormente. Hai già dato tutto il necessario — il no è semplice quanto il sì." } },
    ],
  },
  {
    scriptId: 5,
    patientResponses: [
      { id: "5-why-now", label: "Perché lo stai introducendo adesso?", tone: "curious", coaching: { doSay: "È uno strumento nuovo che ho iniziato a usare di recente. Ho voluto dirtelo subito, di persona, prima di attivarlo con te.", doNot: "Non dire «l'ho già usato» se non è vero. La trasparenza è la ragione per cui usi questo script.", note: "Questa domanda è sana — è il paziente che tiene alla relazione." } },
      { id: "5-changes-us", label: "Cambia qualcosa nel nostro lavoro insieme?", tone: "hesitant", coaching: { doSay: "No. Il modo in cui lavoriamo è lo stesso. Cambia solo come gestisco la documentazione dopo la seduta.", doNot: "Non promettere cose diverse da quello che ZenGest fa realmente." } },
      { id: "5-trust", label: "Perché non me lo hai detto prima?", tone: "resistant", coaching: { doSay: "Hai ragione che avrei potuto dirtelo appena l'ho deciso. Te lo sto dicendo adesso, prima di usarlo. Se non ti va, non lo uso con te.", doNot: "Non difenderti eccessivamente. Riconosci il sentimento senza sminuirlo.", note: "Il paziente ti sta testando sulla trasparenza — passa il test rimanendo diretto." } },
      { id: "5-ok-try", label: "Ok, proviamo.", tone: "positive", coaching: { doSay: "Ottimo. E se cambiate idea, basta dirmelo.", doNot: "Non esprimere eccessivo sollievo — mantenere la calma normalizza la situazione." } },
    ],
  },
];

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "pre-1", label: "Ho scelto lo script più adatto a questo paziente", phase: "pre" },
  { id: "pre-2", label: "Ho valutato il contesto di sensibilità del paziente", phase: "pre" },
  { id: "pre-3", label: "Ho verificato che ZenGest sia pronto e funzionante", phase: "pre" },
  { id: "pre-4", label: "So rispondere alle domande più frequenti sui dati", phase: "pre" },
  { id: "dur-1", label: "Ho presentato cosa fa ZenGest (registra, genera bozza, elimina audio)", phase: "durante" },
  { id: "dur-2", label: "Ho spiegato che l'audio viene eliminato dopo la generazione delle note", phase: "durante" },
  { id: "dur-3", label: "Ho lasciato spazio reale per domande — non solo teorico", phase: "durante" },
  { id: "dur-4", label: "Ho chiarito il diritto di revoca in qualsiasi momento", phase: "durante" },
  { id: "dur-5", label: "Ho rispettato la decisione del paziente senza insistere", phase: "durante" },
  { id: "post-1", label: "Ho documentato la conversazione sul consenso nel fascicolo", phase: "post" },
  { id: "post-2", label: "Ho annotato eventuali riserve o domande del paziente", phase: "post" },
  { id: "post-3", label: "Ho aggiornato la nota con il risultato (accettato / declinato)", phase: "post" },
];

// ── Wizard logic ──────────────────────────────────────────────────────────────

type WizardTipo = "nuovo" | "in_carico";
type WizardSens = "normale" | "alta" | "paranoide" | "minorenne";
type WizardTech = "si" | "no";
type WizardStep = "q1" | "q2" | "q3" | "result";

interface WizardState {
  step: WizardStep;
  tipo: WizardTipo | null;
  sensibilita: WizardSens | null;
  tech: WizardTech | null;
  recommendedId: number | null;
  reason: string | null;
}

type WizardAction =
  | { type: "SET_TIPO"; value: WizardTipo }
  | { type: "SET_SENS"; value: WizardSens }
  | { type: "SET_TECH"; value: WizardTech }
  | { type: "BACK" }
  | { type: "RESET" };

function resolveScript(tipo: WizardTipo, sens: WizardSens | null, tech: WizardTech | null) {
  if (tipo === "in_carico") return { id: 5, reason: "Hai già una relazione terapeutica avviata. Lo script 5 aggiorna il paziente mid-terapia con la trasparenza che la relazione richiede." };
  if (sens === "paranoide") return { id: 3, reason: "Con pazienti con disturbi paranoidi, la leva del controllo è il framework più sicuro. Lo script 3 mette al centro la loro autonomia." };
  if (sens === "minorenne") return { id: 2, reason: "Con i minorenni serve linguaggio chiaro e rassicurante sui dati. Lo script 2 è il più diretto sulla privacy senza essere tecnico." };
  if (sens === "alta") return { id: 2, reason: "Contesti ad alta sensibilità richiedono rassicurazione esplicita su privacy e controllo. Lo script 2 mette al centro questi aspetti." };
  if (tech === "si") return { id: 4, reason: "Paziente a proprio agio con la tecnologia e senza fragilità particolari: la versione breve è più efficace di una lunga spiegazione." };
  return { id: 1, reason: "Per un nuovo paziente standard, enfatizzare il beneficio concreto — la tua piena attenzione — è la leva più efficace." };
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_TIPO": {
      if (action.value === "in_carico") {
        const r = resolveScript("in_carico", null, null);
        return { ...state, tipo: action.value, step: "result", recommendedId: r.id, reason: r.reason };
      }
      return { ...state, tipo: action.value, step: "q2", sensibilita: null, tech: null, recommendedId: null, reason: null };
    }
    case "SET_SENS": {
      if (action.value === "paranoide" || action.value === "minorenne") {
        const r = resolveScript(state.tipo!, action.value, null);
        return { ...state, sensibilita: action.value, step: "result", recommendedId: r.id, reason: r.reason };
      }
      return { ...state, sensibilita: action.value, step: "q3", tech: null, recommendedId: null, reason: null };
    }
    case "SET_TECH": {
      const r = resolveScript(state.tipo!, state.sensibilita, action.value);
      return { ...state, tech: action.value, step: "result", recommendedId: r.id, reason: r.reason };
    }
    case "BACK": {
      if (state.step === "q2") return { ...state, step: "q1" };
      if (state.step === "q3") return { ...state, step: "q2" };
      if (state.step === "result") {
        if (state.tipo === "in_carico") return { ...state, step: "q1", recommendedId: null, reason: null };
        if (state.sensibilita === "paranoide" || state.sensibilita === "minorenne") return { ...state, step: "q2", recommendedId: null, reason: null };
        return { ...state, step: "q3", recommendedId: null, reason: null };
      }
      return state;
    }
    case "RESET":
      return { step: "q1", tipo: null, sensibilita: null, tech: null, recommendedId: null, reason: null };
    default:
      return state;
  }
}

// ── Animation helpers ─────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView(0.08);
  return (
    <div ref={ref} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >{children}</div>
  );
}

function SectionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className={`inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white ${SANS} mb-5`}>
      {children}
    </div>
  );
}

// ── Script card ───────────────────────────────────────────────────────────────

function ScriptCard({ script, index, isRecommended = false }: { script: Script; index: number; isRecommended?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { if (isRecommended) setExpanded(true); }, [isRecommended]);

  const handleCopy = () => { navigator.clipboard.writeText(script.text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const isShort = script.text.length < 260;

  return (
    <FadeIn delay={Math.min(index * 0.06, 0.24)}>
      <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all duration-300 ${isRecommended ? "border-[#3B6FD4] ring-2 ring-[#3B6FD4]/25 shadow-[0_8px_40px_rgba(59,111,212,0.12)]" : "border-slate-100 hover:shadow-md"}`}>
        {isRecommended && (
          <div className={`text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2 ${SANS}`} style={{ background: BLUE_GRAD }}>
            <Wand2 className="w-3.5 h-3.5" /> CONSIGLIATO PER IL TUO CASO
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${SANS} ${script.tagColor}`}>{script.tag}</span>
              <h3 className={`text-lg text-[#00122F] ${HEAD} leading-snug`}>{script.title}</h3>
              <p className={`text-sm text-slate-500 mt-1 ${SANS}`}>{script.description}</p>
            </div>
            <span className={`shrink-0 text-3xl ${SERIF} text-[#D6E4F0] leading-none`}>{String(index + 1).padStart(2, "0")}</span>
          </div>

          <div className="relative mt-5">
            <div className={`bg-[#D6E4F0]/40 rounded-2xl p-5 border border-[#D6E4F0] text-[#1e293b] leading-[1.7] text-base ${SANS} transition-all duration-300 ${!expanded && !isShort ? "max-h-[5rem] overflow-hidden" : ""}`}>
              <span className="text-[#3B6FD4]/50 text-2xl leading-none mr-1">"</span>{script.text}<span className="text-[#3B6FD4]/50 text-2xl leading-none ml-1">"</span>
            </div>
            {!expanded && !isShort && (
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent rounded-b-2xl flex items-end justify-center pb-2">
                <button onClick={() => setExpanded(true)} className={`text-xs text-[#3B6FD4] hover:text-[#00122F] flex items-center gap-1 transition-colors ${SANS} font-medium`}>
                  <ChevronDown className="w-3.5 h-3.5" /> Mostra tutto
                </button>
              </div>
            )}
          </div>
          {expanded && !isShort && (
            <button onClick={() => setExpanded(false)} className={`mt-2 text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors ${SANS}`}>
              <ChevronUp className="w-3.5 h-3.5" /> Comprimi
            </button>
          )}

          <div className="mt-5 flex justify-end">
            <button onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${SANS} ${copied ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-[#00122F] text-white hover:scale-105 active:scale-95 shadow-md"}`}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copiato" : "Copia script"}
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FaqItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button className="w-full flex items-center justify-between gap-4 py-5 text-left group" onClick={() => setOpen(!open)}>
        <span className={`text-[#00122F] font-medium leading-snug group-hover:text-[#3B6FD4] transition-colors ${SANS}`}>
          <span className="text-[#3B6FD4]/40 italic mr-1.5">"</span>{faq.q}<span className="text-[#3B6FD4]/40 italic ml-1">"</span>
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${open ? "bg-[#00122F] text-white" : "bg-[#D6E4F0] text-[#00122F] group-hover:bg-[#3B6FD4] group-hover:text-white"}`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 280 : 0, opacity: open ? 1 : 0 }}>
        <div className={`pb-5 text-slate-600 leading-relaxed text-[15px] ${SANS}`}>
          <div className="bg-[#D6E4F0]/40 border border-[#D6E4F0] rounded-2xl px-5 py-4">{faq.a}</div>
        </div>
      </div>
    </div>
  );
}

// ── Wizard ────────────────────────────────────────────────────────────────────

function WizardOption({ label, sublabel, onClick, emoji }: { label: string; sublabel?: string; onClick: () => void; emoji: string }) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-[#3B6FD4] hover:bg-[#D6E4F0]/30 hover:-translate-y-0.5 transition-all duration-150 group">
      <div className="flex items-center gap-3">
        <span className="text-2xl group-hover:scale-110 transition-transform">{emoji}</span>
        <div>
          <div className={`font-semibold text-[#00122F] group-hover:text-[#3B6FD4] ${SANS}`}>{label}</div>
          {sublabel && <div className={`text-sm text-slate-500 mt-0.5 ${SANS}`}>{sublabel}</div>}
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#3B6FD4] group-hover:translate-x-0.5 ml-auto transition-all" />
      </div>
    </button>
  );
}

function ScriptWizard({ onRecommend }: { onRecommend: (id: number) => void }) {
  const [state, dispatch] = useReducer(wizardReducer, { step: "q1", tipo: null, sensibilita: null, tech: null, recommendedId: null, reason: null });
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { setAnimKey(k => k + 1); }, [state.step]);
  useEffect(() => { if (state.recommendedId !== null) onRecommend(state.recommendedId); }, [state.recommendedId, onRecommend]);

  const recommended = state.recommendedId ? SCRIPTS.find(s => s.id === state.recommendedId) : null;
  const stepPct: Record<WizardStep, number> = { q1: 33, q2: 66, q3: 90, result: 100 };
  const stepNum: Record<WizardStep, string> = { q1: "Passo 1 di 3", q2: "Passo 2 di 3", q3: "Passo 3 di 3", result: "Risultato" };

  return (
    <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
      <div className="h-1.5 bg-[#D6E4F0]/50">
        <div className="h-1.5 transition-all duration-500" style={{ width: `${stepPct[state.step]}%`, background: BLUE_GRAD }} />
      </div>

      <div className="p-6 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <p className={`text-xs text-[#0D9488] font-bold uppercase tracking-widest ${SANS}`}>{stepNum[state.step]}</p>
          {state.step !== "q1" && (
            <button onClick={() => dispatch({ type: "BACK" })} className={`text-xs text-slate-400 hover:text-[#00122F] flex items-center gap-1 transition-colors py-2 px-1 -mr-1 ${SANS}`}>
              <ChevronUp className="w-3 h-3 -rotate-90" /> Indietro
            </button>
          )}
        </div>

        <div key={animKey} style={{ animation: "wizFade 0.4s cubic-bezier(.22,1,.36,1)" }}>
          {state.step === "q1" && (
            <div>
              <h3 className={`text-2xl text-[#00122F] mb-2 ${HEAD}`}>Questo paziente è nuovo o già in carico?</h3>
              <p className={`text-slate-500 text-sm mb-6 ${SANS}`}>Il contesto della conversazione cambia in base alla risposta.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <WizardOption emoji="👋" label="Nuovo paziente" sublabel="Prima seduta o inizio percorso" onClick={() => dispatch({ type: "SET_TIPO", value: "nuovo" })} />
                <WizardOption emoji="🤝" label="Già in carico" sublabel="Relazione terapeutica in corso" onClick={() => dispatch({ type: "SET_TIPO", value: "in_carico" })} />
              </div>
            </div>
          )}
          {state.step === "q2" && (
            <div>
              <h3 className={`text-2xl text-[#00122F] mb-2 ${HEAD}`}>Qual è il contesto di questo paziente?</h3>
              <p className={`text-slate-500 text-sm mb-6 ${SANS}`}>Scegli la descrizione più vicina alla situazione.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <WizardOption emoji="🟢" label="Nessuna fragilità particolare" sublabel="Contesto standard" onClick={() => dispatch({ type: "SET_SENS", value: "normale" })} />
                <WizardOption emoji="🔶" label="Alta sensibilità" sublabel="Trauma, dipendenze, sessualità" onClick={() => dispatch({ type: "SET_SENS", value: "alta" })} />
                <WizardOption emoji="🔴" label="Disturbi paranoidi o deliranti" sublabel="Valutare con cura" onClick={() => dispatch({ type: "SET_SENS", value: "paranoide" })} />
                <WizardOption emoji="🧒" label="Minorenne" sublabel="Consenso doppio richiesto" onClick={() => dispatch({ type: "SET_SENS", value: "minorenne" })} />
              </div>
            </div>
          )}
          {state.step === "q3" && (
            <div>
              <h3 className={`text-2xl text-[#00122F] mb-2 ${HEAD}`}>È a proprio agio con la tecnologia?</h3>
              <p className={`text-slate-500 text-sm mb-6 ${SANS}`}>Influenza il livello di dettaglio che conviene usare.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <WizardOption emoji="💻" label="Sì, è tech-friendly" sublabel="Usa app, conosce l'AI" onClick={() => dispatch({ type: "SET_TECH", value: "si" })} />
                <WizardOption emoji="📵" label="No, preferisce semplicità" sublabel="Meglio un linguaggio diretto" onClick={() => dispatch({ type: "SET_TECH", value: "no" })} />
              </div>
            </div>
          )}
          {state.step === "result" && recommended && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: BLUE_GRAD }}>
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className={`text-xs font-bold text-[#0D9488] uppercase tracking-widest ${SANS}`}>Script consigliato</p>
              </div>
              <h3 className={`text-2xl text-[#00122F] mb-2 ${HEAD}`}>{recommended.title}</h3>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${SANS} ${recommended.tagColor}`}>{recommended.tag}</span>
              <div className="bg-[#D6E4F0]/40 rounded-2xl p-4 border border-[#D6E4F0] mb-5">
                <p className={`text-sm text-slate-600 leading-relaxed ${SANS}`}>{state.reason}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => document.getElementById("script")?.scrollIntoView({ behavior: "smooth" })}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-md ${SANS}`} style={{ background: NAVY }}>
                  Vai allo script <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => dispatch({ type: "RESET" })}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors ${SANS}`}>
                  <RotateCcw className="w-3.5 h-3.5" /> Ricomincia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Simulator ─────────────────────────────────────────────────────────────────

const TONE_ICON: Record<PatientResponse["tone"], React.ReactNode> = {
  positive: <ThumbsUp className="w-4 h-4 text-emerald-500" />,
  curious: <HelpCircle className="w-4 h-4 text-[#3B6FD4]" />,
  hesitant: <Frown className="w-4 h-4 text-amber-500" />,
  resistant: <XCircle className="w-4 h-4 text-rose-500" />,
};
const TONE_LABEL: Record<PatientResponse["tone"], string> = {
  positive: "Risposta positiva", curious: "Domanda", hesitant: "Esitazione", resistant: "Rifiuto",
};

function RolePlaySimulator({ initialScriptId }: { initialScriptId: number | null }) {
  const [selectedId, setSelectedId] = useState<number | null>(initialScriptId);
  const [phase, setPhase] = useState<"select" | "read" | "respond" | "coaching">("select");
  const [activeResponseId, setActiveResponseId] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { setAnimKey(k => k + 1); }, [phase, activeResponseId]);
  useEffect(() => { if (initialScriptId !== null && phase === "select") setSelectedId(initialScriptId); }, [initialScriptId]);

  const scriptData = selectedId ? ROLEPLAY_DATA.find(r => r.scriptId === selectedId) : null;
  const script = selectedId ? SCRIPTS.find(s => s.id === selectedId) : null;
  const activeResponse = scriptData?.patientResponses.find(r => r.id === activeResponseId) ?? null;

  const reset = () => { setPhase("select"); setSelectedId(null); setActiveResponseId(null); };

  return (
    <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
      {/* Window chrome bar — echoes the dashboard look */}
      <div className="flex items-center gap-1.5 px-5 py-3 border-b border-slate-100 bg-slate-50/60">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        <span className={`ml-3 text-xs text-slate-400 ${SANS}`}>Simulatore di colloquio</span>
      </div>

      <div className="p-6 md:p-10" key={animKey} style={{ animation: "wizFade 0.4s cubic-bezier(.22,1,.36,1)" }}>
        {phase === "select" && (
          <div>
            <p className={`text-xs text-[#0D9488] font-bold uppercase tracking-widest mb-4 ${SANS}`}>Scegli uno scenario</p>
            <h3 className={`text-2xl text-[#00122F] mb-2 ${HEAD}`}>Con quale script vuoi esercitarti?</h3>
            <p className={`text-slate-500 text-sm mb-6 ${SANS}`}>Vedrai le possibili risposte del paziente e come gestirle.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SCRIPTS.map(s => (
                <button key={s.id} onClick={() => { setSelectedId(s.id); setPhase("read"); setActiveResponseId(null); }}
                  className="text-left px-4 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-[#3B6FD4] hover:bg-[#D6E4F0]/30 hover:-translate-y-0.5 transition-all duration-150 group">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${SANS} ${s.tagColor}`}>{s.tag}</span>
                  <div className={`text-sm font-medium text-[#00122F] leading-snug group-hover:text-[#3B6FD4] ${SANS}`}>{s.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "read" && script && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-xs text-[#0D9488] font-bold uppercase tracking-widest ${SANS}`}>Leggi lo script</p>
              <button onClick={reset} className={`text-xs text-slate-400 hover:text-[#00122F] flex items-center gap-1 py-2 px-1 -mr-1 ${SANS}`}><RotateCcw className="w-3 h-3" /> Cambia</button>
            </div>
            <h3 className={`text-xl text-[#00122F] mb-4 ${HEAD}`}>{script.title}</h3>
            <div className={`bg-[#D6E4F0]/40 rounded-2xl p-5 border border-[#D6E4F0] text-[#1e293b] leading-[1.7] text-base mb-6 ${SANS}`}>
              <span className="text-[#3B6FD4]/50 text-2xl leading-none mr-1">"</span>{script.text}<span className="text-[#3B6FD4]/50 text-2xl leading-none ml-1">"</span>
            </div>
            <button onClick={() => setPhase("respond")}
              className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium hover:scale-105 active:scale-95 transition-all shadow-md ${SANS}`} style={{ background: NAVY }}>
              <PlayCircle className="w-4 h-4" /> Inizia la simulazione
            </button>
          </div>
        )}

        {phase === "respond" && scriptData && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-xs text-[#0D9488] font-bold uppercase tracking-widest ${SANS}`}>Simulazione in corso</p>
              <button onClick={reset} className={`text-xs text-slate-400 hover:text-[#00122F] flex items-center gap-1 py-2 px-1 -mr-1 ${SANS}`}><RotateCcw className="w-3 h-3" /> Cambia</button>
            </div>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#D6E4F0] flex items-center justify-center shrink-0 text-sm">👤</div>
              <div className="bg-[#D6E4F0]/50 border border-[#D6E4F0] rounded-2xl rounded-tl-sm px-5 py-3">
                <p className={`text-sm text-[#00122F] font-medium ${SANS}`}>Hai appena letto lo script. Il tuo paziente risponde...</p>
              </div>
            </div>
            <div className="grid gap-3">
              {scriptData.patientResponses.map(r => (
                <button key={r.id} onClick={() => { setActiveResponseId(r.id); setPhase("coaching"); }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-2xl border-2 border-slate-200 hover:border-[#3B6FD4] hover:bg-[#D6E4F0]/30 hover:translate-x-0.5 transition-all duration-150 group">
                  <div className="shrink-0">{TONE_ICON[r.tone]}</div>
                  <div>
                    <div className={`text-xs font-semibold text-slate-400 mb-0.5 ${SANS}`}>{TONE_LABEL[r.tone]}</div>
                    <div className={`text-[#00122F] font-medium group-hover:text-[#3B6FD4] italic ${SANS}`}>"{r.label}"</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#3B6FD4] ml-auto transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "coaching" && activeResponse && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-xs text-[#0D9488] font-bold uppercase tracking-widest ${SANS}`}>Coaching</p>
              <button onClick={reset} className={`text-xs text-slate-400 hover:text-[#00122F] flex items-center gap-1 py-2 px-1 -mr-1 ${SANS}`}><RotateCcw className="w-3 h-3" /> Cambia</button>
            </div>
            <div className="flex items-start gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#D6E4F0] flex items-center justify-center shrink-0 text-sm">👤</div>
              <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-5 py-3">
                <p className={`text-xs font-semibold text-slate-400 mb-0.5 ${SANS}`}>Il paziente ha detto:</p>
                <p className={`text-[#00122F] italic font-medium ${SANS}`}>"{activeResponse.label}"</p>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-3">
              <div className="flex items-center gap-2 mb-2"><Check className="w-4 h-4 text-emerald-600" /><span className={`text-xs font-semibold text-emerald-700 uppercase tracking-wider ${SANS}`}>Cosa dire</span></div>
              <p className={`text-emerald-900 leading-relaxed italic font-medium ${SANS}`}>"{activeResponse.coaching.doSay}"</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-3">
              <div className="flex items-center gap-2 mb-2"><XCircle className="w-4 h-4 text-rose-500" /><span className={`text-xs font-semibold text-rose-600 uppercase tracking-wider ${SANS}`}>Cosa evitare</span></div>
              <p className={`text-rose-900 leading-relaxed ${SANS}`}>{activeResponse.coaching.doNot}</p>
            </div>
            {activeResponse.coaching.note && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
                <div className="flex items-center gap-2 mb-1"><BookOpen className="w-3.5 h-3.5 text-amber-600" /><span className={`text-xs font-semibold text-amber-700 uppercase tracking-wider ${SANS}`}>Nota clinica</span></div>
                <p className={`text-amber-900 text-sm leading-relaxed ${SANS}`}>{activeResponse.coaching.note}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-5">
              <button onClick={() => { setActiveResponseId(null); setPhase("respond"); }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-md ${SANS}`} style={{ background: NAVY }}>
                <RotateCcw className="w-3.5 h-3.5" /> Prova un'altra risposta
              </button>
              <button onClick={() => { setPhase("read"); setActiveResponseId(null); }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors ${SANS}`}>
                Rileggi lo script
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Checklist ─────────────────────────────────────────────────────────────────

const PHASE_META = {
  pre: { label: "Prima della seduta", color: "#3B6FD4" },
  durante: { label: "Durante la conversazione", color: "#8b5cf6" },
  post: { label: "Dopo la seduta", color: "#0D9488" },
};

function ProgressiveChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const total = CHECKLIST_ITEMS.length;
  const completed = checked.size;
  const pct = Math.round((completed / total) * 100);
  const done = completed === total;
  const phases: Array<"pre" | "durante" | "post"> = ["pre", "durante", "post"];

  return (
    <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 md:px-10 pt-8 pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className={`text-xs text-[#0D9488] font-bold uppercase tracking-widest mb-1 ${SANS}`}>Progresso</p>
            <p className={`text-[#00122F] font-medium ${SANS}`}>{completed}/{total} completati</p>
          </div>
          <span className={`text-4xl ${SERIF} ${done ? "text-[#0D9488]" : "text-[#D6E4F0]"}`}>{pct}%</span>
        </div>
        <div className="h-2.5 bg-[#D6E4F0]/50 rounded-full overflow-hidden">
          <div className="h-2.5 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: done ? "#0D9488" : BLUE_GRAD }} />
        </div>
        {done && (
          <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 flex items-center gap-3" style={{ animation: "wizFade 0.5s ease" }}>
            <div className="w-10 h-10 rounded-full bg-[#0D9488] flex items-center justify-center shrink-0"><Check className="w-5 h-5 text-white" /></div>
            <div>
              <p className={`font-semibold text-emerald-800 ${SANS}`}>Sei pronto. In bocca al lupo.</p>
              <p className={`text-emerald-700 text-sm ${SANS}`}>Hai completato tutti i passaggi. Vai alla seduta con tranquillità.</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 md:px-10 py-6 space-y-8">
        {phases.map(phase => {
          const meta = PHASE_META[phase];
          const items = CHECKLIST_ITEMS.filter(i => i.phase === phase);
          const phaseDone = items.filter(i => checked.has(i.id)).length;
          return (
            <div key={phase}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: meta.color }} />
                <h4 className={`font-semibold text-[#00122F] text-sm uppercase tracking-wider ${SANS}`}>{meta.label}</h4>
                <span className={`text-xs text-slate-400 ml-auto ${SANS}`}>{phaseDone}/{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(item => {
                  const isChecked = checked.has(item.id);
                  return (
                    <button key={item.id} onClick={() => toggle(item.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-150 text-left ${isChecked ? "border-transparent" : "bg-slate-50 border-slate-100 hover:bg-[#D6E4F0]/30"}`}
                      style={isChecked ? { background: `${meta.color}12`, borderColor: `${meta.color}40` } : {}}>
                      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                        style={isChecked ? { backgroundColor: meta.color, borderColor: meta.color } : { borderColor: "#cbd5e1", backgroundColor: "#fff" }}>
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm leading-snug ${SANS} ${isChecked ? "line-through opacity-50 text-[#00122F]" : "text-slate-700"}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {completed > 0 && (
        <div className="px-6 md:px-10 pb-6">
          <button onClick={() => setChecked(new Set())} className={`text-xs text-slate-400 hover:text-[#00122F] flex items-center gap-1 transition-colors py-2 -my-1 ${SANS}`}>
            <RotateCcw className="w-3 h-3" /> Azzera per la prossima seduta
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function GuidaConsenso() {
  const [recommendedScriptId, setRecommendedScriptId] = useState<number | null>(null);

  const navLinks = [
    { id: "wizard", label: "Scegli lo script", icon: Wand2 },
    { id: "script", label: "Script pronti", icon: MessageSquare },
    { id: "simulatore", label: "Simula", icon: PlayCircle },
    { id: "checklist", label: "Checklist", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <style>{`@keyframes wizFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <SEO
        title="Come introdurre ZenGest ai pazienti — Guida al consenso informato"
        useExactTitle={false}
        description="Guida pratica per psicoterapisti, psichiatri e psicologi. Wizard per scegliere lo script, simulatore di colloquio e checklist progressiva per il consenso informato sull'uso di ZenGest."
        path="/guida-consenso"
        keywords="consenso informato AI terapia, come presentare AI pazienti, script consenso psicologi, ZenGest consenso informato"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "https://zengest.it/" },
          { name: "Guida al consenso", url: "https://zengest.it/guida-consenso" },
        ])}
      />

      {/* ── Hero — signature brand gradient ───────────────────────────── */}
      <section className="relative px-6 pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden" style={{ background: HERO_GRAD }}>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm mb-7 ${SANS}`}>
              <BookOpen className="w-4 h-4 text-[#00122F]" />
              <span className="text-xs font-medium text-[#00122F]">Guida pratica per clinici</span>
            </div>
            <h1 className={`${SERIF} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#00122F] leading-[1.08] sm:leading-[1.05] tracking-[-0.025em] mb-6`}>
              Come introdurre ZenGest<br className="hidden sm:block" />{" "}ai tuoi pazienti
            </h1>
            <p className={`${SANS} text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-9`}>
              Per psicoterapisti, psichiatri e psicologi. Wizard per scegliere lo script giusto, simulatore di colloquio e checklist: tutto per gestire il consenso informato con sicurezza.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/90 backdrop-blur-sm border border-white rounded-full text-sm text-[#00122F] hover:bg-[#00122F] hover:text-white transition-all duration-200 shadow-sm ${SANS} font-medium`}>
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #F8FAFC)" }} />
      </section>

      {/* ── Principi ──────────────────────────────────────────────────── */}
      <section id="principi" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <SectionPill>Prima di cominciare</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em]`}>Cosa devi sapere — e cosa spiegare</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn delay={0.05}>
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm h-full">
                <div className="bg-[#D6E4F0]/40 rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#3B6FD4] flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-white" /></div>
                    <h3 className={`font-bold text-[#00122F] ${SANS}`}>Cosa fa ZenGest</h3>
                  </div>
                  <p className={`text-slate-600 leading-relaxed text-sm ${SANS}`}><strong className="text-[#00122F]">Registra la seduta, genera una bozza di note, e poi — se vuoi — elimina l'audio.</strong> Il paziente deve sapere queste tre cose, in quest'ordine.</p>
                </div>
                <ul className={`space-y-2.5 text-sm text-slate-600 ${SANS}`}>
                  {["Registra la conversazione", "Genera una bozza di note cliniche", "L'audio viene eliminato dopo"].map(i => (
                    <li key={i} className="flex items-center gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-[#3B6FD4] shrink-0" />{i}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm h-full">
                <div className="bg-emerald-50 rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>
                    <h3 className={`font-bold text-[#00122F] ${SANS}`}>Cosa NON fa</h3>
                  </div>
                </div>
                <ul className={`space-y-2.5 text-sm text-slate-600 ${SANS}`}>
                  {["Non prende decisioni cliniche", "Non condivide i dati con terze parti commerciali", "Non usa le sessioni per addestrare modelli AI", "Non accede alle note senza il tuo consenso"].map(i => (
                    <li key={i} className="flex items-center gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />{i}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="md:col-span-2">
              <div className="rounded-3xl p-6 sm:p-7 md:p-9" style={{ background: NAVY }}>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#A7BCF5]">✦</span>
                  <h3 className={`font-bold text-white ${SANS}`}>Cosa fai sempre tu</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  {["Revisioni ogni bozza prima che diventi nota ufficiale", "Decidi cosa entra nel fascicolo", "Rimani l'unico responsabile della documentazione clinica"].map(i => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#A7BCF5] mt-0.5 shrink-0" />
                      <span className={`text-slate-300 text-sm leading-snug ${SANS}`}>{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Quando ────────────────────────────────────────────────────── */}
      <section id="quando" className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <SectionPill>Il timing</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em]`}>Quando fare questa conversazione</h2>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {[
              { timing: "Prima seduta (nuovo paziente)", badge: "Ideale", badgeColor: "bg-emerald-100 text-emerald-700", body: "Integrala nella spiegazione del tuo metodo di lavoro, dopo i primi minuti di rapport — non come prima cosa." },
              { timing: "Paziente già in carico", badge: "Richiede cura", badgeColor: "bg-amber-100 text-amber-700", body: "Falla all'inizio di una seduta, prima di avviare la registrazione. Non metterla in un modulo e sperare che lo leggano. Dirglielo di persona." },
              { timing: "Dopo ogni aggiornamento dello strumento", badge: "Obbligatorio", badgeColor: "bg-rose-100 text-rose-700", body: "Se cambia qualcosa nel modo in cui ZenGest tratta i dati, informali di nuovo. Il consenso non è permanente — è una conversazione che si aggiorna." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-5 bg-white rounded-3xl p-6 md:p-7 border border-slate-100 shadow-sm">
                  <div className={`shrink-0 w-9 h-9 rounded-full bg-[#D6E4F0] flex items-center justify-center text-sm font-bold text-[#00122F] ${SANS}`}>{i + 1}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className={`font-bold text-[#00122F] ${SANS}`}>{item.timing}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${SANS} ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className={`text-slate-500 text-sm leading-relaxed ${SANS}`}>{item.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wizard ────────────────────────────────────────────────────── */}
      <section id="wizard" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <SectionPill>Interattivo</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-3`}>
                Quale script <span style={{ background: BLUE_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>fa per te?</span>
              </h2>
              <p className={`${SANS} text-base text-slate-500 max-w-lg mx-auto leading-relaxed`}>Rispondi a 2-3 domande e identifichiamo lo script più adatto al tuo paziente.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}><ScriptWizard onRecommend={setRecommendedScriptId} /></FadeIn>
        </div>
      </section>

      {/* ── Script pronti ─────────────────────────────────────────────── */}
      <section id="script" className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <SectionPill>Script pronti</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-3`}>Cinque versioni per contesti diversi</h2>
              <p className={`${SANS} text-base text-slate-500 max-w-lg mx-auto leading-relaxed`}>Non recitarli parola per parola — falli tuoi. Clicca "Copia script" per averli negli appunti.</p>
            </div>
          </FadeIn>
          <div className="grid gap-5">
            {SCRIPTS.map((s, i) => <ScriptCard key={s.id} script={s} index={i} isRecommended={recommendedScriptId === s.id} />)}
          </div>
        </div>
      </section>

      {/* ── Come gestire il no ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <SectionPill>Il momento delicato</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em]`}>Come gestire il "no"</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="rounded-3xl p-6 sm:p-8 md:p-10 mb-6" style={{ background: NAVY }}>
              <p className={`text-[#A7BCF5] text-xs mb-3 uppercase tracking-widest font-bold ${SANS}`}>La risposta corretta</p>
              <p className={`${SERIF} text-white text-2xl md:text-3xl leading-relaxed`}>"Assolutamente. Nessun problema — continueremo come prima."</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className={`${SANS} text-slate-600 leading-relaxed mb-5`}>Poi torna al lavoro. Non insistere, non spiegare ulteriormente, non far pesare la decisione. Documenta nel fascicolo che hai informato il paziente e che ha preferito non usare la registrazione.</p>
            <div className="bg-[#D6E4F0]/40 border border-[#D6E4F0] rounded-3xl p-6 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-[#3B6FD4] shrink-0 mt-0.5" />
              <p className={`text-[#00122F] text-sm leading-relaxed ${SANS}`}><strong>Dall'esperienza clinica reale:</strong> Debbie Beattie, psicoterapeuta australiana, ha avuto un solo paziente che ha detto no. La seduta successiva, quel paziente ha chiesto di attivare la registrazione. Il no non è definitivo — ma non va mai sollecitato.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Simulatore ────────────────────────────────────────────────── */}
      <section id="simulatore" className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <SectionPill>Interattivo</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-3`}>
                Allenati col <span style={{ background: BLUE_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>simulatore</span>
              </h2>
              <p className={`${SANS} text-base text-slate-500 max-w-lg mx-auto leading-relaxed`}>Scegli uno script, leggi come lo presenteresti, poi scegli la risposta del paziente e ricevi coaching su come gestirla.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}><RolePlaySimulator initialScriptId={recommendedScriptId} /></FadeIn>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <SectionPill>Domande dei pazienti</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em]`}>Le domande che fanno — e come rispondere</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm px-6 md:px-8">
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pazienti attenzione extra ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <SectionPill>Attenzione extra</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-3`}>Pazienti che meritano cura aggiuntiva</h2>
              <p className={`${SANS} text-base text-slate-500 max-w-xl mx-auto leading-relaxed`}>Alcune categorie possono avere reazioni più forti alla notizia della registrazione.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SENSITIVE_PATIENTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 h-full">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mb-3" />
                  <h4 className={`font-bold text-amber-900 mb-1.5 text-sm ${SANS}`}>{p.label}</h4>
                  <p className={`text-amber-800 text-sm leading-relaxed ${SANS}`}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className={`mt-6 bg-white border border-slate-100 rounded-3xl p-6 text-slate-600 text-sm leading-relaxed shadow-sm ${SANS}`}>
              Per questi pazienti, considera di dare tempo: <span className="italic text-[#00122F]">"Non devi decidere adesso. Pensaci e dimmelo alla prossima seduta."</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Checklist ─────────────────────────────────────────────────── */}
      <section id="checklist" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <SectionPill>Interattivo</SectionPill>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-3`}>Checklist per la seduta</h2>
              <p className={`${SANS} text-base text-slate-500 max-w-lg mx-auto leading-relaxed`}>Spunta ogni passaggio prima, durante e dopo la conversazione. Azzerala per la seduta successiva.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}><ProgressiveChecklist /></FadeIn>
        </div>
      </section>

      {/* ── Closing ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: HERO_GRAD }}>
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <p className={`${SERIF} text-3xl md:text-4xl text-[#00122F] leading-[1.15] tracking-[-0.02em] mb-8`}>
              La tecnologia non è la terza persona in stanza. Sei tu che decidi come entra. ZenGest è uno strumento. La relazione è tua.
            </p>
            <a href="/sicurezza"
              className={`inline-flex items-center gap-2 h-12 px-8 rounded-xl font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md ${SANS}`}>
              <ShieldCheck className="w-4 h-4 text-[#A7BCF5]" /> Leggi sicurezza e GDPR
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
