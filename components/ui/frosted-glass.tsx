'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { GlassEffect, type GlassEffectProps } from '@/components/ui/liquid-glass';

type FrostedGlassProps = Omit<GlassEffectProps, 'variant'>;

export function FrostedPanel({ className, children, ...props }: FrostedGlassProps) {
  return (
    <GlassEffect variant="panel" className={cn('frosted-panel', className)} {...props}>
      {children}
    </GlassEffect>
  );
}

export function FrostedCard({ className, children, ...props }: FrostedGlassProps) {
  return (
    <GlassEffect variant="card" className={cn('frosted-card', className)} {...props}>
      {children}
    </GlassEffect>
  );
}

interface FrostedInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Inner frosted panel for card text/content areas — matches About section blur. */
export function FrostedInset({ className, children, ...props }: FrostedInsetProps) {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitBackdropFilter: 'var(--frosted-backdrop-panel)',
          backdropFilter: 'var(--frosted-backdrop-panel)',
          backgroundColor: 'rgba(21, 22, 26, 0.32)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            'inset 1px 1px 0 rgba(255,255,255,0.10), inset -1px -1px 1px rgba(255,255,255,0.04)',
        }}
      />
      <div className="relative z-[1] min-w-0">{children}</div>
    </div>
  );
}
