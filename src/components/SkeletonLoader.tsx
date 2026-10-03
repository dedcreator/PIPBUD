'use client';

import React from 'react';

/**
 * Reusable primitive Skeleton pulse block with sandstone tones
 */
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#E7E5E4]/80 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton loader for Reddit / Quora style community feed posts
 */
export function PostCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 sm:p-5 space-y-3.5 shadow-xs">
      {/* Author & Meta Row */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-3.5" />
            <Skeleton className="w-16 h-3 rounded" />
            <Skeleton className="w-12 h-3 rounded hidden sm:block" />
          </div>
          <Skeleton className="w-32 h-2.5" />
        </div>
        <Skeleton className="w-16 h-3 rounded-full shrink-0" />
      </div>

      {/* Post Title */}
      <div className="space-y-1.5 pt-1">
        <Skeleton className="w-3/4 h-4.5" />
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-5/6 h-3.5" />
      </div>

      {/* Optional Tag or Card preview */}
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="w-14 h-5 rounded-full" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F4]">
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-7 rounded-lg" />
          <Skeleton className="w-20 h-7 rounded-lg" />
        </div>
        <Skeleton className="w-8 h-7 rounded-lg" />
      </div>
    </div>
  );
}

/**
 * Skeleton loader for Forum Chat & Thread Messages
 */
export function MessageItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-2 sm:p-3 rounded-2xl bg-white/60 border border-[#E7E5E4]/60 space-y-1">
      <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-3.5" />
          <Skeleton className="w-16 h-3 rounded" />
          <Skeleton className="w-10 h-2.5 ml-auto" />
        </div>
        <Skeleton className="w-5/6 h-3.5" />
        <Skeleton className="w-2/3 h-3" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="w-12 h-5 rounded-full" />
          <Skeleton className="w-12 h-5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for Forum channel list sidebar
 */
export function ChannelListSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-32 h-3.5" />
          <Skeleton className="w-6 h-3 rounded ml-auto" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for Trader Profile & Performance Drawer
 */
export function ProfileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-20 h-3 rounded" />
          <Skeleton className="w-36 h-2.5" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F5F5F4]">
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
    </div>
  );
}
