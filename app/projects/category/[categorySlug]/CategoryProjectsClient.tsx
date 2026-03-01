'use client';

import ScrollAnimation from '@/components/ScrollAnimation';
import Link from 'next/link';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { Project } from '@/lib/data';

interface CategoryProjectsClientProps {
  projects: Project[];
}

export default function CategoryProjectsClient({ projects }: CategoryProjectsClientProps) {
  if (projects.length === 0) {
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

  return (
    <ScrollAnimation>
      <div className="relative max-w-7xl mx-auto">
        {/* Frosted rectangle: 2rem above first row, 2rem below last row (grid has 16rem bottom padding so bottom: 14rem) */}
        <div
          className="absolute -left-6 sm:-left-8 md:-left-10 -right-6 sm:-right-8 md:-right-10 z-0 rounded-3xl bg-white/[0.06] dark:bg-white/[0.04] backdrop-blur-sm border border-white/10 dark:border-white/5"
          style={{ top: '-2rem', bottom: '14rem' }}
          aria-hidden
        />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-64 sm:pb-80 md:pb-96 lg:pb-[32rem]">
          {projects
          .filter((project) => project.image) // Filter out projects without images
          .map((project) => {
            const isPhotography = project.categoryId === 'photography';
            return (
              <ExpandableCard
                key={project.id}
                title={project.title}
                description={project.description}
                src={project.image}
                audio={project.audio}
                images={project.images}
                video={project.video}
                classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium"
                imageClassName={isPhotography ? 'w-full aspect-[4/3] min-h-[200px] sm:min-h-[260px]' : undefined}
                hideDescription={isPhotography}
                hideTitle={isPhotography}
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
                        {project.location || 'Add location in lib/dynamic-project-descriptions.ts → photographyProjectLocations'}
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
                    {project.audio && project.audio.length > 0 && project.categoryId !== 'music-composition' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Audio Tracks</h4>
                        <div className="space-y-4">
                          {project.audio.map((audioFile, index) => {
                            const fileName = audioFile.split('/').pop()?.replace(/\.(mp3|wav)$/i, '') || `Track ${index + 1}`;
                            return (
                              <div key={index} className="space-y-2">
                                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                                  {fileName.replace(/\b\w/g, l => l.toUpperCase())}
                                </p>
                                <audio
                                  controls
                                  className="w-full h-10"
                                  src={audioFile}
                                >
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
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Description</h4>
                      <p>{project.description}</p>
                    </div>
                  </>
                )}
              </ExpandableCard>
            );
          })}
        </div>
      </div>
    </ScrollAnimation>
  );
}
