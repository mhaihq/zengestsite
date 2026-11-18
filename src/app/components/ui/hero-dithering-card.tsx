import { useEffect, useRef } from "react";

const BADGES = [
  {
    label: "GDPR",
    sub: "Dati clinici protetti",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          return <circle key={i} cx={14 + 11 * Math.cos(angle)} cy={14 + 11 * Math.sin(angle)} r="1.5" fill="#aaa" />;
        })}
      </svg>
    ),
  },
  {
    label: "EU AI Act",
    sub: "AI ad alto rischio conforme",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          return <circle key={i} cx={14 + 11 * Math.cos(angle)} cy={14 + 11 * Math.sin(angle)} r="1.5" fill="#aaa" />;
        })}
        <rect x="9" y="9" width="10" height="10" rx="1.5" stroke="#555" strokeWidth="1.4" fill="none"/>
        <rect x="11" y="11" width="6" height="6" rx="0.5" stroke="#555" strokeWidth="1" fill="none" strokeDasharray="1.5 0.8"/>
        {[[11,7,11,9],[14,7,14,9],[17,7,17,9],[11,19,11,21],[14,19,14,21],[17,19,17,21],[7,11,9,11],[7,14,9,14],[7,17,9,17],[19,11,21,11],[19,14,21,14],[19,17,21,17]].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
        ))}
      </svg>
    ),
  },
  {
    label: "Dati in EU",
    sub: "Server solo europei",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="9" rx="6" ry="2.5" stroke="#555" strokeWidth="1.4" fill="none"/>
        <path d="M8 9v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V9" stroke="#555" strokeWidth="1.4" fill="none"/>
        <path d="M8 14v5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v-5" stroke="#555" strokeWidth="1.4" fill="none"/>
      </svg>
    ),
  },
];

// The blue-and-gold wash that used to frame the app showcase, now the hero's own backdrop.
const HERO_BG = [
  "radial-gradient(60% 55% at 6% 0%, rgba(122,155,232,0.75) 0%, transparent 62%)",
  "radial-gradient(55% 50% at 96% 6%, rgba(167,188,245,0.7) 0%, transparent 62%)",
  "radial-gradient(60% 60% at 100% 78%, rgba(247,214,140,0.8) 0%, transparent 64%)",
  "radial-gradient(60% 55% at 0% 88%, rgba(59,111,212,0.35) 0%, transparent 62%)",
  "radial-gradient(110% 55% at 50% 115%, rgba(240,225,190,0.9) 0%, transparent 58%)",
  "linear-gradient(160deg, #eaf1fb 0%, #f4f4f9 45%, #faf3e6 100%)",
].join(", ");

/**
 * Hero. It stays pinned while the next section (the deep-blue "Dentro ZenGest" panel)
 * slides over it; meanwhile the text drifts up and fades and the backdrop drifts down,
 * so the two layers move at different speeds. Wrap it and the next section in one
 * `relative` container: the hero unpins when that container ends.
 */
export function CTASection() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const inner = content.current;
    const bg = backdrop.current;
    if (!el || !inner || !bg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    // A hero taller than the viewport pins by its bottom edge, so nothing is cut off.
    const fit = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    const update = () => {
      raf = 0;
      if (reduced) return;
      const p = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      inner.style.transform = `translate3d(0, ${(-p * 90).toFixed(1)}px, 0) scale(${(1 - p * 0.06).toFixed(4)})`;
      inner.style.opacity = String(Math.max(0, 1 - p * 1.15));
      bg.style.transform = `translate3d(0, ${(p * 70).toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      fit();
      schedule();
    };
    fit();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={root}
      className="sticky top-0 z-0 -mt-16 md:-mt-20 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-28 md:pt-36 md:pb-36"
    >
      {/* Backdrop, a little taller than the hero so it can drift without showing an edge */}
      <div ref={backdrop} aria-hidden="true" className="absolute inset-x-0 -top-24 -bottom-24 will-change-transform" style={{ background: HERO_BG }} />

      <div ref={content} className="relative z-10 flex flex-col items-center will-change-transform">
        {/* Top badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/90 shadow-sm">
          <img src="/ale.png" alt="Alessandro Lombardo" className="w-5 h-5 rounded-full object-cover object-top shrink-0" />
          <span className="font-['DM_Sans'] text-xs font-medium text-[#00122F]">Sviluppato da psicologi italiani</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center max-w-4xl leading-[1.1] tracking-[-0.015em] mb-5 text-[#00122F] px-2">
          AI per Psicologi.<br />
          Note, Assistente e Cartelle,<br className="hidden sm:block" /> in modo intelligente.
        </h1>

        {/* Subheadline */}
        <p className="font-['DM_Sans'] text-base md:text-lg text-center max-w-2xl text-[#00122F]/75 mb-8 leading-relaxed px-2">
          Trascrivi le sedute, aggiorna le cartelle e usa l'AI per note, piani di trattamento e analisi cliniche. Conforme al GDPR e al Codice Deontologico.
        </p>

        {/* Trust badges, above the CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-9">
          {BADGES.map(b => (
            <div key={b.label} className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 shadow-md">
              {b.icon}
              <div>
                <p className="font-['DM_Sans'] text-[12px] font-bold text-[#00122F] leading-none mb-0.5">{b.label}</p>
                <p className="font-['DM_Sans'] text-[11px] text-slate-500 leading-none">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://app.zengest.it/sign-up/"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg font-['DM_Sans'] font-medium text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md text-base"
        >
          Prova gratis
        </a>
      </div>
    </section>
  );
}
