'use client';

import { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { BlurText } from '@/components/ui/blur-text';
import { BlurReveal, BlurRevealWords } from '@/components/ui/blur-reveal';
import {
  bodySequenceEnd,
  countWords,
  pageEntrance,
  revealTiming,
  titleSequenceEnd,
} from '@/lib/motion-presets';

interface SectionHeaderProps {
  label?: string;
  title: string | ReactNode;
  description?: string;
  className?: string;
  blurTitle?: boolean;
  blurDescription?: boolean;
  blurLabel?: boolean;
}

const SectionHeader = ({
  label,
  title,
  description,
  className,
  blurTitle = false,
  blurDescription = false,
  blurLabel = false,
}: SectionHeaderProps) => {
  const titleText = typeof title === 'string' ? title : '';
  const titleWordCount = countWords(titleText);

  const { titleStartDelay, descriptionStartDelay } = useMemo(() => {
    let cursor = pageEntrance.contentBaseDelay;

    if (label && blurLabel) {
      cursor += revealTiming.labelDuration;
    }

    const titleStart = cursor;
    cursor = titleSequenceEnd(titleWordCount, cursor);

    const descriptionStart = cursor;

    return {
      titleStartDelay: titleStart - pageEntrance.contentBaseDelay,
      descriptionStartDelay: descriptionStart,
    };
  }, [label, blurLabel, titleWordCount]);

  return (
    <div className={cn('mb-16', className)}>
      {label &&
        (blurLabel ? (
          <BlurReveal
            trigger="mount"
            delay={0}
            duration={revealTiming.labelDuration}
            className="mb-4 block text-xs font-semibold uppercase tracking-[0.32em] text-accent-muted"
          >
            {label}
          </BlurReveal>
        ) : (
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-muted mb-4">
            {label}
          </p>
        ))}

      {typeof title === 'string' ? (
        blurTitle ? (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-foreground max-w-4xl">
            <BlurRevealWords
              text={title}
              stepDelay={revealTiming.titleWordStep}
              blur="8px"
              trigger="mount"
              startDelay={titleStartDelay}
            />
          </h2>
        ) : (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 text-foreground max-w-4xl">
            {title}
          </h2>
        )
      ) : (
        title
      )}

      {description &&
        (blurDescription ? (
          <BlurText
            text={description}
            variant="body"
            trigger="mount"
            startDelay={descriptionStartDelay}
            className="text-base sm:text-lg leading-relaxed text-gray-300 max-w-3xl"
          />
        ) : (
          <p className="text-base sm:text-lg leading-relaxed text-gray-300 max-w-3xl">
            {description}
          </p>
        ))}
    </div>
  );
};

export default SectionHeader;
