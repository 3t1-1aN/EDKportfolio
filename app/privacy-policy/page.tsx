import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/legal/LegalDocumentPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ethan Kunder',
  description: 'How this portfolio site handles information you choose to share.',
};

const sections = [
  {
    heading: 'Overview',
    body: [
      'This portfolio site is operated by Ethan Kunder. It is meant to showcase projects, writing, and contact information.',
      'This policy describes what information may be collected when you use the site and how it is handled.',
    ],
  },
  {
    heading: 'Information we collect',
    body: [
      'If you use the contact form, we collect the details you submit — such as your name, email address, and message content — so a reply can be sent.',
      'Like most websites, basic technical data (for example browser type, pages visited, and approximate usage analytics) may be collected by hosting and analytics providers.',
    ],
  },
  {
    heading: 'How information is used',
    body: [
      'Contact form submissions are used only to respond to your inquiry.',
      'Analytics data helps understand how the site is used so it can be improved.',
      'We do not sell personal information.',
    ],
  },
  {
    heading: 'Third-party services',
    body: [
      'The site may use third-party services for hosting, analytics, email delivery, or embedded media. Those services process data under their own policies.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions about this policy can be sent through the contact page on this site.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      description="A plain-language summary of how information is handled on this portfolio site."
      sections={sections}
    />
  );
}
