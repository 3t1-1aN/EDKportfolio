'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import type { Project } from '@/lib/data';
import { ImagesScrollingAnimation } from '@/components/ui/images-scrolling-animation';
import { DarkGradientBg } from '@/components/ui/elegant-dark-pattern';

interface ProjectsSectionProps {
  featuredProjects: Project[];
}

const ProjectsSection = ({ featuredProjects }: ProjectsSectionProps) => {
  return (
    <Section id="featured-work" variant="default" className="min-h-screen relative !pt-0 pb-24 sm:pb-32" data-snap-section="projects">
      <DarkGradientBg className="min-h-full">
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
      </DarkGradientBg>
    </Section>
  );
};

export default ProjectsSection;

