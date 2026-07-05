'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pageEntrance } from '@/lib/motion-presets';

interface PageEntranceContextValue {
  baseDelay: number;
  ready: boolean;
}

const PageEntranceContext = createContext<PageEntranceContextValue>({
  baseDelay: 0,
  ready: true,
});

export function usePageEntrance() {
  return useContext(PageEntranceContext);
}

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(Boolean(prefersReducedMotion));
  const [visible, setVisible] = useState(Boolean(prefersReducedMotion));
  const baseDelay = prefersReducedMotion ? 0 : pageEntrance.contentBaseDelay;

  useEffect(() => {
    if (prefersReducedMotion) {
      setReady(true);
      setVisible(true);
      return;
    }

    setReady(false);
    setVisible(false);

    const readyTimer = window.setTimeout(() => setReady(true), pageEntrance.readyMs);
    const fadeFrame = window.requestAnimationFrame(() => setVisible(true));

    return () => {
      window.clearTimeout(readyTimer);
      window.cancelAnimationFrame(fadeFrame);
    };
  }, [pathname, prefersReducedMotion]);

  return (
    <PageEntranceContext.Provider value={{ baseDelay, ready }}>
      {children}
      {/* Fade curtain — veils the scene in the page bg and fades out. Content stays at
          full opacity so no ancestor isolates frosted panes; backdrop-filter stays live. */}
      {!prefersReducedMotion && (
        <div
          aria-hidden
          key={pathname}
          className={cn(
            'pointer-events-none fixed inset-0 z-[100] transition-opacity',
            visible ? 'opacity-0' : 'opacity-100',
          )}
          style={{
            backgroundColor: 'var(--background)',
            transitionDuration: `${pageEntrance.duration}s`,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      )}
    </PageEntranceContext.Provider>
  );
}
