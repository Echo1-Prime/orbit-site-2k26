import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import SiteChrome from '@/components/Site/SiteChrome';
import { subpageJsonLd, type Subpage } from '@/lib/subpages';
import AiReadinessBands from './generated/AiReadinessBands';
import BroadcastBands from './generated/BroadcastBands';
import EngineBands from './generated/EngineBands';
import InfoManagementBands from './generated/InfoManagementBands';
import LedgerBands from './generated/LedgerBands';
import PrimeBands from './generated/PrimeBands';
import RevOpsBands from './generated/RevOpsBands';
import SignalBands from './generated/SignalBands';
import TitanBands from './generated/TitanBands';
import VoiceAgentsBands from './generated/VoiceAgentsBands';
import IgnitionBands from '@/components/Ignition/IgnitionBands';
import VoiceProof from '@/components/Ignition/VoiceProof';
import ignitionStyles from '@/components/Ignition/Ignition.module.css';
import HeroClip from './HeroClip';
import { AnswerBand, QABand, RelatedBand, SubpageFooter } from './SubpageSections';

type Bands = (props: { vid?: ReactNode; afterHero?: ReactNode; beforeLast?: ReactNode }) => ReactNode;

const BANDS: Record<string, Bands> = {
  engine: EngineBands,
  revops: RevOpsBands,
  broadcast: BroadcastBands,
  signal: SignalBands,
  ledger: LedgerBands,
  titan: TitanBands,
  ignition: IgnitionBands,
  prime: PrimeBands,
  aiReadiness: AiReadinessBands,
  infoManagement: InfoManagementBands,
  voiceAgents: VoiceAgentsBands,
};

/* Hero-only handoff pages have no later band to sit before, so their extra sections follow the hero. */
const HERO_ONLY = new Set(['infoManagement', 'voiceAgents']);

/** One product subpage: the generated handoff bands with the answer block, questions and links added,
 *  inside the site chrome. Page metadata comes from subpageMetadata in the route. */
export default function SubpagePage({ p }: { p: Subpage }) {
  const Bands = BANDS[p.key];
  const detail = (
    <>
      <QABand p={p} />
      <RelatedBand p={p} />
    </>
  );
  const heroOnly = HERO_ONLY.has(p.key);
  const withFooter = (
    <>
      {detail}
      <SubpageFooter />
    </>
  );
  return (
    <>
      <JsonLd data={subpageJsonLd(p)} />
      <SiteChrome />
      <main id="main">
        <Bands
          vid={p.clip ? <HeroClip src={p.clip} /> : undefined}
          afterHero={
            heroOnly ? (
              <>
                {p.key === 'voiceAgents' && (
                  /* The Ignition phone screens: intake, compliance, dispatch and 24/7 coverage (Josh, 2026-11-27). */
                  <section data-band="dark" aria-labelledby="voice-proof" className={ignitionStyles.band}>
                    <div className={ignitionStyles.inner}>
                      <VoiceProof eyebrow="Voice agents · On the record" />
                    </div>
                  </section>
                )}
                <AnswerBand p={p} />
                {withFooter}
              </>
            ) : (
              <AnswerBand p={p} />
            )
          }
          beforeLast={heroOnly ? undefined : detail}
        />
      </main>
    </>
  );
}
