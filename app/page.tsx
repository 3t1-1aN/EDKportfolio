import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import Stats from '@/components/Stats';
import TestimonialsComponent from '@/components/Testimonials';
import BlogSection from '@/components/Blog';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <main>
        <AboutSection />
        <ProjectsSection />
        <HowItWorksSection />
        <Stats />
        <TestimonialsComponent />
        <BlogSection />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
