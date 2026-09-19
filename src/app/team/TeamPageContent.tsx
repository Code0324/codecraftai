'use client';

import React from 'react';
import Image from 'next/image';
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
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[#4F8EF7]/20 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="relative h-56 bg-gradient-to-br from-[#0D1117] to-[#1a1a2e] flex items-center justify-center overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="object-contain h-40 w-auto group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-white heading-font">{member.name}</h3>
                <p className="text-[#4F8EF7] text-sm font-medium mb-3">{member.role}</p>
                {member.bio && (
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                )}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span key={skill} className="tech-badge text-xs">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
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
