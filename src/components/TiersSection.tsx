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
  MessageSquare
} from 'lucide-react';

export default function TiersSection() {
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const currentTier = TRADER_TIERS.find((t) => t.level === selectedLevel) || TRADER_TIERS[3];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  // Quick qualification calculator state
  const [calcTrades, setCalcTrades] = useState<number>(85);
  const [calcWinRate, setCalcWinRate] = useState<number>(52);
  const [calcDrawdown, setCalcDrawdown] = useState<number>(4.2);

  const calculateEligibleLevel = (): number => {
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
    <section id="tiers" className="py-20 md:py-28 bg-[#000000] text-[#E7E9EA] border-t border-white/10 relative overflow-hidden">
      {/* Subtle Aurora Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none bg-[radial-gradient(circle,rgba(124,58,237,0.18)_0%,rgba(46,16,101,0.06)_50%,transparent_70%)] blur-3xl z-0" />

      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#A78BFA] mb-4">
            <Award className="w-4 h-4 text-[#A78BFA]" />
            <span>The Meritocracy Hierarchy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            7 Skill Levels. Zero Compromises.
          </h2>
          <p className="text-base sm:text-lg text-[#71767B]">
            Every forum channel is strictly gated by proven journal statistics. You cannot buy access, you cannot fake screenshots. You earn your rank — and if your performance decays, you get demoted.
          </p>
        </div>

        {/* 7 Tiers Horizontal Navigation Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TRADER_TIERS.map((tier) => {
            const isSelected = tier.level === selectedLevel;
            return (
              <button
                key={tier.level}
                onClick={() => setSelectedLevel(tier.level)}
                className={`flex-shrink-0 px-4 py-3 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'glass-violet border-[#8B5CF6]/60 shadow-[0_4px_20px_rgba(139,92,246,0.35)]'
                    : 'glass-regular border-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-[#8B5CF6] text-white shadow-xs' : 'bg-white/10 text-white'
                  }`}
                  style={{
                    backgroundColor: isSelected ? tier.color : undefined,
                  }}
                >
                  {tier.level}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#E7E9EA]'}`}>
                    {tier.name}
                  </div>
                  <div className="text-[10px] text-[#71767B]">
                    Max DD ≤ {tier.maxDrawdown}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Spotlight Card */}
        <div className="glass-thick rounded-3xl border border-white/18 shadow-[0_24px_80px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.35)] p-6 sm:p-8 lg:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Tier Summary & Requirements */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: currentTier.color }}
                    >
                      {currentTier.badge}
                    </span>
                    <span className="text-xs text-[#71767B]">
                      • {currentTier.activeTradersCount} Verified Members
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {currentTier.title}
                  </h3>
                  <p className="text-sm text-[#A78BFA] mt-1">{currentTier.tagline}</p>
                </div>

                <a
                  href={`${appUrl}/forum`}
                  className="px-4 py-2 btn-primary rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Level {currentTier.level} Desks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Requirement Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#101012] border border-white/10">
                  <span className="text-[11px] text-[#71767B] block">Min Verified Trades</span>
                  <span className="text-xl font-bold text-white tabular-nums font-mono">
                    {currentTier.minTrades === 0 ? 'Any' : `${currentTier.minTrades}+`}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#101012] border border-white/10">
                  <span className="text-[11px] text-[#71767B] block">Min Win Rate</span>
                  <span className="text-xl font-bold text-white tabular-nums font-mono">
                    {currentTier.minWinRate === 0 ? 'Any' : `${currentTier.minWinRate}%`}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#101012] border border-white/10">
                  <span className="text-[11px] text-[#71767B] block">Min Profit Factor</span>
                  <span className="text-xl font-bold text-[#22C55E] tabular-nums font-mono">
                    {currentTier.minProfitFactor === 0 ? 'N/A' : `${currentTier.minProfitFactor}`}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#101012] border border-[#F43F5E]/30">
                  <span className="text-[11px] text-[#F43F5E] font-semibold block">Max Drawdown Limit</span>
                  <span className="text-xl font-bold text-[#F43F5E] tabular-nums font-mono">
                    ≤ {currentTier.maxDrawdown}%
                  </span>
                </div>
              </div>

              {/* Tier Description */}
              <p className="text-sm text-[#71767B] leading-relaxed">
                {currentTier.description}
              </p>

              {/* Exclusive Perks List */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                  Level {currentTier.level} Privileges
                </h4>
                <div className="space-y-2">
                  {currentTier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#E7E9EA]">
                      <Sparkles className="w-3.5 h-3.5 text-[#A78BFA] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Gated Channels & Anti-Shortfall Rule */}
            <div className="lg:col-span-5 glass-regular p-5 rounded-2xl border border-white/12 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Unlocked Forum Channels
                  </h4>
                  <span className="text-[11px] font-semibold text-[#14B8A6] bg-[#14B8A6]/20 px-2 py-0.5 rounded-full border border-[#14B8A6]/30">
                    Gated Level {currentTier.level}+
                  </span>
                </div>

                <div className="space-y-2">
                  {currentTier.unlockedChannels.map((ch, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#101012] border border-white/8 space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#A78BFA]" />
                        <span className="text-xs font-bold text-white font-mono">#{ch.name}</span>
                      </div>
                      <p className="text-[11px] text-[#71767B]">{ch.topic}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demotion Condition */}
              <div className="p-3.5 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F43F5E]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Anti-Shortfall Removal Rule:</span>
                </div>
                <p className="text-xs text-[#F43F5E]/90 leading-relaxed">
                  {currentTier.relegationCondition}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification Calculator */}
        <div className="max-w-3xl mx-auto glass-thick rounded-3xl border border-white/18 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1.5">
            <h3 className="text-xl font-bold text-white">Test Your Tier Qualification</h3>
            <p className="text-xs text-[#71767B]">
              Simulate your track record to see which skill tier you would unlock on PipBud.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Trades Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#71767B]">Verified Trades:</span>
                <span className="font-bold text-white font-mono">{calcTrades}</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={5}
                value={calcTrades}
                onChange={(e) => setCalcTrades(Number(e.target.value))}
                className="w-full accent-[#8B5CF6]"
              />
            </div>

            {/* Win Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#71767B]">Win Rate:</span>
                <span className="font-bold text-white font-mono">{calcWinRate}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={85}
                step={1}
                value={calcWinRate}
                onChange={(e) => setCalcWinRate(Number(e.target.value))}
                className="w-full accent-[#8B5CF6]"
              />
            </div>

            {/* Max Drawdown Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#71767B]">Max Drawdown:</span>
                <span className="font-bold text-white font-mono">{calcDrawdown}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                step={0.1}
                value={calcDrawdown}
                onChange={(e) => setCalcDrawdown(Number(e.target.value))}
                className="w-full accent-[#8B5CF6]"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-violet border border-[#8B5CF6]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-[11px] text-[#DDD6FE] block">Your Simulated Status:</span>
              <span className="text-lg font-bold text-white">
                Level {eligibleLevel}: {eligibleTier.name}
              </span>
            </div>
            <a
              href={`${appUrl}/login`}
              className="btn-primary px-5 py-2 text-xs font-semibold rounded-full"
            >
              <span>Connect Live Account &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
