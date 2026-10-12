import * as React from 'react';

/**
 * The floating Agent Orbit launcher: the animated OrbitMark inside a circling mono ring.
 * Mobile first. One finger drags it anywhere on screen, a tap opens Agent Orbit, and the spot
 * is remembered as a fraction of the viewport so it survives rotation and resize.
 * @startingPoint section="Navigation" subtitle="Draggable Agent Orbit CTA, bottom centre by default" viewport="700x330"
 */
export interface OrbitLauncherProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Called on tap, click, Enter or Space. Never called at the end of a drag. */
  onActivate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** The panel it opens is showing: the launcher fades out and reports aria-expanded. @default false */
  open?: boolean;
  /** id of the panel it opens (aria-controls). */
  controls?: string;
  /** Accessible name. @default "Ask Agent Orbit" */
  label?: string;
  /** Text circling the mark. Repeat the phrase so it fills the ring. @default "AGENT ORBIT · TAP TO ASK · AGENT ORBIT · TAP TO ASK · " */
  ringText?: string;
  /** Rendered px, square. Keep 64 or more for a comfortable touch target; the mark is 63% of this. @default 92 */
  size?: number;
  /** Allow drag and arrow-key placement. `false` pins it at `initial`. @default true */
  draggable?: boolean;
  /** On release, settle onto the nearest screen edge (`edge`) or stay exactly where dropped (`none`). @default "edge" */
  snap?: 'edge' | 'none';
  /** Starting spot before the user moves it: a preset or fractions of the free area (0..1). @default "bottom-center" */
  initial?: 'bottom-center' | 'bottom-right' | 'bottom-left' | { x: number; y: number };
  /** Gap from the screen edge in px, added to the device safe-area inset. @default 14 */
  margin?: number;
  /** localStorage key for the remembered spot. `null` keeps it for the page life only. @default "ao-orbit-launcher" */
  storageKey?: string | null;
  /** Fires after each move with the new spot as fractions of the free area. */
  onMove?: (position: { x: number; y: number }) => void;
  className?: string;
}

export declare function OrbitLauncher(props: OrbitLauncherProps): JSX.Element;
