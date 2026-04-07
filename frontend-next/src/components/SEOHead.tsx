import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title, description, keywords, image, article = false,
  author, publishedTime, modifiedTime, noindex = false,
}) => {
  const router = useRouter();
  const siteUrl = 'https://naass.co.uk';
  const defaultTitle = 'NAASS - Premium Lead Generation & Digital Marketing Services UK';
  const defaultDescription = 'NAASS delivers high-quality ECO 4, Housing Disrepair, and Life Insurance leads. Expert Google PPC, Social Media Advertising, and Native Advertising services. Generate quality digital leads without risk.';
  const defaultKeywords = 'lead generation UK, ECO 4 leads, housing disrepair leads, life insurance leads, Google PPC services, social media advertising, native advertising, digital marketing UK, quality leads, B2B lead generation, performance marketing';
  const defaultImage = `${siteUrl}/og-image.jpg`;

  const seo = {
    title: title ? `${title} | NAASS` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: image || defaultImage,
    url: `${siteUrl}${router.asPath}`,
  };

  const organizationSchema = {
    "@context": "https://schema.org", "@type": "Organization",
    "name": "NAASS", "alternateName": "NAASS Leads", "url": siteUrl,
    "logo": `${siteUrl}/logo.png`, "description": defaultDescription,
    "contactPoint": [{ "@type": "ContactPoint", "telephone": "+44-20-1234-5678", "contactType": "Sales", "email": "info@naass.co.uk", "areaServed": "GB", "availableLanguage": ["English"] }],
    "address": { "@type": "PostalAddress", "addressLocality": "London", "addressCountry": "GB" },
    "sameAs": ["https://www.facebook.com/naass", "https://www.twitter.com/naass", "https://www.linkedin.com/company/naass", "https://www.instagram.com/naass"]
  };

  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service",
    "serviceType": "Lead Generation Services",
    "provider": { "@type": "Organization", "name": "NAASS" },
    "areaServed": { "@type": "Country", "name": "United Kingdom" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog", "name": "Lead Generation Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ECO 4 Leads", "description": "High-quality ECO 4 scheme leads for energy efficiency improvements" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Housing Disrepair Leads", "description": "Qualified housing disrepair claims leads" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Life Insurance Leads", "description": "Premium life insurance leads with high conversion rates" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google PPC Management", "description": "Expert Google Ads campaign management and optimization" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Advertising", "description": "Targeted social media advertising campaigns across all platforms" } }
      ]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    "name": "NAASS", "image": defaultImage, "telephone": "+44-20-1234-5678", "email": "info@naass.co.uk",
    "address": { "@type": "PostalAddress", "addressLocality": "London", "addressRegion": "Greater London", "addressCountry": "GB" },
    "url": siteUrl,
    "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
    "priceRange": "££"
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
      <link rel="canonical" href={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="NAASS" />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </Head>
  );
};

export default SEOHead;
