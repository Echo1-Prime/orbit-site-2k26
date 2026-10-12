import * as React from 'react';

/**
 * A single dashboard metric with sparkline — the workhorse of the Fusion Grid.
 * @startingPoint section="Dashboard" subtitle="4-up metric cluster with sparklines" viewport="700x170"
 */
export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase label, e.g. `'Agent Throughput'`. */
  label: React.ReactNode;
  /** The number itself. Keep it short — 3–5 glyphs. */
  value: React.ReactNode;
  /** Suffix rendered smaller and muted, e.g. `' /s'`, `' ms'`, `'%'`, `' / 8'`. */
  unit?: React.ReactNode;
  /** Sparkline values. 8 samples is the reference density; bars scale to the series max. */
  series?: number[];
  /** Bar + bottom-rule colour. Pick by meaning: orbit = throughput, stellar = latency, agent = capacity, system = health. @default 'var(--ao-orbit)' */
  accent?: string;
  className?: string;
}

export interface MetricRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default 4 */
  columns?: number;
  children?: React.ReactNode;
  className?: string;
}

export declare function MetricCard(props: MetricCardProps): JSX.Element;
export declare function MetricRow(props: MetricRowProps): JSX.Element;
