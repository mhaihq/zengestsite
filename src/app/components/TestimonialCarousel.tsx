export function TestimonialCarousel() {
  return (
    <section className="overflow-hidden bg-white px-6 py-16 md:py-24 lg:py-28">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* Image */}
          <div className="order-last md:order-first">
            <div className="rounded-3xl overflow-hidden aspect-square w-full max-w-sm mx-auto shadow-lg">
              <img
                src="/ale.png"
                alt="Alessandra, co-fondatrice di ZenGest"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-3">
              La storia
            </div>

            <p className="font-['DM_Sans'] text-sm font-semibold text-[#3B6FD4] uppercase tracking-widest mb-5">
              Costruito per psicologi, da psicologi
            </p>

            <blockquote className="font-['Instrument_Serif'] text-2xl md:text-3xl text-[#00122F] leading-[1.3] tracking-[-0.01em] mb-8">
              "Ho immaginato ZenGest per aiutare lo psicologo a fare meglio il proprio lavoro, partendo dalla mia pratica clinica, che poi ho condiviso con altri colleghi e colleghe. ZenGest è costruito insieme e per gli psicologi, perché possano continuare a fare meglio ciò che sanno fare: la clinica."
            </blockquote>

            <div className="flex items-center gap-4">
              <div>
                <p className="font-['DM_Sans'] font-semibold text-[#00122F]">Alessandro Lombardo</p>
                <p className="font-['DM_Sans'] text-sm text-slate-400">Fondatore, ZenGest e Unozen</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
