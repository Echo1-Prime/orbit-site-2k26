'use client';

import { useEffect } from 'react';

/* Accent lines run behind the page, never through it (Josh, 2026-10-12: "have them cut off on the border
   rather than crossing over the copy/section"). Each band's AccentLines layer gets a CSS mask with a hole for
   every piece of copy, every card or panel, every media element and the lifecycle diagram, so a line stops at
   the edge of the content instead of showing through it. Recomputed when a band resizes or its content changes. */

const TEXT_PAD = 12; // px of clear space around a block of copy
const RING_R = 236 / 600; // outer dotted ring of the lifecycle diagram, as a share of its 600 viewBox

type Hole = { x: number; y: number; w: number; h: number } | { cx: number; cy: number; r: number };

function alpha(color: string): number {
  if (!color || color === 'transparent') return 0;
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return 1;
  const parts = m[1].split(/[\s,/]+/).filter(Boolean);
  return parts.length > 3 ? parseFloat(parts[3]) : 1;
}

function ownText(el: Element): boolean {
  for (const n of Array.from(el.childNodes)) if (n.nodeType === 3 && n.textContent && n.textContent.trim()) return true;
  return false;
}

function holesFor(layer: HTMLElement, content: HTMLElement): Hole[] {
  const base = layer.getBoundingClientRect();
  const area = base.width * base.height;
  const holes: Hole[] = [];
  const rect = (r: DOMRect, pad: number) => {
    const x = Math.max(0, r.left - base.left - pad);
    const y = Math.max(0, r.top - base.top - pad);
    const w = Math.min(base.width, r.right - base.left + pad) - x;
    const h = Math.min(base.height, r.bottom - base.top + pad) - y;
    if (w > 0 && h > 0) holes.push({ x, y, w, h });
  };

  content.querySelectorAll('svg[viewBox="0 0 600 600"]').forEach((svg) => {
    const r = svg.getBoundingClientRect();
    if (r.width) holes.push({ cx: r.left - base.left + r.width / 2, cy: r.top - base.top + r.height / 2, r: r.width * RING_R + TEXT_PAD });
  });

  content.querySelectorAll('*').forEach((el) => {
    if (el instanceof SVGElement && el.tagName.toLowerCase() !== 'svg') return;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'contents' || parseFloat(cs.opacity) === 0) return;
    const tag = el.tagName.toLowerCase();
    if (tag === 'video' || tag === 'img' || tag === 'canvas' || tag === 'picture') return rect(r, 0);
    if (ownText(el) && cs.display !== 'inline') return rect(r, TEXT_PAD);
    if (tag === 'a' || tag === 'button') return rect(r, 4);
    const boxed =
      alpha(cs.backgroundColor) > 0.02 ||
      (cs.backgroundImage && cs.backgroundImage !== 'none') ||
      (parseFloat(cs.borderTopWidth) > 0 && alpha(cs.borderTopColor) > 0.02);
    if (boxed && r.width >= 40 && r.height >= 24 && r.width * r.height < area * 0.7) rect(r, 0);
  });
  return holes;
}

function applyMask(layer: HTMLElement, holes: Hole[]) {
  const s = layer.style as CSSStyleDeclaration & Record<string, string>;
  if (!holes.length) {
    s.maskImage = s.webkitMaskImage = '';
    return;
  }
  const solid = 'linear-gradient(#000,#000)';
  const img = [solid];
  const pos = ['0 0'];
  const size = ['100% 100%'];
  for (const h of holes) {
    if ('r' in h) {
      img.push(`radial-gradient(circle at ${h.cx}px ${h.cy}px, #000 ${h.r}px, transparent ${h.r + 1}px)`);
      pos.push('0 0');
      size.push('100% 100%');
    } else {
      img.push(solid);
      pos.push(`${h.x}px ${h.y}px`);
      size.push(`${h.w}px ${h.h}px`);
    }
  }
  // Top layer is the full layer; every hole below it is added together, then the top layer keeps only what
  // lies outside them (subtract / source-out).
  s.maskImage = s.webkitMaskImage = img.join(',');
  s.maskPosition = s.webkitMaskPosition = pos.join(',');
  s.maskSize = s.webkitMaskSize = size.join(',');
  s.maskRepeat = s.webkitMaskRepeat = 'no-repeat';
  s.maskComposite = ['subtract', ...holes.map(() => 'add')].join(',');
  s.webkitMaskComposite = ['source-out', ...holes.map(() => 'source-over')].join(',');
}

export function useLineKnockout(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const pairs = Array.from(document.querySelectorAll<HTMLElement>('section[data-band] > div[aria-hidden="true"]'))
      .filter((layer) => layer.querySelector('canvas') && layer.nextElementSibling instanceof HTMLElement)
      .map((layer) => ({ layer, content: layer.nextElementSibling as HTMLElement }));
    if (!pairs.length) return;

    let raf = 0;
    const run = () => {
      raf = 0;
      for (const { layer, content } of pairs) applyMask(layer, holesFor(layer, content));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };

    run();
    const ro = new ResizeObserver(schedule);
    const mo = new MutationObserver(schedule);
    for (const { layer, content } of pairs) {
      ro.observe(layer);
      ro.observe(content);
      mo.observe(content, { childList: true, subtree: true, characterData: true });
    }
    const late = [window.setTimeout(schedule, 600), window.setTimeout(schedule, 2000)];
    document.fonts?.ready.then(schedule).catch(() => {});
    return () => {
      ro.disconnect();
      mo.disconnect();
      late.forEach((t) => window.clearTimeout(t));
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready]);
}
