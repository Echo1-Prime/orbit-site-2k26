import * as React from 'react';

/** Status / IAM pill. The only badge in the system — states and permission scopes both use it. */
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * `ok` emerald · `action` orange · `progress` violet · `info` cyan · `error` red · `neutral` slate.
   * Any CSS colour string is also accepted for one-off IAM scopes.
   * @default 'ok'
   */
  tone?: 'ok' | 'action' | 'progress' | 'info' | 'error' | 'neutral' | string;
  /** Drop the fill and border, keep the coloured mono text. For dense tree rows. @default false */
  bare?: boolean;
  /** Label. Always uppercase — `ON TRACK`, `DEPT_ADMIN`, `TEAM_READ`. */
  children?: React.ReactNode;
  className?: string;
}

export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;
