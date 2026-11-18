import { ComparisonTemplate } from './ComparisonTemplate';

const data = {
  competitor: "Appuntoo",
  metaTitle: "ZenGest vs Appuntoo: gestionale completo o AI clinica? (2026)",
  metaDescription: "Appuntoo gestisce l'agenda, i reminder WhatsApp e la fatturazione. ZenGest genera le note cliniche durante la seduta. Confronto tra due strumenti che si completano.",
  slug: "appuntoo",
  tagline: "Gestionale completo o AI clinica?",

  intro: [
    "Appuntoo è un gestionale sanitario completo. Agenda multi-operatore, promemoria automatici via WhatsApp, fatturazione integrata, più professioni supportate. Se stai cercando un hub operativo per lo studio, è uno dei prodotti più completi sul mercato italiano.",
    "ZenGest fa una cosa sola — ma quella cosa nessun altro la fa.",
    "Appuntoo gestisce quello che succede prima e dopo la seduta: l'appuntamento, il reminder, la fattura. ZenGest trasforma la seduta stessa in documentazione intelligente. Registra, trascrive, genera la nota clinica, ricorda il contesto, riconosce pattern nel tempo.",
  ],

  whatZengest:
    "ZenGest entra nella seduta. Registra con il consenso del paziente, riconosce i parlanti, trascrive con terminologia clinica italiana specializzata. Prima che l'audio venga elaborato dall'AI, i dati sensibili vengono anonimizzati. Dopo la trascrizione, l'audio viene eliminato definitivamente. Quello che rimane: una nota clinica pronta in 60 secondi, nel formato che preferisci. Nel tempo, ZenGest costruisce una memoria clinica strutturata di ogni paziente — pattern, progressi, temi.",

  whatCompetitor:
    "Appuntoo nasce come gestionale sanitario pensato per coprire tutto il workflow operativo dello studio. Agenda avanzata con supporto multi-stanza e multi-operatore. Appuntamenti ricorrenti. Promemoria automatici via WhatsApp per ridurre i no-show. Fatturazione integrata con STS. Supporto per più figure professionali — utile per studi multidisciplinari con fisioterapisti, nutrizionisti, osteopati.",

  features: [
    { label: "Note cliniche generate dall'AI", zengest: "✓", competitor: "—" },
    { label: "Registrazione e trascrizione seduta", zengest: "✓", competitor: "—" },
    { label: "Memoria e contesto sedute nel tempo", zengest: "✓", competitor: "—" },
    { label: "Analisi alleanza terapeutica", zengest: "✓", competitor: "—" },
    { label: "Tracciamento progressi AI", zengest: "✓", competitor: "—" },
    { label: "Terminologia psicologica italiana specializzata", zengest: "✓", competitor: "—" },
    { label: "Anonimizzazione dati pre-AI", zengest: "✓", competitor: "—" },
    { label: "Costruito specificamente per psicologi", zengest: "✓", competitor: "—" },
    { label: "Agenda multi-operatore / multi-stanza", zengest: "In arrivo", competitor: "✓" },
    { label: "Promemoria WhatsApp automatici", zengest: "In arrivo", competitor: "✓" },
    { label: "Fatturazione integrata con STS", zengest: "✓", competitor: "✓" },
    { label: "Multi-professione (fisio, nutri, osteo…)", zengest: "—", competitor: "✓" },
    { label: "Scheda paziente", zengest: "✓", competitor: "✓" },
    { label: "Cartella archiviata in Europa, GDPR", zengest: "✓", competitor: "✓" },
  ],

  pricingZengest:
    "AI Clinica da 19€/mese + IVA (Start, 20 sedute), Pro 39€/mese (50 sedute), Plus 79€/mese (150 sedute). Fatturazione con Sistema TS da 36€/anno. Prova gratuita di 30 giorni, nessuna carta di credito.",

  pricingCompetitor:
    "Prezzi variabili in base al piano e al numero di professionisti. Disponibile prova gratuita sul sito.",

  chooseZengest: [
    "Sei uno psicologo o psicoterapeuta e la documentazione clinica è il tuo problema principale",
    "Vuoi eliminare le note manuali e avere insight sui tuoi pazienti che emergono automaticamente nel tempo",
    "Ti interessa un AI addestrato sulla psicologia italiana — non un assistente generico",
    "Preferisci uno strumento verticale che fa una cosa molto bene",
  ],

  chooseCompetitorLabel: "Considera Appuntoo (o usali insieme) se:",

  chooseCompetitor: [
    "Gestisci uno studio multidisciplinare con più professionisti e più specializzazioni",
    "I promemoria WhatsApp automatici sono una priorità per ridurre i no-show",
    "Hai bisogno di un gestionale operativo completo con agenda avanzata multi-stanza",
  ],

  faq: [
    {
      q: "ZenGest e Appuntoo si integrano?",
      a: "Non ancora nativamente, ma usarli insieme è semplice: Appuntoo per l'agenda e i promemoria, ZenGest per la documentazione clinica e, se vuoi, per la fatturazione con Sistema TS. Ogni tool fa la sua parte.",
    },
    {
      q: "Appuntoo ha funzionalità AI per le note cliniche?",
      a: "No. Appuntoo è un gestionale operativo — agenda, fatturazione, reminder. Non ha trascrizione automatica, generazione note cliniche AI, o analisi dei pattern terapeutici.",
    },
    {
      q: "ZenGest supporta studi con più psicologi?",
      a: "Sì, con i piani Team & Enterprise, pensati per studi con più professionisti e con fatturazione centralizzata. Scrivici a hello@zengest.it per un'offerta.",
    },
    {
      q: "Per uno psicologo in libera professione, quale scelgo?",
      a: "Se lavori da solo e il tuo problema principale è la documentazione clinica, ZenGest. Se hai bisogno prima di un'agenda e promemoria, Appuntoo. Se sei pronto a eliminare le note manuali e ricavare insight dai tuoi pazienti nel tempo, ZenGest.",
    },
  ],

  ctaText: "Prova ZenGest gratis. Setup in 5 minuti. Nessuna carta di credito.",
};

export function VsAppuntoo() {
  return <ComparisonTemplate {...data} />;
}
