import { useState } from "react";
import { Phone, Loader2, StopCircle, Globe, MoveRight, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion, easeOut } from "framer-motion";

// Configuration duplicated from App.tsx
// Private Key for server-side operations (Phone Calls)
// WARNING: In a real production app, never expose this in client-side code.
const VAPI_PRIVATE_KEY = "8747fd17-d730-4198-a038-c36c03a30372"; 
const VAPI_PHONE_NUMBER_ID = "48860935-3001-4640-8d71-c146776b1f58";

export function AgentCard({ 
  title, 
  description, 
  icon: Icon,
  colorClass,
  assistantId,
  webCallStatus,
  isOtherAgentActive,
  onStartWebCall,
  onEndWebCall
}: { 
  title: string; 
  description: string; 
  icon: any;
  colorClass: "blue" | "emerald";
  assistantId: string;
  webCallStatus: "idle" | "connecting" | "active";
  isOtherAgentActive: boolean;
  onStartWebCall: () => void;
  onEndWebCall: () => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState("+1");
  const [isCallingPhone, setIsCallingPhone] = useState(false);

  // Phone calls are independent and don't affect the global web call state
  // We keep this local to the card
  const handlePhoneCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsCallingPhone(true);
    
    try {
      // Use the Private Key for this secure server-side simulated call
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VAPI_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assistantId: assistantId,
          phoneNumberId: VAPI_PHONE_NUMBER_ID,
          customer: {
            number: phoneNumber
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate call");
      }

      toast.success(`Calling from ${title}...`, {
        description: `Dialing ${phoneNumber}. Expect a call shortly.`,
      });
      setPhoneNumber("");
    } catch (error: any) {
      console.error("Phone call error:", error);
      toast.error("Failed to initiate call", { 
        description: error.message || "Please check your configuration." 
      });
    } finally {
      setIsCallingPhone(false);
    }
  };

  const handleWebCallClick = () => {
    if (webCallStatus === "active") {
      onEndWebCall();
    } else {
      onStartWebCall();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <motion.div
        variants={itemVariants}
        className="group relative bg-white dark:bg-[#0B1D36] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300 flex flex-col h-full overflow-hidden"
      >
        {/* Header Section */}
        <div className="flex flex-col items-start mb-6 relative z-10">
          <div className={`p-3.5 rounded-2xl mb-6 transition-colors duration-300 ${
            colorClass === 'blue' 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20' 
              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20'
          }`}>
            <Icon className="w-8 h-8" />
          </div>
          
          <h1 className="text-3xl font-serif text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Interactive Form Section */}
        <form onSubmit={handlePhoneCall} className="mt-auto relative z-10 space-y-4">
          <motion.div variants={itemVariants}>
            <div className="relative group/input">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <span className="text-xl opacity-80">🇺🇸</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full bg-slate-50 dark:bg-[#132B4A] border border-slate-200 dark:border-slate-700/50 rounded-xl pl-14 pr-14 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                disabled={webCallStatus === "active" || isOtherAgentActive}
              />
              <motion.button 
                type="submit"
                disabled={isCallingPhone || webCallStatus === "active" || isOtherAgentActive}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-[#0B1D36] border border-slate-200 dark:border-slate-700 rounded-lg p-2 transition-all hover:border-blue-400 dark:hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                 {isCallingPhone ? (
                  <Loader2 className="w-4 h-4 text-slate-900 dark:text-white animate-spin" />
                 ) : (
                  <Phone className="w-4 h-4 text-slate-900 dark:text-white" />
                 )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="button"
              whileHover={(webCallStatus === "connecting" || isOtherAgentActive) ? {} : { scale: 1.01 }}
              whileTap={(webCallStatus === "connecting" || isOtherAgentActive) ? {} : { scale: 0.99 }}
              onClick={handleWebCallClick}
              disabled={isCallingPhone || webCallStatus === "connecting" || isOtherAgentActive}
              className={`w-full border rounded-xl px-6 py-3.5 flex items-center justify-between transition-all duration-300 font-medium
                ${webCallStatus === "active" 
                  ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20" 
                  : "bg-[#0A2540] text-white border-transparent hover:bg-[#153457] shadow-lg shadow-blue-900/20 dark:shadow-blue-900/30"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  {webCallStatus === "connecting" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : webCallStatus === "active" ? (
                    <StopCircle className="w-5 h-5 fill-current" />
                  ) : (
                    <Globe className="w-5 h-5" />
                  )}
                </div>
                <span>
                  {webCallStatus === "connecting" ? "Connecting..." : 
                   webCallStatus === "active" ? "End Web Call" : 
                   isOtherAgentActive ? "Agent Unavailable" : "Start Web Call"}
                </span>
              </div>
              {webCallStatus !== "active" && webCallStatus !== "connecting" && !isOtherAgentActive && (
                <ArrowRight className="w-4 h-4" />
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10 flex items-center justify-between">
           <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
             Interactive Demo
           </span>
           <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by 
            <a 
              href="https://hana.health/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-900 dark:text-white font-medium ml-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
               Hana
            </a>
          </p>
        </motion.div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
