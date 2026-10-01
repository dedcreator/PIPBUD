'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Send,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  RefreshCw,
  LogOut,
  Layers,
  BarChart3,
  MessageSquare,
  Award
} from 'lucide-react';
import PipbudLogo from '@/components/PipbudLogo';
import { useAuth } from '@/context/AuthContext';
import { TRADER_TIERS } from '@/data/tiers';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get('redirect') || '/journal';
  const { user, requestCode, verifyCode, loginWithDemo, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'otp' | 'widget' | 'tiers'>('otp');
  const [usernameInput, setUsernameInput] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [codeRequested, setCodeRequested] = useState(false);
  const [generatedCodeHint, setGeneratedCodeHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus next digit
  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split('');
      const newDigits = [...codeDigits];
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setCodeDigits(newDigits);
      const nextIdx = Math.min(5, pasted.length);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your Telegram username or ID.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await requestCode(usernameInput.trim());
      setCodeRequested(true);
      if (res.code) {
        setGeneratedCodeHint(res.code);
      }
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to request login code.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = codeDigits.join('');
    if (fullCode.length !== 6) {
      setStatusMessage({ type: 'error', text: 'Please enter all 6 digits of your login code.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await verifyCode(fullCode);
      if (res.success) {
        setStatusMessage({ type: 'success', text: res.message });
        setTimeout(() => router.push(redirectTarget), 800);
      } else {
        setStatusMessage({ type: 'error', text: res.message });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Verification failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSelect = async (level: number) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      await loginWithDemo(level);
      setStatusMessage({ type: 'success', text: `Switched to Level ${level} profile.` });
      setTimeout(() => router.push(redirectTarget), 600);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Failed to switch demo tier.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fill demo code if available
  const fillDemoCode = () => {
    if (generatedCodeHint) {
      setCodeDigits(generatedCodeHint.split(''));
    } else {
      setCodeDigits(['7', '7', '7', '7', '7', '7']);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between pt-16 pb-24 md:pb-12 px-4 sm:px-6">
      {/* Top Bar */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between py-4">
        <PipbudLogo size="md" />
        <Link
          href="/"
          className="text-xs font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
        >
          &larr; Back to Home
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-[0_12px_40px_rgba(28,25,23,0.06)] p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <PipbudLogo size="sm" showWordmark={false} href={false} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
              {user ? 'Trader Account' : 'Log in to PipBud'}
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              {user
                ? 'Your verified Telegram identity and meritocracy tier'
                : 'Connect via Telegram to sync your journal & forum tier'}
            </p>
          </div>

          {/* If already logged in, show profile card */}
          {user ? (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
                  <div>
                    <h3 className="text-sm font-bold text-[#1C1917]">@{user.username}</h3>
                    <p className="text-xs text-[#78716C]">{user.broker_name || 'Verified Prop Trader'}</p>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: user.tier_color || '#C2410C' }}
                  >
                    {user.tier_badge}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-2 rounded-xl border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#78716C] block">Win Rate</span>
                    <strong className="text-xs font-bold text-[#0F766E]">{user.win_rate}%</strong>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#78716C] block">Profit Factor</span>
                    <strong className="text-xs font-bold text-[#1C1917]">{user.profit_factor}</strong>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#E7E5E4]">
                    <span className="text-[10px] text-[#78716C] block">Trades</span>
                    <strong className="text-xs font-bold text-[#1C1917]">{user.total_verified_trades}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#44403C] px-1">
                  <span>Tier Health:</span>
                  <span className="font-semibold text-[#0F766E]">
                    {user.tier_health}% (Active & In Good Standing)
                  </span>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/journal"
                  className="h-11 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#F5F5F4] text-[#1C1917] font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <BarChart3 className="w-4 h-4 text-[#C2410C]" />
                  <span>Web Journal</span>
                </Link>
                <Link
                  href="/forum"
                  className="h-11 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Forum</span>
                </Link>
              </div>

              {/* Tier Switcher for quick test */}
              <div className="pt-3 border-t border-[#E7E5E4]">
                <span className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider block mb-2">
                  Test Another Skill Level:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TRADER_TIERS.map((t) => (
                    <button
                      key={t.level}
                      onClick={() => handleDemoSelect(t.level)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        user.skill_level === t.level
                          ? 'bg-[#1C1917] text-white'
                          : 'bg-[#F5F5F4] text-[#44403C] hover:bg-[#E7E5E4]'
                      }`}
                    >
                      L{t.level} {t.badge.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full h-10 rounded-xl text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-1.5 border border-[#FEE2E2]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div className="flex bg-[#F5F5F4] p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('otp')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'otp'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  1. Bot OTP Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('widget')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'widget'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  2. Telegram OAuth
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tiers')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'tiers'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  ⚡ Test Tiers
                </button>
              </div>

              {/* Status Message Feedback */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E]'
                      : 'bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626]'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* USERFLOW 1: Telegram Bot OTP Code */}
              {activeTab === 'otp' && (
                <div className="space-y-4">
                  {!codeRequested ? (
                    <form onSubmit={handleRequestCode} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                          Your Telegram Username or ID
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="@trader_dan or 8921472"
                            className="w-full h-11 px-3.5 rounded-xl border border-[#E7E5E4] focus:outline-hidden focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] text-sm text-[#1C1917] placeholder:text-[#A8A29E]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 shadow-xs"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>Request Login Code</span>
                      </button>

                      {/* Direct Bot Link helper */}
                      <div className="p-3 bg-[#FFF7ED] rounded-xl border border-[#FED7AA] text-[11px] text-[#9A3412] flex items-center justify-between">
                        <span>Already on Telegram?</span>
                        <a
                          href="https://t.me/PipBudBot?start=login"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline hover:text-[#C2410C] inline-flex items-center gap-1"
                        >
                          Send /login to bot &rarr;
                        </a>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-[#1C1917]">
                            Enter 6-Digit Code
                          </label>
                          <button
                            type="button"
                            onClick={() => setCodeRequested(false)}
                            className="text-[11px] text-[#C2410C] hover:underline"
                          >
                            Change handle
                          </button>
                        </div>

                        {/* 6 Digit Inputs */}
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                          {codeDigits.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => { inputRefs.current[index] = el; }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleDigitChange(index, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-11 sm:w-12 h-12 text-center text-lg font-bold rounded-xl border border-[#E7E5E4] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] text-[#1C1917] bg-[#FAFAF9]"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Quick Auto-Fill for Testing */}
                      {generatedCodeHint && (
                        <div className="flex items-center justify-between px-2 py-1 bg-[#F0FDFA] rounded-lg text-[11px] text-[#0F766E]">
                          <span>Active test code: <strong>{generatedCodeHint}</strong></span>
                          <button
                            type="button"
                            onClick={fillDemoCode}
                            className="underline font-bold"
                          >
                            Auto-fill
                          </button>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 shadow-xs"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                        <span>Verify & Enter Web Forum</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* USERFLOW 2: Official Telegram Widget OAuth */}
              {activeTab === 'widget' && (
                <div className="text-center py-4 space-y-4">
                  <div className="p-4 bg-[#F5F5F4] rounded-2xl border border-[#E7E5E4] text-xs text-[#44403C] space-y-2">
                    <p className="font-semibold text-[#1C1917]">
                      Official Telegram OAuth Widget
                    </p>
                    <p className="text-[11px] text-[#78716C]">
                      Telegram uses your verified phone session to authorize without typing passwords or sharing credentials.
                    </p>
                  </div>

                  {/* Telegram OAuth Trigger Button */}
                  <div className="flex justify-center pt-2">
                    <a
                      href="https://t.me/PipBudBot?start=login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 px-6 rounded-xl bg-[#229ED9] hover:bg-[#1E8BC0] text-white font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
                    >
                      <Send className="w-4 h-4" />
                      <span>Log in with Telegram Web</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-[#A8A29E]">
                    Secured by Telegram Cryptographic SHA-256 Auth Signature.
                  </p>
                </div>
              )}

              {/* USERFLOW 3 / TEST SWITCHER: 1-Click Meritocracy Tiers */}
              {activeTab === 'tiers' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#78716C] mb-2">
                    Select a skill tier to immediately log in and explore the tier-gated forum channels and anti-shortfall enforcement:
                  </p>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {TRADER_TIERS.map((tier) => (
                      <button
                        key={tier.level}
                        type="button"
                        onClick={() => handleDemoSelect(tier.level)}
                        className="w-full p-2.5 rounded-xl border border-[#E7E5E4] hover:border-[#FED7AA] hover:bg-[#FFF7ED] text-left transition-all flex items-center justify-between group active:scale-98"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0"
                            style={{ backgroundColor: tier.color }}
                          >
                            {tier.level}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-[#C2410C]">
                              {tier.title}
                            </h4>
                            <p className="text-[10px] text-[#78716C]">
                              WR: {tier.minWinRate}% • Max DD: {tier.maxDrawdown}%
                            </p>
                          </div>
                        </div>

                        <span className="text-xs text-[#A8A29E] group-hover:text-[#C2410C]">
                          &rarr;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Meritocracy Assurance Note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#78716C] inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Audited Meritocracy: Fall short of your tier’s stats, you get automatically removed.</span>
          </p>
        </div>
      </main>

      <footer className="text-center text-xs text-[#A8A29E] mt-6">
        &copy; {new Date().getFullYear()} PipBud. Built with Next.js & Django.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#C2410C] border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
