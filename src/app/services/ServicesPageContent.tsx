'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { services, contactEmail } from '@/lib/constants';
import GlossyButton from '@/components/GlossyButton';

const technologies: Record<string, string[]> = {
  'ai-agents': ['Claude API', 'OpenAI', 'FastAPI', 'Python'],
  'ai-chatbots': ['Gemini', 'Claude', 'Next.js', 'Firebase'],
  'business-automation': ['n8n', 'Zapier', 'Python', 'REST APIs'],
  'ecommerce': ['Next.js', 'Stripe', 'Firebase', 'Tailwind CSS'],
  'mobile-apps': ['React Native', 'Expo', 'TypeScript', 'Firebase'],
  'custom-dashboards': ['Next.js', 'Chart.js', 'PostgreSQL', 'Tailwind CSS'],
  'crm': ['Next.js', 'Neon DB', 'Firebase', 'Claude API'],
  'n8n-automation': ['n8n', 'Docker', 'Node.js', 'REST APIs'],
  'portfolio': ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
  'saas-ai': ['Next.js', 'Stripe', 'PostgreSQL', 'Docker'],
};

export default function ServicesPageContent() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
        >
          Our Services
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold mt-3 mb-4 heading-font"
        >
          Technology That <span className="text-gradient">Solves Problems</span>
        </motion.h1>
        <div className="section-underline mx-auto" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
        >
          We don&apos;t just build software — we solve your business challenges with the right mix of AI, automation, and development expertise.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#4F8EF7]/20 transition-all duration-300"
            >
              <h2 className="text-lg font-bold text-white mb-2 heading-font">{service.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.shortDescription}</p>

              {technologies[service.slug] && (
                <div className="flex flex-wrap gap-1.5">
                  {technologies[service.slug].map((tech) => (
                    <span key={tech} className="tech-badge text-xs">{tech}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mt-16">
        <div className="glass-card rounded-2xl p-10 border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-4 heading-font">Ready to Solve Your Business Problem?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Tell us about your challenge, and we&apos;ll design the right solution. Free consultation, no commitment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <GlossyButton size="lg">Book a Free Consultation</GlossyButton>
            </Link>
            <a href={`mailto:${contactEmail}`}>
              <GlossyButton variant="ghost" size="lg">{contactEmail}</GlossyButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
