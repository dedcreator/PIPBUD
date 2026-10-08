'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  MessageSquare, 
  LineChart, 
  ShieldAlert, 
  Trophy, 
  Link2, 
  Mic, 
  CheckCircle2, 
  ArrowRight,
  Sliders
} from 'lucide-react';

const features = [
  {
    icon: Mic,
    badge: 'Multi-Modal',
    title: 'Voice, Screenshot & Text Logging',
    description: 'Dictate a trade while walking, drop a TradingView snapshot, or send one-line shorthand. PipBud parses lot size, pair, entry, stop, and setup tags without typing forms.',
    accent: 'text-[#C2410C]',
    pillClass: 'border-[#E7E5E4] text-[#1C1917] bg-[#FAFAF9]',
  },
  {
    icon: Sliders,
    badge: 'Risk Control',
    title: 'Pre-Trade Rule Enforcement',
    description: 'Run any planned execution through your risk checklist before pulling the trigger. It validates against your max daily risk tolerance, current streak, and setup win expectancy.',
    accent: 'text-[#0F766E]',
    pillClass: 'border-[#CCFBF1] text-[#0F766E] bg-[#F0FDFA]',
  },
  {
    icon: ShieldAlert,
    badge: 'Psychology Guard',
    title: 'Tilt & Revenge Trade Interceptor',
    description: 'When consecutive losses trigger emotional sizing or rapid re-entries, PipBud flags tilt in real time and enforces cooling-off protocols to preserve account equity.',
    accent: 'text-[#B91C1C]',
    pillClass: 'border-[#FECACA] text-[#B91C1C] bg-[#FEF2F2]',
  },
  {
    icon: LineChart,
    badge: 'Web Studio',
    title: 'Trade Ledger & Execution Studio',
    description: 'Access app.pipbud.xyz for institutional-grade equity curves, MAE/MFE analytics, R-Multiple distributions, and our structured trade reflection notepad.',
    accent: 'text-[#1C1917]',
    pillClass: 'border-[#E7E5E4] text-[#1C1917] bg-[#FAFAF9]',
  },
  {
    icon: Trophy,
    badge: 'Meritocracy',
    title: '7-Level Verified Forum Channels',
    description: 'Discuss setups exclusively with traders who hold your audited skill rank or higher. Every trade shared is backed by cryptographic broker logs—never hearsay.',
    accent: 'text-[#D97706]',
    pillClass: 'border-[#FEF3C7] text-[#D97706] bg-[#FFFBEB]',
  },
  {
    icon: Link2,
    badge: 'Broker Integration',
    title: 'MT4, MT5 & Prop Firm Read-Only Sync',
    description: 'Connect via read-only investor credentials or statement imports. PipBud automatically marks verified trades with legitimate funded account credentials.',
    accent: 'text-[#15803D]',
    pillClass: 'border-[#BBF7D0] text-[#15803D] bg-[#F0FDF4]',
  },
];

export default function FeaturesGrid() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF9] text-[#1C1917] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#1C1917] mb-5 shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>Complete Feature Matrix</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15] mb-5"
          >
            Engineered for Discipline.{' '}
            <span className="text-[#C2410C]">
              Built for Execution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#78716C] font-normal leading-relaxed"
          >
            Every tool in PipBud is calibrated to remove friction between taking a trade and mastering your psychological edge.
          </motion.p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E5E4] hover:border-[#D6D3D1] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#1C1917] group-hover:scale-105 transition-transform">
                    <feat.icon className={`w-5 h-5 ${feat.accent}`} />
                  </div>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${feat.pillClass}`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mb-2.5 tracking-tight">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F5F5F4] flex items-center justify-between text-xs text-[#78716C]">
                <span className="flex items-center gap-1.5 text-[#1C1917] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                  Active Feature
                </span>
                <a
                  href={appUrl}
                  className="inline-flex items-center gap-1 text-[#C2410C] hover:text-[#9A3412] font-semibold transition-colors"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}