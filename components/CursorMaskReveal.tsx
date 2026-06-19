'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CursorMaskRevealProps {
  foregroundImage?: string;
  backgroundImage?: string;
  maskImage?: string; // PNG or SVG mask image URL
  overlayColor?: string; // Color overlay for foreground
  maskSize?: number; // Size of the mask in pixels
  className?: string;
  children?: React.ReactNode;
}

const CursorMaskReveal: React.FC<CursorMaskRevealProps> = ({
  foregroundImage,
  backgroundImage,
  maskImage,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  maskSize = 300,
  className = '',
  children,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        currentX = e.clientX - rect.left;
        currentY = e.clientY - rect.top;
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const animate = () => {
      // Smooth mask position following cursor
      const speed = 0.12;
      smoothX += (currentX - smoothX) * speed;
      smoothY += (currentY - smoothY) * speed;

      if (foregroundRef.current) {
        if (isHovering) {
          // Create mask using radial gradient or custom mask image
          if (maskImage) {
            // Use custom mask image - mask should be inverted to create a hole
            const maskX = smoothX - maskSize / 2;
            const maskY = smoothY - maskSize / 2;
            // Combine radial gradient with custom mask image
            foregroundRef.current.style.maskImage = `radial-gradient(circle ${maskSize / 2}px at ${smoothX}px ${smoothY}px, transparent ${maskSize / 2}px, black ${maskSize / 2}px), url(${maskImage})`;
            foregroundRef.current.style.webkitMaskImage = `radial-gradient(circle ${maskSize / 2}px at ${smoothX}px ${smoothY}px, transparent ${maskSize / 2}px, black ${maskSize / 2}px), url(${maskImage})`;
            foregroundRef.current.style.maskComposite = 'intersect';
            foregroundRef.current.style.webkitMaskComposite = 'source-in';
            foregroundRef.current.style.maskSize = `${maskSize}px ${maskSize}px, contain`;
            foregroundRef.current.style.webkitMaskSize = `${maskSize}px ${maskSize}px, contain`;
            foregroundRef.current.style.maskPosition = `${smoothX - maskSize / 2}px ${smoothY - maskSize / 2}px, center`;
            foregroundRef.current.style.webkitMaskPosition = `${smoothX - maskSize / 2}px ${smoothY - maskSize / 2}px, center`;
            foregroundRef.current.style.maskRepeat = 'no-repeat, no-repeat';
            foregroundRef.current.style.webkitMaskRepeat = 'no-repeat, no-repeat';
          } else {
            // Use radial gradient (circular mask) - transparent center reveals background
            foregroundRef.current.style.maskImage = `radial-gradient(circle ${maskSize / 2}px at ${smoothX}px ${smoothY}px, transparent ${maskSize / 2}px, black ${maskSize / 2}px)`;
            foregroundRef.current.style.webkitMaskImage = `radial-gradient(circle ${maskSize / 2}px at ${smoothX}px ${smoothY}px, transparent ${maskSize / 2}px, black ${maskSize / 2}px)`;
          }
          foregroundRef.current.style.opacity = '1';
        } else {
          // No mask when not hovering - foreground fully visible
          foregroundRef.current.style.maskImage = 'none';
          foregroundRef.current.style.webkitMaskImage = 'none';
          foregroundRef.current.style.opacity = '1';
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', updateMousePosition);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', updateMousePosition);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [maskSize, isHovering, maskImage]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Layer - Always visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundColor: backgroundImage ? undefined : 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      >
        {/* Allow custom background via first child if provided */}
        {children && React.Children.toArray(children)[0]}
      </div>

      {/* Foreground Layer - Masked to reveal background */}
      <div
        ref={foregroundRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: foregroundImage ? `url(${foregroundImage})` : undefined,
          backgroundColor: foregroundImage ? undefined : 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
          opacity: 1,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        {/* Allow custom foreground via second child if provided */}
        {children && React.Children.count(children) > 1 && React.Children.toArray(children)[1]}
        
        {/* Color Overlay on foreground (only if no custom foreground) */}
        {overlayColor && (!children || React.Children.count(children) < 2) && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
            }}
          />
        )}
      </div>

      {/* Content Layer - On top of everything */}
      {children && React.Children.count(children) > 2 && (
        <div className="relative z-10">
          {React.Children.toArray(children).slice(2)}
        </div>
      )}
    </div>
  );
};

export default CursorMaskReveal;

