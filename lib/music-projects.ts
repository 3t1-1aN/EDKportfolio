import { promises as fs } from 'fs';
import path from 'path';
import { Project } from './data';
import { musicProjectDescriptions } from './dynamic-project-descriptions';

/**
 * Generates project entries for all audio files (MP3 and WAV) in the public/music folder
 */
export async function getMusicProjects(): Promise<Project[]> {
  try {
    const musicDir = path.join(process.cwd(), 'public', 'music');
    const files = await fs.readdir(musicDir);

    // Filter for both MP3 and WAV files
    const audioFiles = files.filter(file => {
      const lowerFile = file.toLowerCase();
      return lowerFile.endsWith('.mp3') || lowerFile.endsWith('.wav');
    });

    return audioFiles.map((file, index) => {
      // Generate a slug from filename (remove extension, lowercase, replace spaces/special chars)
      const slug = file
        .replace(/\.(mp3|wav)$/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Generate a title from filename (remove extension, capitalize words)
      const title = file
        .replace(/\.(mp3|wav)$/i, '')
        .split(/[\s_-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      // Use custom description if set, otherwise fall back to generated
      const defaultDescription = `An original composition blending piano, drums, and digital production, showcasing creative musical expression in "${title}".`;
      const description = musicProjectDescriptions[slug] ?? defaultDescription;

      return {
        id: `music-${slug}`, // Stable ID based on slug
        slug: slug,
        title: title,
        description: description,
        client: 'EKfeats',
        date: '2022 - Present',
        image: '/music.jpg',
        categoryId: 'music-composition',
        tags: ['music production', 'composition', 'digital audio'],
        audio: [`/music/${encodeURIComponent(file)}`],
      };
    });
  } catch (error) {
    console.error('Error reading music directory:', error);
    return [];
  }
}
