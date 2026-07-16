import Link from 'next/link';
import { FOOTER_LINKS, LEGAL_ENTITY, SITE_NAME } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  const year = 2026; // build-time constant; avoids per-request Date and hydration drift
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/echo1-e1-mark.svg" className={styles.mark} alt="" width={22} height={22} aria-hidden="true" />
          <span className={styles.wordmark}>
            <span className={styles.echo1}>ECHO-1</span>
            <span className={styles.labs}>LABS</span>
          </span>
        </div>

        <p className={styles.copy}>
          &copy; {year} {LEGAL_ENTITY}. {SITE_NAME} is a brand of {LEGAL_ENTITY}. All rights reserved.
        </p>

        <nav className={styles.links} aria-label="Footer">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
