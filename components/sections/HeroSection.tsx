'use client';

import Container from '@/components/ui/Container';
import CursorMaskReveal from '@/components/CursorMaskReveal';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section
      id="hero"
      data-snap-section="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="region"
      aria-label="Hero section"
    >
      {/* Portrait Image - Full width, positioned behind everything, visible through mask */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full" style={{ transform: 'scale(1.1) translateY(5%)' }}>
          <Image
            src="/GeneratedImage.png"
            alt="Ethan Kunder"
            fill
            priority
            className="object-cover"
            style={{
              objectPosition: 'center 40%',
              objectFit: 'cover',
            }}
            sizes="100vw"
            onError={(e) => {
              console.error('Portrait image failed to load. Please check GeneratedImage.png in the public folder.');
            }}
          />
          {/* Subtle overlay to ensure text readability while keeping image visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>
      </div>

      {/* Cursor Mask Reveal Effect */}
      <CursorMaskReveal
        className="absolute inset-0 min-h-screen z-10"
        maskSize={400}
        overlayColor="rgba(3, 3, 1, 0.7)"
      >
        {/* Background Layer - Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(207, 194, 80, 0.1) 0%, rgba(3, 3, 1, 0.6) 50%, rgba(207, 194, 80, 0.05) 100%)',
          }}
        />

        {/* Foreground Layer - Masked to reveal portrait image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.4), 0 0 100px rgba(0, 0, 0, 0.2)',
          }}
        />
      </CursorMaskReveal>

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-2 w-full overflow-hidden">
        <h1 className="font-bold leading-none text-white text-center whitespace-nowrap" style={{ fontSize: 'clamp(3.5rem, 10vw + 1.5rem, 15rem)', margin: 0, padding: '0 1rem', letterSpacing: '0.02em', width: '100%' }}>
          ETHAN KUNDER
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

