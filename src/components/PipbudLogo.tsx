'use client';

import React from 'react';
import Link from 'next/link';

interface PipbudLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  href?: string | false;
  className?: string;
}

export default function PipbudLogo({
  size = 'md',
  showWordmark = true,
  href = '/',
  className = '',
}: PipbudLogoProps) {
  const tileDimensions = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl',
  }[size];

  const svgDimensions = {
    sm: 20,
    md: 24,
    lg: 30,
  }[size];

  const textSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  const content = (
    <div className={`group inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Liquid Glass P-Bud Tile (Obsidian & Institutional Accent) */}
      <div
        className={`relative ${tileDimensions} flex items-center justify-center shrink-0 bg-[#1C1917] border border-[#292524] shadow-sm transition-all duration-200 group-hover:scale-105`}
      >
        <svg
          width={svgDimensions}
          height={svgDimensions}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200"
        >
          {/* Stem of the P */}
          <line
            x1="9"
            y1="25"
            x2="9"
            y2="10"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Ring of the P */}
          <path
            d="M 9 10 H 18 C 22 10 24.5 13 24.5 16.5 C 24.5 20 22 23 18 23 H 9"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pip (the smallest price movement) inside ring */}
          <circle cx="17" cy="16.5" r="2.2" fill="#C2410C" />

          {/* Bud rising from stem tip */}
          <path
            d="M 9 10 C 7 6 12 3 15 5.5 C 16.5 6.8 14 9.5 9 10 Z"
            fill="#C2410C"
          />
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-bold tracking-tight inline-flex items-center ${textSize}`}>
          <span className="text-[#1C1917]">Pip</span>
          <span className="text-[#C2410C]">Bud</span>
        </span>
      )}
    </div>
  );

  if (href === false) {
    return content;
  }

  return (
    <Link href={href} className="focus:outline-hidden">
      {content}
    </Link>
  );
}
