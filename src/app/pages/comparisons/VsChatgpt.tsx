'use client';

import { useState } from 'react';
import { Link } from 'react-router';
import { SEO } from '../../components/SEO';
import { Footer } from '../../components/Footer';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Check() {
  return (
    <div className="w-5 h-5 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function renderCellValue(value: string, isZengest: boolean) {
  if (value === '✓') {
    return (
      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#3B6FD4]/10 text-[#3B6FD4] text-[13px] font-semibold font-['DM_Sans']">
        ✓
      </span>
    );
  }
  if (value === '—') {
    return <span className="text-slate-300 font-['DM_Sans']">—</span>;
  }
  if (value === '— (US)') {
    return <span className="text-red-400 font-['DM_Sans'] text-sm">— (US)</span>;
  }
  if (value === 'Parziale' || value === 'Non verificabile' || value === 'Con input manuale') {
    return <span className="text-slate-400 italic font-['DM_Sans'] text-[12px]">{value}</span>;
  }
  if (value === 'Non per piani base/Plus') {
    return <span className="text-amber-600 font-['DM_Sans'] text-[12px]">{value}</span>;
  }
  return (
    <span className={`font-['DM_Sans'] text-sm ${isZengest ? 'text-slate-700' : 'text-slate-600'}`}>
      {value}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  { label: "Registrazione seduta", zengest: "✓", competitor: "—" },
  { label: "Trascrizione automatica", zengest: "✓", competitor: "—" },
  { label: "Anonimizzazione pre-AI", zengest: "✓", competitor: "—" },
  { label: "Server in Europa (GDPR)", zengest: "✓", competitor: "— (US)" },
  { label: "DPA per liberi professionisti", zengest: "✓", competitor: "Non per piani base/Plus" },
  { label: "Conforme codice deontologico CNOP", zengest: "✓", competitor: "Non verificabile" },
  { label: "Memoria sedute precedenti", zengest: "✓", competitor: "—" },
  { label: "Terminologia clinica italiana", zengest: "✓", competitor: "Parziale" },
  { label: "Note cliniche in 60 secondi", zengest: "✓", competitor: "Con input manuale" },
  { label: "Analisi pattern nel tempo", zengest: "✓", competitor: "—" },
  { label: "Audio eliminato dopo trascrizione", zengest: "✓", competitor: "N/A" },
  { label: "Integrazione workflow clinico", zengest: "✓", competitor: "—" },
];

const faq = [
  {
    q: "Posso usare ChatGPT se anonimizzzo i dati io manualmente prima di incollare?",
    a: "È meglio di nulla, ma presenta ancora rischi. L'anonimizzazione manuale è soggetta a errori — un nome, una città, una diagnosi specifica possono essere sufficienti per identificare un paziente in un contesto di piccola comunità. Inoltre, la responsabilità dell'anonimizzazione corretta ricade interamente su di te, senza garanzie sistemiche.",
  },
  {
    q: "OpenAI non dice che i dati vengono usati per addestrare i modelli se disabilito l'opzione?",
    a: "OpenAI permette di disabilitare l'uso dei dati per l'addestramento, ma questo non risolve il problema del trasferimento dei dati negli Stati Uniti né la mancanza di un DPA adeguato per il trattamento di dati sanitari sensibili.",
  },
  {
    q: "ZenGest usa ChatGPT o altri modelli OpenAI nel backend?",
    a: "No. ZenGest usa modelli AI con server esclusivamente in Europa, selezionati specificamente per garantire la conformità GDPR nel trattamento di dati sanitari.",
  },
  {
    q: "Se uso ChatGPT solo per riformulare appunti generici — senza nomi — è ok?",
    a: "Dipende da cosa contengono gli appunti. Età, diagnosi, durata della terapia, farmaci, situazione familiare, professione — anche senza nome, possono essere sufficienti per riidentificare un individuo. Il GDPR non richiede che i dati includano il nome per essere considerati personali.",
  },
  {
    q: "Il Garante può davvero sanzionare uno psicologo per questo?",
    a: "Sì. Il Garante ha già emesso sanzioni per trattamento non conforme di dati sanitari da parte di professionisti sanitari. Le sanzioni per persone fisiche possono arrivare a 20 milioni di euro o al 4% del fatturato annuo globale — anche se nella pratica per liberi professionisti le cifre sono molto più contenute, l'apertura di un'istruttoria è già un problema serio.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function VsChatgpt() {
  const [openFaq, setOpenFaq] = useState<boolean[]>(faq.map(() => false));

  function toggleFaq(index: number) {
    setOpenFaq(prev => prev.map((open, i) => (i === index ? !open : open)));
  }

  return (
    <>
      <SEO
        title="ChatGPT per le note cliniche: rischi GDPR e alternative conformi | ZenGest"
        description="Usare ChatGPT per documentare sedute psicologiche è pratico ma probabilmente una violazione del GDPR. Cosa rischi e come fare in modo conforme."
        path="/vs/chatgpt"
        useExactTitle
      />

      <div className="bg-white min-h-screen font-['DM_Sans']">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-6 pt-14 pb-10">
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] text-xs font-semibold font-['DM_Sans'] px-3 py-1.5 rounded-full mb-6">
              ZenGest vs ChatGPT
            </div>

            <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-tight mb-4">
              ChatGPT per le note cliniche:<br />
              rischi, limiti e{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                alternative.
              </span>
            </h1>

            <p className="font-['DM_Sans'] text-base text-slate-500 mb-4 leading-relaxed">
              Molti psicologi italiani usano ChatGPT per scrivere note cliniche. È pratico. È anche probabilmente una violazione del GDPR.
            </p>

            <p className="font-['DM_Sans'] text-[11px] text-slate-400">
              Aggiornato: maggio 2026
            </p>
          </div>
        </section>

        {/* ── Main content ────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-6 py-12">

          {/* Section 1 — Intro paragraphs */}
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Succede. Finisce la seduta, apri ChatGPT, scrivi quello che ricordi del paziente, chiedi una nota clinica. In dieci secondi hai qualcosa di leggibile. Sembra un trucco utile.
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            E in parte lo è. ChatGPT scrive bene. Costa poco o niente. Semplifica un lavoro noioso.
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Il problema non è la qualità dell'output. Il problema è quello che succede ai dati del tuo paziente nel momento in cui premi invio.
          </p>

          {/* Section 2 — GDPR */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-4">
            Il nodo GDPR che la maggior parte degli psicologi ignora
          </h2>

          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Quando inserisci informazioni su un paziente in ChatGPT — anche solo i temi della seduta, l'età, la diagnosi, i farmaci, la situazione familiare — stai trasferendo dati sensibili di natura sanitaria a OpenAI, un'azienda americana con server negli Stati Uniti.
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Questo è un problema per tre ragioni concrete.
          </p>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-[#3B6FD4] pl-5 py-3 bg-[#F0F5FF] rounded-r-xl">
              <p className="font-['DM_Sans'] text-[15px]">
                <span className="font-semibold text-[#00122F]">Prima ragione: i dati sanitari hanno una protezione speciale.</span>{' '}
                <span className="text-slate-600">Il GDPR classifica i dati sulla salute psicologica come "categorie particolari" — richiedono una base giuridica più solida, misure di sicurezza specifiche, e un trattamento documentato. Non puoi trasferirli a terze parti senza una base legale chiara e un accordo di trattamento dati (DPA) in forma adeguata.</span>
              </p>
            </div>

            <div className="border-l-4 border-[#3B6FD4] pl-5 py-3 bg-[#F0F5FF] rounded-r-xl">
              <p className="font-['DM_Sans'] text-[15px]">
                <span className="font-semibold text-[#00122F]">Seconda ragione: OpenAI non è un sub-responsabile del tuo studio.</span>{' '}
                <span className="text-slate-600">Per usare un servizio AI con dati dei pazienti in modo conforme, il fornitore deve firmare un accordo di trattamento dati con te. OpenAI offre un DPA enterprise — ma non per l'uso personale di ChatGPT da parte di un libero professionista. Il piano gratuito e il piano Plus non includono garanzie adeguate per il trattamento di dati sanitari di terzi.</span>
              </p>
            </div>

            <div className="border-l-4 border-[#3B6FD4] pl-5 py-3 bg-[#F0F5FF] rounded-r-xl">
              <p className="font-['DM_Sans'] text-[15px]">
                <span className="font-semibold text-[#00122F]">Terza ragione: il Garante italiano l'ha già segnalato.</span>{' '}
                <span className="text-slate-600">Nel 2023, il Garante per la Protezione dei Dati Personali ha bloccato temporaneamente ChatGPT in Italia proprio per mancanza di conformità GDPR. ChatGPT è tornato disponibile dopo azioni correttive di OpenAI — ma l'uso con dati sanitari di pazienti rimane una zona grigia legalmente rischiosa, non una zona sicura.</span>
              </p>
            </div>
          </div>

          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Il Codice Deontologico degli Psicologi è chiaro sulla tutela della riservatezza del paziente. Trasferire dati di seduta a sistemi non certificati e non conformi — anche senza nome, anche anonimizzati parzialmente — espone il professionista a rischi disciplinari oltre che legali.
          </p>

          {/* Section 3 — Limiti tecnici */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-4">
            I limiti tecnici, non solo quelli legali
          </h2>

          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Anche mettendo da parte la compliance, ChatGPT per la documentazione clinica ha limiti strutturali che non riguardano la qualità della scrittura.
          </p>

          <ul className="space-y-4 mb-6">
            {[
              {
                bold: "Non registra la seduta.",
                text: "Devi ricostruire a memoria quello che è successo — il che introduce distorsioni, omissioni, il filtro della tua stanchezza a fine giornata. La nota che scrivi non è un resoconto della seduta. È la tua versione della seduta, ricostruita.",
              },
              {
                bold: "Non ricorda le sedute precedenti.",
                text: "Ogni conversazione con ChatGPT parte da zero. Puoi incollare il contesto manualmente, ma diventa un lavoro — e non scala. Non c'è una memoria strutturata del paziente che cresce nel tempo.",
              },
              {
                bold: "Non capisce il contesto clinico italiano.",
                text: "ChatGPT è un modello generalista. Non è addestrato sulla terminologia specifica della psicologia italiana, sui codici ENPAP, sulle differenze tra approcci (CBT, DBT, psicodinamico, sistemico-relazionale) nel contesto professionale italiano.",
              },
              {
                bold: "Non si integra con il tuo workflow.",
                text: "Il risultato è sempre un testo in una scheda del browser. Copi, incolli, formatti, salvi da qualche parte. Non è documentazione strutturata — è un appunto.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00122F] shrink-0 mt-[10px]" />
                <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8]">
                  <span className="font-semibold text-[#00122F]">{item.bold}</span>{' '}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Section 4 — Cosa fa ZenGest */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-4">
            Cosa fa ZenGest di diverso
          </h2>

          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "La registrazione parte dalla seduta.",
                text: "Con il consenso del paziente, ZenGest registra da computer o telefono. Nessun appunto da prendere durante la sessione. Nessuna ricostruzione a memoria.",
              },
              {
                bold: "I dati non escono mai in chiaro.",
                text: "Prima di qualsiasi elaborazione AI, nomi, luoghi e riferimenti identificativi vengono anonimizzati automaticamente. L'audio originale viene eliminato definitivamente dopo la trascrizione.",
              },
              {
                bold: "I server sono in Europa.",
                text: "Nessun trasferimento di dati sanitari negli Stati Uniti. ZenGest è conforme al GDPR e alle normative italiane. Puoi firmare un DPA in regola.",
              },
              {
                bold: "Ricorda il contesto nel tempo.",
                text: "ZenGest costruisce una memoria clinica strutturata per ogni paziente — temi ricorrenti, progressi, obiettivi concordati.",
              },
              {
                bold: "È addestrato sulla psicologia italiana.",
                text: "Riconosce la terminologia DSM-5, gli approcci terapeutici, gli acronimi professionali. Le note che genera sono clinicamente precise, non genericamente corrette.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check />
                <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8]">
                  <span className="font-semibold text-[#00122F]">{item.bold}</span>{' '}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Section 5 — Feature comparison table */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-6 text-center">
            Confronto funzionalità
          </h2>

          <div className="rounded-2xl border border-slate-200 overflow-hidden mb-12">
            <div className="grid grid-cols-3 bg-[#00122F] text-white text-sm font-['DM_Sans'] font-semibold">
              <div className="px-4 py-3 text-slate-300">Funzionalità</div>
              <div className="px-4 py-3 text-center text-[#A7BCF5]">ZenGest</div>
              <div className="px-4 py-3 text-center text-slate-300">ChatGPT</div>
            </div>
            {features.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
              >
                <div className="px-4 py-3 text-slate-700 text-sm font-['DM_Sans'] flex items-center">
                  {row.label}
                </div>
                <div className="px-4 py-3 flex items-center justify-center">
                  {renderCellValue(row.zengest, true)}
                </div>
                <div className="px-4 py-3 flex items-center justify-center">
                  {renderCellValue(row.competitor, false)}
                </div>
              </div>
            ))}
          </div>

          {/* Section 6 — Pricing */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-6 text-center">
            Prezzi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-[#3B6FD4]/30 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#3B6FD4]" />
                <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-base">ZenGest</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-['DM_Sans']">
                Da 19€/mese (Piano Base). Piano Pro 39€/mese, Piano Studio 69€/mese. Prova gratuita, nessuna carta di credito.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-base">ChatGPT</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-['DM_Sans']">
                Gratuito o 20€/mese (Plus). Non include le garanzie di conformità necessarie per il trattamento di dati sanitari dei pazienti.
              </p>
            </div>
          </div>

          {/* Section 7 — La domanda giusta */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-4">
            La domanda giusta non è "quanto costa"
          </h2>

          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Il confronto di prezzo è fuorviante. La domanda giusta è: qual è il costo reale di usare uno strumento non conforme per documentare sedute psicologiche?
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Una segnalazione al Garante. Un reclamo deontologico. Un paziente che scopre che i dati della sua terapia sono stati inviati a un server americano senza il suo consenso informato specifico.
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Non stiamo parlando di scenari remoti. Stiamo parlando di rischi concreti che molti psicologi stanno correndo oggi perché nessuno glieli ha spiegati chiaramente.
          </p>

          {/* Section 8 — Chi usa ChatGPT */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-4">
            Chi usa ChatGPT per le note e cosa fare adesso
          </h2>

          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Se stai già usando ChatGPT per la documentazione clinica, non c'è niente di irreversibile. Ma è il momento di fare una valutazione seria.
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Chiediti: i tuoi pazienti sanno che i dati delle loro sedute vengono elaborati da OpenAI? Il tuo consenso informato lo menziona? Hai un DPA con OpenAI che copre questo uso?
          </p>
          <p className="font-['DM_Sans'] text-[15px] text-slate-700 leading-[1.8] mb-4">
            Se la risposta è no a una di queste domande, hai un problema di compliance che vale la pena risolvere prima che qualcuno te lo segnali.
          </p>

          {/* Section 9 — FAQ */}
          <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mt-12 mb-6">
            Domande frequenti
          </h2>

          <div className="space-y-3 mb-12">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  aria-expanded={openFaq[i]}
                >
                  <span className="font-['DM_Sans'] font-semibold text-[#00122F] text-sm leading-snug pr-4">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-200 ${openFaq[i] ? 'rotate-180' : ''}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {openFaq[i] && (
                  <div className="px-5 pb-5">
                    <p className="text-slate-600 text-sm font-['DM_Sans'] leading-relaxed border-t border-slate-100 pt-3">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section 10 — CTA band */}
          <div
            style={{
              background: 'linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)',
            }}
            className="rounded-2xl p-10 text-center mb-12"
          >
            <h2 className="font-['Instrument_Serif'] text-2xl text-[#00122F] mb-3">
              Prova ZenGest gratis.
            </h2>
            <p className="font-['DM_Sans'] text-sm text-slate-600 mb-6">
              Documentazione clinica AI, conforme GDPR, costruita da psicologi italiani. Nessuna carta di credito.
            </p>
            <a
              href="https://app.zengest.it/sign-up/"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              Inizia gratis
            </a>
          </div>

          {/* Section 11 — Editorial note */}
          <div className="border-t border-slate-100 mt-12 pt-8">
            <p className="font-['DM_Sans'] text-[13px] text-slate-400 italic leading-relaxed">
              Nota editoriale: questa pagina non è un attacco a ChatGPT come strumento. ChatGPT è straordinario per decine di usi legittimi — ricerca, sintesi di letteratura, comunicazione, brainstorming clinico con casi de-identificati. Il problema è specifico: usarlo come sistema di documentazione clinica routinaria con dati reali dei pazienti, senza le garanzie che un contesto sanitario richiede.
            </p>
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}
