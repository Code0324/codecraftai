'use client';

import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import { team } from '@/lib/constants';
import TeamAvatar from './TeamAvatar';

const humans = team.filter((m) => m.group === 'human').slice(0, 4);
const agents = team.filter((m) => m.group === 'ai').slice(0, 4);

function Group({ title, members }: { title: string; members: typeof team }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-cyan-300/80">{title}</h3>
      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {members.map((m) => (
          <li key={m.name} className="flex flex-col items-center text-center">
            <TeamAvatar src={m.image} alt={m.name} size={112} />
            <p className="heading-font mt-3 text-sm font-bold leading-tight text-white md:text-base">{m.name}</p>
            <p className="mt-1 text-xs leading-tight text-cyan-300/70 md:text-sm">{m.role}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function TeamPreview() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="team" className="relative bg-black py-24 md:py-32">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.08), transparent 70%)' }}
        />
        <div className="container relative z-10 mx-auto px-6">
          <div className="mb-14 text-center">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-cyan-300/80">Our Team</span>
            <h2 className="heading-font mb-4 mt-4 text-4xl font-bold text-white md:text-5xl">
              Meet the <span className="text-gradient">Experts</span>
            </h2>
            <div className="section-underline mx-auto" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              A talented team of AI engineers, developers, and designers dedicated to building innovative solutions.
            </p>
          </div>

          <Group title="Human Team" members={humans} />
          <Group title="AI Agents" members={agents} />

          <div className="text-center">
            <Link href="/team" className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200">
              Meet the full team →
            </Link>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
