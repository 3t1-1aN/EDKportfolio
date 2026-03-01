import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: 'default' | 'alt';
  'data-snap-section'?: string;
}

const Section = ({ children, id, className, variant = 'default', 'data-snap-section': dataSnapSection }: SectionProps) => {
  const variantClasses = {
    default: 'bg-transparent',
    alt: 'bg-transparent',
  };

  return (
    <section
      id={id}
      className={cn('py-24 sm:py-32', variantClasses[variant], className)}
      {...(dataSnapSection && { 'data-snap-section': dataSnapSection })}
    >
      {children}
    </section>
  );
};

export default Section;

