'use client';

import { type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import GlossyButton from './GlossyButton';

interface TeamMember {
  name: string;
  image: string;
}

const centerMember: TeamMember = {
  name: 'Ummay Kulsoom — CEO & Founder',
  image: '/images/our team/AI Team/Ummay Kulsoom — CEO & Founder.png',
};

const orbitingMembers: TeamMember[] = [
  { name: 'Content Writer', image: '/images/our team/AI Team/Content Writer.png' },
  { name: 'SEO Expert', image: '/images/our team/AI Team/SEO Expert.png' },
  { name: 'Backend Developer', image: '/images/our team/AI Team/Backend Developer.png' },
  { name: 'Frontend Developer', image: '/images/our team/AI Team/Frontendd Developer.png' },
  { name: 'UI/UX Designer', image: '/images/our team/AI Team/UI UX Designer.png' },
  { name: 'Graphic Designer', image: '/images/our team/AI Team/Graphic Designer.png' },
  { name: 'Mr Ameer', image: '/images/our team/Mr Ameer.png' },
  { name: 'Ms Laiqa', image: '/images/our team/Ms Laiqa.png' },
];

/* ─── Circular Orbit Guide (SVG) ──────────────────────────── */
function OrbitGuide() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circular orbit guide */}
      <circle
        cx="500"
        cy="500"
        r="330"
        fill="none"
        stroke="#4F8EF7"
        strokeWidth="1"
        strokeDasharray="6 10"
        opacity="0.15"
      />

      {/* Center glow */}
      <circle cx="500" cy="500" r="140" fill="url(#centerGlow)" />
    </svg>
  );
}

/* ─── Desktop/Tablet: Center + Orbit ──────────────────────── */
function DesktopOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-4xl mx-auto">
      <OrbitGuide />

      {/* STATIC CENTER IMAGE (Large, doesn't move) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-cyan-400/40 overflow-hidden shadow-2xl hover:border-cyan-400/70 transition-all duration-300 group cursor-pointer">
          <Image
            src={centerMember.image}
            alt={centerMember.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          {/* Overlay gradient for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 text-center text-white">
            <p className="heading-font font-bold text-sm md:text-base leading-tight">
              {centerMember.name}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ORBITING SIDE IMAGES (8 smaller, animated orbit) */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 120, // Slow, smooth rotation
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          transformOrigin: '50% 50%',
        } as CSSProperties}
      >
        {orbitingMembers.map((member, i) => {
          const angle = (i / orbitingMembers.length) * 360;
          const radius = 310; // distance from center
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <motion.div
              key={member.name}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              } as CSSProperties}
              animate={{ rotate: -360 }}
              transition={{
                duration: 120,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-amber-400/30 hover:border-amber-400/60 overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2" />
                {/* Name on hover */}
                <motion.p
                  className="absolute bottom-2 inset-x-0 text-center text-white text-xs font-bold px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  {member.name}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Mobile: Center + Stacked Side Grid ──────────────────── */
function MobileLayout() {
  return (
    <div className="space-y-8">
      {/* Center image */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-40 h-40 rounded-full border-2 border-cyan-400/40 overflow-hidden shadow-lg">
          <Image
            src={centerMember.image}
            alt={centerMember.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </motion.div>

      <h3 className="text-center heading-font font-bold text-white text-base">
        {centerMember.name}
      </h3>

      {/* Orbiting members in grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-6">
        {orbitingMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 rounded-full border border-amber-400/30 overflow-hidden cursor-pointer hover:border-amber-400/60 transition-all group">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPreview() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="team" className="py-24 md:py-40 relative bg-[#0a0b0f]">
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.06), transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-cyan-300/80 tracking-widest uppercase"
            >
              Meet the
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-5xl font-bold mt-3 mb-4 heading-font"
            >
              AI <span className="text-gradient">Team</span>
            </motion.h2>
            <div className="section-underline mx-auto" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
            >
              CEO-led team with specialized experts orbiting around core leadership.
            </motion.p>
          </div>

          {/* Desktop: Center + Orbit */}
          <div className="hidden md:flex justify-center mb-12">
            <DesktopOrbit />
          </div>

          {/* Mobile: Stacked Layout */}
          <div className="md:hidden mb-12">
            <MobileLayout />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/team">
              <GlossyButton variant="ghost" size="lg">
                Meet the Full Team
              </GlossyButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
