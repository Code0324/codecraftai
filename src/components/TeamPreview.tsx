'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import GlossyButton from './GlossyButton';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 'ceo',
    name: 'Ummay Kulsoom',
    role: 'CEO & Founder',
    image: '/images/our team/AI Team/Ummay Kulsoom — CEO & Founder.png',
  },
  {
    id: 'member-1',
    name: 'Content Writer',
    role: 'AI Specialist',
    image: '/images/our team/AI Team/Content Writer.png',
  },
  {
    id: 'member-2',
    name: 'SEO Expert',
    role: 'SEO Specialist',
    image: '/images/our team/AI Team/SEO Expert.png',
  },
  {
    id: 'member-3',
    name: 'Backend Developer',
    role: 'Developer',
    image: '/images/our team/AI Team/Backend Developer.png',
  },
  {
    id: 'member-4',
    name: 'Frontend Developer',
    role: 'Developer',
    image: '/images/our team/AI Team/Frontendd Developer.png',
  },
  {
    id: 'member-5',
    name: 'UI/UX Designer',
    role: 'Designer',
    image: '/images/our team/AI Team/UI UX Designer.png',
  },
  {
    id: 'member-6',
    name: 'Graphic Designer',
    role: 'Designer',
    image: '/images/our team/AI Team/Graphic Designer.png',
  },
  {
    id: 'member-7',
    name: 'Mr Ameer',
    role: 'AI Engineer',
    image: '/images/our team/Mr Ameer.png',
  },
  {
    id: 'member-8',
    name: 'Ms Laiqa',
    role: 'Marketing Specialist',
    image: '/images/our team/Ms Laiqa.png',
  },
];

/* ─── Animated Team Card ──────────────────────────────────── */
function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const isCEO = index === 0;
  const cardSize = isCEO ? 'w-40 h-48 md:w-48 md:h-56' : 'w-28 h-36 md:w-32 md:h-40';
  const imageSize = isCEO ? 'h-32 md:h-40' : 'h-24 md:h-28';
  const nameSize = isCEO ? 'text-base md:text-lg' : 'text-xs md:text-sm';
  const roleSize = isCEO ? 'text-xs md:text-sm' : 'text-[9px] md:text-xs';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -12, scale: 1.05 }}
      className={`group flex flex-col items-center ${isCEO ? 'order-first md:order-none md:col-span-full' : ''}`}
    >
      {/* Image Container */}
      <div className={`${cardSize} relative rounded-2xl overflow-hidden border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Name & Role */}
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.2, duration: 0.5 }}
      >
        <h3 className={`heading-font font-bold text-white ${nameSize} leading-tight`}>
          {member.name}
        </h3>
        <p className={`text-cyan-300/70 ${roleSize} mt-1 leading-tight`}>
          {member.role}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Desktop Grid Layout ──────────────────────────────────── */
function DesktopLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto justify-items-center"
    >
      {teamMembers.map((member, i) => (
        <TeamCard key={member.id} member={member} index={i} />
      ))}
    </motion.div>
  );
}

/* ─── Mobile Layout ──────────────────────────────────────── */
function MobileLayout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-6 max-w-sm mx-auto"
    >
      {/* CEO first on mobile */}
      <TeamCard member={teamMembers[0]} index={0} />

      {/* Rest of team in grid */}
      <div className="grid grid-cols-2 gap-4 w-full px-4">
        {teamMembers.slice(1).map((member, i) => (
          <TeamCard key={member.id} member={member} index={i + 1} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────── */
export default function TeamPreview() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="team" className="py-24 md:py-40 relative bg-black">
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05), transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
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
              className="text-4xl md:text-5xl font-bold mt-4 mb-4 heading-font text-white"
            >
              Meet the <span className="text-gradient">Experts</span>
            </motion.h2>

            <div className="section-underline mx-auto" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto mt-6"
            >
              A talented team of AI engineers, developers, and designers dedicated to building innovative solutions.
            </motion.p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:block mb-16">
            <DesktopLayout />
          </div>

          {/* Mobile Stack */}
          <div className="md:hidden mb-16">
            <MobileLayout />
          </div>

          {/* CTA Button */}
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
