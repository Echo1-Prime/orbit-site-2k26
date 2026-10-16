// Website leads into the Echo 1 sales pipeline (Airtable Central Hub "Leads", the table Agent Orbit's sales
// screens and funnel KPIs read), server-only. Env: AIRTABLE_LEADS_TOKEN, a personal access token scoped to the
// Central Hub base with data.records:write on the Leads table only. Unset, this is skipped and Slack still gets the lead.

import type { ContactPayload } from './n8n';

const BASE = 'applOslkK8lydfVaW';
const TABLE = 'tblq0kXMnXkducqqp';
const TIMEOUT_MS = 4000;

export const airtableConfigured = () => Boolean(process.env.AIRTABLE_LEADS_TOKEN);

/** The Leads record for one contact-form message. Exported so it can be checked without the API. */
export function leadFields(p: ContactPayload): Record<string, string> {
  const a = p.attribution;
  const notes = [
    p.message ? `Message: ${p.message}` : '',
    `Form: ${p.source || 'www.echo1labs.com/contact'}`,
    a ? `Came from: ${a.src ? `${a.src}${a.cta ? ` (${a.cta})` : ''}` : 'no campaign tag'}` : '',
    a ? `Previous page: ${a.from || 'none (opened the contact page directly)'}` : '',
    a ? `First page this visit: ${a.landing || 'unknown'}` : '',
    a?.ref ? `Sent here by: ${a.ref}` : '',
    a?.utm ? `Campaign tags: ${a.utm}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  const fields: Record<string, string> = { 'Full Name': p.name, Email: p.email, Stage: 'New', Source: 'Inbound', Notes: notes };
  if (p.company) fields.Company = p.company;
  return fields;
}

/** Create one Leads record. Returns ok:false when unset, refused or timed out; never throws. */
export async function createLead(p: ContactPayload): Promise<{ ok: boolean }> {
  const token = process.env.AIRTABLE_LEADS_TOKEN;
  if (!token) return { ok: false };
  try {
    const r = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields: leadFields(p) }] }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!r.ok) {
      console.error(`[contact] airtable:error:${r.status}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[contact] airtable:error:${err instanceof Error && err.name === 'TimeoutError' ? 'timeout' : 'network'}`);
    return { ok: false };
  }
}
