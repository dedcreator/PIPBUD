'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, X, Share2, PlusSquare, Smartphone, Check } from 'lucide-react';
import PipbudLogo from './PipbudLogo';

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);

    if (isStandaloneMode) return;

    // Check if user previously dismissed banner
    const dismissed = localStorage.getItem('pipbud_pwa_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 86400000 * 3) {
      return; // suppressed for 3 days
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // Listen for Android/Desktop install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS users on mobile web, show banner after brief delay
    if (isAppleDevice && !isStandaloneMode) {
      const timer = setTimeout(() => setShowBanner(true), 2500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pipbud_pwa_dismissed', Date.now().toString());
  };

  if (!showBanner || isStandalone) return null;

  return (
    <>
      {/* Mobile Floating App Banner */}
      <aside
        aria-label="Install PipBud Web App"
        className="fixed top-18 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-[#FED7AA] p-3 shadow-[0_8px_30px_rgba(194,65,12,0.12)] transition-all animate-in fade-in slide-in-from-top-4"
      >
        <div className="flex items-center gap-3">
          {/* App Icon */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] flex items-center justify-center shrink-0 shadow-xs">
            <PipbudLogo size="sm" showWordmark={false} />
          </div>

          {/* Text Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#1C1917] truncate flex items-center gap-1.5">
              <span>Install PipBud App</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
                PWA
              </span>
            </h4>
            <p className="text-[11px] text-[#78716C] leading-tight line-clamp-1">
              {isIOS ? 'Add to Home Screen for full-screen mode' : 'Faster trade logging & instant notifications'}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleInstallClick}
            className="h-8 px-3 rounded-lg bg-[#C2410C] hover:bg-[#EA580C] text-white text-xs font-semibold shrink-0 transition-all inline-flex items-center gap-1 active:scale-95 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>

          {/* Dismiss */}
          <button
            onClick={dismissBanner}
            className="p-1 rounded-md text-[#A8A29E] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* iOS Install Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-[#E7E5E4] shadow-2xl animate-in slide-in-from-bottom-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#C2410C]" />
                <h3 className="text-sm font-bold text-[#1C1917]">Install PipBud on iPhone</h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#44403C]">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <div className="w-6 h-6 rounded-lg bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0 font-bold text-xs border border-[#FED7AA]">
                  1
                </div>
                <div className="flex-1">
                  Tap the <strong className="text-[#1C1917]">Share button</strong> in Safari’s bottom toolbar.
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 bg-white border border-[#E7E5E4] rounded text-[11px] font-mono text-[#1C1917]">
                    <Share2 className="w-3 h-3 text-[#3B82F6]" /> Share
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <div className="w-6 h-6 rounded-lg bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0 font-bold text-xs border border-[#FED7AA]">
                  2
                </div>
                <div className="flex-1">
                  Scroll down and tap <strong className="text-[#1C1917]">Add to Home Screen</strong>.
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 bg-white border border-[#E7E5E4] rounded text-[11px] font-mono text-[#1C1917]">
                    <PlusSquare className="w-3 h-3 text-[#1C1917]" /> Add to Home Screen
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <div className="w-6 h-6 rounded-lg bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0 font-bold text-xs border border-[#FED7AA]">
                  3
                </div>
                <div className="flex-1">
                  Tap <strong className="text-[#1C1917]">Add</strong> in the top-right corner. PipBud will now open fullscreen like a native app!
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowIOSModal(false);
                dismissBanner();
              }}
              className="w-full h-10 rounded-xl bg-[#C2410C] text-white font-medium text-xs hover:bg-[#EA580C] transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Got it, ready to install</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
