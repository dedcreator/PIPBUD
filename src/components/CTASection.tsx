'use client';

import { Send, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CTASection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section className="py-20 md:py-28 bg-[#000000] text-[#E7E9EA] border-t border-white/10 relative overflow-hidden">
      {/* Aurora radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,rgba(46,16,101,0.08)_50%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#A78BFA] mb-6">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>Join Over 3,100 Verified Traders</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ready to Prove You&apos;re Legit?
        </h2>

        <p className="text-base sm:text-lg text-[#71767B] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Start logging on Telegram in under 30 seconds. No credit card required. Build your audited track record, climb the 7 skill tiers, and unlock exclusive high-conviction rooms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-8">
          <a
            href={appUrl}
            className="w-full sm:w-auto h-12 px-8 btn-primary text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(139,92,246,0.4)]"
          >
            <span>Launch App Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-7 btn-secondary text-sm font-medium rounded-full inline-flex items-center justify-center gap-2.5"
          >
            <Send className="w-4 h-4 text-[#A78BFA]" />
            <span>Launch @PipBudBot</span>
          </a>
        </div>

        <p className="text-xs text-[#71767B]">
          Continuous Anti-Shortfall Protocol active • Automatic removal on drawdown breach
        </p>
      </div>
    </section>
  );
}