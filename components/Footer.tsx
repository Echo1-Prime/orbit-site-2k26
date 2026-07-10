import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const year = 2026; // static — avoids hydration drift; bump at build time if needed
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.lockup}>
            <img
              src="/orbit-mark-dark.svg"
              alt=""
              width={40}
              height={40}
              className={styles.mark}
            />
            <div className={styles.wordmark}>
              <span className={styles.echo}>ECHO-1</span>
              <span className={styles.labs}>LABS</span>
            </div>
          </div>
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
