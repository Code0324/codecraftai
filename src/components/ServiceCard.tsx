'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceCardProps {
  image: string;
  title: string;
  index?: number;
}

export default function ServiceCard({ image, title, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: 'easeOut' }}
      className="group flex flex-col items-center cursor-pointer"
      onMouseEnter={(e) => {
        const container = e.currentTarget;
        const img = container.querySelector('.acr-display') as HTMLElement | null;
        const lbl = container.querySelector('.acr-title') as HTMLElement | null;
        if (img) {
          img.style.transform = 'scale(1.06) translateY(-10px)';
          img.style.filter = 'drop-shadow(0 30px 60px rgba(0,0,0,.25))';
        }
        if (lbl) {
          lbl.style.transform = 'translateY(-4px)';
        }
      }}
      onMouseLeave={(e) => {
        const container = e.currentTarget;
        const img = container.querySelector('.acr-display') as HTMLElement | null;
        const lbl = container.querySelector('.acr-title') as HTMLElement | null;
        if (img) {
          img.style.transform = 'scale(1) translateY(0)';
          img.style.filter = 'drop-shadow(0 18px 35px rgba(0,0,0,.18))';
        }
        if (lbl) {
          lbl.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Acrylic Desk Display */}
      <div
        className="acr-display transition-all duration-500 ease-out h-[200px] sm:h-[240px] lg:h-[280px] w-auto"
        style={{
          filter: 'drop-shadow(0 18px 35px rgba(0,0,0,.18))',
        }}
      >
        <Image
          src={image}
          alt={title}
          width={280}
          height={280}
          className="object-contain w-auto h-full"
          priority={index < 4}
        />
      </div>

      {/* Title */}
      <h3
        className="acr-title text-white font-bold text-lg text-center transition-all duration-500 ease-out"
        style={{ marginTop: '20px' }}
      >
        {title}
      </h3>
    </motion.div>
  );
}
