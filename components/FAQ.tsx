'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import NeumorphicButton from '@/components/ui/NeumorphicButton';
import ScrollAnimation from './ScrollAnimation';
import { useState } from 'react';

const faqs = [
  {
    question: 'Are you available for freelance or contract work?',
    answer: 'Yes — I currently take on select freelance and contract projects that align with my expertise. If the fit is right, I\'m all in.',
  },
  {
    question: 'What kind of clients do you usually work with?',
    answer: 'I collaborate with startups, creative studios, agencies, and global brands. Whether you\'re building an MVP or scaling a digital product, I tailor the process to your needs.',
  },
  {
    question: 'Do you offer full website builds or just design?',
    answer: 'Both. I design and develop fully functional websites using Framer — so what you see is what you launch. No handoff headaches, just ready-to-publish results.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'It depends on the scope. A simple landing page might take 1–2 weeks, while a full brand and website could range from 4–8 weeks. We\'ll set clear timelines upfront.',
  },
  {
    question: 'Do you work with teams or just solo founders?',
    answer: 'Both. I\'ve worked 1-on-1 with founders as well as embedded in product and marketing teams at startups and creative agencies.',
  },
  {
    question: 'How do I start working with you?',
    answer: 'It\'s simple — just head over to the Contact page or send an email. Tell me a bit about your project, and I\'ll follow up with next steps within 1–2 business days.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" variant="alt">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="FREQUENTLY ASKED, HONESTLY ANSWERED"
            title="Got questions? Let's clear things up."
          />
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} delay={index * 50}>
              <div className="glass-card rounded-lg p-6">
                <NeumorphicButton
                  onClick={() => handleToggle(index)}
                  backgroundColor="rgba(3, 3, 1, 0.5)"
                  className="w-full text-left flex items-center justify-between gap-4 p-0"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </NeumorphicButton>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-grey-600 dark:text-grey-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={400}>
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Got any doubts about something?</h3>
              <p className="text-grey-600 dark:text-grey-400 mb-6">I'm here to help out!</p>
              <NeumorphicButton
                href="/contact#contact"
                backgroundColor="rgba(3, 3, 1, 0.5)"
                className="inline-block px-8 py-3 text-sm uppercase tracking-wider font-semibold text-white"
              >
                ASK A QUESTION
              </NeumorphicButton>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default FAQ;

