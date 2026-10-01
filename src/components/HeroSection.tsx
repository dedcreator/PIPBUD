'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Mic,
  MessageSquare,
  Lock,
  Sparkles,
  BarChart3,
  Award
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'forum' | 'bot'>('forum');

  return (
    <section className="relative pt-24 pb-14 md:pt-28 md:pb-18 overflow-hidden bg-[#FAFAF9]">
      {/* Subtle Background Glows matching Amber Palette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#FFEDD5]/40 via-[#FFF7ED]/25 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unstacked, Clean Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>7-Level Meritocracy • Fall Short, Get Removed</span>
          </div>

          {/* Clean Display Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.1] mb-4">
            The Journal on Telegram.{' '}
            <span className="text-[#C2410C]">The Forum by Skill Level.</span>
          </h1>

          {/* Uncluttered 2-Line Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#44403C] max-w-2xl mx-auto font-normal leading-relaxed mb-6">
            Log every trade via @PipBudBot in seconds. Build your verified track record to unlock 7 gated skill tiers on a modern trader forum. Fall short of your tier’s performance? You get automatically removed.
          </p>

          {/* Focused 2 CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-11 px-6 bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-2 text-sm active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start on Telegram Bot</span>
            </a>

            <Link
              href="/forum"
              className="w-full sm:w-auto h-11 px-5 bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[#1C1917] font-medium rounded-xl transition-all inline-flex items-center justify-center gap-1.5 text-sm"
            >
              <span>Explore 7-Tier Forum</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#78716C]" />
            </Link>
          </div>
        </div>

        {/* Interactive Hero Showcase */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-[#E7E5E4] shadow-[0_8px_24px_rgba(28,25,23,0.06)] overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-[#F5F5F4] border-b border-[#E7E5E4] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
              <span className="ml-2 text-xs font-mono text-[#78716C]">pipbud-syndicate // live-preview</span>
            </div>

            {/* Toggle Switch between Forum and Telegram Bot */}
            <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#E7E5E4]">
              <button
                onClick={() => setActiveTab('forum')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'forum'
                    ? 'bg-[#C2410C] text-white shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                7-Tier Forum UI
              </button>
              <button
                onClick={() => setActiveTab('bot')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'bot'
                    ? 'bg-[#C2410C] text-white shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Telegram Bot
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          {activeTab === 'forum' ? (
            <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 bg-[#FAFAF9]">
              {/* Channel List Sidebar */}
              <div className="lg:col-span-4 bg-white p-3 rounded-xl border border-[#E7E5E4] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                  <div>
                    <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">Trading Syndicate</h3>
                    <p className="text-[11px] text-[#78716C]">Level 4: Funded Floor</p>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] rounded-full">
                    Audited
                  </span>
                </div>

                {/* Level Tier Status Pill */}
                <div className="p-2.5 bg-[#FFF7ED] rounded-lg border border-[#FED7AA] text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#9A3412] mb-1">
                    <span>Tier Health: 94%</span>
                    <span className="text-[10px] text-[#C2410C]">Safe (&lt; 5% DD)</span>
                  </div>
                  <div className="w-full bg-[#FED7AA] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#C2410C] h-full rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>

                {/* Channels Gated by Level */}
                <div className="space-y-1 text-xs">
                  <div className="px-2 py-1 text-[10px] font-bold text-[#78716C] uppercase">Level 4: Funded Desk</div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#FFF7ED] text-[#C2410C] font-semibold rounded-lg">
                    <span className="flex items-center gap-1.5"># funded-floor</span>
                    <span className="text-[10px] bg-[#FFEDD5] px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 text-[#44403C] hover:bg-[#F5F5F4] rounded-lg">
                    <span className="flex items-center gap-1.5"># live-tape-reading</span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 text-[#44403C] hover:bg-[#F5F5F4] rounded-lg">
                    <span className="flex items-center gap-1.5"># payout-proofs</span>
                  </div>

                  <div className="pt-2 px-2 text-[10px] font-bold text-[#78716C] uppercase">Higher Tiers (Locked)</div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 text-[#A8A29E] bg-[#F5F5F4]/60 rounded-lg">
                    <span className="flex items-center gap-1.5"># elite-alpha-desk</span>
                    <Lock className="w-3 h-3 text-[#A8A29E]" />
                  </div>

                  {/* Public Demotion Warning */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2] rounded-lg font-medium">
                      <span className="flex items-center gap-1.5"># demotions-log</span>
                      <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Stream with Rich Verified Trade Embed */}
              <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-[#E7E5E4] flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Channel Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E7E5E4]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1C1917]"># funded-floor</span>
                        <span className="text-[10px] font-medium bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] px-2 py-0.5 rounded-full">
                          Level 4+ Verified Only
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C]">Live execution desk for audited prop firm and live funded traders.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#0F766E] font-medium">● 48 Online</span>
                    </div>
                  </div>

                  {/* Message 1: Aisha Bello */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold text-[11px] flex items-center justify-center shrink-0">
                      AB
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1C1917]">Aisha Bello</span>
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#FFF7ED] text-[#C2410C]">
                          Level 6: Mentor
                        </span>
                        <span className="text-[10px] text-[#78716C]">08:14 UTC</span>
                      </div>
                      <p className="text-xs text-[#44403C] mt-0.5">
                        London Open swept Asia session low straight into the 15m bullish Order Block. Verified reaction confirmed. Who caught this?
                      </p>
                    </div>
                  </div>

                  {/* Message 2: Apex Trader with Rich Trade Card Embed */}
                  <div className="flex items-start gap-3 bg-[#FFF7ED]/30 p-2.5 rounded-xl border border-[#FED7AA]/50">
                    <div className="w-7 h-7 rounded-full bg-[#1C1917] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      AT
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1C1917]">Apex Trader (You)</span>
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#F5F3FF] text-[#7C3AED]">
                          Level 4: Funded Pro
                        </span>
                        <span className="text-[10px] text-[#78716C]">08:16 UTC</span>
                      </div>

                      <p className="text-xs text-[#44403C]">
                        Logged via PipBud bot right on entry. Executed 1% risk on FTMO 100k account:
                      </p>

                      {/* Embedded Audited Trade Card */}
                      <div className="bg-white p-2.5 rounded-lg border border-[#E7E5E4] shadow-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#15803D]/10 text-[#15803D] rounded">
                              BUY LONG
                            </span>
                            <span className="font-bold text-xs text-[#1C1917]">EUR/USD</span>
                            <span className="text-[10px] text-[#78716C]">15m OB</span>
                          </div>
                          <span className="text-xs font-bold text-[#15803D] tabular-nums">+2.50% WIN (+$2,500)</span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-[10px] bg-[#FAFAF9] p-2 rounded border border-[#E7E5E4]">
                          <div>
                            <span className="text-[#78716C] block">Entry:</span>
                            <span className="font-mono font-medium text-[#1C1917]">1.08420</span>
                          </div>
                          <div>
                            <span className="text-[#78716C] block">Stop Loss:</span>
                            <span className="font-mono font-medium text-[#1C1917]">1.08220</span>
                          </div>
                          <div>
                            <span className="text-[#78716C] block">Take Profit:</span>
                            <span className="font-mono font-medium text-[#1C1917]">1.08920</span>
                          </div>
                          <div>
                            <span className="text-[#78716C] block">Risk/Reward:</span>
                            <span className="font-mono font-bold text-[#C2410C]">1:2.50</span>
                          </div>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#78716C]">
                          <span className="flex items-center gap-1 text-[#0F766E] font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            Verified by PipBud Journal Engine
                          </span>
                          <span className="font-mono">FTMO #984211</span>
                        </div>
                      </div>

                      {/* Emoji Reactions */}
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 bg-white border border-[#E7E5E4] rounded-full text-[10px] flex items-center gap-1 text-[#44403C]">
                          🔥 14
                        </span>
                        <span className="px-2 py-0.5 bg-white border border-[#E7E5E4] rounded-full text-[10px] flex items-center gap-1 text-[#44403C]">
                          🎯 9
                        </span>
                        <span className="px-2 py-0.5 bg-white border border-[#E7E5E4] rounded-full text-[10px] flex items-center gap-1 text-[#44403C]">
                          🚀 5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Public Removal Notice Event */}
                  <div className="p-2 bg-[#FEF2F2] rounded-lg border border-[#FEE2E2] flex items-center gap-2 text-xs text-[#B91C1C]">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] leading-tight">
                      <strong className="font-semibold">Anti-Shortfall Audit:</strong> Trader <em>@emeka_scalp</em> breached 5% drawdown threshold. Automatically removed from <strong>#funded-floor</strong> and demoted.
                    </span>
                  </div>
                </div>

                {/* Bottom Input Field */}
                <div className="mt-3 pt-2.5 border-t border-[#E7E5E4] flex items-center gap-2">
                  <div className="flex-1 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg px-3 py-1.5 text-xs text-[#78716C] flex items-center justify-between">
                    <span>Message #funded-floor (Attach trade from journal...)</span>
                    <div className="flex items-center gap-1.5 text-[#78716C]">
                      <BarChart3 className="w-3.5 h-3.5 hover:text-[#C2410C] cursor-pointer" />
                      <Mic className="w-3.5 h-3.5 hover:text-[#C2410C] cursor-pointer" />
                    </div>
                  </div>
                  <button className="h-8 px-3.5 bg-[#C2410C] text-white rounded-lg text-xs font-medium hover:bg-[#EA580C]">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Telegram Bot Chat Simulation */
            <div className="p-4 sm:p-5 bg-[#FAFAF9] flex justify-center">
              <div className="max-w-md w-full bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-xs space-y-3 font-sans">
                {/* Bot Header */}
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#E7E5E4]">
                  <div className="w-8 h-8 rounded-full bg-[#C2410C] text-white font-bold flex items-center justify-center text-xs">
                    PB
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C1917] flex items-center gap-1">
                      PipBud Journal Bot
                      <span className="text-[10px] font-normal text-[#0F766E] bg-[#F0FDFA] px-1.5 rounded">bot</span>
                    </h4>
                    <p className="text-[10px] text-[#78716C]">@PipBudBot • 24/7 AI Coach &amp; Automated Ledger</p>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#FFEDD5] text-[#1C1917] p-2.5 rounded-2xl rounded-tr-xs text-xs max-w-[85%] border border-[#FED7AA]">
                    Bought GBP/USD long 1.29850 sl 1.29550 tp 1.30600 15m FVG confluence
                  </div>
                </div>

                {/* Bot Response */}
                <div className="flex justify-start">
                  <div className="bg-[#FAFAF9] text-[#1C1917] p-3 rounded-2xl rounded-tl-xs text-xs max-w-[90%] border border-[#E7E5E4] space-y-2">
                    <div className="flex items-center justify-between font-bold text-[#0F766E] border-b border-[#E7E5E4] pb-1.5">
                      <span>🟢 TRADE VALIDATED &amp; LOGGED</span>
                      <span className="text-[10px] bg-[#CCFBF1] text-[#0F766E] px-1.5 py-0.5 rounded">1:2.50 R:R</span>
                    </div>

                    <div className="space-y-1 text-[11px] text-[#44403C]">
                      <p>• <strong>Pair:</strong> GBP/USD (LONG)</p>
                      <p>• <strong>Entry:</strong> 1.29850 | <strong>SL:</strong> 1.29550 | <strong>TP:</strong> 1.30600</p>
                      <p>• <strong>Setup:</strong> 15m Fair Value Gap (FVG)</p>
                      <p>• <strong>Position Size:</strong> 0.85 lots (1.0% risk)</p>
                    </div>

                    <div className="p-2 bg-[#FFF7ED] rounded-lg border border-[#FED7AA] text-[10px] text-[#9A3412]">
                      🏆 <strong>Tier Impact:</strong> Win rate: <strong>54.5%</strong>. Distance to Level 5: <strong>64 more verified trades</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
