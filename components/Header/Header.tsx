import Link from 'next/link';
import { NAV_LINKS } from '@/lib/site';
import styles from './Header.module.css';

// §17: the E¹ mark is rendered from the official file; the wordmark is typeset
// (ECHO-1 in ink, LABS in Solar). The Compass Mark is reserved for the hero/concierge.
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Echo 1 Labs home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/echo1-e1-mark.svg" className={styles.mark} alt="" width={30} height={30} aria-hidden="true" />
          <span className={styles.wordmark}>
            <span className={styles.echo1}>ECHO-1</span>
            <span className={styles.labs}>LABS</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <Link href="/contact" className={`btn btn--primary btn--sm ${styles.cta}`}>
          Schedule a Call
        </Link>
      </div>
    </header>
  );
}
