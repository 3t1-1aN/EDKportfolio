"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6} C -${312 - i * 5 * position} ${216 - i * 6} ${400 - i * 5 * position} ${500 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.05,
    opacity: 0.2 + i * 0.02,
  }));

  return (
    <div className={cn("w-full relative", className)}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg
          width="100%"
          height="100%"
          viewBox="-50 50 696 316"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          style={{ overflow: "visible" }}
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="white"
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
              initial={{ pathLength: 0.3 }}
              animate={{ pathLength: [0.3, 1, 0.3] }}
              transition={{
                duration: 20 + (path.id * 7919) % 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (path.id * 317) % 8,
              }}
            />
          ))}
        </svg>
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
