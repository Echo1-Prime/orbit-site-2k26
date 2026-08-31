// Canonical site + organization constants. Single source for SEO, JSON-LD, footer.
export const SITE_URL = 'https://echo1labs.com';
export const SITE_NAME = 'Echo 1 Labs';
export const LEGAL_ENTITY = 'Mingma Inc';
export const SITE_TAGLINE = 'Break free from business gravity.';
export const SITE_DESCRIPTION =
  'Echo 1 Labs is the Business Lifecycle Management company. We get businesses and SMBs to escape velocity with process-engineered, agent-based systems and human supervision.';

// Contact: values carried from the existing production Organization schema.
export const CONTACT_EMAIL = 'hello@echo1labs.com';
export const CONTACT_PHONE = '+1-610-956-4116';
export const CONTACT_PHONE_DISPLAY = '(610) 956-4116';

export const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/products', label: 'Products' },
  { href: '/agents', label: 'Agents' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/products', label: 'Products' },
  { href: '/agents', label: 'Agents' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/outcomes', label: 'Outcomes' },
  { href: '/for-business', label: 'For Business' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/blog', label: 'Blog' },
  { href: '/founding-cohort', label: 'Founding Cohort' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
] as const;

// Public-facing social profiles (sameAs for Organization schema).
export const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/echo1labs',
] as const;
