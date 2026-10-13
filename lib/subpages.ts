import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './site';
import { breadcrumbSchema, faqSchema } from './seo';
import { OLD_PATHS, SUBPAGE_SLUG } from './subpage-routes';

/**
 * Registry for the ten product subpages ported from the 2K26 design handoff.
 *
 * Route slugs come from keyword research (Semrush US database, read 2026-10-12; Josh approved the spend):
 * one primary keyword per page, secondary terms go in the copy. Volumes move, so re-check before launch.
 * Copy is the handoff's own sentences, reorganised for search and answer engines. A fact that is not in
 * the handoff or already on the live site is not here.
 */

export interface SubpageQA {
  q: string;
  a: string;
}

export interface Subpage {
  /** Handoff page key, also the generated component prefix. */
  key: string;
  slug: string;
  name: string;
  /** Short label for the category line and breadcrumb. */
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Page title without the brand; the root layout template appends " | Echo 1 Labs". */
  title: string;
  description: string;
  /** Definition block shown right after the hero: 40 to 60 words, first sentence defines the entity. */
  question: string;
  answer: string;
  qa: SubpageQA[];
  /** Descriptive anchor text for links to this page from its siblings. */
  linkLabel: string;
  ogAlt: string;
  /** Blog post slugs on the same topic, linked as related reading (lib/blog.ts). */
  reading: string[];
  /** Hero clip served from /public, or none. */
  clip?: string;
  /** Live URLs that now permanently redirect here. */
  oldPaths: string[];
}

/** Date of the last substantial content change; shown on the page and used in the sitemap and JSON-LD. */
export const SUBPAGES_UPDATED = '2026-10-12';

const TRUST_LADDER =
  'Every agent starts at Shadow, where it watches and touches nothing while it learns how your people do the work. At Draft and approve, it drafts and you sign every output. At Threshold, it acts inside limits you set and stops and escalates outside them. You can move an agent back a rung at any time.';

export const SUBPAGES: Subpage[] = [
  {
    key: 'engine',
    slug: SUBPAGE_SLUG.engine,
    name: 'Engine',
    category: 'Go-to-market',
    primaryKeyword: 'automated lead generation',
    secondaryKeywords: ['ai lead generation', 'b2b lead generation software'],
    title: 'Automated Lead Generation Agents',
    description:
      'Engine finds the accounts worth chasing from permits, CRM history and web intent, and drafts each outreach message for your approval.',
    question: 'What is automated lead generation with Engine?',
    answer:
      'Engine is the Echo 1 Labs go-to-market agent for automated lead generation. It reads permits, CRM history and web intent against your ideal customer, finds the accounts worth chasing, and drafts an outreach message for each one. Every message waits for your approval, and accepted accounts move to RevOps with their history attached.',
    qa: [
      {
        q: 'What does Engine do?',
        a: 'Engine finds the accounts worth chasing and opens the conversation. It does three things: target account discovery from permits, CRM history and web intent read against your ideal customer; outreach drafts, with a message written for each account; and handoff to RevOps, where accepted accounts move to Sales with their history attached.',
      },
      { q: 'Does Engine send messages on its own?', a: 'No. Every message waits for your approval. Engine drafts and holds each one, and you decide what goes out.' },
      { q: 'How is Engine supervised?', a: TRUST_LADDER },
    ],
    linkLabel: 'Automated lead generation with Engine',
    ogAlt: 'Echo 1 Labs Engine: automated lead generation. A list of target accounts with source and review status.',
    clip: '/videos/subpages/engine-hero.mp4',
    oldPaths: OLD_PATHS.engine,
    reading: ['engine-go-to-market-layer-blm-os', 'ai-lead-gen-real-vs-hype'],
  },
  {
    key: 'revops',
    slug: SUBPAGE_SLUG.revops,
    name: 'RevOps',
    category: 'Sales',
    primaryKeyword: 'crm automation',
    secondaryKeywords: ['sales pipeline automation', 'sales follow up automation'],
    title: 'CRM Automation and Follow-Up Agents',
    description:
      'RevOps keeps every deal moving in your CRM: stalled deals flagged the day they stall, every follow-up drafted for your approval.',
    question: 'What is CRM automation with RevOps?',
    answer:
      'RevOps is the Echo 1 Labs sales agent for CRM automation. It watches your pipeline, flags stalled deals the day they stall, drafts every follow-up and queues it for approval, and scores each deal against your qualification criteria. Stalled deals reach you first, and every follow-up waits for your approval.',
    qa: [
      {
        q: 'What does RevOps do?',
        a: 'RevOps keeps every deal moving and every follow-up sent. It watches the pipeline and flags stalled deals the day they stall, drafts every follow-up and queues it for approval, and runs a qualification agent that scores each deal against your criteria.',
      },
      { q: 'Who sees a stalled deal first?', a: 'You do. Stalled deals reach you first, so you decide what happens next.' },
      { q: 'How is RevOps supervised?', a: TRUST_LADDER },
    ],
    linkLabel: 'CRM automation with RevOps',
    ogAlt: 'Echo 1 Labs RevOps: CRM automation. A pipeline of deals with source and review status.',
    oldPaths: OLD_PATHS.revops,
    reading: ['revenue-operations-layer-revops-mid-market', 'crm-implementation-mid-market'],
  },
  {
    key: 'broadcast',
    slug: SUBPAGE_SLUG.broadcast,
    name: 'Broadcast',
    category: 'Marketing',
    primaryKeyword: 'content marketing automation',
    secondaryKeywords: ['social media automation', 'brand voice ai'],
    title: 'Content Marketing Automation in Your Voice',
    description:
      'Broadcast drafts posts, newsletters and captions in your voice and watches ad spend against your limits. Nothing publishes without your approval.',
    question: 'What is content marketing automation with Broadcast?',
    answer:
      'Broadcast is the Echo 1 Labs marketing agent for content marketing automation. It turns what you know into content that sounds like you: posts, newsletters and captions drafted in your voice. It watches ad spend and creative against the limits you set, and holds everything for your signature before anything publishes.',
    qa: [
      {
        q: 'What does Broadcast do?',
        a: 'Broadcast turns what you know into content that sounds like you. It drafts posts, newsletters and captions in your voice, watches ad spend and creative against the limits you set, and holds everything for your signature.',
      },
      { q: 'Can Broadcast publish without approval?', a: 'No. Nothing publishes without your approval.' },
      { q: 'How is Broadcast supervised?', a: TRUST_LADDER },
    ],
    linkLabel: 'Content marketing automation with Broadcast',
    ogAlt: 'Echo 1 Labs Broadcast: content marketing automation. A content queue across LinkedIn, newsletter, Facebook, Instagram and YouTube.',
    clip: '/videos/subpages/broadcast-hero.mp4',
    oldPaths: OLD_PATHS.broadcast,
    reading: ['content-on-autopilot-broadcast-marketing-cadence'],
  },
  {
    key: 'signal',
    slug: SUBPAGE_SLUG.signal,
    name: 'Signal',
    category: 'M&A',
    primaryKeyword: 'm&a deal sourcing',
    secondaryKeywords: ['deal sourcing software', 'm&a lifecycle management'],
    title: 'M&A Deal Sourcing, Thesis to First Call',
    description:
      'Signal sources acquisition targets from your thesis, screens each against criteria you set once, and briefs you on the few worth a first call.',
    question: 'What is M&A deal sourcing with Signal?',
    answer:
      'Signal is M&A deal sourcing for owners growing by acquisition. You set a thesis once: size, margin profile, geography, owner transition and customer concentration. Signal finds businesses for sale and owners preparing to step back, scores each against the thesis with the evidence attached, and sends a one-page brief on the few worth a call.',
    qa: [
      {
        q: 'What is M&A deal sourcing?',
        a: 'M&A deal sourcing is the search and screening that comes before a first call with a seller: finding acquisition targets and checking each one against what you want to buy. Signal does the searching and screening so you spend your time on the targets that fit.',
      },
      {
        q: 'What does Signal screen against?',
        a: 'Your thesis: size, margin profile, geography, owner transition and customer concentration. You set it once, and Signal scores each target against it with the evidence attached.',
      },
      { q: 'Who makes the decision?', a: 'You do. The decision stays yours. Targets that clear the bar reach you with a one-page brief, ready for a first call.' },
    ],
    linkLabel: 'M&A deal sourcing with Signal',
    ogAlt: 'Echo 1 Labs Signal: M&A deal sourcing. A list of acquisition targets scored against a thesis.',
    oldPaths: OLD_PATHS.signal,
    reading: ['what-is-signal'],
  },
  {
    key: 'ledger',
    slug: SUBPAGE_SLUG.ledger,
    name: 'Ledger',
    category: 'Finance and ops',
    primaryKeyword: 'month end close automation',
    secondaryKeywords: ['month end close software', 'bank reconciliation software'],
    title: 'Month End Close Automation',
    description:
      'Ledger drafts bank reconciliations and the month-end close for your controller and flags cost drift before month end.',
    question: 'What is month-end close automation with Ledger?',
    answer:
      'Ledger is the Echo 1 Labs finance and operations agent for month-end close automation. It drafts the bank reconciliation and the close checklist for your controller, flags cost drift against limits you set before month end, and keeps a live general ledger feed as entries post. Every draft waits for your controller.',
    qa: [
      {
        q: 'What does Ledger do?',
        a: 'Ledger closes the books and flags drift before month end. It prepares the bank reconciliation and the close checklist for the controller, flags cost drift against limits you set, and keeps a live general ledger feed as entries post.',
      },
      { q: 'Does Ledger work with QuickBooks Online?', a: 'Yes. Ledger is integrated with QuickBooks Online, and it keeps a live general ledger feed as entries post.' },
      { q: 'Who approves Ledger’s work?', a: 'Your controller. Every draft waits for your controller before it posts. ' + TRUST_LADDER },
    ],
    linkLabel: 'Month-end close automation with Ledger',
    ogAlt: 'Echo 1 Labs Ledger: month-end close automation. A close checklist with reconciliation drafts and variance flags.',
    oldPaths: OLD_PATHS.ledger,
    reading: ['ledger-financial-automation-owner-led-businesses', 'ai-powered-financial-intelligence'],
  },
  {
    key: 'titan',
    slug: SUBPAGE_SLUG.titan,
    name: 'Titan',
    category: 'Construction',
    primaryKeyword: 'construction estimating software',
    secondaryKeywords: ['construction bidding software', 'construction takeoff software'],
    title: 'Construction Estimating Software for Bids',
    description:
      'Titan takes a plan set to a priced bid: quantities extracted and checked, a bid assembled line by line, subcontractor scopes by trade.',
    question: 'What is construction estimating software from Titan?',
    answer:
      'Titan is Construction Lifecycle Management. It takes a plan set to a priced bid, then runs the job. Titan extracts quantities and checks them against the plan revision, assembles the bid line by line for your review, and allocates subcontractor scopes by trade with open items listed. Every quantity is checked before it reaches your desk.',
    qa: [
      {
        q: 'What does Titan do?',
        a: 'Titan takes a plan set to a priced bid, then runs the job. It extracts quantities and checks them against the plan revision, assembles the bid line by line for your review, and allocates subcontractor scopes by trade with open items listed.',
      },
      {
        q: 'What is Construction Lifecycle Management?',
        a: 'It is the path of a construction job from plan set to priced bid to the job itself. Titan covers that path, and every quantity is checked before it reaches your desk.',
      },
      { q: 'How is Titan supervised?', a: TRUST_LADDER },
    ],
    linkLabel: 'Construction estimating software: Titan',
    ogAlt: 'Echo 1 Labs Titan: construction estimating. A priced bid with checked quantities for a pole barn.',
    clip: '/videos/home/hero-titan.mp4',
    oldPaths: OLD_PATHS.titan,
    reading: ['document-intelligence-titan-contracts-invoices-pos'],
  },
  {
    key: 'prime',
    slug: SUBPAGE_SLUG.prime,
    name: 'Prime',
    category: 'Governance',
    primaryKeyword: 'ai agent governance',
    secondaryKeywords: ['ai governance platform', 'human in the loop ai'],
    title: 'AI Agent Governance and Action Log',
    description:
      'Prime sets who can do what, places every agent on a trust rung you control, and keeps a log you own of every proposal, approval and action.',
    question: 'What is AI agent governance with Prime?',
    answer:
      'Prime is AI agent governance. It sets who can do what and keeps the record of who did. Every agent sits on a trust rung you assigned, starting at Shadow, and you can move it any time. Proposals, approvals and actions are written to a log you own, and outside your limits an agent stops and asks.',
    qa: [
      {
        q: 'What does Prime do?',
        a: 'Prime sets who can do what and keeps the record of who did. It gives every agent a trust level you assign, writes proposals, approvals and actions to a log you own, and escalates when an agent reaches the edge of its limits.',
      },
      { q: 'Where does Prime live?', a: 'Prime lives inside Agent Orbit. Its action log shows agents from across the Echo 1 Labs products.' },
      {
        q: 'What happens when an agent goes outside its limits?',
        a: 'It stops and asks. Outside your limits an agent escalates to you, and you can move any agent back a rung at any time.',
      },
    ],
    linkLabel: 'AI agent governance with Prime',
    ogAlt: 'Echo 1 Labs Prime: AI agent governance. A daily action log showing each agent, its trust rung and its status.',
    oldPaths: OLD_PATHS.prime,
    reading: ['prime-governance-layer-agent-run-business'],
  },
  {
    key: 'aiReadiness',
    slug: SUBPAGE_SLUG.aiReadiness,
    name: 'AI Readiness',
    category: 'Enablement',
    primaryKeyword: 'ai readiness assessment',
    secondaryKeywords: ['ai readiness', 'process mapping'],
    title: 'AI Readiness Assessment: Process First',
    description:
      'AI Readiness maps how your work moves, defines who approves what, and places each agent in Shadow before any agent runs your process.',
    question: 'What is an AI readiness assessment?',
    answer:
      'An AI readiness assessment maps how your work actually moves and puts the routine parts on rules before any agent is placed. At Echo 1 Labs it covers process mapping, decision rights and agent placement. Each agent starts in Shadow on your busiest decision. Then it puts you at the gate.',
    qa: [
      {
        q: 'What does AI Readiness cover?',
        a: 'Three things: process mapping, which writes down how the work actually moves before an agent touches it; decision rights, which settle who approves what and the limits that apply; and agent placement, where each agent starts in Shadow on the busiest decision.',
      },
      {
        q: 'Is AI Readiness a product?',
        a: 'No. It is an enablement engagement that comes before agents are placed, not one of the Echo 1 Labs products.',
      },
      { q: 'Where does the first agent start?', a: TRUST_LADDER },
    ],
    linkLabel: 'AI readiness assessment',
    ogAlt: 'Echo 1 Labs AI Readiness: a process map, decision rights and agent placement review.',
    oldPaths: OLD_PATHS.aiReadiness,
    reading: ['ai-readiness-7-questions', 'how-to-run-ai-readiness-audit', 'evaluate-business-readiness-blm-os'],
  },
  {
    key: 'infoManagement',
    slug: SUBPAGE_SLUG.infoManagement,
    name: 'Info Management',
    category: 'Information',
    primaryKeyword: 'document processing automation',
    secondaryKeywords: ['intelligent document processing', 'document management software'],
    title: 'Document Processing Automation',
    description:
      'Agents read every document, file it where it belongs and keep it searchable, with every action logged. Paperwork in, records out.',
    question: 'What is document processing automation?',
    answer:
      'Document processing automation turns paperwork into searchable records. With Echo 1 Labs info management, agents read every document, file it where it belongs, and keep it searchable, and every action is logged. Paperwork goes in and records come out. Like every Echo 1 Labs agent, these agents start at Shadow and earn the next rung of trust.',
    qa: [
      {
        q: 'What does info management do?',
        a: 'Paperwork in, records out. Agents read every document, file it where it belongs, and keep it searchable.',
      },
      { q: 'Is every action logged?', a: 'Yes. Every action is logged.' },
      { q: 'How are the agents supervised?', a: TRUST_LADDER },
    ],
    linkLabel: 'Document processing automation',
    ogAlt: 'Echo 1 Labs info management: document processing automation. Paperwork read, filed and searchable.',
    clip: '/videos/subpages/info-management-hero.mp4',
    oldPaths: OLD_PATHS.infoManagement,
    reading: ['document-intelligence-titan-contracts-invoices-pos'],
  },
  {
    key: 'voiceAgents',
    slug: SUBPAGE_SLUG.voiceAgents,
    name: 'Voice Agents',
    category: 'Voice',
    primaryKeyword: 'ai voice agents',
    secondaryKeywords: ['ai receptionist', 'virtual receptionist'],
    title: 'AI Voice Agents for Business Calls',
    description:
      'Voice agents answer, qualify and route your calls on the record. Anything outside your limits goes to a person.',
    question: 'What are AI voice agents?',
    answer:
      'AI voice agents answer, qualify and route your calls, on the record. Anything outside the limits you set goes to a person. Echo 1 Labs voice agents work like every agent we build: they start at Shadow under your supervision and earn the next rung of trust, so every call is answered and you stay in control.',
    qa: [
      { q: 'What do voice agents do?', a: 'Voice agents answer, qualify and route calls, on the record.' },
      { q: 'What happens to a call that is outside the limits?', a: 'Anything outside your limits goes to a person.' },
      { q: 'How are voice agents supervised?', a: TRUST_LADDER },
    ],
    linkLabel: 'AI voice agents',
    ogAlt: 'Echo 1 Labs voice agents: every call answered, qualified and routed, on the record.',
    clip: '/videos/subpages/voice-agents-hero.mp4',
    oldPaths: OLD_PATHS.voiceAgents,
    reading: ['ai-voice-agents-b2b-2026'],
  },
];

export const SUBPAGE_SLUGS = SUBPAGES.map((p) => p.slug);

export const getSubpage = (slug: string): Subpage | undefined => SUBPAGES.find((p) => p.slug === slug);

export function subpageMetadata(p: Subpage): Metadata {
  const path = '/' + p.slug;
  const url = new URL(path, SITE_URL).toString();
  const image = { url: `/og/${p.slug}`, width: 1200, height: 630, alt: p.ogAlt };
  const fullTitle = `${p.title} | ${SITE_NAME}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: p.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: p.description, images: [{ url: image.url, alt: p.ogAlt }] },
  };
}

/** One JSON-LD graph per page: WebPage, Breadcrumb, a Service for the entity, and the visible Q&A.
 *  No offers and no ratings: pricing is by quote and there are no reviews to show. */
export function subpageJsonLd(p: Subpage) {
  const path = '/' + p.slug;
  const url = new URL(path, SITE_URL).toString();
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: p.name, path },
  ]);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${p.title} | ${SITE_NAME}`,
        description: p.description,
        inLanguage: 'en-US',
        dateModified: SUBPAGES_UPDATED,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: new URL(`/og/${p.slug}`, SITE_URL).toString(),
          width: 1200,
          height: 630,
          caption: p.ogAlt,
        },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        about: { '@id': `${url}#service` },
      },
      { ...crumbs, '@context': undefined, '@id': `${url}#breadcrumb` },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${SITE_NAME} ${p.name}`,
        serviceType: p.primaryKeyword,
        description: p.description,
        url,
        provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      { ...faqSchema(p.qa), '@context': undefined },
    ],
  };
}
