"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundCellsProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundCells = ({ children, className }: BackgroundCellsProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <BackgroundCellCore />
      {children && (
        <div className="relative z-50 mt-40 pointer-events-none select-none">
          {children}
        </div>
      )}
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const basePatternRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (basePatternRef.current) {
      // Use the base Pattern element's bounding rect - this is the same coordinate system as the cells
      // Both patterns are positioned with absolute inset-0, so they share the same coordinate system
      const patternRect = basePatternRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the base Pattern element's top-left corner
      // This matches the coordinate system used by the cells for hover highlighting
      const x = event.clientX - patternRect.left;
      const y = event.clientY - patternRect.top;
      
      setMousePosition({ x, y });
    }
  };

  const size = 300;
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="h-full w-full absolute inset-0 pointer-events-auto"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="absolute h-full w-full inset-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-40 bg-slate-950 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <Pattern ref={basePatternRef} className="opacity-[0.5]" cellClassName="border-neutral-700" />
        <div
          ref={patternRef}
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            maskPosition: `${mousePosition.x - size / 2}px ${
              mousePosition.y - size / 2
            }px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-blue-600 relative z-[100]" />
        </div>
      </div>
    </div>
  );
};

interface PatternProps {
  className?: string;
  cellClassName?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const Pattern = React.forwardRef<HTMLDivElement, PatternProps>(({ className, cellClassName }, ref) => {
  const x = new Array(47).fill(0);
  const y = new Array(30).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null);

  return (
    <div ref={ref} className={cn("flex flex-row relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col relative z-20 border-b"
        >
          {row.map((column, colIdx) => {
            const controls = useAnimation();

            useEffect(() => {
              if (clickedCell) {
                const distance = Math.sqrt(
                  Math.pow(clickedCell[0] - rowIdx, 2) +
                    Math.pow(clickedCell[1] - colIdx, 2)
                );
                controls.start({
                  opacity: [0, 1 - distance * 0.1, 0],
                  transition: { duration: distance * 0.2 },
                });
              }
            }, [clickedCell, controls, rowIdx, colIdx]);

            return (
              <div
                key={`matrix-col-${colIdx}`}
                className={cn(
                  "bg-transparent border-l border-b border-neutral-600",
                  cellClassName
                )}
                onClick={() => setClickedCell([rowIdx, colIdx])}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: [0, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "backOut",
                  }}
                  animate={controls}
                  className="bg-[rgba(14,165,233,0.3)] h-12 w-12"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

Pattern.displayName = "Pattern";

