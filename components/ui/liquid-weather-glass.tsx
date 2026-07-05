'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export type BlurIntensity = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

const GLASS_TINT = 'rgba(21, 22, 26, 0.14)';

const backdropBlurStyles: Record<BlurIntensity, string> = {
  sm: 'blur(16px) saturate(160%)',
  md: 'blur(28px) saturate(165%)',
  lg: 'blur(40px) saturate(170%)',
  xl: 'blur(56px) saturate(175%)',
  '2xl': 'blur(72px) saturate(180%)',
  '3xl': 'blur(88px) saturate(185%)',
};

export interface LiquidGlassSurfaceProps {
  blurIntensity?: BlurIntensity;
  borderRadius?: string;
  className?: string;
}

/** Frost layer — backdrop-filter must live on this element directly */
export function LiquidGlassSurface({
  blurIntensity = 'xl',
  borderRadius,
  className,
}: LiquidGlassSurfaceProps) {
  const backdrop = backdropBlurStyles[blurIntensity];

  return (
    <div
      className={cn('pointer-events-none absolute inset-0', className)}
      aria-hidden
      style={{
        ...(borderRadius ? { borderRadius } : {}),
        WebkitBackdropFilter: backdrop,
        backdropFilter: backdrop,
        backgroundColor: GLASS_TINT,
      }}
    />
  );
}

export interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: BlurIntensity;
  borderRadius?: string;
}

export const LiquidGlassCard = ({
  children,
  className = '',
  draggable = false,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius,
  ...props
}: LiquidGlassCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const backdrop = backdropBlurStyles[blurIntensity];

  const handleToggleExpansion = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!expandable) return;
    if ((event.target as HTMLElement).closest('a, button, input, select, textarea')) return;
    setIsExpanded((current) => !current);
  };

  const containerVariants = expandable
    ? {
        collapsed: {
          width: width || 'auto',
          height: height || 'auto',
          transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
        },
        expanded: {
          width: expandedWidth || 'auto',
          height: expandedHeight || 'auto',
          transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
        },
      }
    : {};

  const sharedStyle: React.CSSProperties = {
    ...(borderRadius ? { borderRadius } : {}),
    WebkitBackdropFilter: backdrop,
    backdropFilter: backdrop,
    backgroundColor: GLASS_TINT,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  const motionProps =
    draggable || expandable
      ? {
          variants: expandable ? containerVariants : undefined,
          animate: expandable ? (isExpanded ? 'expanded' : 'collapsed') : undefined,
          onClick: expandable ? handleToggleExpansion : undefined,
          drag: draggable,
          dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
          dragElastic: draggable ? 0.3 : undefined,
          dragTransition: draggable
            ? { bounceStiffness: 300, bounceDamping: 10, power: 0.3 }
            : undefined,
          whileDrag: draggable ? { scale: 1.02 } : undefined,
          whileHover: { scale: 1.01 },
          whileTap: { scale: 0.98 },
        }
      : {};

  if (draggable || expandable) {
    return (
      <motion.div
        className={cn(
          'relative',
          draggable && 'cursor-grab active:cursor-grabbing',
          expandable && 'cursor-pointer',
          className,
        )}
        style={sharedStyle}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn('relative', className)} style={sharedStyle} {...props}>
      {children}
    </div>
  );
};
