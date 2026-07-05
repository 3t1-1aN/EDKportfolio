import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { FrostedPanel } from '@/components/ui/frosted-glass';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export const metadata: Metadata = {
  title: '404 Preview | Ethan Kunder',
  description: 'Preview of the site’s not-found page styling.',
};

export default function NotFoundPreviewPage() {
  return (
    <>
      <Section variant="default" className="pt-32 min-h-screen flex items-center">
        <Container>
          <FrostedPanel className="max-w-2xl mx-auto text-center">
            <div className="px-8 py-12 sm:px-12 sm:py-16">
            <ScrollAnimation>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4">Preview</p>
              <SectionHeader
                title="404"
                description="Page Not Found — this is the styled error state visitors see for missing routes."
              />
            </ScrollAnimation>

            <ScrollAnimation delay={120}>
              <p className="mt-6 text-sm text-white/70">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={200} className="mt-8">
              <LiquidButton
                asChild
                size="lg"
                className="text-black dark:text-white font-semibold uppercase tracking-wider text-sm shadow-lg shadow-black/5 dark:shadow-black/20"
                data-cursor-hover
              >
                <Link href="/">Go Home</Link>
              </LiquidButton>
            </ScrollAnimation>
            </div>
          </FrostedPanel>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
