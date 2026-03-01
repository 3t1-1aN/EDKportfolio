"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
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
  audio?: string[];
  images?: string[]; // For projects with multiple images
  video?: string[]; // For projects with video (e.g. MP4)
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
  audio,
  images,
  video,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const id = React.useId();

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
    el.play().catch(() => {});
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
                    "fixed inset-0 flex items-center justify-center z-[100] p-4 sm:p-8 before:pointer-events-none",
                  )}
                >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-[850px] max-h-[90vh] flex flex-col overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] rounded-2xl sm:rounded-3xl bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 relative",
                classNameExpanded,
              )}
              {...props}
            >
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
                        "w-full h-64 sm:h-80 object-cover object-center",
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
              {/* Visible audio player when expanded (music cards) - always shown so user can play without scrolling */}
              {active && audio && audio.length > 0 && !video?.length && (
                <div className="flex-shrink-0 px-4 sm:px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
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
              <div className="flex flex-col flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
                <div className="flex justify-between items-start p-6 sm:p-8 flex-shrink-0">
                  <div>
                    {!hideDescription && (
                      <motion.p
                        layoutId={`description-${description}-${id}`}
                        className="text-zinc-500 dark:text-zinc-400 text-lg"
                      >
                        {description}
                      </motion.p>
                    )}
                    {!hideTitle && (
                      <motion.h3
                        layoutId={`title-${title}-${id}`}
                        className="font-semibold text-black dark:text-white text-4xl sm:text-4xl mt-0.5"
                      >
                        {title}
                      </motion.h3>
                    )}
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none"
                    onClick={() => setActive(false)}
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
        <div className="flex gap-4 flex-col">
          <motion.div layoutId={`image-${title}-${id}`} className={cn("relative", imageClassName && "w-full")}>
            <img
              src={src}
              alt={title}
              className={cn(
                "rounded-lg object-cover object-center",
                imageClassName ?? "w-64 h-56"
              )}
            />
          </motion.div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col min-w-0">
              {!hideDescription && (
                <motion.p
                  layoutId={`description-${description}-${id}`}
                  className="text-zinc-500 dark:text-zinc-400 md:text-left text-sm font-medium line-clamp-3"
                >
                  {description}
                </motion.p>
              )}
              {!hideTitle && (
                <motion.h3
                  layoutId={`title-${title}-${id}`}
                  className="text-black dark:text-white md:text-left font-semibold"
                >
                  {title}
                </motion.h3>
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
