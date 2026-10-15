'use client';

/* State and derived values for the home bands: a port of the handoff's Component logic
   ("Echo 1 Labs Home.dc.html": renderVals, artVals, blsVals and friends) to React hooks.
   The chrome (nav, menu, launcher, concierge, drawer) lives in components/Site/SiteChrome.
   Responsive layout values are CSS variables (styles/ao/home.css), not JS, so SSR is stable. */

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBadge } from '@/components/ao/data/StatusBadge';
import { ghostProps } from '@/components/Site/ghost';
import { PRODUCT_NAME_ROUTE } from '@/lib/subpage-routes';
import { useLineKnockout } from './useLineKnockout';
import { BLS, CMP, FEED, LOG, NODES, SYM, TRUST } from './home-data';

const HERO_CLIP = '/videos/home/hero-titan.mp4';
/* Signal and Agent Orbit clips from Josh's uploads (2026-10-15), cropped square on the subject, audio removed.
   A slide with a clip replaces its drawn fallback (hvPoster1, hvScene). */
const CLIPS = [HERO_CLIP, '/videos/home/hero-signal.mp4', '/videos/home/hero-agent-orbit.mp4'];
const SLIDE_MS = 5000;

/* The handoff's links are .dc.html files; each card goes to its keyword-named subpage (lib/subpages.ts).
   Front Office is the voice agents page (Josh, 2026-10-12). */
const BLS_ROUTE: Record<string, string> = {
  ...PRODUCT_NAME_ROUTE,
  'Front Office': PRODUCT_NAME_ROUTE['Voice Agents'],
};

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const on = () => setM(window.innerWidth < 760);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return m;
}

function useFlag(attr: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setOn(el.dataset[attr] === '1');
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ['data-' + attr.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())] });
    return () => mo.disconnect();
  }, [attr]);
  return on;
}

/** Opens the concierge (owned by SiteChrome), optionally pre-filled for the diagnosis band. */
function openConcierge(diag?: string) {
  window.dispatchEvent(new CustomEvent('e1:concierge', { detail: { diag } }));
}

export function useHomeVals() {
  const router = useRouter();
  const m = useIsMobile();
  const conc = useFlag('conciergeOpen');
  const [reduced, setReduced] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const [linesReady, setLinesReady] = useState(false);
  useLineKnockout(linesReady);
  const [hv, setHv] = useState(0);
  const [hvCycle, setHvCycle] = useState(0);
  const [hvPaused, setHvPaused] = useState(false);
  const [hvHover, setHvHover] = useState(false);
  const [sym, setSym] = useState<boolean[]>(SYM.map(() => false));
  const [cmp, setCmp] = useState<'personal' | 'institutional'>('personal');
  const [node, setNode] = useState(-1);
  const [trustIx, setTrustIx] = useState(0);
  const [feed, setFeed] = useState<any[]>([]);
  const [feedN, setFeedN] = useState(4);
  const [altLevel, setAltLevel] = useState('l5');
  const [esc, setEsc] = useState<Record<number, boolean>>({});
  const [blsPos, setBlsPos] = useState(0);
  const [blsHover, setBlsHover] = useState(false);
  const [blsFO, setBlsFO] = useState(false);
  const [blsUser, setBlsUser] = useState(false);
  const hvEls = useRef<(HTMLVideoElement | null)[]>([]);
  const state = useRef({ reduced, seen, blsUser, blsHover, blsFO, conc });
  state.current = { reduced, seen, blsUser, blsHover, blsFO, conc };
  /* No video request before hydration, and none on phones, Data Saver or reduced motion:
     those show the clip's still frame (#t=0.5) with metadata only. */
  const still = reduced || saveData || m;

  /* reduced motion, data saver */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setReduced(mq.matches);
    read();
    mq.addEventListener('change', read);
    const c = (navigator as any).connection;
    setSaveData(!!c?.saveData);
    setMounted(true);
    return () => mq.removeEventListener('change', read);
  }, []);

  /* draw-on-view: [data-seen] elements flip once at 20% in view */
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setSeen({ all: true });
      return;
    }
    const io = new IntersectionObserver(
      (ents) => {
        const add: Record<string, boolean> = {};
        ents.forEach((en) => {
          if (en.isIntersecting) {
            add[en.target.getAttribute('data-seen') || ''] = true;
            io.unobserve(en.target);
          }
        });
        if (Object.keys(add).length) setSeen((s) => ({ ...s, ...add }));
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    const obs = () => document.querySelectorAll('[data-seen]').forEach((n) => io.observe(n));
    obs();
    const t = setTimeout(obs, 700);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  /* accent lines engine: load the DS script, then mount the canvases */
  useEffect(() => {
    const ready = () => setLinesReady(true);
    if ((window as any).AOAccentLines) {
      ready();
      return;
    }
    const el = document.createElement('script');
    el.src = '/assets/accent-lines.js';
    el.async = true;
    el.onload = () => requestAnimationFrame(() => requestAnimationFrame(ready));
    document.head.appendChild(el);
  }, []);

  /* activity strip: one illustrative event every 3.4 s, only in view and while visible */
  useEffect(() => {
    setFeed(FEED.slice(0, 4).map((f, i) => ({ id: 'f' + i, ...f })));
    const t = setInterval(() => {
      const s = state.current;
      if (s.reduced || document.hidden || !(s.seen.orbit || s.seen.all)) return;
      setFeedN((n) => {
        setFeed((f) => [{ id: 'f' + n, ...FEED[n % FEED.length] }, ...f].slice(0, 4));
        return n + 1;
      });
    }, 3400);
    return () => clearInterval(t);
  }, []);

  /* lifecycle orbit: 3.6 s auto-rotate */
  useEffect(() => {
    const t = setInterval(() => {
      const s = state.current;
      if (s.reduced || s.blsUser || s.blsHover || s.blsFO || s.conc || document.hidden || !(s.seen.bls || s.seen.all)) return;
      setBlsPos((p) => p + 1);
    }, 3600);
    return () => clearInterval(t);
  }, []);

  const hvNext = useCallback(() => {
    setHv((h) => (h + 1) % 3);
    setHvCycle((c) => c + 1);
  }, []);

  /* only the active slide's clip plays */
  useEffect(() => {
    hvEls.current.forEach((el, i) => {
      if (!el) return;
      try {
        if (i === hv) {
          el.currentTime = 0;
          if (!still) el.play().catch(() => {});
        } else el.pause();
      } catch {}
    });
  }, [hv, hvCycle, still]);

  const hvAuto = !reduced;
  const hvStopped = hvPaused || hvHover || conc;
  const hvVid = (i: number) =>
    CLIPS[i] && mounted ? (
      <video
        key={'hv' + i}
        src={still ? CLIPS[i] + '#t=0.5' : CLIPS[i]}
        muted
        autoPlay={!still && i === 0}
        loop
        playsInline
        preload={still ? 'metadata' : 'auto'}
        aria-hidden="true"
        ref={(el) => {
          hvEls.current[i] = el;
          if (el) {
            el.muted = true;
            el.defaultMuted = true;
          }
        }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ) : null;

  const v: Record<string, any> = {};
  [0, 1, 2].forEach((i) => {
    const on = hv === i;
    v['hvOp' + i] = on ? 1 : 0;
    v['hvHid' + i] = !on;
    v['hvOn' + i] = on;
    v['hvSel' + i] = () => {
      if (hv !== i) {
        setHv(i);
        setHvCycle((c) => c + 1);
      }
    };
    v['hvVid' + i] = hvVid(i);
    const base = { position: 'absolute' as const, inset: 0, background: 'var(--ao-orbit)', transformOrigin: 'left center' };
    v['hvProg' + i] =
      on && hvAuto ? (
        <span
          key={'h' + i + '-' + hvCycle}
          onAnimationEnd={hvNext}
          style={{ ...base, animation: `e1-progress ${SLIDE_MS}ms linear forwards`, animationPlayState: hvStopped ? 'paused' : 'running' }}
        />
      ) : (
        <span key={'hs' + i} style={{ ...base, transform: on ? 'scaleX(1)' : 'scaleX(0)' }} />
      );
  });
  Object.assign(v, {
    hvPoster1: !CLIPS[1],
    hvScene: !CLIPS[2],
    hvEnter: () => setHvHover(true),
    hvLeave: () => setHvHover(false),
    hvToggle: () => setHvPaused((p) => !p),
    hvPaused,
    hvPauseLabel: hvPaused ? 'Play' : 'Pause',
    hvPauseAria: hvPaused ? 'Resume hero rotation' : 'Pause hero rotation',
    hvPauseDisp: hvAuto ? 'inline-flex' : 'none',
    aoPaint: hv === 2 || reduced ? 'inset(-150% -150% -150% -150%)' : 'inset(-150% 300% -150% -150%)',
    aoTr: hv === 2 && !reduced ? 'clip-path 2200ms var(--ao-ease-out)' : 'none',
    linesReady,
    heroStart: { ...ghostProps('primary', 'md', { flex: 1, width: '100%' }), onClick: () => router.push('/contact') },
    heroAsk: { ...ghostProps('secondary', 'md', { flex: 1, width: '100%' }), onClick: () => openConcierge() },
    finalStart: { ...ghostProps('primary', 'lg', { flex: 1, width: '100%' }), onClick: () => router.push('/contact') },
  });

  /* brush strokes: clip-path sweeps flip once per seen key */
  const on = (k: string) => !!(seen['sw-' + k] || seen.all) || reduced;
  const LR = (k: string) => (on(k) ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)');
  const RL = (k: string) => (on(k) ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)');
  const big = (k: string) => (on(k) ? 'inset(-150% -150% -150% -150%)' : 'inset(-150% 300% -150% -150%)');
  const ul = (k: string) => (on(k) ? 'inset(-80% -8% -80% -8%)' : 'inset(-80% 108% -80% -8%)');
  Object.assign(v, {
    swHero: big('hero'), swOrbit: big('orbit'), swUl: ul('hero'), swUl2: ul('end'),
    swDiag: LR('diag'), swAi: RL('ai'), swProc: LR('proc'), swLife: RL('life'), swOut: LR('out'), swGov: LR('gov'), swEnd: LR('end'),
    swSway: reduced ? 'none' : 'e1-float 24s ease-in-out infinite alternate',
    swSpin: reduced ? 'none' : 'e1-sway 30s ease-in-out infinite alternate',
  });

  /* ───────── lifecycle orbit (bls) ───────── */
  const cur = ((blsPos % 7) + 7) % 7;
  const a = blsFO ? 7 : cur;
  const A = BLS[a];
  const CIRC = 2 * Math.PI * 192;
  const pick = (i: number) => () => {
    if (i === 7) {
      setBlsFO(true);
      setBlsUser(true);
      return;
    }
    setBlsPos((p) => p + ((i - cur + 7) % 7));
    setBlsFO(false);
    setBlsUser(true);
  };
  const pct = (r: number, ang: number) => [(50 + r * Math.cos(ang)).toFixed(2) + '%', (50 + r * Math.sin(ang)).toFixed(2) + '%'];
  Object.assign(v, {
    blsDash: (blsFO ? CIRC : (CIRC * cur) / 7).toFixed(1) + ' ' + CIRC.toFixed(1),
    blsRotTf: 'rotate(' + ((blsPos * 360) / 7).toFixed(3) + 'deg)',
    blsRotTr: reduced ? 'none' : 'transform 900ms var(--ao-ease-out)',
    blsSat: reduced ? 'none' : 'ao-spin 60s linear infinite',
    blsMark: m ? 56 : 88, // the mark is the diagram's centre piece, alone inside the inner ring
    blsKick: blsFO ? 'Every stage · Front Office' : String(cur + 1).padStart(2, '0') + ' / 07 · ' + A.st,
    blsKc: A.c, blsName: A.n, blsCat: A.cat || '', blsHref: BLS_ROUTE[A.n] || '/products',
    blsFO, blsPickFO: pick(7),
    blsFOBd: blsFO ? 'var(--ao-stellar)' : 'var(--ao-bd-2)', blsFOC: blsFO ? 'var(--ao-t0)' : 'var(--ao-t1)',
    blsEnter: () => setBlsHover(true), blsLeave: () => setBlsHover(false),
    blsNodes: BLS.slice(0, 7).map((b, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
      const isOn = !blsFO && i === cur;
      const past = !blsFO && i < cur;
      const [x, y] = pct(32, ang);
      const [lx, ly] = pct(m ? 44.5 : 44, ang);
      return {
        x, y, lx, ly, stage: b.st, name: b.n, on: isOn, aria: b.st + ', ' + b.n, pick: pick(i),
        size: isOn ? '34px' : '26px', ring: isOn || past || blsFO ? 'var(--ao-orbit)' : 'var(--ao-orbit-30)', fill: isOn ? 'var(--ao-orbit)' : 'var(--ao-void)',
        dot: isOn ? 'var(--ao-void)' : past || blsFO ? 'var(--ao-orbit)' : 'var(--ao-orbit-30)', glow: isOn ? 'var(--ao-halo-orbit)' : 'none',
        kc: isOn ? 'var(--ao-orbit)' : 'var(--ao-t1)', nc: isOn ? 'var(--ao-t0)' : 'var(--ao-t1)',
      };
    }),
    blsCards: BLS.map((b, i) => {
      const isOn = i === a;
      return {
        on: isOn, pick: pick(i), c: b.c, ruleOp: isOn ? 1 : 0.45,
        kick: i === 7 ? 'Every stage' : String(i + 1).padStart(2, '0') + ' · ' + b.st, name: b.card || b.n, cat: b.cat || '', out: b.o,
        kc: isOn ? b.c : 'var(--ao-t1)', bg: isOn ? 'var(--ao-sf-1)' : 'var(--ao-sf-0)',
        bd: isOn ? 'color-mix(in srgb, ' + b.c + ' 45%, transparent)' : 'var(--ao-bd-0)',
      };
    }),
  });

  /* ───────── diagnosis ───────── */
  const nSel = sym.filter(Boolean).length;
  Object.assign(v, {
    symptoms: SYM.map((text, i) => {
      const isOn = sym[i];
      return {
        text, on: isOn,
        toggle: () => setSym((s) => s.map((x, k) => (k === i ? !x : x))),
        bg: isOn ? 'var(--ao-orbit-15)' : 'var(--ao-bg-page)', bd: isOn ? 'var(--ao-orbit-30)' : 'var(--ao-bd-1)',
        boxBg: isOn ? 'var(--ao-orbit)' : 'transparent', boxBd: isOn ? 'var(--ao-orbit)' : 'var(--ao-bd-2)', mark: isOn ? '✓' : '',
      };
    }),
    pips: [0, 1, 2].map((i) => ({ bg: i < nSel ? 'var(--ao-orbit)' : 'var(--ao-bd-1)' })),
    diagReady: nSel >= 3,
    diagStatus: nSel >= 3 ? 'Pattern found' : 'Select three · ' + nSel + ' of 3',
    askDiag: {
      ...ghostProps('primary-ink', 'md'),
      onClick: () => openConcierge('These sound familiar. ' + SYM.filter((_, i) => sym[i]).join(' ')),
    },
  });

  /* ───────── personal vs institutional AI ───────── */
  const inst = cmp === 'institutional';
  Object.assign(v, {
    cmpKnob: inst ? 'translateX(100%)' : 'translateX(0)',
    isPersonal: !inst, isInst: inst,
    setPersonal: () => setCmp('personal'), setInst: () => setCmp('institutional'),
    personalC: inst ? 'var(--ao-t1)' : 'var(--ao-t0)', instC: inst ? 'var(--ao-t0)' : 'var(--ao-t1)',
    cmpRows: CMP.map((r, i) => ({
      n: String(i + 1).padStart(2, '0'), dim: r.dim, p: r.p, i: r.i,
      /* on mobile only the active column shows; the media query lives in home.css */
      pDisp: `var(--cmp-p-${cmp})`, iDisp: `var(--cmp-i-${cmp})`,
      pColor: inst ? 'var(--ao-t1)' : 'var(--ao-t0)', iColor: inst ? 'var(--ao-t0)' : 'var(--ao-t1)',
      pDot: inst ? 'transparent' : 'var(--ao-orbit)', iDot: inst ? 'var(--ao-orbit)' : 'transparent',
      dText: inst ? r.d : 'One chat window', dColor: inst ? 'var(--ao-t0)' : 'var(--ao-t1)', dArrow: inst ? 1 : 0,
    })),
  });

  /* ───────── process engine + trust ladder ───────── */
  const drawn = !!(seen.flow || seen.all);
  const T = TRUST[trustIx];
  const nodes = NODES.map((n, i) => {
    const d = i * 260;
    const isOn = node === i;
    return {
      k: n.k, c: n.c, kc: n.kc || n.c, t: n.gate ? T.gateT : n.t, ex: n.gate ? T.gateEx : n.agent ? T.agentEx : n.ex,
      why: n.gate ? n.why + ' ' + T.gateWhy : n.why,
      hasLink: i > 0, hasChecks: !!n.checks, checks: (n.checks || []).map((c: string) => ({ c })), isAgent: !!n.agent, on: isOn,
      showWhy: isOn, /* shown on small screens only: the wide readout takes over (home.css) */
      linkTf: drawn ? 'none' : 'var(--r-linkHide)', ltr: 'transform 420ms var(--ao-ease-out) ' + Math.max(0, d - 180) + 'ms',
      op: drawn ? 1 : 0, tf: drawn ? 'none' : 'translateY(16px)',
      tr: `opacity 520ms var(--ao-ease-out) ${d}ms, transform 520ms var(--ao-ease-spring) ${d}ms, background-color 160ms, border-color 160ms`,
      bg: isOn ? 'var(--ao-sf-1)' : 'var(--ao-sf-0)', bd: isOn ? `color-mix(in srgb, ${n.c} 45%, transparent)` : 'var(--ao-bd-1)',
      hover: () => setNode(i),
    };
  });
  const hn = node >= 0 ? nodes[node] : null;
  Object.assign(v, {
    nodes,
    unhover: () => setNode(-1),
    readoutK: hn ? hn.k : 'READOUT', readoutC: hn ? hn.kc : 'var(--ao-t1)', readoutText: hn ? hn.why : 'Hover any node for what it does.',
    trustName: T.name,
    trust: TRUST.map((t, i) => {
      const isOn = trustIx === i;
      return {
        n: t.n, name: t.name, line: t.line, detail: t.detail, tag: i === 0 ? 'Start here' : isOn ? 'Applied' : '', on: isOn,
        pick: () => setTrustIx(i),
        mt: `var(--r-trustMt${i})`,
        bd: isOn ? 'var(--ao-orbit-30)' : 'var(--ao-bd-1)', bg: isOn ? 'var(--ao-orbit-15)' : 'var(--ao-sf-0)', kc: isOn ? 'var(--ao-orbit)' : 'var(--ao-t1)',
      };
    }),
  });

  /* ───────── lifecycle path ───────── */
  const lc = !!(seen.life || seen.all);
  Object.assign(v, {
    lcLineTf: lc ? 'none' : 'var(--r-lcHide)',
    lcClip: lc ? 'inset(-60% 0 -60% 0)' : 'inset(-60% 100% -60% 0)',
    lcOp: lc ? 1 : 0, lcTf: lc ? 'none' : 'translateY(14px)',
    lcDotBd: lc ? 'var(--ao-orbit)' : 'var(--ao-bd-2)', lcDotFill: lc ? 'var(--ao-orbit)' : 'transparent',
  });

  /* ───────── agent orbit band ───────── */
  const ages = ['now', '12 s ago', '31 s ago', '58 s ago'];
  Object.assign(v, {
    aoMark: m ? 120 : 200,
    metricCols: m ? 2 : 4,
    sE: [30, 44, 52, 61, 70, 82, 90, 100],
    sA: [40, 62, 48, 80, 55, 92, 70, 84], sB: [20, 32, 41, 50, 58, 63, 69, 72], sC: [30, 52, 44, 70, 61, 88, 74, 96], sD: [10, 30, 20, 40, 10, 20, 10, 10],
    altLevel, setAlt: (id: string) => setAltLevel(id),
    altItems: [{ id: 'l5', label: 'SUMMIT · DOMAINS' }, { id: 'l4', label: 'MID · DIRECT' }, { id: 'l3', label: 'REPORTS' }, { id: 'l2', label: 'GROUND' }, { id: 'l1', label: 'SIGNALS' }],
    levels: [{ id: 'l5', title: 'L5 Summit' }, { id: 'l4', title: 'L4 Mid' }, { id: 'l3', title: 'L3 Reports' }, { id: 'l2', title: 'L2 Ground' }, { id: 'l1', title: 'L1 Signals' }],
    badgeOk: <StatusBadge tone="ok">ON TRACK</StatusBadge>,
    badgeAction: <StatusBadge tone="action">ACTION</StatusBadge>,
    metaLedger: [{ k: 'Source', v: 'Ledger · GL feed' }, { k: 'Last sync', v: '2 min ago' }, { k: 'Agent', v: 'Close agent' }, { k: 'Trust', v: 'Draft and approve' }],
    metaRevops: [{ k: 'Source', v: 'RevOps · CRM feed' }, { k: 'Last sync', v: '41 sec ago' }, { k: 'Agent', v: 'Qualification agent' }, { k: 'Trust', v: 'Shadow' }],
    actReviewOnly: ['Review', '⟳ Delegate'], actResolve: ['✓ Resolve', '⟳ Delegate'], actWatch: ['Watch'],
    feedEl: (
      <div className="e1-feed">
        {feed.map((f, i) => (
          <div
            key={f.id}
            className={i === 3 ? 'e1-feed-item e1-feed-4' : 'e1-feed-item'}
            style={{ animation: i === 0 && !reduced && feedN > 4 ? 'ao-reveal-x 520ms var(--ao-ease-out)' : 'none' }}
          >
            <span style={{ flex: 'none', width: 6, height: 6, marginTop: 5, borderRadius: '50%', background: f.c }} />
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: 'var(--ao-f-mono)', fontWeight: 300, fontSize: 10, letterSpacing: '0.14em', color: 'var(--ao-t1)' }}>{f.a}</span>
              <span style={{ display: 'block', marginTop: 4, fontSize: 14, lineHeight: 1.45, color: 'var(--ao-t0)' }}>{f.t}</span>
              <span style={{ display: 'block', marginTop: 6, fontFamily: 'var(--ao-f-mono)', fontWeight: 300, fontSize: 10, letterSpacing: '0.1em', color: 'var(--ao-t1)' }}>{ages[i]}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  });

  /* ───────── governance ───────── */
  Object.assign(v, {
    logRows: LOG.map((r, i) => {
      const e = r.esc || esc[i];
      return {
        t: r.t, act: r.act, who: r.who, trust: r.trust, out: e ? 'Escalated · Owner' : r.out, c: e ? 'var(--ao-orbit)' : r.c, canEsc: !e,
        escProps: { ...ghostProps('secondary', 'sm', { minHeight: 34, padding: '6px 12px' }), onClick: () => setEsc((x) => ({ ...x, [i]: true })) },
      };
    }),
  });

  return v;
}
