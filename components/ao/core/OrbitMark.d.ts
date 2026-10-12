import * as React from 'react';

/**
 * The Agent Orbit brand mark. Canvas 2D, from the approved logo sheet — this is the
 * only mark. There is no flat SVG alternate.
 * @startingPoint section="Brand" subtitle="The orbital brand mark at hero, panel and nav scale" viewport="700x300"
 */
export interface OrbitMarkProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  /**
   * Rendered px (always square). The mark self-simplifies: ≤32 drops the outer shell
   * and scanline, ≤20 shrinks the core. Reference sizes: 380 hero, 96/64/32/16 scale
   * set, 20 nav lockup.
   * @default 108
   */
  size?: number;
  /**
   * Run the RAF loop — materialise-in, orbiting nodes, scanline sweep. `false` paints a
   * single fully-materialised frame (thumbnails, print). `prefers-reduced-motion` forces this.
   * @default true
   */
  animate?: boolean;
  /** Click emits the orange pulse burst. @default true */
  pulseOnClick?: boolean;
  /** Hover runs the orbits at 1.6×. @default true */
  hoverBoost?: boolean;
  /** Override the resolved path to `assets/orbit-mark-canvas.js`. Rarely needed — the path is derived from the loaded bundle. */
  scriptSrc?: string;
  className?: string;
}

export declare function OrbitMark(props: OrbitMarkProps): JSX.Element;
