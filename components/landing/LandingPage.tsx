'use client';
import type { LandingCopy } from '@/lib/landing/types';
import styles from './LandingPage.module.css';

interface Props {
  copy: LandingCopy;
  contactUrl?: string;
}

export default function LandingPage({ copy, contactUrl = '/contact' }: Props) {
  return (
    <div className={styles.lp}>

      {/* ── HOOK HERO ──────────────────────────────────────────── */}
      <section className={`${styles.hero} band--dark`}>
        <div className={styles.heroInner}>
          <span className="label">{copy.eyebrow}</span>
          <h1 className={`display-xl ${styles.heroH1}`}>{copy.headline}</h1>
          <p className={`body-lg ${styles.heroSub}`}>{copy.subhead}</p>
          <div className={styles.heroCtas}>
            <a href={contactUrl} className="btn btn--primary">{copy.ctaPrimary}</a>
            <a href="#story" className="btn btn--ghost">{copy.ctaSecondary}</a>
          </div>
        </div>
      </section>

      {/* ── METRICS BAND ───────────────────────────────────────── */}
      <section className={styles.metricsBand} aria-label="Key metrics">
        <div className={styles.metricsInner}>
          <div className="metrics">
            {copy.metrics.map((m) => (
              <div key={m.label} className="metric">
                <div className="metric__value">{m.value}</div>
                <div className="metric__label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPERATOR STORY ─────────────────────────────────────── */}
      <section id="story" className={`section ${styles.storySection}`}>
        <div className={styles.storyInner}>
          <h2 className={`display-md ${styles.storyH2}`}>{copy.storyHeadline}</h2>
          <div className={styles.storyBody}>
            {copy.storyBody.map((p, i) => (
              <p key={i} className="body-lg">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFER STACK ────────────────────────────────────────── */}
      <section className={`section band--muted ${styles.offerSection}`}>
        <div className={styles.offerInner}>
          <span className="label">The offer</span>
          <h2 className={`display-md ${styles.offerH2}`}>{copy.offerHeadline}</h2>
          <div className={styles.offerGrid}>
            <div className={styles.offerCard}>
              <div className={styles.offerIcon}>🏆</div>
              <div className={styles.offerLabel}>Dream outcome</div>
              <p className={styles.offerDesc}>{copy.dreamOutcome}</p>
            </div>
            <div className={styles.offerCard}>
              <div className={styles.offerIcon}>✅</div>
              <div className={styles.offerLabel}>Why it works</div>
              <p className={styles.offerDesc}>{copy.perceivedLikelihood}</p>
            </div>
            <div className={styles.offerCard}>
              <div className={styles.offerIcon}>⚡</div>
              <div className={styles.offerLabel}>Time to value</div>
              <p className={styles.offerDesc}>{copy.timeDelay}</p>
            </div>
            <div className={styles.offerCard}>
              <div className={styles.offerIcon}>🎯</div>
              <div className={styles.offerLabel}>Your lift</div>
              <p className={styles.offerDesc}>{copy.effortReduction}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ───────────────────────────────────────── */}
      <section className={`section ${styles.capSection}`}>
        <div className={styles.capInner}>
          <div className="section-header center">
            <span className="label">Capabilities</span>
            <h2 className={`display-md ${styles.capH2}`}>{copy.capabilitiesHeadline}</h2>
          </div>
          <div className="capability-grid">
            {copy.capabilities.map((c) => (
              <div key={c.title} className="card">
                <div className={styles.capIcon}>{c.icon}</div>
                <div className="card__title">{c.title}</div>
                <p className="card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ───────────────────────────────────── */}
      <section className={`section band--muted ${styles.compSection}`}>
        <div className={styles.compInner}>
          <div className="section-header">
            <span className="label">What it replaces</span>
            <h2 className={`display-md ${styles.compH2}`}>{copy.comparisonHeadline}</h2>
          </div>
          <div className={styles.compTable} role="table" aria-label={copy.comparisonHeadline}>
            <div className={`${styles.compRow} ${styles.compHeader}`} role="row">
              <div role="columnheader">Feature</div>
              <div role="columnheader">{copy.comparisonEnemy}</div>
              <div role="columnheader">Echo 1 Labs</div>
            </div>
            {copy.comparisonRows.map((row) => (
              <div key={row.feature} className={styles.compRow} role="row">
                <div className={styles.compFeature} role="cell">{row.feature}</div>
                <div className={styles.compThem} role="cell">{row.them}</div>
                <div className={styles.compUs} role="cell">{row.us}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP (empty — ethics gate) ─────────────────── */}
      {/* ProofStrip intentionally omitted until real client proof is available */}

      {/* ── OBJECTIONS / FAQ ───────────────────────────────────── */}
      <section className={`section ${styles.faqSection}`}>
        <div className={styles.faqInner}>
          <div className="section-header">
            <span className="label">Common questions</span>
            <h2 className={`display-md ${styles.faqH2}`}>{copy.objectionsHeadline}</h2>
          </div>
          <dl className="faq-list">
            {copy.objections.map((o) => (
              <div key={o.q} className="faq-item">
                <dt className="faq-q">{o.q}</dt>
                <dd className="faq-a">{o.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────────── */}
      <section className={`section band--dark ${styles.ctaBand}`}>
        <div className={styles.ctaBandInner}>
          <h2 className={`display-md ${styles.ctaBandH2}`}>{copy.ctaBandHeadline}</h2>
          <p className={`body-lg ${styles.ctaBandSub}`}>{copy.ctaBandSub}</p>
          <div className={styles.ctaBandActions}>
            <a href={contactUrl} className="btn btn--primary">{copy.ctaBandPrimary}</a>
            <button
              className="btn btn--ghost"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('orbit:open'));
                }
              }}
            >
              Talk to Orbit ↗
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
