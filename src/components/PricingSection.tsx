'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, ArrowRight, Send } from 'lucide-react';

const plans = [
  {
    name: 'Free Explorer',
    price: '$0',
    frequency: 'forever free',
    description: 'Perfect for logging trades instantly on Telegram and building your initial audited track record.',
    popular: false,
    cardClass: 'bg-[#FAFAF9] border border-[#E7E5E4]',
    features: [
      'Unlimited Telegram trade logging via @PipBudBot',
      'Text, voice note & screenshot parsing',
      'Basic Win Rate, Profit Factor & Drawdown metrics',
      'Access to Level 1 (Market Explorer) public forum channels',
      'Full Web Journal access on app.pipbud.xyz',
    ],
    ctaText: 'Start Free on Telegram',
    ctaLink: 'https://t.me/PipBudBot',
    isExternal: true,
  },
  {
    name: 'Pro Trader',
    price: '$9',
    frequency: 'per month',
    description: 'For active traders demanding real-time risk validation, behavioral discipline guardrails, and full analytics.',
    popular: true,
    cardClass: 'bg-white border-2 border-[#1C1917] shadow-sm relative',
    features: [
      'Everything in Free Explorer',
      'Pre-trade risk enforcement & GO / NO-GO checklist validation',
      'Real-time behavioral tilt & revenge trade interceptor',
      'Institutional equity curves, MAE/MFE & session heatmaps',
      'MT4, MT5 & Prop Firm read-only investor verification sync',
      'Eligibility to unlock Level 2 - Level 7 gated forum channels*',
      'High-speed trade parsing & multi-chart attachments',
    ],
    ctaText: 'Launch Pro Workspace',
    ctaLink: 'https://app.pipbud.xyz',
    isExternal: false,
  },
];

export default function PricingSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="pricing" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white text-[#1C1917] border-t border-[#E7E5E4]">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C] mb-5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[#1C1917]" />
            <span>Transparent Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15] mb-5"
          >
            Invest in Discipline.{' '}
            <span className="text-[#C2410C]">
              Earn Your Rank.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#78716C] font-normal leading-relaxed"
          >
            Zero pay-to-win. Subscriptions unlock tooling and journal analytics; higher forum ranks can <span className="text-[#1C1917] font-semibold">only</span> be unlocked by verified broker execution.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between ${plan.cardClass} transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1C1917] text-white shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#1C1917] mb-1 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#E7E5E4]">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#78716C]">
                    / {plan.frequency}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5" />
                      <span className="text-[#44403C] font-normal leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href={plan.isExternal ? plan.ctaLink : appUrl}
                  target={plan.isExternal ? '_blank' : undefined}
                  rel={plan.isExternal ? 'noopener noreferrer' : undefined}
                  className={`w-full h-11 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-[#1C1917] text-white hover:bg-[#292524] shadow-sm'
                      : 'bg-white border border-[#E7E5E4] text-[#1C1917] hover:bg-[#F5F5F4]'
                  }`}
                >
                  {plan.isExternal ? <Send className="w-4 h-4 text-[#78716C]" /> : null}
                  <span>{plan.ctaText}</span>
                  {!plan.isExternal ? <ArrowRight className="w-4 h-4" /> : null}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note on Meritocracy */}
        <div className="text-center max-w-xl mx-auto p-4 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4] text-xs text-[#78716C]">
          <span className="font-semibold text-[#1C1917]">* The Meritocracy Rule:</span> Skill tiers (L2 through L7) require meeting trade volume, win rate, and profit factor minimums. You cannot buy your way into higher tier channels.
        </div>
      </div>
    </section>
  );
}