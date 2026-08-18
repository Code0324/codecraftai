'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import GlossyButton from './GlossyButton';

const pricingPlans = [
  {
    name: 'Starter',
    desc: 'Perfect for small businesses just getting started.',
    monthlyPrice: '$2,999',
    yearlyPrice: '$2,499',
    features: ['Custom Web Design', 'Responsive Development', 'Basic SEO Setup', '1 Month Support', 'Standard Integration']
  },
  {
    name: 'Pro',
    desc: 'Ideal for growing companies needing advanced features.',
    monthlyPrice: '$5,999',
    yearlyPrice: '$4,999',
    isPopular: true,
    features: ['Everything in Starter', 'Advanced Animations', 'CMS Integration', 'E-commerce Functionality', '3 Months Support', 'Priority Delivery']
  },
  {
    name: 'Enterprise',
    desc: 'For large organizations with complex requirements.',
    monthlyPrice: 'Custom',
    yearlyPrice: 'Custom',
    features: ['Everything in Pro', 'Custom Web App Development', 'Dedicated Project Manager', 'SLA Support', 'Unlimited Revisions', 'Advanced Security']
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

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

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 rounded-full bg-white/10 p-1 flex items-center transition-colors hover:bg-white/20"
            >
              <motion.div 
                layout
                className="w-6 h-6 rounded-full bg-[#4F8EF7]"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-slate-400'}`}>
              Yearly <span className="text-[#06B6D4] ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-8 border ${plan.isPopular ? 'pricing-recommended' : 'border-white/5'} relative flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 heading-font">{plan.name}</h3>
                <p className="text-slate-400 text-sm h-10">{plan.desc}</p>
              </div>

              <div className="mb-8 h-16 flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl font-black text-white heading-font"
                  >
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                {plan.monthlyPrice !== 'Custom' && (
                  <span className="text-slate-400">/ project</span>
                )}
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

              <GlossyButton 
                variant={plan.isPopular ? 'primary' : 'ghost'} 
                fullWidth
              >
                Get Started
              </GlossyButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
