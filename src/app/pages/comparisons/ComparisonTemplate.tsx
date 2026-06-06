'use client';

import { useState } from 'react';
import { Link } from 'react-router';
import { SEO, faqSchema } from '../../components/SEO';
import { Footer } from '../../components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

type FeatureRow = { label: string; zengest: string; competitor: string }
type FaqItem = { q: string; a: string }

type ComparisonProps = {
  competitor: string
  metaTitle: string
  metaDescription: string
  slug: string
  tagline: string
  intro: string[]
  whatZengest: string
  whatCompetitor: string
  features: FeatureRow[]
  pricingZengest: string
  pricingCompetitor: string
  chooseZengest: string[]
  chooseCompetitor: string[]
  chooseCompetitorLabel: string
  faq: FaqItem[]
  ctaText: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Check() {
  return (
    <div className="w-4 h-4 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function renderCellValue(value: string, isZengest: boolean) {
  if (value === '—') {
    return <span className="text-slate-300 font-['DM_Sans']">—</span>;
  }
  if (value.toLowerCase() === 'in arrivo') {
    return <span className="text-slate-400 italic font-['DM_Sans'] text-sm">In arrivo</span>;
  }
  if (value === '✓') {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="mx-auto"
      >
        <path
          d="M3.5 9L7 12.5L14.5 5.5"
          stroke={isZengest ? '#3B6FD4' : '#475569'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <span className={`font-['DM_Sans'] text-sm ${isZengest ? 'text-slate-700' : 'text-slate-600'}`}>
      {value}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ComparisonTemplate(props: ComparisonProps) {
  const {
    competitor,
    metaTitle,
    metaDescription,
    slug,
    tagline,
    intro,
    whatZengest,
    whatCompetitor,
    features,
    pricingZengest,
    pricingCompetitor,
    chooseZengest,
    chooseCompetitor,
    chooseCompetitorLabel,
    faq,
    ctaText,
  } = props;

  const [openFaq, setOpenFaq] = useState<boolean[]>(faq.map(() => false));

  function toggleFaq(index: number) {
    setOpenFaq(prev => prev.map((open, i) => (i === index ? !open : open)));
  }

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        path={`/vs/${slug}`}
        type="article"
        useExactTitle
        jsonLd={faq.length ? faqSchema(faq.map(item => ({ question: item.q, answer: item.a }))) : undefined}
      />

      <div className="bg-white min-h-screen font-['DM_Sans']">

        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-6 pt-14 pb-10">
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 text-[#0D9488] text-xs font-semibold font-['DM_Sans'] px-3 py-1.5 rounded-full mb-6">
              ZenGest vs {competitor}
            </div>

            {/* H1 */}
            <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl text-[#00122F] leading-tight mb-4">
              ZenGest vs {competitor}:<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {tagline}
              </span>
            </h1>

            {/* Breadcrumb date */}
            <p className="text-slate-400 text-sm font-['DM_Sans']">
              Confronto aggiornato: maggio 2026
            </p>
          </div>
        </section>

        {/* ── 2. Intro ────────────────────────────────────────────────────── */}
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-6 pb-12">
            <div className="space-y-4">
              {intro.map((paragraph, i) => (
                <p key={i} className="text-slate-600 text-base leading-relaxed font-['DM_Sans']">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Cosa fa ciascuno ─────────────────────────────────────────── */}
        <section className="bg-[#F8FAFC] py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] mb-8 text-center">
              Cosa fa ciascuno
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ZenGest card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#3B6FD4]" />
                  <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-base">
                    ZenGest
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-['DM_Sans']">
                  {whatZengest}
                </p>
              </div>

              {/* Competitor card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-base">
                    {competitor}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-['DM_Sans']">
                  {whatCompetitor}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Feature comparison table ─────────────────────────────────── */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] mb-8 text-center">
              Confronto funzionalità
            </h2>

            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-[#00122F] text-white text-sm font-['DM_Sans'] font-semibold">
                <div className="px-4 py-3 text-slate-300">Funzionalità</div>
                <div className="px-4 py-3 text-center text-[#A7BCF5]">ZenGest</div>
                <div className="px-4 py-3 text-center text-slate-300">{competitor}</div>
              </div>

              {/* Rows */}
              {features.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 border-t border-slate-100 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                  }`}
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
          </div>
        </section>

        {/* ── 5. Pricing ──────────────────────────────────────────────────── */}
        <section className="bg-[#F8FAFC] py-14">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] mb-8 text-center">
              Prezzi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ZenGest pricing */}
              <div className="bg-white rounded-2xl border border-[#3B6FD4]/30 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#3B6FD4]" />
                  <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-base">
                    ZenGest
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-['DM_Sans']">
                  {pricingZengest}
                </p>
              </div>

              {/* Competitor pricing */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-base">
                    {competitor}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-['DM_Sans']">
                  {pricingCompetitor}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Chi dovrebbe scegliere ───────────────────────────────────── */}
        <section className="bg-white py-14">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] mb-8 text-center">
              Chi dovrebbe scegliere cosa?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Choose ZenGest */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-['DM_Sans'] font-semibold text-[#00122F] text-sm mb-4">
                  Scegli ZenGest se:
                </h3>
                <ul className="space-y-3">
                  {chooseZengest.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check />
                      <span className="text-slate-600 text-sm font-['DM_Sans'] leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Choose competitor */}
              <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6">
                <h3 className="font-['DM_Sans'] font-semibold text-slate-600 text-sm mb-4">
                  {chooseCompetitorLabel}
                </h3>
                <ul className="space-y-3">
                  {chooseCompetitor.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-slate-500 text-sm font-['DM_Sans'] leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. FAQ ──────────────────────────────────────────────────────── */}
        <section className="bg-[#F8FAFC] py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] mb-8 text-center">
              Domande frequenti
            </h2>

            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                    aria-expanded={openFaq[i]}
                  >
                    <span className="font-['DM_Sans'] font-semibold text-[#00122F] text-sm leading-snug pr-4">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-200 ${
                        openFaq[i] ? 'rotate-180' : ''
                      }`}
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
          </div>
        </section>

        {/* ── 8. Bottom CTA ───────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(160deg, #C8D9F0 0%, #D6E4F0 30%, #E8EEF5 55%, #EDE8DC 80%, #E8DFC8 100%)',
          }}
          className="py-20"
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] mb-4 leading-tight">
              {ctaText}
            </h2>
            <p className="text-slate-600 font-['DM_Sans'] text-base mb-8 max-w-xl mx-auto">
              Prova ZenGest gratis — nessuna carta di credito richiesta.
            </p>
            <a
              href="https://app.zengest.it/sign-up/"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              Inizia gratis
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
