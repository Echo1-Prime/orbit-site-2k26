import Link from 'next/link';
import { getPost } from '@/lib/blog';
import { SITE_NAME } from '@/lib/site';
import { SUBPAGES, SUBPAGES_UPDATED, type Subpage } from '@/lib/subpages';
import styles from './SubpageSections.module.css';

const UPDATED_LABEL = new Date(`${SUBPAGES_UPDATED}T00:00:00Z`).toLocaleDateString('en-US', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

/** Definition block directly under the hero: a question-style heading and a short direct answer. */
export function AnswerBand({ p }: { p: Subpage }) {
  return (
    <section data-band="dark" aria-labelledby={`${p.slug}-answer`} className={styles.dark}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          {p.category} · {p.name}
          {p.comingSoon ? <span className={styles.soon}>Coming soon</span> : null}
        </p>
        <h2 id={`${p.slug}-answer`} className={styles.h2}>
          {p.question}
        </h2>
        <p className={styles.answer}>{p.answer}</p>
        <p className={styles.meta}>
          Last updated <time dateTime={SUBPAGES_UPDATED}>{UPDATED_LABEL}</time>
        </p>
      </div>
    </section>
  );
}

/** The questions a buyer asks, each answered in the sentences below it. Mirrors the FAQ markup in the page JSON-LD. */
export function QABand({ p }: { p: Subpage }) {
  return (
    <section data-band="light" data-theme="light" aria-labelledby={`${p.slug}-qa`} className={styles.light}>
      <div className={styles.inner}>
        <h2 id={`${p.slug}-qa`} className={styles.eyebrow}>
          Questions about {p.name}
        </h2>
        <div className={styles.qaGrid}>
          {p.qa.map((item) => (
            <div key={item.q} className={styles.qa}>
              <h3 className={styles.q}>{item.q}</h3>
              <p className={styles.a}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Breadcrumb trail, a descriptive link to every sibling page, and the links every page needs. */
export function RelatedBand({ p }: { p: Subpage }) {
  const siblings = SUBPAGES.filter((s) => s.slug !== p.slug);
  return (
    <section data-band="dark" aria-labelledby={`${p.slug}-related`} className={styles.dark}>
      <div className={styles.inner}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.crumbs}>
            <li>
              <Link href="/" className={styles.link}>
                {SITE_NAME} home
              </Link>
            </li>
            <li>
              <Link href="/products" className={styles.link}>
                All {SITE_NAME} products
              </Link>
            </li>
            <li aria-current="page">{p.name}</li>
          </ol>
        </nav>
        <h2 id={`${p.slug}-related`} className={styles.h2}>
          More from {SITE_NAME}
        </h2>
        <ul className={styles.relList}>
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className={styles.relLink}>
                {s.linkLabel}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className={styles.sub}>Related reading</h3>
        <ul className={styles.relList}>
          {p.reading.flatMap((slug) => {
            const post = getPost(slug);
            return post ? [post] : [];
          }).map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={styles.relLink}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.site}>
          <li>
            <Link href="/pricing" className={styles.link}>
              {SITE_NAME} pricing
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.link}>
              Contact {SITE_NAME}
            </Link>
          </li>
          <li>
            <Link href="/how-it-works" className={styles.link}>
              How {SITE_NAME} works
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.link}>
              About {SITE_NAME}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/** Footer for the hero-only pages, whose handoff template has none. The other pages keep the handoff footer. */
export function SubpageFooter() {
  return (
    <footer className={styles.footer}>
      <p>© 2026 {SITE_NAME} · Process Engineered Business Systems</p>
      <nav aria-label="Echo 1 Labs products">
        <ul>
          {SUBPAGES.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
