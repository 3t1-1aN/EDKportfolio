// Server-only file for getting all projects including dynamically generated music, mechanics, photography, and 3D design
import { Project, projects } from './data';
import { getMusicProjects } from './music-projects';
import { getMechanicsProjects } from './mechanics-projects';
import { getPhotographyProjects } from './photography-projects';
import { get3dDesignProjects } from './3d-design-projects';

/**
 * Gets all projects including dynamically generated music, mechanics, photography, and 3D design.
 * This function can only be used in server components or API routes.
 */
export async function getAllProjects(): Promise<Project[]> {
  const [musicProjects, mechanicsProjects, photographyProjects, threeDesignProjects] =
    await Promise.all([
      getMusicProjects(),
      getMechanicsProjects(),
      getPhotographyProjects(),
      get3dDesignProjects(),
    ]);

  // Filter out static entries replaced by dynamic folder content (music, photography, DIY, 3D design)
  const staticProjects = projects.filter(
    (p) =>
      p.categoryId !== 'music-composition' &&
      p.categoryId !== 'photography' &&
      p.slug !== 'diy-projects' &&
      p.categoryId !== '3d-design'
  );

  return [
    ...staticProjects,
    ...musicProjects,
    ...mechanicsProjects,
    ...photographyProjects,
    ...threeDesignProjects,
  ];
}
