'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Zap, Shield, ArrowRight, Send, Lock } from 'lucide-react';

const plans = [
  {
    name: 'Free Explorer',
    price: '$0',
    frequency: 'forever free',
    description: 'Perfect for logging trades instantly on Telegram and building your initial audited track record.',
    popular: false,
    cardClass: 'glass-thick border border-white/10 hover:border-white/20',
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
    price: '$29',
    frequency: 'per month',
    description: 'For active traders demanding real-time AI coaching, behavioral tilt intervention, and full analytics.',
    popular: true,
    cardClass: 'glass-violet border border-[#8B5CF6]/40 shadow-[0_8px_32px_rgba(139,92,246,0.25)] relative',
    features: [
      'Everything in Free Explorer',
      'Unlimited 24/7 AI Coach GO / NO-GO trade audits',
      'Real-time behavioral tilt & revenge trade interceptor',
      'Institutional equity curves, MAE/MFE & session heatmaps',
      'MT4, MT5 & Prop Firm read-only investor verification sync',
      'Eligibility to unlock Level 2 - Level 7 gated forum channels*',
      'Priority multi-model NLP & chart vision inference',
    ],
    ctaText: 'Launch Pro Workspace',
    ctaLink: 'https://app.pipbud.xyz',
    isExternal: false,
  },
];

export default function PricingSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="pricing" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] text-[#E7E9EA] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[radial-gradient(circle,rgba(109,40,217,0.14)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#DDD6FE] mb-5 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span>Transparent Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5"
          >
            Invest in Discipline.{' '}
            <span className="bg-gradient-to-r from-[#DDD6FE] via-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              Earn Your Rank.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#71767B] font-normal leading-relaxed"
          >
            Zero pay-to-win. Subscriptions unlock tooling and AI compute; higher forum ranks can <span className="text-white font-semibold">only</span> be unlocked by verified broker execution.
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
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between ${plan.cardClass} transition-all duration-300 hover:-translate-y-1`}
            >
              <div>
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#8B5CF6] text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#71767B] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[#71767B]">
                    / {plan.frequency}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="text-[#E7E9EA] font-normal leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href={plan.isExternal ? plan.ctaLink : appUrl}
                  target={plan.isExternal ? '_blank' : undefined}
                  rel={plan.isExternal ? 'noopener noreferrer' : undefined}
                  className={`w-full h-12 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'btn-primary shadow-[0_4px_24px_rgba(139,92,246,0.4)]'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.isExternal ? <Send className="w-4 h-4 text-[#A78BFA]" /> : null}
                  <span>{plan.ctaText}</span>
                  {!plan.isExternal ? <ArrowRight className="w-4 h-4" /> : null}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note on Meritocracy */}
        <div className="text-center max-w-xl mx-auto p-4 rounded-2xl glass-ultrathin border border-white/8 text-xs text-[#71767B]">
          <span className="font-semibold text-[#DDD6FE]">* The Meritocracy Rule:</span> Skill tiers (L2 through L7) require meeting trade volume, win rate, and profit factor minimums. You cannot buy your way into higher tier channels.
        </div>
      </div>
    </section>
  );
}