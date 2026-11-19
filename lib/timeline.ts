/**
 * Home page timeline. Edit this file to change what shows up.
 * Order here is display order, oldest first.
 *
 * - `date` is shown as written. Leave it out if the date is not known.
 * - `href` is optional. Add it when there is a fuller story to read.
 *   Hash links scroll to an element with that id (the About page sections
 *   have ids: svcte, robotics, rincell).
 * - Every fact here comes from the site, my brag sheet or my own notes.
 */
export interface TimelineEntry {
  id: string;
  date?: string;
  title: string;
  summary: string;
  href?: string;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'start-of-high-school',
    date: 'Start of high school',
    title: 'Moved to Gunderson High School',
    summary: 'I moved from a private school to Gunderson for high school.',
  },
  {
    id: 'robotics-club',
    date: '2023',
    title: 'Started the robotics club',
    summary:
      'I co-founded my school\u2019s first robotics team after a cybersecurity club of mine stalled at two members.',
    href: '/about#robotics',
  },
  {
    id: 'club-president',
    date: 'Sophomore year',
    title: 'Became club president',
    summary:
      'On our rookie FTC team I lead software, hardware, communications and grant work.',
    href: '/about#robotics',
  },
  {
    id: 'svcte',
    date: 'Aug. 2025 to June 2026',
    title: 'SVCTE Mechatronics',
    summary:
      'Hands-on training in sensors, actuators, CAD, embedded control and fabrication.',
    href: '/about#svcte',
  },
  {
    id: 'kinetic-clock',
    date: 'During SVCTE',
    title: 'Built the Kinetic Clock',
    summary:
      'A clock that moves its segments with 30 servo motors and 3D printed parts instead of LEDs.',
    href: '/projects/category/diy-electronics-mechanics',
  },
  {
    id: 'rincell',
    date: 'Summer 2026',
    title: 'Rincell internship',
    summary:
      'Six weeks in Fremont building a system to measure battery diameter and mass.',
    href: '/about#rincell',
  },
  {
    id: 'senior-year',
    date: 'Now',
    title: 'Senior year at Gunderson',
    summary: 'I\u2019m a senior and still building things.',
  },
];

/**
 * Letters of recommendation. Empty for now, so the section stays collapsed and
 * shows "Coming soon". To add one, put the PDF in /public/letters and add an entry:
 *
 * {
 *   id: 'example-letter',
 *   title: 'Letter from my robotics mentor',
 *   fromRole: 'Mentor, Saratoga High School',
 *   pdf: '/letters/example-letter.pdf',
 * },
 */
export interface RecommendationLetter {
  id: string;
  title: string;
  fromRole: string;
  /** Path under /public, for example '/letters/example-letter.pdf' */
  pdf: string;
}

export const recommendationLetters: RecommendationLetter[] = [];
