'use client';

import Link from 'next/link';
import { DEST, DRAWER_CARDS } from './chrome-data';
import styles from './SiteChrome.module.css';

/** "Where operators go next": three destination cards, no visitor counts.
 *  Opening rules (60% scroll or 45 s, never within 10 s, once per session) live in SiteChrome. */
export default function NextBestDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-label="Where operators go next" data-theme="light" className={styles.drawer}>
      <div className={styles.drawerHead}>
        <p className={styles.drawerTitle}>Where operators go next</p>
        <button type="button" className={styles.pill} onClick={onClose}>
          Close
        </button>
      </div>
      <div className={styles.drawerGrid}>
        {DRAWER_CARDS.map((c) => (
          <Link key={c.dest} href={DEST[c.dest].route} className={styles.destCard} onClick={onClose}>
            <span className={styles.destBody}>
              <span className={styles.destEyebrow}>{c.eyebrow}</span>
              <span className={styles.destTitle}>{c.title}</span>
              <span className={styles.destLine}>{c.line}</span>
            </span>
            <span className={styles.arrow}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
