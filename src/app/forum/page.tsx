'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PipbudLogo from '@/components/PipbudLogo';
import { useAuth, BrokerConnectPayload, getApiBase } from '@/context/AuthContext';
import { MessageItemSkeleton } from '@/components/SkeletonLoader';
import {
  MessageSquare,
  ShieldCheck,
  Sliders,
  Lock,
  Mic,
  MicOff,
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
  Award,
  Radio,
  Headphones,
  PhoneOff,
  Clock,
  TrendingUp,
  Flame,
  CheckCircle,
  Eye,
  FileText,
  BadgeCheck,
  Server,
  Key,
  ShieldAlert,
  Wallet,
  Building2,
  HelpCircle
} from 'lucide-react';

export interface AuditedTrade {
  pair: string;
  direction: 'LONG' | 'SHORT';
  setup: string;
  entry: string;
  sl: string;
  tp: string;
  rr: string;
  outcome: string;
  profit: string;
  pipsRisk?: string;
  pipsTarget?: string;
  hash?: string;
  ticketId?: string;
  session?: string;
  confluences?: string[];
}

export interface ChatMessage {
  id: string;
  author: {
    name: string;
    username: string;
    level: number;
    badge: string;
    broker: string;
    avatarBg: string;
    avatarType?: string;
    avatarUrl?: string;
  };
  content: string;
  messageType?: 'discussion' | 'question' | 'setup' | 'intel' | 'code';
  replyTo?: {
    id: string;
    authorName: string;
    preview: string;
  };
  tradeEmbed?: AuditedTrade;
  codeSnippet?: {
    language: string;
    code: string;
  };
  reactions: { [emoji: string]: number };
  timestamp: string;
  isDemotionNotice?: boolean;
}

export interface ChannelMeta {
  id: string;
  name: string;
  minLevel: number;
  tierGroup: string;
  badge: string;
  isVoice?: boolean;
  isDemotion?: boolean;
  description: string;
}

export interface TraderProfileModalData {
  name: string;
  username: string;
  level: number;
  badge: string;
  tierColor: string;
  broker: string;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  totalTrades: number;
  tierHealth: number;
  tradingStyle: string;
  bio: string;
  avatarBg: string;
  avatarType?: string;
  avatarUrl?: string;
  isCurrentUser?: boolean;
  recentTrades?: {
    pair: string;
    direction: 'LONG' | 'SHORT';
    outcome: string;
    profit: string;
    rr: string;
    date: string;
  }[];
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

const FORUM_REACTION_EMOJIS = ['🔥', '🎯', '🚀', '💰', '👏', '💎', '🛡️', '⚖️', '📈', '🐻', '🐂', '🧠', '💯'];
const COMPOSER_EMOJIS = ['🔥', '🚀', '🎯', '💰', '📈', '📉', '🐂', '🐻', '🛡️', '👀', '💯', '🙏', '⚡', '📊'];

// Verified Audited Trades for the Attach Modal
const AVAILABLE_JOURNAL_TRADES: AuditedTrade[] = [
  {
    pair: 'GBP/USD',
    direction: 'SHORT',
    setup: '15m Fair Value Gap (FVG)',
    entry: '1.29850',
    sl: '1.30050',
    tp: '1.29250',
    rr: '1:3.00',
    outcome: 'WIN',
    profit: '+3.00% (+$3,000.00)',
    pipsRisk: '20.0 pips',
    pipsTarget: '60.0 pips',
    hash: 'pb-sha256-49281a98e01bf2',
    ticketId: '#8492041',
    session: 'London Killzone',
    confluences: [
      'Daily structure bearish continuation',
      'London session high swept liquidity pool',
      '15m FVG mitigation entry',
      'DXY moving into strong H4 support',
    ],
  },
  {
    pair: 'EUR/USD',
    direction: 'LONG',
    setup: '15m Bullish Order Block (OB)',
    entry: '1.08420',
    sl: '1.08220',
    tp: '1.08920',
    rr: '1:2.50',
    outcome: 'WIN',
    profit: '+2.50% (+$2,500.00)',
    pipsRisk: '20.0 pips',
    pipsTarget: '50.0 pips',
    hash: 'pb-sha256-88194b11f44a9',
    ticketId: '#8493108',
    session: 'London/NY Overlap',
    confluences: [
      'Asia low swept during London open',
      '15m Bullish Order Block confirmation',
      'DXY rejected from 104.20 key resistance',
      'Strict 1.0% account risk parameter',
    ],
  },
  {
    pair: 'NAS100',
    direction: 'LONG',
    setup: 'Opening Range Breakout (ORB)',
    entry: '19,840.50',
    sl: '19,790.00',
    tp: '20,050.00',
    rr: '1:4.20',
    outcome: 'WIN',
    profit: '+4.20% (+$4,200.00)',
    pipsRisk: '50.5 pts',
    pipsTarget: '210.0 pts',
    hash: 'pb-sha256-22019c43a88de',
    ticketId: '#8494552',
    session: 'New York Open',
    confluences: [
      'Tech earnings sentiment strongly positive',
      'VWAP lower band held with high delta',
      'Pre-market high taken with volume expansion',
      'Trailing stop activated after +2R',
    ],
  },
  {
    pair: 'USD/JPY',
    direction: 'SHORT',
    setup: 'Daily Liquidity Sweep + CHoCH',
    entry: '156.450',
    sl: '156.750',
    tp: '155.850',
    rr: '1:2.00',
    outcome: 'WIN',
    profit: '+2.00% (+$2,000.00)',
    pipsRisk: '30.0 pips',
    pipsTarget: '60.0 pips',
    hash: 'pb-sha256-77142d99c31fa',
    ticketId: '#8495910',
    session: 'Tokyo / London Transition',
    confluences: [
      'Daily equal highs swept cleanly',
      '15m Change of Character (CHoCH) printed',
      'BoJ currency jawboning headwind',
      'Risk reward >= 1:2.0 verified by bot',
    ],
  },
];

// Production channel starter streams
const INITIAL_CHANNEL_MESSAGES: Record<string, ChatMessage[]> = {
  'funded-floor': [
    {
      id: 'ff-1',
      author: {
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        avatarBg: '#C2410C',
      },
      content: 'London session open: Asia low swept aggressively into the 15m discount Order Block on EUR/USD. DXY rejecting 104.20 key resistance level. High conviction long.',
      reactions: { '🔥': 18, '🎯': 12, '🚀': 7 },
      timestamp: '08:05 UTC',
    },
    {
      id: 'ff-2',
      author: {
        name: 'Aisha Bello',
        username: 'aisha_fx',
        level: 6,
        badge: '👑 Level 6: Mentor',
        broker: 'FTMO Master ($200,000)',
        avatarBg: '#EA580C',
      },
      content: 'Here is the PineScript alert script for monitoring the London Killzone sweeps in your charts:',
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
      id: 'ff-3',
      author: {
        name: 'Chidi Okonkwo',
        username: 'chidi_alpha',
        level: 5,
        badge: '💎 Level 5: Alpha',
        broker: '5%ers High Stakes ($100,000)',
        avatarBg: '#F59E0B',
      },
      content: 'Closed 80% position at 1.08920 for +2.5R gain. Moving stop loss to breakeven + 5 pips.',
      tradeEmbed: AVAILABLE_JOURNAL_TRADES[1],
      reactions: { '🎯': 24, '🚀': 16, '💰': 19 },
      timestamp: '08:35 UTC',
    },
    {
      id: 'ff-4',
      author: {
        name: 'PipBud Sentinel',
        username: 'pipbud_sentinel',
        level: 0,
        badge: '🤖 Automated Governance',
        broker: 'PipBud Meritocracy Engine',
        avatarBg: '#DC2626',
      },
      content: '⚠️ RISK NOTICE: London/NY overlap starting in 25 minutes. Ensure all stop-losses are verified with broker receipts. Unprotected positions during high-impact news are subject to automatic desk probation.',
      reactions: { '🛡️': 31, '⚖️': 28 },
      timestamp: '09:02 UTC',
      isDemotionNotice: true,
    },
  ],
  'live-tape-reading': [
    {
      id: 'ltr-1',
      author: {
        name: 'Chidi Okonkwo',
        username: 'chidi_alpha',
        level: 5,
        badge: '💎 Level 5: Alpha',
        broker: '5%ers High Stakes ($100,000)',
        avatarBg: '#F59E0B',
      },
      content: 'Watching ES & NQ book depth. Heavy bid absorption at 19,820 before London cash close. Looking for aggressive reclaim.',
      reactions: { '👀': 15, '📈': 11 },
      timestamp: '09:14 UTC',
    },
    {
      id: 'ltr-2',
      author: {
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        avatarBg: '#C2410C',
      },
      content: 'Large institutional limit orders stacked at 1.08350 EUR/USD. Watch for tick speed expansion as stops are triggered.',
      reactions: { '🔥': 20, '🧠': 14 },
      timestamp: '09:20 UTC',
    },
  ],
  'payout-proofs': [
    {
      id: 'pp-1',
      author: {
        name: 'Chidi Okonkwo',
        username: 'chidi_alpha',
        level: 5,
        badge: '💎 Level 5: Alpha',
        broker: '5%ers High Stakes ($100,000)',
        avatarBg: '#F59E0B',
      },
      content: 'Bi-weekly payout of $12,450 approved via Deel from FTMO. Risk discipline is the only true edge in this game.',
      reactions: { '💰': 48, '👏': 35, '🚀': 29 },
      timestamp: 'Yesterday',
    },
    {
      id: 'pp-2',
      author: {
        name: 'Aisha Bello',
        username: 'aisha_fx',
        level: 6,
        badge: '👑 Level 6: Mentor',
        broker: 'FTMO Master ($200,000)',
        avatarBg: '#EA580C',
      },
      content: 'Withdrawal confirmation: $8,900 cleared directly to bank. Zero daily drawdown breaches over 8 consecutive months.',
      reactions: { '💰': 52, '💎': 41, '🎯': 30 },
      timestamp: '2 days ago',
    },
  ],
  'demotions-log': [
    {
      id: 'dl-1',
      author: {
        name: 'PipBud Sentinel',
        username: 'pipbud_sentinel',
        level: 0,
        badge: '🤖 Automated Governance',
        broker: 'PipBud Meritocracy Engine',
        avatarBg: '#DC2626',
      },
      content: '⚠️ DEMOTION NOTICE: Trader @emeka_scalp has been automatically removed from Level 3 (#consistent-flow) and re-assigned to Level 2. Reason: Maximum cumulative drawdown breached 9.0% threshold (hit 11.2%). 3 unmanaged trades logged without stop losses. Zero fake track records allowed in this syndicate.',
      reactions: { '🛡️': 42, '⚖️': 38 },
      timestamp: '09:02 UTC',
      isDemotionNotice: true,
    },
    {
      id: 'dl-2',
      author: {
        name: 'PipBud Sentinel',
        username: 'pipbud_sentinel',
        level: 0,
        badge: '🤖 Automated Governance',
        broker: 'PipBud Meritocracy Engine',
        avatarBg: '#DC2626',
      },
      content: '🚨 SENTINEL ALERT: Trader @crypto_sam demoted from Level 4 (#funded-floor) to Level 3. Single-day drawdown exceeded 5.0% limit during CPI release. Relegated for 14-day observation period.',
      reactions: { '⚖️': 27, '🛡️': 19 },
      timestamp: 'Yesterday',
      isDemotionNotice: true,
    },
  ],
  'novice-welcome': [
    {
      id: 'nw-1',
      author: {
        name: 'Aisha Bello',
        username: 'aisha_fx',
        level: 6,
        badge: '👑 Level 6: Mentor',
        broker: 'FTMO Master ($200,000)',
        avatarBg: '#EA580C',
      },
      content: 'Welcome all emerging traders! Rule #1 of PipBud: Never risk more than 1.0% of your account on any single trade. Use /coach validate in @PipBudBot before placing any order.',
      reactions: { '🌱': 30, '🙏': 19, '💯': 25 },
      timestamp: '07:30 UTC',
    },
    {
      id: 'nw-2',
      author: {
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        avatarBg: '#C2410C',
      },
      content: 'Consistency is not about catching 100 pips every day. It is about executing the exact same high-probability checklist with disciplined risk over 100 iterations.',
      reactions: { '🎯': 22, '💎': 18 },
      timestamp: '08:00 UTC',
    },
  ],
  'risk-mastery': [
    {
      id: 'rm-1',
      author: {
        name: 'Chidi Okonkwo',
        username: 'chidi_alpha',
        level: 5,
        badge: '💎 Level 5: Alpha',
        broker: '5%ers High Stakes ($100,000)',
        avatarBg: '#F59E0B',
      },
      content: 'Position sizing formula: Lot Size = (Account Balance * Risk %) / (Stop Loss in Pips * Pip Value). Never guess your lot size or use a static 1.00 lot.',
      reactions: { '🎯': 33, '🧠': 24, '💯': 20 },
      timestamp: '08:45 UTC',
    },
  ],
  'consistent-flow': [
    {
      id: 'cf-1',
      author: {
        name: 'Chidi Okonkwo',
        username: 'chidi_alpha',
        level: 5,
        badge: '💎 Level 5: Alpha',
        broker: '5%ers High Stakes ($100,000)',
        avatarBg: '#F59E0B',
      },
      content: 'Logged 24 trades this month. Win rate 58%, Profit Factor 2.1. Skipping mid-range chop has made all the difference.',
      reactions: { '🔥': 17, '📈': 14 },
      timestamp: '08:20 UTC',
    },
  ],
  'daily-bias': [
    {
      id: 'db-1',
      author: {
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        avatarBg: '#C2410C',
      },
      content: 'Daily Macro Bias: DXY is facing strong rejection at the daily order block 104.20. Looking for EUR/USD and GBP/USD continuations to buy liquidity pools above yesterday highs.',
      reactions: { '🎯': 29, '📈': 22, '🔥': 18 },
      timestamp: '07:15 UTC',
    },
  ],
  'elite-alpha-desk': [
    {
      id: 'ea-1',
      author: {
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        avatarBg: '#C2410C',
      },
      content: 'Algorithmic execution models show institutional order stacking in EUR/GBP ahead of BOE press release. Tracking VWAP volume profile nodes closely.',
      reactions: { '💎': 19, '🧠': 15 },
      timestamp: '08:50 UTC',
    },
  ],
  'live-audio-huddle': [
    {
      id: 'lah-1',
      author: {
        name: 'Aisha Bello',
        username: 'aisha_fx',
        level: 6,
        badge: '👑 Level 6: Mentor',
        broker: 'FTMO Master ($200,000)',
        avatarBg: '#EA580C',
      },
      content: 'Audio huddle active! We are breaking down pre-London liquidity sweeps and key daily bias levels on the mic.',
      reactions: { '🎙️': 28, '🔥': 20 },
      timestamp: '08:00 UTC',
    },
  ],
  'titan-inner-sanctuary': [
    {
      id: 'tis-1',
      author: {
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        avatarBg: '#C2410C',
      },
      content: 'Allocating $1.5M syndicate risk across FX majors and treasury yields for Q4. Focus remains asymmetric R:R (> 1:3.5).',
      reactions: { '🏛️': 19, '👑': 14, '💰': 17 },
      timestamp: '07:00 UTC',
    },
  ],
};

export default function ForumPage() {
  const { user, connectBrokerAccount } = useAuth();

  // Set initial channel based on user skill level
  const getDefaultChannel = (level: number) => {
    if (level >= 4) return 'funded-floor';
    if (level === 3) return 'consistent-flow';
    if (level === 2) return 'risk-mastery';
    return 'novice-welcome';
  };

  const [activeChannel, setActiveChannel] = useState('funded-floor');
  const [messagesByChannel, setMessagesByChannel] = useState<Record<string, ChatMessage[]>>(INITIAL_CHANNEL_MESSAGES);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messageType, setMessageType] = useState<'discussion' | 'question' | 'setup' | 'code'>('discussion');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  
  // Single Reaction per message per user (Strictly enforced)
  const [userReactions, setUserReactions] = useState<Record<string, string>>({
    'ff-1': '🔥',
    'ff-3': '🎯',
  });
  const [activeEmojiPickerMsgId, setActiveEmojiPickerMsgId] = useState<string | null>(null);
  const [showComposerEmojiPicker, setShowComposerEmojiPicker] = useState(false);

  const [messageInput, setMessageInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [selectedTradeToAttach, setSelectedTradeToAttach] = useState<AuditedTrade>(AVAILABLE_JOURNAL_TRADES[0]);
  const [customAttachNote, setCustomAttachNote] = useState('');

  // Live / Funded Broker Account Verification Modal
  const [showConnectBrokerModal, setShowConnectBrokerModal] = useState(false);
  const [brokerPlatform, setBrokerPlatform] = useState<'mt5' | 'mt4' | 'prop_firm' | 'ctrader'>('mt5');
  const [brokerNameInput, setBrokerNameInput] = useState('FTMO');
  const [accountTypeInput, setAccountTypeInput] = useState<'LIVE_FUNDED' | 'EVALUATION_PASS' | 'PERSONAL_LIVE'>('LIVE_FUNDED');
  const [accountSizeInput, setAccountSizeInput] = useState<number>(100000);
  const [serverInput, setServerInput] = useState('FTMO-Server2');
  const [accountNumberInput, setAccountNumberInput] = useState('');
  const [investorPasswordInput, setInvestorPasswordInput] = useState('');
  const [isVerifyingBroker, setIsVerifyingBroker] = useState(false);
  const [brokerVerificationFeedback, setBrokerVerificationFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [mobileChannelsOpen, setMobileChannelsOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  // Rich Interactive Modals
  const [selectedProfileTrader, setSelectedProfileTrader] = useState<TraderProfileModalData | null>(null);
  const [selectedTradeDetail, setSelectedTradeDetail] = useState<AuditedTrade | null>(null);

  // Audio Huddle Simulation State
  const [isHuddleJoined, setIsHuddleJoined] = useState(false);
  const [isHuddleMuted, setIsHuddleMuted] = useState(true);

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

  // Fetch live messages from Django backend
  useEffect(() => {
    let isCurrent = true;
    const fetchChannelMessages = async () => {
      setIsMessagesLoading(true);
      try {
        const apiBase = getApiBase();
        const token = localStorage.getItem('pipbud_token') || user?.token;
        const res = await fetch(`${apiBase}/api/forum/channels/${activeChannel}/messages/`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
          },
        });
        if (res.ok && isCurrent) {
          const data = await res.json();
          if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
            const mapped: ChatMessage[] = data.messages.map((m: any) => ({
              id: m.id,
              author: {
                name: m.author?.display_name || m.author?.name || m.author?.username || 'Trader',
                username: m.author?.username || 'trader',
                level: m.author?.skill_level || 1,
                badge: m.author?.tier_badge || m.author?.badge || '🌱 Novice',
                broker: m.author?.broker || 'Live Trader',
                avatarBg: m.author?.tier_color || '#1C1917',
                avatarUrl: m.author?.avatar_url,
              },
              content: m.content || '',
              messageType: m.message_type || (m.content?.startsWith('[Question]') ? 'question' : 'discussion'),
              replyTo: m.reply_to,
              chartUrl: m.chart_url,
              codeSnippet: m.code_snippet,
              codeLanguage: m.code_language,
              reactions: m.reactions || {},
              timestamp: m.created_at || m.timestamp || 'Recent',
            }));
            setMessagesByChannel((prev) => ({
              ...prev,
              [activeChannel]: mapped,
            }));
          }
        }
      } catch {
        // Fall back gracefully to preset channel messages
      } finally {
        if (isCurrent) {
          setIsMessagesLoading(false);
        }
      }
    };
    fetchChannelMessages();
    return () => {
      isCurrent = false;
    };
  }, [activeChannel, user]);

  // Current channel metadata
  const currentChannel = CHANNELS.find((c) => c.id === activeChannel) || CHANNELS[0];
  const isChannelUnlocked = user ? user.skill_level >= currentChannel.minLevel : false;
  const currentMessages = messagesByChannel[activeChannel] || [];

  // ==========================================
  // Profile Lookup Handler
  // ==========================================
  const openTraderProfile = (nameOrUsername: string) => {
    const isSelf =
      user &&
      (nameOrUsername === user.name ||
        nameOrUsername === user.display_name ||
        nameOrUsername === user.username ||
        nameOrUsername === `@${user.username}` ||
        nameOrUsername === 'Apex Trader');

    if (isSelf && user) {
      setSelectedProfileTrader({
        name: user.display_name || user.name || 'Apex Trader',
        username: user.username,
        level: user.skill_level,
        badge: user.tier_badge,
        tierColor: user.tier_color || '#8B5CF6',
        broker: user.broker_name || 'Verified Prop Trader',
        winRate: user.win_rate,
        profitFactor: user.profit_factor,
        maxDrawdown: user.max_drawdown,
        totalTrades: user.total_verified_trades,
        tierHealth: user.tier_health,
        tradingStyle: user.trading_style || 'Discipline & Risk Management',
        bio: user.bio || 'Managing verified live capital. Audited by PipBud Meritocracy Protocol.',
        avatarBg: user.tier_color || '#8B5CF6',
        avatarType: user.avatar_type,
        avatarUrl: user.avatar_url,
        isCurrentUser: true,
        recentTrades: [
          {
            pair: 'GBP/USD',
            direction: 'SHORT',
            outcome: 'WIN',
            profit: '+3.00%',
            rr: '1:3.00',
            date: 'Today, 08:30 UTC',
          },
          {
            pair: 'EUR/USD',
            direction: 'LONG',
            outcome: 'WIN',
            profit: '+2.50%',
            rr: '1:2.50',
            date: 'Yesterday, 14:15 UTC',
          },
        ],
      });
      return;
    }

    if (nameOrUsername.includes('Solomon') || nameOrUsername === 'solomon_kane') {
      setSelectedProfileTrader({
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan',
        tierColor: '#C2410C',
        broker: 'Titan Syndicate Prime ($1,500,000)',
        winRate: 68.4,
        profitFactor: 2.85,
        maxDrawdown: 2.1,
        totalTrades: 512,
        tierHealth: 99,
        tradingStyle: 'Institutional Order Flow & Macro Bias',
        bio: 'Head of Macro Execution at Titan Syndicate. Specializing in London/NY liquidity sweeps and Treasury-correlated FX positioning. 7-figure allocator since 2020.',
        avatarBg: '#C2410C',
        recentTrades: [
          {
            pair: 'EUR/USD',
            direction: 'LONG',
            outcome: 'WIN',
            profit: '+4.10%',
            rr: '1:4.10',
            date: 'Today, 08:05 UTC',
          },
          {
            pair: 'GBP/JPY',
            direction: 'SHORT',
            outcome: 'WIN',
            profit: '+3.80%',
            rr: '1:3.80',
            date: '2 days ago',
          },
        ],
      });
      return;
    }

    if (nameOrUsername.includes('Aisha') || nameOrUsername === 'aisha_fx') {
      setSelectedProfileTrader({
        name: 'Aisha Bello',
        username: 'aisha_fx',
        level: 6,
        badge: '👑 Level 6: Mentor',
        tierColor: '#EA580C',
        broker: 'FTMO Master ($200,000)',
        winRate: 64.2,
        profitFactor: 2.3,
        maxDrawdown: 2.8,
        totalTrades: 340,
        tierHealth: 96,
        tradingStyle: 'Algorithmic London Killzone & Market Profile',
        bio: 'Full-time prop trader and community mentor. Author of the PipBud London Open Liquidity PineScript indicator. Managing $400k+ in verified allocations.',
        avatarBg: '#EA580C',
        recentTrades: [
          {
            pair: 'GBP/USD',
            direction: 'SHORT',
            outcome: 'WIN',
            profit: '+3.00%',
            rr: '1:3.00',
            date: 'Today, 08:12 UTC',
          },
          {
            pair: 'NAS100',
            direction: 'LONG',
            outcome: 'WIN',
            profit: '+2.80%',
            rr: '1:2.80',
            date: 'Yesterday',
          },
        ],
      });
      return;
    }

    if (nameOrUsername.includes('Chidi') || nameOrUsername === 'chidi_alpha') {
      setSelectedProfileTrader({
        name: 'Chidi Okonkwo',
        username: 'chidi_alpha',
        level: 5,
        badge: '💎 Level 5: Alpha',
        tierColor: '#F59E0B',
        broker: '5%ers High Stakes ($100,000)',
        winRate: 58.7,
        profitFactor: 2.05,
        maxDrawdown: 3.4,
        totalTrades: 215,
        tierHealth: 92,
        tradingStyle: 'Supply & Demand + Volume Profile Nodes',
        bio: 'Full-time quantitative scalper. Focused on US session indices and London EUR/USD session opens. Strict 1% risk rule.',
        avatarBg: '#F59E0B',
        recentTrades: [
          {
            pair: 'EUR/USD',
            direction: 'LONG',
            outcome: 'WIN',
            profit: '+2.50%',
            rr: '1:2.50',
            date: 'Today, 08:35 UTC',
          },
          {
            pair: 'US30',
            direction: 'SHORT',
            outcome: 'WIN',
            profit: '+3.20%',
            rr: '1:3.20',
            date: '3 days ago',
          },
        ],
      });
      return;
    }

    // PipBud Sentinel or fallback
    setSelectedProfileTrader({
      name: nameOrUsername,
      username: nameOrUsername.toLowerCase().replace(/\s+/g, '_'),
      level: 0,
      badge: '🤖 Automated Governance',
      tierColor: '#DC2626',
      broker: 'PipBud Engine Core',
      winRate: 100,
      profitFactor: 9.99,
      maxDrawdown: 0.0,
      totalTrades: 48920,
      tierHealth: 100,
      tradingStyle: 'Cryptographic Audit & Anti-Drawdown Protocol',
      bio: 'The autonomous watchdog monitoring every trade log, verifying broker fills, and demoting any trader exceeding risk parameters in real-time.',
      avatarBg: '#DC2626',
    });
  };

  // ==========================================
  // SINGLE REACTION ENFORCEMENT HANDLER
  // Only 1 reaction allowed per user per message!
  // ==========================================
  const handleToggleReaction = (msgId: string, emoji: string) => {
    const currentActiveEmoji = userReactions[msgId];

    if (currentActiveEmoji === emoji) {
      // User clicked their active reaction -> TOGGLE OFF (decrement and remove)
      setMessagesByChannel((prev) => {
        const channelMsgs = prev[activeChannel] || [];
        const updated = channelMsgs.map((m) => {
          if (m.id !== msgId) return m;
          const currentCount = m.reactions[emoji] || 0;
          const nextReactions = { ...m.reactions };
          if (currentCount <= 1) {
            delete nextReactions[emoji];
          } else {
            nextReactions[emoji] = currentCount - 1;
          }
          return { ...m, reactions: nextReactions };
        });
        return { ...prev, [activeChannel]: updated };
      });

      setUserReactions((prev) => {
        const copy = { ...prev };
        delete copy[msgId];
        return copy;
      });
    } else {
      // User switched or set their SINGLE reaction
      setMessagesByChannel((prev) => {
        const channelMsgs = prev[activeChannel] || [];
        const updated = channelMsgs.map((m) => {
          if (m.id !== msgId) return m;
          const nextReactions = { ...m.reactions };

          // If they already had an emoji selected, decrement that old one
          if (currentActiveEmoji && nextReactions[currentActiveEmoji]) {
            if (nextReactions[currentActiveEmoji] <= 1) {
              delete nextReactions[currentActiveEmoji];
            } else {
              nextReactions[currentActiveEmoji] = nextReactions[currentActiveEmoji] - 1;
            }
          }

          // Increment the new emoji
          nextReactions[emoji] = (nextReactions[emoji] || 0) + 1;
          return { ...m, reactions: nextReactions };
        });
        return { ...prev, [activeChannel]: updated };
      });

      setUserReactions((prev) => ({
        ...prev,
        [msgId]: emoji,
      }));
    }

    if (user && msgId) {
      try {
        const apiBase = getApiBase();
        const token = localStorage.getItem('pipbud_token') || user.token;
        fetch(`${apiBase}/api/forum/messages/${msgId}/react/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            'X-Trader-Id': user.id,
          },
          body: JSON.stringify({ emoji }),
        }).catch(() => {});
      } catch {}
    }

    setActiveEmojiPickerMsgId(null);
  };

  // ==========================================
  // Send Message Handler
  // ==========================================
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user || !isChannelUnlocked) return;

    const contentToSend = messageInput.trim();
    const newMsgId = Date.now().toString();
    const newMsg: ChatMessage = {
      id: newMsgId,
      author: {
        name: user.display_name || user.name || `@${user.username}`,
        username: user.username,
        level: user.skill_level,
        badge: user.tier_badge,
        broker: user.broker_name || 'Verified Live Trader',
        avatarBg: user.tier_color || '#8B5CF6',
        avatarType: user.avatar_type,
        avatarUrl: user.avatar_url,
      },
      content: contentToSend,
      messageType: messageType,
      replyTo: replyingTo
        ? {
            id: replyingTo.id,
            authorName: replyingTo.author.name,
            preview: replyingTo.content.slice(0, 80),
          }
        : undefined,
      reactions: { '🔥': 1 },
      timestamp: 'Just now',
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));

    // Auto set single reaction for author
    setUserReactions((prev) => ({
      ...prev,
      [newMsgId]: '🔥',
    }));

    setMessageInput('');
    setReplyingTo(null);
    setMessageType('discussion');
    setShowComposerEmojiPicker(false);

    // Save to backend API
    try {
      const apiBase = getApiBase();
      const token = localStorage.getItem('pipbud_token') || user.token;
      fetch(`${apiBase}/api/forum/channels/${activeChannel}/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'X-Trader-Id': user.id,
        },
        body: JSON.stringify({
          content: contentToSend,
          message_type: messageType,
          reply_to_id: replyingTo?.id,
        }),
      }).catch(() => {});
    } catch {}
  };

  // ==========================================
  // Attach Audited Trade Handler
  // ==========================================
  const handleAttachTradeConfirm = () => {
    if (!user) return;

    const newMsgId = Date.now().toString();
    const tradeMsg: ChatMessage = {
      id: newMsgId,
      author: {
        name: user.display_name || user.name || `@${user.username}`,
        username: user.username,
        level: user.skill_level,
        badge: user.tier_badge,
        broker: user.broker_name || 'Verified Broker',
        avatarBg: user.tier_color || '#8B5CF6',
        avatarType: user.avatar_type,
        avatarUrl: user.avatar_url,
      },
      content: customAttachNote.trim() || 'Sharing my latest audited trade from the PipBud Journal:',
      tradeEmbed: selectedTradeToAttach,
      reactions: { '🎯': 1 },
      timestamp: 'Just now',
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), tradeMsg],
    }));

    setUserReactions((prev) => ({
      ...prev,
      [newMsgId]: '🎯',
    }));

    setShowAttachModal(false);
    setCustomAttachNote('');
  };

  // ==========================================
  // Live / Funded Broker Account Connect Handler
  // Prevents false claims by verifying investor read-only handshake
  // ==========================================
  const handleConnectBrokerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumberInput.trim() || !brokerNameInput.trim()) {
      setBrokerVerificationFeedback({
        type: 'error',
        text: 'Please enter your Account Number and Broker/Prop Firm name.',
      });
      return;
    }

    setIsVerifyingBroker(true);
    setBrokerVerificationFeedback(null);

    const payload: BrokerConnectPayload = {
      platform: brokerPlatform,
      broker_name: brokerNameInput.trim(),
      account_number: accountNumberInput.trim(),
      server: serverInput.trim(),
      investor_password: investorPasswordInput.trim(),
      account_type: accountTypeInput,
      account_size: accountSizeInput,
    };

    try {
      const res = await connectBrokerAccount(payload);
      if (res.success) {
        setBrokerVerificationFeedback({
          type: 'success',
          text: res.message,
        });
        setTimeout(() => {
          setShowConnectBrokerModal(false);
          setBrokerVerificationFeedback(null);
        }, 1200);
      } else {
        setBrokerVerificationFeedback({
          type: 'error',
          text: res.message,
        });
      }
    } catch (err: any) {
      setBrokerVerificationFeedback({
        type: 'error',
        text: err.message || 'Verification failed. Please check investor credentials.',
      });
    } finally {
      setIsVerifyingBroker(false);
    }
  };

  const copyCodeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const selectChannel = (channelName: string) => {
    setActiveChannel(channelName);
    setMobileChannelsOpen(false);
    setActiveEmojiPickerMsgId(null);
  };

  // ==========================================
  // Gated View When NOT Logged In (Production Ready)
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
              <span>Log In via Telegram</span>
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
                The 7-Tier Trader Forum is strictly meritocratic. Trading desks and live tape huddles are unlocked based on verified live or funded broker accounts. Manual logging without broker verification cannot access restricted desks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login?redirect=/forum"
                className="w-full sm:w-auto h-12 px-8 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Log In via Telegram Account</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-[#E7E5E4] text-[11px] text-[#A8A29E] flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span>• Tier-locked desks (Level 1–7)</span>
              <span>• Read-only investor verification</span>
              <span>• Zero fake track records</span>
            </div>
          </div>
        </main>

        <footer className="text-center text-xs text-[#A8A29E] py-4 border-t border-[#E7E5E4]">
          &copy; {new Date().getFullYear()} PipBud. Verified Trader Meritocracy Network.
        </footer>
      </div>
    );
  }

  // ==========================================
  // Reusable Channels Sidebar & Drawer Content
  // ==========================================
  const renderChannelsContent = () => (
    <div className="flex flex-col h-full">
      {/* Authenticated Trader Status Card */}
      <div className="p-3.5 border-b border-[#E7E5E4] bg-[#FAFAF9] shrink-0 space-y-3">
        <div
          onClick={() => openTraderProfile(user.display_name || user.name || user.username)}
          className="flex items-center gap-2.5 p-1 -m-1 rounded-xl hover:bg-white cursor-pointer transition-all group"
          title="Click to view your verified meritocracy profile"
        >
          {user.avatar_type?.startsWith('mascot') || !user.avatar_type ? (
            <div className="w-10 h-10 rounded-xl bg-white border border-[#FED7AA] p-1 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/icon-192.png"
                alt="Avatar"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
          ) : user.avatar_type === 'custom' && user.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-xs border border-[#E7E5E4] group-hover:scale-105 transition-transform"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs uppercase group-hover:scale-105 transition-transform"
              style={{ backgroundColor: user.tier_color || '#1C1917' }}
            >
              {(user.display_name || user.username).slice(0, 2)}
            </div>
          )}
          <div className="overflow-hidden min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-xs text-[#1C1917] truncate group-hover:text-[#C2410C] transition-colors">
                {user.display_name || `@${user.username}`}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <span
                  className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white shrink-0"
                  style={{ backgroundColor: user.tier_color || '#C2410C' }}
                >
                  L{user.skill_level}
                </span>
                <Link
                  href="/settings"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-md text-[#78716C] hover:text-[#C2410C] hover:bg-[#F5F5F4] transition-colors"
                  title="Privacy & Identity Settings"
                >
                  <Sliders className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <span
              className="text-[10px] font-semibold block truncate"
              style={{ color: user.tier_color || '#7C3AED' }}
            >
              {user.tier_badge}
            </span>
            <span className="text-[9px] text-[#78716C] block truncate">
              {user.broker_name || 'Verified Live Trader'}
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
          href="/settings"
          className="flex items-center justify-between px-2.5 py-2 rounded-xl text-[#1C1917] hover:bg-white hover:text-[#C2410C] font-semibold transition-all"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C2410C]" />
            <span>Privacy & Trader Settings</span>
          </span>
          <span className="text-[10px] font-bold text-[#0F766E] bg-[#F0FDFA] px-1.5 py-0.2 rounded border border-[#CCFBF1]">
            Shield
          </span>
        </Link>

        <button
          onClick={() => setShowConnectBrokerModal(true)}
          className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] font-semibold transition-all hover:bg-[#FFEDD5] text-left"
        >
          <span className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#C2410C]" />
            <span>Live Broker Sync</span>
          </span>
          <span className="text-[10px] font-bold text-[#0F766E] bg-white px-1.5 py-0.2 rounded border border-[#FED7AA]">
            {user.account_verified ? 'Verified' : 'Connect'}
          </span>
        </button>
      </div>
    </div>
  );

  // ==========================================
  // Reusable Governance & Broker Sync Sidebar Content
  // ==========================================
  const renderGovernanceContent = () => (
    <div className="space-y-4">
      {/* Live / Funded Broker Account Verification Card */}
      <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
            <Server className="w-4 h-4 text-[#0F766E]" />
            <span>Live Broker Verification</span>
          </div>
          <span
            className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
              user.account_verified
                ? 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]'
                : 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]'
            }`}
          >
            {user.account_verified ? '● LIVE SYNC' : 'MANUAL ONLY'}
          </span>
        </div>

        <p className="text-[11px] text-[#44403C] leading-relaxed">
          {user.account_verified
            ? 'Your rank is audited directly via read-only broker investor credentials. No fabricated claims.'
            : 'To prevent false trade claims, higher tier desks require connecting your read-only investor credentials.'}
        </p>

        <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] text-xs space-y-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-[#78716C]">Connected Broker:</span>
            <span className="font-bold text-[#1C1917] truncate max-w-[140px]">
              {user.broker_name || 'None (Manual)'}
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-[#78716C]">Verified Status:</span>
            <span className="font-bold text-[#0F766E]">
              {user.account_verified ? `Level ${user.skill_level} Qualified 🟢` : 'Unverified 🔒'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowConnectBrokerModal(true)}
          className="w-full py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-semibold transition-all active:scale-98 shadow-xs flex items-center justify-center gap-1.5"
        >
          <Server className="w-3.5 h-3.5" />
          <span>{user.account_verified ? 'Re-Sync Broker Account' : 'Connect Live / Funded Broker'}</span>
        </button>
      </div>

      {/* Room Verification Rules */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E7E5E4] space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
          <span>Desk Verification Protocol</span>
        </div>
        <p className="text-[11px] text-[#44403C] leading-relaxed">
          <strong>#{activeChannel}</strong> enforces mathematical audit rules.
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

        <div className="space-y-1.5 text-xs">
          {/* Authenticated Trader (You) */}
          <div
            onClick={() => openTraderProfile(user.display_name || user.name || user.username)}
            className="flex items-center gap-2 p-2 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] cursor-pointer hover:bg-[#FFEDD5] transition-all"
            title="Click to view your profile"
          >
            <div
              className="w-7 h-7 rounded-lg text-white text-[10px] font-bold flex items-center justify-center shrink-0"
              style={{ backgroundColor: user.tier_color || '#1C1917' }}
            >
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate flex-1">
              <span className="font-bold text-[#1C1917] block text-[11px] truncate">
                {user.display_name || `@${user.username}`} <span className="text-[#C2410C] font-normal">(You)</span>
              </span>
              <span
                className="text-[9px] font-semibold block truncate"
                style={{ color: user.tier_color || '#7C3AED' }}
              >
                {user.tier_badge}
              </span>
            </div>
            <BadgeCheck className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
          </div>

          {/* Solomon Kane */}
          <div
            onClick={() => openTraderProfile('Solomon Kane')}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#FAFAF9] cursor-pointer transition-colors"
            title="Click to view Solomon Kane's audited profile"
          >
            <div className="w-7 h-7 rounded-lg bg-[#C2410C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              SK
            </div>
            <div className="truncate flex-1">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate hover:text-[#C2410C]">Solomon Kane</span>
              <span className="text-[9px] text-[#C2410C]">Level 7: Titan</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
          </div>

          {/* Aisha Bello */}
          <div
            onClick={() => openTraderProfile('Aisha Bello')}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#FAFAF9] cursor-pointer transition-colors"
            title="Click to view Aisha Bello's audited profile"
          >
            <div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              AB
            </div>
            <div className="truncate flex-1">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate hover:text-[#C2410C]">Aisha Bello</span>
              <span className="text-[9px] text-[#EA580C]">Level 6: Mentor</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
          </div>

          {/* Chidi Okonkwo */}
          <div
            onClick={() => openTraderProfile('Chidi Okonkwo')}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#FAFAF9] cursor-pointer transition-colors"
            title="Click to view Chidi Okonkwo's audited profile"
          >
            <div className="w-7 h-7 rounded-lg bg-[#F59E0B] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              CO
            </div>
            <div className="truncate flex-1">
              <span className="font-semibold text-[#1C1917] block text-[11px] truncate hover:text-[#C2410C]">Chidi Okonkwo</span>
              <span className="text-[9px] text-[#F59E0B]">Level 5: Alpha</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
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
          {/* Connect Broker Button (Header Action) */}
          <button
            onClick={() => setShowConnectBrokerModal(true)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 border ${
              user.account_verified
                ? 'bg-[#F0FDFA] text-[#0F766E] border-[#CCFBF1] hover:bg-[#CCFBF1]'
                : 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA] hover:bg-[#FFEDD5]'
            }`}
            title="Connect Live / Funded Broker"
          >
            <Server className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {user.account_verified ? 'Broker Verified 🟢' : 'Connect Live Broker'}
            </span>
          </button>

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

          {/* User Account Chip -> Opens User Profile Modal */}
          <button
            onClick={() => openTraderProfile(user.display_name || user.name || user.username)}
            className="px-2.5 py-1 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] transition-all flex items-center gap-1.5 shadow-xs active:scale-95 text-left"
            title="Trader Identity Profile"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: user.tier_color || '#C2410C' }}
            />
            <span className="font-bold text-xs text-[#C2410C]">L{user.skill_level}</span>
            <span className="text-xs font-medium text-[#44403C] hidden sm:inline max-w-[110px] truncate">
              {user.display_name || `@${user.username}`}
            </span>
          </button>

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
          {renderChannelsContent()}
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
                {renderChannelsContent()}
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

          {/* Live Audio Huddle Bar (When in #live-audio-huddle) */}
          {activeChannel === 'live-audio-huddle' && (
            <div className="bg-gradient-to-r from-[#FFF7ED] via-[#FFEDD5] to-[#FEF3C7] border-b border-[#FED7AA] px-4 py-3 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EA580C] text-white flex items-center justify-center shrink-0 shadow-xs relative">
                  <Radio className="w-5 h-5 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#15803D] rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                      Mentor Pre-London Audio Huddle
                    </span>
                    <span className="text-[10px] font-bold text-[#EA580C] bg-white/80 px-2 py-0.5 rounded-full border border-[#FED7AA]">
                      Live (3 Active Speakers)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#78716C]">
                    Speaking: <strong className="text-[#1C1917]">Aisha Bello (Host)</strong>, <strong className="text-[#1C1917]">Solomon Kane</strong>, <strong className="text-[#1C1917]">PipBud AI</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isHuddleJoined ? (
                  <>
                    <button
                      onClick={() => setIsHuddleMuted(!isHuddleMuted)}
                      className={`h-8 px-3 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs ${
                        isHuddleMuted
                          ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]'
                          : 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]'
                      }`}
                    >
                      {isHuddleMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isHuddleMuted ? 'Muted' : 'Speaking'}</span>
                    </button>
                    <button
                      onClick={() => setIsHuddleJoined(false)}
                      className="h-8 px-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-all shadow-xs active:scale-95"
                    >
                      <PhoneOff className="w-3.5 h-3.5" />
                      <span>Leave Huddle</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsHuddleJoined(true);
                      setIsHuddleMuted(true);
                    }}
                    className="h-8 px-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Join Audio Huddle</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4">
            {isMessagesLoading ? (
              <div className="space-y-4 py-2">
                <MessageItemSkeleton />
                <MessageItemSkeleton />
                <MessageItemSkeleton />
                <MessageItemSkeleton />
              </div>
            ) : currentMessages.length === 0 ? (
              <div className="text-center py-16 text-[#A8A29E] space-y-2">
                <Hash className="w-10 h-10 mx-auto text-[#D6D3D1]" />
                <p className="text-sm font-semibold text-[#78716C]">Welcome to #{activeChannel}</p>
                <p className="text-xs text-[#A8A29E]">No messages posted yet. Start the conversation!</p>
              </div>
            ) : (
              currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 sm:gap-3.5 ${
                    msg.isDemotionNotice
                      ? 'p-3 sm:p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2]'
                      : ''
                  }`}
                >
                  {/* Clickable Author Avatar */}
                  <button
                    onClick={() => openTraderProfile(msg.author.name)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-bold text-xs text-white flex items-center justify-center shrink-0 shadow-xs hover:opacity-90 transition-opacity active:scale-95"
                    style={{ backgroundColor: msg.author.avatarBg }}
                    title={`View ${msg.author.name}'s Verified Profile`}
                  >
                    {msg.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </button>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => openTraderProfile(msg.author.name)}
                        className="font-bold text-xs text-[#1C1917] truncate hover:text-[#C2410C] hover:underline transition-colors text-left"
                      >
                        {msg.author.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => openTraderProfile(msg.author.name)}
                        className={`px-1.5 sm:px-2 py-0.2 rounded text-[9px] sm:text-[10px] font-bold truncate cursor-pointer hover:opacity-90 ${
                          msg.isDemotionNotice
                            ? 'bg-[#B91C1C] text-white'
                            : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                        }`}
                        title={`View ${msg.author.name}'s Verified Profile`}
                      >
                        {msg.author.badge}
                      </button>
                      {msg.messageType === 'question' && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                          <HelpCircle className="w-2.5 h-2.5" />
                          <span>Question</span>
                        </span>
                      )}
                      <span className="text-[10px] text-[#78716C] hidden sm:inline">{msg.author.broker}</span>
                      <span className="text-[9px] sm:text-[10px] text-[#A8A29E] ml-auto shrink-0">{msg.timestamp}</span>
                    </div>

                    {/* Quoted Reply Preview */}
                    {msg.replyTo && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] bg-[#F5F5F4] px-2.5 py-1 rounded-lg border-l-2 border-[#C2410C] mb-1">
                        <button
                          type="button"
                          onClick={() => openTraderProfile(msg.replyTo!.authorName)}
                          className="font-semibold text-[#1C1917] shrink-0 hover:text-[#C2410C] hover:underline cursor-pointer"
                          title={`View ${msg.replyTo.authorName}'s Verified Profile`}
                        >
                          Replying to {msg.replyTo.authorName}:
                        </button>
                        <span className="truncate italic text-[#78716C]">&quot;{msg.replyTo.preview}&quot;</span>
                      </div>
                    )}

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

                    {/* Embedded Audited Trade Card -> Click to open full breakdown */}
                    {msg.tradeEmbed && (
                      <div
                        onClick={() => setSelectedTradeDetail(msg.tradeEmbed!)}
                        className="bg-white p-3.5 rounded-2xl border border-[#E7E5E4] hover:border-[#FED7AA] shadow-xs hover:shadow-md cursor-pointer transition-all max-w-lg space-y-2.5 mt-2 group"
                        title="Click to view full audited trade breakdown"
                      >
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

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[10px] bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4] font-mono">
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

                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#F5F5F4] text-[#78716C]">
                          <span className="flex items-center gap-1 text-[#0F766E] font-medium">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Audited & Verified Log</span>
                          </span>
                          <span className="text-[#C2410C] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Inspect Breakdown &rarr;
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Emoji Reactions Bar with STRICT SINGLE REACTION PER USER & Reply action */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 relative">
                      {Object.entries(msg.reactions).map(([emoji, count]) => {
                        const hasReacted = userReactions[msg.id] === emoji;
                        return (
                          <button
                            key={emoji}
                            onClick={() => handleToggleReaction(msg.id, emoji)}
                            className={`px-2 py-0.5 rounded-full text-[11px] flex items-center gap-1 transition-all active:scale-95 border ${
                              hasReacted
                                ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA] font-bold shadow-xs ring-1 ring-[#FED7AA]'
                                : 'bg-white hover:bg-[#FFF7ED] border-[#E7E5E4] text-[#44403C]'
                            }`}
                            title={hasReacted ? `You reacted ${emoji}. Click to remove` : `React with ${emoji} (replaces your current reaction)`}
                          >
                            <span>{emoji}</span>
                            <span className="font-medium text-[10px]">{count}</span>
                          </button>
                        );
                      })}

                      {/* Add Reaction Button & Popover */}
                      <div className="relative">
                        <button
                          onClick={() => setActiveEmojiPickerMsgId(activeEmojiPickerMsgId === msg.id ? null : msg.id)}
                          className="px-2 py-0.5 rounded-full bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[11px] text-[#78716C] active:scale-95 transition-all"
                          title="Add single reaction"
                        >
                          +
                        </button>

                        {activeEmojiPickerMsgId === msg.id && (
                          <div className="absolute bottom-full left-0 mb-1.5 z-40 bg-white border border-[#E7E5E4] rounded-2xl p-1.5 shadow-xl flex items-center gap-1 flex-wrap max-w-[260px] animate-in fade-in zoom-in-95 duration-100">
                            {FORUM_REACTION_EMOJIS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleToggleReaction(msg.id, emoji)}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform active:scale-125 ${
                                  userReactions[msg.id] === emoji ? 'bg-[#FED7AA]' : 'hover:bg-[#FFF7ED]'
                                }`}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Inline Reply Trigger */}
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(msg);
                          setMessageInput(`@${msg.author.username} `);
                        }}
                        className="px-2 py-0.5 rounded-full bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[11px] text-[#78716C] hover:text-[#C2410C] font-medium transition-all active:scale-95 inline-flex items-center gap-1"
                        title={`Reply to ${msg.author.name}`}
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Locked Channel Notice Banner inside Chat */}
            {!isChannelUnlocked && (
              <div className="p-5 rounded-2xl bg-white border border-[#FED7AA] shadow-xs text-center space-y-3 my-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center mx-auto text-[#C2410C]">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1C1917]">
                    Desk Gated: Minimum Level {currentChannel.minLevel} ({currentChannel.badge})
                  </h4>
                  <p className="text-xs text-[#78716C] max-w-md mx-auto">
                    Your current verified tier is Level {user.skill_level} ({user.tier_badge}). Higher desks require proof of a Live or Funded broker account ($50k+ for Funded Floor, $1M+ for Titan Syndicate).
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => setShowConnectBrokerModal(true)}
                    className="h-10 px-5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Connect Live Broker to Unlock &rarr;</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Message Composer (Clean mobile docking) */}
          <div className="p-2.5 sm:p-4 bg-white border-t border-[#E7E5E4] pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-4 shrink-0 relative">
            {/* Quick Composer Emoji Palette Popover */}
            {showComposerEmojiPicker && (
              <div className="absolute bottom-full left-4 mb-2 z-40 bg-white border border-[#E7E5E4] rounded-2xl p-2 shadow-xl flex items-center gap-1 flex-wrap max-w-xs sm:max-w-md animate-in fade-in zoom-in-95 duration-100">
                {COMPOSER_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      setMessageInput((prev) => prev + emoji);
                    }}
                    className="w-8 h-8 rounded-xl hover:bg-[#FFF7ED] flex items-center justify-center text-base transition-transform active:scale-125"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {isChannelUnlocked ? (
              <form onSubmit={handleSendMessage} className="space-y-1.5">
                {/* Replying Banner */}
                {replyingTo && (
                  <div className="flex items-center justify-between text-xs bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] px-3 py-1.5 rounded-xl animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 truncate">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        Replying to <span className="font-bold">{replyingTo.author.name}</span>: &quot;{replyingTo.content.slice(0, 50)}...&quot;
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="text-[#9A3412] hover:text-[#7C2D12] p-0.5 rounded transition-colors"
                      title="Cancel reply"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Mode Selector: Discussion vs Ask Question */}
                <div className="flex items-center gap-1.5 pb-0.5">
                  <button
                    type="button"
                    onClick={() => setMessageType('discussion')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      messageType === 'discussion'
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
                    }`}
                  >
                    Discussion
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessageType('question')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 transition-all ${
                      messageType === 'question'
                        ? 'bg-[#1D4ED8] text-white shadow-xs'
                        : 'text-[#78716C] hover:text-[#1D4ED8] hover:bg-[#EFF6FF]'
                    }`}
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Ask Question</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={messageType === 'question' ? `Ask a question in #${activeChannel}...` : `Message #${activeChannel}...`}
                    className="flex-1 h-10 sm:h-11 px-3 sm:px-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs sm:text-sm focus:border-[#C2410C] focus:bg-white outline-hidden transition-all"
                  />

                  {/* Smile Emoji Trigger */}
                  <button
                    type="button"
                    onClick={() => setShowComposerEmojiPicker((prev) => !prev)}
                    className={`h-10 sm:h-11 px-2.5 sm:px-3 rounded-xl text-xs font-medium inline-flex items-center gap-1 shrink-0 transition-all active:scale-95 border ${
                      showComposerEmojiPicker
                        ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                        : 'bg-[#FAFAF9] hover:bg-[#FFF7ED] border-[#E7E5E4] hover:border-[#FED7AA] text-[#78716C] hover:text-[#C2410C]'
                    }`}
                    title="Insert Emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>

                  {/* Attach Trade Trigger */}
                  <button
                    type="button"
                    onClick={() => setShowAttachModal(true)}
                    title="Attach Audited Trade from Journal"
                    className="h-10 sm:h-11 px-2.5 sm:px-3 bg-[#FAFAF9] hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-[#C2410C] rounded-xl text-xs font-medium inline-flex items-center gap-1 shrink-0 transition-all active:scale-95"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="hidden md:inline">Attach Trade</span>
                  </button>

                  {/* Send Button */}
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
                <button
                  onClick={() => setShowConnectBrokerModal(true)}
                  className="font-bold text-[#C2410C] hover:underline text-[11px] shrink-0 ml-2"
                >
                  Verify Broker
                </button>
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

      {/* ============================================================ */}
      {/* MODAL 1: Connect Live / Funded Broker Account                */}
      {/* Anti-Cheat / Anti-Lie Investor Read-Only Verification        */}
      {/* ============================================================ */}
      {showConnectBrokerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#0F766E]" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1C1917]">
                    Connect Live / Funded Broker
                  </h3>
                  <span className="text-[10px] text-[#78716C]">
                    Investor Read-Only Verification Protocol
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowConnectBrokerModal(false);
                  setBrokerVerificationFeedback(null);
                }}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Anti-Lie Security Assurance Box */}
            <div className="p-3.5 bg-[#F0FDFA] rounded-2xl border border-[#CCFBF1] space-y-1.5 text-xs text-[#0F766E]">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span>Zero-Trust Meritocracy Verification</span>
              </div>
              <p className="text-[11px] text-[#115E59] leading-relaxed">
                To guarantee zero fake track records, PipBud audits your balance, equity, and closed trade fills directly via your <strong>Investor (Read-Only) Password</strong>. PipBud can <strong>NEVER</strong> place orders, execute trades, or access withdrawals.
              </p>
            </div>

            {/* Feedback Alert */}
            {brokerVerificationFeedback && (
              <div
                className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                  brokerVerificationFeedback.type === 'success'
                    ? 'bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D]'
                    : 'bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626]'
                }`}
              >
                {brokerVerificationFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertOctagon className="w-4 h-4 shrink-0" />
                )}
                <span>{brokerVerificationFeedback.text}</span>
              </div>
            )}

            {/* Connection Form */}
            <form onSubmit={handleConnectBrokerSubmit} className="space-y-4">
              {/* Platform Selector */}
              <div>
                <label className="text-xs font-bold text-[#1C1917] block mb-1.5">
                  1. Select Trading Platform:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mt5', label: 'MetaTrader 5' },
                    { id: 'mt4', label: 'MetaTrader 4' },
                    { id: 'prop_firm', label: 'Prop Firm Sync' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setBrokerPlatform(p.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        brokerPlatform === p.id
                          ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA] shadow-xs'
                          : 'bg-[#FAFAF9] text-[#44403C] border-[#E7E5E4] hover:bg-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Broker / Prop Firm & Account Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#1C1917] block mb-1">
                    Broker / Prop Firm:
                  </label>
                  <select
                    value={brokerNameInput}
                    onChange={(e) => setBrokerNameInput(e.target.value)}
                    className="w-full h-10 px-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-medium focus:border-[#C2410C] focus:bg-white outline-hidden"
                  >
                    <option value="FTMO">FTMO</option>
                    <option value="The 5%ers">The 5%ers</option>
                    <option value="FundingPips">FundingPips</option>
                    <option value="FundedNext">FundedNext</option>
                    <option value="Alpha Capital">Alpha Capital Markets</option>
                    <option value="Apex Trader Funding">Apex Trader Funding</option>
                    <option value="Topstep">Topstep</option>
                    <option value="IC Markets">IC Markets (Personal Live)</option>
                    <option value="Pepperstone">Pepperstone (Personal Live)</option>
                    <option value="Forex.com">Forex.com (Personal Live)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1C1917] block mb-1">
                    Account Stage:
                  </label>
                  <select
                    value={accountTypeInput}
                    onChange={(e) => setAccountTypeInput(e.target.value as any)}
                    className="w-full h-10 px-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-medium focus:border-[#C2410C] focus:bg-white outline-hidden"
                  >
                    <option value="LIVE_FUNDED">Live Funded Account (Qualifies L4+)</option>
                    <option value="EVALUATION_PASS">Evaluation Passed (Phase 2)</option>
                    <option value="PERSONAL_LIVE">Personal Live Broker Account</option>
                  </select>
                </div>
              </div>

              {/* Account Size -> Determines Meritocracy Tier */}
              <div>
                <label className="text-xs font-bold text-[#1C1917] block mb-1">
                  Verified Capital / Account Size:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[
                    { size: 25000, label: '$25k' },
                    { size: 50000, label: '$50k' },
                    { size: 100000, label: '$100k' },
                    { size: 200000, label: '$200k' },
                    { size: 500000, label: '$500k' },
                    { size: 1000000, label: '$1M+' },
                  ].map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setAccountSizeInput(s.size)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        accountSizeInput === s.size
                          ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                          : 'bg-[#FAFAF9] text-[#44403C] border-[#E7E5E4] hover:bg-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[#78716C] block mt-1">
                  $50k–$200k unlocks Level 4: Funded Floor • $1M+ unlocks Level 7: Titan Syndicate
                </span>
              </div>

              {/* Server & Account Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#1C1917] block mb-1">
                    Broker Server:
                  </label>
                  <input
                    type="text"
                    value={serverInput}
                    onChange={(e) => setServerInput(e.target.value)}
                    placeholder="e.g. FTMO-Server2, ICMarkets-Live"
                    className="w-full h-10 px-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs focus:border-[#C2410C] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1C1917] block mb-1">
                    Account Login / ID:
                  </label>
                  <input
                    type="text"
                    value={accountNumberInput}
                    onChange={(e) => setAccountNumberInput(e.target.value)}
                    placeholder="e.g. 8492041"
                    className="w-full h-10 px-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono focus:border-[#C2410C] focus:bg-white outline-hidden"
                    required
                  />
                </div>
              </div>

              {/* Investor Password (Read-Only) */}
              <div>
                <label className="text-xs font-bold text-[#1C1917] flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-[#0F766E]" />
                    <span>Investor (Read-Only) Password:</span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#0F766E]">100% Read-Only</span>
                </label>
                <input
                  type="password"
                  value={investorPasswordInput}
                  onChange={(e) => setInvestorPasswordInput(e.target.value)}
                  placeholder="Enter read-only investor secret"
                  className="w-full h-10 px-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs font-mono focus:border-[#C2410C] focus:bg-white outline-hidden"
                />
                <p className="text-[10px] text-[#A8A29E] mt-1">
                  Never enter your master trading password. PipBud only needs investor read access to verify balance and closed trades.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => {
                    setShowConnectBrokerModal(false);
                    setBrokerVerificationFeedback(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium text-[#78716C] hover:bg-[#F5F5F4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifyingBroker}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C2410C] hover:bg-[#EA580C] text-white shadow-xs transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isVerifyingBroker ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  <span>{isVerifyingBroker ? 'Auditing with Broker Server...' : 'Verify & Synchronize Account'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: Trader Meritocracy Profile Modal                    */}
      {/* ============================================================ */}
      {selectedProfileTrader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                  Verified Trader Profile
                </span>
              </div>
              <button
                onClick={() => setSelectedProfileTrader(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Hero Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
              {selectedProfileTrader.avatarType?.startsWith('mascot') || selectedProfileTrader.isCurrentUser ? (
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#FED7AA] p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                  <Image
                    src="/icon-192.png"
                    alt="Mascot Avatar"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
              ) : selectedProfileTrader.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedProfileTrader.avatarUrl}
                  alt={selectedProfileTrader.name}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-xs border border-[#E7E5E4]"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-2xl text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs uppercase"
                  style={{ backgroundColor: selectedProfileTrader.tierColor }}
                >
                  {selectedProfileTrader.name.slice(0, 2)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1917] truncate">
                    {selectedProfileTrader.name}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: selectedProfileTrader.tierColor }}
                  >
                    Level {selectedProfileTrader.level}
                  </span>
                </div>
                <div className="text-xs font-semibold" style={{ color: selectedProfileTrader.tierColor }}>
                  {selectedProfileTrader.badge}
                </div>
                <div className="text-[11px] text-[#78716C] flex items-center gap-1 truncate">
                  <span>@{selectedProfileTrader.username}</span>
                  <span>•</span>
                  <span className="truncate">{selectedProfileTrader.broker}</span>
                </div>
              </div>
            </div>

            {/* PipBud Privacy Shield Notice */}
            <div className="p-3 bg-[#F0FDFA] rounded-2xl border border-[#CCFBF1] flex items-start gap-2.5 text-xs text-[#0F766E]">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#0F766E]" />
              <div className="space-y-0.5">
                <div className="font-bold">PipBud Identity Shield Protected</div>
                <p className="text-[11px] text-[#115E59] leading-relaxed">
                  Direct Telegram contact handles are masked by the meritocracy engine. Peer communications are strictly moderated through audited desk rooms to prevent unsolicited solicitation.
                </p>
              </div>
            </div>

            {/* Meritocracy Statistics Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center justify-between">
                <span>Verified Trading Track Record</span>
                <span className="text-[10px] text-[#15803D] font-mono bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  Audited on-chain
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Win Rate</span>
                  <span className="text-sm font-bold text-[#1C1917]">{selectedProfileTrader.winRate}%</span>
                </div>
                <div className="bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Profit Factor</span>
                  <span className="text-sm font-bold text-[#0F766E]">{selectedProfileTrader.profitFactor}</span>
                </div>
                <div className="bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Max Drawdown</span>
                  <span className="text-sm font-bold text-[#C2410C]">{selectedProfileTrader.maxDrawdown}%</span>
                </div>
                <div className="bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Verified Trades</span>
                  <span className="text-sm font-bold text-[#1C1917]">{selectedProfileTrader.totalTrades}</span>
                </div>
              </div>
            </div>

            {/* Trading Style & Bio */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-1">
                <div className="text-[10px] font-bold text-[#78716C] uppercase">Strategy Specialization</div>
                <div className="font-semibold text-[#1C1917]">{selectedProfileTrader.tradingStyle}</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1">
                <div className="text-[10px] font-bold text-[#78716C] uppercase">Bio & Track Record Summary</div>
                <p className="text-[11px] text-[#44403C] leading-relaxed">{selectedProfileTrader.bio}</p>
              </div>
            </div>

            {/* Recent Audited Trades List */}
            {selectedProfileTrader.recentTrades && selectedProfileTrader.recentTrades.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                  Recent Audited Setups
                </div>
                <div className="space-y-1.5">
                  {selectedProfileTrader.recentTrades.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            t.direction === 'LONG' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                          }`}
                        >
                          {t.direction}
                        </span>
                        <span className="font-bold text-[#1C1917]">{t.pair}</span>
                        <span className="text-[10px] text-[#78716C]">{t.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#78716C] font-mono">R:R {t.rr}</span>
                        <span className="font-bold text-[#15803D]">{t.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-[#E7E5E4]">
              {selectedProfileTrader.isCurrentUser ? (
                <Link
                  href="/settings"
                  className="w-full sm:w-auto px-4 py-2 text-center rounded-xl text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] hover:bg-[#FFEDD5] transition-all"
                >
                  Edit Profile in Settings
                </Link>
              ) : (
                <Link
                  href="/journal"
                  className="w-full sm:w-auto px-4 py-2 text-center rounded-xl text-xs font-semibold bg-[#FAFAF9] text-[#1C1917] border border-[#E7E5E4] hover:bg-[#F5F5F4] transition-all"
                >
                  View Performance in Journal
                </Link>
              )}
              <button
                onClick={() => setSelectedProfileTrader(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-[#1C1917] hover:bg-[#292524] text-white shadow-xs transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: Audited Trade Verification Breakdown                */}
      {/* ============================================================ */}
      {selectedTradeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1C1917]">
                    Audited Trade Verification
                  </h3>
                  <span className="text-[10px] text-[#78716C] font-mono">
                    Hash: {selectedTradeDetail.hash || 'pb-sha256-verified-4829'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTradeDetail(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Trade Hero Banner */}
            <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedTradeDetail.direction === 'LONG'
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : 'bg-[#FEE2E2] text-[#B91C1C]'
                    }`}
                  >
                    {selectedTradeDetail.direction}
                  </span>
                  <span className="text-base font-bold text-[#1C1917]">{selectedTradeDetail.pair}</span>
                </div>
                <div className="text-xs text-[#78716C]">{selectedTradeDetail.setup}</div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#15803D] block">{selectedTradeDetail.profit}</span>
                <span className="text-[10px] font-semibold text-[#0F766E] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  WIN • R:R {selectedTradeDetail.rr}
                </span>
              </div>
            </div>

            {/* Execution Price Metrics */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                Execution Parameters
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="bg-[#FAFAF9] p-3 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Entry Price</span>
                  <span className="text-xs font-bold text-[#1C1917]">{selectedTradeDetail.entry}</span>
                </div>
                <div className="bg-[#FAFAF9] p-3 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Stop Loss</span>
                  <span className="text-xs font-bold text-[#B91C1C]">{selectedTradeDetail.sl}</span>
                  <span className="text-[9px] text-[#78716C] block">{selectedTradeDetail.pipsRisk || '20 pips'}</span>
                </div>
                <div className="bg-[#FAFAF9] p-3 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">Take Profit</span>
                  <span className="text-xs font-bold text-[#15803D]">{selectedTradeDetail.tp}</span>
                  <span className="text-[9px] text-[#78716C] block">{selectedTradeDetail.pipsTarget || '60 pips'}</span>
                </div>
                <div className="bg-[#FAFAF9] p-3 rounded-xl border border-[#E7E5E4]">
                  <span className="text-[10px] text-[#78716C] block">R:R Ratio</span>
                  <span className="text-xs font-bold text-[#C2410C]">{selectedTradeDetail.rr}</span>
                </div>
              </div>
            </div>

            {/* Confluence Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                Audited Confluence Checklist
              </div>
              <div className="p-3 bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] space-y-2 text-xs">
                {(selectedTradeDetail.confluences || [
                  'Higher timeframe bias confirmed on 4H chart',
                  'London/NY session liquidity pool swept prior to entry',
                  'Strict 1.0% risk parameter validated before fill',
                  'Stop-loss confirmed by broker ticket fill timestamp',
                ]).map((conf, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#44403C]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                    <span className="text-[11px]">{conf}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cryptographic Proof Card */}
            <div className="p-3 bg-[#1C1917] text-[#FAFAF9] rounded-2xl border border-[#292524] space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[11px] text-[#A8A29E]">
                <span className="font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>PipBud Bot Engine Cryptographic Proof</span>
                </span>
                <span className="text-[10px] bg-[#0F766E] text-white px-2 py-0.5 rounded-full font-mono">
                  VERIFIED
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#D6D3D1] space-y-0.5 pt-1">
                <div>Ticket: {selectedTradeDetail.ticketId || '#8492041'}</div>
                <div>Hash: {selectedTradeDetail.hash || 'pb-sha256-49281a98e01bf2'}</div>
                <div>Session: {selectedTradeDetail.session || 'London Killzone'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-2 border-t border-[#E7E5E4]">
              <Link
                href="/journal"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#1C1917] border border-[#E7E5E4] transition-all"
              >
                Inspect in Web Journal
              </Link>
              <button
                onClick={() => setSelectedTradeDetail(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#C2410C] hover:bg-[#EA580C] text-white shadow-xs transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: Attach Audited Trade from Journal                   */}
      {/* ============================================================ */}
      {showAttachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-sm sm:text-base font-bold text-[#1C1917] flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-[#C2410C]" />
                <span>Attach Audited Trade from Journal</span>
              </h3>
              <button
                onClick={() => setShowAttachModal(false)}
                className="text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#44403C]">
              Select a verified trade log from your PipBud account to share directly into <strong>#{activeChannel}</strong>. Only trades verified with broker hashes can be attached.
            </p>

            {/* Selectable trades list */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {AVAILABLE_JOURNAL_TRADES.map((trade, idx) => {
                const isSelected = selectedTradeToAttach.hash === trade.hash;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTradeToAttach(trade)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'border-[#C2410C] bg-[#FFF7ED] shadow-xs'
                        : 'border-[#E7E5E4] hover:bg-[#FAFAF9]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            trade.direction === 'LONG' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                          }`}
                        >
                          {trade.direction}
                        </span>
                        <span className="font-bold text-xs text-[#1C1917]">{trade.pair}</span>
                        <span className="text-[10px] text-[#78716C] hidden sm:inline">• {trade.setup}</span>
                      </div>
                      <span className="font-bold text-xs text-[#15803D]">{trade.profit}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#78716C] font-mono pt-1 border-t border-[#E7E5E4]/60">
                      <span>R:R {trade.rr} • Exit: {trade.tp}</span>
                      <span className="text-[#0F766E] font-medium">Verified by @PipBudBot</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom comment input */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-semibold text-[#1C1917]">Optional Note to Floor:</label>
              <input
                type="text"
                value={customAttachNote}
                onChange={(e) => setCustomAttachNote(e.target.value)}
                placeholder="e.g. Clean 15m mitigation during London open..."
                className="w-full h-10 px-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs focus:border-[#C2410C] focus:bg-white outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-[#E7E5E4]">
              <button
                onClick={() => setShowAttachModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#78716C] hover:bg-[#F5F5F4]"
              >
                Cancel
              </button>
              <button
                onClick={handleAttachTradeConfirm}
                className="px-5 py-2 rounded-xl text-xs font-medium bg-[#C2410C] hover:bg-[#EA580C] text-white shadow-xs transition-all active:scale-95"
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
