'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/lib/constants';
import { fadeUpVariants } from '@/lib/animations';

/* ─── Screenshot URL builder ────────────────────────────────── */
function thumb(siteUrl: string, width = 600, crop = 380): string {
  return `https://image.thum.io/get/width/${width}/crop/${crop}/noanimate/${siteUrl}`;
}

/* ─── Device frame: Desktop browser ────────────────────────── */
function DesktopFrame({ siteUrl }: { siteUrl: string }) {
  const displayUrl = siteUrl.replace('https://', '').replace(/\/$/, '');
  return (
    <div
      className="flex-1 min-w-0 max-w-[520px]"
      style={{ filter: 'drop-shadow(0 28px 48px rgba(79,142,247,0.28))' }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-t-xl"
        style={{
          background: 'rgba(13,17,30,0.95)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderBottom: 'none',
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          {['#EF4444', '#F59E0B', '#22C55E'].map((c) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full"
              style={{ background: c, opacity: 0.85 }}
            />
          ))}
        </div>
        {/* URL bar */}
        <div
          className="flex-1 min-w-0 rounded-md px-3 py-1 text-xs truncate"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#94A3B8',
          }}
        >
          🔒 {displayUrl}
        </div>
      </div>

      {/* Viewport */}
      <div
        className="relative overflow-hidden rounded-b-xl"
        style={{
          aspectRatio: '16/10',
          border: '1px solid rgba(255,255,255,0.12)',
          borderTop: 'none',
          background: '#0d1117',
        }}
      >
        <Image
          src={thumb(siteUrl, 1040, 650)}
          alt={`${displayUrl} desktop preview`}
          fill
          className="object-cover object-top"
          unoptimized
        />
        {/* Inner border shine */}
        <div
          className="absolute inset-0 rounded-b-xl pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
        />
      </div>

      {/* Monitor stand */}
      <div className="flex flex-col items-center">
        <div
          className="w-14 h-4"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
          }}
        />
        <div
          className="w-24 h-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />
      </div>
    </div>
  );
}

/* ─── Device frame: Tablet (iPad-style) ─────────────────────── */
function TabletFrame({ siteUrl }: { siteUrl: string }) {
  return (
    <div
      className="w-[148px] flex-shrink-0 hidden md:block"
      style={{ filter: 'drop-shadow(0 20px 36px rgba(124,58,237,0.28))' }}
    >
      <div
        className="relative rounded-[20px] p-[9px]"
        style={{
          background: 'rgba(13,17,30,0.95)',
          border: '2.5px solid rgba(255,255,255,0.13)',
        }}
      >
        {/* Front camera */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.18)' }}
        />
        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[13px] mt-3"
          style={{ aspectRatio: '3/4', background: '#0d1117' }}
        >
          <Image
            src={thumb(siteUrl, 600, 800)}
            alt="Tablet preview"
            fill
            className="object-cover object-top"
            unoptimized
          />
        </div>
        {/* Home indicator */}
        <div
          className="mt-2 mx-auto w-10 h-[3px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.14)' }}
        />
      </div>
    </div>
  );
}

/* ─── Device frame: Mobile (iPhone-style) ───────────────────── */
function MobileFrame({ siteUrl }: { siteUrl: string }) {
  return (
    <div
      className="w-[88px] flex-shrink-0 hidden sm:block"
      style={{ filter: 'drop-shadow(0 16px 28px rgba(6,182,212,0.22))' }}
    >
      <div
        className="relative rounded-[34px] p-[7px]"
        style={{
          background: 'rgba(13,17,30,0.97)',
          border: '2.5px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute top-[10px] left-1/2 -translate-x-1/2 rounded-full z-10"
          style={{
            width: 36,
            height: 10,
            background: 'rgba(13,17,30,0.97)',
          }}
        />
        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[28px]"
          style={{ aspectRatio: '9/19.5', background: '#0d1117' }}
        >
          <Image
            src={thumb(siteUrl, 390, 844)}
            alt="Mobile preview"
            fill
            className="object-cover object-top"
            unoptimized
          />
        </div>
        {/* Home bar */}
        <div
          className="mt-[7px] mx-auto w-8 h-[3px] rounded-full"
          style={{ background: 'rgba(255,255,255,0.28)' }}
        />
      </div>
    </div>
  );
}

/* ─── Category filter pill ──────────────────────────────────── */
function FilterPill({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm font-medium rounded-full px-5 py-2 transition-all duration-200 flex items-center gap-2 ${
        active ? 'glossy-btn' : 'ghost-btn'
      }`}
    >
      {label}
      <span
        className="text-xs px-1.5 py-0.5 rounded-full leading-none"
        style={{
          background: active ? 'rgba(255,255,255,0.2)' : 'rgba(79,142,247,0.15)',
          color: active ? '#fff' : '#93C5FD',
        }}
      >
        {count}
      </span>
    </button>
  );
}

/* ─── Project card ──────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group flex flex-col h-full rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(79,142,247,0.35)';
        el.style.boxShadow = '0 8px 48px rgba(79,142,247,0.18), inset 0 1px 0 rgba(255,255,255,0.1)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(255,255,255,0.09)';
        el.style.boxShadow = '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: '16/10', background: '#0d1117' }}
      >
        {/* Gradient placeholder shown while image loads */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentColor}`}
          aria-hidden="true"
        />

        <Image
          src={thumb(project.url)}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          unoptimized
        />

        {/* Hover overlay with Visit Site CTA */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(5,8,22,0.78), rgba(79,142,247,0.25))',
          }}
        >
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glossy-btn text-sm px-5 py-2.5 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site <ExternalLink size={13} />
          </a>
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(5,8,22,0.75)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#94A3B8',
            backdropFilter: 'blur(8px)',
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="heading-font font-semibold text-white text-[15px] leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Category counts
  const countFor = (cat: ProjectCategory): number =>
    cat === 'All'
      ? projects.length
      : projects.filter((p) => p.category === cat).length;

  // Featured project shown in device mockups (portfolio — best for showcase)
  const featuredUrl = 'https://ummay-kulsoom-portfolio.vercel.app/';

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* ── Section background: soft blue-white radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.07) 0%, rgba(79,142,247,0.04) 35%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle horizontal highlight line at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(147,197,253,0.25), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">
            Portfolio
          </span>
          <h2
            className="heading-font font-bold mt-3 text-gradient"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Our Projects
          </h2>
          <div className="section-underline" />
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-base leading-relaxed px-4">
            17 production-deployed applications — from AI automation systems to e-commerce
            platforms. Every project built with precision and purpose.
          </p>
        </motion.div>

        {/* ── Device mockup showcase ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.15 }}
          className="flex items-end justify-center gap-5 mb-16 px-2"
        >
          <DesktopFrame siteUrl={featuredUrl} />
          <TabletFrame siteUrl={featuredUrl} />
          <MobileFrame siteUrl={featuredUrl} />
        </motion.div>

        {/* ── Category filter ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2.5 mb-4"
        >
          {projectCategories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              count={countFor(cat)}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </motion.div>

        {/* Count indicator */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-500 text-xs mb-10 tracking-wide"
        >
          Showing{' '}
          <span className="text-slate-300 font-medium">{filtered.length}</span> of{' '}
          <span className="text-slate-300 font-medium">{projects.length}</span> projects
        </motion.p>

        {/* ── Project grid with AnimatePresence filter transitions ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.url}
                layout
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.32, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.88,
                  transition: { duration: 0.18, ease: 'easeIn' },
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
