'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import NeumorphicButton from '@/components/ui/NeumorphicButton';
import ScrollAnimation from './ScrollAnimation';

const CTA = () => {
  // Get background color from the glass-card
  const cardBackgroundColor = 'rgba(3, 3, 1, 0.5)';

  return (
    <Section id="cta" variant="default" className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-grey-200 via-grey-300 to-grey-400 dark:from-grey-800 dark:via-grey-700 dark:to-grey-600" />
      </div>
      
      <Container className="relative z-10 text-center">
        <ScrollAnimation>
          <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Got a project idea? Let's hear it!
            </h2>
            <p className="text-lg sm:text-xl text-grey-300 mb-8">
              Get set to turn your awesome ideas into something real!
            </p>
            <NeumorphicButton
              href="/contact#contact"
              backgroundColor={cardBackgroundColor}
              className="inline-block px-8 py-4 text-sm uppercase tracking-wider font-semibold text-white"
            >
              BOOK A FREE CALL
            </NeumorphicButton>
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default CTA;

