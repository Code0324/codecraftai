'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { team, type TeamMember } from '@/lib/constants';

/* ─────────────────────────────────────────────────────────────
   Symmetric layout slots (shared by tablet + desktop)

   The ten cards form an intentional hourglass around the
   center content — identical size, identical styling:

        [CEO]        [Creative Lead]
     [Frontend]  [Designer]  [UI/UX]
          ···  Meet Our Team  ···
     [Backend]  [SEO Spec]  [SEO Exp]
        [Marketing]     [Writer]

   Row y-positions keep ≥ ~170px (desktop) / ~130px (tablet) of
   clear space around the center text block.
   ─────────────────────────────────────────────────────────── */
const SLOTS = [
  // row 1 (2 cards)
  { x: 38, xMd: 35, y: 9 },
  { x: 62, xMd: 65, y: 9 },
  // row 2 (3 cards)
  { x: 20, xMd: 20, y: 25 },
  { x: 50, xMd: 50, y: 25 },
  { x: 80, xMd: 80, y: 25 },
  // row 3 (3 cards)
  { x: 20, xMd: 20, y: 75 },
  { x: 50, xMd: 50, y: 75 },
  { x: 80, xMd: 80, y: 75 },
  // row 4 (2 cards)
  { x: 38, xMd: 35, y: 91 },
  { x: 62, xMd: 65, y: 91 },
];

/* Map the 10 team members onto the slots symmetrically by role. */
const MEMBER_ORDER = [0, 9, 5, 1, 7, 6, 8, 4, 3, 2];

/* Slow-drifting glow particles for the AI network background. */
const PARTICLES: { x: number; y: number; r: number; color: string; dur: string; delay: string }[] = [
  { x: 160,  y: 140, r: 2.2, color: '#4F8EF7', dur: '16s', delay: '0s' },
  { x: 1280, y: 220, r: 1.8, color: '#06B6D4', dur: '19s', delay: '-4s' },
  { x: 90,   y: 620, r: 2.4, color: '#06B6D4', dur: '14s', delay: '-7s' },
  { x: 1350, y: 700, r: 1.6, color: '#4F8EF7', dur: '21s', delay: '-11s' },
  { x: 420,  y: 90,  r: 1.7, color: '#4F8EF7', dur: '17s', delay: '-2s' },
  { x: 1020, y: 840, r: 2.0, color: '#06B6D4', dur: '15s', delay: '-9s' },
  { x: 720,  y: 480, r: 1.5, color: '#4F8EF7', dur: '22s', delay: '-14s' },
  { x: 240,  y: 860, r: 1.9, color: '#06B6D4', dur: '18s', delay: '-6s' },
];

/* ─── Subtle animated AI network (very low opacity) ────────── */
function TeamNetwork() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="teamNodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4F8EF7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connection lines */}
      <g fill="none" stroke="#4F8EF7" strokeWidth="1">
        <line x1="150" y1="150" x2="1290" y2="150" className="team-net-line" strokeDasharray="5 12" opacity="0.12" />
        <line x1="150" y1="150" x2="150" y2="750" className="team-net-line" strokeDasharray="5 12" opacity="0.08" />
        <line x1="1290" y1="150" x2="1290" y2="750" className="team-net-line" strokeDasharray="5 12" opacity="0.08" />
        <line x1="150" y1="750" x2="1290" y2="750" className="team-net-line" strokeDasharray="5 12" opacity="0.12" />
        <line x1="720" y1="60" x2="720" y2="840" strokeDasharray="3 14" opacity="0.05" />
        <line x1="150" y1="300" x2="1290" y2="600" opacity="0.05" />
        <line x1="1290" y1="300" x2="150" y2="600" opacity="0.05" />
      </g>

      {/* Nodes */}
      <g fill="#4F8EF7">
        <circle cx="150" cy="150" r="2.5" opacity="0.4" />
        <circle cx="1290" cy="150" r="2.5" opacity="0.4" />
        <circle cx="150" cy="750" r="2.5" opacity="0.4" />
        <circle cx="1290" cy="750" r="2.5" opacity="0.4" />
        <circle cx="720" cy="450" r="2" opacity="0.25" />
      </g>

      {/* Slow-moving particles */}
      {PARTICLES.map((p, i) => (
        <g
          key={i}
          className="team-particle"
          style={{ animationDuration: p.dur, animationDelay: p.delay } as CSSProperties}
        >
          <circle cx={p.x} cy={p.y} r={p.r * 3} fill="url(#teamNodeGlow)" opacity="0.6" />
          <circle cx={p.x} cy={p.y} r={p.r} fill={p.color} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/* ─── Acrylic glass card (identical styling for every member) ─ */
function TeamCardBody({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="team-card w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px]">
      {imgError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20">
          <span className="heading-font font-bold text-white/90 text-3xl lg:text-4xl">
            {initials}
          </span>
        </div>
      ) : (
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 220px, (min-width: 768px) 180px, 150px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}

      {/* Bottom info scrim */}
      <div
        className="absolute inset-x-0 bottom-0 z-[6] px-3 pb-2.5 pt-9 lg:px-3.5 lg:pb-3 lg:pt-10"
      >
        <p className="heading-font font-semibold text-white leading-tight text-[12.5px] lg:text-sm truncate">
          {member.name}
        </p>
        <p className="text-cyan-200/80 font-medium leading-tight mt-1 text-[10px] lg:text-[11px] truncate">
          {member.role}
        </p>
      </div>
    </div>
  );
}

/* ─── Center content: title, subtitle, description, CTA ────── */
function TeamContent() {
  return (
    <div className="text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="inline-block text-[11px] font-semibold text-cyan-300/80 tracking-[0.24em] uppercase"
      >
        The Team
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.7 }}
        className="heading-font font-bold text-white mt-4"
        style={{ fontSize: 'clamp(34px, 4.2vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
      >
        Meet <span className="text-gradient">Our Team</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.26, duration: 0.7 }}
        className="heading-font font-medium text-slate-200 mt-4 text-lg lg:text-xl"
      >
        Trusted AI Engineers,
        <br />
        Developers &amp; Designers
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.34, duration: 0.7 }}
        className="text-slate-400 mt-3 text-sm leading-relaxed max-w-sm mx-auto"
      >
        Building modern AI solutions for startups and businesses worldwide — intelligent
        products, engineered end to end.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.42, duration: 0.7 }}
        className="mt-8"
      >
        <motion.a
          href="#contact"
          aria-label="Meet the experts — get in touch"
          className="team-cta group"
          whileHover={{ y: -2, transition: { duration: 0.25, ease: 'easeOut' } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.15 } }}
        >
          Meet the Experts
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </motion.a>
      </motion.div>
    </div>
  );
}

/* ─── Desktop / tablet floating card ─────────────────────────
   Three stacked motion layers keep transitions independent:
   1. outer  — entrance (opacity / scale / y, once)
   2. middle — continuous float (y keyframes, 8–12s)
   3. inner  — hover scale/rotate + tap (own snappy transition) */
function TeamOrbitingCard({
  member,
  slot,
  index,
}: {
  member: TeamMember;
  slot: (typeof SLOTS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="team-slot"
      style={
        {
          top: `${slot.y}%`,
          '--x': `${slot.x}%`,
          '--x-md': `${slot.xMd}%`,
          zIndex: 10,
        } as CSSProperties
      }
      initial={{ opacity: 0, scale: 0.8, y: 26 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 8 + (index % 5),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      >
        <motion.a
          href="#contact"
          aria-label={`Meet ${member.name} — ${member.role}`}
          className="group block cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
          whileHover={{
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.45, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        >
          <TeamCardBody member={member} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function TeamSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (dir: 1 | -1) =>
    carouselRef.current?.scrollBy({ left: dir * 170, behavior: 'smooth' });

  /* Center the first card in the mobile carousel once layout settles.
     Never hijack the user's scroll position on resize. */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const center = () => {
      if (el.scrollLeft > 10) return; // user has scrolled — leave it alone
      const card = el.querySelector('[data-team-card]') as HTMLElement | null;
      if (!card) return;
      const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
      const containerCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
      el.scrollLeft = Math.max(0, el.scrollLeft + containerCenter - cardCenter);
    };
    const t = window.setTimeout(center, 120);
    /* If the user starts swiping before the timeout fires, don't yank back. */
    const cancel = () => window.clearTimeout(t);
    el.addEventListener('touchstart', cancel, { once: true });
    el.addEventListener('pointerdown', cancel, { once: true });
    window.addEventListener('resize', center);
    return () => {
      window.clearTimeout(t);
      el.removeEventListener('touchstart', cancel);
      el.removeEventListener('pointerdown', cancel);
      window.removeEventListener('resize', center);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section id="team" className="relative overflow-hidden" style={{ background: '#050816' }}>
        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(79,142,247,0.07), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent 70%)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.05) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
        {/* AI network */}
        <TeamNetwork />

        {/* ── Mobile: content above, swipe carousel below ── */}
        <div className="relative z-10 md:hidden">
          <div className="px-6">
            <TeamContent />
          </div>

          <div className="relative mt-9">
            <div
              ref={carouselRef}
              role="region"
              aria-label="Our team — swipe to browse members"
              className="team-scroll flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-[calc(50%_-_75px)] scroll-pr-6 px-6 pb-2"
            >
              {team.map((m, i) => (
                <div key={m.name} data-team-card className="snap-center shrink-0">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  >
                    <motion.a
                      href="#contact"
                      aria-label={`Meet ${m.name} — ${m.role}`}
                      className="group block cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
                      whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
                    >
                      <TeamCardBody member={m} />
                    </motion.a>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Previous team members"
                className="btn-secondary !w-10 !h-10 hover:scale-105 active:scale-95 transition-transform"
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Next team members"
                className="btn-secondary !w-10 !h-10 hover:scale-105 active:scale-95 transition-transform"
              >
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Tablet + Desktop: symmetric floating composition ── */}
        <div className="relative z-10 hidden md:block max-w-7xl mx-auto px-6 md:min-h-[1460px] lg:min-h-[1720px]">
          {/* Center content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto w-full max-w-md">
              <TeamContent />
            </div>
          </div>

          {/* Team cards */}
          {SLOTS.map((slot, i) => {
            const member = team[MEMBER_ORDER[i]];
            return <TeamOrbitingCard key={member.name} member={member} slot={slot} index={i} />;
          })}
        </div>
      </section>
    </MotionConfig>
  );
}
