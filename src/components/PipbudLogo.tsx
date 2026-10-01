'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PipbudLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  href?: string | false;
  className?: string;
  dark?: boolean;
}

export default function PipbudLogo({
  size = 'md',
  showWordmark = true,
  href = '/',
  className = '',
  dark = false,
}: PipbudLogoProps) {
  const iconDimensions = {
    sm: { width: 30, height: 30 },
    md: { width: 38, height: 38 },
    lg: { width: 48, height: 48 },
  }[size];

  const textSize = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  }[size];

  const content = (
    <div className={`group inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official PipBud Trading Companion Mascot Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src="/icon-192.png"
          alt="PipBud Mascot — AI Trading Companion"
          width={iconDimensions.width}
          height={iconDimensions.height}
          priority
          className="object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      {showWordmark && (
        <span className={`font-bold tracking-tight inline-flex items-center ${textSize}`}>
          <span className={dark ? "text-white" : "text-[#F4F4F5]"}>Pip</span>
          <span className="text-[#F59E0B]">Bud</span>
        </span>
      )}
    </div>
  );

  if (href === false) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
