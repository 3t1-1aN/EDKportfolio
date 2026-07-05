import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import WritingSection from '@/components/sections/WritingSection';
import Footer from '@/components/Footer';
import { EngineeringSketchBackground } from '@/components/ui/engineering-sketch-background';
import type { Project } from '@/lib/data';
import { categories } from '@/lib/data';

export default async function Home() {
  // Use category title and image for each card so labels match the projects hub (not a random project per category)
  const featuredProjects: Project[] = categories.map((cat) => ({
    id: `featured-${cat.id}`,
    slug: cat.slug,
    title: cat.title,
    description: cat.description,
    client: '',
    date: '',
    image: cat.image,
    categoryId: cat.id,
    tags: [],
  }));

  return (
    <>
      {/* SKETCHES_ENABLED in engineering-sketch-background.tsx — re-enable after blur verified */}
      <EngineeringSketchBackground />
      <HeroSection />
      <main>
        <AboutSection />
        <ProjectsSection featuredProjects={featuredProjects} />
        <WritingSection />
      </main>
      <Footer />
    </>
  );
}
