'use client';

import Link from 'next/link';
import { GhostButton } from '@/components/ao/feedback/GhostButton';
import { SIGN_IN_APPS } from '@/lib/site';
import { NAV_LINKS } from './chrome-data';
import { ghostProps } from './ghost';
import styles from './SiteChrome.module.css';

interface Props {
  onClose: () => void;
  onAsk: () => void;
  onStart: () => void;
}

/** Full-height menu under the 52px nav, below 1024 px. Always dark (handoff). */
export default function MobileMenu({ onClose, onAsk, onStart }: Props) {
  return (
    <div id="e1-menu" className={styles.menu}>
      {NAV_LINKS.map((l) => (
        <Link key={l.href} href={l.href} onClick={onClose} className={styles.menuLink}>
          {l.label}
        </Link>
      ))}
      <div className={styles.menuFoot}>
        <nav aria-label="Sign in" className={styles.signIn}>
          <p className={styles.signInLabel}>Sign in</p>
          {SIGN_IN_APPS.map((app) => (
            <a key={app.href} href={app.href} onClick={onClose} className={styles.signInLink}>
              <span>{app.name}</span>
              <span className={styles.signInLine}>{app.line}</span>
            </a>
          ))}
        </nav>
        <GhostButton {...ghostProps('primary', 'md', { width: '100%' })} onClick={onStart}>
          Start the conversation
        </GhostButton>
        <GhostButton {...ghostProps('secondary', 'md', { width: '100%' })} onClick={onAsk}>
          Ask Agent Orbit
        </GhostButton>
      </div>
    </div>
  );
}
