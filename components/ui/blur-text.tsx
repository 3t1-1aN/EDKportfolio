'use client';

import { motion, AnimationProps, Transition, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { blurTextPresets } from '@/lib/motion-presets';
import { usePageEntrance } from '@/lib/page-entrance-context';

const buildKeyframes = (from: object, steps: object[]): object => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: { [key: string]: unknown[] } = {};
  keys.forEach((k) => {
    keyframes[k] = [(from as Record<string, unknown>)[k], ...steps.map((s) => (s as Record<string, unknown>)[k])];
  });
  return keyframes;
};

type BlurTextVariant = keyof typeof blurTextPresets;

interface BlurTextProps {
  text?: string;
  /** Stagger between words/letters in ms */
  delay?: number;
  /** Delay before the first word starts, in seconds */
  startDelay?: number;
  className?: string;
  variant?: BlurTextVariant;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: object;
  animationTo?: object[];
  easing?: string | number[] | ((t: number) => number);
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
  trigger?: 'mount' | 'scroll';
}

export const BlurText = ({
  text = '',
  delay,
  startDelay = 0,
  className = '',
  variant = 'body',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration,
  as: Component = 'p',
  trigger = 'scroll',
}: BlurTextProps) => {
  const preset = blurTextPresets[variant];
  const prefersReducedMotion = useReducedMotion();
  const { ready } = usePageEntrance();

  const elements = useMemo(() => {
    if (animateBy === 'words') {
      return text.split(' ');
    }
    return text.split('');
  }, [text, animateBy]);

  const [scrollInView, setScrollInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || trigger === 'mount') {
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrollInView(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [threshold, rootMargin, prefersReducedMotion, trigger]);

  const inView =
    prefersReducedMotion || (trigger === 'mount' ? ready : scrollInView);

  const defaultFrom: AnimationProps['initial'] = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -12 }
        : preset.animationFrom,
    [direction, preset.animationFrom]
  );

  const defaultTo: AnimationProps['animate'] = useMemo(
    () => preset.animationTo,
    [preset.animationTo]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = Array.isArray(animationTo) ? animationTo : (defaultTo as object[]);
  const wordDelay = delay ?? preset.delay;
  const wordStepDuration = stepDuration ?? preset.stepDuration;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = wordStepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount <= 1 ? 0 : i / (stepCount - 1)
  );

  const MotionComponent = motion[Component] as typeof motion.p;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: prefersReducedMotion ? 0 : totalDuration,
          times: times as number[],
          delay:
            inView && !prefersReducedMotion
              ? startDelay + (index * wordDelay) / 1000
              : 0,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={prefersReducedMotion ? toSnapshots[toSnapshots.length - 1] : fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 && inView ? onAnimationComplete : undefined
            }
            style={animateBy === 'words' ? { marginRight: '0.35em' } : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};
