import Link from 'next/link';
import {
  GRC_COMMITMENTS,
  GRC_HEADLINE,
  GRC_LADDER_NOTE,
  IGNITION_IMG,
  IGNITION_ROUTE,
  IGNITION_STATS,
  IGNITION_STATS_NOTE,
  IGNITION_USE_CASE_ROUTE,
} from '@/lib/ignition';
import VoiceProof from './VoiceProof';
import s from './Ignition.module.css';

/* Home page GRC highlight (Josh, 2026-11-27: "That should be our GRC highlight"). Ignition's board, the governance
   commitments, then the voice agent phones. Every line is from lib/ignition.ts (the two decks). */
export default function IgnitionHighlight() {
  return (
    <>
      <section data-band="dark" aria-labelledby="grc-ignition" className={s.band}>
        <div className={s.inner}>
          <div className={s.split}>
            <div>
              <p className={s.eyebrow}>Governance, risk and compliance · Ignition</p>
              <h2 id="grc-ignition" className={s.h2}>
                From tank alarm to approved truck
              </h2>
              <p className={s.lede}>
                Ignition is the oilfield logistics operating system: job line, dispatch, tickets and invoices on one board.
                {' '}{GRC_HEADLINE}
              </p>
              <ul className={s.stats}>
                {IGNITION_STATS.slice(0, 2).map((st) => (
                  <li key={st.label} className={s.stat}>
                    <span className={s.statValue}>{st.value}</span>
                    <span className={s.statLabel}>{st.label}</span>
                  </li>
                ))}
              </ul>
              <div className={s.ctas}>
                <Link className={s.btn} href={IGNITION_USE_CASE_ROUTE}>
                  See the spill use case <span className={s.arrow}>→</span>
                </Link>
                <Link className={s.btnGhost} href={IGNITION_ROUTE}>
                  Explore Ignition <span className={s.arrow}>→</span>
                </Link>
              </div>
            </div>
            <figure className={s.shot}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IGNITION_IMG.board.src}
                srcSet={`${IGNITION_IMG.board.src640} 640w, ${IGNITION_IMG.board.src960} 960w, ${IGNITION_IMG.board.src} 1391w`}
                sizes="(min-width: 1000px) 58vw, 100vw"
                alt={IGNITION_IMG.board.alt}
                width={IGNITION_IMG.board.width}
                height={IGNITION_IMG.board.height}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <b>Superintendent</b> · Every tank and truck on one board · Sample data
              </figcaption>
            </figure>
          </div>
          <ul className={s.grid} aria-label="Governance commitments">
            {GRC_COMMITMENTS.map((c) => (
              <li key={c.title} className={s.card}>
                <h3 className={s.h3}>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
          <p className={s.meta}>
            {GRC_LADDER_NOTE} {IGNITION_STATS_NOTE}
          </p>
        </div>
      </section>
      <section data-band="dark" aria-labelledby="voice-proof" className={s.band}>
        <div className={s.inner}>
          <VoiceProof />
        </div>
      </section>
    </>
  );
}
