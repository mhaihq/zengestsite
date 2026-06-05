import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

export function Termini() {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Sicurezza & Termini · ZenGest"
        useExactTitle={true}
        description="Condizioni Generali di Servizio di ZenGest. Trattamento dati clinici, GDPR Art. 9, responsabilità e sicurezza per professionisti della salute mentale."
        path="/sicurezza"
      />

      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
            Documento legale
          </div>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-[1.1] tracking-[-0.02em] mb-3">
            Condizioni Generali di Servizio
          </h1>
          <p className="font-['DM_Sans'] text-sm text-slate-400">Ultimo aggiornamento: [DATA]</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none font-['DM_Sans']" style={{ lineHeight: "1.75" }}>

            <Article title="Art. 1 — Definizioni">
              <dl className="space-y-3 mt-4">
                {[
                  ["Servizio", "la piattaforma ZenGest, accessibile all'indirizzo app.zengest.it, che fornisce strumenti di supporto alla documentazione clinica basati su intelligenza artificiale per professionisti della salute mentale."],
                  ["Fornitore", "Unozen di Matteo Grassi e Alessandro Lombardo, con sede in [INDIRIZZO], P.IVA [NUMERO] — titolare e gestore del Servizio."],
                  ["Infrastruttura", "HANA Health Inc., società di diritto statunitense (Delaware), che fornisce l'infrastruttura tecnologica di voice AI e di elaborazione dati su cui si basa il Servizio, in qualità di sub-responsabile del trattamento."],
                  ["Utente o Professionista", "lo psicologo, psicoterapeuta o altro professionista della salute mentale che si registra e utilizza il Servizio."],
                  ["Paziente", "la persona assistita dall'Utente, i cui dati possono essere trattati nell'ambito dell'utilizzo del Servizio."],
                  ["Dati Personali", "qualsiasi informazione relativa a una persona fisica identificata o identificabile, ai sensi dell'Art. 4 del Regolamento (UE) 2016/679 (GDPR)."],
                  ["DPA", "l'Accordo per il Trattamento dei Dati, disponibile all'indirizzo zengest.it/dpa."],
                ].map(([term, def]) => (
                  <div key={term} className="flex gap-3">
                    <dt className="font-semibold text-[#00122F] shrink-0 min-w-[180px]">"{term}"</dt>
                    <dd className="text-slate-600 text-sm leading-relaxed">— {def}</dd>
                  </div>
                ))}
              </dl>
            </Article>

            <Article title="Art. 2 — Oggetto e natura del Servizio">
              <p>2.1. ZenGest è uno strumento di supporto strumentale alla documentazione clinica. Il Servizio non formula diagnosi, non effettua profilazione automatizzata dei pazienti e non prende decisioni autonome sul percorso clinico.</p>
              <p>2.2. L'Utente mantiene piena responsabilità clinica, deontologica e legale per ogni decisione terapeutica e per l'accuratezza della documentazione prodotta.</p>
              <p>2.3. I contenuti generati dall'intelligenza artificiale costituiscono bozze e suggerimenti che devono essere sempre verificati, integrati e validati dal Professionista prima di qualsiasi utilizzo clinico <em>(principio human-in-the-loop)</em>.</p>
            </Article>

            <Article title="Art. 3 — Registrazione e accesso">
              <p>3.1. L'accesso al Servizio richiede la registrazione di un account. Registrandosi, l'Utente dichiara di essere un professionista della salute mentale abilitato all'esercizio della professione.</p>
              <p>3.2. L'Utente è responsabile della custodia delle proprie credenziali di accesso e di ogni attività svolta tramite il proprio account.</p>
              <Callout>
                <strong>Accettazione contestuale.</strong> Con la registrazione, l'Utente accetta le presenti Condizioni Generali di Servizio, l'Informativa Privacy e l'Accordo per il Trattamento dei Dati (DPA). Tale accettazione, effettuata in forma elettronica ai sensi dell'Art. 28(9) GDPR, ha piena validità giuridica.
              </Callout>
            </Article>

            <Article title="Art. 4 — Obblighi dell'Utente">
              <p>L'Utente si impegna a:</p>
              <ul>
                <li>utilizzare il Servizio in conformità con le normative vigenti, il Codice Deontologico degli Psicologi Italiani e le linee guida dell'Ordine di appartenenza;</li>
                <li>ottenere il consenso informato esplicito dei propri pazienti prima di utilizzare il Servizio per il trattamento dei loro dati, come previsto dall'Art. 9.2.a GDPR e dalla L. 132/2025;</li>
                <li>aggiornare la propria informativa privacy per includere l'utilizzo di strumenti basati su intelligenza artificiale;</li>
                <li>verificare e validare ogni contenuto generato dall'AI prima dell'utilizzo clinico;</li>
                <li>non inserire nel Servizio dati di minori senza le dovute autorizzazioni previste dalla legge;</li>
                <li>non utilizzare il Servizio per finalità diverse dalla documentazione clinica professionale;</li>
                <li>valutare l'opportunità di effettuare una Valutazione d'Impatto sulla Protezione dei Dati (DPIA) ai sensi dell'Art. 35 GDPR.</li>
              </ul>
            </Article>

            <Article title="Art. 5 — Trattamento dei dati personali">
              <p>5.1. Per quanto riguarda i dati dei Pazienti, l'Utente agisce in qualità di Titolare del Trattamento ai sensi del GDPR. Il Fornitore agisce in qualità di Responsabile del Trattamento ai sensi dell'Art. 28 GDPR.</p>
              <p>5.2. I termini e le condizioni del trattamento dei dati sono disciplinati dall'Accordo per il Trattamento dei Dati (DPA), disponibile all'indirizzo <span className="text-[#3B6FD4]">zengest.it/dpa</span>, che costituisce parte integrante e sostanziale delle presenti Condizioni.</p>
              <p>5.3. Il DPA è disponibile per il download in formato PDF.</p>
            </Article>

            <Article title="Art. 6 — Proprietà intellettuale">
              <p>6.1. Tutti i diritti di proprietà intellettuale sul Servizio, inclusi software, interfacce, algoritmi e marchi, restano di esclusiva titolarità del Fornitore.</p>
              <p>6.2. I contenuti clinici prodotti dall'Utente tramite il Servizio restano di proprietà dell'Utente. Il Fornitore non acquisisce alcun diritto su tali contenuti, fatta eccezione per quanto necessario all'erogazione del Servizio.</p>
            </Article>

            <Article title="Art. 7 — Limitazioni di responsabilità">
              <p>7.1. Il Fornitore non è responsabile per decisioni cliniche prese dall'Utente sulla base dei contenuti generati dal Servizio.</p>
              <p>7.2. Il Fornitore si impegna a garantire la disponibilità del Servizio con ragionevole diligenza, ma non garantisce l'assenza di interruzioni o errori.</p>
              <p>7.3. La responsabilità complessiva del Fornitore nei confronti dell'Utente è limitata all'importo corrisposto dall'Utente nei 12 mesi precedenti l'evento che ha dato origine alla responsabilità.</p>
              <p>7.4. Il Fornitore non è responsabile per danni indiretti, consequenziali, punitivi o per perdita di profitto.</p>
            </Article>

            <Article title="Art. 8 — Corrispettivo e fatturazione">
              <p>8.1. Le condizioni economiche del Servizio sono pubblicate sul sito zengest.it e comunicate all'Utente al momento della registrazione.</p>
              <p>8.2. Il Fornitore si riserva il diritto di modificare i prezzi con preavviso di almeno 30 giorni. L'Utente che non intenda accettare le nuove condizioni potrà recedere dal Servizio senza penali.</p>
            </Article>

            <Article title="Art. 9 — Durata e recesso">
              <p>9.1. Le presenti Condizioni hanno durata indeterminata a partire dalla data di registrazione.</p>
              <p>9.2. L'Utente può recedere in qualsiasi momento cancellando il proprio account o inviando comunicazione a <span className="text-[#3B6FD4]">supporto@zengest.it</span>.</p>
              <p>9.3. Il Fornitore può sospendere o terminare l'accesso dell'Utente in caso di violazione delle presenti Condizioni, con comunicazione motivata.</p>
              <p>9.4. In caso di cessazione, si applicano le disposizioni sulla restituzione e cancellazione dei dati previste dal DPA.</p>
            </Article>

            <Article title="Art. 10 — Modifiche alle Condizioni">
              <p>10.1. Il Fornitore si riserva il diritto di modificare le presenti Condizioni con preavviso di almeno 30 giorni tramite comunicazione all'indirizzo email dell'Utente.</p>
              <p>10.2. L'utilizzo continuato del Servizio dopo la comunicazione delle modifiche costituisce accettazione delle nuove Condizioni.</p>
            </Article>

            <Article title="Art. 11 — Legge applicabile e foro competente">
              <p>11.1. Le presenti Condizioni sono regolate dalla legge italiana.</p>
              <p>11.2. Per qualsiasi controversia derivante dalle presenti Condizioni sarà competente il Foro di [CITTÀ], salvo diversa disposizione inderogabile di legge.</p>
            </Article>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 pb-10 border-b border-slate-100 last:border-0 last:mb-0">
      <h2 className="font-['DM_Sans'] text-base font-semibold text-[#00122F] mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 text-sm text-slate-600 leading-relaxed">
      {children}
    </div>
  );
}
