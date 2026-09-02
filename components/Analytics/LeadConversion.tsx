'use client';

import { useEffect } from 'react';

// Fires once on mount to mark a completed strategy-session booking. The push is
// harmless without consent — Consent Mode keeps GA4/Ads storage denied until the
// visitor accepts, so this only becomes an attributed conversion after consent.
// Event names mirror the prior echo-1-com analytics so existing GTM triggers
// (generate_lead, and the legacy `conversion`) fire unchanged.

export default function LeadConversion({ source = 'strategy_session_booking' }: { source?: string }) {
  useEffect(() => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'generate_lead', currency: 'USD', value: 0, lead_source: source });
      window.dataLayer.push({ event: 'conversion', lead_source: source });
    } catch {
      /* dataLayer unavailable — nothing to record */
    }
  }, [source]);

  return null;
}
