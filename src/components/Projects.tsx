'use client';

import dynamic from 'next/dynamic';

const ProjectCarousel = dynamic(
  () => import('./ProjectCarousel'),
  {
    ssr: false,
    loading: () => (
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#070a14]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header skeleton */}
          <div className="flex flex-col items-center gap-4 mb-16">
            <div className="h-6 w-24 rounded-full bg-white/5 animate-pulse" />
            <div className="h-12 w-64 rounded-lg bg-white/5 animate-pulse" />
            <div className="h-5 w-96 max-w-full rounded-md bg-white/5 animate-pulse" />
          </div>

          {/* Cards skeleton */}
          <div className="flex justify-center gap-7">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-[24px] bg-white/5 animate-pulse"
                style={{
                  width: 390,
                  height: 470,
                }}
              />
            ))}
          </div>

        </div>
      </section>
    ),
  }
);

export default function Projects() {
  return <ProjectCarousel />;
}