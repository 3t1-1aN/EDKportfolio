'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from './ScrollAnimation';
import { blogPosts } from '@/lib/data';

const BlogSection = () => {
  const featuredPosts = blogPosts.slice(0, 4);

  return (
    <Section id="featured-blog" variant="default">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="CREATIVE IDEAS & INSIGHTS"
            title="Insights on impactful design and strategy."
          />
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <ScrollAnimation key={post.id} delay={index * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
                data-cursor-hover
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="glass-card rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Published on</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {post.readTime}
                  </p>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={400}>
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block text-sm uppercase tracking-wider border-b-2 border-black dark:border-white pb-2 hover:opacity-70 transition-opacity"
            >
              Explore All Thoughts
            </Link>
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default BlogSection;

