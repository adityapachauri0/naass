import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
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

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  article = false,
  author,
  publishedTime,
  modifiedTime,
  noindex = false,
}) => {
  const location = useLocation();
  const siteUrl = 'https://naass.co.uk';
  
  // Default values
  const defaultTitle = 'NAASS - Premium Lead Generation & Digital Marketing Services UK';
  const defaultDescription = 'NAASS delivers high-quality ECO 4, Housing Disrepair, and Life Insurance leads. Expert Google PPC, Social Media Advertising, and Native Advertising services. Generate quality digital leads without risk.';
  const defaultKeywords = 'lead generation UK, ECO 4 leads, housing disrepair leads, life insurance leads, Google PPC services, social media advertising, native advertising, digital marketing UK, quality leads, B2B lead generation, performance marketing';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  
  const seo = {
    title: title ? `${title} | NAASS` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: image || defaultImage,
    url: `${siteUrl}${location.pathname}`,
  };

  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NAASS",
    "alternateName": "NAASS Leads",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": defaultDescription,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+44-20-1234-5678",
        "contactType": "Sales",
        "email": "info@naass.co.uk",
        "areaServed": "GB",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://www.facebook.com/naass",
      "https://www.twitter.com/naass",
      "https://www.linkedin.com/company/naass",
      "https://www.instagram.com/naass"
    ]
  };

  // Structured Data for Website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NAASS",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Lead Generation Services",
    "provider": {
      "@type": "Organization",
      "name": "NAASS"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lead Generation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ECO 4 Leads",
            "description": "High-quality ECO 4 scheme leads for energy efficiency improvements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Housing Disrepair Leads",
            "description": "Qualified housing disrepair claims leads"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Life Insurance Leads",
            "description": "Premium life insurance leads with high conversion rates"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Google PPC Management",
            "description": "Expert Google Ads campaign management and optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Advertising",
            "description": "Targeted social media advertising campaigns across all platforms"
          }
        }
      ]
    }
  };

  // Breadcrumb Schema
  const getBreadcrumbSchema = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      }
    ];

    pathSegments.forEach((segment, index) => {
      const url = `${siteUrl}/${pathSegments.slice(0, index + 1).join('/')}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": url
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NAASS",
    "image": defaultImage,
    "telephone": "+44-20-1234-5678",
    "email": "info@naass.co.uk",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressRegion": "Greater London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "url": siteUrl,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "££"
  };

  // Article Schema (for blog posts if needed)
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author || "NAASS Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NAASS",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seo.url
    }
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="NAASS" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel="canonical" href={seo.url} />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="London" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="NAASS" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content="@naass" />
      <meta name="twitter:creator" content="@naass" />
      
      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:author" content={author || "NAASS Team"} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Additional SEO Tags */}
      <meta name="rating" content="General" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="NAASS" />
      <meta name="application-name" content="NAASS" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(getBreadcrumbSchema())}
      </script>
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};

export default SEO;