'use client';

import { useState, CSSProperties } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { team, type TeamMember } from '@/lib/constants';

/* ─── Central Hub Content ──────────────────────────────────── */
function TeamHub() {
  return (
    <div className="text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="inline-block text-[11px] font-semibold text-cyan-300/80 tracking-[0.24em] uppercase"
      >
        The Team
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.7 }}
        className="heading-font font-bold text-white mt-4"
        style={{ fontSize: 'clamp(34px, 4.2vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
      >
        Meet <span className="text-gradient">Our Team</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.26, duration: 0.7 }}
        className="heading-font font-medium text-slate-200 mt-4 text-lg lg:text-xl"
      >
        Trusted AI Engineers,
        <br />
        Developers &amp; Designers
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.34, duration: 0.7 }}
        className="text-slate-400 mt-3 text-sm leading-relaxed max-w-sm mx-auto"
      >
        Building modern AI solutions for startups and businesses worldwide — intelligent
        products, engineered end to end.
      </motion.p>
    </div>
  );
}

/* ─── Circular Orbit Guide (SVG backdrop) ──────────────────── */
function OrbitGuide({ radius }: { radius: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Central glow */}
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circular orbit guide */}
      <circle
        cx="500"
        cy="500"
        r={radius}
        fill="none"
        stroke="#4F8EF7"
        strokeWidth="1.5"
        strokeDasharray="8 12"
        opacity="0.25"
      />

      {/* Center glow */}
      <circle cx="500" cy="500" r="80" fill="url(#hubGlow)" />
    </svg>
  );
}

/* ─── Desktop/Tablet: Circular Orbit ──────────────────────── */
function DesktopOrbit() {
  const radius = 280; // SVG units from center
  const nodeSize = 100; // width/height of each node

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      <OrbitGuide radius={radius} />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="w-64 text-center pointer-events-auto">
          <TeamHub />
        </div>
      </div>

      {/* Orbiting team members */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          transformOrigin: '50% 50%',
        } as CSSProperties}
      >
        {team.map((member, i) => {
          const angle = (i / team.length) * 360;
          const x = 50 + 40 * Math.cos((angle - 90) * (Math.PI / 180));
          const y = 50 + 40 * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <motion.div
              key={member.name}
              className="absolute w-24 h-24 md:w-28 md:h-28"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              } as CSSProperties}
              animate={{ rotate: -360 }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="group w-full h-full rounded-full border border-white/10 hover:border-[#4F8EF7]/40 transition-all duration-300 cursor-pointer flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-purple-600/5 backdrop-blur-sm overflow-hidden"
                whileHover={{ scale: 1.1, borderColor: '#4F8EF7' }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Initials fallback */}
                <div className="flex flex-col items-center justify-center h-full text-center px-2">
                  <div className="heading-font font-bold text-white text-xs md:text-sm leading-tight">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div className="text-cyan-300/70 text-[9px] md:text-[10px] mt-1 leading-tight max-w-full break-words">
                    {member.role}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Mobile: Static Grid ──────────────────────────────────── */
function MobileGrid() {
  return (
    <div className="space-y-8">
      <div className="px-6">
        <TeamHub />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-6 pb-6">
        {team.map((member) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group rounded-2xl border border-white/10 hover:border-[#4F8EF7]/40 transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-500/5 to-purple-600/5 backdrop-blur-sm overflow-hidden p-4 flex flex-col items-center justify-center min-h-[140px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="heading-font font-bold text-white text-sm text-center">
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="text-cyan-300/70 text-xs mt-2 text-center leading-tight">
              {member.role}
            </div>
            <div className="text-slate-300 text-[11px] mt-2 text-center line-clamp-2">
              {member.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function TeamSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="team" className="relative overflow-hidden py-24 md:py-32" style={{ background: '#050816' }}>
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.07), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)' }}
        />

        {/* Desktop/Tablet: Circular Orbit */}
        <div className="hidden md:block relative z-10 container mx-auto px-6">
          <DesktopOrbit />
        </div>

        {/* Mobile: Static Grid */}
        <div className="md:hidden relative z-10">
          <MobileGrid />
        </div>
      </section>
    </MotionConfig>
  );
}
