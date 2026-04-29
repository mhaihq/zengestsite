import { CTASection } from "../components/ui/hero-dithering-card";
import { FeaturesMarquee } from "../components/FeaturesMarquee";
import { ZenAssistantSection } from "../components/ZenAssistantSection";
import { ComparisonSection } from "../components/ComparisonSection";
import { HowItWorks } from "../components/HowItWorks";
import { SecuritySection } from "../components/SecuritySection";
import { IntelligenceSection } from "../components/IntelligenceSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CTAFinal } from "../components/CTAFinal";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { organizationSchema, websiteSchema, softwareApplicationSchema } from "../components/SEO";

export function Home() {
  return (
    <div className="space-y-0">
      <SEO
        title="ZenGest | AI clinica per psicologi italiani"
        useExactTitle={true}
        description="ZenGest genera note cliniche, organizza lo storico dei pazienti e ti permette di interrogare ogni caso con un assistente AI sicuro, costruito da psicologi per psicologi e psicoterapeuti."
        path="/"
        keywords="AI clinica, psicologi italiani, note cliniche automatiche, cartella clinica AI, ZenGest"
        jsonLd={[organizationSchema, websiteSchema, softwareApplicationSchema]}
      />
      <CTASection />
      <FeaturesMarquee />
      <ComparisonSection />
      <HowItWorks />
      <ZenAssistantSection />
      <SecuritySection />
      <IntelligenceSection />
      <TestimonialsSection />
      <CTAFinal />
      <Footer />
    </div>
  );
}
