import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section variant="default" className="min-h-screen flex items-center">
      <Container className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
        >
          Go Home
        </Link>
      </Container>
    </Section>
  );
}

