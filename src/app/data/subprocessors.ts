// Single source of truth for the sub-processor list shown on /dpa and /sicurezza.
// Must match what the code actually does (mhaihq/zengest + mhaihq/zengest-ai).
// When the infrastructure changes, update this file and DPA_LAST_UPDATED together,
// and notify customers 30 days ahead (DPA Art. 7.3).

export const DPA_LAST_UPDATED = "9 novembre 2026";

export type SubProcessor = {
  name: string;
  entity: string;
  function: string;
  location: string;
  transfer: string;
};

/** Sub-processors that handle patients' clinical data. */
export const CLINICAL_SUBPROCESSORS: SubProcessor[] = [
  {
    name: "Amazon Web Services",
    entity: "Amazon Web Services EMEA SARL (Lussemburgo)",
    function: "Hosting dell'applicazione, database, archivio file, code di elaborazione e backup",
    location: "Germania (Francoforte, eu-central-1)",
    transfer: "Nessun trasferimento extra-UE",
  },
  {
    name: "HANA Health",
    entity: "HANA Health Inc. (Delaware, USA)",
    function: "Sviluppo, gestione e amministrazione tecnica della piattaforma e della pipeline AI",
    location: "Dati su AWS Francoforte; accesso amministrativo anche da fuori UE",
    transfer: "Clausole Contrattuali Standard",
  },
  {
    name: "AssemblyAI",
    entity: "AssemblyAI, Inc. (USA)",
    function: "Trascrizione dell'audio e pseudonimizzazione automatica della trascrizione",
    location: "Stati Uniti",
    transfer: "Clausole Contrattuali Standard e/o EU-US Data Privacy Framework",
  },
  {
    name: "OpenAI",
    entity: "OpenAI Ireland Ltd / OpenAI, L.L.C.",
    function: "Generazione delle note cliniche, assistente AI, comandi vocali, lettura dei documenti",
    location: "Stati Uniti",
    transfer: "Clausole Contrattuali Standard e/o EU-US Data Privacy Framework",
  },
  {
    name: "Anthropic",
    entity: "Anthropic Ireland Ltd / Anthropic PBC",
    function: "Generazione delle note cliniche, come modello alternativo se il modello principale non è disponibile",
    location: "Stati Uniti",
    transfer: "Clausole Contrattuali Standard e/o EU-US Data Privacy Framework",
  },
  {
    name: "A-Cube",
    entity: "A-Cube S.r.l. (Italia)",
    function: "Invio delle fatture al Sistema di Interscambio (SDI) e delle spese sanitarie al Sistema Tessera Sanitaria",
    location: "Italia",
    transfer: "Nessun trasferimento extra-UE",
  },
];

/** Services that handle account, billing or technical data, not clinical content. */
export const ACCOUNT_SUBPROCESSORS: SubProcessor[] = [
  {
    name: "Clerk",
    entity: "Clerk, Inc. (USA)",
    function: "Autenticazione e gestione degli account dei professionisti",
    location: "Stati Uniti",
    transfer: "Clausole Contrattuali Standard e/o EU-US Data Privacy Framework",
  },
  {
    name: "Brevo",
    entity: "Sendinblue SAS (Francia)",
    function: "Email transazionali, incluso l'invio delle fatture di cortesia",
    location: "Unione Europea",
    transfer: "Nessun trasferimento extra-UE",
  },
  {
    name: "Stripe",
    entity: "Stripe Payments Europe Ltd (Irlanda)",
    function: "Pagamento degli abbonamenti",
    location: "Unione Europea e Stati Uniti",
    transfer: "Clausole Contrattuali Standard e/o EU-US Data Privacy Framework",
  },
  {
    name: "Sentry",
    entity: "Functional Software, Inc. (USA)",
    function: "Monitoraggio degli errori tecnici dell'applicazione (testi mascherati)",
    location: "Stati Uniti",
    transfer: "Clausole Contrattuali Standard e/o EU-US Data Privacy Framework",
  },
];

/** What is changing. Keep in sync with the infra work agreed with AUSL Modena. */
export const EU_MIGRATION = [
  "Trascrizione e pseudonimizzazione su infrastruttura ZenGest a Francoforte: l'audio non lascerà più l'Unione Europea.",
  "Modello AI con residenza dei dati in Europa e conservazione zero: richieste e risposte non conservate dal fornitore.",
  "Un solo fornitore AI attivo, senza modelli alternativi fuori UE.",
];
