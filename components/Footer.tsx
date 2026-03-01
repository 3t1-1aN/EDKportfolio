'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
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
              {['Home', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
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

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Keep in the know!</p>
            <p className="text-sm mb-4">Get the scoop on our latest news and updates by signing up for our newsletter!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="glass-input flex-1 px-4 py-2 rounded text-sm"
              />
              <button className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white rounded text-sm hover:opacity-80 transition-opacity">
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 dark:border-black/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="mb-2">Location</p>
              <p className="text-white/70 dark:text-black/70">
                San Jose, California, United States
              </p>
            </div>
            <div>
              <p className="mb-2">Education</p>
              <p className="text-white/70 dark:text-black/70">
                Gunderson High School • SVCTE Mechatronics
              </p>
            </div>
            <div>
              <p className="mb-2">Status</p>
              <p className="text-white/70 dark:text-black/70">
                Seeking Internship Opportunities
              </p>
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-white/70 dark:text-black/70">
            © 2025 Ethan Kunder. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

