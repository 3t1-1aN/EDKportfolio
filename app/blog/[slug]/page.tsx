import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { blogPosts } from '@/lib/data';
import Link from 'next/link';
import PageWithDotBackground from '@/components/PageWithDotBackground';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PageWithDotBackground>
      <Section id="top" variant="default" className="pt-32">
        <Container>
          <Link
            href="/blog"
            className="inline-block mb-8 text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
            data-cursor-hover
          >
            ← Back to Blog
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>Published on</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100 dark:bg-gray-900 mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This is a blog post page. Add your blog content here. You can use
                markdown or rich text formatting.
              </p>
            </div>
          </article>
        </Container>
      </Section>
    </PageWithDotBackground>
  );
}

