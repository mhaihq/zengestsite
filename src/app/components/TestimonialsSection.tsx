import { motion } from "motion/react";
import { TestimonialsColumn, type Testimonial } from "./ui/testimonials-columns";

const testimonials: Testimonial[] = [
  {
    text: "Prima passavo 40 minuti dopo ogni seduta a scrivere le note. Ora sono pronte in un minuto. È cambiato completamente il mio rapporto con la documentazione.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Chiara M.",
    role: "Psicologa clinica, Milano",
  },
  {
    text: "Il riepilogo automatico prima della seduta è la cosa che uso di più. Arrivo preparata senza dover rileggere tutto. I miei pazienti lo sentono.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Federica R.",
    role: "Psicoterapeuta, Roma",
  },
  {
    text: "Ero scettico sull'AI in ambito clinico. ZenGest mi ha convinto perché capisce il linguaggio psicologico e non inventa nulla — rispecchia quello che è davvero emerso in seduta.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Marco B.",
    role: "Psicologo, Torino",
  },
  {
    text: "Lavoro con un orientamento psicodinamico e temevo che un tool AI non si adattasse. Invece le note sono coerenti con il mio stile. Impressionante.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    name: "Alessia C.",
    role: "Psicoterapeuta psicodinamica, Bologna",
  },
  {
    text: "Ho finalmente smesso di portarmi il lavoro a casa la sera. Le note le genero in studio e poi stacco davvero.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Luca F.",
    role: "Psicologo, Firenze",
  },
  {
    text: "La funzione che identifica i temi ricorrenti tra le sedute è quella che mi ha sorpreso di più. Mi ha fatto notare un pattern che stavo sottovalutando.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Valentina S.",
    role: "Psicologa, Napoli",
  },
  {
    text: "Gestisco uno studio con altri due colleghi. ZenGest ci ha permesso di avere una cartella clinica condivisa e strutturata. Prima era un disastro.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Andrea V.",
    role: "Psicologo, Padova",
  },
  {
    text: "Uso ZenGest anche per le sedute online. La trascrizione funziona benissimo e l'anonimizzazione mi dà tranquillità sul fronte privacy.",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    name: "Sara M.",
    role: "Psicoterapeuta CBT, Genova",
  },
  {
    text: "Ho ridotto il tempo amministrativo di almeno il 60%. Posso seguire più pazienti senza sentirmi sopraffatta dalla documentazione.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Giulia R.",
    role: "Psicologa, Verona",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] uppercase text-slate-400 mb-6
            before:content-[''] before:w-6 before:h-px before:bg-slate-400 before:opacity-40
            after:content-[''] after:w-6 after:h-px after:bg-slate-400 after:opacity-40
          ">
            Testimonianze
          </div>
          <h2 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-4">
            Chi lo usa, non torna indietro.
          </h2>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed">
            Psicologi e psicoterapeuti italiani che hanno cambiato il loro modo di lavorare.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[680px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={20} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
        </div>
      </div>
    </section>
  );
}
