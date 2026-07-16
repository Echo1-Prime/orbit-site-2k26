'use client';
import type { AvatarProps } from './types';
import { AVATAR_SIZE_PX } from './types';
import styles from './Atom.module.css';

export default function Atom({
  state = 'idle',
  size = 'md',
  level = 0,
  reduced = false,
  className = '',
  'aria-label': ariaLabel = 'Orbit',
}: AvatarProps) {
  const px = AVATAR_SIZE_PX[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      role="img"
      data-state={state}
      className={[styles.atom, reduced ? styles.reduced : '', className]
        .filter(Boolean).join(' ')}
      style={{ '--level': level } as React.CSSProperties}
    >
      {/* ── ambient outer blue halo ──────────────────────── */}
      <circle cx="50" cy="50" r="48" fill="none"
        stroke="rgba(74,120,200,0.07)" strokeWidth="22" />

      {/* ── static inner concentric depth rings ─────────── */}
      <circle cx="50" cy="50" r="17" fill="none"
        stroke="rgba(100,160,230,0.11)" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="11" fill="none"
        stroke="rgba(100,160,230,0.09)" strokeWidth="0.6" />

      {/* ── RING 1 — medium blue, plane 0° ───────────────── */}
      <g className={styles.ring1}>
        <ellipse cx="50" cy="50" rx="43" ry="8"
          stroke="#5A88C8" strokeWidth="1.0" fill="none" strokeOpacity="0.88" />
        <circle cx="93" cy="50" r="2.2" fill="white" className={styles.eBlu} />
      </g>

      {/* ── RING 2 — deeper blue, plane 36° ─────────────── */}
      <g className={styles.ring2}>
        <ellipse cx="50" cy="50" rx="43" ry="11"
          stroke="#4A72B0" strokeWidth="0.9" fill="none" strokeOpacity="0.80" />
        <circle cx="93" cy="50" r="2.1" fill="white" className={styles.eBlu} />
      </g>

      {/* ── RING 3 — Solar ORANGE, plane 72° ────────────── */}
      <g className={styles.ring3}>
        <ellipse cx="50" cy="50" rx="43" ry="9"
          stroke="#FF7515" strokeWidth="1.2" fill="none" strokeOpacity="0.82" />
        <circle cx="93" cy="50" r="2.5" fill="#FFD090" className={styles.eOrg} />
      </g>

      {/* ── RING 4 — Patronus blue, plane 108° ──────────── */}
      <g className={styles.ring4}>
        <ellipse cx="50" cy="50" rx="43" ry="13"
          stroke="#7BAFD4" strokeWidth="0.9" fill="none" strokeOpacity="0.75" />
        <circle cx="93" cy="50" r="1.9" fill="white" className={styles.eBlu} />
      </g>

      {/* ── RING 5 — navy blue, plane 144° ──────────────── */}
      <g className={styles.ring5}>
        <ellipse cx="50" cy="50" rx="43" ry="7"
          stroke="#3A60A0" strokeWidth="0.9" fill="none" strokeOpacity="0.78" />
        <circle cx="93" cy="50" r="1.9" fill="white" className={styles.eBlu} />
      </g>

      {/* ── CENTER GLOW — white/blue radial bloom ────────── */}
      <circle cx="50" cy="50" r="14" fill="rgba(140,195,255,0.09)" />
      <circle cx="50" cy="50" r="9.5" fill="rgba(170,215,255,0.15)" />
      <circle cx="50" cy="50" r="6"   fill="rgba(210,232,255,0.28)" />
      <circle cx="50" cy="50" r="3.5" fill="rgba(238,248,255,0.62)" />
      <circle cx="50" cy="50" r="1.8" fill="rgba(255,255,255,0.95)" />

      {/* ── dark veil behind triangle for contrast ────────── */}
      <circle cx="50" cy="52" r="9.5" fill="rgba(8,14,38,0.38)" />

      {/* ── INVERTED TRIANGLE ▽ — Patronus blue neon ──────── */}
      <g className={styles.triangle}>
        {/* outer soft glow */}
        <polygon points="41,44.5 59,44.5 50,60"
          fill="none"
          stroke="rgba(123,175,212,0.22)"
          strokeWidth="4"
          strokeLinejoin="round" />
        {/* main neon edge */}
        <polygon points="42,45.4 58,45.4 50,59.2"
          fill="rgba(60,130,210,0.20)"
          stroke="#9DCCE8"
          strokeWidth="1.7"
          strokeLinejoin="round" />
        {/* top-edge highlight */}
        <line x1="43.5" y1="46.2" x2="56.5" y2="46.2"
          stroke="rgba(210,240,255,0.50)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
