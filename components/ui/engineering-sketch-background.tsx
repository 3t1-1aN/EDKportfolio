'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { EngineeringSketch } from '@/components/ui/engineering-sketch';
import {
  MAX_CONCURRENT_SKETCHES,
  engineeringSketches,
  getAutoplaySketchPhaseState,
  getSketchCycleMs,
  getSlotCycleIndex,
  pickSlotContent,
  sketchPlacements,
} from '@/lib/engineering-sketches';

/** Set to true once frosted-glass backdrop blur is verified working */
export const SKETCHES_ENABLED = true;

const SLOT_OFFSETS = Array.from({ length: MAX_CONCURRENT_SKETCHES }, (_, i) =>
  Math.round((getSketchCycleMs() / MAX_CONCURRENT_SKETCHES) * i)
);

function SketchSlot({
  slotId,
  staggerMs,
  elapsedMs,
  avoid,
}: {
  slotId: number;
  staggerMs: number;
  elapsedMs: number;
  avoid?: { sketchIndex: number; placementIndex: number };
}) {
  const cycleIndex = getSlotCycleIndex(elapsedMs, staggerMs);
  const phase = getAutoplaySketchPhaseState(elapsedMs, staggerMs);

  const { sketch, placement } = useMemo(
    () =>
      pickSlotContent(slotId, cycleIndex, {
        sketchIndex: avoid?.sketchIndex,
        placementIndex: avoid?.placementIndex,
      }),
    [slotId, cycleIndex, avoid?.sketchIndex, avoid?.placementIndex]
  );

  const active =
    phase.visible || phase.drawProgress > 0 || phase.eraseProgress > 0;

  const { top, bottom, left, right, width, height, centered } = placement;

  return (
    <div
      className={`engineering-sketch-slot absolute max-lg:opacity-90${centered ? ' engineering-sketch-slot--center' : ''}`}
      style={{
        top,
        bottom,
        left: centered ? (left ?? '50%') : left,
        right,
        width,
        height,
        opacity: active ? 1 : 0,
        pointerEvents: 'none',
      }}
    >
      <EngineeringSketch
        sketch={sketch}
        drawProgress={phase.drawProgress}
        eraseProgress={phase.eraseProgress}
      />
    </div>
  );
}

export function EngineeringSketchBackground() {
  const prefersReducedMotion = useReducedMotion();
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);

  const slot0Cycle = getSlotCycleIndex(elapsedMs, SLOT_OFFSETS[0]);
  const slot1Cycle = getSlotCycleIndex(elapsedMs, SLOT_OFFSETS[1]);

  const slot0Content = useMemo(
    () => pickSlotContent(0, slot0Cycle),
    [slot0Cycle]
  );
  const slot1Content = useMemo(
    () =>
      pickSlotContent(1, slot1Cycle, {
        sketchIndex: slot0Content.sketchIndex,
        placementIndex: slot0Content.placementIndex,
      }),
    [slot1Cycle, slot0Content.sketchIndex, slot0Content.placementIndex]
  );

  useEffect(() => {
    const host = document.createElement('div');
    host.className = 'engineering-sketch-layer';
    host.setAttribute('aria-hidden', 'true');

    const backdrop = document.body.querySelector('[data-site-backdrop]');
    if (backdrop) {
      backdrop.appendChild(host);
    } else {
      document.body.appendChild(host);
    }

    setPortalHost(host);
    return () => {
      host.remove();
      setPortalHost(null);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      setElapsedMs(now - start);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  if (!SKETCHES_ENABLED || !portalHost) {
    return null;
  }

  if (prefersReducedMotion) {
    const sketch = engineeringSketches[0];
    const placement = sketchPlacements[0];
    return createPortal(
      <div
        className="absolute opacity-40"
        style={{
          top: placement.top,
          left: placement.left,
          width: placement.width,
          height: placement.height,
        }}
      >
        <EngineeringSketch sketch={sketch} drawProgress={0.5} eraseProgress={0} />
      </div>,
      portalHost
    );
  }

  return createPortal(
    <>
      <SketchSlot
        slotId={0}
        staggerMs={SLOT_OFFSETS[0]}
        elapsedMs={elapsedMs}
      />
      <SketchSlot
        slotId={1}
        staggerMs={SLOT_OFFSETS[1]}
        elapsedMs={elapsedMs}
        avoid={{
          sketchIndex: slot0Content.sketchIndex,
          placementIndex: slot0Content.placementIndex,
        }}
      />
    </>,
    portalHost
  );
}
