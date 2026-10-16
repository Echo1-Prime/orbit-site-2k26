import { truckingCopy } from './trucking';
import { oilAndGasCopy } from './oil-and-gas';
import { wasteWaterCopy } from './waste-water';
import { crudeTreatingCopy } from './crude-treating';
import { realEstateCopy } from './real-estate';
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

const TRUCKING_ASSET = '/videos/showcase/trucking-card-fd8dec6c';
/* Oil and gas, Waste water and Crude treating: a silent loop of each demo's 3D stage with names removed (Josh, 2026-10-16),
   captured from the deployed pages; the hex is the sha-256 prefix of the served files. The old oil-and-gas-card-cbb93bcf files are orphaned. */
const OIL_AND_GAS_ASSET = '/videos/showcase/south-texas-card-fa27c323';
const WASTE_WATER_ASSET = '/videos/showcase/waste-water-card-73294b23';
const CRUDE_ASSET = '/videos/showcase/crude-treating-card-3779e000';
/* Real estate development: a 3D walkthrough of a traced site with every name, road label, callout and number removed
   (Josh, 2026-10-13: anonymized, the walkthrough only, no use-case page). The card links to the full clip. */
const REAL_ESTATE_ASSET = '/videos/showcase/real-estate-card-82f19ba9';
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
    // DRAFT-FOR-JOSH. Drawn from the demo's own labels: "Tickets: water in", "Water loads received"
    in: 'Water trucks and tickets, load by load.',
    // DRAFT-FOR-JOSH. Drawn from the demo's own labels: "Skim oil collected", "Live site totals"
    agent: 'Counts each load, skims the oil and totals the site live.',
    you: oilAndGasCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See Oil and Gas →', // written for review
    href: `/use-cases/${oilAndGasCopy.slug}`,
    video: `${OIL_AND_GAS_ASSET}.mp4`,
    poster: `${OIL_AND_GAS_ASSET}-960.webp`,
    posterSmall: `${OIL_AND_GAS_ASSET}-640.webp`,
    demoLabel: 'Names removed · Demo figures', // Josh, 2026-10-16; the figures are illustrative samples
  },
  {
    id: wasteWaterCopy.slug,
    stage: 'run', // UNVERIFIED(inferred, as for Trucking; no design file records it)
    kick: wasteWaterCopy.eyebrow,
    title: wasteWaterCopy.headline,
    // DRAFT-FOR-JOSH. Drawn from the demo's own labels: "Tickets: water in", "Water received"
    in: 'Wastewater loads, ticket by ticket.',
    // DRAFT-FOR-JOSH. Drawn from the demo's own labels: "Skim oil collected", "Water to the disposal well, by pipe"
    agent: 'Skims the oil and sends the water to the disposal well by pipe.',
    you: wasteWaterCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See Waste water →', // written for review
    href: `/use-cases/${wasteWaterCopy.slug}`,
    video: `${WASTE_WATER_ASSET}.mp4`,
    poster: `${WASTE_WATER_ASSET}-960.webp`,
    posterSmall: `${WASTE_WATER_ASSET}-640.webp`,
    demoLabel: 'Names removed · Demo figures', // Josh, 2026-10-16; the figures are illustrative samples
  },
  {
    id: crudeTreatingCopy.slug,
    stage: 'run', // UNVERIFIED(inferred, as for Trucking; no design file records it)
    kick: crudeTreatingCopy.eyebrow,
    title: crudeTreatingCopy.headline,
    // DRAFT-FOR-JOSH. Drawn from the demo's own labels: "how off-spec crude becomes pipeline-spec crude"
    in: 'Off-spec crude, load by load.',
    // DRAFT-FOR-JOSH. Drawn from the demo's own labels: the guided "Follow the process" tour
    agent: 'Shows each step from the unloading bay to pipeline-spec crude.',
    you: crudeTreatingCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See how it works →', // written for review
    href: `/use-cases/${crudeTreatingCopy.slug}`,
    video: `${CRUDE_ASSET}.mp4`,
    poster: `${CRUDE_ASSET}-960.webp`,
    posterSmall: `${CRUDE_ASSET}-640.webp`,
    demoLabel: 'Names removed · Demo figures', // Josh, 2026-10-16; the figures are illustrative samples
  },
  {
    id: realEstateCopy.slug,
    stage: 'build', // UNVERIFIED(inferred: site development precedes build-out; no design file records it)
    kick: realEstateCopy.eyebrow,
    title: realEstateCopy.headline,
    // DRAFT-FOR-JOSH. Drawn from the demo's own text: "the architect's checklist" and "Every plan. Every takeoff. Every code."
    in: 'Plan sets, site sheets and the architect’s checklist, revision by revision.',
    // DRAFT-FOR-JOSH. Drawn from the demo's own text: "each with its citation" and "the approvals ahead".
    agent: 'Ties each site to its jurisdiction, cites each code item, reads the takeoff and drafts the follow-ups.',
    you: realEstateCopy.closing, // verbatim: "Supervised by you."
    ctaLabel: 'See Real Estate Development →', // written for review
    href: `/use-cases/${realEstateCopy.slug}`,
    video: `${REAL_ESTATE_ASSET}.mp4`,
    poster: `${REAL_ESTATE_ASSET}-960.webp`,
    posterSmall: `${REAL_ESTATE_ASSET}-640.webp`,
    demoLabel: 'Names removed · Demo figures', // not shown on the card since 2026-10-16 (Josh); kept for the data shape
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
    // Josh, 2026-10-16: the structure in this use case is real and built; the name is removed.
    // The show's events, change orders, punch items and budget figures are still simulated, so the label says so.
    demoLabel: 'Names removed · Demo figures',
  },
];

/** The cards the page shows, in order. Tiles marked hidden are left out. */
export const showcaseTiles: ShowcaseTile[] = ALL_TILES.filter((t) => !t.hidden);
