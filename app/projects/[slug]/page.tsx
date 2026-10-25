import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { projects } from '@/lib/data';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          <Link
            href="/projects"
            className="accent-link mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-wider"
            data-cursor-hover
          >
            ← Back to Projects
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 flex items-start gap-3 text-4xl font-bold sm:text-5xl md:text-6xl">
                <span className="accent-square mt-[0.55em] h-2.5 w-2.5" aria-hidden />
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                <p>{project.client}</p>
                <p>{project.date}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100 dark:bg-gray-900 mb-12">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This is a detailed project page. Add your project content, case study,
                process, and results here.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

