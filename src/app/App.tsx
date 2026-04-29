import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { SEO } from "./components/SEO";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { Home } from "./pages/Home";
import { Research } from "./pages/Research";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import { StateOfAI } from "./pages/StateOfAI";

export default function App() {
  return (
    <BrowserRouter>
      <SEO />
      <GoogleTagManager />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-12 relative">
        <Toaster position="top-center" />
        <AnnouncementBar />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/state-of-ai" element={<StateOfAI />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
