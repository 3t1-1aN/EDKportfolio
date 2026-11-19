'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollAnimation from '@/components/ScrollAnimation';
import { FrostedCard, FrostedInset } from '@/components/ui/frosted-glass';
import {
  recommendationLetters,
  timelineEntries,
  type TimelineEntry,
} from '@/lib/timeline';

function EntryBody({ entry }: { entry: TimelineEntry }) {
  return (
    <FrostedInset>
      <div className="p-5 sm:p-6">
        {entry.date && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-muted">
            {entry.date}
          </p>
        )}
        <h3 className="text-xl font-bold text-foreground sm:text-2xl">{entry.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
          {entry.summary}
        </p>
        {entry.href && (
          <>
            <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-white transition-opacity group-hover:opacity-75">
              Read more
              <span aria-hidden className="ml-1.5">
                {'\u2192'}
              </span>
            </span>
            <span
              className="mt-2 block h-0.5 w-0 bg-accent-orange transition-all duration-300 group-hover:w-10"
              aria-hidden
            />
          </>
        )}
      </div>
    </FrostedInset>
  );
}

function LettersSpot() {
  const [open, setOpen] = useState(false);
  const hasLetters = recommendationLetters.length > 0;

  return (
    <FrostedCard>
      <FrostedInset>
        <div className="p-5 sm:p-6">
          {hasLetters ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="letters-panel"
              className="flex w-full items-center justify-between gap-4 text-left"
              data-cursor-hover
            >
              <span className="text-xl font-bold text-foreground sm:text-2xl">
                Letters of recommendation
              </span>
              <span
                aria-hidden
                className={`text-lg text-gray-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
              >
                +
              </span>
            </button>
          ) : (
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                Letters of recommendation
              </h3>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          )}
          {hasLetters && open && (
            <ul id="letters-panel" className="mt-5 space-y-3">
              {recommendationLetters.map((letter) => (
                <li key={letter.id}>
                  <a
                    href={letter.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-white/10 px-4 py-3 transition-colors hover:border-white/25"
                    data-cursor-hover
                  >
                    <span className="block text-base font-semibold text-foreground">
                      {letter.title}
                    </span>
                    <span className="block text-sm text-gray-400">{letter.fromRole}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </FrostedInset>
    </FrostedCard>
  );
}

const TimelineSection = () => {
  return (
    <Section id="timeline" variant="default" className="relative">
      <Container>
        <SectionHeader
          label="TIMELINE"
          blurLabel
          title="My path through high school."
          blurTitle
          description="The short version. Tap an entry to read more."
          blurDescription
        />

        <ol className="relative ml-2 border-l border-white/15 pl-6 sm:ml-3 sm:pl-10">
          {timelineEntries.map((entry, index) => (
            <li key={entry.id} className="relative pb-8 last:pb-10 sm:pb-10">
              <span
                aria-hidden
                className="accent-square absolute -left-[calc(1.5rem+0.2rem+0.5px)] top-7 sm:-left-[calc(2.5rem+0.2rem+0.5px)]"
              />
              <ScrollAnimation delay={Math.min(index, 4) * 80}>
                {entry.href ? (
                  <div className="transition-transform duration-250 hover:scale-[1.01]">
                    <FrostedCard className="group">
                      <Link
                        href={entry.href}
                        aria-label={`${entry.title}: read more`}
                        className="block"
                        data-cursor-hover
                      >
                        <EntryBody entry={entry} />
                      </Link>
                    </FrostedCard>
                  </div>
                ) : (
                  <FrostedCard>
                    <EntryBody entry={entry} />
                  </FrostedCard>
                )}
              </ScrollAnimation>
            </li>
          ))}
          <li className="relative">
            <span
              aria-hidden
              className="accent-square absolute -left-[calc(1.5rem+0.2rem+0.5px)] top-7 sm:-left-[calc(2.5rem+0.2rem+0.5px)]"
            />
            <ScrollAnimation delay={80}>
              <LettersSpot />
            </ScrollAnimation>
          </li>
        </ol>
      </Container>
    </Section>
  );
};

export default TimelineSection;
