import type { UseCaseCopy } from './types';

/*
  Source of every line about the demo: the demo's own strings (its banner, eyebrow, headline, tab and button labels),
  read 2026-10-16 from the deployed project. Lines written for this page, for Josh's review: seoTitle, seoDesc, intro,
  embedTitle, embedFallback, signupLabel, bookLabel. Names removed (Josh, 2026-10-16: both parties agreed to a public
  use case without their names). The contact buttons point at the site's Contact Sales form.
*/
export const oilAndGasCopy: UseCaseCopy = {
  slug: 'oil-and-gas',
  seoTitle: 'Oil and gas use case: a South Texas treating facility in 3D',
  seoDesc:
    'Walk a South Texas treating facility in 3D: water trucks in, skim oil out, live site totals, scenarios per barrel and a guided process tour. Names removed. Illustrative samples, not an offer.',

  eyebrow: 'Use case · Oil and gas',
  headline: 'Oil and Gas',
  intro:
    'A treating facility in South Texas, drawn in 3D. Water trucks unload, skim oil goes out, and the site totals update as the day runs.',
  beats: [
    'Downside, base and upside.',
    'Move the sliders to run your own numbers.',
    'Follow the process in 3D.',
  ],

  embedUrl: 'https://e1-booth-south-texas.vercel.app/',
  embedTitle: 'South Texas treating facility demo: 3D site, live site totals and scenarios per barrel',
  embedFallback: 'Open the demo in its own tab',
  note:
    'Names removed. Prices, volumes and terms are illustrative samples, not an offer. Market data is live public data from the U.S. EIA.',

  /* No per-location list on this page: the demo itself carries the scenes. The page hides the section when empty. */
  locationsHeadline: '',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [],
  closing: 'Supervised by you.',
  signupLabel: 'Contact Sales',
  signupUrl: '/contact?src=use-case-oil-and-gas',
  bookLabel: 'Open the full demo',
  bookUrl: 'https://e1-booth-south-texas.vercel.app/',
};
