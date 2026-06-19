import type { Project } from '../data';
import { categoryImages } from './category-images';

type MusicInput = Pick<Project, 'slug' | 'title' | 'description' | 'audio'> & {
  audio: [string, ...string[]];
};

type MechanicsInput = Pick<
  Project,
  'slug' | 'title' | 'description' | 'image' | 'images' | 'video'
>;

type PhotographyInput = Pick<
  Project,
  'slug' | 'title' | 'description' | 'image' | 'images'
> &
  Partial<Pick<Project, 'location' | 'date'>>;

type ThreeDInput = Pick<
  Project,
  'slug' | 'title' | 'description' | 'image' | 'images' | 'video' | 'tags'
>;

export function musicProject(partial: MusicInput): Project {
  return {
    id: `music-${partial.slug}`,
    client: 'EKfeats',
    date: '2022 - Present',
    categoryId: 'music-composition',
    tags: ['music production', 'composition', 'digital audio'],
    image: categoryImages.music,
    ...partial,
  };
}

export function mechanicsProject(partial: MechanicsInput): Project {
  const image = partial.image ?? categoryImages.electronics;
  return {
    id: partial.video ? `mechanics-video-${partial.slug}` : `mechanics-${partial.slug}`,
    client: 'Personal Projects',
    date: '2020 - Present',
    categoryId: 'diy-electronics',
    tags: partial.video
      ? ['electronics', 'mechanics', 'hardware', 'DIY', 'video']
      : ['electronics', 'mechanics', 'hardware', 'DIY'],
    image,
    ...partial,
  };
}

export function photographyProject(partial: PhotographyInput): Project {
  return {
    id: `photography-${partial.slug}`,
    client: 'Personal Projects',
    date: partial.date ?? '2020 - Present',
    categoryId: 'photography',
    tags: ['photography', 'wildlife', 'nature'],
    ...partial,
  };
}

export function threeDProject(partial: ThreeDInput): Project {
  const image = partial.image ?? categoryImages.threeDPrint;
  return {
    id: partial.video
      ? `3d-design-video-${partial.slug}`
      : `3d-design-${partial.slug}`,
    client: 'Personal Projects',
    date: '2023 - Present',
    categoryId: '3d-design',
    tags: partial.tags ?? ['3D modeling', 'rendering', 'design'],
    image,
    ...partial,
  };
}
