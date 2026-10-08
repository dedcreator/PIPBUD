'use client';

import { useState } from 'react';
import {
  AlertOctagon,
  ShieldCheck,
  TrendingDown,
  UserX,
  BellRing,
  CheckCircle,
  XCircle,
  Radio,
  Zap
} from 'lucide-react';

export default function AntiShortfallSection() {
  const [demoState, setDemoState] = useState<'healthy' | 'warning' | 'demoted'>('warning');

  return (
    <section id="anti-shortfall" className="py-20 md:py-28 bg-[#FAFAF9] text-[#1C1917] border-t border-[#E7E5E4] relative overflow-hidden">
      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#FECACA] text-[#B91C1C] mb-4 shadow-2xs">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Zero-Tolerance Quality Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Everybody is Legit.{' '}
            <span className="text-[#B91C1C]">Fall short, and you get removed.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#78716C]">
            Trading communities are plagued by fake gurus with demo screenshots and unverified claims. On PipBud, your forum access is tied to continuous live journal performance.
          </p>
        </div>

        {/* The 4-Stage Lifecycle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-[#FAFAF9] text-[#1C1917] font-bold text-sm flex items-center justify-center border border-[#E7E5E4]">
              01
            </div>
            <h3 className="font-bold text-base text-[#1C1917]">Continuous Ledger Audit</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Every trade logged via Telegram or MT5 sync is cryptographically verified. PipBud continuously computes your 30-day win rate, profit factor, and maximum drawdown curve.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-[#FEF3C7] text-[#D97706] font-bold text-sm flex items-center justify-center border border-[#FDE68A]">
              02
            </div>
            <h3 className="font-bold text-base text-[#1C1917]">Tier Health Metric</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Every trader holds a Tier Health Score (100% to 0%). Breaching drawdown limits, revenge trading, or logging stop-less trades drains your health bar.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-[#FEE2E2] text-[#B91C1C] font-bold text-sm flex items-center justify-center border border-[#FECACA]">
              03
            </div>
            <h3 className="font-bold text-base text-[#1C1917]">Automated Warning</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              When health drops below 50%, you receive an urgent Telegram alert with a cooldown protocol. You get a temporary grace window to restore risk discipline.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-2xl bg-[#F5F5F4] text-[#1C1917] font-bold text-sm flex items-center justify-center border border-[#E7E5E4]">
              04
            </div>
            <h3 className="font-bold text-base text-[#1C1917]">Instant Removal &amp; Kick</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              At 0% health, the bot executes an automated kick. Permissions are stripped from higher forum channels and logged transparently in #demotions-log.
            </p>
          </div>
        </div>

        {/* Interactive Simulator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
            <div>
              <h3 className="text-lg font-bold text-[#1C1917] flex items-center gap-2">
                <span>Tier Health &amp; Demotion Simulator</span>
                <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              </h3>
              <p className="text-xs text-[#78716C]">
                Interactive preview of how the automated anti-shortfall engine protects community standards.
              </p>
            </div>

            {/* State Controls */}
            <div className="flex items-center gap-1 bg-[#FAFAF9] p-1 rounded-2xl border border-[#E7E5E4] text-xs">
              <button
                onClick={() => setDemoState('healthy')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  demoState === 'healthy'
                    ? 'bg-[#DCFCE7] text-[#15803D] font-bold shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                100% Healthy
              </button>
              <button
                onClick={() => setDemoState('warning')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  demoState === 'warning'
                    ? 'bg-[#FEF3C7] text-[#D97706] font-bold shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                45% Warning
              </button>
              <button
                onClick={() => setDemoState('demoted')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  demoState === 'demoted'
                    ? 'bg-[#FEE2E2] text-[#B91C1C] font-bold shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                0% Demoted
              </button>
            </div>
          </div>

          {/* Status Display Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#78716C]">Simulated Member: @trader_alex</span>
                <span
                  className="font-bold text-xs"
                  style={{
                    color: demoState === 'healthy' ? '#15803D' : demoState === 'warning' ? '#D97706' : '#B91C1C',
                  }}
                >
                  {demoState === 'healthy' ? 'Health: 98% (Compliant)' : demoState === 'warning' ? 'Health: 45% (Drawdown Warning)' : 'Health: 0% (Demoted)'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#E7E5E4] h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: demoState === 'healthy' ? '98%' : demoState === 'warning' ? '45%' : '0%',
                    backgroundColor: demoState === 'healthy' ? '#15803D' : demoState === 'warning' ? '#D97706' : '#B91C1C',
                  }}
                />
              </div>

              <p className="text-xs text-[#78716C] leading-relaxed">
                {demoState === 'healthy' && 'Trader maintains 2.1% max drawdown on Level 4. Full access to #funded-floor and verified live commentary channels.'}
                {demoState === 'warning' && 'Drawdown hit 4.8% on a 5.0% threshold. Bot dispatched telegram alert. Trader has 48 hours to restore performance parameters.'}
                {demoState === 'demoted' && 'Max drawdown exceeded 5.2%. Automated script demoted @trader_alex back to Level 3 Consistent Desk. Record published in #demotions-log.'}
              </p>
            </div>

            <div className="md:col-span-5 p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] font-mono text-xs space-y-1.5">
              <span className="text-[10px] text-[#78716C] font-sans block uppercase font-bold tracking-wider">
                Automated Audit Log
              </span>
              <p className="text-[#1C1917] text-[11px] leading-relaxed">
                [SYSTEM]: @trader_alex status checked.<br />
                {demoState === 'healthy' && '[STATUS]: Tier 4 Pass • Sharpe 1.62'}
                {demoState === 'warning' && '[ALERT]: Tier Health 45% • Caution active'}
                {demoState === 'demoted' && '[ACTION]: Relegated L4 -> L3 • Channel keys revoked'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
