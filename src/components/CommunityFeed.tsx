'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  TrendingUp,
  MessageSquare,
  ArrowUp,
  Share2,
  Bookmark,
  CheckCircle2,
  Search,
  Plus,
  Send,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Award,
  Clock,
  Flame,
  Info,
  X,
  Compass,
  Check,
  Activity,
  Radio
} from 'lucide-react';
import PipbudLogo from './PipbudLogo';
import { useAuth, getApiBase } from '@/context/AuthContext';
import { PostCardSkeleton } from './SkeletonLoader';

export type PostCategory = 'question' | 'setup' | 'intel' | 'discussion';

export interface PostReply {
  id: string;
  author: {
    name: string;
    username: string;
    level: number;
    badge: string;
    tierColor: string;
    broker?: string;
  };
  content: string;
  timestamp: string;
  upvotes: number;
  isVerifiedAnswer?: boolean;
}

export interface CommunityPost {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  author: {
    name: string;
    username: string;
    level: number;
    badge: string;
    tierColor: string;
    broker: string;
    winRate: string | number;
  };
  tags: string[];
  setupData?: {
    pair: string;
    direction: 'LONG' | 'SHORT';
    entry: string;
    sl: string;
    tp: string;
    rr: string;
  };
  upvotes: number;
  hasUpvoted?: boolean;
  replies: PostReply[];
  timestamp: string;
  isPinned?: boolean;
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    category: 'question',
    title: 'How do you prevent moving your Stop Loss into breakeven prematurely on high-volatility London opens?',
    content:
      'I trade EUR/USD and GBP/JPY during London Open (07:00–09:00 UTC). Frequently, after getting 1.5R in profit, I move my stop loss to breakeven, only for the price to sweep back to original order block and take off to 4R without me. How do experienced Level 4+ funded traders manage trail stops without getting shaken out?',
    author: {
      name: 'Marcus Vance',
      username: 'marcus_fx',
      level: 2,
      badge: 'Apprentice',
      tierColor: '#2563EB',
      broker: 'FundingPips ($50k)',
      winRate: 54.2,
    },
    tags: ['RiskManagement', 'Psychology', 'LondonOpen', 'StopLoss'],
    upvotes: 42,
    timestamp: '25m ago',
    replies: [
      {
        id: 'reply-1-1',
        author: {
          name: 'Sarah Sterling',
          username: 'sterling_apex',
          level: 5,
          badge: 'Elite Alpha',
          tierColor: '#8B5CF6',
          broker: 'FTMO ($200k Funded)',
        },
        content:
          'Rule #1 of liquidity delivery: Breakeven stops are retail liquidity magnets. Do not move stops to BE until price breaks and closes beyond the intermediate high/low on the 15m timeframe, not just a 1m or 5m spike. Either accept your initial 1R risk or take off 40% partials at 2R and leave the original stop intact.',
        timestamp: '18m ago',
        upvotes: 29,
        isVerifiedAnswer: true,
      },
      {
        id: 'reply-1-2',
        author: {
          name: 'David K.',
          username: 'david_k',
          level: 4,
          badge: 'Funded Pro',
          tierColor: '#C2410C',
          broker: 'Alpha Capital ($100k)',
        },
        content:
          'Agree with Sarah. Also check high-impact news on the PipBud calendar. If there is GBP CPI or German PPI within 30 mins, wide volatility swings are expected. I log this in my journal as "execution hesitation".',
        timestamp: '10m ago',
        upvotes: 11,
      },
    ],
  },
  {
    id: 'post-2',
    category: 'setup',
    title: 'EUR/USD London Silver Bullet Liquidity Sweep & 15m FVG Re-test',
    content:
      'Clean buy-side liquidity run above Asian Highs (1.0880). M5 market structure shift with displacement, leaving a pristine 15m Fair Value Gap. Looking for continuation towards previous weekly high.',
    author: {
      name: 'Sarah Sterling',
      username: 'sterling_apex',
      level: 5,
      badge: 'Elite Alpha',
      tierColor: '#8B5CF6',
      broker: 'FTMO ($200k Funded)',
      winRate: 68.4,
    },
    tags: ['EURUSD', 'ICT', 'SilverBullet', 'FVG'],
    setupData: {
      pair: 'EUR/USD',
      direction: 'LONG',
      entry: '1.0845',
      sl: '1.0825',
      tp: '1.0915',
      rr: '3.5',
    },
    upvotes: 78,
    timestamp: '1h ago',
    replies: [
      {
        id: 'reply-2-1',
        author: {
          name: 'Liam Chen',
          username: 'chen_quant',
          level: 3,
          badge: 'Consistent',
          tierColor: '#059669',
          broker: 'IC Markets Live',
        },
        content: 'Clean tap into the 50% equilibrium. Entered with 0.75% risk on the 1m confirmation candle.',
        timestamp: '45m ago',
        upvotes: 14,
      },
    ],
  },
  {
    id: 'post-3',
    category: 'intel',
    title: 'DXY 104.50 Resistance & US Initial Jobless Claims Macro Impact Analysis',
    content:
      'The US Dollar Index (DXY) is testing the multi-week supply zone between 104.45 and 104.60. US Treasury 10Y yields have paused at 4.22%. If Initial Jobless Claims prints higher than 225k consensus, expect rapid dollar unwinding across EUR and Gold pairs.',
    author: {
      name: 'Elena Rostova',
      username: 'elena_macro',
      level: 6,
      badge: 'Master Mentor',
      tierColor: '#DC2626',
      broker: 'Verified Institutional Desk',
      winRate: 74.8,
    },
    tags: ['DXY', 'MacroIntel', 'Yields', 'Gold'],
    upvotes: 95,
    timestamp: '3h ago',
    replies: [
      {
        id: 'reply-3-1',
        author: {
          name: 'Tariq Al-Mansoor',
          username: 'tariq_fx',
          level: 4,
          badge: 'Funded Pro',
          tierColor: '#C2410C',
          broker: 'FundedNext ($100k)',
        },
        content: 'Watching XAU/USD $2640 pivot as confluence. If DXY drops below 104.20, Gold easily runs to $2665.',
        timestamp: '2h ago',
        upvotes: 21,
      },
    ],
  },
  {
    id: 'post-4',
    category: 'question',
    title: 'What daily drawdown cushion do you set before closing the trading terminal for the day?',
    content:
      'Most funded firms enforce a 5% maximum daily loss, but risking up to that ceiling causes revenge trading. I am setting a personal circuit breaker in PipBud at 1.5% max daily drawdown. What rules do other traders use?',
    author: {
      name: 'Oliver Thorne',
      username: 'oliver_t',
      level: 1,
      badge: 'Novice',
      tierColor: '#78716C',
      broker: 'Personal Broker Account',
      winRate: 46.0,
    },
    tags: ['Psychology', 'Drawdown', 'Discipline'],
    upvotes: 36,
    timestamp: '5h ago',
    replies: [
      {
        id: 'reply-4-1',
        author: {
          name: 'Sarah Sterling',
          username: 'sterling_apex',
          level: 5,
          badge: 'Elite Alpha',
          tierColor: '#8B5CF6',
          broker: 'FTMO ($200k Funded)',
        },
        content:
          '1.5% is institutional gold standard. 2 losses at 0.75% risk = screen locked. PipBud anti-shortfall demotion triggers if you exceed risk limits, which keeps discipline mechanical rather than emotional.',
        timestamp: '4h ago',
        upvotes: 38,
        isVerifiedAnswer: true,
      },
    ],
  },
];

export default function CommunityFeed({ onSwitchToPublic }: { onSwitchToPublic?: () => void }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // New Post Form State
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>('question');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [newPostPair, setNewPostPair] = useState('EUR/USD');
  const [newPostDirection, setNewPostDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [newPostEntry, setNewPostEntry] = useState('');
  const [newPostSL, setNewPostSL] = useState('');
  const [newPostTP, setNewPostTP] = useState('');

  // Reply Thread Drawer State
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState('');

  // Simulate smooth skeleton loading on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Filtered Posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'my'
        ? user && post.author.username === user.username
        : post.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query)) ||
      post.author.name.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Handle Upvote
  const handleToggleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const willUpvote = !p.hasUpvoted;
        return {
          ...p,
          hasUpvoted: willUpvote,
          upvotes: willUpvote ? p.upvotes + 1 : Math.max(0, p.upvotes - 1),
        };
      })
    );
  };

  // Handle Publish Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const parsedTags = newPostTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const createdPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: newPostCategory,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      author: {
        name: user?.display_name || user?.name || `@${user?.username || 'Trader'}`,
        username: user?.username || 'trader',
        level: user?.skill_level || 1,
        badge: user?.tier_badge || 'Novice',
        tierColor: user?.tier_color || '#78716C',
        broker: user?.broker_name || 'Verified Trader',
        winRate: user?.win_rate || 0,
      },
      tags: parsedTags.length > 0 ? parsedTags : [newPostCategory === 'question' ? 'Q&A' : 'General'],
      setupData:
        newPostCategory === 'setup' && newPostEntry
          ? {
              pair: newPostPair,
              direction: newPostDirection,
              entry: newPostEntry,
              sl: newPostSL,
              tp: newPostTP,
              rr: '2.5',
            }
          : undefined,
      upvotes: 1,
      hasUpvoted: true,
      replies: [],
      timestamp: 'Just now',
    };

    setPosts([createdPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setNewPostEntry('');
    setNewPostSL('');
    setNewPostTP('');
    setIsComposerOpen(false);
  };

  // Handle Submit Reply / Answer
  const handleAddReply = (postId: string) => {
    if (!replyInputText.trim() || !user) return;

    const newReply: PostReply = {
      id: `reply-${Date.now()}`,
      author: {
        name: user.display_name || user.name || `@${user.username}`,
        username: user.username,
        level: user.skill_level,
        badge: user.tier_badge,
        tierColor: user.tier_color || '#1C1917',
        broker: user.broker_name || 'Verified Trader',
      },
      content: replyInputText.trim(),
      timestamp: 'Just now',
      upvotes: 1,
      isVerifiedAnswer: user.skill_level >= 4,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: [...p.replies, newReply],
        };
      })
    );

    setReplyInputText('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-[#FED7AA] selection:text-[#9A3412]">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-30 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#E7E5E4] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <PipbudLogo size="md" />
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F5F5F4] border border-[#E7E5E4] text-[11px] font-medium text-[#44403C]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>London / New York Overlap Session</span>
          </div>
        </div>

        {/* Action Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/forum"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] text-[#1C1917] transition-all shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>7-Tier Desks</span>
          </Link>

          <Link
            href="/journal"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] text-[#1C1917] transition-all shadow-xs"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Trading Journal</span>
          </Link>

          {/* User Badge Profile Link */}
          {user && (
            <Link
              href="/settings"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#FED7AA] shadow-xs text-xs font-semibold text-[#1C1917]"
            >
              <div
                className="w-6 h-6 rounded-lg text-white text-[10px] font-bold flex items-center justify-center uppercase shrink-0"
                style={{ backgroundColor: user.tier_color || '#1C1917' }}
              >
                {user.username.slice(0, 2)}
              </div>
              <span className="truncate max-w-[90px] sm:max-w-[130px]">@{user.username}</span>
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: user.tier_color || '#C2410C' }}
              >
                L{user.skill_level}
              </span>
            </Link>
          )}

          {/* Public Landing Switcher */}
          {onSwitchToPublic && (
            <button
              onClick={onSwitchToPublic}
              className="text-xs text-[#78716C] hover:text-[#1C1917] px-2 py-1 rounded-lg border border-transparent hover:border-[#E7E5E4] transition-all"
              title="View Public Marketing Landing Page"
            >
              Public Site
            </button>
          )}
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feed Column */}
          <main className="lg:col-span-8 space-y-4">
            {/* Quick Post & Question Trigger Bar */}
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase"
                  style={{ backgroundColor: user?.tier_color || '#1C1917' }}
                >
                  {user ? user.username.slice(0, 2) : 'TR'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNewPostCategory('question');
                    setIsComposerOpen(true);
                  }}
                  className="flex-1 text-left px-4 py-2.5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] text-xs text-[#78716C] transition-all"
                >
                  Ask a trading question or drop market alpha...
                </button>
              </div>

              {/* Action Category Shortcuts */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#F5F5F4] overflow-x-auto text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setNewPostCategory('question');
                    setIsComposerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF9] hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] font-medium text-[#1C1917] flex items-center gap-1.5 shrink-0 transition-all"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Ask Question (Q&A)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNewPostCategory('setup');
                    setIsComposerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF9] hover:bg-[#F0FDFA] border border-[#E7E5E4] hover:border-[#CCFBF1] font-medium text-[#1C1917] flex items-center gap-1.5 shrink-0 transition-all"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Share Setup</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNewPostCategory('intel');
                    setIsComposerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] font-medium text-[#1C1917] flex items-center gap-1.5 shrink-0 transition-all"
                >
                  <Radio className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Market Intel</span>
                </button>
              </div>
            </div>

            {/* Inline Composer Modal/Drawer */}
            {isComposerOpen && (
              <div className="bg-white rounded-2xl border-2 border-[#FED7AA] p-5 shadow-lg space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1C1917]">Create Community Discussion</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#C2410C] font-semibold border border-[#FED7AA]">
                      Signed as @{user?.username || 'trader'}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsComposerOpen(false)}
                    className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-3.5">
                  {/* Category Selector */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'question', label: 'Ask Question', icon: HelpCircle },
                      { id: 'setup', label: 'Trade Setup', icon: TrendingUp },
                      { id: 'intel', label: 'Market Intel', icon: Radio },
                      { id: 'discussion', label: 'Discussion', icon: MessageSquare },
                    ].map((cat) => {
                      const Icon = cat.icon;
                      const active = newPostCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setNewPostCategory(cat.id as PostCategory)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            active
                              ? 'bg-[#1C1917] text-white shadow-xs'
                              : 'bg-[#FAFAF9] text-[#78716C] border border-[#E7E5E4] hover:text-[#1C1917]'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Title */}
                  <div>
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder={
                        newPostCategory === 'question'
                          ? 'What is your specific trading question? (e.g. How do you handle slippage during NFP?)'
                          : 'Enter a concise, descriptive title...'
                      }
                      className="w-full h-11 px-4 rounded-xl border border-[#E7E5E4] text-xs sm:text-sm font-semibold text-[#1C1917] bg-[#FAFAF9] focus:bg-white focus:border-[#C2410C] outline-hidden transition-all"
                      required
                    />
                  </div>

                  {/* Body Content */}
                  <div>
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={4}
                      placeholder="Provide background, confluences, setup details, or execution context..."
                      className="w-full p-4 rounded-xl border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] bg-[#FAFAF9] focus:bg-white focus:border-[#C2410C] outline-hidden transition-all resize-y"
                      required
                    />
                  </div>

                  {/* If Trade Setup -> Add Price Targets */}
                  {newPostCategory === 'setup' && (
                    <div className="p-3.5 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] space-y-2.5">
                      <span className="text-xs font-bold text-[#1C1917] block">Trade Parameters</span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-[#78716C] block">Pair</label>
                          <input
                            type="text"
                            value={newPostPair}
                            onChange={(e) => setNewPostPair(e.target.value.toUpperCase())}
                            className="w-full h-8 px-2 rounded-lg border border-[#E7E5E4] font-mono text-xs uppercase"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#78716C] block">Direction</label>
                          <select
                            value={newPostDirection}
                            onChange={(e) => setNewPostDirection(e.target.value as 'LONG' | 'SHORT')}
                            className="w-full h-8 px-2 rounded-lg border border-[#E7E5E4] text-xs font-bold"
                          >
                            <option value="LONG">LONG</option>
                            <option value="SHORT">SHORT</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-[#78716C] block">Entry</label>
                          <input
                            type="text"
                            value={newPostEntry}
                            onChange={(e) => setNewPostEntry(e.target.value)}
                            placeholder="1.0850"
                            className="w-full h-8 px-2 rounded-lg border border-[#E7E5E4] font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#78716C] block">Stop Loss</label>
                          <input
                            type="text"
                            value={newPostSL}
                            onChange={(e) => setNewPostSL(e.target.value)}
                            placeholder="1.0830"
                            className="w-full h-8 px-2 rounded-lg border border-[#E7E5E4] font-mono text-xs text-[#DC2626]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#78716C] block">Target</label>
                          <input
                            type="text"
                            value={newPostTP}
                            onChange={(e) => setNewPostTP(e.target.value)}
                            placeholder="1.0910"
                            className="w-full h-8 px-2 rounded-lg border border-[#E7E5E4] font-mono text-xs text-[#0F766E]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <input
                      type="text"
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                      placeholder="Tags separated by commas (e.g. RiskManagement, ICT, Psychology)"
                      className="w-full h-9 px-3.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] bg-[#FAFAF9]"
                    />
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#78716C]">
                      Your verified meritocracy track record will be pinned to this post.
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsComposerOpen(false)}
                        className="px-4 h-9 rounded-xl text-xs font-medium text-[#78716C] hover:bg-[#F5F5F4]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 h-9 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        Publish Post
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Filter Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-[#E7E5E4] shadow-xs">
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'all', label: 'All Discussions' },
                  { id: 'question', label: 'Questions (Q&A)' },
                  { id: 'setup', label: 'Trade Setups' },
                  { id: 'intel', label: 'Market Intel' },
                  { id: 'my', label: 'My Posts' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                      selectedCategory === tab.id
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter discussions..."
                  className="w-full h-8 pl-8 pr-3 rounded-lg border border-[#E7E5E4] text-xs text-[#1C1917] bg-[#FAFAF9] outline-hidden focus:border-[#C2410C]"
                />
                <Search className="w-3.5 h-3.5 text-[#A8A29E] absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Post Stream */}
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </>
              ) : filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center space-y-2">
                  <Compass className="w-8 h-8 text-[#A8A29E] mx-auto" />
                  <p className="font-semibold text-sm text-[#1C1917]">No discussions found</p>
                  <p className="text-xs text-[#78716C]">
                    Be the first trader to ask a question or drop market alpha in this category.
                  </p>
                  <button
                    onClick={() => {
                      setNewPostCategory('question');
                      setIsComposerOpen(true);
                    }}
                    className="mt-2 h-9 px-4 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-all"
                  >
                    Create Post
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#D6D3D1] transition-all p-5 shadow-xs space-y-3.5"
                  >
                    {/* Header: Author & Category Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-9 h-9 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase shadow-xs"
                          style={{ backgroundColor: post.author.tierColor }}
                        >
                          {post.author.username.slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="font-bold text-xs text-[#1C1917] truncate">{post.author.name}</span>
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white shrink-0"
                              style={{ backgroundColor: post.author.tierColor }}
                            >
                              L{post.author.level}
                            </span>
                            <span className="text-[10px] font-medium text-[#78716C] hidden sm:inline">
                              {post.author.broker}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#A8A29E] block">{post.timestamp}</span>
                        </div>
                      </div>

                      {/* Post Category Tag */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                          post.category === 'question'
                            ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                            : post.category === 'setup'
                            ? 'bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]'
                            : post.category === 'intel'
                            ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                            : 'bg-[#F5F5F4] text-[#57534E] border border-[#E7E5E4]'
                        }`}
                      >
                        {post.category === 'question'
                          ? 'Question'
                          : post.category === 'setup'
                          ? 'Trade Setup'
                          : post.category === 'intel'
                          ? 'Market Intel'
                          : 'Discussion'}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-sm sm:text-base font-bold text-[#1C1917] tracking-tight leading-snug">
                      {post.title}
                    </h2>

                    {/* Post Content */}
                    <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Setup Parameter Snapshot Card */}
                    {post.setupData && (
                      <div className="p-3.5 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] font-mono text-xs flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              post.setupData.direction === 'LONG'
                                ? 'bg-[#DCFCE7] text-[#15803D]'
                                : 'bg-[#FEE2E2] text-[#B91C1C]'
                            }`}
                          >
                            {post.setupData.direction}
                          </span>
                          <span className="font-bold text-[#1C1917]">{post.setupData.pair}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[11px]">
                          <span>
                            Entry: <strong>{post.setupData.entry}</strong>
                          </span>
                          <span>
                            SL: <strong className="text-[#DC2626]">{post.setupData.sl}</strong>
                          </span>
                          <span>
                            TP: <strong className="text-[#0F766E]">{post.setupData.tp}</strong>
                          </span>
                          <span>
                            R:R: <strong>1:{post.setupData.rr}</strong>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAFAF9] border border-[#E7E5E4] text-[#57534E]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Bar (Upvotes, Answers/Comments, Share) */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F4] text-xs">
                      <div className="flex items-center gap-2">
                        {/* Upvote Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleUpvote(post.id)}
                          className={`h-8 px-3 rounded-lg flex items-center gap-1.5 font-semibold transition-all ${
                            post.hasUpvoted
                              ? 'bg-[#C2410C] text-white shadow-xs'
                              : 'bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#57534E] border border-[#E7E5E4]'
                          }`}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                          <span>{post.upvotes}</span>
                        </button>

                        {/* Toggle Answers Thread */}
                        <button
                          type="button"
                          onClick={() =>
                            setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                          }
                          className="h-8 px-3 rounded-lg bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#57534E] border border-[#E7E5E4] font-medium flex items-center gap-1.5 transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>
                            {post.replies.length}{' '}
                            {post.category === 'question' ? 'Answers' : 'Replies'}
                          </span>
                        </button>
                      </div>

                      <span className="text-[11px] text-[#A8A29E]">Audited Track Record</span>
                    </div>

                    {/* Expandable Answers & Replies Thread */}
                    {activeReplyPostId === post.id && (
                      <div className="pt-3 border-t border-[#E7E5E4] space-y-3 bg-[#FAFAF9]/50 -mx-5 -mb-5 p-5 rounded-b-2xl">
                        <div className="space-y-2.5">
                          <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                            {post.category === 'question' ? 'Verified Answers' : 'Discussion Thread'} (
                            {post.replies.length})
                          </h3>

                          {post.replies.length === 0 ? (
                            <p className="text-xs text-[#78716C] py-2">
                              No answers yet. Share your experience or analysis below!
                            </p>
                          ) : (
                            post.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                                  reply.isVerifiedAnswer
                                    ? 'bg-white border-[#CCFBF1] shadow-xs'
                                    : 'bg-white border-[#E7E5E4]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#1C1917]">{reply.author.name}</span>
                                    <span
                                      className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white"
                                      style={{ backgroundColor: reply.author.tierColor }}
                                    >
                                      L{reply.author.level}
                                    </span>
                                    {reply.isVerifiedAnswer && (
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
                                        <CheckCircle2 className="w-3 h-3 text-[#0F766E]" />
                                        <span>Funded Pro Answer</span>
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-[#A8A29E]">{reply.timestamp}</span>
                                </div>
                                <p className="text-[#44403C] leading-relaxed">{reply.content}</p>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Reply Form */}
                        <div className="flex gap-2 pt-2">
                          <input
                            type="text"
                            value={replyInputText}
                            onChange={(e) => setReplyInputText(e.target.value)}
                            placeholder={
                              post.category === 'question'
                                ? 'Write a verified answer...'
                                : 'Contribute to this discussion...'
                            }
                            className="flex-1 h-9 px-3 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] bg-white outline-hidden focus:border-[#C2410C]"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddReply(post.id);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleAddReply(post.id)}
                            className="px-4 h-9 bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold rounded-xl transition-all shrink-0"
                          >
                            Answer
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </main>

          {/* Right Sidebar: Trader Status & Desk Directory */}
          <aside className="lg:col-span-4 space-y-4">
            {/* Active Trader Meritocracy Card */}
            {user && (
              <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center shrink-0 uppercase shadow-xs"
                    style={{ backgroundColor: user.tier_color || '#1C1917' }}
                  >
                    {user.username.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-sm text-[#1C1917] block truncate">
                      {user.display_name || user.name || `@${user.username}`}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: user.tier_color || '#C2410C' }}>
                      Level {user.skill_level} — {user.tier_badge}
                    </span>
                    <span className="text-[11px] text-[#78716C] block truncate">
                      {user.broker_name || 'Verified Live Trader'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F5F5F4] text-center text-xs">
                  <div>
                    <span className="text-[#78716C] block text-[10px]">Win Rate</span>
                    <strong className="text-[#1C1917]">{user.win_rate}%</strong>
                  </div>
                  <div>
                    <span className="text-[#78716C] block text-[10px]">Profit Factor</span>
                    <strong className="text-[#0F766E]">{user.profit_factor}</strong>
                  </div>
                  <div>
                    <span className="text-[#78716C] block text-[10px]">Max DD</span>
                    <strong className="text-[#C2410C]">{user.max_drawdown}%</strong>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <Link
                    href="/journal"
                    className="w-full h-9 rounded-xl bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-[#0F766E]" />
                    <span>View Private Journal</span>
                  </Link>

                  <Link
                    href="/forum"
                    className="w-full h-9 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Live Trader Desks</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Top Trending Questions Widget */}
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#F5F5F4]">
                <HelpCircle className="w-4 h-4 text-[#C2410C]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1C1917]">
                  Top Questions This Week
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('question');
                    setSearchQuery('Stop Loss');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#FAFAF9] transition-colors block group"
                >
                  <p className="font-semibold text-[#1C1917] group-hover:text-[#C2410C] line-clamp-2">
                    How do you prevent moving Stop Loss into breakeven prematurely on London open?
                  </p>
                  <span className="text-[10px] text-[#A8A29E] mt-1 block">2 Verified Answers • 42 Upvotes</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('question');
                    setSearchQuery('Drawdown');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#FAFAF9] transition-colors block group"
                >
                  <p className="font-semibold text-[#1C1917] group-hover:text-[#C2410C] line-clamp-2">
                    What daily drawdown cushion do you set before closing the trading terminal?
                  </p>
                  <span className="text-[10px] text-[#A8A29E] mt-1 block">1 Verified Answer • 36 Upvotes</span>
                </button>
              </div>
            </div>

            {/* Institutional Meritocracy Rules */}
            <div className="bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] p-5 text-xs text-[#57534E] space-y-2">
              <div className="flex items-center gap-2 text-[#1C1917] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                <span>Meritocracy Standards</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Posts and answers carry cryptographically signed tier badges from broker performance statements. Unverified signals and fake track records are prohibited.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
