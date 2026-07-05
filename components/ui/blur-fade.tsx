'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  type UseInViewOptions,
  type Variants,
} from 'framer-motion';
import { motionEase } from '@/lib/motion-presets';

type MarginType = UseInViewOptions['margin'];

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.55,
  delay = 0,
  yOffset = 14,
  inView = false,
  inViewMargin = '-80px',
  blur = '4px',
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const prefersReducedMotion = useReducedMotion();
  const isInView = prefersReducedMotion || !inView || inViewResult;

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={combinedVariants}
      transition={{
        delay: prefersReducedMotion ? 0 : delay / 1000,
        duration: prefersReducedMotion ? 0 : duration,
        ease: motionEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
