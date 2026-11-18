import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { SEO, breadcrumbSchema, faqSchema } from "../../components/SEO";
import { Footer } from "../../components/Footer";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
const SIGN_UP = "https://app.zengest.it/sign-up/";

export type ProductSlug = "note-cliniche-ai" | "assistente-ai" | "cartella-clinica" | "fatturazione";

export const PRODUCTS: { slug: ProductSlug; name: string; blurb: string }[] = [
  { slug: "note-cliniche-ai", name: "Note cliniche AI", blurb: "Registra la seduta, ricevi la bozza di nota." },
  { slug: "assistente-ai", name: "Assistente Zen", blurb: "Fai domande sul caso, prepara la seduta, scrivi relazioni." },
  { slug: "cartella-clinica", name: "Cartella clinica", blurb: "Tutto il paziente in una scheda, aggiornata a ogni seduta." },
  { slug: "fatturazione", name: "Fatturazione", blurb: "Fatture dalle sedute, Sistema TS e SdI." },
];

export type ProductPageProps = {
  slug: ProductSlug;
  seoTitle: string;
  seoDescription: string;
  keywords?: string;
  eyebrow: string;
  title: ReactNode;
  titleAccent: ReactNode;
  subtitle: string;
  showcase?: ReactNode;
  featuresTitle: string;
  features: { title: string; body: string }[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  trust: { title: string; body: ReactNode };
  plan: { title: string; body: ReactNode };
  faqs: { q: string; a: string }[];
};

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button className="w-full text-left flex items-center justify-between py-5 gap-4" onClick={() => setOpen(o => !o)}>
        <span className="font-['DM_Sans'] text-sm font-semibold text-[#00122F]">{q}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed pb-5 -mt-1">{a}</p>}
    </div>
  );
}

export function ProductTemplate(p: ProductPageProps) {
  const path = `/${p.slug}`;
  const others = PRODUCTS.filter(x => x.slug !== p.slug);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title={p.seoTitle}
        useExactTitle={true}
        description={p.seoDescription}
        keywords={p.keywords}
        path={path}
        jsonLd={[
          breadcrumbSchema([
            { name: "ZenGest", url: "https://zengest.it/" },
            { name: p.eyebrow, url: `https://zengest.it${path}` },
          ]),
          faqSchema(p.faqs.map(f => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="pt-20 pb-14 px-6 text-center">
        <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
          {p.eyebrow}
        </div>
        <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-5 max-w-3xl mx-auto">
          {p.title}<br />
          <span style={G}>{p.titleAccent}</span>
        </h1>
        <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">{p.subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={SIGN_UP} className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 transition-all shadow-md">
            Prova gratis 30 giorni
          </a>
          <Link to="/pricing" className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-['DM_Sans'] font-semibold text-sm text-[#00122F] border border-slate-200 hover:bg-slate-50 transition-all">
            Vedi i prezzi
          </Link>
        </div>
        <p className="font-['DM_Sans'] text-xs text-slate-400 mt-4">20 sedute di prova · Nessuna carta di credito</p>
      </section>

      {/* Showcase (reused product visual) */}
      {p.showcase}

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] tracking-[-0.02em] mb-10 text-center">{p.featuresTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.features.map(f => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="w-1.5 h-6 rounded-full bg-[#3B6FD4] mb-4" />
                <h3 className="font-['DM_Sans'] text-base font-semibold text-[#00122F] mb-2">{f.title}</h3>
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] tracking-[-0.02em] mb-10 text-center">{p.stepsTitle}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {p.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-['Instrument_Serif'] text-3xl text-[#3B6FD4] leading-none w-8 shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-['DM_Sans'] text-base font-semibold text-[#00122F] mb-1">{s.title}</h3>
                  <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="font-['DM_Sans'] text-sm text-slate-500 text-center mt-10">
            Vuoi vederlo passo per passo? <Link to="/guida" className="text-[#3B6FD4] font-medium hover:underline">Apri la guida di ZenGest</Link>.
          </p>
        </div>
      </section>

      {/* Trust + plan */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-l-4 border-[#0D9488] bg-[#F3FAF9] p-7">
            <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-[#0D9488] mb-2">Privacy</p>
            <h2 className="font-['DM_Sans'] text-lg font-semibold text-[#00122F] mb-3">{p.trust.title}</h2>
            <div className="font-['DM_Sans'] text-sm text-slate-600 leading-relaxed space-y-3">{p.trust.body}</div>
          </div>
          <div className="rounded-2xl border border-[#3B6FD4] bg-[#F0F5FF] p-7 flex flex-col">
            <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-[#3B6FD4] mb-2">Piano</p>
            <h2 className="font-['DM_Sans'] text-lg font-semibold text-[#00122F] mb-3">{p.plan.title}</h2>
            <div className="font-['DM_Sans'] text-sm text-slate-600 leading-relaxed space-y-3 flex-1">{p.plan.body}</div>
            <Link to="/pricing" className="mt-6 inline-flex items-center justify-center h-11 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 transition-all">
              Tutti i prezzi
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 text-center">Domande frequenti</p>
          {p.faqs.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* Other products */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6 text-center">Il resto di ZenGest</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {others.map(o => (
              <Link key={o.slug} to={`/${o.slug}`} className="group rounded-2xl border border-slate-200 p-6 hover:border-[#3B6FD4] hover:bg-[#F0F5FF] transition-all">
                <p className="font-['DM_Sans'] text-base font-semibold text-[#00122F] mb-1 flex items-center justify-between">
                  {o.name}
                  <span className="text-[#3B6FD4] transition-transform group-hover:translate-x-1">→</span>
                </p>
                <p className="font-['DM_Sans'] text-sm text-slate-500">{o.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
