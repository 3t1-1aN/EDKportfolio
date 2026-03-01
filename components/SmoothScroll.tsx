'use client';

import { useEffect, ReactNode, useState } from 'react';
import Lenis from 'lenis';
import ScrollSnap from './ScrollSnap';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <>
      {lenisInstance && <ScrollSnap lenisInstance={lenisInstance} />}
      {children}
    </>
  );
};

export default SmoothScroll;

