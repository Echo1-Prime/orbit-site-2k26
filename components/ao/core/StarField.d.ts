import * as React from 'react';

/** Ambient canvas star field — the ground layer of every Agent Orbit surface. */
export interface StarFieldProps {
  /** Px² per star. Lower = denser. Reference value 5800; the logo sheet uses 6000. @default 5800 */
  density?: number;
  /** `true` pins to the viewport (page background); `false` fills the nearest positioned parent. @default true */
  fixed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare function StarField(props: StarFieldProps): JSX.Element;
