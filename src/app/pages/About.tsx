import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

const G = { background: "linear-gradient(135deg, #3B6FD4 0%, #A7BCF5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const team = [
  {
    name: "Alessandro Lombardo",
    role: "Fondatore di ZenGest e Unozen",
    bio: "Ho immaginato ZenGest per aiutare lo psicologo a fare meglio il proprio lavoro, partendo dalla mia pratica clinica, che poi ho condiviso con altri colleghi e colleghe. ZenGest è costruito insieme e per gli psicologi, perché possano continuare a fare meglio ciò che sanno fare: la clinica.",
    image: "/ale.png",
  },
];

export function About() {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Chi Siamo · ZenGest"
        useExactTitle={true}
        description="ZenGest è costruito da psicologi italiani per psicologi italiani. Scopri il team e la storia dietro alla piattaforma AI clinica."
        path="/about"
      />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-[#0D9488] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white font-['DM_Sans'] mb-6">
            Chi Siamo
          </div>
          <h1 className="font-['Instrument_Serif'] text-4xl md:text-5xl lg:text-6xl text-[#00122F] leading-[1.05] tracking-[-0.025em] mb-6">
            Costruito da psicologi,{" "}
            <span style={G}>per psicologi.</span>
          </h1>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-500 leading-relaxed">
            ZenGest nasce dall'esperienza diretta di uno studio di psicologia. Non da un'idea di prodotto, ma dalla frustrazione concreta di chi fa questo lavoro ogni giorno.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-3xl border border-slate-100 p-8 md:p-12">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">La storia</p>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-600 leading-relaxed mb-5">
            ZenGest è la risposta a questi problemi concreti. Un assistente clinico AI costruito su misura per gli psicologi italiani: sicuro, conforme al GDPR, e pensato per il modo in cui lavori davvero.
          </p>
          <p className="font-['DM_Sans'] text-base md:text-lg text-slate-600 leading-relaxed">
            Non hai studiato per fare il commercialista. Hai studiato per fare la clinica. ZenGest si prende cura del resto.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-widest text-slate-400 mb-10 text-center">Il team</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map(member => (
              <div key={member.name} className="flex flex-col items-center text-center bg-slate-50 rounded-3xl border border-slate-100 p-8">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-5 shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="font-['DM_Sans'] font-semibold text-[#00122F] text-lg mb-0.5">{member.name}</p>
                <p className="font-['DM_Sans'] text-sm text-[#3B6FD4] mb-4">{member.role}</p>
                <p className="font-['DM_Sans'] text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-['Instrument_Serif'] text-3xl md:text-4xl text-[#00122F] leading-snug tracking-[-0.02em] mb-4">
            Vuoi provare ZenGest?
          </h2>
          <p className="font-['DM_Sans'] text-sm text-slate-400 mb-8">Posti limitati nella prima fase · Nessuna carta richiesta · 30 giorni gratuiti al lancio</p>
          <a
            href="https://app.zengest.it/sign-up/"
            className="inline-flex items-center justify-center h-12 px-10 rounded-xl font-['DM_Sans'] font-semibold text-sm text-white bg-[#00122F] hover:bg-[#00122F]/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
          >
            Prova gratis
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
