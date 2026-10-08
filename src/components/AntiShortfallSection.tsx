'use client';

import { useState } from 'react';
import {
  AlertOctagon,
  ShieldCheck,
  TrendingDown,
  UserX,
  BellRing,
  ArrowDownRight,
  Flame,
  CheckCircle,
  XCircle,
  Radio,
  Zap
} from 'lucide-react';

export default function AntiShortfallSection() {
  const [demoState, setDemoState] = useState<'healthy' | 'warning' | 'demoted'>('warning');

  return (
    <section id="anti-shortfall" className="py-20 md:py-28 bg-[#000000] text-[#E7E9EA] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none bg-[radial-gradient(ellipse,rgba(244,63,94,0.12)_0%,rgba(76,29,149,0.06)_50%,transparent_70%)] blur-3xl z-0" />

      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold glass-ultrathin border border-[#F43F5E]/30 text-[#F43F5E] mb-4">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Zero-Tolerance Quality Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Everybody is Legit.{' '}
            <span className="text-[#F43F5E]">Fall short, and you get removed.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#71767B]">
            Trading communities are plagued by fake gurus with demo screenshots and unverified claims. On PipBud, your forum access is tied to continuous live journal performance.
          </p>
        </div>

        {/* The 4-Stage Lifecycle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {/* Step 1 */}
          <div className="glass-regular p-6 rounded-3xl border border-white/12 space-y-3">
            <div className="w-9 h-9 rounded-2xl glass-violet text-[#A78BFA] font-bold text-sm flex items-center justify-center border border-[#8B5CF6]/40">
              01
            </div>
            <h3 className="font-bold text-base text-white">Continuous Ledger Audit</h3>
            <p className="text-xs text-[#71767B] leading-relaxed">
              Every trade logged via Telegram or MT5 sync is cryptographically verified. PipBud continuously computes your 30-day win rate, profit factor, and maximum drawdown curve.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-regular p-6 rounded-3xl border border-white/12 space-y-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F59E0B]/20 text-[#F59E0B] font-bold text-sm flex items-center justify-center border border-[#F59E0B]/30">
              02
            </div>
            <h3 className="font-bold text-base text-white">Tier Health Metric</h3>
            <p className="text-xs text-[#71767B] leading-relaxed">
              Every trader holds a Tier Health Score (100% to 0%). Breaching drawdown limits, revenge trading, or logging stop-less trades drains your health bar.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-regular p-6 rounded-3xl border border-white/12 space-y-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F43F5E]/20 text-[#F43F5E] font-bold text-sm flex items-center justify-center border border-[#F43F5E]/30">
              03
            </div>
            <h3 className="font-bold text-base text-white">Automated Warning</h3>
            <p className="text-xs text-[#71767B] leading-relaxed">
              When health drops below 50%, you receive an urgent Telegram alert with a cooldown protocol. You get a temporary grace window to restore risk discipline.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-regular p-6 rounded-3xl border border-white/12 space-y-3">
            <div className="w-9 h-9 rounded-2xl bg-white/10 text-white font-bold text-sm flex items-center justify-center border border-white/20">
              04
            </div>
            <h3 className="font-bold text-base text-white">Instant Removal &amp; Kick</h3>
            <p className="text-xs text-[#71767B] leading-relaxed">
              At 0% health, the bot executes an automated kick. Permissions are stripped from higher forum channels and logged transparently in #demotions-log.
            </p>
          </div>
        </div>

        {/* Interactive Simulator Card */}
        <div className="max-w-4xl mx-auto glass-thick rounded-3xl border border-white/18 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Tier Health &amp; Demotion Simulator</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              </h3>
              <p className="text-xs text-[#71767B]">
                Interactive preview of how the automated anti-shortfall engine protects community standards.
              </p>
            </div>

            {/* State Controls */}
            <div className="flex items-center gap-1 bg-[#101012] p-1 rounded-2xl border border-white/10 text-xs">
              <button
                onClick={() => setDemoState('healthy')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  demoState === 'healthy'
                    ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40'
                    : 'text-[#71767B] hover:text-white'
                }`}
              >
                100% Healthy
              </button>
              <button
                onClick={() => setDemoState('warning')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  demoState === 'warning'
                    ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                    : 'text-[#71767B] hover:text-white'
                }`}
              >
                45% Warning
              </button>
              <button
                onClick={() => setDemoState('demoted')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  demoState === 'demoted'
                    ? 'bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/40'
                    : 'text-[#71767B] hover:text-white'
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
                <span className="text-[#71767B]">Simulated Member: @trader_alex</span>
                <span
                  className="font-bold text-xs"
                  style={{
                    color: demoState === 'healthy' ? '#22C55E' : demoState === 'warning' ? '#F59E0B' : '#F43F5E',
                  }}
                >
                  {demoState === 'healthy' ? 'Health: 98% (Compliant)' : demoState === 'warning' ? 'Health: 45% (Drawdown Warning)' : 'Health: 0% (Demoted)'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#101012] h-2.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: demoState === 'healthy' ? '98%' : demoState === 'warning' ? '45%' : '0%',
                    backgroundColor: demoState === 'healthy' ? '#22C55E' : demoState === 'warning' ? '#F59E0B' : '#F43F5E',
                  }}
                />
              </div>

              <p className="text-xs text-[#71767B] leading-relaxed">
                {demoState === 'healthy' && 'Trader maintains 2.1% max drawdown on Level 4. Full access to #funded-floor and verified live commentary channels.'}
                {demoState === 'warning' && 'Drawdown hit 4.8% on a 5.0% threshold. Bot dispatched telegram alert. Trader has 48 hours to restore performance parameters.'}
                {demoState === 'demoted' && 'Max drawdown exceeded 5.2%. Automated script demoted @trader_alex back to Level 3 Consistent Desk. Record published in #demotions-log.'}
              </p>
            </div>

            <div className="md:col-span-5 p-4 rounded-2xl bg-[#101012] border border-white/10 font-mono text-xs space-y-1.5">
              <span className="text-[10px] text-[#71767B] font-sans block uppercase font-bold tracking-wider">
                Automated Audit Log
              </span>
              <p className="text-white text-[11px] leading-relaxed">
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
