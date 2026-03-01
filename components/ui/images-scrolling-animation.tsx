"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Project, categories } from "@/lib/data"

interface StickyCardProps {
  i: number
  project: Project
  progress: any
  range: [number, number]
  targetScale: number
}

const StickyCard_001 = ({
  i,
  project,
  progress,
  range,
  targetScale,
}: StickyCardProps) => {
  const container = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, range, [1, targetScale])
  
  // Find the category for this project
  const category = project.categoryId 
    ? categories.find((c) => c.id === project.categoryId)
    : null
  
  const categoryLink = category ? `/projects/category/${category.slug}` : '#'

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Link href={categoryLink} className="block">
        <motion.div
          style={{
            scale,
            top: `calc(10vh + ${i * 15}px)`,
          }}
          className="rounded-2xl sm:rounded-3xl lg:rounded-4xl relative flex origin-center flex-col overflow-hidden
                     h-[350px] w-[550px] 
                     sm:h-[450px] sm:w-[700px] 
                     md:h-[550px] md:w-[850px] 
                     lg:h-[650px] lg:w-[1000px]
                     xl:h-[750px] xl:w-[1100px]
                     cursor-pointer group"
          data-cursor-hover
        >
          <img 
            src={project.image || "/placeholder.svg"} 
            alt={project.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{project.title}</h4>
            {project.tags && project.tags.length > 0 && (
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">{project.tags.slice(0, 2).join(', ')}</p>
            )}
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

interface ImagesScrollingAnimationProps {
  projects: Project[]
}

const ImagesScrollingAnimation = ({ projects }: ImagesScrollingAnimationProps) => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <main
      ref={container}
      className="relative z-10 flex w-full flex-col items-center justify-center 
                               pb-[60vh] pt-[10vh] 
                               sm:pb-[70vh] sm:pt-[10vh] 
                               lg:pb-[80vh] lg:pt-[10vh]"
    >
      {projects.map((project, i) => {
        const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)
        return (
          <StickyCard_001
            key={`p_${project.id}`}
            i={i}
            project={project}
            progress={scrollYProgress}
            range={[i * 0.2, 1]}
            targetScale={targetScale}
          />
        )
      })}
    </main>
  )
}

export { ImagesScrollingAnimation, StickyCard_001 }

