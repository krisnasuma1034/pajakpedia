import React, { useEffect } from 'react';
import { Article } from '../types';

interface SEOMetaProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  article?: Article;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title = 'PajakPedia — Portal Edukasi Pajak, Keuangan & Bisnis Indonesia',
  description = 'Portal edukasi pajak dan keuangan Indonesia terpercaya. Panduan PPh 21 skema TER, simulasi pajak UMKM PP 55, kalkulator PPN, Coretax DJP, dan kamus istilah regulasi.',
  type = 'website',
  article,
}) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title.includes('PajakPedia') ? title : `${title} | PajakPedia`;

    // 2. Helper to set or create meta tags
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);

    // 3. Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    const fullUrl = window.location.origin + window.location.pathname;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Update Schema.org JSON-LD
    let scriptTag = document.getElementById('pajakpedia-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'pajakpedia-jsonld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    if (article) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'PajakPedia',
          url: window.location.origin,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
      };
      scriptTag.textContent = JSON.stringify(articleSchema);
    } else {
      const portalSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'PajakPedia',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        description:
          'Portal edukasi perpajakan Indonesia terpadu dengan kalkulator PPh 21 TER, simulasi UMKM 0.5%, PPN 11%, dan kamus regulasi resmi.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
      };
      scriptTag.textContent = JSON.stringify(portalSchema);
    }
  }, [title, description, type, article]);

  return null;
};
