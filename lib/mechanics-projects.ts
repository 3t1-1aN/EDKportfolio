import { promises as fs } from 'fs';
import path from 'path';
import { Project } from './data';
import { mechanicsProjectDescriptions } from './dynamic-project-descriptions';

/** Slugs to temporarily hide from the site (remove from this array to show again) */
const TEMPORARILY_HIDDEN_MECHANICS_SLUGS = ['kinetic-clock'];
/** Video filenames to hide from the site (e.g. 'kinetic_clock.mp4') */
const TEMPORARILY_HIDDEN_VIDEO_FILES = ['kinetic_clock.mp4', 'gimbal.mp4'];

/**
 * Generates project entries for image files and video files in the public/mechanics folder.
 * - Image files are grouped by base name (e.g. arclighter1.jpg, arclighter2.jpg → one card).
 * - Each .mp4 file becomes its own card; video plays when the card expands.
 */
export async function getMechanicsProjects(): Promise<Project[]> {
  try {
    const mechanicsDir = path.join(process.cwd(), 'public', 'mechanics');
    const files = await fs.readdir(mechanicsDir);
    
    const imageFiles = files.filter(file => {
      const lowerFile = file.toLowerCase();
      return lowerFile.endsWith('.jpg') || 
             lowerFile.endsWith('.jpeg') || 
             lowerFile.endsWith('.png') || 
             lowerFile.endsWith('.webp') ||
             lowerFile.endsWith('.gif');
    });
    
    const videoFiles = files.filter(file => file.toLowerCase().endsWith('.mp4'));
    
    // Group images by base name (e.g., "arclighter1.jpg", "arcligher2.jpg" -> "arclighter")
    const groupedImages = new Map<string, string[]>();
    
    // Helper function to normalize base names (handles typos/variations)
    const normalizeBaseName = (name: string): string => {
      // Remove extension
      let baseName = name.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
      
      // Remove trailing numbers with optional separators
      baseName = baseName
        .replace(/[-_\s]*\d+$/, '')
        .replace(/[-_\s]+$/, '')
        .toLowerCase();
      
      // Normalize common variations/typos
      // Handle "arcligher" vs "arclighter" -> normalize to "arclighter"
      baseName = baseName.replace(/arcligher$/i, 'arclighter');
      
      // If removing numbers resulted in empty string, use the full name
      if (!baseName || baseName.length === 0) {
        baseName = name.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').toLowerCase();
      }
      
      return baseName;
    };
    
    imageFiles.forEach(file => {
      const baseName = normalizeBaseName(file);
      
      if (!groupedImages.has(baseName)) {
        groupedImages.set(baseName, []);
      }
      groupedImages.get(baseName)!.push(file);
    });
    
    // Create projects for each image group
    const imageProjects = Array.from(groupedImages.entries()).map(([baseName, files]) => {
      const sortedFiles = files.sort();
      const slug = baseName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const title = baseName
        .split(/[\s_-]+/)
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      const defaultDescription = `A creative DIY project showcasing mechanical engineering and electronics work, featuring ${title.toLowerCase()} design and construction.`;
      const description = mechanicsProjectDescriptions[slug] ?? defaultDescription;
      const allImages = sortedFiles.map(file => `/mechanics/${file}`);
      return {
        id: `mechanics-${slug}`,
        slug,
        title,
        description,
        client: 'Personal Projects',
        date: '2020 - Present',
        image: allImages[0],
        images: allImages,
        categoryId: 'diy-electronics',
        tags: ['electronics', 'mechanics', 'hardware', 'DIY'],
      };
    });

    // Create one project per video file; video plays when card expands (exclude hidden videos)
    const hiddenSet = new Set(TEMPORARILY_HIDDEN_VIDEO_FILES.map((f) => f.toLowerCase()));
    const visibleVideoFiles = videoFiles.filter((file) => !hiddenSet.has(file.toLowerCase()));
    const videoProjects: Project[] = visibleVideoFiles.map((file) => {
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
      const defaultDescription = `A mechanical or DIY project video: ${title}.`;
      const description = mechanicsProjectDescriptions[slug] ?? defaultDescription;
      return {
        id: `mechanics-video-${slug}`,
        slug,
        title,
        description,
        client: 'Personal Projects',
        date: '2020 - Present',
        image: '/electronics.jpg',
        categoryId: 'diy-electronics',
        tags: ['electronics', 'mechanics', 'hardware', 'DIY', 'video'],
        video: [`/mechanics/${file}`],
      };
    });

    const allProjects = [...imageProjects, ...videoProjects];
    return allProjects.filter((p) => !TEMPORARILY_HIDDEN_MECHANICS_SLUGS.includes(p.slug));
  } catch (error) {
    console.error('Error reading mechanics directory:', error);
    return [];
  }
}
