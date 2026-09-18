'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { pricingTiers } from '@/lib/constants';
import GlossyButton from './GlossyButton';

export default function Pricing() {

  return (
    <section id="pricing" className="py-24 relative bg-[#0a0b0f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font"
          >
            Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Choose the perfect plan for your project. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-8 border ${plan.recommended ? 'pricing-recommended' : 'border-white/5'} relative flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 heading-font">{plan.name}</h3>
                <p className="text-slate-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 h-16 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white heading-font">{plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-4">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/contact">
                <GlossyButton
                  variant={plan.recommended ? 'primary' : 'ghost'}
                  fullWidth
                >
                  {plan.ctaLabel}
                </GlossyButton>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
