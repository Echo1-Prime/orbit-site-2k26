import Script from 'next/script';
import { GTM_ID } from '@/lib/site';

// Google Tag Manager, gated by Google Consent Mode v2.
//
// Two pieces, in strict order:
//   1. consent-default (beforeInteractive): defines dataLayer + gtag and sets
//      the Consent Mode v2 default to ALL DENIED before any tag can fire, then
//      re-applies a previously stored choice so returning visitors are not
//      re-prompted mid-session. Storage-writing tags (GA4, Ads) stay dormant
//      until ConsentBanner records consent and calls gtag('consent','update').
//   2. gtm (afterInteractive): loads the container itself.
//
// GA4 (Measurement ID) and Google Ads conversions are configured INSIDE the
// GTM UI, not here — this file only loads the one Echo 1 Labs container.
// Ported from the prior echo-1-com index.html so the same GTM triggers apply.

const consentDefault = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
(function(){
  try {
    var stored = localStorage.getItem('echo1labs_cookie_consent');
    if (stored) {
      var c = JSON.parse(stored);
      gtag('consent', 'update', {
        'analytics_storage': c.analytics ? 'granted' : 'denied',
        'ad_storage': c.marketing ? 'granted' : 'denied',
        'ad_user_data': c.marketing ? 'granted' : 'denied',
        'ad_personalization': c.marketing ? 'granted' : 'denied'
      });
    }
  } catch (e) {}
})();
`;

const gtmLoader = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
`;

export default function GoogleTagManager() {
  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {consentDefault}
      </Script>
      <Script id="gtm" strategy="afterInteractive">
        {gtmLoader}
      </Script>
    </>
  );
}

// The <noscript> fallback must live inside <body>; render it separately.
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
