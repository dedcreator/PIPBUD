'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  RefreshCw,
  LogOut,
  BarChart3,
  MessageSquare,
  Sliders,
  ExternalLink,
  Copy,
  Check,
  KeyRound,
  Sparkles
} from 'lucide-react';
import PipbudLogo from '@/components/PipbudLogo';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams?.get('redirect') || '/journal';
  const { user, requestCode, verifyCode, loginWithTelegramWidget, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'bot' | 'widget' | 'code'>('bot');
  const [usernameInput, setUsernameInput] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
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

    // Define global callback expected by Telegram script
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
        setStatusMessage({ type: 'error', text: err.message || 'Telegram login failed.' });
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
      if (res.code) {
        setGeneratedCode(res.code);
        setCodeDigits(res.code.split(''));
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

  const copyGeneratedCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
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
              <span>Official Telegram Authentication</span>
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
              {/* Tab Selector */}
              <div className="flex bg-[#F5F5F4] p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('bot')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'bot'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  🚀 1-Tap Bot
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
                  🌐 Telegram Web
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'code'
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  🔢 6-Digit Code
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

              {/* TAB 1: 1-Tap Telegram Bot Login (Recommended & Most Reliable) */}
              {activeTab === 'bot' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-[#9A3412] font-semibold text-xs">
                      <Sparkles className="w-4 h-4 text-[#C2410C]" />
                      <span>Recommended 1-Tap Authentication</span>
                    </div>
                    <p className="text-[12px] text-[#7C2D12] leading-relaxed">
                      Tap the button below to open Telegram. <strong>@{botUsername}</strong> will instantly reply with your private 1-tap web access button.
                    </p>
                  </div>

                  <a
                    href={`https://t.me/${botUsername}?start=login`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-xl bg-[#229ED9] hover:bg-[#1E8BC0] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open @{botUsername} in Telegram</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <div className="pt-2 text-center">
                    <div className="inline-flex items-center gap-2 text-[11px] text-[#78716C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                      <span>No passwords required. Audited track record links automatically.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Official Telegram Widget OAuth */}
              {activeTab === 'widget' && (
                <div className="text-center py-4 space-y-4">
                  <div className="p-4 bg-[#F5F5F4] rounded-2xl border border-[#E7E5E4] text-xs text-[#44403C] space-y-1.5">
                    <p className="font-semibold text-[#1C1917]">
                      Direct Telegram Browser Authorization
                    </p>
                    <p className="text-[11px] text-[#78716C]">
                      Click below to sign in directly using your active Telegram web session.
                    </p>
                  </div>

                  {/* Telegram Script Container */}
                  <div className="flex justify-center min-h-[46px] items-center pt-2">
                    <div id="telegram-widget-container" className="flex justify-center"></div>
                  </div>

                  <p className="text-[11px] text-[#A8A29E]">
                    Secured by Telegram Cryptographic SHA-256 HMAC Signature.
                  </p>
                </div>
              )}

              {/* TAB 3: 6-Digit One-Time Code Input */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  {/* Generated Code Banner if code was requested */}
                  {generatedCode && (
                    <div className="p-3.5 bg-[#F0FDFA] border border-[#CCFBF1] rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#0F766E]">
                          Generated 6-Digit Code:
                        </span>
                        <button
                          type="button"
                          onClick={copyGeneratedCode}
                          className="text-[11px] text-[#0F766E] hover:underline flex items-center gap-1 font-medium"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="text-center py-1">
                        <span className="text-2xl font-mono font-bold tracking-widest text-[#134E4A]">
                          {generatedCode}
                        </span>
                      </div>
                      <div className="text-center">
                        <a
                          href={`https://t.me/${botUsername}?start=login_${generatedCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#C2410C] font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Confirm link in @{botUsername} &rarr;</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Verify Code Form */}
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-2">
                        Enter 6-Digit Verification Code
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
                      <span>Verify & Enter Workspace</span>
                    </button>
                  </form>

                  {/* Request Code Section */}
                  <div className="pt-3 border-t border-[#E7E5E4]">
                    <form onSubmit={handleRequestCode} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#78716C] mb-1">
                          Need a new code? Enter Telegram username:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="@your_username"
                            className="flex-1 h-9 px-3 rounded-lg border border-[#E7E5E4] text-xs text-[#1C1917] bg-[#FAFAF9] outline-hidden focus:border-[#C2410C]"
                          />
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="px-3 h-9 bg-[#FAFAF9] hover:bg-[#F5F5F4] border border-[#E7E5E4] rounded-lg text-xs font-semibold text-[#1C1917] transition-all disabled:opacity-50 shrink-0"
                          >
                            Generate
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer note inside card */}
          <div className="mt-6 pt-5 border-t border-[#E7E5E4] text-center">
            <p className="text-[11px] text-[#78716C]">
              New to PipBud? Start by messaging{' '}
              <a
                href={`https://t.me/${botUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2410C] font-semibold hover:underline"
              >
                @{botUsername}
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
