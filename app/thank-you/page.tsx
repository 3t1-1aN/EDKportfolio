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
  title: 'Thank You | Ethan Kunder',
  description: 'Thanks for reaching out. Your message has been sent.',
};

export default function ThankYouPage() {
  return (
    <>
      <Section id="thank-you" variant="default" className="pt-32 min-h-screen">
        <Container>
          <FrostedPanel className="max-w-3xl mx-auto text-center">
            <div className="px-8 py-10 sm:px-12 sm:py-14">
              <ScrollAnimation>
                <SectionHeader
                  title="Thank You"
                  description="Your message has been sent. I'll get back to you as soon as I can."
                />
              </ScrollAnimation>

              <ScrollAnimation delay={200}>
                <LiquidButton
                  asChild
                  size="xxl"
                  className="text-black dark:text-white font-semibold uppercase tracking-wider text-sm sm:text-base shadow-lg shadow-black/5 dark:shadow-black/20"
                  data-cursor-hover
                >
                  <Link href="/">Back to Home</Link>
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
