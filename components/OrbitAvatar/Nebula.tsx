// @ts-nocheck
// Nebula — Orbit as a cosmic cloud: turbulence-warped gas layers (solar / violet
// / luminous blue) drifting around a bright star core, with twinkling stars.
// Same state machine + --flame-level as the other variants.
import { AVATAR_SIZE_PX, type AvatarProps } from './types';
import './Nebula.css';

const STARS = [
  [150, 120, 2.2], [320, 150, 1.6], [360, 250, 2.4], [120, 300, 1.8],
  [300, 330, 1.5], [180, 360, 2.0], [95, 200, 1.4], [260, 95, 1.7],
  [225, 70, 2.1], [385, 330, 1.5], [80, 350, 1.6], [340, 400, 1.9],
] as const;

const CLIP = 'neb-clip', CORE = 'neb-core', CLOUDS = 'neb-clouds', BLUR = 'neb-blur';
const G_SOLAR = 'neb-g-solar', G_VIOLET = 'neb-g-violet', G_BLUE = 'neb-g-blue';

export default function Nebula({ state = 'idle', size = 'md', level = 0, reduced = false, className = '', 'aria-label': ariaLabel = 'Orbit' }: AvatarProps) {
  const px = AVATAR_SIZE_PX[size];
  return (
    <div className={`neb-wrap ${className}`} data-state={state} data-reduced={reduced || undefined}
      style={{ width: px, height: px, ['--flame-level' as any]: level }} role="img" aria-label={ariaLabel}>
      <svg className="neb-svg" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" overflow="visible">
        <defs>
          <clipPath id={CLIP}><circle cx="230" cy="230" r="158" /></clipPath>
          <radialGradient id={CORE} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="35%" stopColor="#FFE08A" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FF7515" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF7515" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={G_SOLAR} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF7515" stopOpacity="0.9" /><stop offset="100%" stopColor="#FF7515" stopOpacity="0" /></radialGradient>
          <radialGradient id={G_VIOLET} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" /><stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" /></radialGradient>
          <radialGradient id={G_BLUE} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#5B79C0" stopOpacity="0.8" /><stop offset="100%" stopColor="#5B79C0" stopOpacity="0" /></radialGradient>
          <filter id={CLOUDS} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.011 0.014" numOctaves="4" result="t">
              {!reduced && <animate attributeName="baseFrequency" dur="12s" values="0.011 0.014;0.016 0.02;0.011 0.014" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="t" scale="46" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="4" />
          </filter>
          <filter id={BLUR} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>

        <g clipPath={`url(#${CLIP})`}>
          <g className="neb-drift neb-drift--a"><ellipse cx="205" cy="215" rx="150" ry="130" fill={`url(#${G_SOLAR})`} filter={`url(#${CLOUDS})`} /></g>
          <g className="neb-drift neb-drift--b"><ellipse cx="260" cy="250" rx="140" ry="150" fill={`url(#${G_VIOLET})`} filter={`url(#${CLOUDS})`} opacity="0.9" /></g>
          <g className="neb-drift neb-drift--c"><ellipse cx="225" cy="255" rx="150" ry="135" fill={`url(#${G_BLUE})`} filter={`url(#${CLOUDS})`} opacity="0.8" /></g>
        </g>

        {/* Live amplitude glow */}
        <circle className="neb-level" cx="230" cy="230" r="120" fill="#FF7515" filter={`url(#${BLUR})`} />
        {/* Bright core */}
        <circle className="neb-coreglow" cx="230" cy="230" r="70" fill={`url(#${CORE})`} />
        <circle className="neb-star" cx="230" cy="230" r="10" fill="#FFFDF5" />

        {/* Twinkling stars */}
        <g className="neb-stars" fill="#FFFDF5">
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} className={`neb-twinkle neb-twinkle--${i % 4}`} />
          ))}
        </g>
      </svg>
    </div>
  );
}
