'use client';

import { useEffect, useState, useRef } from 'react';

const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    // Initialize cursor position
    positionRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    if (cursorRef.current) {
      const size = 24;
      cursorRef.current.style.transform = `translate(${positionRef.current.x - size / 2}px, ${positionRef.current.y - size / 2}px)`;
      cursorRef.current.style.opacity = '1';
      cursorRef.current.style.display = 'block';
    }

    const updateCursor = () => {
      if (cursorRef.current) {
        const size = 24;
        cursorRef.current.style.transform = `translate(${positionRef.current.x - size / 2}px, ${positionRef.current.y - size / 2}px) scale(${scaleRef.current})`;
        cursorRef.current.style.opacity = isVisibleRef.current ? '1' : '0';
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;
      
      // Check if mouse is within viewport bounds
      const isInViewport = 
        e.clientX >= 0 && 
        e.clientX <= window.innerWidth && 
        e.clientY >= 0 && 
        e.clientY <= window.innerHeight;
      
      if (isInViewport !== isVisibleRef.current) {
        isVisibleRef.current = isInViewport;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = isInViewport ? '1' : '0';
        }
      }
      
      // Update cursor position immediately for maximum responsiveness
      updateCursor();
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.hasAttribute('data-cursor-hover');
      
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      scaleRef.current = 0.8;
      updateCursor();
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      scaleRef.current = isHovering ? 1.3 : 1;
      updateCursor();
    };

    // Use passive listener for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    // Also listen for mouse leaving the window
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide cursor on mobile/touch devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isMobile && cursorRef.current) {
      cursorRef.current.style.display = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Update scale when hovering state changes
  useEffect(() => {
    if (!isClicking) {
      scaleRef.current = isHovering ? 1.3 : 1;
      if (cursorRef.current) {
        const size = 24;
        cursorRef.current.style.transform = `translate(${positionRef.current.x - size / 2}px, ${positionRef.current.y - size / 2}px) scale(${scaleRef.current})`;
        cursorRef.current.style.opacity = isVisibleRef.current ? '1' : '0';
      }
    }
  }, [isHovering, isClicking]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] will-change-transform"
      style={{
        backgroundColor: 'rgb(237, 237, 237)',
        opacity: 0,
        mixBlendMode: 'difference',
        transform: 'translate(0, 0)',
      }}
    />
  );
};

export default Cursor;

