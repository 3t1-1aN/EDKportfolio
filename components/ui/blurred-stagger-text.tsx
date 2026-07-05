'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurredStaggerProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animateBy?: 'words' | 'letters';
  blur?: string;
  stagger?: number;
}

export function BlurredStagger({
  text,
  className,
  as: Tag = 'h2',
  animateBy = 'letters',
  blur = '10px',
  stagger = 0.01,
}: BlurredStaggerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const segments = animateBy === 'words' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: stagger },
    },
  };

  const segmentAnimation = {
    hidden: { opacity: 0, filter: `blur(${blur})` },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      ref={ref as never}
      variants={container}
      initial="hidden"
      animate={prefersReducedMotion || isInView ? 'show' : 'hidden'}
      className={cn(className, animateBy === 'words' && 'flex flex-wrap')}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={segmentAnimation}
          className="inline-block"
          style={animateBy === 'words' ? { marginRight: '0.35em' } : undefined}
        >
          {segment === ' ' ? '\u00A0' : segment}
        </motion.span>
      ))}
    </MotionTag>
  );
}
