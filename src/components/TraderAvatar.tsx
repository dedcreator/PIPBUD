'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface TraderAvatarProps {
  name?: string;
  username?: string;
  avatarUrl?: string;
  avatarType?: string;
  tierColor?: string;
  level?: number;
  size?: AvatarSize;
  className?: string;
  showBadge?: boolean;
  onClick?: () => void;
}

const PRESET_STYLES: Record<string, { ring: string; bg: string }> = {
  mascot_purple: { ring: 'border-[#8B5CF6]', bg: 'bg-[#F5F3FF]' },
  mascot_gold: { ring: 'border-[#F59E0B]', bg: 'bg-[#FFFBEB]' },
  mascot_alpha: { ring: 'border-[#3B82F6]', bg: 'bg-[#EFF6FF]' },
  mascot_emerald: { ring: 'border-[#10B981]', bg: 'bg-[#ECFDF5]' },
  mascot_titan: { ring: 'border-[#EA580C]', bg: 'bg-[#FFF7ED]' },
  mascot_orange: { ring: 'border-[#F97316]', bg: 'bg-[#FFF7ED]' },
  mascot_blue: { ring: 'border-[#2563EB]', bg: 'bg-[#EFF6FF]' },
  mascot_green: { ring: 'border-[#059669]', bg: 'bg-[#ECFDF5]' },
};

const SIZE_CONFIG: Record<
  AvatarSize,
  {
    dim: number;
    containerClass: string;
    imageSize: number;
    textSize: string;
    badgeClass: string;
  }
> = {
  xs: {
    dim: 22,
    containerClass: 'w-[22px] h-[22px] rounded-md',
    imageSize: 16,
    textSize: 'text-[9px]',
    badgeClass: 'text-[8px] px-1 py-0.2',
  },
  sm: {
    dim: 28,
    containerClass: 'w-7 h-7 rounded-lg',
    imageSize: 20,
    textSize: 'text-[10px]',
    badgeClass: 'text-[8px] px-1',
  },
  md: {
    dim: 38,
    containerClass: 'w-[38px] h-[38px] rounded-xl',
    imageSize: 28,
    textSize: 'text-xs',
    badgeClass: 'text-[9px] px-1.5 py-0.2',
  },
  lg: {
    dim: 46,
    containerClass: 'w-[46px] h-[46px] rounded-2xl',
    imageSize: 34,
    textSize: 'text-sm',
    badgeClass: 'text-[10px] px-1.5 py-0.5',
  },
  xl: {
    dim: 56,
    containerClass: 'w-14 h-14 rounded-2xl',
    imageSize: 42,
    textSize: 'text-base',
    badgeClass: 'text-xs px-2 py-0.5',
  },
};

export default function TraderAvatar({
  name = 'Trader',
  username = '',
  avatarUrl = '',
  avatarType = 'mascot_purple',
  tierColor = '#C2410C',
  level,
  size = 'md',
  className = '',
  showBadge = false,
  onClick,
}: TraderAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const cfg = SIZE_CONFIG[size] || SIZE_CONFIG.md;

  const initials = (name || username || 'TR')
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isCustom = (avatarType === 'custom' || (!avatarType && Boolean(avatarUrl))) && Boolean(avatarUrl);
  const isMascot =
    !isCustom &&
    (avatarType?.startsWith('mascot') ||
      avatarType === 'mascot' ||
      (!avatarType && !avatarUrl && avatarType !== 'initials'));

  const presetStyle = PRESET_STYLES[avatarType] || PRESET_STYLES.mascot_purple;

  const content = (() => {
    // 1. Custom Image URL
    if (isCustom && !imgFailed && avatarUrl) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={name || username}
          className={`${cfg.containerClass} object-cover border border-[#E7E5E4] shadow-xs`}
          onError={() => setImgFailed(true)}
        />
      );
    }

    // 2. PipBud Companion Mascot Preset
    if (isMascot) {
      return (
        <div
          className={`${cfg.containerClass} border-2 ${presetStyle.ring} ${presetStyle.bg} p-0.5 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden`}
        >
          <Image
            src="/icon-192.png"
            alt={name || 'PipBud Mascot'}
            width={cfg.imageSize}
            height={cfg.imageSize}
            className="object-contain"
            priority={false}
          />
        </div>
      );
    }

    // 3. Initials / Monogram with Tier Branding
    return (
      <div
        className={`${cfg.containerClass} font-bold ${cfg.textSize} text-white flex items-center justify-center shrink-0 shadow-xs uppercase tracking-wider`}
        style={{ backgroundColor: tierColor || '#1C1917' }}
      >
        {initials}
      </div>
    );
  })();

  const wrapperClass = `relative inline-flex items-center justify-center shrink-0 ${
    onClick ? 'cursor-pointer hover:opacity-90 active:scale-95 transition-all' : ''
  } ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={wrapperClass}
        title={`View @${username || name}'s Verified Profile`}
      >
        {content}
        {showBadge && level !== undefined && (
          <span
            className={`absolute -bottom-1 -right-1 font-extrabold text-white rounded-full shadow-xs border border-white ${cfg.badgeClass}`}
            style={{ backgroundColor: tierColor }}
          >
            L{level}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={wrapperClass}>
      {content}
      {showBadge && level !== undefined && (
        <span
          className={`absolute -bottom-1 -right-1 font-extrabold text-white rounded-full shadow-xs border border-white ${cfg.badgeClass}`}
          style={{ backgroundColor: tierColor }}
        >
          L{level}
        </span>
      )}
    </div>
  );
}
