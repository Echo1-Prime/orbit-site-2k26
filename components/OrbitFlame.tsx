import Image from "next/image";
import styles from "./OrbitFlame.module.css";

// Hero flame — Brief v2 §Locked #2: "the flame concierge IS the site."
// Motion discipline (IA-DECISION 2026-07-05): slow rise, never pulse.
// Server component: pure CSS animation, reduced-motion honored via media query.
export function OrbitFlame() {
  return (
    <div className={styles.flame} aria-hidden="true">
      <Image
        src="/orbit-flame-asset.png"
        alt=""
        width={1600}
        height={900}
        priority
        sizes="(max-width: 640px) 88vw, 520px"
        className={styles.img}
      />
    </div>
  );
}
