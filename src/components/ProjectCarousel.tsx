'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import projects from './ProjectData'

export default function ProjectCarousel() {
  /* ── Duplicate projects for seamless infinite marquee ── */
  const duplicatedProjects = [...projects, ...projects]

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #4F8EF7 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <SectionHeading
          badge="Portfolio"
          title="Our Projects"
          subtitle="Eleven production-ready applications — from AI automation systems to e-commerce platforms. Every project built with precision and purpose."
        />

        {/* Marquee */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.15 }}
        >
          <div className="marquee-wrapper overflow-hidden -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 select-none">
            <div className="marquee-track flex" style={{ willChange: 'transform' }}>
              {duplicatedProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  isActive={true}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
