import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { SEO } from "./components/SEO";
import { GoogleTagManager } from "./components/GoogleTagManager";
import { Home } from "./pages/Home";
import { UseCases } from "./components/UseCases";
import { Research } from "./pages/Research";
import { About } from "./pages/About";
import { RadialOrbitalTimelineDemo } from "./pages/Timeline";
import { Contact } from "./pages/Contact";
import { TestWebhook } from "./components/TestWebhook";
import { Terms } from "./pages/Terms";
import { StateOfAI } from "./pages/StateOfAI";
import { VideoAskWidget } from "./components/VideoAskWidget";

// Configuration
// Public Key for client-side operations (Web Calls)
const VAPI_PUBLIC_KEY = "5dfc26c6-90a6-4efe-907b-7bd0d690dc6e";

// Agent ID for the primary agent (Medicaid Redetermination)
const HERO_AGENT_ID = "4224af64-f52d-449b-883c-8fc07a09d669";

export default function App() {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [webCallStatus, setWebCallStatus] = useState<"idle" | "connecting" | "active">("idle");
  const vapiRef = useRef<any>(null);
  const vapiLoadedRef = useRef(false);
  const elevenLabsConversationRef = useRef<any>(null);

  // Lazily initialize Vapi SDK inside useEffect to avoid crashing at module load
  useEffect(() => {
    let cancelled = false;

    async function initVapi() {
      if (vapiLoadedRef.current) return;
      try {
        const VapiModule = await import("@vapi-ai/web");
        const VapiClass = VapiModule.default || VapiModule;
        if (cancelled) return;
        vapiRef.current = new VapiClass(VAPI_PUBLIC_KEY);
        vapiLoadedRef.current = true;

        // Attach event listeners
        vapiRef.current.on("call-start", () => {
          setWebCallStatus("active");
          toast.success("Call Connected", { description: "You are now speaking with the agent." });
        });

        vapiRef.current.on("call-end", () => {
          setWebCallStatus("idle");
          setActiveAgentId(null);
          toast.info("Call Ended");
        });

        vapiRef.current.on("error", (e: any) => {
          console.error("Vapi Error:", e);
          setWebCallStatus("idle");
          setActiveAgentId(null);

          if (e.error?.statusCode === 401 || e.message?.includes("Invalid Key") || e.error?.message?.includes("Invalid Key")) {
            toast.error("Authentication Failed", { description: "Public Key appears to be invalid." });
          } else {
            toast.error("Connection failed", { description: "Could not connect to the agent." });
          }
        });
      } catch (err) {
        console.warn("Vapi SDK could not be loaded (voice features disabled):", err);
      }
    }

    initVapi();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleStartWebCall = async (agentId: string, assistantId: string) => {
    // Detect if this is an ElevenLabs agent (starts with "agent_") or Vapi
    const isElevenLabs = assistantId.startsWith("agent_");

    if (isElevenLabs) {
      // Use ElevenLabs Conversational AI
      // If another agent is active, don't allow
      if (activeAgentId && activeAgentId !== agentId) return;

      setActiveAgentId(agentId);
      setWebCallStatus("connecting");

      try {
        // Import ElevenLabs Client SDK dynamically
        const { Conversation } = await import("@elevenlabs/client");

        console.log("[ElevenLabs] Starting session with agent:", assistantId);
        console.log("[ElevenLabs] AgentId:", agentId);

        const conversation = await Conversation.startSession({
          agentId: assistantId,
          onConnect: () => {
            console.log("[ElevenLabs] ✓ Connected - audio should be flowing");
            setWebCallStatus("active");
            toast.success("Call Connected", { description: "You are now speaking with the agent." });
          },
          onDisconnect: () => {
            console.log("[ElevenLabs] Disconnected");
            setWebCallStatus("idle");
            setActiveAgentId(null);
            toast.info("Call Ended");
          },
          onError: (error: any) => {
            console.error("[ElevenLabs] Error event:", error);
            console.error("[ElevenLabs] Error details:", JSON.stringify(error, null, 2));

            // Check if this is a fatal error or just a warning
            // Some errors might not be fatal and the call can continue
            if (error?.message?.includes("Permission") || error?.message?.includes("denied") || error?.message?.includes("NotAllowed")) {
              setWebCallStatus("idle");
              setActiveAgentId(null);
              toast.error("Microphone Permission Denied", {
                description: "Please allow microphone access and try again."
              });
            } else if (error?.message?.includes("capacity")) {
              setWebCallStatus("idle");
              setActiveAgentId(null);
              toast.error("Agent Unavailable", {
                description: "Agent is at max capacity. Please try again in a moment."
              });
            } else {
              // For other errors, log but don't necessarily disconnect
              console.warn("[ElevenLabs] Non-fatal error, call may continue:", error);
            }
          },
          onModeChange: ({ mode }: { mode: string }) => {
            console.log("[ElevenLabs] Mode changed to:", mode);
            if (mode === "speaking") {
              console.log("[ElevenLabs] Agent is speaking");
              setWebCallStatus("active");
            } else if (mode === "listening") {
              console.log("[ElevenLabs] Agent is listening");
            }
          },
          onMessage: (message: any) => {
            console.log("[ElevenLabs] Message received:", message);
          }
        });

        console.log("[ElevenLabs] Session created successfully:", conversation);
        console.log("[ElevenLabs] Conversation object:", JSON.stringify(conversation, null, 2));
        elevenLabsConversationRef.current = conversation;
      } catch (error: any) {
        console.error("[ElevenLabs] Fatal error during session start:", error);
        console.error("[ElevenLabs] Error stack:", error?.stack);
        setWebCallStatus("idle");
        setActiveAgentId(null);

        let errorDescription = "Could not initialize ElevenLabs agent.";
        if (error?.message?.includes("Permission") || error?.message?.includes("denied")) {
          errorDescription = "Microphone permission was denied. Please allow access and try again.";
        } else if (error?.message) {
          errorDescription = error.message;
        }

        toast.error("Failed to start call", { description: errorDescription });
      }
    } else {
      // Use Vapi SDK
      if (!vapiRef.current) {
        toast.error("Voice SDK not loaded", { description: "Please wait a moment and try again." });
        return;
      }

      // If another agent is active, don't allow
      if (activeAgentId && activeAgentId !== agentId) return;

      setActiveAgentId(agentId);
      setWebCallStatus("connecting");

      // Check for microphone permission before starting
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err: any) {
        setWebCallStatus("idle");
        setActiveAgentId(null);

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
        await vapiRef.current.start(assistantId);
      } catch (error) {
        console.error("Vapi start error:", error);
        setWebCallStatus("idle");
        setActiveAgentId(null);
      }
    }
  };

  const handleEndWebCall = () => {
    // End ElevenLabs call if active
    if (elevenLabsConversationRef.current) {
      elevenLabsConversationRef.current.endSession();
      elevenLabsConversationRef.current = null;
    }

    // End Vapi call if active
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return (
    <BrowserRouter>
        <SEO />
        <GoogleTagManager />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-12 relative">
          <Toaster position="top-center" />

          <AnnouncementBar />
          <Navbar />
          <VideoAskWidget />

          <main>
            <Routes>
              <Route path="/" element={
                <Home
                  activeAgentId={activeAgentId}
                  webCallStatus={webCallStatus}
                  handleStartWebCall={handleStartWebCall}
                  handleEndWebCall={handleEndWebCall}
                />
              } />
              <Route path="/use-cases" element={
                <UseCases
                  activeAgentId={activeAgentId}
                  webCallStatus={webCallStatus}
                  handleStartWebCall={handleStartWebCall}
                  handleEndWebCall={handleEndWebCall}
                />
              } />
              <Route path="/timeline" element={<RadialOrbitalTimelineDemo />} />
              <Route path="/research" element={<Research />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/test-webhook" element={<TestWebhook />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/state-of-ai" element={<StateOfAI />} />
            </Routes>
          </main>
        </div>
    </BrowserRouter>
  );
}