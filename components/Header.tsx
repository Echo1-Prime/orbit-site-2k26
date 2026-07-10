import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

// Identity lockup: Compass Mark 2K26 v1 (identity mark, from canonical SVG,
// never reconstructed per §17) paired with Space Grotesk type wordmark.
// Nav bg is Void black in both themes → orbit-mark-dark.svg works everywhere.
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.lockup} aria-label="Echo 1 Labs home">
          <img
            src="/orbit-mark-dark.svg"
            alt=""
            width={44}
            height={44}
            className={styles.mark}
          />
          <span className={styles.wordmark}>
            <span className={styles.echo}>ECHO-1</span>
            <span className={styles.labs}>LABS</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/contact" className="btn btn-primary">
            Apply
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
