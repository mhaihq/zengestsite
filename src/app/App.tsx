import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Vapi from "@vapi-ai/web";
import { BrowserRouter, Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { SEO } from "./components/SEO";
import { BrevoWidget } from "./components/BrevoWidget";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { Home } from "./pages/Home";
import { UseCases } from "./components/UseCases";
import { Research } from "./pages/Research";
import { RadialOrbitalTimelineDemo } from "./pages/Timeline";
import { Contact } from "./pages/Contact";

// Configuration
// Public Key for client-side operations (Web Calls)
const VAPI_PUBLIC_KEY = "5dfc26c6-90a6-4efe-907b-7bd0d690dc6e";

// Agent ID for the primary agent (Medicaid Redetermination)
const HERO_AGENT_ID = "4224af64-f52d-449b-883c-8fc07a09d669";

// Initialize Vapi SDK with the provided Public Key
const vapi = new Vapi(VAPI_PUBLIC_KEY);

export default function App() {
  const [activeAssistantId, setActiveAssistantId] = useState<string | null>(null);
  const [webCallStatus, setWebCallStatus] = useState<"idle" | "connecting" | "active">("idle");

  useEffect(() => {
    // Vapi event listeners for web calls managed globally
    const onCallStart = () => {
      setWebCallStatus("active");
      toast.success("Call Connected", { description: "You are now speaking with the agent." });
    };

    const onCallEnd = () => {
      setWebCallStatus("idle");
      setActiveAssistantId(null);
      toast.info("Call Ended");
    };

    const onError = (e: any) => {
      console.error("Vapi Error:", e);
      setWebCallStatus("idle");
      setActiveAssistantId(null);
      
      if (e.error?.statusCode === 401 || e.message?.includes("Invalid Key") || e.error?.message?.includes("Invalid Key")) {
        toast.error("Authentication Failed", { description: "Public Key appears to be invalid." });
      } else {
        toast.error("Connection failed", { description: "Could not connect to the agent." });
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleStartWebCall = async (assistantId: string) => {
    // If another agent is active, don't allow
    if (activeAssistantId && activeAssistantId !== assistantId) return;

    setActiveAssistantId(assistantId);
    setWebCallStatus("connecting");

    // Check for microphone permission before starting
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err: any) {
      setWebCallStatus("idle");
      setActiveAssistantId(null);
      
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        toast.error("Microphone Access Blocked", { 
          description: "Browser denied microphone access. Check permissions or try opening in a new window." 
        });
      } else {
        console.error("Microphone Error:", err);
        toast.error("Microphone Error", { 
          description: "Could not access microphone. Please check your device settings." 
        });
      }
      return;
    }

    try {
      await vapi.start(assistantId);
    } catch (error) {
      console.error("Start error:", error);
      setWebCallStatus("idle");
      setActiveAssistantId(null);
    }
  };

  const handleEndWebCall = () => {
    vapi.stop();
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
          <SEO />
          <GoogleTagManager />
          <BrevoWidget />
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-12 relative">
            <Toaster position="top-center" />
            
            <Navbar />

            <Routes>
              <Route path="/" element={
                <Home 
                  activeAssistantId={activeAssistantId}
                  webCallStatus={webCallStatus}
                  handleStartWebCall={handleStartWebCall}
                  handleEndWebCall={handleEndWebCall}
                />
              } />
              <Route path="/use-cases" element={
                <UseCases 
                  activeAssistantId={activeAssistantId}
                  webCallStatus={webCallStatus}
                  handleStartWebCall={handleStartWebCall}
                  handleEndWebCall={handleEndWebCall}
                />
              } />
              <Route path="/timeline" element={<RadialOrbitalTimelineDemo />} />
              <Route path="/research" element={<Research />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
