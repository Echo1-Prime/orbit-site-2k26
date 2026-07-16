'use client';

// FireSpirit — Orbit as a fluid, unconfined WebGL fire spirit: domain-warped fbm
// fire that rises, wisps, and dissolves into the dark. No shape, no mask, no
// teardrop — a living fire that is part of the scene. Adapted from the proven
// echo_orbit galaxy-nebula WebGL2 shader (single fullscreen-triangle draw).
// State drives flow/brightness; --flame-level (0..1 TTS amplitude) pumps the core.

import { useEffect, useRef } from 'react';
import { AVATAR_SIZE_PX, type AvatarProps } from './types';
import styles from './FireSpirit.module.css';

const VERT = `#version 300 es
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p*2.0-1.0,0.0,1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime, uSpeed, uBright, uLevel;
uniform vec2 uRes;
out vec4 o;

// --- noise ---
float hash21(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),u.x),
             mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),u.x),u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p+11.3; a*=0.5; } return v; }

// FIX 4 — ridged noise folds fbm into crisp vertical filaments
float ridged(vec2 p){ float n=fbm(p)*0.5+0.5; n=1.0-abs(2.0*n-1.0); return n*n; }

// Sunset ramp: visible body heat range is 0.60-0.90 due to 0.38+0.62*heat offset
// Moves rose/magenta bridge to heat=0.56-0.75 so VISIBLE flame body glows pink/rose
// Dense core (density>0.45): warm amber | thin body (density 0.27-0.38): vivid rose
vec3 fireRamp(float heat){
  vec3 col = mix(vec3(3.5,0.04,0.25), vec3(9.0,0.12,0.45), smoothstep(0.0,0.38,heat));  // deep crimson
  col = mix(col, vec3(8.0, 0.05, 5.00), smoothstep(0.35,0.58,heat));   // vivid violet/magenta mid
  col = mix(col, vec3(10.0,0.40,1.80), smoothstep(0.56,0.75,heat));    // rose/magenta bridge
  col = mix(col, vec3(14.0,0.70,1.20), smoothstep(0.73,1.00,heat));    // hot crimson-rose core
  return col;
}

// Sunset irid palette: violet(0.72)→magenta(0.83)→hot-pink(0.90)→red(0.97)→orange(0.07)
// Start at 0.72 (pure violet, zero green) — 0.65 was blue-green, caused olive contamination
// Range [0.72, 1.07] never crosses 0.15-0.50 (yellow-green danger zone)
vec3 sunsetPal(float t){
  float h = fract(t * 0.26 + 0.72);  // [0.72,0.98] = violet→magenta→rose→crimson, no orange
  vec3 k = vec3(0.0, 0.667, 0.333);
  vec3 p = clamp(abs(fract(h + k) * 6.0 - 3.0) - 1.0, 0.0, 1.0);
  return 0.97 * mix(vec3(1.0), p, 0.97);
}

// FIX 3 — luminance-preserving tonemap: compresses luma, keeps hue ratios
const vec3 LUMA = vec3(0.2126,0.7152,0.0722);
vec3 tonemapLuma(vec3 hdr){
  float y = max(dot(hdr, LUMA), 1e-6);
  float ym = y / (1.0 + y);          // Reinhard on luma only
  return hdr * (ym / y);             // scale all channels equally -> hue preserved
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;   // centered, y up
  float t = uTime * uSpeed;
  float base = -0.36;                                  // raised from -0.48: space below for base glow
  float h = clamp(uv.y - base, 0.0, 1.0);            // 0 at base .. 1 at top

  // FIX 5 — buoyant advection: top moves faster, tears tips into separated licks
  float buoy = mix(0.38, 1.75, h);
  float sway = 0.055 * sin(t * 2.1 + uv.y * 5.8);

  // FIX 6 — bounded domain warp (was 3.2*r, now 0.18/0.08/0.02 per level)
  vec2 ps = vec2(uv.x * 2.9 + sway, uv.y * 1.05);   // 2.4→2.9: narrower horizontal compression
  ps.y -= t * buoy;
  vec2 q = vec2(fbm(ps + vec2(0.0,  0.0)),
                fbm(ps + vec2(5.2,  1.3)));
  ps += 0.18 * (q - 0.5);
  vec2 r = vec2(fbm(ps + vec2(1.7, 9.2)),
                fbm(ps + vec2(8.3, 2.8)));
  ps += 0.08 * (r - 0.5);
  float hf = fbm(ps * 2.1 + vec2(3.1, 7.4));
  ps += 0.02 * (vec2(hf) - 0.5);

  float d = fbm(ps);

  // --- shape ---
  float bx    = mix(0.40, 0.07, h);   // wider base, no hard horizontal edge
  float horiz = exp(-((uv.x - sway * 0.6) * (uv.x - sway * 0.6)) / (bx * bx));
  float rise  = pow(1.0 - h, 0.72);

  // FIX 4 — ridged high-freq layer adds crisp filament structure at tips
  float ridgeD  = ridged(ps * 3.0);
  // base density: fbm body + ridged tips; thresholds lowered vs over-warped version
  float density = clamp(d * 1.1 + ridgeD * 0.4 * h, 0.0, 1.0);

  // Body: lower threshold fills voids created by bounded-warp local minima
  float body     = smoothstep(0.16, 0.42, density);
  float filament = pow(smoothstep(0.52, 0.70, density), 2.0);   // crisp tongues
  float fire     = horiz * (0.25 + rise) * body;

  // Soft ambient: keeps interior from going pitch-black without filling into a solid blob
  float voidFill = smoothstep(0.10, 0.28, density) * (1.0 - smoothstep(0.24, 0.46, density))
                   * horiz * rise * 0.44;

  float heat   = clamp(density * 2.0 - h * 0.35, 0.0, 1.0);
  vec3  hdrCol = fireRamp(0.38 + 0.62 * heat);
  float a      = max(smoothstep(0.01, 0.44, heat) * fire, voidFill) * uBright;

  // THREE-ZONE sunset gradient — eliminates the orange→violet brown transition
  // Zone 1 (tips, high ridgeD): violet / blue-magenta
  // Zone 2 (mid, partial ridgeD): hot-pink / coral — bridges the gap, no brown
  // Zone 3 (body, broad): rose / warm-red fills the body glow
  float specT = fract(length(r) * 2.2 + fbm(ps * 1.1) * 0.80 + t * 0.11);
  vec3  iridV = sunsetPal(specT);                       // violet-magenta at tips
  vec3  iridM = sunsetPal(fract(specT + 0.22));         // hot-pink/coral at mid (phase offset)
  vec3  iridW = sunsetPal(fract(specT + 0.44));         // rose/warm-red for body glow

  // Tip zone — crisp ridges at height; violet dominates
  float peakTip = pow(smoothstep(0.44, 0.76, ridgeD), 1.0) * smoothstep(0.15, 0.62, h);
  // Mid zone — partial ridges across full height; hot-pink bridges orange↔violet
  float peakMid = smoothstep(0.18, 0.54, ridgeD) * smoothstep(0.05, 0.55, h)
                  * (1.0 - peakTip * 0.65);
  // Body zone — very broad; warm rose fills shadow valleys
  float peakBody = smoothstep(0.05, 0.40, ridgeD) * smoothstep(0.03, 0.45, h)
                   * (1.0 - peakTip * 0.8) * (1.0 - peakMid * 0.6);

  hdrCol = mix(hdrCol, iridW * 7.0,  peakBody * 0.55);
  hdrCol = mix(hdrCol, iridM * 9.0,  peakMid  * 0.80);
  hdrCol = mix(hdrCol, iridV * 10.5, peakTip  * 0.90);

  // Body magenta emission — fills shadow valleys independent of ridgeD
  // Adds vivid pink/rose to mid-height zones that fall between crisp ridges
  float bodyGlow = smoothstep(0.10, 0.42, h) * (1.0 - smoothstep(0.42, 0.72, h)) * fire * 0.22;
  hdrCol += vec3(8.5, 0.06, 6.5) * bodyGlow;  // extra magenta boost on shadow valleys

  // FIX 3 — tonemap warm body HDR first, then composite iridescent accent after
  vec3 col = tonemapLuma(hdrCol * (1.0 + 0.35 * uLevel));


  // Post-tonemap: all three zones accent after compression
  col += iridV * peakTip  * 0.45;
  col += iridM * peakMid  * 0.28;
  col += iridW * peakBody * 0.15;

  // analytic halo — crimson-rose glow
  float dist = length(vec2(uv.x * 0.85, (uv.y - base) * 0.60));
  float halo = exp(-dist * dist * 16.0) * smoothstep(0.0, 0.30, heat) * (1.6 + 0.8 * uLevel);
  col += vec3(0.92, 0.12, 0.32) * halo * 0.26;
  col += iridV * exp(-dist * dist * 22.0) * peakTip  * 0.28;
  col += iridM * exp(-dist * dist * 18.0) * peakMid  * 0.20;
  a = max(a, halo * 0.30);

  // hot base glow — deep crimson/rose, no G push
  float bg = exp(-(uv.x * uv.x) * 16.0) * exp(-pow((uv.y - base) * 5.2, 2.0));
  col += vec3(0.88, 0.12, 0.22) * bg * (0.48 + 0.30 * uLevel);
  a = max(a, bg * (0.50 + 0.20 * uLevel));

  // rising embers — sunset coral
  float emb = 0.0;
  for (int k = 0; k < 3; k++) {
    float fk = float(k);
    vec2 g  = vec2(uv.x * 6.0 + fk * 3.0, uv.y * 4.0 - t * (1.2 + 0.3 * fk) - fk * 2.0);
    vec2 id = floor(g), f2 = fract(g);
    float ex = step(0.91, hash21(id + fk * 7.0));
    float dd = length(f2 - vec2(hash21(id + 1.0), hash21(id + 2.0)));
    emb += ex * (1.0 - smoothstep(0.0, 0.11, dd))
             * smoothstep(0.0, 0.25, h)
             * (1.0 - smoothstep(0.70, 1.05, h));
  }
  col += vec3(1.0, 0.28, 0.10) * emb * 0.85;
  a = max(a, emb * 0.70);

  // borderless dissolve: canvas goes to uv.y=0.50 top / uv.x=±0.50 sides
  // vTop reaches 0.0 at y=0.47 (just inside canvas top) — no hard clip
  float vTop  = 1.0 - smoothstep(0.08, 0.47, uv.y);
  // gaussian sides: at canvas edge (x=0.50) → exp(-0.5^2*14)=3% — invisible
  float vSide = exp(-uv.x * uv.x * 14.0);
  float vBase = smoothstep(-0.62, -0.22, uv.y);
  a *= vTop * vSide * vBase;

  a = clamp(a, 0.0, 1.0);
  col = clamp(col, 0.0, 1.0);
  col += (hash21(gl_FragCoord.xy + t) - 0.5) / 255.0;  // dither
  o = vec4(col * a, a);   // premultiplied alpha
}`;

const STATE: Record<string, { speed: number; bright: number }> = {
  idle: { speed: 0.85, bright: 0.95 },
  listening: { speed: 1.1, bright: 1.08 },
  thinking: { speed: 1.5, bright: 1.08 },
  speaking: { speed: 1.2, bright: 1.18 },
  reveal: { speed: 1.0, bright: 1.05 },
};

export default function FireSpirit({ state = 'idle', size = 'md', level = 0, reduced = false, className = '', 'aria-label': ariaLabel = 'Orbit' }: AvatarProps) {
  const px = AVATAR_SIZE_PX[size];
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state); stateRef.current = state;
  const levelRef = useRef(level); levelRef.current = level;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const fail = () => { if (wrapRef.current) wrapRef.current.dataset.fallback = 'true'; };
    const gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) { fail(); return; }

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const vs = sh(gl.VERTEX_SHADER, VERT), frag = sh(gl.FRAGMENT_SHADER, FRAG);
    const compiled = gl.getShaderParameter(vs, gl.COMPILE_STATUS) && gl.getShaderParameter(frag, gl.COMPILE_STATUS);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, frag); gl.linkProgram(prog);
    if (!compiled || !gl.getProgramParameter(prog, gl.LINK_STATUS)) { fail(); return; }
    gl.useProgram(prog);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uSpeed = gl.getUniformLocation(prog, 'uSpeed');
    const uBright = gl.getUniformLocation(prog, 'uBright');
    const uLevel = gl.getUniformLocation(prog, 'uLevel');

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => { cv.width = Math.max(1, (cv.clientWidth * dpr) | 0); cv.height = Math.max(1, (cv.clientHeight * dpr) | 0); gl.viewport(0, 0, cv.width, cv.height); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cv);

    let speed = 0.85, bright = 0.95, raf = 0, clock = reduced ? 4 : 0, last = performance.now();
    const draw = () => {
      const tgt = STATE[stateRef.current] ?? STATE.idle;
      speed += (tgt.speed - speed) * 0.05; bright += (tgt.bright - bright) * 0.05;
      gl.uniform1f(uTime, clock); gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uSpeed, speed); gl.uniform1f(uBright, bright); gl.uniform1f(uLevel, levelRef.current || 0);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const frame = (now: number) => { const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt; draw(); raf = requestAnimationFrame(frame); };
    if (reduced) draw(); else raf = requestAnimationFrame(frame);

    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else if (!reduced && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    document.addEventListener('visibilitychange', onVis);
    // NB: do NOT call loseContext() here — under React StrictMode the effect
    // re-runs on the same canvas, and a lost context makes every GL call fail
    // (which forced the fallback). Just stop the loop + observers.
    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); ro.disconnect(); };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className}`} style={{ width: px, height: px }} role="img" aria-label={ariaLabel}>
      <div className={styles.fallback} aria-hidden="true" />
      <canvas ref={ref} className={styles.canvas} />
    </div>
  );
}
