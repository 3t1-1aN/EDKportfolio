'use client';

import ScrollAnimation from '@/components/ScrollAnimation';
import Link from 'next/link';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { Project } from '@/lib/data';

interface CategoryProjectsClientProps {
  projects: Project[];
  categoryId: string;
}

function isProjectVisible(project: Project): boolean {
  return (
    Boolean(project.githubUrl) ||
    Boolean(project.image?.trim()) ||
    Boolean(project.video?.length) ||
    Boolean(project.images?.length) ||
    project.softwareVisibility === 'private'
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isPhotography = project.categoryId === 'photography';
  const isGitHubSoftware =
    project.categoryId === 'software-projects' && Boolean(project.githubUrl);
  /** Header already shows description; skip duplicate block under tags */
  const showExpandedDescriptionSection =
    !isGitHubSoftware && project.softwareVisibility !== 'private';

  return (
    <ExpandableCard
      title={project.title}
      description={project.description}
      src={project.image ?? ''}
      audio={project.audio}
      images={project.images}
      video={project.video}
      githubUrl={project.githubUrl}
      classNameExpanded={
        isPhotography
          ? 'max-w-[min(96vw,1200px)] [&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium'
          : '[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium'
      }
      imageClassName={isPhotography ? 'w-full h-[220px] sm:h-[280px]' : undefined}
      hideDescription={isPhotography}
      hideTitle={isPhotography}
      showImageFully={isPhotography}
    >
      {isPhotography ? (
        <>
          {project.date && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Date</h4>
              <p>{project.date}</p>
            </div>
          )}
          <div>
            <h4 className="text-lg font-semibold mb-2">Location</h4>
            <p className={project.location ? '' : 'text-zinc-400 dark:text-zinc-500 italic'}>
              {project.location ||
                'Add location on this project in lib/projects/photography.ts'}
            </p>
          </div>
        </>
      ) : (
        <>
          {project.client && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Client</h4>
              <p>{project.client}</p>
            </div>
          )}
          {project.date && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Date</h4>
              <p>{project.date}</p>
            </div>
          )}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.audio &&
            project.audio.length > 0 &&
            project.categoryId !== 'music-composition' && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Audio Tracks</h4>
                <div className="space-y-4">
                  {project.audio.map((audioFile, index) => {
                    const fileName =
                      audioFile.split('/').pop()?.replace(/\.(mp3|wav)$/i, '') ||
                      `Track ${index + 1}`;
                    return (
                      <div key={index} className="space-y-2">
                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                          {fileName.replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                        <audio controls className="w-full h-10" src={audioFile}>
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          {project.video && project.video.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Video</h4>
              <div className="space-y-4">
                {project.video.map((videoFile, index) => (
                  <video
                    key={index}
                    controls
                    className="w-full rounded-lg bg-black"
                    src={videoFile}
                    preload="metadata"
                  >
                    Your browser does not support the video element.
                  </video>
                ))}
              </div>
            </div>
          )}
          {showExpandedDescriptionSection && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p>{project.description}</p>
            </div>
          )}
        </>
      )}
    </ExpandableCard>
  );
}

const subsectionTitleClass =
  'text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white mb-2';
const subsectionDescClass =
  'text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl mb-8';

export default function CategoryProjectsClient({
  projects,
  categoryId,
}: CategoryProjectsClientProps) {
  const visible = projects.filter(isProjectVisible);

  if (visible.length === 0) {
    return (
      <ScrollAnimation>
        <div className="text-center py-24">
          <p className="text-lg text-grey-600 dark:text-grey-400 mb-4">
            No projects in this category yet.
          </p>
          <Link
            href="/projects"
            className="text-sm uppercase tracking-wider border-b-2 border-black dark:border-white pb-2 hover:opacity-70 transition-opacity inline-block"
            data-cursor-hover
          >
            Back to Categories
          </Link>
        </div>
      </ScrollAnimation>
    );
  }

  const isSoftware = categoryId === 'software-projects';
  const publicSoftware = visible.filter((p) => p.softwareVisibility !== 'private');
  const privateSoftware = visible.filter((p) => p.softwareVisibility === 'private');

  const gridClass =
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16 sm:pb-20';

  if (isSoftware) {
    return (
      <ScrollAnimation>
        <div className="relative max-w-7xl mx-auto">
          <div
            className="absolute -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 z-0 rounded-3xl bg-white/[0.06] dark:bg-white/[0.04] backdrop-blur-sm border border-white/10 dark:border-white/5"
            style={{ top: '-2rem', bottom: '14rem' }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col gap-20 sm:gap-24 pb-64 sm:pb-80 md:pb-96 lg:pb-[32rem]">
            <section aria-labelledby="software-public-heading">
              <h2 id="software-public-heading" className={subsectionTitleClass}>
                Public
              </h2>
              <p className={subsectionDescClass}>
                Open-source and public GitHub repositories you can browse and clone.
              </p>
              {publicSoftware.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  No public projects listed.
                </p>
              ) : (
                <div className={gridClass}>
                  {publicSoftware.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </section>

            <section aria-labelledby="software-private-heading">
              <h2 id="software-private-heading" className={subsectionTitleClass}>
                Private
              </h2>
              <p className={subsectionDescClass}>
                Work in private repos or under NDA — high-level summaries only.
              </p>
              {privateSoftware.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm italic">
                  Add entries in{' '}
                  <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded not-italic">
                    lib/software-projects.ts
                  </code>{' '}
                  →{' '}
                  <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded not-italic">
                    PRIVATE_SOFTWARE_PROJECTS
                  </code>
                  .
                </p>
              ) : (
                <div className={gridClass}>
                  {privateSoftware.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </ScrollAnimation>
    );
  }

  return (
    <ScrollAnimation>
      <div className="relative max-w-7xl mx-auto">
        <div
          className="absolute -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 z-0 rounded-3xl bg-white/[0.06] dark:bg-white/[0.04] backdrop-blur-sm border border-white/10 dark:border-white/5"
          style={{ top: '-2rem', bottom: '14rem' }}
          aria-hidden
        />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-64 sm:pb-80 md:pb-96 lg:pb-[32rem]">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </ScrollAnimation>
  );
}
