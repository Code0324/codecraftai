'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { team, featuredTeamIndices } from '@/lib/constants';
import GlossyButton from './GlossyButton';

const featured = featuredTeamIndices.map((i) => team[i]).filter(Boolean);

export default function TeamPreview() {
  return (
    <section id="team" className="py-24 relative bg-[#0a0b0f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold mt-3 mb-4 heading-font"
          >
            Meet the <span className="text-gradient">Team</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
          >
            Passionate developers, designers, and strategists building AI-powered solutions.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {featured.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#4F8EF7]/20 transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#0D1117] to-[#1a1a2e] border border-white/10 group-hover:border-[#4F8EF7]/30 transition-colors">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </div>
              <h3 className="text-base font-bold text-white heading-font">{member.name}</h3>
              <p className="text-[#4F8EF7] text-xs font-medium">{member.role}</p>
            </motion.div>
          ))}
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
  );
}
