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
      {label && (
        <p className="mb-4 flex items-center gap-2.5">
          <span className="accent-square" aria-hidden />
          {blurLabel ? (
            <BlurReveal
              trigger="mount"
              delay={0}
              duration={revealTiming.labelDuration}
              className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-muted"
            >
              {label}
            </BlurReveal>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-muted">
              {label}
            </span>
          )}
        </p>
      )}

      {typeof title === 'string' ? (
        <div className={cn('mb-8 flex max-w-4xl items-start gap-3', label && 'gap-0')}>
          {!label && <span className="accent-square mt-[0.72rem] sm:mt-[0.85rem]" aria-hidden />}
          {blurTitle ? (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              <BlurRevealWords
                text={title}
                stepDelay={revealTiming.titleWordStep}
                blur="8px"
                trigger="mount"
                startDelay={titleStartDelay}
              />
            </h2>
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
          )}
        </div>
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
