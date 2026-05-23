'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import { GradientBackground } from '@/components/ui/gradient-background-4';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { BlurText } from '@/components/ui/blur-text';

const AboutSection = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });

  const paragraphText = "I'm a passionate creator and problem-solver who loves bringing ideas to life through code, design, and innovation. With a background spanning software development, robotics, electronics, and creative projects, I thrive on tackling complex challenges and turning them into elegant solutions. Whether I'm leading a robotics team, building custom electronics, or composing music, I bring the same level of dedication and attention to detail to every project. I believe in continuous learning and pushing boundaries, always exploring new technologies and creative avenues to expand my skills and make meaningful contributions.";

  return (
    <Section id="about-me" variant="default" className="relative overflow-hidden min-h-screen" data-snap-section="about">
      <GradientBackground />
      <DottedSurface />
      <Container className="relative z-10">
        <ScrollAnimation>
          <div className="mb-16">
            <p className="font-mono text-xs uppercase tracking-wider font-medium text-gray-400 mb-4">
              {'>'} ABOUT_ME
            </p>
            <motion.h2
              ref={titleRef}
              initial={{ filter: 'blur(20px)', opacity: 0 }}
              animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(20px)', opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 tracking-tight text-foreground"
            >
              {'$'} get_to_know_me()
            </motion.h2>
            <BlurText
              text={paragraphText}
              delay={25}
              animateBy="words"
              direction="bottom"
              className="font-mono text-base leading-relaxed text-gray-300 max-w-3xl"
              threshold={0.1}
              rootMargin="-50px"
            />
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default AboutSection;
