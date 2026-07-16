// @ts-nocheck
// Flame — Orbit's living-flame agent avatar. Pure SVG fire (feTurbulence +
// feDisplacementMap warp animated by CSS keyframes + SMIL), clipped to a flame
// silhouette, with SUBTLE face voids (brow / eyes / nose / mouth) that emerge by
// state. Replaces the Compass Mark as the agent presence.
//
// Ported from echo_orbit FireCompass; changes: flame-path clip (not compass
// polygons), no compass rings (purple is mark-only), + thinking/reveal states,
// + consumes --flame-level (0..1 TTS amplitude) for live reactivity.
//
// States: idle | listening | thinking | speaking | reveal
// Sizes: xs(24) sm(44) md(64) lg(96) xl(140) hero(240)
import './Flame.css';

export type FlameState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'reveal';
export type FlameSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';

const SIZE_PX: Record<FlameSize, number> = { xs: 24, sm: 44, md: 64, lg: 96, xl: 140, hero: 240 };

// Flame silhouette path (viewBox 0 0 460 460): pointed tip at top, round base.
const FLAME_PATH =
  'M230 44 C252 108 302 150 302 236 C302 322 264 374 230 374 C196 374 158 322 158 236 C158 150 208 108 230 44 Z';

interface FlameProps {
  state?: FlameState;
  size?: FlameSize;
  /** 0..1 live amplitude (TTS) — drives glow/flicker intensity. */
  level?: number;
  reduced?: boolean;
  className?: string;
  'aria-label'?: string;
}

// Shared ids (identical defs across instances → safe to share).
const CLIP = 'fl-clip';
const FIRE_F = 'fl-fire-f';
const GLOW_F = 'fl-glow-f';
const FACE_F = 'fl-face-f';
const GRAD = 'fl-grad';
const GRAD2 = 'fl-grad2';

export default function Flame({
  state = 'idle',
  size = 'md',
  level = 0,
  reduced = false,
  className = '',
  'aria-label': ariaLabel = 'Orbit',
}: FlameProps) {
  const px = SIZE_PX[size];
  return (
    <div
      className={`fl-wrap ${className}`}
      data-state={state}
      data-reduced={reduced || undefined}
      style={{ width: px, height: px, ['--flame-level' as any]: level }}
      role="img"
      aria-label={ariaLabel}
    >
      <svg className="fl-svg" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" overflow="visible">
        <defs>
          <clipPath id={CLIP}>
            <path d={FLAME_PATH} />
          </clipPath>

          {/* Fire gradient — hot core → brand yellow → solar → red → void */}
          <linearGradient id={GRAD} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FFFDF5" stopOpacity="1" />
            <stop offset="20%" stopColor="#FFFAA0" stopOpacity="1" />
            <stop offset="46%" stopColor="#FF7515" stopOpacity="1" />
            <stop offset="74%" stopColor="#D1312D" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#0A0A0E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={GRAD2} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FFFAA0" stopOpacity="0.85" />
            <stop offset="38%" stopColor="#FF7515" stopOpacity="0.7" />
            <stop offset="72%" stopColor="#9B1515" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0A0A0E" stopOpacity="0" />
          </linearGradient>

          {/* Organic fire distortion */}
          <filter id={FIRE_F} x="-25%" y="-25%" width="150%" height="170%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.028 0.062" numOctaves="5" result="turb">
              {!reduced && (
                <>
                  <animate attributeName="baseFrequency" dur="6s" values="0.028 0.062;0.038 0.085;0.028 0.062" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="seed" dur="2.8s" values="3;7;12;3" repeatCount="indefinite" calcMode="discrete" />
                </>
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="40" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="2.5" />
          </filter>

          {/* Glow bloom */}
          <filter id={GLOW_F} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feColorMatrix in="b" type="matrix" values="1.2 0.3 0 0 0  0.4 0.5 0 0 0  0 0 0 0 0  0 0 0 0.6 0" result="cb" />
            <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id={FACE_F}><feGaussianBlur stdDeviation="3.5" /></filter>
        </defs>

        {/* Ambient bloom behind the flame */}
        <ellipse className="fl-bloom" cx="230" cy="232" rx="96" ry="120" fill="#ff6200" filter={`url(#${GLOW_F})`} opacity="0.14" />
        {/* Live amplitude glow — opacity driven by --flame-level */}
        <ellipse className="fl-level" cx="230" cy="232" rx="88" ry="112" fill="#FF7515" filter={`url(#${GLOW_F})`} />

        {/* Fire body — clipped to the flame silhouette */}
        <g clipPath={`url(#${CLIP})`}>
          <g className="fl-rise">
            <rect x="120" y="30" width="220" height="380" fill={`url(#${GRAD})`} filter={`url(#${FIRE_F})`} className="fl-rect fl-rect--base" />
          </g>
          <g className="fl-rise fl-rise--offset">
            <rect x="140" y="55" width="180" height="340" fill={`url(#${GRAD2})`} filter={`url(#${FIRE_F})`} className="fl-rect fl-rect--layer2" opacity="0.65" />
          </g>

          {/* Subtle face voids */}
          <g className="fl-face">
            <path d="M 200 176 Q 214 170 228 174 Q 244 170 258 176" stroke="#0a0a0e" strokeWidth="7" fill="none" filter={`url(#${FACE_F})`} className="fl-brow" />
            <ellipse cx="212" cy="190" rx="14" ry="9" fill="#0a0a0e" filter={`url(#${FACE_F})`} className="fl-eye" />
            <ellipse cx="248" cy="190" rx="14" ry="9" fill="#0a0a0e" filter={`url(#${FACE_F})`} className="fl-eye" />
            <path d="M 230 200 L 225 213 Q 230 217 235 213 L 230 200" fill="#0a0a0e" opacity="0.5" filter={`url(#${FACE_F})`} className="fl-nose" />
            <path d="M 210 226 Q 230 240 250 226" stroke="#0a0a0e" strokeWidth="6" fill="none" filter={`url(#${FACE_F})`} className="fl-mouth" />
          </g>
        </g>
      </svg>
    </div>
  );
}
