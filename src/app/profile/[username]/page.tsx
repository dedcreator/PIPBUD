'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import MobileNavDock from '@/components/MobileNavDock';
import TraderAvatar from '@/components/TraderAvatar';
import { useAuth, getApiBase } from '@/context/AuthContext';
import {
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Award,
  CheckCircle2,
  Share2,
  ExternalLink,
  Activity,
  Layers,
  Clock,
  Flame,
  MessageSquare,
  BarChart3,
  Calendar,
} from 'lucide-react';

interface TraderProfile {
  id: string;
  name: string;
  username: string;
  level: number;
  badge: string;
  tierName: string;
  tierColor: string;
  broker: string;
  accountVerified: boolean;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  totalTrades: number;
  tierHealth: number;
  tradingStyle: string;
  bio: string;
  avatarUrl?: string;
  avatarType?: string;
  isCurrentUser: boolean;
  recentTrades?: {
    pair: string;
    direction: 'LONG' | 'SHORT';
    outcome: string;
    profit: string;
    rr: string;
    date: string;
  }[];
}

export default function TraderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const rawUsername = (params?.username as string) || (user?.username || '');
  const username = rawUsername ? decodeURIComponent(rawUsername).replace('@', '') : '';

  const [profile, setProfile] = useState<TraderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!username) return;

    async function loadProfile() {
      setIsLoading(true);
      setError(null);
      try {
        const apiBase = getApiBase();
        const token = typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '';
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (user?.id) headers['X-Trader-Id'] = user.id;

        const res = await fetch(`${apiBase}/api/traders/${encodeURIComponent(username)}/profile/`, { headers });
        if (!res.ok) {
          throw new Error('Trader profile not found.');
        }
        const data = await res.json();
        setProfile(data.profile);
      } catch (err: any) {
        setError(err.message || 'Unable to load profile.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [username, user]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] pb-24 md:pb-12">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            {profile?.isCurrentUser && (
              <Link
                href="/settings"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] text-xs font-bold hover:bg-[#FFEDD5] transition-all"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Account Settings</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#E7E5E4] rounded-xl text-xs font-medium text-[#44403C] hover:border-[#D6D3D1] transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Copied!' : 'Share Profile'}</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 space-y-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#E7E5E4] rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-6 w-48 bg-[#E7E5E4] rounded" />
                <div className="h-4 w-32 bg-[#E7E5E4] rounded" />
              </div>
            </div>
            <div className="h-24 bg-[#E7E5E4] rounded-2xl" />
          </div>
        ) : error || !profile ? (
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 text-center space-y-3">
            <p className="text-sm text-[#DC2626] font-semibold">{error || 'Trader profile not found.'}</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524]"
            >
              Return to Community
            </Link>
          </div>
        ) : (
          <>
            {/* Profile Hero Card */}
            <section className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <TraderAvatar
                    name={profile.name}
                    username={profile.username}
                    avatarUrl={profile.avatarUrl}
                    avatarType={profile.avatarType}
                    tierColor={profile.tierColor}
                    level={profile.level}
                    size="xl"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] tracking-tight">
                        {profile.name}
                      </h1>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs"
                        style={{ backgroundColor: profile.tierColor }}
                      >
                        Level {profile.level} • {profile.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#78716C] font-mono mt-0.5">@{profile.username}</p>
                    <div className="flex items-center gap-2 text-xs text-[#57534E] mt-1 flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-[#0F766E]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                        {profile.broker}
                      </span>
                      <span>•</span>
                      <span className="text-[#78716C]">Tier Health: {profile.tierHealth}%</span>
                    </div>
                  </div>
                </div>

                {profile.isCurrentUser && (
                  <Link
                    href="/settings"
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Profile & Settings</span>
                  </Link>
                )}
              </div>

              {/* Bio & Trading Style */}
              <div className="space-y-3 pt-4 border-t border-[#F5F5F4]">
                <div>
                  <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider block mb-1">
                    Trading Style & Archetype
                  </span>
                  <p className="text-sm font-semibold text-[#1C1917]">{profile.tradingStyle}</p>
                </div>
                {profile.bio && (
                  <div>
                    <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider block mb-1">
                      Trader Biography
                    </span>
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-line">
                      {profile.bio}
                    </p>
                  </div>
                )}
              </div>

              {/* Audited Meritocracy Stats Grid */}
              <div className="space-y-2 pt-4 border-t border-[#F5F5F4]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                    Audited Performance Metrics
                  </span>
                  <span className="text-[10px] text-[#0F766E] font-bold bg-[#CCFBF1] px-2 py-0.5 rounded-full">
                    Anti-Shortfall Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-[#FAFAF9] p-3.5 rounded-2xl border border-[#E7E5E4]">
                    <span className="text-xs text-[#78716C] block font-medium">Win Rate</span>
                    <span className="text-lg font-bold text-[#1C1917] tabular-nums">{profile.winRate}%</span>
                  </div>
                  <div className="bg-[#FAFAF9] p-3.5 rounded-2xl border border-[#E7E5E4]">
                    <span className="text-xs text-[#78716C] block font-medium">Profit Factor</span>
                    <span className="text-lg font-bold text-[#0F766E] tabular-nums">{profile.profitFactor}</span>
                  </div>
                  <div className="bg-[#FAFAF9] p-3.5 rounded-2xl border border-[#E7E5E4]">
                    <span className="text-xs text-[#78716C] block font-medium">Max Drawdown</span>
                    <span className="text-lg font-bold text-[#C2410C] tabular-nums">{profile.maxDrawdown}%</span>
                  </div>
                  <div className="bg-[#FAFAF9] p-3.5 rounded-2xl border border-[#E7E5E4]">
                    <span className="text-xs text-[#78716C] block font-medium">Total Audited Trades</span>
                    <span className="text-lg font-bold text-[#1C1917] tabular-nums">{profile.totalTrades}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Audited Recent Trades Table */}
            <section className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#C2410C]" />
                  <h2 className="text-base sm:text-lg font-bold text-[#1C1917]">
                    Recent Audited Trades
                  </h2>
                </div>
                <span className="text-xs text-[#78716C]">Public Verified Record</span>
              </div>

              {!profile.recentTrades || profile.recentTrades.length === 0 ? (
                <div className="p-8 text-center text-[#78716C] bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] text-xs">
                  No public trades logged yet for this member.
                </div>
              ) : (
                <div className="space-y-2">
                  {profile.recentTrades.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.direction === 'LONG'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : 'bg-[#FEE2E2] text-[#B91C1C]'
                          }`}
                        >
                          {t.direction}
                        </span>
                        <span className="font-bold text-[#1C1917]">{t.pair}</span>
                        <span className="text-[#78716C] text-[11px]">• {t.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#78716C] font-mono text-[11px]">R:R {t.rr}</span>
                        <span className="font-bold text-[#15803D]">{t.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <MobileNavDock />
    </div>
  );
}
