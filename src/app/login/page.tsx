'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
  BarChart3,
  MessageSquare,
  Sliders,
  ExternalLink,
  KeyRound,
  Lock,
  Globe
} from 'lucide-react';
import PipbudLogo from '@/components/PipbudLogo';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get('redirect') || '/journal';
  const { user, verifyCode, loginWithTelegramWidget, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'bot' | 'widget' | 'code'>('bot');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'PipBudBot';

  // Automatically process 1-Tap Login if code is in URL
  useEffect(() => {
    const incomingCode = searchParams?.get('code')?.trim();
    if (incomingCode && incomingCode.length === 6 && /^\d+$/.test(incomingCode)) {
      setCodeDigits(incomingCode.split(''));
      setActiveTab('code');
      (async () => {
        setIsLoading(true);
        setStatusMessage(null);
        try {
          const res = await verifyCode(incomingCode);
          if (res.success) {
            setStatusMessage({ type: 'success', text: res.message });
            setTimeout(() => router.push(redirectTarget), 700);
          } else {
            setStatusMessage({ type: 'error', text: res.message });
          }
        } catch (err: any) {
          setStatusMessage({ type: 'error', text: err.message || 'Verification failed.' });
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [searchParams]);

  // Mount Telegram Login Widget when widget tab is selected
  useEffect(() => {
    if (activeTab !== 'widget') return;

    (window as any).onTelegramAuth = async (tgUser: any) => {
      setIsLoading(true);
      setStatusMessage(null);
      try {
        const res = await loginWithTelegramWidget(tgUser);
        if (res.success) {
          setStatusMessage({ type: 'success', text: res.message });
          setTimeout(() => router.push(redirectTarget), 700);
        } else {
          setStatusMessage({ type: 'error', text: res.message });
        }
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: err.message || 'Telegram authorization failed.' });
      } finally {
        setIsLoading(false);
      }
    };

    const container = document.getElementById('telegram-widget-container');
    if (container) {
      container.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '12');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.async = true;
      container.appendChild(script);
    }
  }, [activeTab, botUsername]);

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F5F5F4] border border-[#E7E5E4] text-[#44403C] mx-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Verified Telegram Authentication</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
              {user ? 'Trader Session' : 'Sign In to PipBud'}
            </h1>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto">
              {user
                ? `Active account: @${user.username}. Access granted based on verified broker track record.`
                : 'Access your verified journal, analytics terminal, and community channels via Telegram.'}
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
                        Level {user.skill_level}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#78716C]">
                      {user.tier_badge}
                    </p>
                    <p className="text-xs text-[#A8A29E] truncate">{user.broker_name || 'Verified Trader'}</p>
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
                    <span className="text-[#78716C] block text-[10px]">Max Drawdown</span>
                    <strong className="text-[#C2410C]">{user.max_drawdown}%</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/journal"
                  className="w-full h-11 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <BarChart3 className="w-4 h-4 text-[#0F766E]" />
                  <span>Open Journal Dashboard</span>
                </Link>

                <Link
                  href="/forum"
                  className="w-full h-11 rounded-xl bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#C2410C]" />
                  <span>Enter Trader Forum</span>
                </Link>

                <Link
                  href="/settings"
                  className="w-full h-11 rounded-xl bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                >
                  <Sliders className="w-4 h-4 text-[#78716C]" />
                  <span>Account Settings</span>
                </Link>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full h-10 rounded-xl text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-1.5 border border-[#FEE2E2]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div className="flex bg-[#F5F5F4] p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('bot')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'bot'
                      ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('widget')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'widget'
                      ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Browser</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'code'
                      ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Access Code</span>
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

              {/* TAB 1: Telegram Bot Direct Authorization */}
              {activeTab === 'bot' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-2 text-[#1C1917] font-semibold text-xs">
                      <Lock className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Direct Telegram Authorization</span>
                    </div>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      Launch @{botUsername} in Telegram to verify your Telegram identity and receive a secure web sign-in link.
                    </p>
                  </div>

                  <a
                    href={`https://t.me/${botUsername}?start=login`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Continue with Telegram</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  <div className="pt-1 text-center">
                    <span className="text-[11px] text-[#A8A29E]">
                      Enforces verified Telegram account ownership. No passwords required.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: Official Telegram Widget OAuth */}
              {activeTab === 'widget' && (
                <div className="text-center py-4 space-y-4">
                  <div className="p-4 bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] text-xs text-[#44403C] space-y-1.5 text-left">
                    <p className="font-semibold text-[#1C1917]">
                      Browser Authorization
                    </p>
                    <p className="text-xs text-[#78716C]">
                      Authenticate directly using your active Telegram browser session.
                    </p>
                  </div>

                  {/* Telegram Script Container */}
                  <div className="flex justify-center min-h-[46px] items-center pt-2">
                    <div id="telegram-widget-container" className="flex justify-center"></div>
                  </div>

                  <p className="text-[11px] text-[#A8A29E]">
                    Secured by Telegram cryptographic HMAC signature.
                  </p>
                </div>
              )}

              {/* TAB 3: 6-Digit One-Time Code Input */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-2 text-[#1C1917] font-semibold text-xs">
                      <KeyRound className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Code Verification</span>
                    </div>
                    <p className="text-xs text-[#78716C] leading-relaxed">
                      Enter the 6-digit access code generated by sending <strong>/login</strong> to @{botUsername} on Telegram.
                    </p>
                  </div>

                  {/* Verify Code Form */}
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1917] mb-2">
                        Enter 6-Digit Code
                      </label>
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
                            className="w-11 sm:w-12 h-12 text-center text-lg font-mono font-bold rounded-xl border border-[#E7E5E4] focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] text-[#1C1917] bg-[#FAFAF9]"
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 shadow-xs"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="w-4 h-4" />
                      )}
                      <span>Verify and Continue</span>
                    </button>
                  </form>

                  <div className="pt-2 text-center">
                    <a
                      href={`https://t.me/${botUsername}?start=login`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0F766E] hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>Need a code? Open @{botUsername} in Telegram</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer note inside card */}
          <div className="mt-6 pt-5 border-t border-[#E7E5E4] text-center">
            <p className="text-[11px] text-[#A8A29E]">
              Account access managed via{' '}
              <a
                href={`https://t.me/${botUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C1917] font-medium hover:underline"
              >
                @{botUsername}
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-[#A8A29E] pt-4">
        &copy; {new Date().getFullYear()} PipBud. All rights reserved.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin text-[#1C1917]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
