import * as React from 'react';

/** Chip naming a live upstream connector feeding the Fusion Grid. */
export interface SourceChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `orbit` · `agent` · `system` · `stellar` · `alert`, or `neutral` for an unconnected/idle source. @default 'neutral' */
  tone?: 'orbit' | 'agent' | 'system' | 'stellar' | 'alert' | 'neutral';
  /** Label in `Provider · Feed` form, e.g. `'Airtable · Tasks'`. */
  children?: React.ReactNode;
  className?: string;
}

export interface SourceChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export declare function SourceChip(props: SourceChipProps): JSX.Element;
export declare function SourceChips(props: SourceChipsProps): JSX.Element;
