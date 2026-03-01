'use client';

import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';

const TrustedBySection = () => {
  // Placeholder for brand logos - replace with actual brand data
  const brands = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    name: `Brand ${i + 1}`,
  }));

  return (
    <Section id="trusted-by-brands" variant="default">
      <Container>
        <ScrollAnimation>
          <SectionHeader
            label="TRUSTED BY GLOBAL BRANDS"
            title="I've worked with innovative companies in tech, fashion, and creative fields."
          />
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-8">
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className={`aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center depth-shadow-sm ${index % 3 === 0 ? 'depth-card' : ''}`}
              >
                <span className="text-xs text-gray-400">{brand.name}</span>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  );
};

export default TrustedBySection;

