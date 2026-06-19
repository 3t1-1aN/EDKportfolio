'use client';

import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

const projects = [
  {
    id: 1,
    title: 'Travelia',
    description: 'A travel app for discovering destinations and booking tickets.',
    client: 'Globetrek Travel Co.',
    date: 'May 2025',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Lymora',
    description: 'A photography site for an artist\'s diverse collections.',
    client: 'Lymora',
    date: 'Jan 2025',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244b32a?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Atomica',
    description: 'Creating a future where robotics meets innovative design.',
    client: 'Atomica Robotics',
    date: 'Aug 2024',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Novaheim',
    description: 'An animated identity for a space-themed sci-fi film.',
    client: 'Novaheim Studios',
    date: 'Mar 2025',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 sm:py-32 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ScrollAnimation>
          <div className="mb-16">
            <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4">
              SELECTED WORK
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
              My recent projects showcase a strategic and soulful design approach.
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <ScrollAnimation key={project.id} delay={index * 100}>
              <Link
                href={`/projects/${project.id}`}
                className="group block"
                data-cursor-hover
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    <p>{project.client}</p>
                    <p>{project.date}</p>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={400}>
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-block text-sm uppercase tracking-wider border-b-2 border-black dark:border-white pb-2 hover:opacity-70 transition-opacity"
            >
              Explore All Projects
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Projects;

