import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router";
import logoImage from 'figma:asset/55130a9cc9a8f890dc08e580a5cf6dd0df0df413.png';

export function Footer() {
  return (
    <footer className="bg-[rgb(0,18,47)] text-slate-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" aria-label="Hana Health Home">
            <img 
              src={logoImage}
              alt="Hana Logo" 
              className="h-8 mb-6 brightness-0 invert" 
            />
          </Link>
          <p className="text-sm text-slate-500 mb-4">
            Clinical AI agents for modern healthcare workflows.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/use-cases" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Integrations</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Security</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Enterprise</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
            <li><a href="https://docs.hana.health/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Compliance</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Hana Voice AI. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-slate-400 transition-colors">Privacy</Link>
          <Link to="/" className="hover:text-slate-400 transition-colors">Terms</Link>
          <Link to="/" className="hover:text-slate-400 transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
