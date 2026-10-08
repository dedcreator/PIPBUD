'use client';

import {
  MessageSquare,
  ShieldCheck,
  Code2,
  Mic,
  ArrowRight,
  Activity
} from 'lucide-react';

export default function ForumShowcaseSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF9] text-[#1C1917] border-t border-[#E7E5E4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#1C1917] mb-4 shadow-2xs">
            <MessageSquare className="w-4 h-4 text-[#C2410C]" />
            <span>Institutional Discussion Desks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Built for Serious Execution.
          </h2>
          <p className="text-base sm:text-lg text-[#78716C]">
            Discord is noisy. Telegram groups are chaotic. PipBud Forum is engineered specifically for verified market operators with trade card embeds, audio huddles, and algorithmic code sharing.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Interactive Trade Embeds */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] shadow-xs transition-all space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAFAF9] text-[#1C1917] flex items-center justify-center border border-[#E7E5E4]">
              <Activity className="w-5 h-5 text-[#15803D]" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917]">Audited Trade Embeds</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              When traders share a setup, it renders an interactive card with entry price, stop-loss, take-profit, and verified broker hash. No unbacked claims.
            </p>
            <div className="pt-2">
              <div className="bg-[#FAFAF9] p-3 rounded-2xl border border-[#E7E5E4] text-xs">
                <div className="flex justify-between font-bold text-[#1C1917] mb-1">
                  <span>EUR/USD BUY LONG</span>
                  <span className="text-[#15803D]">+2.50% WIN</span>
                </div>
                <div className="text-[11px] text-[#78716C] font-mono">R:R 1:2.50 • 15m OB Retest</div>
              </div>
            </div>
          </div>

          {/* Card 2: Live Audio Huddles */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] shadow-xs transition-all space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAFAF9] text-[#1C1917] flex items-center justify-center border border-[#E7E5E4]">
              <Mic className="w-5 h-5 text-[#C2410C]" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917]">Live Voice Huddles</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Level 4+ desks host live voice rooms during London and NY market opens. Discuss high-probability liquidity sweeps in real time without lag.
            </p>
            <div className="pt-2">
              <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#1C1917]">
                  <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
                  <span className="font-semibold">NY Killzone Huddle</span>
                </div>
                <span className="text-[11px] text-[#15803D] font-mono">18 on stage</span>
              </div>
            </div>
          </div>

          {/* Card 3: Code & Strategy Sharing */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] shadow-xs transition-all space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FAFAF9] text-[#1C1917] flex items-center justify-center border border-[#E7E5E4]">
              <Code2 className="w-5 h-5 text-[#1C1917]" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917]">Syntax &amp; Algo Blocks</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Native syntax highlighting for PineScript, Python, MQL4/5, and algorithmic backtests. Copy strategies directly into your execution terminal.
            </p>
            <div className="pt-2">
              <div className="bg-[#FAFAF9] p-3 rounded-2xl border border-[#E7E5E4] text-xs font-mono text-[#1C1917]">
                ta.crossover(sma_fast, sma_slow)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center">
          <a
            href={`${appUrl}/forum`}
            className="btn-primary px-7 py-3 text-sm font-semibold rounded-full inline-flex items-center gap-2 shadow-xs"
          >
            <span>Open Forum Desks</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
