// @ts-nocheck
// AssetFlame — Orbit's EXACT flame artwork (orbit-flame-asset.png) brought to
// life: an SVG turbulence-displacement filter warps the real ribbons so they
// undulate organically, the outer edge is feathered so it dissolves into the app
// (no rigid border), a warm base glow breathes, and face voids emerge on speaking.
// Renders with SVG filters (no WebGL). Movable/resizable via the wrapper.
import { AVATAR_SIZE_PX, type AvatarProps } from './types';
import './AssetFlame.css';

const WARP = 'af-warp', FEATHER = 'af-feather', MASK = 'af-mask', FACE_F = 'af-face-f', GLOW_F = 'af-glow-f';

export default function AssetFlame({ state = 'idle', size = 'md', level = 0, reduced = false, className = '', 'aria-label': ariaLabel = 'Orbit' }: AvatarProps) {
  const px = AVATAR_SIZE_PX[size];
  return (
    <div className={`af-wrap ${className}`} data-state={state} data-reduced={reduced || undefined}
      style={{ width: px, height: px, ['--flame-level' as any]: level }} role="img" aria-label={ariaLabel}>
      <svg className="af-svg" viewBox="0 0 660 632" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          {/* Living warp of the real ribbons */}
          <filter id={WARP} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="2" seed="3" result="n">
              {!reduced && (
                <>
                  <animate attributeName="baseFrequency" dur="9s" values="0.009 0.013;0.013 0.019;0.009 0.013" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                  <animate attributeName="seed" dur="5s" values="3;7;12;3" repeatCount="indefinite" calcMode="discrete" />
                </>
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Edge feather so the flame dissolves into the app (borderless) */}
          <radialGradient id={FEATHER} cx="50%" cy="49%" r="56%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="72%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={MASK}><rect width="660" height="632" fill={`url(#${FEATHER})`} /></mask>
          <filter id={FACE_F}><feGaussianBlur stdDeviation="6" /></filter>
          <filter id={GLOW_F} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="20" /></filter>
        </defs>

        {/* Amplitude / base glow behind the flame */}
        <ellipse className="af-glow" cx="330" cy="576" rx="120" ry="70" fill="#FF7515" filter={`url(#${GLOW_F})`} />

        {/* The exact flame artwork (optimized WebP), warped + feathered */}
        <g mask={`url(#${MASK})`} className="af-body">
          <image href="/brand/orbit-flame.webp" x="0" y="0" width="660" height="632" filter={`url(#${WARP})`} preserveAspectRatio="xMidYMid meet" />
        </g>

        {/* Face voids emerge when speaking */}
        <g className="af-face" filter={`url(#${FACE_F})`} fill="#08060a">
          <ellipse cx="300" cy="274" rx="19" ry="12" />
          <ellipse cx="360" cy="274" rx="19" ry="12" />
          <path d="M 296 340 Q 330 362 364 340" fill="none" stroke="#08060a" strokeWidth="10" />
        </g>
      </svg>
    </div>
  );
}
