'use client';

/**
 * Adapted from 21st.dev "Dark Basic Grid Faded" — cool ashen grid on a slate base.
 */
import { cn } from '@/lib/utils';

export function GridBackground({ className }: { className?: string } = {}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(209, 213, 219, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(209, 213, 219, 0.08) 1px, transparent 1px),
          linear-gradient(to right, rgba(122, 139, 154, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(122, 139, 154, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px, 48px 48px, 12px 12px, 12px 12px',
        maskImage:
          'radial-gradient(ellipse 92% 78% at 50% 42%, black 18%, transparent 74%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 92% 78% at 50% 42%, black 18%, transparent 74%)',
        opacity: 0.9,
      }}
    />
  );
}
