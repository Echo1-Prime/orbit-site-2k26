/**
 * Orbit Agent Design System — React primitives.
 * Thin wrappers over the canonical `.oa-*` classes (app/orbit-ds/components.css).
 * Build every page from these so the site can't drift from the design system.
 * Server components (no client state) unless a consumer needs interactivity.
 */
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type BtnVariant = 'primary' | 'ember' | 'secondary' | 'ghost';
type BtnSize = 'sm' | 'md' | 'lg';

function btnClass(variant: BtnVariant = 'primary', size: BtnSize = 'md', extra = '') {
  return ['oa-btn', `oa-btn-${variant}`, size === 'sm' ? 'oa-btn-sm' : size === 'lg' ? 'oa-btn-lg' : '', extra]
    .filter(Boolean)
    .join(' ');
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: { variant?: BtnVariant; size?: BtnSize } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={btnClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: { href: string; variant?: BtnVariant; size?: BtnSize; className?: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} className={btnClass(variant, size, className)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={btnClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export function Eyebrow({
  tone = 'accent',
  children,
  className = '',
}: { tone?: 'accent' | 'ion' | 'muted'; children: ReactNode; className?: string }) {
  const toneClass = tone === 'ion' ? 'oa-eyebrow-ion' : tone === 'muted' ? '' : 'oa-eyebrow-accent';
  return <span className={`oa-eyebrow ${toneClass} ${className}`.trim()}>{children}</span>;
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`oa-card ${className}`.trim()}>{children}</div>;
}

export function HudCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`oa-card-hud ${className}`.trim()}>{children}</div>;
}

export function Glass({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`oa-glass ${className}`.trim()}>{children}</div>;
}

export function Badge({
  tone = 'ion',
  children,
}: { tone?: 'ion' | 'ember' | 'muted' | 'success' | 'error'; children: ReactNode }) {
  return <span className={`oa-badge oa-badge-${tone}`}>{children}</span>;
}

export function StateDot({
  state = 'idle',
}: { state?: 'idle' | 'listening' | 'thinking' | 'streaming' }) {
  return <span className={`oa-dot oa-dot-${state}`} aria-hidden="true" />;
}

export function Kpi({
  label,
  value,
  delta,
  deltaTone,
}: { label: string; value: ReactNode; delta?: string; deltaTone?: 'positive' | 'negative' }) {
  return (
    <div className="oa-kpi">
      <span className="oa-kpi-label">{label}</span>
      <span className="oa-kpi-value">{value}</span>
      {delta && <span className={`oa-kpi-delta ${deltaTone ?? ''}`.trim()}>{delta}</span>}
    </div>
  );
}

export function Callout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`oa-callout ${className}`.trim()}>{children}</div>;
}
