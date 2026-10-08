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
  Sparkles,
  Layers,
  Activity,
  Compass
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'forum' | 'journal' | 'bot'>('forum');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 md:pb-28 overflow-hidden bg-[#000000] text-[#E7E9EA]">
      {/* Background Aurora Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.32),rgba(46,16,101,0.12)_45%,rgba(0,0,0,0)_75%)] z-0" />

      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#DDD6FE] mb-5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>7-Level Meritocracy • Fall Short, Get Removed</span>
          </div>

          {/* Display Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-5">
            The Journal on Telegram.{' '}
            <span className="bg-gradient-to-r from-[#DDD6FE] via-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              The Forum by Skill Level.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#71767B] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Log every trade via @PipBudBot in seconds. Build your audited track record to unlock 7 gated skill tiers on a modern trader forum. Fall short of your tier’s performance? You get automatically removed.
          </p>

          {/* Focused CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={appUrl}
              className="w-full sm:w-auto h-12 px-7 btn-primary text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(139,92,246,0.4)]"
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
              <Send className="w-4 h-4 text-[#A78BFA]" />
              <span>Start on Telegram Bot</span>
            </a>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-[#71767B]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Zero paid rankings rule
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              Cryptographic broker audit
            </span>
          </div>
        </div>

        {/* Interactive Liquid Glass Window Showcase */}
        <div className="max-w-5xl mx-auto glass-thick rounded-3xl border border-white/18 shadow-[0_24px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-[#0A0A0B]/80 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/80" />
              <span className="ml-2 text-xs font-mono text-[#71767B]">pipbud-terminal // live-preview</span>
            </div>

            {/* Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#101012] p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setActiveTab('forum')}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  activeTab === 'forum'
                    ? 'glass-violet text-white font-semibold shadow-xs'
                    : 'text-[#71767B] hover:text-white'
                }`}
              >
                7-Tier Forum
              </button>
              <button
                onClick={() => setActiveTab('journal')}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  activeTab === 'journal'
                    ? 'glass-violet text-white font-semibold shadow-xs'
                    : 'text-[#71767B] hover:text-white'
                }`}
              >
                Dual Journal Studio
              </button>
              <button
                onClick={() => setActiveTab('bot')}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                  activeTab === 'bot'
                    ? 'glass-violet text-white font-semibold shadow-xs'
                    : 'text-[#71767B] hover:text-white'
                }`}
              >
                Telegram Bot
              </button>
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="p-4 sm:p-6 bg-[#000000]">
            {activeTab === 'forum' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Sidebar */}
                <div className="lg:col-span-4 glass-regular p-3.5 rounded-2xl border border-white/12 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Trading Syndicate</h3>
                      <p className="text-[11px] text-[#A78BFA]">Level 4: Funded Floor</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30 rounded-full">
                      Audited
                    </span>
                  </div>

                  {/* Tier Health */}
                  <div className="p-2.5 glass-violet rounded-xl border border-[#8B5CF6]/30 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>Tier Health: 96%</span>
                      <span className="text-[10px] text-[#22C55E]">Safe (&lt; 5% DD)</span>
                    </div>
                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-[#22C55E] to-[#14B8A6] h-full rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>

                  {/* Channels */}
                  <div className="space-y-1 text-xs">
                    <div className="px-2 py-1 text-[10px] font-bold text-[#71767B] uppercase">Level 4: Funded Desk</div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 glass-violet text-white font-semibold rounded-xl border border-[#8B5CF6]/40">
                      <span className="flex items-center gap-1.5"># funded-floor</span>
                      <span className="text-[10px] bg-[#8B5CF6]/30 text-[#DDD6FE] px-1.5 py-0.2 rounded-full">Active</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 text-[#71767B] hover:text-white rounded-xl">
                      <span># live-tape-reading</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 text-[#71767B] hover:text-white rounded-xl">
                      <span># payout-proofs</span>
                    </div>
                  </div>
                </div>

                {/* Right Chat Stream */}
                <div className="lg:col-span-8 glass-regular p-4 rounded-2xl border border-white/12 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Chat Item 1 */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">David K.</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30">
                            L4 Risk Sentinel
                          </span>
                        </div>
                        <span className="text-[10px] text-[#71767B]">12:44 UTC</span>
                      </div>
                      <p className="text-xs text-[#E7E9EA] leading-relaxed">
                        Took EUR/USD 15m order block sweep into NY open. SL locked at +1R. Target hit at London low.
                      </p>
                      {/* Telemetry pill */}
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#101012] border border-white/10 text-[11px] font-mono">
                        <span className="text-[#22C55E] font-bold">WIN +2.45R</span>
                        <span className="text-[#71767B]">|</span>
                        <span className="text-[#A78BFA]">1.08420 &rarr; 1.08175</span>
                      </div>
                    </div>

                    {/* Chat Item 2 with Mention */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Tariq Mansoor</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-gradient-to-r from-[#8B5CF6]/30 to-[#DDD6FE]/30 text-[#DDD6FE] border border-[#8B5CF6]/40">
                            L7 Sovereign
                          </span>
                        </div>
                        <span className="text-[10px] text-[#71767B]">12:47 UTC</span>
                      </div>
                      <p className="text-xs text-[#E7E9EA] leading-relaxed">
                        Clean patience <span className="glass-violet text-[#A78BFA] px-1.5 py-0.2 rounded-md font-mono text-[11px]">@david_k</span>. Macro yield curve inversions confirm USD accumulation across this session.
                      </p>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="p-2 rounded-xl bg-[#101012] border border-white/12 flex items-center justify-between text-xs text-[#71767B]">
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
                <div className="lg:col-span-5 glass-regular p-4 rounded-2xl border border-white/12 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Step 1: Telemetry</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-[#22C55E]/15 text-[#22C55E] rounded-md">LOCKED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                      <span className="text-[10px] text-[#71767B] block font-sans">Pair & Direction</span>
                      <span className="font-bold text-white">XAU/USD LONG</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                      <span className="text-[10px] text-[#71767B] block font-sans">Realized R:R</span>
                      <span className="font-bold text-[#22C55E]">+3.20 R</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                      <span className="text-[10px] text-[#71767B] block font-sans">Entry Price</span>
                      <span className="text-white">2650.50</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                      <span className="text-[10px] text-[#71767B] block font-sans">Exit Price</span>
                      <span className="text-white">2666.50</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 Ruled Paper Canvas */}
                <div className="lg:col-span-7 rounded-2xl bg-[#0A0A0B] border border-white/14 p-4 relative overflow-hidden space-y-3">
                  {/* Violet ruled margin line at 24px */}
                  <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-[#8B5CF6]/50 pointer-events-none" />

                  <div className="pl-5 space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-white/10">
                      <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider font-sans">
                        Step 2: Deep Reflection Studio
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] font-medium font-sans">
                        Disciplined &amp; Grounded
                      </span>
                    </div>
                    <p className="text-xs text-[#E7E9EA] font-mono leading-relaxed whitespace-pre-line">
                      {`### Execution Thesis\n- Waited for 15m candle close above Asian high.\n- Zero urge to move SL to breakeven prematurely.\n- Target hit smoothly during London session overlap.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bot' && (
              <div className="max-w-md mx-auto glass-regular p-5 rounded-2xl border border-white/12 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-white font-sans font-bold">
                  <Send className="w-4 h-4 text-[#A78BFA]" />
                  <span>@PipBudBot • Instant Telemetry Sync</span>
                </div>
                <div className="p-3 rounded-xl bg-[#101012] border border-white/8 space-y-1">
                  <span className="text-[#71767B] text-[10px]">User Input:</span>
                  <p className="text-[#DDD6FE]">/log XAUUSD BUY 2650.50 SL 2645.50 TP 2666.50 0.5%</p>
                </div>
                <div className="p-3 rounded-xl glass-violet border border-[#8B5CF6]/40 space-y-1.5">
                  <span className="text-[#22C55E] font-bold">✅ Trade Registered in Audit Ledger</span>
                  <p className="text-[#E7E9EA] text-[11px] leading-relaxed">
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
