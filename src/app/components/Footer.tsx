import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-[#00122F] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/">
          <img
            src="https://cdn.prod.website-files.com/6985ec3788addb8b6efcb94f/6985ec3788addb8b6efcba5a_3-p-500.png"
            alt="ZenGest"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 font-['DM_Sans'] text-sm text-slate-400">
          <Link to="/terms" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Termini</Link>
          <a href="mailto:hello@zengest.it" className="hover:text-white transition-colors">Contatti</a>
        </div>

        {/* Copyright */}
        <p className="font-['DM_Sans'] text-xs text-slate-500">
          © {new Date().getFullYear()} ZenGest. Tutti i diritti riservati.
        </p>

      </div>
    </footer>
  );
}
