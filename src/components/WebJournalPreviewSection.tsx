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
  Layers
} from 'lucide-react';

export default function WebJournalPreviewSection() {
  const equityPoints = [
    { trade: 0, val: 10000 },
    { trade: 10, val: 10450 },
    { trade: 20, val: 10200 },
    { trade: 30, val: 11100 },
    { trade: 40, val: 11400 },
    { trade: 50, val: 12250 },
    { trade: 65, val: 12050 },
    { trade: 86, val: 12820 },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C]">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Full Web Journal Companion</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] leading-tight">
              Log on Telegram.{' '}
              <span className="text-[#C2410C]">Dissect on the Web.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
              While Telegram captures the heat of the moment, the PipBud Web Journal gives you deep structural analytics. Track your equity curve, setup win rates, and session biases on a clean, distraction-free desktop dashboard.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#1C1917]">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span>Audited Equity Curve syncing in real-time with Telegram</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#1C1917]">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span>SMC/ICT Setup Tagging: OB, FVG, Liquidity Sweeps</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#1C1917]">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span>Session Heatmaps: London vs NY Killzone edge</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/journal"
                className="h-12 px-6 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-sm font-medium inline-flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Open Full Web Journal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-7 bg-[#FAFAF9] p-6 sm:p-8 rounded-2xl border border-[#E7E5E4] shadow-[0_4px_12px_rgba(28,25,23,0.06)] space-y-6">
            {/* Header KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block">Net Profit</span>
                <span className="text-lg font-bold text-[#15803D] tabular-nums">+$2,820.00</span>
                <span className="text-[10px] text-[#15803D] block">+28.2%</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block">Win Rate</span>
                <span className="text-lg font-bold text-[#1C1917] tabular-nums">54.5%</span>
                <span className="text-[10px] text-[#78716C] block">42W - 35L - 9BE</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block">Profit Factor</span>
                <span className="text-lg font-bold text-[#1C1917] tabular-nums">1.72</span>
                <span className="text-[10px] text-[#0F766E] block">Level 4 Verified</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block">Max Drawdown</span>
                <span className="text-lg font-bold text-[#C2410C] tabular-nums">3.2%</span>
                <span className="text-[10px] text-[#0F766E] block">Ceiling: 5.0%</span>
              </div>
            </div>

            {/* Interactive SVG Equity Curve */}
            <div className="bg-white p-5 rounded-xl border border-[#E7E5E4]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917]">Audited Account Equity Curve</h4>
                  <p className="text-[10px] text-[#78716C]">Starting $10,000.00 • 86 verified trades</p>
                </div>
                <span className="text-xs font-bold text-[#15803D] tabular-nums">Current: $12,820.00</span>
              </div>

              {/* Simplified SVG Chart */}
              <div className="h-40 w-full">
                <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C2410C" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#C2410C" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#E7E5E4" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="#E7E5E4" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="500" y2="110" stroke="#E7E5E4" strokeDasharray="3 3" />

                  {/* Gradient Fill */}
                  <polygon
                    points="0,110 0,105 70,88 140,94 210,65 280,55 350,30 420,38 500,10 500,110"
                    fill="url(#equityGrad)"
                  />
                  {/* Equity Line */}
                  <polyline
                    fill="none"
                    stroke="#C2410C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,105 70,88 140,94 210,65 280,55 350,30 420,38 500,10"
                  />
                  {/* Latest point */}
                  <circle cx="500" cy="10" r="4.5" fill="#C2410C" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Setup Breakdown */}
            <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] space-y-2.5">
              <span className="text-[11px] font-bold text-[#1C1917] block">Setup Win Rate Distribution</span>
              <div className="space-y-1.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-[#44403C]">Order Block (OB) Retest</span>
                    <span className="font-bold text-[#1C1917]">64.2% WR (28 trades)</span>
                  </div>
                  <div className="w-full bg-[#FAFAF9] h-2 rounded-full overflow-hidden border border-[#E7E5E4]">
                    <div className="bg-[#C2410C] h-full rounded-full" style={{ width: '64.2%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-[#44403C]">Fair Value Gap (FVG) Tap</span>
                    <span className="font-bold text-[#1C1917]">58.0% WR (31 trades)</span>
                  </div>
                  <div className="w-full bg-[#FAFAF9] h-2 rounded-full overflow-hidden border border-[#E7E5E4]">
                    <div className="bg-[#EA580C] h-full rounded-full" style={{ width: '58%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-[#44403C]">Liquidity Sweeps &amp; Turtle Soup</span>
                    <span className="font-bold text-[#1C1917]">52.6% WR (19 trades)</span>
                  </div>
                  <div className="w-full bg-[#FAFAF9] h-2 rounded-full overflow-hidden border border-[#E7E5E4]">
                    <div className="bg-[#FB923C] h-full rounded-full" style={{ width: '52.6%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
