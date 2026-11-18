import { CTASection } from "../components/ui/hero-dithering-card";
import { ComparisonSection } from "../components/ComparisonSection";
import { ProductsStackSection } from "../components/ProductsStackSection";
import { SessionFilmSection, AskZenSection } from "../components/ProductTourSections";
import { SecuritySection } from "../components/SecuritySection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { CTAFinal } from "../components/CTAFinal";
import { VsLinksSection } from "../components/VsLinksSection";
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
      {/* The hero stays pinned while the deep-blue panel slides over it; it unpins when this wrapper ends. */}
      <div className="relative">
        <CTASection />
        <div className="relative z-10 overflow-clip rounded-t-[28px] md:rounded-t-[44px] shadow-[0_-16px_48px_-16px_rgba(0,18,47,0.28)]">
          <ProductsStackSection />
        </div>
      </div>
      <SessionFilmSection />
      <AskZenSection />
      <ComparisonSection />
      <TestimonialsSection />
      <TestimonialCarousel />
      <SecuritySection />
      <VsLinksSection />
      <CTAFinal />
      <Footer />
    </div>
  );
}
