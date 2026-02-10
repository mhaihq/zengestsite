import React from 'react';
import { Helmet } from 'react-helmet-async';
import ogImage from 'figma:asset/7dab76c8bd67019090a5609cf9a1a41e8c727fbb.png';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  useExactTitle?: boolean;
}

export function SEO({ 
  title = "Hana Voice AI | Intelligent Patient Engagement",
  description = "Automate patient intake, monitoring, and care coordination with Hana's clinical Voice AI. Engage patients naturally, improve outcomes, and reduce administrative burden by 85%.",
  image = ogImage,
  url,
  useExactTitle = false
}: SEOProps) {
  const siteTitle = "Hana Voice AI";
  
  // Construct the full title
  // If useExactTitle is true, use the title prop as is.
  // If the title includes the site title, use it as is.
  // Otherwise, append the site title.
  let fullTitle = title;
  if (!useExactTitle && !title.includes(siteTitle)) {
    fullTitle = `${title} | ${siteTitle}`;
  }
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Voice AI, Patient Engagement, Clinical AI, Remote Patient Monitoring, AI Receptionist, Healthcare Automation, Intelligent Intake, Care Coordination" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta charSet="utf-8" />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#00122F" />
    </Helmet>
  );
}
