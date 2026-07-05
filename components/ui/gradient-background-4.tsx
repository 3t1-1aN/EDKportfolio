import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
}

export const GradientBackground = ({ className }: GradientBackgroundProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div
        className="absolute inset-[-25%] animate-gradient-drift opacity-90"
        style={{
          background:
            "radial-gradient(125% 125% at 50% -50%, rgba(209, 213, 219, 0.14) 20%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-[-15%] animate-gradient-drift-reverse opacity-70"
        style={{
          background:
            "radial-gradient(90% 90% at 80% 20%, rgba(59, 69, 77, 0.2) 15%, transparent 70%)",
        }}
      />
    </div>
  );
};
