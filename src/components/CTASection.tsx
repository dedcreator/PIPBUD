'use client';

import Link from 'next/link';
import { Send, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E7E5E4] relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-[#FFEDD5]/40 via-[#FFF7ED]/30 to-[#FED7AA]/30 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1] mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Join Over 3,100 Verified Traders</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-6 leading-tight">
          Ready to Prove You&apos;re Legit?
        </h2>

        <p className="text-base sm:text-lg text-[#44403C] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Start logging on Telegram in under 30 seconds. No card required. Build your audited track record, climb the 7 skill tiers, and unlock exclusive high-conviction rooms.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <a
            href="https://t.me/PipBudBot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-8 bg-[#C2410C] hover:bg-[#EA580C] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow inline-flex items-center justify-center gap-2.5 text-base active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Launch @PipBudBot</span>
          </a>

          <Link
            href="/forum"
            className="w-full sm:w-auto h-12 px-6 bg-white hover:bg-[#FFF7ED] border border-[#C2410C] text-[#C2410C] font-medium rounded-xl transition-all inline-flex items-center justify-center gap-2 text-base active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enter The 7-Tier Forum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-xs text-[#78716C]">
          Continuous Anti-Shortfall Protocol active • Automatic removal on drawdown breach
        </p>
      </div>
    </section>
  );
}