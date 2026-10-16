import type { UseCaseCopy } from './types';

/*
  Source of every line about the demo: the demo's own strings (its banner, eyebrow, headline, tab and button labels),
  read 2026-10-16 from the deployed project. Lines written for this page, for Josh's review: seoTitle, seoDesc, intro,
  embedTitle, embedFallback, signupLabel, bookLabel. Names removed (Josh, 2026-10-16: both parties agreed to a public
  use case without their names). The contact buttons point at the site's Contact Sales form.
*/
export const wasteWaterCopy: UseCaseCopy = {
  slug: 'waste-water',
  seoTitle: 'Waste water use case: an expanded disposal site in 3D',
  seoDesc:
    'Wastewater in, skim oil out: an expanded disposal site in 3D with live site totals, scenarios per barrel and a guided process tour. Names removed. Illustrative samples, not an offer.',

  eyebrow: 'Use case · Waste water',
  headline: 'Waste water',
  intro:
    'Wastewater in. Skim oil out. An expanded disposal site in 3D, with live site totals, scenarios per barrel and a guided process tour.',
  beats: [
    'Downside, base and upside.',
    'Move the sliders to run your own numbers.',
    'Follow the process in 3D.',
  ],

  embedUrl: 'https://e1-booth-disposal.vercel.app/',
  embedTitle: 'Waste water use case demo: an expanded disposal site in 3D with live site totals',
  embedFallback: 'Open the demo in its own tab',
  note:
    'Names removed. Illustrative site, not a real location and not a survey. Prices, volumes and terms are illustrative samples, not an offer.',

  /* No per-location list on this page: the demo itself carries the scenes. The page hides the section when empty. */
  locationsHeadline: '',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [],
  closing: 'Supervised by you.',
  signupLabel: 'Contact Sales',
  signupUrl: '/contact',
  bookLabel: 'Open the full demo',
  bookUrl: 'https://e1-booth-disposal.vercel.app/',
};
