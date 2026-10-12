import * as React from 'react';

/** Marketing/section header — mono kicker above a Space Grotesk 300 title. */
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase kicker at 0.2em, e.g. `'Mission Context'`. */
  label?: React.ReactNode;
  /** Sentence-case display title, e.g. `'Select your operational role'`. */
  title?: React.ReactNode;
  /** @default 'center' */
  align?: 'center' | 'left';
  children?: React.ReactNode;
  className?: string;
}

/** App-surface header — orange eyebrow, fading hairline rule, muted right-hand meta, page title. */
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left eyebrow in orbit orange, e.g. `'Agent Orbit · Org Hierarchy'`. */
  eyebrow?: React.ReactNode;
  /** Right-hand muted meta, e.g. `'v1.0 · IAM Depth Model'`. */
  meta?: React.ReactNode;
  /** Page title at 22px / weight 300. */
  title?: React.ReactNode;
  className?: string;
}

export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
