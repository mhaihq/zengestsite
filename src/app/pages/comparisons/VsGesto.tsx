import { ComparisonTemplate } from './ComparisonTemplate';

const data = {
  competitor: "Gesto",
  metaTitle: "ZenGest vs Gesto per psicologi: cosa cambia davvero (2026)",
  metaDescription: "Gesto risolve la fatturazione a 4,99€/mese. ZenGest elimina le note cliniche manuali con l'AI. Confronto onesto tra due tool che risolvono problemi diversi.",
  slug: "gesto",
  tagline: "Cosa fa davvero ciascuno",
  intro: [
    "Gesto è un software di fatturazione per psicologi con partita IVA. Fatture illimitate, Sistema Tessera Sanitaria incluso, consenso informato digitale, a 4,99€ al mese. È un prodotto solido per quello che promette di fare.",
    "ZenGest non è un software di fatturazione.",
    "ZenGest registra le sedute, le trascrive, genera le note cliniche. Analizza i pattern nel tempo. Ricorda il contesto. Ti dice dove eri rimasto con ogni paziente senza che tu debba rileggere nulla.",
  ],
  whatZengest: "ZenGest registra la seduta con il consenso del paziente, riconosce automaticamente chi parla, trascrive con terminologia clinica italiana specializzata (DSM-5, approcci terapeutici, acronimi professionali), anonimizza i dati sensibili prima di qualsiasi elaborazione AI, ed elimina l'audio originale subito dopo. Quello che resta è una nota clinica generata in 60 secondi, nel formato che preferisci.",
  whatCompetitor: "Gesto è pensato per gli psicologi con partita IVA che vogliono smettere di gestire manualmente la fatturazione sanitaria. Fatture illimitate incluse nel piano, invio automatico al Sistema Tessera Sanitaria, consenso informato che il paziente può firmare digitalmente, auto-compilazione delle fatture ricorrenti sulla base dello storico. 4,99€ al mese con primo mese di prova.",
  features: [
    { label: "Note cliniche generate dall'AI", zengest: "✓", competitor: "—" },
    { label: "Registrazione e trascrizione seduta", zengest: "✓", competitor: "—" },
    { label: "Memoria sedute e contesto paziente", zengest: "✓", competitor: "—" },
    { label: "Piano terapeutico generato dall'AI", zengest: "✓", competitor: "—" },
    { label: "Analisi pattern nel tempo", zengest: "✓", competitor: "—" },
    { label: "Terminologia DSM-5 / CBT / DBT / psicodinamica", zengest: "✓", competitor: "—" },
    { label: "Fattura sanitaria STS inclusa", zengest: "In arrivo", competitor: "✓" },
    { label: "Fatture illimitate", zengest: "✓", competitor: "✓" },
    { label: "Consenso informato digitale", zengest: "In arrivo", competitor: "✓" },
    { label: "Scheda paziente", zengest: "✓", competitor: "✓" },
    { label: "Server in Europa, GDPR", zengest: "✓", competitor: "✓" },
    { label: "Anonimizzazione dati pre-AI", zengest: "✓", competitor: "—" },
  ],
  pricingZengest: "Da 19€/mese (Piano Base). Piano Pro 39€/mese, Piano Studio 69€/mese. Prova gratuita, nessuna carta di credito.",
  pricingCompetitor: "4,99€/mese con primo mese gratuito. Fatture illimitate incluse.",
  chooseZengest: [
    "La documentazione clinica è il collo di bottiglia del tuo lavoro",
    "Vuoi smettere di scrivere note la sera e recuperare quel tempo per i pazienti — o per te",
    "Stai cercando un AI che capisca veramente la psicologia italiana, non un chatbot generico adattato alla sanità",
    "Vuoi insight clinici che emergono nel tempo — pattern, progressi, temi ricorrenti — senza doverci pensare tu",
  ],
  chooseCompetitorLabel: "Tieni Gesto (o usali insieme) se:",
  chooseCompetitor: [
    "La tua priorità è solo la fatturazione e il STS a un prezzo basso",
    "Non hai ancora bisogno di documentazione clinica automatizzata",
    "Vuoi un setup minimalista che fa esattamente una cosa",
  ],
  faq: [
    {
      q: "ZenGest può sostituire Gesto del tutto?",
      a: "Non ancora per la parte di fatturazione. Il STS e la fattura elettronica SDI sono in sviluppo. Se la fatturazione è la tua unica esigenza, Gesto la copre meglio per ora. Se vuoi eliminare la documentazione manuale, ZenGest fa cose che Gesto non fa affatto.",
    },
    {
      q: "I 4,99€/mese di Gesto vs i 19€/mese di ZenGest: come scelgo?",
      a: "Dipende da quale problema ti costa più tempo. Un'ora di lavoro clinico vale mediamente 80-120€. Se ZenGest ti fa risparmiare 30 minuti al giorno, si ripaga in pochi giorni. Se il tuo unico problema è fare le fatture, Gesto a 4,99€ è difficile da battere.",
    },
    {
      q: "Gesto ha funzionalità AI per la documentazione clinica?",
      a: "No. Gesto è focalizzato sulla fatturazione e sulla gestione amministrativa di base. Non ha trascrizione, generazione note cliniche o analisi delle sedute.",
    },
  ],
  ctaText: "Prova ZenGest gratis. Vedi quanto tempo recuperi nella prima settimana.",
};

export function VsGesto() {
  return <ComparisonTemplate {...data} />;
}
