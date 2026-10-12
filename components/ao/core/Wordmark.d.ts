import * as React from 'react';

/**
 * The AGENT ORBIT wordmark, set in Space Grotesk.
 * @startingPoint section="Brand" subtitle="Wordmark, sub-line and nav lockup" viewport="700x220"
 */
export interface WordmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type size in px for the wordmark itself. Reference sheet uses 36. @default 36 */
  size?: number;
  /** Mono sub-line under the wordmark. Pass `null` to omit. @default 'Agent Intelligence Platform' */
  subtitle?: React.ReactNode;
  /** @default 'center' */
  align?: 'center' | 'left';
  /** Horizontal mark + wordmark lockup (nav bar, footer). Drops the sub-line. @default false */
  lockup?: boolean;
  /** Mark size inside a lockup. @default 22 */
  markSize?: number;
  className?: string;
}

export declare function Wordmark(props: WordmarkProps): JSX.Element;
