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
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Videos } from "./pages/Videos";
import { VsPsicogest } from "./pages/comparisons/VsPsicogest";
import { VsGesto } from "./pages/comparisons/VsGesto";
import { VsAppuntoo } from "./pages/comparisons/VsAppuntoo";
import { VsChatgpt } from "./pages/comparisons/VsChatgpt";

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
          { url: "/video", title: "Video" },
          { url: "/blog", title: "Blog" },
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/video" element={<Videos />} />
            <Route path="/vs/psicogest" element={<VsPsicogest />} />
            <Route path="/vs/gesto" element={<VsGesto />} />
            <Route path="/vs/appuntoo" element={<VsAppuntoo />} />
            <Route path="/vs/chatgpt" element={<VsChatgpt />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
