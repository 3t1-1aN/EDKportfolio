import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import Footer from '@/components/Footer';
import PageWithDotBackground from '@/components/PageWithDotBackground';

export default function ContactPage() {
  return (
    <PageWithDotBackground>
      <Section id="contact" variant="default" className="pt-32">
        <Container>
          <ScrollAnimation>
            <SectionHeader
              title="Get in Touch"
              description="Have a project in mind? Let's discuss how we can work together."
            />
          </ScrollAnimation>

          <div className="max-w-2xl mx-auto">
            <ScrollAnimation delay={200}>
              <form className="glass-card rounded-2xl p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="glass-input w-full px-4 py-2 rounded-lg resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
                  data-cursor-hover
                >
                  Send Message
                </button>
              </form>
            </ScrollAnimation>
          </div>
        </Container>
      </Section>
      <Footer />
    </PageWithDotBackground>
  );
}

