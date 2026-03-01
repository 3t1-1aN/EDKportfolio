'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import { workflowSteps } from '@/lib/data';

const HowItWorksSection = () => {
  return (
    <Section id="how-it-works" variant="alt">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="HOW IT WORKS"
            title="A flexible approach that transforms ideas into great digital experiences."
          />
        </ScrollAnimation>

        <div className="space-y-24">
          {workflowSteps.map((step, index) => (
            <ScrollAnimation key={step.number} delay={index * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-200 dark:text-gray-800 depth-shadow-sm">
                    {step.number}
                  </h1>
                </div>
                <div className="lg:col-span-10">
                  <div className={`rounded-lg p-6 mb-6 ${index === 0 ? 'depth-card-elevated' : 'depth-card'}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="text-2xl sm:text-3xl font-bold text-white">{step.title}</h4>
                      <span className="text-2xl sm:text-3xl font-bold text-gray-400">
                        {step.subtitle}
                      </span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {step.services.map((service) => (
                      <span
                        key={service}
                        className="px-4 py-2 glass-light rounded-full text-sm text-gray-200 depth-shadow-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default HowItWorksSection;

