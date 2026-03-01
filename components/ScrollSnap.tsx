'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface ScrollSnapProps {
  lenisInstance: Lenis | null;
}

const ScrollSnap = ({ lenisInstance }: ScrollSnapProps) => {
  const isSnappingRef = useRef(false);
  const lastScrollDirectionRef = useRef<'up' | 'down' | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getSectionElement = (sectionId: string): HTMLElement | null => {
    return document.querySelector(`[data-snap-section="${sectionId}"]`);
  };

  const getSectionTop = (element: HTMLElement): number => {
    const rect = element.getBoundingClientRect();
    return window.scrollY + rect.top;
  };

  const snapToSection = (sectionId: string) => {
    if (!lenisInstance || isSnappingRef.current) return;

    const section = getSectionElement(sectionId);
    if (!section) return;

    isSnappingRef.current = true;
    const targetTop = getSectionTop(section);

    lenisInstance.scrollTo(targetTop, {
      duration: 0.3,
      easing: (t) => {
        // Spring-like easing similar to text-rotate demo: type: "spring", duration: 0.6, bounce: 0
        // Using cubic ease-out for smooth spring-like motion
        return 1 - Math.pow(1 - t, 3);
      },
      onComplete: () => {
        setTimeout(() => {
          isSnappingRef.current = false;
        }, 30);
      },
    });
  };

  const checkAndSnap = () => {
    if (!lenisInstance || isSnappingRef.current) return;

    const snapSections = ['hero', 'about', 'projects'];
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollYRef.current;

    // Detect scroll direction immediately - even tiny movements
    if (Math.abs(scrollDelta) < 1) {
      return;
    }

    const isScrollingDown = scrollDelta > 0;
    lastScrollDirectionRef.current = isScrollingDown ? 'down' : 'up';
    lastScrollYRef.current = currentScrollY;

    const viewportHeight = window.innerHeight;
    const viewportCenter = currentScrollY + viewportHeight / 2;

    // Get all section positions
    const heroSection = getSectionElement('hero');
    const aboutSection = getSectionElement('about');
    const projectsSection = getSectionElement('projects');

    if (!heroSection || !aboutSection || !projectsSection) return;

    const heroTop = getSectionTop(heroSection);
    const heroBottom = heroTop + heroSection.offsetHeight;
    const aboutTop = getSectionTop(aboutSection);
    const aboutBottom = aboutTop + aboutSection.offsetHeight;
    const projectsTop = getSectionTop(projectsSection);
    const projectsBottom = projectsTop + projectsSection.offsetHeight;

    // Determine which section we're currently in based on scroll position
    let currentSection: 'hero' | 'about' | 'projects' | null = null;

    if (viewportCenter >= heroTop && viewportCenter < heroBottom) {
      currentSection = 'hero';
    } else if (viewportCenter >= aboutTop && viewportCenter < aboutBottom) {
      currentSection = 'about';
    } else if (viewportCenter >= projectsTop && viewportCenter < projectsBottom) {
      currentSection = 'projects';
    }

    // Check if we're past Projects section (free scroll zone) - only for downward scrolling
    const isPastProjects = currentScrollY > projectsBottom - viewportHeight / 2;

    // When scrolling down
    if (isScrollingDown) {
      // If we're in Hero section, snap to About
      if (currentSection === 'hero') {
        snapToSection('about');
        return;
      }

      // If we're in About section, snap to Projects
      if (currentSection === 'about') {
        snapToSection('projects');
        return;
      }

      // If we're past Projects, don't snap (free scroll)
      if (isPastProjects || !currentSection) {
        return;
      }
    }
    // When scrolling up
    else {
      // First, check if we're approaching Projects section from below (free scroll zone)
      // When scrolling up and reaching the top area of Projects section, snap to About
      if (isPastProjects && currentScrollY <= projectsTop + 200) {
        snapToSection('about');
        return;
      }

      // If we're in Projects section and scrolling up, snap to About
      if (currentSection === 'projects') {
        snapToSection('about');
        return;
      }

      // If we're in About section and scrolling up, snap to Hero
      if (currentSection === 'about') {
        snapToSection('hero');
        return;
      }

      // If we're in Hero section and scrolling up, don't snap (already at top)
      if (currentSection === 'hero') {
        return;
      }

      // If we're past Projects and not approaching it, free scroll
      if (isPastProjects) {
        return;
      }
    }
  };

  useEffect(() => {
    if (!lenisInstance) return;

    const handleScroll = () => {
      if (isSnappingRef.current) return;

      // Immediate snap on first scroll - no debounce
      checkAndSnap();
    };

    lenisInstance.on('scroll', handleScroll);

    // Initialize last scroll position
    lastScrollYRef.current = window.scrollY;

    // Handle window resize
    const handleResize = () => {
      isSnappingRef.current = false;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      lenisInstance.off('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lenisInstance]);

  return null;
};

export default ScrollSnap;

