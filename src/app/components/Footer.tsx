import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="px-6 pt-12 pb-8 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">

          {/* Logo + tagline */}
          <div className="shrink-0">
            <Link to="/">
              <img
                src="https://cdn.prod.website-files.com/6985ec3788addb8b6efcb94f/6985ec3788addb8b6efcba5a_3-p-500.png"
                alt="ZenGest"
                className="h-8 w-auto object-contain mb-3"
              />
            </Link>
            <p className="font-['DM_Sans'] text-xs text-slate-400 max-w-[180px] leading-relaxed">
              AI clinica per psicologi italiani. Conforme GDPR.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-10">

            {/* Prodotto */}
            <div>
              <p className="font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Prodotto</p>
              <div className="flex flex-col gap-2 font-['DM_Sans'] text-sm text-slate-500">
                <Link to="/pricing" className="hover:text-[#00122F] transition-colors">Prezzi</Link>
                <Link to="/blog" className="hover:text-[#00122F] transition-colors">Blog</Link>
                <Link to="/sicurezza" className="hover:text-[#00122F] transition-colors">Sicurezza</Link>
              </div>
            </div>

            {/* Confronta */}
            <div>
              <p className="font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Confronta</p>
              <div className="flex flex-col gap-2 font-['DM_Sans'] text-sm text-slate-500">
                <Link to="/vs/chatgpt" className="hover:text-[#00122F] transition-colors">vs ChatGPT</Link>
                <Link to="/vs/psicogest" className="hover:text-[#00122F] transition-colors">vs PsicoGest</Link>
                <Link to="/vs/gesto" className="hover:text-[#00122F] transition-colors">vs Gesto</Link>
                <Link to="/vs/appuntoo" className="hover:text-[#00122F] transition-colors">vs Appuntoo</Link>
              </div>
            </div>

            {/* Legale */}
            <div>
              <p className="font-['DM_Sans'] text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Legale</p>
              <div className="flex flex-col gap-2 font-['DM_Sans'] text-sm text-slate-500">
                <Link to="/termini" className="hover:text-[#00122F] transition-colors">Termini</Link>
                <Link to="/dpa" className="hover:text-[#00122F] transition-colors">DPA</Link>
                <Link to="/terms" className="hover:text-[#00122F] transition-colors">Privacy</Link>
                <a href="mailto:hello@zengest.it" className="hover:text-[#00122F] transition-colors">Contatti</a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-['DM_Sans'] text-xs text-slate-400">
            © {new Date().getFullYear()} ZenGest · Unozen Srl · Via Cesare Battisti 15, Torino · P. IVA 13448760010
          </p>
          <a href="mailto:UNOZEN@NAMIRIALPEC.IT" className="font-['DM_Sans'] text-xs text-slate-400 hover:text-[#00122F] transition-colors">
            UNOZEN@NAMIRIALPEC.IT
          </a>
        </div>

      </div>
    </footer>
  );
}
