'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import NeumorphicButton from '@/components/ui/NeumorphicButton';
import ScrollAnimation from './ScrollAnimation';
import { useState } from 'react';
import { testimonials } from '@/lib/data';

const TestimonialsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Section id="testimonials" variant="alt">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="CLIENT STORIES"
            title="Inspiring journeys, real results."
          />
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="min-w-full px-4"
                  >
                    <div className="max-w-3xl mx-auto">
                      <div className="glass-card rounded-2xl p-8">
                        <p className="text-xl sm:text-2xl text-grey-200 mb-8 leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                          />
                          <div>
                            <p className="font-semibold text-white">{testimonial.author}</p>
                            <p className="text-sm text-grey-400">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-12">
              <NeumorphicButton
                onClick={handlePrev}
                backgroundColor="rgba(3, 3, 1, 0.5)"
                className="p-2"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </NeumorphicButton>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-black dark:bg-white w-8'
                        : 'bg-grey-300 dark:bg-grey-700'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <NeumorphicButton
                onClick={handleNext}
                backgroundColor="rgba(3, 3, 1, 0.5)"
                className="p-2"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NeumorphicButton>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default TestimonialsComponent;

