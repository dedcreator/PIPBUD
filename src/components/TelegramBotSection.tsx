'use client';

import {
  Send,
  Camera,
  Mic,
  Brain,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  FileCheck2,
  Zap
} from 'lucide-react';

export default function TelegramBotSection() {
  const loggingMethods = [
    {
      icon: Camera,
      title: 'Screenshot Logging',
      desc: 'Send any TradingView or MetaTrader chart screenshot. Our computer vision extracts price levels, pair, and timeframe in seconds.',
    },
    {
      icon: Mic,
      title: 'Fast Voice Notes',
      desc: 'Speak trade setups on the go: "Short Gold at 2650, stop 2660, target 2620 on 15m liquidity grab." Transcribed instantly via Whisper AI.',
    },
    {
      icon: MessageSquare,
      title: 'Conversational Text',
      desc: 'Type naturally: "Long EU 1.0840 SL 1.0820 TP 1.0890 15m OB". The bot handles the math, R:R calculation, and ledger entry.',
    },
    {
      icon: Brain,
      title: 'Pre-Trade AI Validation',
      desc: 'Type /coach validate before entry. Get Go/No-Go recommendations, confluence checklists, risk sizing, and economic news alerts.',
    },
  ];

  return (
    <section id="bot-features" className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFEDD5] text-[#C2410C] mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Zero-Friction Logging Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            The Journal on Telegram. Always With You.
          </h2>
          <p className="text-base sm:text-lg text-[#44403C]">
            Traders fail at journaling because spreadsheets and bulky web portals are slow. PipBud sits inside Telegram — where you already communicate every day.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {loggingMethods.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E7E5E4] hover:border-[#FED7AA] hover:shadow-sm transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#1C1917]">{m.title}</h3>
                <p className="text-xs text-[#78716C] leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bot Command Suite Reference */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E5E4] shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E7E5E4]">
            <div>
              <h3 className="text-xl font-bold text-[#1C1917] mb-1">
                The Telegram Bot Command Palette
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C]">
                Control your journal, check your tier health, and audit your records with instant commands.
              </p>
            </div>
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-5 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-medium inline-flex items-center gap-2 shrink-0 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Open @PipBudBot</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
              <span className="font-mono font-bold text-[#C2410C] block mb-1">/tier</span>
              <p className="text-[#78716C] text-[11px]">View verified skill level, tier health score, and distance to promotion.</p>
            </div>
            <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
              <span className="font-mono font-bold text-[#C2410C] block mb-1">/audit</span>
              <p className="text-[#78716C] text-[11px]">Run live performance evaluation and sync your forum channel permissions.</p>
            </div>
            <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
              <span className="font-mono font-bold text-[#C2410C] block mb-1">/coach validate</span>
              <p className="text-[#78716C] text-[11px]">Deep pre-trade AI analysis with reasons FOR, reasons AGAINST, and R:R.</p>
            </div>
            <div className="p-3 bg-[#FAFAF9] rounded-xl border border-[#E7E5E4]">
              <span className="font-mono font-bold text-[#C2410C] block mb-1">/stats</span>
              <p className="text-[#78716C] text-[11px]">30-day win rate, profit factor, setup performance, and average R:R.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
