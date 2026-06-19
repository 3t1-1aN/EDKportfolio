'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { GlassFilter, LiquidButton } from '@/components/ui/liquid-glass-button';

const navLinks = [
  { href: '/projects#top', label: 'Projects', path: '/projects' },
  { href: '/writing#top', label: 'Writing', path: '/writing' },
  { href: '/about#hero', label: 'About', path: '/about' },
  { href: '/contact#contact', label: 'Contact', path: '/contact' },
] as const;

const glassPillShadow =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const targetPath = hoveredPath ?? navLinks.find((l) => l.path === pathname)?.path ?? navLinks[0].path;

  const updatePillPosition = () => {
    const container = containerRef.current;
    const index = navLinks.findIndex((l) => l.path === targetPath);
    if (!container || index < 0) return;
    const link = linkRefs.current[index];
    if (!link) return;
    const containerRect = container.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setPillStyle({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
    });
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => updatePillPosition());
    return () => cancelAnimationFrame(raf);
  }, [targetPath]);

  // After navigation, show pill on current page link
  useEffect(() => {
    setHoveredPath(null);
  }, [pathname]);

  useEffect(() => {
    const onResize = () => updatePillPosition();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
            data-cursor-hover
          >
            ETHAN KUNDER
          </Link>

          <div ref={containerRef} className="hidden md:flex relative items-center gap-12 lg:gap-16">
            {/* Sliding circular glass pill - same layers as LiquidButton: shadow + backdrop */}
            {pillStyle && (
              <div
                className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full overflow-hidden pointer-events-none"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  className={`absolute inset-0 rounded-full bg-background/80 ${glassPillShadow}`}
                />
                <div
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ backdropFilter: 'url("#container-glass")' }}
                />
              </div>
            )}
            {navLinks.map(({ href, label, path }, i) => {
              const isActive =
                pathname === path || pathname.startsWith(path + '/');
              return (
                <Link
                  key={path}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={href}
                  className="relative z-10 text-sm hover:opacity-90 transition-opacity px-3 py-1.5 rounded-full"
                  data-cursor-hover
                  onMouseEnter={() => setHoveredPath(path)}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/25 -z-10"
                      aria-hidden
                    />
                  )}
                  {label}
                </Link>
              );
            })}
            <GlassFilter />
          </div>

          <button
            onClick={handleToggleMenu}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map(({ href, label, path }) => {
              const isActive = pathname === path;
              if (isActive) {
                return (
                  <LiquidButton key={path} asChild size="default" className="text-sm px-3 py-1.5 w-fit">
                    <Link href={href}>{label}</Link>
                  </LiquidButton>
                );
              }
              return (
                <Link
                  key={path}
                  href={href}
                  className="text-sm hover:opacity-70 transition-opacity w-fit"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

