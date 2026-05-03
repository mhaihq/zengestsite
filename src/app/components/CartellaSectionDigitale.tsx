import Lottie from "lottie-react";
import zengestFolderAnim from "../../../zengest_folder.json";

export function CartellaDigitaleSection() {
  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: text — narrower so animation gets more room */}
          <div className="lg:w-[42%] shrink-0">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 font-['DM_Sans'] mb-6">
              Cartella digitale
            </div>
            <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-[-0.025em] mb-5">
              Carichi quello che hai. Diventa una <span style={{ background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>cartella vera.</span>
            </h2>
            <p className="font-['DM_Sans'] text-base text-slate-500 leading-relaxed mb-8">
              Foto, PDF, audio, Word. ZenGest prende tutto quello che hai già e lo trasforma in una cartella clinica strutturata. Non parti da zero — parti da dove sei.
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <p className="font-['DM_Sans'] text-sm font-semibold text-black mb-0.5">Qualsiasi formato.</p>
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">PDF, foto, audio, Word, scansioni. ZenGest legge, trascrive, struttura.</p>
              </div>
              <div>
                <p className="font-['DM_Sans'] text-sm font-semibold text-black mb-0.5">Diventa cartella clinica.</p>
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Appunti trascritti, audio indicizzati, documenti collegati al paziente. Tutto cercabile.</p>
              </div>
              <div>
                <p className="font-['DM_Sans'] text-sm font-semibold text-black mb-0.5">Continui a lavorare come vuoi.</p>
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">Carta, audio, note al volo. ZenGest organizza dietro le quinte.</p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl font-['DM_Sans'] font-semibold text-base text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
              >
                Richiedi accesso anticipato
              </a>
            </div>
          </div>

          {/* Right: Lottie animation — takes remaining width */}
          <div className="flex-1 w-full flex items-center justify-center">
            <Lottie animationData={zengestFolderAnim} loop={true} className="w-full" />
          </div>

        </div>
      </div>
    </section>
  );
}
