// Server-only file for getting all projects including dynamically generated music, mechanics, and photography
import { Project, projects } from './data';
import { getMusicProjects } from './music-projects';
import { getMechanicsProjects } from './mechanics-projects';
import { getPhotographyProjects } from './photography-projects';

/**
 * Gets all projects including dynamically generated music, mechanics, and photography.
 * This function can only be used in server components or API routes.
 */
export async function getAllProjects(): Promise<Project[]> {
  const [musicProjects, mechanicsProjects, photographyProjects] = await Promise.all([
    getMusicProjects(),
    getMechanicsProjects(),
    getPhotographyProjects(),
  ]);

  // Filter out static entries that are replaced by dynamic folder content (music, photography, generic DIY)
  const staticProjects = projects.filter(
    (p) =>
      p.categoryId !== 'music-composition' &&
      p.categoryId !== 'photography' &&
      p.slug !== 'diy-projects'
  );

  return [...staticProjects, ...musicProjects, ...mechanicsProjects, ...photographyProjects];
}
