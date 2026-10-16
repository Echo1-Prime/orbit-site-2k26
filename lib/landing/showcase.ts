import { truckingCopy } from './trucking';
import { oilAndGasCopy } from './oil-and-gas';
import { trackYourJobsIn3dCopy } from './track-your-jobs-in-3d';

/*
  Use-case showcase cards. Data only: no JSX, no hooks, no logic beyond reading fields.
  The component is components/UseCaseShowcase/index.tsx (named export UseCaseShowcase).

  Source of every line (nothing here is invented):
  - id, kick, title and href come from truckingCopy (lib/landing/trucking.ts): slug, eyebrow, headline,
    and the use-case route built from the slug. Change the source, never reword here.
  - Lines WRITTEN for this file, for Josh's review: ctaLabel ("See Trucking →") and demoLabel ("Demo data").
    The label follows the design band's pattern "See {app} →". "Demo data" is the label the demo uses
    for its numbers; it sits in HTML on every card so the preview never reads as client proof.
  - UNVERIFIED(stage): 'run' was inferred, no design file or Airtable row records Trucking's stage.
    Josh or the layout session confirms it, or changes this one field.
  - Oil and Gas follows the same pattern: id, kick, title and href come from oilAndGasCopy
    (lib/landing/oil-and-gas.ts), you is oilAndGasCopy.closing verbatim. Lines WRITTEN for review: ctaLabel
    ("See Oil and Gas →") and demoLabel ("Demo data"). Its stage 'run' is likewise UNVERIFIED(inferred).
  - in and agent are DRAFT-FOR-JOSH (Josh's rule 2026-10-12: draft only where no existing field fits, grounded in
    the demo's own strings, no figures, names, results or urgency). Each names its source string below.
    you is truckingCopy.closing, verbatim. The type keeps all three optional, and the card shows a row only
    when it has text.

  Files (public/videos/showcase/): one 640 px wide 16:9 clip (h264, no audio, faststart) and two posters
  (WebP, 960 and 640 wide). The hex in each file name is the sha-256 prefix of the built demo page the
  frames were captured from (see the PR for the command). Names carry no client, place or person.
*/

export type ShowcaseStage = 'win' | 'buy' | 'build' | 'run';

export interface ShowcaseTile {
  id: string;
  stage: ShowcaseStage;
  kick: string;
  title: string;
  /** What comes in. Optional until Josh writes it. */
  in?: string;
  /** What the agent does. Optional until Josh writes it. */
  agent?: string;
  /** What you do. Optional until Josh writes it. */
  you?: string;
  ctaLabel: string;
  href: string;
  video: string;
  poster: string;
  posterSmall: string;
  demoLabel: string;
  /** Hidden until further notice (Josh): kept in this file, left out of showcaseTiles. Remove the flag to show it again. */
  hidden?: boolean;
}

const TRUCKING_ASSET = '/videos/showcase/trucking-card-fd6d2d4e';
const OIL_AND_GAS_ASSET = '/videos/showcase/oil-and-gas-card-cbb93bcf';
/* Real estate development: a 3D walkthrough of a traced site with every name, road label, callout and number removed
   (Josh, 2026-10-13: anonymized, the walkthrough only, no use-case page). The card links to the full clip. */
const REAL_ESTATE_ASSET = '/videos/showcase/real-estate-card-3b678692';
const REAL_ESTATE_FULL = '/videos/showcase/real-estate-walkthrough-3b678692.mp4';
/* Track your jobs in 3D: a caption-free clip of the live build-it show (?t=62, every page element hidden but the
   scene canvas), captured 2026-10-13; the hex is the sha-256 prefix of the show's served HTML. */
const JOBS_3D_ASSET = '/videos/showcase/track-your-jobs-in-3d-card-dcd40d13';

const ALL_TILES: ShowcaseTile[] = [
  {
    id: truckingCopy.slug,
    stage: 'run', // UNVERIFIED(inferred, see header)
    kick: truckingCopy.eyebrow,
    title: truckingCopy.headline,
    // DRAFT-FOR-JOSH. Drawn from locations gate, dock and office `today`: "The guard writes the truck in; the ticket
    // waits in a tray." / "A driver hands in the ticket; its fields get keyed in twice." / "Paper and phone calls pass
    // between desks to close a packet."
    in: 'Tickets, photos, seals and signatures, from the gate to the back office.',
    // DRAFT-FOR-JOSH. Drawn from dock `orbit`: "The ticket is read once; photo, seal and signature file themselves."
    // and office `orbit`: "The packet fills as documents arrive; the office shares one screen."
    agent: 'Reads each ticket once, files the rest as it arrives, and fills the trip packet.',
    you: truckingCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See Trucking →', // written for review
    href: `/use-cases/${truckingCopy.slug}`,
    video: `${TRUCKING_ASSET}.mp4`,
    poster: `${TRUCKING_ASSET}-960.webp`,
    posterSmall: `${TRUCKING_ASSET}-640.webp`,
    demoLabel: 'Demo data', // written for review
  },
  {
    id: oilAndGasCopy.slug,
    stage: 'run', // UNVERIFIED(inferred, as for Trucking; no design file records it)
    kick: oilAndGasCopy.eyebrow,
    title: oilAndGasCopy.headline,
    // DRAFT-FOR-JOSH. Drawn from locations bay, lease pad and office `today`: "The driver hands over a run ticket that
    // is keyed in later." / "The walk is written on paper and carried to the office." / "Paper from the pad, the bay
    // and the skid lands on one desk."
    in: 'Run tickets, gauge readings and walk sheets, from the lease pad to the field office.',
    // DRAFT-FOR-JOSH. Drawn from bay `orbit`: "The run ticket is read once and matched to its load.", lease pad `orbit`:
    // "Each reading is logged against its tank as it is entered." and office `orbit`: "The daily record fills as the
    // day's papers arrive."
    agent: 'Reads each run ticket once, logs each reading against its tank, and fills the daily record.',
    you: oilAndGasCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See Oil and Gas →', // written for review
    href: `/use-cases/${oilAndGasCopy.slug}`,
    video: `${OIL_AND_GAS_ASSET}.mp4`,
    poster: `${OIL_AND_GAS_ASSET}-960.webp`,
    posterSmall: `${OIL_AND_GAS_ASSET}-640.webp`,
    demoLabel: 'Demo data', // written for review
  },
  {
    id: 'real-estate-development',
    hidden: true, // Josh, 2026-10-16: hide the real estate developer use case until further notice
    stage: 'build', // UNVERIFIED(inferred: site development precedes build-out; no design file records it)
    kick: 'Use case · Real estate development', // same pattern as the other eyebrows
    // Header and rows from the live entitlement screen, read 2026-10-13, anonymized:
    // no client, firm, town, road, site count or figure (Josh, 2026-10-13: outcome wording only).
    // Title: the page h1, lines one and two, verbatim: "Every plan. Every takeoff. / Every code. Every follow-up."
    title: 'Every plan. Every takeoff. Every code. Every follow-up.',
    // Step 1 "Plan lands: A new revision drops in. The sheet is parsed ... exactly as drawn." and
    // "the architect's checklist is the question set."
    in: 'Plan sets, site sheets and the architect’s checklist, revision by revision.',
    // Level 1 "Every site tied to its adopting jurisdiction", "The architect's checklist, cited item by item",
    // h1 "Every takeoff", h2 "Follow-ups, drafted and ready to send".
    agent: 'Ties each site to its jurisdiction, cites each code item, reads the takeoff and drafts the follow-ups.',
    // The h1's lead line without its counts: "... have a cited finding. The rest are left open and named, each with
    // who can answer it."
    you: 'Every item gets a cited finding, or stays open and named with who can answer it.',
    ctaLabel: 'Walk the site in 3D →', // the h1's last line, "Walk each site in 3D.", for the one site in the clip
    href: REAL_ESTATE_FULL,
    video: `${REAL_ESTATE_ASSET}.mp4`,
    poster: `${REAL_ESTATE_ASSET}-960.webp`,
    posterSmall: `${REAL_ESTATE_ASSET}-640.webp`,
    demoLabel: 'Names removed', // a traced site, anonymized, with no data shown
  },
  {
    id: trackYourJobsIn3dCopy.slug,
    // 'build': Josh's pillar definitions (vault orbit-brand.md, 2026-10-08): Build it = Construction Lifecycle Management.
    stage: 'build',
    kick: trackYourJobsIn3dCopy.eyebrow,
    title: trackYourJobsIn3dCopy.headline, // Josh, 2026-10-13: "Track your jobs in 3D"
    // DRAFT-FOR-JOSH. Drawn from the show's trades and its sample change order and punch list.
    in: 'Drawings, deliveries, tickets and field changes, from the pad to the punch list.',
    // DRAFT-FOR-JOSH. Drawn from the show's lines "Every trade and material tracked." and "Every product tracked with
    // every follow-up written."
    agent: 'Tracks every trade and material against the schedule and drafts each change order and follow-up.',
    you: trackYourJobsIn3dCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See Construction →', // written for review, same pattern as "See Trucking →"
    href: `/use-cases/${trackYourJobsIn3dCopy.slug}`,
    video: `${JOBS_3D_ASSET}.mp4`,
    poster: `${JOBS_3D_ASSET}-960.webp`,
    posterSmall: `${JOBS_3D_ASSET}-640.webp`,
    demoLabel: 'Demo data', // the show's events, change orders, punch items and budget figures are simulated
  },
];

/** The cards the page shows, in order. Tiles marked hidden are left out. */
export const showcaseTiles: ShowcaseTile[] = ALL_TILES.filter((t) => !t.hidden);
