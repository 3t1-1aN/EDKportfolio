"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type CardType = {
    title: string;
    description: string;
    src: string;
};

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
    }: {
        card: CardType;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => {
        const isHovered = hovered === index;
        const isBlurred = hovered !== null && hovered !== index;

        return (
            <motion.div
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                    "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-visible w-full",
                    isBlurred && "blur-sm scale-[0.98] transition-all duration-300"
                )}
                animate={{
                    height: isHovered ? "auto" : "240px",
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
            >
                <motion.div 
                    className="relative overflow-hidden rounded-t-lg"
                    animate={{
                        height: isHovered ? "500px" : "240px",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                >
                    <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </motion.div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                            className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-t border-white/20 shadow-2xl overflow-hidden rounded-b-lg"
                        >
                            <div className="px-6 py-6 md:px-8 md:py-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 drop-shadow-2xl">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/95 leading-relaxed drop-shadow-xl">
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: CardType[] }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
            {cards.map((card, index) => (
                <Card
                    key={`${card.title}-${index}`}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}

