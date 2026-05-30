import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="px-6 py-10 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/">
          <img
            src="https://cdn.prod.website-files.com/6985ec3788addb8b6efcb94f/6985ec3788addb8b6efcba5a_3-p-500.png"
            alt="ZenGest"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 font-['DM_Sans'] text-sm text-slate-500">
          <Link to="/blog" className="hover:text-[#00122F] transition-colors">Blog</Link>
          <Link to="/sicurezza" className="hover:text-[#00122F] transition-colors">Sicurezza</Link>
          <Link to="/termini" className="hover:text-[#00122F] transition-colors">Termini</Link>
          <Link to="/dpa" className="hover:text-[#00122F] transition-colors">DPA</Link>
          <Link to="/terms" className="hover:text-[#00122F] transition-colors">Privacy</Link>
          <a href="mailto:hello@zengest.it" className="hover:text-[#00122F] transition-colors">Contatti</a>
        </div>

        {/* Company info */}
        <div className="font-['DM_Sans'] text-xs text-slate-400 text-center md:text-right leading-relaxed">
          <p className="font-medium text-slate-500">Unozen Srl</p>
          <p>Via Cesare Battisti 15, Torino</p>
          <p>P. IVA: 13448760010</p>
          <p>PEC: <a href="mailto:UNOZEN@NAMIRIALPEC.IT" className="hover:text-[#00122F] transition-colors">UNOZEN@NAMIRIALPEC.IT</a></p>
          <p className="mt-1">© {new Date().getFullYear()} ZenGest. Tutti i diritti riservati.</p>
        </div>

      </div>
    </footer>
  );
}
