'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import { projects } from '@/lib/data';
import { ImagesScrollingAnimation } from '@/components/ui/images-scrolling-animation';
import { BackgroundCells } from '@/components/ui/background-ripple-effect';

const ProjectsSection = () => {
  // One representative project per category for the scrolling cards (order matches display)
  const allowedCategories = [
    'diy-electronics',
    '3d-design',
    'music-composition',
    'workflow-automation',
    'photography'
  ] as const;

  // Build one card per category so every category (including Digital Music Composition) appears
  const featuredProjects = allowedCategories
    .map((categoryId) =>
      projects.find((p) => p.categoryId === categoryId)
    )
    .filter((p): p is NonNullable<typeof p> => p != null);

  return (
    <Section id="featured-work" variant="default" className="min-h-screen relative bg-slate-950 pt-0 pb-24 sm:pb-32" data-snap-section="projects">
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0, pointerEvents: 'none' }}>
        <div className="sticky top-0 h-screen w-full" style={{ pointerEvents: 'auto' }}>
          <BackgroundCells />
        </div>
      </div>
      <Container className="relative pt-12 sm:pt-16" style={{ zIndex: 20 }}>
        <ScrollAnimation>
          <SectionHeader
            label="SELECTED WORK"
            title="A showcase of my design projects, highlighting my skills and experience."
          />
        </ScrollAnimation>
      </Container>

      <div className="relative" style={{ zIndex: 20 }}>
        <ImagesScrollingAnimation projects={featuredProjects} />
      </div>

      <Container className="relative" style={{ zIndex: 20 }}>

        <ScrollAnimation delay={600}>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block text-sm uppercase tracking-wider border-b-2 border-white/80 text-white/90 pb-2 hover:opacity-70 transition-opacity"
              data-cursor-hover
            >
              Explore All Projects
            </Link>
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default ProjectsSection;

