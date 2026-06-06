import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

export function Terms() {
  return (
    <>
      <SEO
        title="Termini di Servizio · ZenGest"
        useExactTitle={true}
        description="Termini di Servizio e sicurezza di ZenGest, la piattaforma di AI clinica per psicologi italiani. Trattamento dei dati clinici e conformità GDPR."
        path="/terms"
      />
      <div className="bg-white min-h-screen">
        {/* Hero */}
        <section className="bg-[#00122F] text-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">ZenGest</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6 leading-[1.1]">
              Termini di Servizio<br />& Sicurezza
            </h1>
            <p className="text-slate-400 text-base">
              Data di efficacia: 1 gennaio 2025 &nbsp;|&nbsp; Versione: 1.0
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16 text-[#1e2a3a]">
          <p className="text-[15px] leading-[1.8] text-[#718096] mb-12">
            I presenti Termini disciplinano l'accesso e l'utilizzo della piattaforma ZenGest da parte degli psicologi e professionisti della salute mentale (Clienti). Un separato Accordo per il Trattamento dei Dati (DPA) regola gli obblighi in materia di protezione dei dati ed è incorporato per riferimento.
          </p>

          {/* PARTE A */}
          <div className="border-b border-slate-200 pb-4 mb-10">
            <h2 className="text-2xl font-semibold text-[#1e2a3a] tracking-tight">PARTE A — TERMINI DI SERVIZIO</h2>
          </div>

          {/* 1. Definizioni */}
          <Section number="1" title="Definizioni">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200 w-1/3">Termine</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Significato</th>
                  </tr>
                </thead>
                <tbody className="text-[#718096]">
                  <DefRow term="ZenGest / Noi / Societa" meaning="Unozen Srl, operatore della piattaforma ZenGest, con sede in Via Cesare Battisti 15, Torino, P. IVA 13448760010" />
                  <DefRow term="Cliente / Professionista" meaning="Lo psicologo o professionista della salute mentale che ha sottoscritto un abbonamento ZenGest" />
                  <DefRow term="Paziente" meaning="L'individuo che e in carico al professionista e i cui dati sono trattati tramite ZenGest" />
                  <DefRow term="Piattaforma" meaning="La piattaforma ZenGest, inclusi tutti i moduli AI, le API, le integrazioni e i flussi clinici" />
                  <DefRow term="Nota Clinica" meaning="Un output strutturato generato con assistenza AI dalla registrazione di una seduta, soggetto a revisione da parte del professionista" />
                  <DefRow term="Dati Sanitari" meaning="Dati particolari ai sensi dell'Art. 9 GDPR relativi alla salute fisica o mentale di una persona" />
                </tbody>
              </table>
            </div>
          </Section>

          {/* 2. Natura della Piattaforma */}
          <Section number="2" title="Natura della Piattaforma">
            <p className="mb-4">
              ZenGest e una piattaforma di supporto alla documentazione clinica e alla gestione dello studio. Non e un dispositivo medico, non fornisce diagnosi e non prescrive o raccomanda trattamenti.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>ZenGest affianca, senza sostituire, il giudizio clinico del professionista</li>
              <li>Tutti gli output generati dall'AI sono indicativi e devono essere revisionati dal professionista prima di essere inseriti nella cartella clinica o utilizzati per decisioni cliniche</li>
              <li>ZenGest non e un servizio di emergenza. In caso di crisi acuta, il paziente deve essere indirizzato ai servizi di emergenza competenti (numero unico 112)</li>
            </ul>
            <p className="mt-4">
              I pazienti non interagiscono direttamente con ZenGest. La piattaforma e uno strumento ad uso esclusivo del professionista.
            </p>
          </Section>

          {/* 3. Obblighi del Cliente */}
          <Section number="3" title="Obblighi del Cliente">
            <h4 className="font-semibold text-[#1e2a3a] mb-3">3.1 Responsabilita Clinica e Deontologica</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Il Cliente deve essere regolarmente iscritto all'Ordine degli Psicologi competente e in possesso di tutti i titoli necessari per l'esercizio della professione</li>
              <li>Il Cliente mantiene piena responsabilita clinica e deontologica per tutte le decisioni relative alla cura dei propri pazienti, indipendentemente dagli output generati da ZenGest</li>
              <li>Il Cliente deve assicurarsi che il proprio utilizzo di ZenGest sia conforme al Codice Deontologico degli Psicologi Italiani e alla normativa vigente</li>
            </ul>

            <h4 className="font-semibold text-[#1e2a3a] mb-3">3.2 Consenso del Paziente</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Il Cliente e responsabile dell'ottenimento del consenso informato dei propri pazienti al trattamento dei loro dati tramite ZenGest, incluso l'utilizzo di strumenti AI</li>
              <li>Il consenso deve includere: informazione sull'uso di strumenti AI per la generazione di note cliniche; finalita del trattamento; diritto di opposizione e cancellazione</li>
              <li>Per i pazienti minorenni o privi di capacita, il consenso deve essere ottenuto dal rappresentante legale</li>
            </ul>

            <h4 className="font-semibold text-[#1e2a3a] mb-3">3.3 Uso Appropriato</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>ZenGest puo essere utilizzato esclusivamente per scopi clinici e professionali legittimi</li>
              <li>E vietato utilizzare ZenGest per finalita di marketing, profilazione commerciale o comunicazioni non cliniche</li>
              <li>Il Cliente deve implementare adeguate misure di sicurezza per l'accesso al proprio account ZenGest (credenziali riservate, dispositivi sicuri)</li>
              <li>Il Cliente deve notificare immediatamente ZenGest in caso di accesso non autorizzato o violazione della sicurezza del proprio account</li>
            </ul>
          </Section>

          {/* 4. Diritti dell'Utente */}
          <Section number="4" title="Diritti dell'Utente e Recesso">
            <p className="mb-4">
              Il Cliente puo cancellare il proprio account in qualsiasi momento dall'interno della piattaforma. La cancellazione comporta la cessazione dell'accesso al servizio al termine del periodo di abbonamento in corso.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prima della cancellazione e possibile esportare tutti i propri dati clinici in formato leggibile</li>
              <li>I dati vengono conservati per 90 giorni dalla cancellazione, dopodiche vengono eliminati in modo sicuro, salvo obblighi di conservazione previsti dalla legge</li>
              <li>Le richieste di esercizio dei diritti GDPR (accesso, rettifica, cancellazione, portabilita) possono essere inviate a hello@zengest.it</li>
            </ul>
          </Section>

          {/* 5. Trasparenza e Limiti dell'AI */}
          <Section number="5" title="Trasparenza e Limiti dell'AI">
            <p className="mb-4">Il Cliente deve comprendere i seguenti limiti dei sistemi AI di ZenGest:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>I sistemi AI possono produrre output incompleti, imprecisi o insufficientemente sfumati: la revisione clinica e sempre necessaria</li>
              <li>La qualita delle note generate dipende dalla qualita e chiarezza della registrazione audio o del testo inserito</li>
              <li>ZenGest non garantisce la conformita degli output alle specifiche esigenze di ogni singolo orientamento terapeutico o sistema nosografico</li>
              <li>I dati del paziente non vengono mai utilizzati per addestrare modelli AI di terzi: questa e una garanzia contrattuale inclusa in tutti i piani</li>
            </ul>
          </Section>

          {/* 6. Proprieta Intellettuale */}
          <Section number="6" title="Proprieta Intellettuale">
            <ul className="list-disc pl-6 space-y-2">
              <li>La piattaforma ZenGest, inclusi tutti i modelli AI, i protocolli clinici, le interfacce, le API e la documentazione, e di proprieta esclusiva di Unozen Srl</li>
              <li>I dati clinici, le note generate e le cartelle dei pazienti inseriti dal Cliente appartengono al Cliente e ai suoi pazienti, nel rispetto del DPA</li>
              <li>Unozen Srl si riserva il diritto di utilizzare dati anonimizzati e aggregati non identificabili per migliorare le prestazioni della piattaforma, nel rispetto della normativa applicabile</li>
              <li>E vietato reverse-engineering, rivendita, sub-licenza o replica della piattaforma ZenGest senza previo consenso scritto di Unozen Srl</li>
            </ul>
          </Section>

          {/* 7. Livelli di Servizio */}
          <Section number="7" title="Livelli di Servizio e Supporto">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200 w-2/5">Metrica</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Impegno</th>
                  </tr>
                </thead>
                <tbody className="text-[#718096]">
                  <DefRow term="Disponibilita piattaforma" meaning="99% mensile (escluse manutenzioni programmate)" />
                  <DefRow term="Finestra di manutenzione" meaning="Domenica 02:00-06:00 CET (comunicata in anticipo)" />
                  <DefRow term="Risposta incidenti critici" meaning="Entro 4 ore (P1: piattaforma non disponibile)" />
                  <DefRow term="Supporto standard" meaning="Entro 1 giorno lavorativo via hello@zengest.it" />
                  <DefRow term="Backup dati" meaning="Giornaliero con replica geografica in UE" />
                </tbody>
              </table>
            </div>
          </Section>

          {/* 8. Responsabilita */}
          <Section number="8" title="Responsabilita e Manleva">
            <p className="mb-4">
              La responsabilita di Unozen Srl nei confronti dei Clienti e limitata al totale dei corrispettivi pagati dal Cliente nei 12 mesi precedenti il sinistro, salvo i casi di dolo, colpa grave o violazione degli obblighi in materia di protezione dei dati.
            </p>

            <h4 className="font-semibold text-[#1e2a3a] mb-3">8.1 ZenGest non e responsabile per:</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Decisioni cliniche adottate dal Cliente, indipendentemente dagli output AI consultati</li>
              <li>Danni derivanti da un utilizzo improprio della piattaforma o dal mancato rispetto delle presenti condizioni</li>
              <li>Interruzioni del servizio causate da guasti di infrastrutture terze (cloud provider, connettivita), purche ZenGest abbia rispettato i propri obblighi SLA</li>
            </ul>

            <h4 className="font-semibold text-[#1e2a3a] mb-3">8.2 Manleva del Cliente</h4>
            <p>
              Il Cliente si impegna a manlevare Unozen Srl da qualsiasi pretesa derivante da: esercizio non autorizzato della professione; mancato ottenimento del consenso del paziente; violazione delle presenti Condizioni; utilizzo della piattaforma per scopi non clinici.
            </p>
          </Section>

          {/* 9. Durata e Recesso */}
          <Section number="9" title="Durata, Recesso e Offboarding">
            <ul className="list-disc pl-6 space-y-2">
              <li>I piani mensili si rinnovano automaticamente ogni mese; i piani annuali si rinnovano ogni 12 mesi, salvo disdetta</li>
              <li>Il downgrade o la cancellazione dell'abbonamento e disponibile al rinnovo del periodo in corso</li>
              <li>In caso di violazione grave delle presenti condizioni, ZenGest si riserva il diritto di sospendere o terminare l'account con preavviso di 14 giorni</li>
              <li>A seguito della cancellazione, ZenGest fornira un export completo dei dati entro 30 giorni ed eliminera in modo sicuro tutti i dati entro 90 giorni, salvo obblighi di conservazione legale</li>
            </ul>
          </Section>

          {/* 10. Legge Applicabile */}
          <Section number="10" title="Legge Applicabile e Foro Competente">
            <p>
              Le presenti Condizioni sono disciplinate dalla legge italiana. Per qualsiasi controversia relativa all'interpretazione o all'esecuzione delle presenti Condizioni, le parti si impegnano a ricercare una soluzione bonaria. In mancanza di accordo, la controversia sara deferita al Foro di Torino, che avra competenza esclusiva, fatta salva la competenza obbligatoria del foro del consumatore ove applicabile. Il Regolamento (UE) 2016/679 (GDPR) e il D.lgs. 196/2003 (Codice Privacy) si applicano integralmente al trattamento dei dati personali.
            </p>
          </Section>

          {/* PARTE B */}
          <div className="border-b border-slate-200 pb-4 mb-10 mt-16">
            <h2 className="text-2xl font-semibold text-[#1e2a3a] tracking-tight">PARTE B — SICUREZZA E CONFORMITA</h2>
          </div>

          {/* 11. Governance della Sicurezza */}
          <Section number="11" title="Governance della Sicurezza">
            <p className="mb-6">
              Unozen Srl mantiene un sistema di gestione della sicurezza delle informazioni allineato ai principi ISO 27001. La governance della sicurezza e responsabilita congiunta del CTO e del Responsabile della Protezione dei Dati (RPD), con revisioni periodiche.
            </p>

            <h4 className="font-semibold text-[#1e2a3a] mb-3">Quadro di Conformita</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Framework</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Stato</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Ambito</th>
                  </tr>
                </thead>
                <tbody className="text-[#718096]">
                  {[
                    ["GDPR Art. 9", "Conforme", "Dati sanitari: pseudonimizzazione, privacy by design, DPA con tutti i fornitori"],
                    ["EU AI Act", "In implementazione", "Classificazione del rischio completata; misure di trasparenza e supervisione attive"],
                    ["ISO 27001", "Allineato", "ISMS implementato; roadmap di certificazione formale in corso"],
                    ["Codice Deontologico Psicologi", "Conforme", "Strumento di supporto al professionista; responsabilita clinica sempre in capo al psicologo"],
                  ].map(([fw, status, scope]) => (
                    <tr key={fw} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-[#1e2a3a]">{fw}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          status === "Conforme" ? "bg-green-50 text-green-700" :
                          status === "Allineato" ? "bg-blue-50 text-blue-700" :
                          "bg-amber-50 text-amber-700"
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 12. Cifratura dei Dati */}
          <Section number="12" title="Cifratura dei Dati">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200 w-2/5">Contesto</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Standard</th>
                  </tr>
                </thead>
                <tbody className="text-[#718096]">
                  <DefRow term="Dati a riposo" meaning="AES-256 (chiavi gestite tramite KMS; server localizzati in UE)" />
                  <DefRow term="Dati in transito" meaning="TLS 1.2 / TLS 1.3 (obbligatorio; protocolli piu vecchi disabilitati)" />
                  <DefRow term="Registrazioni audio" meaning="Cifrate in transito e a riposo; eliminate dopo l'elaborazione salvo archiviazione esplicita" />
                  <DefRow term="Cifratura database" meaning="Cifratura a livello di colonna per i campi contenenti dati sanitari" />
                  <DefRow term="Backup" meaning="AES-256 su tutti i backup; replica geografica in UE" />
                </tbody>
              </table>
            </div>
          </Section>

          {/* 13. Controllo degli Accessi */}
          <Section number="13" title="Controllo degli Accessi">
            <ul className="list-disc pl-6 space-y-2">
              <li>Controllo degli accessi basato su ruoli (RBAC) applicato a tutti i componenti della piattaforma</li>
              <li>Ogni professionista accede esclusivamente ai dati dei propri pazienti; l'isolamento tra account e garantito a livello infrastrutturale</li>
              <li>Autenticazione a due fattori (2FA) disponibile e raccomandata per tutti gli account</li>
              <li>Log di accesso conservati per 24 mesi; rilevamento anomalie con alert giornalieri</li>
              <li>I diritti di accesso dei dipendenti Unozen Srl sono rivisti trimestralmente e revocati immediatamente al termine del rapporto di lavoro</li>
            </ul>
          </Section>

          {/* 14. Gestione delle Vulnerabilita */}
          <Section number="14" title="Gestione delle Vulnerabilita">
            <ul className="list-disc pl-6 space-y-2">
              <li>Scansione automatica delle vulnerabilita: giornaliera su tutta l'infrastruttura di produzione</li>
              <li>Penetration testing: annuale da parte di terzi esterni; risultati revisionati entro 5 giorni lavorativi</li>
              <li>Patch management: vulnerabilita critiche risolte entro 48 ore; alte entro 7 giorni; medie entro 30 giorni</li>
              <li>Monitoraggio delle dipendenze: tutte le librerie di terzi sono monitorate tramite strumenti automatici (tracciamento CVE)</li>
              <li>Responsible disclosure: per segnalare vulnerabilita contattare hello@zengest.it con oggetto "Security Disclosure"</li>
            </ul>
          </Section>

          {/* 15. Risposta agli Incidenti */}
          <Section number="15" title="Risposta agli Incidenti">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200 w-2/5">Fase</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Impegno ZenGest</th>
                  </tr>
                </thead>
                <tbody className="text-[#718096]">
                  <DefRow term="Rilevamento e Triage" meaning="Alerting automatico; incidenti P1 riconosciuti entro 30 minuti" />
                  <DefRow term="Contenimento" meaning="Sistemi interessati isolati entro 2 ore dal rilevamento P1" />
                  <DefRow term="Notifica al Cliente" meaning="Entro 24 ore dalla conferma della violazione" />
                  <DefRow term="Notifica all'Autorita" meaning="Entro 72 ore all'Autorita Garante per la Protezione dei Dati Personali (Art. 33 GDPR)" />
                  <DefRow term="Notifica all'Interessato" meaning="Come previsto dall'Art. 34 GDPR, in coordinamento con il Cliente" />
                  <DefRow term="Post-Incident Review" meaning="Analisi della causa radice consegnata entro 5 giorni lavorativi" />
                </tbody>
              </table>
            </div>
          </Section>

          {/* 16. Sub-responsabili */}
          <Section number="16" title="Sub-responsabili del Trattamento">
            <p className="mb-4">
              Tutti i sub-responsabili con accesso a dati personali o sanitari devono soddisfare i seguenti requisiti minimi prima dell'ingaggio:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Accordo per il Trattamento dei Dati (DPA) firmato, con Clausole Contrattuali Standard GDPR ove richiesto</li>
              <li>Server e infrastruttura di elaborazione localizzati nell'Unione Europea</li>
              <li>Nessun utilizzo dei dati dei pazienti per l'addestramento di modelli AI</li>
              <li>Valutazione della sicurezza annuale da parte del team tecnico di Unozen Srl</li>
            </ul>
            <p>
              L'elenco aggiornato dei sub-responsabili attivi e disponibile su richiesta scrivendo a hello@zengest.it. I Clienti saranno informati con 30 giorni di anticipo di qualsiasi nuovo sub-responsabile e potranno opporsi.
            </p>
          </Section>

          {/* 17. Continuita Operativa */}
          <Section number="17" title="Continuita Operativa e Disaster Recovery">
            <ul className="list-disc pl-6 space-y-2">
              <li>Recovery Time Objective (RTO): 4 ore in caso di guasto critico della piattaforma</li>
              <li>Recovery Point Objective (RPO): 1 ora (replica continua; ripristino point-in-time disponibile)</li>
              <li>Infrastruttura di standby mantenuta in una regione cloud secondaria all'interno dell'UE</li>
              <li>Test di Disaster Recovery condotti semestralmente; risultati revisionati dal team di leadership</li>
            </ul>
          </Section>

          {/* 18. Misure di Sicurezza AI */}
          <Section number="18" title="Misure di Sicurezza Specifiche per l'AI">
            <p className="mb-4">Data l'architettura AI di ZenGest, si applicano i seguenti controlli aggiuntivi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prevenzione del prompt injection: tutti gli input sono sanificati e validati prima di raggiungere i modelli AI</li>
              <li>Filtraggio degli output: le risposte AI sono sottoposte a classificatori di sicurezza prima della consegna</li>
              <li>Pseudonimizzazione automatica: i dati identificativi del paziente vengono pseudonimizzati prima di qualsiasi elaborazione AI</li>
              <li>Isolamento dei dati tra account: l'inferenza del modello AI e stateless; non vi e contaminazione di dati tra account diversi</li>
              <li>Nessun dato clinico trasmesso a provider di modelli terzi per l'addestramento</li>
              <li>Log di audit AI: tutte le richieste di inferenza e i relativi output sono registrati con piena tracciabilita</li>
            </ul>
          </Section>

          {/* 19. Sicurezza Fisica */}
          <Section number="19" title="Sicurezza Fisica e Organizzativa">
            <ul className="list-disc pl-6 space-y-2">
              <li>ZenGest e una piattaforma cloud-native; nessun dato del paziente e elaborato su dispositivi dei dipendenti</li>
              <li>Tutti i dipendenti e collaboratori di Unozen Srl completano una formazione obbligatoria sulla sicurezza informatica all'assunzione e annualmente</li>
              <li>Policy di scrivania pulita e schermo bloccato per tutti i lavoratori da remoto e in ufficio</li>
              <li>Accesso fisico ai datacenter gestito dal provider cloud certificato ISO 27001 con infrastruttura in UE</li>
            </ul>
          </Section>

          {/* 20. Contatti per la Sicurezza */}
          <Section number="20" title="Contatti per la Sicurezza e la Privacy">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200 w-2/5">Tipo di Contatto</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1e2a3a] border-b border-slate-200">Dettagli</th>
                  </tr>
                </thead>
                <tbody className="text-[#718096]">
                  <DefRow term="Incidenti di sicurezza e violazioni" meaning="hello@zengest.it (oggetto: Security Incident)" />
                  <DefRow term="Responsible disclosure / segnalazione bug" meaning="hello@zengest.it (oggetto: Security Disclosure)" />
                  <DefRow term="Richieste di conformita e audit" meaning="hello@zengest.it (oggetto: Compliance)" />
                  <DefRow term="Esercizio diritti GDPR" meaning="hello@zengest.it (oggetto: Diritti GDPR)" />
                  <DefRow term="PEC aziendale" meaning="UNOZEN@NAMIRIALPEC.IT" />
                </tbody>
              </table>
            </div>
          </Section>

          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-[#718096]">
              Unozen Srl &nbsp;|&nbsp; Via Cesare Battisti 15, Torino &nbsp;|&nbsp; P. IVA 13448760010 &nbsp;|&nbsp; <a href="mailto:hello@zengest.it" className="text-blue-600 hover:text-blue-800 transition-colors">hello@zengest.it</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-[#1e2a3a] mb-4 tracking-tight">
        {number}. {title}
      </h3>
      <div className="text-[15px] leading-[1.8] text-[#718096]">
        {children}
      </div>
    </section>
  );
}

function DefRow({ term, meaning }: { term: string; meaning: string }) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-4 py-3 font-medium text-[#1e2a3a]">{term}</td>
      <td className="px-4 py-3">{meaning}</td>
    </tr>
  );
}
