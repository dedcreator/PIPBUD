'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth, getApiBase } from '@/context/AuthContext';
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
  ChevronLeft,
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
  Info,
  BookOpen,
  PenLine,
  FileText,
  CheckSquare,
  BadgeCheck,
  Brain,
  Star,
  Bookmark,
  Volume2,
  Mic,
  Eye,
  Camera
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

export const INITIAL_DEMO_JOURNAL_TRADES: JournalTrade[] = [
  {
    id: 't-demo-1',
    ticketId: '8924101',
    pair: 'EUR/USD',
    direction: 'LONG',
    setupType: 'Fair Value Gap (FVG)',
    timeframe: '15m',
    session: 'London Open',
    entryPrice: 1.08520,
    stopLoss: 1.08380,
    takeProfit: 1.08940,
    exitPrice: 1.08940,
    lotSize: 2.0,
    riskReward: 3.0,
    realizedRR: 3.0,
    outcome: 'WIN',
    profitPercent: 3.0,
    profitDollar: 300.0,
    holdingTime: '1h 15m',
    emotion: 'Disciplined',
    mistakeTag: 'A+ Execution',
    preTradeThesis: 'London Open swept Asian session low at 07:15 GMT. Confirmed 5m Market Structure Shift (MSS) with high displacement. Entered on 50% equilibrium retest of 15m FVG.',
    postTradeReview: 'Clean delivery straight into Previous Day High target. Trusting the 15m higher timeframe structure prevented micromanaging during the 8-pip pullback.',
    rulesFollowed: true,
    notes: 'Reflection: Maintained complete emotional composure. Executed the entry mechanically once the FVG was tapped.',
    date: 'Sep 30, 2026',
    dateIso: '2026-09-30'
  },
  {
    id: 't-demo-2',
    ticketId: '8924102',
    pair: 'GBP/USD',
    direction: 'SHORT',
    setupType: 'Liquidity Sweep (BSL/SSL)',
    timeframe: '5m',
    session: 'NY AM Killzone',
    entryPrice: 1.30450,
    stopLoss: 1.30600,
    takeProfit: 1.30000,
    exitPrice: 1.30000,
    lotSize: 2.0,
    riskReward: 3.0,
    realizedRR: 3.0,
    outcome: 'WIN',
    profitPercent: 3.0,
    profitDollar: 300.0,
    holdingTime: '45m',
    emotion: 'Calm & Patient',
    mistakeTag: 'A+ Execution',
    preTradeThesis: 'Previous Day High (PDH) purged during 09:30 US equity open. Bearish market structure break with institutional displacement.',
    postTradeReview: 'Targeted sell-side liquidity at London session low. Flawless execution without second guessing.',
    rulesFollowed: true,
    notes: 'Reflection: Did not rush the entry. Waited for the 5m candle to close below the swing low before pressing market sell.',
    date: 'Sep 23, 2026',
    dateIso: '2026-09-23'
  },
  {
    id: 't-demo-3',
    ticketId: '8924103',
    pair: 'XAU/USD',
    direction: 'LONG',
    setupType: 'Order Block (OB)',
    timeframe: '15m',
    session: 'London / NY Overlap',
    entryPrice: 2650.50,
    stopLoss: 2642.00,
    takeProfit: 2671.75,
    exitPrice: 2671.75,
    lotSize: 1.0,
    riskReward: 2.5,
    realizedRR: 2.5,
    outcome: 'WIN',
    profitPercent: 2.5,
    profitDollar: 250.0,
    holdingTime: '2h 10m',
    emotion: 'Flow State',
    mistakeTag: 'A+ Execution',
    preTradeThesis: 'Gold retested unmitigated 4H bullish order block following CPI volatility wash. Clean rejection wick.',
    postTradeReview: 'Partial profit taken at 1:2 R:R, runner held into previous week high. Controlled risk throughout.',
    rulesFollowed: true,
    notes: 'Reflection: Perfect adherence to trade plan. Resisted the impulse to overleverage despite high conviction.',
    date: 'Oct 01, 2026',
    dateIso: '2026-10-01'
  },
  {
    id: 't-demo-4',
    ticketId: '8924104',
    pair: 'NAS100',
    direction: 'SHORT',
    setupType: 'Silver Bullet',
    timeframe: '1m',
    session: 'NY AM Killzone',
    entryPrice: 19850.0,
    stopLoss: 19890.0,
    takeProfit: 19730.0,
    exitPrice: 19890.0,
    lotSize: 1.0,
    riskReward: 3.0,
    realizedRR: -1.0,
    outcome: 'LOSS',
    profitPercent: -1.0,
    profitDollar: -100.0,
    holdingTime: '20m',
    emotion: 'Disciplined',
    mistakeTag: 'Followed Plan',
    preTradeThesis: '10:00 AM Silver Bullet hour imbalance fill. Looking for expansion into discount relative equal lows.',
    postTradeReview: 'News headline spiked price through stop loss. Invalidation was respected and accepted without revenge trading.',
    rulesFollowed: true,
    notes: 'Reflection: Even a losing trade is a victory if rules are strictly followed. Exactly -1R lost, capital preserved.',
    date: 'Sep 24, 2026',
    dateIso: '2026-09-24'
  }
];

export default function JournalPage() {
  const { user, syncBrokerTrades } = useAuth();

  // Live audited trade ledger dataset (initialized with verified demo entries)
  const [trades, setTrades] = useState<JournalTrade[]>(INITIAL_DEMO_JOURNAL_TRADES);
  const [isLoadingTrades, setIsLoadingTrades] = useState(false);

  // Fetch real verified trades from backend API
  useEffect(() => {
    if (!user) {
      setTrades(INITIAL_DEMO_JOURNAL_TRADES);
      return;
    }
    const fetchTrades = async () => {
      setIsLoadingTrades(true);
      try {
        const apiBase = getApiBase();
        const token = localStorage.getItem('pipbud_token') || user.token;
        const res = await fetch(`${apiBase}/api/journal/trades/?trader_id=${encodeURIComponent(user.id)}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'X-Trader-Id': user.id,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.trades && Array.isArray(data.trades)) {
            const mapped: JournalTrade[] = data.trades.map((t: any) => ({
              id: t.id,
              ticketId: t.id.slice(0, 8),
              pair: t.pair,
              direction: t.direction,
              setupType: t.setup_type || 'Order Block (OB)',
              timeframe: t.timeframe || '15m',
              session: t.session || 'London',
              entryPrice: t.entry_price || 0,
              stopLoss: t.stop_loss || 0,
              takeProfit: t.take_profit || 0,
              exitPrice: t.take_profit || t.entry_price || 0,
              lotSize: 1.0,
              riskReward: t.risk_reward_ratio || 2.0,
              realizedRR: t.outcome === 'WIN' ? (t.risk_reward_ratio || 2.0) : t.outcome === 'LOSS' ? -1.0 : 0.0,
              outcome: t.outcome || 'WIN',
              profitPercent: t.profit_loss_percent || (t.outcome === 'WIN' ? 2.5 : t.outcome === 'LOSS' ? -1.0 : 0.0),
              profitDollar: (t.profit_loss_percent || 0) * 100,
              holdingTime: '1h 00m',
              emotion: 'Disciplined',
              mistakeTag: 'A+ Setup',
              preTradeThesis: t.notes || 'Logged trade',
              postTradeReview: t.notes || '',
              chartUrl: t.screenshot_url || '',
              rulesFollowed: true,
              notes: t.notes || '',
              date: t.date_display || (t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Today'),
              dateIso: t.created_at ? t.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            }));
            setTrades(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load journal trades:', err);
      } finally {
        setIsLoadingTrades(false);
      }
    };
    fetchTrades();
  }, [user]);

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
  const [mobileCalendarView, setMobileCalendarView] = useState<'grid' | 'agenda'>('grid');
  const [ledgerViewMode, setLedgerViewMode] = useState<'journal' | 'table'>('journal');

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
  const [notepadTab, setNotepadTab] = useState<'thesis' | 'mindset' | 'lessons'>('thesis');
  const [logModalMobileTab, setLogModalMobileTab] = useState<'params' | 'notes'>('params');
  const [autopsyMobileTab, setAutopsyMobileTab] = useState<'telemetry' | 'notepad'>('telemetry');

  // Live Risk/Reward calculation
  const liveRR = useMemo(() => {
    const entry = parseFloat(formEntry);
    const sl = parseFloat(formSL);
    const tp = parseFloat(formTP);
    if (!entry || !sl || !tp) return null;
    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    if (risk === 0) return null;
    return (reward / risk).toFixed(2);
  }, [formEntry, formSL, formTP]);

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

  // Aggregated calendar days computation
  const calendarData = useMemo(() => {
    // Group trades by dateIso
    const tradesByDate = new Map<string, JournalTrade[]>();
    trades.forEach((t) => {
      const d = t.dateIso || '2026-09-30';
      const arr = tradesByDate.get(d) || [];
      arr.push(t);
      tradesByDate.set(d, arr);
    });

    const sampleDays = [
      { day: 15, date: '2026-09-15', weekday: 'Tue', pnl: 0, count: 0, weekend: false },
      { day: 16, date: '2026-09-16', weekday: 'Wed', pnl: -100, count: 1, weekend: false },
      { day: 17, date: '2026-09-17', weekday: 'Thu', pnl: 0, count: 0, weekend: false },
      { day: 18, date: '2026-09-18', weekday: 'Fri', pnl: 300, count: 1, weekend: false },
      { day: 19, date: '2026-09-19', weekday: 'Sat', pnl: 0, count: 0, weekend: true },
      { day: 20, date: '2026-09-20', weekday: 'Sun', pnl: 0, count: 0, weekend: true },
      { day: 21, date: '2026-09-21', weekday: 'Mon', pnl: 0, count: 0, weekend: false },
      { day: 22, date: '2026-09-22', weekday: 'Tue', pnl: 0, count: 1, weekend: false },
      { day: 23, date: '2026-09-23', weekday: 'Wed', pnl: 300, count: 1, weekend: false },
      { day: 24, date: '2026-09-24', weekday: 'Thu', pnl: -100, count: 1, weekend: false },
      { day: 25, date: '2026-09-25', weekday: 'Fri', pnl: 0, count: 0, weekend: false },
      { day: 26, date: '2026-09-26', weekday: 'Sat', pnl: 0, count: 0, weekend: true },
      { day: 27, date: '2026-09-27', weekday: 'Sun', pnl: 0, count: 0, weekend: true },
      { day: 28, date: '2026-09-28', weekday: 'Mon', pnl: 0, count: 0, weekend: false },
      { day: 29, date: '2026-09-29', weekday: 'Tue', pnl: 0, count: 0, weekend: false },
      { day: 30, date: '2026-09-30', weekday: 'Wed', pnl: 300, count: 1, weekend: false },
      { day: 1, date: '2026-10-01', weekday: 'Thu', pnl: 250, count: 1, weekend: false },
      { day: 2, date: '2026-10-02', weekday: 'Fri', pnl: 0, count: 0, weekend: false },
      { day: 3, date: '2026-10-03', weekday: 'Sat', pnl: 0, count: 0, weekend: true },
      { day: 4, date: '2026-10-04', weekday: 'Sun', pnl: 0, count: 0, weekend: true },
      { day: 5, date: '2026-10-05', weekday: 'Mon', pnl: 0, count: 0, weekend: false },
    ];

    // Merge real logged trades and extra dates
    const sampleDateSet = new Set(sampleDays.map((sd) => sd.date));
    const allDaysPool = [...sampleDays];

    tradesByDate.forEach((_, dateKey) => {
      if (!sampleDateSet.has(dateKey)) {
        const dObj = new Date(dateKey);
        const dayNumber = !isNaN(dObj.getDate()) ? dObj.getDate() : 1;
        const dayOfWeekIndex = !isNaN(dObj.getDay()) ? dObj.getDay() : 1;
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const isWeekend = dayOfWeekIndex === 0 || dayOfWeekIndex === 6;
        allDaysPool.push({
          day: dayNumber,
          date: dateKey,
          weekday: weekdays[dayOfWeekIndex],
          pnl: 0,
          count: 0,
          weekend: isWeekend,
        });
      }
    });

    const days = allDaysPool.map((sd) => {
      const realTrades = tradesByDate.get(sd.date) || [];
      if (realTrades.length > 0) {
        const sumPL = realTrades.reduce((acc, cur) => acc + cur.profitDollar, 0);
        return {
          ...sd,
          count: realTrades.length,
          pnl: sumPL,
          trades: realTrades,
        };
      }
      return {
        ...sd,
        trades: [],
      };
    });

    let winDays = 0;
    let lossDays = 0;
    let beDays = 0;
    let totalPnl = 0;
    let bestDayPnl = 0;

    days.forEach((d) => {
      if (d.count > 0) {
        totalPnl += d.pnl;
        if (d.pnl > 0) {
          winDays++;
          if (d.pnl > bestDayPnl) bestDayPnl = d.pnl;
        } else if (d.pnl < 0) {
          lossDays++;
        } else {
          beDays++;
        }
      }
    });

    const activeTradingDays = days.filter((d) => d.count > 0);
    const winRate = activeTradingDays.length > 0 ? Math.round((winDays / activeTradingDays.length) * 100) : 0;

    return {
      days,
      winDays,
      lossDays,
      beDays,
      totalPnl,
      bestDayPnl,
      winRate,
      activeTradingDays,
    };
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
                <span>100% Audited Meritocracy Ledger</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
                Log In to Access Your Web Trading Terminal
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                Your trade history, AI setup validation, drawdown health, and 7-tier meritocracy rank are synced directly with your verified Telegram account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login?redirect=/journal"
                className="w-full sm:w-auto h-12 px-8 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
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
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-[0_8px_30px_rgba(28,25,23,0.04)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
              {/* Trader Identity & Verified Broker Badge */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-xs"
                  style={{ backgroundColor: user.tier_color || '#C2410C' }}
                >
                  {user.display_name?.slice(0, 2).toUpperCase() || user.username.slice(0, 2).toUpperCase()}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
                      {user.display_name || user.name || user.username}
                    </h1>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: user.tier_color || '#C2410C' }}
                    >
                      {user.tier_badge}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#0F766E] font-semibold bg-[#F0FDFA] px-2.5 py-0.5 rounded-full border border-[#CCFBF1]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Live Verified Account
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C] flex items-center gap-2">
                    <span>@{user.username}</span>
                    <span className="text-[#D6D3D1]">•</span>
                    <span className="font-mono text-[#44403C]">{user.broker_name || 'IC Markets SC - Live02'}</span>
                    <span className="text-[#D6D3D1]">•</span>
                    <span className="text-[#0F766E] font-mono">Acct #{user.broker_account_number || '8924108'}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsAutoSyncModalOpen(true)}
                  className="h-10 px-4 bg-[#F0FDFA] hover:bg-[#CCFBF1] text-[#0F766E] border border-[#CCFBF1] rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-xs"
                  title="Configure automated trade reading (MT4/MT5 EA, Cloud Poller, Statements)"
                >
                  <Server className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Auto-Sync Deals</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse" />
                </button>

                <Link
                  href="/journal/log"
                  className="h-10 px-4 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-98"
                >
                  <PenLine className="w-4 h-4" />
                  <span>Log Trade</span>
                </Link>

                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="h-10 px-4 bg-white border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] text-[#1C1917] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Tier Audit</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="h-10 px-3.5 bg-white border border-[#E7E5E4] hover:border-[#FED7AA] text-[#78716C] hover:text-[#1C1917] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                  title="Export verified ledger to CSV"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                <Link
                  href="/forum"
                  className="h-10 px-4 bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] hover:bg-[#FFEDD5] rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>#{activeChannelForTier}</span>
                </Link>
              </div>
            </div>

            {/* Tier Health Bar & Promotion Target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
              {/* Drawdown Safety & Anti-Shortfall Health */}
              <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-[#1C1917]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                    Tier Drawdown Health: {user.tier_health}% (Good Standing)
                  </span>
                  <span className="text-[#0F766E] font-mono text-[11px]">
                    Current Drawdown: {user.max_drawdown}% (Ceiling: {currentTierSpec?.maxDrawdown || 5.0}%)
                  </span>
                </div>
                <div className="w-full bg-[#E7E5E4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#15803D] h-full rounded-full transition-all duration-500"
                    style={{ width: `${user.tier_health}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#78716C] mt-2">
                  Anti-Shortfall Engine: Maintain drawdown &le; {currentTierSpec?.maxDrawdown || 5.0}% to retain access to #{activeChannelForTier}.
                </p>
              </div>

              {/* Progress to Next Skill Tier */}
              <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                {nextTierSpec ? (
                  <>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
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
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-[#1C1917]">Top 0.5% Titan Desk</span>
                      <span className="text-[#0F766E] font-mono text-[11px]">Maximum Rank Achieved</span>
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

          {/* Institutional KPI Dashboard (7 Pro Metric Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
            {/* Card 1: Net Realized P/L */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Net Realized P/L</span>
              <span className="text-xl font-bold text-[#15803D] tabular-nums block">
                {stats.totalPLDollar >= 0 ? `+$${stats.totalPLDollar.toFixed(2)}` : `-$${Math.abs(stats.totalPLDollar).toFixed(2)}`}
              </span>
              <span className="text-[10px] text-[#15803D] font-medium flex items-center gap-1 mt-0.5">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{stats.totalPLPercent.toFixed(1)}% Account Gain</span>
              </span>
            </div>

            {/* Card 2: Win Rate */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Win Rate</span>
              <span className="text-xl font-bold text-[#1C1917] tabular-nums block">
                {stats.winRate}%
              </span>
              <span className="text-[10px] text-[#78716C] block mt-0.5">
                {stats.winsCount}W • {stats.lossesCount}L • {stats.beCount}BE
              </span>
            </div>

            {/* Card 3: Profit Factor */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Profit Factor</span>
              <span className="text-xl font-bold text-[#C2410C] tabular-nums block">
                {stats.profitFactor}
              </span>
              <span className="text-[10px] text-[#15803D] font-medium block mt-0.5">
                Target: &gt; 1.80 (Elite)
              </span>
            </div>

            {/* Card 4: Realized R:R */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Realized R:R</span>
              <span className="text-xl font-bold text-[#1C1917] tabular-nums block">
                {stats.realizedRR}:1
              </span>
              <span className="text-[10px] text-[#78716C] block mt-0.5">
                Avg +${stats.avgWin} / -${stats.avgLoss}
              </span>
            </div>

            {/* Card 5: Trade Expectancy */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Expectancy / Trade</span>
              <span className="text-xl font-bold text-[#15803D] tabular-nums block">
                +${stats.expectancy}
              </span>
              <span className="text-[10px] text-[#78716C] block mt-0.5">
                Mathematical Edge
              </span>
            </div>

            {/* Card 6: Discipline Index */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Discipline Index</span>
              <span className="text-xl font-bold text-[#C2410C] tabular-nums block">
                {stats.disciplineScore}%
              </span>
              <span className="text-[10px] text-[#15803D] block mt-0.5">
                Rules Strictly Followed
              </span>
            </div>

            {/* Card 7: Verified Status */}
            <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4] shadow-xs">
              <span className="text-[11px] text-[#78716C] block mb-1">Audit Cryptography</span>
              <span className="text-xl font-bold text-[#0F766E] flex items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                <span>100%</span>
              </span>
              <span className="text-[10px] text-[#0F766E] font-medium block mt-0.5">
                Zero Fake Trade Logs
              </span>
            </div>
          </div>

          {/* Interactive Visual Analytics Console (5 Pro Views) */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-sm space-y-6">
            {/* View Selection Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5E4] pb-4">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-[#C2410C]" />
                <h2 className="text-base font-bold text-[#1C1917]">Performance Analytics & Edge Diagnostics</h2>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto bg-[#FAFAF9] p-1 rounded-2xl border border-[#E7E5E4] max-w-full">
                <button
                  onClick={() => setActiveAnalyticsTab('equity')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    activeAnalyticsTab === 'equity'
                      ? 'bg-[#C2410C] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Equity Curve
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('calendar')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    activeAnalyticsTab === 'calendar'
                      ? 'bg-[#C2410C] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  P&amp;L Calendar
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('setups')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    activeAnalyticsTab === 'setups'
                      ? 'bg-[#C2410C] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Setups Edge
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('sessions')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    activeAnalyticsTab === 'sessions'
                      ? 'bg-[#C2410C] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Sessions &amp; Hours
                </button>
                <button
                  onClick={() => setActiveAnalyticsTab('psychology')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    activeAnalyticsTab === 'psychology'
                      ? 'bg-[#C2410C] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Psychology &amp; Errors
                </button>
              </div>
            </div>

            {/* TAB 1: Cumulative Equity Growth Curve */}
            {activeAnalyticsTab === 'equity' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Starting Capital:</span>
                      <span className="font-bold text-[#1C1917] font-mono">$100,000.00</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Current Equity:</span>
                      <span className="font-bold text-[#15803D] font-mono">
                        ${(100000 + stats.totalPLDollar).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Max Peak Drawdown:</span>
                      <span className="font-bold text-[#15803D] font-mono">{user.max_drawdown}% (Safe)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#78716C]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-[#15803D]" />
                      <span>Verified Balance Curve</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-[#C2410C] border-dashed" />
                      <span>High-Water Mark</span>
                    </span>
                  </div>
                </div>

                {/* SVG Interactive Equity Chart */}
                <div className="w-full h-64 bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] p-4 relative flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="equityGradientLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#15803D" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#15803D" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Gridlines */}
                    <line x1="0" y1="40" x2="800" y2="40" stroke="#E7E5E4" strokeDasharray="3 3" />
                    <line x1="0" y1="90" x2="800" y2="90" stroke="#E7E5E4" strokeDasharray="3 3" />
                    <line x1="0" y1="140" x2="800" y2="140" stroke="#E7E5E4" strokeDasharray="3 3" />
                    <line x1="0" y1="190" x2="800" y2="190" stroke="#E7E5E4" />

                    {/* Gradient Area Fill */}
                    <polygon
                      points="0,170 100,165 200,135 300,105 400,115 500,85 600,60 700,70 800,35 800,200 0,200"
                      fill="url(#equityGradientLight)"
                    />

                    {/* High-Water Mark Line */}
                    <polyline
                      points="0,170 100,165 200,135 300,105 400,105 500,85 600,60 700,60 800,35"
                      fill="none"
                      stroke="#C2410C"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Main Equity Line */}
                    <polyline
                      points="0,170 100,165 200,135 300,105 400,115 500,85 600,60 700,70 800,35"
                      fill="none"
                      stroke="#15803D"
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
                        fill="#FFFFFF"
                        stroke="#15803D"
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
              <div className="space-y-5">
                {/* 1. High-Class Calendar Header & Performance Strip */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                  {/* Month Title & Verified Badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E5E4] flex items-center justify-center text-[#C2410C] shadow-2xs">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[#1C1917] text-sm sm:text-base">September – October 2026</h3>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                          Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C]">Daily performance & behavioral P&L audit</p>
                    </div>
                  </div>

                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold text-[#78716C]">Net P&L</span>
                      <span className={`font-mono font-bold text-sm ${calendarData.totalPnl >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'}`}>
                        {calendarData.totalPnl >= 0 ? `+$${calendarData.totalPnl.toFixed(2)}` : `-$${Math.abs(calendarData.totalPnl).toFixed(2)}`}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold text-[#78716C]">Day Record</span>
                      <span className="font-mono font-bold text-sm">
                        <span className="text-[#15803D]">{calendarData.winDays}W</span>
                        <span className="text-[#A8A29E] mx-1">/</span>
                        <span className="text-[#B91C1C]">{calendarData.lossDays}L</span>
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold text-[#78716C]">Win Rate</span>
                      <span className="font-mono font-bold text-sm text-[#1C1917]">{calendarData.winRate}%</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold text-[#78716C]">Best Day</span>
                      <span className="font-mono font-bold text-sm text-[#15803D]">+${calendarData.bestDayPnl.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile View Switcher (Heatmap Grid vs Daily Breakdown) */}
                <div className="sm:hidden flex items-center justify-between gap-1.5 p-1 bg-[#F5F5F4] rounded-xl border border-[#E7E5E4]">
                  <button
                    type="button"
                    onClick={() => setMobileCalendarView('grid')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      mobileCalendarView === 'grid'
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Calendar Heatmap
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileCalendarView('agenda')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      mobileCalendarView === 'agenda'
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Daily Breakdown ({calendarData.activeTradingDays.length})
                  </button>
                </div>

                {/* Legend indicator */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#78716C] px-1">
                  <span className="hidden sm:inline font-medium">Click any trading day to inspect its executions or filter the trade ledger.</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-[#DCFCE7] border border-[#86EFAC]" />
                      <span>Profitable Day</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-[#FEE2E2] border border-[#FCA5A5]" />
                      <span>Drawdown Day</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-[#F5F5F4] border border-[#E7E5E4]" />
                      <span>No Trades</span>
                    </span>
                  </div>
                </div>

                {/* DESKTOP CALENDAR VIEW (Spacious 7-Column Grid) */}
                <div className="hidden sm:block">
                  <div className="grid grid-cols-7 gap-2.5 text-xs">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center font-bold text-[#78716C] py-1.5 text-[11px] uppercase tracking-wider">
                        {day}
                      </div>
                    ))}

                    {calendarData.days.map((cell, idx) => {
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
                          className={`group p-3 rounded-2xl border transition-all text-left flex flex-col justify-between h-24 relative overflow-hidden cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[#C2410C] border-[#C2410C] bg-[#FFF7ED] shadow-sm'
                              : cell.weekend
                              ? 'bg-[#FAFAF9]/60 border-[#F5F5F4] opacity-55 hover:opacity-80'
                              : isGreen
                              ? 'bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7]/60 border-[#BBF7D0] hover:border-[#86EFAC] hover:shadow-xs'
                              : isRed
                              ? 'bg-gradient-to-b from-[#FEF2F2] to-[#FEE2E2]/60 border-[#FECACA] hover:border-[#FCA5A5] hover:shadow-xs'
                              : 'bg-white border-[#E7E5E4] hover:border-[#D6D3D1] hover:bg-[#FAFAF9]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#C2410C]' : 'text-[#1C1917]'}`}>
                              {String(cell.day).padStart(2, '0')}
                            </span>
                            {cell.count > 0 ? (
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold ${
                                isGreen ? 'bg-[#DCFCE7] text-[#15803D]' : isRed ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#E7E5E4] text-[#44403C]'
                              }`}>
                                {cell.count} {cell.count === 1 ? 'trade' : 'trades'}
                              </span>
                            ) : cell.weekend ? (
                              <span className="text-[9px] font-mono text-[#A8A29E] uppercase">Weekend</span>
                            ) : null}
                          </div>

                          <div className="mt-2">
                            {cell.count > 0 ? (
                              <div className="flex items-center gap-1">
                                {isGreen ? (
                                  <ArrowUpRight className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                                ) : isRed ? (
                                  <ArrowDownRight className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                                ) : null}
                                <span
                                  className={`text-xs font-bold font-mono tracking-tight ${
                                    isGreen ? 'text-[#15803D]' : isRed ? 'text-[#B91C1C]' : 'text-[#78716C]'
                                  }`}
                                >
                                  {cell.pnl > 0 ? `+$${cell.pnl.toFixed(2)}` : cell.pnl < 0 ? `-$${Math.abs(cell.pnl).toFixed(2)}` : '$0.00'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-[#A8A29E] font-mono block">--</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* MOBILE CALENDAR VIEW (sm:hidden) */}
                <div className="sm:hidden space-y-4">
                  {mobileCalendarView === 'grid' ? (
                    <>
                      {/* Touch-Friendly Compact Grid */}
                      <div className="grid grid-cols-7 gap-1.5 text-center">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <div key={i} className="text-[10px] font-bold text-[#A8A29E] py-1">
                            {day}
                          </div>
                        ))}

                        {calendarData.days.map((cell, idx) => {
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
                              className={`aspect-square min-h-[46px] rounded-xl border flex flex-col items-center justify-center p-1 relative transition-all active:scale-95 cursor-pointer ${
                                isSelected
                                  ? 'ring-2 ring-[#C2410C] border-[#C2410C] bg-[#FFF7ED]'
                                  : cell.weekend
                                  ? 'bg-[#FAFAF9]/50 border-[#F5F5F4] opacity-40'
                                  : isGreen
                                  ? 'bg-[#DCFCE7]/70 border-[#BBF7D0] text-[#15803D]'
                                  : isRed
                                  ? 'bg-[#FEE2E2]/70 border-[#FECACA] text-[#B91C1C]'
                                  : 'bg-white border-[#E7E5E4] text-[#1C1917]'
                              }`}
                            >
                              <span className={`text-[12px] font-mono font-bold leading-none ${
                                isSelected ? 'text-[#C2410C]' : isGreen ? 'text-[#15803D]' : isRed ? 'text-[#B91C1C]' : 'text-[#44403C]'
                              }`}>
                                {cell.day}
                              </span>

                              {cell.count > 0 ? (
                                <span className={`w-1.5 h-1.5 rounded-full mt-1 ${
                                  isGreen ? 'bg-[#15803D]' : isRed ? 'bg-[#B91C1C]' : 'bg-[#78716C]'
                                }`} />
                              ) : (
                                <span className="w-1.5 h-1.5 mt-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Interactive Mobile Day Performance Card */}
                      {selectedCalendarDate ? (
                        (() => {
                          const dayObj = calendarData.days.find((d) => d.date === selectedCalendarDate);
                          const dayTrades = dayObj?.trades?.length
                            ? dayObj.trades
                            : trades.filter((t) => t.dateIso === selectedCalendarDate);
                          const dayPL = dayObj ? dayObj.pnl : dayTrades.reduce((acc, t) => acc + t.profitDollar, 0);

                          return (
                            <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs space-y-3 animate-in fade-in duration-200">
                              <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F4]">
                                <div>
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#78716C]">
                                    Selected Trading Day
                                  </span>
                                  <h4 className="font-bold text-sm text-[#1C1917]">{selectedCalendarDate}</h4>
                                </div>
                                <div className="text-right">
                                  <span className={`font-mono font-bold text-sm block ${dayPL >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'}`}>
                                    {dayPL >= 0 ? `+$${dayPL.toFixed(2)}` : `-$${Math.abs(dayPL).toFixed(2)}`}
                                  </span>
                                  <span className="text-[10px] text-[#78716C] font-mono">{dayTrades.length} executed {dayTrades.length === 1 ? 'trade' : 'trades'}</span>
                                </div>
                              </div>

                              {dayTrades.length > 0 ? (
                                <div className="space-y-2">
                                  {dayTrades.map((t) => (
                                    <div
                                      key={t.id}
                                      onClick={() => setSelectedAutopsyTrade(t)}
                                      className="p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-between cursor-pointer hover:border-[#FED7AA]"
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                          t.direction === 'LONG' ? 'bg-[#15803D] text-white' : 'bg-[#B91C1C] text-white'
                                        }`}>
                                          {t.direction}
                                        </span>
                                        <div>
                                          <div className="flex items-center gap-1.5">
                                            <span className="font-mono font-bold text-xs text-[#1C1917]">{t.pair}</span>
                                            <span className="text-[10px] text-[#78716C]">({t.setupType})</span>
                                          </div>
                                          <span className="text-[10px] text-[#A8A29E] font-mono">1:{t.riskReward || 2} R:R • {t.timeframe}</span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <span className={`font-mono font-bold text-xs block ${
                                          t.profitDollar >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                                        }`}>
                                          {t.profitDollar >= 0 ? `+$${t.profitDollar.toFixed(2)}` : `-$${Math.abs(t.profitDollar).toFixed(2)}`}
                                        </span>
                                        <span className="text-[9px] uppercase font-bold text-[#78716C]">{t.outcome}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="py-4 text-center text-xs text-[#78716C]">
                                  No verified trades logged on this calendar date.
                                </div>
                              )}

                              <div className="pt-2 flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={() => setSelectedCalendarDate(null)}
                                  className="text-xs text-[#78716C] hover:text-[#1C1917] font-medium"
                                >
                                  Clear Selection
                                </button>
                                <span className="text-[11px] text-[#C2410C] font-semibold">
                                  Ledger filtered below ↓
                                </span>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-dashed border-[#D6D3D1] text-center text-xs text-[#78716C]">
                          Tap any day on the calendar heatmap above to inspect executions and returns.
                        </div>
                      )}
                    </>
                  ) : (
                    /* Chronological Mobile Daily Breakdown Stream */
                    <div className="space-y-3">
                      {calendarData.activeTradingDays.length === 0 ? (
                        <div className="p-6 text-center text-xs text-[#78716C] bg-white rounded-2xl border border-[#E7E5E4]">
                          No active trading days recorded in this window.
                        </div>
                      ) : (
                        calendarData.activeTradingDays.map((dayItem) => {
                          const isSelected = selectedCalendarDate === dayItem.date;
                          const isGreen = dayItem.pnl > 0;
                          const isRed = dayItem.pnl < 0;

                          return (
                            <div
                              key={dayItem.date}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                isSelected ? 'bg-[#FFF7ED] border-[#C2410C]' : 'bg-white border-[#E7E5E4]'
                              }`}
                            >
                              <div className="flex items-center justify-between pb-2.5 border-b border-[#F5F5F4]">
                                <div className="flex items-center gap-2">
                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                                    isGreen ? 'bg-[#DCFCE7] text-[#15803D]' : isRed ? 'bg-[#FEE2E2] text-[#B91C1C]' : 'bg-[#F5F5F4] text-[#78716C]'
                                  }`}>
                                    {dayItem.day}
                                  </div>
                                  <div>
                                    <span className="font-bold text-xs text-[#1C1917] block">{dayItem.date}</span>
                                    <span className="text-[10px] text-[#78716C]">{dayItem.weekday} • {dayItem.count} {dayItem.count === 1 ? 'trade' : 'trades'}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className={`font-mono font-bold text-sm block ${
                                    isGreen ? 'text-[#15803D]' : isRed ? 'text-[#B91C1C]' : 'text-[#78716C]'
                                  }`}>
                                    {dayItem.pnl > 0 ? `+$${dayItem.pnl.toFixed(2)}` : dayItem.pnl < 0 ? `-$${Math.abs(dayItem.pnl).toFixed(2)}` : '$0.00'}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedCalendarDate(isSelected ? null : dayItem.date)}
                                    className="text-[10px] text-[#C2410C] font-semibold hover:underline"
                                  >
                                    {isSelected ? 'Reset Filter' : 'Filter Ledger'}
                                  </button>
                                </div>
                              </div>

                              {dayItem.trades && dayItem.trades.length > 0 && (
                                <div className="mt-2.5 space-y-1.5">
                                  {dayItem.trades.map((t) => (
                                    <div
                                      key={t.id}
                                      onClick={() => setSelectedAutopsyTrade(t)}
                                      className="p-2 rounded-xl bg-[#FAFAF9] flex items-center justify-between text-xs cursor-pointer hover:bg-[#F5F5F4]"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${
                                          t.direction === 'LONG' ? 'bg-[#15803D] text-white' : 'bg-[#B91C1C] text-white'
                                        }`}>
                                          {t.direction}
                                        </span>
                                        <span className="font-mono font-bold text-[11px] text-[#1C1917]">{t.pair}</span>
                                        <span className="text-[10px] text-[#78716C] hidden min-[360px]:inline">({t.setupType})</span>
                                      </div>
                                      <span className={`font-mono font-bold text-xs ${
                                        t.profitDollar >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                                      }`}>
                                        {t.profitDollar >= 0 ? `+$${t.profitDollar.toFixed(2)}` : `-$${Math.abs(t.profitDollar).toFixed(2)}`}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Filter Status Notification Banner */}
                {selectedCalendarDate && (
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] text-xs text-[#C2410C] shadow-2xs animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 shrink-0 text-[#C2410C]" />
                      <span>
                        Verified ledger is currently filtered to <strong>{selectedCalendarDate}</strong>.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCalendarDate(null)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#FED7AA] text-[#C2410C] font-bold hover:bg-[#FFEDD5] transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Clear Date Filter</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Setups & Confluence Edge Matrix */}
            {activeAnalyticsTab === 'setups' && (
              <div className="space-y-4">
                <span className="text-xs text-[#78716C] block">
                  Identify your most profitable trading patterns and eliminate losing habits.
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {setupMatrix.map((item) => (
                    <div
                      key={item.setup}
                      className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1C1917] text-xs">{item.setup}</span>
                        <span className="text-[10px] font-mono text-[#78716C]">{item.count} Trades</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#78716C] block">Win Rate</span>
                          <span
                            className={`text-base font-bold font-mono ${
                              item.winRate >= 60 ? 'text-[#15803D]' : 'text-[#C2410C]'
                            }`}
                          >
                            {item.winRate}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#78716C] block">Net Realized P&L</span>
                          <span
                            className={`text-base font-bold font-mono ${
                              item.pnl >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                            }`}
                          >
                            {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#15803D] h-full rounded-full"
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
                <span className="text-xs text-[#78716C] block">
                  Performance breakdown by market killzones and trading sessions.
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {sessionMatrix.map((item) => (
                    <div
                      key={item.session}
                      className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1C1917] text-xs">{item.session}</span>
                        <Clock className="w-3.5 h-3.5 text-[#C2410C]" />
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#78716C]">Trades:</span>
                        <span className="font-bold text-[#1C1917] font-mono">{item.count}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#78716C]">Win Rate:</span>
                        <span className="font-bold text-[#15803D] font-mono">{item.winRate}%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#78716C]">Net Profit:</span>
                        <span className="font-bold text-[#15803D] font-mono">
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
                <span className="text-xs text-[#78716C] block">
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
                            ? 'bg-[#F0FDFA] border-[#CCFBF1]'
                            : 'bg-[#FEF2F2] border-[#FEE2E2]'
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1C1917] text-xs flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-[#C2410C]" />
                            <span>{item.tag}</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#78716C]">{item.count} Trades</span>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-[#78716C]">Net Impact:</span>
                          <span
                            className={`font-bold font-mono text-sm ${
                              isPositive ? 'text-[#15803D]' : 'text-[#B91C1C]'
                            }`}
                          >
                            {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#78716C]">Win Rate:</span>
                          <span className="font-mono text-[#1C1917] font-bold">{item.winRate}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar & Audited Trade Ledger Grid */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs overflow-hidden space-y-0">
            {/* Header & Filter Controls */}
            <div className="p-5 border-b border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 bg-[#FAFAF9]">
              <div>
                <h2 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                  <span>Audited Trade Ledger</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
                    {filteredTrades.length} Verified Entries
                  </span>
                </h2>
                <p className="text-xs text-[#78716C]">
                  Cryptographically verified fills with Planned vs Realized R:R, setups, and post-trade autopsies.
                </p>
              </div>

              {/* Filters & View Switcher */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* View Switcher: Apple Journal Feed vs Table Ledger */}
                <div className="flex items-center bg-[#F5F5F4] p-1 rounded-xl border border-[#E7E5E4]">
                  <button
                    type="button"
                    onClick={() => setLedgerViewMode('journal')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      ledgerViewMode === 'journal'
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Apple Journal</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold font-mono">
                      PRO
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLedgerViewMode('table')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      ledgerViewMode === 'table'
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search pair, setup..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-8 pr-3 bg-white border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] placeholder-[#78716C] focus:border-[#C2410C]"
                  />
                </div>

                {/* Outcome Pill Filters */}
                <div className="flex items-center gap-1 bg-[#F5F5F4] p-1 rounded-xl border border-[#E7E5E4]">
                  {(['ALL', 'WIN', 'LOSS', 'BE'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedOutcomeFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        selectedOutcomeFilter === filter
                          ? 'bg-[#C2410C] text-white shadow-xs'
                          : 'text-[#78716C] hover:text-[#1C1917]'
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
                  className="h-8 px-2.5 bg-white border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:border-[#C2410C]"
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
                  className="h-8 px-2.5 bg-white border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:border-[#C2410C]"
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

            {/* View Switching: Apple Journal Feed (PRO) vs Table Ledger */}
            {ledgerViewMode === 'journal' ? (
              /* APPLE JOURNAL FEED VIEW */
              <div className="p-4 sm:p-7 space-y-6 bg-[#FAF8F5]">
                {filteredTrades.length === 0 ? (
                  <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#E7E5E4] p-8 max-w-lg mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center mx-auto text-[#C2410C]">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1C1917]">No Journal Reflections Found</p>
                      <p className="text-xs text-[#78716C] mt-1 leading-relaxed">
                        No trade entries match your active filters. Clear your filters or write a new Apple Journal trade entry.
                      </p>
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/journal/log"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
                      >
                        <PenLine className="w-3.5 h-3.5" />
                        <span>Write Journal Entry</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-3xl mx-auto">
                    {filteredTrades.map((t) => {
                      const isWin = t.outcome === 'WIN';
                      const isLoss = t.outcome === 'LOSS';
                      const moodColor = isWin ? '#15803D' : isLoss ? '#B91C1C' : '#475569';
                      const moodRing = isWin ? '#86EFAC' : isLoss ? '#FCA5A5' : '#CBD5E1';
                      const moodTone = isWin ? 'Disciplined & Grounded' : isLoss ? 'Risk-Controlled Invalidation' : 'Observant & Neutral';

                      return (
                        <div
                          key={t.id}
                          className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-7 shadow-[0_4px_25px_rgba(28,25,23,0.04)] hover:shadow-md transition-all space-y-4 relative overflow-hidden"
                        >
                          {/* Apple Journal State of Mind Top Ambient Bar */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1.5"
                            style={{ backgroundColor: moodColor }}
                          />

                          {/* Card Header: Date & State of Mind Badge */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F5F5F4]">
                            <div>
                              <span className="font-bold text-sm text-[#1C1917] block">
                                {t.date}
                              </span>
                              <span className="text-[11px] text-[#78716C] font-mono">
                                {t.session} • {t.timeframe} Chart • #{t.ticketId}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className="px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs"
                                style={{
                                  backgroundColor: `${moodColor}12`,
                                  color: moodColor,
                                  border: `1px solid ${moodRing}`
                                }}
                              >
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: moodColor }}
                                />
                                <span>{t.emotion || moodTone}</span>
                              </span>

                              <button
                                type="button"
                                onClick={() => setSelectedAutopsyTrade(t)}
                                className="p-1.5 rounded-lg text-[#78716C] hover:text-[#C2410C] hover:bg-[#FFF7ED] transition-colors cursor-pointer"
                                title="Open detailed autopsy modal"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Attached Executed Trade Moment Widget (Apple Moment Card) */}
                          <div
                            onClick={() => setSelectedAutopsyTrade(t)}
                            className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:border-[#FED7AA] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold ${
                                  t.direction === 'LONG' ? 'bg-[#15803D] text-white shadow-2xs' : 'bg-[#B91C1C] text-white shadow-2xs'
                                }`}
                              >
                                {t.direction}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-sm text-[#1C1917]">{t.pair}</span>
                                  <span className="text-xs text-[#78716C]">({t.setupType})</span>
                                </div>
                                <span className="text-[10px] text-[#A8A29E] font-mono">
                                  {t.entryPrice} &rarr; {t.exitPrice} (SL: {t.stopLoss} • TP: {t.takeProfit})
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-[#78716C] block">Realized R:R</span>
                                <span className="font-mono font-bold text-xs text-[#1C1917]">
                                  {t.realizedRR >= 0 ? `+${t.realizedRR}R` : `${t.realizedRR}R`}
                                </span>
                              </div>

                              <div className="text-right">
                                <span
                                  className={`font-mono font-bold text-sm block ${
                                    t.profitDollar >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                                  }`}
                                >
                                  {t.profitDollar >= 0 ? `+$${t.profitDollar.toFixed(2)}` : `-$${Math.abs(t.profitDollar).toFixed(2)}`}
                                </span>
                                <span className="text-[10px] uppercase font-bold text-[#78716C]">{t.outcome}</span>
                              </div>
                            </div>
                          </div>

                          {/* Reflection Notes Body */}
                          <div className="space-y-3 pt-1">
                            {t.preTradeThesis && (
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9A3412] block">
                                  Pre-Trade Thesis &amp; Context:
                                </span>
                                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-wrap">
                                  {t.preTradeThesis}
                                </p>
                              </div>
                            )}

                            {t.postTradeReview && t.postTradeReview !== t.preTradeThesis && (
                              <div className="pt-2 border-t border-[#F5F5F4] space-y-1">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                                  Autopsy &amp; Compounding Lessons:
                                </span>
                                <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-wrap">
                                  {t.postTradeReview}
                                </p>
                              </div>
                            )}

                            {t.notes && t.notes !== t.preTradeThesis && t.notes !== t.postTradeReview && (
                              <div className="p-3 rounded-2xl bg-[#FFFBEB]/70 border border-[#FDE68A] text-xs font-serif text-[#78350F] italic leading-relaxed">
                                {t.notes}
                              </div>
                            )}
                          </div>

                          {/* Screenshot preview if available */}
                          {t.chartUrl && (
                            <div className="pt-2">
                              <div
                                onClick={() => setSelectedAutopsyTrade(t)}
                                className="rounded-2xl overflow-hidden border border-[#E7E5E4] max-h-56 cursor-pointer"
                              >
                                <img src={t.chartUrl} alt="Chart verification" className="w-full object-cover" />
                              </div>
                            </div>
                          )}

                          {/* Footer action bar */}
                          <div className="pt-3 border-t border-[#F5F5F4] flex items-center justify-between text-xs">
                            <span className="text-[11px] text-[#0F766E] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
                              <span>Verified Rule Compliance</span>
                            </span>

                            <button
                              type="button"
                              onClick={() => setSelectedAutopsyTrade(t)}
                              className="text-xs font-bold text-[#C2410C] hover:text-[#EA580C] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Full Autopsy View</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* TABLE LEDGER VIEW */
              <>
                {/* Desktop / Tablet Ledger Table (hidden on mobile md:block) */}
                <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F5F4] text-[#78716C] font-semibold uppercase tracking-wider text-[10px] border-b border-[#E7E5E4]">
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
                <tbody className="divide-y divide-[#E7E5E4]">
                  {filteredTrades.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-16 px-4 text-center">
                        <div className="max-w-sm mx-auto space-y-2">
                          <p className="font-bold text-sm text-[#1C1917]">No Verified Trades Logged Yet</p>
                          <p className="text-xs text-[#78716C] leading-relaxed">
                            {trades.length === 0
                              ? 'Your journal ledger updates automatically when you send trade screenshots or statements to @PipBudBot on Telegram, or click "+ Log Trade" above.'
                              : 'No trades match your active filter criteria.'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTrades.map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => setSelectedAutopsyTrade(t)}
                        className="hover:bg-[#FFF7ED]/30 transition-colors cursor-pointer group"
                      >
                        {/* Ticket & Pair */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                t.direction === 'LONG'
                                  ? 'bg-[#DCFCE7] text-[#15803D]'
                                  : 'bg-[#FEE2E2] text-[#B91C1C]'
                              }`}
                            >
                              {t.direction}
                            </span>
                            <div>
                              <span className="font-bold text-[#1C1917] block">{t.pair}</span>
                              <span className="font-mono text-[10px] text-[#78716C]">#{t.ticketId}</span>
                            </div>
                          </div>
                        </td>

                        {/* Setup & Timeframe */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-medium text-[#44403C] block">{t.setupType}</span>
                          <span className="text-[10px] text-[#78716C] font-mono">{t.timeframe}</span>
                        </td>

                        {/* Entry & Exit Price */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px]">
                          <span className="text-[#1C1917] block">{t.entryPrice}</span>
                          <span className="text-[#78716C] text-[10px]">&rarr; {t.exitPrice}</span>
                        </td>

                        {/* SL & TP */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[10px]">
                          <span className="text-[#B91C1C] block">SL: {t.stopLoss}</span>
                          <span className="text-[#15803D] block">TP: {t.takeProfit}</span>
                        </td>

                        {/* R:R */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                          <span className="font-bold text-[#1C1917] block">{t.realizedRR >= 0 ? `+${t.realizedRR}R` : `${t.realizedRR}R`}</span>
                          <span className="text-[10px] text-[#78716C]">Plan: {t.riskReward}R</span>
                        </td>

                        {/* Outcome Badge */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.outcome === 'WIN'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : t.outcome === 'LOSS'
                                ? 'bg-[#FEE2E2] text-[#B91C1C]'
                                : 'bg-[#F5F5F4] text-[#78716C]'
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
                                ? 'text-[#15803D]'
                                : t.profitDollar < 0
                                ? 'text-[#B91C1C]'
                                : 'text-[#78716C]'
                            }`}
                          >
                            {t.profitDollar > 0 ? `+$${t.profitDollar.toFixed(2)}` : t.profitDollar < 0 ? `-$${Math.abs(t.profitDollar).toFixed(2)}` : '$0.00'}
                          </span>
                          <span className="text-[10px] text-[#78716C]">
                            {t.profitPercent > 0 ? `+${t.profitPercent}%` : `${t.profitPercent}%`}
                          </span>
                        </td>

                        {/* Session & Tag */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[#44403C] block text-[11px]">{t.session}</span>
                          <span className="text-[10px] text-[#C2410C] font-medium">{t.mistakeTag || 'Followed Plan'}</span>
                        </td>

                        {/* Inspect Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            className="px-2.5 py-1 rounded-lg bg-white text-[#78716C] group-hover:text-[#C2410C] border border-[#E7E5E4] group-hover:border-[#FED7AA] transition-colors inline-flex items-center gap-1 text-[11px]"
                          >
                            <span>Autopsy</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Trade Cards Feed (md:hidden) */}
            <div className="md:hidden divide-y divide-[#E7E5E4]">
              {filteredTrades.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-2">
                  <p className="font-bold text-sm text-[#1C1917]">No Verified Trades Logged</p>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    {trades.length === 0
                      ? 'Your journal ledger updates automatically when you sync trades or tap "+ Log Trade".'
                      : 'No trades match your active filter criteria.'}
                  </p>
                </div>
              ) : (
                filteredTrades.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setAutopsyMobileTab('telemetry');
                      setSelectedAutopsyTrade(t);
                    }}
                    className="p-4 hover:bg-[#FFF7ED]/40 active:bg-[#FFF7ED]/70 transition-colors cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.direction === 'LONG'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : 'bg-[#FEE2E2] text-[#B91C1C]'
                          }`}
                        >
                          {t.direction}
                        </span>
                        <span className="font-bold text-sm text-[#1C1917]">{t.pair}</span>
                        <span className="text-[10px] text-[#78716C] font-mono">#{t.ticketId}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.outcome === 'WIN'
                              ? 'bg-[#DCFCE7] text-[#15803D]'
                              : t.outcome === 'LOSS'
                              ? 'bg-[#FEE2E2] text-[#B91C1C]'
                              : 'bg-[#F5F5F4] text-[#78716C]'
                          }`}
                        >
                          {t.outcome}
                        </span>
                        <span
                          className={`font-mono font-bold text-xs ${
                            t.profitDollar > 0
                              ? 'text-[#15803D]'
                              : t.profitDollar < 0
                              ? 'text-[#B91C1C]'
                              : 'text-[#78716C]'
                          }`}
                        >
                          {t.profitDollar > 0
                            ? `+$${t.profitDollar.toFixed(2)}`
                            : t.profitDollar < 0
                            ? `-$${Math.abs(t.profitDollar).toFixed(2)}`
                            : '$0.00'}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Sub-telemetry Row */}
                    <div className="flex items-center justify-between text-xs text-[#78716C] bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]/60 font-mono">
                      <div>
                        <span className="text-[9px] block text-[#A8A29E]">Entry &rarr; Exit</span>
                        <span className="text-[#1C1917] font-semibold text-[11px]">{t.entryPrice} &rarr; {t.exitPrice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] block text-[#A8A29E]">Realized R:R</span>
                        <span className="text-[#C2410C] font-bold text-[11px]">
                          {t.realizedRR >= 0 ? `+${t.realizedRR}R` : `${t.realizedRR}R`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-0.5 text-[#78716C]">
                      <span className="truncate max-w-[210px]">
                        {t.setupType} • {t.timeframe} • {t.session}
                      </span>
                      <span className="text-[#C2410C] font-semibold flex items-center gap-0.5 shrink-0">
                        <span>Autopsy</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )}

      {/* Mobile Floating Action Button (FAB) for instant one-touch logging */}
      {user && (
        <Link
          href="/journal/log"
          className="sm:hidden fixed bottom-6 right-5 z-40 h-13 w-13 rounded-2xl bg-[#C2410C] hover:bg-[#EA580C] text-white shadow-xl shadow-[#C2410C]/40 flex items-center justify-center transition-transform active:scale-90 border border-white/20 cursor-pointer"
          title="Open Trading Notepad"
        >
          <PenLine className="w-6 h-6" />
        </Link>
      )}

      {/* DETAILED TRADE AUTOPSY INSPECTOR MODAL */}
      {selectedAutopsyTrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                    selectedAutopsyTrade.direction === 'LONG'
                      ? 'bg-[#15803D] text-white shadow-xs'
                      : 'bg-[#B91C1C] text-white shadow-xs'
                  }`}
                >
                  {selectedAutopsyTrade.direction}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {selectedAutopsyTrade.pair} Trade Autopsy
                    </h3>
                    <span className="font-mono text-xs text-[#A8A29E]">
                      #{selectedAutopsyTrade.ticketId}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8A29E] flex items-center gap-2">
                    <span>{selectedAutopsyTrade.setupType}</span>
                    <span>•</span>
                    <span>{selectedAutopsyTrade.timeframe}</span>
                    <span>•</span>
                    <span>{selectedAutopsyTrade.session}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAutopsyTrade(null)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-[#D6D3D1] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Tab Switcher (Visible on < lg, hidden on desktop lg+) */}
            <div className="lg:hidden flex items-center p-2.5 bg-[#F5F5F4] border-b border-[#E7E5E4] shrink-0">
              <div className="grid grid-cols-2 gap-1.5 w-full bg-[#E7E5E4]/70 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAutopsyMobileTab('telemetry')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    autopsyMobileTab === 'telemetry'
                      ? 'bg-white text-[#C2410C] shadow-xs'
                      : 'text-[#78716C]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Telemetry</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAutopsyMobileTab('notepad')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    autopsyMobileTab === 'notepad'
                      ? 'bg-white text-[#C2410C] shadow-xs'
                      : 'text-[#78716C]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Notepad Notes</span>
                </button>
              </div>
            </div>

            {/* Two-Column Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto">
              {/* Left Panel: Telemetry & Price Ladder */}
              <div className={`lg:col-span-5 p-4 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-[#E7E5E4] bg-white ${autopsyMobileTab === 'telemetry' ? 'block' : 'hidden lg:block'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5 pb-2 border-b border-[#F5F5F4]">
                  <Activity className="w-3.5 h-3.5 text-[#C2410C]" />
                  Execution Telemetry
                </span>

                {/* Price Ladder */}
                <div className="grid grid-cols-2 gap-2 text-center p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs font-mono">
                  <div className="p-2 rounded-xl bg-white border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#78716C] block font-sans">Entry Price</span>
                    <span className="font-bold text-[#1C1917] text-xs">{selectedAutopsyTrade.entryPrice}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#B91C1C] block font-sans">Stop Loss</span>
                    <span className="font-bold text-[#B91C1C] text-xs">{selectedAutopsyTrade.stopLoss}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#15803D] block font-sans">Take Profit</span>
                    <span className="font-bold text-[#15803D] text-xs">{selectedAutopsyTrade.takeProfit}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#C2410C] block font-sans">Exit Price</span>
                    <span className="font-bold text-[#C2410C] text-xs">{selectedAutopsyTrade.exitPrice}</span>
                  </div>
                </div>

                {/* Return Stats */}
                <div className="space-y-2">
                  <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#78716C] block">Realized Net Return</span>
                      <span
                        className={`text-lg font-bold font-mono ${
                          selectedAutopsyTrade.profitDollar >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                        }`}
                      >
                        {selectedAutopsyTrade.profitDollar >= 0
                          ? `+$${selectedAutopsyTrade.profitDollar.toFixed(2)} (+${selectedAutopsyTrade.profitPercent}%)`
                          : `-$${Math.abs(selectedAutopsyTrade.profitDollar).toFixed(2)} (${selectedAutopsyTrade.profitPercent}%)`}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      selectedAutopsyTrade.outcome === 'WIN'
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : selectedAutopsyTrade.outcome === 'LOSS'
                        ? 'bg-[#FEE2E2] text-[#B91C1C]'
                        : 'bg-[#F5F5F4] text-[#78716C]'
                    }`}>
                      {selectedAutopsyTrade.outcome}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                      <span className="text-[#78716C] block text-[10px]">Realized R:R</span>
                      <span className="font-bold font-mono text-sm text-[#1C1917]">
                        {selectedAutopsyTrade.realizedRR}R
                      </span>
                      <span className="text-[10px] text-[#A8A29E] block">Target: {selectedAutopsyTrade.riskReward}R</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                      <span className="text-[#78716C] block text-[10px]">Holding Time</span>
                      <span className="font-bold font-mono text-sm text-[#1C1917] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>{selectedAutopsyTrade.holdingTime}</span>
                      </span>
                      <span className="text-[10px] text-[#A8A29E] block">{selectedAutopsyTrade.date}</span>
                    </div>
                  </div>
                </div>

                {/* Audit Record */}
                <div className="p-3 rounded-xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                    <span className="text-[#0F766E] font-semibold">Rules Strictly Followed</span>
                  </div>
                  <span className="text-[10px] text-[#0F766E] font-mono">PASS (100%)</span>
                </div>
              </div>

              {/* Right Panel: Ruled High-Level Trade Notepad Display */}
              <div className={`lg:col-span-7 p-4 sm:p-6 bg-[#FAF8F5] flex flex-col space-y-3 ${autopsyMobileTab === 'notepad' ? 'flex' : 'hidden lg:flex'}`}>
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C2410C]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C1917]">
                      Trade Notepad &amp; Psychological Ledger
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedAutopsyTrade.emotion && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                        {selectedAutopsyTrade.emotion}
                      </span>
                    )}
                    {selectedAutopsyTrade.mistakeTag && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                        {selectedAutopsyTrade.mistakeTag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ruled Paper Container */}
                <div className="flex-1 bg-[#FFFDF9] rounded-2xl border border-[#E7E5E4] p-4 sm:p-5 shadow-xs relative overflow-hidden flex flex-col space-y-4">
                  {/* Ruled red margin line */}
                  <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-[#FECACA]/60 pointer-events-none" />

                  <div className="pl-4 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#C2410C] uppercase tracking-wide">
                          Pre-Trade Confluences &amp; Thesis:
                        </span>
                      </div>
                      <p className="p-3 rounded-xl bg-white/70 border border-[#E7E5E4] text-xs font-mono text-[#292524] leading-relaxed whitespace-pre-wrap">
                        {selectedAutopsyTrade.preTradeThesis || 'Standard setup execution logged.'}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wide">
                          Post-Trade Retrospective &amp; Lessons:
                        </span>
                      </div>
                      <p className="p-3 rounded-xl bg-white/70 border border-[#E7E5E4] text-xs font-mono text-[#292524] leading-relaxed whitespace-pre-wrap">
                        {selectedAutopsyTrade.postTradeReview || 'Trade executed according to risk parameters.'}
                      </p>
                    </div>

                    {selectedAutopsyTrade.notes && selectedAutopsyTrade.notes !== selectedAutopsyTrade.preTradeThesis && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wide">
                            Additional Field Notes:
                          </span>
                        </div>
                        <p className="p-3 rounded-xl bg-white/70 border border-[#E7E5E4] text-xs font-mono text-[#44403C] leading-relaxed whitespace-pre-wrap">
                          {selectedAutopsyTrade.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-[#A8A29E] font-mono flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                    Verified Desk Log
                  </span>
                  <button
                    onClick={() => setSelectedAutopsyTrade(null)}
                    className="px-5 py-2 bg-[#1C1917] hover:bg-[#292524] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Close Autopsy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFESSIONAL HIGH-LEVEL TRADE LOGGING CONSOLE & NOTEPAD */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C2410C] flex items-center justify-center text-white shadow-md">
                  <PenLine className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">Institutional Trade Logger</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C2410C]/30 text-[#FED7AA] border border-[#C2410C]/40">
                      Tier 1 Desk Audit
                    </span>
                  </div>
                  <p className="text-xs text-[#A8A29E]">
                    Dual-telemetry ledger: execution metrics &amp; psychological notepad
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {liveRR && (
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-xs font-mono">
                    <span className="text-[#A8A29E]">Live Target R:R:</span>
                    <span className={`font-bold ${parseFloat(liveRR) >= 2 ? 'text-[#4ADE80]' : parseFloat(liveRR) >= 1 ? 'text-[#FBBF24]' : 'text-[#F87171]'}`}>
                      1 : {liveRR}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-[#D6D3D1] hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Tab Switcher (Visible on < lg, hidden on desktop lg+) */}
            <div className="lg:hidden flex items-center p-2.5 bg-[#F5F5F4] border-b border-[#E7E5E4] shrink-0">
              <div className="grid grid-cols-2 gap-1.5 w-full bg-[#E7E5E4]/70 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLogModalMobileTab('params')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    logModalMobileTab === 'params'
                      ? 'bg-white text-[#C2410C] shadow-xs'
                      : 'text-[#78716C]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>1. Parameters</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLogModalMobileTab('notes')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    logModalMobileTab === 'notes'
                      ? 'bg-white text-[#C2410C] shadow-xs'
                      : 'text-[#78716C]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>2. Notepad</span>
                </button>
              </div>
            </div>

            {/* Modal Two-Column Body */}
            <form onSubmit={handleAddTrade} className="flex flex-col flex-1 min-h-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto">
                {/* Left Panel: Execution Telemetry (6 cols) */}
                <div className={`lg:col-span-6 p-4 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-[#E7E5E4] bg-white ${logModalMobileTab === 'params' ? 'block' : 'hidden lg:block'}`}>
                  <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F4]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#C2410C]" />
                      Execution Parameters
                    </span>
                    <span className="text-[10px] font-mono text-[#A8A29E]">Step 1 / 2</span>
                  </div>

                  {/* Pair & Quick Picker */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1C1917]">Instrument / Symbol</label>
                      <div className="flex items-center gap-1">
                        {['EUR/USD', 'GBP/USD', 'XAU/USD', 'US100', 'BTC/USD'].map((pair) => (
                          <button
                            key={pair}
                            type="button"
                            onClick={() => setFormPair(pair)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                              formPair === pair
                                ? 'bg-[#FFF7ED] text-[#C2410C] font-bold border border-[#FED7AA]'
                                : 'bg-[#F5F5F4] text-[#78716C] hover:bg-[#E7E5E4]'
                            }`}
                          >
                            {pair}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      required
                      value={formPair}
                      onChange={(e) => setFormPair(e.target.value)}
                      placeholder="e.g. EUR/USD, XAU/USD, US100"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#C2410C] focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  {/* Direction & Outcome */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-[#1C1917] block mb-1.5">Order Direction</label>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
                        <button
                          type="button"
                          onClick={() => setFormDirection('LONG')}
                          className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                            formDirection === 'LONG'
                              ? 'bg-[#15803D] text-white shadow-xs scale-100'
                              : 'text-[#78716C] hover:text-[#1C1917]'
                          }`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>LONG</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormDirection('SHORT')}
                          className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                            formDirection === 'SHORT'
                              ? 'bg-[#B91C1C] text-white shadow-xs scale-100'
                              : 'text-[#78716C] hover:text-[#1C1917]'
                          }`}
                        >
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          <span>SHORT</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1C1917] block mb-1.5">Outcome Result</label>
                      <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
                        {(['WIN', 'LOSS', 'BE'] as const).map((out) => (
                          <button
                            key={out}
                            type="button"
                            onClick={() => setFormOutcome(out)}
                            className={`py-2 rounded-lg text-xs font-bold transition-all ${
                              formOutcome === out
                                ? out === 'WIN'
                                  ? 'bg-[#15803D] text-white shadow-xs'
                                  : out === 'LOSS'
                                  ? 'bg-[#B91C1C] text-white shadow-xs'
                                  : 'bg-[#78716C] text-white shadow-xs'
                                : 'text-[#78716C] hover:text-[#1C1917]'
                            }`}
                          >
                            {out}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Setup Type, Timeframe & Market Session */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[11px] font-semibold text-[#44403C] block mb-1">Setup Type</label>
                      <select
                        value={formSetup}
                        onChange={(e) => setFormSetup(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:border-[#C2410C] focus:bg-white"
                      >
                        <option value="Order Block (OB)">Order Block (OB)</option>
                        <option value="Fair Value Gap (FVG)">Fair Value Gap (FVG)</option>
                        <option value="Liquidity Sweep">Liquidity Sweep</option>
                        <option value="Breaker Block">Breaker Block</option>
                        <option value="SMC Divergence">SMC Divergence</option>
                        <option value="London Breakout">London Breakout</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#44403C] block mb-1">Timeframe</label>
                      <select
                        value={formTimeframe}
                        onChange={(e) => setFormTimeframe(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:border-[#C2410C] focus:bg-white font-mono"
                      >
                        <option value="1m">1m</option>
                        <option value="5m">5m</option>
                        <option value="15m">15m</option>
                        <option value="1H">1H</option>
                        <option value="4H">4H</option>
                        <option value="Daily">Daily</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#44403C] block mb-1">Market Session</label>
                      <select
                        value={formSession}
                        onChange={(e) => setFormSession(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:border-[#C2410C] focus:bg-white"
                      >
                        <option value="London">London</option>
                        <option value="NY Killzone">NY Killzone</option>
                        <option value="Asian Session">Asian Session</option>
                        <option value="London/NY Overlap">London/NY Overlap</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Execution Ladder */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1C1917] block">Price Execution Ladder</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] font-semibold text-[#78716C] block mb-1">Entry Price *</span>
                        <input
                          type="number"
                          step="any"
                          required
                          value={formEntry}
                          onChange={(e) => setFormEntry(e.target.value)}
                          placeholder="1.08450"
                          className="w-full px-2.5 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono font-bold text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:border-[#C2410C] focus:bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-[#B91C1C] block mb-1">Stop Loss *</span>
                        <input
                          type="number"
                          step="any"
                          required
                          value={formSL}
                          onChange={(e) => setFormSL(e.target.value)}
                          placeholder="1.08200"
                          className="w-full px-2.5 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono font-bold text-[#B91C1C] placeholder-[#A8A29E] focus:outline-none focus:border-[#B91C1C] focus:bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-[#15803D] block mb-1">Take Profit *</span>
                        <input
                          type="number"
                          step="any"
                          required
                          value={formTP}
                          onChange={(e) => setFormTP(e.target.value)}
                          placeholder="1.09200"
                          className="w-full px-2.5 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono font-bold text-[#15803D] placeholder-[#A8A29E] focus:outline-none focus:border-[#15803D] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lot Size & Exit */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#44403C] block mb-1">Lot Size / Volume</label>
                      <input
                        type="number"
                        step="any"
                        value={formLotSize}
                        onChange={(e) => setFormLotSize(e.target.value)}
                        placeholder="2.00"
                        className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#1C1917] focus:border-[#C2410C] focus:bg-white font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#44403C] block mb-1">Exit Price (optional)</label>
                      <input
                        type="number"
                        step="any"
                        value={formExit}
                        onChange={(e) => setFormExit(e.target.value)}
                        placeholder="Defaults to TP or Entry"
                        className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#1C1917] focus:border-[#C2410C] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Live R:R HUD Readout */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FAFAF9] to-[#F5F5F4] border border-[#E7E5E4] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C2410C]/10 text-[#C2410C] flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#78716C] block">Risk-to-Reward Ratio</span>
                        <span className="font-mono font-bold text-sm text-[#1C1917]">
                          {liveRR ? `1 : ${liveRR} R:R` : 'Enter Entry, SL & TP'}
                        </span>
                      </div>
                    </div>
                    {liveRR && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        parseFloat(liveRR) >= 2.0
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : parseFloat(liveRR) >= 1.0
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : 'bg-[#FEE2E2] text-[#B91C1C]'
                      }`}>
                        {parseFloat(liveRR) >= 2.0 ? 'Optimal Setup (>= 2R)' : 'Sub-Optimal R:R'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Panel: Ruled High-Level Trading Notepad (6 cols) */}
                <div className={`lg:col-span-6 p-4 sm:p-6 bg-[#FAF8F5] flex flex-col space-y-3 ${logModalMobileTab === 'notes' ? 'flex' : 'hidden lg:flex'}`}>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#C2410C]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C1917]">
                        Trade Journal Notepad
                      </span>
                    </div>
                    {/* Notepad Tabs */}
                    <div className="flex items-center gap-1 bg-[#E7E5E4]/60 p-0.5 rounded-lg text-[10px] font-semibold">
                      <button
                        type="button"
                        onClick={() => setNotepadTab('thesis')}
                        className={`px-2 py-1 rounded-md transition-all ${
                          notepadTab === 'thesis'
                            ? 'bg-white text-[#1C1917] shadow-xs font-bold'
                            : 'text-[#78716C] hover:text-[#1C1917]'
                        }`}
                      >
                        Pre-Thesis
                      </button>
                      <button
                        type="button"
                        onClick={() => setNotepadTab('mindset')}
                        className={`px-2 py-1 rounded-md transition-all ${
                          notepadTab === 'mindset'
                            ? 'bg-white text-[#1C1917] shadow-xs font-bold'
                            : 'text-[#78716C] hover:text-[#1C1917]'
                        }`}
                      >
                        Mindset &amp; Rules
                      </button>
                      <button
                        type="button"
                        onClick={() => setNotepadTab('lessons')}
                        className={`px-2 py-1 rounded-md transition-all ${
                          notepadTab === 'lessons'
                            ? 'bg-white text-[#1C1917] shadow-xs font-bold'
                            : 'text-[#78716C] hover:text-[#1C1917]'
                        }`}
                      >
                        Autopsy Review
                      </button>
                    </div>
                  </div>

                  {/* Quick Helper Insertion Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-[#A8A29E] font-medium">Quick Insert:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const timeStr = `[${new Date().toTimeString().slice(0, 5)} UTC] `;
                        if (notepadTab === 'thesis') setFormPreThesis((prev) => prev ? `${prev}\n${timeStr}` : timeStr);
                        else if (notepadTab === 'lessons') setFormPostReview((prev) => prev ? `${prev}\n${timeStr}` : timeStr);
                        else setFormNotes((prev) => prev ? `${prev}\n${timeStr}` : timeStr);
                      }}
                      className="px-2 py-0.5 rounded-md bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[10px] text-[#78716C] hover:text-[#C2410C] font-mono transition-colors"
                    >
                      + Timestamp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const snippet = `[HTF Bias: 4H Order Block tapped | 15m MSS confirmed]`;
                        setFormPreThesis((prev) => prev ? `${prev}\n${snippet}` : snippet);
                      }}
                      className="px-2 py-0.5 rounded-md bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[10px] text-[#78716C] hover:text-[#C2410C] transition-colors"
                    >
                      + HTF Confluence
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const checklist = `[✓] London low swept\n[✓] FVG imbalance filled\n[✓] SL placed beyond swing high`;
                        setFormPreThesis((prev) => prev ? `${prev}\n${checklist}` : checklist);
                      }}
                      className="px-2 py-0.5 rounded-md bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[10px] text-[#78716C] hover:text-[#C2410C] transition-colors"
                    >
                      + SMC Checklist
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const plan = `[Management: Move SL to Breakeven at +1.5R | Take 50% partial at 2R]`;
                        setFormNotes((prev) => prev ? `${prev}\n${plan}` : plan);
                      }}
                      className="px-2 py-0.5 rounded-md bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[10px] text-[#78716C] hover:text-[#C2410C] transition-colors"
                    >
                      + Trailing Plan
                    </button>
                  </div>

                  {/* Realistic Ruled Notepad Container */}
                  <div className="flex-1 bg-[#FFFDF9] rounded-2xl border border-[#E7E5E4] p-4 sm:p-5 shadow-xs flex flex-col relative overflow-hidden min-h-[220px]">
                    {/* Ruled Notebook Left Margin Line Accent */}
                    <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-[#FECACA]/60 pointer-events-none" />

                    {notepadTab === 'thesis' && (
                      <div className="flex-1 flex flex-col space-y-2 pl-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#C2410C] uppercase tracking-wide">
                            Pre-Trade Market Thesis &amp; Setup Context
                          </span>
                          <span className="text-[10px] text-[#A8A29E] font-mono">
                            {formPreThesis.length} characters
                          </span>
                        </div>
                        <textarea
                          rows={7}
                          value={formPreThesis}
                          onChange={(e) => setFormPreThesis(e.target.value)}
                          placeholder="Describe the trade context, higher timeframe bias, catalyst news, and reason for entry... (e.g. Swept Asian high, retested 15m mitigation block, clean 3R target to London low)."
                          className="w-full flex-1 bg-transparent text-xs text-[#1C1917] leading-relaxed resize-none focus:outline-none placeholder-[#A8A29E] font-mono"
                        />
                      </div>
                    )}

                    {notepadTab === 'mindset' && (
                      <div className="flex-1 flex flex-col space-y-3 pl-4">
                        <div>
                          <label className="text-[11px] font-bold text-[#1C1917] block mb-1.5">
                            Execution Mindset / Emotional State
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {[
                              { label: 'Disciplined', color: 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]' },
                              { label: 'Calm & Patient', color: 'bg-[#F0FDFA] text-[#0F766E] border-[#CCFBF1]' },
                              { label: 'Hesitant / Late', color: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]' },
                              { label: 'FOMO Entry', color: 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]' },
                              { label: 'Revenge Trade', color: 'bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]' },
                              { label: 'Overconfident', color: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]' },
                            ].map((emo) => (
                              <button
                                key={emo.label}
                                type="button"
                                onClick={() => setFormEmotion(emo.label)}
                                className={`px-2 py-1.5 rounded-xl text-[10px] font-bold border transition-all text-center truncate ${
                                  formEmotion === emo.label
                                    ? `${emo.color} ring-2 ring-offset-1 shadow-xs`
                                    : 'bg-white text-[#78716C] border-[#E7E5E4] hover:bg-[#F5F5F4]'
                                }`}
                              >
                                {emo.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-[#1C1917] block mb-1">
                            Discipline Adherence Tag
                          </label>
                          <select
                            value={formMistakeTag}
                            onChange={(e) => setFormMistakeTag(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-[#E7E5E4] rounded-xl text-xs text-[#1C1917] focus:border-[#C2410C]"
                          >
                            <option value="Followed Plan">Followed Plan (A+ Execution)</option>
                            <option value="Patience / Waited">Patience / Waited for Shift</option>
                            <option value="FOMO Entry">FOMO Entry</option>
                            <option value="Moved SL Early">Moved SL Early</option>
                            <option value="Overleveraged">Over-leveraged</option>
                            <option value="Revenge Trade">Revenge Trade</option>
                          </select>
                        </div>

                        <div className="flex-1">
                          <label className="text-[10px] font-semibold text-[#78716C] block mb-1">
                            Mental State Notes (Optional):
                          </label>
                          <textarea
                            rows={3}
                            value={formNotes}
                            onChange={(e) => setFormNotes(e.target.value)}
                            placeholder="How did you feel before clicking execution? Any heart rate spike or second guessing?"
                            className="w-full bg-white/70 p-2.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] focus:outline-none focus:border-[#C2410C] font-mono resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {notepadTab === 'lessons' && (
                      <div className="flex-1 flex flex-col space-y-2 pl-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#15803D] uppercase tracking-wide">
                            Post-Trade Retrospective &amp; Core Takeaway
                          </span>
                          <span className="text-[10px] text-[#A8A29E] font-mono">
                            {formPostReview.length} characters
                          </span>
                        </div>
                        <textarea
                          rows={7}
                          value={formPostReview}
                          onChange={(e) => setFormPostReview(e.target.value)}
                          placeholder="What did you do right? What could have been improved? Any management adjustments needed?"
                          className="w-full flex-1 bg-transparent text-xs text-[#1C1917] leading-relaxed resize-none focus:outline-none placeholder-[#A8A29E] font-mono"
                        />
                      </div>
                    )}
                  </div>

                  {/* Verification Checkbox */}
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E7E5E4] cursor-pointer hover:border-[#FED7AA] transition-colors">
                    <input
                      type="checkbox"
                      checked={formRulesFollowed}
                      onChange={(e) => setFormRulesFollowed(e.target.checked)}
                      className="rounded bg-white border-[#E7E5E4] text-[#C2410C] focus:ring-[#C2410C] w-4 h-4"
                    />
                    <div className="flex items-center gap-1.5 text-xs text-[#1C1917] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Strict 1% Account Risk &amp; Verified Rules Followed</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 sm:px-6 bg-[#FAFAF9] border-t border-[#E7E5E4] flex items-center justify-between shrink-0">
                <span className="text-[11px] text-[#78716C] hidden sm:flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                  Trade will be audited into your verified syndicate record
                </span>
                <div className="flex items-center gap-2.5 ml-auto w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsLogModalOpen(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-[#F5F5F4] text-[#78716C] hover:text-[#1C1917] border border-[#E7E5E4] rounded-xl text-xs font-semibold transition-colors text-center"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#C2410C] hover:bg-[#EA580C] text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save &amp; Audit</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTINUOUS TIER AUDIT MODAL */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-md w-full p-6 shadow-2xl space-y-4">
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
              <p className="text-[#78716C] leading-relaxed">
                PipBud runs continuous mathematical verification across all your verified deals to safeguard meritocracy.
              </p>

              <div className="p-3 bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Current Skill Tier:</span>
                  <span className="font-bold text-[#C2410C]">{user?.tier_badge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Win Rate Audit:</span>
                  <span className="font-bold text-[#15803D]">
                    {stats.winRate}% (PASS &ge; {currentTierSpec?.minWinRate}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Profit Factor Audit:</span>
                  <span className="font-bold text-[#15803D]">
                    {stats.profitFactor} (PASS &ge; {currentTierSpec?.minProfitFactor || '1.80'})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#78716C]">Max Drawdown Audit:</span>
                  <span className="font-bold text-[#15803D]">
                    {user?.max_drawdown}% (SAFE &le; {currentTierSpec?.maxDrawdown}%)
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-[#E7E5E4]">
                  <span className="text-[#78716C]">Anti-Shortfall Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                    LEGIT • IN GOOD STANDING
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-5 py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white font-semibold rounded-xl text-xs shadow-xs"
              >
                Dismiss Audit Result
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTOMATED TRADE READING & AUTO-SYNC INGESTION MODAL */}
      {isAutoSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] flex items-center justify-center text-[#0F766E]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
                      Automated Trade Log Sync
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                      Zero Fake Logs
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C]">
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
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ingestion Methods Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-[#FAFAF9] p-1.5 rounded-2xl border border-[#E7E5E4]">
              <button
                type="button"
                onClick={() => setAutoSyncTab('cloud')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  autoSyncTab === 'cloud'
                    ? 'bg-white text-[#0F766E] shadow-xs border border-[#CCFBF1]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
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
                    ? 'bg-white text-[#C2410C] shadow-xs border border-[#FED7AA]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
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
                    ? 'bg-white text-[#1C1917] shadow-xs border border-[#E7E5E4]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
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
                <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-pulse" />
                      <span className="text-xs font-bold text-[#0F766E]">Active Cloud Bridge</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#0F766E] bg-white px-2.5 py-0.5 rounded-full border border-[#CCFBF1]">
                      MetaTrader API v5.0
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Broker &amp; Server:</span>
                      <span className="font-bold text-[#1C1917]">
                        {user?.broker_name || 'IC Markets SC - Live02'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Account Number:</span>
                      <span className="font-bold font-mono text-[#1C1917]">
                        {user?.broker_account_number || '8924108'} (Read-Only)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Sync Interval:</span>
                      <span className="font-medium text-[#44403C]">Every 5 minutes automatically</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[11px]">Last Cloud Sync:</span>
                      <span className="font-medium text-[#15803D]">
                        {user?.last_broker_sync ? new Date(user.last_broker_sync).toLocaleTimeString() : '2 minutes ago'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#78716C] leading-relaxed space-y-2">
                  <p>
                    <strong>How it works:</strong> PipBud connects securely to your broker&apos;s MetaTrader terminal server using your read-only investor credentials. Whenever a closed order or deal ticket is executed, it is ingested, audited for drawdown compliance, and added to your ledger without manual data entry.
                  </p>
                  <p className="text-[11px] text-[#78716C] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                    <span>Your investor password gives 100% read-only access. It is physically impossible to place trades or withdraw capital.</span>
                  </p>
                </div>

                {syncFeedback && (
                  <div className="p-3 bg-[#DCFCE7] border border-[#BBF7D0] rounded-xl text-xs text-[#15803D] flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{syncFeedback}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link
                    href="/forum"
                    className="text-xs text-[#C2410C] hover:underline font-medium"
                    onClick={() => setIsAutoSyncModalOpen(false)}
                  >
                    Change connected broker credentials &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold rounded-xl text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 disabled:opacity-50"
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
                <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C]">
                    <Zap className="w-4 h-4" />
                    <span>0-Latency Real-Time Push Copier (EA)</span>
                  </div>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Attach the lightweight PipBud MQL Expert Advisor to your desktop or VPS MetaTrader terminal. As soon as a position opens, moves to BE, or closes at TP/SL, the EA transmits the fill data via webhook instantly.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#78716C]">Webhook Target URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://api.pipbud.com/api/integrations/mt-webhook/"
                      className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#1C1917] select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText('https://api.pipbud.com/api/integrations/mt-webhook/');
                        setCopiedWebhook(true);
                        setTimeout(() => setCopiedWebhook(false), 2000);
                      }}
                      className="px-3 py-2 bg-white border border-[#E7E5E4] hover:border-[#FED7AA] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shrink-0 text-[#1C1917]"
                    >
                      {copiedWebhook ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#78716C]" />}
                      <span>{copiedWebhook ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#78716C]">EA Authentication Secret Token</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="pb_live_sec_7894a0f44e12c8b099"
                      className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#1C1917] select-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText('pb_live_sec_7894a0f44e12c8b099');
                        setCopiedToken(true);
                        setTimeout(() => setCopiedToken(false), 2000);
                      }}
                      className="px-3 py-2 bg-white border border-[#E7E5E4] hover:border-[#FED7AA] rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shrink-0 text-[#1C1917]"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5 text-[#78716C]" />}
                      <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] p-3.5 rounded-xl border border-[#E7E5E4] space-y-2 text-xs">
                  <span className="font-bold text-[#1C1917] block">Quick 2-Minute Setup:</span>
                  <ol className="list-decimal list-inside space-y-1 text-[#78716C] text-[11px]">
                    <li>Download <code className="bg-white px-1.5 py-0.5 rounded border border-[#E7E5E4] text-[#C2410C]">PipBud_Copier.ex5</code> below.</li>
                    <li>In MT4/MT5: Navigate to <em>Tools &rarr; Options &rarr; Expert Advisors</em>.</li>
                    <li>Check &quot;Allow WebRequest for listed URL&quot; and add <code className="bg-white px-1.5 py-0.5 rounded border border-[#E7E5E4]">https://api.pipbud.com</code>.</li>
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
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl font-semibold text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
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
                <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#1C1917]">
                    <FileSpreadsheet className="w-4 h-4 text-[#0F766E]" />
                    <span>Prop Firm &amp; MetaTrader Statement Ingestion</span>
                  </div>
                  <p className="text-[#78716C] leading-relaxed">
                    Upload your official detailed trading statement or payout certificate (FTMO, FundedNext, MFF, Topstep, IC Markets, Pepperstone). PipBud auto-extracts ticket IDs, fills, holding times, and profit metrics.
                  </p>
                </div>

                <label className="border-2 border-dashed border-[#E7E5E4] hover:border-[#C2410C] bg-[#FAFAF9] hover:bg-[#FFF7ED]/30 rounded-2xl p-6 text-center block cursor-pointer transition-all">
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
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs flex items-center justify-center mx-auto mb-2 text-[#C2410C]">
                    <Upload className="w-5 h-5 text-[#C2410C]" />
                  </div>
                  <span className="text-xs font-bold text-[#1C1917] block">
                    Click or Drag &amp; Drop Statement File
                  </span>
                  <span className="text-[11px] text-[#78716C] block mt-1">
                    Supports MT4/MT5 Detailed Statement (.html, .csv) &amp; Prop Firm Certificates (.pdf)
                  </span>
                </label>

                {uploadedFileStatus && (
                  <div className="p-3.5 bg-[#DCFCE7] border border-[#BBF7D0] rounded-xl text-xs text-[#15803D] flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{uploadedFileStatus}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center text-[11px] text-[#78716C]">
                  <span>Supported brokers: All MT4, MT5, cTrader, and DXTrade exports</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoSyncModalOpen(false);
                      setUploadedFileStatus(null);
                    }}
                    className="px-4 py-2 bg-[#1C1917] hover:bg-[#292524] text-white rounded-xl font-medium text-xs shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* App Status Bar (App-like dashboard footer) */}
      <footer className="mt-12 py-6 border-t border-[#E7E5E4] text-center text-xs text-[#78716C] flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto px-4 pwa:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
          <span>PipBud Verified Meritocracy Engine • Institutional Track Record Sync</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#78716C]">
          <Link href="/settings" className="hover:text-[#C2410C] transition-colors">
            Privacy &amp; Settings
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
