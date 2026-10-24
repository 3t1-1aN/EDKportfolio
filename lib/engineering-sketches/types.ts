export interface SketchPath {
  d: string;
  strokeWidth?: number;
  /** Stagger delay 0–0.4 — path starts drawing later in the draw phase */
  delay?: number;
  /** Secondary construction / hatching line (lighter stroke) */
  secondary?: boolean;
}

export interface EngineeringSketchArt {
  id: string;
  label: string;
  viewBox: string;
  paths: SketchPath[];
  /** Public SVG used in place of stroked paths. Keeps dashes, hatching, and labels. */
  asset?: string;
}

export interface SketchPlacement {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  centered?: boolean;
}

export interface SketchPhaseState {
  drawProgress: number;
  eraseProgress: number;
  visible: boolean;
}

export const MAX_CONCURRENT_SKETCHES = 2;

/**
 * Autoplay timing per sketch (ms).
 * Fade in and fade out match, and the idle gap matches the hold, so the two
 * slots (half a cycle apart) crossfade for `draw` ms without a blank gap.
 */
export const SKETCH_CYCLE_MS = {
  draw: 1400,
  hold: 1800,
  erase: 1400,
  gap: 1800,
} as const;

export function getSketchCycleMs() {
  const { draw, hold, erase, gap } = SKETCH_CYCLE_MS;
  return draw + hold + erase + gap;
}

export function getAutoplaySketchPhaseState(
  elapsedMs: number,
  staggerMs = 0
): SketchPhaseState {
  const { draw, hold, erase, gap } = SKETCH_CYCLE_MS;
  const cycleMs = draw + hold + erase + gap;
  const local = (((elapsedMs + staggerMs) % cycleMs) + cycleMs) % cycleMs;

  if (local < draw) {
    return {
      drawProgress: local / draw,
      eraseProgress: 0,
      visible: true,
    };
  }

  if (local < draw + hold) {
    return {
      drawProgress: 1,
      eraseProgress: 0,
      visible: true,
    };
  }

  if (local < draw + hold + erase) {
    return {
      drawProgress: 1,
      eraseProgress: (local - draw - hold) / erase,
      visible: true,
    };
  }

  return {
    drawProgress: 0,
    eraseProgress: 0,
    visible: false,
  };
}

export function getSlotCycleIndex(elapsedMs: number, staggerMs: number) {
  const cycleMs = getSketchCycleMs();
  return Math.floor((elapsedMs + staggerMs) / cycleMs);
}
