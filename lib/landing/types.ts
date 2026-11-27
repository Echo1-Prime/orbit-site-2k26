export interface MetricItem {
  value: string;
  label: string;
  note?: string;
}

export interface CapabilityItem {
  icon?: string;
  title: string;
  desc: string;
}

export interface ComparisonRow {
  feature: string;
  them: string;
  us: string;
}

export interface ObjectionItem {
  q: string;
  a: string;
}

export interface LandingCopy {
  /* SEO */
  slug: string;
  seoTitle: string;
  seoDesc: string;

  /* Pre-Suasion anchor (one focal principle per page) */
  presuasionFrame: string;

  /* Hero (Hook) */
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;

  /* Story - operator narrative */
  storyHeadline: string;
  storyBody: string[];

  /* Offer - Value Equation stack */
  offerHeadline: string;
  dreamOutcome: string;
  perceivedLikelihood: string;
  timeDelay: string;
  effortReduction: string;

  /* Metrics band */
  metrics: MetricItem[];

  /* Capabilities */
  capabilitiesHeadline: string;
  capabilities: CapabilityItem[];

  /* Comparison (the "enemy" stack) */
  comparisonHeadline: string;
  comparisonEnemy: string;
  comparisonRows: ComparisonRow[];

  /* Objections → FAQ schema */
  objectionsHeadline: string;
  objections: ObjectionItem[];

  /* CTA band */
  ctaBandHeadline: string;
  ctaBandSub: string;
  ctaBandPrimary: string;
}

/* Use-case pages: one embedded demo, its own text, two links. */
export interface UseCaseNote {
  title: string;
  text: string;
}

export interface UseCaseLocation {
  id: string;
  title: string;
  what: string;
  today: string;
  orbit: string;
  /** Optional: a location shows its risk and covered notes only when the source has them. */
  risk?: UseCaseNote;
  covered?: UseCaseNote;
}

export interface UseCaseCopy {
  slug: string;
  seoTitle: string;
  seoDesc: string;
  eyebrow: string;
  headline: string;
  intro: string;
  beats: string[];
  embedUrl: string;
  /** Optional: show a still of the demo (linked to embedUrl) instead of an iframe, for a demo behind sign-in. */
  demoImage?: { src: string; srcSet?: string; alt: string; width: number; height: number; caption: string };
  /** Optional: show the voice agent phone screens under the demo. */
  voiceProof?: boolean;
  embedTitle: string;
  embedFallback: string;
  note: string;
  locationsHeadline: string;
  todayLabel: string;
  orbitLabel: string;
  locations: UseCaseLocation[];
  closing: string;
  signupLabel: string;
  signupUrl: string;
  bookLabel: string;
  bookUrl: string;
}
