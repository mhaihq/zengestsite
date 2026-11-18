import { ServicesStack, type Service } from "./ui/services-stack";

// Capabilities must match the step names of each drawing in ui/services-stack.tsx.
const PRODUCTS: Service[] = [
  {
    id: "cartella",
    title: "Cartella clinica",
    text: "La scheda del paziente, aggiornata a ogni seduta: consenso firmato, preparazione, sedute con il loro riepilogo, contesto clinico, documenti e note di andamento.",
    capabilities: ["Consenso digitale", "Prep Sessione", "Sessioni e riepilogo", "Contesto clinico", "Documenti", "Note di andamento"],
    href: "https://app.zengest.it/sign-up/",
    cta: "Prova gratis",
    price: "Inclusa sia nella Fatturazione sia nell'AI clinica",
    bg: "linear-gradient(160deg, #00122F 0%, #0B3B4F 55%, #0D9488 100%)",
  },
  {
    id: "note",
    title: "Note cliniche AI",
    text: "Registri la seduta in presenza o online. ZenGest trascrive distinguendo chi parla e prepara la bozza di nota nel tuo formato. Tu la rivedi, la modifichi con un'istruzione e la condividi.",
    capabilities: ["Registrazione", "Trascrizione per oratore", "Nota SOAP, DAP, BIRP", "Modelli Zen", "Modifica magica", "Export e condivisione"],
    href: "/note-cliniche-ai",
    price: "AI clinica, da €19 + IVA al mese",
    bg: "linear-gradient(160deg, #00122F 0%, #1E3A7A 55%, #3B6FD4 100%)",
  },
  {
    id: "assistente",
    title: "Assistente Zen",
    text: "Fai domande sul paziente e l'Assistente risponde partendo dalla sua cartella: sedute, note e documenti. Lo orienti con un agente per approccio o con il tuo, e le relazioni diventano documenti da modificare.",
    capabilities: ["Prepara la seduta", "Ragiona sul caso", "Agenti per approccio", "I tuoi agenti", "Documenti modificabili", "Allegati"],
    href: "/assistente-ai",
    price: "Incluso in tutti i piani AI clinica",
    bg: "linear-gradient(160deg, #00122F 0%, #2A2F7A 55%, #6D7FE0 100%)",
  },
  {
    id: "fatturazione",
    title: "Fatturazione",
    text: "Fatturi le sedute non ancora fatturate, con ENPAP e marca da bollo già calcolati. ZenGest invia al Sistema TS per i pazienti e allo SdI per aziende ed enti, e prepara i file per il commercialista.",
    capabilities: ["Fattura dalle sedute", "ENPAP e marca da bollo", "Invio al Sistema TS", "Fattura elettronica SdI", "Forfettario o ordinario", "Export per il commercialista"],
    href: "/fatturazione",
    price: "Da €36 + IVA all'anno, o insieme all'AI clinica",
    bg: "linear-gradient(160deg, #00122F 0%, #123C5E 55%, #2F7FB8 100%)",
  },
];

// The homepage shows only the Cartella clinica panel: note, assistente and fatturazione
// are covered by the session film and the Assistente Zen section right below it.
// To bring a panel back, add its id here.
const SHOWN = ["cartella"];

export function ProductsStackSection() {
  return <ServicesStack services={PRODUCTS.filter((p) => SHOWN.includes(p.id))} eyebrow="Dentro ZenGest" />;
}
