'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface DepthLayerProps {
  children: ReactNode;
  depth?: number; // 0 to 1, where 0 is background, 1 is foreground
  blur?: number; // Blur amount in pixels
  scale?: number; // Scale multiplier (1 = normal, <1 = smaller, >1 = larger)
  className?: string;
}

const DepthLayer = ({ 
  children, 
  depth = 0.5,
  blur = 0,
  scale = 1,
  className = '' 
}: DepthLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from viewport center (-1 to 1)
      const distance = (viewportCenter - elementCenter) / windowHeight;
      
      // Apply depth-based transforms
      const translateZ = depth * 100 * distance;
      const scaleValue = 1 + (scale - 1) * (1 - Math.abs(distance));
      const blurValue = blur * Math.abs(distance);
      
      element.style.transform = `translateZ(${translateZ}px) scale(${scaleValue})`;
      if (blur > 0) {
        element.style.filter = `blur(${blurValue}px)`;
      } else {
        element.style.filter = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [depth, blur, scale]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ 
        willChange: 'transform, filter',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};

export default DepthLayer;

