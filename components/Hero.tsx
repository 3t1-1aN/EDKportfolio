'use client';

import { useEffect, useState } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">PORTFOLIO</span>
          <div className="flex gap-3">
            {['IG', 'X', 'YT', 'FB', 'IN', 'TT'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <h4 className="text-sm uppercase tracking-widest text-gray-600 dark:text-gray-400 mb-4">
          Product Designer & Visual Thinker
        </h4>
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
          YOUR NAME
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          With a strong background in branding and digital interfaces, I help startups and studios tell their stories through design. My work blends structure and soul - clarity, craft, and emotion in every detail.
        </p>
      </div>
    </section>
  );
};

export default Hero;

