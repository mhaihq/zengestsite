import { Link } from "react-router";
import { ProductTemplate } from "./ProductTemplate";
import { HowItWorks } from "../../components/HowItWorks";

export function NoteClinicheAI() {
  return (
    <ProductTemplate
      slug="note-cliniche-ai"
      seoTitle="Note cliniche AI per psicologi · Trascrizione delle sedute | ZenGest"
      seoDescription="Registra la seduta in presenza o online: ZenGest la trascrive, riconosce chi parla e prepara la bozza di nota in formato SOAP, DAP, BIRP o con il tuo modello."
      keywords="note cliniche AI, trascrizione sedute psicologo, AI scribe psicologi, nota SOAP automatica, DAP, BIRP"
      eyebrow="Note cliniche AI"
      title="Tu parli con il paziente."
      titleAccent="La nota la prepara ZenGest."
      subtitle="Registra la seduta in presenza o online, oppure carica un audio. ZenGest trascrive, riconosce chi parla e prepara una bozza di nota nel formato che usi: SOAP, DAP, BIRP o un modello tuo. Tu la rivedi e la validi."
      showcase={<HowItWorks />}
      featuresTitle="Cosa fa"
      features={[
        { title: "In presenza o online", body: "Registri dal computer o dal telefono. Per le sedute su Meet, Zoom o Teams aggiungi l'audio della scheda e ZenGest registra anche la voce del paziente." },
        { title: "Audio caricato o nota vocale", body: "Importi una registrazione già fatta (mp3, m4a, wav e altri formati), oppure racconti la seduta a voce dopo averla conclusa." },
        { title: "Trascrizione per oratore", body: "Il testo della seduta è diviso tra professionista e paziente, e resta consultabile accanto alla nota per verificare un passaggio." },
        { title: "Il tuo formato di nota", body: "Scegli tra i Modelli Zen, organizzati per approccio e categoria, oppure crei un modello partendo da una tua nota, da un file o descrivendolo a voce." },
        { title: "Modifica magica", body: "Dai un'istruzione a parole, come «più concisa» o «in elenco puntato», su una sezione o su tutta la nota. Puoi anche rigenerarla con un altro modello." },
        { title: "Esporta e condividi", body: "Copi una sezione o la nota intera, esporti nota e trascrizione in PDF, condividi via email o WhatsApp." },
      ]}
      stepsTitle="Dalla seduta alla nota"
      steps={[
        { title: "Scegli paziente e modello", body: "Dalla Home selezioni il paziente e il modello di nota. Si apre la preparazione con i follow-up aperti e il riepilogo dell'ultima seduta." },
        { title: "Registra", body: "Clicca Registra sessione e lavora come sempre. Puoi mettere in pausa. La registrazione deve durare almeno 2 minuti." },
        { title: "Ricevi la bozza", body: "Alla fine salvi la sessione: in pochi minuti trovi trascrizione e bozza di nota nella cartella del paziente." },
        { title: "Rivedi e valida", body: "Correggi a mano o con la Modifica magica. La nota resta una bozza finché non la rivedi tu." },
      ]}
      trust={{
        title: "Consenso, pseudonimizzazione, controllo",
        body: (
          <>
            <p>Prima di registrare raccogli il consenso del paziente: il modulo è in ZenGest e il paziente può firmarlo sul tuo schermo. <Link to="/guida-consenso" className="text-[#0D9488] font-medium hover:underline">Come raccogliere il consenso</Link>.</p>
            <p>Nella trascrizione nomi, luoghi e altri identificativi vengono sostituiti con etichette neutre prima della generazione della nota. Ogni valutazione clinica resta tua: lo strumento ha solo una funzione di supporto.</p>
            <p>Dove passano i dati e con quali garanzie: <Link to="/sicurezza" className="text-[#0D9488] font-medium hover:underline">Sicurezza</Link> e <Link to="/dpa" className="text-[#0D9488] font-medium hover:underline">DPA</Link>.</p>
          </>
        ),
      }}
      plan={{
        title: "Incluso in AI Clinica",
        body: (
          <>
            <p>Start: 20 sedute al mese, €19 + IVA.<br />Pro: 50 sedute al mese, €39 + IVA.<br />Plus: 150 sedute al mese, €79 + IVA.</p>
            <p>Con la fatturazione aggiunta: €22, €43 o €85 + IVA al mese. Con il pagamento annuale, 2 mesi sono gratis. La prova dura 30 giorni, con 20 sedute.</p>
          </>
        ),
      }}
      faqs={[
        { q: "Quanto tempo serve per avere la nota?", a: "Pochi minuti dalla fine della seduta. Trascrizione e bozza compaiono nella sessione del paziente; non devi tenere aperta la pagina dopo il caricamento dell'audio." },
        { q: "Funziona con le sedute online?", a: "Sì. Se usi le cuffie, durante la registrazione clicca Aggiungi audio tab e scegli la scheda di Meet, Zoom o Teams: così viene registrata anche la voce del paziente." },
        { q: "In che lingua trascrive?", a: "Nella lingua impostata per il paziente. Se in una seduta parlate un'altra lingua, puoi cambiarla solo per quella seduta." },
        { q: "La nota è già definitiva?", a: "No. È una bozza da rivedere: la correggi a mano o con la Modifica magica, e la validi tu prima di usarla." },
        { q: "Serve il consenso del paziente?", a: "Sì, prima di registrare. In ZenGest trovi il modulo di consenso: il paziente può firmarlo sul tuo schermo, oppure puoi condividerlo o stamparlo." },
        { q: "Posso usare un mio formato di nota?", a: "Sì. Puoi personalizzare un Modello Zen o crearne uno da zero: per ogni sezione scegli titolo, stile, lunghezza e contenuto." },
      ]}
    />
  );
}
