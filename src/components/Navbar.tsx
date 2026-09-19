'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import GlossyButton from './GlossyButton';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center" aria-label="CodeCraftAI home">
          <Image
            src="/logo/logo.png?v=2"
            alt="CodeCraftAI"
            width={1774}
            height={887}
            priority
            sizes="(min-width: 1024px) 96px, 80px"
            className="h-10 lg:h-12 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors relative group ${
                pathname === l.href ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {l.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#4F8EF7] to-[#7C3AED] transition-all duration-300 ${
                pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Link href="/contact">
              <GlossyButton size="sm">Book a Call</GlossyButton>
            </Link>
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
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium py-3 px-4 rounded-xl transition-colors ${
                pathname === l.href
                  ? 'text-white bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 sm:hidden">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <GlossyButton size="sm" fullWidth>Book a Call</GlossyButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
