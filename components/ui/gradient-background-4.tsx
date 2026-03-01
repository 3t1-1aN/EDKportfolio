import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
}

export const GradientBackground = ({ className }: GradientBackgroundProps) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_-50%,#fef3c7_20%,transparent_100%)] dark:[background:radial-gradient(125%_125%_at_50%_-50%,#fbbf2418_20%,transparent_100%)]",
        className
      )}
    />
  );
};

