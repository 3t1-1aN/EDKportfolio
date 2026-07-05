'use client';

import Link from 'next/link';
import { FrostedPanel } from '@/components/ui/frosted-glass';

const Footer = () => {
  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects#top', label: 'Projects' },
    { href: '/writing#top', label: 'Writing' },
    { href: '/about#hero', label: 'About' },
    { href: '/contact#contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-white/10 bg-transparent py-16 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <FrostedPanel>
        <div className="p-8 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">ETHAN KUNDER</h2>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://github.com/3t1-1aN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                data-cursor-hover
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ethankunder/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                data-cursor-hover
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigationLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:opacity-70 transition-opacity">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', '404 Page'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm hover:opacity-70 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="mb-2">Location</p>
              <p className="text-white/70">
                San Jose, California, United States
              </p>
            </div>
            <div>
              <p className="mb-2">Education</p>
              <p className="text-white/70">
                Gunderson High School • SVCTE Mechatronics • De Anza College
              </p>
            </div>
            <div>
              <p className="mb-2">Status</p>
              <p className="text-white/70">
                Interning at Rincell Corporation
              </p>
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-white/70">
            © 2025 Ethan Kunder. All Rights Reserved
          </p>
        </div>
        </div>
        </FrostedPanel>
      </div>
    </footer>
  );
};

export default Footer;

