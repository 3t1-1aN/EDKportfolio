"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter
          id="radio-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

const glassPillShadow =
  "shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]";

export interface LiquidRadioGroupOption {
  value: string;
  label: string;
}

export interface LiquidRadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: LiquidRadioGroupOption[];
  className?: string;
}

export function LiquidRadioGroup({
  value,
  onValueChange,
  options,
  className,
}: LiquidRadioGroupProps) {
  const selectedIndex = options.findIndex((o) => o.value === value);
  const segmentWidth = 100 / options.length;

  return (
    <div
      className={cn(
        "inline-flex h-9 rounded-lg bg-input/50 p-0.5",
        className
      )}
    >
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="relative inline-grid items-center gap-0 text-sm font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
        style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
      >
        {/* Sliding pill: only the active tab shows the glass effect; animates on change */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-md bg-background/80 overflow-hidden",
            "transition-[transform] duration-300 ease-out",
            glassPillShadow
          )}
          style={{
            width: `${segmentWidth}%`,
            transform: `translateX(${selectedIndex * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            filter: 'url("#radio-glass")',
          }}
        />
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors text-muted-foreground/70",
              value === opt.value && "text-foreground"
            )}
          >
            {opt.label}
            <RadioGroupItem
              id={`liquid-radio-${opt.value}`}
              value={opt.value}
              className="sr-only"
            />
          </label>
        ))}
        <GlassFilter />
      </RadioGroup>
    </div>
  );
}
