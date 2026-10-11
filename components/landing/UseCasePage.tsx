import type { UseCaseCopy } from '@/lib/landing/types';
import styles from './UseCasePage.module.css';

interface Props {
  copy: UseCaseCopy;
}

export default function UseCasePage({ copy }: Props) {
  return (
    <div className={styles.uc}>
      <section className={`${styles.hero} band--dark`}>
        <div className={styles.inner}>
          <span className="label">{copy.eyebrow}</span>
          <h1 className={`display-xl ${styles.h1}`}>{copy.headline}</h1>
          <p className={`body-lg ${styles.intro}`}>{copy.intro}</p>
          <ul className={styles.beats}>
            {copy.beats.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <a href={copy.signupUrl} className="btn btn--primary" target="_blank" rel="noopener">
              {copy.signupLabel}
            </a>
            <a href={copy.bookUrl} className="btn btn--ghost" target="_blank" rel="noopener">
              {copy.bookLabel}
            </a>
          </div>
        </div>
      </section>

      <section className={`section ${styles.demoSection}`} aria-label={copy.embedTitle}>
        <div className={styles.wide}>
          <div className={styles.frame}>
            <iframe
              src={copy.embedUrl}
              title={copy.embedTitle}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className={styles.iframe}
            />
          </div>
          <p className={styles.fallback}>
            <a href={copy.embedUrl} target="_blank" rel="noopener">
              {copy.embedFallback}
            </a>
          </p>
          <p className={styles.note}>{copy.note}</p>
        </div>
      </section>

      <section className={`section band--muted ${styles.locSection}`}>
        <div className={styles.inner}>
          <h2 className={`display-md ${styles.h2}`}>{copy.locationsHeadline}</h2>
          <ol className={styles.locList}>
            {copy.locations.map((loc) => (
              <li key={loc.id} className={styles.loc}>
                <h3 className={styles.locTitle}>{loc.title}</h3>
                <p className={styles.locWhat}>{loc.what}</p>
                <dl className={styles.pair}>
                  <div>
                    <dt className={styles.dtToday}>{copy.todayLabel}</dt>
                    <dd>{loc.today}</dd>
                  </div>
                  <div>
                    <dt className={styles.dtOrbit}>{copy.orbitLabel}</dt>
                    <dd>{loc.orbit}</dd>
                  </div>
                </dl>
                <div className={styles.notes}>
                  <div className={styles.noteCard}>
                    <h4 className={styles.noteTitle}>
                      <span className={styles.tagRisk}>Risk</span> {loc.risk.title}
                    </h4>
                    <p>{loc.risk.text}</p>
                  </div>
                  <div className={styles.noteCard}>
                    <h4 className={styles.noteTitle}>
                      <span className={styles.tagCovered}>Covered</span> {loc.covered.title}
                    </h4>
                    <p>{loc.covered.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section band--dark ${styles.closeBand}`}>
        <div className={styles.inner}>
          <h2 className={`display-md ${styles.h2}`}>{copy.closing}</h2>
          <div className={styles.ctas}>
            <a href={copy.signupUrl} className="btn btn--primary" target="_blank" rel="noopener">
              {copy.signupLabel}
            </a>
            <a href={copy.bookUrl} className="btn btn--ghost" target="_blank" rel="noopener">
              {copy.bookLabel}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
