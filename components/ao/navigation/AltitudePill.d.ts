import * as React from 'react';

/** A single altitude breadcrumb pill (L5 Summit → L1 Ground). */
export interface AltitudePillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Mono uppercase label, e.g. `'SUMMIT · DOMAINS'`. */
  label: React.ReactNode;
  /** @default false */
  active?: boolean;
  /** Role accent used for the active fill/border/text. @default 'var(--ao-orbit)' */
  accent?: string;
  className?: string;
}

export interface AltitudePillsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pill list, highest altitude first. Strings, or `{ id, label }` when the label differs from the value. */
  items: Array<string | { id: string; label: React.ReactNode }>;
  /** Currently selected id. */
  value?: string;
  onChange?: (id: string) => void;
  /** @default 'var(--ao-orbit)' */
  accent?: string;
  className?: string;
}

export declare function AltitudePill(props: AltitudePillProps): JSX.Element;
export declare function AltitudePills(props: AltitudePillsProps): JSX.Element;
