import { Lock, Brain, BookOpen, Eye, Database } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "ANONIMIZZAZIONE & PRIVACY",
    date: "ANONIMIZZAZIONE & PRIVACY",
    content: "Pseudonimizzazione dei dati, controllo sul trattamento e infrastruttura europea. I dati clinici non lasciano mai lo spazio del professionista.",
    category: "Privacy",
    icon: Lock,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "MEMORIA CLINICA",
    date: "MEMORIA CLINICA",
    content: "Ogni seduta aggiorna lo storico del paziente e resta collegata al caso. Il contesto è sempre disponibile, senza nulla da ricostruire.",
    category: "Memoria",
    icon: Brain,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "MODELLI TERAPEUTICI",
    date: "MODELLI TERAPEUTICI",
    content: "Template e strutture di nota adattabili al tuo orientamento clinico: CBT, psicodinamico, ACT, EMDR, sistemico. Il tuo modo di documentare, supportato dall'AI.",
    category: "Modelli",
    icon: BookOpen,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "ANALISI DELLO STORICO",
    date: "ANALISI DELLO STORICO",
    content: "Fai domande sulle sedute precedenti e osserva come evolve il caso nel tempo. ZenGest risponde usando il contesto reale del paziente, non prompt generici.",
    category: "Analisi",
    icon: Eye,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 5,
    title: "CARTELLA CLINICA STRUTTURATA",
    date: "CARTELLA CLINICA STRUTTURATA",
    content: "La storia di ogni paziente come archivio interrogabile. Ogni informazione collegata, organizzata, ricercabile. La base su cui Zen costruisce ogni risposta.",
    category: "Dati",
    icon: Database,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 100,
  },
];

export function IntelligenceSection() {
  return (
    <RadialOrbitalTimeline
      timelineData={timelineData}
      label="COSA C'È SOTTO ZEN"
      title="Cinque livelli. Non un trascrittore con un prompt."
      description="ZenGest non è un prompt sopra una trascrizione. È un sistema clinico composto da più livelli: privacy, memoria, modelli di documentazione, cartella strutturata e assistente AI."
    />
  );
}
