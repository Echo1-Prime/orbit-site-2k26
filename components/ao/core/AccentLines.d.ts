import * as React from 'react';

/**
 * Running background accent lines — orbit curves, comets and slow satellite streaks — for dark and light.
 * Place inside a positioned container; it fills it and sits under everything (z-index 0).
 * @startingPoint section="Brand" subtitle="Slow orbital accent lines behind a surface" viewport="700x330"
 */
export interface AccentLinesProps {
  /** Which lines run. @default 'both' */
  mode?: 'both' | 'curves' | 'racing';
  /** Motion multiplier. 0.9 is the approved satellite pace. @default 0.9 */
  speed?: number;
  /** Overall strength 0..1. @default 1 */
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export declare function AccentLines(props: AccentLinesProps): JSX.Element;
