'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PipbudLogo from '@/components/PipbudLogo';
import { useAuth, TraderProfile } from '@/context/AuthContext';
import { TRADER_TIERS } from '@/data/tiers';
import {
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  Check,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Send,
  MessageSquare,
  LogOut,
  Camera,
  HelpCircle,
  Info,
  ExternalLink,
  Sliders,
  Award,
  BarChart3,
  Hash,
  Activity,
  Layers,
  Save
} from 'lucide-react';

const AVATAR_PRESETS = [
  {
    id: 'mascot_purple',
    name: 'Purple Companion',
    src: '/icon-192.png',
    ring: 'border-[#8B5CF6]',
    bg: 'bg-[#F5F3FF]',
    badge: 'Classic Bud',
  },
  {
    id: 'mascot_gold',
    name: 'Funded Pro Gold',
    src: '/icon-192.png',
    ring: 'border-[#F59E0B]',
    bg: 'bg-[#FFFBEB]',
    badge: 'Funded Ring',
  },
  {
    id: 'mascot_alpha',
    name: 'Alpha Electric',
    src: '/icon-192.png',
    ring: 'border-[#3B82F6]',
    bg: 'bg-[#EFF6FF]',
    badge: 'Alpha Blue',
  },
  {
    id: 'mascot_emerald',
    name: 'Consistent Green',
    src: '/icon-192.png',
    ring: 'border-[#10B981]',
    bg: 'bg-[#ECFDF5]',
    badge: 'Emerald Sprout',
  },
  {
    id: 'mascot_titan',
    name: 'Titan Amber',
    src: '/icon-192.png',
    ring: 'border-[#C2410C]',
    bg: 'bg-[#FFF7ED]',
    badge: 'Titan Fire',
  },
  {
    id: 'initials',
    name: 'Trader Monogram',
    src: '',
    ring: 'border-[#1C1917]',
    bg: 'bg-[#1C1917]',
    badge: 'Initials Monogram',
  },
];

const TRADING_STYLES = [
  'SMC / ICT Concepts',
  'Price Action & Tape Reading',
  'Order Block Liquidity Sweeps',
  'London / NY Breakouts',
  'Supply & Demand',
  'Algorithmic & Quantitative Models',
  'Discretionary Scalping',
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, updateProfile, logout } = useAuth();

  // Form states
  const [displayName, setDisplayName] = useState('');
  const [customUsername, setCustomUsername] = useState('');
  const [avatarType, setAvatarType] = useState('mascot_purple');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [hideTelegram, setHideTelegram] = useState(true);
  const [allowDirectMessages, setAllowDirectMessages] = useState(false);
  const [tradingStyle, setTradingStyle] = useState('SMC / ICT Concepts');
  const [bio, setBio] = useState('');
  const [brokerName, setBrokerName] = useState('');
  const [showBrokerBadge, setShowBrokerBadge] = useState(true);

  // Feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync state when user profile is loaded
  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || user.name || user.username);
      setCustomUsername(user.username || '');
      setAvatarType(user.avatar_type || 'mascot_purple');
      setCustomAvatarUrl(user.avatar_url || '');
      setHideTelegram(user.hide_telegram !== false);
      setAllowDirectMessages(user.allow_direct_messages === true);
      setTradingStyle(user.trading_style || 'SMC / ICT Concepts');
      setBio(user.bio || '');
      setBrokerName(user.broker_name || 'Verified Prop Trader');
      setShowBrokerBadge(user.show_broker_badge !== false);
    }
  }, [user]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const updates: Partial<TraderProfile> = {
        name: displayName.trim() || user.name,
        display_name: displayName.trim() || user.name,
        username: customUsername.trim().replace(/^@/, '') || user.username,
        avatar_type: avatarType,
        avatar_url: customAvatarUrl.trim(),
        hide_telegram: hideTelegram,
        allow_direct_messages: allowDirectMessages,
        trading_style: tradingStyle,
        bio: bio.trim(),
        broker_name: brokerName.trim() || 'Verified Broker',
        show_broker_badge: showBrokerBadge,
      };

      const res = await updateProfile(updates);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        setSaveError(res.message);
      }
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================
  // STATE 1: Gated Access When Not Logged In
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 py-24">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-10 shadow-[0_12px_40px_rgba(28,25,23,0.06)] text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA] flex items-center justify-center mx-auto shadow-xs">
              <Shield className="w-8 h-8 text-[#C2410C]" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Trader Privacy & Settings</span>
              </span>
              <h1 className="text-2xl font-bold text-[#1C1917] tracking-tight">
                Log In to Manage Settings
              </h1>
              <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
                Customize your display name, select your trading avatar, and shield your Telegram identity from unsolicited direct messages.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login?redirect=/settings"
                className="w-full h-12 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Log In via Telegram</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Calculate current avatar presentation for live preview
  const getSelectedAvatarElement = (size: 'sm' | 'md' | 'lg' = 'md') => {
    const dim = size === 'sm' ? 32 : size === 'md' ? 44 : 64;

    if (avatarType === 'initials') {
      return (
        <div
          className="rounded-2xl text-white font-bold flex items-center justify-center shrink-0 shadow-xs uppercase tracking-wider"
          style={{
            width: dim,
            height: dim,
            fontSize: size === 'sm' ? 12 : size === 'md' ? 16 : 22,
            backgroundColor: user.tier_color || '#1C1917',
          }}
        >
          {displayName.slice(0, 2) || user.username.slice(0, 2)}
        </div>
      );
    }

    if (avatarType === 'custom' && customAvatarUrl.trim()) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={customAvatarUrl}
          alt={displayName}
          className="rounded-2xl object-cover shrink-0 shadow-xs border border-[#E7E5E4]"
          style={{ width: dim, height: dim }}
          onError={(e) => {
            // Fallback to mascot
            (e.target as HTMLImageElement).src = '/icon-192.png';
          }}
        />
      );
    }

    const preset = AVATAR_PRESETS.find((p) => p.id === avatarType) || AVATAR_PRESETS[0];

    return (
      <div
        className={`rounded-2xl p-1 border-2 ${preset.ring} ${preset.bg} flex items-center justify-center shrink-0 shadow-xs`}
        style={{ width: dim, height: dim }}
      >
        <Image
          src="/icon-192.png"
          alt="PipBud Mascot"
          width={dim - 8}
          height={dim - 8}
          className="object-contain"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col font-sans pb-28 md:pb-16">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        {/* Top Header & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E7E5E4]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="text-xs font-bold text-[#C2410C] hover:underline inline-flex items-center gap-1 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </Link>
              <span className="text-[#A8A29E]">•</span>
              <Link
                href="/journal"
                className="text-xs font-semibold text-[#78716C] hover:text-[#C2410C] inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Journal</span>
              </Link>
              <span className="text-[#A8A29E]">•</span>
              <Link
                href="/forum"
                className="text-xs font-semibold text-[#78716C] hover:text-[#C2410C] inline-flex items-center gap-1 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Forum</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
              Trader Identity & Privacy Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C]">
              Manage your verified profile, privacy shield, and desk preferences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="h-11 px-4 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#FAFAF9] text-[#1C1917] font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-all"
            >
              <User className="w-4 h-4 text-[#C2410C]" />
              <span>View Profile</span>
            </Link>

            <button
              onClick={() => handleSave()}
              disabled={isSaving}
              className="h-11 px-6 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50 shrink-0"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Preferences</span>
            </button>
          </div>
        </div>

        {/* Success / Error Notification Banners */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] text-xs sm:text-sm font-medium flex items-center justify-between shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Settings saved! Your custom identity and privacy shield are now live across the forum & journal.</span>
            </div>
            <button
              onClick={() => setSaveSuccess(false)}
              className="text-[#15803D] hover:opacity-80 text-xs font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {saveError && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#B91C1C] text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-xs">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* ======================================================== */}
          {/* 1. TELEGRAM PRIVACY & ANTI-DM SHIELD (PRIMARY GOAL)     */}
          {/* ======================================================== */}
          <section className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-7 shadow-[0_1px_3px_rgba(28,25,23,0.06)] space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1C1917]">
                    Telegram Privacy & Anti-DM Protection
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Prevent people from looking up or directly messaging your personal Telegram handle.
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#0F766E] bg-[#F0FDFA] px-2.5 py-1 rounded-full border border-[#CCFBF1]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Privacy Shield
              </span>
            </div>

            {/* Toggle 1: Shield Telegram Handle */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    Shield Personal Telegram Identity
                  </span>
                  <span className="text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-[#78716C] leading-relaxed max-w-xl">
                  When enabled, your real Telegram username and Telegram ID will <strong>never</strong> be displayed on your forum messages, audited trade cards, or public leaderboard. Other traders only see your chosen Display Name.
                </p>
                <div className="text-[11px] text-[#44403C] font-mono pt-1">
                  Connected Telegram: <span className="text-[#0F766E] font-semibold">@{user.telegram_id || user.username}</span> (Protected)
                </div>
              </div>

              {/* iOS Switch Toggle */}
              <button
                type="button"
                onClick={() => setHideTelegram(!hideTelegram)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  hideTelegram ? 'bg-[#0F766E]' : 'bg-[#D6D3D1]'
                }`}
                role="switch"
                aria-checked={hideTelegram}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    hideTelegram ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Block Direct Contact / Inquiries */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    Block 1-on-1 Direct Messaging Inquiries
                  </span>
                </div>
                <p className="text-xs text-[#78716C] leading-relaxed max-w-xl">
                  Disables the &quot;Send Telegram Message&quot; and &quot;Open DM&quot; actions on your trader profile card. Keeps all discussions strictly in the transparent, audited meritocracy rooms.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAllowDirectMessages(!allowDirectMessages)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  !allowDirectMessages ? 'bg-[#0F766E]' : 'bg-[#D6D3D1]'
                }`}
                role="switch"
                aria-checked={!allowDirectMessages}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    !allowDirectMessages ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ======================================================== */}
          {/* 2. TRADER IDENTITY & DISPLAY NAME CUSTOMIZATION          */}
          {/* ======================================================== */}
          <section className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-7 shadow-[0_1px_3px_rgba(28,25,23,0.06)] space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1C1917]">
                  Trader Custom Identity
                </h2>
                <p className="text-xs text-[#78716C]">
                  Choose how your name and pseudonym appear to other traders on the desk.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Display Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  Display Name (Trader Alias)
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Apex Sovereign, Solomon FX"
                  className="w-full h-11 px-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] focus:border-[#C2410C] focus:bg-white outline-hidden transition-all font-medium"
                />
                <p className="text-[11px] text-[#78716C]">
                  Shown on your forum posts, verified signals, and live audio desks.
                </p>
              </div>

              {/* Public Forum Pseudonym */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  Forum Pseudonym (Handle)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-[#A8A29E]">@</span>
                  <input
                    type="text"
                    value={customUsername}
                    onChange={(e) => setCustomUsername(e.target.value.replace(/^@/, ''))}
                    placeholder="e.g. liquid_alpha"
                    className="w-full h-11 pl-8 pr-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] focus:border-[#C2410C] focus:bg-white outline-hidden transition-all font-medium"
                  />
                </div>
                <p className="text-[11px] text-[#78716C]">
                  Unique handle displayed instead of your real Telegram handle.
                </p>
              </div>
            </div>

            {/* Trading Strategy / Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1C1917] block">
                Primary Trading Style / Methodology
              </label>
              <div className="flex flex-wrap gap-2">
                {TRADING_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTradingStyle(style)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      tradingStyle === style
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'bg-[#FAFAF9] text-[#44403C] border border-[#E7E5E4] hover:bg-[#F5F5F4]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Trader Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1C1917] flex justify-between items-center">
                <span>Trader Bio & Rules</span>
                <span className="text-[10px] text-[#A8A29E] font-normal">{bio.length}/160</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 160))}
                rows={2}
                placeholder="e.g. London Killzone SMC trader focusing on EUR/USD liquidity sweeps. 1:3 R:R strict rule. Demoted once, rebuilt back to Level 4."
                className="w-full p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] focus:border-[#C2410C] focus:bg-white outline-hidden transition-all resize-none"
              />
            </div>

            {/* Connected Broker Customization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-[#E7E5E4]">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">
                  Connected Broker / Firm Label
                </label>
                <input
                  type="text"
                  value={brokerName}
                  onChange={(e) => setBrokerName(e.target.value)}
                  placeholder="e.g. FTMO Funded $100k, 5%ers, MetaTrader Live"
                  className="w-full h-11 px-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] focus:border-[#C2410C] focus:bg-white outline-hidden transition-all"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] self-end h-11">
                <span className="text-xs font-medium text-[#44403C]">Show Broker Badge</span>
                <button
                  type="button"
                  onClick={() => setShowBrokerBadge(!showBrokerBadge)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    showBrokerBadge ? 'bg-[#0F766E]' : 'bg-[#D6D3D1]'
                  }`}
                  role="switch"
                  aria-checked={showBrokerBadge}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      showBrokerBadge ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Live Broker Read-Only Sync Notice */}
            <div className="p-4 rounded-2xl bg-[#F0FDFA] border border-[#CCFBF1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0F766E]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Meritocracy Live Account Verification</span>
                </div>
                <p className="text-[11px] text-[#115E59] leading-relaxed">
                  PipBud requires read-only investor verification to assign Level 2–7 desk permissions. Manual self-logging cannot claim funded status without cryptographic broker server proof.
                </p>
              </div>
              <Link
                href="/forum"
                className="px-3.5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold text-xs whitespace-nowrap shrink-0 shadow-xs transition-all text-center"
              >
                Sync Broker in Forum
              </Link>
            </div>
          </section>

          {/* ======================================================== */}
          {/* 3. PROFILE PICTURE & AVATAR SELECTOR                     */}
          {/* ======================================================== */}
          <section className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-7 shadow-[0_1px_3px_rgba(28,25,23,0.06)] space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E7E5E4]">
              <div className="w-10 h-10 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] flex items-center justify-center shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1C1917]">
                  Profile Picture & Avatar
                </h2>
                <p className="text-xs text-[#78716C]">
                  Select an official PipBud mascot avatar or enter a custom avatar URL.
                </p>
              </div>
            </div>

            {/* Avatar Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATAR_PRESETS.map((preset) => {
                const isSelected = avatarType === preset.id;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAvatarType(preset.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 relative group ${
                      isSelected
                        ? 'border-[#C2410C] bg-[#FFF7ED] shadow-xs'
                        : 'border-[#E7E5E4] hover:border-[#FED7AA] bg-[#FAFAF9] hover:bg-white'
                    }`}
                  >
                    {preset.id === 'initials' ? (
                      <div
                        className="w-10 h-10 rounded-xl text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase shadow-xs"
                        style={{ backgroundColor: user.tier_color || '#1C1917' }}
                      >
                        {displayName.slice(0, 2) || user.username.slice(0, 2)}
                      </div>
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-xl border p-0.5 flex items-center justify-center shrink-0 ${preset.ring} ${preset.bg}`}
                      >
                        <Image
                          src="/icon-192.png"
                          alt={preset.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-xs text-[#1C1917] block truncate">
                        {preset.badge}
                      </span>
                      <span className="text-[10px] text-[#78716C] block truncate">
                        {preset.name}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#C2410C] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Image URL Option */}
            <div className="pt-3 border-t border-[#E7E5E4] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                  <span>Custom Image URL (Optional)</span>
                </label>
                {avatarType === 'custom' && (
                  <span className="text-[10px] font-bold text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded-full border border-[#FED7AA]">
                    Active
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => {
                    setCustomAvatarUrl(e.target.value);
                    if (e.target.value) setAvatarType('custom');
                  }}
                  placeholder="https://example.com/avatar.jpg"
                  className="flex-1 h-11 px-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] focus:border-[#C2410C] focus:bg-white outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customAvatarUrl.trim()) setAvatarType('custom');
                  }}
                  className="h-11 px-4 rounded-xl bg-[#F5F5F4] hover:bg-[#E7E5E4] text-[#1C1917] text-xs font-semibold shrink-0 transition-all"
                >
                  Use URL
                </button>
              </div>
              <p className="text-[11px] text-[#78716C]">
                Paste a Cloudinary, Gravatar, or web image link.
              </p>
            </div>
          </section>

          {/* ======================================================== */}
          {/* 4. LIVE FORUM CARD PREVIEW                               */}
          {/* ======================================================== */}
          <section className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-7 shadow-[0_1px_3px_rgba(28,25,23,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#C2410C]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  Live Forum Appearance Preview
                </h3>
              </div>
              <span className="text-[11px] text-[#78716C]">
                How other traders see you in desks
              </span>
            </div>

            {/* Rendered Mock Message Bubble */}
            <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
              <div className="flex items-start gap-3">
                {getSelectedAvatarElement('md')}

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="font-bold text-xs text-[#1C1917]">
                      {displayName || user.name}
                    </span>
                    <span
                      className="px-2 py-0.2 rounded text-[10px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: user.tier_color || '#C2410C' }}
                    >
                      {user.tier_badge}
                    </span>
                    {showBrokerBadge && (
                      <span className="text-[10px] text-[#78716C]">
                        • {brokerName}
                      </span>
                    )}
                    <span className="text-[10px] text-[#A8A29E] ml-auto shrink-0">Just now</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#292524] leading-relaxed">
                    London liquidity sweep taken into 15m order block. Entering with strict 1:3 risk-to-reward. {bio ? `(${bio})` : ''}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] font-semibold text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{hideTelegram ? 'Telegram Handle Shielded' : `@${user.username}`}</span>
                    </span>

                    <span className="text-[10px] text-[#78716C] bg-white border border-[#E7E5E4] px-2 py-0.5 rounded-full">
                      Style: {tradingStyle}
                    </span>

                    {!allowDirectMessages && (
                      <span className="text-[10px] text-[#78716C] bg-white border border-[#E7E5E4] px-2 py-0.5 rounded-full">
                        🔒 Direct DMs Blocked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* 5. MERITOCRACY STATUS & 1-CLICK TIER TESTER              */}
          {/* ======================================================== */}
          <section className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-7 shadow-[0_1px_3px_rgba(28,25,23,0.06)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C2410C]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  Meritocracy Rank & Anti-Shortfall Health
                </h3>
              </div>
              <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                {user.tier_health}% Good Standing 🟢
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block uppercase font-bold">Win Rate</span>
                <span className="text-base font-bold text-[#1C1917]">{user.win_rate}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block uppercase font-bold">Profit Factor</span>
                <span className="text-base font-bold text-[#1C1917]">{user.profit_factor}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block uppercase font-bold">Max Drawdown</span>
                <span className="text-base font-bold text-[#C2410C]">{user.max_drawdown}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] block uppercase font-bold">Verified Trades</span>
                <span className="text-base font-bold text-[#1C1917]">{user.total_verified_trades}</span>
              </div>
            </div>

            {/* Verified Track Record info */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#78716C]">
                Your tier is dynamically verified against your live broker trade logs.
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/journal"
                  className="font-semibold text-[#0F766E] hover:underline inline-flex items-center gap-1"
                >
                  <span>View Journal Audit</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <span className="text-[#D6D3D1]">•</span>
                <Link
                  href="/forum"
                  className="font-semibold text-[#C2410C] hover:underline inline-flex items-center gap-1"
                >
                  <span>Broker Settings</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* 6. BOTTOM ACTIONS & LOGOUT                               */}
          {/* ======================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={logout}
              className="w-full sm:w-auto h-11 px-5 rounded-xl border border-[#FEE2E2] text-[#DC2626] hover:bg-[#FEF2F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out of Session</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
