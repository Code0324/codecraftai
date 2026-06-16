'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "CodeCraftAI completely transformed our online presence. The speed and design are unparalleled.",
    author: "Sarah Jenkins",
    role: "CMO, TechFlow",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The team's attention to detail and technical expertise helped us launch 3 weeks ahead of schedule.",
    author: "David Chen",
    role: "Founder, StartupX",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    quote: "Working with them was seamless. The animations and user experience are exactly what we wanted.",
    author: "Elena Rodriguez",
    role: "Product Lead, Innovate",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    quote: "A rare combination of stellar design and robust engineering. Worth every penny.",
    author: "Marcus Johnson",
    role: "CEO, GrowthCorp",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

export default function Testimonials() {
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font"
          >
            Client <span className="text-gradient">Success Stories</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
        </div>
      </div>

      <div className="w-full overflow-hidden relative pb-10 before:absolute before:left-0 before:top-0 before:w-32 before:h-full before:bg-gradient-to-r before:from-[#0a0b0f] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-32 after:h-full after:bg-gradient-to-l after:from-[#0a0b0f] after:to-transparent after:z-10 hover:[&>div]:pause">
        <div className="flex w-max gap-6 px-6 group" style={{ animation: 'testiScroll 40s linear infinite' }}>
          {scrollItems.map((item, i) => (
            <div 
              key={i} 
              className="glass-card p-5 sm:p-8 rounded-2xl w-[300px] sm:w-[400px] flex-shrink-0 border border-white/5"
            >
              <div className="text-[#4F8EF7] text-4xl font-serif mb-4">"</div>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">{item.quote}</p>
              <div className="flex items-center gap-4">
                <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="text-white font-bold text-sm heading-font">{item.author}</div>
                  <div className="text-slate-500 text-xs">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Hack to support pause on hover */}
        <style>{`
          .group:hover {
            animation-play-state: paused !important;
          }
        `}</style>
      </div>
    </section>
  );
}
