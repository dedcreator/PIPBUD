'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  Send
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
      pair: 'USD/JPY',
      direction: 'SHORT',
      setupType: 'Change of Character (CHOCH)',
      timeframe: '1H',
      session: 'London',
      entryPrice: 152.400,
      stopLoss: 152.750,
      takeProfit: 151.350,
      riskReward: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      notes: 'Structure shift on 1H with divergence on 15m. Clean drop.',
      date: 'Sep 23, 09:45 UTC'
    },
    {
      id: '5',
      pair: 'EUR/JPY',
      direction: 'LONG',
      setupType: 'Breaker Block',
      timeframe: '15m',
      session: 'Asian',
      entryPrice: 164.200,
      stopLoss: 163.850,
      takeProfit: 165.250,
      riskReward: 3.00,
      outcome: 'BE',
      profitPercent: 0.00,
      profitDollar: 0.00,
      notes: 'Moved stop loss to breakeven after TP1 reached.',
      date: 'Sep 22, 02:10 UTC'
    },
    {
      id: '6',
      pair: 'GBP/JPY',
      direction: 'LONG',
      setupType: 'Inverse FVG',
      timeframe: '15m',
      session: 'London',
      entryPrice: 194.500,
      stopLoss: 194.100,
      takeProfit: 195.700,
      riskReward: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      notes: 'IFVG confirmed with 15m candle body close above resistance.',
      date: 'Sep 21, 08:20 UTC'
    },
  ]);

  // Modal states
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedTradeForAutopsy, setSelectedTradeForAutopsy] = useState<JournalTrade | null>(null);

  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'WIN' | 'LOSS' | 'BE'>('ALL');

  // New trade form state
  const [formPair, setFormPair] = useState('EUR/USD');
  const [formDirection, setFormDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [formSetup, setFormSetup] = useState('Order Block (OB)');
  const [formEntry, setFormEntry] = useState('1.08500');
  const [formSL, setFormSL] = useState('1.08300');
  const [formTP, setFormTP] = useState('1.09100');
  const [formOutcome, setFormOutcome] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [formNotes, setFormNotes] = useState('');

  // Computed metrics
  const totalTrades = trades.length + 80; // Baseline verified trades count
  const winsCount = trades.filter((t) => t.outcome === 'WIN').length + 42;
  const lossCount = trades.filter((t) => t.outcome === 'LOSS').length + 34;
  const winRate = ((winsCount / (winsCount + lossCount)) * 100).toFixed(1);
  const totalPL = trades.reduce((acc, t) => acc + t.profitDollar, 2450.00);

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = parseFloat(formEntry) || 1.0;
    const sl = parseFloat(formSL) || 0.99;
    const tp = parseFloat(formTP) || 1.02;
    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    const rr = risk > 0 ? parseFloat((reward / risk).toFixed(2)) : 2.5;

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

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917]">
      <Navbar />

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trader Profile & Tier Health Card */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-[0_1px_3px_rgba(28,25,23,0.06)] mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1C1917] text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
                AT
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917]">Apex Trader</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE]">
                    🛡️ Level 4: Funded Pro
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#0F766E] font-medium bg-[#F0FDFA] px-2 py-0.5 rounded-full border border-[#CCFBF1]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Broker Track Record
                  </span>
                </div>
                <p className="text-xs text-[#78716C]">
                  FTMO Master $100,000 Allocation • Connected via @PipBudBot • Synced 2 mins ago
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
                <span>Enter #funded-floor</span>
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
                  Tier Health: 94% (Good Standing)
                </span>
                <span className="text-[#0F766E] font-mono text-[11px]">
                  Drawdown: 3.2% (Ceiling: 5.0%)
                </span>
              </div>
              <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                <div className="bg-[#15803D] h-full rounded-full transition-all" style={{ width: '94%' }} />
              </div>
              <p className="text-[11px] text-[#78716C] mt-2">
                Anti-Shortfall Governance: Maintain drawdown &le; 5.0% to keep #funded-floor access.
              </p>
            </div>

            {/* Distance to Level 5: Elite Alpha */}
            <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#1C1917]">Promotion Target: Level 5 Elite Alpha</span>
                <span className="text-[#C2410C] font-mono text-[11px]">64% Qualified</span>
              </div>
              <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                <div className="bg-[#C2410C] h-full rounded-full transition-all" style={{ width: '64%' }} />
              </div>
              <p className="text-[11px] text-[#78716C] mt-2">
                Needs 64 more verified trades with Win Rate &ge; 56% and Profit Factor &ge; 1.85.
              </p>
            </div>
          </div>
        </div>

        {/* KPI Scorecards */}
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
              {winRate}%
            </span>
            <span className="text-[10px] text-[#78716C]">{winsCount}W - {lossCount}L</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs">
            <span className="text-[11px] text-[#78716C] block mb-1">Profit Factor</span>
            <span className="text-xl font-bold text-[#1C1917] tabular-nums block">1.72</span>
            <span className="text-[10px] text-[#0F766E] font-medium">Rank Benchmark: 1.55</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs">
            <span className="text-[11px] text-[#78716C] block mb-1">Current Drawdown</span>
            <span className="text-xl font-bold text-[#C2410C] tabular-nums block">3.2%</span>
            <span className="text-[10px] text-[#78716C]">Max Limit: 5.0%</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] text-[#78716C] block mb-1">Total Verified Trades</span>
            <span className="text-xl font-bold text-[#1C1917] tabular-nums block">{totalTrades}</span>
            <span className="text-[10px] text-[#0F766E] font-medium">100% Validated</span>
          </div>
        </div>

        {/* Filter Bar & Trade Ledger Table */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-sm overflow-hidden mb-12">
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
                      <span className="text-[#1C1917] block">{t.entryPrice}</span>
                      <span className="text-[10px] text-[#78716C]">SL: {t.stopLoss} | TP: {t.takeProfit}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-[#C2410C] whitespace-nowrap">
                      1:{t.riskReward.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.outcome === 'WIN'
                            ? 'bg-[#DCFCE7] text-[#15803D]'
                            : t.outcome === 'LOSS'
                            ? 'bg-[#FEE2E2] text-[#B91C1C]'
                            : 'bg-[#F5F5F4] text-[#78716C]'
                        }`}
                      >
                        {t.outcome === 'WIN' && <CheckCircle2 className="w-3 h-3" />}
                        {t.outcome === 'LOSS' && <XCircle className="w-3 h-3" />}
                        {t.outcome}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold whitespace-nowrap tabular-nums">
                      <span
                        className={
                          t.profitDollar > 0
                            ? 'text-[#15803D]'
                            : t.profitDollar < 0
                            ? 'text-[#B91C1C]'
                            : 'text-[#78716C]'
                        }
                      >
                        {t.profitDollar > 0 ? `+${t.profitPercent}% (+$${t.profitDollar})` : t.profitDollar < 0 ? `${t.profitPercent}% (-$${Math.abs(t.profitDollar)})` : '0.00% ($0.00)'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#78716C] whitespace-nowrap">
                      <span className="block text-[11px]">{t.date}</span>
                      <span className="text-[10px] text-[#A8A29E]">{t.session} session</span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTradeForAutopsy(t)}
                        className="px-2.5 py-1 text-[11px] font-medium text-[#C2410C] hover:bg-[#FFF7ED] rounded-lg border border-transparent hover:border-[#FED7AA] transition-colors"
                      >
                        Autopsy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal 1: Log New Trade */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-lg w-full p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#1C1917]">Log New Trade to Journal</h3>
                <p className="text-xs text-[#78716C]">Will automatically sync to @PipBudBot and recalculate tier metrics.</p>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTrade} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1C1917] block mb-1">Currency Pair / Asset</label>
                  <input
                    type="text"
                    value={formPair}
                    onChange={(e) => setFormPair(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E7E5E4] rounded-lg focus:border-[#C2410C] outline-hidden font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1C1917] block mb-1">Direction</label>
                  <select
                    value={formDirection}
                    onChange={(e) => setFormDirection(e.target.value as any)}
                    className="w-full h-10 px-3 border border-[#E7E5E4] rounded-lg focus:border-[#C2410C] outline-hidden bg-white"
                  >
                    <option value="LONG">BUY (Long)</option>
                    <option value="SHORT">SELL (Short)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1C1917] block mb-1">SMC / Technical Setup</label>
                <select
                  value={formSetup}
                  onChange={(e) => setFormSetup(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E7E5E4] rounded-lg focus:border-[#C2410C] outline-hidden bg-white"
                >
                  <option value="Order Block (OB)">Order Block (OB) Retest</option>
                  <option value="Fair Value Gap (FVG)">Fair Value Gap (FVG) Tap</option>
                  <option value="Liquidity Sweep">Liquidity Sweep / Turtle Soup</option>
                  <option value="Change of Character (CHOCH)">Change of Character (CHOCH)</option>
                  <option value="Breaker Block">Breaker Block</option>
                  <option value="Inverse FVG">Inverse FVG (IFVG)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-[#1C1917] block mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formEntry}
                    onChange={(e) => setFormEntry(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E7E5E4] rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#1C1917] block mb-1">Stop Loss</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formSL}
                    onChange={(e) => setFormSL(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E7E5E4] rounded-lg font-mono text-[#B91C1C]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#1C1917] block mb-1">Take Profit</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={formTP}
                    onChange={(e) => setFormTP(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E7E5E4] rounded-lg font-mono text-[#15803D]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1C1917] block mb-1">Outcome</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['WIN', 'LOSS', 'BE'] as const).map((out) => (
                    <button
                      type="button"
                      key={out}
                      onClick={() => setFormOutcome(out)}
                      className={`h-9 rounded-lg font-bold text-xs border transition-all ${
                        formOutcome === out
                          ? out === 'WIN'
                            ? 'bg-[#15803D] text-white border-[#15803D]'
                            : out === 'LOSS'
                            ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                            : 'bg-[#78716C] text-white border-[#78716C]'
                          : 'bg-white border-[#E7E5E4] text-[#44403C]'
                      }`}
                    >
                      {out}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1C1917] block mb-1">Trade Notes &amp; Confluences</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Asia low swept, 15m bullish candle body close confirmation..."
                  className="w-full p-2.5 border border-[#E7E5E4] rounded-lg focus:border-[#C2410C] outline-hidden text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="h-10 px-4 text-[#78716C] hover:text-[#1C1917] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl font-medium shadow-xs"
                >
                  Save Trade &amp; Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Tier Audit Modal */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                <h3 className="text-base font-bold text-[#1C1917]">Live Tier Audit Engine</h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F0FDFA] rounded-xl border border-[#CCFBF1] text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#0F766E]">
                <span>AUDIT STATUS: PASSED ✅</span>
                <span>Level 4 Maintained</span>
              </div>
              <p className="text-[#115E59]">
                All 86 closed trades evaluated against Level 4 Funded Pro thresholds:
              </p>
              <div className="space-y-1 font-mono text-[11px] text-[#134E4A] pt-1">
                <div className="flex justify-between">
                  <span>Win Rate:</span>
                  <span className="font-bold">{winRate}% (&ge; 50% Req)</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Drawdown:</span>
                  <span className="font-bold">3.2% (&le; 5.0% Limit)</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Factor:</span>
                  <span className="font-bold">1.72 (&ge; 1.55 Req)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FFF7ED] rounded-xl border border-[#FED7AA] text-[11px] text-[#9A3412]">
              🛡️ <strong>Zero-Tolerance Check:</strong> No drawdown breaches detected. Full messaging permissions preserved for <strong>#funded-floor</strong> and <strong>#live-tape-reading</strong>.
            </div>

            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="w-full h-10 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium"
            >
              Close Audit Report
            </button>
          </div>
        </div>
      )}

      {/* Modal 3: Trade Autopsy / Detail Drawer */}
      {selectedTradeForAutopsy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
                  Trade Autopsy &amp; Confluences
                </span>
                <h3 className="text-base font-bold text-[#1C1917]">
                  {selectedTradeForAutopsy.pair} {selectedTradeForAutopsy.direction}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTradeForAutopsy(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAFAF9] p-3 rounded-xl border border-[#E7E5E4]">
              <div>
                <span className="text-[#78716C] block">Setup Type:</span>
                <span className="font-bold text-[#1C1917]">{selectedTradeForAutopsy.setupType}</span>
              </div>
              <div>
                <span className="text-[#78716C] block">Session / Timeframe:</span>
                <span className="font-bold text-[#1C1917]">
                  {selectedTradeForAutopsy.session} • {selectedTradeForAutopsy.timeframe}
                </span>
              </div>
              <div>
                <span className="text-[#78716C] block">Risk-to-Reward:</span>
                <span className="font-mono font-bold text-[#C2410C]">
                  1:{selectedTradeForAutopsy.riskReward.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[#78716C] block">Realized Outcome:</span>
                <span className="font-bold text-[#15803D]">
                  {selectedTradeForAutopsy.profitPercent}% (+${selectedTradeForAutopsy.profitDollar})
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-semibold text-[#1C1917] block">Trader Post-Mortem Reflection:</span>
              <p className="text-[#44403C] p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] italic">
                &ldquo;{selectedTradeForAutopsy.notes}&rdquo;
              </p>
            </div>

            <div className="p-3 bg-[#F0FDFA] rounded-xl border border-[#CCFBF1] text-xs space-y-1">
              <span className="font-bold text-[#0F766E] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Coach Retrospective Grade: A
              </span>
              <p className="text-[11px] text-[#115E59]">
                Strict adherence to 1% risk rule. Executed cleanly at high-probability liquidity sweep confluence.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href="/forum"
                className="text-xs text-[#C2410C] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Share Trade Card in #funded-floor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setSelectedTradeForAutopsy(null)}
                className="px-4 py-2 bg-[#1C1917] text-white rounded-xl text-xs font-medium"
              >
                Close Autopsy
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
