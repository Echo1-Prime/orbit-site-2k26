import Link from 'next/link';
import OrbitMark from '@/components/OrbitMark/OrbitMark';
import { NAV_LINKS } from '@/lib/site';
import styles from './Header.module.css';

// Official Echo 1 Labs lockup: the animated Agent Orbit mark (Solar Orange orbital,
// reduced-motion-safe) + "Echo 1 Labs" wordmark with orange 1. The E1 monogram is
// retained only as the favicon.
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Echo 1 Labs home">
          <OrbitMark size={32} className={styles.mark} aria-label="Echo 1 Labs" />
          <span className={styles.wordmark}>
            Echo <span className={styles.one}>1</span> Labs
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
