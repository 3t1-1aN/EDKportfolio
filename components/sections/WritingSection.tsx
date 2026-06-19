'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import { writingPosts } from '@/lib/data';

const WritingSection = () => {
  const featuredPosts = writingPosts.filter((post) => post.featured).slice(0, 3);
  const postsToShow = featuredPosts.length > 0 ? featuredPosts : writingPosts.slice(0, 3);

  return (
    <Section id="writing" variant="default" className="relative overflow-hidden">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="WRITING"
            title="Notes, essays, and thoughts I publish on Medium."
            description="A small collection of reflections that may not fit inside a project case study, but still show how I think, learn, and explain ideas."
          />
        </ScrollAnimation>

        {postsToShow.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {postsToShow.map((post, index) => (
              <ScrollAnimation key={post.id} delay={index * 100}>
                <a
                  href={post.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${post.title} on Medium`}
                  className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
                  data-cursor-hover
                >
                  <div className="mb-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wider text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground transition-opacity group-hover:opacity-75">
                    {post.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-gray-400">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wider text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="mt-6 inline-flex text-sm font-semibold uppercase tracking-wider text-white transition-opacity group-hover:opacity-75">
                    Read on Medium
                  </span>
                </a>
              </ScrollAnimation>
            ))}
          </div>
        ) : (
          <ScrollAnimation delay={100}>
            <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm">
              <p className="text-base leading-relaxed text-gray-300">
                Medium posts will appear here as I publish them. This section is set up for essays,
                reflections, and standalone ideas that do not need to be attached to a project.
              </p>
            </div>
          </ScrollAnimation>
        )}

        <ScrollAnimation delay={300}>
          <Link
            href="/writing#top"
            className="inline-block text-sm uppercase tracking-wider border-b-2 border-black pb-2 transition-opacity hover:opacity-70 dark:border-white"
            data-cursor-hover
          >
            View All Writing
          </Link>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default WritingSection;
