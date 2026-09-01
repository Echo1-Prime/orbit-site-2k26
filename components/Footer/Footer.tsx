import Link from 'next/link';
import OrbitMark from '@/components/OrbitMark/OrbitMark';
import { CONTACT_EMAIL, FOOTER_LINKS, LEGAL_ENTITY, SITE_NAME } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  const year = 2026; // build-time constant; avoids per-request Date and hydration drift
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <OrbitMark size={24} className={styles.mark} aria-label="Echo 1 Labs" />
          <span className={styles.wordmark}>
            <span className={styles.echo}>ECHO</span>
            <span className={styles.one}>1</span>
            <span className={styles.labs}>LABS</span>
          </span>
        </div>

        <p className={styles.copy}>
          &copy; {year} {LEGAL_ENTITY}. {SITE_NAME} is a brand of {LEGAL_ENTITY}. All rights reserved.{' '}
          &middot;{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>{CONTACT_EMAIL}</a>
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
