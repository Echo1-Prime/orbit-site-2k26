import * as React from 'react';

/**
 * A live signal in the right-hand drawer — what an agent needs from a human, or what it just did.
 * @startingPoint section="Dashboard" subtitle="Live signal drawer with resolve / delegate" viewport="700x300"
 */
export interface NotificationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `action` orange (a human must act) · `progress` violet (an agent is working) ·
   * `ok` emerald (nominal) · `error` red (threshold breached).
   * @default 'action'
   */
  priority?: 'action' | 'progress' | 'ok' | 'error';
  /** Mono uppercase kicker. Defaults to the priority's own label. */
  label?: React.ReactNode;
  /** The signal itself — one sentence, 11px Inter. */
  text?: React.ReactNode;
  /** Buttons rendered as ghost controls. Strings, or `{ label, onClick }`. */
  actions?: Array<string | { label: React.ReactNode; onClick?: (e: React.MouseEvent) => void }>;
  /** Fire the 400ms scale impact — threshold breaches only. @default false */
  impact?: boolean;
  className?: string;
}

export interface NotificationListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Drawer header. @default 'Live Signals' */
  header?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export declare function NotificationItem(props: NotificationItemProps): JSX.Element;
export declare function NotificationList(props: NotificationListProps): JSX.Element;
