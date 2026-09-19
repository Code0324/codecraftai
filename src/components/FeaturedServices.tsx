'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { services, featuredServiceSlugs } from '@/lib/constants';
import GlossyButton from './GlossyButton';

const featured = services.filter((s) => featuredServiceSlugs.includes(s.slug));

export default function FeaturedServices() {
  return (
    <section id="services" className="py-32 relative bg-[#0a0b0f]">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold mt-3 mb-4 heading-font"
          >
            Our <span className="text-gradient">Services</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
          >
            From AI agents to full-stack web apps — we deliver solutions that solve real business problems.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {featured.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-white/5 hover:border-[#4F8EF7]/20 transition-all duration-300 relative"
              style={{ minHeight: '280px' }}
            >
              {/* Full Image Card */}
              {service.image && (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
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
