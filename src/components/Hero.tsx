'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { techBadges } from '@/lib/constants';
import GlossyButton from './GlossyButton';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

const floatDelays = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word');
        tl.from(words, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        });
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (buttonsRef.current) {
        tl.from(
          buttonsRef.current.children,
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          '-=0.2'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  function scrollToProjects() {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-64px)] py-10 lg:py-16">
          {/* Left — Text */}
          <div className="flex flex-col gap-6 z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex"
            >
              <span
                className="tech-badge text-xs"
                style={{ borderColor: 'rgba(79,142,247,0.4)', color: '#93C5FD' }}
              >
                ✦ AI-First Software Agency
              </span>
            </motion.div>

            {/* H1 */}
            <h1
              ref={titleRef}
              className="heading-font font-bold leading-tight"
              style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
            >
              <span className="block overflow-hidden">
              <span className="hero-word inline-block text-white">We Solve</span>{' '}
              <span className="hero-word inline-block text-white">Your</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-gradient">Business</span>{' '}
              <span className="hero-word inline-block text-gradient">Problems</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-slate-400 leading-relaxed max-w-lg text-base sm:text-lg"
            >
              We identify bottlenecks, design practical solutions, and build AI-powered systems that save time, cut costs, and scale your operations.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 mt-2">
              <Link href="/contact">
                <GlossyButton size="lg">
                  Let's Solve Your Problem
                </GlossyButton>
              </Link>
              <Link href="/services">
                <GlossyButton variant="ghost" size="lg">
                  Explore Services
                </GlossyButton>
              </Link>
            </div>

            {/* Tech badges row */}
            <div className="flex flex-wrap gap-2 mt-4">
              {techBadges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
                  className="tech-badge animate-float"
                  style={{ animationDelay: `${floatDelays[i % floatDelays.length]}s` }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right — Three.js canvas */}
          <div className="relative h-[260px] sm:h-[360px] lg:h-[560px] flex items-center justify-center">
            <div className="absolute inset-0">
              <ParticleCanvas />
            </div>
            {/* Glow behind canvas */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(79,142,247,0.12) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-slate-500 animate-bounce-down" />
      </div>
    </section>
  );
}
