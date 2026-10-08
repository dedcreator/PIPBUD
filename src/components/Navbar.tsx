'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Send, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import PipbudLogo from './PipbudLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-thick border-b border-white/14 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
          : 'bg-[#000000]/70 backdrop-blur-md border-b border-white/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <PipbudLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            <Link
              href="/#tiers"
              className="text-xs sm:text-sm font-medium text-[#71767B] hover:text-white transition-colors"
            >
              The 7 Tiers
            </Link>
            <Link
              href="/#how-it-works"
              className="text-xs sm:text-sm font-medium text-[#71767B] hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#anti-shortfall"
              className="text-xs sm:text-sm font-medium text-[#71767B] hover:text-white transition-colors"
            >
              Anti-Shortfall
            </Link>
            <Link
              href="/#bot"
              className="text-xs sm:text-sm font-medium text-[#71767B] hover:text-white transition-colors"
            >
              Telegram Bot
            </Link>
            <Link
              href="/#journal"
              className="text-xs sm:text-sm font-medium text-[#71767B] hover:text-white transition-colors"
            >
              Web Journal
            </Link>
            <Link
              href="/#faq"
              className="text-xs sm:text-sm font-medium text-[#71767B] hover:text-white transition-colors"
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
              <Send className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>@PipBudBot</span>
            </a>

            <a
              href={appUrl}
              className="btn-primary h-9 px-4 text-xs font-semibold inline-flex items-center gap-1.5 shadow-md"
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
              className="p-2 rounded-xl glass-ultrathin text-[#71767B] hover:text-white transition-colors border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-thick border-b border-white/14 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2.5">
            <Link
              href="/#tiers"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#E7E9EA] hover:glass-violet hover:text-white transition-all"
            >
              The 7 Tiers
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#E7E9EA] hover:glass-violet hover:text-white transition-all"
            >
              How It Works
            </Link>
            <Link
              href="/#anti-shortfall"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#E7E9EA] hover:glass-violet hover:text-white transition-all"
            >
              Anti-Shortfall Protocol
            </Link>
            <Link
              href="/#bot"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#E7E9EA] hover:glass-violet hover:text-white transition-all"
            >
              Telegram Bot Journal
            </Link>
            <Link
              href="/#journal"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#E7E9EA] hover:glass-violet hover:text-white transition-all"
            >
              Web Journal Dashboard
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#E7E9EA] hover:glass-violet hover:text-white transition-all"
            >
              FAQ
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={appUrl}
              className="w-full h-11 btn-primary text-xs font-semibold inline-flex items-center justify-center gap-2"
            >
              <span>Launch Web App (app.pipbud.xyz)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 btn-secondary text-xs font-medium inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#A78BFA]" />
              <span>Start on Telegram Bot</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}