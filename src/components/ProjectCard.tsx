'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import type { CarouselProject } from './ProjectData'

interface ProjectCardProps {
  project: CarouselProject
  isActive: boolean
  index: number
}

export default function ProjectCard({ project, isActive, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: Math.min(index * 0.12, 1.2), duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="marquee-slide min-w-0"
    >
      <div
        className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[24px] transition-all duration-500 ease-out flex flex-col h-[540px] md:h-[620px] lg:h-[680px] pt-4 md:pt-6 lg:pt-8"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: isActive
            ? '0 8px 48px rgba(79,142,247,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          opacity: isActive ? 1 : 0.55,
          filter: isActive ? 'none' : 'blur(1px)',
          transform: isActive ? 'scale(1)' : 'scale(0.9)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = 'scale(1.04)'
          el.style.boxShadow = '0 16px 64px rgba(79,142,247,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
          el.style.borderColor = 'rgba(79,142,247,0.35)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = isActive ? 'scale(1)' : 'scale(0.9)'
          el.style.boxShadow = isActive
            ? '0 8px 48px rgba(79,142,247,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
          el.style.borderColor = 'rgba(255,255,255,0.08)'
        }}
      >
        {/* ── Browser Mockup (~65%) ── */}
        <div className="flex flex-col min-h-0" style={{ flex: '2.0 1 0%' }}>
          {/* Browser toolbar */}
          <div
            className="flex items-center gap-1.5 px-4 py-[10px] shrink-0"
            style={{
              background: 'rgba(24,24,40,0.95)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Traffic-light dots */}
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />

            {/* URL bar */}
            <div
              className="ml-3 flex-1 rounded-md px-3 py-[5px] text-[11px] text-slate-500 truncate select-none"
              style={{
                background: 'rgba(0,0,0,0.35)',
                fontFamily: 'SF Mono, Monaco, monospace',
              }}
            >
              {project.liveUrl.replace('https://', '')}
            </div>
          </div>

          {/* Screenshot viewport */}
          <div className="relative flex-1 min-h-0 overflow-hidden" style={{ background: '#070712' }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
              className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.02]"
              loading={index === 0 ? 'eager' : 'lazy'}
              priority={index === 0}
            />

            {/* Category badge */}
            <div
              className="absolute top-3 right-3 z-10 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(5,8,22,0.75)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94A3B8',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {project.category}
            </div>
          </div>
        </div>

        {/* ── Content Area (~32%) ── */}
        <div className="flex flex-col justify-between px-5 py-3.5 sm:px-6 sm:py-4 shrink-0" style={{ flex: '1 1 0%' }}>
          {/* Title */}
          <h3 className="heading-font font-semibold text-white text-sm sm:text-base leading-snug line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="tech-badge text-[10px] sm:text-xs px-2 py-[3px] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(79,142,247,0.25)] group-hover:border-blue-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 transition-all duration-300 group-hover:translate-y-[-2px]">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-center text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5"
            >
              Live Demo <ExternalLink size={12} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: 34, height: 34 }}
              aria-label={`${project.title} source code`}
            >
              <FaGithub size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
