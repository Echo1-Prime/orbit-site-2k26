'use client';

// FlyingOrbit — makes the flame a lifelike, Tinkerbell-style presence: it floats
// and gently flits around its stage, trails glowing fairy dust (patronus-trail),
// and periodically dematerializes into sparks and reappears elsewhere. Reduced
// motion => a still, centered flame.

import { useEffect, useRef } from 'react';
import OrbitAvatar from './OrbitAvatar';
import { AVATAR_SIZE_PX, type AvatarSize } from './types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './FlyingOrbit.module.css';

const DUST = ['#FFFAA0', '#FF7515', '#FFD9A0', '#FFFFFF', '#8FB6E0'];

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; c: string; }

export default function FlyingOrbit({ size = 'hero', stageHeight = 320 }: { size?: AvatarSize; stageHeight?: number }) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current, flame = flameRef.current, canvas = canvasRef.current;
    if (!stage || !flame || !canvas) return;
    const fs = AVATAR_SIZE_PX[size];

    let W = stage.clientWidth, H = stage.clientHeight;
    const centerX = () => W / 2;
    const centerY = () => H * 0.46;

    // Static (reduced motion): center it, no loop.
    if (reduced) {
      flame.style.transform = `translate3d(${centerX() - fs / 2}px, ${centerY() - fs / 2}px, 0)`;
      return;
    }

    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      W = stage.clientWidth; H = stage.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const bounds = () => ({ x0: W * 0.34, x1: W * 0.66, y0: H * 0.28, y1: H * 0.62 });
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const pos = { x: centerX(), y: centerY() };
    const vel = { x: 0, y: 0 };
    let target = { x: pos.x, y: pos.y };
    let opacity = 0;             // materialize in
    let opTarget = 1;
    const particles: Particle[] = [];
    let raf = 0, t0 = performance.now(), last = t0;
    let nextFlit = 1600, nextPhase = 6000;

    const burst = (n: number, x: number, y: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = rand(0.6, 2.6);
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.3, life: 0, max: rand(30, 60), size: rand(1.4, 3.2), c: DUST[(Math.random() * DUST.length) | 0] });
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(50, now - last); last = now;
      const t = (now - t0) / 1000;
      const b = bounds();

      // periodic gentle flit to a new target
      if (now - t0 > nextFlit) {
        target = { x: rand(b.x0, b.x1), y: rand(b.y0, b.y1) };
        nextFlit = now - t0 + rand(2600, 4200);
      }
      // periodic dematerialize -> relocate -> rematerialize
      if (now - t0 > nextPhase) {
        opTarget = 0;
        burst(26, pos.x, pos.y + fs * 0.1);
        setTimeout(() => {
          pos.x = rand(b.x0, b.x1); pos.y = rand(b.y0, b.y1);
          target = { x: pos.x, y: pos.y }; vel.x = vel.y = 0;
          opTarget = 1; burst(30, pos.x, pos.y + fs * 0.1);
        }, 520);
        nextPhase = now - t0 + rand(9000, 14000);
      }

      // organic drift on top of the target (enchanted float)
      const driftX = Math.sin(t * 0.7) * 16 + Math.sin(t * 1.9) * 5;
      const driftY = Math.cos(t * 0.9) * 11 + Math.cos(t * 2.3) * 4;
      const tx = target.x + driftX, ty = target.y + driftY;

      // spring toward target (floaty)
      vel.x += (tx - pos.x) * 0.012; vel.y += (ty - pos.y) * 0.012;
      vel.x *= 0.90; vel.y *= 0.90;
      const speed = Math.hypot(vel.x, vel.y);
      pos.x += vel.x; pos.y += vel.y;

      opacity += (opTarget - opacity) * 0.08;
      flame.style.opacity = String(opacity);
      flame.style.transform = `translate3d(${pos.x - fs / 2}px, ${pos.y - fs / 2}px, 0)`;

      // emit fairy dust from just below the flame center, more when moving
      if (opacity > 0.4) {
        const n = 1 + Math.min(3, (speed * 1.4) | 0);
        for (let i = 0; i < n; i++) {
          particles.push({ x: pos.x + rand(-10, 10), y: pos.y + fs * 0.12 + rand(-6, 10), vx: rand(-0.4, 0.4) - vel.x * 0.15, vy: rand(-0.1, 0.7) - vel.y * 0.1, life: 0, max: rand(34, 64), size: rand(1.1, 2.6), c: DUST[(Math.random() * DUST.length) | 0] });
        }
      }

      // draw dust over transparent stage (additive glow, per-particle fade)
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++; p.x += p.vx; p.y += p.vy; p.vy += 0.008; p.vx *= 0.99;
        if (p.life >= p.max) { particles.splice(i, 1); continue; }
        const tt = p.life / p.max, alpha = (1 - tt * tt) * 0.85;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.c; ctx.shadowBlur = 8; ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      if (particles.length > 260) particles.splice(0, particles.length - 260);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => { cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', onVis); ro.disconnect(); };
  }, [reduced, size]);

  return (
    <div ref={stageRef} className={styles.stage} style={{ height: stageHeight }} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.trail} />
      <div ref={flameRef} className={styles.flame}>
        <OrbitAvatar size={size} state="idle" reduced={reduced} aria-label="Orbit" />
      </div>
    </div>
  );
}
