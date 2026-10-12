import React from 'react';

/**
 * Ambient star field. Canvas 2D, RAF loop, cleanup on unmount (StrictMode-safe).
 * Density and twinkle constants are verbatim from the approved reference.
 */
export function StarField({ density = 5800, fixed = true, className = '', style }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars = [];
    let raf = 0;
    let frame = 0;

    const build = () => {
      const n = Math.floor((cvs.width * cvs.height) / density);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        r: Math.random() * 1.1 + 0.2,
        base: Math.random() * 0.55 + 0.08,
        phase: Math.random() * Math.PI * 2,
        freq: Math.random() * 0.004 + 0.001,
      }));
    };

    const resize = () => {
      const host = cvs.parentElement;
      cvs.width = fixed ? window.innerWidth : (host ? host.clientWidth : window.innerWidth);
      cvs.height = fixed ? window.innerHeight : (host ? host.clientHeight : window.innerHeight);
      build();
    };

    const paint = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      frame++;
      for (const s of stars) {
        const o = reduced ? s.base : s.base + Math.sin(frame * s.freq + s.phase) * 0.07;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, o))})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(paint);
    };

    resize();
    paint();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [density, fixed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`ao-starfield${fixed ? ' ao-starfield--fixed' : ''}${className ? ' ' + className : ''}`}
      style={style}
    />
  );
}
