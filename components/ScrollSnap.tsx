'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SNAP_SECTIONS = ['hero', 'about', 'projects'] as const;
type SnapSection = typeof SNAP_SECTIONS[number];

const SNAP_DURATION = 0.85;
const COOLDOWN_MS = 1050;
// How close to the top of Projects the user must scroll back to before
// an upward scroll snaps them back to About
const PROJECTS_SNAPBACK_THRESHOLD_PX = 80;

interface ScrollSnapProps {
  lenisInstance: Lenis | null;
}

const ScrollSnap = ({ lenisInstance }: ScrollSnapProps) => {
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    if (!lenisInstance) return;

    const getSectionTop = (id: SnapSection): number | null => {
      const el = document.querySelector<HTMLElement>(`[data-snap-section="${id}"]`);
      if (!el) return null;
      return window.scrollY + el.getBoundingClientRect().top;
    };

    // True once the user has scrolled into the Projects section
    const isAtOrPastProjects = (): boolean => {
      const top = getSectionTop('projects');
      return top !== null && window.scrollY >= top - 10;
    };

    const getCurrentSectionIndex = (): number => {
      const viewMid = window.scrollY + window.innerHeight * 0.4;
      for (let i = SNAP_SECTIONS.length - 1; i >= 0; i--) {
        const top = getSectionTop(SNAP_SECTIONS[i]);
        if (top !== null && viewMid >= top) return i;
      }
      return 0;
    };

    const snapTo = (index: number) => {
      const clamped = Math.max(0, Math.min(index, SNAP_SECTIONS.length - 1));
      const top = getSectionTop(SNAP_SECTIONS[clamped]);
      if (top === null) return;

      cooldownRef.current = true;
      lenisInstance.scrollTo(top, {
        duration: SNAP_DURATION,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });

      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        cooldownRef.current = false;
      }, COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      // Never hijack wheel while a modal / nested scroller is open.
      const target = e.target;
      if (target instanceof Element && target.closest('[data-lenis-prevent]')) return;

      // Only active on the home page (which has snap sections)
      if (!document.querySelector('[data-snap-section="hero"]')) return;

      if (isAtOrPastProjects()) {
        // Near the top of Projects + scrolling up → snap back to About
        const projectsTop = getSectionTop('projects');
        const nearTop =
          projectsTop !== null &&
          window.scrollY <= projectsTop + PROJECTS_SNAPBACK_THRESHOLD_PX;

        if (nearTop && e.deltaY < 0 && !cooldownRef.current) {
          e.preventDefault();
          e.stopPropagation();
          snapTo(SNAP_SECTIONS.indexOf('about'));
        }
        // Everything else inside/past Projects: free smooth scroll
        return;
      }

      // Hero / About zone: intercept and snap
      e.preventDefault();
      e.stopPropagation();
      if (cooldownRef.current) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      snapTo(getCurrentSectionIndex() + dir);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]!.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!document.querySelector('[data-snap-section="hero"]')) return;

      const delta = touchStartYRef.current - e.changedTouches[0]!.clientY;

      if (isAtOrPastProjects()) {
        const projectsTop = getSectionTop('projects');
        const nearTop =
          projectsTop !== null &&
          window.scrollY <= projectsTop + PROJECTS_SNAPBACK_THRESHOLD_PX;

        if (nearTop && delta < -40 && !cooldownRef.current) {
          snapTo(SNAP_SECTIONS.indexOf('about'));
        }
        return;
      }

      if (cooldownRef.current || Math.abs(delta) < 40) return;
      const dir = delta > 0 ? 1 : -1;
      snapTo(getCurrentSectionIndex() + dir);
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    };
  }, [lenisInstance]);

  return null;
};

export default ScrollSnap;
