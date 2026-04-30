import { Marquee } from "./ui/marquee";
import { FileText, Mic, Brain, Zap } from "lucide-react";

const group1 = [
  "Come è andata l'ultima seduta con Marco?",
  "Su cosa eravamo rimasti?",
  "Cosa dovrei tenere presente oggi?",
];

const group2 = [
  "Quali temi ricorrenti emergono?",
  "Quali obiettivi terapeutici sono ancora aperti?",
  "Che cambiamenti si vedono nelle ultime sedute?",
  "Quali pattern emergono nello storico?",
  "Quali temi sembrano ripetersi?",
];

const group3 = [
  "Genera la nota clinica in formato SOAP",
  "Prepara una sintesi del caso",
  "Aggiorna lo storico del paziente",
  "Quali elementi potrei voler rivedere?",
];

const features = [
  {
    title: "Cartella clinica intelligente",
    description:
      "Ogni paziente ha uno storico ordinato: sedute, note, obiettivi, temi ricorrenti e documenti. Tutto consultabile e interrogabile con l'AI.",
    icon: FileText,
  },
  {
    title: "Note cliniche automatiche",
    description:
      "Registra una seduta, carica un audio o detta un riepilogo. ZenGest genera una nota strutturata nel formato che preferisci: SOAP, DAP, BIRP o il tuo template.",
    icon: Mic,
  },
  {
    title: "AI sullo storico del paziente",
    description:
      "Fai domande sulle sedute precedenti, ritrova il contesto e osserva come evolve il caso nel tempo.",
    icon: Brain,
  },
  {
    title: "Adattato al tuo orientamento",
    description:
      "ZenGest supporta diversi stili clinici: CBT, psicodinamico, sistemico, ACT, EMDR. Puoi personalizzare template, tono e struttura delle note in base al tuo modo di lavorare.",
    icon: Zap,
  },
];

export function FeaturesMarquee() {
  return (
    <section className="relative bg-slate-50 pt-20 sm:pt-32 pb-0">
      <div className="mx-auto max-w-full">

        {/* Header */}
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-5 px-5 text-center md:px-10">
          <h2 className="font-['Instrument_Serif'] max-w-3xl text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] tracking-[-0.025em]">
            Chiedi a ZenGest quello che normalmente dovresti cercare a mano.
          </h2>
          <p className="font-['DM_Sans'] max-w-xl text-base md:text-lg text-slate-500 leading-relaxed">
            ZenGest non è un semplice note-taker. Registra le sedute, struttura la cartella clinica, recupera il contesto di ogni paziente in un secondo. Tutto quello che ti serve per lavorare meglio, senza perder tempo in documentazione.
          </p>

          {/* Marquee — 3 groups */}
          <div className="relative mx-auto w-full max-w-3xl overflow-hidden mt-4">
            <div className="absolute left-0 z-50 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 z-50 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

            <div className="flex flex-col gap-2 overflow-hidden">
              <Marquee className="[--duration:30s] [--gap:0.75rem]" repeat={5}>
                {group1.map((q) => (
                  <span key={q} className="font-['DM_Sans'] text-sm px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 whitespace-nowrap">
                    {q}
                  </span>
                ))}
              </Marquee>
              <Marquee className="[--duration:38s] [--gap:0.75rem]" repeat={4} reverse>
                {group2.map((q) => (
                  <span key={q} className="font-['DM_Sans'] text-sm px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 whitespace-nowrap">
                    {q}
                  </span>
                ))}
              </Marquee>
              <Marquee className="[--duration:28s] [--gap:0.75rem]" repeat={5}>
                {group3.map((q) => (
                  <span key={q} className="font-['DM_Sans'] text-sm px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 whitespace-nowrap">
                    {q}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-dashed border-slate-200">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-4 px-6 py-8 border-b border-dashed border-slate-200 lg:border-b-0 lg:border-r last:border-r-0"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00122F]/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#00122F]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="font-['Instrument_Serif'] text-2xl text-slate-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-['DM_Sans'] text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
