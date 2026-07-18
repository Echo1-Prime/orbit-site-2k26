'use client';
import type { AvatarProps } from './types';
import { AVATAR_SIZE_PX } from './types';
import styles from './Atom.module.css';

/**
 * The canonical Echo 1 / Orbit Agent mark, animated — verbatim geometry from the
 * official vector echo1-mark.svg (handoff 2026-07-17). Sphere glow + three rings
 * (cyan horizontal, ember 52°, dashed cyan 108°) + reverse-triangle core (3 nested
 * downward polygons). Rings animate; inner ember triangle pulses; state scales period.
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
      viewBox="2 30 456 370"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      role="img"
      data-state={state}
      className={[styles.atom, reduced ? styles.reduced : '', className].filter(Boolean).join(' ')}
      style={{ '--level': level } as React.CSSProperties}
    >
      <defs>
        <radialGradient id="oaSph" cx="50%" cy="46%" r="50%">
          <stop offset="0%" stopColor="#1E4060" stopOpacity="0.92" />
          <stop offset="60%" stopColor="#0D1E32" stopOpacity="0.70" />
          <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="oaGlw" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8FD0F2" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0B1120" stopOpacity="0" />
        </radialGradient>
        <filter id="oaTglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
          <feFlood floodColor="#8FD0F2" floodOpacity="0.95" result="col" />
          <feComposite in="col" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="230" cy="200" r="148" fill="url(#oaSph)" />
      <circle cx="230" cy="200" r="110" fill="url(#oaGlw)" />
      <circle cx="230" cy="200" r="192" fill="none" stroke="rgba(143,208,242,0.08)" strokeWidth="1" strokeDasharray="2 6" />

      <g className={styles.oaR1}>
        <ellipse cx="230" cy="200" rx="228" ry="66" fill="none" stroke="#8FD0F2" strokeWidth="2.2" />
        <circle cx="458" cy="200" r="6.5" fill="#C9EAFB" style={{ filter: 'drop-shadow(0 0 10px #8FD0F2)' }} />
        <circle cx="2" cy="200" r="4.5" fill="#C9EAFB" opacity="0.75" />
      </g>
      <g className={styles.oaR2}>
        <g transform="rotate(52 230 200)">
          <ellipse cx="230" cy="200" rx="228" ry="66" fill="none" stroke="#E07B27" strokeWidth="2.2" />
          <circle cx="458" cy="200" r="7" fill="#F2A23F" style={{ filter: 'drop-shadow(0 0 12px #E07B27)' }} />
          <circle cx="2" cy="200" r="5" fill="#F2A23F" opacity="0.85" />
        </g>
      </g>
      <g className={styles.oaR3}>
        <g transform="rotate(108 230 200)">
          <ellipse cx="230" cy="200" rx="228" ry="66" fill="none" stroke="rgba(143,208,242,0.3)" strokeWidth="1.4" strokeDasharray="6 9" />
        </g>
      </g>

      <polygon points="150,175 310,175 230,290" fill="#0B1120" stroke="#8FD0F2" strokeWidth="3" filter="url(#oaTglow)" />
      <polygon points="170,189 290,189 230,272" fill="#0B1120" stroke="rgba(143,208,242,0.7)" strokeWidth="2" />
      <polygon className={styles.oaCorePulse} points="190,203 270,203 230,254" fill="rgba(224,123,39,0.45)" stroke="#E07B27" strokeWidth="2" />
    </svg>
  );
}
