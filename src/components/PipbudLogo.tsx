'use client';

import React from 'react';
import Link from 'next/link';

interface PipbudLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export default function PipbudLogo({
  size = 'md',
  showWordmark = true,
  className = '',
}: PipbudLogoProps) {
  const iconDimensions = {
    sm: { width: 28, height: 28, pinW: 24, pinH: 26 },
    md: { width: 36, height: 36, pinW: 32, pinH: 34 },
    lg: { width: 44, height: 44, pinW: 40, pinH: 42 },
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Pip & Bud Mark: Pin container with bud circle inside */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconDimensions.width}
          height={iconDimensions.height}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 hover:scale-105"
        >
          {/* Rounded Pin Shape in Brand Amber #F97316 */}
          <path
            d="M18 3C11.3726 3 6 8.37258 6 15C6 22.8 16.2 32.4 17.1 33.2C17.6 33.6 18.4 33.6 18.9 33.2C19.8 32.4 30 22.8 30 15C30 8.37258 24.6274 3 18 3Z"
            fill="#F97316"
          />
          {/* Inner Bud Dot in Pure White */}
          <circle cx="18" cy="14" r="5" fill="#FFFFFF" />
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-bold tracking-tight ${textSize}`}>
          <span className="text-[#1C1917]">pip</span>
          <span className="text-[#F97316]">bud</span>
        </span>
      )}
    </Link>
  );
}
