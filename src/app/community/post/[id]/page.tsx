'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import MobileNavDock from '@/components/MobileNavDock';
import TraderAvatar from '@/components/TraderAvatar';
import { useAuth, getApiBase } from '@/context/AuthContext';
import {
  ArrowLeft,
  ArrowUp,
  MessageSquare,
  Share2,
  Bookmark,
  CheckCircle2,
  Clock,
  Send,
  Image as ImageIcon,
  ShieldCheck,
  Award,
  Sparkles,
  Maximize2,
  X,
  Layers,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface PostReply {
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

interface PostDetail {
  id: string;
  category: 'question' | 'setup' | 'intel' | 'discussion';
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
    winRate: number;
    profitFactor: number;
    avatarUrl?: string;
    avatarType?: string;
  };
  tags: string[];
  setupData?: {
    pair: string;
    direction: 'LONG' | 'SHORT';
    entry?: string;
    sl?: string;
    tp?: string;
    rr?: string;
  } | null;
  upvotes: number;
  hasUpvoted: boolean;
  replies: PostReply[];
  timestamp: string;
  created_at_iso?: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const postId = params?.id as string;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New reply state
  const [replyContent, setReplyContent] = useState('');
  const [replyImageInput, setReplyImageInput] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [showImageModal, setShowImageModal] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch post details
  useEffect(() => {
    if (!postId) return;

    async function loadPost() {
      setIsLoading(true);
      setError(null);
      try {
        const apiBase = getApiBase();
        const token = typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '';
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        if (user?.id) headers['X-Trader-Id'] = user.id;

        const res = await fetch(`${apiBase}/api/community/posts/${postId}/`, { headers });
        if (!res.ok) {
          throw new Error('Post not found.');
        }
        const data = await res.json();
        setPost(data.post);
      } catch (err: any) {
        setError(err.message || 'Unable to load post.');
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [postId, user]);

  // Handle post upvote
  const handleToggleUpvote = async () => {
    if (!post) return;
    const prevHasUpvoted = post.hasUpvoted;
    const prevUpvotes = post.upvotes;

    // Optimistic update
    setPost({
      ...post,
      hasUpvoted: !prevHasUpvoted,
      upvotes: prevHasUpvoted ? prevUpvotes - 1 : prevUpvotes + 1,
    });

    try {
      const apiBase = getApiBase();
      const token = typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user?.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/community/posts/${post.id}/upvote/`, {
        method: 'POST',
        headers,
      });
    } catch {
      // Revert on failure
      setPost({
        ...post,
        hasUpvoted: prevHasUpvoted,
        upvotes: prevUpvotes,
      });
    }
  };

  // Handle reply submit
  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !replyContent.trim() || isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      const apiBase = getApiBase();
      const token = typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user?.id) headers['X-Trader-Id'] = user.id;

      const images = replyImageInput.trim() ? [replyImageInput.trim()] : [];

      const res = await fetch(`${apiBase}/api/community/posts/${post.id}/replies/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: replyContent.trim(),
          images,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const createdReply: PostReply = data.reply;
        setPost({
          ...post,
          replies: [...post.replies, createdReply],
        });
        setReplyContent('');
        setReplyImageInput('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Handle reply upvote
  const handleToggleReplyUpvote = async (replyId: string) => {
    if (!post) return;
    const target = post.replies.find((r) => r.id === replyId);
    if (!target) return;

    const prevHasUpvoted = target.hasUpvoted;
    const prevCount = target.upvotes;

    setPost({
      ...post,
      replies: post.replies.map((r) =>
        r.id === replyId
          ? {
              ...r,
              hasUpvoted: !prevHasUpvoted,
              upvotes: prevHasUpvoted ? prevCount - 1 : prevCount + 1,
            }
          : r
      ),
    });

    try {
      const apiBase = getApiBase();
      const token = typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user?.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/community/replies/${replyId}/upvote/`, {
        method: 'POST',
        headers,
      });
    } catch {
      // Revert
      setPost({
        ...post,
        replies: post.replies.map((r) =>
          r.id === replyId
            ? {
                ...r,
                hasUpvoted: prevHasUpvoted,
                upvotes: prevCount,
              }
            : r
        ),
      });
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] pb-24 md:pb-12">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Community Feed</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#E7E5E4] rounded-xl text-xs font-medium text-[#44403C] hover:border-[#D6D3D1] transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Post'}</span>
          </button>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 space-y-4 animate-pulse">
            <div className="h-6 w-32 bg-[#E7E5E4] rounded" />
            <div className="h-8 w-3/4 bg-[#E7E5E4] rounded" />
            <div className="h-24 w-full bg-[#E7E5E4] rounded" />
          </div>
        ) : error || !post ? (
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8 text-center space-y-3">
            <p className="text-sm text-[#DC2626] font-semibold">{error || 'Post not found.'}</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524]"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <>
            {/* Primary Post Card */}
            <article className="bg-white rounded-2xl border border-[#E7E5E4] p-5 sm:p-7 shadow-xs space-y-5">
              {/* Header: Author & Category */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <TraderAvatar
                    name={post.author.name}
                    username={post.author.username}
                    avatarUrl={post.author.avatarUrl}
                    avatarType={post.author.avatarType}
                    tierColor={post.author.tierColor}
                    level={post.author.level}
                    size="lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="font-bold text-sm sm:text-base text-[#1C1917] hover:text-[#C2410C] hover:underline transition-colors"
                      >
                        {post.author.name}
                      </Link>
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white hover:opacity-90"
                        style={{ backgroundColor: post.author.tierColor }}
                      >
                        Level {post.author.level} • {post.author.badge}
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#78716C] mt-0.5">
                      <span>@{post.author.username}</span>
                      <span>•</span>
                      <span>{post.author.broker}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#A8A29E]">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    post.category === 'question'
                      ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                      : post.category === 'setup'
                      ? 'bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]'
                      : post.category === 'intel'
                      ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
                      : 'bg-[#F5F5F4] text-[#57534E] border border-[#E7E5E4]'
                  }`}
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] tracking-tight leading-snug">
                {post.title}
              </h1>

              {/* Content */}
              <div className="text-sm sm:text-base text-[#292524] leading-relaxed whitespace-pre-line">
                {post.content}
              </div>

              {/* Setup Snapshot if available */}
              {post.setupData && (
                <div className="p-4 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4] font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
                    <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#C2410C]" />
                      Trade Execution Parameters
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        post.setupData.direction === 'LONG'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : 'bg-[#FEE2E2] text-[#B91C1C]'
                      }`}
                    >
                      {post.setupData.direction} • {post.setupData.pair}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[#78716C] block text-[10px]">Entry</span>
                      <span className="font-bold text-[#1C1917]">{post.setupData.entry || 'Market'}</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[10px]">Stop Loss</span>
                      <span className="font-bold text-[#B91C1C]">{post.setupData.sl || '-'}</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[10px]">Take Profit</span>
                      <span className="font-bold text-[#15803D]">{post.setupData.tp || '-'}</span>
                    </div>
                    <div>
                      <span className="text-[#78716C] block text-[10px]">Risk:Reward</span>
                      <span className="font-bold text-[#C2410C]">1:{post.setupData.rr || '2.5'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Chart Images Gallery */}
              {post.images && post.images.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider block">
                    Chart Attachments ({post.images.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {post.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setShowImageModal(imgUrl)}
                        className="relative rounded-xl overflow-hidden border border-[#E7E5E4] bg-[#1C1917] group cursor-pointer aspect-video"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Attachment ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-200"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Maximize2 className="w-5 h-5 drop-shadow-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs bg-[#F5F5F4] text-[#57534E] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[#F5F5F4]">
                <button
                  type="button"
                  onClick={handleToggleUpvote}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    post.hasUpvoted
                      ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                      : 'bg-white hover:bg-[#FAFAF9] text-[#78716C] border-[#E7E5E4]'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>{post.upvotes} Upvotes</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-[#78716C]">
                  <MessageSquare className="w-4 h-4 text-[#C2410C]" />
                  <span>{post.replies.length} Comments</span>
                </div>
              </div>
            </article>

            {/* EXPANDED ROOMS FOR COMMENT: Comments Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-[#1C1917] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#C2410C]" />
                  <span>Discussion & Comments ({post.replies.length})</span>
                </h2>
              </div>

              {/* Reply Form */}
              <form
                onSubmit={handlePostReply}
                className="bg-white rounded-2xl border border-[#E7E5E4] p-4 sm:p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2">
                  <TraderAvatar
                    name={user?.display_name || user?.username || 'You'}
                    username={user?.username || 'you'}
                    avatarUrl={user?.avatar_url}
                    avatarType={user?.avatar_type}
                    tierColor={user?.tier_color}
                    level={user?.skill_level || 1}
                    size="sm"
                  />
                  <span className="text-xs font-semibold text-[#1C1917]">
                    Add to the discussion as @{user?.username || 'Trader'}
                  </span>
                </div>

                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Share your technical analysis, confluence critique, or question..."
                  rows={3}
                  className="w-full p-3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl text-xs sm:text-sm focus:border-[#C2410C] focus:bg-white outline-hidden transition-all resize-y"
                />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-1">
                    <ImageIcon className="w-4 h-4 text-[#78716C] shrink-0" />
                    <input
                      type="url"
                      value={replyImageInput}
                      onChange={(e) => setReplyImageInput(e.target.value)}
                      placeholder="Optional chart image URL (TradingView / Imgur / Cloudinary)"
                      className="flex-1 h-9 px-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-xs outline-hidden focus:border-[#C2410C]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReply || !replyContent.trim()}
                    className="h-9 px-4 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] disabled:opacity-50 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingReply ? 'Posting...' : 'Post Comment'}</span>
                  </button>
                </div>
              </form>

              {/* Replies List */}
              {post.replies.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E7E5E4] p-8 text-center text-[#78716C] space-y-1">
                  <p className="text-sm font-semibold">No comments yet.</p>
                  <p className="text-xs text-[#A8A29E]">Be the first to provide analysis or feedback on this post!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {post.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        reply.isVerifiedAnswer
                          ? 'bg-[#F0FDFA] border-[#99F6E4]'
                          : 'bg-white border-[#E7E5E4]'
                      }`}
                    >
                      {reply.isVerifiedAnswer && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F766E] pb-2.5 mb-2.5 border-b border-[#CCFBF1]">
                          <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
                          <span>Verified Desk Analysis (Tier 5+ Senior Trader)</span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <TraderAvatar
                            name={reply.author.name}
                            username={reply.author.username}
                            avatarUrl={reply.author.avatarUrl}
                            avatarType={reply.author.avatarType}
                            tierColor={reply.author.tierColor}
                            level={reply.author.level}
                            size="md"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Link
                                href={`/profile/${reply.author.username}`}
                                className="font-bold text-xs sm:text-sm text-[#1C1917] hover:text-[#C2410C] hover:underline"
                              >
                                {reply.author.name}
                              </Link>
                              <Link
                                href={`/profile/${reply.author.username}`}
                                className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white hover:opacity-90"
                                style={{ backgroundColor: reply.author.tierColor }}
                              >
                                L{reply.author.level} • {reply.author.badge}
                              </Link>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#78716C]">
                              <span>@{reply.author.username}</span>
                              <span>•</span>
                              <span>{reply.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        {/* Upvote Reply */}
                        <button
                          type="button"
                          onClick={() => handleToggleReplyUpvote(reply.id)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
                            reply.hasUpvoted
                              ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                              : 'bg-[#FAFAF9] text-[#78716C] border-[#E7E5E4] hover:bg-white'
                          }`}
                        >
                          <ArrowUp className="w-3 h-3" />
                          <span>{reply.upvotes}</span>
                        </button>
                      </div>

                      <div className="mt-3 text-xs sm:text-sm text-[#292524] leading-relaxed whitespace-pre-line">
                        {reply.content}
                      </div>

                      {reply.images && reply.images.length > 0 && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                          {reply.images.map((img, i) => (
                            <div
                              key={i}
                              onClick={() => setShowImageModal(img)}
                              className="relative w-36 h-24 rounded-lg overflow-hidden border border-[#E7E5E4] cursor-pointer group"
                            >
                              <Image src={img} alt="Reply Attachment" fill className="object-cover" unoptimized />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Image Modal Lightbox */}
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-full max-h-[85vh]">
              <Image src={showImageModal} alt="Enlarged Chart" fill className="object-contain" unoptimized />
            </div>
          </div>
        </div>
      )}

      <MobileNavDock />
    </div>
  );
}
