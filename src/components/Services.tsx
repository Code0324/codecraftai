'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { services } from '@/lib/constants';

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#06071a' }}
    >
      {/* Section header */}
      <SectionHeading
        badge="What We Do"
        title="Our Services"
        subtitle="We deliver production-grade AI solutions — from custom apps to intelligent automation — designed to transform how your business operates."
      />

      {/* Service Cards Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Image Container */}
              {service.image && (
                <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-grow flex flex-col">
                <h3 className="text-base md:text-lg font-bold text-white heading-font mb-2 group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed flex-grow">
                  {service.shortDescription}
                </p>
              </div>

              {/* Hover accent */}
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-amber-500 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
