export const motionEase = [0.22, 1, 0.36, 1] as const;

export const pageEntrance = {
  duration: 0.72,
  readyMs: 720,
  contentBaseDelay: 0.18,
  from: { opacity: 0, blur: '10px', y: 12 },
} as const;

export const revealTiming = {
  titleWordStep: 0.035,
  titleWordDuration: 0.4,
  bodyWordStepMs: 18,
  bodyWordDuration: 0.28,
  labelDuration: 0.35,
} as const;

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** When the next word in a title stream should start (continuous, no pause). */
export function titleSequenceEnd(wordCount: number, base = pageEntrance.contentBaseDelay) {
  if (wordCount <= 0) return base;
  return base + wordCount * revealTiming.titleWordStep;
}

/** When the next word in a body stream should start (continuous, no pause). */
export function bodySequenceEnd(wordCount: number, startAt: number) {
  if (wordCount <= 0) return startAt;
  return startAt + wordCount * (revealTiming.bodyWordStepMs / 1000);
}

/** When the next word in a BlurText heading stream should start (continuous, no pause). */
export function headingSequenceEnd(wordCount: number, startAt: number) {
  if (wordCount <= 0) return startAt;
  return startAt + wordCount * (blurTextPresets.heading.delay / 1000);
}

/** Total time through a standard section header (label → title → description). */
export function sectionHeaderSequenceEnd(
  title: string,
  description?: string,
  options?: { hasLabel?: boolean }
) {
  let cursor = pageEntrance.contentBaseDelay;

  if (options?.hasLabel) {
    cursor += revealTiming.labelDuration;
  }

  cursor = titleSequenceEnd(countWords(title), cursor);

  if (description) {
    cursor = bodySequenceEnd(countWords(description), cursor);
  }

  return cursor;
}

export const blurTextPresets = {
  heading: {
    delay: 24,
    stepDuration: 0.32,
    animationFrom: { filter: 'blur(8px)', opacity: 0, y: 10 },
    animationTo: [{ filter: 'blur(0px)', opacity: 1, y: 0 }],
  },
  body: {
    delay: 18,
    stepDuration: 0.28,
    animationFrom: { filter: 'blur(5px)', opacity: 0, y: 6 },
    animationTo: [{ filter: 'blur(0px)', opacity: 1, y: 0 }],
  },
} as const;

export const heroFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: motionEase },
  }),
};

export const panelReveal = {
  durationMs: 700,
  translateY: '1.25rem',
  ease: motionEase,
};
