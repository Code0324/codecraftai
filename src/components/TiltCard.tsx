'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const rotateX = -(deltaY / (rect.height / 2)) * intensity;
    const rotateY = (deltaX / (rect.width / 2)) * intensity;
    setTransform({ rotateX, rotateY });
  }

  function handleMouseLeave() {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.01 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
