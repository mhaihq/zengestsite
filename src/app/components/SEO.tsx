import { useEffect } from 'react';

const SITE_NAME = "ZenGest";
const SITE_DOMAIN = "https://zengest.it";
// Branded 1200×630 social-share card, served from /public.
const ogImage = `${SITE_DOMAIN}/og-image.png`;
const DEFAULT_KEYWORDS = "software psicologi, cartella clinica psicologo, note cliniche AI, trascrizione sedute, SOAP DAP BIRP, gestionale psicoterapia, GDPR sanità, software studio psicologico, assistente clinico AI, ZenGest";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  useExactTitle?: boolean;
  keywords?: string;
  /** Path portion of the URL, e.g. "/about" — used to auto-generate canonical URL */
  path?: string;
  /** Robots directive, defaults to "index, follow" */
  robots?: string;
  /** Page type for structured data: "website" | "article" | "product" */
  type?: "website" | "article" | "product";
  /** Additional JSON-LD structured data to inject */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/** Helper to set or create a <meta> tag */
function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SEO({
  title = "ZenGest · AI clinica per psicologi italiani",
  description = "ZenGest trascrive le sedute, genera note cliniche strutturate (SOAP, DAP, BIRP) e gestisce la cartella paziente. Conforme al GDPR Art. 9, dati solo su server europei.",
  image = ogImage,
  url,
  useExactTitle = false,
  keywords,
  path,
  robots = "index, follow",
  type = "website",
  jsonLd,
}: SEOProps) {
  // Construct the full title
  let fullTitle = title;
  if (!useExactTitle && !title.includes(SITE_NAME)) {
    fullTitle = `${title} | ${SITE_NAME}`;
  }

  // Auto-generate canonical URL from path if url is not explicitly provided
  const canonicalUrl = url || (path ? `${SITE_DOMAIN}${path}` : undefined);

  // Merge keywords
  const allKeywords = keywords 
    ? `${keywords}, ${DEFAULT_KEYWORDS}` 
    : DEFAULT_KEYWORDS;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Set lang attribute
    document.documentElement.lang = 'it';

    // Basic meta tags
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', allKeywords);
    setMeta('name', 'author', 'Unozen Srl');
    setMeta('name', 'robots', robots);
    setMeta('name', 'viewport', 'width=device-width, initial-scale=1, maximum-scale=5');

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }

    // Open Graph meta tags
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:alt', `${SITE_NAME} - ${title}`);
    setMeta('property', 'og:locale', 'it_IT');
    if (canonicalUrl) {
      setMeta('property', 'og:url', canonicalUrl);
    }

    // Twitter meta tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', `${SITE_NAME} - ${title}`);

    // Theme color
    setMeta('name', 'theme-color', '#00122F');

    // Application name
    setMeta('name', 'application-name', SITE_NAME);
    setMeta('name', 'apple-mobile-web-app-title', SITE_NAME);

    // JSON-LD Structured Data
    if (jsonLd) {
      // Remove any previously injected LD+JSON script from SEO component
      const oldScript = document.querySelector('script[data-seo-jsonld]');
      if (oldScript) oldScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, allKeywords, robots, canonicalUrl, type, image, title, jsonLd]);

  return null;
}

// ─── Pre-built Structured Data Helpers ────────────────────────────────────────

/** Organization schema for ZenGest (operated by Unozen Srl) */
export const organizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ZenGest",
  "legalName": "Unozen Srl",
  "url": SITE_DOMAIN,
  "logo": `${SITE_DOMAIN}/og-image.png`,
  "description": "ZenGest è una piattaforma di AI clinica per psicologi e psicoterapeuti italiani: trascrive le sedute, genera note cliniche strutturate e gestisce la cartella paziente, nel rispetto del GDPR Art. 9.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "hello@zengest.it",
    "availableLanguage": ["Italian"]
  },
  "vatID": "13448760010",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Cesare Battisti 15",
    "addressLocality": "Torino",
    "addressCountry": "IT"
  }
};

/** WebSite schema */
export const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_DOMAIN,
  "inLanguage": "it-IT",
  "description": "AI clinica per psicologi italiani: trascrizione sedute, note cliniche strutturate (SOAP, DAP, BIRP) e cartella paziente, conformi al GDPR.",
  "publisher": {
    "@type": "Organization",
    "name": "ZenGest",
    "legalName": "Unozen Srl"
  }
};

/** SoftwareApplication schema for the ZenGest product */
export const softwareApplicationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ZenGest",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Software per psicologi",
  "operatingSystem": "Web",
  "inLanguage": "it-IT",
  "description": "Software di AI clinica per psicologi e psicoterapeuti: trascrive le sedute, genera note cliniche (SOAP, DAP, BIRP), aggiorna la cartella paziente e risponde a domande sui casi con Ask ZenGest. Conforme al GDPR Art. 9, dati su server europei.",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free",
      "price": "0",
      "priceCurrency": "EUR"
    },
    {
      "@type": "Offer",
      "name": "Clinical",
      "price": "39",
      "priceCurrency": "EUR",
      "description": "50 sedute/mese, cartella completa, Ask ZenGest, timeline, export documenti (IVA esclusa)"
    },
    {
      "@type": "Offer",
      "name": "Professional",
      "price": "79",
      "priceCurrency": "EUR",
      "description": "Sedute illimitate, processing e supporto prioritari (IVA esclusa)"
    }
  ],
  "creator": {
    "@type": "Organization",
    "name": "ZenGest",
    "legalName": "Unozen Srl"
  }
};

/** Helper to generate BreadcrumbList schema */
export function breadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/** Helper to generate FAQ schema for a page */
export function faqSchema(questions: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
}

/** Helper to generate Article (blog post) schema */
export function articleSchema(opts: {
  title: string;
  description?: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": opts.title,
    ...(opts.description ? { "description": opts.description } : {}),
    "inLanguage": "it-IT",
    "mainEntityOfPage": `${SITE_DOMAIN}${opts.path}`,
    ...(opts.datePublished ? { "datePublished": opts.datePublished } : {}),
    ...(opts.dateModified || opts.datePublished
      ? { "dateModified": opts.dateModified ?? opts.datePublished }
      : {}),
    "author": { "@type": "Organization", "name": SITE_NAME },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": `${SITE_DOMAIN}/og-image.png` }
    }
  };
}