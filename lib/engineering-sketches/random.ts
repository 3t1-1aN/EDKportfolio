import { engineeringSketches } from './sketches';
import { sketchPlacements } from './placements';

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickSlotContent(
  slotId: number,
  cycleIndex: number,
  avoid?: { sketchIndex?: number; placementIndex?: number }
) {
  const rng = mulberry32(slotId * 9973 + cycleIndex * 7919 + 1);
  const sketchCount = engineeringSketches.length;
  const placementCount = sketchPlacements.length;

  let sketchIndex = Math.floor(rng() * sketchCount);
  if (sketchIndex === avoid?.sketchIndex && sketchCount > 1) {
    sketchIndex = (sketchIndex + 1 + Math.floor(rng() * (sketchCount - 1))) % sketchCount;
  }

  let placementIndex = Math.floor(rng() * placementCount);
  if (placementIndex === avoid?.placementIndex && placementCount > 1) {
    placementIndex = (placementIndex + 1 + Math.floor(rng() * (placementCount - 1))) % placementCount;
  }

  return {
    sketchIndex,
    placementIndex,
    sketch: engineeringSketches[sketchIndex],
    placement: sketchPlacements[placementIndex],
  };
}
