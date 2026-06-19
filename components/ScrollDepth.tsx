'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollDepthProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number]; // [minScale, maxScale]
  opacityRange?: [number, number]; // [minOpacity, maxOpacity]
  blurRange?: [number, number]; // [minBlur, maxBlur]
  translateYRange?: [number, number]; // [minY, maxY] in pixels
}

const ScrollDepth = ({
  children,
  className = '',
  scaleRange = [0.8, 1],
  opacityRange = [0.3, 1],
  blurRange = [0, 0],
  translateYRange = [50, 0]
}: ScrollDepthProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate scroll progress (0 when element is below viewport, 1 when above)
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop) / (windowHeight + elementHeight * 0.5)
      ));
      
      // Interpolate values based on scroll progress
      const scale = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * scrollProgress;
      const opacity = opacityRange[0] + (opacityRange[1] - opacityRange[0]) * scrollProgress;
      const blur = blurRange[0] + (blurRange[1] - blurRange[0]) * (1 - scrollProgress);
      const translateY = translateYRange[0] + (translateYRange[1] - translateYRange[0]) * scrollProgress;
      
      element.style.transform = `translateY(${translateY}px) scale(${scale})`;
      element.style.opacity = opacity.toString();
      if (blur > 0) {
        element.style.filter = `blur(${blur}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleRange, opacityRange, blurRange, translateYRange]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </div>
  );
};

export default ScrollDepth;

