'use client';

// LivingFlame — Orbit as a real-time, borderless, procedural flame. One WebGL2
// fullscreen-triangle fragment shader: domain-warped fbm plasma rising from a
// hot core, iridescent copper/teal/blue/lavender ribbons, warm base glow,
// embers. No outline, no video. State drives flow/brightness/face; --flame-level
// (0..1 TTS amplitude) pumps the core. Movable/resizable via the wrapper.
// Adapted from echo_orbit/public/_flamelab/galaxy-nebula.html (WebGL2 fbm).

import { useEffect, useRef } from 'react';
import { AVATAR_SIZE_PX, type AvatarProps } from './types';

const VERT = `#version 300 es
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p*2.0-1.0,0.0,1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime, uSpeed, uBright, uFace, uLevel;
uniform vec2 uRes;
out vec4 o;

const vec3 CREAM  = vec3(1.000,0.970,0.900);
const vec3 YELLOW = vec3(1.000,0.860,0.420);
const vec3 SOLAR  = vec3(1.000,0.460,0.080);
const vec3 COPPER = vec3(0.960,0.620,0.400);
const vec3 TEAL   = vec3(0.360,0.820,0.740);
const vec3 BLUE   = vec3(0.400,0.620,0.980);
const vec3 LILAC  = vec3(0.720,0.580,0.980);

float hash21(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  float a=hash21(i),b=hash21(i+vec2(1,0)),c=hash21(i+vec2(0,1)),d=hash21(i+vec2(1,1));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v+=a*noise(p); p=m*p+11.3; a*=0.5; } return v; }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;   // centered, y up
  float t = uTime;
  float base = -0.44, tip = 0.64;
  float yn = clamp((uv.y - base) / (tip - base), 0.0, 1.3);

  // rising, domain-warped plasma (scroll noise down => flows up)
  float flow = t * (0.45 * uSpeed);
  vec2 sp = vec2(uv.x*2.6, uv.y*1.9 - flow);
  vec2 w  = vec2(fbm(sp + vec2(0.0, t*0.15)), fbm(sp + vec2(3.7,1.2) - t*0.11));
  float dens = fbm(sp + 2.6*w);
  float fine = fbm(sp*2.3 + 4.0*w - vec2(0.0, flow*0.6));   // finer strands
  float hue  = clamp(length(w)*1.15, 0.0, 1.0);

  // borderless flame mask: soft gaussian, width tapers with height, swayed
  float sway  = (fbm(vec2(uv.y*2.4, t*0.4)) - 0.5) * 0.18 * smoothstep(0.0,1.0,yn);
  float width = mix(0.32, 0.015, pow(clamp(yn,0.0,1.0), 0.8));
  float xr    = (uv.x - sway) / max(width, 0.001);
  float horiz = exp(-xr*xr*1.5);
  float vwin  = smoothstep(0.0, 0.08, yn) * (1.0 - smoothstep(0.78, 1.12, yn));
  float ribbons = smoothstep(0.34, 0.72, dens) * mix(0.55, 1.0, smoothstep(0.30, 0.72, fine));
  float flame = horiz * vwin * ribbons;

  // iridescent color: hot core -> yellow -> solar, cool copper/teal/blue/lilac up top
  vec3 irid = mix(COPPER, TEAL, smoothstep(0.0,0.45,hue));
  irid = mix(irid, BLUE,  smoothstep(0.40,0.72,hue));
  irid = mix(irid, LILAC, smoothstep(0.68,1.0,hue));
  vec3 col = CREAM;
  col = mix(col, YELLOW, smoothstep(0.0,0.13,yn));
  col = mix(col, SOLAR,  smoothstep(0.08,0.24,yn));
  col = mix(col, irid,   smoothstep(0.20,0.50,yn));
  col *= 1.55;                                   // gain before tonemap

  float a = flame * uBright;

  // narrow hot base glow
  float bg = exp(-pow((uv.y-base)*13.0, 2.0)) * exp(-uv.x*uv.x*20.0);
  col += mix(YELLOW, SOLAR, 0.4) * bg * (1.6 + 0.8*uLevel);
  a = max(a, bg * (1.0 + 0.5*uLevel));

  // bright hot core near the base
  float core = exp(-((uv.x*uv.x)*16.0 + pow((uv.y-(base+0.12))*8.0, 2.0)));
  col += mix(CREAM, YELLOW, 0.4) * core * (0.6 + uLevel);
  a = max(a, core * (0.5 + 0.6*uLevel));

  // sparse rising embers
  float ember = 0.0;
  for(int k=0;k<3;k++){
    float fk = float(k);
    vec2 g = vec2(uv.x*7.0 + fk*4.0, uv.y*4.5 - t*(0.7+0.25*fk) - fk*2.3);
    vec2 id = floor(g); vec2 f = fract(g);
    float ex = step(0.90, hash21(id+fk*13.0));
    float d = length(f - vec2(hash21(id+1.1), hash21(id+3.3)));
    ember += ex * (1.0 - smoothstep(0.0, 0.10, d)) * smoothstep(0.0,0.35,yn) * (1.0-smoothstep(0.55,1.05,yn));
  }
  col += mix(SOLAR, YELLOW, 0.3) * ember * 1.2;
  a = max(a, ember);

  // face voids emerge when speaking (subtle)
  if(uFace > 0.001){
    float eL = 1.0 - smoothstep(0.0, 0.05, length((uv-vec2(-0.065,0.18))*vec2(1.0,1.5)));
    float eR = 1.0 - smoothstep(0.0, 0.05, length((uv-vec2( 0.065,0.18))*vec2(1.0,1.5)));
    float mo = (1.0 - smoothstep(0.02,0.05, abs(length((uv-vec2(0.0,0.075))*vec2(0.75,1.0)) - 0.085)));
    mo *= step(uv.y, 0.09);
    float face = clamp(eL+eR+mo, 0.0, 1.0) * uFace;
    col *= (1.0 - 0.8*face);
    a   *= (1.0 - 0.55*face);
  }

  a = clamp(a, 0.0, 1.0);
  col = vec3(1.0) - exp(-col*2.2);          // filmic, brighter
  col = pow(col, vec3(0.9));
  o = vec4(col*a, a);                         // premultiplied
}`;

const STATE_TARGET: Record<string, { speed: number; bright: number; face: number }> = {
  idle:      { speed: 0.55, bright: 0.92, face: 0 },
  listening: { speed: 0.85, bright: 1.05, face: 0 },
  thinking:  { speed: 1.35, bright: 1.05, face: 0 },
  speaking:  { speed: 1.05, bright: 1.15, face: 0.6 },
  reveal:    { speed: 0.9,  bright: 1.1,  face: 0 },
};

export default function LivingFlame({ state = 'idle', size = 'md', level = 0, reduced = false, className = '', 'aria-label': ariaLabel = 'Orbit' }: AvatarProps) {
  const px = AVATAR_SIZE_PX[size];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const levelRef = useRef(level);
  stateRef.current = state;
  levelRef.current = level;

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uSpeed = gl.getUniformLocation(prog, 'uSpeed');
    const uBright = gl.getUniformLocation(prog, 'uBright');
    const uFace = gl.getUniformLocation(prog, 'uFace');
    const uLevel = gl.getUniformLocation(prog, 'uLevel');

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      cv.width = Math.max(1, (cv.clientWidth * dpr) | 0);
      cv.height = Math.max(1, (cv.clientHeight * dpr) | 0);
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    // smoothed uniforms
    let speed = 0.55, bright = 0.92, face = 0;
    let raf = 0, clock = reduced ? 3 : 0, last = performance.now();

    const render = () => {
      const target = STATE_TARGET[stateRef.current] ?? STATE_TARGET.idle;
      speed += (target.speed - speed) * 0.05;
      bright += (target.bright - bright) * 0.05;
      face += (target.face - face) * 0.06;
      gl.uniform1f(uTime, clock);
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uSpeed, speed);
      gl.uniform1f(uBright, bright);
      gl.uniform1f(uFace, face);
      gl.uniform1f(uLevel, levelRef.current || 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;
      render();
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      render(); // one static frame, no loop
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!reduced && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      const lose = gl.getExtension('WEBGL_lose_context');
      lose?.loseContext();
    };
  }, [reduced]);

  return (
    <div className={className} style={{ width: px, height: px, display: 'inline-block', transition: 'width 0.4s ease, height 0.4s ease' }} role="img" aria-label={ariaLabel}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
