'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { EngineeringSketchArt } from '@/lib/engineering-sketches';

interface EngineeringSketchProps {
  sketch: EngineeringSketchArt;
  drawProgress: number;
  eraseProgress: number;
  className?: string;
  style?: React.CSSProperties;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function EngineeringSketch({
  sketch,
  drawProgress,
  eraseProgress,
  className,
  style,
}: EngineeringSketchProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [lengths, setLengths] = useState<number[]>(() =>
    sketch.paths.map(() => 0)
  );
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const next = sketch.paths.map((_, index) => {
      const el = pathRefs.current[index];
      return el?.getTotalLength() ?? 0;
    });
    setLengths(next);
    setReady(next.every((len) => len > 0));
  }, [sketch]);

  return (
    <svg
      viewBox={sketch.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('engineering-sketch-svg h-full w-full overflow-visible', className)}
      style={{
        ...style,
        visibility: ready ? 'visible' : 'hidden',
      }}
      aria-hidden
    >
      <g>
        {sketch.paths.map((path, index) => {
          const length = lengths[index] ?? 0;
          const delay = path.delay ?? 0;
          const staggerDraw = clamp((drawProgress - delay) / (1 - delay * 0.85), 0, 1);
          const pathDraw = prefersReducedMotion ? 0.5 : staggerDraw;
          const pathErase = prefersReducedMotion ? 0 : eraseProgress;

          // Same stroke-dash logic for draw-in and erase-out
          const visibleLength = length * pathDraw * (1 - pathErase);
          const dashOffset = length > 0 ? length - visibleLength : 9999;

          return (
            <path
              key={`${sketch.id}-${index}`}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={path.d}
              stroke={
                path.secondary
                  ? 'var(--sketch-stroke-secondary)'
                  : 'var(--sketch-stroke)'
              }
              strokeWidth={path.strokeWidth ?? (path.secondary ? 0.65 : 1.25)}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={length > 0 ? length : 1}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </g>
    </svg>
  );
}
