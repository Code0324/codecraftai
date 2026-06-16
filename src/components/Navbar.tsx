'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import GlossyButton from './GlossyButton';
import LogoSVG from './LogoSVG';

const links = ['About', 'Process', 'Services', 'Projects', 'Pricing', 'FAQ'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function scrollTo(id: string) {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(10,11,15,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <LogoSVG className="w-6 h-6 text-[#4F8EF7]" />
          <div className="heading-font font-bold text-lg text-white">
            CodeCraft<span style={{ opacity: 0.6 }}>AI</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-slate-300 text-sm font-medium hover:text-white transition-colors relative group"
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <GlossyButton
              size="sm"
              onClick={() => scrollTo('contact')}
            >
              Book a Call
            </GlossyButton>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div
          className="lg:hidden px-4 pb-5 pt-1 flex flex-col gap-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-slate-300 text-sm font-medium hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
            >
              {l}
            </a>
          ))}
          <div className="pt-3 sm:hidden">
            <GlossyButton size="sm" fullWidth onClick={() => scrollTo('contact')}>
              Book a Call
            </GlossyButton>
          </div>
        </div>
      )}
    </nav>
  );
}
