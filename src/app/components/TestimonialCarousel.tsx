import { DeepBlueBackdrop, DARK_PILL, SHEET } from "./ui/deep-blue";

export function TestimonialCarousel() {
  return (
    <section className={`${SHEET} isolate overflow-hidden px-6 pt-24 pb-28 md:pt-32 md:pb-40`}>
      <DeepBlueBackdrop flip />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* Image */}
          <div className="order-last md:order-first">
            <div className="rounded-3xl overflow-hidden aspect-square w-full max-w-sm mx-auto shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <img
                src="/ale.png"
                alt="Alessandro Lombardo, fondatore di ZenGest"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start">
            <div className={`${DARK_PILL} mb-3`}>
              La storia
            </div>

            <p className="font-['DM_Sans'] text-sm font-semibold text-[#A7BCF5] uppercase tracking-widest mb-5">
              Costruito per psicologi, da psicologi
            </p>

            <blockquote className="font-display text-2xl md:text-3xl text-white leading-[1.3] tracking-[-0.01em] mb-8">
              "Ho immaginato ZenGest per aiutare lo psicologo a fare meglio il proprio lavoro, partendo dalla mia pratica clinica, che poi ho condiviso con altri colleghi e colleghe. ZenGest è costruito insieme e per gli psicologi, perché possano continuare a fare meglio ciò che sanno fare: la clinica."
            </blockquote>

            <div className="flex items-center gap-4">
              <div>
                <p className="font-['DM_Sans'] font-semibold text-white">Alessandro Lombardo</p>
                <p className="font-['DM_Sans'] text-sm text-white/60">Fondatore, ZenGest e Unozen</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
