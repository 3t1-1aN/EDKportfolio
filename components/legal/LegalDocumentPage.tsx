import Link from 'next/link';
import Container from '@/components/ui/Container';
import { FrostedPanel } from '@/components/ui/frosted-glass';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalDocumentPageProps {
  title: string;
  description: string;
  sections: LegalSection[];
  updated?: string;
}

export default function LegalDocumentPage({
  title,
  description,
  sections,
  updated = 'June 2026',
}: LegalDocumentPageProps) {
  return (
    <>
      <Section variant="default" className="pt-32 min-h-screen">
        <Container>
          <FrostedPanel className="max-w-3xl mx-auto">
            <div className="px-8 py-10 sm:px-12 sm:py-14">
            <SectionHeader title={title} description={description} />

            <p className="mt-4 text-sm text-white/50">Last updated: {updated}</p>

            <div className="mt-10 space-y-8 text-white/80">
              {sections.map((section, index) => (
                <ScrollAnimation key={section.heading} delay={index * 80}>
                  <section>
                    <h2 className="text-lg font-semibold text-white mb-3">{section.heading}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation delay={240} className="mt-10 text-center">
              <LiquidButton
                asChild
                size="lg"
                className="text-black dark:text-white font-semibold uppercase tracking-wider text-sm shadow-lg shadow-black/5 dark:shadow-black/20"
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
