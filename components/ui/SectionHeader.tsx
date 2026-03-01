import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string | ReactNode;
  description?: string;
  className?: string;
}

const SectionHeader = ({ label, title, description, className }: SectionHeaderProps) => {
  return (
    <div className={cn('mb-16', className)}>
      {label && (
        <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4">
          {label}
        </p>
      )}
      {typeof title === 'string' ? (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
          {title}
        </h2>
      ) : (
        title
      )}
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

