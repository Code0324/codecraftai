'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ServicesCarousel from './ServicesCarousel';
import TiltCard from './TiltCard';
import GlossyButton from './GlossyButton';
import { fadeUpVariants } from '@/lib/animations';
import { services } from '@/lib/constants';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ background: '#06071a' }}
      className="relative py-24 lg:py-32"
    >
      {/* Section header */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
          What We Do
        </span>
        <h2
          className="heading-font font-bold mt-3 text-white"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
        >
          Our Services
        </h2>
        <div className="section-underline" />
        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-base leading-relaxed px-4">
          We deliver production-grade AI solutions — from custom apps to intelligent automation —
          designed to transform how your business operates.
        </p>
      </motion.div>

      {/* Oval rotating carousel */}
      <ServicesCarousel />

      {/* Service Cards with Images */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUpVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <TiltCard className="overflow-hidden flex flex-col h-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={220}
                    className="w-full h-44 object-cover rounded-t-2xl"
                    unoptimized
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{service.description}</p>
                    <div className="mt-5">
                      <GlossyButton href="#contact" size="sm">Learn More</GlossyButton>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
