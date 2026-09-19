'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { projects, projectCategories, type ProjectCategory } from '@/lib/constants';
import GlossyButton from '@/components/GlossyButton';

export default function ProjectsPageContent() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
        >
          Our Portfolio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-6xl font-bold mt-3 mb-4 heading-font"
        >
          Projects That <span className="text-gradient">Deliver Results</span>
        </motion.h1>
        <div className="section-underline mx-auto" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mt-6"
        >
          From AI chatbots to e-commerce platforms — see how we solve real business problems with technology.
        </motion.p>
      </section>

      {/* Filter */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#4F8EF7]/20 text-white border-[#4F8EF7]/40'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[#4F8EF7]/20 transition-all duration-300 group"
              >
                {/* Image */}
                <div className={`relative h-48 bg-gradient-to-br ${project.accentColor} flex items-center justify-center overflow-hidden`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  ) : (
                    <div className="text-4xl font-black text-white/10 heading-font">{project.title.charAt(0)}</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {project.url !== '#' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-lg font-bold text-white mb-2 heading-font">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-badge text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mt-20">
        <div className="glass-card rounded-2xl p-12 border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-4 heading-font">Have a Project in Mind?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            We&apos;d love to hear about your idea. Let&apos;s discuss how we can bring it to life.
          </p>
          <Link href="/contact">
            <GlossyButton size="lg">Start Your Project</GlossyButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
