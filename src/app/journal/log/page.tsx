'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth, getApiBase } from '@/context/AuthContext';
import {
  ArrowLeft,
  PenLine,
  Save,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Camera,
  Image as ImageIcon,
  Trash2,
  Maximize2,
  X,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  CheckSquare,
  Quote,
  Code,
  Clock,
  ShieldCheck,
  Zap,
  Tag,
  Smile,
  Frown,
  Check,
  ChevronDown,
  Mic,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Eye,
  Star,
  Bookmark,
  Share2,
  Layers,
  Activity,
  Flame,
  Volume2
} from 'lucide-react';

interface ChartAttachment {
  id: string;
  url: string;
  caption: string;
  type: 'htf' | 'trigger' | 'exit' | 'general';
}

const COMMON_PAIRS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'XAU/USD',
  'BTC/USD',
  'NAS100',
  'US30',
  'AUD/USD',
  'USD/CAD',
  'GBP/JPY'
];

const SETUP_ARCHETYPES = [
  'Liquidity Sweep (BSL/SSL)',
  'Order Block (OB)',
  'Fair Value Gap (FVG)',
  'Breaker Block',
  'Silver Bullet',
  'Asian Range Expansion',
  'ICT Killzone Reversal',
  'Trend Continuation',
  'Supply / Demand Flip',
  'Break & Retest'
];

const TIMEFRAMES = ['1m', '3m', '5m', '15m', '1h', '4h', 'Daily'];
const SESSIONS = ['London Open', 'NY AM Killzone', 'NY PM Close', 'Asian Session', 'London / NY Overlap'];

// Apple Journal Reflection Prompts
const APPLE_JOURNAL_PROMPTS = [
  'What was your dominant emotion before you pulled the trigger today?',
  'Did you wait for your trigger confirmation to fully print, or was there an urge to jump in early?',
  'How did you handle the period when price retraced into drawdown?',
  'What high-timeframe liquidity pool or imbalance gave you the conviction to risk capital?',
  'If you could replay this exact trade execution 100 times, would it make money long-term?',
  'What did this trade teach you about your patience and emotional discipline today?',
  'Did you adhere to your pre-defined position sizing and max stop-loss without second-guessing?',
  'What was the primary macro or session narrative driving this price delivery?',
  'Reflect on the decision to take profit: was it based on a plan or fear of giving back gains?'
];

// Apple Health / Journal State of Mind
interface StateOfMindOption {
  label: string;
  category: 'Very Pleasant' | 'Pleasant' | 'Neutral' | 'Slightly Unpleasant' | 'Unpleasant';
  color: string;
  bgGrad: string;
  ringColor: string;
  tone: 'positive' | 'neutral' | 'warning' | 'negative';
  description: string;
}

const STATE_OF_MIND_OPTIONS: StateOfMindOption[] = [
  {
    label: 'Disciplined & Grounded',
    category: 'Very Pleasant',
    color: '#15803D',
    bgGrad: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    ringColor: '#10B981',
    tone: 'positive',
    description: 'Executed strictly to rules without hesitation or fear.'
  },
  {
    label: 'Calm & Patient',
    category: 'Pleasant',
    color: '#0F766E',
    bgGrad: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    ringColor: '#14B8A6',
    tone: 'positive',
    description: 'Waited for all high-probability confluence to align.'
  },
  {
    label: 'Flow State',
    category: 'Very Pleasant',
    color: '#4338CA',
    bgGrad: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    ringColor: '#6366F1',
    tone: 'positive',
    description: 'Complete detachment from outcome, effortless execution.'
  },
  {
    label: 'Observant & Neutral',
    category: 'Neutral',
    color: '#475569',
    bgGrad: 'from-slate-500/20 via-gray-500/10 to-transparent',
    ringColor: '#94A3B8',
    tone: 'neutral',
    description: 'Monitored tape objectively without emotional bias.'
  },
  {
    label: 'Hesitant / Fearful',
    category: 'Slightly Unpleasant',
    color: '#D97706',
    bgGrad: 'from-amber-500/20 via-orange-500/10 to-transparent',
    ringColor: '#F59E0B',
    tone: 'warning',
    description: 'Second-guessed setup and entered late due to doubt.'
  },
  {
    label: 'FOMO Impulse',
    category: 'Unpleasant',
    color: '#DC2626',
    bgGrad: 'from-rose-500/20 via-red-500/10 to-transparent',
    ringColor: '#EF4444',
    tone: 'negative',
    description: 'Chased candles after price already expanded.'
  },
  {
    label: 'Overleveraged / Greedy',
    category: 'Unpleasant',
    color: '#B91C1C',
    bgGrad: 'from-red-600/20 via-orange-500/10 to-transparent',
    ringColor: '#DC2626',
    tone: 'negative',
    description: 'Risked higher percentage than authorized by trading plan.'
  },
  {
    label: 'Revenge Urge',
    category: 'Unpleasant',
    color: '#991B1B',
    bgGrad: 'from-rose-700/20 via-red-900/10 to-transparent',
    ringColor: '#B91C1C',
    tone: 'negative',
    description: 'Entered immediately to recover previous loss.'
  }
];

function LogTradeNotepadContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingTradeId = searchParams?.get('tradeId');
  const { user } = useAuth();

  // Primary Blotter State
  const [pair, setPair] = useState('EUR/USD');
  const [customPair, setCustomPair] = useState('');
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [setupType, setSetupType] = useState('Order Block (OB)');
  const [timeframe, setTimeframe] = useState('15m');
  const [session, setSession] = useState('London Open');
  const [tradePlatform, setTradePlatform] = useState<string>('Manual');

  // Price & Risk Engine
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [lotSize, setLotSize] = useState('1.00');
  const [outcome, setOutcome] = useState<'WIN' | 'LOSS' | 'BE'>('WIN');
  const [profitPercentInput, setProfitPercentInput] = useState('');

  // Apple Journal Reflection & State of Mind
  const [selectedStateOfMind, setSelectedStateOfMind] = useState<StateOfMindOption>(STATE_OF_MIND_OPTIONS[0]);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [rulesFollowed, setRulesFollowed] = useState(true);

  // View Mode: 'editor' vs 'preview' (Apple Journal card preview)
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');

  // Voice Thought Memo Simulator
  const [hasVoiceMemo, setHasVoiceMemo] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Notepad Document Body
  const [tradeTitle, setTradeTitle] = useState('London Open Liquidity Sweep + 15m FVG Displacement');
  const [activeNoteSection, setActiveNoteSection] = useState<'thesis' | 'psychology' | 'autopsy'>('thesis');
  const [preTradeThesis, setPreTradeThesis] = useState(
    '### 1. Market Context & HTF Order Flow\n- 4H Trend: Bullish expansion from discount array.\n- Previous Day High (PDH) targeted as liquidity pool.\n\n### 2. Execution Triggers\n- London Open swept Asian Session Lows at 07:15 GMT.\n- 5m Market Structure Shift (MSS) confirmed with high displacement.\n- Entered on 50% equilibrium retest of 15m Fair Value Gap (FVG).'
  );
  const [inTradePsychology, setInTradePsychology] = useState(
    '### In-Trade Mindset & Emotional State\n- Felt calm during initial 10-pip drawdown as stop loss was placed safely below the swing invalidation point.\n- No urge to micromanage or move SL prematurely to breakeven before TP1 hit.'
  );
  const [postTradeAutopsy, setPostTradeAutopsy] = useState(
    '### Autopsy & Key Lessons\n- Trade hit full TP target smoothly.\n- Lesson: Trusting the 15m FVG fill rather than chasing the 1m displacement provided a cleaner 1:3.2 risk/reward ratio.'
  );

  // Chart Attachments
  const [attachments, setAttachments] = useState<ChartAttachment[]>([]);
  const [activeLightbox, setActiveLightbox] = useState<ChartAttachment | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);

  // Pre-fill existing trade if tradeId is present in query parameters (e.g. from Telegram bot or ledger)
  useEffect(() => {
    if (!existingTradeId) return;
    async function loadTrade() {
      setIsLoadingExisting(true);
      try {
        const apiBase = getApiBase();
        const res = await fetch(`${apiBase}/api/journal/trades/${existingTradeId}/`);
        if (res.ok) {
          const data = await res.json();
          const t = data.trade;
          if (t) {
            if (t.pair) setPair(t.pair);
            if (t.direction) setDirection(t.direction);
            if (t.setup_type) setSetupType(t.setup_type);
            if (t.entry_price) setEntryPrice(String(t.entry_price));
            if (t.stop_loss) setStopLoss(String(t.stop_loss));
            if (t.take_profit) setTakeProfit(String(t.take_profit));
            if (t.outcome) setOutcome(t.outcome);
            if (t.timeframe) setTimeframe(t.timeframe);
            if (t.session) setSession(t.session);
            if (t.platform) setTradePlatform(t.platform);
            if (t.notes) {
              setPreTradeThesis(t.notes);
            }
            if (t.outcome_notes) {
              setPostTradeAutopsy(t.outcome_notes);
            }
            if (t.screenshot_url) {
              setAttachments([
                {
                  id: 'initial',
                  url: t.screenshot_url,
                  caption: `${t.pair} Execution Chart`,
                  type: 'general',
                },
              ]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load trade:', err);
      } finally {
        setIsLoadingExisting(false);
      }
    }
    loadTrade();
  }, [existingTradeId]);

  // Active Textarea Reference for formatting injection
  const thesisRef = useRef<HTMLTextAreaElement>(null);
  const psychRef = useRef<HTMLTextAreaElement>(null);
  const autopsyRef = useRef<HTMLTextAreaElement>(null);

  // Live Risk/Reward Engine
  const liveRR = useMemo(() => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);
    if (!entry || !sl || !tp) return null;
    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    if (risk === 0) return null;
    return parseFloat((reward / risk).toFixed(2));
  }, [entryPrice, stopLoss, takeProfit]);

  // Projected or Realized P&L
  const computedPLPercent = useMemo(() => {
    if (profitPercentInput.trim() !== '') {
      const p = parseFloat(profitPercentInput);
      return isNaN(p) ? 0 : p;
    }
    if (outcome === 'WIN') {
      return liveRR ? liveRR : 2.5;
    }
    if (outcome === 'LOSS') {
      return -1.0;
    }
    return 0.0;
  }, [profitPercentInput, outcome, liveRR]);

  const computedPLDollar = useMemo(() => {
    return computedPLPercent * 100;
  }, [computedPLPercent]);

  // Voice Note Timer Logic
  const handleToggleVoiceRecord = () => {
    if (isRecordingVoice) {
      // Stop recording
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setIsRecordingVoice(false);
      setHasVoiceMemo(true);
    } else {
      // Start recording
      setIsRecordingVoice(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleTogglePlayVoice = () => {
    setIsPlayingVoice(!isPlayingVoice);
  };

  const handleDeleteVoice = () => {
    setHasVoiceMemo(false);
    setIsPlayingVoice(false);
    setRecordingSeconds(0);
  };

  // Next reflection prompt
  const handleShufflePrompt = () => {
    setActivePromptIndex((prev) => (prev + 1) % APPLE_JOURNAL_PROMPTS.length);
  };

  const handleInsertCurrentPrompt = () => {
    const promptText = `\n> **Reflection:** ${APPLE_JOURNAL_PROMPTS[activePromptIndex]}\n`;
    insertFormatting(promptText, '');
  };

  // Handle Clipboard Paste for instant screenshots
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = Array.from(e.clipboardData.items);
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                const newAtt: ChartAttachment = {
                  id: Date.now().toString(),
                  url: event.target.result as string,
                  caption: 'Pasted TradingView Screenshot',
                  type: 'trigger'
                };
                setAttachments((prev) => [...prev, newAtt]);
              }
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Textarea formatter utility
  const insertFormatting = (prefix: string, suffix: string = '') => {
    let currentRef: HTMLTextAreaElement | null = null;
    let text = '';
    let setText: React.Dispatch<React.SetStateAction<string>> | null = null;

    if (activeNoteSection === 'thesis') {
      currentRef = thesisRef.current;
      text = preTradeThesis;
      setText = setPreTradeThesis;
    } else if (activeNoteSection === 'psychology') {
      currentRef = psychRef.current;
      text = inTradePsychology;
      setText = setInTradePsychology;
    } else {
      currentRef = autopsyRef.current;
      text = postTradeAutopsy;
      setText = setPostTradeAutopsy;
    }

    if (!currentRef || !setText) return;

    const start = currentRef.selectionStart;
    const end = currentRef.selectionEnd;
    const selectedText = text.substring(start, end);
    const replacement = prefix + (selectedText || 'text') + suffix;
    const newText = text.substring(0, start) + replacement + text.substring(end);

    setText(newText);

    setTimeout(() => {
      currentRef?.focus();
      currentRef?.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || 4));
    }, 10);
  };

  // Helper insertions
  const insertHelperSnippet = (type: 'timestamp' | 'checklist' | 'htf' | 'trailing') => {
    const timestampStr = `[${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} • ${session}]`;
    let snippet = '';

    switch (type) {
      case 'timestamp':
        snippet = `\n**Timestamp:** ${timestampStr}\n`;
        break;
      case 'checklist':
        snippet = `\n### Execution Confluence Checklist\n- [x] HTF Directional Bias Confirmed\n- [x] Key Liquidity Pool Swept\n- [x] Market Structure Shift (MSS) on Trigger Timeframe\n- [x] Imbalance / Fair Value Gap Entry\n- [x] Clear Invalidation Level & Defined Risk\n`;
        break;
      case 'htf':
        snippet = `\n### Higher Timeframe Framework (4H / Daily)\n- Primary Bias: Bullish expansion\n- Key Levels: Asian High, Daily Open, 4H Order Block\n`;
        break;
      case 'trailing':
        snippet = `\n### Risk & Trailing Plan\n- Partial TP1 at 1:2 R:R (50% position closed)\n- Move Stop Loss to Breakeven (+0.5 pips)\n- Trail remaining 50% behind recent swing lows\n`;
        break;
    }

    insertFormatting(snippet, '');
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAtt: ChartAttachment = {
            id: `${Date.now()}-${Math.random()}`,
            url: event.target.result as string,
            caption: file.name.replace(/\.[^/.]+$/, ''),
            type: 'trigger'
          };
          setAttachments((prev) => [...prev, newAtt]);
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Submit Trade & Audit into Journal
  const handleSaveAndAudit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const activePair = customPair.trim() ? customPair.toUpperCase().trim() : pair;
    const primaryChartUrl = attachments[0]?.url || '';

    // Synthesize structured markdown notes
    const consolidatedNotes = [
      `# ${tradeTitle}`,
      `**Session:** ${session} | **Timeframe:** ${timeframe} | **Lot Size:** ${lotSize}`,
      `**State of Mind:** ${selectedStateOfMind.label} (${selectedStateOfMind.category})`,
      `**Discipline Audit:** ${rulesFollowed ? '100% Rule Compliance' : 'Rule Deviation Logged'}`,
      hasVoiceMemo ? `**Attached Voice Memo:** In-Trade Commentary (0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds || 38})` : '',
      '',
      '---',
      '## Pre-Trade Thesis & Market Narrative',
      preTradeThesis,
      '',
      '---',
      '## In-Trade Management & Trader Psychology',
      inTradePsychology,
      '',
      '---',
      '## Post-Trade Autopsy & Lessons',
      postTradeAutopsy,
      '',
      attachments.length > 0
        ? `\n### Attached Screenshots (${attachments.length})\n` +
          attachments.map((a, i) => `![${a.caption || `Chart ${i + 1}`}](${a.url})`).join('\n\n')
        : ''
    ].join('\n');

    const payload = {
      pair: activePair,
      direction,
      setup_type: setupType,
      entry_price: entryPrice ? parseFloat(entryPrice) : undefined,
      stop_loss: stopLoss ? parseFloat(stopLoss) : undefined,
      take_profit: takeProfit ? parseFloat(takeProfit) : undefined,
      outcome,
      profit_loss_percent: computedPLPercent,
      timeframe,
      notes: consolidatedNotes,
      screenshot_url: primaryChartUrl,
    };

    try {
      const apiBase = getApiBase();
      const endpoint = existingTradeId
        ? `${apiBase}/api/journal/trades/${existingTradeId}/`
        : `${apiBase}/api/journal/trades/`;

      const res = await fetch(endpoint, {
        method: existingTradeId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          ...(user?.id ? { 'X-Trader-Id': user.id } : {})
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/journal');
      } else {
        router.push('/journal');
      }
    } catch {
      router.push('/journal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1C1917] pb-24 selection:bg-[#FED7AA] selection:text-[#9A3412]">
      <Navbar />

      {/* TOP NOTEPAD HEADER BAR */}
      <div className="pt-20 pb-4 border-b border-[#E8E4DA] bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Breadcrumb & Pro Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/journal"
              className="h-9 px-3 rounded-xl bg-white border border-[#E8E4DA] text-xs font-semibold text-[#44403C] hover:text-[#1C1917] hover:border-[#FED7AA] inline-flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Ledger</span>
            </Link>

            <div className="h-4 w-[1px] bg-[#D6D0C2]" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#1C1917]">Apple Journal Studio</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>PRO FEATURE</span>
              </span>
            </div>
          </div>

          {/* View Mode Switcher & Save Button */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#EFECE4] p-1 rounded-xl border border-[#E2DDD3]">
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'editor'
                    ? 'bg-white text-[#1C1917] shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Notepad Editor
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === 'preview'
                    ? 'bg-white text-[#1C1917] shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Journal Card Preview</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveAndAudit}
              disabled={isSubmitting}
              className="h-9 px-4 bg-[#C2410C] hover:bg-[#EA580C] disabled:opacity-50 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Audit & Log Entry</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* VIEW 1: EDITOR MODE */}
        {viewMode === 'editor' ? (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8E4DA] shadow-[0_12px_45px_rgba(40,30,20,0.06)] overflow-hidden">
            {/* APPLE JOURNAL MOOD HEADER ACCENT */}
            <div
              className={`h-2.5 w-full bg-gradient-to-r ${selectedStateOfMind.bgGrad}`}
              style={{ borderBottom: `2px solid ${selectedStateOfMind.ringColor}` }}
            />

            {/* SECTION 1: EXECUTION BLOTTER RIBBON */}
            <div className="p-5 sm:p-7 border-b border-[#EFECE6] bg-[#FAF8F3]/60 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9A3412] block">
                    Execution Telemetry • Step 1
                  </span>
                  <h2 className="text-lg font-bold text-[#1C1917] tracking-tight">Trade Parameters & Execution HUD</h2>
                </div>

                {/* LIVE R:R HUD CHIP */}
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-2 rounded-2xl bg-white border border-[#E6E2D8] shadow-2xs flex items-center gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#78716C] block leading-none">Risk / Reward</span>
                      <span className={`font-mono text-sm font-bold ${liveRR ? 'text-[#15803D]' : 'text-[#78716C]'}`}>
                        {liveRR ? `1 : ${liveRR}` : 'Enter Prices'}
                      </span>
                    </div>
                    {liveRR && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0]">
                        {liveRR >= 2 ? 'Optimal' : 'Sub-Optimal'}
                      </span>
                    )}
                  </div>

                  <div className="px-3.5 py-2 rounded-2xl bg-white border border-[#E6E2D8] shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-[#78716C] block leading-none">Net Return</span>
                    <span className={`font-mono text-sm font-bold ${computedPLDollar >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'}`}>
                      {computedPLDollar >= 0 ? `+$${computedPLDollar.toFixed(2)}` : `-$${Math.abs(computedPLDollar).toFixed(2)}`}
                      <span className="text-[11px] font-normal text-[#78716C] ml-1">
                        ({computedPLPercent > 0 ? `+${computedPLPercent}%` : `${computedPLPercent}%`})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Instrument & Direction Picker */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Asset Selector */}
                <div className="md:col-span-4 space-y-2">
                  <label className="text-xs font-bold text-[#44403C] flex items-center justify-between">
                    <span>Pair / Asset</span>
                    <span className="text-[11px] font-mono text-[#78716C]">Fx / Indices / Crypto</span>
                  </label>

                  {/* Popular Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {COMMON_PAIRS.slice(0, 6).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setPair(p);
                          setCustomPair('');
                        }}
                        className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                          pair === p && !customPair
                            ? 'bg-[#1C1917] text-white shadow-2xs'
                            : 'bg-white border border-[#E6E2D8] text-[#44403C] hover:border-[#FED7AA]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Or custom ticker (e.g. US30, NVDA)..."
                    value={customPair}
                    onChange={(e) => setCustomPair(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
                  />
                </div>

                {/* Direction & Outcome */}
                <div className="md:col-span-4 space-y-2">
                  <label className="text-xs font-bold text-[#44403C]">Execution Direction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirection('LONG')}
                      className={`py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        direction === 'LONG'
                          ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
                          : 'bg-white border-[#E6E2D8] text-[#44403C] hover:border-[#BBF7D0]'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>LONG / BUY</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDirection('SHORT')}
                      className={`py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        direction === 'SHORT'
                          ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-sm'
                          : 'bg-white border-[#E6E2D8] text-[#44403C] hover:border-[#FECACA]'
                      }`}
                    >
                      <TrendingDown className="w-4 h-4" />
                      <span>SHORT / SELL</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-bold text-[#44403C] block mb-1.5">Trade Outcome</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOutcome('WIN')}
                        className={`py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                          outcome === 'WIN'
                            ? 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]'
                            : 'bg-white border border-[#E6E2D8] text-[#78716C]'
                        }`}
                      >
                        WIN (+R)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOutcome('LOSS')}
                        className={`py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                          outcome === 'LOSS'
                            ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]'
                            : 'bg-white border border-[#E6E2D8] text-[#78716C]'
                        }`}
                      >
                        LOSS (-1R)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOutcome('BE')}
                        className={`py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                          outcome === 'BE'
                            ? 'bg-[#F5F5F4] text-[#1C1917] border border-[#D6D3D1]'
                            : 'bg-white border border-[#E6E2D8] text-[#78716C]'
                        }`}
                      >
                        BE (0R)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Setup Archetype, Timeframe & Session */}
                <div className="md:col-span-4 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#44403C] block mb-1">Setup Archetype</label>
                    <select
                      value={setupType}
                      onChange={(e) => setSetupType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6E2D8] text-xs font-medium text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
                    >
                      {SETUP_ARCHETYPES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-[#78716C] block mb-1">Timeframe</label>
                      <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono text-[#1C1917]"
                      >
                        {TIMEFRAMES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#78716C] block mb-1">Trading Session</label>
                      <select
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs text-[#1C1917]"
                      >
                        {SESSIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Ladder Execution Inputs */}
              <div className="pt-2 border-t border-[#EFECE6]">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#78716C] block mb-1">Entry Price</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="1.08500"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono text-[#1C1917] focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#B91C1C] block mb-1">Stop Loss</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="1.08350"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#FECACA] text-xs font-mono text-[#B91C1C] focus:outline-none focus:border-[#B91C1C]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#15803D] block mb-1">Take Profit</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="1.08950"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#BBF7D0] text-xs font-mono text-[#15803D] focus:outline-none focus:border-[#15803D]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#78716C] block mb-1">Lot Size</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="1.00"
                      value={lotSize}
                      onChange={(e) => setLotSize(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono text-[#1C1917] focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono font-bold text-[#78716C] block mb-1">Return (% R)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={outcome === 'WIN' ? '+2.5' : outcome === 'LOSS' ? '-1.0' : '0.0'}
                      value={profitPercentInput}
                      onChange={(e) => setProfitPercentInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono text-[#1C1917] focus:outline-none focus:border-[#C2410C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: APPLE JOURNAL MOMENTS & REFLECTIONS PROMPT CARD */}
            <div className="p-5 sm:p-8 space-y-6">
              {/* Apple Journal Prompt Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#FFF7ED] via-[#FFFAF0] to-[#FFF1F2] border border-[#FED7AA]/70 shadow-xs relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#C2410C] flex items-center justify-center text-white shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9A3412]">
                        Apple Journal Reflection Prompt
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-serif font-bold text-[#1C1917] leading-snug">
                      &ldquo;{APPLE_JOURNAL_PROMPTS[activePromptIndex]}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleShufflePrompt}
                      className="p-2 rounded-xl bg-white border border-[#FED7AA] text-[#C2410C] hover:bg-[#FFF7ED] transition-colors"
                      title="Shuffle to another reflection prompt"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleInsertCurrentPrompt}
                      className="px-3 py-2 rounded-xl bg-white border border-[#FED7AA] text-[#C2410C] font-semibold text-xs hover:bg-[#FFF7ED] transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>Insert Prompt</span>
                      <PenLine className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Title Headline Input */}
              <div>
                <input
                  type="text"
                  value={tradeTitle}
                  onChange={(e) => setTradeTitle(e.target.value)}
                  placeholder="Give your trade an executive title..."
                  className="w-full text-xl sm:text-2xl font-bold font-serif text-[#1C1917] bg-transparent border-b border-transparent hover:border-[#E8E4DA] focus:border-[#C2410C] focus:outline-none py-1 transition-colors"
                />
              </div>

              {/* APPLE JOURNAL STATE OF MIND SELECTOR */}
              <div className="p-4 sm:p-5 rounded-3xl bg-[#FAF8F3] border border-[#E8E4DA] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedStateOfMind.color }}
                    />
                    <span className="text-xs font-bold text-[#1C1917]">State of Mind &amp; Psychological Aura</span>
                    <span className="text-[10px] font-mono text-[#78716C]">({selectedStateOfMind.category})</span>
                  </div>
                  <span className="text-[11px] text-[#78716C] hidden sm:inline">{selectedStateOfMind.description}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STATE_OF_MIND_OPTIONS.map((opt) => {
                    const isSelected = selectedStateOfMind.label === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedStateOfMind(opt)}
                        className={`p-2.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? 'bg-white shadow-xs'
                            : 'bg-white/60 border-[#E8E4DA] hover:bg-white hover:border-[#D6D0C2]'
                        }`}
                        style={{
                          borderColor: isSelected ? opt.ringColor : undefined,
                          boxShadow: isSelected ? `0 0 0 2px ${opt.ringColor}20` : undefined
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: opt.color }}
                          />
                          <span className="font-bold text-xs text-[#1C1917] truncate">{opt.label}</span>
                        </div>
                        <span className="text-[10px] text-[#78716C] block leading-tight">{opt.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* NOTEPAD SECTION TABS */}
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveNoteSection('thesis')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeNoteSection === 'thesis'
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    1. Pre-Trade Thesis
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNoteSection('psychology')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeNoteSection === 'psychology'
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    2. Mindset &amp; In-Trade
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNoteSection('autopsy')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeNoteSection === 'autopsy'
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    3. Post-Trade Autopsy
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  {/* Voice Thought Recorder Trigger */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceRecord}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                      isRecordingVoice
                        ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA] animate-pulse'
                        : hasVoiceMemo
                        ? 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]'
                        : 'bg-white border border-[#E8E4DA] text-[#44403C] hover:text-[#1C1917]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>
                      {isRecordingVoice
                        ? `Recording (0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds})`
                        : hasVoiceMemo
                        ? 'Voice Note Attached'
                        : '+ Voice Note'}
                    </span>
                  </button>
                </div>
              </div>

              {/* RICH TEXT FORMATTING TOOLBAR */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-[#FAF8F3] border border-[#EBE7DF]">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertFormatting('**', '**')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Bold (**text**)"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('*', '*')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Italic (*text*)"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('# ', '')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Heading 1"
                  >
                    <Heading1 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('## ', '')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Heading 2"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('- ', '')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Bullet list"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('- [ ] ', '')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Checklist task"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('> ', '')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Quote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting('`', '`')}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-white transition-colors"
                    title="Code / Ticker tag"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* QUICK CONFLUENCE SNIPPET SHORTCUTS */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => insertHelperSnippet('timestamp')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E6E2D8] text-[11px] font-semibold text-[#44403C] hover:text-[#C2410C] hover:border-[#FED7AA] inline-flex items-center gap-1 transition-all"
                  >
                    <Clock className="w-3 h-3 text-[#C2410C]" />
                    <span>+ Time</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertHelperSnippet('checklist')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E6E2D8] text-[11px] font-semibold text-[#44403C] hover:text-[#C2410C] hover:border-[#FED7AA] inline-flex items-center gap-1 transition-all"
                  >
                    <CheckSquare className="w-3 h-3 text-[#15803D]" />
                    <span>+ SMC Checklist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertHelperSnippet('htf')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E6E2D8] text-[11px] font-semibold text-[#44403C] hover:text-[#C2410C] hover:border-[#FED7AA] inline-flex items-center gap-1 transition-all"
                  >
                    <Zap className="w-3 h-3 text-[#EAB308]" />
                    <span>+ HTF Bias</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertHelperSnippet('trailing')}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E6E2D8] text-[11px] font-semibold text-[#44403C] hover:text-[#C2410C] hover:border-[#FED7AA] inline-flex items-center gap-1 transition-all"
                  >
                    <TrendingUp className="w-3 h-3 text-[#0F766E]" />
                    <span>+ Trailing Plan</span>
                  </button>
                </div>
              </div>

              {/* RULED PAPER TEXT AREA CONTAINER WITH CLASSIC RED MARGIN GUIDE */}
              <div className="relative rounded-2xl border border-[#EAE6DE] bg-white overflow-hidden shadow-2xs">
                {/* Vertical red margin line reminiscent of executive legal / trading pads */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[1px] bg-rose-300/40 pointer-events-none" />

                {activeNoteSection === 'thesis' && (
                  <div className="pl-9 sm:pl-12 pr-4 py-4">
                    <textarea
                      ref={thesisRef}
                      rows={10}
                      value={preTradeThesis}
                      onChange={(e) => setPreTradeThesis(e.target.value)}
                      placeholder="Document your pre-trade thesis, market narrative, key liquidity sweeps, and invalidation rules..."
                      className="w-full bg-transparent resize-y text-xs sm:text-sm font-sans leading-relaxed text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none"
                    />
                  </div>
                )}

                {activeNoteSection === 'psychology' && (
                  <div className="pl-9 sm:pl-12 pr-4 py-4">
                    <textarea
                      ref={psychRef}
                      rows={10}
                      value={inTradePsychology}
                      onChange={(e) => setInTradePsychology(e.target.value)}
                      placeholder="Record your mindset during the trade: Were you calm? Did you adhere strictly to risk limits? Did fear or greed arise during drawdown?"
                      className="w-full bg-transparent resize-y text-xs sm:text-sm font-sans leading-relaxed text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none"
                    />
                  </div>
                )}

                {activeNoteSection === 'autopsy' && (
                  <div className="pl-9 sm:pl-12 pr-4 py-4">
                    <textarea
                      ref={autopsyRef}
                      rows={10}
                      value={postTradeAutopsy}
                      onChange={(e) => setPostTradeAutopsy(e.target.value)}
                      placeholder="Conduct a trade autopsy: Did price react as anticipated? What could have been managed better? What is the core lesson to carry forward?"
                      className="w-full bg-transparent resize-y text-xs sm:text-sm font-sans leading-relaxed text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* ATTACHED VOICE MEMO PLAYER CARD (If recorded) */}
              {hasVoiceMemo && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleTogglePlayVoice}
                      className="w-9 h-9 rounded-full bg-[#15803D] hover:bg-[#166534] text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
                    >
                      {isPlayingVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div>
                      <span className="font-bold text-xs text-[#1C1917] block flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Voice Reflection • In-Trade Commentary</span>
                      </span>
                      <span className="text-[10px] text-[#78716C] font-mono">
                        Duration: 0:{recordingSeconds < 10 ? '0' : ''}${recordingSeconds || 38} • Ready to archive
                      </span>
                    </div>
                  </div>

                  {/* Waveform graphic bars */}
                  <div className="hidden sm:flex items-center gap-0.5 h-6">
                    {[12, 24, 18, 28, 14, 22, 10, 26, 16, 30, 20, 14].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full ${isPlayingVoice ? 'bg-[#15803D] animate-pulse' : 'bg-[#86EFAC]'}`}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleDeleteVoice}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#B91C1C] transition-colors"
                    title="Remove voice memo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* SECTION 3: APPLE JOURNAL PHOTO COLLAGE & ATTACHMENTS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#C2410C]" />
                      <span>Chart Moments &amp; Multi-Timeframe Collage ({attachments.length})</span>
                    </h3>
                    <p className="text-xs text-[#78716C]">
                      Attach 4H macro bias, 15m entry trigger, or paste screenshot directly (Cmd+V)
                    </p>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="h-9 px-3.5 bg-white border border-[#E6E2D8] hover:border-[#FED7AA] hover:bg-[#FFF7ED] text-[#1C1917] rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-2xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#C2410C]" />
                      <span>Add Photos</span>
                    </button>
                  </div>
                </div>

                {/* Apple Journal Style Collage Grid */}
                {attachments.length > 0 ? (
                  <div
                    className={`grid gap-3.5 ${
                      attachments.length === 1
                        ? 'grid-cols-1'
                        : attachments.length === 2
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {attachments.map((att, idx) => (
                      <div
                        key={att.id}
                        className="group rounded-3xl border border-[#E6E2D8] bg-white overflow-hidden shadow-2xs hover:border-[#FED7AA] hover:shadow-md transition-all relative"
                      >
                        <div className="relative aspect-video bg-[#1C1917] overflow-hidden">
                          <img
                            src={att.url}
                            alt={att.caption}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => setActiveLightbox(att)}
                            className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                          >
                            <Maximize2 className="w-5 h-5 drop-shadow" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAttachment(att.id)}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-black/65 text-white hover:bg-[#B91C1C] transition-colors"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-xs text-[10px] font-mono text-white">
                            Photo #{idx + 1}
                          </span>
                        </div>

                        <div className="p-3">
                          <input
                            type="text"
                            value={att.caption}
                            onChange={(e) => {
                              const newCaption = e.target.value;
                              setAttachments((prev) =>
                                prev.map((a) => (a.id === att.id ? { ...a, caption: newCaption } : a))
                              );
                            }}
                            placeholder="Add photo caption..."
                            className="w-full text-xs text-[#1C1917] bg-transparent border-b border-transparent focus:border-[#C2410C] focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 rounded-3xl border-2 border-dashed border-[#E0DCD2] bg-[#FAF8F3] text-center space-y-2 cursor-pointer hover:border-[#FED7AA] hover:bg-[#FFF7ED]/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-center mx-auto text-[#C2410C] shadow-2xs">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1C1917] block">Click to upload chart photos</span>
                      <span className="text-[11px] text-[#78716C]">
                        or paste any screenshot directly from your clipboard (Ctrl + V / Cmd + V)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 4: TIER RULE COMPLIANCE & SUBMIT */}
              <div className="pt-6 border-t border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rulesFollowed}
                    onChange={(e) => setRulesFollowed(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C2410C] focus:ring-[#C2410C] border-[#D6D3D1]"
                  />
                  <span className="text-xs text-[#44403C]">
                    I confirm this execution complied with my tier risk management and emotional plan.
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    className="px-4 py-2 text-xs font-semibold text-[#44403C] hover:text-[#1C1917] bg-white border border-[#E8E4DA] rounded-xl transition-all shadow-2xs"
                  >
                    Preview Card
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAndAudit}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#C2410C] hover:bg-[#EA580C] disabled:opacity-50 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Auditing Execution...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Audit &amp; Record Journal Entry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: APPLE JOURNAL CARD PREVIEW (Signature Apple Journal Aesthetic) */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9A3412]">
                  Live Preview
                </span>
                <h3 className="text-lg font-bold text-[#1C1917]">How this entry will appear in your Apple Journal feed</h3>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E8E4DA] text-xs font-bold text-[#44403C] hover:text-[#1C1917] transition-all shadow-2xs"
              >
                ← Back to Editing
              </button>
            </div>

            {/* THE SIGNATURE APPLE JOURNAL ENTRY CARD */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 shadow-[0_8px_30px_rgba(28,25,23,0.06)] space-y-5 relative overflow-hidden">
              {/* Top ambient state-of-mind glow */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${selectedStateOfMind.bgGrad}`}
                style={{ backgroundColor: selectedStateOfMind.ringColor }}
              />

              {/* Date & State of Mind Row */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F5F4]">
                <div>
                  <span className="text-xs font-bold text-[#1C1917] block">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-[11px] text-[#78716C] font-mono">
                    {session} • {timeframe} Timeframe
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                    style={{
                      backgroundColor: `${selectedStateOfMind.color}15`,
                      color: selectedStateOfMind.color,
                      border: `1px solid ${selectedStateOfMind.ringColor}40`
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: selectedStateOfMind.color }}
                    />
                    <span>{selectedStateOfMind.label}</span>
                  </span>

                  <Bookmark className="w-4 h-4 text-[#A8A29E] hover:text-[#C2410C] cursor-pointer" />
                </div>
              </div>

              {/* ATTACHED TRADE EXECUTION WIDGET (Signature Apple Moment Pill) */}
              <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold ${
                      direction === 'LONG' ? 'bg-[#15803D] text-white' : 'bg-[#B91C1C] text-white'
                    }`}
                  >
                    {direction}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#1C1917]">
                        {customPair.trim() ? customPair.toUpperCase() : pair}
                      </span>
                      <span className="text-[11px] text-[#78716C]">({setupType})</span>
                    </div>
                    <span className="text-[10px] text-[#A8A29E] font-mono">
                      Entry: {entryPrice || '1.08500'} &rarr; Exit: {exitPrice || takeProfit || '1.08950'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {liveRR && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#78716C] block">Risk/Reward</span>
                      <span className="font-mono font-bold text-xs text-[#1C1917]">1:{liveRR}</span>
                    </div>
                  )}

                  <div className="text-right">
                    <span
                      className={`font-mono font-bold text-sm block ${
                        computedPLDollar >= 0 ? 'text-[#15803D]' : 'text-[#B91C1C]'
                      }`}
                    >
                      {computedPLDollar >= 0 ? `+$${computedPLDollar.toFixed(2)}` : `-$${Math.abs(computedPLDollar).toFixed(2)}`}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#78716C]">{outcome}</span>
                  </div>
                </div>
              </div>

              {/* Headline & Body */}
              <div className="space-y-3">
                <h2 className="text-xl font-serif font-bold text-[#1C1917] tracking-tight">{tradeTitle}</h2>

                {/* Pre-trade thesis */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9A3412] block">
                    Pre-Trade Confluence:
                  </span>
                  <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-wrap">
                    {preTradeThesis}
                  </p>
                </div>

                {/* In-trade mindset */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F766E] block">
                    State of Mind &amp; Psychology:
                  </span>
                  <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-wrap">
                    {inTradePsychology}
                  </p>
                </div>

                {/* Post-trade autopsy */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#15803D] block">
                    Autopsy &amp; Compounding Edge:
                  </span>
                  <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-wrap">
                    {postTradeAutopsy}
                  </p>
                </div>
              </div>

              {/* Voice Thought Memo pill (if attached) */}
              {hasVoiceMemo && (
                <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#15803D] text-white flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#1C1917] block">In-Trade Voice Thought</span>
                      <span className="text-[10px] text-[#78716C] font-mono">0:{recordingSeconds < 10 ? '0' : ''}${recordingSeconds || 38}</span>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-[#15803D]" />
                </div>
              )}

              {/* Chart Photos Collage Preview */}
              {attachments.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#78716C] block">
                    Chart Moments ({attachments.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attachments.map((att) => (
                      <div key={att.id} className="rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-2xs">
                        <img src={att.url} alt={att.caption} className="w-full aspect-video object-cover" />
                        {att.caption && (
                          <div className="p-2 bg-[#FAFAF9] text-[11px] text-[#44403C] font-medium border-t border-[#E7E5E4]">
                            {att.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Audit Signature */}
              <div className="pt-4 border-t border-[#F5F5F4] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#0F766E] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                  <span>Audited Risk Compliance</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('editor')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#78716C] hover:text-[#1C1917]"
                  >
                    Edit Note
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAndAudit}
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Confirm &amp; Audit Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-[#1C1917] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeLightbox.url}
              alt={activeLightbox.caption}
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
            {activeLightbox.caption && (
              <div className="p-4 bg-[#1C1917] text-white text-center text-xs font-mono">
                {activeLightbox.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default function LogTradeNotepadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#C2410C] border-t-transparent animate-spin" />
        </div>
      }
    >
      <LogTradeNotepadContent />
    </Suspense>
  );
}
