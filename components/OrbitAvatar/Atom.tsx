'use client';
import { useId } from 'react';
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
      className={[styles.atom, reduced ? styles.reduced : '', className].filter(Boolean).join(' ')}
      style={{ '--level': level } as React.CSSProperties}
    >
      {/* Orbital 1 — Solar orange */}
      <g className={styles.ring1}>
        <ellipse cx="50" cy="50" rx="42" ry="13" stroke="#FF7515" strokeWidth="1.5" strokeOpacity="0.80" fill="none" />
        <circle cx="92" cy="50" r="3" fill="#FF9A55" className={styles.electron} />
      </g>

      {/* Orbital 2 — Crimson red (lyrTips) */}
      <g className={styles.ring2}>
        <ellipse cx="50" cy="50" rx="42" ry="13" stroke="#D1312D" strokeWidth="1.5" strokeOpacity="0.80" fill="none" />
        <circle cx="92" cy="50" r="3" fill="#F06B68" className={styles.electron} />
      </g>

      {/* Orbital 3 — Purple (lyrPurple) */}
      <g className={styles.ring3}>
        <ellipse cx="50" cy="50" rx="42" ry="13" stroke="#9B87D6" strokeWidth="1.5" strokeOpacity="0.80" fill="none" />
        <circle cx="92" cy="50" r="3" fill="#C0B4E8" className={styles.electron} />
      </g>

      {/* Nucleus — white core */}
      <circle cx="50" cy="50" r="5.5" fill="white" className={styles.nucleus} />
    </svg>
  );
}
