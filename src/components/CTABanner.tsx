'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlossyButton from './GlossyButton';

export default function CTABanner() {
  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F8EF7]/20 via-[#7C3AED]/20 to-[#06B6D4]/20 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] to-transparent opacity-80 z-0" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6 heading-font">
              Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">extraordinary?</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join leading brands who trust CodeCraftAI to deliver exceptional digital experiences that drive real business results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlossyButton size="lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Your Project
              </GlossyButton>
              <GlossyButton variant="ghost" size="lg" onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                View Pricing
              </GlossyButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
