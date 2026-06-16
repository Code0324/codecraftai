'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { team } from '@/lib/constants';
import { fadeUpVariants, staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="team" ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Header */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
          The People
        </span>
        <h2
          className="heading-font font-bold mt-3 text-white"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Our Team
        </h2>
        <div className="section-underline" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-base leading-relaxed px-4">
          Passionate engineers and designers building the AI products of tomorrow.
        </p>
      </motion.div>

      {/* Members */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {team.map((member) => (
          <motion.div
            key={member.name}
            variants={staggerItemVariants}
            className="flex flex-col items-center gap-4 group"
          >
            {/* Avatar */}
            <div className="relative">
              {/* Animated glow ring */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'transparent',
                  boxShadow: `0 0 0 3px transparent, 0 0 20px rgba(79,142,247,0.7)`,
                  borderRadius: '50%',
                  inset: '-4px',
                }}
              />
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center flex-shrink-0 relative`}
                style={{
                  boxShadow: '0 0 0 3px rgba(255,255,255,0.08)',
                  transition: 'box-shadow 0.3s',
                }}
              >
                <span className="heading-font font-bold text-white text-2xl">
                  {member.initials}
                </span>

                {/* Glow ring on hover via CSS */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 0 3px rgba(79,142,247,0.6), 0 0 24px rgba(79,142,247,0.4)`,
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="text-center">
              <p className="heading-font font-semibold text-white text-sm leading-tight">
                {member.name}
              </p>
              <p className="text-slate-400 text-xs mt-1">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
