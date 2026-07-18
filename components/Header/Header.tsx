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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/agent-orbit-mark.svg" className={styles.mark} alt="" width={32} height={32} aria-hidden="true" />
          <span className={styles.wordmark}>
            <span className={styles.echo}>ECHO</span>
            <span className={styles.one}>1</span>
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
