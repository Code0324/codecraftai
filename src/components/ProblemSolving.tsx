'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCpu, FiTrendingUp, FiZap } from 'react-icons/fi';
import Link from 'next/link';
import { problemSolvingMessages } from '@/lib/constants';
import GlossyButton from './GlossyButton';

const icons = [FiAlertCircle, FiCpu, FiTrendingUp, FiZap];

export default function ProblemSolving() {
  return (
    <section id="problems" className="py-24 relative bg-[#0a0b0f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
          >
            What We Solve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold mt-3 mb-4 heading-font"
          >
            {problemSolvingMessages.headline}
          </motion.h2>
          <div className="section-underline mx-auto" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
          >
            {problemSolvingMessages.subheadline}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problemSolvingMessages.problems.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 border border-white/5 hover:border-[#4F8EF7]/20 transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8EF7]/20 to-[#7C3AED]/20 flex items-center justify-center shrink-0 border border-[#4F8EF7]/30">
                    <Icon className="w-6 h-6 text-[#4F8EF7]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white heading-font">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[#06B6D4] text-sm font-medium">{item.solution}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <GlossyButton variant="ghost" size="lg">
              Explore All Services
            </GlossyButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
