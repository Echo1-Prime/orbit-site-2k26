import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

// Wordmark is rendered as Space Grotesk type per Brand Kit v5 (the v5 wordmark IS
// type: "ECHO-1" primary, "LABS" beneath in Solar Orange, -0.03em). The braided-
// teardrop graphical MARK is a separate asset not yet in the repo — see build flags.
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark} aria-label="Echo 1 Labs home">
          <span className={styles.echo}>ECHO-1</span>
          <span className={styles.labs}>LABS</span>
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
