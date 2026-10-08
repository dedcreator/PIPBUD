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
  Zap,
  ArrowRight
} from 'lucide-react';

export default function TelegramBotSection() {
  const loggingMethods = [
    {
      icon: Camera,
      title: 'Screenshot OCR',
      desc: 'Send any TradingView or MetaTrader chart capture. Our OCR extracts price levels, pair, and timeframe automatically in seconds.',
    },
    {
      icon: Mic,
      title: 'Fast Voice Notes',
      desc: 'Speak trade setups on the go: "Short Gold at 2650, stop 2660, target 2620 on 15m liquidity grab." Transcribed and parsed instantly.',
    },
    {
      icon: MessageSquare,
      title: 'Conversational Text',
      desc: 'Type naturally: "Long EU 1.0840 SL 1.0820 TP 1.0890 15m OB". The bot handles the math, R:R calculation, and ledger entry.',
    },
    {
      icon: Brain,
      title: 'Pre-Trade Checklists',
      desc: 'Type /coach validate before entry. Get Go/No-Go confluence checklists, risk sizing, and economic news alert overlays.',
    },
  ];

  return (
    <section id="bot" className="py-20 md:py-28 bg-[#000000] text-[#E7E9EA] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#A78BFA] mb-4">
            <Zap className="w-4 h-4 text-[#A78BFA]" />
            <span>Zero-Friction Logging Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            The Journal on Telegram. Always With You.
          </h2>
          <p className="text-base sm:text-lg text-[#71767B]">
            Traders fail at journaling because spreadsheets and bulky portals are slow. PipBud sits inside Telegram — where you already communicate every day.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {loggingMethods.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="glass-regular p-6 rounded-3xl border border-white/12 space-y-3.5 hover:border-[#8B5CF6]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl glass-violet text-[#A78BFA] flex items-center justify-center border border-[#8B5CF6]/40">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">{m.title}</h3>
                <p className="text-xs text-[#71767B] leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Telegram Bot Simulator */}
        <div className="max-w-xl mx-auto glass-thick rounded-3xl border border-white/18 p-6 sm:p-7 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl glass-violet text-[#A78BFA] flex items-center justify-center border border-[#8B5CF6]/40">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">@PipBudBot</h4>
                <p className="text-[11px] text-[#22C55E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  Bot active • Ready to log
                </p>
              </div>
            </div>
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-3.5 py-1.5 text-xs font-semibold rounded-full"
            >
              <span>Open Bot</span>
            </a>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-end">
              <div className="p-3 rounded-2xl bg-[#8B5CF6]/25 border border-[#8B5CF6]/40 text-[#DDD6FE] max-w-[85%]">
                Short XAUUSD 2650.50 SL 2660 TP 2620 Risk 0.5%
              </div>
            </div>

            <div className="flex justify-start">
              <div className="p-3.5 rounded-2xl bg-[#101012] border border-white/12 text-white max-w-[90%] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#22C55E] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Trade Logged • Ticket #8924103</span>
                </div>
                <div className="text-[11px] text-[#71767B] leading-relaxed">
                  Pair: XAU/USD (SHORT)<br />
                  Entry: 2650.50 | SL: 2660.00 | TP: 2620.00<br />
                  Planned R:R: 1 : 3.20<br />
                  Tier Health: 96% (Safe)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
