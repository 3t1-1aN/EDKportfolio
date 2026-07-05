import type React from "react";
import { cn } from "@/lib/utils";

interface DarkGradientBgProps {
  children?: React.ReactNode;
  className?: string;
}

const accentBeam = "linear-gradient(rgba(209, 213, 219, 0.75) 0%, rgba(209, 213, 219, 0) 100%)";

export function DarkGradientBg({ children, className }: DarkGradientBgProps) {
  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-[#15161a]", className)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(100% 100% at 0% 0%, rgba(28, 33, 41, 0.95) 0%, rgba(21, 22, 26, 1) 100%)",
            mask: "radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88.2883%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          {[0, 11, 9, 0, 0].map((maskStart, index) => (
            <div
              key={index}
              className="absolute inset-0 opacity-20 animate-beam-drift"
              style={{
                background: accentBeam,
                mask: `linear-gradient(90deg, rgba(0, 0, 0, 0) ${maskStart}%, rgb(0, 0, 0) ${maskStart + 11}%, rgba(0, 0, 0, 0) 97%)`,
                transform: "skewX(45deg)",
                animationDelay: `${index * 1.4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-20 animate-gradient-drift"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(209, 213, 219, 0.28) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,69,77,0.12),transparent_65%)] animate-gradient-drift-reverse"
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
