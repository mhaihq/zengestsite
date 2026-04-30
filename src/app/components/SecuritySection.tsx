import { Shield, ShieldCheck, Lock, GlobeLock, FileCheck, Server } from "lucide-react";

const items = [
  {
    icon: GlobeLock,
    title: "Progettato per supportare il GDPR",
    description: "Dati trattati su infrastruttura europea, con attenzione alla conformità al Regolamento Europeo sulla protezione dei dati.",
  },
  {
    icon: Lock,
    title: "Pseudonimizzazione automatica",
    description: "I riferimenti identificativi vengono pseudonimizzati prima dell'elaborazione AI. Il paziente non è mai riconoscibile nel testo elaborato.",
  },
  {
    icon: Shield,
    title: "Crittografia in transito e a riposo",
    description: "I dati sono cifrati durante la trasmissione e quando vengono archiviati. Accesso esclusivo al professionista autorizzato.",
  },
  {
    icon: Server,
    title: "Infrastruttura europea",
    description: "Server ospitati in data center nell'Unione Europea. Nessun dato clinico trasmesso al di fuori dei confini europei.",
  },
  {
    icon: FileCheck,
    title: "Audio eliminabile dopo la trascrizione",
    description: "Puoi scegliere di eliminare l'audio originale dopo la generazione della trascrizione. Il controllo resta al professionista.",
  },
  {
    icon: ShieldCheck,
    title: "Nessun addestramento su dati clinici",
    description: "I dati dei tuoi pazienti non vengono usati per addestrare modelli pubblici o migliorare sistemi AI di terze parti.",
  },
];

export function SecuritySection() {
  return (
    <section className="py-24 md:py-32 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">

          {/* Left */}
          <div className="lg:max-w-xs shrink-0 lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500 font-['DM_Sans'] mb-6">
              Sicurezza & Privacy
            </div>
            <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl lg:text-5xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
              Costruito per i dati clinici. Non adattato.
            </h2>
            <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">
              ZenGest è progettato per trattare informazioni cliniche sensibili con attenzione, trasparenza e controllo da parte del professionista.
            </p>
          </div>

          {/* Right grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
              {items.map((item, index) => {
                const Icon = item.icon;
                const isLastRow = index >= items.length - 2;
                const isLeftCol = index % 2 === 0;
                return (
                  <div
                    key={item.title}
                    className={[
                      "p-5 md:p-8 flex flex-col gap-3",
                      !isLastRow ? "border-b border-slate-100" : "",
                      isLeftCol ? "md:border-r md:border-slate-100" : "",
                    ].join(" ")}
                  >
                    <div className="w-9 h-9 text-[#3B6FD4]">
                      <Icon strokeWidth={1.5} className="w-full h-full" />
                    </div>
                    <h3 className="font-['DM_Sans'] text-base font-semibold text-[#00122F]">
                      {item.title}
                    </h3>
                    <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
