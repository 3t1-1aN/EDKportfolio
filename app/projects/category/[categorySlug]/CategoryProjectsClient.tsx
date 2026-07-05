'use client';

import ScrollAnimation from '@/components/ScrollAnimation';
import Link from 'next/link';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { FrostedCard, FrostedPanel } from '@/components/ui/frosted-glass';
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
    project.softwareVisibility === 'private' ||
    project.softwareVisibility === 'major'
  );
}

function ProjectCard({
  project,
  variant = 'default',
}: {
  project: Project;
  variant?: 'default' | 'major';
}) {
  const isPhotography = project.categoryId === 'photography';
  const isGitHubSoftware =
    project.categoryId === 'software-projects' && Boolean(project.githubUrl);
  const isMajor = variant === 'major';
  /** Header already shows description; skip duplicate block under tags
   *  (GitHub list cards and Private summaries already surface description) */
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
      projectUrl={project.projectUrl}
      classNameExpanded={
        isPhotography
          ? 'max-w-[min(96vw,1200px)] [&_h4]:text-white [&_h4]:font-medium'
          : isMajor
            ? 'max-w-[min(96vw,1100px)] [&_h4]:text-white [&_h4]:font-medium'
            : '[&_h4]:text-white [&_h4]:font-medium'
      }
      className={isMajor ? 'w-full items-stretch' : undefined}
      imageClassName={
        isPhotography
          ? 'w-full h-[220px] sm:h-[280px]'
          : isMajor
            ? 'w-full aspect-[16/10] object-cover'
            : undefined
      }
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
                    className="frosted-pill px-3 py-1 rounded-full text-sm text-gray-200"
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
          {project.video && project.video.length > 0 && !isMajor && (
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
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-2">Screenshots</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                Scroll sideways to browse. Each shot is scaled to fit the same frame
                (aspect ratio kept). Click one to open the full-resolution image.
              </p>
              <div
                className="-mx-6 sm:-mx-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-3 [scrollbar-width:thin] sm:px-8"
                data-lenis-prevent
                data-scroll-horizontal
              >
                {project.screenshots.map((shot, index) => (
                  <FrostedCard
                    key={index}
                    radiusClass="rounded-lg"
                    className="inline-flex max-w-[min(78vw,640px)] shrink-0 snap-start"
                  >
                    <a
                      href={shot}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center p-1.5"
                      data-cursor-hover
                    >
                    <img
                      src={shot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="block h-auto w-auto max-h-[min(360px,40vh)] max-w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                    </a>
                  </FrostedCard>
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
  const majorSoftware = visible.filter((p) => p.softwareVisibility === 'major');
  const publicSoftware = visible.filter(
    (p) => p.softwareVisibility !== 'private' && p.softwareVisibility !== 'major'
  );
  const privateSoftware = visible.filter((p) => p.softwareVisibility === 'private');

  const gridClass =
    'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16 sm:pb-20';
  const majorGridClass =
    'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pb-16 sm:pb-20';

  if (isSoftware) {
    return (
      <ScrollAnimation>
        <div className="relative max-w-7xl mx-auto">
          <FrostedPanel
            className="absolute -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 z-0 rounded-3xl pointer-events-none"
            style={{ top: '-2rem', bottom: '14rem' }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col gap-20 sm:gap-24 pb-64 sm:pb-80 md:pb-96 lg:pb-[32rem]">
            <section aria-labelledby="software-major-heading">
              <h2 id="software-major-heading" className={subsectionTitleClass}>
                Major Projects
              </h2>
              <p className={subsectionDescClass}>
                Larger webapps, mobile apps, and websites. Expand a card to see a
                demo video, description, and a link to the live project when
                available.
              </p>
              {majorSoftware.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm italic">
                  Add entries in{' '}
                  <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded not-italic">
                    lib/software-projects.ts
                  </code>{' '}
                  →{' '}
                  <code className="text-xs bg-zinc-200/80 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded not-italic">
                    MAJOR_SOFTWARE_PROJECTS
                  </code>
                  .
                </p>
              ) : (
                <div className={majorGridClass}>
                  {majorSoftware.map((project) => (
                    <ProjectCard key={project.id} project={project} variant="major" />
                  ))}
                </div>
              )}
            </section>

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
        <FrostedPanel
          className="absolute -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 z-0 rounded-3xl pointer-events-none"
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
