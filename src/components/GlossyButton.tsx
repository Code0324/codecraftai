'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface GlossyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-sm gap-1.5',
  md: 'px-7 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2',
};

export default function GlossyButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  fullWidth = false,
}: GlossyButtonProps) {
  const baseClasses = variant === 'primary'
    ? 'btn-primary'
    : 'btn-ghost';

  const classes = `${baseClasses} ${sizeClasses[size]} ${fullWidth ? 'w-full justify-center' : ''} ${className}`;

  const content = (
    <>
      {children}
      <ArrowRight size={size === 'sm' ? 13 : 15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group ${classes}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`group ${classes}`}>
      {content}
    </button>
  );
}
