'use client'

import dynamic from 'next/dynamic'

const ProjectCarousel = dynamic(() => import('./ProjectCarousel'), {
  ssr: false,
  loading: () => (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-6 w-20 rounded-full bg-white/5 animate-pulse" />
          <div className="h-8 w-48 rounded-lg bg-white/5 animate-pulse" />
          <div className="h-4 w-96 max-w-full rounded-md bg-white/5 animate-pulse" />
        </div>
        <div className="flex justify-center gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-[24px] bg-white/5 animate-pulse"
              style={{ width: 380, height: 420 }}
            />
          ))}
        </div>
      </div>
    </section>
  ),
})

export default function Projects() {
  return <ProjectCarousel />
}
