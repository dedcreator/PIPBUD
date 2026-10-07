'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MobileNavDock from '@/components/MobileNavDock';
import TraderAvatar from '@/components/TraderAvatar';
import { useAuth, getApiBase } from '@/context/AuthContext';
import {
  Bell,
  CheckCheck,
  Trash2,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  ShieldAlert,
  Flame,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'upvote' | 'reply' | 'chat_tag' | 'verified_answer' | 'forum_reaction' | 'tier_audit' | 'system';
  title: string;
  message: string;
  link: string;
  is_read: boolean;
  timestamp: string;
  created_at_iso: string;
  actor?: {
    id: string;
    name: string;
    username: string;
    level: number;
    badge: string;
    tierColor: string;
    avatarUrl?: string;
    avatarType?: string;
  } | null;
}

export default function NotificationsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermission(window.Notification.permission);
    }
  }, []);

  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await window.Notification.requestPermission();
        setPushPermission(perm);
        if (perm === 'granted') {
          new window.Notification('PipBud Notifications Enabled', {
            body: 'You will receive real-time push alerts for chat mentions and replies.',
            icon: '/favicon.ico',
          });
        }
      } catch {}
    }
  };

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const apiBase = getApiBase();
      const token = user.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user.id) headers['X-Trader-Id'] = user.id;

      const res = await fetch(`${apiBase}/api/notifications/?username=${encodeURIComponent(user.username)}`, {
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch {
      // offline
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchNotifications();
    }
  }, [user, isAuthLoading, router, fetchNotifications]);

  const handleMarkRead = async (id: string, link?: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      const apiBase = getApiBase();
      const token = user?.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user?.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/notifications/${id}/read/`, {
        method: 'POST',
        headers,
      });
    } catch {}

    if (link) {
      router.push(link);
    }
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);

    try {
      const apiBase = getApiBase();
      const token = user?.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user?.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/notifications/mark-all-read/?username=${encodeURIComponent(user!.username)}`, {
        method: 'POST',
        headers,
      });
    } catch {}
  };

  const handleClear = async () => {
    setNotifications((prev) => prev.filter((n) => !n.is_read));

    try {
      const apiBase = getApiBase();
      const token = user?.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user?.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/notifications/clear/?username=${encodeURIComponent(user!.username)}`, {
        method: 'POST',
        headers,
      });
    } catch {}
  };

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'upvote':
        return <Flame className="w-4 h-4 text-[#EA580C]" />;
      case 'reply':
        return <MessageSquare className="w-4 h-4 text-[#3B82F6]" />;
      case 'chat_tag':
        return <MessageSquare className="w-4 h-4 text-[#C2410C]" />;
      case 'verified_answer':
        return <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />;
      case 'forum_reaction':
        return <Sparkles className="w-4 h-4 text-[#F59E0B]" />;
      case 'tier_audit':
        return <ShieldAlert className="w-4 h-4 text-[#DC2626]" />;
      default:
        return <Bell className="w-4 h-4 text-[#7C3AED]" />;
    }
  };

  const displayedList =
    activeTab === 'unread'
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] pb-24 md:pb-12">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#C2410C]" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                  {unreadCount} unread
                </span>
              )}
            </h1>
            <p className="text-xs text-[#78716C] mt-0.5">
              Community replies, @mentions in chat rooms, and anti-shortfall audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] text-xs font-semibold text-[#44403C] hover:text-[#C2410C] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}

            {notifications.some((n) => n.is_read) && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] text-xs font-semibold text-[#78716C] hover:text-[#DC2626] transition-all cursor-pointer shadow-2xs"
                title="Clear read notifications"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Push Notification Banner */}
        {pushPermission === 'default' && (
          <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#9A3412]">Enable Desktop & Mobile Push Notifications</p>
              <p className="text-xs text-[#C2410C]">
                Get notified immediately when traders tag you in the forum or answer your setups.
              </p>
            </div>
            <button
              type="button"
              onClick={requestPushPermission}
              className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Enable Notifications
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E7E5E4] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1C1917] text-white'
                : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('unread')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'unread'
                ? 'bg-[#1C1917] text-white'
                : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F5F4]'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white rounded-2xl border border-[#E7E5E4] animate-pulse" />
            ))}
          </div>
        ) : displayedList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E7E5E4] p-12 text-center text-[#78716C] space-y-2">
            <Bell className="w-8 h-8 mx-auto text-[#D6D3D1]" />
            <p className="text-sm font-semibold">No notifications</p>
            <p className="text-xs text-[#A8A29E]">You are completely caught up!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayedList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMarkRead(item.id, item.link)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 group ${
                  item.is_read
                    ? 'bg-white border-[#E7E5E4] hover:border-[#D6D3D1]'
                    : 'bg-[#FFF7ED]/40 border-[#FED7AA] hover:bg-[#FFF7ED]/70 shadow-2xs'
                }`}
              >
                <div className="p-2 rounded-xl bg-white border border-[#E7E5E4] shrink-0">
                  {getTypeIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1C1917] truncate group-hover:text-[#C2410C] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-[#A8A29E] shrink-0 font-medium">{item.timestamp}</span>
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                    {item.message}
                  </p>

                  {item.actor && (
                    <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#78716C]">
                      <span>From @{item.actor.username}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#F5F5F4] text-[#57534E]">
                        L{item.actor.level}
                      </span>
                    </div>
                  )}
                </div>

                {!item.is_read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shrink-0 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <MobileNavDock />
    </div>
  );
}
