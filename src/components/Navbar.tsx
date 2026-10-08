'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Send } from 'lucide-react';
import PipbudLogo from './PipbudLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] shadow-xs'
          : 'bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E7E5E4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <PipbudLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/#tiers"
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              The 7 Tiers
            </Link>
            <Link
              href="/#features"
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-xs sm:text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-9 px-4 text-xs font-medium inline-flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>@PipBudBot</span>
            </a>

            <a
              href={appUrl}
              className="btn-primary h-9 px-4 text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={appUrl}
              className="btn-primary h-8 px-3 text-xs font-semibold inline-flex items-center gap-1"
            >
              <span>App</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white text-[#78716C] hover:text-[#1C1917] transition-colors border border-[#E7E5E4]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 border-b border-[#E7E5E4] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2.5">
            <Link
              href="/#tiers"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              The 7 Tiers
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/#anti-shortfall"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              Anti-Shortfall Protocol
            </Link>
            <Link
              href="/#bot"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              Telegram Bot Journal
            </Link>
            <Link
              href="/#journal"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              Trading Journal
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#1C1917] hover:bg-[#F5F5F4] transition-all"
            >
              FAQ
            </Link>
          </div>

          <div className="pt-2 border-t border-[#E7E5E4] space-y-2">
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full h-10 text-xs font-medium inline-flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>@PipBudBot on Telegram</span>
            </a>
            <a
              href={appUrl}
              className="btn-primary w-full h-10 text-xs font-semibold inline-flex items-center justify-center gap-1.5"
            >
              <span>Launch App (app.pipbud.xyz)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}