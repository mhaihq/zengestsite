'use client';

import { useState } from "react";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const SIGN_UP = "https://app.zengest.it/sign-up/";

// Keep in sync with the app catalog (zengest: src/lib/pricingCatalog.ts, src/lib/appDefaults.ts).
const TRIAL_DAYS = 30;
const TRIAL_SESSIONS = 20;

const AI_PLANS = [
  {
    id: "start",
    name: "Start",
    badge: null,
    monthly: 19,
    annual: 190,
    sessions: 20,
    description: "Per chi inizia a usare l'AI nella documentazione delle sedute.",
    features: [
      "20 sedute al mese",
      "Registrazione in presenza, online o da file audio",
      "Trascrizione con riconoscimento di chi parla",
      "Note cliniche AI (SOAP, DAP, BIRP)",
      "Cartella paziente completa",
      "Storico clinico interrogabile con Ask ZenGest",
      "Timeline clinica",
      "Template personalizzabili",
      "Export documenti",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Il più scelto",
    monthly: 39,
    annual: 390,
    sessions: 50,
    description: "Per usare ZenGest ogni settimana nella tua pratica clinica.",
    features: [
      "50 sedute al mese",
      "Tutto di Start",
      "Supporto prioritario",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    badge: null,
    monthly: 79,
    annual: 790,
    sessions: 150,
    description: "Per chi segue molti pazienti e documenta ogni seduta.",
    features: [
      "150 sedute al mese",
      "Tutto di Pro",
    ],
  },
];

const INVOICING_TIERS = [
  { invoices: 100, annual: 36, monthly: 3 },
  { invoices: 250, annual: 48, monthly: 4 },
  { invoices: 500, annual: 72, monthly: 6 },
];

const INVOICING_FEATURES = [
  "Invio delle spese al Sistema Tessera Sanitaria",
  "Fattura elettronica a SDI (FatturaPA)",
  "XML generato automaticamente",
  "Note di credito",
  "Pacchetto da 100 fatture in più a €16 + IVA",
];

const FAQS = [
  {
    q: "Come funziona la prova gratuita?",
    a: `Hai ${TRIAL_DAYS} giorni per provare ZenGest con un massimo di ${TRIAL_SESSIONS} sedute. Non serve la carta di credito, quindi alla fine della prova non c'è nessun addebito automatico: per continuare a registrare sedute scegli un piano.`,
  },
  {
    q: "Posso usare solo la fatturazione, o solo l'AI clinica?",
    a: "Sì. I due moduli sono indipendenti: puoi attivarne uno solo o combinarli nello stesso abbonamento, con lo stesso periodo di pagamento.",
  },
  {
    q: "Come funziona la fatturazione?",
    a: "Il modulo Fatturazione include un numero di fatture all'anno (100, 250 o 500), con invio a SDI e al Sistema Tessera Sanitaria. Con il pagamento mensile le fatture si sbloccano circa un dodicesimo al mese e quelle non usate si accumulano. Se finisci le fatture puoi aggiungere un pacchetto da 100. Durante la prova puoi preparare le fatture; l'invio si attiva con l'abbonamento al modulo.",
  },
  {
    q: "Posso cambiare piano in qualsiasi momento?",
    a: "Sì. Il passaggio a un piano superiore è immediato. Il passaggio a un piano inferiore si applica al rinnovo del periodo in corso.",
  },
  {
    q: "Ho già un piano Clinical o Professional. Cambia qualcosa?",
    a: "No. Gli abbonamenti attivi restano alle condizioni sottoscritte. Se vuoi passare ai nuovi piani puoi farlo da Impostazioni → Abbonamento.",
  },
  {
    q: "I dati dei miei pazienti sono al sicuro?",
    a: "La cartella dei pazienti è archiviata nell'Unione Europea, a Francoforte. ZenGest tratta i dati sanitari secondo l'art. 9 GDPR: pseudonimizzazione automatica della trascrizione prima della generazione delle note, DPA incluso in tutti i piani, nessun utilizzo dei dati per addestrare modelli. Trascrizione e generazione delle note passano oggi da fornitori statunitensi con garanzie contrattuali: i dettagli sono nella pagina Sicurezza.",
  },
];

function Check() {
  return (
    <div className="w-4 h-4 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button
        className="w-full text-left flex items-center justify-between py-5 gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-['DM_Sans'] text-sm font-semibold text-[#00122F]">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed pb-5 -mt-1">{a}</p>
      )}
    </div>
  );
}

const eur = (n: number) => n.toLocaleString("it-IT", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Prezzi · ZenGest"
        useExactTitle={true}
        description="Prezzi ZenGest per psicologi: AI Clinica da €19/mese (Start, Pro, Plus) e Fatturazione con Sistema TS da €36/anno. 30 giorni di prova gratuita, senza carta di credito."
        path="/pricing"
      />

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
          Prezzi
        </div>
        <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4 max-w-2xl mx-auto">
          Scegli le sedute che ti servono.<br />
          <span style={G}>Aggiungi la fatturazione se vuoi.</span>
        </h1>
        <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
          Due moduli da combinare: AI Clinica per note, cartella e Ask ZenGest; Fatturazione per SDI e Sistema TS. Prova gratis per {TRIAL_DAYS} giorni, con {TRIAL_SESSIONS} sedute e senza carta di credito.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`font-['DM_Sans'] text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${!annual ? "bg-white text-[#00122F] shadow-sm" : "text-slate-400"}`}
          >
            Mensile
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`font-['DM_Sans'] text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 ${annual ? "bg-white text-[#00122F] shadow-sm" : "text-slate-400"}`}
          >
            Annuale
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">–2 mesi</span>
          </button>
        </div>
      </section>

      {/* AI Clinica */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center md:text-left">
            <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-[#0D9488] mb-1">Modulo 1</p>
            <h2 className="font-['Instrument_Serif'] text-3xl text-[#00122F]">AI Clinica</h2>
            <p className="font-['DM_Sans'] text-sm text-slate-500 mt-1">Registrazione, trascrizione, note cliniche e cartella del paziente.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AI_PLANS.map(plan => (
              <div
                key={plan.id}
                className={`relative rounded-3xl border p-7 flex flex-col ${
                  plan.badge
                    ? "border-[#3B6FD4] bg-[#F0F5FF] shadow-lg shadow-blue-100"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="font-['DM_Sans'] text-xs font-semibold text-white bg-[#3B6FD4] rounded-full px-3 py-1">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <p className="font-['DM_Sans'] text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">{plan.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-['Instrument_Serif'] text-4xl text-[#00122F]">
                      €{annual ? plan.annual : plan.monthly}
                    </span>
                    <span className="font-['DM_Sans'] text-sm text-slate-400">+ IVA / {annual ? "anno" : "mese"}</span>
                  </div>
                  {annual && (
                    <p className="font-['DM_Sans'] text-xs text-slate-400">
                      Equivale a €{eur(Math.round((plan.annual / 12) * 100) / 100)} al mese · 2 mesi gratis
                    </p>
                  )}
                  <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed mt-3">{plan.description}</p>
                </div>

                <a
                  href={SIGN_UP}
                  className={`w-full inline-flex items-center justify-center h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm transition-all duration-200 ${
                    plan.badge
                      ? "bg-[#00122F] text-white hover:bg-[#00122F]/90 shadow-md"
                      : "border border-slate-200 text-[#00122F] hover:bg-slate-50"
                  }`}
                >
                  {TRIAL_DAYS} giorni gratis
                </a>
                <div className="mb-6" />

                <div className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check />
                      <span className="font-['DM_Sans'] text-sm leading-snug text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="font-['DM_Sans'] text-xs text-slate-400 mt-4 text-center md:text-left">
            Prova gratuita: {TRIAL_DAYS} giorni, fino a {TRIAL_SESSIONS} sedute, nessuna carta di credito richiesta.
          </p>
        </div>
      </section>

      {/* Fatturazione */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 p-7 md:p-9 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8">
          <div>
            <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-[#0D9488] mb-1">Modulo 2</p>
            <h2 className="font-['Instrument_Serif'] text-3xl text-[#00122F]">Fatturazione</h2>
            <p className="font-['DM_Sans'] text-sm text-slate-500 mt-1 mb-6">
              Fattura elettronica e Sistema Tessera Sanitaria, da sola o insieme ad AI Clinica.
            </p>
            <div className="flex flex-col gap-2.5">
              {INVOICING_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="font-['DM_Sans'] text-sm leading-snug text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="rounded-2xl bg-slate-50 border border-slate-100 divide-y divide-slate-100">
              {INVOICING_TIERS.map(t => (
                <div key={t.invoices} className="flex items-center justify-between px-5 py-4">
                  <span className="font-['DM_Sans'] text-sm font-semibold text-[#00122F]">{t.invoices} fatture / anno</span>
                  <span className="text-right">
                    <span className="font-['Instrument_Serif'] text-2xl text-[#00122F]">
                      €{annual ? t.annual : t.monthly}
                    </span>
                    <span className="font-['DM_Sans'] text-xs text-slate-400"> + IVA / {annual ? "anno" : "mese"}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="font-['DM_Sans'] text-xs text-slate-400 mt-3 leading-relaxed">
              {annual
                ? "Con il pagamento annuale le fatture sono tutte disponibili da subito."
                : "Con il pagamento mensile le fatture si sbloccano circa un dodicesimo al mese; quelle non usate si accumulano."}
            </p>
            <a
              href={SIGN_UP}
              className="mt-5 w-full inline-flex items-center justify-center h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm border border-slate-200 text-[#00122F] hover:bg-slate-50 transition-all duration-200"
            >
              Inizia la prova gratuita
            </a>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#00122F] px-7 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="font-['DM_Sans'] text-base font-semibold text-white">Team & Enterprise</p>
            <p className="font-['DM_Sans'] text-sm text-white/60">Piani per studi e strutture con più professionisti, con fatturazione centralizzata.</p>
          </div>
          <a
            href="mailto:hello@zengest.it"
            className="inline-flex items-center justify-center h-10 px-6 rounded-xl font-['DM_Sans'] font-semibold text-sm bg-white text-[#00122F] hover:bg-white/90 transition-all shrink-0"
          >
            Parliamone
          </a>
        </div>
      </section>

      {/* Comparison note */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl border border-slate-100 p-8">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Perché ZenGest</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">Non solo genera note.</p>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">ZenGest trasforma ogni paziente in uno storico clinico interrogabile. Non un trascrittore con un prompt.</p>
            </div>
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">Verticale per psicologi italiani.</p>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Costruito su GDPR Art. 9, cartella clinica in UE, modelli terapeutici italiani, fatture con Sistema TS. Non uno strumento generico adattato.</p>
            </div>
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">Memoria clinica, non solo documentazione.</p>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Ask ZenGest risponde con il contesto reale dei tuoi pazienti, seduta per seduta.</p>
            </div>
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">Dati che restano tuoi.</p>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Nessun dato clinico usato per addestrare modelli. DPA incluso in tutti i piani.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 text-center">Domande frequenti</p>
          {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
