'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';

interface NeumorphicButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  backgroundColor?: string; // Background color to match
  variant?: 'default' | 'link';
  [key: string]: any; // Allow other props to pass through
}

const NeumorphicButton = ({
  children,
  href,
  onClick,
  className = '',
  backgroundColor = 'rgba(50, 50, 50, 0.8)',
  variant = 'default',
  ...props
}: NeumorphicButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Base className combining common styles
  const baseClassName = `rounded-xl cursor-pointer transition-all duration-300 ${className}`;

  // --- HOVERED STYLE ---
  const hoveredStyle = {
    backgroundColor: backgroundColor,
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
    transform: 'translateY(-1px)',
  };

  // --- PRESSED STYLE ---
  const pressedStyle = {
    backgroundColor: backgroundColor,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(0) scale(0.98)',
  };

  // --- DEFAULT STYLE ---
  const defaultStyle = {
    backgroundColor: backgroundColor,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  };

  // Determine the current style based on state priority (Pressed > Hovered > Default)
  const currentStyle = isPressed
    ? pressedStyle
    : isHovered
      ? hoveredStyle
      : defaultStyle;

  const buttonProps = {
    className: baseClassName,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false);
      setIsPressed(false);
    },
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
    onClick: onClick,
    style: {
      ...currentStyle,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    'data-cursor-hover': true,
    ...props,
  };

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <div {...buttonProps}>
          {children}
        </div>
      </Link>
    );
  }

  // Use button element if onClick is provided, otherwise div
  if (onClick) {
    return (
      <button type="button" {...buttonProps}>
        {children}
      </button>
    );
  }

  return (
    <div {...buttonProps}>
      {children}
    </div>
  );
};

export default NeumorphicButton;

