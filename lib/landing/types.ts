export interface MetricItem {
  value: string;
  label: string;
  note?: string;
}

export interface CapabilityItem {
  icon: string;
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

  /* Story — operator narrative */
  storyHeadline: string;
  storyBody: string[];

  /* Offer — Value Equation stack */
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
