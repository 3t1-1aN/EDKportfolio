'use client';

import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { motionEase } from '@/lib/motion-presets';
import { usePageEntrance } from '@/lib/page-entrance-context';

interface BlurRevealProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  blur?: string;
  trigger?: 'mount' | 'scroll';
}

export function BlurReveal({
  className,
  children,
  delay = 0,
  duration = 0.4,
  blur = '8px',
  trigger = 'scroll',
}: BlurRevealProps) {
  const spanRef = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(spanRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const { baseDelay, ready } = usePageEntrance();
  const scrollVisible = trigger === 'scroll' ? isInView : ready;
  const visible = prefersReducedMotion || scrollVisible;
  const effectiveDelay = (trigger === 'mount' ? baseDelay : 0) + delay;

  return (
    <motion.span
      ref={spanRef}
      initial={{ opacity: 0, filter: `blur(${blur})`, y: 10 }}
      animate={
        visible
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: `blur(${blur})`, y: 10 }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : effectiveDelay,
        ease: motionEase,
      }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  );
}

interface BlurRevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  startDelay?: number;
  stepDelay?: number;
  blur?: string;
  trigger?: 'mount' | 'scroll';
}

export function BlurRevealWords({
  text,
  className,
  wordClassName,
  startDelay = 0,
  stepDelay = 0.035,
  blur = '8px',
  trigger = 'mount',
}: BlurRevealWordsProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <BlurReveal
          key={`${word}-${index}`}
          trigger={trigger}
          delay={startDelay + index * stepDelay}
          blur={blur}
          className={cn('mr-[0.35em]', wordClassName)}
        >
          {word}
        </BlurReveal>
      ))}
    </span>
  );
}
