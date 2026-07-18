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
      {/* ── ambient outer cyan halo ──────────────────────── */}
      <circle cx="50" cy="50" r="48" fill="none"
        stroke="rgba(143,208,242,0.06)" strokeWidth="22" />

      {/* ── static inner concentric depth rings ─────────── */}
      <circle cx="50" cy="50" r="17" fill="none"
        stroke="rgba(143,208,242,0.11)" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="11" fill="none"
        stroke="rgba(143,208,242,0.09)" strokeWidth="0.6" />

      {/* ── RING 1 — ion cyan, plane 0° ───────────────── */}
      <g className={styles.ring1}>
        <ellipse cx="50" cy="50" rx="43" ry="8"
          stroke="#8FD0F2" strokeWidth="1.0" fill="none" strokeOpacity="0.90" />
        <circle cx="93" cy="50" r="2.2" fill="white" className={styles.eBlu} />
      </g>

      {/* ── RING 2 — slate, plane 36° ─────────────── */}
      <g className={styles.ring2}>
        <ellipse cx="50" cy="50" rx="43" ry="11"
          stroke="#6C87A6" strokeWidth="0.9" fill="none" strokeOpacity="0.80" />
        <circle cx="93" cy="50" r="2.1" fill="#C9EAFB" className={styles.eBlu} />
      </g>

      {/* ── RING 3 — ember orange, plane 72° ────────────── */}
      <g className={styles.ring3}>
        <ellipse cx="50" cy="50" rx="43" ry="9"
          stroke="#E07B27" strokeWidth="1.2" fill="none" strokeOpacity="0.85" />
        <circle cx="93" cy="50" r="2.5" fill="#F2A23F" className={styles.eOrg} />
      </g>

      {/* ── RING 4 — ice glow, plane 108° ──────────── */}
      <g className={styles.ring4}>
        <ellipse cx="50" cy="50" rx="43" ry="13"
          stroke="#C9EAFB" strokeWidth="0.9" fill="none" strokeOpacity="0.75" />
        <circle cx="93" cy="50" r="1.9" fill="white" className={styles.eBlu} />
      </g>

      {/* ── RING 5 — steel blue, plane 144° ──────────────── */}
      <g className={styles.ring5}>
        <ellipse cx="50" cy="50" rx="43" ry="7"
          stroke="#2E4E74" strokeWidth="0.9" fill="none" strokeOpacity="0.80" />
        <circle cx="93" cy="50" r="1.9" fill="white" className={styles.eBlu} />
      </g>

      {/* ── CENTER GLOW — ice/cyan radial bloom ────────── */}
      <circle cx="50" cy="50" r="14" fill="rgba(143,208,242,0.09)" />
      <circle cx="50" cy="50" r="9.5" fill="rgba(201,234,251,0.15)" />
      <circle cx="50" cy="50" r="6"   fill="rgba(234,246,255,0.28)" />
      <circle cx="50" cy="50" r="3.5" fill="rgba(240,250,255,0.62)" />
      <circle cx="50" cy="50" r="1.8" fill="rgba(255,255,255,0.95)" />

      {/* ── dark veil behind triangle for contrast ────────── */}
      <circle cx="50" cy="52" r="9.5" fill="rgba(10,17,30,0.42)" />

      {/* ── INVERTED TRIANGLE ▽ — ion-cyan neon + ember core ── */}
      <g className={styles.triangle}>
        {/* outer soft glow */}
        <polygon points="41,44.5 59,44.5 50,60"
          fill="none"
          stroke="rgba(143,208,242,0.22)"
          strokeWidth="4"
          strokeLinejoin="round" />
        {/* main neon edge */}
        <polygon points="42,45.4 58,45.4 50,59.2"
          fill="rgba(143,208,242,0.12)"
          stroke="#8FD0F2"
          strokeWidth="1.7"
          strokeLinejoin="round" />
        {/* ember inner triangle — logo signature */}
        <polygon points="45.8,47.9 54.2,47.9 50,55.4"
          fill="#E07B27" fillOpacity="0.92"
          stroke="#F2A23F" strokeWidth="0.5"
          strokeLinejoin="round" />
        {/* top-edge highlight */}
        <line x1="43.5" y1="46.2" x2="56.5" y2="46.2"
          stroke="rgba(201,234,251,0.55)" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
