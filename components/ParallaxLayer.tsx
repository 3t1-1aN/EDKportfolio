'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxLayerProps {
    children: ReactNode;
    speed?: number; // 0 to 1, where 0.5 is normal scroll, <0.5 is slower, >0.5 is faster
    className?: string;
    direction?: 'up' | 'down';
}

const ParallaxLayer = ({
    children,
    speed = 0.5,
    className = '',
    direction = 'up'
}: ParallaxLayerProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // Calculate scroll progress (0 to 1)
            const scrollProgress = Math.max(0, Math.min(1,
                (windowHeight - elementTop) / (windowHeight + elementHeight)
            ));

            // Apply parallax transform
            const offset = (scrollProgress - 0.5) * speed * 100;
            const transformValue = direction === 'up' ? -offset : offset;

            element.style.transform = `translateY(${transformValue}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, direction]);

    return (
        <div ref={ref} className={className} style={{ willChange: 'transform' }}>
            {children}
        </div>
    );
};

export default ParallaxLayer;

