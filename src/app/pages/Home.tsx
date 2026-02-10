import { CTASection } from "../components/ui/hero-dithering-card";
import { Stats } from "../components/ui/statistics-card";
import { InlineImageHeader } from "../components/InlineImageHeader";
import { HowHanaWorks } from "../components/HowHanaWorks";
import { LiveDemoSection } from "../components/LiveDemoSection";
import { AgenticFrameworkCarousel } from "../components/AgenticFrameworkCarousel";
import { RadialOrbitalTimelineDemo } from "./Timeline";
import { ComplianceSection } from "../components/ComplianceSection";
import { CaseStudiesSection } from "../components/CaseStudiesSection";
import { IntegrationsSection } from "../components/IntegrationsSection";
import { ReadyToUseSection } from "../components/ReadyToUseSection";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

// Agent ID for the primary agent (Medicaid Redetermination)
const HERO_AGENT_ID = "4224af64-f52d-449b-883c-8fc07a09d669";

interface HomeProps {
  activeAssistantId: string | null;
  webCallStatus: "idle" | "connecting" | "active";
  handleStartWebCall: (id: string) => void;
  handleEndWebCall: () => void;
}

export function Home({ 
  activeAssistantId, 
  webCallStatus, 
  handleStartWebCall, 
  handleEndWebCall 
}: HomeProps) {
  return (
    <div className="space-y-0">
      <SEO 
        // Using the default title which is strong: "Hana Voice AI | Intelligent Patient Engagement"
        // But explicitly setting it to ensure clarity
        title="Hana Voice AI | Intelligent Patient Engagement"
        useExactTitle={true}
        description="Automate patient intake, monitoring, and care coordination with Hana's clinical Voice AI. Engage patients naturally, improve outcomes, and reduce administrative burden by 85%."
      />

      {/* 1. HERO — what is this */}
      <CTASection 
        onStartCall={() => {
          // If not active, start the call. Then scroll to the demo section.
          if (webCallStatus === "idle") {
            handleStartWebCall(HERO_AGENT_ID);
          }
          document.getElementById('live-demo-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        // Always keep the hero section in "idle" state so the UI "moves" to the live demo section
        isConnecting={false}
        isActive={false}
        disabled={activeAssistantId !== null && activeAssistantId !== HERO_AGENT_ID}
      />

      {/* 2. STATS — does it work */}
      <Stats />

      {/* 3. PLATFORM FEATURES — what does it do for me */}
      <AgenticFrameworkCarousel />

      {/* 4. TESTIMONIALS — do others trust it */}
      <CaseStudiesSection />

      {/* 5. LIVE DEMO — let me try it (Moved up) */}
      <LiveDemoSection 
        activeAssistantId={activeAssistantId}
        webCallStatus={webCallStatus}
        handleStartWebCall={handleStartWebCall}
        handleEndWebCall={handleEndWebCall}
      />

      {/* 6. HOW IT WORKS — is it hard to set up */}
      <InlineImageHeader />

      {/* 7. REASONING ENGINE — how does it work under the hood */}
      <RadialOrbitalTimelineDemo />

      {/* 8. VIDEOS — show me real examples */}
      <HowHanaWorks />

      {/* 9. INTEGRATIONS — does it fit my systems */}
      <IntegrationsSection />

      {/* 10. COMPLIANCE — is it safe */}
      <ComplianceSection />

      {/* 11. CTA — get started */}
      <ReadyToUseSection />

      {/* 12. FOOTER */}
      <Footer />
    </div>
  );
}
