// Canonical site + organization constants. Single source for SEO, JSON-LD, footer.
export const SITE_URL = 'https://www.echo1labs.com';
export const SITE_NAME = 'Echo 1 Labs';
export const LEGAL_ENTITY = 'Echo 1 Labs LLC';
export const SITE_TAGLINE = 'Break free from business gravity.';
export const SITE_DESCRIPTION =
  'Echo 1 Labs is the Business Lifecycle Management company. We get businesses and SMBs to escape velocity with process-engineered, agent-based systems and human supervision.';

// Analytics: Echo 1 Labs' dedicated Google Tag Manager container. It manages
// GA4 + Google Ads (AW-3601628174) inside the GTM UI; the site only loads this
// one container, and only after the visitor grants consent (see ConsentBanner /
// ConsentMode). Meta/LinkedIn are intentionally not wired here yet — see
// docs/analytics-tracking.md.
export const GTM_ID = 'GTM-5BDZ45QD';

// Contact: values carried from the existing production Organization schema.
export const CONTACT_EMAIL = 'hello@echo1labs.com';
// Privacy and data-rights requests route to a dedicated inbox.
export const PRIVACY_EMAIL = 'privacy@echo1labs.com';
// Legal notices, DMCA, security reports: the Legal Counsel mailbox (a role, never a person).
export const LEGAL_EMAIL = 'legal@echo1labs.com';
// Invoices and payment questions.
export const BILLING_EMAIL = 'billing@echo1labs.com';
// Mailing address for legal notices. Single source for legal documents.
// Street address (owner supplied 2026-10-21). The registered agent address lives on
// the certificate of formation, not here.
export const POSTAL_ADDRESS = '5900 Balcones Drive STE 100, Austin, TX 78731';
export const CONTACT_PHONE = '+1-610-956-4116';
export const CONTACT_PHONE_DISPLAY = '(610) 956-4116';

export const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/products', label: 'Products' },
  { href: '/agents', label: 'Agents' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact?src=nav', label: 'Contact Sales' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/products', label: 'Products' },
  { href: '/agents', label: 'Agents' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact Sales' },
  { href: '/outcomes', label: 'Outcomes' },
  { href: '/for-business', label: 'For Business' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/blog', label: 'Blog' },
  { href: '/founding-cohort', label: 'Founding Cohort' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms-of-service', label: 'Terms' },
] as const;

// Public-facing social profiles (sameAs for Organization schema).
export const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/echo1labs',
] as const;
