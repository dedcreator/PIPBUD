'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

interface PWASplashScreenProps {
  /** Force display for testing or manual preview */
  forceShow?: boolean;
}

export default function PWASplashScreen({ forceShow = false }: PWASplashScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const statusMessages = [
    'Initializing trading engine...',
    'Synchronizing verified journals...',
    'Verifying meritocracy tier access...',
    'Ready',
  ];

  useEffect(() => {
    // Determine if we should show the splash screen
    const isStandalone =
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://'));

    const hasSeenSplash = typeof window !== 'undefined' && sessionStorage.getItem('pipbud_splash_shown');

    // Show splash if:
    // 1. forceShow is true
    // 2. OR running in standalone PWA mode and not yet shown this session
    // 3. OR first cold-boot of a mobile session
    const isMobile =
      typeof window !== 'undefined' &&
      /iphone|ipad|ipod|android/i.test(navigator.userAgent);

    if (forceShow || (!hasSeenSplash && (isStandalone || isMobile))) {
      setIsVisible(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pipbud_splash_shown', 'true');
      }

      // Step animations
      const t1 = setTimeout(() => setLoadingStep(1), 320);
      const t2 = setTimeout(() => setLoadingStep(2), 680);
      const t3 = setTimeout(() => setLoadingStep(3), 1020);

      // Start fade out after all steps complete
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 1250);

      // Completely remove from DOM after fade out transition finishes
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1750);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [forceShow]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsFadingOut(true);
        setTimeout(() => setIsVisible(false), 300);
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between p-8 bg-[#FAFAF9] select-none transition-all duration-500 ease-out cursor-pointer ${
        isFadingOut ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="PipBud App Splash Screen"
    >
      {/* Ambient warm glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#FED7AA]/30 via-[#FFEDD5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top spacer */}
      <div className="w-full flex justify-end pt-2">
        <span className="text-[10px] font-mono tracking-widest text-[#A8A29E] uppercase">
          v2.4 • Production
        </span>
      </div>

      {/* Center Branding & Mascot */}
      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
        {/* Animated Mascot Emblem */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FED7AA] to-[#FDBA74] rounded-3xl blur-md opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border border-[#FED7AA] shadow-[0_12px_36px_rgba(194,65,12,0.12)] flex items-center justify-center p-3 transition-transform">
            <Image
              src="/icon-192.png"
              alt="PipBud Mascot"
              width={96}
              height={96}
              priority
              className="object-contain drop-shadow-sm animate-in zoom-in-75 duration-500"
            />
          </div>
        </div>

        {/* Wordmark and Tagline */}
        <div className="space-y-2">
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-[#1C1917]">Pip</span>
            <span className="text-[#C2410C]">Bud</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#78716C] max-w-xs mx-auto">
            Telegram Trading Journal &amp; Verified 7-Tier Forum
          </p>
        </div>

        {/* Institutional Meritocracy Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Audited Meritocracy</span>
        </div>

        {/* Progress Bar & Dynamic Status Indicator */}
        <div className="w-48 sm:w-56 space-y-2 pt-2">
          <div className="h-1.5 w-full bg-[#E7E5E4] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((loadingStep + 1) / statusMessages.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-[#A8A29E] font-mono tracking-tight transition-all duration-200">
            {statusMessages[loadingStep]}
          </p>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="text-center relative z-10 space-y-1 pb-4">
        <p className="text-[10px] text-[#A8A29E] tracking-wider uppercase font-semibold">
          Automated Risk Demotion Protocol Active
        </p>
        <p className="text-[9px] text-[#D6D3D1]">
          Tap anywhere to skip
        </p>
      </div>
    </div>
  );
}
