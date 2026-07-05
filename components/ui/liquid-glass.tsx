'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export const GLASS_DISTORTION_ID = 'glass-distortion';

const GLASS_EASE = 'cubic-bezier(0.175, 0.885, 0.32, 2.2)';

type GlassVariant = 'panel' | 'card' | 'light';

const variantConfig: Record<
  GlassVariant,
  {
    radius: string;
    blurClass: string;
    sampleClass: string;
    liveBackdrop: string;
    tint: string;
    highlight: string;
    edge: string;
    shadow: string;
    border: string;
    useFallbackBlur: boolean;
    useDistortion: boolean;
    fallbackOpacity?: number;
    frostOpacity?: number;
  }
> = {
  panel: {
    radius: 'rounded-3xl',
    blurClass: 'frosted-glass-blur-panel',
    sampleClass: 'frosted-backdrop-sample',
    liveBackdrop: 'var(--frosted-backdrop-panel)',
    tint: 'rgba(21, 22, 26, 0.32)',
    highlight: 'transparent',
    edge:
      'inset 1px 1px 0 rgba(255,255,255,0.10), inset -1px -1px 1px rgba(255,255,255,0.04)',
    shadow: '0 8px 40px rgba(0, 0, 0, 0.26)',
    border: 'border-white/[0.14]',
    useFallbackBlur: false,
    useDistortion: false,
  },
  card: {
    radius: 'rounded-2xl',
    blurClass: 'frosted-glass-blur-card',
    sampleClass: 'frosted-backdrop-sample',
    liveBackdrop: 'var(--frosted-backdrop-card)',
    tint: 'rgba(21, 22, 26, 0.28)',
    highlight: 'transparent',
    edge:
      'inset 1px 1px 0 rgba(255,255,255,0.10), inset -1px -1px 1px rgba(255,255,255,0.04)',
    shadow: '0 8px 40px rgba(0, 0, 0, 0.22)',
    border: 'border-white/[0.14]',
    useFallbackBlur: false,
    useDistortion: false,
  },
  light: {
    radius: 'rounded-3xl',
    blurClass: '',
    sampleClass: 'frosted-backdrop-sample',
    liveBackdrop: 'blur(12px) saturate(160%)',
    tint: 'rgba(255, 255, 255, 0.22)',
    highlight:
      'linear-gradient(168deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0) 72%)',
    edge:
      'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.45), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.35)',
    shadow: '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
    border: 'border-white/20',
    useFallbackBlur: false,
    useDistortion: true,
  },
};

export interface GlassEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: GlassVariant;
  radiusClass?: string;
  href?: string;
  target?: string;
}

/** SVG displacement filter — mount once in root layout. */
export function GlassFilter() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <filter
        id={GLASS_DISTORTION_ID}
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves={1}
          seed={17}
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
          <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
          <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale={5}
          specularConstant={1}
          specularExponent={100}
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1={0}
          k2={1}
          k3={1}
          k4={0}
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale={45}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

export function GlassEffect({
  children,
  className,
  variant = 'panel',
  radiusClass,
  href,
  target = '_blank',
  style,
  ...props
}: GlassEffectProps) {
  const config = variantConfig[variant];
  const radius = radiusClass ?? config.radius;

  const shell = (
    <div
      className={cn(
        'relative w-full overflow-hidden border text-foreground',
        radius,
        config.border,
        href && 'cursor-pointer transition-all duration-700',
        className,
      )}
      style={{
        boxShadow: config.shadow,
        transitionTimingFunction: GLASS_EASE,
        ...style,
      }}
      {...props}
    >
      {config.useFallbackBlur && (
        <div
          aria-hidden
          className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', radius)}
          style={config.fallbackOpacity != null ? { opacity: config.fallbackOpacity } : undefined}
        >
          <div
            className={cn(config.sampleClass, 'absolute', config.blurClass)}
            style={{ top: '-4rem', right: '-4rem', bottom: '-4rem', left: '-4rem' }}
          />
        </div>
      )}

      {/* Single backdrop-filter pass — no SVG distortion on panel/card */}
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 z-[1] overflow-hidden', radius)}
        style={{
          WebkitBackdropFilter: config.liveBackdrop,
          backdropFilter: config.liveBackdrop,
          ...(config.useDistortion ? { filter: `url(#${GLASS_DISTORTION_ID})` } : {}),
          backgroundColor: config.tint,
          ...(config.frostOpacity != null ? { opacity: config.frostOpacity } : {}),
        }}
      />

      {/* Sheen + inset edge highlights — edge only for panel; skip solid gradient fill */}
      <div
        aria-hidden
        className={cn('pointer-events-none absolute inset-0 z-[2]', radius)}
        style={{
          ...(config.highlight !== 'transparent' ? { background: config.highlight } : {}),
          boxShadow: config.edge,
        }}
      />

      <div className="relative z-[3] min-w-0">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className="block">
        {shell}
      </a>
    );
  }

  return shell;
}
