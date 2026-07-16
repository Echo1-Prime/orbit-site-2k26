'use client';

import { type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface InViewStaggerProps {
  children: ReactNode;
  className?: string;
}

export default function InViewStagger({ children, className = '' }: InViewStaggerProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.08 });

  return (
    <div ref={ref} className={`${className} ${inView ? 'animate-stagger' : ''}`.trim()}>
      {children}
    </div>
  );
}
