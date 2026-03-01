import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { getAllProjects } from '@/lib/get-all-projects';
import PageWithDotBackground from '@/components/PageWithDotBackground';
import { BlurIn } from '@/components/ui/blur-in';
import { BlurText } from '@/components/ui/blur-text';
import CategoryProjectsClient from './CategoryProjectsClient';

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({
    categorySlug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.categorySlug);

  if (!category) {
    notFound();
  }

  const allProjects = await getAllProjects();
  const categoryProjects = allProjects.filter((p) => p.categoryId === category.id);

  return (
    <PageWithDotBackground>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          {/* Breadcrumb */}
          <ScrollAnimation>
            <nav className="mb-8 text-sm">
              <Link
                href="/projects"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                data-cursor-hover
              >
                Projects
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-black dark:text-white">{category.title}</span>
            </nav>
          </ScrollAnimation>

          {/* Category Header */}
          <ScrollAnimation>
            <div className="mb-20 sm:mb-24">
              <BlurIn
                word={`${category.title} ─`}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 text-left text-black dark:text-white"
                duration={1.5}
              />
              <BlurText
                text={category.description}
                delay={50}
                animateBy="words"
                direction="bottom"
                stepDuration={0.75}
                className="text-base sm:text-lg text-grey-700 dark:text-grey-300 max-w-3xl mb-8"
              />
            </div>
          </ScrollAnimation>

          {/* Projects List */}
          <CategoryProjectsClient projects={categoryProjects} />
        </Container>
      </Section>
      <Footer />
    </PageWithDotBackground>
  );
}

