'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { TRADER_TIERS } from '@/data/tiers';
import {
  TrendingUp,
  ShieldCheck,
  Plus,
  RefreshCw,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BarChart2,
  Calendar,
  Layers,
  ChevronRight,
  X,
  Send,
  Lock,
  User,
  ArrowRight
} from 'lucide-react';

interface JournalTrade {
  id: string;
  pair: string;
  direction: 'LONG' | 'SHORT';
  setupType: string;
  timeframe: string;
  session: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: number;
  outcome: 'WIN' | 'LOSS' | 'BE';
  profitPercent: number;
  profitDollar: number;
  notes: string;
  date: string;
}

export default function JournalPage() {
  const { user, loginWithDemo } = useAuth();

  // Sample initial audited trade records
  const [trades, setTrades] = useState<JournalTrade[]>([
    {
      id: '1',
      pair: 'EUR/USD',
      direction: 'LONG',
      setupType: 'Order Block (OB)',
      timeframe: '15m',
      session: 'London',
      entryPrice: 1.08420,
      stopLoss: 1.08220,
      takeProfit: 1.08920,
      riskReward: 2.50,
      outcome: 'WIN',
      profitPercent: 2.50,
      profitDollar: 250.00,
      notes: 'London open swept Asia session low straight into 15m discount OB.',
      date: 'Today, 08:30 UTC'
    },
    {
      id: '2',
      pair: 'GBP/USD',
      direction: 'SHORT',
      setupType: 'Fair Value Gap (FVG)',
      timeframe: '15m',
      session: 'NY Killzone',
      entryPrice: 1.29850,
      stopLoss: 1.30050,
      takeProfit: 1.29250,
      riskReward: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      notes: 'Clean reaction at 15m bearish FVG after London high sweep.',
      date: 'Yesterday, 14:15 UTC'
    },
    {
      id: '3',
      pair: 'XAU/USD',
      direction: 'LONG',
      setupType: 'Liquidity Sweep',
      timeframe: '1H',
      session: 'NY Killzone',
      entryPrice: 2645.50,
      stopLoss: 2638.00,
      takeProfit: 2668.00,
      riskReward: 3.00,
      outcome: 'LOSS',
      profitPercent: -1.00,
      profitDollar: -100.00,
      notes: 'Gold tapped entry then CPI news spiked stop loss. Sizing was strictly 1%.',
      date: 'Sep 24, 13:30 UTC'
    },
    {
      id: '4',
      pair: 'NAS100',
      direction: 'LONG',
      setupType: 'Breaker Block',
      timeframe: '5m',
      session: 'NY Killzone',
      entryPrice: 19820.0,
      stopLoss: 19780.0,
      takeProfit: 19940.0,
      riskReward: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      notes: 'Opening bell liquidity run followed by immediate break of structure.',
      date: 'Sep 23, 15:00 UTC'
    },
    {
      id: '5',
      pair: 'USD/JPY',
      direction: 'SHORT',
      setupType: 'SMC Divergence',
      timeframe: '15m',
      session: 'Asian Session',
      entryPrice: 144.200,
      stopLoss: 144.500,
      takeProfit: 143.600,
      riskReward: 2.00,
      outcome: 'BE',
      profitPercent: 0.00,
      profitDollar: 0.00,
      notes: 'Price reached 1R, moved stop to breakeven, then re-traced before dumping.',
      date: 'Sep 22, 02:15 UTC'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'WIN' | 'LOSS' | 'BE'>('ALL');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<JournalTrade | null>(null);

  // Form states for manual log modal
  const [formPair, setFormPair] = useState('EUR/USD');
  const [formDirection, setFormDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [formSetup, setFormSetup] = useState('Order Block (OB)');
  const [formEntry, setFormEntry] = useState('');
  const [formSL, setFormSL] = useState('');
  const [formTP, setFormTP] = useState('');
  const [formOutcome, setFormOutcome] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [formNotes, setFormNotes] = useState('');

  // Performance calculations
  const totalTrades = trades.length;
  const winsCount = trades.filter((t) => t.outcome === 'WIN').length;
  const lossCount = trades.filter((t) => t.outcome === 'LOSS').length;
  const winRate = totalTrades > 0 ? ((winsCount / totalTrades) * 100).toFixed(1) : '0.0';
  const totalPL = trades.reduce((acc, t) => acc + t.profitDollar, 0);

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = parseFloat(formEntry) || 0;
    const sl = parseFloat(formSL) || 0;
    const tp = parseFloat(formTP) || 0;

    let rr = 2.0;
    if (entry && sl && tp) {
      const risk = Math.abs(entry - sl);
      const reward = Math.abs(tp - entry);
      rr = risk > 0 ? parseFloat((reward / risk).toFixed(2)) : 2.0;
    }

    let profitPercent = 0;
    let profitDollar = 0;
    if (formOutcome === 'WIN') {
      profitPercent = rr;
      profitDollar = rr * 100;
    } else if (formOutcome === 'LOSS') {
      profitPercent = -1.0;
      profitDollar = -100;
    }

    const newTrade: JournalTrade = {
      id: Date.now().toString(),
      pair: formPair.toUpperCase(),
      direction: formDirection,
      setupType: formSetup,
      timeframe: '15m',
      session: 'London',
      entryPrice: entry,
      stopLoss: sl,
      takeProfit: tp,
      riskReward: rr,
      outcome: formOutcome,
      profitPercent,
      profitDollar,
      notes: formNotes || 'Logged directly via PipBud Journal.',
      date: 'Just now'
    };

    setTrades([newTrade, ...trades]);
    setIsLogModalOpen(false);
    setFormNotes('');
  };

  const filteredTrades = trades.filter((t) => {
    if (selectedFilter === 'ALL') return true;
    return t.outcome === selectedFilter;
  });

  // Calculate next tier info
  const currentTierSpec = user ? TRADER_TIERS[user.skill_level - 1] : null;
  const nextTierSpec = user && user.skill_level < 7 ? TRADER_TIERS[user.skill_level] : null;
  const activeChannelForTier = currentTierSpec?.unlockedChannels[0]?.name || 'funded-floor';

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917]">
      <Navbar />

      {/* STATE 1: Gated / Logged Out View */}
      {!user ? (
        <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-8 sm:p-12 shadow-[0_12px_40px_rgba(28,25,23,0.06)] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#C2410C]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Audited Meritocracy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
                Log In to Access Your Web Journal
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                Your trade history, AI setup validation, drawdown health, and 7-tier meritocracy rank are synced directly with your verified Telegram account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login?redirect=/journal"
                className="w-full sm:w-auto h-12 px-7 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Log In via Telegram</span>
              </Link>

              <button
                onClick={() => loginWithDemo(4)}
                className="w-full sm:w-auto h-12 px-6 bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[#1C1917] rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#C2410C]" />
                <span>⚡ Try Demo (Level 4: Funded Pro)</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#E7E5E4] text-[11px] text-[#A8A29E] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span>• Zero fake gurus</span>
              <span>• Auto-sync with @PipBudBot</span>
              <span>• Strict anti-shortfall removal rules</span>
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2: Logged In Audited View carrying User's Account */
        <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trader Profile & Tier Health Card */}
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-[0_1px_3px_rgba(28,25,23,0.06)] mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: user.tier_color || '#1C1917' }}
                >
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917]">{user.name}</h1>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: user.tier_color || '#C2410C' }}
                    >
                      {user.tier_badge}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#0F766E] font-medium bg-[#F0FDFA] px-2 py-0.5 rounded-full border border-[#CCFBF1]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Broker Track Record
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C]">
                    @{user.username} • {user.broker_name || 'Prop / Live MetaTrader'} • Connected via @PipBudBot • Synced Live
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                <button
                  onClick={() => setIsLogModalOpen(true)}
                  className="h-10 px-4 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Trade</span>
                </button>

                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="h-10 px-4 bg-white border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] text-[#1C1917] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Run Tier Audit</span>
                </button>

                <Link
                  href="/forum"
                  className="h-10 px-4 bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] hover:bg-[#FFEDD5] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enter #{activeChannelForTier}</span>
                </Link>
              </div>
            </div>

            {/* Tier Health Bar & Next Level Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Health Bar (Drawdown Safety) */}
              <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#1C1917]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                    Tier Health: {user.tier_health}% (Good Standing)
                  </span>
                  <span className="text-[#0F766E] font-mono text-[11px]">
                    Drawdown: {user.max_drawdown}% (Ceiling: {currentTierSpec?.maxDrawdown || 5.0}%)
                  </span>
                </div>
                <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#15803D] h-full rounded-full transition-all duration-500"
                    style={{ width: `${user.tier_health}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#78716C] mt-2">
                  Anti-Shortfall Governance: Maintain drawdown &le; {currentTierSpec?.maxDrawdown || 5.0}% to retain access to #{activeChannelForTier}.
                </p>
              </div>

              {/* Distance to Next Tier */}
              <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                {nextTierSpec ? (
                  <>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-[#1C1917]">Promotion Target: {nextTierSpec.title}</span>
                      <span className="text-[#C2410C] font-mono text-[11px]">
                        {Math.min(100, Math.round((user.total_verified_trades / Math.max(1, nextTierSpec.minTrades)) * 100))}% Qualified
                      </span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C2410C] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.round((user.total_verified_trades / Math.max(1, nextTierSpec.minTrades)) * 100))}%`
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-[#78716C] mt-2">
                      Requires Win Rate &ge; {nextTierSpec.minWinRate}%, Profit Factor &ge; {nextTierSpec.minProfitFactor}, and {Math.max(0, nextTierSpec.minTrades - user.total_verified_trades)} more verified trades.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-[#1C1917]">Top 0.5% Titan Desk</span>
                      <span className="text-[#0F766E] font-mono text-[11px]">Maximum Rank</span>
                    </div>
                    <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F766E] h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                    <p className="text-[11px] text-[#78716C] mt-2">
                      Highest verified tier achieved. You hold full governance and syndicate allocation access.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* KPI Scorecards carrying user stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
            <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Net Realized P/L</span>
              <span className="text-xl font-bold text-[#15803D] tabular-nums block">
                +${totalPL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-[#15803D] font-medium">+28.2% on Account</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Audited Win Rate</span>
              <span className="text-xl font-bold text-[#1C1917] tabular-nums block">
                {user.win_rate}%
              </span>
              <span className="text-[10px] text-[#78716C]">
                {Math.round((user.win_rate / 100) * user.total_verified_trades)}W - {user.total_verified_trades - Math.round((user.win_rate / 100) * user.total_verified_trades)}L
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Profit Factor</span>
              <span className="text-xl font-bold text-[#1C1917] tabular-nums block">
                {user.profit_factor}
              </span>
              <span className="text-[10px] text-[#0F766E] font-medium">
                Benchmark: &ge; {currentTierSpec?.minProfitFactor || 1.10}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Current Drawdown</span>
              <span className="text-xl font-bold text-[#C2410C] tabular-nums block">
                {user.max_drawdown}%
              </span>
              <span className="text-[10px] text-[#78716C]">
                Max Limit: {currentTierSpec?.maxDrawdown || 5.0}%
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[11px] text-[#78716C] block mb-1">Total Verified Trades</span>
              <span className="text-xl font-bold text-[#1C1917] tabular-nums block">
                {user.total_verified_trades}
              </span>
              <span className="text-[10px] text-[#0F766E] font-medium">100% Validated</span>
            </div>
          </div>

          {/* Filter Bar & Trade Ledger Table */}
          <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-xs overflow-hidden mb-12">
            {/* Table Header and Filters */}
            <div className="p-4 sm:p-5 border-b border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 bg-[#FAFAF9]">
              <div>
                <h2 className="text-base font-bold text-[#1C1917]">Audited Trade Ledger</h2>
                <p className="text-xs text-[#78716C]">
                  Real-time verified log with R:R, confluences, and post-trade autopsies.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E7E5E4]">
                {(['ALL', 'WIN', 'LOSS', 'BE'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-[#C2410C] text-white shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    {filter === 'ALL' ? 'All Trades' : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F5F4] text-[#78716C] font-semibold uppercase tracking-wider text-[10px] border-b border-[#E7E5E4]">
                  <tr>
                    <th className="py-3 px-4">Pair &amp; Direction</th>
                    <th className="py-3 px-4">Setup / Timeframe</th>
                    <th className="py-3 px-4">Entry / SL / TP</th>
                    <th className="py-3 px-4">R:R</th>
                    <th className="py-3 px-4">Outcome</th>
                    <th className="py-3 px-4">P/L % ($)</th>
                    <th className="py-3 px-4">Date / Session</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4]">
                  {filteredTrades.map((t) => (
                    <tr key={t.id} className="hover:bg-[#FFF7ED]/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#1C1917] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              t.direction === 'LONG'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : 'bg-[#FEE2E2] text-[#B91C1C]'
                            }`}
                          >
                            {t.direction}
                          </span>
                          <span>{t.pair}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#44403C] block">{t.setupType}</span>
                        <span className="text-[10px] text-[#78716C] font-mono">{t.timeframe}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap">
                        <div className="text-[#1C1917]">{t.entryPrice.toFixed(4)}</div>
                        <div className="text-[#78716C] text-[10px]">
                          SL: {t.stopLoss.toFixed(4)} | TP: {t.takeProfit.toFixed(4)}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#C2410C] whitespace-nowrap">
                        1:{t.riskReward.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                            t.outcome === 'WIN'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : t.outcome === 'LOSS'
                              ? 'bg-[#FEE2E2] text-[#B91C1C]'
                              : 'bg-[#F5F5F4] text-[#78716C]'
                          }`}
                        >
                          {t.outcome === 'WIN' && <CheckCircle2 className="w-3 h-3" />}
                          {t.outcome === 'LOSS' && <XCircle className="w-3 h-3" />}
                          {t.outcome === 'BE' && <HelpCircle className="w-3 h-3" />}
                          {t.outcome}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                        <span
                          className={`font-bold block ${
                            t.profitDollar > 0
                              ? 'text-[#15803D]'
                              : t.profitDollar < 0
                              ? 'text-[#B91C1C]'
                              : 'text-[#78716C]'
                          }`}
                        >
                          {t.profitDollar > 0 ? '+' : ''}${t.profitDollar.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#78716C]">
                          {t.profitPercent > 0 ? '+' : ''}{t.profitPercent.toFixed(1)}%
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#78716C] whitespace-nowrap">
                        <div>{t.date}</div>
                        <div className="text-[10px] text-[#1C1917] font-medium">{t.session} Session</div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedTrade(t)}
                          className="px-2.5 py-1 text-xs font-medium text-[#C2410C] hover:bg-[#FFF7ED] rounded-lg transition-colors border border-transparent hover:border-[#FED7AA]"
                        >
                          Details &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Trade Detail Modal */}
      {selectedTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    selectedTrade.direction === 'LONG'
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#FEE2E2] text-[#B91C1C]'
                  }`}
                >
                  {selectedTrade.direction}
                </span>
                <h3 className="text-lg font-bold text-[#1C1917]">{selectedTrade.pair}</h3>
              </div>
              <button
                onClick={() => setSelectedTrade(null)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
                <div>
                  <span className="text-[#78716C] block">Setup Strategy</span>
                  <span className="font-semibold text-[#1C1917]">{selectedTrade.setupType}</span>
                </div>
                <div>
                  <span className="text-[#78716C] block">Timeframe &amp; Session</span>
                  <span className="font-semibold text-[#1C1917]">
                    {selectedTrade.timeframe} • {selectedTrade.session}
                  </span>
                </div>
                <div>
                  <span className="text-[#78716C] block">Risk-to-Reward Ratio</span>
                  <span className="font-bold text-[#C2410C]">1:{selectedTrade.riskReward.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[#78716C] block">Net Realized Result</span>
                  <span
                    className={`font-bold ${
                      selectedTrade.profitDollar > 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                    }`}
                  >
                    +${selectedTrade.profitDollar.toFixed(2)} ({selectedTrade.profitPercent}%)
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#1C1917] mb-1">Trader Notes &amp; Confluence</h4>
                <p className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] text-[#44403C] leading-relaxed">
                  {selectedTrade.notes}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  Broker Verified via @PipBudBot
                </span>
                <span className="text-[11px] font-mono">Status: Audited</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTrade(null)}
                className="px-4 py-2 bg-[#1C1917] hover:bg-[#44403C] text-white rounded-xl text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Log Trade Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-base font-bold text-[#1C1917]">Log Audited Trade</h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTrade} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#1C1917] font-semibold mb-1">Currency Pair</label>
                  <input
                    type="text"
                    value={formPair}
                    onChange={(e) => setFormPair(e.target.value)}
                    required
                    placeholder="EUR/USD"
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-xl focus:border-[#C2410C] outline-hidden font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1917] font-semibold mb-1">Direction</label>
                  <select
                    value={formDirection}
                    onChange={(e) => setFormDirection(e.target.value as 'LONG' | 'SHORT')}
                    className="w-full px-3 py-2 border border-[#E7E5E4] rounded-xl focus:border-[#C2410C] outline-hidden bg-white"
                  >
                    <option value="LONG">LONG (Buy)</option>
                    <option value="SHORT">SHORT (Sell)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#1C1917] font-semibold mb-1">Setup Type</label>
                <select
                  value={formSetup}
                  onChange={(e) => setFormSetup(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7E5E4] rounded-xl focus:border-[#C2410C] outline-hidden bg-white"
                >
                  <option value="Order Block (OB)">Order Block (OB)</option>
                  <option value="Fair Value Gap (FVG)">Fair Value Gap (FVG)</option>
                  <option value="Liquidity Sweep">Liquidity Sweep</option>
                  <option value="Breaker Block">Breaker Block</option>
                  <option value="SMC Divergence">SMC Divergence</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#78716C] font-medium mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formEntry}
                    onChange={(e) => setFormEntry(e.target.value)}
                    required
                    placeholder="1.08420"
                    className="w-full px-2.5 py-1.5 border border-[#E7E5E4] rounded-lg font-mono text-xs focus:border-[#C2410C] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[#78716C] font-medium mb-1">Stop Loss</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formSL}
                    onChange={(e) => setFormSL(e.target.value)}
                    required
                    placeholder="1.08220"
                    className="w-full px-2.5 py-1.5 border border-[#E7E5E4] rounded-lg font-mono text-xs focus:border-[#C2410C] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[#78716C] font-medium mb-1">Take Profit</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formTP}
                    onChange={(e) => setFormTP(e.target.value)}
                    required
                    placeholder="1.08920"
                    className="w-full px-2.5 py-1.5 border border-[#E7E5E4] rounded-lg font-mono text-xs focus:border-[#C2410C] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1C1917] font-semibold mb-1">Outcome</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['WIN', 'LOSS', 'BE'] as const).map((outcome) => (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => setFormOutcome(outcome)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        formOutcome === outcome
                          ? outcome === 'WIN'
                            ? 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]'
                            : outcome === 'LOSS'
                            ? 'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]'
                            : 'bg-[#F5F5F4] text-[#1C1917] border-[#D6D3D1]'
                          : 'border-[#E7E5E4] text-[#78716C]'
                      }`}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#1C1917] font-semibold mb-1">Confluence / Notes</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Asia low swept into London open. Confluence with 4H DXY rejection."
                  className="w-full px-3 py-2 border border-[#E7E5E4] rounded-xl focus:border-[#C2410C] outline-hidden text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2 border border-[#E7E5E4] text-[#78716C] rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl font-semibold shadow-xs"
                >
                  Save &amp; Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tier Audit Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#C2410C]" />
                <h3 className="text-base font-bold text-[#1C1917]">Continuous Tier Audit</h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#44403C] leading-relaxed">
                PipBud runs continuous mathematical verification across all your logged trades to safeguard meritocracy.
              </p>

              <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Current Skill Tier:</span>
                  <span className="font-bold text-[#C2410C]">{user?.tier_badge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Win Rate Audit:</span>
                  <span className="font-bold text-[#15803D]">
                    {user?.win_rate}% (PASS &ge; {currentTierSpec?.minWinRate}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Max Drawdown Audit:</span>
                  <span className="font-bold text-[#15803D]">
                    {user?.max_drawdown}% (SAFE &le; {currentTierSpec?.maxDrawdown}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Anti-Shortfall Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                    LEGIT • IN GOOD STANDING
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-5 py-2 bg-[#C2410C] text-white rounded-xl font-medium text-xs shadow-xs"
              >
                Dismiss Audit Result
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Status Bar (App-like dashboard footer) */}
      <footer className="mt-12 py-6 border-t border-[#E7E5E4] text-center text-xs text-[#A8A29E] flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto px-4 pwa:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
          <span>PipBud Verified Meritocracy Engine • Live Track Record Sync</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#78716C]">
          <Link href="/settings" className="hover:text-[#C2410C] transition-colors">
            Privacy & Settings
          </Link>
          <Link href="/forum" className="hover:text-[#C2410C] transition-colors">
            Trader Forum
          </Link>
          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C2410C] transition-colors"
          >
            @PipBudBot
          </a>
        </div>
      </footer>
    </main>
  );
}
