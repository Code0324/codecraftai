'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { pricingTiers } from '@/lib/constants';
import GlossyButton from '@/components/GlossyButton';

export default function PricingPageContent() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
        >
          Pricing
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold mt-3 mb-4 heading-font"
        >
          Transparent <span className="text-gradient">Pricing</span>
        </motion.h1>
        <div className="section-underline mx-auto" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
        >
          No hidden fees. No surprises. Choose the plan that fits your needs, and let&apos;s build something great together.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-8 border relative flex flex-col ${
                plan.recommended
                  ? 'border-[#4F8EF7]/40 shadow-lg shadow-[#4F8EF7]/10'
                  : 'border-white/5'
              }`}
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
                  {plan.features.map((feature) => (
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
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-white text-center mb-8 heading-font">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I customize a plan?', a: 'Absolutely. Every project is different — contact us and we\'ll tailor a solution to your exact needs and budget.' },
            { q: 'Do you offer payment plans?', a: 'Yes, we can discuss milestone-based payments for larger projects. Just let us know your preference.' },
            { q: 'What happens after the project is delivered?', a: 'All plans include a support period. Extended maintenance and support packages are available after that.' },
            { q: 'Is there a free consultation?', a: 'Yes! We offer a free 30-minute consultation to understand your needs and recommend the right approach.' },
          ].map((item) => (
            <div key={item.q} className="glass-card rounded-xl p-6 border border-white/5">
              <h3 className="text-white font-semibold mb-2 heading-font">{item.q}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mt-20">
        <div className="glass-card rounded-2xl p-12 border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-4 heading-font">Not Sure Which Plan?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Let&apos;s talk about your project. We&apos;ll recommend the best approach based on your goals and budget.
          </p>
          <Link href="/contact">
            <GlossyButton size="lg">Schedule a Free Call</GlossyButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
