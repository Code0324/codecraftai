'use client';

import { type CSSProperties } from 'react';
import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import { team, type TeamMember } from '@/lib/constants';

/* ─── Get CEO and surrounding team ──────────────────────────── */
const ceo = team.find((m) => m.role.includes('CEO'));
const surroundingTeam = team.filter((m) => !m.role.includes('CEO')).slice(0, 6);

/* ─── Circular Orbit Guide (SVG backdrop) ──────────────────── */
function OrbitGuide() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circular orbit guide */}
      <circle
        cx="500"
        cy="500"
        r="320"
        fill="none"
        stroke="#4F8EF7"
        strokeWidth="1.5"
        strokeDasharray="8 12"
        opacity="0.2"
      />

      {/* Center glow */}
      <circle cx="500" cy="500" r="120" fill="url(#hubGlow)" />
    </svg>
  );
}

/* ─── Glass Shield Circle (Image + Name) ──────────────────── */
function GlassShieldCircle({
  member,
  isCenter = false,
}: {
  member: TeamMember;
  isCenter?: boolean;
}) {
  const size = isCenter ? 'w-40 h-40 md:w-48 md:h-48' : 'w-24 h-24 md:w-28 md:h-28';
  const textSize = isCenter ? 'text-sm md:text-base' : 'text-xs md:text-sm';
  const nameSize = isCenter ? 'text-lg md:text-xl' : 'text-xs md:text-sm';

  return (
    <motion.div
      className={`${size} relative rounded-full border border-white/20 hover:border-[#4F8EF7]/60 transition-all duration-300 cursor-pointer overflow-hidden group flex-shrink-0`}
      whileHover={{ scale: isCenter ? 1.08 : 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Image */}
      {member.image && (
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          unoptimized
        />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60" />

      {/* Name + Role overlay (bottom) */}
      <div className="absolute bottom-0 inset-x-0 p-2 md:p-3 text-center text-white">
        <div className={`heading-font font-bold ${nameSize} leading-tight`}>
          {member.name}
        </div>
        {!isCenter && (
          <div className={`text-cyan-300/80 ${textSize} leading-tight mt-0.5`}>
            {member.role}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Desktop/Tablet: Circular Orbit ──────────────────────── */
function DesktopOrbit() {
  if (!ceo) return null;

  return (
    <div className="relative w-full aspect-square max-w-4xl mx-auto">
      <OrbitGuide />

      {/* Rotating ring with CEO center + surrounding team */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          transformOrigin: '50% 50%',
        } as CSSProperties}
      >
        {/* Central CEO circle (large, at center) */}
        <div className="absolute">
          <GlassShieldCircle member={ceo} isCenter={true} />
        </div>

        {/* Surrounding team members (6 positions around orbit) */}
        {surroundingTeam.map((member, i) => {
          const angle = (i / surroundingTeam.length) * 360;
          const radius = 280; // distance from center in SVG units
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <motion.div
              key={member.name}
              className="absolute"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              } as CSSProperties}
              animate={{ rotate: -360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <GlassShieldCircle member={member} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Mobile: Static Grid ──────────────────────────────────── */
function MobileGrid() {
  if (!ceo) return null;

  return (
    <div className="space-y-8 px-6 pb-6">
      {/* CEO featured card */}
      <div className="text-center">
        <div className="inline-block mb-4">
          <GlassShieldCircle member={ceo} isCenter={true} />
        </div>
        <h3 className="text-lg font-bold text-white heading-font">{ceo.name}</h3>
        <p className="text-[#4F8EF7] text-sm font-medium">{ceo.role}</p>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {surroundingTeam.map((member) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-2">
              <GlassShieldCircle member={member} />
            </div>
            <h4 className="text-xs font-bold text-white heading-font line-clamp-2">{member.name}</h4>
            <p className="text-cyan-300/70 text-[10px] mt-1 line-clamp-2">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section Header ──────────────────────────────────────── */
function TeamHeader() {
  return (
    <div className="text-center mb-16 px-6">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block text-sm font-semibold text-cyan-300/80 tracking-widest uppercase"
      >
        Our Team
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-4xl md:text-5xl font-bold mt-4 mb-4 heading-font"
      >
        Meet <span className="text-gradient">Our Team</span>
      </motion.h2>
      <div className="section-underline mx-auto" />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
      >
        Trusted AI Engineers, Developers &amp; Designers building modern AI solutions worldwide.
      </motion.p>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function TeamSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="team" className="relative overflow-hidden py-24 md:py-40" style={{ background: '#050816' }}>
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.07), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)' }}
        />

        <div className="relative z-10 container mx-auto px-6">
          <TeamHeader />

          {/* Desktop: Circular Orbit */}
          <div className="hidden md:flex justify-center">
            <DesktopOrbit />
          </div>

          {/* Mobile: Static Grid */}
          <div className="md:hidden">
            <MobileGrid />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
