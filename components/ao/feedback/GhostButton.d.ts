import * as React from 'react';

/** The one button treatment in Agent Orbit — hairline ghost, mono label, no fills. */
export interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tint the label + border with a role/status colour. Omit for the default slate ghost. */
  accent?: string;
  children?: React.ReactNode;
  className?: string;
}

export declare function GhostButton(props: GhostButtonProps): JSX.Element;
