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
      a: 'PipBud categorizes traders into 7 strictly audited tiers: Level 1 (Market Explorer), Level 2 (Discipline Apprentice), Level 3 (Consistent Operator), Level 4 (Risk Sentinel), Level 5 (Capital Allocator), Level 6 (Market Maestro), and Level 7 (Institutional Sovereign). Each tier requires a sample of verified trades, a minimum win rate and profit factor, and strict adherence to a maximum drawdown ceiling.',
    },
    {
      q: 'What happens if I fall short of my tier’s requirements?',
      a: 'We enforce the Zero-Tolerance Anti-Shortfall Rule. If your cumulative drawdown exceeds your tier tolerance, your Tier Health Score drops. If it reaches 0%, you are automatically demoted and immediately removed from that level’s forum channels. A public demotion entry is logged in #demotions-log to preserve 100% community legitimacy.',
    },
    {
      q: 'Can I pay money or buy access to higher tier rooms?',
      a: 'No. Never. The PipBud Design System and core governance rule is clear: You can never pay for ratings, badges, or tier access. Every single person in #funded-floor, #capital-allocations, or #sovereign-sanctuary has mathematically proven their execution via verified journal entries and broker statements.',
    },
    {
      q: 'How does the Telegram bot make journaling frictionless?',
      a: 'You can log trades in three natural ways: (1) upload a TradingView or MT4/5 chart screenshot; (2) speak trade details as a Telegram voice note transcribed via Whisper AI; or (3) type a quick command like "/log Long EU 1.0840 SL 1.0820 TP 1.0890 15m OB". The bot calculates the R:R, tracks confluences, and stores it in your verified ledger.',
    },
    {
      q: 'How do I pass evaluation to reach Level 4: Risk Sentinel?',
      a: 'Level 4 requires at least 100 completed trades with a win rate ≥ 50%, Sharpe ratio > 1.25, and a maximum drawdown strictly under 5.0%. Once verified via broker statement or prop firm certificate, the bot unlocks #funded-floor and verified profile badges.',
    },
    {
      q: 'Is my account balance and personal data private?',
      a: 'Yes. Sensitive data (exact account numbers, personal notes, Telegram username) is protected by our Anti-DM Shield. When you share a trade card in the forum, only percentage metrics (e.g. +2.45R WIN, 1:2.45 R:R, 15m OB) and confluences are displayed.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#000000] text-[#E7E9EA] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#A78BFA] mb-4">
            <HelpCircle className="w-4 h-4 text-[#A78BFA]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Clear Answers. Pure Legitimacy.
          </h2>
          <p className="text-sm sm:text-base text-[#71767B]">
            Everything you need to know about the 7 tiers, the Telegram bot, and the removal protocol.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all duration-200 border cursor-pointer ${
                  isOpen
                    ? 'glass-violet border-[#8B5CF6]/50 shadow-lg'
                    : 'glass-regular border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A78BFA] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#71767B] leading-relaxed border-t border-white/8">
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