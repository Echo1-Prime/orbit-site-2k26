import Link from 'next/link';
import type { UseCaseCopy } from '@/lib/landing/types';
import styles from './UseCasePage.module.css';

interface Props {
  copy: UseCaseCopy;
}

/** A link to this site is a client-side link (the visit's attribution stays in memory); a demo on its own host opens in a new tab. */
function Cta({ url, position, className, children }: { url: string; position: string; className: string; children: React.ReactNode }) {
  const href = withCta(url, position);
  if (/^(\/|https:\/\/www\.echo1labs\.com\/)/.test(href)) {
    return (
      <Link href={href.replace(/^https:\/\/www\.echo1labs\.com/, '')} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

/** A link to the contact page also says which button it was (hero or closing); other links are left alone. */
function withCta(url: string, position: string): string {
  if (!/^(\/|https:\/\/www\.echo1labs\.com\/)contact(\?|$)/.test(url)) return url;
  return url + (url.includes('?') ? '&' : '?') + 'cta=' + position;
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
            <Cta url={copy.signupUrl} position="hero" className="btn btn--primary">
              {copy.signupLabel}
            </Cta>
            <Cta url={copy.bookUrl} position="hero" className="btn btn--ghost">
              {copy.bookLabel}
            </Cta>
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

      {copy.locations.length > 0 && (
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
      )}

      <section className={`section band--dark ${styles.closeBand}`}>
        <div className={styles.inner}>
          <h2 className={`display-md ${styles.h2}`}>{copy.closing}</h2>
          <div className={styles.ctas}>
            <Cta url={copy.signupUrl} position="closing" className="btn btn--primary">
              {copy.signupLabel}
            </Cta>
            <Cta url={copy.bookUrl} position="closing" className="btn btn--ghost">
              {copy.bookLabel}
            </Cta>
          </div>
        </div>
      </section>
    </div>
  );
}
