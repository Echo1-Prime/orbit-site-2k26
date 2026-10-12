import React from 'react';

/* Resolve the design-system root from the loaded bundle's own <script src>, then fall back
   through relative depths, so the mark script is found from any card / kit / template. */
function markCandidates(explicit) {
  if (explicit) return [explicit];
  const tag = Array.from(document.querySelectorAll('script[src]'))
    .find((s) => /_ds_bundle\.js(\?|$)/.test(s.src));
  const list = [];
  if (tag) list.push(tag.src.replace(/_ds_bundle\.js.*$/, '') + 'assets/orbit-mark-canvas.js');
  for (const up of ['', '../', '../../', '../../../']) list.push(up + 'assets/orbit-mark-canvas.js');
  return list;
}

let markScript = null;
function loadMarkClass(explicit) {
  if (window.AgentOrbitMark) return Promise.resolve();
  if (!markScript) {
    const urls = markCandidates(explicit);
    markScript = new Promise((resolve, reject) => {
      const tryNext = (i) => {
        if (i >= urls.length) return reject(new Error('orbit-mark-canvas.js not found'));
        const el = document.createElement('script');
        el.src = urls[i];
        el.onload = () => (window.AgentOrbitMark ? resolve() : tryNext(i + 1));
        el.onerror = () => { el.remove(); tryNext(i + 1); };
        document.head.appendChild(el);
      };
      tryNext(0);
    });
  }
  return markScript;
}

/**
 * The Agent Orbit brand mark — the authoritative Canvas 2D mark from the approved
 * logo sheet. Three inclined orbital planes, energy nodes with trails, precision
 * hexagon core, 24-tick shell, scanline sweep, click-to-pulse.
 */
export function OrbitMark({
  size = 108,
  animate = true,
  pulseOnClick = true,
  hoverBoost = true,
  scriptSrc,
  className = '',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const markRef = React.useRef(null);

  React.useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const still = !animate || reduced;

    loadMarkClass(scriptSrc).then(() => {
      if (cancelled || !ref.current) return;
      const mark = new window.AgentOrbitMark(ref.current);
      markRef.current = mark;
      if (still) {
        mark.build = 1;
        mark.render();
        return;
      }
      const loop = () => {
        mark.render();
        raf = requestAnimationFrame(loop);
      };
      loop();
    }).catch(() => {});

    return () => { cancelled = true; cancelAnimationFrame(raf); markRef.current = null; };
  }, [size, animate, scriptSrc]);

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      role="img"
      aria-label="Agent Orbit"
      className={`ao-mark${className ? ' ' + className : ''}`}
      style={{ width: size, height: size, ...style }}
      onClick={pulseOnClick ? () => markRef.current && markRef.current.triggerPulse() : undefined}
      onMouseEnter={hoverBoost ? () => { if (markRef.current) markRef.current.hovered = true; } : undefined}
      onMouseLeave={hoverBoost ? () => { if (markRef.current) markRef.current.hovered = false; } : undefined}
      {...rest}
    />
  );
}
