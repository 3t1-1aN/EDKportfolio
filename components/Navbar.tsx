'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { NavHoverPill } from '@/components/ui/nav-hover-pill';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/projects#top', label: 'Projects', path: '/projects' },
  { href: '/writing#top', label: 'Writing', path: '/writing' },
  { href: '/about#hero', label: 'About', path: '/about' },
  { href: '/contact#contact', label: 'Contact', path: '/contact' },
] as const;

function isNavActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activePath = useMemo(() => {
    const match = navLinks.find(({ path }) => isNavActive(pathname, path));
    return match?.path ?? null;
  }, [pathname]);

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

          <NavHoverPill links={navLinks} activePath={activePath} className="hidden md:flex" />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-2">
            {navLinks.map(({ href, label, path }) => {
              const isActive = isNavActive(pathname, path);

              return (
                <Link
                  key={path}
                  href={href}
                  className={cn(
                    'relative w-fit rounded-full px-4 py-2 text-sm transition-colors',
                    isActive
                      ? 'text-foreground frosted-pill border border-white/12'
                      : 'text-white/75 hover:text-white'
                  )}
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
