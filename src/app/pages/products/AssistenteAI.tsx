import { Link } from "react-router";
import { ProductTemplate } from "./ProductTemplate";
import { ZenAssistantSection } from "../../components/ZenAssistantSection";

export function AssistenteAI() {
  return (
    <ProductTemplate
      slug="assistente-ai"
      seoTitle="Assistente AI per psicologi · Assistente Zen | ZenGest"
      seoDescription="L'Assistente Zen conosce la storia del paziente: sedute, note, contesto e documenti. Prepara la seduta, ragiona sul caso con te e scrive relazioni modificabili."
      keywords="assistente AI psicologi, AI per psicoterapeuti, Ask ZenGest, copilota clinico, relazione psicologica AI"
      eyebrow="Assistente Zen"
      title="Chiedi al caso."
      titleAccent="Risponde con la storia del paziente."
      subtitle="L'Assistente Zen lavora su sedute, note, contesto clinico e documenti del paziente. Ti aiuta a preparare la seduta, a ragionare sul caso e a scrivere relazioni, partendo da quello che c'è in cartella e non da un prompt generico."
      showcase={<ZenAssistantSection />}
      featuresTitle="Cosa fa"
      features={[
        { title: "Prepara la seduta", body: "Prima di ricevere il paziente vedi follow-up aperti, compiti assegnati e il riepilogo dell'ultima seduta." },
        { title: "Ragiona sul caso", body: "Chiedi quali temi ricorrono, come sta andando il percorso o cosa è emerso nelle ultime sedute. Puoi scrivere o dettare la domanda." },
        { title: "Agenti per approccio", body: "Orienti le risposte con un agente: CBT, EMDR, sistemico-relazionale, psicodinamico o psicologo forense." },
        { title: "I tuoi agenti", body: "Crei un agente con le tue istruzioni, i tuoi spunti di conversazione e i tuoi file di riferimento (fino a 10 MB ciascuno)." },
        { title: "Documenti modificabili", body: "Quando scrive una relazione o un riepilogo, lo apri come documento: lo modifichi, vedi le versioni precedenti e lo esporti in PDF o Word." },
        { title: "Allegati e domande generali", body: "Alleghi un file o una foto alla domanda. Per domande che non riguardano un paziente, lo usi senza selezionarne uno." },
      ]}
      stepsTitle="Come si usa"
      steps={[
        { title: "Apri l'Assistente", body: "Dalla barra in alto, oppure dalla scheda del paziente." },
        { title: "Scegli il paziente", body: "L'Assistente usa solo sedute, note, contesto e documenti del paziente selezionato." },
        { title: "Fai la domanda", body: "Parti da uno spunto suggerito o scrivi liberamente. Se vuoi, scegli un agente per l'approccio." },
        { title: "Lavora sul risultato", body: "Copia la risposta, oppure apri il documento per modificarlo ed esportarlo." },
      ]}
      trust={{
        title: "Un supporto, non una diagnosi",
        body: (
          <>
            <p>Le risposte aiutano a ragionare sul caso, ma ogni valutazione e decisione clinica resta tua. Verifica sempre quello che usi.</p>
            <p>Per rispondere, l'Assistente indicizza le trascrizioni e le note del paziente presso il fornitore del modello AI, con garanzie contrattuali per il trasferimento. I dati non vengono usati per addestrare modelli. Dettagli in <Link to="/sicurezza" className="text-[#0D9488] font-medium hover:underline">Sicurezza</Link> e nel <Link to="/dpa" className="text-[#0D9488] font-medium hover:underline">DPA</Link>.</p>
          </>
        ),
      }}
      plan={{
        title: "Incluso in tutti i piani AI Clinica",
        body: (
          <>
            <p>L'Assistente Zen è incluso in Start, Pro e Plus, da €19 + IVA al mese.</p>
            <p>Lo provi gratis per 30 giorni, insieme alle note cliniche AI.</p>
          </>
        ),
      }}
      faqs={[
        { q: "Che differenza c'è con ChatGPT?", a: "L'Assistente Zen conosce la storia del paziente che selezioni (sedute, note, contesto e documenti) e lavora dentro ZenGest, con un accordo per il trattamento dei dati. Con ChatGPT dovresti incollare ogni volta i dati del paziente in uno strumento non pensato per dati sanitari." },
        { q: "Da dove prende le risposte?", a: "Da sedute, note, contesto clinico e documenti del paziente selezionato, insieme alla conoscenza generale del modello AI. Non è addestrato su cartelle cliniche reali." },
        { q: "Può fare diagnosi?", a: "No. È uno strumento di supporto: suggerisce, riassume e scrive bozze. La valutazione clinica e le decisioni restano del professionista." },
        { q: "Posso usarlo senza selezionare un paziente?", a: "Sì, per domande generali che non riguardano dati clinici, come una tecnica o una traccia di lavoro." },
        { q: "Posso orientarlo sul mio approccio?", a: "Sì. Puoi scegliere uno degli agenti già pronti (CBT, EMDR, sistemico-relazionale, psicodinamico, psicologo forense) o crearne uno tuo con istruzioni e file di riferimento." },
      ]}
    />
  );
}
