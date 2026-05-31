'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-sm hover:opacity-70 transition-opacity">
                    {item}
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
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm hover:opacity-70 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
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
                Preparing for internship at Rincell Corporation
              </p>
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-white/70">
            © 2025 Ethan Kunder. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

