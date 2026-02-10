import { useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Phone, CheckCircle2, Globe } from "lucide-react";
import { cn } from "../../lib/utils";
import { toast } from "sonner";

// Lazy load the shader
const Dithering = lazy(() => 
  import('@paper-design/shaders-react').then(module => ({ default: module.Dithering }))
);

const AGENT_TYPES = ["Intake", "Monitoring", "Outreach", "Coordination"];

// Vapi Agent IDs Configuration
const AGENT_IDS: Record<string, string> = {
  "Intake": "7a493679-a2aa-4343-8263-a7fd9af85469",
  "Monitoring": "44bf41f3-1318-4d7e-8b56-c8dc8116bc4d",
  "Outreach": "014ad539-7293-4f4e-95b5-438501b527d3",
  "Coordination": "a2fc1af7-f905-4f1b-9d74-c0a063308a84"
};

// Private Key for server-side operations (Phone Calls)
// WARNING: In a real production app, never expose this in client-side code.
const VAPI_PRIVATE_KEY = "8747fd17-d730-4198-a038-c36c03a30372"; 

// Vapi Phone Number IDs Configuration
const PHONE_NUMBER_IDS = {
  US: "035e589f-8485-4a30-9fed-d36cdff49122",
  EU_UK: "22c61779-ef10-4d09-9d41-0c71e4b6d81b"
};

interface LiveDemoSectionProps {
  activeAssistantId: string | null;
  webCallStatus: "idle" | "connecting" | "active";
  handleStartWebCall: (id: string) => void;
  handleEndWebCall: () => void;
}

function DotMatrixNumber({ number }: { number: number }) {
  const patterns: Record<number, number[][]> = {
    1: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0]
    ],
    2: [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1]
    ]
  };

  const pattern = patterns[number] || patterns[1];

  return (
    <div className="flex flex-col gap-1.5">
      {pattern.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {row.map((cell, j) => (
            <div 
              key={`${i}-${j}`} 
              className={cn(
                "w-2 h-2 rounded-full",
                cell ? "bg-slate-900" : "bg-transparent"
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function LiveDemoSection({
  activeAssistantId,
  webCallStatus,
  handleStartWebCall,
  handleEndWebCall
}: LiveDemoSectionProps) {
  const [step, setStep] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState("Intake");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    region: "US" // Default to US
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [callInitiated, setCallInitiated] = useState(false);

  const handleNext = () => {
    if (selectedAgent) setStep(2);
  };

  const handleBack = () => {
    if (callInitiated) {
      setCallInitiated(false);
      setFormData({ ...formData, phone: "", name: "", email: "" });
    }
    setStep(1);
  };

  const handleStartCall = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    
    // Select the correct agent ID based on the user's choice
    const agentId = AGENT_IDS[selectedAgent] || AGENT_IDS["Intake"];
    
    // Select the correct phone number ID based on region
    const phoneNumberId = formData.region === "EU_UK" ? PHONE_NUMBER_IDS.EU_UK : PHONE_NUMBER_IDS.US;

    try {
      // Use the Private Key for this secure server-side simulated call
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VAPI_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assistantId: agentId,
          phoneNumberId: phoneNumberId,
          customer: {
            number: formData.phone,
            name: formData.name
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate call");
      }

      toast.success(`Calling ${formData.name || "you"}...`, {
        description: `Dialing ${formData.phone}. Expect a call shortly.`,
      });
      
      setCallInitiated(true);
    } catch (error: any) {
      console.error("Phone call error:", error);
      toast.error("Failed to initiate call", { 
        description: error.message || "Please check your configuration." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="live-demo-section" className="py-32 px-4 bg-[rgb(0,18,47)] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
           <h2 className="text-5xl md:text-7xl lg:text-8xl font-thin text-[rgb(250,250,250)] leading-[0.9]">
             Try Our Live<br />Demo
           </h2>
           <p className="text-[rgb(248,248,248)] max-w-sm text-lg leading-relaxed mb-2 font-light">
             Receive a live call from our agent and discover how our AI caller transforms customer conversations.
           </p>
        </div>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          
          {/* Card 1: Selection */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "relative bg-slate-50 border border-slate-100 rounded-lg p-8 flex flex-col justify-between overflow-hidden group/card",
              step === 1 ? "lg:flex-[1.4]" : "lg:flex-[0.8] opacity-100 lg:opacity-50"
            )}
            onClick={() => step !== 1 && setStep(1)}
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-8">
                <DotMatrixNumber number={1} />
              </div>
              
              <div className="mt-auto">
                 <h3 className="text-3xl font-light text-slate-900 mb-8 max-w-xs leading-tight tracking-tight">
                   Select the type of call you want to receive
                 </h3>
                 
                 <div className="grid grid-cols-2 gap-3 max-w-sm relative z-20">
                   {AGENT_TYPES.map((type) => (
                     <button
                       key={type}
                       onClick={(e) => { e.stopPropagation(); setSelectedAgent(type); }}
                       className={cn(
                         "px-6 py-5 rounded-lg text-lg font-medium border transition-all duration-200 flex items-center justify-center text-center h-full w-full",
                         selectedAgent === type
                           ? "bg-slate-900 text-white border-slate-900"
                           : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                       )}
                     >
                       {type}
                     </button>
                   ))}
                 </div>

                 {/* Visible Next Action for Step 1 */}
                 <div className={cn(
                    "mt-10 pt-6 border-t border-slate-200 flex justify-end transition-opacity duration-300",
                    step === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
                 )}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleNext(); }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            </div>

            {/* Orb Visual */}
            <motion.div 
              animate={step === 1 ? {
                y: [0, -20, 0],
              } : {}}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut"
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
                step === 1 ? "right-[-10%] w-[70%] h-[70%] scale-100 opacity-100" : "right-[-50%] w-[40%] h-[40%] scale-50 opacity-0 blur-xl"
              )}
            >
               <Suspense fallback={<div className="w-full h-full bg-blue-200/50 rounded-full blur-3xl" />}>
                  <Dithering
                     colorBack="#f8fafc"
                     colorFront="#6366f1"
                     shape="sphere"
                     type="4x4"
                     speed={0.5}
                     className="w-full h-full"
                     minPixelRatio={1}
                  />
               </Suspense>
            </motion.div>
          </motion.div>

          {/* Card 2: Form */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "relative bg-slate-50 border border-slate-100 rounded-lg p-8 flex flex-col justify-between overflow-hidden",
              step === 2 ? "lg:flex-[1.4]" : "lg:flex-[1]"
            )}
          >
            <div className="h-full flex flex-col relative z-10">
              <div className="mb-8">
                <DotMatrixNumber number={2} />
              </div>
              
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-end cursor-pointer"
                    onClick={() => setStep(2)}
                  >
                     <h3 className="text-3xl font-light text-slate-900 mb-4 tracking-tight">
                       Enter your information
                     </h3>
                  </motion.div>
                ) : callInitiated ? (
                  <motion.div
                    key="step3-call-initiated"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center space-y-8 text-center"
                  >
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
                      <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center border border-green-100 shadow-sm">
                         <Phone className="w-10 h-10 text-green-600" />
                      </div>
                      <div className="absolute -right-1 -top-1 bg-green-500 text-white p-2 rounded-full border-4 border-slate-50">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-light text-slate-900 mb-2">
                        Calling {formData.phone}...
                      </h3>
                      <p className="text-slate-500 font-light max-w-xs mx-auto">
                        We are dialing your number now. Please answer the call to speak with the {selectedAgent} agent.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setCallInitiated(false);
                        setFormData({ ...formData, phone: "", name: "", email: "" });
                      }}
                      className="text-slate-500 hover:text-slate-900 text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Start another demo
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col w-full"
                  >
                     <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-6">
                        {/* Region Selector */}
                        <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-lg w-fit">
                           <button
                             type="button"
                             onClick={() => setFormData({...formData, region: "US"})}
                             className={cn(
                               "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                               formData.region === "US" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                             )}
                           >
                             <Globe className="w-3 h-3" /> US / International
                           </button>
                           <button
                             type="button"
                             onClick={() => setFormData({...formData, region: "EU_UK"})}
                             className={cn(
                               "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                               formData.region === "EU_UK" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                             )}
                           >
                             <Globe className="w-3 h-3" /> Europe & UK
                           </button>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-1">
                           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</label>
                           <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full py-3 bg-transparent border-b border-slate-200 text-slate-900 text-lg placeholder:text-slate-300 focus:outline-none focus:border-slate-900 rounded-none font-light"
                              placeholder="Your Name"
                           />
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-1">
                           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Number</label>
                           <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full py-3 bg-transparent border-b border-slate-200 text-slate-900 text-lg placeholder:text-slate-300 focus:outline-none focus:border-slate-900 rounded-none font-light"
                              placeholder="+1 555 123 4567"
                           />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                           <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                           <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full py-3 bg-transparent border-b border-slate-200 text-slate-900 text-lg placeholder:text-slate-300 focus:outline-none focus:border-slate-900 rounded-none font-light"
                              placeholder="john@company.com"
                           />
                        </div>
                     </div>

                     <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-8 pb-2">
                        <button 
                          type="button"
                          onClick={handleBack}
                          className="text-slate-400 hover:text-slate-900 text-xs font-semibold flex items-center gap-2 transition-colors uppercase tracking-wider group"
                        >
                          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                          Back to Agent
                        </button>

                        <button 
                          onClick={handleStartCall}
                          disabled={isSubmitting || !formData.phone}
                          className="bg-slate-900 text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform active:scale-95 transition-all"
                        >
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Receive Call"}
                        </button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
