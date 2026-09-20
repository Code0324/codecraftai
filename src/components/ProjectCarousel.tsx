'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import projects from './ProjectData'

export default function ProjectCarousel() {
  // Duplicate projects so the track can loop seamlessly
  const duplicatedProjects = [...projects, ...projects]

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-[0.06]"
          style={{
            background:
              'radial-gradient(circle, #4F8EF7 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-[0.06]"
          style={{
            background:
              'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background:
              'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 lg:mb-16">
          <SectionHeading
            badge="Portfolio"
            title="Our Projects"
            subtitle="Eleven production-ready applications — from AI automation systems to e-commerce platforms. Every project built with precision and purpose."
          />
        </div>

        {/* Carousel */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-60px',
          }}
          transition={{
            delay: 0.15,
            duration: 0.7,
          }}
        >
          <div
            className="
              marquee-wrapper
              relative
              w-full
              overflow-hidden
              py-6
              select-none
              [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]
            "
          >
            <div
              className="
                marquee-track
                flex
                w-max
                gap-6
                lg:gap-8
                hover:[animation-play-state:paused]
              "
            >
              {duplicatedProjects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className="
                    flex-shrink-0
                    w-[320px]
                    sm:w-[360px]
                    lg:w-[390px]
                  "
                >
                  <ProjectCard
                    project={project}
                    isActive={true}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}