import type { UseCaseCopy } from './types';

/*
  Real estate development use case. Every line about the demo is the demo's own text, read 2026-10-16 from
  https://e1-booth-real-estate.vercel.app/ (its headline, its count line, its section names and its disclaimer).
  Lines written for this page, for Josh's review: seoTitle, seoDesc, intro, embedTitle, embedFallback, signupLabel,
  bookLabel. Names removed (Josh, 2026-10-16): the client, the city, the roads, the parcel and every ordinance number.
*/
export const realEstateCopy: UseCaseCopy = {
  slug: 'real-estate-development',
  seoTitle: 'Real estate development use case: an entitlement screen you can walk in 3D',
  seoDesc:
    'Every plan. Every takeoff. Every code. A preliminary entitlement screen for a development site, with cited findings, the approvals ahead and a 3D scene you can walk through. Names removed.',

  eyebrow: 'Use case · Real estate development',
  headline: 'Real Estate Development',
  intro:
    'Every plan. Every takeoff. Every code. A site screened against eleven ordinance items, each with a cited finding, and a 3D scene of the site to walk through.',
  beats: ['Every item, cited.', 'The approvals ahead.', 'Walk the site in 3D.'],

  embedUrl: 'https://e1-booth-real-estate.vercel.app/',
  embedTitle: 'Real estate development use case demo: an entitlement screen with a 3D site walkthrough',
  embedFallback: 'Open the demo in its own tab',
  note: 'Names removed. A preliminary screen: not a legal opinion, not a zoning verification letter.',

  /* No per-location list on this page: the demo itself carries the findings. The page hides the section when empty. */
  locationsHeadline: '',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [],
  closing: 'Supervised by you.',
  signupLabel: 'Contact Sales',
  signupUrl: '/contact?src=use-case-real-estate-development',
  bookLabel: 'Open the full demo',
  bookUrl: 'https://e1-booth-real-estate.vercel.app/',
};
