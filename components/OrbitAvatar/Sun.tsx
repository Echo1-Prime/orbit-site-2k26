// @ts-nocheck
// Sun — Orbit as a radiant star: white-hot core, churning plasma disc, rotating
// corona rays, edge prominences. Same state machine + --flame-level as the flame.
import { AVATAR_SIZE_PX, type AvatarProps } from './types';
import './Sun.css';

const CX = 230, CY = 230;

// 12 alternating long/short rays around the disc. Coordinates are rounded to a
// fixed precision so the SSR string matches the client exactly (float toString
// differs between Node and the browser → otherwise a hydration mismatch).
const f = (n: number) => n.toFixed(2);
function ray(i: number): string {
  const a = ((i * 30 - 90) * Math.PI) / 180;
  const ca = Math.cos(a), sa = Math.sin(a);
  const px = -sa, py = ca;
  const even = i % 2 === 0;
  const r1 = 104, r2 = even ? 172 : 148, w = even ? 9 : 6;
  const tx = CX + ca * r2, ty = CY + sa * r2;
  const b1x = CX + ca * r1 + px * w, b1y = CY + sa * r1 + py * w;
  const b2x = CX + ca * r1 - px * w, b2y = CY + sa * r1 - py * w;
  return `${f(tx)},${f(ty)} ${f(b1x)},${f(b1y)} ${f(b2x)},${f(b2y)}`;
}
const RAYS = Array.from({ length: 12 }, (_, i) => ray(i));

const CORE = 'sun-core', GLOW = 'sun-glow', TURB = 'sun-turb', BLUR = 'sun-blur';

export default function Sun({ state = 'idle', size = 'md', level = 0, reduced = false, className = '', 'aria-label': ariaLabel = 'Orbit' }: AvatarProps) {
  const px = AVATAR_SIZE_PX[size];
  return (
    <div className={`sun-wrap ${className}`} data-state={state} data-reduced={reduced || undefined}
      style={{ width: px, height: px, ['--flame-level' as any]: level }} role="img" aria-label={ariaLabel}>
      <svg className="sun-svg" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" overflow="visible">
        <defs>
          <radialGradient id={CORE} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="32%" stopColor="#FFE08A" />
            <stop offset="58%" stopColor="#FF7515" />
            <stop offset="82%" stopColor="#D1312D" />
            <stop offset="100%" stopColor="#6B0F0F" />
          </radialGradient>
          <radialGradient id={GLOW} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB43C" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#FF7515" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF7515" stopOpacity="0" />
          </radialGradient>
          <filter id={TURB} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="4" result="t">
              {!reduced && <animate attributeName="seed" dur="3s" values="2;9;15;2" repeatCount="indefinite" calcMode="discrete" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="t" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={BLUR} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="16" /></filter>
        </defs>

        {/* Corona glow */}
        <circle className="sun-corona" cx={CX} cy={CY} r="150" fill={`url(#${GLOW})`} filter={`url(#${BLUR})`} />
        {/* Live amplitude glow */}
        <circle className="sun-level" cx={CX} cy={CY} r="140" fill="#FF7515" filter={`url(#${BLUR})`} />
        {/* Rotating rays */}
        <g className="sun-rays">
          {RAYS.map((pts, i) => (
            <polygon key={i} points={pts} fill="#FF9500" opacity={i % 2 === 0 ? 0.85 : 0.5} className={i % 2 === 0 ? 'sun-ray--long' : 'sun-ray--short'} />
          ))}
        </g>
        {/* Plasma disc */}
        <circle className="sun-disc" cx={CX} cy={CY} r="96" fill={`url(#${CORE})`} filter={`url(#${TURB})`} />
        {/* Edge prominences */}
        <g className="sun-prom" fill="none" stroke="#FF7515" strokeWidth="4" strokeLinecap="round" opacity="0.7">
          <path d="M 300 168 Q 330 150 322 120" />
          <path d="M 160 300 Q 138 328 108 322" />
        </g>
        {/* Subtle face (speaking only) */}
        <g className="sun-face" fill="#6B0F0F">
          <ellipse cx="208" cy="224" rx="11" ry="7" />
          <ellipse cx="252" cy="224" rx="11" ry="7" />
          <path d="M 206 252 Q 230 266 254 252" fill="none" stroke="#6B0F0F" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}
