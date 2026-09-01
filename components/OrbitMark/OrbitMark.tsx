'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

export type OrbitMarkState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'reveal';

// Speed multipliers on the base orbit durations — smaller = faster.
const SPEED: Record<OrbitMarkState, number> = {
  idle: 1,
  reveal: 0.75,
  listening: 0.6,
  thinking: 0.45,
  speaking: 0.55,
};

/**
 * The Agent Orbit animation: a Solar Orange orbital field — three energy nodes
 * orbiting a glowing core on nested rings. Matches the homepage hero orbital.
 * Compact and reusable (concierge launcher, footer). Reduced-motion freezes it.
 */
export default function OrbitMark({
  size = 40,
  state = 'idle',
  reduced: reducedProp,
  className = '',
  'aria-label': ariaLabel = 'Orbit',
}: {
  size?: number;
  state?: OrbitMarkState;
  reduced?: boolean;
  className?: string;
  'aria-label'?: string;
}) {
  const auto = useReducedMotion();
  const reduced = reducedProp ?? auto;
  const k = SPEED[state] ?? 1;

  const node = (cx: number, r: number, baseDur: number, cw: boolean, opacity: number, glow: boolean) => (
    <g>
      <circle
        cx={cx}
        cy="50"
        r={r}
        fill="#FF7515"
        opacity={opacity}
        style={glow ? { filter: 'drop-shadow(0 0 2.5px rgba(255,117,21,0.9))' } : undefined}
      />
      {!reduced && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`${cw ? 0 : 360} 50 50`}
          to={`${cw ? 360 : 0} 50 50`}
          dur={`${(baseDur * k).toFixed(2)}s`}
          repeatCount="indefinite"
        />
      )}
    </g>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="om-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7515" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#FF7515" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* core glow */}
      <circle cx="50" cy="50" r="30" fill="url(#om-core)" />

      {/* nested rings */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#FF7515" strokeWidth="1" strokeOpacity="0.20" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#FF7515" strokeWidth="0.9" strokeOpacity="0.13" />
      <circle cx="50" cy="50" r="17" fill="none" stroke="#FF7515" strokeWidth="0.8" strokeOpacity="0.16" />

      {/* orbiting energy nodes */}
      {node(92, 3.4, 9, true, 1, true)}
      {node(80, 2.6, 6, false, 0.8, false)}
      {node(67, 2.0, 4.2, true, 0.6, false)}

      {/* core node */}
      <circle cx="50" cy="50" r="3" fill="#FF7515" />
    </svg>
  );
}
