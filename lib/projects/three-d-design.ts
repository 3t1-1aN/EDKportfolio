import type { Project } from '../data';
import { categoryImages } from './category-images';
import { threeDProject } from './defaults';

const U = {
  astonMartin:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249953/aston_martin_cwusyg.png',
  astonMartinBack:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249959/aston_martin_back_ux3rqg.png',
  grassCar:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249956/grass_car_yarfyg.png',
  hotel1:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249962/hotel1_dk1gkr.png',
  hotel2:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249959/hotel2_fihlk2.png',
  hotel3:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249964/hotel3_glsaiz.png',
  hovercar:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249962/hovercar_tgshdc.png',
  hovercarBack:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249967/hovercar_back_np66yq.png',
  livingRoom:
    'https://res.cloudinary.com/dhbn2shvj/image/upload/v1779249964/living_room_erjp0v.png',
  tranquilBackdrop:
    'https://res.cloudinary.com/dhbn2shvj/video/upload/v1779249997/tranquil_backdrop_gvbo3r.mp4',
} as const;

const blenderTags = ['3D modeling', 'rendering', 'design', 'Blender'] as const;

/**
 * One entry per 3D model or animation. Paste Cloudinary URLs into `image` / `images` / `video`.
 * Order in this array is display order (reorder freely).
 */
export const threeDDesignProjects: Project[] = [
  threeDProject({
    slug: 'blender-aston-martin',
    title: 'Aston Martin',
    description:
      'A detailed 3D model of an Aston Martin sports car, rendered from multiple angles to showcase the exterior body work and design language.',
    image: U.astonMartin,
    images: [U.astonMartin, U.astonMartinBack],
    tags: [...blenderTags],
  }),
  threeDProject({
    slug: 'blender-grass-car',
    title: 'Grass Car',
    description:
      'A stylized car model set in a natural outdoor environment, combining vehicle design with detailed terrain and grass rendering.',
    image: U.grassCar,
    tags: [...blenderTags],
  }),
  threeDProject({
    slug: 'blender-hotel',
    title: 'Hotel',
    description:
      'An architectural visualization of a hotel building across three views, showcasing exterior design, materials, and lighting.',
    image: U.hotel1,
    images: [U.hotel1, U.hotel2, U.hotel3],
    tags: [...blenderTags],
  }),
  threeDProject({
    slug: 'blender-hovercar',
    title: 'Hovercar',
    description:
      'A futuristic hovercar concept model rendered from both front and rear perspectives, exploring sci-fi vehicle design.',
    image: U.hovercar,
    images: [U.hovercar, U.hovercarBack],
    tags: [...blenderTags],
  }),
  threeDProject({
    slug: 'blender-living-room',
    title: 'Living Room',
    description:
      'An interior design render of a modern living room, exploring lighting, materials, and spatial composition.',
    image: U.livingRoom,
    tags: [...blenderTags],
  }),
  threeDProject({
    slug: 'blender-video-tranquil-backdrop',
    title: 'Tranquil Backdrop',
    description:
      'A 3D animated backdrop scene rendered in motion, used as an environment asset for other projects.',
    image: categoryImages.threeDPrint,
    video: [U.tranquilBackdrop],
    tags: [...blenderTags, 'animation'],
  }),
];
