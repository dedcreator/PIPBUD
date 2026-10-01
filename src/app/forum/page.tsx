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
  Check,
  Menu,
  Info
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
  const [mobileChannelsOpen, setMobileChannelsOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

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
    {
      id: '5',
      author: {
        name: user ? user.name : 'Apex Trader',
        level: userLevel,
        badge: user ? user.tier_badge : '🛡️ Level 4: Funded',
        broker: user?.broker_name || 'FTMO Funded $100k',
        avatarBg: user?.tier_color || '#8B5CF6',
      },
      content: 'Logged today’s London session setup via @PipBudBot in Telegram. Passed AI trade validation with 1:3.0 R:R confluence.',
      reactions: { '🔥': 5, '🎯': 4 },
      timestamp: '09:15 UTC',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: user ? user.name : 'Apex Trader',
        level: userLevel,
        badge: user ? user.tier_badge : `🛡️ Level ${userLevel}: Verified`,
        broker: user?.broker_name || 'Verified Prop Trader',
        avatarBg: user?.tier_color || '#8B5CF6',
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
      content: `🚨 INSTANT REMOVAL EXECUTED: Trader @kemi_pips has breached the strict 5.0% Prop Daily Drawdown parameter (Single-day loss hit 5.4% during FOMC release). Tier Health collapsed to 0%. Channel permissions revoked: kicked from #funded-floor, #live-tape-reading, and #payout-proofs. Demoted to Level 3.`,
      reactions: { '⚖️': 19, '🛡️': 24 },
      timestamp: 'Just now',
      isDemotionNotice: true,
    };

    setMessages([...messages, demotionMsg]);
    setShowSimulateDemotionModal(false);
    if (mobileInfoOpen) setMobileInfoOpen(false);
  };

  const handleAttachTrade = () => {
    const tradeMsg: ChatMessage = {
      id: Date.now().toString(),
      author: {
        name: user ? user.name : 'Apex Trader',
        level: userLevel,
        badge: user ? user.tier_badge : '🛡️ Level 4: Funded',
        broker: user?.broker_name || 'FTMO Funded $100k',
        avatarBg: user?.tier_color || '#8B5CF6',
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

  const selectChannel = (channelName: string) => {
    setActiveChannel(channelName);
    setMobileChannelsOpen(false);
  };

  // Reusable channel list content
  const renderChannelsContent = (isMobile: boolean = false) => (
    <div className="flex flex-col h-full">
      {/* User Status Card */}
      <div className="p-3.5 border-b border-[#E7E5E4] bg-[#FAFAF9] shrink-0">
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
      <div className="p-3 space-y-4 text-xs flex-1 overflow-y-auto">
        {/* Global Transparency Channel */}
        <div>
          <button
            onClick={() => selectChannel('demotions-log')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-all ${
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
            <span className="text-[9px] bg-[#F5F3FF] px-1.5 py-0.2 rounded border border-[#DDD6FE]">
              {userLevel >= 4 ? 'Your Desk' : 'Locked'}
            </span>
          </div>
          <div className="space-y-1 mt-1">
            <button
              onClick={() => selectChannel('funded-floor')}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all ${
                activeChannel === 'funded-floor'
                  ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs'
                  : 'text-[#44403C] hover:bg-[#F5F5F4]'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Hash className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                <span className="truncate">funded-floor</span>
              </span>
              <span className="text-[10px] font-bold bg-[#FFEDD5] text-[#C2410C] px-1.5 py-0.2 rounded shrink-0">
                Live
              </span>
            </button>

            <button
              onClick={() => selectChannel('live-tape-reading')}
              className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left transition-all ${
                activeChannel === 'live-tape-reading'
                  ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs'
                  : 'text-[#44403C] hover:bg-[#F5F5F4]'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Hash className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                <span className="truncate">live-tape-reading</span>
              </span>
            </button>

            <button
              onClick={() => selectChannel('payout-proofs')}
              className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left transition-all ${
                activeChannel === 'payout-proofs'
                  ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs'
                  : 'text-[#44403C] hover:bg-[#F5F5F4]'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Hash className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                <span className="truncate">payout-proofs</span>
              </span>
            </button>
          </div>
        </div>

        {/* Level 3 Channels */}
        <div>
          <div className="px-2 py-1 text-[10px] font-bold text-[#0F766E] uppercase tracking-wider">
            Level 3: Consistent
          </div>
          <div className="space-y-1 mt-1">
            <button
              onClick={() => selectChannel('consistent-flow')}
              className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left text-[#44403C] hover:bg-[#F5F5F4] transition-all ${
                activeChannel === 'consistent-flow' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs' : ''
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Hash className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                <span className="truncate">consistent-flow</span>
              </span>
            </button>
            <button
              onClick={() => selectChannel('daily-bias')}
              className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left text-[#44403C] hover:bg-[#F5F5F4] transition-all ${
                activeChannel === 'daily-bias' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs' : ''
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                <span className="truncate">daily-bias</span>
              </span>
            </button>
          </div>
        </div>

        {/* Level 1 & 2 Channels */}
        <div>
          <div className="px-2 py-1 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider">
            Levels 1 & 2: Novice & Apprentice
          </div>
          <div className="space-y-1 mt-1">
            <button
              onClick={() => selectChannel('novice-welcome')}
              className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left text-[#44403C] hover:bg-[#F5F5F4] transition-all ${
                activeChannel === 'novice-welcome' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold shadow-xs' : ''
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Hash className="w-3.5 h-3.5 text-[#78716C]" />
                <span className="truncate">novice-welcome</span>
              </span>
            </button>
          </div>
        </div>

        {/* Higher Tiers (Locked if under Level 5) */}
        <div>
          <div className="px-2 py-1 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider flex items-center justify-between">
            <span>Level 5: Elite Alpha</span>
            {userLevel < 5 && <Lock className="w-3 h-3 text-[#A8A29E]" />}
          </div>
          <div className="space-y-1 mt-1">
            {userLevel >= 5 ? (
              <button
                onClick={() => selectChannel('elite-alpha-desk')}
                className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left transition-all ${
                  activeChannel === 'elite-alpha-desk' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold' : 'text-[#44403C]'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Hash className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>elite-alpha-desk</span>
                </span>
              </button>
            ) : (
              <div className="flex items-center justify-between px-2.5 py-2 text-[#78716C] opacity-60 bg-[#F5F5F4]/60 rounded-xl cursor-not-allowed">
                <span className="flex items-center gap-1.5"># elite-alpha-desk</span>
                <Lock className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="px-2 py-1 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider flex items-center justify-between">
            <span>Level 6: Mentors</span>
            {userLevel < 6 && <Lock className="w-3 h-3 text-[#A8A29E]" />}
          </div>
          <div className="space-y-1 mt-1">
            {userLevel >= 6 ? (
              <button
                onClick={() => selectChannel('live-audio-huddle')}
                className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left transition-all ${
                  activeChannel === 'live-audio-huddle' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold' : 'text-[#44403C]'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Mic className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>live-audio-huddle</span>
                </span>
              </button>
            ) : (
              <div className="flex items-center justify-between px-2.5 py-2 text-[#78716C] opacity-60 bg-[#F5F5F4]/60 rounded-xl cursor-not-allowed">
                <span className="flex items-center gap-1.5"># live-audio-huddle</span>
                <Mic className="w-3 h-3 text-[#A8A29E]" />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="px-2 py-1 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider flex items-center justify-between">
            <span>Level 7: Titan Syndicate</span>
            {userLevel < 7 && <Lock className="w-3 h-3 text-[#A8A29E]" />}
          </div>
          <div className="space-y-1 mt-1">
            {userLevel >= 7 ? (
              <button
                onClick={() => selectChannel('titan-inner-sanctuary')}
                className={`w-full flex items-center px-2.5 py-2 rounded-xl text-left transition-all ${
                  activeChannel === 'titan-inner-sanctuary' ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold' : 'text-[#44403C]'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>titan-inner-sanctuary</span>
                </span>
              </button>
            ) : (
              <div className="flex items-center justify-between px-2.5 py-2 text-[#78716C] opacity-60 bg-[#F5F5F4]/60 rounded-xl cursor-not-allowed">
                <span className="flex items-center gap-1.5"># titan-inner-sanctuary</span>
                <Lock className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Reusable Governance Content
  const renderGovernanceContent = () => (
    <div className="space-y-4">
      {/* Room Governance Card */}
      <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
          <span>Desk Verification Rules</span>
        </div>
        <p className="text-[11px] text-[#44403C] leading-relaxed">
          <strong>#{activeChannel}</strong> is governed by the PipBud Meritocracy Protocol.
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
            <span className="text-[#78716C]">Continuous Audit:</span>
            <span className="font-mono text-[#0F766E]">Active (Live)</span>
          </div>
        </div>
      </div>

      {/* Test Demotion Sandbox Trigger */}
      <div className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412] block">
          Live Removal Simulation
        </span>
        <h4 className="text-xs font-bold text-[#1C1917]">
          Simulate Drawdown Violation
        </h4>
        <p className="text-[11px] text-[#44403C]">
          Trigger real-time removal when a trader exceeds their tier&apos;s drawdown threshold.
        </p>
        <button
          onClick={handleSimulateDrawdownBreach}
          className="w-full py-2 bg-white hover:bg-[#FEF2F2] border border-[#B91C1C] text-[#B91C1C] rounded-xl text-xs font-bold transition-all shadow-xs"
        >
          Execute Demotion Broadcast
        </button>
      </div>

      {/* Online Operators */}
      <div className="space-y-2 pt-1">
        <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
          Room Operators (Online)
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FAFAF9]">
            <div className="w-6 h-6 rounded-full bg-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              SK
            </div>
            <div className="truncate">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate">Solomon Kane</span>
              <span className="text-[9px] text-[#C2410C]">Level 7: Titan Desk</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FAFAF9]">
            <div className="w-6 h-6 rounded-full bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              AB
            </div>
            <div className="truncate">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate">Aisha Bello</span>
              <span className="text-[9px] text-[#EA580C]">Level 6: Mentor</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#FAFAF9]">
            <div className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              AT
            </div>
            <div className="truncate">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate">@{user?.username || 'Apex Trader'} (You)</span>
              <span className="text-[9px] text-[#7C3AED]">{user?.tier_badge || 'Level 4: Funded Pro'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] bg-[#FAFAF9] flex flex-col font-sans overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 bg-white border-b border-[#E7E5E4] px-3 sm:px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Toggle Channels Drawer */}
          <button
            onClick={() => setMobileChannelsOpen(true)}
            className="md:hidden p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-[#1C1917] hover:bg-[#FFF7ED] transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
            aria-label="Open Channels Drawer"
          >
            <Menu className="w-4 h-4 text-[#C2410C]" />
            <span className="text-xs font-bold text-[#1C1917] max-w-[110px] truncate">
              #{activeChannel}
            </span>
            <ChevronDown className="w-3 h-3 text-[#78716C]" />
          </button>

          {/* Logo on Desktop / Tablet */}
          <div className="hidden md:flex items-center gap-3">
            <PipbudLogo size="sm" />
            <span className="h-4 w-px bg-[#E7E5E4]" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#1C1917]">PipBud Trading Syndicate</span>
              <span className="text-[10px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] px-2 py-0.5 rounded-full">
                7-Tier Meritocracy
              </span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Room info button on mobile/tablet */}
          <button
            onClick={() => setMobileInfoOpen(true)}
            className="xl:hidden p-2 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-[#44403C] hover:text-[#1C1917] text-xs font-medium inline-flex items-center gap-1.5 active:scale-95 shadow-xs"
            title="Room Info & Rules"
          >
            <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
            <span className="text-xs font-bold hidden sm:inline">Rules</span>
          </button>

          <Link
            href="/journal"
            className="hidden sm:inline-flex text-xs font-medium text-[#44403C] hover:text-[#C2410C] px-3 py-1.5 rounded-xl hover:bg-[#FFF7ED] border border-transparent hover:border-[#FED7AA] transition-all"
          >
            Web Journal
          </Link>

          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white px-3 py-1.5 rounded-xl transition-all shadow-xs inline-flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span className="hidden sm:inline">Bot</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
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
                  aria-label="Close channels"
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

        {/* Middle Column: Chat Window (Takes 100% on Mobile!) */}
        <main className="flex-1 flex flex-col bg-[#FAFAF9] overflow-hidden min-w-0">
          {/* Channel Subheader */}
          <div className="h-12 bg-white border-b border-[#E7E5E4] px-3 sm:px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-xs sm:text-sm text-[#1C1917] flex items-center gap-1.5 truncate">
                <Hash className="w-4 h-4 text-[#C2410C] shrink-0" />
                <span className="truncate">{activeChannel}</span>
              </span>

              <span className="hidden sm:inline-block text-xs text-[#78716C] truncate">
                {activeChannel === 'demotions-log'
                  ? '• Public transparency ledger'
                  : '• Verified discussion stream'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                Audited
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
                      msg.isDemotionNotice ? 'text-[#991B1B] font-medium' : 'text-[#44403C]'
                    }`}
                  >
                    {msg.content}
                  </p>

                  {/* Embedded PineScript Code Snippet */}
                  {msg.codeSnippet && (
                    <div className="bg-[#1C1917] rounded-xl p-2.5 sm:p-3 border border-[#44403C] text-xs font-mono text-[#D6D3D1] space-y-2 overflow-x-auto relative">
                      <div className="flex items-center justify-between text-[10px] text-[#A8A29E] border-b border-[#44403C] pb-1.5">
                        <span>TradingView PineScript v5</span>
                        <button
                          onClick={() => copyCodeToClipboard(msg.codeSnippet!.code)}
                          className="flex items-center gap-1 text-[#FB923C] hover:text-white"
                        >
                          {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
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
                    <div className="bg-white p-3 rounded-xl border border-[#E7E5E4] shadow-xs max-w-lg space-y-2">
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

          {/* Bottom Message Composer (Clean padding above mobile nav dock) */}
          <div className="p-2.5 sm:p-4 bg-white border-t border-[#E7E5E4] pb-20 md:pb-4 shrink-0">
            <form onSubmit={handleSendMessage} className="space-y-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Message #${activeChannel}...`}
                  className="flex-1 h-10 sm:h-11 px-3 sm:px-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs sm:text-sm focus:border-[#C2410C] focus:bg-white outline-hidden"
                />

                <button
                  type="button"
                  onClick={() => setShowAttachModal(true)}
                  title="Attach Trade from Journal"
                  className="h-10 sm:h-11 px-2.5 sm:px-3 bg-[#FAFAF9] hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[#C2410C] rounded-xl text-xs font-medium inline-flex items-center gap-1 shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="hidden md:inline">Attach Trade</span>
                </button>

                <button
                  type="submit"
                  className="h-10 sm:h-11 px-3.5 sm:px-5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 shadow-xs shrink-0 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center justify-between text-[11px] text-[#78716C] px-1">
                <span>Enter to send • Audited trade cards & scripts supported</span>
                <span className="text-[#0F766E] font-medium">Anti-Shortfall Active</span>
              </div>
            </form>
          </div>
        </main>

        {/* Right Column: Room Governance & Transparency Bar (Desktop) */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-sm sm:text-base font-bold text-[#1C1917]">Attach Audited Trade</h3>
              <button
                onClick={() => setShowAttachModal(false)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#44403C]">
              Only trades logged with verifiable broker price levels and timestamps can be attached.
            </p>

            {/* Selectable demo trade */}
            <div
              onClick={handleAttachTrade}
              className="p-3 rounded-xl border border-[#FED7AA] bg-[#FFF7ED] hover:bg-[#FFEDD5] cursor-pointer transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D]">
                  SHORT • GBP/USD
                </span>
                <span className="font-bold text-xs text-[#15803D]">+3.00%</span>
              </div>
              <div className="text-[11px] text-[#44403C]">
                Setup: 15m Fair Value Gap (FVG) • R:R: 1:3.00 • Exit: 1.29250
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
                className="px-4 py-2 rounded-xl text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white"
              >
                Attach & Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
