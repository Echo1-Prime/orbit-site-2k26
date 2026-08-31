import Link from 'next/link';
import { NAV_LINKS } from '@/lib/site';
import styles from './Header.module.css';

// Official Echo 1 Labs lockup (design system "Echo 1 Labs mark" - orange box retired):
// E1 mark on a theme-adaptive tile (E + tile follow currentColor / --text, so they flip
// with light/dark; the "1" stays Solar Orange) + "Echo 1 Labs" wordmark with orange 1.
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Echo 1 Labs home">
          <span className={styles.mark} aria-hidden="true">
            E<span className={styles.markSup}>1</span>
          </span>
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
