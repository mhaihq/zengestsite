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
      <CTASection />
      <ProductsStackSection />
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
