import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import PageWithDotBackground from '@/components/PageWithDotBackground';
import { writingPosts } from '@/lib/data';

export const metadata = {
  title: 'Writing - Ethan Kunder',
  description: 'Medium essays, reflections, and notes from Ethan Kunder.',
};

export default function WritingPage() {
  return (
    <PageWithDotBackground>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          <ScrollAnimation>
            <div className="mb-20 sm:mb-24">
              <h1 className="mb-4 text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl">
                Writing ─
              </h1>
              <p className="mb-6 text-xs text-grey-600 dark:text-grey-400 sm:text-sm">
                Medium essays and notes
              </p>
              <p className="max-w-3xl text-base text-grey-700 dark:text-grey-300 sm:text-lg">
                Standalone ideas, reflections, and lessons that do not always belong inside a
                project page, but still show how I think through technology, creativity, and growth.
              </p>
            </div>
          </ScrollAnimation>

          {writingPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {writingPosts.map((post, index) => (
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
                  </a>
                </ScrollAnimation>
              ))}
            </div>
          ) : (
            <ScrollAnimation delay={100}>
              <div className="max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
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
            </ScrollAnimation>
          )}
        </Container>
      </Section>
      <Footer />
    </PageWithDotBackground>
  );
}
