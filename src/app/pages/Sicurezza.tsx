import { Shield, Lock, GlobeLock, Server, FileCheck, ShieldCheck, EyeOff, Key, Scale, UserCheck, Cpu, AlertTriangle } from "lucide-react";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { Link } from "react-router";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const FEARS = [
  {
    icon: EyeOff,
    fear: "I dati dei miei pazienti vengono usati per addestrare l'AI?",
    answer: "No. Nessun dato clinico — trascrizioni, note, diagnosi o qualsiasi contenuto inserito nel Servizio — viene utilizzato per addestrare modelli AI, né nostri né di terze parti. Questa garanzia è esplicita nel DPA e nei contratti con tutti i nostri sub-responsabili. È vincolante per contratto, non solo una promessa.",
  },
  {
    icon: GlobeLock,
    fear: "I dati restano in Europa?",
    answer: "Sì. Tutta l'infrastruttura di produzione si trova nell'Unione Europea. Non avviene alcun trasferimento di dati clinici al di fuori dei confini UE. Ogni sub-responsabile del trattamento — inclusi i provider AI — opera con sede contrattuale europea e vincoli SCCs (Standard Contractual Clauses) dove applicabili.",
  },
  {
    icon: Lock,
    fear: "Chi può vedere i dati dei miei pazienti?",
    answer: "Solo tu, in qualità di Titolare del Trattamento. ZenGest agisce esclusivamente come Responsabile del Trattamento ai sensi dell'Art. 28 GDPR: elabora i dati solo su tua istruzione, per le sole finalità del Servizio, e non ha accesso ai contenuti clinici al di fuori di questo perimetro. Ogni accesso è tracciato in log di audit conservati.",
  },
  {
    icon: EyeOff,
    fear: "Il paziente è riconoscibile quando l'AI elabora le note?",
    answer: "No. Prima che qualsiasi testo venga elaborato dal modello AI, i riferimenti identificativi del paziente — nome, data di nascita, codice fiscale, e altri dati diretti — vengono sostituiti con token pseudonimi. Il modello AI non riceve mai l'identità reale della persona. Questo è il meccanismo della pseudonimizzazione obbligatoria prevista dal GDPR per i dati sanitari.",
  },
  {
    icon: Scale,
    fear: "Sono io il responsabile se l'AI produce un errore?",
    answer: "Tu mantieni piena responsabilità clinica, deontologica e legale per ogni decisione terapeutica. ZenGest genera esclusivamente bozze che richiedono la tua revisione e validazione prima di qualsiasi utilizzo — questo è il principio human-in-the-loop, esplicitato nel Codice Deontologico degli Psicologi e nei requisiti dell'EU AI Act. ZenGest non prende decisioni cliniche: le prendi tu.",
  },
  {
    icon: UserCheck,
    fear: "Devo informare i miei pazienti che uso ZenGest?",
    answer: "Sì. Come Titolare del Trattamento, hai l'obbligo di aggiornare la tua informativa privacy per includere l'uso di strumenti AI e di ottenere il consenso informato esplicito dei pazienti ai sensi dell'Art. 9.2.a GDPR. ZenGest fornisce un template di informativa e un modello di consenso che puoi adattare alla tua pratica. La firma del DPA al momento della registrazione formalizza il perimetro del trattamento.",
  },
  {
    icon: Shield,
    fear: "Come funziona la sicurezza tecnica dei dati?",
    answer: "I dati sono cifrati in transito (TLS 1.3) e a riposo (AES-256). L'accesso è protetto da autenticazione sicura. Puoi eliminare la registrazione audio originale subito dopo la trascrizione — il file grezzo non viene conservato oltre il necessario. Ogni account è isolato: non esistono modalità di accesso condiviso non autorizzato.",
  },
  {
    icon: FileCheck,
    fear: "ZenGest è conforme al GDPR per i dati sanitari?",
    answer: "ZenGest è costruito per soddisfare i requisiti del GDPR Art. 9 per il trattamento di dati sanitari (categoria speciale). Pseudonimizzazione automatica, minimizzazione dei dati, infrastruttura UE, DPA incluso in tutti i piani, e garanzia contrattuale di zero addestramento su dati clinici. Il DPA è disponibile in formato firmabile per l'Art. 28 GDPR.",
  },
];

const ACT_ITEMS = [
  {
    label: "EU AI Act — Reg. 2024/1689",
    body: "Gli strumenti AI nel settore sanitario rientrano tra i sistemi ad alto rischio ai sensi dell'Allegato III del Regolamento UE sull'Intelligenza Artificiale. ZenGest rispetta i requisiti degli Artt. 8-15: sistema di gestione del rischio, documentazione tecnica, trasparenza verso il professionista, supervisione umana obbligatoria (human-in-the-loop), robustezza e sicurezza informatica.",
    badge: "Annex III · Alta priorità",
  },
  {
    label: "GDPR Art. 9 — Dati sanitari",
    body: "I dati clinici dei pazienti sono dati di categoria speciale ai sensi dell'Art. 9 GDPR. ZenGest agisce come Responsabile del Trattamento (Art. 28): non può trattare i dati per finalità proprie, deve rispettare le istruzioni del Titolare (il professionista), e garantisce misure tecniche e organizzative adeguate. Il DPA è incluso in tutti i piani.",
    badge: "Art. 28 DPA incluso",
  },
  {
    label: "Legge 132/2025 — AI in Italia",
    body: "La prima legge italiana sull'intelligenza artificiale (L. 132/2025, in vigore dal 10 ottobre 2025) stabilisce che i sistemi AI in ambito sanitario devono garantire il controllo umano sulle decisioni cliniche. Il professionista mantiene sempre l'autorità decisionale. ZenGest è allineato a questo requisito: ogni output è una bozza che richiede validazione del professionista.",
    badge: "In vigore ottobre 2025",
  },
  {
    label: "Codice Deontologico Psicologi",
    body: "Il Codice Deontologico degli Psicologi Italiani stabilisce che la responsabilità clinica, deontologica e legale risiede interamente nel professionista. ZenGest non produce diagnosi né valutazioni autonome: supporta la documentazione, ma ogni giudizio clinico resta nelle mani dello psicologo. L'uso di AI deve essere comunicato al paziente (Art. 3 Codice Deontologico).",
    badge: "Responsabilità al professionista",
  },
];

const FLOW = [
  { step: "1", label: "Registrazione seduta", desc: "L'audio viene acquisito e trasmesso cifrato (TLS 1.3). Non viene mai salvato in chiaro." },
  { step: "2", label: "Pseudonimizzazione automatica", desc: "Nome, codice fiscale e dati identificativi vengono sostituiti con token pseudonimi prima di qualsiasi elaborazione AI." },
  { step: "3", label: "Elaborazione AI", desc: "Il modello riceve solo testo pseudonimizzato. Non vede l'identità del paziente. Genera una bozza di nota clinica." },
  { step: "4", label: "Revisione del professionista", desc: "Tu rivedi, correggi e validi ogni contenuto. Nessuna nota viene finalizzata senza il tuo intervento (human-in-the-loop)." },
  { step: "5", label: "Archiviazione cifrata", desc: "Il documento validato viene salvato cifrato (AES-256) nella cartella del paziente. Solo tu hai accesso." },
];

export function Sicurezza() {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Sicurezza & Conformità · ZenGest"
        useExactTitle={true}
        description="Come ZenGest protegge i dati clinici dei tuoi pazienti. GDPR Art. 9, EU AI Act, pseudonimizzazione, zero addestramento su dati clinici, server UE. Risponde alle domande degli psicologi italiani."
        path="/sicurezza"
      />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
            Sicurezza & Conformità
          </div>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-6">
            Costruito per i dati clinici.{" "}
            <span style={G}>Non adattato.</span>
          </h1>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
            I dati dei tuoi pazienti sono dati sanitari di categoria speciale ai sensi del GDPR Art. 9. Abbiamo costruito ZenGest attorno a questo presupposto — non come vincolo da soddisfare, ma come punto di partenza.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Server UE", sub: "Nessun trasferimento extra-UE" },
              { label: "GDPR Art. 9", sub: "Dati sanitari by design" },
              { label: "Zero training", sub: "Mai usati per addestrare AI" },
              { label: "DPA incluso", sub: "In tutti i piani, Art. 28" },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 rounded-2xl border border-slate-100 p-5 text-center">
                <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">{item.label}</p>
                <p className="font-['DM_Sans'] text-xs text-slate-400 leading-snug">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fears Q&A */}
      <section className="px-6 pb-20 bg-slate-50">
        <div className="max-w-3xl mx-auto pt-16">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 text-center">Le domande che ci vengono fatte</p>
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] text-center leading-snug tracking-[-0.02em] mb-12">
            Le preoccupazioni degli psicologi.<br />
            <span style={G}>Le nostre risposte.</span>
          </h2>
          <div className="space-y-4">
            {FEARS.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.fear} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#3B6FD4]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-2">{item.fear}</p>
                      <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pseudonimizzazione vs anonimizzazione */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 text-center">Una distinzione importante</p>
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] text-center leading-snug tracking-[-0.02em] mb-8">
            Pseudonimizzazione, non anonimizzazione.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3B6FD4]" strokeWidth={1.8} />
                </div>
                <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F]">Pseudonimizzazione</p>
              </div>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">I dati identificativi vengono sostituiti con token. L'AI lavora solo sul token — non sul nome reale. Solo tu, con la chiave separata, puoi ricondurre i dati al paziente. Il GDPR si applica in pieno: i diritti del paziente sono garantiti.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-slate-200/60 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.8} />
                </div>
                <p className="font-['DM_Sans'] text-sm font-semibold text-slate-400">Anonimizzazione</p>
              </div>
              <p className="font-['DM_Sans'] text-sm text-slate-400 leading-relaxed">Il dato diventa irriconducibile alla persona — ma con esso si perdono anche i diritti del paziente (accesso, cancellazione, portabilità) e la continuità clinica. Non applicabile a sistemi di cartella clinica attiva.</p>
            </div>
          </div>
          <div className="bg-[#F0F5FF] border border-[#3B6FD4]/20 rounded-2xl p-5">
            <p className="font-['DM_Sans'] text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-[#00122F]">Perché è importante.</span> Il GDPR Art. 32 riconosce la pseudonimizzazione come misura tecnica adeguata per il trattamento di dati sanitari. ZenGest la applica in modo automatico e sistematico prima di ogni elaborazione AI — non come opzione, ma come comportamento predefinito del sistema.
            </p>
          </div>
        </div>
      </section>

      {/* How data flows */}
      <section className="px-6 pb-20 bg-slate-50">
        <div className="max-w-2xl mx-auto pt-16">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 text-center">Cosa succede ai dati</p>
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] text-center leading-snug tracking-[-0.02em] mb-12">
            Il flusso di una seduta.
          </h2>
          <div className="space-y-3">
            {FLOW.map((item) => (
              <div key={item.step} className="flex gap-4 items-start bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#3B6FD4] text-white flex items-center justify-center font-['DM_Sans'] text-sm font-semibold shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">{item.label}</p>
                  <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory compliance */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 text-center">Quadro normativo</p>
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] text-center leading-snug tracking-[-0.02em] mb-10">
            Le norme che si applicano.<br />
            <span style={G}>Come le rispettiamo.</span>
          </h2>
          <div className="space-y-4">
            {ACT_ITEMS.map(item => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F]">{item.label}</p>
                  <span className="font-['DM_Sans'] text-xs font-medium text-[#3B6FD4] bg-[#3B6FD4]/10 rounded-full px-2.5 py-0.5">{item.badge}</span>
                </div>
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-processors */}
      <section className="px-6 pb-20 bg-slate-50">
        <div className="max-w-3xl mx-auto pt-16">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 text-center">Catena del trattamento</p>
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] text-center leading-snug tracking-[-0.02em] mb-4">
            Chi tratta i dati, e come.
          </h2>
          <p className="font-['DM_Sans'] text-sm text-slate-500 text-center mb-8 leading-relaxed max-w-xl mx-auto">
            ZenGest si avvale di fornitori terzi per specifiche funzioni tecniche. Tutti operano come sub-responsabili del trattamento ai sensi dell'Art. 28 GDPR, con contratti che vietano esplicitamente l'uso dei dati per addestramento AI.
          </p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
            <table className="w-full font-['DM_Sans'] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Fornitore</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Funzione</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Sede dati</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["HANA Health Inc.", "Infrastruttura AI vocale e trascrizione", "UE (contrattuale)"],
                  ["Amazon Web Services", "Hosting e archiviazione dati", "UE (eu-west)"],
                  ["Anthropic", "Elaborazione linguistica AI", "UE (contrattuale + SCCs)"],
                ].map(([name, fn, location], i) => (
                  <tr key={name} className={i < 2 ? "border-b border-slate-100" : ""}>
                    <td className="px-5 py-4 font-medium text-[#00122F]">{name}</td>
                    <td className="px-5 py-4 text-slate-500">{fn}</td>
                    <td className="px-5 py-4 text-slate-500">{location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-['DM_Sans'] text-xs text-slate-400 mt-4 text-center">
            L'elenco completo con le garanzie contrattuali è nel{" "}
            <Link to="/dpa" className="text-[#3B6FD4] hover:underline">DPA (Art. 28 GDPR)</Link>.
          </p>
        </div>
      </section>

      {/* Responsibilities of the psychologist */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F0F5FF] border border-[#3B6FD4]/20 rounded-2xl p-8">
            <div className="flex gap-4 items-start">
              <UserCheck className="w-6 h-6 text-[#3B6FD4] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-3">Le responsabilità del professionista</p>
                <div className="space-y-2">
                  {[
                    "Informare i pazienti dell'uso di strumenti AI nella documentazione clinica.",
                    "Ottenere il consenso informato esplicito prima di usare ZenGest con i dati del paziente (Art. 9.2.a GDPR).",
                    "Aggiornare la propria informativa privacy per includere il trattamento tramite ZenGest.",
                    "Verificare e validare ogni bozza generata dall'AI prima dell'utilizzo clinico.",
                    "Valutare se sia necessaria una DPIA ai sensi dell'Art. 35 GDPR per la propria pratica.",
                  ].map(item => (
                    <div key={item} className="flex gap-2.5 items-start">
                      <div className="w-4 h-4 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="font-['DM_Sans'] text-sm text-slate-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="font-['DM_Sans'] text-xs text-slate-400 mt-5">
                  ZenGest fornisce template di consenso e informativa già redatti. I dettagli legali sono nelle{" "}
                  <Link to="/termini" className="text-[#3B6FD4] hover:underline">Condizioni di Servizio</Link>{" "}e nel{" "}
                  <Link to="/dpa" className="text-[#3B6FD4] hover:underline">DPA</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] leading-snug tracking-[-0.02em] mb-4">
            Hai domande sulla conformità?
          </h2>
          <p className="font-['DM_Sans'] text-sm text-slate-400 mb-8">Siamo disponibili per rispondere a qualsiasi domanda tecnica o legale sulla gestione dei dati clinici.</p>
          <a
            href="mailto:hello@zengest.it"
            className="inline-flex items-center justify-center h-12 px-10 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
          >
            Scrivici
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
