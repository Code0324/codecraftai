'use client';

import React from 'react';

interface LogoSVGProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function LogoSVG({ size = 40, showText = true, className = "" }: LogoSVGProps) {
  const id = React.useId().replace(/:/g, '');

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Neural-network head SVG icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CodeCraftAI logo"
      >
        <defs>
          <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4F8EF7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`ring-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#4F8EF7" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id={`blur-${id}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx="40"
          cy="40"
          r="38"
          stroke={`url(#ring-grad-${id})`}
          strokeWidth="2.5"
          fill="none"
          filter={`url(#blur-${id})`}
          opacity="0.9"
        />

        {/* Main circle fill */}
        <circle cx="40" cy="40" r="34" fill="#4F8EF7" />

        {/* Radial glow overlay */}
        <circle cx="40" cy="40" r="34" fill={`url(#glow-${id})`} opacity="0.4" />

        {/* Neural head — white strokes */}
        {/* Head outline */}
        <path
          d="M40 14 C28 14 22 22 22 32 C22 40 25 46 31 49 L31 54 L49 54 L49 49 C55 46 58 40 58 32 C58 22 52 14 40 14 Z"
          stroke="white"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Neck */}
        <rect x="33" y="54" width="14" height="6" rx="3" fill="white" opacity="0.9" />

        {/* Neural nodes */}
        <circle cx="40" cy="22" r="2.5" fill="white" />
        <circle cx="30" cy="28" r="2" fill="white" />
        <circle cx="50" cy="28" r="2" fill="white" />
        <circle cx="27" cy="38" r="2" fill="white" />
        <circle cx="53" cy="38" r="2" fill="white" />
        <circle cx="33" cy="44" r="2" fill="white" />
        <circle cx="47" cy="44" r="2" fill="white" />
        <circle cx="40" cy="36" r="2.5" fill="white" />

        {/* Neural connections */}
        <line x1="40" y1="22" x2="30" y2="28" stroke="white" strokeWidth="1" opacity="0.7" />
        <line x1="40" y1="22" x2="50" y2="28" stroke="white" strokeWidth="1" opacity="0.7" />
        <line x1="30" y1="28" x2="27" y2="38" stroke="white" strokeWidth="1" opacity="0.7" />
        <line x1="50" y1="28" x2="53" y2="38" stroke="white" strokeWidth="1" opacity="0.7" />
        <line x1="27" y1="38" x2="33" y2="44" stroke="white" strokeWidth="1" opacity="0.7" />
        <line x1="53" y1="38" x2="47" y2="44" stroke="white" strokeWidth="1" opacity="0.7" />
        <line x1="40" y1="22" x2="40" y2="36" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="28" x2="40" y2="36" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="28" x2="40" y2="36" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="36" x2="33" y2="44" stroke="white" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="36" x2="47" y2="44" stroke="white" strokeWidth="1" opacity="0.5" />

        {/* Eyes */}
        <circle cx="34" cy="35" r="3" fill="white" opacity="0.95" />
        <circle cx="46" cy="35" r="3" fill="white" opacity="0.95" />
        <circle cx="34" cy="35" r="1.5" fill="#4F8EF7" />
        <circle cx="46" cy="35" r="1.5" fill="#4F8EF7" />
      </svg>

      {/* Brand text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="heading-font font-bold text-white"
            style={{ fontSize: size * 0.38, letterSpacing: '-0.01em' }}
          >
            CodeCraftAI
          </span>
          <span
            className="text-blue-300 font-normal"
            style={{ fontSize: size * 0.195, fontFamily: 'Inter, sans-serif', marginTop: 2 }}
          >
            Build smarter with AI Crafted
          </span>
        </div>
      )}
    </div>
  );
}
