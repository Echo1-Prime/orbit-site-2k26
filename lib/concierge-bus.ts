// Tiny typed event bus that decouples any "open Orbit" trigger (hero buttons,
// header, in-content CTAs) from the Concierge island that listens for it.

export type ConciergeMode = 'voice' | 'text' | 'browse';

export const CONCIERGE_EVENT = 'orbit:open';

export function openConcierge(mode: ConciergeMode = 'text') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<{ mode: ConciergeMode }>(CONCIERGE_EVENT, { detail: { mode } }));
}
