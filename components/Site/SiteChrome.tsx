'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { OrbitMark } from '@/components/ao/core/OrbitMark';
import { OrbitLauncher } from '@/components/ao/navigation/OrbitLauncher';
import { DEST } from './chrome-data';
import ConciergePanel from './ConciergePanel';
import MobileMenu from './MobileMenu';
import NextBestDrawer from './NextBestDrawer';
import SiteHeader from './SiteHeader';
import { useChromeScroll } from './useChromeScroll';
import { useConcierge } from './useConcierge';
import styles from './SiteChrome.module.css';

const LAUNCHER_KEY = 'e1-launcher-min';
const DRAWER_KEY = 'e1-nbd-home';
/** WCAG 2.5.3: the launcher's name has to contain the text printed on its ring. The ring text is the design
 *  system default (OrbitLauncher ringText), the phrase twice; the name says the same words. */
const LAUNCHER_LABEL = 'Agent Orbit, tap to ask, Agent Orbit, tap to ask';

function store(kind: 'local' | 'session') {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Global chrome from the handoff: sticky nav that takes the theme of the band beneath it,
 *  mobile menu, OrbitLauncher (minimizable, tucks over primary CTAs), concierge, next-best drawer.
 *  Mount once per page; mark page bands with data-band="dark" | "light". */
export default function SiteChrome() {
  const router = useRouter();
  const { navTheme, launcherTheme, tucked, pastSixty } = useChromeScroll();
  const [menu, setMenu] = useState(false);
  const [conc, setConc] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [vw, setVw] = useState(1280);
  const [keyboard, setKeyboard] = useState(0);
  const born = useRef(0);
  const drawerDone = useRef(false);
  const drawerWait = useRef<ReturnType<typeof setTimeout> | null>(null);
  const concierge = useConcierge(reduced);

  useEffect(() => {
    born.current = Date.now();
    setMinimized(store('local')?.getItem(LAUNCHER_KEY) === '1');
    setVw(window.innerWidth);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener('change', onMq);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    const vv = window.visualViewport;
    const onVV = () => {
      if (!vv) return;
      const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      setKeyboard(kb > 80 ? kb : 0);
    };
    vv?.addEventListener('resize', onVV);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('resize', onResize);
      vv?.removeEventListener('resize', onVV);
      cancelAnimationFrame(r);
    };
  }, []);

  const mobile = vw < 760;
  const closeConc = useCallback(() => {
    concierge.clearPending();
    setConc(false);
  }, [concierge]);
  const openConc = useCallback(() => {
    setConc(true);
    setDrawer(false);
    setMenu(false);
  }, []);
  const start = useCallback(() => {
    setMenu(false);
    router.push(DEST.start.route);
  }, [router]);

  /* Page bands talk to the concierge through one window event, and read its open state from
     <html data-concierge-open> (the hero rotator pauses while it is open). */
  const askRef = useRef(concierge.ask);
  askRef.current = concierge.ask;
  useEffect(() => {
    const root = document.documentElement;
    if (conc) root.dataset.conciergeOpen = '1';
    else delete root.dataset.conciergeOpen;
    return () => {
      delete root.dataset.conciergeOpen;
    };
  }, [conc]);
  useEffect(() => {
    const on = (e: Event) => {
      const diag = (e as CustomEvent<{ diag?: string }>).detail?.diag;
      openConc();
      if (diag) setTimeout(() => askRef.current(diag, { diag: true }), 380);
    };
    window.addEventListener('e1:concierge', on);
    return () => window.removeEventListener('e1:concierge', on);
  }, [openConc]);

  /* Next-best drawer: after 60% scroll or 45 s, never within the first 10 s, once per session. */
  const maybeDrawer = useCallback(() => {
    if (drawerDone.current) return;
    if (store('session')?.getItem(DRAWER_KEY)) {
      drawerDone.current = true;
      return;
    }
    const age = Date.now() - born.current;
    if (drawerWait.current) clearTimeout(drawerWait.current);
    if (age < 10000) {
      drawerWait.current = setTimeout(maybeDrawer, 10050 - age);
      return;
    }
    if (conc || menu) {
      drawerWait.current = setTimeout(maybeDrawer, 4000);
      return;
    }
    drawerDone.current = true;
    store('session')?.setItem(DRAWER_KEY, '1');
    setDrawer(true);
  }, [conc, menu]);

  useEffect(() => {
    const t = setTimeout(maybeDrawer, 45000);
    return () => {
      clearTimeout(t);
      if (drawerWait.current) clearTimeout(drawerWait.current);
    };
  }, [maybeDrawer]);
  useEffect(() => {
    if (pastSixty) maybeDrawer();
  }, [pastSixty, maybeDrawer]);

  /* Escape closes the top-most layer. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (conc) closeConc();
      else if (drawer) setDrawer(false);
      else if (menu) setMenu(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [conc, drawer, menu, closeConc]);

  /* The menu only exists below 1024 px. */
  const menuOn = menu && vw < 1024;
  const hidden = minimized || conc || tucked || drawer || menu;
  const setMin = (v: boolean) => {
    store('local')?.setItem(LAUNCHER_KEY, v ? '1' : '0');
    setMinimized(v);
  };

  return (
    <>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <SiteHeader theme={navTheme} menuOpen={menuOn} onToggleMenu={() => setMenu((m) => !m)} onAsk={openConc} onStart={start} />
      {menuOn && <MobileMenu onClose={() => setMenu(false)} onAsk={openConc} onStart={start} />}
      {drawer && <NextBestDrawer onClose={() => setDrawer(false)} />}
      {conc && (
        <ConciergePanel
          msgs={concierge.msgs}
          mobile={mobile}
          keyboard={keyboard}
          reduced={reduced}
          onClose={closeConc}
          onAsk={(t) => concierge.ask(t)}
          onRetry={concierge.retry}
        />
      )}
      {ready && (
        <>
          <OrbitLauncher
            onActivate={openConc}
            open={conc}
            controls="e1-concierge"
            label={LAUNCHER_LABEL}
            size={mobile ? 72 : 88}
            draggable={false}
            storageKey={null}
            initial="bottom-center"
            tabIndex={minimized ? -1 : undefined}
            aria-hidden={minimized ? 'true' : undefined}
            className={hidden ? 'e1-tucked' : ''}
            data-theme={launcherTheme === 'light' ? 'light' : 'dark'}
          />
          <button
            type="button"
            className={`${styles.minimize} ${hidden ? styles.dockHidden : ''}`}
            onClick={() => setMin(true)}
            aria-label="Minimize Agent Orbit"
            title="Minimize"
            data-theme="dark"
          >
            <span className={styles.minimizeDot}>↓</span>
          </button>
          <button
            type="button"
            className={`${styles.restore} ${minimized && !conc ? styles.restoreOn : ''}`}
            onClick={() => setMin(false)}
            aria-label="Show Agent Orbit"
            data-theme="dark"
          >
            <OrbitMark size={32} />
            <span className={styles.restoreText}>Agent Orbit</span>
          </button>
        </>
      )}
    </>
  );
}
