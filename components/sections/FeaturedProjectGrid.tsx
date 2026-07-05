'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories, type Project } from '@/lib/data';
import { FrostedCard, FrostedInset } from '@/components/ui/frosted-glass';

interface FeaturedProjectGridProps {
  projects: Project[];
}

export default function FeaturedProjectGrid({ projects }: FeaturedProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {projects.map((project) => {
        const category = project.categoryId
          ? categories.find((c) => c.id === project.categoryId)
          : null;
        const href = category ? `/projects/category/${category.slug}` : '/projects';

        return (
          <div
            key={project.id}
            className="group transition-transform duration-250 hover:scale-[1.02]"
          >
            <FrostedCard className="h-full">
              <Link href={href} className="relative block h-full" data-cursor-hover>
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(207,194,80,0.12),transparent_55%)]"
                  aria-hidden
                />
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-[0.82] transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-[0.88]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)]/35 via-transparent to-transparent" />
                </div>
                <FrostedInset className="border-t border-white/[0.08]">
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 transition-opacity group-hover:opacity-80">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </FrostedInset>
              </Link>
            </FrostedCard>
          </div>
        );
      })}
    </div>
  );
}
