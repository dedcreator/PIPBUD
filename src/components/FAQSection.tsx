'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'How does the 7-level meritocracy work?',
      a: 'PipBud categorizes traders into 7 strictly audited tiers: Level 1 (Novice), Level 2 (Apprentice), Level 3 (Consistent), Level 4 (Funded Pro), Level 5 (Elite Alpha), Level 6 (Master Mentor), and Level 7 (Market Titan). Each tier requires a minimum sample of verified trades, a minimum win rate and profit factor, and strict adherence to a maximum drawdown ceiling.',
    },
    {
      q: 'What happens if I fall short of my tier’s requirements?',
      a: 'We enforce the Zero-Tolerance Anti-Shortfall Rule. If your cumulative drawdown exceeds your tier tolerance or your win rate decays over a significant sample, your Tier Health Score drops. If it hits 0%, you are automatically demoted and immediately removed from that level’s forum channels and Telegram supergroups. A public demotion entry is logged in #demotions-log to preserve 100% community legitimacy.',
    },
    {
      q: 'Can I pay money or buy access to higher tier rooms?',
      a: 'No. Never. The Pipbud Design System and core governance rule is clear: You can never pay for ratings, badges, or tier access. Every single person in #funded-floor, #elite-alpha-desk, or #mentor-sanctum has mathematically proven their execution via verified journal entries and broker statements.',
    },
    {
      q: 'How does the Telegram bot make journaling frictionless?',
      a: 'You can log trades in three natural ways: (1) upload a TradingView or MT4/5 chart screenshot; (2) speak trade details as a Telegram voice note transcribed via Groq Whisper AI; or (3) type a quick sentence like "Bought EU 1.0840 SL 1.0820 TP 1.0890 15m OB". The bot calculates the R:R, tracks confluences, and stores it in your journal.',
    },
    {
      q: 'How do I pass evaluation to reach Level 4: Funded Pro?',
      a: 'Level 4 requires at least 80 completed trades with a win rate ≥ 50%, profit factor ≥ 1.55, and a maximum drawdown strictly under 5.0%. Once verified via broker statement or prop firm certificate, the bot unlocks #funded-floor and #live-tape-reading.',
    },
    {
      q: 'Is my account balance and strategy private?',
      a: 'Yes. Your sensitive financial data (exact cash balance, broker account numbers, personal notes) is fully encrypted and private. When you share a trade card in the forum, only percentage metrics (e.g. +2.5% WIN, 1:2.50 R:R, 15m OB) and confluences are displayed.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#E7E5E4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] mb-3">
            Clear Answers. Pure Legitimacy.
          </h2>
          <p className="text-sm sm:text-base text-[#78716C]">
            Everything you need to know about the 7 tiers, the Telegram bot, and the removal protocol.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAF9] transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-[#1C1917]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#78716C] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C2410C]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#44403C] leading-relaxed border-t border-[#E7E5E4]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}