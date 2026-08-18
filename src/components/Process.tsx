'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiPenTool, FiCode } from 'react-icons/fi';

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'We dive deep into your business goals, target audience, and market landscape to craft a winning digital strategy.',
    icon: FiTarget
  },
  {
    num: '02',
    title: 'Design & Prototyping',
    desc: 'Our design team creates stunning, user-centric interfaces that align perfectly with your brand identity.',
    icon: FiPenTool
  },
  {
    num: '03',
    title: 'Development & Launch',
    desc: 'We build robust, scalable solutions using the latest tech stack, ensuring a flawless launch and beyond.',
    icon: FiCode
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative bg-[#0a0b0f]">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font"
          >
            Our <span className="text-gradient">Process</span>
          </motion.h2>
          <div className="section-underline" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl"
          >
            A streamlined approach to turning your vision into a digital masterpiece.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#4F8EF7]/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10"
            >
              <div className="glass-card p-8 rounded-2xl h-full border border-white/5 hover:border-[#4F8EF7]/30 transition-colors duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4F8EF7]/20 to-[#7C3AED]/20 flex items-center justify-center mb-6 border border-[#4F8EF7]/30">
                  <step.icon className="w-8 h-8 text-[#4F8EF7]" />
                </div>
                <div className="text-4xl font-black text-white/5 absolute top-6 right-6 heading-font">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 heading-font">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
