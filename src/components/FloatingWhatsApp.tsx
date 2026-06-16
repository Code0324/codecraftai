'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const PHONE = '923249208788';
const MESSAGE = encodeURIComponent('Hi CodeCraftAI! I\'m interested in your services.');
const WA_URL = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed z-[9999] w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        bottom: '96px',
        right: '24px',
        background: '#25D366',
        boxShadow: '0 0 20px rgba(37,211,102,0.45), 0 4px 16px rgba(0,0,0,0.3)',
      }}
      aria-label="Chat on WhatsApp"
    >
      {/* Outer pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-25"
        style={{ background: '#25D366' }}
      />
      {/* Inner glow ring */}
      <span
        className="absolute inset-[-4px] rounded-full opacity-20"
        style={{
          border: '2px solid #25D366',
          animation: 'wa-pulse 2s ease-in-out infinite',
        }}
      />
      <FaWhatsapp size={26} color="#fff" />
    </motion.a>
  );
}
