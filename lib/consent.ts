// Cookie-consent state shared by ConsentBanner and the Consent Mode scripts.
// One localStorage key, two booleans. `analytics` gates GA4; `marketing` gates
// Google Ads. Everything defaults to denied until the visitor chooses.

export const CONSENT_KEY = 'echo1labs_cookie_consent';

export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Read the stored choice, or null if the visitor has not decided yet. */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Partial<ConsentChoice>;
    return { analytics: !!c.analytics, marketing: !!c.marketing };
  } catch {
    return null;
  }
}

/** Persist the choice and push it to Google Consent Mode immediately. */
export function writeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    /* storage unavailable — Consent Mode still updates for this page view */
  }
  applyConsent(choice);
}

/** Push a Consent Mode v2 update. gtag is defined by the consent-default script. */
export function applyConsent(choice: ConsentChoice): void {
  const gtag = typeof window !== 'undefined' ? window.gtag : undefined;
  if (typeof gtag !== 'function') return;
  gtag('consent', 'update', {
    analytics_storage: choice.analytics ? 'granted' : 'denied',
    ad_storage: choice.marketing ? 'granted' : 'denied',
    ad_user_data: choice.marketing ? 'granted' : 'denied',
    ad_personalization: choice.marketing ? 'granted' : 'denied',
  });
}
