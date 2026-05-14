import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { SEO } from "./components/SEO";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { Home } from "./pages/Home";
import { Pricing } from "./pages/Pricing";
import { Research } from "./pages/Research";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { StateOfAI } from "./pages/StateOfAI";
import { Sicurezza } from "./pages/Sicurezza";
import { Termini } from "./pages/Termini";
import { DPA } from "./pages/DPA";

export default function App() {
  return (
    <BrowserRouter>
      <SEO />
      <GoogleTagManager />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-12 relative">
        <Toaster position="top-center" />
        <AnnouncementBar />
        <Navbar navLinks={[
          { url: "/pricing", title: "Prezzi" },
          { url: "/about", title: "Chi Siamo" },
          { url: "/sicurezza", title: "Sicurezza" },
        ]} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/state-of-ai" element={<StateOfAI />} />
            <Route path="/sicurezza" element={<Sicurezza />} />
            <Route path="/termini" element={<Termini />} />
            <Route path="/dpa" element={<DPA />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
