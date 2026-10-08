'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Lock,
  ArrowRight,
  Flame,
  Award,
  Layers,
  Activity,
  Compass
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'forum' | 'journal' | 'bot'>('forum');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden bg-[#FAFAF9] text-[#1C1917]">
      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#1C1917] mb-5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>7-Level Meritocracy • Fall Short, Get Removed</span>
          </div>

          {/* Display Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1C1917] leading-[1.1] mb-5">
            The Journal on Telegram.{' '}
            <span className="text-[#C2410C]">
              The Forum by Skill Level.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#78716C] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Log every trade via @PipBudBot in seconds. Build your audited track record to unlock 7 gated skill tiers on a modern trader forum. Fall short of your tier’s performance? You get automatically removed.
          </p>

          {/* Focused CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={appUrl}
              className="w-full sm:w-auto h-12 px-7 btn-primary text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Launch App Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-12 px-6 btn-secondary text-sm font-medium rounded-full inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#C2410C]" />
              <span>Start on Telegram Bot</span>
            </a>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#78716C]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              Zero paid rankings rule
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
              Cryptographic broker audit
            </span>
          </div>
        </div>

        {/* Interactive Institutional Window Showcase */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#E7E5E4] shadow-[0_16px_50px_rgba(28,25,23,0.06)] overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-[#F5F5F4] border-b border-[#E7E5E4] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
              <span className="ml-2 text-xs font-mono text-[#78716C]">pipbud-terminal // live-preview</span>
            </div>

            {/* Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#E7E5E4]/60 p-1 rounded-xl text-xs">
              <button
                onClick={() => setActiveTab('forum')}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  activeTab === 'forum'
                    ? 'bg-white text-[#1C1917] font-semibold shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                7-Tier Forum
              </button>
              <button
                onClick={() => setActiveTab('journal')}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  activeTab === 'journal'
                    ? 'bg-white text-[#1C1917] font-semibold shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Trade Ledger Studio
              </button>
              <button
                onClick={() => setActiveTab('bot')}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  activeTab === 'bot'
                    ? 'bg-white text-[#1C1917] font-semibold shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Telegram Bot
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="p-4 sm:p-6 bg-white">
            {activeTab === 'forum' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Sidebar */}
                <div className="lg:col-span-4 bg-[#FAFAF9] p-3.5 rounded-2xl border border-[#E7E5E4] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                    <div>
                      <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">Trading Syndicate</h3>
                      <p className="text-[11px] text-[#0F766E] font-medium">Level 4: Funded Floor</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] rounded-full">
                      Audited
                    </span>
                  </div>

                  {/* Tier Health */}
                  <div className="p-2.5 bg-white rounded-xl border border-[#E7E5E4] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-[#1C1917]">
                      <span>Tier Health: 96%</span>
                      <span className="text-[10px] text-[#15803D]">Safe (&lt; 5% DD)</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#15803D] h-full rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>

                  {/* Channels */}
                  <div className="space-y-1 text-xs">
                    <div className="px-2 py-1 text-[10px] font-bold text-[#78716C] uppercase">Level 4: Funded Desk</div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 bg-white text-[#1C1917] font-semibold rounded-xl border border-[#E7E5E4] shadow-2xs">
                      <span className="flex items-center gap-1.5"># funded-floor</span>
                      <span className="text-[10px] bg-[#F5F5F4] text-[#1C1917] px-1.5 py-0.2 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 text-[#78716C] hover:text-[#1C1917] rounded-xl">
                      <span># live-tape-reading</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 text-[#78716C] hover:text-[#1C1917] rounded-xl">
                      <span># payout-proofs</span>
                    </div>
                  </div>
                </div>

                {/* Right Chat Stream */}
                <div className="lg:col-span-8 bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4] flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Chat Item 1 */}
                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1C1917]">David K.</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
                            L4 Risk Sentinel
                          </span>
                        </div>
                        <span className="text-[10px] text-[#78716C]">12:44 UTC</span>
                      </div>
                      <p className="text-xs text-[#1C1917] leading-relaxed">
                        Took EUR/USD 15m order block sweep into NY open. SL locked at +1R. Target hit at London low.
                      </p>
                      {/* Telemetry pill */}
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4] text-[11px] font-mono">
                        <span className="text-[#15803D] font-bold">WIN +2.45R</span>
                        <span className="text-[#A8A29E]">|</span>
                        <span className="text-[#44403C]">1.08420 &rarr; 1.08175</span>
                      </div>
                    </div>

                    {/* Chat Item 2 with Mention */}
                    <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1C1917]">Tariq Mansoor</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]">
                            L7 Sovereign
                          </span>
                        </div>
                        <span className="text-[10px] text-[#78716C]">12:47 UTC</span>
                      </div>
                      <p className="text-xs text-[#1C1917] leading-relaxed">
                        Clean patience <span className="bg-[#FFF7ED] text-[#C2410C] px-1.5 py-0.2 rounded-md font-mono text-[11px] border border-[#FED7AA]">@david_k</span>. Macro yield curve inversions confirm USD accumulation across this session.
                      </p>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="p-2 rounded-xl bg-white border border-[#E7E5E4] flex items-center justify-between text-xs text-[#78716C]">
                    <span>Message #funded-floor... (Level 4+ verified only)</span>
                    <span className="px-2 py-1 rounded-lg btn-primary text-[10px] text-white font-semibold">
                      Send
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'journal' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Step 1 Parameters */}
                <div className="lg:col-span-5 bg-[#FAFAF9] p-4 rounded-2xl border border-[#E7E5E4] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                    <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">Step 1: Telemetry</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-[#DCFCE7] text-[#15803D] font-bold rounded-md">LOCKED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4]">
                      <span className="text-[10px] text-[#78716C] block font-sans">Pair & Direction</span>
                      <span className="font-bold text-[#1C1917]">XAU/USD LONG</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4]">
                      <span className="text-[10px] text-[#78716C] block font-sans">Realized R:R</span>
                      <span className="font-bold text-[#15803D]">+3.20 R</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4]">
                      <span className="text-[10px] text-[#78716C] block font-sans">Entry Price</span>
                      <span className="text-[#1C1917]">2650.50</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4]">
                      <span className="text-[10px] text-[#78716C] block font-sans">Exit Price</span>
                      <span className="text-[#1C1917]">2666.50</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 Ruled Paper Canvas */}
                <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E7E5E4] p-4 relative overflow-hidden space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-[#E7E5E4]">
                      <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider font-sans">
                        Step 2: Execution Telemetry
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-medium font-sans">
                        Disciplined &amp; Grounded
                      </span>
                    </div>
                    <p className="text-xs text-[#1C1917] font-mono leading-relaxed whitespace-pre-line">
                      {`### Execution Thesis\n- Waited for 15m candle close above Asian high.\n- Zero urge to move SL to breakeven prematurely.\n- Target hit smoothly during London session overlap.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bot' && (
              <div className="max-w-md mx-auto bg-[#FAFAF9] p-5 rounded-2xl border border-[#E7E5E4] space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E7E5E4] text-[#1C1917] font-sans font-bold">
                  <Send className="w-4 h-4 text-[#C2410C]" />
                  <span>@PipBudBot • Instant Telemetry Sync</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1">
                  <span className="text-[#78716C] text-[10px]">User Input:</span>
                  <p className="text-[#1C1917]">/log XAUUSD BUY 2650.50 SL 2645.50 TP 2666.50 0.5%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1.5">
                  <span className="text-[#15803D] font-bold">Trade Registered in Audit Ledger</span>
                  <p className="text-[#1C1917] text-[11px] leading-relaxed">
                    Ticket: #904218 • Risk: $250.00 (0.50%)<br />
                    Target R:R: 1 : 3.20<br />
                    Tier Status: Level 4 Safe (DD: 1.8% / 5.0%)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
