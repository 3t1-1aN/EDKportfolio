"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "@/lib/lenis-context";

interface ExpandableCardProps {
  title: string;
  /** Empty when the card has no thumbnail (e.g. GitHub-only software cards) */
  src?: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  /** Override collapsed card image size (e.g. "w-full aspect-[4/3] min-h-[280px]" for photography) */
  imageClassName?: string;
  /** Hide description text on collapsed card (e.g. for photography) */
  hideDescription?: boolean;
  /** Hide title/name on collapsed and expanded card (e.g. for photography) */
  hideTitle?: boolean;
  /** Show full image without cropping (e.g. portrait photography) */
  showImageFully?: boolean;
  audio?: string[];
  images?: string[]; // For projects with multiple images
  video?: string[]; // For projects with video (e.g. MP4)
  /** Public GitHub repo URL — shown under title/description and in expanded header */
  githubUrl?: string;
  /** Live/deployed project URL — shown under title/description and in expanded header */
  projectUrl?: string;
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  imageClassName,
  hideDescription,
  hideTitle,
  showImageFully,
  audio,
  images,
  video,
  githubUrl,
  projectUrl,
  ...props
}: ExpandableCardProps) {
  const hasHeroMedia =
    Boolean(video?.length) ||
    Boolean(images && images.length > 1) ||
    Boolean(src?.trim());

  const [active, setActive] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const activeRef = React.useRef(active);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const id = React.useId();
  const lenis = useLenis();

  activeRef.current = active;

  // Pause Lenis while open. Guard start() so React Strict Mode cleanup cannot
  // restart Lenis while the modal is still visible (that caused intermittent stuck scroll).
  React.useEffect(() => {
    if (!lenis) return;
    if (!active) return;
    lenis.stop();
    return () => {
      requestAnimationFrame(() => {
        if (!activeRef.current) lenis.start();
      });
    };
  }, [active, lenis]);

  // When the pointer is over a horizontal screenshot strip, forward vertical wheel
  // to the card — otherwise the strip can absorb the gesture and scrolling feels stuck.
  React.useEffect(() => {
    const card = cardRef.current;
    if (!active || !card) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("[data-scroll-horizontal]")) return;

      const maxScroll = card.scrollHeight - card.clientHeight;
      if (maxScroll <= 0) return;

      const next = card.scrollTop + event.deltaY;
      const clamped = Math.max(0, Math.min(next, maxScroll));
      if (clamped === card.scrollTop) return;

      card.scrollTop = clamped;
      event.preventDefault();
    };

    card.addEventListener("wheel", onWheel, { passive: false });
    return () => card.removeEventListener("wheel", onWheel);
  }, [active]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
        if (audioRef.current) audioRef.current.pause();
        if (videoRef.current) videoRef.current.pause();
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
        if (audioRef.current) audioRef.current.pause();
        if (videoRef.current) videoRef.current.pause();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Lock page scroll while the expanded card is open so wheel/touch events
  // stay inside the card instead of scrolling the page underneath.
  React.useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    const originalBodyOverflow = body.style.overflow;
    const originalHtmlOverflow = documentElement.style.overflow;
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    return () => {
      body.style.overflow = originalBodyOverflow;
      documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [active]);

  React.useEffect(() => {
    if (!audio || audio.length === 0) return;

    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);

    // Preload the audio
    audioElement.load();

    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  // Auto-play video when card expands (muted so browsers allow it; user can unmute via controls)
  React.useLayoutEffect(() => {
    if (!active || !video || video.length === 0) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => { });
    return () => {
      el.pause();
    };
  }, [active, video]);

  const handleImageClick = async (e: React.MouseEvent) => {
    if (!audio || audio.length === 0) return;

    e.stopPropagation();
    e.preventDefault();

    // Small delay to ensure ref is set
    await new Promise(resolve => setTimeout(resolve, 10));

    const audioElement = audioRef.current;
    if (!audioElement) {
      console.warn('Audio element not found');
      return;
    }

    try {
      // Ensure audio is loaded
      if (audioElement.readyState === 0) {
        audioElement.load();
        await new Promise(resolve => {
          const handler = () => {
            audioElement.removeEventListener('canplay', handler);
            resolve(undefined);
          };
          audioElement.addEventListener('canplay', handler);
        });
      }

      if (audioElement.paused) {
        await audioElement.play();
      } else {
        audioElement.pause();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <>
      {audio && audio.length > 0 && (
        <audio
          ref={audioRef}
          src={audio[0]}
          preload="auto"
          className="hidden"
        />
      )}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[90] pointer-events-none backdrop-blur-sm"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100vw",
                    height: "100vh",
                    minWidth: "100%",
                    minHeight: "100%",
                  }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {active && (
                <div
                  className={cn(
                    "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4 sm:p-8",
                  )}
                  data-lenis-prevent
                >
                  <motion.div
                    layoutId={`card-${title}-${id}`}
                    ref={cardRef}
                    data-lenis-prevent
                    className={cn(
                      "relative w-full min-h-0 max-h-[min(90vh,100dvh)] max-w-[850px] overflow-y-auto overscroll-contain rounded-2xl bg-zinc-50 shadow-sm [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] sm:rounded-3xl dark:bg-zinc-950 dark:shadow-none",
                      classNameExpanded,
                    )}
                    {...props}
                  >
                    {/* Floating close button — sticky so it stays visible while the card scrolls. */}
                    <div className="sticky top-0 z-30 h-0 flex justify-end pointer-events-none">
                      <motion.button
                        aria-label="Close card"
                        layoutId={`button-${title}-${id}`}
                        onClick={() => setActive(false)}
                        className="pointer-events-auto mr-3 mt-3 h-10 w-10 flex items-center justify-center rounded-full bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-sm text-neutral-700 dark:text-white/80 border border-gray-200/90 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 hover:text-black dark:hover:text-white transition-colors duration-300 focus:outline-none shadow-sm"
                      >
                        <motion.div
                          animate={{ rotate: active ? 45 : 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </motion.div>
                      </motion.button>
                    </div>
                    {hasHeroMedia && (
                      <motion.div layoutId={`image-${title}-${id}`} className="flex-shrink-0">
                        {video && video.length > 0 ? (
                          // Video: show first video in the media area; auto-plays when expanded (muted)
                          <div className="w-full bg-black">
                            <video
                              ref={videoRef}
                              controls
                              className="w-full max-h-[50vh] object-contain"
                              src={video[0]}
                              preload="auto"
                              muted
                              playsInline
                            >
                              Your browser does not support the video element.
                            </video>
                          </div>
                        ) : images && images.length > 1 ? (
                          // Multiple images: display in a responsive grid
                          <div className="grid grid-cols-2 gap-2 p-2 bg-zinc-100 dark:bg-zinc-900 max-h-[600px] overflow-y-auto">
                            {images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`${title} - Image ${idx + 1}`}
                                className="w-full h-48 sm:h-64 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        ) : (
                          // Single image: display normally
                          <div className="relative group/image">
                            <img
                              src={src}
                              alt={title}
                              onClick={handleImageClick}
                              className={cn(
                                showImageFully
                                  ? "w-full max-h-[72vh] object-contain bg-zinc-100 dark:bg-zinc-900"
                                  : "w-full h-64 sm:h-80 object-cover object-center",
                                audio && audio.length > 0 && "cursor-pointer hover:opacity-90 transition-opacity"
                              )}
                            />
                            {audio && audio.length > 0 && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/image:opacity-100 transition-opacity">
                                <div className="bg-black/60 dark:bg-white/60 rounded-full p-4">
                                  {isPlaying ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 24 24"
                                      fill="white"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect x="6" y="4" width="4" height="16" />
                                      <rect x="14" y="4" width="4" height="16" />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="32"
                                      height="32"
                                      viewBox="0 0 24 24"
                                      fill="white"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                    {/* Visible audio player when expanded (music cards) - sticky so it stays in view while content below scrolls */}
                    {active && audio && audio.length > 0 && !video?.length && (
                      <div className="sticky top-0 z-10 px-4 sm:px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                        <audio
                          controls
                          className="w-full h-10"
                          src={audio[0]}
                          preload="metadata"
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="p-6 sm:p-8 pr-16 sm:pr-20">
                        {!hideTitle && (
                          <motion.h3
                            layoutId={`title-${title}-${id}`}
                            className="font-semibold text-black dark:text-white text-4xl sm:text-4xl"
                          >
                            {title}
                          </motion.h3>
                        )}
                        {!hideDescription && (
                          <motion.p
                            layoutId={`description-${description}-${id}`}
                            className="text-zinc-500 dark:text-zinc-400 text-lg mt-2"
                          >
                            {description}
                          </motion.p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                          {projectUrl && (
                            <a
                              href={projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white underline-offset-2 hover:underline"
                              data-cursor-hover
                            >
                              View live project
                              <span aria-hidden className="text-zinc-400">↗</span>
                            </a>
                          )}
                          {githubUrl && (
                            <a
                              href={githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white underline-offset-2 hover:underline"
                              data-cursor-hover
                            >
                              View on GitHub
                              <span aria-hidden className="text-zinc-400">↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="px-6 sm:px-8 pb-8">
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-zinc-500 dark:text-zinc-400 text-base flex flex-col items-start gap-4"
                        >
                          {children}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "p-3 flex flex-col justify-between items-center bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 rounded-2xl cursor-pointer border border-gray-200/70 dark:border-zinc-900 group",
          className,
        )}
      >
        <div className={cn("flex flex-col", hasHeroMedia ? "gap-4" : "gap-0")}>
          {hasHeroMedia && (
            <motion.div layoutId={`image-${title}-${id}`} className={cn("relative", imageClassName && "w-full")}>
              <img
                src={src}
                alt={title}
                className={cn(
                  showImageFully
                    ? "rounded-lg w-full h-full object-contain bg-zinc-100 dark:bg-zinc-900"
                    : "rounded-lg object-cover object-center",
                  imageClassName ?? "w-64 h-56"
                )}
              />
            </motion.div>
          )}
          <div className={cn("flex justify-between items-center", !hasHeroMedia && "w-full")}>
            <div className="flex flex-col min-w-0">
              {!hideTitle && (
                <motion.h3
                  layoutId={`title-${title}-${id}`}
                  className="text-black dark:text-white md:text-left font-semibold"
                >
                  {title}
                </motion.h3>
              )}
              {!hideDescription && (
                <motion.p
                  layoutId={`description-${description}-${id}`}
                  className="text-zinc-500 dark:text-zinc-400 md:text-left text-sm font-medium line-clamp-3 mt-1"
                >
                  {description}
                </motion.p>
              )}
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white underline-offset-2 hover:underline truncate text-left mt-1 max-w-[calc(100%-2.5rem)]"
                  data-cursor-hover
                >
                  {projectUrl.replace(/^https?:\/\//, '')}
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white underline-offset-2 hover:underline truncate text-left mt-1 max-w-[calc(100%-2.5rem)]"
                  data-cursor-hover
                >
                  {githubUrl.replace(/^https:\/\//, '')}
                </a>
              )}
            </div>
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className={cn(
                "h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300  focus:outline-none",
                className,
              )}
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
