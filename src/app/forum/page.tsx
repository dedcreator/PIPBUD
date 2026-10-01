'use client';

import { useState } from 'react';
import Link from 'next/link';
import PipbudLogo from '@/components/PipbudLogo';
import { TRADER_TIERS } from '@/data/tiers';
import { useAuth } from '@/context/AuthContext';
import {
  MessageSquare,
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  Mic,
  Code2,
  Paperclip,
  Smile,
  Send,
  Users,
  Search,
  Hash,
  Sparkles,
  ChevronDown,
  Layers,
  Activity,
  CheckCircle2,
  X,
  Volume2,
  AlertOctagon,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  author: {
    name: string;
    level: number;
    badge: string;
    broker: string;
    avatarBg: string;
  };
  content: string;
  tradeEmbed?: {
    pair: string;
    direction: 'LONG' | 'SHORT';
    setup: string;
    entry: string;
    sl: string;
    tp: string;
    rr: string;
    outcome: string;
    profit: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
  reactions: { [emoji: string]: number };
  timestamp: string;
  isDemotionNotice?: boolean;
}

export default function ForumPage() {
  const { user } = useAuth();
  // Dynamic user tier from logged in account (defaults to Level 4)
  const userLevel = user ? user.skill_level : 4;
  const [activeChannel, setActiveChannel] = useState(userLevel >= 4 ? 'funded-floor' : 'novice-welcome');
  const [messageInput, setMessageInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [showSimulateDemotionModal, setShowSimulateDemotionModal] = useState(false);

  // Chat message stream
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      author: {
        name: 'Solomon Kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime',
        avatarBg: '#C2410C',
      },
      content: 'London session open: Asia low swept aggressively into the 15m bullish Order Block on EUR/USD. DXY rejecting 104.20 key resistance level. High conviction long.',
      reactions: { '🔥': 18, '🎯': 12, '🚀': 7 },
      timestamp: '08:05 UTC',
    },
    {
      id: '2',
      author: {
        name: 'Aisha Bello',
        level: 6,
        badge: '👑 Level 6: Mentor',
        broker: 'FTMO Master $200k',
        avatarBg: '#EA580C',
      },
      content: 'Here is the PineScript alert script for monitoring the London Killzone sweeps:',
      codeSnippet: {
        language: 'pinescript',
        code: `//@version=5
indicator("PipBud London Liquidity Sweep", overlay=true)
asia_high = ta.highest(high, 24)
asia_low = ta.lowest(low, 24)
plot(asia_high, "Asia High", color=color.new(color.orange, 0))
plot(asia_low, "Asia Low", color=color.new(color.blue, 0))
alertcondition(ta.crossover(high, asia_high), "Asia High Swept", "PipBud Alert: High Liquidity Taken")`,
      },
      reactions: { '👏': 14, '🔥': 9 },
      timestamp: '08:12 UTC',
    },
    {
      id: '3',
      author: {
        name: 'Apex Trader (You)',
        level: 4,
        badge: '🛡️ Level 4: Funded Pro',
        broker: 'FTMO Funded $100k',
        avatarBg: '#1C1917',
      },
      content: 'Took the exact setup at the 15m discount OB tap. Logged instantly via @PipBudBot. Target reached for full 1:2.50 R:R:',
      tradeEmbed: {
        pair: 'EUR/USD',
        direction: 'LONG',
        setup: '15m Order Block (OB)',
        entry: '1.08420',
        sl: '1.08220',
        tp: '1.08920',
        rr: '1:2.50',
        outcome: 'WIN',
        profit: '+2.50% (+$2,500.00)',
      },
      reactions: { '🚀': 15, '🎯': 11, '🔥': 8 },
      timestamp: '08:18 UTC',
    },
    {
      id: '4',
      author: {
        name: 'PipBud Meritocracy Sentinel',
        level: 0,
        badge: '🚨 System Governance',
        broker: 'Autonomous Auditor',
        avatarBg: '#B91C1C',
      },
      content: '🚨 DEMOTION & RELEGATION NOTICE: Trader @emeka_scalp has exceeded the 5.0% maximum drawdown ceiling (hit 5.4%). As per the Zero-Tolerance Anti-Shortfall Rule, they have been automatically removed from #funded-floor and relegated to Level 3.',
      isDemotionNotice: true,
      reactions: { '🛡️': 24, '👀': 16 },
      timestamp: '08:25 UTC',
    },
    {
      id: '5',
      author: {
        name: 'Chidi Okonkwo',
        level: 5,
        badge: '💎 Level 5: Elite Alpha',
        broker: 'Alpha Capital VIP',
        avatarBg: '#D97706',
      },
      content: 'Brutal rule, but that is why this desk has zero noise. Real operators only. NY session open coming up in 4 hours.',
      reactions: { '💯': 16, '🤝': 10 },
      timestamp: '08:28 UTC',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: 'Apex Trader (You)',
        level: 4,
        badge: '🛡️ Level 4: Funded Pro',
        broker: 'FTMO Funded $100k',
        avatarBg: '#1C1917',
      },
      content: messageInput,
      reactions: { '🔥': 1 },
      timestamp: 'Just now',
    };

    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const count = msg.reactions[emoji] || 0;
          return {
            ...msg,
            reactions: { ...msg.reactions, [emoji]: count + 1 },
          };
        }
        return msg;
      })
    );
  };

  const handleAttachTrade = () => {
    const tradeMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: 'Apex Trader (You)',
        level: 4,
        badge: '🛡️ Level 4: Funded Pro',
        broker: 'FTMO Funded $100k',
        avatarBg: '#1C1917',
      },
      content: 'Sharing my latest audited trade from the PipBud Journal:',
      tradeEmbed: {
        pair: 'GBP/USD',
        direction: 'SHORT',
        setup: '15m Fair Value Gap (FVG)',
        entry: '1.29850',
        sl: '1.30050',
        tp: '1.29250',
        rr: '1:3.00',
        outcome: 'WIN',
        profit: '+3.00% (+$3,000.00)',
      },
      reactions: { '🎯': 2 },
      timestamp: 'Just now',
    };

    setMessages([...messages, tradeMsg]);
    setShowAttachModal(false);
  };

  const copyCodeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-14 bg-white border-b border-[#E7E5E4] px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <PipbudLogo size="sm" />
          <span className="hidden sm:inline-block h-4 w-px bg-[#E7E5E4]" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1C1917]">PipBud Trading Syndicate</span>
            <span className="text-[10px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] px-2 py-0.5 rounded-full">
              7-Tier Meritocracy
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/journal"
            className="text-xs font-medium text-[#44403C] hover:text-[#C2410C] px-3 py-1.5 rounded-lg hover:bg-[#FFF7ED]"
          >
            Web Journal
          </Link>
          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white px-3.5 py-1.5 rounded-xl transition-all shadow-xs"
          >
            Telegram Bot
          </a>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Server & Channels List */}
        <aside className="w-64 bg-white border-r border-[#E7E5E4] flex flex-col shrink-0 overflow-y-auto">
          {/* User Status Card */}
          <div className="p-3.5 border-b border-[#E7E5E4] bg-[#FAFAF9]">
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-8 h-8 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: user?.tier_color || '#1C1917' }}
              >
                {user ? user.username.slice(0, 2).toUpperCase() : 'AT'}
              </div>
              <div className="overflow-hidden">
                <span className="font-bold text-xs text-[#1C1917] block truncate">
                  @{user?.username || 'Apex Trader'}
                </span>
                <span
                  className="text-[10px] font-semibold block truncate"
                  style={{ color: user?.tier_color || '#7C3AED' }}
                >
                  {user?.tier_badge || 'Level 4: Funded Pro'}
                </span>
              </div>
            </div>

            {/* Live Health Pill */}
            <div className="bg-white p-2 rounded-lg border border-[#E7E5E4] text-[11px]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#1C1917] font-medium">Tier Health:</span>
                <span className="text-[#15803D] font-bold">
                  {user?.tier_health ?? 94}% 🟢
                </span>
              </div>
              <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#15803D] h-full rounded-full transition-all duration-500"
                  style={{ width: `${user?.tier_health ?? 94}%` }}
                />
              </div>
            </div>
          </div>

          {/* Channels categorized by Tier */}
          <div className="p-3 space-y-4 text-xs">
            {/* Global Transparency Channel */}
            <div>
              <button
                onClick={() => setActiveChannel('demotions-log')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left font-medium transition-all ${
                  activeChannel === 'demotions-log'
                    ? 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2]'
                    : 'text-[#B91C1C] hover:bg-[#FEF2F2]/60'
                }`}
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  # demotions-log
                </span>
                <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse" />
              </button>
            </div>

            {/* Level 4 Channels (Current User's Level) */}
            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider flex items-center justify-between">
                <span>Level 4: Funded Floor</span>
                <span className="text-[9px] bg-[#F5F3FF] px-1.5 py-0.2 rounded border border-[#DDD6FE]">Your Desk</span>
              </div>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => setActiveChannel('funded-floor')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeChannel === 'funded-floor'
                      ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold'
                      : 'text-[#44403C] hover:bg-[#F5F5F4]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                    funded-floor
                  </span>
                  <span className="text-[10px] font-bold bg-[#FFEDD5] text-[#C2410C] px-1.5 py-0.2 rounded">
                    Live
                  </span>
                </button>

                <button
                  onClick={() => setActiveChannel('live-tape-reading')}
                  className={`w-full flex items-center px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeChannel === 'live-tape-reading'
                      ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold'
                      : 'text-[#44403C] hover:bg-[#F5F5F4]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                    live-tape-reading
                  </span>
                </button>

                <button
                  onClick={() => setActiveChannel('payout-proofs')}
                  className={`w-full flex items-center px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeChannel === 'payout-proofs'
                      ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold'
                      : 'text-[#44403C] hover:bg-[#F5F5F4]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                    payout-proofs
                  </span>
                </button>
              </div>
            </div>

            {/* Level 3 Channels (Unlocked) */}
            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-[#0F766E] uppercase tracking-wider">
                Level 3: Consistent
              </div>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => setActiveChannel('consistent-flow')}
                  className={`w-full flex items-center px-2.5 py-1.5 rounded-lg text-left text-[#44403C] hover:bg-[#F5F5F4] ${
                    activeChannel === 'consistent-flow' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold' : ''
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                    consistent-flow
                  </span>
                </button>
                <button
                  onClick={() => setActiveChannel('daily-bias')}
                  className={`w-full flex items-center px-2.5 py-1.5 rounded-lg text-left text-[#44403C] hover:bg-[#F5F5F4] ${
                    activeChannel === 'daily-bias' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold' : ''
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                    daily-bias
                  </span>
                </button>
              </div>
            </div>

            {/* Higher Tiers (Locked) */}
            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider flex items-center justify-between">
                <span>Level 5: Elite Alpha</span>
                <Lock className="w-3 h-3 text-[#A8A29E]" />
              </div>
              <div className="space-y-0.5 mt-1 opacity-60 cursor-not-allowed">
                <div className="flex items-center justify-between px-2.5 py-1.5 text-[#78716C]">
                  <span className="flex items-center gap-1.5"># elite-alpha-desk</span>
                  <Lock className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider flex items-center justify-between">
                <span>Level 6: Mentors</span>
                <Lock className="w-3 h-3 text-[#A8A29E]" />
              </div>
              <div className="space-y-0.5 mt-1 opacity-60 cursor-not-allowed">
                <div className="flex items-center justify-between px-2.5 py-1.5 text-[#78716C]">
                  <span className="flex items-center gap-1.5"># live-audio-huddle</span>
                  <Mic className="w-3 h-3 text-[#A8A29E]" />
                </div>
              </div>
            </div>

            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider flex items-center justify-between">
                <span>Level 7: Titan Syndicate</span>
                <Lock className="w-3 h-3 text-[#A8A29E]" />
              </div>
              <div className="space-y-0.5 mt-1 opacity-60 cursor-not-allowed">
                <div className="flex items-center justify-between px-2.5 py-1.5 text-[#78716C]">
                  <span className="flex items-center gap-1.5"># titan-inner-sanctuary</span>
                  <Lock className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Chat Viewport */}
        <main className="flex-1 bg-[#FAFAF9] flex flex-col justify-between overflow-hidden">
          {/* Channel Header */}
          <div className="h-14 bg-white border-b border-[#E7E5E4] px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-[#1C1917] flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-[#C2410C]" />
                {activeChannel}
              </span>
              <span className="text-xs text-[#78716C] hidden md:inline-block">
                • Verified Level 4+ Funded Operators Only
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2.5 py-0.5 rounded-full font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Anti-Shortfall Gated
              </span>
              <span className="text-[11px] text-[#78716C] font-mono hidden sm:inline-block">
                48 Online
              </span>
            </div>
          </div>

          {/* Active Voice Huddle Pill (Simulated) */}
          <div className="bg-[#FFF7ED] border-b border-[#FED7AA] px-4 py-2 flex items-center justify-between text-xs text-[#9A3412]">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping" />
              <span>Live London/NY Overlap Audio Huddle in progress (Led by Solomon Kane)</span>
            </div>
            <button className="px-2.5 py-1 bg-[#C2410C] text-white rounded-lg text-[11px] font-medium hover:bg-[#EA580C]">
              Join Audio (Listen)
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3.5 ${
                  msg.isDemotionNotice
                    ? 'p-4 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2]'
                    : ''
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl font-bold text-xs text-white flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: msg.author.avatarBg }}
                >
                  {msg.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs text-[#1C1917]">{msg.author.name}</span>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        msg.isDemotionNotice
                          ? 'bg-[#B91C1C] text-white'
                          : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                      }`}
                    >
                      {msg.author.badge}
                    </span>
                    <span className="text-[10px] text-[#78716C]">{msg.author.broker}</span>
                    <span className="text-[10px] text-[#A8A29E] ml-auto">{msg.timestamp}</span>
                  </div>

                  {/* Text content */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      msg.isDemotionNotice ? 'text-[#991B1B] font-medium' : 'text-[#44403C]'
                    }`}
                  >
                    {msg.content}
                  </p>

                  {/* Embedded PineScript Code Snippet */}
                  {msg.codeSnippet && (
                    <div className="bg-[#1C1917] rounded-xl p-3 border border-[#44403C] text-xs font-mono text-[#D6D3D1] space-y-2 overflow-x-auto relative">
                      <div className="flex items-center justify-between text-[10px] text-[#A8A29E] border-b border-[#44403C] pb-1.5">
                        <span>TradingView PineScript v5</span>
                        <button
                          onClick={() => copyCodeToClipboard(msg.codeSnippet!.code)}
                          className="flex items-center gap-1 text-[#FB923C] hover:text-white"
                        >
                          {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? 'Copied' : 'Copy Script'}</span>
                        </button>
                      </div>
                      <pre className="text-[11px] leading-relaxed overflow-x-auto">
                        {msg.codeSnippet.code}
                      </pre>
                    </div>
                  )}

                  {/* Embedded Audited Trade Card */}
                  {msg.tradeEmbed && (
                    <div className="bg-white p-3.5 rounded-xl border border-[#E7E5E4] shadow-xs max-w-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              msg.tradeEmbed.direction === 'LONG'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : 'bg-[#FEE2E2] text-[#B91C1C]'
                            }`}
                          >
                            {msg.tradeEmbed.direction}
                          </span>
                          <span className="font-bold text-xs text-[#1C1917]">{msg.tradeEmbed.pair}</span>
                          <span className="text-[11px] text-[#78716C]">{msg.tradeEmbed.setup}</span>
                        </div>
                        <span className="text-xs font-bold text-[#15803D] tabular-nums">
                          {msg.tradeEmbed.profit}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-[10px] bg-[#FAFAF9] p-2 rounded-lg border border-[#E7E5E4] font-mono">
                        <div>
                          <span className="text-[#78716C] block">Entry</span>
                          <span className="text-[#1C1917] font-semibold">{msg.tradeEmbed.entry}</span>
                        </div>
                        <div>
                          <span className="text-[#78716C] block">SL</span>
                          <span className="text-[#B91C1C] font-semibold">{msg.tradeEmbed.sl}</span>
                        </div>
                        <div>
                          <span className="text-[#78716C] block">TP</span>
                          <span className="text-[#15803D] font-semibold">{msg.tradeEmbed.tp}</span>
                        </div>
                        <div>
                          <span className="text-[#78716C] block">R:R</span>
                          <span className="text-[#C2410C] font-bold">{msg.tradeEmbed.rr}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#78716C] pt-1">
                        <span className="flex items-center gap-1 text-[#0F766E] font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Audited via PipBud Telegram Journal
                        </span>
                        <span className="font-mono">FTMO Verified</span>
                      </div>
                    </div>
                  )}

                  {/* Emoji Reactions */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(msg.id, emoji)}
                        className="px-2 py-0.5 rounded-full bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] text-[11px] text-[#44403C] flex items-center gap-1 transition-colors"
                      >
                        <span>{emoji}</span>
                        <span className="font-medium text-[10px]">{count}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => handleReaction(msg.id, '🔥')}
                      className="px-1.5 py-0.5 rounded-full hover:bg-white text-[11px] text-[#78716C]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message Composer */}
          <div className="p-4 bg-white border-t border-[#E7E5E4]">
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message #${activeChannel} as Level 4 Verified...`}
                  className="flex-1 h-11 px-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs sm:text-sm focus:border-[#C2410C] focus:bg-white outline-hidden"
                />

                <button
                  type="button"
                  onClick={() => setShowAttachModal(true)}
                  title="Attach Trade from Journal"
                  className="h-11 px-3 bg-[#FAFAF9] hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[#C2410C] rounded-xl text-xs font-medium inline-flex items-center gap-1"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="hidden sm:inline">Attach Trade</span>
                </button>

                <button
                  type="submit"
                  className="h-11 px-5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#78716C] px-1">
                <span>Press Enter to send • PineScript and trade cards supported</span>
                <span className="text-[#0F766E] font-medium">100% Anti-Shortfall Verified Room</span>
              </div>
            </form>
          </div>
        </main>

        {/* Right Column: Room Governance & Transparency Bar */}
        <aside className="w-72 bg-white border-l border-[#E7E5E4] hidden xl:flex flex-col shrink-0 p-4 space-y-6 overflow-y-auto">
          {/* Room Governance Card */}
          <div className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
              <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              <span>Desk Verification Rules</span>
            </div>
            <p className="text-[11px] text-[#44403C] leading-relaxed">
              <strong>#funded-floor</strong> is restricted to traders with verified funded prop accounts or live broker allocations.
            </p>
            <div className="space-y-1.5 text-[11px] pt-1 border-t border-[#E7E5E4]">
              <div className="flex justify-between">
                <span className="text-[#78716C]">Min Required Win Rate:</span>
                <span className="font-bold text-[#1C1917]">&ge; 50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Max Allowed Drawdown:</span>
                <span className="font-bold text-[#C2410C]">&le; 5.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Next Continuous Audit:</span>
                <span className="font-mono text-[#0F766E]">In 3 hours</span>
              </div>
            </div>
          </div>

          {/* Test Demotion Sandbox Trigger */}
          <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412] block">
              Governance Demonstration
            </span>
            <h4 className="text-xs font-bold text-[#1C1917]">
              Test The Removal Protocol
            </h4>
            <p className="text-[11px] text-[#44403C]">
              Simulate what occurs when a trader logs an unmanaged risk trade or breaches maximum drawdown.
            </p>
            <button
              onClick={() => setShowSimulateDemotionModal(true)}
              className="w-full py-2 bg-white hover:bg-[#FEF2F2] border border-[#B91C1C] text-[#B91C1C] rounded-lg text-xs font-bold transition-all"
            >
              Simulate Drawdown Violation
            </button>
          </div>

          {/* Active Members Grouped by Tier */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
              Room Operators (Online)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center">
                  SK
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917] block text-[11px]">Solomon Kane</span>
                  <span className="text-[9px] text-[#C2410C]">Level 7: Titan Desk</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center">
                  AB
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917] block text-[11px]">Aisha Bello</span>
                  <span className="text-[9px] text-[#EA580C]">Level 6: Mentor</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#D97706] text-white text-[10px] font-bold flex items-center justify-center">
                  CO
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917] block text-[11px]">Chidi Okonkwo</span>
                  <span className="text-[9px] text-[#D97706]">Level 5: Elite Alpha</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-[10px] font-bold flex items-center justify-center">
                  AT
                </div>
                <div>
                  <span className="font-semibold text-[#1C1917] block text-[11px]">Apex Trader (You)</span>
                  <span className="text-[9px] text-[#7C3AED]">Level 4: Funded Pro</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal: Attach Trade Card */}
      {showAttachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-base font-bold text-[#1C1917]">Select Audited Trade to Attach</h3>
              <button
                onClick={() => setShowAttachModal(false)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#78716C]">
              Only trades verified in your PipBud Journal can be embedded with audited broker proof.
            </p>

            <div className="space-y-2">
              <div
                onClick={handleAttachTrade}
                className="p-3 bg-[#FAFAF9] hover:bg-[#FFF7ED] rounded-xl border border-[#E7E5E4] hover:border-[#FED7AA] cursor-pointer transition-all text-xs"
              >
                <div className="flex justify-between font-bold text-[#1C1917] mb-1">
                  <span>GBP/USD SHORT</span>
                  <span className="text-[#15803D]">+3.00% WIN</span>
                </div>
                <div className="text-[11px] text-[#78716C] font-mono">
                  15m FVG • Entry: 1.29850 • SL: 1.30050 • R:R 1:3.00
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAttachModal(false)}
              className="w-full py-2 bg-[#FAFAF9] text-[#78716C] rounded-xl text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal: Simulated Demotion Enforcement */}
      {showSimulateDemotionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#B91C1C] max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#B91C1C] flex items-center justify-center mx-auto">
              <AlertOctagon className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-[#1C1917]">
                Anti-Shortfall Rule Triggered!
              </h3>
              <p className="text-xs text-[#78716C] mt-1">
                Simulated Drawdown Breach: 5.4% (Exceeded Level 4 limit of 5.0%)
              </p>
            </div>

            <div className="p-3 bg-[#FEF2F2] rounded-xl border border-[#FEE2E2] text-xs text-[#7F1D1D] space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-[#B91C1C]">
                <span>🚨 Enforcement Actions Taken:</span>
              </div>
              <p>• Tier Health Score reduced from 94% to 0%.</p>
              <p>• Revoked messaging access to <strong>#funded-floor</strong>.</p>
              <p>• Relegated to <strong>Level 3: Consistent Breakeven+</strong>.</p>
              <p>• Automated incident notice published in <strong>#demotions-log</strong>.</p>
            </div>

            <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] text-[11px] text-[#44403C]">
              💡 <em>This automated mechanism ensures every member in higher rooms is actively profitable and disciplined. No exceptions.</em>
            </div>

            <button
              onClick={() => setShowSimulateDemotionModal(false)}
              className="w-full h-10 bg-[#1C1917] hover:bg-[#44403C] text-white rounded-xl text-xs font-medium"
            >
              Reset Simulation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
