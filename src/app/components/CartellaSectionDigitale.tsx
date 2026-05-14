import Lottie from "lottie-react";
import zengestFolderAnim from "../../../zengest_folder.json";

const INTEGRATIONS = [
  { name: "reMarkable", logo: "/remarkable.webp", className: "h-14 w-auto" },
  { name: "Microsoft Word", logo: "/word.png", className: "h-9 w-auto" },
  { name: "GoodNotes", logo: "/goodnotes.png", className: "h-14 w-auto" },
  { name: "Evernote", logo: "/evernote.png", className: "h-9 w-auto" },
];

export function CartellaDigitaleSection() {
  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: text */}
          <div className="lg:w-[42%] shrink-0">
            <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
              Cartella digitale
            </div>
            <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-black leading-[1.05] tracking-[-0.025em] mb-5">
              Carichi quello che hai.{" "}
              <span style={{ background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Diventa cartella vera.
              </span>
            </h2>
            <p className="font-['DM_Sans'] text-base text-slate-500 leading-relaxed mb-8">
              Foto, PDF, audio, Word — anche i tuoi appunti a mano. ZenGest legge tutto e lo trasforma in cartella clinica strutturata.
            </p>

            <div className="flex flex-col gap-3">
              {[
                "PDF, foto, audio, Word, scansioni. ZenGest legge, trascrive, struttura.",
                "Appunti trascritti e audio indicizzati, collegati al paziente. Tutto cercabile.",
                "Fotografa il foglio. ZenGest lo legge e lo archivia.",
              ].map(line => (
                <div key={line} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#3B6FD4]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#3B6FD4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{line}</p>
                </div>
              ))}
            </div>

            {/* Integrations strip */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Funziona con gli strumenti che già usi
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                {INTEGRATIONS.map(tool => (
                  <img
                    key={tool.name}
                    src={tool.logo}
                    alt={tool.name}
                    className={`${tool.className} object-contain opacity-60 hover:opacity-100 transition-opacity`}
                  />
                ))}
                <span className="font-['DM_Sans'] text-sm text-slate-400">e altri</span>
              </div>
            </div>
          </div>

          {/* Right: Lottie animation */}
          <div className="flex-1 w-full flex items-center justify-center">
            <Lottie animationData={zengestFolderAnim} loop={true} className="w-full" />
          </div>

        </div>

      </div>
    </section>
  );
}
