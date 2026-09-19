'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaGithub, FaLinkedin, FaDribbble, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0a0b0f] pb-10 pt-10 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="glass-card rounded-[2rem] p-8 md:p-12 border border-white/5 relative overflow-hidden">
          {/* Background glow for the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8EF7]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 relative z-10">
            <div className="max-w-xs">
              <Link href="/" className="flex items-center mb-6" aria-label="CodeCraftAI home">
                <Image
                  src="/logo/logo.png?v=2"
                  alt="CodeCraftAI"
                  width={1774}
                  height={887}
                  sizes="80px"
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-slate-400 text-base leading-relaxed">
                Streamline operations, boost productivity, and scale smarter with CodeCraftAI.
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-6 pt-2">
              <div className="flex items-center gap-3">
                {[
                  { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
                  { Icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { Icon: FaGithub, href: 'https://github.com/Code0324', label: 'GitHub' },
                  { Icon: FaWhatsapp, href: 'https://wa.me/923249208788', label: 'WhatsApp' }
                ].map(({ Icon, href, label }, i) => (
                  <a 
                    key={i} 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <a href="mailto:contact@codecraftai.net" className="text-white hover:text-[#4F8EF7] font-medium transition-colors heading-font">
                  contact@codecraftai.net
                </a>
                <a href="tel:+923249208788" className="text-slate-400 hover:text-[#4F8EF7] font-medium transition-colors heading-font">
                  0324 9208788
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <p className="text-slate-500 text-sm">
              Designed with <span className="text-[#06B6D4]">Next.js</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-medium">
              <Link href="/services" className="text-slate-400 hover:text-white transition-colors">Services</Link>
              <Link href="/projects" className="text-slate-400 hover:text-white transition-colors">Projects</Link>
              <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            </div>

            <p className="text-slate-500 text-sm" suppressHydrationWarning>
              © {new Date().getFullYear()} CodeCraftAI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
