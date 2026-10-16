// Slack lead notifications from the site, server-only (the webhook never reaches the client bundle).
// Same incoming webhook and the same message shape as the booth forms (e1-event-booths api/intake.js), so every
// lead, from the site or a booth form, lands in one channel. Env: SLACK_NEW_LEADS_WEBHOOK (Production).

import type { ContactPayload } from './n8n';

const TIMEOUT_MS = 3000;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** True when a Slack webhook is configured for this deployment. */
export const slackConfigured = () => Boolean(process.env.SLACK_NEW_LEADS_WEBHOOK);

/** The Slack message for one lead. Exported so it can be checked without a webhook. */
export function leadText(payload: ContactPayload, unix: number): string {
  const a = payload.attribution;
  const lines = [
    `*New lead: website contact form*`,
    `Name: ${esc(payload.name)}`,
    `Email: ${esc(payload.email)}`,
    `Company: ${esc(payload.company || 'not given')}`,
    `Message: ${esc(payload.message || 'not given')}`,
    `Source: ${esc(payload.source || 'www.echo1labs.com/contact')}`,
  ];
  if (a) {
    lines.push(
      `Came from: ${esc(a.src ? `${a.src}${a.cta ? ` (${a.cta})` : ''}` : 'no campaign tag')}`,
      `Previous page: ${esc(a.from || 'none (opened the contact page directly)')}`,
      `First page this visit: ${esc(a.landing || 'unknown')}`,
      `Sent here by: ${esc(a.ref || 'no outside referrer')}`,
      `Campaign tags: ${esc(a.utm || 'none')}`,
    );
  }
  lines.push(`Time: <!date^${unix}^{date_short_pretty} {time}|${new Date(unix * 1000).toISOString()}>`);
  return lines.join('\n');
}

/** Post one lead to Slack. Returns ok:false when unset, malformed, refused or timed out; never throws. */
export async function notifySlackLead(payload: ContactPayload): Promise<{ ok: boolean }> {
  const url = process.env.SLACK_NEW_LEADS_WEBHOOK;
  if (!url) return { ok: false };
  if (!url.startsWith('https://hooks.slack.com/')) {
    console.error('[contact] slack:error:bad_url');
    return { ok: false };
  }
  const unix = Math.floor(Date.now() / 1000);
  const text = leadText(payload, unix);
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!r.ok) {
      console.error(`[contact] slack:error:slack_${r.status}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[contact] slack:error:${err instanceof Error && err.name === 'TimeoutError' ? 'timeout' : 'network'}`);
    return { ok: false };
  }
}
