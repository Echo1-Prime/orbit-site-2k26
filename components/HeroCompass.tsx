import Image from "next/image";
import styles from "./HeroCompass.module.css";

// HeroCompass — Compass Mark 2K26 v1 as the hero identity presence.
// Josh directive 2026-07-10: flame retires; compass is the site's visual anchor.
// Server component: pure CSS animation, reduced-motion honored via media query.
export function HeroCompass() {
  return (
    <div className={styles.mark} aria-hidden="true">
      <Image
        src="/orbit-mark-dark.svg"
        alt=""
        width={200}
        height={200}
        priority
        className={styles.img}
      />
    </div>
  );
}
