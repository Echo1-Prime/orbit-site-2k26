'use server';

import { cleanAttr } from '@/lib/attribution';
import { forwardContact, n8nConfigured } from '@/lib/n8n';
import { notifySlackLead, slackConfigured } from '@/lib/slack';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields; humans do not.
  if ((formData.get('company_website') as string)?.trim()) {
    return { status: 'success' };
  }

  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const company = (formData.get('company') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter your name and a valid email.' };
  }

  /* Where the visitor came from. These arrive from hidden fields, so they are treated as untrusted text. */
  const field = (k: string, max: number) => cleanAttr(formData.get(k), max);
  const attribution = {
    src: field('a_src', 60),
    cta: field('a_cta', 40),
    from: field('a_from', 120),
    landing: field('a_landing', 120),
    ref: field('a_ref', 160),
    utm: field('a_utm', 300),
  };
  const payload = { name, email, company, message, source: 'www.echo1labs.com/contact', attribution };
  // Every lead goes to Slack, and to n8n when its webhook is set. Success means at least one of them took it.
  // With neither configured the lead would be lost, so production reports an error instead of a false success.
  const deliveries: Promise<{ ok: boolean }>[] = [];
  if (slackConfigured()) deliveries.push(notifySlackLead(payload));
  if (n8nConfigured()) deliveries.push(forwardContact(payload));
  if (deliveries.length === 0) {
    console.error('[contact] no delivery configured (SLACK_NEW_LEADS_WEBHOOK and N8N_CONTACT_WEBHOOK unset)');
    if (process.env.NODE_ENV !== 'production') return { status: 'success' };
  }
  const results = await Promise.all(deliveries);
  return results.some((r) => r.ok)
    ? { status: 'success' }
    : { status: 'error', message: 'Something went wrong. Email josh@mingma.io and we will pick it up.' };
}
