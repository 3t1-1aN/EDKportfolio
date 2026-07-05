'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { categoryImages } from '@/lib/projects/category-images';
import { heroFadeUp } from '@/lib/motion-presets';

const TAGLINE = 'MECHATRONICS · AI · ENGINEERING';
const BUILDING_SINCE = '/BUILDING SINCE 2020';

const BIO =
  'High school Senior at Gunderson High School — SVCTE Mechatronics student alumni, vibe coder, AI enthusiast, musician, CAD designer, automation engineer.';

const HeroSection = () => {
  return (
    <section
      id="hero"
      data-snap-section="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      role="region"
      aria-label="Hero section"
    >
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(209,213,219,0.12),transparent_68%)] blur-3xl animate-orb-drift"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,69,77,0.28),transparent_70%)] blur-3xl animate-orb-drift-reverse"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--background)] via-transparent to-[var(--depth-2)]/60"
          aria-hidden
        />

        <Container className="relative z-10 w-full pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-14 xl:gap-16 items-center">
            <div className="max-w-2xl lg:max-w-none">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={heroFadeUp}
                className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-accent-muted"
              >
                <span>{TAGLINE}</span>
                <span className="text-white/40">©2026</span>
                <span className="text-white/35">{BUILDING_SINCE}</span>
              </motion.div>

              <motion.h1
                custom={0.08}
                initial="hidden"
                animate="visible"
                variants={heroFadeUp}
                className="font-bold leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(3.25rem, 10vw, 7rem)' }}
              >
                <span className="block text-foreground">ETHAN</span>
                <span className="block text-accent">KUNDER</span>
              </motion.h1>

              <motion.p
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={heroFadeUp}
                className="mt-8 text-base sm:text-lg leading-relaxed text-gray-300"
              >
                {BIO}
              </motion.p>

              <motion.div
                custom={0.26}
                initial="hidden"
                animate="visible"
                variants={heroFadeUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/projects#top"
                  className="inline-block text-sm uppercase tracking-wider border-b-2 border-accent/70 text-accent pb-2 hover:opacity-70 transition-opacity"
                  data-cursor-hover
                >
                  View Projects
                </Link>
                <Link
                  href="/contact#contact"
                  className="inline-block text-sm uppercase tracking-wider border-b-2 border-white/50 text-white/80 pb-2 hover:opacity-70 transition-opacity"
                  data-cursor-hover
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            <motion.figure
              custom={0.18}
              initial="hidden"
              animate="visible"
              variants={heroFadeUp}
              className="relative mx-auto w-full max-w-md lg:max-w-none lg:mx-0"
            >
              <div
                className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-[1.35rem] bg-[radial-gradient(circle_at_50%_40%,rgba(209,213,219,0.14),transparent_68%)] opacity-70"
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
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 via-transparent to-[var(--background)]/10"
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
