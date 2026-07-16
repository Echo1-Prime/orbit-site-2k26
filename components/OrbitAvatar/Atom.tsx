'use client';
import type { AvatarProps } from './types';
import { AVATAR_SIZE_PX } from './types';
import styles from './Atom.module.css';

const BAR_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

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
      {/* ── ambient outer halo ─────────────────────────── */}
      <circle cx="50" cy="50" r="47" fill="none"
        stroke="rgba(201,168,76,0.07)" strokeWidth="14" />

      {/* ── OUTER RING + CARDINAL ARMS — slowest CW ────── */}
      <g className={styles.ringOuter}>
        {/* Glow halo behind segments */}
        <circle cx="50" cy="50" r="44" stroke="rgba(255,196,60,0.16)"
          strokeWidth="9" fill="none" />
        {/* Segmented gold ring — ~17 segments */}
        <circle cx="50" cy="50" r="44" stroke="#C9A84C"
          strokeWidth="6" fill="none"
          strokeDasharray="11.8 5.1" strokeLinecap="butt" />
        {/* Fine outer and inner border lines */}
        <circle cx="50" cy="50" r="47.3" stroke="#4A3008"
          strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="40.7" stroke="#7A5510"
          strokeWidth="0.5" fill="none" />
        {/* Cardinal connector arms: top / bottom / left / right */}
        <rect x="48.5" y="14" width="3" height="14" fill="#C9A84C" rx="0.5" />
        <rect x="48.5" y="72" width="3" height="14" fill="#C9A84C" rx="0.5" />
        <rect x="14"  y="48.5" width="14" height="3" fill="#C9A84C" rx="0.5" />
        <rect x="72"  y="48.5" width="14" height="3" fill="#C9A84C" rx="0.5" />
      </g>

      {/* ── FIRST MID RING — medium CW ─────────────────── */}
      <g className={styles.ringMid1}>
        <circle cx="50" cy="50" r="37" stroke="#9A7020"
          strokeWidth="1.5" fill="none"
          strokeDasharray="5 2.6" />
      </g>

      {/* ── SECOND MID RING — slightly faster CCW ──────── */}
      <g className={styles.ringMid2}>
        <circle cx="50" cy="50" r="32" stroke="#6A4A10"
          strokeWidth="1" fill="none"
          strokeDasharray="3.5 2" />
      </g>

      {/* ── INNER CHAMBER — static dark fill + gold rim ── */}
      <circle cx="50" cy="50" r="27" fill="#05080F" />
      <circle cx="50" cy="50" r="27" stroke="#C9A84C" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="24.2" stroke="#1A2848" strokeWidth="0.6" fill="none" />

      {/* ── INNER BARS — same speed as mid1, offset phase ─ */}
      <g className={styles.ringInner}>
        {BAR_ANGLES.map((deg) => (
          <rect
            key={deg}
            x="49.1" y="19.5"
            width="1.8" height="5.8"
            fill="#1B3870"
            rx="0.4"
            transform={`rotate(${deg}, 50, 50)`}
          />
        ))}
        {/* Inner detail ring */}
        <circle cx="50" cy="50" r="19" stroke="#253E7A"
          strokeWidth="1" fill="none"
          strokeDasharray="2.6 1.4" />
      </g>

      {/* ── CORE MICRO RING — fastest, CCW ─────────────── */}
      <g className={styles.ringCore}>
        <circle cx="50" cy="50" r="13.5" stroke="#142040"
          strokeWidth="0.8" fill="none"
          strokeDasharray="2 1.3" />
      </g>

      {/* ── INVERTED TRIANGLE — pulsing neon blue ───────── */}
      {/* centroid at (50,50): top-edge y=45.4, bottom-point y=59.2, x=42–58 */}
      <g className={styles.triangle}>
        {/* outer glow stroke */}
        <polygon
          points="41,44.5 59,44.5 50,60"
          fill="none"
          stroke="rgba(123,175,212,0.22)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* main neon edge */}
        <polygon
          points="42,45.4 58,45.4 50,59.2"
          fill="rgba(74,140,220,0.13)"
          stroke="#7BAFD4"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* inner subtle fill highlight */}
        <polygon
          points="43.5,46.4 56.5,46.4 50,57.8"
          fill="rgba(100,170,240,0.07)"
          stroke="rgba(190,225,255,0.28)"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        {/* horizontal top-edge highlight */}
        <line x1="43" y1="46.2" x2="57" y2="46.2"
          stroke="rgba(190,230,255,0.35)" strokeWidth="0.7" />
      </g>
    </svg>
  );
}
