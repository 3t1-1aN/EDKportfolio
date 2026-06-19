import { promises as fs } from 'fs';
import path from 'path';
import { Project } from './data';
import { threeDesignProjectDescriptions } from './dynamic-project-descriptions';

/** Slugs to temporarily hide from the site (remove from this array to show again) */
const TEMPORARILY_HIDDEN_3D_SLUGS: string[] = [];
/** Video filenames to hide from the site (e.g. 'timelapse.mp4') */
const TEMPORARILY_HIDDEN_3D_VIDEO_FILES: string[] = [];

const SUBFOLDERS = [
  { dir: 'blender',   sourceTag: 'Blender',    tags: ['3D modeling', 'rendering', 'design'] },
  { dir: 'fusion360', sourceTag: 'Fusion 360', tags: ['3D modeling', 'CAD', 'design'] },
  { dir: 'printed',   sourceTag: '3D Printed', tags: ['3D printing', 'hardware', 'fabrication'] },
] as const;

/**
 * Generates project entries for image and video files across three subfolders:
 *   public/3d_models/blender/   → Blender renders/animations
 *   public/3d_models/fusion360/ → Fusion 360 CAD exports
 *   public/3d_models/printed/   → Photos of physical 3D prints
 *
 * Images are grouped by base name, stripping trailing numbers and view-angle suffixes
 * (back, front, side, etc.) so multi-angle shots become one card.
 * Each .mp4 becomes its own card with an inline video player.
 */
export async function get3dDesignProjects(): Promise<Project[]> {
  const hiddenVideoSet = new Set(
    TEMPORARILY_HIDDEN_3D_VIDEO_FILES.map((f) => f.toLowerCase())
  );

  const allProjects: Project[] = [];

  for (const { dir, sourceTag, tags } of SUBFOLDERS) {
    const folderPath = path.join(process.cwd(), 'public', '3d_models', dir);

    let files: string[];
    try {
      files = await fs.readdir(folderPath);
    } catch {
      // Folder doesn't exist yet — skip silently
      continue;
    }

    const imageFiles = files.filter((f) => {
      const lower = f.toLowerCase();
      return (
        lower.endsWith('.jpg') ||
        lower.endsWith('.jpeg') ||
        lower.endsWith('.png') ||
        lower.endsWith('.webp') ||
        lower.endsWith('.gif')
      );
    });

    const videoFiles = files
      .filter((f) => f.toLowerCase().endsWith('.mp4'))
      .filter((f) => !hiddenVideoSet.has(f.toLowerCase()));

    // ── Image grouping ──────────────────────────────────────────────────────
    const groupedImages = new Map<string, string[]>();

    const normalizeBaseName = (name: string): string => {
      let base = name.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
      // Strip trailing numbers (hotel1 → hotel)
      base = base.replace(/[-_\s]*\d+$/, '').replace(/[-_\s]+$/, '').toLowerCase();
      // Strip view-angle suffixes (hovercar_back → hovercar)
      base = base
        .replace(/[-_\s]+(back|front|side|top|bottom|left|right|rear)$/i, '')
        .trim();
      return base || name.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '').toLowerCase();
    };

    imageFiles.forEach((file) => {
      const base = normalizeBaseName(file);
      if (!groupedImages.has(base)) groupedImages.set(base, []);
      groupedImages.get(base)!.push(file);
    });

    for (const [baseName, groupFiles] of groupedImages) {
      const sortedFiles = groupFiles.sort();
      const slug = baseName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const title = baseName
        .split(/[\s_-]+/)
        .filter((w) => w.length > 0)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      const defaultDescription = `A ${sourceTag} design featuring ${title.toLowerCase()}.`;
      const description = threeDesignProjectDescriptions[slug] ?? defaultDescription;
      const allImages = sortedFiles.map(
        (f) => `/3d_models/${dir}/${encodeURIComponent(f)}`
      );

      allProjects.push({
        id: `3d-design-${dir}-${slug}`,
        slug: `${dir}-${slug}`,
        title,
        description,
        client: 'Personal Projects',
        date: '2023 - Present',
        image: allImages[0],
        images: allImages,
        categoryId: '3d-design',
        tags: [...tags, sourceTag],
      });
    }

    // ── Video projects ──────────────────────────────────────────────────────
    for (const file of videoFiles) {
      const slug = file
        .replace(/\.mp4$/i, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const title = file
        .replace(/\.mp4$/i, '')
        .split(/[\s_-]+/)
        .filter((w) => w.length > 0)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
      const defaultDescription = `A ${sourceTag} animation: ${title}.`;
      const description = threeDesignProjectDescriptions[slug] ?? defaultDescription;

      allProjects.push({
        id: `3d-design-video-${dir}-${slug}`,
        slug: `${dir}-video-${slug}`,
        title,
        description,
        client: 'Personal Projects',
        date: '2023 - Present',
        image: '/3d_print.jpg',
        categoryId: '3d-design',
        tags: [...tags, sourceTag, 'animation'],
        video: [`/3d_models/${dir}/${encodeURIComponent(file)}`],
      });
    }
  }

  return allProjects.filter((p) => !TEMPORARILY_HIDDEN_3D_SLUGS.includes(p.slug));
}
