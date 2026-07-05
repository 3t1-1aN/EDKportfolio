'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { FrostedPanel } from '@/components/ui/frosted-glass';
import { sectionHeaderSequenceEnd } from '@/lib/motion-presets';

const CONTACT_TITLE = 'Get in Touch';
const CONTACT_DESCRIPTION = "Have a project in mind? Let's discuss how we can work together.";

export default function ContactPage() {
  const formDelay = sectionHeaderSequenceEnd(CONTACT_TITLE, CONTACT_DESCRIPTION) * 1000;

  return (
    <>
      <Section id="contact" variant="default" className="pt-32 min-h-screen">
        <Container>
          <FrostedPanel className="max-w-3xl mx-auto">
            <div className="px-8 py-10 sm:px-12 sm:py-14">
            <SectionHeader
              title={CONTACT_TITLE}
              description={CONTACT_DESCRIPTION}
              blurTitle
              blurDescription
            />

            <ScrollAnimation delay={formDelay}>
              <ContactForm />
            </ScrollAnimation>
            </div>
          </FrostedPanel>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
