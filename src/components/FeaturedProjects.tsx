'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { projects, featuredProjectIndices } from '@/lib/constants';
import GlossyButton from './GlossyButton';

const featured = featuredProjectIndices.map((i) => projects[i]).filter(Boolean);

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-[#06B6D4] tracking-widest uppercase"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold mt-3 mb-4 heading-font"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <div className="section-underline mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[#4F8EF7]/20 transition-all duration-300 group"
            >
              <div className={`relative h-44 bg-gradient-to-br ${project.accentColor} flex items-center justify-center overflow-hidden`}>
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
                  <div className="text-5xl font-black text-white/10 heading-font">{project.title.charAt(0)}</div>
                )}
                {project.url !== '#' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">{project.category}</div>
                <h3 className="text-base font-bold text-white mb-1 heading-font">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/projects">
            <GlossyButton variant="ghost" size="lg">
              View All Projects
            </GlossyButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
