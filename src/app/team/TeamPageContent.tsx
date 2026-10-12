'use client';

import React from 'react';
import TeamAvatar from '@/components/TeamAvatar';
import { motion } from 'framer-motion';
import { team } from '@/lib/constants';

export default function TeamPageContent() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
        >
          Our Team
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold mt-3 mb-4 heading-font"
        >
          The People Behind <span className="text-gradient">CodeCraftAI</span>
        </motion.h1>
        <div className="section-underline mx-auto" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
        >
          A team of passionate developers, designers, and strategists dedicated to building AI-powered solutions that drive real business results.
        </motion.p>
      </section>

      {/* Team Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {([['Human Team', 'human'], ['AI Agents', 'ai']] as const).map(([title, group]) => (
          <div key={group} className="mb-14">
            <h2 className="heading-font mb-6 text-center text-xl font-bold text-white">{title}</h2>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {team.filter((m) => m.group === group).map((member) => (
                <motion.li
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="glass-card mx-auto flex h-full w-full max-w-[260px] flex-col items-center rounded-2xl border border-white/5 p-4 text-center transition-colors hover:border-[#4F8EF7]/30"
                >
                  <TeamAvatar src={member.image} alt={member.name} size={104} />
                  <h3 className="heading-font mt-3 text-base font-bold leading-tight text-white">{member.name}</h3>
                  <p className="mb-2 mt-1 text-sm font-medium text-[#4F8EF7]">{member.role}</p>
                  {member.bio && <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{member.bio}</p>}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mt-20">
        <div className="glass-card rounded-2xl p-12 border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-4 heading-font">Want to Join Our Team?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We&apos;re always looking for talented people who are passionate about AI and building great products.
          </p>
          <a href="mailto:contact@codecraftai.net">
            <button className="btn-primary">Get in Touch</button>
          </a>
        </div>
      </section>
    </div>
  );
}
