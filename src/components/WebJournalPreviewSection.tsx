'use client';

import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PieChart,
  Calendar,
  Layers,
  Activity
} from 'lucide-react';

export default function WebJournalPreviewSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="journal" className="py-20 md:py-28 bg-[#000000] text-[#E7E9EA] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#A78BFA]">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dual-Telemetry Journal Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Log on Telegram.{' '}
              <span className="bg-gradient-to-r from-[#DDD6FE] to-[#8B5CF6] bg-clip-text text-transparent">
                Dissect on the Web.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#71767B] leading-relaxed">
              While Telegram captures the heat of the moment, the PipBud Web Journal gives you deep structural analytics. Track your equity curve, setup win rates, and emotional discipline on a distraction-free Liquid Glass desktop terminal.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-white">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Audited Equity Curve syncing in real-time with Telegram</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>2-Step Workflow: Hard execution telemetry + Ruled paper reflection</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Session Heatmaps: London vs NY Killzone expectancy analysis</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`${appUrl}/journal`}
                className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full inline-flex items-center gap-2"
              >
                <span>Open Journal Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-7 glass-thick rounded-3xl border border-white/18 p-6 sm:p-7 shadow-[0_24px_80px_rgba(0,0,0,0.85)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Desk Equity Curve • Verified Account
                </span>
                <span className="text-[11px] text-[#A78BFA] font-mono">IC Markets Raw Spread Live</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                +28.2% Net P&amp;L
              </span>
            </div>

            {/* Telemetry Stat Row */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                <span className="text-[10px] text-[#71767B] block font-sans">Win Rate</span>
                <strong className="text-white">61.4%</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                <span className="text-[10px] text-[#71767B] block font-sans">Profit Factor</span>
                <strong className="text-[#22C55E]">1.94</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                <span className="text-[10px] text-[#71767B] block font-sans">Sharpe</span>
                <strong className="text-[#A78BFA]">1.62</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#101012] border border-white/8">
                <span className="text-[10px] text-[#71767B] block font-sans">Max DD</span>
                <strong className="text-[#F43F5E]">-2.8%</strong>
              </div>
            </div>

            {/* Midnight Ruled Reflection Notepad Preview */}
            <div className="rounded-2xl bg-[#0A0A0B] border border-white/12 p-4 relative overflow-hidden space-y-2">
              <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-[#8B5CF6]/50 pointer-events-none" />
              <div className="pl-5 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-white/8 font-sans">
                  <span className="text-[11px] font-bold text-[#A78BFA] uppercase">Post-Trade Autopsy</span>
                  <span className="text-[10px] text-[#22C55E]">Calm &amp; Disciplined</span>
                </div>
                <p className="text-[#E7E9EA] text-[11px] leading-relaxed">
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
