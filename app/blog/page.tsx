'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import PageWithDotBackground from '@/components/PageWithDotBackground';

export default function BlogPage() {
  return (
    <PageWithDotBackground>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          <ScrollAnimation>
            <div className="mb-20 sm:mb-24">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4">
                Blog ─
              </h1>
              <p className="text-xs sm:text-sm text-grey-600 dark:text-grey-400 mb-6">
                (My Story)
              </p>
              <p className="text-base sm:text-lg text-grey-700 dark:text-grey-300 max-w-3xl">
                Perspectives on minimalism, craft, and creativity.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.map((post, index) => (
              <ScrollAnimation key={post.id} delay={index * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                  data-cursor-hover
                >
                  <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/3] bg-grey-100 dark:bg-grey-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-grey-600 dark:text-grey-400 mb-2">
                    <span>Published on</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-sm text-grey-500 dark:text-grey-500">
                    {post.readTime}
                  </p>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </Container>
      </Section>
      <Footer />
    </PageWithDotBackground>
  );
}

