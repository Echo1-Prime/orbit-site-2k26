// Sends the sign-in email for /academy/sign-in, through Resend's REST API.
//
// Env: RESEND_API_KEY (send-only key) turns sending on. ACADEMY_MAIL_FROM overrides the
// sender; the default is the Echo 1 Labs sender already verified at Resend
// (UNVERIFIED for this project until the first real send is confirmed). With no key set
// this stays a stub that sends nothing, so a missing key fails closed and visibly in logs.
// The link is a login credential: never log it, and never log the address either.

export type Mailer = {
  sendSignInLink(to: string, link: string): Promise<void>;
};

export const stubMailer: Mailer = {
  async sendSignInLink() {
    console.warn('academy: sign-in email not sent, no email provider is configured');
  },
};

const DEFAULT_FROM = 'Echo 1 Labs <noreply@guardian.echo1labs.com>';
const RESEND_URL = 'https://api.resend.com/emails';
const SUBJECT = 'Your Sales Academy sign-in link';

function bodies(link: string): { text: string; html: string } {
  const text = `Use this link to sign in to the Echo 1 Labs Sales Academy:\n\n${link}\n\nIt works for 15 minutes. If you did not ask for it, you can ignore this email.`;
  const html = `<p>Use this link to sign in to the Echo 1 Labs Sales Academy:</p><p><a href="${link}">Sign in</a></p><p>It works for 15 minutes. If you did not ask for it, you can ignore this email.</p>`;
  return { text, html };
}

export function createResendMailer(opts: {
  apiKey: string;
  from?: string;
  fetchImpl?: typeof fetch;
}): Mailer {
  const doFetch = opts.fetchImpl ?? fetch;
  const from = opts.from || DEFAULT_FROM;
  return {
    async sendSignInLink(to, link) {
      const { text, html } = bodies(link);
      const res = await doFetch(RESEND_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${opts.apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], subject: SUBJECT, text, html }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        // Status only: the response and request bodies can hold the address or the link.
        console.warn(`academy: sign-in email not sent, Resend answered ${res.status}`);
        throw new Error(`Resend ${res.status}`);
      }
    },
  };
}

export function getMailer(): Mailer {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return stubMailer;
  return createResendMailer({ apiKey, from: process.env.ACADEMY_MAIL_FROM });
}
