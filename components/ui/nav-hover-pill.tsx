'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type NavHoverLink = {
  href: string;
  label: string;
  path: string;
};

interface NavHoverPillProps {
  links: readonly NavHoverLink[];
  activePath: string | null;
  className?: string;
}

/**
 * Adapted from 21st.dev "Nav Header" — frosted pill slides on hover,
 * then settles on the active route when the pointer leaves the nav.
 */
export function NavHoverPill({ links, activePath, className }: NavHoverPillProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  const targetPath = hoveredPath ?? activePath;

  const measure = useCallback((path: string | null) => {
    const list = listRef.current;
    if (!path || !list) {
      setPill((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const el = linkRefs.current[path];
    if (!el) return;

    const listRect = list.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setPill({
      left: elRect.left - listRect.left + list.scrollLeft,
      width: elRect.width,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    measure(targetPath);
    const frame = window.requestAnimationFrame(() => measure(targetPath));
    return () => window.cancelAnimationFrame(frame);
  }, [targetPath, measure, links]);

  useEffect(() => {
    const onResize = () => measure(targetPath);
    window.addEventListener('resize', onResize);

    const list = listRef.current;
    const ro = new ResizeObserver(onResize);
    if (list) ro.observe(list);
    Object.values(linkRefs.current).forEach((el) => el && ro.observe(el));

    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [measure, targetPath]);

  return (
    <div
      ref={listRef}
      className={cn(
        'relative flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.22)]',
        className
      )}
      onMouseLeave={() => setHoveredPath(null)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 rounded-full frosted-pill border border-white/14 shadow-[0_0_28px_rgba(209,213,219,0.12)]"
        animate={{
          left: pill.left,
          width: pill.width,
          opacity: pill.opacity,
        }}
        initial={false}
        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
      >
        <span
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          aria-hidden
        />
      </motion.div>

      {links.map(({ href, label, path }) => {
        const isActive = activePath === path;
        const isHovered = hoveredPath === path;

        return (
          <Link
            key={path}
            ref={(el) => {
              linkRefs.current[path] = el;
            }}
            href={href}
            onMouseEnter={() => setHoveredPath(path)}
            className={cn(
              'relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-200',
              isActive || isHovered ? 'text-foreground' : 'text-white/65 hover:text-white/90'
            )}
            data-cursor-hover
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
