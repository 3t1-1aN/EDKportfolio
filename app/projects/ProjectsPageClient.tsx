'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Category } from '@/lib/data';
import PageWithDotBackground from '@/components/PageWithDotBackground';
import { motion } from 'framer-motion';
import { BlurIn } from '@/components/ui/blur-in';

export type CategoryWithCount = Category & { projectCount: number };

interface ProjectsPageClientProps {
  categoriesWithCounts: CategoryWithCount[];
}

export default function ProjectsPageClient({ categoriesWithCounts }: ProjectsPageClientProps) {
  return (
    <PageWithDotBackground>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          <ScrollAnimation>
            <div className="mb-20 sm:mb-24">
              <BlurIn
                word="Projects ─"
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 text-left text-black dark:text-white"
                duration={1.5}
              />
              <p className="text-xs sm:text-sm text-grey-600 dark:text-grey-400 mb-6">
                Browse by Category
              </p>
              <p className="text-base sm:text-lg text-grey-700 dark:text-grey-300 max-w-3xl">
                Explore my work organized by category. Select a category to view all projects in that area.
              </p>
            </div>
          </ScrollAnimation>

          <div className="relative">
            {/* Glass backdrop: same distance above first row and below last row (2rem) */}
            <div
              className="absolute -top-8 sm:-top-10 -bottom-8 sm:-bottom-10 -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 z-0 rounded-3xl bg-white/[0.06] dark:bg-white/[0.04] backdrop-blur-sm border border-white/10 dark:border-white/5"
              aria-hidden
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categoriesWithCounts.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <Link
                    href={`/projects/category/${category.slug}`}
                    className="group block"
                    data-cursor-hover
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-100 dark:bg-gray-900 mb-4">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-4 right-4 bg-black/70 dark:bg-white/20 text-white dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {category.projectCount} {category.projectCount === 1 ? 'project' : 'projects'}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:opacity-70 transition-opacity">
                        {category.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </PageWithDotBackground>
  );
}
