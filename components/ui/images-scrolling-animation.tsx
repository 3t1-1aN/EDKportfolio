"use client";

import { Project, categories } from "@/lib/data";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

interface ImagesScrollingAnimationProps {
  projects: Project[];
}

const FALLBACK_UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
];

const ImagesScrollingAnimation = ({ projects }: ImagesScrollingAnimationProps) => {
  const items: CardStackItem[] = projects.map((project, index) => {
    const category = project.categoryId ? categories.find((c) => c.id === project.categoryId) : null;
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      imageSrc: project.image || FALLBACK_UNSPLASH_IMAGES[index % FALLBACK_UNSPLASH_IMAGES.length],
      href: category ? `/projects/category/${category.slug}` : "/projects",
      tag: project.tags?.[0],
    };
  });

  return (
    <main className="relative z-10 w-full py-16">
      <CardStack
        items={items}
        initialIndex={0}
        maxVisible={5}
        cardWidth={700}
        cardHeight={440}
        overlap={0.58}
        spreadDeg={42}
        depthPx={120}
        tiltXDeg={10}
        activeLiftPx={26}
        autoAdvance
        intervalMs={2600}
        pauseOnHover={false}
        showDots
      />
    </main>
  );
};

export { ImagesScrollingAnimation };

