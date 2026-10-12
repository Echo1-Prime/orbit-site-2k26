import React from 'react';
import { OrbitMark } from '../core/OrbitMark';

/* The floating Agent Orbit launcher: the animated mark inside a circling mono ring.
   Mobile first: one finger drags it anywhere on screen, a tap opens Agent Orbit.
   Position is kept as a fraction of the viewport so it survives rotation and resize. */

const TAP_SLOP = { touch: 8, pen: 6, mouse: 4 };

let probe = null;
function safeArea() {
  if (typeof document === 'undefined') return { t: 0, r: 0, b: 0, l: 0 };
  if (!probe) {
    probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:fixed;inset:0;visibility:hidden;pointer-events:none;' +
      'padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
    document.body.appendChild(probe);
  }
  const cs = getComputedStyle(probe);
  return { t: parseFloat(cs.paddingTop) || 0, r: parseFloat(cs.paddingRight) || 0,
           b: parseFloat(cs.paddingBottom) || 0, l: parseFloat(cs.paddingLeft) || 0 };
}

function viewport() {
  const vv = window.visualViewport;
  return { w: vv ? vv.width : window.innerWidth, h: vv ? vv.height : window.innerHeight };
}

/* the box the launcher's top-left corner may occupy */
function bounds(size, margin) {
  const { w, h } = viewport(), s = safeArea();
  return { x0: s.l + margin, y0: s.t + margin, x1: Math.max(s.l + margin, w - s.r - margin - size), y1: Math.max(s.t + margin, h - s.b - margin - size) };
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const fit = (p, b) => ({ x: clamp(p.x, b.x0, b.x1), y: clamp(p.y, b.y0, b.y1) });

function start(initial, b) {
  if (initial && typeof initial === 'object') return fit({ x: b.x0 + (b.x1 - b.x0) * initial.x, y: b.y0 + (b.y1 - b.y0) * initial.y }, b);
  const cx = (b.x0 + b.x1) / 2;
  if (initial === 'bottom-right') return { x: b.x1, y: b.y1 };
  if (initial === 'bottom-left') return { x: b.x0, y: b.y1 };
  return { x: cx, y: b.y1 }; /* bottom-center */
}

/* nearest of the four edges; the other axis stays where the user left it */
function toEdge(p, b) {
  const d = [p.x - b.x0, b.x1 - p.x, p.y - b.y0, b.y1 - p.y], i = d.indexOf(Math.min(...d));
  return i === 0 ? { x: b.x0, y: p.y } : i === 1 ? { x: b.x1, y: p.y } : i === 2 ? { x: p.x, y: b.y0 } : { x: p.x, y: b.y1 };
}

const toFrac = (p, b) => ({ x: b.x1 > b.x0 ? (p.x - b.x0) / (b.x1 - b.x0) : 0.5, y: b.y1 > b.y0 ? (p.y - b.y0) / (b.y1 - b.y0) : 1 });
const fromFrac = (f, b) => fit({ x: b.x0 + (b.x1 - b.x0) * f.x, y: b.y0 + (b.y1 - b.y0) * f.y }, b);

function readStore(key) {
  if (!key) return null;
  try {
    const v = JSON.parse(window.localStorage.getItem(key) || 'null');
    return v && Number.isFinite(v.x) && Number.isFinite(v.y) ? { x: clamp(v.x, 0, 1), y: clamp(v.y, 0, 1) } : null;
  } catch { return null; }
}
function writeStore(key, f) {
  if (!key) return;
  try { window.localStorage.setItem(key, JSON.stringify({ x: +f.x.toFixed(4), y: +f.y.toFixed(4) })); } catch { /* storage blocked: position resets next load */ }
}

/**
 * Floating Agent Orbit launcher. Drag to place it anywhere, tap or click to open.
 * Arrow keys move it (Shift for larger steps), Home returns it to its starting spot.
 */
export function OrbitLauncher({
  onActivate,
  open = false,
  controls,
  label = 'Ask Agent Orbit',
  ringText = 'AGENT ORBIT · TAP TO ASK · AGENT ORBIT · TAP TO ASK · ',
  size = 92,
  draggable = true,
  snap = 'edge',
  initial = 'bottom-center',
  margin = 14,
  storageKey = 'ao-orbit-launcher',
  onMove,
  className = '',
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const pos = React.useRef(null);
  const frac = React.useRef(null);
  const drag = React.useRef(null);
  const suppress = React.useRef(false);
  const raf = React.useRef(0);
  const ringId = React.useId().replace(/:/g, '');
  const hintId = ringId + '-hint';
  const [placed, setPlaced] = React.useState(false);

  const paint = React.useCallback((animate) => {
    const el = ref.current, p = pos.current;
    if (!el || !p) return;
    el.toggleAttribute('data-settling', !!animate);
    el.style.transform = `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0)`;
  }, []);

  const commit = React.useCallback((p, animate) => {
    const b = bounds(size, margin);
    pos.current = fit(p, b);
    paint(animate);
    const f = toFrac(pos.current, b);
    frac.current = f;
    writeStore(storageKey, f);
    if (onMove) onMove(f);
  }, [size, margin, storageKey, onMove, paint]);

  /* place on mount, keep in view on resize, rotation and mobile toolbar changes */
  React.useLayoutEffect(() => {
    if (draggable && !frac.current) frac.current = readStore(storageKey);
    const place = () => {
      const b = bounds(size, margin);
      pos.current = draggable && frac.current ? fromFrac(frac.current, b) : start(initial, b);
      paint(false);
    };
    place();
    setPlaced(true);
    const relayout = place;
    window.addEventListener('resize', relayout);
    window.addEventListener('orientationchange', relayout);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', relayout);
    return () => {
      window.removeEventListener('resize', relayout);
      window.removeEventListener('orientationchange', relayout);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', relayout);
      cancelAnimationFrame(raf.current);
    };
  }, [size, margin, storageKey, initial, draggable, paint]);

  const onPointerDown = (e) => {
    if (!draggable || open || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, px: pos.current.x, py: pos.current.y,
      slop: TAP_SLOP[e.pointerType] || 6, moving: false };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* synthetic or released pointer */ }
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.moving) {
      if (Math.hypot(dx, dy) < d.slop) return;
      d.moving = true;
      ref.current.setAttribute('data-dragging', '');
    }
    e.preventDefault();
    pos.current = fit({ x: d.px + dx, y: d.py + dy }, bounds(size, margin));
    if (!raf.current) raf.current = requestAnimationFrame(() => { raf.current = 0; paint(false); });
  };

  const end = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* already released */ }
    if (!d.moving) return; /* a tap: the click handler opens it */
    ref.current.removeAttribute('data-dragging');
    suppress.current = true; /* the click that follows a drag must not open the panel */
    setTimeout(() => { suppress.current = false; }, 0);
    commit(snap === 'edge' ? toEdge(pos.current, bounds(size, margin)) : pos.current, snap === 'edge');
  };

  const onClick = (e) => {
    if (suppress.current) { e.preventDefault(); suppress.current = false; return; }
    if (onActivate) onActivate(e);
  };

  const onKeyDown = (e) => {
    if (!draggable) return;
    const step = e.shiftKey ? 64 : 16, p = pos.current;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) { e.preventDefault(); commit({ x: p.x + moves[e.key][0], y: p.y + moves[e.key][1] }, false); }
    else if (e.key === 'Home') { e.preventDefault(); commit(start(initial, bounds(size, margin)), true); }
  };

  const r = 49, c = 2 * Math.PI * r;
  return (
    <button
      ref={ref}
      type="button"
      className={`ao-launcher${open ? ' is-open' : ''}${draggable ? ' is-draggable' : ''}${className ? ' ' + className : ''}`}
      style={{ '--ao-launcher-size': size + 'px', visibility: placed ? undefined : 'hidden', ...style }}
      aria-label={label}
      aria-expanded={open}
      aria-controls={controls}
      aria-describedby={draggable ? hintId : undefined}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onContextMenu={draggable ? (e) => e.preventDefault() : undefined}
      {...rest}
    >
      <svg className="ao-launcher__ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id={ringId} d={`M60,60 m-${r},0 a${r},${r} 0 1,1 ${2 * r},0 a${r},${r} 0 1,1 -${2 * r},0`} /></defs>
        <text><textPath href={`#${ringId}`} textLength={Math.round(c * 0.987)} lengthAdjust="spacing">{ringText}</textPath></text>
      </svg>
      <span className="ao-launcher__mark"><OrbitMark size={Math.round(size * 0.63)} hoverBoost /></span>
      {draggable && <span id={hintId} className="ao-launcher__hint">Drag to move. Arrow keys move it, Home resets it.</span>}
    </button>
  );
}
