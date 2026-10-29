import { useState, useRef, useEffect, useMemo, type CSSProperties } from "react";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { breadcrumbSchema } from "../components/SEO";
import {
  BookOpen, Search, ChevronLeft, ChevronRight, Check, CheckCircle2,
  Lightbulb, PlayCircle, Compass, UserPlus, Mic, FileText, PenLine,
  FolderOpen, LayoutTemplate, Sparkles, Settings, ImageIcon, X, ArrowRight,
  ChevronDown, ChevronUp, MessageCircle, Play, Pause, Maximize2, CornerDownLeft,
} from "lucide-react";
import {
  MockStage, MOCK_W, MOCK_H, MockHomeCliente, MockPickerModelli, MockRegistrazione, MockCaricamento, MockUpload, MockSessioneNota, MockModificaMagica, MockRigenera, MockSessioneEsporta, MockSessioneTrascrizione, MockClientePrep,
} from "../components/guida/AppMockups";

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

// What people look for most, shown as shortcuts under the search
const POPULAR = [
  { label: "Registrare in videochiamata", chapter: "registra", step: 4 },
  { label: "Far firmare il consenso", chapter: "cliente", step: 2 },
  { label: "Esportare la nota in PDF", chapter: "nota", step: 5 },
  { label: "Caricare l'audio dal telefono", chapter: "senza-registrare", step: 3 },
  { label: "Cambiare modello di nota", chapter: "nota", step: 4 },
  { label: "Prepararsi alla seduta", chapter: "cartella", step: 2 },
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

type Progress = Record<string, number[]>;

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: Progress) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
}

// ── Position in the guide (chapter + step), mirrored in the URL hash ─────────

interface Pos { c: number; s: number }

function posFromHash(hash: string): Pos | null {
  const m = hash.match(/^#([\w-]+?)(?:-(\d+))?$/);
  if (!m) return null;
  const c = CHAPTERS.findIndex((ch) => ch.id === m[1]);
  if (c < 0) return null;
  const s = Math.min(Math.max(Number(m[2] ?? 1) - 1, 0), CHAPTERS[c].steps.length - 1);
  return { c, s };
}

function posOf(chapterId: string, step: number): Pos {
  return { c: Math.max(0, CHAPTERS.findIndex((ch) => ch.id === chapterId)), s: step };
}

function nextPos({ c, s }: Pos): Pos | null {
  if (s < CHAPTERS[c].steps.length - 1) return { c, s: s + 1 };
  return c < CHAPTERS.length - 1 ? { c: c + 1, s: 0 } : null;
}

function prevPos({ c, s }: Pos): Pos | null {
  if (s > 0) return { c, s: s - 1 };
  return c > 0 ? { c: c - 1, s: CHAPTERS[c - 1].steps.length - 1 } : null;
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

// ── Player ───────────────────────────────────────────────────────────────────

function GuidePlayer({ pos, go, progress, playing, setPlaying, onReset, onZoom, onSearchJump }: {
  pos: Pos;
  go: (p: Pos) => void;
  progress: Progress;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  onReset: () => void;
  onZoom: (k: ShotKey) => void;
  onSearchJump: (chapterId: string, step: number) => void;
}) {
  const chapter = CHAPTERS[pos.c];
  const step = chapter.steps[pos.s];
  const next = nextPos(pos);
  const prev = prevPos(pos);
  const seenTotal = CHAPTERS.reduce((n, c) => n + (progress[c.id]?.length ?? 0), 0);
  const pct = Math.round((seenTotal / ALL_STEP_COUNT) * 100);
  const touchX = useRef<number | null>(null);
  const railActive = useRef<HTMLButtonElement>(null);
  const chips = useRef<HTMLDivElement>(null);

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
      {/* ── Sidebar ── */}
      <aside className="hidden lg:block relative border-r border-slate-200 bg-[#F8FAFC]">
        <div className="absolute inset-0 flex flex-col">
          <div className="p-4 border-b border-slate-200 space-y-3">
            <StepSearch onJump={onSearchJump} size="sm" />
            <div>
              <div className={`flex items-center justify-between text-xs mb-1.5 ${SANS}`}>
                <span className="font-semibold text-[#00122F]">Il tuo avanzamento</span>
                <span className="text-slate-500">{pct}%{pct > 0 && (
                  <button onClick={onReset} className="ml-2 underline underline-offset-2 hover:text-[#00122F]">azzera</button>
                )}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: BLUE }} />
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-2" aria-label="Capitoli della guida">
            {CHAPTERS.map((c, ci) => {
              const Icon = c.icon;
              const on = ci === pos.c;
              const seen = progress[c.id] ?? [];
              const done = seen.length === c.steps.length;
              return (
                <div key={c.id} className="mb-0.5">
                  <button ref={on ? railActive : undefined} onClick={() => go({ c: ci, s: 0 })}
                    className={`w-full text-left flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors ${SANS} ${on ? "bg-white shadow-sm border border-slate-200" : "border border-transparent hover:bg-white/70"}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${on ? "bg-[#3B6FD4] text-white" : "bg-[#EEF3FC] text-[#3B6FD4]"}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`block text-[13px] leading-tight truncate ${on ? "font-semibold text-[#00122F]" : "text-slate-700"}`}>{c.title}</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">{seen.length}/{c.steps.length} passi · {c.minutes} min</span>
                    </span>
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                  {on && (
                    <ol className="ml-[22px] pl-3 border-l border-slate-200 my-1.5 space-y-0.5">
                      {c.steps.map((s, si) => {
                        const active = si === pos.s;
                        const was = seen.includes(si);
                        return (
                          <li key={si}>
                            <button onClick={() => go({ c: ci, s: si })}
                              className={`w-full text-left flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] ${SANS} ${active ? "text-[#3B6FD4] font-semibold bg-[#EEF3FC]" : "text-slate-600 hover:text-[#00122F]"}`}>
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${active ? "bg-[#3B6FD4] text-white" : was ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                                {was && !active ? <Check className="w-2.5 h-2.5" /> : si + 1}
                              </span>
                              <span className="truncate">{s.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  )}
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
              className={`shrink-0 h-8 px-3 rounded-full text-[13px] border ${SANS} ${ci === pos.c ? "bg-[#00122F] text-white border-[#00122F]" : "bg-white text-slate-600 border-slate-200"}`}>
              {ci + 1}. {c.title}
            </button>
          ))}
        </div>

        <div>
          {/* Chapter header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <div className={`text-[11px] font-semibold uppercase tracking-widest text-slate-500 ${SANS}`}>Capitolo {pos.c + 1} di {CHAPTERS.length}</div>
              <h2 className={`${HEAD} text-xl sm:text-2xl text-[#00122F] mt-0.5 truncate`}>{chapter.title}</h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setPlaying(!playing)} aria-pressed={playing}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-sm font-medium transition-colors ${SANS} ${playing ? "bg-[#00122F] text-white border-[#00122F]" : "bg-white text-[#00122F] border-slate-200 hover:border-[#3B6FD4]"}`}>
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{playing ? "Pausa" : "Tour automatico"}</span>
              </button>
              {chapter.video && (
                <a href={chapter.video} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-[#00122F] hover:border-[#3B6FD4] transition-colors ${SANS}`}>
                  <PlayCircle className="w-4 h-4 text-[#3B6FD4]" /> <span className="hidden sm:inline">Video</span>
                </a>
              )}
            </div>
          </div>

          <div className="xl:flex xl:items-stretch xl:gap-5">
          {/* Screen */}
          <div className="min-w-0 xl:flex-1 max-xl:mx-auto max-xl:max-w-[max(480px,calc((100vh_-_410px)*1.77))]"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (dx < -50 && next) go(next);
              if (dx > 50 && prev) go(prev);
            }}>
            <ScreenFrame shotKey={step.shot} steps={chapter.steps} activeIndex={pos.s}
              onPick={(s) => go({ c: pos.c, s })} onZoom={() => onZoom(step.shot)} />
          </div>

          {/* Step card */}
          <div className="relative mt-4 xl:mt-0 xl:w-[300px] xl:shrink-0 xl:flex xl:flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-5 overflow-hidden max-xl:mx-auto max-xl:max-w-[max(480px,calc((100vh_-_410px)*1.77))]">
            {playing && (
              <div key={`${pos.c}-${pos.s}`} className="absolute top-0 left-0 h-0.5 bg-[#3B6FD4]"
                style={{ animation: `guidaBar ${AUTOPLAY_MS}ms linear forwards` }} />
            )}
            <div className="flex flex-col sm:flex-row sm:items-start xl:flex-col xl:items-stretch xl:flex-1 gap-4">
              <div key={`${pos.c}-${pos.s}`} className="flex-1 min-w-0 sm:min-h-[96px]" style={{ animation: "guidaFade .3s ease-out" }}>
                <div className={`text-[11px] font-semibold uppercase tracking-widest text-[#3B6FD4] mb-1 ${SANS}`}>
                  Passo {pos.s + 1} di {chapter.steps.length}
                </div>
                <h3 className={`${HEAD} text-lg text-[#00122F] mb-1`}>{step.title}</h3>
                <p className={`${SANS} text-[15px] text-slate-700 leading-relaxed`}>{step.body}</p>
                {step.tip && (
                  <div className={`mt-3 flex gap-2 rounded-xl bg-white border border-[#DCE6FA] px-3 py-2 text-[13px] text-[#00122F] ${SANS}`}>
                    <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-[#3B6FD4]" />
                    <span>{step.tip}{chapter.id === "cliente" && pos.s === 3 && (
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
                  {next ? (
                    <button onClick={() => go(next)}
                      className={`inline-flex items-center gap-1 h-10 px-4 rounded-xl text-sm font-medium text-white transition-colors ${SANS} ${next.c !== pos.c ? "bg-[#00122F] hover:bg-[#00122F]/90" : "bg-[#3B6FD4] hover:bg-[#3B6FD4]/90"}`}>
                      {next.c !== pos.c ? "Capitolo successivo" : "Avanti"} <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className={`inline-flex items-center gap-1.5 h-10 px-3 text-sm font-semibold text-emerald-700 ${SANS}`}>
                      <CheckCircle2 className="w-4 h-4" /> Guida completata
                    </span>
                  )}
                </div>
                <div className="flex gap-1" aria-hidden="true">
                  {chapter.steps.map((_, si) => (
                    <span key={si} className={`h-1.5 rounded-full transition-all duration-300 ${si === pos.s ? "w-5 bg-[#3B6FD4]" : si < pos.s ? "w-1.5 bg-[#3B6FD4]/40" : "w-1.5 bg-slate-300"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
          <p className={`hidden lg:block mt-3 text-center text-xs text-slate-400 ${SANS}`}>
            Usa le frecce <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">←</kbd> <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">→</kbd> per spostarti · <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">/</kbd> per cercare · clicca la schermata per ingrandirla
          </p>
        </div>
      </div>
    </div>
  );
}

// ── FAQ ──────────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <button onClick={() => setOpen(!open)} className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left ${SANS}`}>
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
  const [pos, setPos] = useState<Pos>({ c: 0, s: 0 });
  const [playing, setPlaying] = useState(false);
  const [zoomed, setZoomed] = useState<ShotKey | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hashReady = useRef(false);

  // Loaded after mount so the prerendered HTML matches the first client render
  useEffect(() => {
    setProgress(loadProgress());
    const fromHash = posFromHash(window.location.hash);
    if (fromHash) {
      setPos(fromHash);
      setTimeout(scrollToPlayer, 100);
    }
    hashReady.current = true;
  }, []);

  // Mark the current step as seen and mirror it in the URL, so a step can be shared
  useEffect(() => {
    const id = CHAPTERS[pos.c].id;
    setProgress((p) => {
      const seen = p[id] ?? [];
      if (seen.includes(pos.s)) return p;
      const next = { ...p, [id]: [...seen, pos.s] };
      saveProgress(next);
      return next;
    });
    if (hashReady.current) history.replaceState(null, "", `#${id}-${pos.s + 1}`);
  }, [pos]);

  // Tour automatico
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      const n = nextPos(pos);
      if (n) setPos(n); else setPlaying(false);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, pos]);

  // Manual navigation stops the tour
  const go = (p: Pos) => { setPlaying(false); setPos(p); };
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
    const fresh = { [CHAPTERS[pos.c].id]: [pos.s] };
    saveProgress(fresh);
    setProgress(fresh);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <style>{`
        @keyframes guidaFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes guidaPulse { 0% { box-shadow: 0 0 0 0 rgba(59,111,212,.45); } 70% { box-shadow: 0 0 0 14px rgba(59,111,212,0); } 100% { box-shadow: 0 0 0 0 rgba(59,111,212,0); } }
        @keyframes guidaBar { from { width: 0; } to { width: 100%; } }
        @property --sx { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
        @property --sy { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
        .guida-spot { transition: --sx .5s cubic-bezier(.22,1,.36,1), --sy .5s cubic-bezier(.22,1,.36,1), opacity .3s; }
      `}</style>
      <SEO
        title="Come usare ZenGest — Guida interattiva per psicologi"
        useExactTitle={false}
        description="Guida passo passo a ZenGest: crea un paziente, raccogli il consenso, registra una seduta, rivedi la nota clinica, usa i modelli e l'Assistente Zen. Con schermate interattive."
        path="/guida"
        keywords="guida ZenGest, come usare ZenGest, tutorial note cliniche AI, registrare seduta psicologo, Assistente Zen"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "https://zengest.it/" },
          { name: "Guida", url: "https://zengest.it/guida" },
        ])}
      />

      {/* ── Hero: search first ───────────────────────────────────────── */}
      <section className="relative px-6 pt-24 pb-10 md:pt-28 md:pb-12" style={{ background: HERO_GRAD }}>
        <div className="max-w-3xl mx-auto text-center relative z-20">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm mb-5 ${SANS}`}>
            <BookOpen className="w-4 h-4 text-[#00122F]" />
            <span className="text-xs font-medium text-[#00122F]">Guida interattiva · {CHAPTERS.length} capitoli · {ALL_STEP_COUNT} passi</span>
          </div>
          <h1 className={`${SERIF} text-4xl sm:text-5xl md:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4`}>
            Come usare ZenGest
          </h1>
          <p className={`${SANS} text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-7`}>
            Cerca quello che ti serve, o segui la guida passo dopo passo sulle schermate dell'app.
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
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #F8FAFC)" }} />
      </section>

      {/* ── Player ───────────────────────────────────────────────────── */}
      <section id="guida-player" className="px-3 sm:px-6 pb-16 scroll-mt-20">
        <GuidePlayer pos={pos} go={go} progress={progress} playing={playing} setPlaying={setPlaying}
          onReset={resetAll} onZoom={setZoomed} onSearchJump={jump} />
      </section>

      {/* ── Every step as text (for readers and search engines) ─────── */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className={`${HEAD} text-2xl text-[#00122F]`}>Tutti i passi, in breve</h2>
            <p className={`${SANS} text-slate-600 mt-1 mb-6`}>Preferisci leggere? Apri un capitolo, o clicca un passo per vederlo sulla schermata.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
            {CHAPTERS.map((c, ci) => {
              const Icon = c.icon;
              return (
                <details key={c.id} id={`indice-${c.id}`} className="group rounded-2xl border border-slate-200 bg-white">
                  <summary className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden ${SANS}`}>
                    <span className="w-8 h-8 rounded-lg bg-[#EEF3FC] text-[#3B6FD4] flex items-center justify-center shrink-0"><Icon className="w-4 h-4" /></span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs text-slate-500">Capitolo {ci + 1} · {c.steps.length} passi</span>
                      <span className="block font-semibold text-[#00122F] leading-snug">{c.title}</span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ol className="px-4 pb-4 space-y-3">
                    {c.steps.map((s, si) => (
                      <li key={si} className={SANS}>
                        <button onClick={() => jump(c.id, si)} className="text-left text-[15px] font-semibold text-[#00122F] hover:text-[#3B6FD4] inline-flex items-center gap-1.5">
                          <span className="text-xs text-slate-400 font-normal">{si + 1}.</span> {s.title} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-sm text-slate-600 leading-relaxed mt-0.5">{s.body}</p>
                      </li>
                    ))}
                  </ol>
                </details>
              );
            })}
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

      <Lightbox shotKey={zoomed} onClose={() => setZoomed(null)} />
      <Footer />
    </div>
  );
}
