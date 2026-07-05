import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/legal/LegalDocumentPage';

export const metadata: Metadata = {
  title: 'Terms of Service | Ethan Kunder',
  description: 'Terms for using this portfolio website.',
};

const sections = [
  {
    heading: 'Acceptance',
    body: [
      'By accessing this website, you agree to these terms. If you do not agree, please do not use the site.',
    ],
  },
  {
    heading: 'Use of the site',
    body: [
      'This site is provided for informational and portfolio purposes. You may browse project content, writing, and contact information for personal, non-commercial use.',
      'Do not attempt to disrupt the site, scrape it abusively, or use it in a way that could harm the site or other users.',
    ],
  },
  {
    heading: 'Content and ownership',
    body: [
      'Projects, images, writing, and other creative work displayed on this site belong to Ethan Kunder unless otherwise credited.',
      'You may not copy, redistribute, or reuse site content for commercial purposes without permission.',
    ],
  },
  {
    heading: 'Disclaimer',
    body: [
      'This site is provided “as is” without warranties of any kind. Content may change without notice.',
      'Links to external sites (for example GitHub, LinkedIn, or Medium) are provided for convenience and are governed by those sites’ own terms.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about these terms can be sent through the contact page on this site.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      title="Terms of Service"
      description="Basic terms for browsing and using this portfolio website."
      sections={sections}
    />
  );
}
