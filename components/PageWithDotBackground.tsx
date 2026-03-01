'use client'

import { DotScreenShader } from '@/components/ui/dot-shader-background'

export default function PageWithDotBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 -z-10 w-full h-full">
        <DotScreenShader />
      </div>
      {children}
    </>
  )
}

