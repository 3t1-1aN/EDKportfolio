'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { BlurText } from '@/components/ui/blur-text';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { FrostedPanel } from '@/components/ui/frosted-glass';
import {
  countWords,
  headingSequenceEnd,
  pageEntrance,
  revealTiming,
} from '@/lib/motion-presets';

const headingText =
  'Building at the intersection of engineering, creativity, and useful technology.';

const paragraphText =
  "I'm a builder and problem-solver driven by curiosity and a willingness to take risks. I enjoy turning ideas into real, tangible outcomes—whether through code, electronics, mechanical design, music, or creative projects. I'm especially drawn to complex challenges and actively look for opportunities to create solutions, which has led me to lead my school's first robotics team and develop practical innovations, from 3D-printed designs to workflow automations. I'm committed to continuous learning, constantly exploring new technologies and pushing my skills to create meaningful, real-world impact.";

const labelEnd = pageEntrance.contentBaseDelay + revealTiming.labelDuration;
const headingDelay = labelEnd;
const bodyDelay = headingSequenceEnd(countWords(headingText), labelEnd);

const AboutSection = () => {
  return (
    <Section id="about-me" variant="default" className="relative min-h-screen" data-snap-section="about">
      <Container>
        <FrostedPanel>
          <div className="p-8 sm:p-10 lg:p-12">
          <BlurReveal
            trigger="mount"
            delay={0}
            duration={revealTiming.labelDuration}
            className="mb-4 block text-xs font-semibold uppercase tracking-[0.32em] text-accent-muted"
          >
            About Me
          </BlurReveal>
          <BlurText
            text={headingText}
            variant="heading"
            as="h2"
            trigger="mount"
            startDelay={headingDelay}
            className="mb-8 max-w-4xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          />
          <BlurText
            text={paragraphText}
            variant="body"
            trigger="mount"
            startDelay={bodyDelay}
            className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg"
          />
          </div>
        </FrostedPanel>
      </Container>
    </Section>
  );
};

export default AboutSection;
