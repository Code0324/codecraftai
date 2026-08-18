'use client';

import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
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
            <ServiceCard
              key={service.title}
              image={service.image}
              title={service.title}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
