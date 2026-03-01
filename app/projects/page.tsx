import { categories } from '@/lib/data';
import { getAllProjects } from '@/lib/get-all-projects';
import ProjectsPageClient from './ProjectsPageClient';

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    projectCount: allProjects.filter((p) => p.categoryId === category.id).length,
  }));

  return <ProjectsPageClient categoriesWithCounts={categoriesWithCounts} />;
}
