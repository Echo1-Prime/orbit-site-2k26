// Sends the sign-in email for /academy/sign-in.
//
// UNVERIFIED: no email provider has been chosen. Josh decides which one (brief item 4:
// halt and ask before wiring any provider). Until then this is a stub that sends
// nothing. Wiring a provider means replacing getMailer() below; nothing else changes.
// The link is a login credential: never log it, and never log the address either.

export type Mailer = {
  sendSignInLink(to: string, link: string): Promise<void>;
};

export const stubMailer: Mailer = {
  async sendSignInLink() {
    console.warn('academy: sign-in email not sent, no email provider is configured');
  },
};

export function getMailer(): Mailer {
  return stubMailer;
}
