'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'mark' | 'full';

interface BrandLogoProps {
  variant?: Variant;
  /** Rendered height in px (width follows the aspect ratio). */
  size?: number;
  className?: string;
  priority?: boolean;
  /** Adds a cyan neon halo around the logo. */
  neon?: boolean;
}

const ASSETS: Record<Variant, { src: string; w: number; h: number }> = {
  mark: { src: '/brand/logo-mark.png', w: 1024, h: 1024 },
  full: { src: '/brand/logo-full.png', w: 741, h: 579 },
};

/* Additive-only embossed bevel: specular light on top of the untouched logo pixels. */
function EmbossFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="cc-emboss" colorInterpolationFilters="sRGB" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting
            in="blur"
            surfaceScale="4"
            specularConstant="0.8"
            specularExponent="20"
            lightingColor="#ffffff"
            result="spec"
          >
            <feDistantLight azimuth="225" elevation="50" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.6" k4="0" />
        </filter>
      </defs>
    </svg>
  );
}

export default function BrandLogo({ variant = 'mark', size = 40, className = '', priority = false, neon = false }: BrandLogoProps) {
  const reduce = useReducedMotion();
  const { src, w, h } = ASSETS[variant];
  const width = Math.round((size * w) / h);
  const mask = `url(${src})`;

  return (
    <span
      className={`cc-brand-logo group relative inline-block shrink-0 ${className}`}
      style={{ width, height: size }}
    >
      <EmbossFilter />
      <Image
        src={src}
        alt="CodeCraftAI logo"
        width={w}
        height={h}
        priority={priority}
        sizes={`${width}px`}
        className={`cc-brand-logo-img h-full w-full object-contain ${neon ? 'cc-neon' : ''}`}
      />
      {/* Gloss sweep, clipped to the logo's own shape */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      >
        <motion.span
          className="absolute inset-y-0 w-[60%]"
          style={{
            left: '-60%',
            background:
              'linear-gradient(115deg, transparent 20%, rgba(255,255,255,.55) 50%, transparent 80%)',
          }}
          animate={reduce ? undefined : { left: ['-60%', '120%'] }}
          transition={
            reduce ? undefined : { duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4.6 }
          }
          whileHover={reduce ? undefined : { left: '120%', transition: { duration: 0.8, ease: 'easeInOut' } }}
        />
      </span>
    </span>
  );
}
