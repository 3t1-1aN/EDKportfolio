'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import FeaturedProjectGrid from '@/components/sections/FeaturedProjectGrid';
import type { Project } from '@/lib/data';

interface ProjectsSectionProps {
  featuredProjects: Project[];
}

const ProjectsSection = ({ featuredProjects }: ProjectsSectionProps) => {
  return (
    <Section
      id="featured-work"
      variant="default"
      className="min-h-screen relative pb-24 sm:pb-32"
      data-snap-section="projects"
    >
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="SELECTED WORK"
            blurLabel
            title="Featured work"
            blurTitle
            description="A showcase of my design projects, highlighting my skills and experience."
            blurDescription
          />
        </ScrollAnimation>

        <ScrollAnimation delay={150}>
          <FeaturedProjectGrid projects={featuredProjects} />
        </ScrollAnimation>

        <ScrollAnimation delay={300}>
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
