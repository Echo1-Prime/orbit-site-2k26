/**
 * Route slugs for the ten product subpages. Kept apart from the page registry (lib/subpages.ts) so a client
 * component can link to a page without pulling the page copy into its bundle.
 * Slugs come from keyword research (Semrush US database, read 2026-10-12): one primary keyword per page.
 * scripts/subpages-from-handoff/build_page.py repeats these slugs for the generated link table; keep them equal.
 */
export const SUBPAGE_SLUG = {
  engine: 'automated-lead-generation',
  revops: 'crm-automation',
  broadcast: 'content-marketing-automation',
  signal: 'ma-deal-sourcing',
  ledger: 'month-end-close-automation',
  titan: 'construction-estimating-software',
  prime: 'ai-agent-governance',
  aiReadiness: 'ai-readiness-assessment',
  infoManagement: 'document-processing-automation',
  voiceAgents: 'ai-voice-agents',
} as const;

/** Old /products/[slug] slug (those pages now redirect, permanently) to the new route. */
export const PRODUCT_ROUTE: Record<string, string> = {
  engine: `/${SUBPAGE_SLUG.engine}`,
  revops: `/${SUBPAGE_SLUG.revops}`,
  broadcast: `/${SUBPAGE_SLUG.broadcast}`,
  signal: `/${SUBPAGE_SLUG.signal}`,
  ledger: `/${SUBPAGE_SLUG.ledger}`,
  titan: `/${SUBPAGE_SLUG.titan}`,
  prime: `/${SUBPAGE_SLUG.prime}`,
  'ai-readiness': `/${SUBPAGE_SLUG.aiReadiness}`,
};

/** Product or capability name to its route, for cards and links that show a name. */
export const PRODUCT_NAME_ROUTE: Record<string, string> = {
  Engine: `/${SUBPAGE_SLUG.engine}`,
  RevOps: `/${SUBPAGE_SLUG.revops}`,
  Broadcast: `/${SUBPAGE_SLUG.broadcast}`,
  Signal: `/${SUBPAGE_SLUG.signal}`,
  Ledger: `/${SUBPAGE_SLUG.ledger}`,
  Titan: `/${SUBPAGE_SLUG.titan}`,
  Prime: `/${SUBPAGE_SLUG.prime}`,
  'AI Readiness': `/${SUBPAGE_SLUG.aiReadiness}`,
  'Info Management': `/${SUBPAGE_SLUG.infoManagement}`,
  'Voice Agents': `/${SUBPAGE_SLUG.voiceAgents}`,
};

/** Live URLs that now permanently redirect to a subpage. Nothing is deleted: the old page files stay in the repo. */
export const OLD_PATHS: Record<keyof typeof SUBPAGE_SLUG, string[]> = {
  engine: ['/products/engine'],
  revops: ['/products/revops'],
  broadcast: ['/products/broadcast'],
  signal: ['/products/signal'],
  ledger: ['/products/ledger'],
  titan: ['/products/titan'],
  prime: ['/products/prime'],
  aiReadiness: ['/ai-readiness', '/products/ai-readiness', '/ai-readiness-quiz', '/quiz'],
  infoManagement: [],
  voiceAgents: [],
};
