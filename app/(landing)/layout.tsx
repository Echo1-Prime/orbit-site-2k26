import Link from 'next/link';
import OrbitMark from '@/components/OrbitMark/OrbitMark';
import styles from './landing.module.css';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={styles.lpHeader}>
        <div className={styles.lpHeaderInner}>
          <Link href="/" aria-label="Echo 1 Labs — home" className={styles.lpLogo}>
            <OrbitMark size={28} aria-label="Echo 1 Labs" />
            <span className={styles.lpLogoText}>Echo 1 Labs</span>
          </Link>
          <Link href="/contact" className={`btn btn--primary btn--sm ${styles.lpHeaderCta}`}>
            Schedule a call
          </Link>
        </div>
      </header>
      <main id="main" className={styles.lpMain}>{children}</main>
      <footer className={styles.lpFooter}>
        <div className={styles.lpFooterInner}>
          <span className={styles.lpFooterLegal}>© 2026 Mingma Inc. dba Echo 1 Labs. All rights reserved.</span>
          <nav className={styles.lpFooterLinks} aria-label="Footer">
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
