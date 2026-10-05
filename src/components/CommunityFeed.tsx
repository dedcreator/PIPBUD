'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Radio,
  UserCheck,
  UploadCloud,
  Image as ImageIcon,
  Maximize2,
} from 'lucide-react';
import PipbudLogo from './PipbudLogo';
import { useAuth, getApiBase } from '@/context/AuthContext';
import { PostCardSkeleton } from './SkeletonLoader';
import TraderAvatar from './TraderAvatar';

export type PostCategory = 'question' | 'setup' | 'intel' | 'discussion';

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

export interface PostReply {
  id: string;
  author: {
    name: string;
    username: string;
    level: number;
    badge: string;
    tierColor: string;
    broker?: string;
    avatarUrl?: string;
    avatarType?: string;
  };
  content: string;
  images?: string[];
  timestamp: string;
  upvotes: number;
  hasUpvoted?: boolean;
  isVerifiedAnswer?: boolean;
}

export interface CommunityPost {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  images?: string[];
  author: {
    name: string;
    username: string;
    level: number;
    badge: string;
    tierColor: string;
    broker: string;
    winRate: string | number;
    avatarUrl?: string;
    avatarType?: string;
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

  // Attached Images & Lightbox Modal State
  const [newPostImages, setNewPostImages] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (newPostImages.length >= 3) {
      alert('You can attach a maximum of 3 screenshots or charts per post.');
      return;
    }

    const file = files[0];
    setIsUploadingImage(true);

    try {
      const apiBase = getApiBase();
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${apiBase}/api/community/upload-image/`, {
        method: 'POST',
        headers: {
          ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setNewPostImages((prev) => [...prev, data.url].slice(0, 3));
          setIsUploadingImage(false);
          if (imageInputRef.current) imageInputRef.current.value = '';
          return;
        }
      }
    } catch {
      // Fallback
    }

    // Fallback: Read as base64 Data URL for instant preview
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewPostImages((prev) => [...prev, reader.result as string].slice(0, 3));
      }
      setIsUploadingImage(false);
    };
    reader.readAsDataURL(file);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removePostImage = (idxToRemove: number) => {
    setNewPostImages((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Reply Thread Drawer State
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState('');
  const [replyingToAuthor, setReplyingToAuthor] = useState<{
    postId: string;
    username: string;
    name: string;
  } | null>(null);

  // Floating Toast System State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Saved Bookmarks Set State (persisted to localStorage)
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pipbud_bookmarked_posts');
        if (saved) return new Set(JSON.parse(saved));
      } catch {}
    }
    return new Set<string>();
  });

  const handleToggleBookmark = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedPostIds((prev) => {
      const next = new Set(prev);
      const isBookmarked = next.has(postId);
      if (isBookmarked) {
        next.delete(postId);
        triggerToast('Removed from bookmarks');
      } else {
        next.add(postId);
        triggerToast('Saved to bookmarks 🔖');
      }
      try {
        localStorage.setItem('pipbud_bookmarked_posts', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleSharePost = async (post: CommunityPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const shareUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/community#post-${post.id}`
          : '';
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        triggerToast('Discussion link copied to clipboard 📋');
      } else {
        triggerToast('Link copied 📋');
      }
    } catch {
      triggerToast('Link copied to clipboard 📋');
    }
  };

  // Top Verified Posters State (backed by live Django leaderboard)
  const [topPosters, setTopPosters] = useState<
    Array<{
      name: string;
      badge: string;
      level: number;
      tierColor: string;
      winRate: string;
      broker: string;
    }>
  >([
    {
      name: 'Sarah Sterling',
      badge: 'Elite Alpha',
      level: 5,
      tierColor: '#8B5CF6',
      winRate: '68.4%',
      broker: 'FTMO ($200k)',
    },
    {
      name: 'Elena Rostova',
      badge: 'Master Mentor',
      level: 6,
      tierColor: '#DC2626',
      winRate: '74.8%',
      broker: 'Institutional Desk',
    },
    {
      name: 'Solomon Kane',
      badge: 'Titan Syndicate',
      level: 7,
      tierColor: '#C2410C',
      winRate: '68.4%',
      broker: 'Titan Prime ($1.5M)',
    },
    {
      name: 'Tariq Al-Mansoor',
      badge: 'Funded Pro',
      level: 4,
      tierColor: '#C2410C',
      winRate: '63.0%',
      broker: 'FundedNext ($100k)',
    },
  ]);

  // Fetch posts from Django backend on mount and filter changes
  useEffect(() => {
    let isMounted = true;

    async function loadCommunityPosts() {
      try {
        const apiBase = getApiBase();
        const params = new URLSearchParams();
        if (selectedCategory !== 'all' && selectedCategory !== 'my') {
          params.append('category', selectedCategory);
        } else if (selectedCategory === 'my') {
          params.append('category', 'mine');
        }
        if (searchQuery.trim()) {
          params.append('search', searchQuery.trim());
        }

        const res = await fetch(`${apiBase}/api/community/posts/?${params.toString()}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            setPosts(data.posts);
          }
        }

        // Also fetch top performers from backend
        try {
          const topRes = await fetch(`${apiBase}/api/traders/top-performers/`);
          if (topRes.ok) {
            const topData = await topRes.json();
            if (isMounted && topData.traders && Array.isArray(topData.traders) && topData.traders.length > 0) {
              setTopPosters(
                topData.traders.map((t: any) => ({
                  name: t.name,
                  badge: t.badge,
                  level: t.level,
                  tierColor: t.tierColor,
                  winRate: `${t.winRate}%`,
                  broker: t.broker,
                }))
              );
            }
          }
        } catch {
          // Keep defaults
        }
      } catch (err) {
        console.warn('Community feed backend offline or unreachable, using local store:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadCommunityPosts();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, user?.id, user?.token]);

  // Filtered Posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'my'
        ? user && post.author.username === user.username
        : selectedCategory === 'saved'
        ? bookmarkedPostIds.has(post.id)
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

  // Handle Upvote with optimistic update & backend sync
  const handleToggleUpvote = async (postId: string) => {
    const targetPost = posts.find((p) => p.id === postId);
    const willUpvote = targetPost ? !targetPost.hasUpvoted : true;

    triggerToast(willUpvote ? 'Upvoted setup 🔥' : 'Removed upvote');

    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          hasUpvoted: willUpvote,
          upvotes: willUpvote ? p.upvotes + 1 : Math.max(0, p.upvotes - 1),
        };
      })
    );

    try {
      const apiBase = getApiBase();
      const res = await fetch(`${apiBase}/api/community/posts/${postId}/upvote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, upvotes: data.upvotes, hasUpvoted: data.hasUpvoted }
              : p
          )
        );
      }
    } catch {
      // Keep optimistic state if network fails
    }
  };

  // Handle Reply Upvote with optimistic update & backend sync
  const handleToggleReplyUpvote = async (postId: string, replyId: string) => {
    let willUpvote = true;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          replies: p.replies.map((r) => {
            if (r.id !== replyId) return r;
            willUpvote = !r.hasUpvoted;
            return {
              ...r,
              hasUpvoted: willUpvote,
              upvotes: willUpvote ? r.upvotes + 1 : Math.max(0, r.upvotes - 1),
            };
          }),
        };
      })
    );

    triggerToast(willUpvote ? 'Upvoted response 🔥' : 'Removed upvote');

    try {
      const apiBase = getApiBase();
      const res = await fetch(`${apiBase}/api/community/replies/${replyId}/upvote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts((prev) =>
          prev.map((p) => {
            if (p.id !== postId) return p;
            return {
              ...p,
              replies: p.replies.map((r) =>
                r.id === replyId
                  ? { ...r, upvotes: data.upvotes, hasUpvoted: data.hasUpvoted }
                  : r
              ),
            };
          })
        );
      }
    } catch {
      // Keep optimistic state
    }
  };

  // Handle Publish Post with backend sync
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const parsedTags = newPostTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const setupPayload =
      newPostCategory === 'setup' && newPostEntry
        ? {
            pair: newPostPair,
            direction: newPostDirection,
            entry: newPostEntry,
            sl: newPostSL,
            tp: newPostTP,
            rr:
              newPostEntry && newPostSL && newPostTP
                ? (
                    Math.abs(Number(newPostTP) - Number(newPostEntry)) /
                    Math.abs(Number(newPostEntry) - Number(newPostSL))
                  ).toFixed(1)
                : '2.5',
          }
        : undefined;

    // Attempt backend creation
    try {
      const apiBase = getApiBase();
      const res = await fetch(`${apiBase}/api/community/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify({
          category: newPostCategory,
          title: newPostTitle.trim(),
          content: newPostContent.trim(),
          tags: parsedTags.length > 0 ? parsedTags : [newPostCategory === 'question' ? 'Q&A' : 'General'],
          images: newPostImages,
          setupData: setupPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.post) {
          setPosts((prev) => [data.post, ...prev]);
          setNewPostTitle('');
          setNewPostContent('');
          setNewPostTags('');
          setNewPostEntry('');
          setNewPostSL('');
          setNewPostTP('');
          setNewPostImages([]);
          setIsComposerOpen(false);
          return;
        }
      }
    } catch {
      // Fallback to local creation if backend offline
    }

    // Local fallback
    const createdPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: newPostCategory,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      images: newPostImages,
      author: {
        name: user?.display_name || user?.name || `@${user?.username || 'Trader'}`,
        username: user?.username || 'trader',
        level: user?.skill_level || 1,
        badge: user?.tier_badge || 'Novice',
        tierColor: user?.tier_color || '#78716C',
        broker: user?.broker_name || 'Verified Trader',
        winRate: user?.win_rate || 0,
        avatarUrl: user?.avatar_url,
        avatarType: user?.avatar_type,
      },
      tags: parsedTags.length > 0 ? parsedTags : [newPostCategory === 'question' ? 'Q&A' : 'General'],
      setupData: setupPayload,
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
    setNewPostImages([]);
    setIsComposerOpen(false);
  };

  // Handle Submit Reply with backend sync
  const handleAddReply = async (postId: string) => {
    if (!replyInputText.trim() || !user) return;

    const replyContent = replyInputText.trim();
    setReplyInputText('');
    setReplyingToAuthor(null);
    triggerToast('Reply published ✨');

    // Attempt backend creation
    try {
      const apiBase = getApiBase();
      const res = await fetch(`${apiBase}/api/community/posts/${postId}/replies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        body: JSON.stringify({ content: replyContent }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setPosts((prev) =>
            prev.map((p) => {
              if (p.id !== postId) return p;
              return {
                ...p,
                replies: [...p.replies, data.reply],
              };
            })
          );
          return;
        }
      }
    } catch {
      // Fallback to local reply
    }

    // Local fallback
    const newReply: PostReply = {
      id: `reply-${Date.now()}`,
      author: {
        name: user.display_name || user.name || `@${user.username}`,
        username: user.username,
        level: user.skill_level,
        badge: user.tier_badge,
        tierColor: user.tier_color || '#1C1917',
        broker: user.broker_name || 'Verified Trader',
        avatarUrl: user.avatar_url,
        avatarType: user.avatar_type,
      },
      content: replyContent,
      timestamp: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
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
  };

  // Trader Profile Modal State & Handler
  const [selectedProfileTrader, setSelectedProfileTrader] = useState<TraderProfileModalData | null>(null);

  const openTraderProfile = (nameOrUsername: string) => {
    const clean = (nameOrUsername || '').toLowerCase().trim();

    // Asynchronously fetch freshest audited profile from Django backend to update stats
    (async () => {
      try {
        const apiBase = getApiBase();
        const res = await fetch(`${apiBase}/api/traders/${encodeURIComponent(clean)}/profile/`, {
          headers: {
            'Content-Type': 'application/json',
            ...(user?.id ? { 'X-Trader-Id': user.id } : {}),
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setSelectedProfileTrader((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                name: data.profile.name,
                username: data.profile.username,
                level: data.profile.level,
                badge: data.profile.badge,
                tierColor: data.profile.tierColor,
                broker: data.profile.broker,
                winRate: data.profile.winRate,
                profitFactor: data.profile.profitFactor,
                maxDrawdown: data.profile.maxDrawdown,
                totalTrades: data.profile.totalTrades,
                tierHealth: data.profile.tierHealth,
                tradingStyle: data.profile.tradingStyle,
                bio: data.profile.bio,
                avatarBg: data.profile.tierColor,
                avatarType: data.profile.avatarType,
                avatarUrl: data.profile.avatarUrl,
                isCurrentUser: data.profile.isCurrentUser,
                recentTrades: data.profile.recentTrades || prev.recentTrades,
              };
            });
          }
        }
      } catch {
        // Fallback silently
      }
    })();

    // Check if it's the currently authenticated user
    if (
      user &&
      (clean === user.username.toLowerCase() ||
        clean === (user.display_name || '').toLowerCase() ||
        clean === (user.name || '').toLowerCase())
    ) {
      setSelectedProfileTrader({
        name: user.display_name || user.name || user.username,
        username: user.username,
        level: user.skill_level,
        badge: user.tier_badge,
        tierColor: user.tier_color || '#C2410C',
        broker: user.broker_name || 'Verified Live Trader',
        winRate: user.win_rate,
        profitFactor: user.profit_factor,
        maxDrawdown: user.max_drawdown,
        totalTrades: user.total_verified_trades || 48,
        tierHealth: user.tier_health || 98,
        tradingStyle: user.trading_style || 'Mechanical Risk Execution & Journal Audited',
        bio: user.bio || 'Verified PipBud member. Risk limits and performance track record continuously audited by PipBud anti-shortfall protocol.',
        avatarBg: user.tier_color || '#C2410C',
        avatarType: user.avatar_type,
        avatarUrl: user.avatar_url,
        isCurrentUser: true,
      });
      return;
    }

    if (clean.includes('sarah') || clean.includes('sterling')) {
      setSelectedProfileTrader({
        name: 'Sarah Sterling',
        username: 'sterling_apex',
        level: 5,
        badge: '💎 Level 5: Elite Alpha',
        tierColor: '#8B5CF6',
        broker: 'FTMO ($200k Funded Prop Firm)',
        winRate: 68.4,
        profitFactor: 2.65,
        maxDrawdown: 2.4,
        totalTrades: 489,
        tierHealth: 98,
        tradingStyle: 'ICT Silver Bullet & 15m FVG Displacement',
        bio: 'Full-time funded prop trader with FTMO. Specializing in liquidity sweeps, fair value gaps, and London/NY overlap execution.',
        avatarBg: '#8B5CF6',
        recentTrades: [
          { pair: 'EUR/USD', direction: 'LONG', outcome: 'WIN', profit: '+3.50R', rr: '1:3.50', date: 'Today, 08:30 UTC' },
          { pair: 'GBP/USD', direction: 'LONG', outcome: 'WIN', profit: '+2.80R', rr: '1:2.80', date: 'Yesterday, 14:15 UTC' },
        ],
      });
      return;
    }

    if (clean.includes('elena') || clean.includes('rostova')) {
      setSelectedProfileTrader({
        name: 'Elena Rostova',
        username: 'elena_macro',
        level: 6,
        badge: '👑 Level 6: Master Mentor',
        tierColor: '#DC2626',
        broker: 'Verified Institutional Desk ($500k)',
        winRate: 74.8,
        profitFactor: 3.12,
        maxDrawdown: 1.8,
        totalTrades: 890,
        tierHealth: 99,
        tradingStyle: 'Central Bank Macro Bias & Treasury Yield Correlation',
        bio: 'Institutional macro strategist analyzing central bank policy, DXY supply zones, and Gold liquidity dynamics. 8+ years audited track record.',
        avatarBg: '#DC2626',
        recentTrades: [
          { pair: 'XAU/USD', direction: 'LONG', outcome: 'WIN', profit: '+4.20R', rr: '1:4.20', date: 'Today, 12:45 UTC' },
          { pair: 'USD/JPY', direction: 'SHORT', outcome: 'WIN', profit: '+3.10R', rr: '1:3.10', date: '2 days ago' },
        ],
      });
      return;
    }

    if (clean.includes('marcus') || clean.includes('vance')) {
      setSelectedProfileTrader({
        name: 'Marcus Vance',
        username: 'marcus_fx',
        level: 2,
        badge: '🌱 Level 2: Apprentice',
        tierColor: '#2563EB',
        broker: 'FundingPips ($50,000)',
        winRate: 54.2,
        profitFactor: 1.82,
        maxDrawdown: 3.1,
        totalTrades: 142,
        tierHealth: 94,
        tradingStyle: 'London Open Order Block Sweeps',
        bio: 'Forex intraday trader executing EUR/USD and GBP/JPY during London Open. Focusing on discipline and avoiding premature breakeven exits.',
        avatarBg: '#2563EB',
        recentTrades: [
          { pair: 'EUR/USD', direction: 'LONG', outcome: 'WIN', profit: '+2.40R', rr: '1:2.40', date: 'Today, 07:15 UTC' },
          { pair: 'GBP/JPY', direction: 'SHORT', outcome: 'LOSS', profit: '-1.00R', rr: '1:2.00', date: 'Yesterday' },
        ],
      });
      return;
    }

    if (clean.includes('david') || clean.includes('david_k')) {
      setSelectedProfileTrader({
        name: 'David K.',
        username: 'david_k',
        level: 4,
        badge: '🔥 Level 4: Funded Pro',
        tierColor: '#C2410C',
        broker: 'Alpha Capital ($100k)',
        winRate: 61.5,
        profitFactor: 2.15,
        maxDrawdown: 2.9,
        totalTrades: 312,
        tierHealth: 96,
        tradingStyle: 'London Killzone Breakouts & News Straddles',
        bio: 'Alpha Capital funded trader. Combining PipBud economic calendar alerts with strict execution rules.',
        avatarBg: '#C2410C',
        recentTrades: [
          { pair: 'GBP/USD', direction: 'SHORT', outcome: 'WIN', profit: '+2.60R', rr: '1:2.60', date: 'Today, 09:10 UTC' },
        ],
      });
      return;
    }

    if (clean.includes('chen') || clean.includes('liam')) {
      setSelectedProfileTrader({
        name: 'Liam Chen',
        username: 'chen_quant',
        level: 3,
        badge: '⚡ Level 3: Consistent',
        tierColor: '#059669',
        broker: 'IC Markets Live Raw Spread',
        winRate: 57.8,
        profitFactor: 1.95,
        maxDrawdown: 3.5,
        totalTrades: 220,
        tierHealth: 95,
        tradingStyle: 'Mean Reversion & Asian Range Sweeps',
        bio: 'Managing personal live capital on IC Markets with 0.75% fixed risk per setup. Automated journaling via PipBud bot.',
        avatarBg: '#059669',
        recentTrades: [
          { pair: 'AUD/USD', direction: 'LONG', outcome: 'WIN', profit: '+1.90R', rr: '1:1.90', date: 'Yesterday' },
        ],
      });
      return;
    }

    if (clean.includes('tariq') || clean.includes('mansoor')) {
      setSelectedProfileTrader({
        name: 'Tariq Al-Mansoor',
        username: 'tariq_fx',
        level: 4,
        badge: '🔥 Level 4: Funded Pro',
        tierColor: '#C2410C',
        broker: 'FundedNext ($100,000)',
        winRate: 63.0,
        profitFactor: 2.28,
        maxDrawdown: 2.6,
        totalTrades: 375,
        tierHealth: 97,
        tradingStyle: 'Gold (XAU/USD) Intraday Momentum',
        bio: 'Specialized Gold and Crude Oil trader. Focusing on high-impact London/NY overlap liquidity sweeps.',
        avatarBg: '#C2410C',
        recentTrades: [
          { pair: 'XAU/USD', direction: 'LONG', outcome: 'WIN', profit: '+3.80R', rr: '1:3.80', date: 'Today, 13:10 UTC' },
        ],
      });
      return;
    }

    if (clean.includes('solomon') || clean.includes('kane')) {
      setSelectedProfileTrader({
        name: 'Solomon Kane',
        username: 'solomon_kane',
        level: 7,
        badge: '🏛️ Level 7: Titan Syndicate',
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
          { pair: 'EUR/USD', direction: 'LONG', outcome: 'WIN', profit: '+4.10R', rr: '1:4.10', date: 'Today, 08:05 UTC' },
        ],
      });
      return;
    }

    if (clean.includes('oliver') || clean.includes('thorne')) {
      setSelectedProfileTrader({
        name: 'Oliver Thorne',
        username: 'oliver_t',
        level: 1,
        badge: '🌱 Level 1: Novice',
        tierColor: '#78716C',
        broker: 'Personal Live Account',
        winRate: 46.0,
        profitFactor: 1.25,
        maxDrawdown: 4.8,
        totalTrades: 68,
        tierHealth: 91,
        tradingStyle: 'Support & Resistance Price Action',
        bio: 'Developing consistency through mechanical risk limits and the PipBud anti-shortfall protocol.',
        avatarBg: '#78716C',
        recentTrades: [
          { pair: 'EUR/USD', direction: 'SHORT', outcome: 'WIN', profit: '+1.20R', rr: '1:1.20', date: '3 days ago' },
        ],
      });
      return;
    }

    // Dynamic Fallback
    setSelectedProfileTrader({
      name: nameOrUsername,
      username: clean.replace(/\s+/g, '_'),
      level: 3,
      badge: '⚡ Level 3: Consistent',
      tierColor: '#059669',
      broker: 'Live Verified Broker',
      winRate: 56.4,
      profitFactor: 1.88,
      maxDrawdown: 3.2,
      totalTrades: 184,
      tierHealth: 95,
      tradingStyle: 'Technical Confluence & Risk Guardrails',
      bio: 'Audited PipBud trader executing verified setups with investor read-only credential verification.',
      avatarBg: '#059669',
    });
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

          {/* User Badge Profile Link -> Opens Verified Trader Profile */}
          {user && (
            <button
              type="button"
              onClick={() => openTraderProfile(user.username)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] shadow-xs text-xs font-semibold text-[#1C1917] transition-all active:scale-95 cursor-pointer"
              title="View your verified trader profile"
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
            </button>
          )}

          {/* Public Marketing Landing Switcher */}
          {onSwitchToPublic && (
            <button
              onClick={onSwitchToPublic}
              className="h-9 px-3 rounded-xl bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] text-xs font-semibold text-[#78716C] hover:text-[#C2410C] transition-all inline-flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
              title="View Public Marketing Landing Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Site</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feed Column */}
          <main className="lg:col-span-8 space-y-4">
            {/* Community Feed Overview & Quick Composer Bar */}
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-4 sm:p-5 shadow-xs space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[#F5F5F4]">
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-[#1C1917] tracking-tight flex items-center gap-2">
                    <span>Trader Community Feed</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse" />
                      <span>Live Audited Alpha</span>
                    </span>
                  </h1>
                  <p className="text-xs text-[#78716C] mt-0.5 flex flex-wrap items-center gap-2">
                    <span>Ask questions, share setups, and analyze liquidity with verified prop &amp; live traders.</span>
                    <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#0F766E] font-medium bg-[#F0FDFA] px-2 py-0.5 rounded-full border border-[#CCFBF1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-live" />
                      34 traders active • 6 funded setups audited today
                    </span>
                  </p>
                </div>
                {user && (
                  <button
                    type="button"
                    onClick={() => openTraderProfile(user.username)}
                    className="text-xs font-bold text-[#C2410C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>My Verified Profile</span>
                    <span>&rarr;</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <TraderAvatar
                  name={user ? user.display_name || user.username : 'Trader'}
                  username={user ? user.username : 'trader'}
                  avatarUrl={user?.avatar_url}
                  avatarType={user?.avatar_type}
                  tierColor={user?.tier_color}
                  level={user?.skill_level}
                  size="md"
                  onClick={() => openTraderProfile(user ? user.username : 'Trader')}
                />
                <button
                  type="button"
                  onClick={() => {
                    setNewPostCategory('question');
                    setIsComposerOpen(true);
                  }}
                  className="flex-1 text-left px-4 py-2.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED]/30 text-xs text-[#78716C] transition-all cursor-pointer truncate shadow-2xs hover:shadow-xs active:scale-99 flex items-center justify-between group"
                >
                  <span className="group-hover:text-[#1C1917] transition-colors truncate">
                    What&apos;s on your charts? Ask a question or drop market alpha...
                  </span>
                  <Plus className="w-4 h-4 text-[#A8A29E] group-hover:text-[#C2410C] group-hover:rotate-90 transition-all shrink-0 ml-2" />
                </button>
              </div>

              {/* Action Category Shortcuts with Interactive Spring */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#F5F5F4] overflow-x-auto text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setNewPostCategory('question');
                    setIsComposerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF9] hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] font-semibold text-[#1C1917] flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF9] hover:bg-[#F0FDFA] border border-[#E7E5E4] hover:border-[#CCFBF1] font-semibold text-[#1C1917] flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
                  className="px-3 py-1.5 rounded-xl bg-[#FAFAF9] hover:bg-[#EFF6FF] border border-[#E7E5E4] hover:border-[#BFDBFE] font-semibold text-[#1C1917] flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
                  <div className="flex items-center gap-2.5">
                    {user && (
                      <TraderAvatar
                        name={user.display_name || user.username}
                        username={user.username}
                        avatarUrl={user.avatar_url}
                        avatarType={user.avatar_type}
                        tierColor={user.tier_color}
                        size="sm"
                      />
                    )}
                    <div>
                      <span className="font-bold text-sm text-[#1C1917] block">Create Community Discussion</span>
                      <span className="text-[10px] text-[#78716C]">
                        Posting as @{user?.username || 'trader'} • Level {user?.skill_level || 1}
                      </span>
                    </div>
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

                  {/* Image Attachments */}
                  <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1C1917] flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>Chart Screenshots ({newPostImages.length}/3)</span>
                      </span>
                      <input
                        type="file"
                        ref={imageInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={newPostImages.length >= 3 || isUploadingImage}
                        className="h-7 px-2.5 rounded-lg border border-[#E7E5E4] hover:border-[#FED7AA] bg-white hover:bg-[#FFF7ED] text-[11px] font-semibold text-[#44403C] hover:text-[#C2410C] flex items-center gap-1 transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
                      >
                        <UploadCloud className="w-3 h-3" />
                        <span>{isUploadingImage ? 'Uploading...' : 'Attach Chart'}</span>
                      </button>
                    </div>

                    {newPostImages.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {newPostImages.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="relative w-20 h-20 rounded-xl border border-[#E7E5E4] overflow-hidden group shadow-2xs bg-white"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imgUrl}
                              alt={`Attachment ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePostImage(idx)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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

            {/* Filter Navigation Tabs with Counts */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-[#E7E5E4] shadow-xs">
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'all', label: 'All Discussions', count: posts.length },
                  { id: 'question', label: 'Questions (Q&A)', count: posts.filter((p) => p.category === 'question').length },
                  { id: 'setup', label: 'Trade Setups', count: posts.filter((p) => p.category === 'setup').length },
                  { id: 'intel', label: 'Market Intel', count: posts.filter((p) => p.category === 'intel').length },
                  { id: 'my', label: 'My Posts', count: user ? posts.filter((p) => p.author.username === user.username).length : 0 },
                  { id: 'saved', label: 'Bookmarks', count: posts.filter((p) => bookmarkedPostIds.has(p.id)).length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        selectedCategory === tab.id ? 'bg-[#44403C] text-white' : 'bg-[#F5F5F4] text-[#78716C]'
                      }`}
                    >
                      {tab.count}
                    </span>
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
                  className="w-full h-8 pl-8 pr-7 rounded-lg border border-[#E7E5E4] text-xs text-[#1C1917] bg-[#FAFAF9] outline-hidden focus:border-[#C2410C]"
                />
                <Search className="w-3.5 h-3.5 text-[#A8A29E] absolute left-2.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2 text-[#A8A29E] hover:text-[#1C1917]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
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
                    className="mt-2 h-9 px-4 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-all cursor-pointer"
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
                        {/* Clickable Author Avatar */}
                        <TraderAvatar
                          name={post.author.name}
                          username={post.author.username}
                          avatarUrl={post.author.avatarUrl}
                          avatarType={post.author.avatarType}
                          tierColor={post.author.tierColor}
                          level={post.author.level}
                          size="md"
                          onClick={() => openTraderProfile(post.author.name)}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {/* Clickable Author Name */}
                            <button
                              type="button"
                              onClick={() => openTraderProfile(post.author.name)}
                              className="font-bold text-xs sm:text-sm text-[#1C1917] truncate hover:text-[#C2410C] hover:underline transition-colors text-left cursor-pointer"
                              title={`Inspect ${post.author.name}'s Verified Profile`}
                            >
                              {post.author.name}
                            </button>
                            {/* Clickable Tier Badge */}
                            <button
                              type="button"
                              onClick={() => openTraderProfile(post.author.name)}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
                              style={{ backgroundColor: post.author.tierColor }}
                              title={`Verified Level ${post.author.level} (${post.author.badge})`}
                            >
                              L{post.author.level}
                            </button>
                            <span className="text-[10px] font-medium text-[#78716C] hidden sm:inline">
                              {post.author.broker}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-[#A8A29E]">
                            <span>{post.timestamp}</span>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={() => openTraderProfile(post.author.name)}
                              className="text-[#C2410C] hover:underline font-semibold cursor-pointer"
                            >
                              View Trader Profile &rarr;
                            </button>
                          </div>
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

                    {/* Attached Chart Screenshots (Responsive Grid) */}
                    {post.images && post.images.length > 0 && (
                      <div
                        className={`grid gap-2 rounded-xl overflow-hidden pt-1 ${
                          post.images.length === 1
                            ? 'grid-cols-1'
                            : post.images.length === 2
                            ? 'grid-cols-2'
                            : 'grid-cols-3'
                        }`}
                      >
                        {post.images.slice(0, 3).map((imgUrl, i) => (
                          <div
                            key={i}
                            onClick={() => setActiveLightboxImage(imgUrl)}
                            className="relative group cursor-pointer overflow-hidden rounded-xl border border-[#E7E5E4] bg-[#1C1917]/5 max-h-72"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imgUrl}
                              alt={`Chart analysis screenshot ${i + 1}`}
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Maximize2 className="w-5 h-5 drop-shadow-md" />
                            </div>
                          </div>
                        ))}
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

                    {/* Action Bar (Upvotes, Answers/Comments, Share, Bookmark) */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F4] text-xs">
                      <div className="flex items-center gap-2">
                        {/* Upvote Button with Tactile Spring */}
                        <button
                          type="button"
                          onClick={() => handleToggleUpvote(post.id)}
                          className={`h-8 px-3 rounded-xl flex items-center gap-1.5 font-bold transition-all duration-150 active:scale-125 cursor-pointer shadow-2xs ${
                            post.hasUpvoted
                              ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] shadow-orange-100 ring-1 ring-[#FED7AA]'
                              : 'bg-[#FAFAF9] hover:bg-[#FFF7ED] text-[#57534E] hover:text-[#C2410C] border border-[#E7E5E4] hover:border-[#FED7AA]'
                          }`}
                          title={post.hasUpvoted ? 'Remove upvote' : 'Upvote this setup/alpha'}
                        >
                          <Flame
                            className={`w-3.5 h-3.5 transition-transform ${
                              post.hasUpvoted ? 'text-[#C2410C] fill-[#C2410C] scale-110' : 'text-[#78716C]'
                            }`}
                          />
                          <span className="tabular-nums">{post.upvotes}</span>
                        </button>

                        {/* Toggle Answers Thread Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id);
                            setReplyingToAuthor(null);
                          }}
                          className={`h-8 px-3 rounded-xl border font-semibold flex items-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer ${
                            activeReplyPostId === post.id
                              ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                              : 'bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#57534E] hover:text-[#1C1917] border-[#E7E5E4]'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>
                            {post.replies.length}{' '}
                            {post.category === 'question' ? 'Answers' : 'Replies'}
                          </span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleBookmark(post.id, e)}
                          className={`h-8 w-8 rounded-xl border flex items-center justify-center transition-all duration-150 active:scale-125 cursor-pointer ${
                            bookmarkedPostIds.has(post.id)
                              ? 'bg-[#FFF7ED] border-[#FED7AA] text-[#C2410C]'
                              : 'bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#78716C] hover:text-[#1C1917] border-[#E7E5E4]'
                          }`}
                          title={bookmarkedPostIds.has(post.id) ? 'Remove bookmark' : 'Bookmark setup'}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              bookmarkedPostIds.has(post.id) ? 'fill-[#C2410C] text-[#C2410C]' : ''
                            }`}
                          />
                        </button>

                        {/* Share Button */}
                        <button
                          type="button"
                          onClick={(e) => handleSharePost(post, e)}
                          className="h-8 w-8 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] hover:bg-[#FFF7ED] hover:border-[#FED7AA] text-[#78716C] hover:text-[#C2410C] flex items-center justify-center transition-all duration-150 active:scale-125 cursor-pointer"
                          title="Copy link to post"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Answers & Replies Thread with Vertical Connector Line */}
                    {activeReplyPostId === post.id && (
                      <div className="pt-4 border-t border-[#E7E5E4] space-y-3 bg-[#FAFAF9]/60 -mx-5 -mb-5 p-5 rounded-b-2xl animate-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between pb-1">
                          <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#C2410C]" />
                            <span>
                              {post.category === 'question' ? 'Verified Answers' : 'Discussion Thread'} ({post.replies.length})
                            </span>
                          </h3>
                          <span className="text-[10px] text-[#78716C] hidden sm:inline">
                            Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E7E5E4] font-mono text-[9px]">Cmd+Enter</kbd> to reply
                          </span>
                        </div>

                        {post.replies.length === 0 ? (
                          <div className="text-center py-5 bg-white rounded-xl border border-dashed border-[#E7E5E4] space-y-1">
                            <p className="text-xs font-semibold text-[#1C1917]">No responses yet</p>
                            <p className="text-[11px] text-[#78716C]">
                              Be the first trader to provide analysis or answer this inquiry.
                            </p>
                          </div>
                        ) : (
                          /* Visual Thread Line Container */
                          <div className="relative pl-4 sm:pl-5 space-y-2.5 before:absolute before:left-2 sm:before:left-2.5 before:top-2 before:bottom-3 before:w-0.5 before:bg-[#E7E5E4] before:rounded-full">
                            {post.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className={`relative p-3.5 rounded-2xl border text-xs space-y-2 transition-all duration-150 group ${
                                  reply.isVerifiedAnswer
                                    ? 'bg-white border-[#CCFBF1] shadow-2xs'
                                    : 'bg-white border-[#E7E5E4] hover:border-[#D6D3D1]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <TraderAvatar
                                      name={reply.author.name}
                                      username={reply.author.username}
                                      avatarUrl={reply.author.avatarUrl}
                                      avatarType={reply.author.avatarType}
                                      tierColor={reply.author.tierColor}
                                      size="xs"
                                      onClick={() => openTraderProfile(reply.author.name)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => openTraderProfile(reply.author.name)}
                                      className="font-bold text-xs text-[#1C1917] hover:text-[#C2410C] hover:underline cursor-pointer"
                                      title={`Inspect ${reply.author.name}'s Verified Profile`}
                                    >
                                      {reply.author.name}
                                    </button>
                                    <span
                                      className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white shrink-0"
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

                                <p className="text-[#44403C] leading-relaxed whitespace-pre-line pl-0.5">
                                  {reply.content}
                                </p>

                                {/* Micro Action Bar for Comments (Upvote + Reply Chip + Copy) */}
                                <div className="flex items-center justify-between pt-1.5 border-t border-[#F5F5F4] text-[11px]">
                                  <div className="flex items-center gap-2">
                                    {/* Tactile Reply Upvote */}
                                    <button
                                      type="button"
                                      onClick={() => handleToggleReplyUpvote(post.id, reply.id)}
                                      className={`h-6 px-2 rounded-lg flex items-center gap-1 font-semibold text-[10px] transition-all duration-150 active:scale-125 cursor-pointer ${
                                        reply.hasUpvoted
                                          ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                                          : 'bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#78716C] border border-[#E7E5E4]'
                                      }`}
                                      title={reply.hasUpvoted ? 'Remove upvote' : 'Upvote this reply'}
                                    >
                                      <ArrowUp className="w-2.5 h-2.5" />
                                      <span>{reply.upvotes}</span>
                                    </button>

                                    {/* Direct Reply Target Trigger */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReplyingToAuthor({
                                          postId: post.id,
                                          username: reply.author.username,
                                          name: reply.author.name,
                                        });
                                        setReplyInputText((prev) =>
                                          prev.includes(`@${reply.author.username}`)
                                            ? prev
                                            : `@${reply.author.username} ${prev}`
                                        );
                                      }}
                                      className="h-6 px-2 rounded-lg bg-transparent hover:bg-[#FFF7ED] text-[#78716C] hover:text-[#C2410C] font-semibold text-[10px] flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                                    >
                                      <MessageSquare className="w-2.5 h-2.5" />
                                      <span>Reply</span>
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (navigator.clipboard) {
                                        await navigator.clipboard.writeText(reply.content);
                                        triggerToast('Reply text copied 📋');
                                      }
                                    }}
                                    className="text-[10px] text-[#A8A29E] hover:text-[#1C1917] transition-colors cursor-pointer"
                                    title="Copy text"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Form Container */}
                        <div className="space-y-2 pt-2">
                          {/* Active Replying To Chip */}
                          {replyingToAuthor && replyingToAuthor.postId === post.id && (
                            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] text-xs text-[#C2410C] animate-in fade-in duration-100">
                              <div className="flex items-center gap-1.5 truncate">
                                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                  Replying to <strong className="font-bold">@{replyingToAuthor.username}</strong> ({replyingToAuthor.name})
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setReplyingToAuthor(null)}
                                className="p-0.5 hover:bg-[#FED7AA]/50 rounded text-[#9A3412] transition-colors cursor-pointer"
                                title="Cancel replying to user"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* Quick Emoji Reaction Pill Tray */}
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                            <span className="text-[10px] font-semibold text-[#78716C] uppercase mr-0.5">Quick:</span>
                            {['🔥', '🎯', '🚀', '💡', '👏', '❤️'].map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => setReplyInputText((prev) => (prev ? `${prev} ${emoji}` : emoji))}
                                className="w-6 h-6 rounded-lg bg-white hover:bg-[#FFF7ED] border border-[#E7E5E4] hover:border-[#FED7AA] flex items-center justify-center text-xs transition-transform active:scale-125 cursor-pointer shadow-2xs"
                                title={`Insert ${emoji}`}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>

                          {/* Input Bar */}
                          <div className="flex items-center gap-2">
                            {user && (
                              <TraderAvatar
                                name={user.display_name || user.username}
                                username={user.username}
                                avatarUrl={user.avatar_url}
                                avatarType={user.avatar_type}
                                tierColor={user.tier_color}
                                size="xs"
                              />
                            )}
                            <input
                              type="text"
                              value={replyInputText}
                              onChange={(e) => setReplyInputText(e.target.value)}
                              placeholder={
                                post.category === 'question'
                                  ? 'Write a verified answer...'
                                  : 'Contribute to this discussion...'
                              }
                              className="flex-1 h-10 px-3.5 rounded-xl border border-[#E7E5E4] text-xs text-[#1C1917] bg-white outline-hidden focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/20 shadow-2xs transition-all"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey || !e.shiftKey)) {
                                  e.preventDefault();
                                  handleAddReply(post.id);
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleAddReply(post.id)}
                              disabled={!replyInputText.trim()}
                              className="px-4 h-10 bg-[#1C1917] hover:bg-[#292524] disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-all shrink-0 active:scale-95 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{post.category === 'question' ? 'Answer' : 'Reply'}</span>
                            </button>
                          </div>
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
                <div
                  onClick={() => openTraderProfile(user.username)}
                  className="flex items-center gap-3 cursor-pointer group"
                  title="Click to view your verified public profile"
                >
                  <TraderAvatar
                    name={user.display_name || user.username}
                    username={user.username}
                    avatarUrl={user.avatar_url}
                    avatarType={user.avatar_type}
                    tierColor={user.tier_color}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-sm text-[#1C1917] block truncate group-hover:text-[#C2410C] transition-colors">
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
                  <button
                    type="button"
                    onClick={() => openTraderProfile(user.username)}
                    className="w-full h-9 rounded-xl bg-[#FFF7ED] hover:bg-[#FFEDD5] border border-[#FED7AA] text-[#C2410C] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>View My Verified Profile</span>
                  </button>

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

            {/* Top Verified Posters Widget */}
            <div className="bg-white rounded-2xl border border-[#E7E5E4] p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F5F5F4]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C2410C]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#1C1917]">
                    Top Verified Posters
                  </h3>
                </div>
                <span className="text-[10px] text-[#0F766E] font-semibold bg-[#F0FDFA] px-2 py-0.5 rounded-full border border-[#CCFBF1]">
                  Audited
                </span>
              </div>

              <div className="space-y-2">
                {topPosters.map((trader) => (
                  <button
                    key={trader.name}
                    type="button"
                    onClick={() => openTraderProfile(trader.name)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FAFAF9] border border-transparent hover:border-[#E7E5E4] transition-all flex items-center justify-between group cursor-pointer"
                    title={`Inspect ${trader.name}'s Verified Profile`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <TraderAvatar
                        name={trader.name}
                        username={trader.name}
                        tierColor={trader.tierColor}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-xs text-[#1C1917] block truncate group-hover:text-[#C2410C] transition-colors">
                          {trader.name}
                        </span>
                        <span className="text-[10px] text-[#78716C] block truncate">
                          {trader.broker}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white block"
                        style={{ backgroundColor: trader.tierColor }}
                      >
                        L{trader.level}
                      </span>
                      <span className="text-[10px] font-semibold text-[#15803D]">{trader.winRate}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

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
                  className="w-full text-left p-2 rounded-xl hover:bg-[#FAFAF9] transition-colors block group cursor-pointer"
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
                  className="w-full text-left p-2 rounded-xl hover:bg-[#FAFAF9] transition-colors block group cursor-pointer"
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

      {/* ============================================================ */}
      {/* TRADER PROFILE MODAL: AUDITED TRACK RECORD & MERITOCRACY      */}
      {/* ============================================================ */}
      {selectedProfileTrader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1C1917]">
                    Verified Trader Profile
                  </h3>
                  <span className="text-[10px] text-[#78716C] font-mono">
                    Audited Track Record • Investor Read-Only API
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedProfileTrader(null)}
                className="p-1 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4] transition-colors cursor-pointer"
                title="Close profile modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Hero Card */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <TraderAvatar
                name={selectedProfileTrader.name}
                username={selectedProfileTrader.username}
                avatarUrl={selectedProfileTrader.avatarUrl}
                avatarType={selectedProfileTrader.avatarType}
                tierColor={selectedProfileTrader.tierColor || selectedProfileTrader.avatarBg}
                size="xl"
              />

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

            {/* PipBud Identity Shield Notice */}
            <div className="p-3 bg-[#F0FDFA] rounded-2xl border border-[#CCFBF1] flex items-start gap-2.5 text-xs text-[#0F766E]">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#0F766E]" />
              <div className="space-y-0.5">
                <div className="font-bold">PipBud Cryptographic Track Record Verified</div>
                <p className="text-[11px] text-[#115E59] leading-relaxed">
                  Metrics are stamped directly from broker trade tickets. Traders cannot falsify win rates or drawdown limits; automated demotion triggers if maximum drawdown thresholds are breached.
                </p>
              </div>
            </div>

            {/* Meritocracy Statistics Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center justify-between">
                <span>Audited Performance Snapshot</span>
                <span className="text-[10px] text-[#15803D] font-mono bg-[#DCFCE7] px-2 py-0.5 rounded-full font-semibold">
                  Live Synced
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
                <div className="text-[10px] font-bold text-[#78716C] uppercase">Strategy &amp; Methodology</div>
                <div className="font-semibold text-[#1C1917]">{selectedProfileTrader.tradingStyle}</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E7E5E4] space-y-1">
                <div className="text-[10px] font-bold text-[#78716C] uppercase">Trader Bio &amp; Discipline Protocol</div>
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
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#E7E5E4]">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery(selectedProfileTrader.name);
                  setSelectedCategory('all');
                  setSelectedProfileTrader(null);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] hover:bg-[#FFEDD5] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Filter Feed by {selectedProfileTrader.name.split(' ')[0]}</span>
              </button>

              <button
                onClick={() => setSelectedProfileTrader(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-[#1C1917] hover:bg-[#292524] text-white shadow-xs transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LIGHTBOX MODAL: FULL RESOLUTION CHART / SCREENSHOT ZOOM      */}
      {/* ============================================================ */}
      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1C1917] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
          >
            <div className="p-3 bg-black/40 flex items-center justify-between text-white border-b border-white/10">
              <span className="text-xs font-semibold text-[#A8A29E] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Audited Chart Analysis</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxImage(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 sm:p-4 max-h-[80vh] overflow-auto flex items-center justify-center bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeLightboxImage}
                alt="Full resolution chart preview"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Modern Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up-in pointer-events-none">
          <div className="bg-[#1C1917]/95 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
