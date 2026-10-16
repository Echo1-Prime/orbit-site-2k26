/*
  Where a lead came from, first party and without storage. Everything lives in memory for the life of the tab:
  nothing is written to cookies, localStorage or sessionStorage, so no consent is needed for it. The values are
  read when the visitor sends the contact form and travel with that message, so the sales team can see which page
  and which button led them there.

  - src, cta: the campaign tag in the link the visitor clicked (/contact?src=use-case-oil-and-gas&cta=hero).
  - from: the page they were on just before the contact page (client-side navigation).
  - landing: the first page they opened on this visit.
  - ref: the site that sent them here (host and path only, never a query string), when it is not this site.
  - utm: utm_* tags on the first URL they opened, or on the contact URL itself.
*/

export interface Attribution {
  src: string;
  cta: string;
  from: string;
  landing: string;
  ref: string;
  utm: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/** Printable text only, trimmed and capped: this is user-controllable (it comes from a URL). */
export function cleanAttr(value: unknown, max = 120): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function utmOf(search: string): string {
  const q = new URLSearchParams(search);
  return UTM_KEYS.filter((k) => q.get(k))
    .map((k) => `${k}=${cleanAttr(q.get(k), 60)}`)
    .join('&');
}

const state = { init: false, cur: '', prev: '', landing: '', ref: '', utm: '' };

export function initAttribution(): void {
  if (typeof window === 'undefined' || state.init) return;
  state.init = true;
  state.cur = window.location.pathname;
  state.landing = window.location.pathname;
  state.utm = utmOf(window.location.search);
  try {
    if (document.referrer) {
      const u = new URL(document.referrer);
      if (u.host === window.location.host) {
        /* opened in a new tab or reloaded: the browser still says which page of this site sent them */
        state.prev = cleanAttr(u.pathname, 120) === state.cur ? '' : cleanAttr(u.pathname, 120);
      } else {
        state.ref = cleanAttr(u.host + u.pathname, 160);
      }
    }
  } catch {
    /* an unparseable referrer is just not recorded */
  }
}

/** Call on every client-side route change. Safe to call twice with the same path. */
export function trackPath(pathname: string): void {
  initAttribution();
  if (pathname && pathname !== state.cur) {
    state.prev = state.cur;
    state.cur = pathname;
  }
}

export function readAttribution(): Attribution {
  initAttribution();
  const q = new URLSearchParams(window.location.search);
  return {
    src: cleanAttr(q.get('src'), 60),
    cta: cleanAttr(q.get('cta'), 40),
    from: cleanAttr(state.prev, 120),
    landing: cleanAttr(state.landing, 120),
    ref: state.ref,
    utm: utmOf(window.location.search) || state.utm,
  };
}
