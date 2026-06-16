'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiFramer, SiVercel, SiGithub, SiFigma } from 'react-icons/si';

const stats = [
  { label: 'Projects Delivered', value: '150+' },
  { label: 'Happy Clients', value: '98%' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Team Members', value: '12' }
];

const techStack = [
  { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiReact, name: 'React' },
  { icon: SiTailwindcss, name: 'Tailwind CSS' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiFramer, name: 'Framer Motion' },
  { icon: SiVercel, name: 'Vercel' },
  { icon: SiGithub, name: 'GitHub' },
  { icon: SiFigma, name: 'Figma' }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font"
          >
            We Build the Future of <span className="text-gradient">Web</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 mb-12"
          >
            CodeCraftAI is a premier web agency blending cutting-edge design with powerful engineering. We transform bold ideas into exceptional digital experiences that drive growth and captivate audiences.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center border border-white/5"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Marquee */}
        <div className="w-full overflow-hidden relative py-10 before:absolute before:left-0 before:top-0 before:w-32 before:h-full before:bg-gradient-to-r before:from-[#0a0b0f] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-32 after:h-full after:bg-gradient-to-l after:from-[#0a0b0f] after:to-transparent after:z-10">
          <div className="flex w-max" style={{ animation: 'marqueeScroll 30s linear infinite' }}>
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 px-8 text-slate-500 hover:text-white transition-colors duration-300">
                <tech.icon className="w-8 h-8" />
                <span className="text-xl font-medium heading-font">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
