'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Adapted from 21st.dev "Background Snippets Noise effect" — canvas grain
 * redrawn on a throttled rAF loop. Motion comes from pixel refresh only
 * (no CSS translate, which exposed canvas edges as a shifting rectangle).
 */
interface NoiseOverlayProps {
  patternRefreshInterval?: number;
  patternAlpha?: number;
  /** Overall canvas opacity (0–1). Lower = subtler grain. */
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({
  patternRefreshInterval = 4,
  patternAlpha = 18,
  opacity = 0.48,
  className,
}: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    drawGrain();

    if (prefersReducedMotion) {
      return;
    }

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame += 1;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha, prefersReducedMotion]);

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none inset-0', className ?? 'absolute')}
      style={{
        maskImage:
          'radial-gradient(ellipse 100% 90% at 50% 45%, black 18%, transparent 88%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 100% 90% at 50% 45%, black 18%, transparent 88%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full mix-blend-overlay"
        style={{ imageRendering: 'pixelated', opacity }}
      />
    </div>
  );
}
