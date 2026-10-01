'use client';

import { useState, useEffect } from 'react';
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
  Check,
  Menu,
  Info,
  ArrowLeft,
  ExternalLink,
  BarChart3,
  LogOut,
  RefreshCw,
  Award
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

interface ChannelMeta {
  id: string;
  name: string;
  minLevel: number;
  tierGroup: string;
  badge: string;
  isVoice?: boolean;
  isDemotion?: boolean;
  description: string;
}

const CHANNELS: ChannelMeta[] = [
  // Global Transparency
  {
    id: 'demotions-log',
    name: 'demotions-log',
    minLevel: 1,
    tierGroup: 'Global Transparency',
    badge: '🚨 Sentinel',
    isDemotion: true,
    description: 'Automated demotion feed & strict drawdown parameter enforcement ledger.',
  },
  // Level 1 & 2
  {
    id: 'novice-welcome',
    name: 'novice-welcome',
    minLevel: 1,
    tierGroup: 'Level 1: Novice Desk',
    badge: '🌱 Novice',
    description: 'Onboarding desk, discipline checklist, and trade journal fundamentals.',
  },
  {
    id: 'risk-mastery',
    name: 'risk-mastery',
    minLevel: 2,
    tierGroup: 'Level 2: Apprentice Desk',
    badge: '⚡ Apprentice',
    description: 'Position sizing calculations, strictly keeping risk under 2.0% per trade.',
  },
  // Level 3
  {
    id: 'consistent-flow',
    name: 'consistent-flow',
    minLevel: 3,
    tierGroup: 'Level 3: Consistent Desk',
    badge: '🎯 Consistent',
    description: 'Edge validation, monthly expectancy verification, and audited trade reviews.',
  },
  {
    id: 'daily-bias',
    name: 'daily-bias',
    minLevel: 3,
    tierGroup: 'Level 3: Consistent Desk',
    badge: '🎯 Consistent',
    description: 'Daily market structure bias and liquidity pool mapping across FX & Indices.',
  },
  // Level 4
  {
    id: 'funded-floor',
    name: 'funded-floor',
    minLevel: 4,
    tierGroup: 'Level 4: Funded Floor',
    badge: '🛡️ Funded Pro',
    description: 'Prop-firm certified floor ($50k–$200k+). Live trade executions and setups.',
  },
  {
    id: 'live-tape-reading',
    name: 'live-tape-reading',
    minLevel: 4,
    tierGroup: 'Level 4: Funded Floor',
    badge: '🛡️ Funded Pro',
    description: 'Real-time order flow and tick tape analysis during London/NY overlaps.',
  },
  {
    id: 'payout-proofs',
    name: 'payout-proofs',
    minLevel: 4,
    tierGroup: 'Level 4: Funded Floor',
    badge: '🛡️ Funded Pro',
    description: 'Audited prop firm payout certificates, crypto receipts, and bank withdrawals.',
  },
  // Level 5
  {
    id: 'elite-alpha-desk',
    name: 'elite-alpha-desk',
    minLevel: 5,
    tierGroup: 'Level 5: Elite Alpha',
    badge: '💎 Elite Alpha',
    description: 'Systematic algorithmic models, volume profile nodes, and institutional order books.',
  },
  // Level 6
  {
    id: 'live-audio-huddle',
    name: 'live-audio-huddle',
    minLevel: 6,
    tierGroup: 'Level 6: Mentors',
    badge: '👑 Mentor',
    isVoice: true,
    description: 'Live voice huddle and pre-session breakdowns with vetted master traders.',
  },
  // Level 7
  {
    id: 'titan-inner-sanctuary',
    name: 'titan-inner-sanctuary',
    minLevel: 7,
    tierGroup: 'Level 7: Titan Syndicate',
    badge: '🏛️ Market Titan',
    description: 'Closed sanctuary for market titans managing 7-figure institutional capital.',
  },
];

export default function ForumPage() {
  const { user, loginWithDemo, logout } = useAuth();
  const userLevel = user ? user.skill_level : 0;

  // Set initial channel based on user skill level
  const getDefaultChannel = (level: number) => {
    if (level >= 4) return 'funded-floor';
    if (level === 3) return 'consistent-flow';
    if (level === 2) return 'risk-mastery';
    return 'novice-welcome';
  };

  const [activeChannel, setActiveChannel] = useState('funded-floor');
  const [messageInput, setMessageInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [showSimulateDemotionModal, setShowSimulateDemotionModal] = useState(false);
  const [mobileChannelsOpen, setMobileChannelsOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  // Sync active channel if user level updates
  useEffect(() => {
    if (user) {
      setActiveChannel((prev) => {
        const currentMeta = CHANNELS.find((c) => c.id === prev);
        if (currentMeta && user.skill_level < currentMeta.minLevel) {
          return getDefaultChannel(user.skill_level);
        }
        return prev;
      });
    }
  }, [user]);

  // Current channel metadata
  const currentChannel = CHANNELS.find((c) => c.id === activeChannel) || CHANNELS[0];
  const isChannelUnlocked = user ? user.skill_level >= currentChannel.minLevel : false;

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
        name: 'Chidi Okonkwo',
        level: 5,
        badge: '💎 Level 5: Alpha',
        broker: '5%ers High Stakes $100k',
        avatarBg: '#F59E0B',
      },
      content: 'Closed 80% position at 1.08920 for +2.5R gain. Moving stop loss to breakeven + 5 pips.',
      tradeEmbed: {
        pair: 'EUR/USD',
        direction: 'LONG',
        setup: '15m Bullish Order Block (OB)',
        entry: '1.08420',
        sl: '1.08220',
        tp: '1.08920',
        rr: '1:2.50',
        outcome: 'WIN',
        profit: '+2.50% (+$2,500.00)',
      },
      reactions: { '🎯': 24, '🚀': 16, '💰': 19 },
      timestamp: '08:35 UTC',
    },
    {
      id: '4',
      author: {
        name: 'PipBud Sentinel',
        level: 0,
        badge: '🤖 Automated Governance',
        broker: 'PipBud Engine',
        avatarBg: '#DC2626',
      },
      content: '⚠️ DEMOTION NOTICE: Trader @emeka_scalp has been automatically removed from Level 3 (#consistent-flow) and re-assigned to Level 2. Reason: Maximum cumulative drawdown breached 9.0% threshold (hit 11.2%). 3 unmanaged trades logged without stop losses. Zero fake track records allowed in this syndicate.',
      reactions: { '🛡️': 31, '⚖️': 28 },
      timestamp: '09:02 UTC',
      isDemotionNotice: true,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user || !isChannelUnlocked) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        level: user.skill_level,
        badge: user.tier_badge,
        broker: user.broker_name || 'Verified Prop Trader',
        avatarBg: user.tier_color || '#C2410C',
      },
      content: messageInput,
      reactions: { '🔥': 1 },
      timestamp: 'Just now',
    };

    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  const handleReaction = (msgId: string, emoji: string) => {
    setMessages(
      messages.map((m) => {
        if (m.id === msgId) {
          const current = m.reactions[emoji] || 0;
          return {
            ...m,
            reactions: {
              ...m.reactions,
              [emoji]: current + 1,
            },
          };
        }
        return m;
      })
    );
  };

  const handleSimulateDrawdownBreach = () => {
    const demotionMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: 'PipBud Sentinel',
        level: 0,
        badge: '🤖 Automated Governance',
        broker: 'Meritocracy Engine',
        avatarBg: '#DC2626',
      },
      content: `🚨 INSTANT REMOVAL EXECUTED: Trader @${user?.username || 'apex_trader'} has breached the strict 5.0% Prop Daily Drawdown parameter (Single-day loss hit 5.4% during FOMC release). Tier Health collapsed to 0%. Channel permissions revoked: kicked from #funded-floor, #live-tape-reading, and #payout-proofs. Demoted to Level 3.`,
      reactions: { '⚖️': 19, '🛡️': 24 },
      timestamp: 'Just now',
      isDemotionNotice: true,
    };

    setMessages([...messages, demotionMsg]);
    setShowSimulateDemotionModal(false);
    if (mobileInfoOpen) setMobileInfoOpen(false);
  };

  const handleAttachTrade = () => {
    if (!user) return;
    const tradeMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: user.name,
        level: user.skill_level,
        badge: user.tier_badge,
        broker: user.broker_name || 'Verified Broker',
        avatarBg: user.tier_color || '#C2410C',
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
      reactions: { '🎯': 3, '🔥': 2 },
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

  const selectChannel = (channelName: string) => {
    setActiveChannel(channelName);
    setMobileChannelsOpen(false);
  };

  // ==========================================
  // STATE 1: Gated View When NOT Logged In
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
        {/* Simple Public Header */}
        <header className="h-16 border-b border-[#E7E5E4] px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <PipbudLogo size="md" />
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-[#44403C] hover:text-[#C2410C] transition-colors"
            >
              &larr; Back to Home
            </Link>
            <Link
              href="/login?redirect=/forum"
              className="h-9 px-4 text-xs font-semibold text-white bg-[#C2410C] hover:bg-[#EA580C] rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log In</span>
            </Link>
          </div>
        </header>

        {/* Center Auth Gate Card */}
        <main className="flex-1 flex items-center justify-center p-4 py-12">
          <div className="max-w-lg w-full bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-10 shadow-[0_12px_40px_rgba(28,25,23,0.06)] text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#C2410C]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Audited Meritocracy</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
                Log In to Access the Trader Forum
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                The 7-Tier Trader Forum is strictly meritocratic. Trading desks and live tape huddles are unlocked based on your verified Telegram bot track record. Breaching drawdown thresholds triggers automated removal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login?redirect=/forum"
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
                <span>⚡ Try Demo (Level 4: Funded)</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#E7E5E4] text-[11px] text-[#A8A29E] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span>• Tier-locked desks (Level 1–7)</span>
              <span>• Anti-shortfall removal sentinel</span>
              <span>• Zero fake track records</span>
            </div>
          </div>
        </main>

        <footer className="text-center text-xs text-[#A8A29E] py-4 border-t border-[#E7E5E4]">
          &copy; {new Date().getFullYear()} PipBud. Meritocratic Trader Network.
        </footer>
      </div>
    );
  }

  // ==========================================
  // Reusable Channels Sidebar & Drawer Content
  // ==========================================
  const renderChannelsContent = (isMobile: boolean = false) => (
    <div className="flex flex-col h-full">
      {/* Authenticated Trader Status Card */}
      <div className="p-3.5 border-b border-[#E7E5E4] bg-[#FAFAF9] shrink-0 space-y-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
            style={{ backgroundColor: user.tier_color || '#1C1917' }}
          >
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-xs text-[#1C1917] truncate">
                @{user.username}
              </span>
              <span
                className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white shrink-0"
                style={{ backgroundColor: user.tier_color || '#C2410C' }}
              >
                L{user.skill_level}
              </span>
            </div>
            <span
              className="text-[10px] font-semibold block truncate"
              style={{ color: user.tier_color || '#7C3AED' }}
            >
              {user.tier_badge}
            </span>
            <span className="text-[9px] text-[#78716C] block truncate">
              {user.broker_name || 'Verified Prop Trader'}
            </span>
          </div>
        </div>

        {/* Live Health Pill */}
        <div className="bg-white p-2.5 rounded-xl border border-[#E7E5E4] text-[11px] space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-[#44403C] font-semibold">Tier Health</span>
            <span className="text-[#15803D] font-bold">
              {user.tier_health}% 🟢
            </span>
          </div>
          <div className="w-full bg-[#E7E5E4] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#15803D] h-full rounded-full transition-all duration-500"
              style={{ width: `${user.tier_health}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-1 pt-1 border-t border-[#F5F5F4] text-[10px] text-[#78716C]">
            <div>
              WR: <strong className="text-[#1C1917]">{user.win_rate}%</strong>
            </div>
            <div>
              Max DD: <strong className="text-[#C2410C]">{user.max_drawdown}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Categories */}
      <div className="p-3 space-y-4 text-xs flex-1 overflow-y-auto">
        {/* Global Transparency Channel */}
        <div>
          <button
            onClick={() => selectChannel('demotions-log')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-all ${
              activeChannel === 'demotions-log'
                ? 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2] shadow-xs'
                : 'text-[#B91C1C] hover:bg-[#FEF2F2]/60'
            }`}
          >
            <span className="flex items-center gap-1.5 font-bold">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate"># demotions-log</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-pulse shrink-0" />
          </button>
        </div>

        {/* Channels grouped by eligibility */}
        {[
          {
            title: 'Level 4: Funded Floor',
            color: '#7C3AED',
            minLvl: 4,
            channels: ['funded-floor', 'live-tape-reading', 'payout-proofs'],
          },
          {
            title: 'Level 3: Consistent Desk',
            color: '#0F766E',
            minLvl: 3,
            channels: ['consistent-flow', 'daily-bias'],
          },
          {
            title: 'Level 1 & 2: Novice & Apprentice',
            color: '#3B82F6',
            minLvl: 1,
            channels: ['novice-welcome', 'risk-mastery'],
          },
          {
            title: 'Level 5: Elite Alpha',
            color: '#F59E0B',
            minLvl: 5,
            channels: ['elite-alpha-desk'],
          },
          {
            title: 'Level 6: Mentors Voice',
            color: '#EA580C',
            minLvl: 6,
            channels: ['live-audio-huddle'],
            isVoice: true,
          },
          {
            title: 'Level 7: Titan Syndicate',
            color: '#C2410C',
            minLvl: 7,
            channels: ['titan-inner-sanctuary'],
          },
        ].map((group) => {
          const isGroupUnlocked = user.skill_level >= group.minLvl;

          return (
            <div key={group.title}>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between text-[#78716C]">
                <span className="truncate">{group.title}</span>
                {!isGroupUnlocked ? (
                  <span className="flex items-center gap-1 text-[9px] text-[#A8A29E]">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Min L{group.minLvl}</span>
                  </span>
                ) : user.skill_level === group.minLvl ? (
                  <span className="text-[9px] bg-[#FFF7ED] text-[#C2410C] px-1.5 py-0.2 rounded border border-[#FED7AA]">
                    Your Desk
                  </span>
                ) : null}
              </div>

              <div className="space-y-1 mt-1">
                {group.channels.map((chanId) => {
                  const meta = CHANNELS.find((c) => c.id === chanId);
                  if (!meta) return null;
                  const isChanUnlocked = user.skill_level >= meta.minLevel;
                  const isActive = activeChannel === chanId;

                  return isChanUnlocked ? (
                    <button
                      key={chanId}
                      onClick={() => selectChannel(chanId)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all ${
                        isActive
                          ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs'
                          : 'text-[#44403C] hover:bg-[#F5F5F4]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        {meta.isVoice ? (
                          <Mic className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                        ) : (
                          <Hash className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                        )}
                        <span className="truncate">{meta.name}</span>
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C] shrink-0" />
                      )}
                    </button>
                  ) : (
                    <button
                      key={chanId}
                      onClick={() => selectChannel(chanId)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-all ${
                        isActive
                          ? 'bg-[#F5F5F4] text-[#78716C] font-medium border border-[#E7E5E4]'
                          : 'text-[#A8A29E] hover:bg-[#FAFAF9]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate opacity-70">
                        <Lock className="w-3 h-3 shrink-0" />
                        <span className="truncate">#{meta.name}</span>
                      </span>
                      <span className="text-[9px] text-[#A8A29E] px-1 bg-[#FAFAF9] rounded shrink-0">
                        L{meta.minLevel}+
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Footer in Drawer */}
      <div className="p-3 border-t border-[#E7E5E4] bg-[#FAFAF9] shrink-0 space-y-1.5 text-xs">
        <Link
          href="/journal"
          className="flex items-center justify-between px-2.5 py-2 rounded-xl text-[#1C1917] hover:bg-white hover:text-[#C2410C] font-medium transition-all"
        >
          <span className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#C2410C]" />
            <span>Web Journal Dashboard</span>
          </span>
          <span className="text-[10px] font-bold text-[#0F766E] bg-[#F0FDFA] px-1.5 py-0.2 rounded border border-[#CCFBF1]">
            Live
          </span>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-[#78716C] hover:bg-white hover:text-[#1C1917] font-medium transition-all"
        >
          <PipbudLogo size="sm" showWordmark={false} />
          <span>Home Landing</span>
        </Link>

        <Link
          href="/login"
          className="flex items-center justify-between px-2.5 py-2 rounded-xl text-[#78716C] hover:bg-white hover:text-[#1C1917] font-medium transition-all"
        >
          <span>Switch Skill Tier / Account</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );

  // ==========================================
  // Reusable Governance Content
  // ==========================================
  const renderGovernanceContent = () => (
    <div className="space-y-4">
      {/* Room Governance Card */}
      <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
          <span>Desk Verification Protocol</span>
        </div>
        <p className="text-[11px] text-[#44403C] leading-relaxed">
          <strong>#{activeChannel}</strong> is strictly governed by automated anti-shortfall audits.
        </p>
        <div className="space-y-1.5 text-[11px] pt-1 border-t border-[#E7E5E4]">
          <div className="flex justify-between">
            <span className="text-[#78716C]">Min Skill Required:</span>
            <span className="font-bold text-[#1C1917]">
              Level {currentChannel.minLevel} ({currentChannel.badge})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#78716C]">Max Daily Drawdown:</span>
            <span className="font-bold text-[#C2410C]">&le; 5.0%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#78716C]">Your Tier Status:</span>
            <span
              className="font-bold"
              style={{ color: isChannelUnlocked ? '#15803D' : '#DC2626' }}
            >
              {isChannelUnlocked ? 'Qualified & Verified 🟢' : `Locked (Need L${currentChannel.minLevel}) 🔒`}
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Demotion Action */}
      <div className="p-3.5 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#991B1B]">
          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
          <span>Automated Demotion Demo</span>
        </div>
        <p className="text-[11px] text-[#7F1D1D] leading-relaxed">
          Experience what happens when a trader breaches maximum drawdown rules in real time.
        </p>
        <button
          onClick={() => setShowSimulateDemotionModal(true)}
          className="w-full py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold transition-all active:scale-98 shadow-xs"
        >
          🚨 Simulate Drawdown Demotion
        </button>
      </div>

      {/* Online Verified Traders */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E4] space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Online Traders</span>
          </span>
          <span className="text-[10px] text-[#15803D] font-mono bg-[#DCFCE7] px-2 py-0.5 rounded-full">
            4 Active
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Authenticated Trader (You) */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA]">
            <div
              className="w-6 h-6 rounded-lg text-white text-[10px] font-bold flex items-center justify-center shrink-0"
              style={{ backgroundColor: user.tier_color || '#1C1917' }}
            >
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate flex-1">
              <span className="font-bold text-[#1C1917] block text-[11px] truncate">
                @{user.username} <span className="text-[#C2410C] font-normal">(You)</span>
              </span>
              <span
                className="text-[9px] font-semibold block truncate"
                style={{ color: user.tier_color || '#7C3AED' }}
              >
                {user.tier_badge}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FAFAF9]">
            <div className="w-6 h-6 rounded-lg bg-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              SK
            </div>
            <div className="truncate">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate">Solomon Kane</span>
              <span className="text-[9px] text-[#C2410C]">Level 7: Titan</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FAFAF9]">
            <div className="w-6 h-6 rounded-lg bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              AB
            </div>
            <div className="truncate">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate">Aisha Bello</span>
              <span className="text-[9px] text-[#EA580C]">Level 6: Mentor</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FAFAF9]">
            <div className="w-6 h-6 rounded-lg bg-[#F59E0B] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              CO
            </div>
            <div className="truncate">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate">Chidi Okonkwo</span>
              <span className="text-[9px] text-[#F59E0B]">Level 5: Alpha</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] bg-[#FAFAF9] flex flex-col font-sans overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 bg-white border-b border-[#E7E5E4] px-3 sm:px-4 flex items-center justify-between shrink-0 z-30 shadow-xs">
        {/* Left Side: Mobile back & channel drawer trigger, Desktop branding */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile Back to Journal Button */}
          <Link
            href="/journal"
            className="md:hidden p-1.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-[#44403C] hover:text-[#C2410C] hover:bg-[#FFF7ED] transition-all flex items-center gap-1 active:scale-95 shadow-xs shrink-0"
            title="Back to Web Journal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-semibold hidden xs:inline">Journal</span>
          </Link>

          {/* Mobile Channel Drawer Button */}
          <button
            onClick={() => setMobileChannelsOpen(true)}
            className="md:hidden px-2.5 py-1.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-[#1C1917] hover:bg-[#FFF7ED] transition-all flex items-center gap-1.5 active:scale-95 shadow-xs min-w-0"
            aria-label="Open Channels Drawer"
          >
            <Hash className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
            <span className="text-xs font-bold text-[#1C1917] truncate max-w-[130px]">
              {activeChannel}
            </span>
            <ChevronDown className="w-3 h-3 text-[#78716C] shrink-0" />
          </button>

          {/* Desktop / Tablet Branding */}
          <div className="hidden md:flex items-center gap-3">
            <PipbudLogo size="sm" />
            <span className="h-4 w-px bg-[#E7E5E4]" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1C1917]">PipBud Trading Syndicate</span>
              <span className="text-[10px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] px-2 py-0.5 rounded-full">
                7-Tier Meritocracy
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Account pill, rules, and links */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Rules Icon */}
          <button
            onClick={() => setMobileInfoOpen(true)}
            className="xl:hidden p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-[#0F766E] hover:bg-[#F0FDFA] transition-all flex items-center gap-1 active:scale-95 shadow-xs"
            title="Desk Verification Rules"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Rules</span>
          </button>

          {/* Web Journal Direct Link (Desktop) */}
          <Link
            href="/journal"
            className="hidden md:inline-flex text-xs font-semibold text-[#44403C] hover:text-[#C2410C] px-3 py-1.5 rounded-xl hover:bg-[#FFF7ED] border border-transparent hover:border-[#FED7AA] transition-all"
          >
            Web Journal
          </Link>

          {/* User Account Chip */}
          <Link
            href="/login"
            className="px-2.5 py-1 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
            title="Trader Account & Tier Switcher"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: user.tier_color || '#C2410C' }}
            />
            <span className="font-bold text-xs text-[#C2410C]">L{user.skill_level}</span>
            <span className="text-xs font-medium text-[#44403C] hidden sm:inline max-w-[90px] truncate">
              @{user.username}
            </span>
          </Link>

          {/* Telegram Bot Link */}
          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 px-2.5 sm:px-3 text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl transition-all shadow-xs inline-flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Bot</span>
          </a>
        </div>
      </header>

      {/* Main App Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Left Sidebar: Channels List */}
        <aside className="w-64 bg-white border-r border-[#E7E5E4] hidden md:flex flex-col shrink-0 overflow-y-auto">
          {renderChannelsContent(false)}
        </aside>

        {/* Mobile Sliding Channels Drawer (Offcanvas) */}
        {mobileChannelsOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-150">
            {/* Dark Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileChannelsOpen(false)}
            />

            {/* Sidebar Content */}
            <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              <div className="p-3 border-b border-[#E7E5E4] flex items-center justify-between bg-[#FAFAF9]">
                <div className="flex items-center gap-2">
                  <PipbudLogo size="sm" showWordmark={false} />
                  <span className="text-xs font-bold text-[#1C1917]">7-Tier Channels</span>
                </div>
                <button
                  onClick={() => setMobileChannelsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#E7E5E4] text-[#78716C]"
                  aria-label="Close channels drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {renderChannelsContent(true)}
              </div>
            </div>
          </div>
        )}

        {/* Middle Column: Chat Window (100% responsive) */}
        <main className="flex-1 flex flex-col bg-[#FAFAF9] overflow-hidden min-w-0">
          {/* Desktop Subheader: Channel title and rules */}
          <div className="h-11 bg-white border-b border-[#E7E5E4] px-4 hidden md:flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#1C1917] flex items-center gap-1.5 truncate">
                <Hash className="w-4 h-4 text-[#C2410C] shrink-0" />
                <span>{activeChannel}</span>
              </span>
              <span className="text-xs text-[#78716C] truncate hidden lg:inline">
                • {currentChannel.description}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isChannelUnlocked
                    ? 'bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]'
                    : 'bg-[#FEF2F2] text-[#B91C1C] border border-[#FEE2E2]'
                }`}
              >
                {isChannelUnlocked ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                    <span>Unlocked for L{user.skill_level}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-[#B91C1C]" />
                    <span>Min L{currentChannel.minLevel} Required</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 sm:gap-3.5 ${
                  msg.isDemotionNotice
                    ? 'p-3 sm:p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2]'
                    : ''
                }`}
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs text-white flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: msg.author.avatarBg }}
                >
                  {msg.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-xs text-[#1C1917] truncate">{msg.author.name}</span>
                    <span
                      className={`px-1.5 sm:px-2 py-0.2 rounded text-[9px] sm:text-[10px] font-bold truncate ${
                        msg.isDemotionNotice
                          ? 'bg-[#B91C1C] text-white'
                          : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                      }`}
                    >
                      {msg.author.badge}
                    </span>
                    <span className="text-[10px] text-[#78716C] hidden sm:inline">{msg.author.broker}</span>
                    <span className="text-[9px] sm:text-[10px] text-[#A8A29E] ml-auto shrink-0">{msg.timestamp}</span>
                  </div>

                  {/* Text content */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed break-words ${
                      msg.isDemotionNotice ? 'text-[#991B1B] font-medium' : 'text-[#292524]'
                    }`}
                  >
                    {msg.content}
                  </p>

                  {/* Code snippet */}
                  {msg.codeSnippet && (
                    <div className="bg-[#1C1917] text-[#FAFAF9] p-3 rounded-xl border border-[#292524] space-y-2 mt-2 max-w-xl">
                      <div className="flex items-center justify-between text-[11px] text-[#A8A29E] pb-1.5 border-b border-[#292524]">
                        <span className="font-mono">{msg.codeSnippet.language}</span>
                        <button
                          onClick={() => copyCodeToClipboard(msg.codeSnippet!.code)}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-[#15803D]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="text-[10px] sm:text-[11px] leading-relaxed overflow-x-auto font-mono">
                        {msg.codeSnippet.code}
                      </pre>
                    </div>
                  )}

                  {/* Embedded Audited Trade Card */}
                  {msg.tradeEmbed && (
                    <div className="bg-white p-3 rounded-xl border border-[#E7E5E4] shadow-xs max-w-lg space-y-2 mt-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                              msg.tradeEmbed.direction === 'LONG'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : 'bg-[#FEE2E2] text-[#B91C1C]'
                            }`}
                          >
                            {msg.tradeEmbed.direction}
                          </span>
                          <span className="font-bold text-xs text-[#1C1917] truncate">{msg.tradeEmbed.pair}</span>
                          <span className="text-[10px] text-[#78716C] truncate hidden sm:inline">{msg.tradeEmbed.setup}</span>
                        </div>
                        <span className="text-xs font-bold text-[#15803D] tabular-nums shrink-0">
                          {msg.tradeEmbed.profit}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[10px] bg-[#FAFAF9] p-2 rounded-lg border border-[#E7E5E4] font-mono">
                        <div>
                          <span className="text-[#78716C] block text-[9px]">Entry</span>
                          <span className="text-[#1C1917] font-semibold">{msg.tradeEmbed.entry}</span>
                        </div>
                        <div>
                          <span className="text-[#78716C] block text-[9px]">SL</span>
                          <span className="text-[#B91C1C] font-semibold">{msg.tradeEmbed.sl}</span>
                        </div>
                        <div>
                          <span className="text-[#78716C] block text-[9px]">TP</span>
                          <span className="text-[#15803D] font-semibold">{msg.tradeEmbed.tp}</span>
                        </div>
                        <div>
                          <span className="text-[#78716C] block text-[9px]">R:R</span>
                          <span className="text-[#C2410C] font-bold">{msg.tradeEmbed.rr}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Emoji Reactions */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(msg.id, emoji)}
                        className="px-2 py-0.5 rounded-full bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] text-[11px] text-[#44403C] flex items-center gap-1 transition-colors active:scale-95"
                      >
                        <span>{emoji}</span>
                        <span className="font-medium text-[10px]">{count}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => handleReaction(msg.id, '🔥')}
                      className="px-1.5 py-0.5 rounded-full hover:bg-white text-[11px] text-[#78716C] active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Locked Channel Notice Banner inside Chat */}
            {!isChannelUnlocked && (
              <div className="p-4 rounded-2xl bg-white border border-[#FED7AA] shadow-xs text-center space-y-2 my-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center mx-auto text-[#C2410C]">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">
                  Desk Gated: Minimum Level {currentChannel.minLevel} ({currentChannel.badge})
                </h4>
                <p className="text-[11px] text-[#78716C] max-w-md mx-auto">
                  Your verified tier is Level {user.skill_level} ({user.tier_badge}). You can view the stream, but sending messages and audio participation require ranking up in @PipBudBot.
                </p>
                <div className="pt-1">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C] hover:underline"
                  >
                    <span>Test another skill tier &rarr;</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Message Composer (Clean mobile docking) */}
          <div className="p-2.5 sm:p-4 bg-white border-t border-[#E7E5E4] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-4 shrink-0">
            {isChannelUnlocked ? (
              <form onSubmit={handleSendMessage} className="space-y-1.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={`Message #${activeChannel}...`}
                    className="flex-1 h-10 sm:h-11 px-3 sm:px-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs sm:text-sm focus:border-[#C2410C] focus:bg-white outline-hidden transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowAttachModal(true)}
                    title="Attach Audited Trade from Journal"
                    className="h-10 sm:h-11 px-2.5 sm:px-3 bg-[#FAFAF9] hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[#C2410C] rounded-xl text-xs font-medium inline-flex items-center gap-1 shrink-0 transition-all active:scale-95"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="hidden md:inline">Attach Trade</span>
                  </button>

                  <button
                    type="submit"
                    className="h-10 sm:h-11 px-3.5 sm:px-5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shadow-xs shrink-0 active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center justify-between text-[11px] text-[#78716C] px-1">
                  <span>Enter to send • Stamped with @{user.username} (L{user.skill_level})</span>
                  <span className="text-[#0F766E] font-medium">Audited Meritocracy Active</span>
                </div>
              </form>
            ) : (
              <div className="h-11 px-3 rounded-xl bg-[#F5F5F4] border border-[#E7E5E4] flex items-center justify-between text-xs text-[#78716C]">
                <span className="flex items-center gap-1.5 truncate">
                  <Lock className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                  <span className="truncate">
                    Channel locked. Required: Level {currentChannel.minLevel} ({currentChannel.badge})
                  </span>
                </span>
                <Link
                  href="/login"
                  className="font-bold text-[#C2410C] hover:underline text-[11px] shrink-0"
                >
                  Switch Tier
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* Right Column: Room Governance & Transparency Bar (Desktop XL) */}
        <aside className="w-72 bg-white border-l border-[#E7E5E4] hidden xl:flex flex-col shrink-0 p-4 space-y-6 overflow-y-auto">
          {renderGovernanceContent()}
        </aside>

        {/* Mobile / Tablet Info Drawer */}
        {mobileInfoOpen && (
          <div className="fixed inset-0 z-50 xl:hidden flex justify-end animate-in fade-in duration-150">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileInfoOpen(false)}
            />
            <div className="relative w-80 max-w-[88vw] bg-white h-full shadow-2xl flex flex-col z-10 p-4 space-y-4 overflow-y-auto animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
                <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                  <span>Room Governance</span>
                </h3>
                <button
                  onClick={() => setMobileInfoOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#F5F5F4] text-[#78716C]"
                  aria-label="Close governance drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {renderGovernanceContent()}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Attach Trade Card */}
      {showAttachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-sm sm:text-base font-bold text-[#1C1917] flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-[#C2410C]" />
                <span>Attach Audited Trade</span>
              </h3>
              <button
                onClick={() => setShowAttachModal(false)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#44403C]">
              Only trades logged with verifiable broker price levels and timestamps can be shared in verified desks.
            </p>

            {/* Selectable demo trade */}
            <div
              onClick={handleAttachTrade}
              className="p-3.5 rounded-2xl border border-[#FED7AA] bg-[#FFF7ED] hover:bg-[#FFEDD5] cursor-pointer transition-all space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                  SHORT • GBP/USD
                </span>
                <span className="font-bold text-xs text-[#15803D]">+3.00% (+$3,000.00)</span>
              </div>
              <div className="text-[11px] text-[#44403C]">
                Setup: 15m Fair Value Gap (FVG) • R:R: 1:3.00 • Exit: 1.29250
              </div>
              <div className="text-[10px] text-[#78716C] pt-1 border-t border-[#FED7AA]/60 flex items-center justify-between">
                <span>Broker: {user.broker_name || 'FTMO Master'}</span>
                <span className="text-[#0F766E] font-medium">Verified by @PipBudBot</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowAttachModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#78716C] hover:bg-[#F5F5F4]"
              >
                Cancel
              </button>
              <button
                onClick={handleAttachTrade}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white shadow-xs"
              >
                Attach & Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Simulate Demotion Breach */}
      {showSimulateDemotionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#FEE2E2] max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2 text-[#DC2626]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm sm:text-base font-bold text-[#1C1917]">
                  Simulate Drawdown Demotion
                </h3>
              </div>
              <button
                onClick={() => setShowSimulateDemotionModal(false)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#44403C] leading-relaxed">
              This triggers the automated <strong>PipBud Anti-Shortfall Sentinel</strong>. In production, when a trader&apos;s verified trade log hits a single-day loss &gt; 5.0% or cumulative drawdown &gt; 10%, their channel access is revoked automatically.
            </p>

            <div className="p-3 bg-[#FEF2F2] rounded-2xl border border-[#FEE2E2] text-xs text-[#991B1B] space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertOctagon className="w-4 h-4" />
                <span>Simulated Breach Parameters:</span>
              </div>
              <div className="text-[11px]">• Single-day drawdown: 5.4% (Threshold: 5.0%)</div>
              <div className="text-[11px]">• Action: Instant removal from #funded-floor to Level 3</div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowSimulateDemotionModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#78716C] hover:bg-[#F5F5F4]"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateDrawdownBreach}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-xs"
              >
                Execute Sentinel Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
