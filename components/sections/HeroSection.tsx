'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { categoryImages } from '@/lib/projects/category-images';

const TAGLINE = 'MECHATRONICS · AI · ENGINEERING';

const BIO =
  'High school junior at Gunderson High School — SVCTE Mechatronics student, FTC Robotics team lead, and builder of real-world electromechanical systems.';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const HeroSection = () => {
  return (
    <section
      id="hero"
      data-snap-section="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-dot-grid"
      role="region"
      aria-label="Hero section"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#030301] via-transparent to-[#0d0d08]/80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_50%,rgba(207,194,80,0.08),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative z-10 w-full pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-14 xl:gap-16 items-center">
          <div className="max-w-2xl lg:max-w-none">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6 sm:mb-8 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.35em] sm:tracking-[0.42em] text-accent-muted"
            >
              {TAGLINE}
            </motion.p>

            <motion.h1
              custom={0.08}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.25rem, 10vw, 7rem)' }}
            >
              <span className="block text-foreground">ETHAN</span>
              <span className="block text-accent">KUNDER</span>
            </motion.h1>

            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 sm:mt-10 text-base sm:text-lg leading-relaxed text-gray-300"
            >
              {BIO}
            </motion.p>
          </div>

          <motion.figure
            custom={0.14}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative mx-auto w-full max-w-md lg:max-w-none lg:mx-0"
          >
            <div
              className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-[1.35rem] bg-[radial-gradient(circle_at_50%_40%,rgba(207,194,80,0.22),transparent_68%)] opacity-80"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 glass-light shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src={categoryImages.hero}
                  alt="Ethan Kunder"
                  fill
                  priority
                  quality={90}
                  className="object-cover object-[center_25%]"
                  sizes="(max-width: 1024px) 90vw, 560px"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030301]/50 via-transparent to-[#030301]/10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                  aria-hidden
                />
              </div>
            </div>
          </motion.figure>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
