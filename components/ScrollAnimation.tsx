'use client';

import { ReactNode } from 'react';
import { BlurFade } from '@/components/ui/blur-fade';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollAnimation = ({ children, className = '', delay = 0 }: ScrollAnimationProps) => {
  return (
    <BlurFade
      inView
      delay={delay}
      duration={0.6}
      yOffset={16}
      blur="4px"
      className={className}
    >
      {children}
    </BlurFade>
  );
};

export default ScrollAnimation;
