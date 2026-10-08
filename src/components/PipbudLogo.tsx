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
    sm: 'w-7 h-7 rounded-xl',
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
      {/* Official Liquid Glass P-Bud Tile */}
      <div
        className={`relative ${tileDimensions} flex items-center justify-center shrink-0 bg-white/[0.08] backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:scale-105 group-hover:border-[#A78BFA]/50 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_24px_rgba(139,92,246,0.35)]`}
      >
        <svg
          width={svgDimensions}
          height={svgDimensions}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200"
        >
          {/* Subtle violet ambient glow inside glass */}
          <circle cx="16" cy="16" r="10" fill="url(#violetGlow)" opacity="0.35" />

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
          <circle cx="17" cy="16.5" r="2.2" fill="#A78BFA" />

          {/* Bud rising from stem tip */}
          <path
            d="M 9 10 C 7 6 12 3 15 5.5 C 16.5 6.8 14 9.5 9 10 Z"
            fill="url(#budGrad)"
          />

          <defs>
            <radialGradient id="violetGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="budGrad" x1="8" y1="4" x2="15" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DDD6FE" />
              <stop offset="60%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-bold tracking-tight inline-flex items-center ${textSize}`}>
          <span className="text-white">Pip</span>
          <span className="text-[#A78BFA]">Bud</span>
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
