import Link from 'next/link';
import Container from '@/components/ui/Container';
import { FrostedPanel } from '@/components/ui/frosted-glass';
import Section from '@/components/ui/Section';
import Footer from '@/components/Footer';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function NotFound() {
  return (
    <>
      <Section variant="default" className="min-h-screen flex items-center pt-24">
        <Container className="text-center">
          <FrostedPanel className="max-w-2xl mx-auto">
            <div className="px-8 py-12 text-center sm:px-12 sm:py-16">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl mb-4">Page Not Found</h2>
            <p className="text-white/70 mb-8">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <LiquidButton
              asChild
              size="lg"
              className="text-black dark:text-white font-semibold uppercase tracking-wider text-sm shadow-lg shadow-black/5 dark:shadow-black/20"
              data-cursor-hover
            >
              <Link href="/">Go Home</Link>
            </LiquidButton>
            </div>
          </FrostedPanel>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
