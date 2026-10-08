'use client';

import {
  BarChart3,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function WebJournalPreviewSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="journal" className="py-20 md:py-28 bg-[#FAFAF9] text-[#1C1917] border-t border-[#E7E5E4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#78716C] shadow-sm">
              <BarChart3 className="w-3.5 h-3.5 text-[#1C1917]" />
              <span>Dual-Telemetry Journal Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] leading-tight">
              Log on Telegram.{' '}
              <span className="text-[#C2410C]">
                Dissect on the Web.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
              While Telegram captures execution in real time, the PipBud Web Journal gives you deep structural analytics. Track your equity curve, setup win rates, and emotional discipline on a distraction-free institutional desktop terminal.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#1C1917] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>Audited Equity Curve syncing in real-time with Telegram</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#1C1917] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>2-Step Workflow: Hard execution telemetry + Ruled paper reflection</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#1C1917] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>Session Heatmaps: London vs NY Killzone expectancy analysis</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`${appUrl}/journal`}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-[#1C1917] hover:bg-[#292524] text-white transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Open Journal Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div>
                <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block">
                  Desk Equity Curve • Verified Account
                </span>
                <span className="text-[11px] text-[#78716C] font-mono">IC Markets Raw Spread Live</span>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                +28.2% Net P&amp;L
              </span>
            </div>

            {/* Telemetry Stat Row */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block font-sans">Win Rate</span>
                <strong className="text-[#1C1917]">61.4%</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block font-sans">Profit Factor</span>
                <strong className="text-[#15803D]">1.94</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block font-sans">Sharpe</span>
                <strong className="text-[#1C1917]">1.62</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block font-sans">Max DD</span>
                <strong className="text-[#B91C1C]">-2.8%</strong>
              </div>
            </div>

            {/* Ruled Reflection Notepad Preview */}
            <div className="rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] p-4 relative overflow-hidden space-y-2">
              <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-[#C2410C]/40 pointer-events-none" />
              <div className="pl-5 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-[#E7E5E4] font-sans">
                  <span className="text-[11px] font-bold text-[#C2410C] uppercase tracking-wide">Post-Trade Autopsy</span>
                  <span className="text-[10px] text-[#15803D] font-medium">Calm &amp; Disciplined</span>
                </div>
                <p className="text-[#44403C] text-[11px] leading-relaxed">
                  EUR/USD swept London lows during NY open. Waited for 15m displacement closure before pressing market order. SL placed below invalidation level. 1:3.2R target achieved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
