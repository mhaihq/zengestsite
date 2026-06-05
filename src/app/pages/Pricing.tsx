'use client';

import { useState } from "react";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const PLANS = [
  {
    id: "free",
    name: "Free",
    badge: null,
    monthly: 0,
    annual: 0,
    annualMonthly: 0,
    description: "Per esplorare ZenGest con i tuoi primi casi reali.",
    cta: "Inizia gratis",
    ctaHref: "https://app.zengest.it/sign-up/",
    ctaStyle: "border",
    features: [
      { text: "10 sedute al mese" },
      { text: "Note cliniche AI" },
      { text: "Scheda paziente" },
      { text: "Storico delle sedute" },
      { text: "Template base" },
      { text: "Ask ZenGest (limitato)" },
    ],
  },
  {
    id: "clinical",
    name: "Clinical",
    badge: "Consigliato",
    monthly: 39,
    annual: 390,
    annualMonthly: 32,
    description: "Per usare ZenGest ogni settimana nella tua pratica clinica.",
    cta: "Prova gratis",
    ctaHref: "https://app.zengest.it/sign-up/",
    ctaStyle: "primary",
    features: [
      { text: "50 sedute al mese" },
      { text: "Note cliniche AI avanzate" },
      { text: "Cartella paziente completa" },
      { text: "Storico clinico interrogabile" },
      { text: "Ask ZenGest sui tuoi casi" },
      { text: "Timeline clinica" },
      { text: "Template personalizzabili" },
      { text: "Formati SOAP, DAP, BIRP" },
      { text: "Export documenti" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    badge: null,
    monthly: 79,
    annual: 790,
    annualMonthly: 66,
    description: "Per chi usa ZenGest intensivamente nella propria attività.",
    cta: "Prova gratis",
    ctaHref: "https://app.zengest.it/sign-up/",
    ctaStyle: "border",
    features: [
      { text: "Sedute illimitate" },
      { text: "Tutto di Clinical" },
      { text: "Ask ZenGest illimitato" },
      { text: "Template avanzati" },
      { text: "Processing prioritario" },
      { text: "Supporto prioritario" },
      { text: "Accesso anticipato alle nuove funzioni" },
    ],
  },
];

const FAQS = [
  {
    q: "I dati dei miei pazienti sono al sicuro?",
    a: "Sì. Tutti i dati restano nell'Unione Europea. ZenGest è costruito su Art. 9 GDPR per dati sanitari: pseudonimizzazione automatica prima di qualsiasi elaborazione AI, contratto DPA incluso, nessun utilizzo per addestrare modelli di terzi.",
  },
  {
    q: "Posso cambiare piano in qualsiasi momento?",
    a: "Sì. Puoi passare a un piano superiore in qualsiasi momento. Il downgrade è disponibile al rinnovo del periodo in corso.",
  },
  {
    q: "È inclusa la fatturazione?",
    a: "La fatturazione automatica con invio al Sistema Tessera Sanitaria non è ancora attiva. Potrai attivarla fra qualche settimana acquistando i pacchetti che metteremo a disposizione. Sarà anche possibile utilizzare solo il sistema di fatturazione.",
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

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Prezzi · ZenGest"
        useExactTitle={true}
        description="Piani ZenGest per psicologi italiani. Free, Clinical €39/mese, Professional €79/mese. AI clinica, note, storico paziente e assistente sui casi."
        path="/pricing"
      />

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
          Prezzi
        </div>
        <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4 max-w-2xl mx-auto">
          Free per provare.<br />
          <span style={G}>Clinical per lavorare.</span>
        </h1>
        <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
          AI clinica, note, cartella e storico paziente interrogabile con Ask ZenGest. Senza fatturazione, senza gestionale completo.
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

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map(plan => (
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
                  {plan.monthly === 0 ? (
                    <span className="font-['Instrument_Serif'] text-4xl text-[#00122F]">Gratis</span>
                  ) : (
                    <>
                      <span className="font-['Instrument_Serif'] text-4xl text-[#00122F]">
                        €{annual ? plan.annualMonthly : plan.monthly}
                      </span>
                      <span className="font-['DM_Sans'] text-sm text-slate-400">+ IVA / mese</span>
                    </>
                  )}
                </div>
                {annual && plan.annual > 0 && (
                  <p className="font-['DM_Sans'] text-xs text-slate-400">
                    €{plan.annual}/anno — 2 mesi gratis
                  </p>
                )}
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed mt-3">{plan.description}</p>
              </div>

              <a
                href={plan.ctaHref}
                className={`w-full inline-flex items-center justify-center h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm transition-all duration-200 ${
                  plan.ctaStyle === "primary"
                    ? "bg-[#00122F] text-white hover:bg-[#00122F]/90 shadow-md"
                    : "border border-slate-200 text-[#00122F] hover:bg-slate-50"
                }`}
              >
                {plan.monthly === 0 ? plan.cta : "30 giorni gratis"}
              </a>
              {plan.monthly > 0 && (
                <a
                  href="mailto:hello@zengest.it"
                  className="w-full inline-flex items-center justify-center h-9 font-['DM_Sans'] text-sm text-slate-400 hover:text-[#00122F] transition-colors mt-2 mb-4"
                >
                  Parla con noi
                </a>
              )}
              {plan.monthly === 0 && <div className="mb-6" />}

              <div className="flex flex-col gap-2.5 flex-1">
                {plan.features.map(f => (
                  <div key={f.text} className="flex items-start gap-2.5">
                    <Check />
                    <span className="font-['DM_Sans'] text-sm leading-snug text-slate-700">
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Costruito su GDPR Art. 9, server UE, modelli terapeutici italiani. Non uno strumento generico adattato.</p>
            </div>
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">Memoria clinica, non solo documentazione.</p>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Ask ZenGest risponde con il contesto reale dei tuoi pazienti, seduta per seduta.</p>
            </div>
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mb-1">Dati che restano tuoi.</p>
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Garanzia contrattuale: nessun dato clinico usato per addestrare modelli. DPA incluso in tutti i piani.</p>
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
