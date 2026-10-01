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
          ? 'bg-[#09090B]/95 backdrop-blur-md border-b border-[#27272A] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-[#09090B]/85 backdrop-blur-sm border-b border-[#27272A]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <PipbudLogo size="md" dark />
          </div>

          {/* Desktop Nav Links: Gated based on login state */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/#tiers"
              className="text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-[#F59E0B] transition-colors"
            >
              The 7 Tiers
            </Link>

            {user ? (
              <>
                <Link
                  href="/journal"
                  className="text-xs sm:text-sm font-semibold text-[#F4F4F5] hover:text-[#F59E0B] transition-colors flex items-center gap-1.5"
                >
                  <span>Web Journal</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                </Link>
                <Link
                  href="/forum"
                  className="text-xs sm:text-sm font-semibold text-[#F4F4F5] hover:text-[#F59E0B] transition-colors flex items-center gap-1.5"
                >
                  <span>Trader Forum</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                    L{user.skill_level}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/#how-it-works"
                  className="text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-[#F59E0B] transition-colors"
                >
                  How It Works
                </Link>
                <Link
                  href="/#bot"
                  className="text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-[#F59E0B] transition-colors"
                >
                  Telegram Bot
                </Link>
              </>
            )}

            <Link
              href="/#legitimacy"
              className="text-xs sm:text-sm font-medium text-[#A1A1AA] hover:text-[#F59E0B] transition-colors"
            >
              Removal Rules
            </Link>
          </div>

          {/* Action CTA & User Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Link
                href="/settings"
                className="h-9 px-3 text-xs font-semibold bg-[#18181B] border border-[#27272A] hover:border-[#F59E0B]/60 text-[#F4F4F5] rounded-xl transition-all inline-flex items-center gap-2 shadow-xs hover:bg-[#27272A]"
                title="Trader Settings & Privacy"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: user.tier_color || '#10B981' }}
                />
                <span className="font-bold text-[#F59E0B]">L{user.skill_level}</span>
                <span className="text-[#A1A1AA] max-w-[110px] truncate">
                  {user.display_name || `@${user.username}`}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="h-9 px-4 text-xs font-semibold text-[#F4F4F5] bg-[#18181B] border border-[#27272A] hover:border-[#F59E0B]/50 hover:bg-[#27272A] rounded-xl transition-all inline-flex items-center shadow-xs"
              >
                Log In
              </Link>
            )}

            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 text-xs font-semibold bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] rounded-xl transition-all inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start on Telegram</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#121215] border-b border-[#27272A] px-4 pt-3 pb-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150 text-[#F4F4F5]">
          {user && (
            <div className="p-3 bg-[#18181B] rounded-xl border border-[#27272A] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#A1A1AA] block">Logged In Trader</span>
                <span className="text-xs font-bold text-[#F4F4F5]">@{user.username}</span>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold text-[#09090B] bg-[#F59E0B] shadow-xs"
              >
                {user.tier_badge}
              </span>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Link
              href="/#tiers"
              onClick={() => setMobileOpen(false)}
              className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B]"
            >
              The 7 Tiers
            </Link>

            {user ? (
              <>
                <Link
                  href="/journal"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-semibold text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B] flex items-center justify-between"
                >
                  <span>Web Journal Dashboard</span>
                  <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/30">
                    Audited
                  </span>
                </Link>
                <Link
                  href="/forum"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-semibold text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B] flex items-center justify-between"
                >
                  <span>7-Tier Trader Forum</span>
                  <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full border border-[#F59E0B]/30">
                    L{user.skill_level}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/#how-it-works"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B]"
                >
                  How It Works
                </Link>
                <Link
                  href="/#bot"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B]"
                >
                  Telegram Bot Journal
                </Link>
              </>
            )}

            <Link
              href="/#legitimacy"
              onClick={() => setMobileOpen(false)}
              className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B]"
            >
              Removal Rules
            </Link>

            {user && (
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-1.5 rounded-lg text-sm font-semibold text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B] flex items-center justify-between"
              >
                <span>Privacy & Trader Settings</span>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/30">
                  Shield
                </span>
              </Link>
            )}

            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-2 py-1.5 rounded-lg text-sm font-medium text-[#F4F4F5] hover:bg-[#18181B] hover:text-[#F59E0B]"
            >
              {user ? 'Account Tiers & Logout' : 'Log In via Telegram'}
            </Link>
          </div>

          <div className="pt-2 border-t border-[#27272A]">
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] font-bold rounded-xl text-xs shadow-xs"
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