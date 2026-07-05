'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import { FrostedCard, FrostedPanel } from '@/components/ui/frosted-glass';
import { writingPosts } from '@/lib/data';
import { sectionHeaderSequenceEnd } from '@/lib/motion-presets';

export default function WritingPageClient() {
  const cardsDelay = sectionHeaderSequenceEnd(
    'Writing ─',
    'Standalone ideas, reflections, and lessons that do not always belong inside a project page, but still show how I think through technology, creativity, and growth.',
    { hasLabel: true }
  );

  return (
    <>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          <SectionHeader
            label="Medium essays and notes"
            blurLabel
            title="Writing ─"
            blurTitle
            description="Standalone ideas, reflections, and lessons that do not always belong inside a project page, but still show how I think through technology, creativity, and growth."
            blurDescription
            className="mb-20 sm:mb-24"
          />

          {writingPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {writingPosts.map((post, index) => (
                <ScrollAnimation key={post.id} delay={cardsDelay * 1000 + index * 80}>
                  <FrostedCard className="group h-full">
                    <a
                      href={post.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read ${post.title} on Medium`}
                      className="flex h-full cursor-pointer flex-col"
                      data-cursor-hover
                    >
                      <div className="flex h-full flex-col p-6">
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
                      <h2 className="mb-4 text-2xl font-bold transition-opacity group-hover:opacity-75">
                        {post.title}
                      </h2>
                      <p className="mb-8 text-sm leading-relaxed text-gray-400">
                        {post.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wider text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="mt-6 inline-flex text-sm font-semibold uppercase tracking-wider text-white transition-opacity group-hover:opacity-75">
                        Read on Medium
                      </span>
                      </div>
                    </a>
                  </FrostedCard>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <ScrollAnimation delay={cardsDelay * 1000}>
              <FrostedPanel className="max-w-3xl">
                <div className="p-8">
                <h2 className="mb-4 text-2xl font-bold">Medium posts coming soon</h2>
                <p className="mb-6 text-base leading-relaxed text-gray-300">
                  This page is ready for future Medium posts. Add each post to the writing data
                  list, and it will show up here and in the homepage preview automatically.
                </p>
                <Link
                  href="/#writing"
                  className="inline-block text-sm uppercase tracking-wider border-b-2 border-white pb-2 transition-opacity hover:opacity-70"
                  data-cursor-hover
                >
                  Back to Homepage
                </Link>
                </div>
              </FrostedPanel>
            </ScrollAnimation>
          )}
        </Container>
      </Section>
      <Footer />
    </>
  );
}
