import { promises as fs } from 'fs';
import path from 'path';
import { Project } from './data';
import { photographyProjectMeta } from './dynamic-project-descriptions';

/**
 * Generates project entries for image files in the public/photography folder.
 * Images are grouped by base name (e.g. sunset1.jpg, sunset2.jpg → one card with multiple images in expanded view).
 */
export async function getPhotographyProjects(): Promise<Project[]> {
  try {
    const photographyDir = path.join(process.cwd(), 'public', 'photography');
    await fs.mkdir(photographyDir, { recursive: true });
    const files = await fs.readdir(photographyDir);

    const imageFiles = files.filter((file) => {
      const lower = file.toLowerCase();
      return (
        lower.endsWith('.jpg') ||
        lower.endsWith('.jpeg') ||
        lower.endsWith('.png') ||
        lower.endsWith('.webp') ||
        lower.endsWith('.gif')
      );
    });

    const normalizeBaseName = (name: string): string => {
      let baseName = name.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
      baseName = baseName
        .replace(/[-_\s]*\d+$/, '')
        .replace(/[-_\s]+$/, '')
        .toLowerCase();
      if (!baseName) {
        baseName = name.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').toLowerCase();
      }
      return baseName;
    };

    const groupedImages = new Map<string, string[]>();
    imageFiles.forEach((file) => {
      const baseName = normalizeBaseName(file);
      if (!groupedImages.has(baseName)) groupedImages.set(baseName, []);
      groupedImages.get(baseName)!.push(file);
    });

    return Array.from(groupedImages.entries()).map(([baseName, files]) => {
      const sortedFiles = [...files].sort();
      const slug = baseName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const title = baseName
        .split(/[\s_-]+/)
        .filter((w) => w.length > 0)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      const defaultDescription = `Nature and wildlife photography: ${title}.`;
      const description = defaultDescription;
      const allImages = sortedFiles.map((f) => `/photography/${f}`);
      const meta = photographyProjectMeta[slug];
      return {
        id: `photography-${slug}`,
        slug,
        title,
        description,
        client: 'Personal Projects',
        date: meta?.date ?? '2020 - Present',
        image: allImages[0],
        images: allImages,
        categoryId: 'photography',
        tags: ['photography', 'wildlife', 'nature'],
        location: meta?.location ?? '',
      };
    });
  } catch (error) {
    console.error('Error reading photography directory:', error);
    return [];
  }
}
