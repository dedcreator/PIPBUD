'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Send, User, ShieldCheck } from 'lucide-react';
import PipbudLogo from './PipbudLogo';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#E7E5E4] shadow-xs'
          : 'bg-[#FAFAF9]/80 backdrop-blur-sm border-b border-[#E7E5E4]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <PipbudLogo size="md" />
          </div>

          {/* Desktop Nav Links: Gated based on login state */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#tiers"
              className="text-xs sm:text-sm font-medium text-[#44403C] hover:text-[#C2410C] transition-colors"
            >
              The 7 Tiers
            </Link>

            {user ? (
              <>
                <Link
                  href="/journal"
                  className="text-xs sm:text-sm font-semibold text-[#1C1917] hover:text-[#C2410C] transition-colors flex items-center gap-1.5"
                >
                  <span>Web Journal</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                </Link>
                <Link
                  href="/forum"
                  className="text-xs sm:text-sm font-semibold text-[#1C1917] hover:text-[#C2410C] transition-colors flex items-center gap-1.5"
                >
                  <span>Trader Forum</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                    L{user.skill_level}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/#how-it-works"
                  className="text-xs sm:text-sm font-medium text-[#44403C] hover:text-[#C2410C] transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="/#bot"
                  className="text-xs sm:text-sm font-medium text-[#44403C] hover:text-[#C2410C] transition-colors"
                >
                  Telegram Bot
                </Link>
              </>
            )}

            <Link
              href="/#legitimacy"
              className="text-xs sm:text-sm font-medium text-[#44403C] hover:text-[#C2410C] transition-colors"
            >
              Removal Rules
            </Link>
          </div>

          {/* Action CTA & User Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Link
                href="/login"
                className="h-9 px-3 text-xs font-semibold bg-white border border-[#E7E5E4] hover:border-[#FED7AA] text-[#1C1917] rounded-xl transition-all inline-flex items-center gap-2 shadow-xs"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: user.tier_color || '#0F766E' }}
                />
                <span className="font-bold text-[#C2410C]">L{user.skill_level}</span>
                <span className="text-[#44403C] max-w-[100px] truncate">@{user.username}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-9 px-4 text-xs font-semibold text-[#1C1917] bg-white border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] rounded-xl transition-all inline-flex items-center shadow-xs"
              >
                Log In
              </Link>
            )}

            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start on Telegram</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#44403C] hover:text-[#1C1917] hover:bg-[#E7E5E4]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E7E5E4] px-4 pt-3 pb-5 space-y-3 shadow-md animate-in slide-in-from-top-2 duration-150">
          {user && (
            <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#78716C] block">Logged In Trader</span>
                <span className="text-xs font-bold text-[#1C1917]">@{user.username}</span>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs"
                style={{ backgroundColor: user.tier_color || '#C2410C' }}
              >
                {user.tier_badge}
              </span>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Link
              href="/#tiers"
              onClick={() => setMobileOpen(false)}
              className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C]"
            >
              The 7 Tiers
            </Link>

            {user ? (
              <>
                <Link
                  href="/journal"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-semibold text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C] flex items-center justify-between"
                >
                  <span>Web Journal Dashboard</span>
                  <span className="text-[10px] font-bold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded-full border border-[#CCFBF1]">
                    Audited
                  </span>
                </Link>
                <Link
                  href="/forum"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-semibold text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C] flex items-center justify-between"
                >
                  <span>7-Tier Trader Forum</span>
                  <span className="text-[10px] font-bold text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded-full border border-[#FED7AA]">
                    L{user.skill_level}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/#how-it-works"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C]"
                >
                  How It Works
                </Link>
                <Link
                  href="/#bot"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C]"
                >
                  Telegram Bot Journal
                </Link>
              </>
            )}

            <Link
              href="/#legitimacy"
              onClick={() => setMobileOpen(false)}
              className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C]"
            >
              Removal Rules
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#1C1917] hover:bg-[#FFF7ED] hover:text-[#C2410C]"
            >
              {user ? 'My Trader Profile & Logout' : 'Log In via Telegram'}
            </Link>
          </div>

          <div className="pt-2 border-t border-[#E7E5E4]">
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 inline-flex items-center justify-center gap-2 bg-[#C2410C] text-white rounded-xl text-xs font-medium hover:bg-[#EA580C]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch @PipBudBot</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}