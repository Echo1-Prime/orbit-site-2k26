import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  LEGAL_ENTITY,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SOCIAL_LINKS,
} from './site';
import type { Product } from './products';
import type { ProductSEO } from './product-seo';

/** Build per-page Metadata with a canonical URL and consistent OG/Twitter.
    OG images come from the file-based app/opengraph-image convention. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(opts.path, SITE_URL).toString();
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  };
}

// ── JSON-LD builders (rendered server-side via <JsonLd>) ──

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: LEGAL_ENTITY,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    sameAs: [...SOCIAL_LINKS],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function serviceSchema(product: Product, seo?: ProductSEO) {
  const url = new URL(
    product.isAdvisory ? '/ai-readiness' : `/products/${product.slug}`,
    SITE_URL,
  ).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SITE_NAME} ${product.name}`,
    alternateName: product.tagline,
    serviceType: product.category,
    description: product.problem,
    url,
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: {
      '@type': 'Audience',
      audienceType: product.deployedIn.join(', '),
    },
    ...(seo?.keywords?.length
      ? { keywords: seo.keywords.join(', ') }
      : {}),
    potentialAction: {
      '@type': 'ReserveAction',
      target: new URL('/contact', SITE_URL).toString(),
      name: 'Schedule a call',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        email: CONTACT_EMAIL,
        contactType: 'sales',
      },
    },
    isPartOf: {
      '@type': 'Service',
      name: `${SITE_NAME} Business Lifecycle Management`,
      url: SITE_URL,
    },
  };
}

/** Keyword-optimized metadata for product detail pages. Falls back to
 *  generic pageMetadata when ProductSEO data is unavailable. */
export function productPageMetadata(product: Product, seo: ProductSEO): Metadata {
  const url = new URL(`/products/${product.slug}`, SITE_URL).toString();
  return {
    title: seo.seoTitle,
    description: seo.seoDesc,
    keywords: [seo.primaryKeyword, ...seo.keywords].join(', '),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: seo.seoTitle,
      description: seo.seoDesc,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.seoTitle,
      description: seo.seoDesc,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.path, SITE_URL).toString(),
    })),
  };
}

export function faqSchema(qas: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qas.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };
}
