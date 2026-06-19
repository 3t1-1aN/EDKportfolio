import type { Project } from '../data';
import { musicProject } from './defaults';

/**
 * One entry per track. Paste Cloudinary audio URLs into `audio`.
 * Order in this array is display order (reorder freely).
 */
export const musicProjects: Project[] = [
  musicProject({
    slug: 'hills-and-valleys',
    title: 'Hills And Valleys',
    description:
      'A christian contemporary song from Tauren Wells called "Hills and Valleys".',
    audio: [
      'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250155/hills_and_valleys_cexq70.mp3',
    ],
  }),
  musicProject({
    slug: 'icarius',
    title: 'Icarius',
    description: 'A beautiful piano piece remixed from Tony Ann called "Icarius".',
    audio: [
      'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250160/Icarius_odmc5t.mp3',
    ],
  }),
  musicProject({
    slug: 'oceans',
    title: 'Oceans',
    description:
      'A peaceful christian contemporary song called "Oceans", remixed with careful piano layering and other instruments.',
    audio: [
      'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250247/oceans_hrdj3t.wav',
    ],
  }),
  musicProject({
    slug: 'one-with-nature',
    title: 'One With Nature',
    description:
      'A serene piano piece inspired by the beauty of nature, with a gentle stream in the background, gentle guitar, and a soft piano accompaniment.',
    audio: [
      'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250160/one_with_nature_mhzf06.mp3',
    ],
  }),
  musicProject({
    slug: 'pianoissma',
    title: 'Pianoissma',
    description:
      'A playful piano piece of my own composition based of a simple melody that started in my head.',
    audio: [
      'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779250157/pianoissma_hrbwjz.mp3',
    ],
  }),
];
