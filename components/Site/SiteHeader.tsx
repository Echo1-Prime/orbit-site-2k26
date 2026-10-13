'use client';

import Link from 'next/link';
import { GhostButton } from '@/components/ao/feedback/GhostButton';
import { NAV_LINKS } from './chrome-data';
import { ghostProps } from './ghost';
import type { BandTheme } from './useChromeScroll';
import styles from './SiteChrome.module.css';

interface Props {
  theme: BandTheme;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onAsk: () => void;
  onStart: () => void;
}

/** Sticky 52px nav. Takes the theme of the band beneath it (280 ms), per the handoff.
 *  Wide (1024+) shows the links and two buttons; narrower shows a Menu pill. */
export default function SiteHeader({ theme, menuOpen, onToggleMenu, onAsk, onStart }: Props) {
  const light = theme === 'light';
  return (
    <header className={styles.header} data-theme={menuOpen ? 'dark' : theme}>
      <div className={styles.headerInner}>
        {/* WCAG 2.5.3: the name starts with the text the link shows. The two SVGs read "E1" then "Echo 1 Labs";
            the space between them (not rendered inside this flex row) keeps those two strings apart. */}
        <Link href="/" aria-label="E1 Echo 1 Labs, home" className={styles.brand}>
          <svg viewBox="0 0 100 100" width="28" height="28" role="img" aria-label="Echo 1 Labs">
            <rect width="100" height="100" rx="22" className={styles.brandTile} />
            <text
              x="50"
              y="67"
              textAnchor="middle"
              fontFamily="var(--ao-f-display)"
              fontWeight={700}
              fontSize={52}
              letterSpacing={-2}
              className={styles.brandE}
            >
              E<tspan className={styles.brandOne}>1</tspan>
            </text>
          </svg>
          {' '}
          <svg viewBox="0 0 400 72" width="98" height="18" aria-hidden="true">
            <text
              x="0"
              y="58"
              fontFamily="var(--ao-f-display)"
              fontWeight={500}
              fontSize={64}
              letterSpacing={-1}
              className={styles.brandText}
            >
              Echo&nbsp;<tspan className={styles.brandOne}>1</tspan>&nbsp;Labs
            </text>
          </svg>
        </Link>

        <nav aria-label="Primary" className={`${styles.nav} ${styles.wide}`}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={`${styles.actions} ${styles.wide}`}>
          <span className={styles.askOn}>
            <GhostButton {...ghostProps('secondary', 'sm')} onClick={onAsk}>
              Ask Agent Orbit
            </GhostButton>
          </span>
          <GhostButton {...ghostProps(light ? 'primary-ink' : 'primary', 'sm')} onClick={onStart}>
            Start the conversation
          </GhostButton>
        </div>

        <button
          type="button"
          className={`${styles.menuButton} ${styles.narrow}`}
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="e1-menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
