import { redirect } from 'next/navigation';
import { writingPosts } from '@/lib/data';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return writingPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = writingPosts.find((p) => p.slug === params.slug);

  redirect(post?.mediumUrl ?? '/writing');
}

