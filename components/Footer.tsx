import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const year = 2026; // static — avoids hydration drift; bump at build time if needed
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.echo}>ECHO-1</span>
          <span className={styles.labs}>LABS</span>
          <p className={styles.tag}>
            Process-engineered systems for startups, SMBs, and portfolios.
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal">Legal</Link>
        </nav>
      </div>
      <div className={styles.base}>
        <span>© {year} Mingma Inc. (dba Echo 1 Labs)</span>
        <span>echo1labs.com</span>
      </div>
    </footer>
  );
}
