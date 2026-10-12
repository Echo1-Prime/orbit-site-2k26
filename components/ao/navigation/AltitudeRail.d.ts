import * as React from 'react';

/** The 48px left rail: one 6px dot per altitude level, brand mark pinned at the foot. */
export interface AltitudeRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Levels top-to-bottom, highest altitude first. `{ id, title }` — `title` is the hover tooltip (e.g. `'L5 Summit'`). */
  levels: Array<string | { id: string; title: string }>;
  /** Active level id. */
  value?: string;
  onChange?: (id: string) => void;
  /** Role accent for the lit dot and its 8px halo. @default 'var(--ao-orbit)' */
  accent?: string;
  /** Show the slow-spinning orbit mark at the foot of the rail. @default true */
  mark?: boolean;
  className?: string;
}

export declare function AltitudeRail(props: AltitudeRailProps): JSX.Element;
