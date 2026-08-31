import Link from 'next/link';
import { NAV_LINKS } from '@/lib/site';
import styles from './Header.module.css';

// Definitive Agent Orbit logo (Josh 2026-07-18): the atom mark is rendered from the
// official asset; the wordmark is typeset "ECHO 1 LABS" — ECHO/LABS core-white, "1" ember.
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Echo 1 Labs home">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 13 13">
              <circle cx="6.5" cy="6.5" r="3" />
              <path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2" />
            </svg>
          </span>
          <span className={styles.wordmark}>Echo 1 Labs</span>
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
