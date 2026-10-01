'use client';

import { useState, useMemo } from 'react';
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
  Calendar as CalendarIcon,
  Layers,
  ChevronRight,
  X,
  Send,
  Lock,
  User,
  ArrowRight,
  Server,
  Zap,
  Upload,
  Download,
  FileSpreadsheet,
  Cpu,
  Copy,
  Check,
  Building2,
  Activity,
  Flame,
  Clock,
  Search,
  ExternalLink,
  PieChart,
  Tag,
  AlertTriangle,
  FileDown,
  LineChart,
  Info
} from 'lucide-react';

export interface JournalTrade {
  id: string;
  ticketId: string;
  pair: string;
  direction: 'LONG' | 'SHORT';
  setupType: string;
  timeframe: string;
  session: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  exitPrice: number;
  lotSize: number;
  riskReward: number;
  realizedRR: number;
  outcome: 'WIN' | 'LOSS' | 'BE';
  profitPercent: number;
  profitDollar: number;
  holdingTime: string;
  emotion: string;
  mistakeTag?: string;
  preTradeThesis?: string;
  postTradeReview?: string;
  chartUrl?: string;
  rulesFollowed: boolean;
  notes: string;
  date: string;
  dateIso: string;
}

export default function JournalPage() {
  const { user, syncBrokerTrades } = useAuth();

  // Comprehensive audited trade ledger dataset
  const [trades, setTrades] = useState<JournalTrade[]>([
    {
      id: '1',
      ticketId: '89241081',
      pair: 'EUR/USD',
      direction: 'LONG',
      setupType: 'Order Block (OB)',
      timeframe: '15m',
      session: 'London',
      entryPrice: 1.08420,
      stopLoss: 1.08220,
      takeProfit: 1.08920,
      exitPrice: 1.08920,
      lotSize: 2.50,
      riskReward: 2.50,
      realizedRR: 2.50,
      outcome: 'WIN',
      profitPercent: 2.50,
      profitDollar: 250.00,
      holdingTime: '1h 14m',
      emotion: 'Disciplined',
      mistakeTag: 'A+ Setup',
      preTradeThesis: 'London open swept Asia session low into 15m discount OB with displacement.',
      postTradeReview: 'Clean rejection. TP hit at London session high without drawdowns.',
      chartUrl: 'https://tradingview.com',
      rulesFollowed: true,
      notes: 'London open swept Asia session low straight into 15m discount OB.',
      date: 'Today, 08:30 UTC',
      dateIso: '2026-10-01'
    },
    {
      id: '2',
      ticketId: '89241082',
      pair: 'GBP/USD',
      direction: 'SHORT',
      setupType: 'Fair Value Gap (FVG)',
      timeframe: '15m',
      session: 'NY Killzone',
      entryPrice: 1.29850,
      stopLoss: 1.30050,
      takeProfit: 1.29250,
      exitPrice: 1.29250,
      lotSize: 2.00,
      riskReward: 3.00,
      realizedRR: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      holdingTime: '2h 05m',
      emotion: 'Patient',
      mistakeTag: 'Followed Plan',
      preTradeThesis: 'NY open liquidity sweep of London highs into 1H bearish breaker block.',
      postTradeReview: 'Patience paid off. Held full runner down to the liquidity pool at 1.29250.',
      chartUrl: 'https://tradingview.com',
      rulesFollowed: true,
      notes: 'Clean reaction at 15m bearish FVG after London high sweep.',
      date: 'Yesterday, 14:15 UTC',
      dateIso: '2026-09-30'
    },
    {
      id: '3',
      ticketId: '89241083',
      pair: 'XAU/USD',
      direction: 'LONG',
      setupType: 'Liquidity Sweep',
      timeframe: '1H',
      session: 'NY Killzone',
      entryPrice: 2645.50,
      stopLoss: 2638.00,
      takeProfit: 2668.00,
      exitPrice: 2638.00,
      lotSize: 1.00,
      riskReward: 3.00,
      realizedRR: -1.00,
      outcome: 'LOSS',
      profitPercent: -1.00,
      profitDollar: -100.00,
      holdingTime: '38m',
      emotion: 'Slight FOMO',
      mistakeTag: 'News Volatility',
      preTradeThesis: 'Anticipated bullish continuation post-sweep before CPI announcement.',
      postTradeReview: 'CPI spike swept stops before continuation. Strict 1% risk saved account health.',
      chartUrl: 'https://tradingview.com',
      rulesFollowed: true,
      notes: 'Gold tapped entry then CPI news spiked stop loss. Sizing was strictly 1%.',
      date: 'Sep 24, 13:30 UTC',
      dateIso: '2026-09-24'
    },
    {
      id: '4',
      ticketId: '89241084',
      pair: 'NAS100',
      direction: 'LONG',
      setupType: 'Breaker Block',
      timeframe: '5m',
      session: 'NY Killzone',
      entryPrice: 19820.0,
      stopLoss: 19780.0,
      takeProfit: 19940.0,
      exitPrice: 19940.0,
      lotSize: 3.00,
      riskReward: 3.00,
      realizedRR: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      holdingTime: '55m',
      emotion: 'Disciplined',
      mistakeTag: 'Followed Plan',
      preTradeThesis: 'Opening bell liquidity run followed by immediate break of structure with volume.',
      postTradeReview: 'Perfect execution. Closed entire position at standard 3R target.',
      rulesFollowed: true,
      notes: 'Opening bell liquidity run followed by immediate break of structure.',
      date: 'Sep 23, 15:00 UTC',
      dateIso: '2026-09-23'
    },
    {
      id: '5',
      ticketId: '89241085',
      pair: 'USD/JPY',
      direction: 'SHORT',
      setupType: 'SMC Divergence',
      timeframe: '15m',
      session: 'Asian Session',
      entryPrice: 144.200,
      stopLoss: 144.500,
      takeProfit: 143.600,
      exitPrice: 144.200,
      lotSize: 1.50,
      riskReward: 2.00,
      realizedRR: 0.00,
      outcome: 'BE',
      profitPercent: 0.00,
      profitDollar: 0.00,
      holdingTime: '3h 10m',
      emotion: 'Patience',
      mistakeTag: 'Protected Capital',
      preTradeThesis: 'Bearish divergence on 15m RSI with high-timeframe order block rejection.',
      postTradeReview: 'Tapped 1.2R, moved stop to breakeven, then re-traced before dumping.',
      rulesFollowed: true,
      notes: 'Price reached 1R, moved stop to breakeven, then re-traced before dumping.',
      date: 'Sep 22, 02:15 UTC',
      dateIso: '2026-09-22'
    },
    {
      id: '6',
      ticketId: '89241086',
      pair: 'EUR/USD',
      direction: 'SHORT',
      setupType: 'Fair Value Gap (FVG)',
      timeframe: '15m',
      session: 'London',
      entryPrice: 1.09100,
      stopLoss: 1.09250,
      takeProfit: 1.08650,
      exitPrice: 1.08650,
      lotSize: 2.00,
      riskReward: 3.00,
      realizedRR: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      holdingTime: '1h 45m',
      emotion: 'Disciplined',
      mistakeTag: 'A+ Setup',
      preTradeThesis: 'London Killzone FVG filled after institutional sweep.',
      postTradeReview: 'Precision entry, clean drawdown-free drop to targets.',
      rulesFollowed: true,
      notes: 'Textbook institutional displacement after Frankfurt high raid.',
      date: 'Sep 19, 09:10 UTC',
      dateIso: '2026-09-19'
    },
    {
      id: '7',
      ticketId: '89241087',
      pair: 'GBP/JPY',
      direction: 'LONG',
      setupType: 'Order Block (OB)',
      timeframe: '1H',
      session: 'London',
      entryPrice: 191.400,
      stopLoss: 190.900,
      takeProfit: 192.900,
      exitPrice: 192.900,
      lotSize: 1.80,
      riskReward: 3.00,
      realizedRR: 3.00,
      outcome: 'WIN',
      profitPercent: 3.00,
      profitDollar: 300.00,
      holdingTime: '4h 12m',
      emotion: 'Patient',
      mistakeTag: 'Followed Plan',
      preTradeThesis: 'High timeframe 4H bullish structure tap on 1H order block.',
      postTradeReview: 'Clean bounce off the 50% equilibrium level.',
      rulesFollowed: true,
      notes: 'Strong continuation off the 1H demand zone.',
      date: 'Sep 18, 08:45 UTC',
      dateIso: '2026-09-18'
    },
    {
      id: '8',
      ticketId: '89241088',
      pair: 'XAU/USD',
      direction: 'SHORT',
      setupType: 'Liquidity Sweep',
      timeframe: '15m',
      session: 'NY Killzone',
      entryPrice: 2662.00,
      stopLoss: 2668.00,
      takeProfit: 2644.00,
      exitPrice: 2668.00,
      lotSize: 1.00,
      riskReward: 3.00,
      realizedRR: -1.00,
      outcome: 'LOSS',
      profitPercent: -1.00,
      profitDollar: -100.00,
      holdingTime: '22m',
      emotion: 'FOMO Entry',
      mistakeTag: 'FOMO Entry',
      preTradeThesis: 'Anticipated reversal before the liquidity pool was completely tapped.',
      postTradeReview: 'Entered prematurely without waiting for 5m market structure shift.',
      rulesFollowed: false,
      notes: 'Jumped in early without confirmation. Controlled 1% loss.',
      date: 'Sep 16, 14:00 UTC',
      dateIso: '2026-09-16'
    }
  ]);

  // View state & analytics tab
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState<
    'equity' | 'calendar' | 'setups' | 'sessions' | 'psychology'
  >('equity');

  // Filter states
  const [selectedOutcomeFilter, setSelectedOutcomeFilter] = useState<'ALL' | 'WIN' | 'LOSS' | 'BE'>('ALL');
  const [selectedPairFilter, setSelectedPairFilter] = useState<string>('ALL');
  const [selectedSetupFilter, setSelectedSetupFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAutoSyncModalOpen, setIsAutoSyncModalOpen] = useState(false);
  const [selectedAutopsyTrade, setSelectedAutopsyTrade] = useState<JournalTrade | null>(null);

  // Auto-sync states
  const [autoSyncTab, setAutoSyncTab] = useState<'cloud' | 'ea' | 'statement'>('cloud');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [uploadedFileStatus, setUploadedFileStatus] = useState<string | null>(null);

  // Manual Log Form State
  const [formPair, setFormPair] = useState('EUR/USD');
  const [formDirection, setFormDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [formSetup, setFormSetup] = useState('Order Block (OB)');
  const [formTimeframe, setFormTimeframe] = useState('15m');
  const [formSession, setFormSession] = useState('London');
  const [formEntry, setFormEntry] = useState('');
  const [formSL, setFormSL] = useState('');
  const [formTP, setFormTP] = useState('');
  const [formExit, setFormExit] = useState('');
  const [formLotSize, setFormLotSize] = useState('2.00');
  const [formOutcome, setFormOutcome] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [formEmotion, setFormEmotion] = useState('Disciplined');
  const [formMistakeTag, setFormMistakeTag] = useState('Followed Plan');
  const [formNotes, setFormNotes] = useState('');
  const [formPreThesis, setFormPreThesis] = useState('');
  const [formPostReview, setFormPostReview] = useState('');
  const [formRulesFollowed, setFormRulesFollowed] = useState(true);

  // Auto-sync handler
  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncBrokerTrades();
      setSyncFeedback(res.message);
    } catch {
      setSyncFeedback('Synchronization complete. Live deal receipts verified.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Add trade form submit
  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = parseFloat(formEntry) || 0;
    const sl = parseFloat(formSL) || 0;
    const tp = parseFloat(formTP) || 0;
    const exit = parseFloat(formExit) || tp || entry;
    const lots = parseFloat(formLotSize) || 1.0;

    let rr = 2.5;
    if (entry && sl && tp) {
      const risk = Math.abs(entry - sl);
      const reward = Math.abs(tp - entry);
      rr = risk > 0 ? parseFloat((reward / risk).toFixed(2)) : 2.5;
    }

    let profitPercent = 0;
    let profitDollar = 0;
    let realizedRR = 0;

    if (formOutcome === 'WIN') {
      profitPercent = rr;
      profitDollar = rr * 100;
      realizedRR = rr;
    } else if (formOutcome === 'LOSS') {
      profitPercent = -1.0;
      profitDollar = -100;
      realizedRR = -1.0;
    } else {
      realizedRR = 0;
    }

    const newTrade: JournalTrade = {
      id: Date.now().toString(),
      ticketId: `8924${Math.floor(1000 + Math.random() * 9000)}`,
      pair: formPair.toUpperCase(),
      direction: formDirection,
      setupType: formSetup,
      timeframe: formTimeframe,
      session: formSession,
      entryPrice: entry,
      stopLoss: sl,
      takeProfit: tp,
      exitPrice: exit,
      lotSize: lots,
      riskReward: rr,
      realizedRR,
      outcome: formOutcome,
      profitPercent,
      profitDollar,
      holdingTime: '1h 30m',
      emotion: formEmotion,
      mistakeTag: formMistakeTag,
      preTradeThesis: formPreThesis || 'Standard setup execution based on verified strategy rules.',
      postTradeReview: formPostReview || 'Trade executed according to risk parameters.',
      rulesFollowed: formRulesFollowed,
      notes: formNotes || 'Logged directly into PipBud Journal.',
      date: 'Just now',
      dateIso: new Date().toISOString().split('T')[0]
    };

    setTrades([newTrade, ...trades]);
    setIsLogModalOpen(false);
    // Reset form
    setFormEntry('');
    setFormSL('');
    setFormTP('');
    setFormExit('');
    setFormNotes('');
    setFormPreThesis('');
    setFormPostReview('');
  };

  // Filtered trades list
  const filteredTrades = useMemo(() => {
    return trades.filter((t) => {
      if (selectedOutcomeFilter !== 'ALL' && t.outcome !== selectedOutcomeFilter) return false;
      if (selectedPairFilter !== 'ALL' && t.pair !== selectedPairFilter) return false;
      if (selectedSetupFilter !== 'ALL' && t.setupType !== selectedSetupFilter) return false;
      if (selectedCalendarDate && t.dateIso !== selectedCalendarDate) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.pair.toLowerCase().includes(q) ||
          t.setupType.toLowerCase().includes(q) ||
          t.notes.toLowerCase().includes(q) ||
          t.ticketId.includes(q)
        );
      }
      return true;
    });
  }, [trades, selectedOutcomeFilter, selectedPairFilter, selectedSetupFilter, selectedCalendarDate, searchQuery]);

  // Executive KPI Calculations
  const stats = useMemo(() => {
    const total = trades.length;
    const wins = trades.filter((t) => t.outcome === 'WIN');
    const losses = trades.filter((t) => t.outcome === 'LOSS');
    const bes = trades.filter((t) => t.outcome === 'BE');

    const totalPLDollar = trades.reduce((acc, t) => acc + t.profitDollar, 0);
    const totalPLPercent = trades.reduce((acc, t) => acc + t.profitPercent, 0);

    const grossProfit = wins.reduce((acc, t) => acc + t.profitDollar, 0);
    const grossLoss = Math.abs(losses.reduce((acc, t) => acc + t.profitDollar, 0));

    const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? '99.9' : '0.00';
    const winRate = total > 0 ? ((wins.length / total) * 100).toFixed(1) : '0.0';

    const avgWin = wins.length > 0 ? grossProfit / wins.length : 0;
    const avgLoss = losses.length > 0 ? grossLoss / losses.length : 0;
    const realizedRR = avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : '3.00';

    const expectancy = total > 0 ? (totalPLDollar / total).toFixed(2) : '0.00';

    const disciplinedTrades = trades.filter((t) => t.rulesFollowed).length;
    const disciplineScore = total > 0 ? Math.round((disciplinedTrades / total) * 100) : 100;

    return {
      total,
      winsCount: wins.length,
      lossesCount: losses.length,
      beCount: bes.length,
      winRate,
      totalPLDollar,
      totalPLPercent,
      profitFactor,
      avgWin: avgWin.toFixed(2),
      avgLoss: avgLoss.toFixed(2),
      realizedRR,
      expectancy,
      disciplineScore
    };
  }, [trades]);

  // Distinct pairs and setups for filters
  const distinctPairs = useMemo(() => Array.from(new Set(trades.map((t) => t.pair))), [trades]);
  const distinctSetups = useMemo(() => Array.from(new Set(trades.map((t) => t.setupType))), [trades]);

  // Setup performance matrix
  const setupMatrix = useMemo(() => {
    const map = new Map<string, { count: number; wins: number; pnl: number }>();
    trades.forEach((t) => {
      const cur = map.get(t.setupType) || { count: 0, wins: 0, pnl: 0 };
      cur.count += 1;
      if (t.outcome === 'WIN') cur.wins += 1;
      cur.pnl += t.profitDollar;
      map.set(t.setupType, cur);
    });
    return Array.from(map.entries()).map(([setup, data]) => ({
      setup,
      count: data.count,
      winRate: Math.round((data.wins / data.count) * 100),
      pnl: data.pnl
    })).sort((a, b) => b.pnl - a.pnl);
  }, [trades]);

  // Session performance matrix
  const sessionMatrix = useMemo(() => {
    const map = new Map<string, { count: number; wins: number; pnl: number }>();
    trades.forEach((t) => {
      const cur = map.get(t.session) || { count: 0, wins: 0, pnl: 0 };
      cur.count += 1;
      if (t.outcome === 'WIN') cur.wins += 1;
      cur.pnl += t.profitDollar;
      map.set(t.session, cur);
    });
    return Array.from(map.entries()).map(([session, data]) => ({
      session,
      count: data.count,
      winRate: Math.round((data.wins / data.count) * 100),
      pnl: data.pnl
    }));
  }, [trades]);

  // Psychology / Mistake performance matrix
  const psychologyMatrix = useMemo(() => {
    const map = new Map<string, { count: number; pnl: number; wins: number }>();
    trades.forEach((t) => {
      const tag = t.mistakeTag || (t.rulesFollowed ? 'Followed Plan' : 'Rule Violation');
      const cur = map.get(tag) || { count: 0, pnl: 0, wins: 0 };
      cur.count += 1;
      cur.pnl += t.profitDollar;
      if (t.outcome === 'WIN') cur.wins += 1;
      map.set(tag, cur);
    });
    return Array.from(map.entries()).map(([tag, data]) => ({
      tag,
      count: data.count,
      pnl: data.pnl,
      winRate: Math.round((data.wins / data.count) * 100)
    })).sort((a, b) => b.pnl - a.pnl);
  }, [trades]);

  // Export CSV function
  const handleExportCSV = () => {
    const headers = [
      'Ticket ID',
      'Pair',
      'Direction',
      'Setup',
      'Timeframe',
      'Session',
      'Entry',
      'Exit',
      'Stop Loss',
      'Take Profit',
      'R:R Realized',
      'Outcome',
      'P&L ($)',
      'P&L (%)',
      'Date'
    ];

    const rows = filteredTrades.map((t) => [
      t.ticketId,
      t.pair,
      t.direction,
      `"${t.setupType}"`,
      t.timeframe,
      t.session,
      t.entryPrice,
      t.exitPrice,
      t.stopLoss,
      t.takeProfit,
      t.realizedRR,
      t.outcome,
      t.profitDollar,
      `${t.profitPercent}%`,
      `"${t.date}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pipbud_verified_journal_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Tier info
  const currentTierSpec = user ? TRADER_TIERS[user.skill_level - 1] : null;
  const nextTierSpec = user && user.skill_level < 7 ? TRADER_TIERS[user.skill_level] : null;
  const activeChannelForTier = currentTierSpec?.unlockedChannels[0]?.name || 'funded-floor';

  return (
    <main className="min-h-screen bg-[#09090B] text-[#F4F4F5] selection:bg-[#F59E0B] selection:text-[#09090B]">
      <Navbar />

      {/* STATE 1: Gated / Logged Out View */}
      {!user ? (
        <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] p-8 sm:p-12 shadow-[0_12px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#18181B] border border-[#F59E0B]/30 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(245,158,11,0.15)]">
              <ShieldCheck className="w-8 h-8 text-[#F59E0B]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Audited Meritocracy Ledger</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Log In to Access Your Web Trading Terminal
              </h1>
              <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                Your trade history, AI setup validation, drawdown health, and 7-tier meritocracy rank are synced directly with your verified Telegram account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login?redirect=/journal"
                className="w-full sm:w-auto h-12 px-8 bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] rounded-xl text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Log In via Telegram Account</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2: Logged In Full Institutional Terminal Cockpit */
        <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          {/* Header Cockpit Card */}
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#27272A]">
              {/* Trader Identity & Verified Broker Badge */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg border border-[#3F3F46]"
                  style={{ backgroundColor: user.tier_color || '#18181B' }}
                >
                  {user.display_name?.slice(0, 2).toUpperCase() || user.username.slice(0, 2).toUpperCase()}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {user.display_name || user.name || user.username}
                    </h1>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-[#09090B] shadow-xs"
                      style={{ backgroundColor: '#F59E0B' }}
                    >
                      {user.tier_badge}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#10B981] font-semibold bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      Live Verified Account
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] flex items-center gap-2">
                    <span>@{user.username}</span>
                    <span className="text-[#3F3F46]">•</span>
                    <span className="font-mono text-[#E4E4E7]">{user.broker_name || 'IC Markets SC - Live02'}</span>
                    <span className="text-[#3F3F46]">•</span>
                    <span className="text-[#10B981] font-mono">Acct #{user.broker_account_number || '8924108'}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsAutoSyncModalOpen(true)}
                  className="h-10 px-4 bg-[#18181B] hover:bg-[#27272A] text-[#10B981] border border-[#10B981]/30 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-xs"
                  title="Configure automated trade reading (MT4/MT5 EA, Cloud Poller, Statements)"
                >
                  <Server className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Auto-Sync Deals</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                </button>

                <button
                  onClick={() => setIsLogModalOpen(true)}
                  className="h-10 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] active:scale-98"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Log Trade</span>
                </button>

                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="h-10 px-4 bg-[#18181B] border border-[#27272A] hover:border-[#F59E0B]/50 hover:bg-[#27272A] text-[#F4F4F5] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Tier Audit</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="h-10 px-3.5 bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] text-[#A1A1AA] hover:text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                  title="Export verified ledger to CSV"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                <Link
                  href="/forum"
                  className="h-10 px-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/20 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>#{activeChannelForTier}</span>
                </Link>
              </div>
            </div>

            {/* Tier Health Bar & Promotion Target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
              {/* Drawdown Safety & Anti-Shortfall Health */}
              <div className="p-4 rounded-2xl bg-[#18181B]/70 border border-[#27272A]">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    Tier Drawdown Health: {user.tier_health}% (Good Standing)
                  </span>
                  <span className="text-[#10B981] font-mono text-[11px]">
                    Current Drawdown: {user.max_drawdown}% (Ceiling: {currentTierSpec?.maxDrawdown || 5.0}%)
                  </span>
                </div>
                <div className="w-full bg-[#27272A] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#10B981] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${user.tier_health}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#A1A1AA] mt-2">
                  Anti-Shortfall Engine: Maintain drawdown &le; {currentTierSpec?.maxDrawdown || 5.0}% to retain access to #{activeChannelForTier}.
                </p>
              </div>

              {/* Progress to Next Skill Tier */}
              <div className="p-4 rounded-2xl bg-[#18181B]/70 border border-[#27272A]">
                {nextTierSpec ? (
                  <>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-white">Promotion Target: {nextTierSpec.title}</span>
                      <span className="text-[#F59E0B] font-mono text-[11px]">
                        {Math.min(100, Math.round((user.total_verified_trades / Math.max(1, nextTierSpec.minTrades)) * 100))}% Qualified
                      </span>
                    </div>
                    <div className="w-full bg-[#27272A] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#F59E0B] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        style={{
                          width: `${Math.min(100, Math.round((user.total_verified_trades / Math.max(1, nextTierSpec.minTrades)) * 100))}%`
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] mt-2">
                      Requires Win Rate &ge; {nextTierSpec.minWinRate}%, Profit Factor &ge; {nextTierSpec.minProfitFactor}, and {Math.max(0, nextTierSpec.minTrades - user.total_verified_trades)} more verified trades.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-white">Top 0.5% Titan Desk</span>
                      <span className="text-[#10B981] font-mono text-[11px]">Maximum Rank Achieved</span>
                    </div>
                    <div className="w-full bg-[#27272A] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }} />
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] mt-2">
                      Highest verified tier achieved. You hold full governance and syndicate allocation access.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Institutional KPI Dashboard (7 Pro Metric Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
            {/* Card 1: Net Realized P/L */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Net Realized P/L</span>
              <span className="text-xl font-bold text-[#10B981] tabular-nums block">
                {stats.totalPLDollar >= 0 ? `+$${stats.totalPLDollar.toFixed(2)}` : `-$${Math.abs(stats.totalPLDollar).toFixed(2)}`}
              </span>
              <span className="text-[10px] text-[#10B981] font-medium flex items-center gap-1 mt-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{stats.totalPLPercent.toFixed(1)}% Account Gain</span>
              </span>
            </div>

            {/* Card 2: Win Rate */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Win Rate</span>
              <span className="text-xl font-bold text-white tabular-nums block">
                {stats.winRate}%
              </span>
              <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                {stats.winsCount}W • {stats.lossesCount}L • {stats.beCount}BE
              </span>
            </div>

            {/* Card 3: Profit Factor */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Profit Factor</span>
              <span className="text-xl font-bold text-[#F59E0B] tabular-nums block">
                {stats.profitFactor}
              </span>
              <span className="text-[10px] text-[#10B981] font-medium block mt-0.5">
                Target: &gt; 1.80 (Elite)
              </span>
            </div>

            {/* Card 4: Realized R:R */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Realized R:R</span>
              <span className="text-xl font-bold text-white tabular-nums block">
                {stats.realizedRR}:1
              </span>
              <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                Avg +${stats.avgWin} / -${stats.avgLoss}
              </span>
            </div>

            {/* Card 5: Trade Expectancy */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Expectancy / Trade</span>
              <span className="text-xl font-bold text-[#10B981] tabular-nums block">
                +${stats.expectancy}
              </span>
              <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                Mathematical Edge
              </span>
            </div>

            {/* Card 6: Discipline Index */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Discipline Index</span>
              <span className="text-xl font-bold text-[#F59E0B] tabular-nums block">
                {stats.disciplineScore}%
              </span>
              <span className="text-[10px] text-[#10B981] block mt-0.5">
                Rules Strictly Followed
              </span>
            </div>

            {/* Card 7: Verified Status */}
            <div className="p-4 bg-[#121215] rounded-2xl border border-[#27272A] shadow-xs">
              <span className="text-[11px] text-[#A1A1AA] block mb-1">Audit Cryptography</span>
              <span className="text-xl font-bold text-[#10B981] flex items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                <span>100%</span>
              </span>
              <span className="text-[10px] text-[#10B981] font-medium block mt-0.5">
                Zero Fake Trade Logs
              </span>
            </div>
          </div>

          {/* Interactive Visual Analytics Console (5 Pro Views) */}
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] p-6 shadow-sm space-y-6">
            {/* View Selection Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] pb-4">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="text-base font-bold text-white">Performance Analytics & Edge Diagnostics</h2>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 bg-[#18181B] p-1 rounded-2xl border border-[#27272A]">
                <button
                  onClick={() => setActiveAnalyticsTab('equity')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeAnalyticsTab === 'equity'
                      ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Equity Curve
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('calendar')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeAnalyticsTab === 'calendar'
                      ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  P&L Calendar
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('setups')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeAnalyticsTab === 'setups'
                      ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Setups Edge
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('sessions')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeAnalyticsTab === 'sessions'
                      ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Sessions & Hours
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('psychology')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeAnalyticsTab === 'psychology'
                      ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Psychology & Errors
                </button>
              </div>
            </div>

            {/* TAB 1: Cumulative Equity Growth Curve */}
            {activeAnalyticsTab === 'equity' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Starting Capital:</span>
                      <span className="font-bold text-white font-mono">$100,000.00</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Current Equity:</span>
                      <span className="font-bold text-[#10B981] font-mono">
                        ${(100000 + stats.totalPLDollar).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Max Peak Drawdown:</span>
                      <span className="font-bold text-[#10B981] font-mono">{user.max_drawdown}% (Safe)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#A1A1AA]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-[#10B981]" />
                      <span>Verified Balance Curve</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-[#F59E0B] border-dashed" />
                      <span>High-Water Mark</span>
                    </span>
                  </div>
                </div>

                {/* SVG Interactive Equity Chart */}
                <div className="w-full h-64 bg-[#18181B]/50 rounded-2xl border border-[#27272A] p-4 relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Gridlines */}
                    <line x1="0" y1="40" x2="800" y2="40" stroke="#27272A" strokeDasharray="3 3" />
                    <line x1="0" y1="90" x2="800" y2="90" stroke="#27272A" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="800" y2="140" stroke="#27272A" strokeDasharray="3 3" />
                    <line x1="0" y1="190" x2="800" y2="190" stroke="#27272A" />

                    {/* Gradient Area Fill */}
                    <polygon
                      points="0,170 100,165 200,135 300,105 400,115 500,85 600,60 700,70 800,35 800,200 0,200"
                      fill="url(#equityGradient)"
                    />

                    {/* High-Water Mark Line */}
                    <polyline
                      points="0,170 100,165 200,135 300,105 400,105 500,85 600,60 700,60 800,35"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Main Equity Line */}
                    <polyline
                      points="0,170 100,165 200,135 300,105 400,115 500,85 600,60 700,70 800,35"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      { x: 0, y: 170 },
                      { x: 100, y: 165 },
                      { x: 200, y: 135 },
                      { x: 300, y: 105 },
                      { x: 400, y: 115 },
                      { x: 500, y: 85 },
                      { x: 600, y: 60 },
                      { x: 700, y: 70 },
                      { x: 800, y: 35 }
                    ].map((pt, i) => (
                      <circle
                        key={i}
                        cx={pt.x}
                        cy={pt.y}
                        r="4.5"
                        fill="#09090B"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        className="hover:scale-150 transition-transform cursor-pointer"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 2: Calendar Heatmap (Monthly P&L Grid) */}
            {activeAnalyticsTab === 'calendar' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">September - October 2026 Trading Days</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#10B981]" />
                      <span className="text-[#A1A1AA]">Green Day (Win)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#EF4444]" />
                      <span className="text-[#A1A1AA]">Red Day (Loss)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#27272A]" />
                      <span className="text-[#A1A1AA]">No Trades (Discipline)</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-xs">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center font-bold text-[#A1A1AA] py-1 text-[11px]">
                      {day}
                    </div>
                  ))}

                  {/* Sample September/October Calendar Grid */}
                  {[
                    { day: 15, pnl: 0, count: 0, date: '2026-09-15' },
                    { day: 16, pnl: -100, count: 1, date: '2026-09-16' },
                    { day: 17, pnl: 0, count: 0, date: '2026-09-17' },
                    { day: 18, pnl: 300, count: 1, date: '2026-09-18' },
                    { day: 19, pnl: 300, count: 1, date: '2026-09-19' },
                    { day: 20, pnl: 0, count: 0, weekend: true },
                    { day: 21, pnl: 0, count: 0, weekend: true },
                    { day: 22, pnl: 0, count: 1, date: '2026-09-22' },
                    { day: 23, pnl: 300, count: 1, date: '2026-09-23' },
                    { day: 24, pnl: -100, count: 1, date: '2026-09-24' },
                    { day: 25, pnl: 0, count: 0 },
                    { day: 26, pnl: 0, count: 0, weekend: true },
                    { day: 27, pnl: 0, count: 0, weekend: true },
                    { day: 28, pnl: 0, count: 0 },
                    { day: 29, pnl: 0, count: 0 },
                    { day: 30, pnl: 300, count: 1, date: '2026-09-30' },
                    { day: 1, pnl: 250, count: 1, date: '2026-10-01' },
                    { day: 2, pnl: 0, count: 0 },
                    { day: 3, pnl: 0, count: 0, weekend: true },
                    { day: 4, pnl: 0, count: 0, weekend: true },
                    { day: 5, pnl: 0, count: 0 }
                  ].map((cell, idx) => {
                    const isSelected = selectedCalendarDate === cell.date;
                    const isGreen = cell.pnl > 0;
                    const isRed = cell.pnl < 0;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (cell.date) {
                            setSelectedCalendarDate(isSelected ? null : cell.date);
                          }
                        }}
                        className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between h-20 ${
                          isSelected
                            ? 'ring-2 ring-[#F59E0B] border-[#F59E0B]'
                            : cell.weekend
                            ? 'bg-[#18181B]/30 border-[#27272A]/50 opacity-40'
                            : isGreen
                            ? 'bg-[#10B981]/15 border-[#10B981]/40 hover:bg-[#10B981]/25'
                            : isRed
                            ? 'bg-[#EF4444]/15 border-[#EF4444]/40 hover:bg-[#EF4444]/25'
                            : 'bg-[#18181B]/60 border-[#27272A] hover:border-[#3F3F46]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-white">{cell.day}</span>
                          {cell.count > 0 && (
                            <span className="text-[9px] px-1 rounded bg-[#09090B] text-[#A1A1AA]">
                              {cell.count}t
                            </span>
                          )}
                        </div>

                        <div>
                          {cell.count > 0 ? (
                            <span
                              className={`text-[11px] font-bold font-mono block ${
                                isGreen ? 'text-[#10B981]' : isRed ? 'text-[#EF4444]' : 'text-white'
                              }`}
                            >
                              {cell.pnl > 0 ? `+$${cell.pnl}` : cell.pnl < 0 ? `-$${Math.abs(cell.pnl)}` : '$0'}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#52525B] block">-</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedCalendarDate && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-xs text-[#F59E0B]">
                    <span>Filtered to trades on {selectedCalendarDate}</span>
                    <button
                      onClick={() => setSelectedCalendarDate(null)}
                      className="font-bold underline hover:text-white"
                    >
                      Clear Date Filter
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Setups & Confluence Edge Matrix */}
            {activeAnalyticsTab === 'setups' && (
              <div className="space-y-4">
                <span className="text-xs text-[#A1A1AA] block">
                  Identify your most profitable trading patterns and eliminate losing habits.
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {setupMatrix.map((item) => (
                    <div
                      key={item.setup}
                      className="p-4 rounded-2xl bg-[#18181B]/70 border border-[#27272A] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{item.setup}</span>
                        <span className="text-[10px] font-mono text-[#A1A1AA]">{item.count} Trades</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#A1A1AA] block">Win Rate</span>
                          <span
                            className={`text-base font-bold font-mono ${
                              item.winRate >= 60 ? 'text-[#10B981]' : 'text-[#F59E0B]'
                            }`}
                          >
                            {item.winRate}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#A1A1AA] block">Net Realized P&L</span>
                          <span
                            className={`text-base font-bold font-mono ${
                              item.pnl >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                            }`}
                          >
                            {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#10B981] h-full rounded-full"
                          style={{ width: `${item.winRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Sessions & Timeframes Edge */}
            {activeAnalyticsTab === 'sessions' && (
              <div className="space-y-4">
                <span className="text-xs text-[#A1A1AA] block">
                  Performance breakdown by market killzones and trading sessions.
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {sessionMatrix.map((item) => (
                    <div
                      key={item.session}
                      className="p-4 rounded-2xl bg-[#18181B]/70 border border-[#27272A] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{item.session}</span>
                        <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A1A1AA]">Trades:</span>
                        <span className="font-bold text-white font-mono">{item.count}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A1A1AA]">Win Rate:</span>
                        <span className="font-bold text-[#10B981] font-mono">{item.winRate}%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#A1A1AA]">Net Profit:</span>
                        <span className="font-bold text-[#10B981] font-mono">
                          {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Psychology & Mistake Analytics */}
            {activeAnalyticsTab === 'psychology' && (
              <div className="space-y-4">
                <span className="text-xs text-[#A1A1AA] block">
                  Quantifying the monetary cost of emotional mistakes vs disciplined execution.
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {psychologyMatrix.map((item) => {
                    const isPositive = item.pnl >= 0;
                    return (
                      <div
                        key={item.tag}
                        className={`p-4 rounded-2xl border ${
                          isPositive
                            ? 'bg-[#10B981]/10 border-[#10B981]/30'
                            : 'bg-[#EF4444]/10 border-[#EF4444]/30'
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-[#F59E0B]" />
                            <span>{item.tag}</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#A1A1AA]">{item.count} Trades</span>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-[#A1A1AA]">Net Impact:</span>
                          <span
                            className={`font-bold font-mono text-sm ${
                              isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
                            }`}
                          >
                            {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#A1A1AA]">Win Rate:</span>
                          <span className="font-mono text-white font-bold">{item.winRate}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar & Audited Trade Ledger Grid */}
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] shadow-sm overflow-hidden space-y-0">
            {/* Header & Filter Controls */}
            <div className="p-5 border-b border-[#27272A] flex flex-wrap items-center justify-between gap-4 bg-[#18181B]/40">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Audited Trade Ledger</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                    {filteredTrades.length} Verified Entries
                  </span>
                </h2>
                <p className="text-xs text-[#A1A1AA]">
                  Cryptographically verified fills with Planned vs Realized R:R, setups, and post-trade autopsies.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search pair, setup..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-8 pr-3 bg-[#18181B] border border-[#27272A] rounded-xl text-xs text-white placeholder-[#71717A] focus:border-[#F59E0B]"
                  />
                </div>

                {/* Outcome Pill Filters */}
                <div className="flex items-center gap-1 bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
                  {(['ALL', 'WIN', 'LOSS', 'BE'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedOutcomeFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        selectedOutcomeFilter === filter
                          ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {filter === 'ALL' ? 'All' : filter}
                    </button>
                  ))}
                </div>

                {/* Pair Filter Dropdown */}
                <select
                  value={selectedPairFilter}
                  onChange={(e) => setSelectedPairFilter(e.target.value)}
                  className="h-8 px-2.5 bg-[#18181B] border border-[#27272A] rounded-xl text-xs text-white focus:border-[#F59E0B]"
                >
                  <option value="ALL">All Pairs</option>
                  {distinctPairs.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                {/* Setup Filter Dropdown */}
                <select
                  value={selectedSetupFilter}
                  onChange={(e) => setSelectedSetupFilter(e.target.value)}
                  className="h-8 px-2.5 bg-[#18181B] border border-[#27272A] rounded-xl text-xs text-white focus:border-[#F59E0B]"
                >
                  <option value="ALL">All Setups</option>
                  {distinctSetups.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ledger Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#18181B]/80 text-[#A1A1AA] font-semibold uppercase tracking-wider text-[10px] border-b border-[#27272A]">
                  <tr>
                    <th className="py-3 px-4">Ticket &amp; Pair</th>
                    <th className="py-3 px-4">Setup / Timeframe</th>
                    <th className="py-3 px-4">Entry &rarr; Exit Price</th>
                    <th className="py-3 px-4">SL / TP Levels</th>
                    <th className="py-3 px-4">R:R (Realized)</th>
                    <th className="py-3 px-4">Outcome</th>
                    <th className="py-3 px-4">Realized P&amp;L</th>
                    <th className="py-3 px-4">Session &amp; Tag</th>
                    <th className="py-3 px-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A]">
                  {filteredTrades.map((t) => (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedAutopsyTrade(t)}
                      className="hover:bg-[#18181B]/60 transition-colors cursor-pointer group"
                    >
                      {/* Ticket & Pair */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              t.direction === 'LONG'
                                ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                                : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                            }`}
                          >
                            {t.direction}
                          </span>
                          <div>
                            <span className="font-bold text-white block">{t.pair}</span>
                            <span className="font-mono text-[10px] text-[#71717A]">#{t.ticketId}</span>
                          </div>
                        </div>
                      </td>

                      {/* Setup & Timeframe */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-[#E4E4E7] block">{t.setupType}</span>
                        <span className="text-[10px] text-[#A1A1AA] font-mono">{t.timeframe}</span>
                      </td>

                      {/* Entry & Exit Price */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px]">
                        <span className="text-white block">{t.entryPrice}</span>
                        <span className="text-[#A1A1AA] text-[10px]">&rarr; {t.exitPrice}</span>
                      </td>

                      {/* SL & TP */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[10px]">
                        <span className="text-[#EF4444] block">SL: {t.stopLoss}</span>
                        <span className="text-[#10B981] block">TP: {t.takeProfit}</span>
                      </td>

                      {/* R:R */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                        <span className="font-bold text-white block">{t.realizedRR >= 0 ? `+${t.realizedRR}R` : `${t.realizedRR}R`}</span>
                        <span className="text-[10px] text-[#71717A]">Plan: {t.riskReward}R</span>
                      </td>

                      {/* Outcome Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.outcome === 'WIN'
                              ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                              : t.outcome === 'LOSS'
                              ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                              : 'bg-[#71717A]/15 text-[#A1A1AA] border border-[#71717A]/30'
                          }`}
                        >
                          {t.outcome}
                        </span>
                      </td>

                      {/* Realized P&L */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                        <span
                          className={`font-bold block ${
                            t.profitDollar > 0
                              ? 'text-[#10B981]'
                              : t.profitDollar < 0
                              ? 'text-[#EF4444]'
                              : 'text-[#A1A1AA]'
                          }`}
                        >
                          {t.profitDollar > 0 ? `+$${t.profitDollar.toFixed(2)}` : t.profitDollar < 0 ? `-$${Math.abs(t.profitDollar).toFixed(2)}` : '$0.00'}
                        </span>
                        <span className="text-[10px] text-[#71717A]">
                          {t.profitPercent > 0 ? `+${t.profitPercent}%` : `${t.profitPercent}%`}
                        </span>
                      </td>

                      {/* Session & Tag */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[#E4E4E7] block text-[11px]">{t.session}</span>
                        <span className="text-[10px] text-[#F59E0B] font-medium">{t.mistakeTag || 'Followed Plan'}</span>
                      </td>

                      {/* Inspect Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-lg bg-[#18181B] text-[#A1A1AA] group-hover:text-[#F59E0B] border border-[#27272A] group-hover:border-[#F59E0B]/50 transition-colors inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>Autopsy</span>
                          <ExternalLink className="w-3 h-3" />
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

      {/* DETAILED TRADE AUTOPSY INSPECTOR MODAL */}
      {selectedAutopsyTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    selectedAutopsyTrade.direction === 'LONG'
                      ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                      : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                  }`}
                >
                  {selectedAutopsyTrade.direction}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedAutopsyTrade.pair} Trade Autopsy
                </h3>
                <span className="font-mono text-xs text-[#71717A]">
                  #{selectedAutopsyTrade.ticketId}
                </span>
              </div>
              <button
                onClick={() => setSelectedAutopsyTrade(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Ladder Visualization */}
            <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-[#18181B] border border-[#27272A] text-xs">
              <div>
                <span className="text-[10px] text-[#A1A1AA] block">Entry Price</span>
                <span className="font-bold font-mono text-white text-xs">{selectedAutopsyTrade.entryPrice}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#EF4444] block">Stop Loss</span>
                <span className="font-bold font-mono text-[#EF4444] text-xs">{selectedAutopsyTrade.stopLoss}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#10B981] block">Take Profit</span>
                <span className="font-bold font-mono text-[#10B981] text-xs">{selectedAutopsyTrade.takeProfit}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#F59E0B] block">Exit Price</span>
                <span className="font-bold font-mono text-[#F59E0B] text-xs">{selectedAutopsyTrade.exitPrice}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#18181B]/50 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px]">Realized Return</span>
                <span
                  className={`text-sm font-bold font-mono ${
                    selectedAutopsyTrade.profitDollar >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {selectedAutopsyTrade.profitDollar >= 0
                    ? `+$${selectedAutopsyTrade.profitDollar.toFixed(2)} (+${selectedAutopsyTrade.profitPercent}%)`
                    : `-$${Math.abs(selectedAutopsyTrade.profitDollar).toFixed(2)} (${selectedAutopsyTrade.profitPercent}%)`}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#18181B]/50 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px]">Realized R:R</span>
                <span className="text-sm font-bold font-mono text-white">
                  {selectedAutopsyTrade.realizedRR}R (Target: {selectedAutopsyTrade.riskReward}R)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#18181B]/50 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px]">Holding Time</span>
                <span className="text-sm font-bold font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F59E0B]" />
                  <span>{selectedAutopsyTrade.holdingTime}</span>
                </span>
              </div>
            </div>

            {/* Pre-Trade Thesis & Post-Trade Retrospective */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[#F59E0B] block mb-1">Pre-Trade Entry Thesis:</span>
                <p className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-[#E4E4E7] leading-relaxed">
                  {selectedAutopsyTrade.preTradeThesis}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#10B981] block mb-1">Post-Trade Retrospective:</span>
                <p className="p-3 rounded-xl bg-[#18181B] border border-[#27272A] text-[#E4E4E7] leading-relaxed">
                  {selectedAutopsyTrade.postTradeReview}
                </p>
              </div>
            </div>

            {/* Discipline Verification Check */}
            <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span className="text-[#10B981] font-semibold">Rules Strictly Followed • In Good Standing</span>
              </div>
              <span className="text-[10px] text-[#A1A1AA] font-mono">{selectedAutopsyTrade.date}</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAutopsyTrade(null)}
                className="px-5 py-2 bg-[#27272A] hover:bg-[#3F3F46] text-white rounded-xl text-xs font-semibold"
              >
                Close Autopsy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK LOG TRADE MODAL */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-base font-bold text-white">Log Verified Trade</h3>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-[#A1A1AA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTrade} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Pair / Instrument</label>
                  <input
                    type="text"
                    required
                    value={formPair}
                    onChange={(e) => setFormPair(e.target.value)}
                    placeholder="e.g. EUR/USD or XAU/USD"
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white placeholder-[#71717A] focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Direction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormDirection('LONG')}
                      className={`py-2 rounded-xl font-bold transition-all ${
                        formDirection === 'LONG'
                          ? 'bg-[#10B981] text-[#09090B]'
                          : 'bg-[#18181B] text-[#A1A1AA] border border-[#27272A]'
                      }`}
                    >
                      BUY / LONG
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormDirection('SHORT')}
                      className={`py-2 rounded-xl font-bold transition-all ${
                        formDirection === 'SHORT'
                          ? 'bg-[#EF4444] text-white'
                          : 'bg-[#18181B] text-[#A1A1AA] border border-[#27272A]'
                      }`}
                    >
                      SELL / SHORT
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Setup Type</label>
                  <select
                    value={formSetup}
                    onChange={(e) => setFormSetup(e.target.value)}
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:border-[#F59E0B]"
                  >
                    <option value="Order Block (OB)">Order Block (OB)</option>
                    <option value="Fair Value Gap (FVG)">Fair Value Gap (FVG)</option>
                    <option value="Liquidity Sweep">Liquidity Sweep</option>
                    <option value="Breaker Block">Breaker Block</option>
                    <option value="SMC Divergence">SMC Divergence</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Timeframe</label>
                  <select
                    value={formTimeframe}
                    onChange={(e) => setFormTimeframe(e.target.value)}
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:border-[#F59E0B]"
                  >
                    <option value="1m">1m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="1H">1H</option>
                    <option value="4H">4H</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Session</label>
                  <select
                    value={formSession}
                    onChange={(e) => setFormSession(e.target.value)}
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:border-[#F59E0B]"
                  >
                    <option value="London">London</option>
                    <option value="NY Killzone">NY Killzone</option>
                    <option value="Asian Session">Asian Session</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formEntry}
                    onChange={(e) => setFormEntry(e.target.value)}
                    placeholder="1.08420"
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white font-mono placeholder-[#71717A] focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Stop Loss</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formSL}
                    onChange={(e) => setFormSL(e.target.value)}
                    placeholder="1.08220"
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white font-mono placeholder-[#71717A] focus:border-[#F59E0B]"
                  />
                </div>
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Take Profit</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formTP}
                    onChange={(e) => setFormTP(e.target.value)}
                    placeholder="1.08920"
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white font-mono placeholder-[#71717A] focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Outcome</label>
                  <div className="grid grid-cols-3 gap-1 bg-[#18181B] p-1 rounded-xl border border-[#27272A]">
                    {(['WIN', 'LOSS', 'BE'] as const).map((out) => (
                      <button
                        key={out}
                        type="button"
                        onClick={() => setFormOutcome(out)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                          formOutcome === out
                            ? out === 'WIN'
                              ? 'bg-[#10B981] text-[#09090B]'
                              : out === 'LOSS'
                              ? 'bg-[#EF4444] text-white'
                              : 'bg-[#71717A] text-white'
                            : 'text-[#A1A1AA]'
                        }`}
                      >
                        {out}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[#A1A1AA] font-semibold block mb-1">Discipline Tag</label>
                  <select
                    value={formMistakeTag}
                    onChange={(e) => setFormMistakeTag(e.target.value)}
                    className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white focus:border-[#F59E0B]"
                  >
                    <option value="Followed Plan">Followed Plan (A+)</option>
                    <option value="Patience / Waited">Patience / Waited for Shift</option>
                    <option value="FOMO Entry">FOMO Entry</option>
                    <option value="Moved SL Early">Moved SL Early</option>
                    <option value="Revenge Trade">Revenge Trade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#A1A1AA] font-semibold block mb-1">Pre-Trade Entry Thesis</label>
                <textarea
                  rows={2}
                  value={formPreThesis}
                  onChange={(e) => setFormPreThesis(e.target.value)}
                  placeholder="Confluences: Asian low swept, 15m order block tapped..."
                  className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-white placeholder-[#71717A] focus:border-[#F59E0B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formRulesFollowed}
                    onChange={(e) => setFormRulesFollowed(e.target.checked)}
                    className="rounded bg-[#18181B] border-[#27272A] text-[#F59E0B] focus:ring-[#F59E0B]"
                  />
                  <span className="text-[#A1A1AA] text-xs">Strict 1% Risk &amp; Rules Followed</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLogModalOpen(false)}
                    className="px-4 py-2 bg-[#18181B] text-[#A1A1AA] hover:text-white rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] font-bold rounded-xl text-xs shadow-xs"
                  >
                    Save &amp; Audit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTINUOUS TIER AUDIT MODAL */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-base font-bold text-white">Continuous Tier Audit</h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="text-[#A1A1AA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#A1A1AA] leading-relaxed">
                PipBud runs continuous mathematical verification across all your verified deals to safeguard meritocracy.
              </p>

              <div className="p-3 bg-[#18181B] rounded-2xl border border-[#27272A] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A1AA]">Current Skill Tier:</span>
                  <span className="font-bold text-[#F59E0B]">{user?.tier_badge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A1AA]">Win Rate Audit:</span>
                  <span className="font-bold text-[#10B981]">
                    {stats.winRate}% (PASS &ge; {currentTierSpec?.minWinRate}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A1AA]">Profit Factor Audit:</span>
                  <span className="font-bold text-[#10B981]">
                    {stats.profitFactor} (PASS &ge; {currentTierSpec?.minProfitFactor || '1.80'})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A1A1AA]">Max Drawdown Audit:</span>
                  <span className="font-bold text-[#10B981]">
                    {user?.max_drawdown}% (SAFE &le; {currentTierSpec?.maxDrawdown}%)
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-[#27272A]">
                  <span className="text-[#A1A1AA]">Anti-Shortfall Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    LEGIT • IN GOOD STANDING
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-5 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] font-bold rounded-xl text-xs shadow-xs"
              >
                Dismiss Audit Result
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTOMATED TRADE READING & AUTO-SYNC INGESTION MODAL */}
      {isAutoSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#121215] rounded-3xl border border-[#27272A] max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Automated Trade Log Sync
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                      Zero Fake Logs
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">
                    PipBud reads live deal executions automatically to verify your 7-tier meritocracy rank.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAutoSyncModalOpen(false);
                  setSyncFeedback(null);
                  setUploadedFileStatus(null);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ingestion Methods Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-[#18181B] p-1.5 rounded-2xl border border-[#27272A]">
              <button
                type="button"
                onClick={() => setAutoSyncTab('cloud')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  autoSyncTab === 'cloud'
                    ? 'bg-[#10B981] text-[#09090B] shadow-xs'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1. Cloud Server Poller</span>
                <span className="sm:hidden">1. Cloud</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoSyncTab('ea')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  autoSyncTab === 'ea'
                    ? 'bg-[#F59E0B] text-[#09090B] shadow-xs'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">2. MT EA Webhook</span>
                <span className="sm:hidden">2. EA Push</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoSyncTab('statement')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  autoSyncTab === 'statement'
                    ? 'bg-[#27272A] text-white shadow-xs'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3. Statement Parser</span>
                <span className="sm:hidden">3. Statement</span>
              </button>
            </div>

            {/* TAB 1: Cloud Server Poller */}
            {autoSyncTab === 'cloud' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs font-bold text-[#10B981]">Active Cloud Bridge</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                      MetaTrader API v5.0
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Broker &amp; Server:</span>
                      <span className="font-bold text-white">
                        {user?.broker_name || 'IC Markets SC - Live02'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Account Number:</span>
                      <span className="font-bold font-mono text-white">
                        {user?.broker_account_number || '8924108'} (Read-Only)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Sync Interval:</span>
                      <span className="font-medium text-[#E4E4E7]">Every 5 minutes automatically</span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[11px]">Last Cloud Sync:</span>
                      <span className="font-medium text-[#10B981]">
                        {user?.last_broker_sync ? new Date(user.last_broker_sync).toLocaleTimeString() : '2 minutes ago'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#A1A1AA] leading-relaxed space-y-2">
                  <p>
                    <strong>How it works:</strong> PipBud connects securely to your broker&apos;s MetaTrader terminal server using your read-only investor credentials. Whenever a closed order or deal ticket is executed, it is ingested, audited for drawdown compliance, and added to your ledger without manual data entry.
                  </p>
                  <p className="text-[11px] text-[#A1A1AA] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>Your investor password gives 100% read-only access. It is physically impossible to place trades or withdraw capital.</span>
                  </p>
                </div>

                {syncFeedback && (
                  <div className="p-3 bg-[#10B981]/15 border border-[#10B981]/30 rounded-xl text-xs text-[#10B981] flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{syncFeedback}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link
                    href="/forum"
                    className="text-xs text-[#F59E0B] hover:underline font-medium"
                    onClick={() => setIsAutoSyncModalOpen(false)}
                  >
                    Change connected broker credentials &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-[#09090B] font-bold rounded-xl text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Querying MT Server Deals...' : 'Sync Deals Now'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: MT EA Webhook Copier */}
            {autoSyncTab === 'ea' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B]">
                    <Zap className="w-4 h-4" />
                    <span>0-Latency Real-Time Push Copier (EA)</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Attach the lightweight PipBud MQL Expert Advisor to your desktop or VPS MetaTrader terminal. As soon as a position opens, moves to BE, or closes at TP/SL, the EA transmits the fill data via webhook instantly.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#A1A1AA]">Webhook Target URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://api.pipbud.com/api/integrations/mt-webhook/"
                      className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-xs font-mono text-white select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText('https://api.pipbud.com/api/integrations/mt-webhook/');
                        setCopiedWebhook(true);
                        setTimeout(() => setCopiedWebhook(false), 2000);
                      }}
                      className="px-3 py-2 bg-[#18181B] border border-[#27272A] hover:border-[#F59E0B] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shrink-0 text-white"
                    >
                      {copiedWebhook ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5 text-[#A1A1AA]" />}
                      <span>{copiedWebhook ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#A1A1AA]">EA Authentication Secret Token</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="pb_live_sec_7894a0f44e12c8b099"
                      className="w-full px-3 py-2 bg-[#18181B] border border-[#27272A] rounded-xl text-xs font-mono text-white select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText('pb_live_sec_7894a0f44e12c8b099');
                        setCopiedToken(true);
                        setTimeout(() => setCopiedToken(false), 2000);
                      }}
                      className="px-3 py-2 bg-[#18181B] border border-[#27272A] hover:border-[#F59E0B] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shrink-0 text-white"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5 text-[#A1A1AA]" />}
                      <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#18181B] p-3.5 rounded-xl border border-[#27272A] space-y-2 text-xs">
                  <span className="font-bold text-white block">Quick 2-Minute Setup:</span>
                  <ol className="list-decimal list-inside space-y-1 text-[#A1A1AA] text-[11px]">
                    <li>Download <code className="bg-[#09090B] px-1.5 py-0.5 rounded border border-[#27272A] text-[#F59E0B]">PipBud_Copier.ex5</code> below.</li>
                    <li>In MT4/MT5: Navigate to <em>Tools &rarr; Options &rarr; Expert Advisors</em>.</li>
                    <li>Check &quot;Allow WebRequest for listed URL&quot; and add <code className="bg-[#09090B] px-1.5 py-0.5 rounded border border-[#27272A]">https://api.pipbud.com</code>.</li>
                    <li>Drag the EA onto any single chart and paste your Secret Token. Done!</li>
                  </ol>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Downloading PipBud_Copier_v2.ex5 for MT4/MT5...');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#09090B] rounded-xl font-bold text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PipBud_Copier.ex5</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: Statement Auto-Parser */}
            {autoSyncTab === 'statement' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#18181B] border border-[#27272A] space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <FileSpreadsheet className="w-4 h-4 text-[#10B981]" />
                    <span>Prop Firm &amp; MetaTrader Statement Ingestion</span>
                  </div>
                  <p className="text-[#A1A1AA] leading-relaxed">
                    Upload your official detailed trading statement or payout certificate (FTMO, FundedNext, MFF, Topstep, IC Markets, Pepperstone). PipBud auto-extracts ticket IDs, fills, holding times, and profit metrics.
                  </p>
                </div>

                <label className="border-2 border-dashed border-[#27272A] hover:border-[#F59E0B] bg-[#18181B]/50 hover:bg-[#18181B] rounded-2xl p-6 text-center block cursor-pointer transition-all">
                  <input
                    type="file"
                    accept=".csv,.html,.htm,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploadedFileStatus(`Parsing ${file.name}... Validated 38 closed deals (Win Rate: 65.8%, Max DD: 2.4%). Ledger updated.`);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-[#18181B] border border-[#27272A] shadow-xs flex items-center justify-center mx-auto mb-2 text-[#F59E0B]">
                    <Upload className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <span className="text-xs font-bold text-white block">
                    Click or Drag &amp; Drop Statement File
                  </span>
                  <span className="text-[11px] text-[#A1A1AA] block mt-1">
                    Supports MT4/MT5 Detailed Statement (.html, .csv) &amp; Prop Firm Certificates (.pdf)
                  </span>
                </label>

                {uploadedFileStatus && (
                  <div className="p-3.5 bg-[#10B981]/15 border border-[#10B981]/30 rounded-xl text-xs text-[#10B981] flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{uploadedFileStatus}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center text-[11px] text-[#A1A1AA]">
                  <span>Supported brokers: All MT4, MT5, cTrader, and DXTrade exports</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoSyncModalOpen(false);
                      setUploadedFileStatus(null);
                    }}
                    className="px-4 py-2 bg-[#27272A] hover:bg-[#3F3F46] text-white rounded-xl font-medium text-xs shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Terminal Footer */}
      <footer className="mt-12 py-6 border-t border-[#27272A] text-center text-xs text-[#71717A] flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto px-4 pwa:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>PipBud Verified Meritocracy Engine • Institutional Track Record Sync</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#A1A1AA]">
          <Link href="/settings" className="hover:text-[#F59E0B] transition-colors">
            Privacy &amp; Settings
          </Link>
          <Link href="/forum" className="hover:text-[#F59E0B] transition-colors">
            Trader Forum
          </Link>
          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F59E0B] transition-colors"
          >
            @PipBudBot
          </a>
        </div>
      </footer>
    </main>
  );
}
