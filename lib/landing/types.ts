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
  risk: UseCaseNote;
  covered: UseCaseNote;
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
