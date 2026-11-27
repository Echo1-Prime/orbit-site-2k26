import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  GRC_COMMITMENTS,
  GRC_HEADLINE,
  GRC_LADDER_NOTE,
  GRC_SUB,
  IGNITION_AGENT_GROUPS,
  IGNITION_AGENT_NOTE,
  IGNITION_COSTS,
  IGNITION_COSTS_CLOSE,
  IGNITION_DECIDES,
  IGNITION_DEMO_TEL,
  IGNITION_DEMO_TEL_DISPLAY,
  IGNITION_DOES,
  IGNITION_FOR,
  IGNITION_HERO,
  IGNITION_IMG,
  IGNITION_NEXT,
  IGNITION_ONE_DASHBOARD,
  IGNITION_SEATS,
  IGNITION_SPILL,
  IGNITION_STATS,
  IGNITION_STATS_NOTE,
  IGNITION_USE_CASE_ROUTE,
} from '@/lib/ignition';
import { SubpageFooter } from '@/components/Subpages/SubpageSections';
import VoiceProof from './VoiceProof';
import s from './Ignition.module.css';

/* Ignition product subpage (Harness 6 of 8). Hand-built, not from the design handoff: there is no Ignition template.
   Same slot contract as the generated bands (afterHero, beforeLast). Copy: lib/ignition.ts. */
export default function IgnitionBands({ afterHero, beforeLast }: { vid?: ReactNode; afterHero?: ReactNode; beforeLast?: ReactNode }) {
  return (
    <>
      <section data-band="dark" aria-labelledby="ignition-hero" className={s.band}>
        <div className={s.inner}>
          <div className={s.split}>
            <div>
              <p className={s.eyebrow}>{IGNITION_HERO.eyebrow}</p>
              <h1 id="ignition-hero" className={s.h1}>
                {IGNITION_HERO.headline}
              </h1>
              <p className={s.lede}>
                {IGNITION_HERO.body}
              </p>
              <p className={s.tag}>{IGNITION_HERO.tagline}</p>
              <div className={s.ctas}>
                <a className={s.btn} href={`tel:${IGNITION_DEMO_TEL}`}>
                  Call the demo dispatch agent · {IGNITION_DEMO_TEL_DISPLAY}
                </a>
                <Link className={s.btnGhost} href="/contact?src=ignition">
                  Map one workflow <span className={s.arrow}>→</span>
                </Link>
              </div>
            </div>
            <figure className={s.shot}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IGNITION_IMG.board.src}
                srcSet={`${IGNITION_IMG.board.src640} 640w, ${IGNITION_IMG.board.src960} 960w, ${IGNITION_IMG.board.src} 1600w`}
                sizes="(min-width: 1000px) 58vw, 100vw"
                alt={IGNITION_IMG.board.alt}
                width={IGNITION_IMG.board.width}
                height={IGNITION_IMG.board.height}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                <b>Superintendent</b> · Every tank and truck on one board · Sample data
              </figcaption>
            </figure>
          </div>
          <ul className={s.stats}>
            {IGNITION_STATS.map((st) => (
              <li key={st.label} className={s.stat}>
                <span className={s.statValue}>{st.value}</span>
                <span className={s.statLabel}>{st.label}</span>
              </li>
            ))}
          </ul>
          <p className={s.meta}>{IGNITION_STATS_NOTE}</p>
        </div>
      </section>

      {afterHero}

      <section data-band="dark" aria-labelledby="ignition-costs" className={s.band}>
        <div className={s.inner}>
          <p className={s.eyebrow}>What it costs today</p>
          <h2 id="ignition-costs" className={s.h2}>
            What one quiet night on the lease costs
          </h2>
          <ul className={s.grid}>
            {IGNITION_COSTS.map((c, i) => (
              <li key={c.title} className={s.card}>
                <span className={s.cardKick}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.h3}>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
          <p className={s.lede}>{IGNITION_COSTS_CLOSE}</p>
        </div>
      </section>

      <section data-band="dark" aria-labelledby="ignition-does" className={s.band}>
        <div className={s.inner}>
          <div className={s.split}>
            <div>
              <p className={s.eyebrow}>What it does · For {IGNITION_FOR.toLowerCase()}</p>
              <h2 id="ignition-does" className={s.h2}>
                28 agents run one board
              </h2>
              <ol className={s.steps}>
                {IGNITION_DOES.map((d) => (
                  <li key={d}>
                    <p>{d}</p>
                  </li>
                ))}
              </ol>
              <p className={s.lede}>
                <strong>Who decides.</strong> {IGNITION_DECIDES}
              </p>
            </div>
            <figure className={s.shot}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IGNITION_IMG.tank.src} alt={IGNITION_IMG.tank.alt} width={IGNITION_IMG.tank.width} height={IGNITION_IMG.tank.height} loading="lazy" decoding="async" />
              <figcaption>
                <b>Supervisor</b> · Tank past its high mark, next step drafted. A person approves the truck · Sample data
              </figcaption>
            </figure>
          </div>
          <ul className={s.grid} aria-label="The 28 agents by group">
            {IGNITION_AGENT_GROUPS.map((g) => (
              <li key={g.title} className={s.card}>
                <span className={s.cardKick}>{g.n} agents</span>
                <h3 className={s.h3}>{g.title}</h3>
                <p>{g.line}</p>
              </li>
            ))}
          </ul>
          <p className={s.meta}>{IGNITION_AGENT_NOTE}</p>
        </div>
      </section>

      <section data-band="dark" aria-labelledby="ignition-spill" className={s.band}>
        <div className={s.inner}>
          <p className={s.eyebrow}>Ignition use case · Spill · Sample data</p>
          <h2 id="ignition-spill" className={s.h2}>
            A spill, from first call to cleanup
          </h2>
          <ol className={s.steps}>
            {IGNITION_SPILL.map((st) => (
              <li key={st.title}>
                <h3 className={s.h3}>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
          <div className={s.ctas}>
            <Link className={s.btnGhost} href={IGNITION_USE_CASE_ROUTE}>
              Walk the use case <span className={s.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section data-band="dark" aria-label="Voice agents" className={s.band}>
        <div className={s.inner}>
          <VoiceProof eyebrow="Ignition · Job line and dispatch" headingId="ignition-voice" />
        </div>
      </section>

      <section data-band="dark" aria-labelledby="ignition-seats" className={s.band}>
        <div className={s.inner}>
          <p className={s.eyebrow}>Who it serves</p>
          <h2 id="ignition-seats" className={s.h2}>
            Built for every seat, field to corner office
          </h2>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Seat</th>
                  <th scope="col">Sees</th>
                  <th scope="col">Gets</th>
                  <th scope="col">Decides</th>
                </tr>
              </thead>
              <tbody>
                {IGNITION_SEATS.map((r) => (
                  <tr key={r.seat}>
                    <th scope="row">{r.seat}</th>
                    <td>{r.sees}</td>
                    <td>{r.gets}</td>
                    <td>{r.decides}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.lede}>{IGNITION_ONE_DASHBOARD}</p>
        </div>
      </section>

      <section data-band="dark" aria-labelledby="ignition-grc" className={s.band}>
        <div className={s.inner}>
          <p className={s.eyebrow}>Governance, risk and compliance</p>
          <h2 id="ignition-grc" className={s.h2}>
            {GRC_HEADLINE}
          </h2>
          <p className={s.lede}>{GRC_SUB}</p>
          <ul className={s.grid}>
            {GRC_COMMITMENTS.map((c, i) => (
              <li key={c.title} className={s.card}>
                <span className={s.cardKick}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.h3}>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
          <p className={s.meta}>{GRC_LADDER_NOTE}</p>
        </div>
      </section>

      {beforeLast}

      <section data-band="dark" aria-labelledby="ignition-next" className={s.band}>
        <div className={s.inner}>
          <p className={s.eyebrow}>Next step</p>
          <h2 id="ignition-next" className={s.h2}>
            {IGNITION_NEXT.headline}
          </h2>
          <p className={s.lede}>{IGNITION_NEXT.text}</p>
          <p className={s.tag}>Break free from business gravity.</p>
          <div className={s.ctas}>
            <Link className={s.btn} href="/contact?src=ignition&cta=closing">
              Map one workflow <span className={s.arrow}>→</span>
            </Link>
            <a className={s.btnGhost} href={`tel:${IGNITION_DEMO_TEL}`}>
              Demo dispatch agent · {IGNITION_DEMO_TEL_DISPLAY}
            </a>
          </div>
        </div>
      </section>
      <SubpageFooter />
    </>
  );
}
