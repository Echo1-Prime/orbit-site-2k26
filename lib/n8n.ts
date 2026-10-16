// Thin client for forwarding lead/contact payloads to n8n. Server-only:
// the webhook URL never reaches the client bundle (no NEXT_PUBLIC_ prefix).

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message?: string;
  source?: string;
  /** Where the visitor came from (see lib/attribution.ts). Every field is capped text. */
  attribution?: { src: string; cta: string; from: string; landing: string; ref: string; utm: string };
}

/** True when the n8n contact webhook is configured for this deployment. */
export const n8nConfigured = () => Boolean(process.env.N8N_CONTACT_WEBHOOK);

/**
 * Forward a contact submission to the n8n webhook.
 * Mirrors the prior Express behavior: if the env var is unset, we no-op and
 * report success so the form still confirms in local/dev without a webhook.
 */
export async function forwardContact(payload: ContactPayload): Promise<{ ok: boolean }> {
  const url = process.env.N8N_CONTACT_WEBHOOK;
  if (!url) {
    console.warn('N8N_CONTACT_WEBHOOK not set, contact submission not forwarded');
    return { ok: true };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'orbit-site-2k26', ...payload }),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error('n8n webhook error:', err instanceof Error ? err.message : err);
    return { ok: false };
  }
}
