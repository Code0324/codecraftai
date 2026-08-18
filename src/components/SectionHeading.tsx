'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/lib/animations';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  highlight?: string;
}

export default function SectionHeading({ badge, title, subtitle, highlight }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="text-center mb-16"
    >
      {badge && (
        <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
          {badge}
        </span>
      )}
      <h2
        className="heading-font font-bold mt-3"
        style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
      >
        {highlight ? (
          <>
            {title}{' '}
            <span className="text-gradient">{highlight}</span>
          </>
        ) : (
          <span className="text-white">{title}</span>
        )}
      </h2>
      <div className="section-underline" />
      {subtitle && (
        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-base leading-relaxed px-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
