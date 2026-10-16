import type { UseCaseCopy } from './types';

/*
  Source of every line about the demo: the demo's own strings (its banner, eyebrow, headline, tab and button labels),
  read 2026-10-16 from the deployed project. Lines written for this page, for Josh's review: seoTitle, seoDesc, intro,
  embedTitle, embedFallback, signupLabel, bookLabel. Names removed (Josh, 2026-10-16: both parties agreed to a public
  use case without their names). The contact buttons point at the site's Contact Sales form.
*/
export const crudeTreatingCopy: UseCaseCopy = {
  slug: 'how-crude-treating-works',
  seoTitle: 'How crude treating works: a 3D process explainer',
  seoDesc:
    'How off-spec crude becomes pipeline-spec crude, shown in 3D with live site totals and a guided tour of each step. Names removed. Illustrative samples, not an offer.',

  eyebrow: 'Use case · Crude treating',
  headline: 'How crude treating works',
  intro:
    'How off-spec crude becomes pipeline-spec crude, shown in 3D with a guided tour of each step.',
  beats: [
    'Follow the process in 3D.',
    'Move the sliders to run your own numbers.',
    'Downside, base and upside.',
  ],

  embedUrl: 'https://e1-booth-how-it-works.vercel.app/',
  embedTitle: 'Crude treating explainer demo: a 3D process tour with live site totals',
  embedFallback: 'Open the demo in its own tab',
  note:
    'Names removed. Every price, volume and term is an illustrative sample, not an offer. Market data is live public data from the U.S. EIA.',

  /* No per-location list on this page: the demo itself carries the scenes. The page hides the section when empty. */
  locationsHeadline: '',
  todayLabel: 'Today',
  orbitLabel: 'With Agent Orbit',
  locations: [],
  closing: 'Supervised by you.',
  signupLabel: 'Contact Sales',
  signupUrl: '/contact',
  bookLabel: 'Open the full demo',
  bookUrl: 'https://e1-booth-how-it-works.vercel.app/',
};
