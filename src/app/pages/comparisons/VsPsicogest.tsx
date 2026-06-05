import { ComparisonTemplate } from './ComparisonTemplate';

const data = {
  competitor: "PsicoGest",
  metaTitle: "ZenGest vs PsicoGest: il confronto onesto (2026)",
  metaDescription: "PsicoGest è il tool di fatturazione più usato dagli psicologi italiani. ZenGest fa qualcosa di diverso: genera le note cliniche al posto tuo in 60 secondi. Scopri le differenze reali.",
  slug: "psicogest",
  tagline: "Il confronto onesto",

  intro: [
    "PsicoGest è lo strumento di fatturazione più diffuso tra gli psicologi italiani. Funziona. Costa poco. Per molti è anche gratuito.",
    "ZenGest non è un concorrente diretto.",
    "PsicoGest risolve il problema fiscale — la fattura sanitaria, il Sistema Tessera Sanitaria, il ciclo attivo. Lo fa bene, a un prezzo che non si discute.",
    "ZenGest risolve un problema diverso: le ore che passi a scrivere note, riassunti, piani terapeutici dopo ogni seduta. Quella documentazione che finisce sempre per seconda, fatta di fretta, ricostruita a memoria alle undici di sera.",
  ],

  whatZengest: "ZenGest registra la seduta (con il consenso del paziente), la trascrive con riconoscimento automatico dei parlanti e terminologia clinica italiana, anonimizza immediatamente i dati sensibili, e genera una nota clinica nel formato che preferisci entro 60 secondi. Nel tempo, riconosce pattern tra le sedute, traccia i progressi e ricorda il contesto di ogni paziente — così all'inizio della prossima sessione sai esattamente dove eravate rimasti.",

  whatCompetitor: "PsicoGest è nato con un obiettivo preciso: rendere accessibile la fatturazione per gli psicologi. I piani partono da 25€ all'anno, il Sistema Tessera Sanitaria è incluso, la fattura elettronica anche. Per chi è iscritto all'OPL, all'OPC o all'ordine sardo, è addirittura gratuito. È uno strumento verticale e focalizzato.",

  features: [
    { label: "Note cliniche generate dall'AI", zengest: "✓", competitor: "—" },
    { label: "Registrazione e trascrizione seduta", zengest: "✓", competitor: "—" },
    { label: "Memoria contesto sedute precedenti", zengest: "✓", competitor: "—" },
    { label: "Riconoscimento terminologia DSM-5 / CBT / DBT", zengest: "✓", competitor: "—" },
    { label: "Analisi pattern clinici nel tempo", zengest: "✓", competitor: "—" },
    { label: "Anonimizzazione dati prima dell'elaborazione AI", zengest: "✓", competitor: "—" },
    { label: "Audio eliminato automaticamente dopo la trascrizione", zengest: "✓", competitor: "—" },
    { label: "Server esclusivamente in Europa (GDPR)", zengest: "✓", competitor: "✓" },
    { label: "Conforme codice deontologico CNOP", zengest: "✓", competitor: "✓" },
    { label: "Scheda paziente", zengest: "✓", competitor: "✓" },
    { label: "Sistema Tessera Sanitaria (STS)", zengest: "In arrivo", competitor: "✓" },
    { label: "Fattura elettronica SDI", zengest: "In arrivo", competitor: "✓" },
    { label: "Agenda appuntamenti", zengest: "In arrivo", competitor: "✓" },
  ],

  pricingZengest: "Da 19€/mese. Piano Pro a 39€/mese, Piano Studio a 69€/mese. Prova gratuita disponibile, nessuna carta di credito richiesta.",
  pricingCompetitor: "Da 25€/anno per il piano base (50 fatture). Fino a 240€/anno per il piano XL. Gratuito per gli iscritti OPL, OPC e Ordine degli Psicologi della Sardegna.",

  chooseZengest: [
    "Passi più di 20-30 minuti al giorno a scrivere documentazione clinica",
    "Vuoi un AI che capisca la psicologia italiana — CBT, DBT, approccio psicodinamico, terminologia DSM-5",
    "Hai bisogno di tracciare i progressi dei tuoi pazienti nel tempo senza rileggere tutto il fascicolo ogni volta",
    "Vuoi smettere di aprire il laptop tra te e il paziente durante la seduta",
  ],

  chooseCompetitorLabel: "Tieni PsicoGest (o usali insieme) se:",
  chooseCompetitor: [
    "Hai bisogno principalmente di un tool di fatturazione economico",
    "Sei iscritto OPL o OPC e lo usi già gratuitamente",
    "Non hai ancora esigenze di documentazione clinica automatizzata",
  ],

  faq: [
    {
      q: "ZenGest sostituisce PsicoGest?",
      a: "No. ZenGest non è ancora uno strumento di fatturazione completo — la fattura sanitaria e il STS sono in sviluppo. Se stai cercando un tool per sostituire PsicoGest nella fatturazione, non siamo ancora lì. Se stai cercando di eliminare le note manuali e avere un AI che documenta le tue sedute, ZenGest è costruito esattamente per quello.",
    },
    {
      q: "Le registrazioni delle sedute sono sicure?",
      a: "Sì. L'audio viene eliminato definitivamente dopo la generazione della trascrizione — non viene conservato. Prima di qualsiasi elaborazione AI, nomi, luoghi e dati identificativi vengono anonimizzati automaticamente. I server sono esclusivamente in Europa, conformi GDPR e alle normative italiane.",
    },
    {
      q: "Ho bisogno del consenso del paziente per registrare?",
      a: "Sì, e ZenGest lo richiede esplicitamente come primo passo. La registrazione parte solo dopo aver confermato che il consenso è stato ottenuto. È una scelta etica deliberata, non un dettaglio tecnico.",
    },
    {
      q: "PsicoGest ha funzionalità AI?",
      a: "No. PsicoGest è uno strumento di fatturazione e gestione dello studio. Non ha funzionalità di trascrizione, generazione note cliniche o analisi delle sedute.",
    },
  ],

  ctaText: "Prova ZenGest gratis. Nessuna carta di credito. Vedi cosa cambia nella prima settimana.",
};

export function VsPsicogest() {
  return <ComparisonTemplate {...data} />;
}
