'use client';

import React from 'react';
import Link from 'next/link';

interface GlossyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'default' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
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
  const baseClass = (variant === 'primary' || variant === 'default') ? 'glossy-btn' : 'ghost-btn';
  const classes = `${baseClass} ${sizeClasses[size]} ${fullWidth ? 'w-full justify-center' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
