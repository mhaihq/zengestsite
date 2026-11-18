import { Link } from "react-router";
import { ProductTemplate } from "./ProductTemplate";
import { FatturazioneSection } from "../../components/FatturazioneSection";

export function Fatturazione() {
  return (
    <ProductTemplate
      slug="fatturazione"
      seoTitle="Fatturazione per psicologi con Sistema TS e SdI | ZenGest"
      seoDescription="Fatture dalle sedute, scorporo ENPAP e marca da bollo, invio al Sistema Tessera Sanitaria e allo SdI. Per regime forfettario e ordinario. Da €36/anno."
      keywords="fatturazione psicologi, fattura sanitaria psicologo, Sistema Tessera Sanitaria psicologi, fattura elettronica psicologo, ENPAP fattura, forfettario psicologo"
      eyebrow="Fatturazione"
      title="Fatturi la seduta appena finita."
      titleAccent="Al Sistema TS ci pensa ZenGest."
      subtitle="Emetti la fattura dalle sedute del paziente, con ENPAP e marca da bollo già calcolati. ZenGest la invia al Sistema Tessera Sanitaria per i pazienti e allo SdI per aziende ed enti. Da €36 + IVA all'anno."
      showcase={<FatturazioneSection />}
      featuresTitle="Cosa fa"
      features={[
        { title: "Fattura dalle sedute", body: "Se il paziente ha sedute non ancora fatturate, le selezioni ed emetti la fattura. Oppure inserisci tu l'importo." },
        { title: "Canale di invio automatico", body: "Al Sistema TS per i pazienti, allo SdI come fattura elettronica per aziende ed enti, con codice SDI o PEC." },
        { title: "ENPAP e marca da bollo", body: "Scrivi il totale pagato dal paziente: ZenGest scorpora il 2% ENPAP e aggiunge i €2 di bollo sopra €77,47, se a carico del cliente." },
        { title: "Forfettario o ordinario", body: "Imposti il regime nel profilo fiscale. Nell'elenco delle fatture vedi totali, incassato e la soglia annuale del forfettario." },
        { title: "Invio e stato al Sistema TS", body: "Le fatture pagate partono da sole, se attivi l'invio automatico. In Storico TS trovi data, protocollo ed eventuali errori da correggere." },
        { title: "Per il commercialista", body: "Esporti le fatture dell'anno in CSV e il file XML delle spese sanitarie. Note di credito e annullamenti sono inclusi." },
      ]}
      stepsTitle="Come si configura"
      steps={[
        { title: "Profilo fiscale", body: "Partita IVA, codice fiscale, indirizzo, PEC, regime, marca da bollo, ENPAP e IBAN per i bonifici." },
        { title: "Collega il Sistema TS", body: "Inserisci le credenziali del portale Sistema Tessera Sanitaria e scegli se inviare in automatico le fatture pagate." },
        { title: "Listino delle prestazioni", body: "Aggiungi le prestazioni con prezzo e durata. Le prestazioni sanitarie sono esenti IVA e vanno al Sistema TS." },
        { title: "Prima fattura", body: "Dalla scheda del paziente o da Fatturazione → Nuova fattura. Puoi salvarla in bozza o emetterla subito." },
      ]}
      trust={{
        title: "Dati fiscali in Italia",
        body: (
          <>
            <p>L'invio allo SdI e al Sistema Tessera Sanitaria avviene tramite A-Cube S.r.l., intermediario con sede in Italia. Se il paziente si oppone all'invio delle sue spese al Sistema TS, lo indichi nella sua scheda.</p>
            <p>Elenco completo dei fornitori nel <Link to="/dpa" className="text-[#0D9488] font-medium hover:underline">DPA</Link>.</p>
          </>
        ),
      }}
      plan={{
        title: "Modulo Fatturazione",
        body: (
          <>
            <p>100 fatture all'anno: €36 + IVA.<br />250 fatture all'anno: €48 + IVA.<br />500 fatture all'anno: €72 + IVA.</p>
            <p>Puoi pagare anche mensilmente (da €3 al mese) e aggiungere 100 fatture a €16 + IVA. Funziona da solo o insieme ad AI Clinica.</p>
          </>
        ),
      }}
      faqs={[
        { q: "Posso usare solo la fatturazione?", a: "Sì. Il modulo Fatturazione si attiva da solo o insieme ad AI Clinica, nello stesso abbonamento." },
        { q: "Funziona con il regime forfettario?", a: "Sì. Scegli forfettario o ordinario nel profilo fiscale. Per il forfettario ZenGest mostra quanto hai fatturato rispetto alla soglia annuale." },
        { q: "Posso fatturare ad aziende ed enti?", a: "Sì. Per aziende ed enti la fattura va allo SdI come fattura elettronica: servono ragione sociale, partita IVA e codice SDI oppure PEC." },
        { q: "E se il paziente si oppone all'invio al Sistema TS?", a: "Nella scheda del paziente spunti l'opposizione all'invio delle spese al Sistema Tessera Sanitaria." },
        { q: "Come correggo una fattura già inviata?", a: "Se il Sistema TS l'ha già accettata, crei una nota di credito. Se non è ancora stata accettata, la annulli." },
        { q: "Cosa succede durante la prova gratuita?", a: "Puoi configurare il profilo fiscale e preparare le fatture. L'invio a SdI e Sistema TS si attiva con l'abbonamento al modulo Fatturazione." },
        { q: "Cosa succede se finisco le fatture?", a: "Aggiungi un pacchetto da 100 fatture a €16 + IVA, oppure passi a una fascia superiore." },
      ]}
    />
  );
}
