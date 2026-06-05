import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

export function DPA() {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="DPA · Accordo per il Trattamento dei Dati · ZenGest"
        useExactTitle={true}
        description="Accordo per il Trattamento dei Dati ai sensi dell'Art. 28 GDPR. Ruoli, misure di sicurezza, sub-responsabili e garanzie zero-training per ZenGest."
        path="/dpa"
      />

      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
            Art. 28 GDPR
          </div>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.1] tracking-[-0.02em] mb-3">
            Accordo per il Trattamento dei Dati
          </h1>
          <p className="font-['DM_Sans'] text-sm text-slate-400 mb-1">
            ai sensi dell'Art. 28 del Regolamento (UE) 2016/679 (GDPR)
          </p>
          <p className="font-['DM_Sans'] text-xs text-slate-400">
            Ultimo aggiornamento: [DATA] · Parte integrante delle{" "}
            <a href="/sicurezza" className="text-[#3B6FD4] hover:underline">Condizioni Generali di Servizio</a>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto font-['DM_Sans'] text-sm text-slate-600 leading-relaxed space-y-10">

          <Article title="Art. 1 — Ruoli delle parti">
            <p>1.1. Ai fini del presente Accordo, l'Utente ("Professionista") agisce in qualità di <strong className="text-[#00122F]">Titolare del Trattamento</strong>. Il Fornitore ("ZenGest" / Unozen) agisce in qualità di <strong className="text-[#00122F]">Responsabile del Trattamento</strong> ai sensi dell'Art. 28 GDPR.</p>
            <p>1.2. Il presente Accordo disciplina gli obblighi reciproci delle parti in relazione al trattamento dei dati personali nell'ambito dell'erogazione del Servizio.</p>
            <ChainDiagram />
          </Article>

          <Article title="Art. 2 — Oggetto e finalità del trattamento">
            <p>2.1. Il Responsabile tratta i dati personali esclusivamente per le seguenti finalità:</p>
            <ul>
              <li>trascrizione di registrazioni audio di sedute cliniche;</li>
              <li>generazione di bozze di documentazione clinica (appunti di seduta, schede CBT/DBT, piani terapeutici);</li>
              <li>pseudonimizzazione e strutturazione dei dati clinici;</li>
              <li>archiviazione sicura della documentazione generata.</li>
            </ul>
            <p>2.2. Il Responsabile non tratterà i dati per finalità diverse da quelle sopra indicate, salvo diversa istruzione documentata del Titolare o obbligo di legge.</p>
          </Article>

          <Article title="Art. 3 — Categorie di dati trattati">
            <p>3.1. <strong className="text-[#00122F]">Dati personali comuni dell'Utente:</strong> nome, cognome, email, dati di fatturazione.</p>
            <p>3.2. <strong className="text-[#00122F]">Categorie particolari di dati (Art. 9 GDPR)</strong> relativi ai Pazienti dell'Utente:</p>
            <ul>
              <li>dati relativi alla salute mentale e fisica;</li>
              <li>trascrizioni di sedute psicoterapeutiche;</li>
              <li>valutazioni cliniche e anamnesi;</li>
              <li>piani terapeutici e annotazioni cliniche.</li>
            </ul>
            <p>3.3. <strong className="text-[#00122F]">Categorie di interessati:</strong> Utenti (professionisti) e Pazienti degli Utenti.</p>
          </Article>

          <Article title="Art. 4 — Durata del trattamento">
            <p>Il trattamento dei dati ha inizio con l'attivazione del Servizio e prosegue per tutta la durata del rapporto contrattuale. Al termine, si applicano le disposizioni dell'Art. 11 del presente Accordo.</p>
          </Article>

          <Article title="Art. 5 — Obblighi del Responsabile">
            <p>Il Responsabile si impegna a:</p>
            <ul>
              <li>trattare i dati personali esclusivamente sulla base delle istruzioni documentate del Titolare, salvo obblighi di legge;</li>
              <li>garantire che le persone autorizzate al trattamento dei dati si siano impegnate alla riservatezza o siano soggette a un obbligo legale di riservatezza;</li>
              <li>adottare tutte le misure di sicurezza tecniche e organizzative richieste dall'Art. 32 GDPR;</li>
              <li>non ricorrere a un altro responsabile del trattamento (sub-responsabile) senza previa autorizzazione generale scritta del Titolare. Il Titolare autorizza sin d'ora il ricorso a HANA Health Inc. come sub-responsabile principale per l'infrastruttura tecnologica del Servizio;</li>
              <li>assistere il Titolare nel dare seguito alle richieste di esercizio dei diritti degli interessati (Artt. 15–22 GDPR);</li>
              <li>assistere il Titolare nel garantire il rispetto degli obblighi di cui agli Artt. 32–36 GDPR;</li>
              <li>cancellare o restituire tutti i dati personali al termine del Servizio, su scelta del Titolare;</li>
              <li>mettere a disposizione del Titolare tutte le informazioni necessarie per dimostrare la conformità agli obblighi di cui all'Art. 28 GDPR e consentire audit e ispezioni.</li>
            </ul>
          </Article>

          <Article title="Art. 6 — Misure di sicurezza">
            <p>6.1. Il Responsabile, anche tramite il sub-responsabile HANA Health Inc., adotta le seguenti misure tecniche e organizzative:</p>
            <ul>
              <li>crittografia dei dati in transito (TLS 1.2+) e a riposo (AES-256);</li>
              <li>pseudonimizzazione dei dati clinici prima dell'invio ai servizi di elaborazione AI;</li>
              <li>hosting su infrastruttura AWS nell'Unione Europea (regione eu-west-1), gestita tramite HANA Health;</li>
              <li>trascrizione audio su server HANA Health nell'UE tramite modelli open-source;</li>
              <li>eliminazione automatica e definitiva dei file audio al completamento della trascrizione;</li>
              <li>controllo degli accessi basato su ruoli e autenticazione sicura;</li>
              <li>backup crittografati con retention definita;</li>
              <li>monitoraggio continuo e logging degli accessi ai dati.</li>
            </ul>
          </Article>

          <Article title="Art. 7 — Sub-responsabili del trattamento">
            <p>7.1. Il Titolare autorizza in via generale il ricorso ai seguenti sub-responsabili:</p>
            <SubProcessorTable />
            <p>7.2. HANA Health Inc. agisce come sub-responsabile principale del trattamento. I servizi di infrastruttura (AWS), elaborazione AI (Anthropic) e trascrizione sono erogati tramite HANA Health, che ha sottoscritto DPA con ciascun sub-responsabile ulteriore.</p>
            <p>7.3. Il Responsabile informerà il Titolare di qualsiasi modifica relativa all'aggiunta o sostituzione di sub-responsabili con un preavviso di 30 giorni, dando al Titolare la possibilità di opporsi.</p>
            <p>7.4. Il Responsabile garantisce che i sub-responsabili siano vincolati da obblighi di protezione dei dati equivalenti a quelli stabiliti nel presente Accordo.</p>
          </Article>

          <Article title="Art. 8 — Trasferimenti internazionali">
            <p>8.1. I dati clinici dei Pazienti sono trattati su infrastruttura situata nell'Unione Europea (AWS eu-west-1), gestita tramite HANA Health Inc.</p>
            <p>8.2. HANA Health Inc. è una società incorporata nel Delaware (USA). Il trasferimento di dati verso HANA Health avviene sulla base delle Clausole Contrattuali Standard della Commissione Europea (SCCs) e/o dell'EU-US Data Privacy Framework, ove applicabile. L'infrastruttura di elaborazione dei dati clinici resta nell'UE.</p>
            <p>8.3. L'utilizzo dell'API di Anthropic avviene tramite HANA Health con garanzie contrattuali che assicurano il non utilizzo dei dati per l'addestramento dei modelli AI (zero-training policy).</p>
            <p>8.4. Qualora si rendesse necessario un ulteriore trasferimento di dati verso paesi terzi, il Responsabile applicherà le garanzie previste dal Capo V del GDPR.</p>
          </Article>

          <Article title="Art. 9 — Notifica di violazione dei dati">
            <p>9.1. Il Responsabile notificherà al Titolare qualsiasi violazione dei dati personali (data breach) senza ingiustificato ritardo e, ove possibile, entro 48 ore dal momento in cui ne sia venuto a conoscenza.</p>
            <p>9.2. La notifica includerà: la natura della violazione, le categorie e il numero approssimativo di interessati coinvolti, le probabili conseguenze e le misure adottate o proposte per porvi rimedio.</p>
            <p>9.3. Il Responsabile assisterà il Titolare nell'adempimento degli obblighi di notifica al Garante (Art. 33 GDPR) e di comunicazione agli interessati (Art. 34 GDPR).</p>
          </Article>

          <Article title="Art. 10 — Audit e ispezioni">
            <p>10.1. Il Responsabile mette a disposizione del Titolare tutte le informazioni necessarie per dimostrare la conformità al presente Accordo e all'Art. 28 GDPR.</p>
            <p>10.2. Il Titolare ha diritto di effettuare audit e ispezioni, direttamente o tramite un revisore incaricato, con preavviso ragionevole di almeno 15 giorni lavorativi.</p>
            <p>10.3. Il Responsabile collaborerà pienamente durante tali audit, garantendo l'accesso alle informazioni e ai sistemi pertinenti.</p>
          </Article>

          <Article title="Art. 11 — Restituzione e cancellazione dei dati">
            <p>11.1. Al termine del rapporto contrattuale, il Responsabile, su istruzione del Titolare:</p>
            <ul>
              <li>restituirà tutti i dati personali in formato strutturato e leggibile; oppure</li>
              <li>cancellerà tutti i dati personali e le copie esistenti, salvo obblighi di conservazione previsti dalla legge.</li>
            </ul>
            <p>11.2. L'Utente può richiedere l'esportazione dei propri dati in qualsiasi momento durante la durata del Servizio.</p>
            <p>11.3. La cancellazione sarà completata entro 30 giorni dalla richiesta, salvo obblighi legali di conservazione.</p>
          </Article>

          <Article title="Art. 12 — Garanzia di non utilizzo per addestramento">
            <ZeroTrainingCallout />
            <p>12.1. Il Responsabile garantisce che i dati personali trattati nell'ambito del Servizio non vengono in alcun caso utilizzati per l'addestramento, il fine-tuning o il miglioramento di modelli di intelligenza artificiale.</p>
            <p>12.2. Tale garanzia si estende ai sub-responsabili del trattamento. In particolare, l'utilizzo dell'API di Anthropic (Claude) avviene con garanzia contrattuale di non utilizzo dei dati per il training.</p>
          </Article>

        </div>
      </section>

      <Footer />
    </div>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-10 border-b border-slate-100 last:border-0">
      <h2 className="font-['DM_Sans'] text-base font-semibold text-[#00122F] mb-4">{title}</h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function ChainDiagram() {
  const nodes = [
    { label: "Professionista", role: "Titolare" },
    { label: "ZenGest / Unozen", role: "Responsabile" },
    { label: "HANA Health Inc.", role: "Sub-responsabile" },
    { label: "AWS · Anthropic", role: "Sub-sub-responsabili" },
  ];
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-center gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center">
            <p className="font-semibold text-[#00122F] text-xs">{node.label}</p>
            <p className="text-slate-400 text-[11px] mt-0.5">{node.role}</p>
          </div>
          {i < nodes.length - 1 && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-slate-300">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

function SubProcessorTable() {
  const rows = [
    { name: "HANA Health Inc.", function: "Infrastruttura voice AI, elaborazione dati, orchestrazione servizi", location: "UE / US con garanzie contrattuali", dpa: "Sì" },
    { name: "Amazon Web Services", function: "Hosting, storage, database (tramite HANA Health)", location: "UE (eu-west-1)", dpa: "Sì (HANA ↔ AWS)" },
    { name: "Anthropic (API Claude)", function: "Elaborazione AI (tramite HANA Health)", location: "API con garanzie zero-training", dpa: "Sì (HANA ↔ Anthropic)" },
    { name: "Trascrizione (self-hosted)", function: "Speech-to-text (tramite HANA Health, modello open-source)", location: "UE — infrastruttura HANA", dpa: "N/A (server HANA)" },
  ];
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-slate-100">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="text-left px-4 py-3 font-semibold text-slate-500">Fornitore</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-500">Funzione</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-500">Località dati</th>
            <th className="text-left px-4 py-3 font-semibold text-slate-500">DPA</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
              <td className="px-4 py-3 font-medium text-[#00122F]">{row.name}</td>
              <td className="px-4 py-3 text-slate-500">{row.function}</td>
              <td className="px-4 py-3 text-slate-500">{row.location}</td>
              <td className="px-4 py-3 text-slate-500">{row.dpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ZeroTrainingCallout() {
  return (
    <div className="mb-4 bg-[#F0F5FF] border border-[#3B6FD4]/20 rounded-xl px-5 py-4">
      <p className="font-semibold text-[#00122F] text-sm mb-1">Zero-training policy.</p>
      <p className="text-slate-600 text-sm leading-relaxed">I dati personali trattati nell'ambito del Servizio non vengono in alcun caso utilizzati per l'addestramento, il fine-tuning o il miglioramento di modelli di intelligenza artificiale. Tale garanzia si estende a tutti i sub-responsabili del trattamento.</p>
    </div>
  );
}
