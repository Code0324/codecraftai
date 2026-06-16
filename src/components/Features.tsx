'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiLayout, FiSmartphone, FiShield, FiSearch, FiCode } from 'react-icons/fi';

const features = [
  {
    icon: FiZap,
    title: 'Lightning Fast',
    desc: 'Optimized performance for sub-second load times and incredible Core Web Vitals scores.'
  },
  {
    icon: FiLayout,
    title: 'Modern Aesthetics',
    desc: 'Award-winning designs that captivate users and elevate your brand presence.'
  },
  {
    icon: FiSmartphone,
    title: 'Fully Responsive',
    desc: 'Flawless experiences across all devices, from massive desktop monitors to mobile phones.'
  },
  {
    icon: FiShield,
    title: 'Enterprise Security',
    desc: 'Built with best practices to keep your data safe and your applications secure.'
  },
  {
    icon: FiSearch,
    title: 'SEO Optimized',
    desc: 'Structured perfectly for search engines to ensure your content ranks highly.'
  },
  {
    icon: FiCode,
    title: 'Clean Architecture',
    desc: 'Maintainable, scalable codebases built with modern patterns and TypeScript.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font"
          >
            Powerful <span className="text-gradient">Features</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Everything you need to build a world-class digital presence, delivered with uncompromising quality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#7C3AED]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4F8EF7]/10 to-[#7C3AED]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-[#06B6D4]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 heading-font">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
