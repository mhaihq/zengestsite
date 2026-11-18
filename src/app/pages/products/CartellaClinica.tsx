import { Link } from "react-router";
import { ProductTemplate } from "./ProductTemplate";
import { CartellaDigitaleSection } from "../../components/CartellaSectionDigitale";

export function CartellaClinica() {
  return (
    <ProductTemplate
      slug="cartella-clinica"
      seoTitle="Cartella clinica digitale per psicologi · Gestione pazienti | ZenGest"
      seoDescription="La cartella del paziente in un'unica scheda: anagrafica, consenso firmato, sedute, note di andamento, documenti, contesto clinico e fatture. Aggiornata a ogni seduta."
      keywords="cartella clinica psicologo, gestionale pazienti psicologi, cartella clinica digitale, software studio psicologico, consenso informato digitale"
      eyebrow="Cartella clinica"
      title="Tutto il paziente,"
      titleAccent="in un posto solo."
      subtitle="Anagrafica, consenso, sedute, note di andamento, documenti, contesto clinico e fatture nella stessa scheda. Ogni seduta registrata aggiorna la cartella senza che tu debba copiare nulla."
      showcase={<CartellaDigitaleSection />}
      featuresTitle="Cosa trovi nella scheda del paziente"
      features={[
        { title: "Consenso informato digitale", body: "Il paziente firma sul tuo schermo, oppure condividi o stampi il modulo. Il menu Consenso mostra se è firmato e conserva la copia." },
        { title: "Prep Sessione", body: "Prima dell'incontro: compiti del clinico e del paziente, prossima seduta e riepilogo dell'ultima." },
        { title: "Sessioni e riepilogo", body: "Tutte le sedute in ordine cronologico, con nota e trascrizione, e una panoramica del percorso generata dalle sessioni." },
        { title: "Contesto clinico", body: "Incolli o carichi anamnesi, formulazione del caso e terapie precedenti. ZenGest lo usa nella preparazione e nell'Assistente." },
        { title: "Documenti", body: "Referti, test e relazioni in PDF, Word o immagine, anche le foto dei tuoi appunti scritti a mano." },
        { title: "Note di andamento", body: "Annoti l'andamento del percorso scrivendo o dettando. Se esci per sbaglio, la bozza resta salvata." },
      ]}
      stepsTitle="Come si costruisce la cartella"
      steps={[
        { title: "Crea il paziente", body: "Bastano nome, cognome, lingua della seduta e data della prima seduta. Il resto lo completi quando serve." },
        { title: "Raccogli il consenso", body: "ZenGest ti propone subito il modulo: firma ora, condividi o scarica." },
        { title: "Lavora come sempre", body: "Registri le sedute, carichi documenti, scrivi note. Puoi anche inserire sedute passate con la loro data." },
        { title: "Ritrova tutto", body: "Cerchi il paziente per nome e trovi ogni informazione nella sua scheda, pronta per la prossima seduta." },
      ]}
      trust={{
        title: "Una cartella in Europa",
        body: (
          <>
            <p>Database, documenti, note, trascrizioni e backup sono su server a Francoforte, in Germania. Non c'è condivisione di dati tra account.</p>
            <p>Il DPA per il trattamento dei dati è incluso in tutti i piani. Dettagli su fornitori e trasferimenti in <Link to="/sicurezza" className="text-[#0D9488] font-medium hover:underline">Sicurezza</Link>.</p>
          </>
        ),
      }}
      plan={{
        title: "Inclusa in tutti e due i prodotti",
        body: (
          <>
            <p>Con la Fatturazione, da €36 + IVA all'anno, se non ti serve l'AI.</p>
            <p>Con l'AI clinica, da €19 + IVA al mese, insieme a note AI e Assistente Zen. Puoi aggiungere la fatturazione nello stesso pagamento.</p>
          </>
        ),
      }}
      faqs={[
        { q: "Posso inserire sedute fatte prima di usare ZenGest?", a: "Sì. Crei una sessione senza registrare, scegli data e ora passate e aggiungi appunti, un audio o dei documenti." },
        { q: "Che tipo di documenti posso caricare?", a: "PDF, Word e immagini, comprese le foto di appunti scritti a mano." },
        { q: "Dove sono conservati i dati?", a: "La cartella del paziente (database, documenti, note, trascrizioni e backup) è su server a Francoforte, in Germania. Trascrizione e generazione delle note passano oggi anche da fornitori statunitensi: i dettagli sono nella pagina Sicurezza." },
        { q: "Posso eliminare i dati di un paziente?", a: "Puoi eliminare singole sessioni in qualsiasi momento. Per la cancellazione completa dei dati di un paziente, scrivici e la completiamo per te." },
        { q: "Il paziente può firmare il consenso a distanza?", a: "Sì. Oltre alla firma sul tuo schermo, puoi condividere il modulo con il paziente o scaricarlo da stampare." },
      ]}
    />
  );
}
