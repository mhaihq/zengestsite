'use client';

import { useState } from "react";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const SIGN_UP = "https://app.zengest.it/sign-up/";

// Keep in sync with the app catalog (zengest: src/lib/pricingCatalog.ts, src/lib/appDefaults.ts).
const TRIAL_DAYS = 30;
const TRIAL_SESSIONS = 20;

const INVOICING_TIERS = [
  { invoices: 100, annual: 36, monthly: 3 },
  { invoices: 250, annual: 48, monthly: 4 },
  { invoices: 500, annual: 72, monthly: 6 },
];

// Each AI plan suggests an invoicing tier (index into INVOICING_TIERS); the user can change it.
const AI_PLANS = [
  { id: "start", name: "Start", recommended: false, monthly: 19, annual: 190, sessions: 20, suggestedTier: 0, extra: null },
  { id: "pro", name: "Pro", recommended: true, monthly: 39, annual: 390, sessions: 50, suggestedTier: 1, extra: "Supporto prioritario" },
  { id: "plus", name: "Plus", recommended: false, monthly: 79, annual: 790, sessions: 150, suggestedTier: 2, extra: "Supporto prioritario" },
];

const AI_FEATURES = [
  "Registrazione in presenza, online o da file audio",
  "Trascrizione con riconoscimento di chi parla",
  "Note cliniche AI: SOAP, DAP, BIRP o il tuo modello",
  "Assistente Zen sulla storia del paziente",
  "Agenti per approccio e agenti personalizzati",
  "Export in PDF e Word",
];

const INVOICING_FEATURES = [
  "Invio delle spese al Sistema Tessera Sanitaria",
  "Fattura elettronica allo SDI per aziende ed enti",
  "ENPAP e marca da bollo calcolati",
  "Note di credito e annullamenti",
  "Export per il commercialista",
  "100 fatture in più a €16 + IVA",
];

const FAQS = [
  {
    q: "Come funziona la prova gratuita?",
    a: `Hai ${TRIAL_DAYS} giorni per provare tutto ZenGest, con un massimo di ${TRIAL_SESSIONS} sedute AI. Puoi configurare la fatturazione e preparare le fatture; l'invio a SDI e Sistema TS si sblocca con l'abbonamento. Non serve la carta di credito, quindi alla fine della prova non c'è nessun addebito automatico.`,
  },
  {
    q: "Posso prendere solo la Fatturazione, o solo l'AI clinica?",
    a: "Sì. In tutti e due c'è la cartella clinica. Se non ti serve l'AI prendi solo la Fatturazione; se fatturi già con il commercialista prendi solo l'AI clinica.",
  },
  {
    q: "Come si paga la fatturazione insieme all'AI clinica?",
    a: "Costa come da sola (36, 48 o 72 € all'anno) ma si paga come l'AI, nello stesso abbonamento: 3, 4 o 6 € al mese se l'AI è mensile, una volta all'anno se l'AI è annuale. La Fatturazione da sola si paga una volta all'anno.",
  },
  {
    q: "Quante fatture mi servono?",
    a: "Con una fattura a seduta e circa 44 settimane di lavoro all'anno: 2 pazienti a settimana sono circa 90 fatture (piano 100), 5 pazienti circa 220 (piano 250), 10 pazienti circa 440 (piano 500). Se le finisci aggiungi 100 fatture a €16 + IVA. Oltre 500 fatture all'anno, scrivici.",
  },
  {
    q: "Con il pagamento mensile ho subito tutte le fatture?",
    a: "Con la fatturazione aggiunta a un'AI clinica mensile, le fatture si sbloccano circa un dodicesimo al mese e quelle non usate si accumulano. Con il pagamento annuale sono tutte disponibili da subito.",
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

function RecordIncluded() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#0D9488]/10 px-3 py-1 mb-4">
      <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4 7L8 3" stroke="#0D9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-['DM_Sans'] text-xs font-semibold text-[#0D9488]">Cartella clinica inclusa</span>
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

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left"
    >
      <span className="font-['DM_Sans'] text-sm font-medium text-[#00122F]">{label}</span>
      <span className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-[#0D9488]" : "bg-slate-200"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}

function AiPlanCard({ plan, annual }: { plan: typeof AI_PLANS[number]; annual: boolean }) {
  const [withInvoicing, setWithInvoicing] = useState(false);
  const [tierIdx, setTierIdx] = useState(plan.suggestedTier);
  const tier = INVOICING_TIERS[tierIdx];
  const price = annual
    ? plan.annual + (withInvoicing ? tier.annual : 0)
    : plan.monthly + (withInvoicing ? tier.monthly : 0);

  return (
    <div
      className={`relative rounded-2xl border p-5 flex flex-col ${
        plan.recommended ? "border-[#3B6FD4] bg-[#F0F5FF] shadow-lg shadow-blue-100" : "border-slate-200 bg-white"
      }`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="font-['DM_Sans'] text-xs font-semibold text-white bg-[#3B6FD4] rounded-full px-3 py-1">Consigliato</span>
        </div>
      )}
      <p className="font-['DM_Sans'] text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">{plan.name}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-4xl text-[#00122F]">€{price}</span>
        <span className="font-['DM_Sans'] text-sm text-slate-400">+ IVA / {annual ? "anno" : "mese"}</span>
      </div>
      <p className="font-['DM_Sans'] text-xs text-slate-400 min-h-[1rem] mt-1">
        {annual ? `Equivale a €${eur(Math.round((price / 12) * 100) / 100)} al mese` : ""}
      </p>
      <p className="font-['DM_Sans'] text-sm font-semibold text-[#00122F] mt-3">{plan.sessions} sedute al mese</p>
      <p className="font-['DM_Sans'] text-xs text-slate-500 min-h-[1rem] mb-4">{plan.extra ?? ""}</p>

      <Switch on={withInvoicing} onChange={setWithInvoicing} label="Aggiungi la fatturazione" />
      {withInvoicing && (
        <div className="mt-2">
          <div className="grid grid-cols-3 gap-1.5">
            {INVOICING_TIERS.map((t, i) => (
              <button
                key={t.invoices}
                type="button"
                aria-pressed={i === tierIdx}
                onClick={() => setTierIdx(i)}
                className={`rounded-lg py-1.5 font-['DM_Sans'] text-xs font-medium transition-colors ${
                  i === tierIdx ? "bg-[#00122F] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.invoices}
              </button>
            ))}
          </div>
          <p className="font-['DM_Sans'] text-xs text-slate-500 mt-1.5">
            {tier.invoices} fatture all'anno, +€{annual ? `${tier.annual}/anno` : `${tier.monthly}/mese`}
          </p>
        </div>
      )}

      <a
        href={SIGN_UP}
        className={`mt-5 w-full inline-flex items-center justify-center h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm transition-all duration-200 ${
          plan.recommended
            ? "bg-[#00122F] text-white hover:bg-[#00122F]/90 shadow-md"
            : "border border-slate-200 text-[#00122F] hover:bg-slate-50"
        }`}
      >
        Prova gratis {TRIAL_DAYS} giorni
      </a>
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
        description="Il gestionale per psicologi con cartella clinica inclusa: Fatturazione con Sistema TS da €36/anno, AI clinica da €19/mese (Start, Pro, Plus). 30 giorni di prova gratuita, senza carta di credito."
        path="/pricing"
      />

      {/* Hero */}
      <section className="pt-20 pb-14 px-6 text-center">
        <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
          Prezzi
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.1] tracking-[-0.015em] mb-4 max-w-3xl mx-auto">
          Il gestionale per psicologi.<br />
          <span style={G}>Con l'AI clinica, se la vuoi.</span>
        </h1>
        <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Due prodotti, e in tutti e due c'è la cartella clinica. Prendi solo la Fatturazione, oppure l'AI clinica e aggiungi la fatturazione nello stesso pagamento. Prova gratis per {TRIAL_DAYS} giorni, senza carta di credito.
        </p>
      </section>

      {/* Two products */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2.4fr] gap-6 items-stretch">

          {/* Fatturazione */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-7 flex flex-col">
            <div><RecordIncluded /></div>
            <h2 className="font-display text-3xl text-[#00122F]">Fatturazione</h2>
            <p className="font-['DM_Sans'] text-sm text-slate-500 mt-1 mb-5">
              Per chi vuole il gestionale e le fatture, senza l'AI.
            </p>
            <div className="rounded-2xl bg-slate-50 border border-slate-100 divide-y divide-slate-100 mb-2">
              {INVOICING_TIERS.map(t => (
                <div key={t.invoices} className="flex items-center justify-between px-4 py-3">
                  <span className="font-['DM_Sans'] text-sm font-semibold text-[#00122F]">{t.invoices} fatture</span>
                  <span className="text-right">
                    <span className="font-display text-2xl text-[#00122F]">€{t.annual}</span>
                    <span className="font-['DM_Sans'] text-xs text-slate-400"> + IVA / anno</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="font-['DM_Sans'] text-xs text-slate-400 mb-5">Oltre 500 fatture all'anno: su richiesta.</p>
            <div className="flex flex-col gap-2.5 mb-6">
              {INVOICING_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="font-['DM_Sans'] text-sm leading-snug text-slate-700">{f}</span>
                </div>
              ))}
            </div>
            <a
              href={SIGN_UP}
              className="mt-auto w-full inline-flex items-center justify-center h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm border border-slate-200 text-[#00122F] hover:bg-slate-50 transition-all duration-200"
            >
              Prova gratis {TRIAL_DAYS} giorni
            </a>
          </div>

          {/* AI clinica */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 md:p-7 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <RecordIncluded />
                <h2 className="font-display text-3xl text-[#00122F]">AI clinica</h2>
                <p className="font-['DM_Sans'] text-sm text-slate-500 mt-1">
                  Il gestionale, più note cliniche AI e Assistente Zen. Ogni piano ha tutte le funzioni: cambia il numero di sedute.
                </p>
              </div>
              <div className="inline-flex items-center gap-1 bg-slate-200/70 rounded-full p-1 self-start shrink-0">
                <button
                  onClick={() => setAnnual(false)}
                  className={`font-['DM_Sans'] text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${!annual ? "bg-white text-[#00122F] shadow-sm" : "text-slate-500"}`}
                >
                  Mensile
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`font-['DM_Sans'] text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2 ${annual ? "bg-white text-[#00122F] shadow-sm" : "text-slate-500"}`}
                >
                  Annuale
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">2 mesi gratis</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {AI_PLANS.map(plan => <AiPlanCard key={plan.id} plan={plan} annual={annual} />)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-6">
              {AI_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="font-['DM_Sans'] text-sm leading-snug text-slate-700">{f}</span>
                </div>
              ))}
            </div>
            <p className="font-['DM_Sans'] text-xs text-slate-400 mt-5">
              Con la fatturazione aggiunta paghi una volta sola, con lo stesso periodo dell'AI. Prova gratuita: {TRIAL_DAYS} giorni, fino a {TRIAL_SESSIONS} sedute.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-2xl bg-[#00122F] px-7 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="font-['DM_Sans'] text-base font-semibold text-white">Team & Enterprise</p>
            <p className="font-['DM_Sans'] text-sm text-white/60 max-w-2xl">
              Per studi associati e centri: un solo account e un solo pagamento. Ogni licenza costa come il piano AI scelto, e da 5 licenze in su c'è il 10% in meno su tutte. Oltre 10 professionisti, su preventivo.
            </p>
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
              <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">L'Assistente Zen risponde con il contesto reale dei tuoi pazienti, seduta per seduta.</p>
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
