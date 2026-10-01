'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TRADER_TIERS, TraderTier } from '@/data/tiers';
import {
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Zap,
  Users,
  Mic,
  MessageSquare
} from 'lucide-react';

export default function TiersSection() {
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const currentTier = TRADER_TIERS.find((t) => t.level === selectedLevel) || TRADER_TIERS[3];

  // Quick qualification calculator state
  const [calcTrades, setCalcTrades] = useState<number>(85);
  const [calcWinRate, setCalcWinRate] = useState<number>(52);
  const [calcDrawdown, setCalcDrawdown] = useState<number>(4.2);

  const calculateEligibleLevel = (): number => {
    // Reverse evaluate from 7 down to 1
    for (let i = 6; i >= 0; i--) {
      const tier = TRADER_TIERS[i];
      if (
        calcTrades >= tier.minTrades &&
        calcWinRate >= tier.minWinRate &&
        calcDrawdown <= tier.maxDrawdown
      ) {
        return tier.level;
      }
    }
    return 1;
  };

  const eligibleLevel = calculateEligibleLevel();
  const eligibleTier = TRADER_TIERS.find((t) => t.level === eligibleLevel) || TRADER_TIERS[0];

  return (
    <section id="tiers" className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFEDD5] text-[#C2410C] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>The Meritocracy Hierarchy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            7 Skill Levels. Zero Compromises.
          </h2>
          <p className="text-base sm:text-lg text-[#44403C]">
            Every forum channel is strictly gated by proven journal statistics. You cannot buy access, you cannot fake screenshots. You earn your rank — and if your performance decays, you get demoted.
          </p>
        </div>

        {/* 7 Tiers Horizontal Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TRADER_TIERS.map((tier) => {
            const isSelected = tier.level === selectedLevel;
            return (
              <button
                key={tier.level}
                onClick={() => setSelectedLevel(tier.level)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl border transition-all text-left flex items-center gap-3 ${
                  isSelected
                    ? 'bg-white border-[#C2410C] shadow-sm ring-1 ring-[#C2410C]'
                    : 'bg-white/80 border-[#E7E5E4] hover:bg-white hover:border-[#FED7AA]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-[#C2410C] text-white' : 'bg-[#F5F5F4] text-[#78716C]'
                  }`}
                >
                  {tier.level}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-[#C2410C]' : 'text-[#1C1917]'}`}>
                    {tier.name}
                  </div>
                  <div className="text-[10px] text-[#78716C]">
                    Max DD ≤ {tier.maxDrawdown}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Spotlight Card */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-[0_4px_12px_rgba(28,25,23,0.06)] p-6 sm:p-8 lg:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Tier Summary & Requirements */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: currentTier.badgeBg, color: currentTier.badgeText }}
                    >
                      {currentTier.badge}
                    </span>
                    <span className="text-xs text-[#78716C]">
                      • {currentTier.activeTradersCount} Verified Members
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
                    {currentTier.title}
                  </h3>
                  <p className="text-sm text-[#78716C] mt-1">{currentTier.tagline}</p>
                </div>

                <Link
                  href="/forum"
                  className="px-4 py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Browse Level {currentTier.level} Channels</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Requirement Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <span className="text-[11px] text-[#78716C] block">Min Verified Trades</span>
                  <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                    {currentTier.minTrades === 0 ? 'Any' : `${currentTier.minTrades}+`}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <span className="text-[11px] text-[#78716C] block">Min Win Rate</span>
                  <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                    {currentTier.minWinRate === 0 ? 'Any' : `${currentTier.minWinRate}%`}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  <span className="text-[11px] text-[#78716C] block">Min Profit Factor</span>
                  <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                    {currentTier.minProfitFactor === 0 ? 'N/A' : `${currentTier.minProfitFactor}`}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA]">
                  <span className="text-[11px] text-[#9A3412] font-semibold block">Max Drawdown Limit</span>
                  <span className="text-xl font-bold text-[#C2410C] tabular-nums">
                    ≤ {currentTier.maxDrawdown}%
                  </span>
                </div>
              </div>

              {/* Tier Description */}
              <p className="text-sm text-[#44403C] leading-relaxed">
                {currentTier.description}
              </p>

              {/* Exclusive Perks List */}
              <div>
                <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2.5">
                  Level {currentTier.level} Privileges
                </h4>
                <div className="space-y-2">
                  {currentTier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#44403C]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C2410C] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Gated Channels & Anti-Shortfall Rule */}
            <div className="lg:col-span-5 bg-[#FAFAF9] p-5 rounded-xl border border-[#E7E5E4] space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                    Unlocked Forum Channels
                  </h4>
                  <span className="text-[11px] font-semibold text-[#0F766E] bg-[#F0FDFA] px-2 py-0.5 rounded border border-[#CCFBF1]">
                    Gated Level {currentTier.level}+
                  </span>
                </div>

                <div className="space-y-2">
                  {currentTier.unlockedChannels.map((ch, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white rounded-lg border border-[#E7E5E4] hover:border-[#FED7AA] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-xs text-[#1C1917] flex items-center gap-1.5">
                          {ch.isVoice ? (
                            <Mic className="w-3.5 h-3.5 text-[#C2410C]" />
                          ) : (
                            <MessageSquare className="w-3.5 h-3.5 text-[#78716C]" />
                          )}
                          #{ch.name}
                        </span>
                        {ch.isVoice && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FFEDD5] text-[#C2410C] px-1.5 py-0.5 rounded">
                            Voice Room
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#78716C] leading-snug">{ch.topic}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Anti-Shortfall / Demotion Rule Box */}
              <div className="p-3.5 bg-[#FEF2F2] rounded-xl border border-[#FEE2E2]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#B91C1C] mb-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>The Relegation Penalty (Zero Tolerance)</span>
                </div>
                <p className="text-xs text-[#7F1D1D] leading-relaxed">
                  {currentTier.relegationCondition}
                </p>
                <div className="mt-2 text-[10px] text-[#991B1B] font-mono">
                  Continuous Telegram Bot Audit • Immediate Revocation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive "Check Your Skill Tier Qualification" Tool */}
        <div className="bg-gradient-to-r from-[#FFF7ED] via-[#FFEDD5]/50 to-[#FFF7ED] rounded-2xl border border-[#FED7AA] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C] block mb-1">
                Interactive Qualification Simulator
              </span>
              <h3 className="text-2xl font-bold text-[#1C1917] mb-2">
                What PipBud Level Do You Qualify For?
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] mb-6">
                Slide your current trading metrics to simulate how the PipBud audit algorithm assesses your account.
              </p>

              <div className="space-y-4">
                {/* Trades Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#1C1917] mb-1">
                    <span>Total Completed Trades:</span>
                    <span className="font-bold text-[#C2410C] tabular-nums">{calcTrades} trades</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={calcTrades}
                    onChange={(e) => setCalcTrades(Number(e.target.value))}
                    className="w-full accent-[#C2410C] cursor-pointer"
                  />
                </div>

                {/* Win Rate Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#1C1917] mb-1">
                    <span>Win Rate (%):</span>
                    <span className="font-bold text-[#C2410C] tabular-nums">{calcWinRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={calcWinRate}
                    onChange={(e) => setCalcWinRate(Number(e.target.value))}
                    className="w-full accent-[#C2410C] cursor-pointer"
                  />
                </div>

                {/* Drawdown Slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#1C1917] mb-1">
                    <span>Max Historical Drawdown (%):</span>
                    <span className="font-bold text-[#B91C1C] tabular-nums">{calcDrawdown}%</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="20.0"
                    step="0.1"
                    value={calcDrawdown}
                    onChange={(e) => setCalcDrawdown(Number(e.target.value))}
                    className="w-full accent-[#C2410C] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Result Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#FED7AA] shadow-sm text-center">
              <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block mb-1">
                Audited Simulation Result
              </span>
              <div className="my-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] mb-2">
                  Level {eligibleLevel}
                </span>
                <h4 className="text-2xl font-bold text-[#1C1917]">{eligibleTier.name}</h4>
                <p className="text-xs text-[#78716C] mt-1">{eligibleTier.tagline}</p>
              </div>

              <div className="p-3 bg-[#FAFAF9] rounded-lg border border-[#E7E5E4] text-left text-xs space-y-1 my-4">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Channels Unlocked:</span>
                  <span className="font-bold text-[#1C1917]">#{eligibleTier.unlockedChannels[0].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Max Drawdown Allowed:</span>
                  <span className="font-bold text-[#0F766E]">{eligibleTier.maxDrawdown}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Demotion Risk:</span>
                  <span className="font-bold text-[#C2410C]">Active Real-Time Audit</span>
                </div>
              </div>

              <a
                href="https://t.me/PipBudBot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Connect &amp; Audit Live on Telegram</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
