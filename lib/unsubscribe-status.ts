// Copy for /unsubscribed, the page the outreach Unsubscribe Handler (n8n) redirects to
// after a click on the footer or List-Unsubscribe link. The handler sends ?status=
// already | invalid | notfound, or no status on success.

export type UnsubscribeStatus = 'success' | 'already' | 'invalid' | 'notfound';

export interface UnsubscribeCopy {
  heading: string;
  body: string;
  /** Show the "email us and we will remove you" fallback line. */
  showManual: boolean;
}

const COPY: Record<UnsubscribeStatus, UnsubscribeCopy> = {
  success: {
    heading: 'You are unsubscribed.',
    body: 'You will not get any more emails from us. If that was a mistake, reply to any earlier email and we will add you back.',
    showManual: false,
  },
  already: {
    heading: 'You were already unsubscribed.',
    body: 'Nothing else to do. No more emails will come from us.',
    showManual: false,
  },
  invalid: {
    heading: 'We could not read that link.',
    body: 'The unsubscribe link looks incomplete, so nothing has changed yet.',
    showManual: true,
  },
  notfound: {
    heading: 'We could not match that link.',
    body: 'We did not find your address from that link, so nothing has changed yet.',
    showManual: true,
  },
};

export function resolveUnsubscribeStatus(raw: string | string[] | undefined): UnsubscribeStatus {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === 'already' || value === 'invalid' || value === 'notfound') return value;
  return 'success';
}

export function unsubscribeCopy(status: UnsubscribeStatus): UnsubscribeCopy {
  return COPY[status];
}

export const ALL_UNSUBSCRIBE_STATUSES = Object.keys(COPY) as UnsubscribeStatus[];
