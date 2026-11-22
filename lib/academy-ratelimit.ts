// Fixed-window rate limiter for /academy/sign-in, applied per IP and per email.
//
// In-memory, so each server instance counts for itself: a best-effort brake, not a
// global one. Put a Vercel Firewall rate-limit rule on POST /academy/sign-in as the
// hard limit (see docs/academy-private-setup.md) and swap this for a shared counter
// if one is added. Memory is bounded: expired windows are pruned and the map is capped.

export type Limiter = { allow(key: string, now?: number): boolean };

export function createLimiter(limit: number, windowMs: number, maxKeys = 5000): Limiter {
  const hits = new Map<string, { n: number; reset: number }>();
  return {
    allow(key, now = Date.now()) {
      if (hits.size >= maxKeys) {
        for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
        if (hits.size >= maxKeys) hits.clear(); // under flood, forget rather than grow
      }
      const cur = hits.get(key);
      if (!cur || cur.reset <= now) {
        hits.set(key, { n: 1, reset: now + windowMs });
        return true;
      }
      cur.n += 1;
      return cur.n <= limit;
    },
  };
}
