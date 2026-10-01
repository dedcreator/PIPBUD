'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Send,
  ShieldCheck,
  ArrowRight,
  Lock,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  RefreshCw,
  LogOut,
  Layers,
  BarChart3,
  MessageSquare,
  Award,
  Sliders
} from 'lucide-react';
import PipbudLogo from '@/components/PipbudLogo';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get('redirect') || '/journal';
  const { user, requestCode, verifyCode, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'otp' | 'widget'>('otp');
  const [usernameInput, setUsernameInput] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [codeRequested, setCodeRequested] = useState(false);
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
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDFA] border border-[#CCFBF1] text-[#0F766E] mx-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographic Telegram Authentication</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
              {user ? 'Authenticated Trader Session' : 'Log In to PipBud'}
            </h1>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto">
              {user
                ? `Logged in as @${user.username}. Desks unlocked based on verified broker track record.`
                : 'Access your audited journal, live desk huddles, and performance metrics securely via Telegram.'}
            </p>
          </div>

          {/* Current Logged-in State Card */}
          {user ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs uppercase"
                    style={{ backgroundColor: user.tier_color || '#1C1917' }}
                  >
                    {user.username.slice(0, 2)}
                  </div>
                  <div className="overflow-hidden min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1C1917] truncate">
                        {user.display_name || user.name || `@${user.username}`}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white shrink-0"
                        style={{ backgroundColor: user.tier_color || '#C2410C' }}
                      >
                        L{user.skill_level}
                      </span>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: user.tier_color || '#C2410C' }}>
                      {user.tier_badge}
                    </p>
                    <p className="text-xs text-[#78716C] truncate">{user.broker_name || 'Verified Prop Trader'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E7E5E4] text-center text-xs">
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
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/forum"
                  className="w-full h-11 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enter Trader Forum</span>
                </Link>

                <Link
                  href="/journal"
                  className="w-full h-11 rounded-xl bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <BarChart3 className="w-4 h-4 text-[#0F766E]" />
                  <span>Open Web Journal Dashboard</span>
                </Link>

                <Link
                  href="/settings"
                  className="w-full h-11 rounded-xl bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <Sliders className="w-4 h-4 text-[#7C3AED]" />
                  <span>Identity & Broker Settings</span>
                </Link>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full h-10 rounded-xl text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-1.5 border border-[#FEE2E2]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Session</span>
              </button>
            </div>
          ) : (
            <>
              {/* Tab Selector: Real Production Flows */}
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
                  1. Telegram Bot Code
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
                  2. Telegram Web Direct
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

              {/* USERFLOW 1: 6-Digit Telegram One-Time Code */}
              {activeTab === 'otp' && (
                <div>
                  {!codeRequested ? (
                    <form onSubmit={handleRequestCode} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                          Telegram Handle or Numeric ID
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="e.g. @your_username or 9928174"
                            className="w-full h-11 pl-4 pr-10 rounded-xl border border-[#E7E5E4] focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C] text-xs sm:text-sm text-[#1C1917] bg-[#FAFAF9] outline-hidden transition-all"
                            required
                          />
                          <Send className="w-4 h-4 text-[#A8A29E] absolute right-3.5 top-3.5" />
                        </div>
                        <p className="text-[11px] text-[#78716C] mt-1.5">
                          We will securely generate a 6-digit one-time code to authenticate your verified journal account.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 rounded-xl bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 shadow-xs"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Smartphone className="w-4 h-4" />
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
                      Official Telegram OAuth Session
                    </p>
                    <p className="text-[11px] text-[#78716C]">
                      Telegram uses your verified active session to authorize without typing passwords or sharing credentials.
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
            </>
          )}

          {/* Footer note inside card */}
          <div className="mt-6 pt-5 border-t border-[#E7E5E4] text-center">
            <p className="text-[11px] text-[#78716C]">
              New to PipBud? Start by messaging{' '}
              <a
                href="https://t.me/PipBudBot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2410C] font-semibold hover:underline"
              >
                @PipBudBot
              </a>{' '}
              on Telegram to create your audited journal.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-[#A8A29E] pt-4">
        &copy; {new Date().getFullYear()} PipBud. Verified Trader Meritocracy Network.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin text-[#C2410C]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
