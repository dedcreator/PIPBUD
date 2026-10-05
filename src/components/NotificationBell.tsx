'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  CheckCheck,
  Trash2,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  ShieldAlert,
  Flame,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAuth, getApiBase } from '@/context/AuthContext';
import TraderAvatar from './TraderAvatar';

export interface NotificationItem {
  id: string;
  type: 'upvote' | 'reply' | 'verified_answer' | 'forum_reaction' | 'tier_audit' | 'system';
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

export default function NotificationBell() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const apiBase = getApiBase();
      const token = user.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (user.id) {
        headers['X-Trader-Id'] = user.id;
      }

      const res = await fetch(`${apiBase}/api/notifications/?username=${encodeURIComponent(user.username)}`, {
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch {
      // Quiet fail if offline
    }
  }, [user]);

  // Initial fetch and 25s polling
  useEffect(() => {
    if (!user) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 25000);
    return () => clearInterval(interval);
  }, [user, fetchNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Mark single notification read
  const handleMarkRead = async (notificationId: string, link?: string) => {
    if (!user) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      const apiBase = getApiBase();
      const token = user.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/notifications/${notificationId}/read/?username=${encodeURIComponent(user.username)}`, {
        method: 'POST',
        headers,
      });
    } catch {
      // Ignore
    }

    if (link) {
      setIsOpen(false);
      if (link.startsWith('/')) {
        router.push(link);
      } else {
        window.location.href = link;
      }
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    if (!user) return;

    // Optimistic UI update
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);

    try {
      const apiBase = getApiBase();
      const token = user.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/notifications/mark-all-read/?username=${encodeURIComponent(user.username)}`, {
        method: 'POST',
        headers,
      });
    } catch {
      // Ignore
    }
  };

  // Clear read notifications
  const handleClearRead = async () => {
    if (!user) return;

    setNotifications((prev) => prev.filter((n) => !n.is_read));

    try {
      const apiBase = getApiBase();
      const token = user.token || (typeof window !== 'undefined' ? localStorage.getItem('pipbud_token') : '');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (user.id) headers['X-Trader-Id'] = user.id;

      await fetch(`${apiBase}/api/notifications/clear/?username=${encodeURIComponent(user.username)}`, {
        method: 'POST',
        headers,
      });
    } catch {
      // Ignore
    }
  };

  if (!user) {
    return null;
  }

  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'upvote':
        return <Flame className="w-3.5 h-3.5 text-[#EA580C]" />;
      case 'reply':
        return <MessageSquare className="w-3.5 h-3.5 text-[#3B82F6]" />;
      case 'verified_answer':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />;
      case 'forum_reaction':
        return <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'tier_audit':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#7C3AED]" />;
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications();
        }}
        className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
          isOpen
            ? 'bg-[#FFF7ED] border-[#FED7AA] text-[#C2410C]'
            : 'bg-white border-[#E7E5E4] text-[#44403C] hover:text-[#1C1917] hover:border-[#D6D3D1] hover:bg-[#FAFAF9]'
        }`}
        aria-label="Trader Notifications"
        title="Meritocracy & Social Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-xl border border-[#E7E5E4] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-[#FAFAF9] border-b border-[#E7E5E4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#1C1917]">Notifications</span>
              {unreadCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                  {unreadCount} unread
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F5F4] text-[#78716C]">
                  All caught up
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  className="px-2 py-1 rounded-lg text-[11px] font-semibold text-[#44403C] hover:text-[#C2410C] hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
              {notifications.some((n) => n.is_read) && (
                <button
                  type="button"
                  onClick={handleClearRead}
                  className="p-1 rounded-lg text-[#A8A29E] hover:text-[#DC2626] hover:bg-white transition-all cursor-pointer"
                  title="Clear read notifications"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[#A8A29E] hover:text-[#1C1917] hover:bg-white transition-all cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-[#E7E5E4] bg-white text-xs font-semibold px-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'border-[#C2410C] text-[#C2410C]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('unread')}
              className={`flex-1 py-2 text-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'unread'
                  ? 'border-[#C2410C] text-[#C2410C]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-[#F5F5F4]">
            {filteredNotifications.length === 0 ? (
              <div className="py-10 px-4 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center mx-auto text-[#A8A29E]">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1C1917]">
                  {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </p>
                <p className="text-[11px] text-[#78716C] max-w-xs mx-auto">
                  When traders upvote your setups, reply in forum channels, or when your risk metrics are audited, you will see alerts here.
                </p>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleMarkRead(n.id, n.link)}
                  className={`p-3.5 transition-all cursor-pointer hover:bg-[#FFF7ED]/50 flex items-start gap-3 relative group ${
                    !n.is_read ? 'bg-[#FFFDFB]' : 'bg-white opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Unread dot */}
                  {!n.is_read && (
                    <span className="w-2 h-2 rounded-full bg-[#EA580C] absolute left-1.5 top-5 shrink-0" />
                  )}

                  {/* Avatar / Icon */}
                  <div className="relative shrink-0 ml-1">
                    {n.actor ? (
                      <TraderAvatar
                        name={n.actor.name}
                        username={n.actor.username}
                        avatarUrl={n.actor.avatarUrl}
                        avatarType={n.actor.avatarType}
                        tierColor={n.actor.tierColor}
                        size="sm"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center">
                        {getTypeIcon(n.type)}
                      </div>
                    )}
                    {n.actor && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-[#E7E5E4] flex items-center justify-center shadow-2xs">
                        {getTypeIcon(n.type)}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs truncate ${
                          !n.is_read ? 'font-bold text-[#1C1917]' : 'font-semibold text-[#44403C]'
                        }`}
                      >
                        {n.title}
                      </span>
                      <span className="text-[10px] text-[#A8A29E] shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                    {n.link && (
                      <div className="pt-1 flex items-center gap-1 text-[11px] font-semibold text-[#C2410C] group-hover:underline">
                        <span>View thread</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-[#FAFAF9] border-t border-[#E7E5E4] text-center">
            <span className="text-[10px] text-[#A8A29E]">
              Audited live by PipBud Meritocracy Protocol
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
