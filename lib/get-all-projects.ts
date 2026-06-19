import { Project, projects } from './data';
import {
  mechanicsProjects,
  musicProjects,
  photographyProjects,
  threeDDesignProjects,
} from './projects';
import { getSoftwareProjects } from './software-projects';

/**
 * All gallery projects (music, mechanics, photography, 3D, software).
 * Software list is still loaded from GitHub metadata.
 */
export async function getAllProjects(): Promise<Project[]> {
  const softwareProjects = await getSoftwareProjects();

  const staticProjects = projects.filter(
    (p) =>
      p.categoryId !== 'music-composition' &&
      p.categoryId !== 'photography' &&
      p.slug !== 'diy-projects' &&
      p.categoryId !== '3d-design' &&
      p.categoryId !== 'software-projects'
  );

  return [
    ...staticProjects,
    ...musicProjects,
    ...mechanicsProjects,
    ...photographyProjects,
    ...threeDDesignProjects,
    ...softwareProjects,
  ];
}
