'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselControlsProps {
  prevSlide: () => void
  nextSlide: () => void
  selectedIndex: number
  slideCount: number
  scrollTo: (index: number) => void
}

export default function CarouselControls({
  prevSlide,
  nextSlide,
  selectedIndex,
  slideCount,
  scrollTo,
}: CarouselControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      {/* Arrows + Dots row */}
      <div className="flex items-center gap-6">
        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="btn-secondary !w-11 !h-11 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === selectedIndex ? 24 : 8,
                height: 8,
                background:
                  i === selectedIndex
                    ? 'linear-gradient(90deg, #4F8EF7, #7C3AED)'
                    : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="btn-secondary !w-11 !h-11 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Next project"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Slide counter */}
      <div className="text-sm font-mono text-slate-500 tracking-wider">
        <span className="text-white font-semibold">
          {String(selectedIndex + 1).padStart(2, '0')}
        </span>
        <span className="mx-2 text-slate-600">/</span>
        <span>{String(slideCount).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
