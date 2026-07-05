import Footer from '@/components/Footer';
import PageWithDotBackground from '@/components/PageWithDotBackground';
import WritingPageClient from './WritingPageClient';

export const metadata = {
  title: 'Writing - Ethan Kunder',
  description: 'Medium essays, reflections, and notes from Ethan Kunder.',
};

export default function WritingPage() {
  return (
    <PageWithDotBackground>
      <WritingPageClient />
    </PageWithDotBackground>
  );
}
