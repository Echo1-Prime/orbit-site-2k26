import * as React from 'react';

/** Detail panel for one business domain — the main body of the Fusion Grid below the metric row. */
export interface DomainPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Domain title, e.g. `'Finance · Ledger Domain'`. Space Grotesk 400 at 13px. */
  name: React.ReactNode;
  /** Right-aligned status — pass a `<StatusBadge>`. */
  badge?: React.ReactNode;
  /** Key/value pairs. Keys are mono uppercase 9px; values mono 11px. */
  meta?: Array<{ k: React.ReactNode; v: React.ReactNode }>;
  /** Meta grid columns. @default 2 */
  columns?: number;
  /** Charcoal glass surface instead of the flat 2.2% white wash — use when the panel floats over the star field. @default false */
  glass?: boolean;
  /** Ambient ±4px / ±1.5° idle float. Only for idle domain cards, never for a focused panel. @default false */
  float?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export declare function DomainPanel(props: DomainPanelProps): JSX.Element;
