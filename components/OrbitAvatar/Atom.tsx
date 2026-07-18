'use client';
import type { AvatarProps } from './types';
import { AVATAR_SIZE_PX } from './types';
import styles from './Atom.module.css';

/**
 * Orbit Agent core — built to the design system spec (orbit-design-system,
 * design-system.md §5–6.1 + animations.css). Reverse-triangle core (3 nested
 * downward polygons: outer cyan glow, mid ring, inner ember pulse) inside THREE
 * counter-rotating rings — ion-cyan 14s CW, ember 22s CCW (reversed), pale steel
 * dashed 30s CW — each carrying an electron dot. State drives the rotation period.
 */
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
      className={[styles.atom, reduced ? styles.reduced : '', className].filter(Boolean).join(' ')}
      style={{ '--level': level } as React.CSSProperties}
    >
      {/* faint luminous center bloom */}
      <circle cx="50" cy="50" r="12" fill="rgba(143,208,242,0.08)" />
      <circle cx="50" cy="50" r="6.5" fill="rgba(201,234,251,0.18)" />

      {/* ── Ring 1 — ion cyan, 14s clockwise ─────────────────── */}
      <g className={styles.ring1}>
        <circle cx="50" cy="50" r="42" fill="none" />
        <g transform="rotate(20 50 50)">
          <ellipse cx="50" cy="50" rx="40" ry="13" fill="none" stroke="#8FD0F2" strokeWidth="1.1" strokeOpacity="0.9" />
          <circle cx="90" cy="50" r="2.4" fill="#C9EAFB" className={styles.glowIce} />
        </g>
      </g>

      {/* ── Ring 2 — ember, 22s counter-rotating ─────────────── */}
      <g className={styles.ring2}>
        <circle cx="50" cy="50" r="42" fill="none" />
        <g transform="rotate(-46 50 50)">
          <ellipse cx="50" cy="50" rx="40" ry="13" fill="none" stroke="#E07B27" strokeWidth="1.1" strokeOpacity="0.85" />
          <circle cx="90" cy="50" r="2.6" fill="#F2A23F" className={styles.glowEmber} />
        </g>
      </g>

      {/* ── Ring 3 — pale steel dashed, 30s clockwise ────────── */}
      <g className={styles.ring3}>
        <circle cx="50" cy="50" r="42" fill="none" />
        <g transform="rotate(76 50 50)">
          <ellipse cx="50" cy="50" rx="40" ry="13" fill="none" stroke="#6C87A6" strokeWidth="0.9" strokeOpacity="0.6" strokeDasharray="3 4" />
          <circle cx="90" cy="50" r="2" fill="#8FD0F2" className={styles.glowIce} />
        </g>
      </g>

      {/* ── Reverse-triangle core — 3 nested downward polygons ── */}
      <polygon points="39,42.5 61,42.5 50,62" fill="none" stroke="rgba(143,208,242,0.35)" strokeWidth="3.2" strokeLinejoin="round" />
      <polygon points="41,44 59,44 50,60" fill="rgba(10,17,30,0.55)" stroke="#EAF6FF" strokeWidth="1.4" strokeLinejoin="round" />
      <polygon points="43.5,45.4 56.5,45.4 50,57.6" fill="none" stroke="#8FD0F2" strokeWidth="1" strokeLinejoin="round" />
      <polygon className={styles.corePulse} points="46,47.2 54,47.2 50,55" fill="#E07B27" stroke="#F2A23F" strokeWidth="0.4" strokeLinejoin="round" />
    </svg>
  );
}
