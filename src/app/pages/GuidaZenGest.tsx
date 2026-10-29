import { useState, useRef, useEffect, useMemo, useCallback, type CSSProperties } from "react";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { breadcrumbSchema } from "../components/SEO";
import {
  BookOpen, Search, ChevronLeft, ChevronRight, Check, CheckCircle2,
  Lightbulb, PlayCircle, Compass, UserPlus, Mic, FileText, PenLine,
  FolderOpen, LayoutTemplate, Sparkles, Settings, ImageIcon, X, ArrowRight,
  ChevronDown, ChevronUp, MessageCircle, Play, Pause, Maximize2, CornerDownLeft, Receipt, ClipboardCheck, Trophy, ExternalLink,
} from "lucide-react";
import {
  MockStage, MOCK_W, MOCK_H, MockHomeCliente, MockPickerModelli, MockRegistrazione, MockCaricamento, MockUpload, MockSessioneNota, MockModificaMagica, MockRigenera, MockSessioneEsporta, MockSessioneTrascrizione, MockClientePrep,
} from "../components/guida/AppMockups";
import {
  MockProfiloFiscale, MockSistemaTS, MockPrestazioni, MockClienteFiscale, MockNuovaFattura,
  MockNuovaFatturaImporti, MockFattureLista, MockFatturaDettaglio, MockFatturaAccettata,
} from "../components/guida/AppMockupsFatturazione";

// Brand tokens — same as GuidaConsenso
const NAVY = "#00122F";
const BLUE = "#3B6FD4";
const HERO_GRAD = "linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)";
const SERIF = "font-['Instrument_Serif']"; // large display headings ONLY
const SANS = "font-['DM_Sans']";
const HEAD = "font-['DM_Sans'] font-bold tracking-[-0.01em]";

const PROGRESS_KEY = "zg-guida-progress-v1";

// ── Screenshots ──────────────────────────────────────────────────────────────
/*
  One entry per app screen. `src` is filled in once the screenshot has been
  captured from a demo account (files live in /public/guida/). Screens that
  would show clinical content, or can't be captured without recording, use a
  React recreation (`mock`) with invented data instead. Without either, the
  frame renders a placeholder. `url` is what the fake address bar shows.
*/

interface Shot { label: string; url: string; src?: string; mock?: () => React.JSX.Element }

const SHOTS = {
  "home":                { label: "Home",                                  url: "app.zengest.it", src: "/guida/home.webp" },
  "menu-profilo":        { label: "Menu del profilo",                      url: "app.zengest.it", src: "/guida/menu-profilo.webp" },
  "impostazioni-account":{ label: "Impostazioni → Account",                url: "app.zengest.it/settings/profile", src: "/guida/impostazioni-account.webp" },
  "clienti":             { label: "Elenco clienti",                        url: "app.zengest.it/clients", src: "/guida/clienti.webp" },
  "nuovo-cliente":       { label: "Crea nuovo cliente",                    url: "app.zengest.it/clients", src: "/guida/nuovo-cliente.webp" },
  "consenso-firma":      { label: "Firma il modulo di consenso",           url: "app.zengest.it/clients", src: "/guida/consenso-firma.webp" },
  "cliente-consenso":    { label: "Scheda cliente — menu Consenso",        url: "app.zengest.it/clients/…", src: "/guida/cliente-consenso.webp" },
  "home-cliente":        { label: "Home con cliente selezionato",          url: "app.zengest.it", mock: MockHomeCliente },
  "picker-modelli":      { label: "Selettore dei modelli",                 url: "app.zengest.it", mock: MockPickerModelli },
  "registrazione":       { label: "Registrazione in corso",                url: "app.zengest.it", mock: MockRegistrazione },
  "caricamento":         { label: "Caricamento audio",                     url: "app.zengest.it", mock: MockCaricamento },
  "manuale":             { label: "Sessione senza registrare",             url: "app.zengest.it/sessions/manual", src: "/guida/manuale.webp" },
  "upload":              { label: "Caricamento file",                      url: "app.zengest.it/sessions/manual", mock: MockUpload },
  "sessione-nota":       { label: "Sessione — tab Nota",                   url: "app.zengest.it/sessions/…", mock: MockSessioneNota },
  "modifica-magica":     { label: "Modifica magica",                       url: "app.zengest.it/sessions/…", mock: MockModificaMagica },
  "rigenera":            { label: "Rigenera nota",                         url: "app.zengest.it/sessions/…", mock: MockRigenera },
  "sessione-esporta":    { label: "Menu Esporta e Azioni",                 url: "app.zengest.it/sessions/…", mock: MockSessioneEsporta },
  "sessione-trascrizione":{ label: "Sessione — tab Trascrizione",          url: "app.zengest.it/sessions/…", mock: MockSessioneTrascrizione },
  "cliente-scheda":      { label: "Scheda cliente",                        url: "app.zengest.it/clients/…", src: "/guida/cliente-scheda.webp" },
  "cliente-prep":        { label: "Scheda cliente — Prep Sessione",        url: "app.zengest.it/clients/…", mock: MockClientePrep },
  "cliente-note":        { label: "Scheda cliente — Note",                 url: "app.zengest.it/clients/…", src: "/guida/cliente-note.webp" },
  "cliente-contesto":    { label: "Scheda cliente — Contesto",             url: "app.zengest.it/clients/…", src: "/guida/cliente-contesto.webp" },
  "modelli":             { label: "Modelli Zen",                           url: "app.zengest.it/templates", src: "/guida/modelli.webp" },
  "nuovo-modello":       { label: "Nuovo modello di nota",                 url: "app.zengest.it/templates/new", src: "/guida/nuovo-modello.webp" },
  "builder":             { label: "Editor del modello",                    url: "app.zengest.it/templates/new", src: "/guida/builder.webp" },
  "assistente-start":    { label: "Assistente — scelta del cliente",       url: "app.zengest.it/assistant", src: "/guida/assistente-start.webp" },
  "assistente-chat":     { label: "Chat con l'Assistente Zen",             url: "app.zengest.it/assistant", src: "/guida/assistente-chat.webp" },
  "assistente-agenti":   { label: "Menu + e agenti",                       url: "app.zengest.it/assistant", src: "/guida/assistente-agenti.webp" },
  "assistente-documento":{ label: "Pannello documento",                    url: "app.zengest.it/assistant", src: "/guida/assistente-documento.webp" },
  "agenti":              { label: "Gestisci agenti",                       url: "app.zengest.it/agents", src: "/guida/agenti.webp" },
  "gestione-dati":       { label: "Impostazioni → Gestione dati",          url: "app.zengest.it/settings/data-management", src: "/guida/gestione-dati.webp" },
  "sicurezza":           { label: "Impostazioni → Sicurezza",              url: "app.zengest.it/settings/security", src: "/guida/sicurezza.webp" },
  "fatt-profilo":        { label: "Profilo Fiscale — Dati fiscali",        url: "app.zengest.it/settings/invoicing", mock: MockProfiloFiscale },
  "fatt-ts":             { label: "Profilo Fiscale — Sistema TS",          url: "app.zengest.it/settings/invoicing", mock: MockSistemaTS },
  "fatt-prestazioni":    { label: "Prestazioni",                           url: "app.zengest.it/settings/services", mock: MockPrestazioni },
  "fatt-cliente":        { label: "Scheda cliente — Dati fiscali",         url: "app.zengest.it/clients/…", mock: MockClienteFiscale },
  "fatt-nuova":          { label: "Nuova fattura",                         url: "app.zengest.it/invoices/new", mock: MockNuovaFattura },
  "fatt-importi":        { label: "Nuova fattura — Importi e pagamento",   url: "app.zengest.it/invoices/new", mock: MockNuovaFatturaImporti },
  "fatt-lista":          { label: "Elenco fatture",                        url: "app.zengest.it/invoices", mock: MockFattureLista },
  "fatt-dettaglio":      { label: "Dettaglio fattura",                     url: "app.zengest.it/invoices/…", mock: MockFatturaDettaglio },
  "fatt-accettata":      { label: "Fattura accettata dal Sistema TS",      url: "app.zengest.it/invoices/…", mock: MockFatturaAccettata },
} satisfies Record<string, Shot>;

type ShotKey = keyof typeof SHOTS;

// ── Types ────────────────────────────────────────────────────────────────────

interface Step {
  title: string;
  body: string;
  tip?: string;
  shot: ShotKey;
  /** Hotspot position on the screenshot, in % of width/height. */
  spot?: [number, number];
}

interface Chapter {
  id: string;
  title: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
  minutes: number;
  video?: string;
  steps: Step[];
}

// ── Chapters ─────────────────────────────────────────────────────────────────

const CHAPTERS: Chapter[] = [
  {
    id: "primi-passi",
    title: "Primi passi",
    summary: "Orientati nell'interfaccia e completa il tuo profilo.",
    icon: Compass,
    minutes: 2,
    video: "https://vimeo.com/1198870419",
    steps: [
      {
        title: "La barra di navigazione",
        body: "In alto trovi le sezioni principali: Home (per iniziare una seduta), Sessioni, Modelli, Clienti e Assistente. Da telefono la barra si sposta in basso.",
        shot: "home",
        spot: [31.6, 4.1],
      },
      {
        title: "Il menu del profilo",
        body: "Clicca sulla tua immagine in alto a destra: da qui apri il Profilo, scarichi il Modulo di consenso cliente, attivi la Modalità scura o esci.",
        shot: "menu-profilo",
        spot: [88.4, 30],
      },
      {
        title: "Completa il tuo account",
        body: "In Impostazioni → Account inserisci titolo (Dott./Dott.ssa), nome, cognome, specialità e immagine profilo. Qui puoi anche scegliere la lingua dell'applicazione. Poi clicca Salva modifiche.",
        tip: "Il titolo e il nome compaiono nei documenti che esporti, come le note in PDF.",
        shot: "impostazioni-account",
        spot: [50.3, 75.9],
      },
      {
        title: "Se ti serve aiuto",
        body: "Il pulsante Supporto in alto apre il centro assistenza. Puoi anche scriverci su WhatsApp o dalla pagina Impostazioni → Contattaci.",
        shot: "home",
        spot: [85.2, 4.1],
      },
    ],
  },
  {
    id: "cliente",
    title: "Crea un cliente e raccogli il consenso",
    summary: "Aggiungi il primo paziente e fai firmare il consenso informato direttamente in ZenGest.",
    icon: UserPlus,
    minutes: 3,
    video: "https://vimeo.com/1198870477?share=copy&fl=sv&fe=ci",
    steps: [
      {
        title: "Aggiungi un cliente",
        body: "Vai su Clienti e clicca Aggiungi cliente. In alternativa, dalla Home apri il campo Seleziona un cliente e scegli Crea nuovo cliente in fondo alla lista.",
        shot: "clienti",
        spot: [83.8, 15.4],
      },
      {
        title: "Inserisci l'essenziale",
        body: "Scegli Persona fisica o Organizzazione. Per un paziente bastano nome, cognome, lingua della seduta e data della prima seduta. Clicca Crea cliente.",
        tip: "Se preferisci, puoi usare un codice al posto del nome reale (es. Paziente_01).",
        shot: "nuovo-cliente",
        spot: [40.1, 35.3],
      },
      {
        title: "Fai firmare il consenso",
        body: "Subito dopo, ZenGest ti propone il modulo di consenso. Con Firma ora (di persona) il paziente firma sul tuo schermo. Puoi anche usare Condividi modulo per inviarlo, o Scarica modulo per stamparlo. Se vuoi farlo più tardi, clicca Salta per ora.",
        shot: "consenso-firma",
        spot: [60.8, 82.6],
      },
      {
        title: "Controlla lo stato del consenso",
        body: "Nella scheda del cliente, il menu Consenso mostra se il modulo è firmato. Da lì puoi firmarlo, condividerlo o scaricare la copia firmata.",
        tip: "Non sai come presentare ZenGest al paziente? Leggi la nostra guida al consenso, con script pronti e un simulatore di colloquio.",
        shot: "cliente-consenso",
        spot: [83.7, 21.2],
      },
    ],
  },
  {
    id: "registra",
    title: "Registra una seduta",
    summary: "Dalla Home alla nota clinica: cliente, modello, registrazione.",
    icon: Mic,
    minutes: 4,
    video: "https://vimeo.com/1198870457",
    steps: [
      {
        title: "Scegli il cliente",
        body: "Dalla Home, apri Seleziona un cliente e scegli il paziente. Si apre il pannello Assistente Zen con la Preparazione: follow-up aperti e riepilogo dell'ultima sessione.",
        shot: "home-cliente",
        spot: [27, 41.5],
      },
      {
        title: "Scegli il modello di nota",
        body: "In Seleziona un modello cerca per nome o per categoria. In cima trovi i Recenti e I tuoi modelli, poi i Modelli Zen divisi per categoria.",
        tip: "Se non sai da dove partire, scegli un modello di terapia individuale: potrai rigenerare la nota con un altro modello in seguito.",
        shot: "picker-modelli",
        spot: [27, 12.5],
      },
      {
        title: "Controlla la lingua",
        body: "Lingua della seduta è quella impostata per il cliente. Se oggi parlate un'altra lingua, clicca Modifica: la modifica vale solo per questa seduta.",
        shot: "home-cliente",
        spot: [40.3, 66.9],
      },
      {
        title: "Avvia la registrazione",
        body: "Clicca Registra sessione: la registrazione parte subito e vedi la forma d'onda dell'audio. Se hai più microfoni, sceglilo da Seleziona microfono.",
        tip: "In presenza, posiziona il dispositivo a metà strada tra te e il paziente.",
        shot: "registrazione",
        spot: [50, 62.6],
      },
      {
        title: "Seduta online in cuffia",
        body: "Se il paziente è in videochiamata e tu usi le cuffie, clicca Aggiungi audio tab, scegli la scheda di Meet, Zoom o Teams e clicca Condividi. Senza questo passaggio la voce del paziente non viene registrata.",
        tip: "Funziona su computer con Chrome o Edge. Non è disponibile su iPhone e iPad.",
        shot: "registrazione",
        spot: [50, 71],
      },
      {
        title: "Pausa o interruzione",
        body: "Usa il pulsante pausa per fermarti un momento. La X apre tre scelte: Continua, Salva e termina sessione, oppure Interrompi registrazione, che scarta l'audio.",
        tip: "Da telefono, accetta Mantieni schermo attivo per evitare che il telefono si blocchi durante la seduta.",
        shot: "registrazione",
        spot: [61.8, 83.2],
      },
      {
        title: "Termina la sessione",
        body: "Alla fine clicca Termina sessione e attendi il caricamento dell'audio senza chiudere la pagina. La registrazione deve durare almeno 2 minuti.",
        tip: "Se la connessione cade, ZenGest conserva l'audio sul dispositivo e riprova appena torni online.",
        shot: "caricamento",
        spot: [50, 65.4],
      },
      {
        title: "Salva la sessione",
        body: "Nella schermata successiva puoi aggiungere appunti o allegati, poi clicca Salva sessione. ZenGest trascrive la seduta e genera la nota con il modello scelto in pochi minuti.",
        shot: "manuale",
        spot: [49.9, 84.5],
      },
    ],
  },
  {
    id: "senza-registrare",
    title: "Sessione senza registrare",
    summary: "Detta una nota vocale, carica un audio dal telefono o allega documenti.",
    icon: FileText,
    minutes: 3,
    video: "https://vimeo.com/1198870445",
    steps: [
      {
        title: "Crea la sessione",
        body: "Dalla Home scegli cliente e modello, poi clicca + Crea sessione senza registrare.",
        shot: "home-cliente",
        spot: [27, 81.6],
      },
      {
        title: "Imposta data e ora",
        body: "Clicca Seleziona data sessione, scegli il giorno sul calendario, inserisci l'ora e clicca Applica. È utile per inserire sedute passate.",
        shot: "manuale",
        spot: [54.5, 22.6],
      },
      {
        title: "Scrivi o detta gli appunti",
        body: "Scrivi in Note cliniche, oppure usa Registra nota vocale e racconta la seduta a voce: ZenGest trascrive e inserisce il testo negli appunti.",
        tip: "La nota vocale è ideale subito dopo la seduta, finché i dettagli sono freschi.",
        shot: "manuale",
        spot: [43.2, 64],
      },
      {
        title: "Carica l'audio dal telefono",
        body: "Con Carica audio sessione importi una registrazione già fatta (mp3, m4a, wav e altri formati). Viene elaborata come una registrazione in diretta.",
        tip: "Dopo il caricamento, cancella il file dal telefono e dal backup cloud.",
        shot: "manuale",
        spot: [43.6, 69.8],
      },
      {
        title: "Allega documenti",
        body: "Con Allega file o documento aggiungi PDF, Word o foto dei tuoi appunti scritti a mano. Puoi caricare più file insieme.",
        shot: "manuale",
        spot: [44, 75.5],
      },
      {
        title: "Salva",
        body: "Clicca Salva sessione. Una barra mostra l'avanzamento di ogni file. Se un caricamento non riesce, clicca Riprova. Non chiudere la pagina finché non hai finito.",
        shot: "upload",
        spot: [62.2, 44.5],
      },
    ],
  },
  {
    id: "nota",
    title: "Rivedi e perfeziona la nota",
    summary: "Correggi, riscrivi con l'AI, cambia modello ed esporta.",
    icon: PenLine,
    minutes: 4,
    steps: [
      {
        title: "Apri la sessione",
        body: "Apri la sessione da Sessioni o dalla scheda del cliente. In alto trovi tre schede: Nota, Trascrizione e File.",
        shot: "sessione-nota",
        spot: [27.4, 22.7],
      },
      {
        title: "Modifica a mano",
        body: "Ogni sezione della nota ha il pulsante Modifica: correggi il testo e clicca Salva.",
        tip: "Rileggi sempre la nota prima di archiviarla. L'AI lavora solo sul testo trascritto, quindi tono, silenzi e non verbale vanno aggiunti da te.",
        shot: "sessione-nota",
        spot: [50.8, 65.4],
      },
      {
        title: "Modifica magica",
        body: "Con Modifica magica dai un'istruzione a parole (per esempio «rendi più conciso» o «trasforma in elenco puntato»), scritta o dettata. Puoi applicarla a una sola sezione o a tutte. Se il risultato non ti convince, clicca Annulla nel messaggio di conferma.",
        tip: "Fissa le istruzioni che usi spesso: le ritrovi tra gli Spunti fissati.",
        shot: "modifica-magica",
        spot: [83.9, 55.5],
      },
      {
        title: "Copia",
        body: "Copia sezione copia un singolo blocco, Copia nota copia tutta la nota: incollala dove ti serve.",
        shot: "sessione-nota",
        spot: [93.6, 30.5],
      },
      {
        title: "Prova un altro modello",
        body: "Clicca il nome del modello in cima alla nota e scegli Rigenera nota. Seleziona un altro modello e clicca Rigenera. La nuova nota si aggiunge alle altre, e puoi passare dall'una all'altra dallo stesso menu.",
        shot: "rigenera",
        spot: [50, 52.2],
      },
      {
        title: "Esporta e condividi",
        body: "Esporta → Esporta nota scarica la nota in PDF, Esporta trascrizione la trascrizione. Dal menu Azioni puoi Condividi via email o WhatsApp, oppure Elimina la sessione.",
        tip: "L'eliminazione è definitiva: esporta prima ciò che vuoi conservare.",
        shot: "sessione-esporta",
        spot: [85, 19.9],
      },
      {
        title: "Correggi data e ora",
        body: "Se la sessione ha data o ora sbagliate, clicca la matita accanto alla data, scegli il giorno e l'ora corretti e clicca Applica.",
        shot: "sessione-nota",
        spot: [37.4, 16.2],
      },
      {
        title: "Consulta la trascrizione",
        body: "Nella scheda Trascrizione trovi il testo della seduta diviso per oratore: utile per verificare un passaggio della nota.",
        shot: "sessione-trascrizione",
        spot: [35.9, 22.7],
      },
    ],
  },
  {
    id: "cartella",
    title: "La cartella del paziente",
    summary: "Tutto su un paziente in un unico posto, dalla preparazione al contesto clinico.",
    icon: FolderOpen,
    minutes: 4,
    steps: [
      {
        title: "Trova il paziente",
        body: "In Clienti cerca per nome e ordina per data o in ordine alfabetico. Clicca un nome per aprire la sua scheda.",
        shot: "clienti",
        spot: [62.1, 15.4],
      },
      {
        title: "La scheda del cliente",
        body: "In alto trovi Inizia sessione, Assistente e il menu Consenso. Sotto, le schede con tutte le informazioni del paziente.",
        shot: "cliente-scheda",
        spot: [72.6, 21.2],
      },
      {
        title: "Prep Sessione",
        body: "Prima di ricevere il paziente, apri Prep Sessione. Trovi i compiti del clinico, i compiti per il paziente, la prossima sessione e il riepilogo dell'ultima seduta.",
        tip: "Bastano due minuti prima della seduta per entrare già orientato, senza rileggere le note precedenti.",
        shot: "cliente-prep",
        spot: [14.7, 44.4],
      },
      {
        title: "Sessioni e Riepilogo",
        body: "Sessioni elenca tutte le sedute in ordine cronologico. Riepilogo offre una panoramica del percorso generata dalle sessioni registrate.",
        shot: "cliente-scheda",
        spot: [45, 34.9],
      },
      {
        title: "Note di andamento",
        body: "Nella scheda Note clicca Nuova nota per annotare l'andamento del percorso, scrivendo o dettando. Se esci per sbaglio, ZenGest conserva la bozza.",
        shot: "cliente-note",
        spot: [84.9, 43.1],
      },
      {
        title: "Documenti",
        body: "In Documenti carichi referti, test e relazioni (PDF, Word, immagini) da tenere nella cartella del paziente.",
        shot: "cliente-scheda",
        spot: [73.4, 34.9],
      },
      {
        title: "Contesto clinico",
        body: "In Contesto incolli la storia del paziente (anamnesi, formulazione del caso, terapie precedenti) o carichi un PDF, poi clicca Crea Contesto. Lo stato diventa Contesto attivo e l'AI lo usa in Prep Sessione e nell'Assistente.",
        tip: "Fondamentale per i pazienti che segui da prima di usare ZenGest.",
        shot: "cliente-contesto",
        spot: [49.9, 75],
      },
      {
        title: "Anagrafica",
        body: "Nella scheda Anagrafica e fatturazione aggiorni i dati personali del paziente. Clicca Salva modifiche per confermare.",
        shot: "cliente-scheda",
        spot: [82.8, 46.3],
      },
    ],
  },
  {
    id: "modelli",
    title: "Modelli di nota",
    summary: "Scegli tra i Modelli Zen o crea la tua struttura di nota.",
    icon: LayoutTemplate,
    minutes: 3,
    steps: [
      {
        title: "Sfoglia i Modelli Zen",
        body: "In Modelli, la scheda Modelli Zen raccoglie i modelli pronti. Filtrali per categoria o cerca per nome (es. «soap», «intake»).",
        shot: "modelli",
        spot: [17.2, 47.6],
      },
      {
        title: "Aggiungili alla tua libreria",
        body: "Clicca Aggiungi alla libreria: il modello compare in La mia libreria e nel selettore della Home.",
        shot: "modelli",
        spot: [44, 85.5],
      },
      {
        title: "Personalizza un modello",
        body: "Con Personalizza parti da un Modello Zen, modifichi le sezioni e salvi con Salva come Nuovo.",
        shot: "modelli",
        spot: [57.5, 85.5],
      },
      {
        title: "Crea un modello da una tua nota",
        body: "Clicca Nuovo modello di nota e scegli Crea da Nota. Incolla una tua nota (Scrivi), descrivi la struttura a voce (Voce) o carica un file (Carica), poi clicca Genera modello nota. Per partire da zero, scegli invece Costruisci da Zero.",
        shot: "nuovo-modello",
        spot: [34.3, 69.4],
      },
      {
        title: "Rifinisci le sezioni",
        body: "Per ogni sezione imposti titolo, stile (Punti Elenco o Paragrafo), lunghezza (Dettagliato, Standard o Conciso) e cosa deve contenere. Aggiungi sezioni, riordinale trascinandole e clicca Salva.",
        tip: "Più è precisa la descrizione del Contenuto Sezione, più la nota generata sarà vicina al tuo stile.",
        shot: "builder",
        spot: [16.7, 69.6],
      },
    ],
  },
  {
    id: "assistente",
    title: "Assistente Zen e agenti",
    summary: "Il copilota AI per preparare, ragionare sul caso e scrivere documenti.",
    icon: Sparkles,
    minutes: 4,
    video: "https://vimeo.com/1198870440",
    steps: [
      {
        title: "Apri l'Assistente",
        body: "Clicca Assistente nella barra in alto, scegli un cliente e clicca Inizia chat. Per domande generali senza dati clinici, scegli Continua senza selezionare un paziente.",
        tip: "Puoi aprirlo anche dalla Home o dalla scheda del cliente.",
        shot: "assistente-start",
        spot: [49.9, 65.8],
      },
      {
        title: "Fai la tua domanda",
        body: "Usa gli spunti suggeriti (es. «Riassumi le note dell'ultima sessione») o scrivi liberamente. Puoi anche dettare con il microfono. Le risposte si basano su sessioni, note, contesto e documenti del paziente.",
        tip: "La prima volta con un nuovo cliente ti verrà chiesto di attivare l'Assistente.",
        shot: "assistente-chat",
        spot: [49.9, 42.8],
      },
      {
        title: "Allega file e scegli un agente",
        body: "Con il pulsante + alleghi un file o una foto alla domanda. Da Agenti scegli un approccio (per esempio CBT, psicodinamico, sistemico-relazionale) che orienta le risposte.",
        shot: "assistente-agenti",
        spot: [29.6, 85.1],
      },
      {
        title: "Lavora sui documenti",
        body: "Quando l'Assistente scrive un documento (una relazione o un riepilogo per il paziente), clicca Apri documento. Puoi modificarlo, consultare la cronologia delle versioni ed esportarlo in PDF o Word.",
        tip: "Rivedi sempre il documento prima di inviarlo.",
        shot: "assistente-documento",
        spot: [23.5, 69.4],
      },
      {
        title: "Crea i tuoi agenti",
        body: "Da + → Agenti → Gestisci agenti crei un agente tuo: nome, descrizione, istruzioni, spunti di conversazione e file di conoscenza (fino a 10 MB ciascuno).",
        shot: "agenti",
        spot: [49.9, 48.5],
      },
    ],
  },
  {
    id: "fatturazione",
    title: "Fatturazione",
    summary: "Configura i dati fiscali, crea le fatture dei pazienti e inviale al Sistema TS.",
    icon: Receipt,
    minutes: 7,
    steps: [
      {
        title: "Dove trovi la fatturazione",
        body: "La fatturazione si attiva sul tuo account su richiesta: scrivici dal Supporto. Quando è attiva trovi Fatturazione nella barra in alto e, nelle Impostazioni, una sezione Fatturazione con Profilo Fiscale, Credits, Prestazioni e Fatture pazienti.",
        tip: "Usa la fatturazione da computer: da telefono non è nella barra in basso.",
        shot: "fatt-profilo",
        spot: [9.2, 57],
      },
      {
        title: "Compila il Profilo Fiscale",
        body: "In Profilo Fiscale, scheda Dati fiscali, inserisci nome e cognome, partita IVA, codice fiscale, indirizzo e PEC. Scegli il regime (forfettario o ordinario), chi paga la marca da bollo e se applicare l'ENPAP di default. Più in basso, in Pagamenti, aggiungi l'IBAN per i bonifici. Poi clicca Salva.",
        tip: "Finché il profilo non è completo non puoi creare fatture: ZenGest ti riporta a questa pagina.",
        shot: "fatt-profilo",
        spot: [57.1, 46],
      },
      {
        title: "Collega il Sistema TS",
        body: "Nella scheda Sistema TS scegli Libero professionista e inserisci username, password e PinCode del portale Sistema Tessera Sanitaria, più il tuo codice fiscale (campo cf_proprietario). Con Invio automatico a TS attivo, le fatture pagate vengono trasmesse da sole; altrimenti le invii tu.",
        tip: "Non hai ancora le credenziali? Le richiedi su sistemats1.sanita.finanze.it.",
        shot: "fatt-ts",
        spot: [78.7, 73.6],
      },
      {
        title: "Crea il listino delle prestazioni",
        body: "In Prestazioni aggiungi le tue prestazioni con nome, prezzo, durata e categoria. Lascia attivo Prestazione sanitaria per le sedute cliniche: sono esenti IVA e vanno al Sistema TS. Contributo ENPAP applica il 2%. La prestazione Predefinita viene proposta in ogni nuova fattura.",
        shot: "fatt-prestazioni",
        spot: [25.7, 28.9],
      },
      {
        title: "Completa i dati fiscali del paziente",
        body: "Nella scheda del cliente, Anagrafica e fatturazione, scegli Persona fisica o Organizzazione e inserisci codice fiscale, tariffa della seduta e metodo di pagamento predefinito. Se il paziente si oppone all'invio delle spese al Sistema TS, spunta la casella apposita.",
        tip: "Se mancano codice fiscale, tariffa o metodo di pagamento, accanto al nome del paziente compare l'avviso Dati di fatturazione incompleti.",
        shot: "fatt-cliente",
        spot: [56.7, 56.3],
      },
      {
        title: "Crea una nuova fattura",
        body: "Clicca Fatturazione nella barra in alto e poi Nuova Fattura, oppure apri la scheda Fatture del paziente. Scegli Paziente o Azienda / Ente, il tipo di documento (Fattura o Proforma), la data e il paziente.",
        shot: "fatt-nuova",
        spot: [50, 54.1],
      },
      {
        title: "Il canale di invio è automatico",
        body: "ZenGest sceglie da solo dove trasmettere la fattura: al Sistema TS per i pazienti, allo SdI (fattura elettronica) per aziende ed enti. Per un'azienda servono ragione sociale, partita IVA e codice SDI oppure PEC.",
        shot: "fatt-nuova",
        spot: [45.7, 66],
      },
      {
        title: "Prestazione e descrizione",
        body: "Se hai più prestazioni, scegli quella giusta dal listino, poi controlla la descrizione: è il testo che il paziente legge in fattura. L'importo viene proposto dalla tariffa del paziente o dal prezzo della prestazione.",
        shot: "fatt-nuova",
        spot: [50, 75.9],
      },
      {
        title: "Fattura dalle sedute",
        body: "Se il paziente ha sedute non ancora fatturate compare Da sedute (N): seleziona le sedute da includere e clicca Emetti fattura. Con Fattura manuale inserisci tu l'importo.",
        shot: "fatt-importi",
        spot: [34.1, 13],
      },
      {
        title: "Importo, ENPAP e marca da bollo",
        body: "In Importo scrivi il totale che paga il paziente, ENPAP incluso: ZenGest scorpora da solo il contributo del 2%. Nel Riepilogo calcolo vedi compenso, ENPAP, marca da bollo (€2 sopra €77,47, se a carico del cliente) e totale.",
        tip: "In regime forfettario la fattura riporta in automatico il testo di legge richiesto.",
        shot: "fatt-importi",
        spot: [64.8, 33.8],
      },
      {
        title: "Pagamento ed emissione",
        body: "Se il paziente ha già pagato, spunta Il cliente ha già pagato e indica metodo e data. Poi clicca Crea fattura, oppure Salva bozza per completarla più tardi.",
        tip: "Per creare o segnare come pagata una fattura da inviare al Sistema TS o allo SdI servono crediti: li trovi in Impostazioni → Credits.",
        shot: "fatt-importi",
        spot: [76.5, 91.9],
      },
      {
        title: "L'elenco delle fatture",
        body: "In Fatturazione trovi tutte le fatture, con totali, incassato e la soglia annuale del forfettario (€85.000). Cerca per paziente o numero, usa i Filtri e controlla in Trasmissione lo stato di ogni invio. Selezionando più fatture puoi confermare le bozze, segnarle pagate o inviarle al Sistema TS insieme.",
        shot: "fatt-lista",
        spot: [76.8, 59.1],
      },
      {
        title: "Esporta per il commercialista",
        body: "Esporta CSV scarica le fatture dell'anno in un file per il commercialista. Esporta XML genera il file delle spese sanitarie per il Sistema TS.",
        shot: "fatt-lista",
        spot: [58.8, 18.4],
      },
      {
        title: "Invia al Sistema TS e crea il PDF",
        body: "Apri una fattura pagata e clicca Invia a TS per trasmetterla al Sistema Tessera Sanitaria. Lo stato compare in Storico TS: se c'è un errore, correggi i dati e clicca Riprova. Con Genera PDF crei la fattura da scaricare o stampare.",
        shot: "fatt-dettaglio",
        spot: [23.8, 23.1],
      },
      {
        title: "Nota di credito e annullamento",
        body: "Quando il Sistema TS accetta la fattura, in Storico TS trovi data d'invio e protocollo. Per stornarla usa Crea nota di credito. Una fattura non ancora accettata si annulla invece con Annulla fattura.",
        shot: "fatt-accettata",
        spot: [47.9, 23.1],
      },
    ],
  },
  {
    id: "impostazioni",
    title: "Impostazioni, privacy e abbonamento",
    summary: "Gestisci piano, conservazione dei dati e sicurezza dell'account.",
    icon: Settings,
    minutes: 2,
    steps: [
      {
        title: "Abbonamento",
        body: "In Impostazioni → Abbonamento vedi il piano attuale, le sessioni utilizzate e il metodo di pagamento. Da qui puoi cambiare piano.",
        shot: "impostazioni-account",
        spot: [6.7, 31.3],
      },
      {
        title: "Eliminazione automatica",
        body: "In Gestione dati puoi far eliminare automaticamente le sessioni dopo un numero di giorni a scelta (da 1 a 90).",
        tip: "Esporta prima le note che vuoi conservare fuori da ZenGest.",
        shot: "gestione-dati",
        spot: [77.3, 27.6],
      },
      {
        title: "Sicurezza e GDPR",
        body: "In Sicurezza puoi richiedere l'esportazione dei tuoi dati, verificare dove sono conservati (nell'Unione Europea, a Francoforte) ed eliminare l'account.",
        shot: "sicurezza",
        spot: [70.4, 33.7],
      },
      {
        title: "Modulo di consenso",
        body: "In Modulo di consenso cliente inserisci il tuo nome e quello del paziente e scarica il PDF già compilato.",
        shot: "impostazioni-account",
        spot: [9.8, 48],
      },
    ],
  },
];

const ALL_STEP_COUNT = CHAPTERS.reduce((n, c) => n + c.steps.length, 0);

// Chapters grouped into modules, like the sections of a course
const MODULES = [
  { title: "Per iniziare", chapters: ["primi-passi", "cliente", "registra"] },
  { title: "Lavoro clinico", chapters: ["senza-registrare", "nota", "cartella", "modelli", "assistente"] },
  { title: "Amministrazione", chapters: ["fatturazione", "impostazioni"] },
];

function moduleOf(chapterId: string) {
  const i = MODULES.findIndex((m) => m.chapters.includes(chapterId));
  return { index: i, ...MODULES[i] };
}

// End of each chapter: a quick check (with the step to revisit when wrong)
// and the place in the app where to try it for real
interface Question { q: string; options: string[]; answer: number; why: string; step: number }
interface ChapterEnd { practice: { label: string; url: string }; quiz: Question[] }

const CHAPTER_END: Record<string, ChapterEnd> = {
  "primi-passi": {
    practice: { label: "Completa il tuo profilo", url: "https://app.zengest.it/settings/profile" },
    quiz: [
      { q: "Dove scarichi il modulo di consenso da dare ai pazienti?", options: ["Dal menu del profilo, in alto a destra", "Dalla pagina Sessioni", "Dall'Assistente Zen"], answer: 0, why: "Clicca la tua immagine in alto a destra: nel menu trovi Modulo di consenso cliente.", step: 1 },
      { q: "Dove imposti titolo e nome che compaiono nei PDF?", options: ["Nella scheda del cliente", "In Impostazioni → Account", "In Modelli"], answer: 1, why: "In Impostazioni → Account scegli titolo, nome, cognome e specialità.", step: 2 },
    ],
  },
  cliente: {
    practice: { label: "Aggiungi il tuo primo cliente", url: "https://app.zengest.it/clients" },
    quiz: [
      { q: "Cosa serve, come minimo, per creare un paziente?", options: ["Codice fiscale e indirizzo", "Email e telefono", "Nome, cognome, lingua e data della prima seduta"], answer: 2, why: "Bastano nome, cognome, lingua della seduta e data della prima seduta: il resto puoi completarlo dopo.", step: 1 },
      { q: "Il paziente è con te in studio. Come raccogli il consenso?", options: ["Con Firma ora (di persona), sul tuo schermo", "Devi per forza stampare il modulo", "Non serve un consenso per registrare"], answer: 0, why: "Firma ora (di persona) fa firmare il paziente direttamente sul tuo schermo.", step: 2 },
    ],
  },
  registra: {
    practice: { label: "Registra una seduta di prova", url: "https://app.zengest.it/" },
    quiz: [
      { q: "Seduta online con le cuffie: cosa fai per registrare anche il paziente?", options: ["Alzo il volume del computer", "Clicco Aggiungi audio tab e condivido la scheda della videochiamata", "Niente, il microfono lo sente comunque"], answer: 1, why: "Con le cuffie la voce del paziente non arriva al microfono: va aggiunto l'audio della scheda.", step: 4 },
      { q: "Quanto deve durare almeno una registrazione per generare la nota?", options: ["2 minuti", "10 minuti", "Non c'è un minimo"], answer: 0, why: "Le registrazioni sotto i 2 minuti non vengono elaborate.", step: 6 },
    ],
  },
  "senza-registrare": {
    practice: { label: "Crea una sessione senza registrare", url: "https://app.zengest.it/" },
    quiz: [
      { q: "Hai registrato la seduta con il telefono. Come la porti in ZenGest?", options: ["La invio via email al supporto", "Non è possibile", "Crea sessione senza registrare → Carica audio sessione"], answer: 2, why: "Carica audio sessione importa il file e lo elabora come una registrazione in diretta.", step: 3 },
      { q: "Puoi inserire una seduta di una settimana fa?", options: ["Sì, scegliendo data e ora con Seleziona data sessione", "No, solo sedute di oggi"], answer: 0, why: "Con Seleziona data sessione scegli giorno e ora: è utile per le sedute passate.", step: 1 },
    ],
  },
  nota: {
    practice: { label: "Apri le tue sessioni", url: "https://app.zengest.it/sessions" },
    quiz: [
      { q: "Vuoi trasformare una sezione in elenco puntato senza riscriverla. Cosa usi?", options: ["Rigenera nota", "Modifica magica", "Copia sezione"], answer: 1, why: "Con Modifica magica dai un'istruzione a parole e ZenGest riscrive la sezione.", step: 2 },
      { q: "Come provi un altro modello sulla stessa seduta?", options: ["Nome del modello in cima alla nota → Rigenera nota", "Devo registrare di nuovo", "Dalla scheda Trascrizione"], answer: 0, why: "Rigenera nota crea una nuova nota con il modello scelto, senza perdere quelle precedenti.", step: 4 },
    ],
  },
  cartella: {
    practice: { label: "Apri la cartella di un paziente", url: "https://app.zengest.it/clients" },
    quiz: [
      { q: "Prima di ricevere il paziente, dove trovi follow-up e riepilogo dell'ultima seduta?", options: ["In Documenti", "In Anagrafica", "In Prep Sessione"], answer: 2, why: "Prep Sessione raccoglie compiti, prossima seduta e riepilogo dell'ultima.", step: 2 },
      { q: "Dove inserisci anamnesi e storia del paziente perché l'AI ne tenga conto?", options: ["In Contesto, con Crea Contesto", "Nelle Note di andamento", "Nella descrizione della seduta"], answer: 0, why: "Il Contesto viene usato da Prep Sessione e dall'Assistente.", step: 6 },
    ],
  },
  modelli: {
    practice: { label: "Sfoglia i Modelli Zen", url: "https://app.zengest.it/templates" },
    quiz: [
      { q: "Hai una tua nota che ti piace. Come ne fai un modello?", options: ["Costruisci da Zero", "Nuovo modello di nota → Crea da Nota", "Rigenera nota"], answer: 1, why: "Crea da Nota analizza la tua nota e ne ricava sezioni e struttura.", step: 3 },
      { q: "Per ogni sezione di un modello puoi scegliere…", options: ["Stile e lunghezza", "Il paziente a cui si applica", "La lingua dell'app"], answer: 0, why: "Ogni sezione ha stile (punti elenco o paragrafo) e lunghezza (dettagliato, standard, conciso).", step: 4 },
    ],
  },
  assistente: {
    practice: { label: "Fai una domanda all'Assistente", url: "https://app.zengest.it/assistant" },
    quiz: [
      { q: "Le conversazioni con l'Assistente vengono salvate?", options: ["Sì, nella scheda del paziente", "Sì, per 30 giorni", "No: copia o esporta quello che ti serve prima di uscire"], answer: 2, why: "Le chat non vengono salvate: apri i contenuti come documento ed esportali in PDF o Word.", step: 3 },
      { q: "Come orienti le risposte su un approccio, per esempio CBT?", options: ["Con + → Agenti", "Scrivendolo nel profilo", "Cambiando modello di nota"], answer: 0, why: "Dal pulsante + scegli un agente: orienta le risposte su quell'approccio.", step: 2 },
    ],
  },
  fatturazione: {
    practice: { label: "Configura il Profilo Fiscale", url: "https://app.zengest.it/settings/invoicing" },
    quiz: [
      { q: "Il paziente paga €80, ENPAP incluso, e la marca da bollo è a carico del cliente. Qual è il totale?", options: ["€80,00", "€82,00", "€81,60"], answer: 1, why: "€78,43 di compenso + €1,57 di ENPAP superano €77,47, quindi si aggiungono €2 di bollo: €82,00.", step: 9 },
      { q: "Dove viene trasmessa la fattura di un paziente persona fisica?", options: ["Al Sistema TS", "Allo SdI", "Non viene trasmessa"], answer: 0, why: "Per i pazienti il canale è il Sistema TS; lo SdI è per aziende ed enti.", step: 6 },
    ],
  },
  impostazioni: {
    practice: { label: "Apri le impostazioni", url: "https://app.zengest.it/settings/data-management" },
    quiz: [
      { q: "Vuoi che le sessioni si cancellino da sole dopo 30 giorni. Dove lo imposti?", options: ["In Sicurezza", "In Abbonamento", "In Gestione dati"], answer: 2, why: "In Gestione dati attivi l'eliminazione automatica e scegli dopo quanti giorni (da 1 a 90).", step: 1 },
      { q: "Dove sono conservati i dati di ZenGest?", options: ["Nell'Unione Europea, a Francoforte", "Negli Stati Uniti", "Sul tuo computer"], answer: 0, why: "I dati sono in data center nell'Unione Europea (Francoforte), cifrati a riposo e in transito.", step: 2 },
    ],
  },
};

// What people look for most, shown as shortcuts under the search
const POPULAR = [
  { label: "Registrare in videochiamata", chapter: "registra", step: 4 },
  { label: "Far firmare il consenso", chapter: "cliente", step: 2 },
  { label: "Esportare la nota in PDF", chapter: "nota", step: 5 },
  { label: "Caricare l'audio dal telefono", chapter: "senza-registrare", step: 3 },
  { label: "Cambiare modello di nota", chapter: "nota", step: 4 },
  { label: "Prepararsi alla seduta", chapter: "cartella", step: 2 },
  { label: "Creare una fattura", chapter: "fatturazione", step: 5 },
];

const FAQS = [
  { q: "Quanto deve durare una registrazione?", a: "Almeno 2 minuti. Le registrazioni più brevi, o senza audio udibile, non vengono elaborate." },
  { q: "Perché non sento la voce del paziente nelle sedute online?", a: "Se usi le cuffie, la voce del paziente non arriva al microfono. Durante la registrazione clicca Aggiungi audio tab e condividi la scheda della videochiamata (Chrome o Edge su computer)." },
  { q: "Cosa succede se perdo la connessione mentre registro?", a: "ZenGest salva l'audio sul dispositivo e lo carica appena torni online. Non chiudere la pagina finché il caricamento non è completato." },
  { q: "Le conversazioni con l'Assistente vengono salvate?", a: "No. Copia le informazioni importanti, o aprile come documento ed esportale, prima di uscire dalla pagina." },
  { q: "Posso usare ZenGest dal telefono?", a: "Sì. Da telefono trovi Home, Modelli, Clienti e Assistente nella barra in basso, e puoi registrare le sedute in presenza. L'audio della scheda per le sedute online è disponibile solo da computer." },
  { q: "L'AI può sbagliare?", a: "Sì. ZenGest genera bozze e suggerimenti, ma il giudizio clinico resta tuo: rileggi sempre note e documenti prima di archiviarli o condividerli." },
];

const AUTOPLAY_MS = 6500;

// ── Progress (per-viewer, localStorage) ──────────────────────────────────────

type Progress = Record<string, number[]>; // steps seen, per chapter
type QuizDone = Record<string, boolean>;  // chapter check passed

const QUIZ_KEY = "zg-guida-quiz-v1";
const LAST_KEY = "zg-guida-last-v1";

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

type Status = "todo" | "doing" | "done";

function chapterStatus(c: Chapter, progress: Progress, quiz: QuizDone): Status {
  const seen = progress[c.id]?.length ?? 0;
  if (seen >= c.steps.length && quiz[c.id]) return "done";
  return seen > 0 || quiz[c.id] ? "doing" : "todo";
}

const STATUS_LABEL: Record<Status, string> = { todo: "Da iniziare", doing: "In corso", done: "Completato" };

// ── Position in the guide (chapter + step), mirrored in the URL hash ─────────
// s === steps.length is the chapter's closing check

interface Pos { c: number; s: number }

function isCheck({ c, s }: Pos) {
  return s === CHAPTERS[c].steps.length;
}

function posFromHash(hash: string): Pos | null {
  const m = hash.match(/^#([\w-]+?)(?:-(\d+))?$/);
  if (!m) return null;
  const c = CHAPTERS.findIndex((ch) => ch.id === m[1]);
  if (c < 0) return null;
  const s = Math.min(Math.max(Number(m[2] ?? 1) - 1, 0), CHAPTERS[c].steps.length);
  return { c, s };
}

function posOf(chapterId: string, step: number): Pos {
  return { c: Math.max(0, CHAPTERS.findIndex((ch) => ch.id === chapterId)), s: step };
}

function nextPos({ c, s }: Pos): Pos | null {
  if (s < CHAPTERS[c].steps.length) return { c, s: s + 1 };
  return c < CHAPTERS.length - 1 ? { c: c + 1, s: 0 } : null;
}

function prevPos({ c, s }: Pos): Pos | null {
  if (s > 0) return { c, s: s - 1 };
  return c > 0 ? { c: c - 1, s: CHAPTERS[c - 1].steps.length } : null;
}

function posLabel(p: Pos) {
  const c = CHAPTERS[p.c];
  return isCheck(p) ? `${c.title} · verifica` : `${c.title} · passo ${p.s + 1}`;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

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

function scrollToPlayer() {
  document.getElementById("guida-player")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new ResizeObserver(() => setWidth(el.clientWidth));
    obs.observe(el);
    setWidth(el.clientWidth);
    return () => obs.disconnect();
  }, []);
  return [ref, width] as const;
}

// Chapter status as a small progress ring (check mark once completed)
function StatusRing({ value, done, size = 22 }: { value: number; done: boolean; size?: number }) {
  if (done) return <CheckCircle2 className="text-emerald-600 shrink-0" style={{ width: size, height: size }} aria-label="Completato" />;
  const r = size / 2 - 2.5;
  const len = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
      {value > 0 && (
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={`${len * Math.min(value, 1)} ${len}`} />
      )}
    </svg>
  );
}

// ── Screen frame ─────────────────────────────────────────────────────────────

function ScreenFrame({ shotKey, steps, activeIndex, onPick, onZoom }: {
  shotKey: ShotKey;
  steps: Step[];
  activeIndex: number;
  onPick: (i: number) => void;
  onZoom: () => void;
}) {
  const shot: Shot = SHOTS[shotKey];
  const [ref, width] = useWidth<HTMLDivElement>();
  // Every step that lives on this screenshot gets a pin
  const pins = steps
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.shot === shotKey && s.spot);
  const active = steps[activeIndex];
  const spot = active.shot === shotKey ? active.spot : undefined;
  const radius = Math.max(44, width * 0.075);
  const labelLeft = spot ? spot[0] > 58 : false;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-24px_rgba(0,18,47,0.3)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 bg-slate-50">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        <div className={`ml-3 flex-1 min-w-0 truncate rounded-md bg-white border border-slate-200 px-3 py-0.5 text-xs text-slate-500 ${SANS}`}>
          {shot.url}
        </div>
        <button onClick={onZoom} className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#00122F] transition-colors" aria-label="Ingrandisci la schermata">
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div ref={ref} className="relative aspect-[1392/787] bg-[#F1F5F9]">
        {shot.src || shot.mock ? (
          <>
            <div key={shotKey} className="absolute inset-0" style={{ animation: "guidaFade .35s ease-out" }}>
              <button onClick={onZoom} className="absolute inset-0 w-full h-full cursor-zoom-in" aria-label={`Ingrandisci: ${shot.label}`}>
                {shot.mock
                  ? <MockStage><shot.mock /></MockStage>
                  : <img src={shot.src} alt={shot.label} className="w-full h-full object-cover object-top" loading="lazy" />}
              </button>
            </div>
            {/* Spotlight: dims everything except the area the active step talks about */}
            <div className="guida-spot absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                "--sx": `${spot?.[0] ?? 50}%`, "--sy": `${spot?.[1] ?? 50}%`,
                opacity: spot ? 1 : 0,
                background: `radial-gradient(circle ${radius}px at var(--sx) var(--sy), transparent 55%, rgba(0,18,47,0.26) 100%)`,
              } as CSSProperties} />
            {pins.map(({ s, i }) => {
              const on = i === activeIndex;
              return (
                <button key={i} onClick={() => onPick(i)} aria-label={`Passo ${i + 1}: ${s.title}`} title={s.title}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold ${SANS} transition-all duration-300 ${on ? "w-8 h-8 text-xs bg-[#3B6FD4] text-white ring-4 ring-[#3B6FD4]/30 z-10" : "w-6 h-6 text-[11px] bg-white/95 text-[#00122F] border-2 border-[#3B6FD4] hover:scale-125"}`}
                  style={{ left: `${s.spot![0]}%`, top: `${s.spot![1]}%`, animation: on ? "guidaPulse 1.8s ease-out infinite" : undefined }}>
                  {i + 1}
                </button>
              );
            })}
            {spot && width > 520 && (
              <div className="absolute pointer-events-none z-10 transition-all duration-500"
                style={{ left: `${spot[0]}%`, top: `${spot[1]}%`, transform: labelLeft ? "translate(calc(-100% - 26px), -50%)" : "translate(26px, -50%)" }}>
                <span key={activeIndex} className={`block whitespace-nowrap rounded-lg bg-[#00122F] text-white text-xs font-semibold px-2.5 py-1.5 shadow-lg ${SANS}`}
                  style={{ animation: "guidaFade .3s ease-out" }}>
                  {active.title}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
            style={{ background: "repeating-linear-gradient(135deg, #F1F5F9 0 14px, #EEF2F7 14px 28px)" }}>
            <ImageIcon className="w-8 h-8 text-slate-400" />
            <p className={`${SANS} text-sm text-slate-500`}>Schermata: <span className="font-semibold text-slate-700">{shot.label}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ shotKey, onClose }: { shotKey: ShotKey | null; onClose: () => void }) {
  useEffect(() => {
    if (!shotKey) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shotKey, onClose]);
  if (!shotKey) return null;
  const shot: Shot = SHOTS[shotKey];
  if (!shot.src && !shot.mock) return null;
  const mockScale = Math.min((window.innerWidth - 32) / MOCK_W, (window.innerHeight - 32) / MOCK_H);
  return (
    <div className="fixed inset-0 z-[10000] bg-[#00122F]/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center" aria-label="Chiudi">
        <X className="w-5 h-5 text-[#00122F]" />
      </button>
      {shot.mock ? (
        <div className="rounded-xl shadow-2xl overflow-hidden" role="img" aria-label={shot.label} onClick={(e) => e.stopPropagation()}>
          <MockStage fixedScale={mockScale}><shot.mock /></MockStage>
        </div>
      ) : (
        <img src={shot.src} alt={shot.label} className="max-w-full max-h-full rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
      )}
    </div>
  );
}

// ── Search ───────────────────────────────────────────────────────────────────

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Extra words people search with, keyed by step title (boost those steps)
const KEYWORDS: Record<string, string> = {
  "Esporta e condividi": "pdf scaricare stampare email whatsapp condividere word",
  "Seduta online in cuffia": "zoom meet teams videochiamata online cuffie audio",
  "Fai firmare il consenso": "consenso firma firmare modulo privacy gdpr",
  "Carica l'audio dal telefono": "telefono registratore mp3 m4a importare caricare audio",
  "Prova un altro modello": "cambiare modello rigenerare nota",
  "Prep Sessione": "preparazione prepararsi prima della seduta",
  "Eliminazione automatica": "cancellare eliminare dati conservazione",
  "Abbonamento": "pagamento piano prezzo carta",
  "Aggiungi un cliente": "nuovo paziente creare paziente",
  "Avvia la registrazione": "registrare microfono seduta in presenza",
  "Modifica magica": "riscrivere accorciare elenco puntato ai",
  "Crea i tuoi agenti": "agente personalizzato istruzioni",
  "Crea una nuova fattura": "fattura fatturare emettere ricevuta",
  "Invia al Sistema TS e crea il PDF": "tessera sanitaria ts spese sanitarie 730 pdf",
  "Importo, ENPAP e marca da bollo": "bollo enpap iva calcolo",
  "Esporta per il commercialista": "commercialista csv xml export",
  "Collega il Sistema TS": "tessera sanitaria credenziali pincode",
  "Compila il Profilo Fiscale": "partita iva dati fiscali regime forfettario iban",
};

function searchSteps(query: string) {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const words = q.split(/\s+/);
  return CHAPTERS.flatMap((c) =>
    c.steps.map((s, i) => {
      const title = normalize(s.title);
      const keys = normalize(KEYWORDS[s.title] ?? "");
      const body = normalize(s.body);
      const text = normalize(`${s.title} ${s.body} ${s.tip ?? ""} ${c.title} ${keys}`);
      if (!words.every((w) => text.includes(w))) return null;
      const score = (title.includes(q) ? 6 : 0)
        + words.reduce((n, w) => n + (title.includes(w) ? 3 : 0) + (keys.includes(w) ? 3 : 0) + (body.includes(w) ? 1 : 0), 0);
      return { chapter: c, step: s, i, score };
    }).filter((r): r is NonNullable<typeof r> => r !== null)
  ).sort((a, b) => b.score - a.score).slice(0, 7);
}

function StepSearch({ onJump, size = "lg", inputRef }: {
  onJump: (chapterId: string, step: number) => void;
  size?: "lg" | "sm";
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [query, setQuery] = useState("");
  const [hi, setHi] = useState(0);
  const results = useMemo(() => searchSteps(query), [query]);
  const open = query.trim().length >= 2;
  const pick = (r: (typeof results)[number]) => { onJump(r.chapter.id, r.i); setQuery(""); };
  const lg = size === "lg";

  return (
    <div className="relative">
      <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${lg ? "left-5 w-5 h-5" : "left-3 w-4 h-4"}`} />
      <input ref={inputRef} value={query}
        onChange={(e) => { setQuery(e.target.value); setHi(0); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, results.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
          if (e.key === "Enter" && results[hi]) pick(results[hi]);
          if (e.key === "Escape") setQuery("");
        }}
        placeholder={lg ? "Cosa vuoi fare? Es. «firma consenso», «Zoom», «PDF»" : "Cerca un passo…"}
        aria-label="Cerca nella guida"
        className={`w-full border text-[#00122F] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B6FD4] ${SANS} ${lg
          ? "h-14 pl-13 pr-16 rounded-2xl border-white bg-white shadow-[0_10px_40px_-12px_rgba(0,18,47,0.25)] text-base"
          : "h-9 pl-9 pr-3 rounded-xl border-slate-200 bg-white text-sm"}`} />
      {lg && (
        <kbd className={`hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center min-w-7 h-7 px-2 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-500 ${SANS}`}>/</kbd>
      )}
      {open && (
        <div className={`absolute z-30 left-0 mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden text-left ${lg ? "right-0" : "w-[min(360px,80vw)]"}`}>
          {results.length === 0 ? (
            <p className={`px-4 py-3 text-sm text-slate-500 ${SANS}`}>Nessun risultato. Prova con un'altra parola.</p>
          ) : results.map((r, k) => {
            const Icon = r.chapter.icon;
            return (
              <button key={`${r.chapter.id}-${r.i}`} onClick={() => pick(r)} onMouseEnter={() => setHi(k)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-slate-100 last:border-0 ${SANS} ${k === hi ? "bg-[#EEF3FC]" : ""}`}>
                <span className="mt-0.5 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0"><Icon className="w-3.5 h-3.5 text-[#3B6FD4]" /></span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[15px] font-semibold text-[#00122F]">{r.step.title}</span>
                  <span className="block text-xs text-slate-500 mt-0.5 truncate">{r.chapter.title} · passo {r.i + 1}</span>
                </span>
                {k === hi && <CornerDownLeft className="w-4 h-4 text-slate-400 mt-1.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── End of chapter: quick check + try it in the app ──────────────────────────

function ChapterCheck({ chapter, passed, missing, allDone, next, onPass, onReview, onNext }: {
  chapter: Chapter;
  passed: boolean;
  missing: number[]; // steps not seen yet
  allDone: boolean;
  next: Pos | null;
  onPass: () => void;
  onReview: (step: number) => void;
  onNext: () => void;
}) {
  const end = CHAPTER_END[chapter.id];
  // A check already passed reopens with its answers in place
  const [picked, setPicked] = useState<(number | null)[]>(() => end.quiz.map((q) => (passed ? q.answer : null)));
  const [current, setCurrent] = useState(0); // one question at a time
  const correct = end.quiz.filter((q, i) => picked[i] === q.answer).length;
  const quizOk = passed || correct === end.quiz.length;
  const complete = quizOk && missing.length === 0;

  useEffect(() => { if (correct === end.quiz.length && !passed) onPass(); }, [correct, end.quiz.length, passed, onPass]);

  return (
    <div className="xl:flex xl:items-stretch xl:gap-5" style={{ animation: "guidaFade .35s ease-out" }}>
      {/* Questions */}
      <div className="xl:flex-1 min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#3B6FD4] ${SANS}`}>
          <ClipboardCheck className="w-4 h-4" /> Verifica rapida
        </div>
        <h3 className={`${HEAD} text-xl text-[#00122F] mt-1`}>Fissa quello che hai visto</h3>
        <p className={`${SANS} text-sm text-slate-500 mt-1`}>Due domande, nessun voto. Se sbagli, ti diciamo quale passo rivedere.</p>
        <div className={`flex items-center gap-2 mt-4 ${SANS}`} role="tablist" aria-label="Domande">
          {end.quiz.map((q, qi) => (
            <button key={qi} type="button" role="tab" aria-selected={qi === current} onClick={() => setCurrent(qi)}
              className={`h-7 px-3 rounded-full text-xs font-medium border transition-colors ${qi === current ? "bg-[#00122F] text-white border-[#00122F]" : picked[qi] === q.answer ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-slate-500 border-slate-200"}`}>
              Domanda {qi + 1} di {end.quiz.length}{picked[qi] === q.answer && qi !== current ? " ✓" : ""}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {end.quiz.map((q, qi) => qi !== current ? null : (() => {
            const pick = picked[qi];
            const answered = pick !== null;
            const right = pick === q.answer;
            return (
              <fieldset key={qi} className={SANS}>
                <legend className="text-[15px] font-semibold text-[#00122F] mb-2.5">{qi + 1}. {q.q}</legend>
                <div className="grid gap-2">
                  {q.options.map((o, oi) => {
                    const chosen = pick === oi;
                    const tone = !chosen ? "border-slate-200 hover:border-[#3B6FD4] bg-white"
                      : right ? "border-emerald-500 bg-emerald-50" : "border-rose-400 bg-rose-50";
                    return (
                      <button key={oi} type="button" aria-pressed={chosen}
                        onClick={() => setPicked((p) => p.map((v, i) => (i === qi ? oi : v)))}
                        className={`text-left flex items-center gap-3 rounded-xl border px-4 py-2.5 text-[14px] text-[#00122F] transition-colors ${tone}`}>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${chosen ? (right ? "bg-emerald-500 border-emerald-500 text-white" : "bg-rose-500 border-rose-500 text-white") : "border-slate-300"}`}>
                          {chosen && (right ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />)}
                        </span>
                        {o}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <div role="status" className={`mt-2.5 rounded-xl px-4 py-2.5 text-[13px] leading-relaxed ${right ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                    <span className="font-semibold">{right ? "Esatto. " : "Non proprio. "}</span>{q.why}
                    {!right && (
                      <button type="button" onClick={() => onReview(q.step)} className="block mt-1.5 font-semibold underline underline-offset-2">
                        Rivedi il passo {q.step + 1}: {chapter.steps[q.step].title}
                      </button>
                    )}
                  </div>
                )}
                {right && qi < end.quiz.length - 1 && (
                  <button type="button" onClick={() => setCurrent(qi + 1)}
                    className="mt-3 inline-flex items-center gap-1 h-10 px-4 rounded-xl text-sm font-medium text-white bg-[#3B6FD4] hover:bg-[#3B6FD4]/90">
                    Domanda successiva <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </fieldset>
            );
          })())}
        </div>
      </div>

      {/* Outcome + practice */}
      <div className={`mt-4 xl:mt-0 xl:w-[300px] xl:shrink-0 flex flex-col rounded-2xl border p-5 ${SANS} ${complete ? "border-emerald-200 bg-emerald-50/60" : "border-slate-200 bg-[#F8FAFC]"}`}>
        {complete ? (
          <>
            <span className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center" style={{ animation: "guidaPop .5s cubic-bezier(.22,1.6,.36,1)" }}>
              {allDone ? <Trophy className="w-5 h-5" /> : <Check className="w-5 h-5" />}
            </span>
            <p className={`${HEAD} text-lg text-[#00122F] mt-3`}>{allDone ? "Hai completato la guida!" : "Capitolo completato"}</p>
            <p className="text-sm text-slate-600 mt-1">
              {allDone ? "Conosci tutte le funzioni di ZenGest. Ora mettile in pratica." : `Hai visto tutti i passi di «${chapter.title}». Ora provalo sul serio.`}
            </p>
          </>
        ) : quizOk ? (
          <>
            <span className="w-11 h-11 rounded-full bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center"><ClipboardCheck className="w-5 h-5" /></span>
            <p className={`${HEAD} text-lg text-[#00122F] mt-3`}>Verifica superata</p>
            <p className="text-sm text-slate-600 mt-1">
              Ti {missing.length === 1 ? "manca 1 passo" : `mancano ${missing.length} passi`} per completare il capitolo.
            </p>
            <button type="button" onClick={() => onReview(missing[0])} className="mt-2 text-left text-sm font-semibold text-[#3B6FD4] underline underline-offset-2">
              Vai al passo {missing[0] + 1}: {chapter.steps[missing[0]].title}
            </button>
          </>
        ) : (
          <>
            <span className="w-11 h-11 rounded-full bg-white border border-slate-200 text-[#3B6FD4] flex items-center justify-center"><ClipboardCheck className="w-5 h-5" /></span>
            <p className={`${HEAD} text-lg text-[#00122F] mt-3`}>Quasi fatto</p>
            <p className="text-sm text-slate-600 mt-1">Rispondi alle domande per completare il capitolo.</p>
            <p className="text-xs text-slate-500 mt-2">{correct} di {end.quiz.length} risposte corrette</p>
          </>
        )}
        <a href={end.practice.url} target="_blank" rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-between gap-2 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-semibold text-[#00122F] hover:border-[#3B6FD4] transition-colors">
          <span><span className="block text-[11px] font-semibold uppercase tracking-widest text-slate-400">Prova ora in ZenGest</span>{end.practice.label}</span>
          <ExternalLink className="w-4 h-4 text-[#3B6FD4] shrink-0" />
        </a>
        <div className="mt-auto pt-5">
          {next ? (
            <button type="button" onClick={onNext}
              className={`w-full inline-flex items-center justify-center gap-1.5 h-11 rounded-xl text-sm font-medium transition-colors ${complete ? "text-white bg-[#00122F] hover:bg-[#00122F]/90" : "text-[#00122F] bg-white border border-slate-200 hover:border-[#3B6FD4]"}`}>
              {complete ? "Capitolo successivo" : "Salta e vai avanti"} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <a href="https://app.zengest.it" className="w-full inline-flex items-center justify-center gap-1.5 h-11 rounded-xl text-sm font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90">
              Vai a ZenGest <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Player ───────────────────────────────────────────────────────────────────

function GuidePlayer({ pos, go, progress, quiz, onQuizPass, playing, setPlaying, onReset, onZoom, onSearchJump }: {
  pos: Pos;
  go: (p: Pos) => void;
  progress: Progress;
  quiz: QuizDone;
  onQuizPass: (chapterId: string) => void;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  onReset: () => void;
  onZoom: (k: ShotKey) => void;
  onSearchJump: (chapterId: string, step: number) => void;
}) {
  const chapter = CHAPTERS[pos.c];
  const checking = isCheck(pos);
  const step = checking ? null : chapter.steps[pos.s];
  const next = nextPos(pos);
  const prev = prevPos(pos);
  const mod = moduleOf(chapter.id);
  const statuses = CHAPTERS.map((c) => chapterStatus(c, progress, quiz));
  const doneCount = statuses.filter((s) => s === "done").length;
  const seenTotal = CHAPTERS.reduce((n, c) => n + Math.min(progress[c.id]?.length ?? 0, c.steps.length), 0);
  const quizTotal = CHAPTERS.filter((c) => quiz[c.id]).length;
  const pct = Math.round(((seenTotal + quizTotal) / (ALL_STEP_COUNT + CHAPTERS.length)) * 100);
  const touchX = useRef<number | null>(null);
  const railActive = useRef<HTMLButtonElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const passCurrent = useCallback(() => onQuizPass(chapter.id), [onQuizPass, chapter.id]);

  // Keep the active chapter visible in the sidebar, scrolling only the sidebar
  // (scrollIntoView would also move the page and cancel a smooth jump)
  useEffect(() => {
    const item = railActive.current;
    const list = item?.closest("nav");
    if (!item || !list) return;
    const top = item.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: top - 8, behavior: "smooth" });
    }
  }, [pos.c]);

  // Same for the chapter chips on phones
  useEffect(() => {
    const row = chips.current;
    const chip = row?.children[pos.c] as HTMLElement | undefined;
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - row.offsetLeft - 16, behavior: "smooth" });
  }, [pos.c]);

  return (
    <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(0,18,47,0.35)] overflow-hidden lg:grid lg:grid-cols-[288px_minmax(0,1fr)]">
      <p className="sr-only" aria-live="polite">
        {checking ? `Verifica del capitolo ${chapter.title}` : `Capitolo ${pos.c + 1}, passo ${pos.s + 1} di ${chapter.steps.length}: ${step!.title}`}
      </p>

      {/* ── Sidebar: the course outline ── */}
      <aside className="hidden lg:block relative border-r border-slate-200 bg-[#F8FAFC]">
        <div className="absolute inset-0 flex flex-col">
          <div className="p-4 border-b border-slate-200 space-y-3">
            <StepSearch onJump={onSearchJump} size="sm" />
            <div>
              <div className={`flex items-center justify-between text-xs mb-1.5 ${SANS}`}>
                <span className="font-semibold text-[#00122F]">Il tuo avanzamento</span>
                <span className="text-slate-500">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: BLUE }} />
              </div>
              <div className={`flex items-center justify-between text-[11px] text-slate-500 mt-1.5 ${SANS}`}>
                <span>{doneCount} di {CHAPTERS.length} capitoli completati</span>
                {pct > 0 && <button onClick={onReset} className="underline underline-offset-2 hover:text-[#00122F]">Azzera</button>}
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-2" aria-label="Capitoli della guida">
            {MODULES.map((m, mi) => {
              const mDone = m.chapters.filter((id) => statuses[CHAPTERS.findIndex((c) => c.id === id)] === "done").length;
              return (
                <div key={m.title} className="mb-2">
                  <div className={`flex items-center justify-between px-2.5 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400 ${SANS}`}>
                    <span>Modulo {mi + 1} · {m.title}</span>
                    <span className="normal-case tracking-normal font-medium">{mDone}/{m.chapters.length}</span>
                  </div>
                  {m.chapters.map((id) => {
                    const ci = CHAPTERS.findIndex((c) => c.id === id);
                    const c = CHAPTERS[ci];
                    const on = ci === pos.c;
                    const seen = progress[c.id] ?? [];
                    const status = statuses[ci];
                    return (
                      <div key={c.id} className="mb-0.5">
                        <button ref={on ? railActive : undefined} onClick={() => go({ c: ci, s: 0 })} aria-current={on ? "true" : undefined}
                          className={`w-full text-left flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors ${SANS} ${on ? "bg-white shadow-sm border border-slate-200" : "border border-transparent hover:bg-white/70"}`}>
                          <StatusRing value={seen.length / c.steps.length} done={status === "done"} />
                          <span className="flex-1 min-w-0">
                            <span className={`block text-[13px] leading-tight truncate ${on ? "font-semibold text-[#00122F]" : "text-slate-700"}`}>{c.title}</span>
                            <span className="block text-[11px] text-slate-400 mt-0.5">{STATUS_LABEL[status]} · {c.minutes} min</span>
                          </span>
                        </button>
                        {on && (
                          <ol className="ml-[20px] pl-3 border-l border-slate-200 my-1.5 space-y-0.5">
                            {c.steps.map((s, si) => {
                              const active = si === pos.s;
                              const was = seen.includes(si);
                              return (
                                <li key={si}>
                                  <button onClick={() => go({ c: ci, s: si })} aria-current={active ? "step" : undefined}
                                    className={`w-full text-left flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] ${SANS} ${active ? "text-[#3B6FD4] font-semibold bg-[#EEF3FC]" : "text-slate-600 hover:text-[#00122F]"}`}>
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${active ? "bg-[#3B6FD4] text-white" : was ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                                      {was && !active ? <Check className="w-2.5 h-2.5" /> : si + 1}
                                    </span>
                                    <span className="truncate">{s.title}</span>
                                  </button>
                                </li>
                              );
                            })}
                            <li>
                              <button onClick={() => go({ c: ci, s: c.steps.length })} aria-current={checking ? "step" : undefined}
                                className={`w-full text-left flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] ${SANS} ${checking ? "text-[#3B6FD4] font-semibold bg-[#EEF3FC]" : "text-slate-600 hover:text-[#00122F]"}`}>
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${checking ? "bg-[#3B6FD4] text-white" : quiz[c.id] ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                                  {quiz[c.id] && !checking ? <Check className="w-2.5 h-2.5" /> : <ClipboardCheck className="w-2.5 h-2.5" />}
                                </span>
                                <span className="truncate">Verifica rapida</span>
                              </button>
                            </li>
                          </ol>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ── Stage ── */}
      <div className="min-w-0 p-4 sm:p-6">
        {/* Mobile chapter picker */}
        <div ref={chips} className="lg:hidden -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {CHAPTERS.map((c, ci) => (
            <button key={c.id} onClick={() => go({ c: ci, s: 0 })}
              className={`shrink-0 h-8 px-3 rounded-full text-[13px] border inline-flex items-center gap-1.5 ${SANS} ${ci === pos.c ? "bg-[#00122F] text-white border-[#00122F]" : "bg-white text-slate-600 border-slate-200"}`}>
              {statuses[ci] === "done" && <Check className="w-3.5 h-3.5 text-emerald-500" />}
              {ci + 1}. {c.title}
            </button>
          ))}
        </div>

        {/* Chapter header: where you are and what this chapter is for */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <div className={`text-[11px] font-semibold uppercase tracking-widest text-slate-500 ${SANS}`}>
              <span className="hidden sm:inline">Modulo {mod.index + 1} · {mod.title} <span className="text-slate-300 mx-1">/</span> </span>Capitolo {pos.c + 1} di {CHAPTERS.length}
            </div>
            <h2 className={`${HEAD} text-xl sm:text-2xl text-[#00122F] mt-0.5 truncate`}>{chapter.title}</h2>
            <p className={`${SANS} text-sm text-slate-500 truncate`}>{chapter.summary}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {!checking && (
              <button onClick={() => setPlaying(!playing)} aria-pressed={playing}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-sm font-medium transition-colors ${SANS} ${playing ? "bg-[#00122F] text-white border-[#00122F]" : "bg-white text-[#00122F] border-slate-200 hover:border-[#3B6FD4]"}`}>
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{playing ? "Pausa" : "Tour automatico"}</span>
              </button>
            )}
            {chapter.video && (
              <a href={chapter.video} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-[#00122F] hover:border-[#3B6FD4] transition-colors ${SANS}`}>
                <PlayCircle className="w-4 h-4 text-[#3B6FD4]" /> <span className="hidden sm:inline">Video</span>
              </a>
            )}
          </div>
        </div>

        {checking ? (
          <ChapterCheck key={chapter.id} chapter={chapter} passed={!!quiz[chapter.id]}
            missing={chapter.steps.map((_, i) => i).filter((i) => !(progress[chapter.id] ?? []).includes(i))}
            allDone={statuses.every((s) => s === "done")}
            next={next} onPass={passCurrent}
            onReview={(s) => go({ c: pos.c, s })} onNext={() => next && go(next)} />
        ) : (
          <div className="xl:flex xl:items-stretch xl:gap-5">
            {/* Screen */}
            <div className="min-w-0 xl:flex-1 max-xl:mx-auto max-xl:max-w-[max(480px,calc((100vh_-_430px)*1.77))]"
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (dx < -50 && next) go(next);
                if (dx > 50 && prev) go(prev);
              }}>
              <ScreenFrame shotKey={step!.shot} steps={chapter.steps} activeIndex={pos.s}
                onPick={(s) => go({ c: pos.c, s })} onZoom={() => onZoom(step!.shot)} />
            </div>

            {/* Step card */}
            <div className="relative mt-4 xl:mt-0 xl:w-[300px] xl:shrink-0 xl:flex xl:flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-5 overflow-hidden max-xl:mx-auto max-xl:max-w-[max(480px,calc((100vh_-_430px)*1.77))]">
              {playing && (
                <div key={`${pos.c}-${pos.s}`} className="absolute top-0 left-0 h-0.5 bg-[#3B6FD4]"
                  style={{ animation: `guidaBar ${AUTOPLAY_MS}ms linear forwards` }} />
              )}
              <div className="flex flex-col sm:flex-row sm:items-start xl:flex-col xl:items-stretch xl:flex-1 gap-4">
                <div key={`${pos.c}-${pos.s}`} className="flex-1 min-w-0 sm:min-h-[96px]" style={{ animation: "guidaFade .3s ease-out" }}>
                  <div className={`text-[11px] font-semibold uppercase tracking-widest text-[#3B6FD4] mb-1 ${SANS}`}>
                    Passo {pos.s + 1} di {chapter.steps.length}
                  </div>
                  <h3 className={`${HEAD} text-lg text-[#00122F] mb-1`}>{step!.title}</h3>
                  <p className={`${SANS} text-[15px] text-slate-700 leading-relaxed`}>{step!.body}</p>
                  {step!.tip && (
                    <div className={`mt-3 flex gap-2 rounded-xl bg-white border border-[#DCE6FA] px-3 py-2 text-[13px] text-[#00122F] ${SANS}`}>
                      <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-[#3B6FD4]" />
                      <span>{step!.tip}{chapter.id === "cliente" && pos.s === 3 && (
                        <> <a href="/guida-consenso" className="font-semibold underline underline-offset-2">Apri la guida al consenso</a></>
                      )}</span>
                    </div>
                  )}
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 xl:flex-row-reverse xl:items-center xl:mt-auto">
                  <div className="flex items-center gap-2">
                    <button onClick={() => prev && go(prev)} disabled={!prev} aria-label="Passo precedente"
                      className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-[#00122F] disabled:opacity-40 hover:border-[#3B6FD4] transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {next && (
                      <button onClick={() => go(next)}
                        className={`inline-flex items-center gap-1 h-10 px-4 rounded-xl text-sm font-medium text-white transition-colors ${SANS} ${next.s === chapter.steps.length && next.c === pos.c ? "bg-[#00122F] hover:bg-[#00122F]/90" : "bg-[#3B6FD4] hover:bg-[#3B6FD4]/90"}`}>
                        {next.c === pos.c && next.s === chapter.steps.length ? "Verifica" : "Avanti"} <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {chapter.steps.map((_, si) => (
                      <span key={si} className={`h-1.5 rounded-full transition-all duration-300 ${si === pos.s ? "w-5 bg-[#3B6FD4]" : si < pos.s ? "w-1.5 bg-[#3B6FD4]/40" : "w-1.5 bg-slate-300"}`} />
                    ))}
                    <ClipboardCheck className={`w-3 h-3 ml-0.5 ${quiz[chapter.id] ? "text-emerald-600" : "text-slate-300"}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className={`hidden lg:block mt-3 text-center text-xs text-slate-400 ${SANS}`}>
          Usa le frecce <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">←</kbd> <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">→</kbd> per spostarti · <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">/</kbd> per cercare · clicca la schermata per ingrandirla
        </p>
      </div>
    </div>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left ${SANS}`}>
        <span className="font-semibold text-[#00122F]">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && <p className={`px-5 pb-4 -mt-1 text-[15px] text-slate-600 leading-relaxed ${SANS}`}>{a}</p>}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function GuidaZenGest() {
  const [progress, setProgress] = useState<Progress>({});
  const [quiz, setQuiz] = useState<QuizDone>({});
  const [pos, setPos] = useState<Pos>({ c: 0, s: 0 });
  const [resume, setResume] = useState<Pos | null>(null);
  const [playing, setPlaying] = useState(false);
  const [zoomed, setZoomed] = useState<ShotKey | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const ready = useRef(false);

  // Loaded after mount so the prerendered HTML matches the first client render.
  // A shared link (#capitolo-passo) wins; otherwise pick up where the viewer left off.
  useEffect(() => {
    setProgress(loadJSON<Progress>(PROGRESS_KEY, {}));
    const savedQuiz = loadJSON<QuizDone>(QUIZ_KEY, {});
    setQuiz(savedQuiz);
    const fromHash = posFromHash(window.location.hash);
    const last = loadJSON<Pos | null>(LAST_KEY, null);
    let lastValid = last && CHAPTERS[last.c] && last.s <= CHAPTERS[last.c].steps.length ? last : null;
    // Finished a chapter's check last time: resume from the next chapter
    if (lastValid && isCheck(lastValid) && savedQuiz[CHAPTERS[lastValid.c].id]) lastValid = nextPos(lastValid) ?? lastValid;
    if (fromHash) {
      setPos(fromHash);
      setTimeout(scrollToPlayer, 100);
    } else if (lastValid) {
      setPos(lastValid);
      if (lastValid.c !== 0 || lastValid.s !== 0) setResume(lastValid);
    }
    ready.current = true;
  }, []);

  // Mark the current step as seen and remember it for next time
  useEffect(() => {
    const id = CHAPTERS[pos.c].id;
    if (!isCheck(pos)) {
      setProgress((p) => {
        const seen = p[id] ?? [];
        if (seen.includes(pos.s)) return p;
        const next = { ...p, [id]: [...seen, pos.s] };
        saveJSON(PROGRESS_KEY, next);
        return next;
      });
    }
    if (ready.current) saveJSON(LAST_KEY, pos);
  }, [pos]);

  // Tour automatico: stops at the chapter check
  useEffect(() => {
    if (!playing) return;
    if (isCheck(pos)) { setPlaying(false); return; }
    const t = setTimeout(() => {
      const n = nextPos(pos);
      if (n) setPos(n); else setPlaying(false);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, pos]);

  const passQuiz = useCallback((chapterId: string) => {
    setQuiz((q) => {
      if (q[chapterId]) return q;
      const next = { ...q, [chapterId]: true };
      saveJSON(QUIZ_KEY, next);
      return next;
    });
  }, []);

  // Manual navigation stops the tour and puts the step in the URL, so it can be
  // shared; just opening /guida leaves the address clean
  const go = (p: Pos) => {
    setPlaying(false);
    setResume(null);
    setPos(p);
    history.replaceState(null, "", `#${CHAPTERS[p.c].id}-${p.s + 1}`);
  };
  const jump = (chapterId: string, step: number) => { go(posOf(chapterId, step)); scrollToPlayer(); };

  // ← → to move, / to search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (zoomed || t.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "/") { e.preventDefault(); searchRef.current?.focus(); searchRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      const player = document.getElementById("guida-player")?.getBoundingClientRect();
      if (!player || player.bottom < 120 || player.top > window.innerHeight - 120) return;
      if (e.key === "ArrowRight") { const n = nextPos(pos); if (n) { e.preventDefault(); go(n); } }
      if (e.key === "ArrowLeft") { const p = prevPos(pos); if (p) { e.preventDefault(); go(p); } }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pos, zoomed]);

  const resetAll = () => {
    const fresh = { [CHAPTERS[0].id]: [0] };
    saveJSON(PROGRESS_KEY, fresh);
    saveJSON(QUIZ_KEY, {});
    setProgress(fresh);
    setQuiz({});
    go({ c: 0, s: 0 });
  };

  const statuses = CHAPTERS.map((c) => chapterStatus(c, progress, quiz));
  // The first step is marked on arrival, so "started" means more than that
  const started = CHAPTERS.reduce((n, c) => n + (progress[c.id]?.length ?? 0), 0) > 1 || Object.keys(quiz).length > 0;
  const allDone = statuses.every((s) => s === "done");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <style>{`
        @keyframes guidaFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes guidaPulse { 0% { box-shadow: 0 0 0 0 rgba(59,111,212,.45); } 70% { box-shadow: 0 0 0 14px rgba(59,111,212,0); } 100% { box-shadow: 0 0 0 0 rgba(59,111,212,0); } }
        @keyframes guidaBar { from { width: 0; } to { width: 100%; } }
        @keyframes guidaPop { from { transform: scale(.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @property --sx { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
        @property --sy { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
        .guida-spot { transition: --sx .5s cubic-bezier(.22,1,.36,1), --sy .5s cubic-bezier(.22,1,.36,1), opacity .3s; }
        .guida-page :is(button, a, summary, input):focus-visible { outline: 2px solid #3B6FD4; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .guida-page *, .guida-page *::before, .guida-page *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        }
      `}</style>
      <SEO
        title="Come usare ZenGest — Guida interattiva per psicologi"
        useExactTitle={false}
        description="Guida passo passo a ZenGest: crea un paziente, raccogli il consenso, registra una seduta, rivedi la nota clinica, usa i modelli, l'Assistente Zen e la fatturazione con invio al Sistema TS. Con schermate interattive e verifiche rapide."
        path="/guida"
        keywords="guida ZenGest, come usare ZenGest, tutorial note cliniche AI, registrare seduta psicologo, Assistente Zen, fatturazione psicologi Sistema TS"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "https://zengest.it/" },
          { name: "Guida", url: "https://zengest.it/guida" },
        ])}
      />

      <div className="guida-page">
        {/* ── Hero: search first, then start / resume ───────────────────── */}
        <section className="relative px-6 pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: HERO_GRAD }}>
          <div className="max-w-3xl mx-auto text-center relative z-20">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm mb-5 ${SANS}`}>
              <BookOpen className="w-4 h-4 text-[#00122F]" />
              <span className="text-xs font-medium text-[#00122F]">Guida interattiva · {MODULES.length} moduli · {CHAPTERS.length} capitoli · circa {CHAPTERS.reduce((n, c) => n + c.minutes, 0)} min</span>
            </div>
            <h1 className={`${SERIF} text-4xl sm:text-5xl md:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4`}>
              Come usare ZenGest
            </h1>
            <p className={`${SANS} text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-7`}>
              Cerca quello che ti serve, o segui il percorso passo dopo passo sulle schermate dell'app.
            </p>
            <div className="max-w-xl mx-auto">
              <StepSearch onJump={jump} inputRef={searchRef} />
            </div>
            <div className={`flex flex-wrap justify-center gap-2 mt-5 ${SANS}`}>
              {POPULAR.map((p) => (
                <button key={p.label} onClick={() => jump(p.chapter, p.step)}
                  className="h-8 px-3.5 rounded-full bg-white/70 border border-white text-[13px] text-[#00122F] hover:bg-white hover:shadow-sm transition-all">
                  {p.label}
                </button>
              ))}
            </div>
            <div className={`mt-7 flex flex-wrap items-center justify-center gap-3 ${SANS}`}>
              {allDone ? (
                <span className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-600 text-white text-sm font-medium shadow-md">
                  <Trophy className="w-4 h-4" /> Hai completato la guida
                </span>
              ) : resume ? (
                <button onClick={scrollToPlayer}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#00122F] text-white text-sm font-medium shadow-md hover:bg-[#00122F]/90 transition-colors">
                  <Play className="w-4 h-4" /> Riprendi: {posLabel(resume)}
                </button>
              ) : (
                <button onClick={scrollToPlayer}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#00122F] text-white text-sm font-medium shadow-md hover:bg-[#00122F]/90 transition-colors">
                  <Play className="w-4 h-4" /> {started ? "Continua la guida" : "Inizia la guida"}
                </button>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #F8FAFC)" }} />
        </section>

        {/* ── Player ───────────────────────────────────────────────────── */}
        <section id="guida-player" className="px-3 sm:px-6 pb-16 scroll-mt-20">
          <GuidePlayer pos={pos} go={go} progress={progress} quiz={quiz} onQuizPass={passQuiz}
            playing={playing} setPlaying={setPlaying} onReset={resetAll} onZoom={setZoomed} onSearchJump={jump} />
        </section>

        {/* ── Course outline as text (for readers and search engines) ─── */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className={`${HEAD} text-2xl text-[#00122F]`}>Il percorso completo</h2>
              <p className={`${SANS} text-slate-600 mt-1 mb-6`}>Preferisci leggere? Apri un capitolo, o clicca un passo per vederlo sulla schermata.</p>
            </FadeIn>
            <div className="space-y-8">
              {MODULES.map((m, mi) => (
                <div key={m.title}>
                  <p className={`text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 ${SANS}`}>Modulo {mi + 1} · {m.title}</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
                    {m.chapters.map((id) => {
                      const ci = CHAPTERS.findIndex((c) => c.id === id);
                      const c = CHAPTERS[ci];
                      const Icon = c.icon;
                      const status = statuses[ci];
                      return (
                        <details key={c.id} id={`indice-${c.id}`} className="group rounded-2xl border border-slate-200 bg-white">
                          <summary className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden ${SANS}`}>
                            <span className="w-8 h-8 rounded-lg bg-[#EEF3FC] text-[#3B6FD4] flex items-center justify-center shrink-0"><Icon className="w-4 h-4" /></span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-xs text-slate-500">Capitolo {ci + 1} · {c.steps.length} passi · {c.minutes} min</span>
                              <span className="block font-semibold text-[#00122F] leading-snug">{c.title}</span>
                            </span>
                            <span className={`text-[11px] font-semibold rounded-full px-2 py-0.5 shrink-0 ${status === "done" ? "bg-emerald-100 text-emerald-700" : status === "doing" ? "bg-[#EEF3FC] text-[#3B6FD4]" : "bg-slate-100 text-slate-500"}`}>
                              {STATUS_LABEL[status]}
                            </span>
                            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
                          </summary>
                          <div className="px-4 pb-4">
                            <p className={`${SANS} text-sm text-slate-500 mb-3`}>{c.summary}</p>
                            <ol className="space-y-3">
                              {c.steps.map((s, si) => (
                                <li key={si} className={SANS}>
                                  <button onClick={() => jump(c.id, si)} className="text-left text-[15px] font-semibold text-[#00122F] hover:text-[#3B6FD4] inline-flex items-center gap-1.5">
                                    <span className="text-xs text-slate-400 font-normal">{si + 1}.</span> {s.title} <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                  <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{s.body}</p>
                                </li>
                              ))}
                              <li className={SANS}>
                                <button onClick={() => jump(c.id, c.steps.length)} className="text-left text-[15px] font-semibold text-[#3B6FD4] inline-flex items-center gap-1.5">
                                  <ClipboardCheck className="w-4 h-4" /> Verifica rapida <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </li>
                            </ol>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section id="faq" className="py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className={`${SERIF} text-4xl md:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] text-center mb-10`}>Dubbi comuni</h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-3 items-start">
              {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>

        {/* ── Closing ───────────────────────────────────────────────────── */}
        <section className="py-16 px-6" style={{ background: HERO_GRAD }}>
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <p className={`${SERIF} text-3xl md:text-4xl text-[#00122F] leading-[1.15] tracking-[-0.02em] mb-8`}>
                Non trovi quello che cerchi? Scrivici: siamo qui per supportarti nel tuo lavoro.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://supporto.zengest.it" target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 h-12 px-8 rounded-xl font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md ${SANS}`}>
                  <MessageCircle className="w-4 h-4 text-[#A7BCF5]" /> Centro assistenza
                </a>
                <a href="/video"
                  className={`inline-flex items-center gap-2 h-12 px-8 rounded-xl font-medium text-[#00122F] bg-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-md ${SANS}`}>
                  <PlayCircle className="w-4 h-4 text-[#3B6FD4]" /> Video tutorial
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      <Lightbox shotKey={zoomed} onClose={() => setZoomed(null)} />
      <Footer />
    </div>
  );
}
