import { promises as fs } from 'fs';
import path from 'path';
import { Project } from './data';
import { videoProjectDescriptions } from './dynamic-project-descriptions';

/**
 * Generates project entries for all MP4 files in the public/videos folder.
 * Add your MP4 files to public/videos/ and optional custom descriptions in lib/dynamic-project-descriptions.ts.
 */
export async function getVideoProjects(): Promise<Project[]> {
  const videoDir = path.join(process.cwd(), 'public', 'videos');
  try {
    await fs.mkdir(videoDir, { recursive: true });
    const files = await fs.readdir(videoDir);

    const videoFiles = files.filter((file) =>
      file.toLowerCase().endsWith('.mp4')
    );

    return videoFiles.map((file) => {
      const slug = file
        .replace(/\.mp4$/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const title = file
        .replace(/\.mp4$/i, '')
        .split(/[\s_-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      const defaultDescription = `A video project: ${title}.`;
      const description = videoProjectDescriptions[slug] ?? defaultDescription;

      return {
        id: `video-${slug}`,
        slug,
        title,
        description,
        client: 'Personal Projects',
        date: '2022 - Present',
        image: '/video.jpg', // Add public/video.jpg for a default thumbnail, or override per-project later if needed
        categoryId: 'video',
        tags: ['video', 'mp4'],
        video: [`/videos/${file}`],
      };
    });
  } catch (error) {
    console.error('Error reading videos directory:', error);
    return [];
  }
}
