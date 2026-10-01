'use client';

import Link from 'next/link';
import {
  MessageSquare,
  ShieldCheck,
  Code2,
  Mic,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Layers,
  Activity
} from 'lucide-react';

export default function ForumShowcaseSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>State-of-the-Art Messaging Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Built for Serious Execution.
          </h2>
          <p className="text-base sm:text-lg text-[#44403C]">
            Discord is noisy. Telegram groups are chaotic. PipBud Forum is engineered specifically for verified market operators with trade card embeds, audio huddles, and algorithmic code sharing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Interactive Trade Embeds */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917]">Audited Trade Embeds</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              When traders share a setup, it renders an interactive card with entry price, stop-loss, take-profit, and verified broker hash. No unbacked claims.
            </p>
            <div className="pt-2">
              <div className="bg-white p-3 rounded-xl border border-[#E7E5E4] text-xs">
                <div className="flex justify-between font-bold text-[#1C1917] mb-1">
                  <span>EUR/USD BUY LONG</span>
                  <span className="text-[#15803D]">+2.50% WIN</span>
                </div>
                <div className="text-[11px] text-[#78716C] font-mono">R:R 1:2.50 • 15m OB Retest</div>
              </div>
            </div>
          </div>

          {/* Card 2: Live Audio Huddles */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917]">Live Session Huddles</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              High-tier rooms (Level 6 Mentors &amp; Level 7 Titans) feature live low-latency audio rooms for London and New York Killzone tape reading and FOMC reactions.
            </p>
            <div className="pt-2">
              <div className="bg-white p-3 rounded-xl border border-[#E7E5E4] text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping" />
                  <span className="font-semibold text-[#1C1917]">London Bias Huddle</span>
                </div>
                <span className="text-[10px] text-[#78716C] font-mono">18 Listening</span>
              </div>
            </div>
          </div>

          {/* Card 3: PineScript & Algo Code */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] transition-all space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917]">PineScript &amp; Code Blocks</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Share TradingView indicators, Python backtesting scripts, and webhook alerts with syntax formatting and one-click copy.
            </p>
            <div className="pt-2">
              <div className="bg-[#1C1917] p-2.5 rounded-xl text-[10px] font-mono text-[#D6D3D1] truncate">
                <span className="text-[#FB923C]">indicator</span>(&apos;PipBud Sweep&apos;, overlay=true)
              </div>
            </div>
          </div>
        </div>

        {/* Big Banner CTA to Open Forum */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#44403C] text-[#FB923C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Interactive Messaging Platform</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Experience the 7-Tier Forum Web App Now
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] max-w-xl">
              Explore live channel feeds, test sending rich trade cards, and observe how the anti-shortfall enforcement works in real-time.
            </p>
          </div>

          <Link
            href="/forum"
            className="h-12 px-7 bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium rounded-xl text-sm inline-flex items-center gap-2 shrink-0 transition-all shadow-sm"
          >
            <span>Launch Forum Web App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
