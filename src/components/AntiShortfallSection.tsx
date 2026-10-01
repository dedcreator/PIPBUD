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
  Radio
} from 'lucide-react';

export default function AntiShortfallSection() {
  const [demoState, setDemoState] = useState<'healthy' | 'warning' | 'demoted'>('warning');

  return (
    <section id="legitimacy" className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2] mb-3">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Zero-Tolerance Quality Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Everybody is Legit.{' '}
            <span className="text-[#B91C1C]">Fall short, and you get removed.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#44403C]">
            Trading communities are plagued by fake gurus with demo screenshots and lucky streaks. On PipBud, your forum access is tied to continuous live journal performance.
          </p>
        </div>

        {/* The 4-Stage Lifecycle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-xs relative">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] text-[#C2410C] font-bold text-sm flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="font-bold text-base text-[#1C1917] mb-2">Continuous Ledger Audit</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Every trade logged via Telegram or MT5 sync is verified. PipBud continuously computes your 30-day win rate, profit factor, and maximum drawdown curve.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-xs relative">
            <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] text-[#D97706] font-bold text-sm flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="font-bold text-base text-[#1C1917] mb-2">Tier Health Metric</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Every trader holds a Tier Health Score (100% to 0%). Breaching drawdown limits, revenge trading, or logging stop-less trades drains your health bar.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-xs relative">
            <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] text-[#B91C1C] font-bold text-sm flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="font-bold text-base text-[#1C1917] mb-2">Automated Early Warning</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              When health drops to 50%, you receive an urgent Telegram alert with a cooldown protocol. You get a temporary grace window to restore risk discipline.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-xs relative">
            <div className="w-9 h-9 rounded-xl bg-[#1C1917] text-white font-bold text-sm flex items-center justify-center mb-4">
              04
            </div>
            <h3 className="font-bold text-base text-[#1C1917] mb-2">Instant Relegation &amp; Kick</h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              At 0% health, the bot executes an automated kick. Permissions are stripped from higher forum channels and Telegram groups, and logged in #demotions-log.
            </p>
          </div>
        </div>

        {/* Live Interactive Demotion Sandbox */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-[0_4px_12px_rgba(28,25,23,0.06)] overflow-hidden">
          <div className="p-4 sm:p-6 bg-[#F5F5F4] border-b border-[#E7E5E4] flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[#1C1917] flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#B91C1C] animate-pulse" />
                <span>Simulate The Anti-Shortfall Engine</span>
              </h3>
              <p className="text-xs text-[#78716C]">
                See how the system responds when an operator breaches risk limits.
              </p>
            </div>

            {/* Simulation States Controller */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E7E5E4]">
              <button
                onClick={() => setDemoState('healthy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  demoState === 'healthy'
                    ? 'bg-[#15803D] text-white'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                1. Healthy Execution
              </button>
              <button
                onClick={() => setDemoState('warning')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  demoState === 'warning'
                    ? 'bg-[#A16207] text-white'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                2. Drawdown Warning
              </button>
              <button
                onClick={() => setDemoState('demoted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  demoState === 'demoted'
                    ? 'bg-[#B91C1C] text-white'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                3. Relegated &amp; Removed
              </button>
            </div>
          </div>

          {/* Sandbox Body */}
          <div className="p-6 sm:p-8 bg-white">
            {demoState === 'healthy' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="p-4 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F766E] mb-2">
                    <span>Trader Status</span>
                    <span>Level 4: Funded Pro</span>
                  </div>
                  <div className="text-2xl font-bold text-[#0F766E] mb-1">100% Health</div>
                  <p className="text-xs text-[#115E59]">Drawdown: 2.1% (Safe below 5.0% ceiling)</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <div className="text-xs text-[#78716C] mb-1">Channel Access</div>
                  <div className="font-mono text-xs font-bold text-[#1C1917]">
                    #funded-floor, #live-tape-reading
                  </div>
                  <span className="inline-block mt-2 text-[10px] text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded font-medium">
                    Full Voice &amp; Chat Enabled
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs space-y-1">
                  <div className="font-semibold text-[#1C1917]">Telegram Notification:</div>
                  <p className="text-[#78716C] italic">
                    &ldquo;All stats verified. You are in good standing for Level 4.&rdquo;
                  </p>
                </div>
              </div>
            )}

            {demoState === 'warning' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#92400E] mb-2">
                    <span>Trader Status</span>
                    <span className="text-[#B45309]">Probation Warning</span>
                  </div>
                  <div className="text-2xl font-bold text-[#D97706] mb-1">45% Health</div>
                  <p className="text-xs text-[#92400E]">Drawdown: 4.8% (Dangerously close to 5.0% limit)</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <div className="text-xs text-[#78716C] mb-1">Channel Access</div>
                  <div className="font-mono text-xs font-bold text-[#D97706]">
                    #funded-floor (Restricted Read-Only)
                  </div>
                  <span className="inline-block mt-2 text-[10px] text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded font-medium">
                    24-Hour Cooldown Protocol
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs space-y-1">
                  <div className="font-semibold text-[#92400E]">Telegram Warning:</div>
                  <p className="text-[#78716C] italic">
                    &ldquo;⚠️ Drawdown spiked to 4.8%. If your next trade exceeds 5.0%, you will be removed immediately.&rdquo;
                  </p>
                </div>
              </div>
            )}

            {demoState === 'demoted' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#B91C1C] mb-2">
                    <span>Trader Status</span>
                    <span className="text-[#B91C1C]">DEMOTED TO LEVEL 3</span>
                  </div>
                  <div className="text-2xl font-bold text-[#B91C1C] mb-1">0% Health</div>
                  <p className="text-xs text-[#7F1D1D]">Drawdown: 5.4% (Breached 5.0% threshold)</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2]">
                  <div className="text-xs text-[#78716C] mb-1">Channel Access</div>
                  <div className="font-mono text-xs font-bold text-[#B91C1C] line-through">
                    #funded-floor (REVOKED)
                  </div>
                  <span className="inline-block mt-2 text-[10px] text-[#B91C1C] bg-white px-2 py-0.5 rounded font-medium border border-[#FEE2E2]">
                    Kicked from Supergroup
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs space-y-1">
                  <div className="font-semibold text-[#1C1917]">Public Transparency Notice:</div>
                  <p className="text-[#78716C] font-mono text-[11px]">
                    &ldquo;[AUDIT DEMOTION] Trader @emeka_scalp relegated to Level 3. Drawdown breach.&rdquo;
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
