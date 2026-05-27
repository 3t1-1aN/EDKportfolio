import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import { StarsBackground } from '@/components/ui/stars';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export const metadata: Metadata = {
  title: 'Thank You | Ethan Kunder',
  description: 'Thanks for reaching out. Your message has been sent.',
};

const glassPanelShadow =
  'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]';

export default function ThankYouPage() {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full">
        <StarsBackground className="w-full h-full" />
      </div>
      <Section id="thank-you" variant="default" className="pt-32 min-h-screen">
        <Container>
          <div className="relative max-w-3xl mx-auto rounded-2xl px-8 py-10 sm:px-12 sm:py-14 text-center">
            <div className={`pointer-events-none absolute inset-0 rounded-2xl ${glassPanelShadow}`} />
            <div
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl bg-white/[0.02]"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            />
            <div className="relative z-10">
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
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
