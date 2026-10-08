'use client';

import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MessageSquare, 
  Brain, 
  LineChart, 
  ShieldAlert, 
  Trophy, 
  Link2, 
  Mic, 
  Camera, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

const features = [
  {
    icon: Mic,
    badge: 'Multi-Modal',
    title: 'Voice, Screenshot & Text Logging',
    description: 'Dictate a trade while walking, drop a TradingView snapshot, or send one-line shorthand. PipBud parses lot size, pair, entry, stop, and setup tags without typing forms.',
    accent: 'text-[#A78BFA]',
    pillClass: 'border-[#A78BFA]/30 text-[#DDD6FE]',
  },
  {
    icon: Brain,
    badge: 'Intelligence',
    title: 'Pre-Trade AI Validation',
    description: 'Run any planned execution through the AI coach before pulling the trigger. It checks against your maximum daily risk tolerance, current streak, and setup win expectancy.',
    accent: 'text-[#38BDF8]',
    pillClass: 'border-[#38BDF8]/30 text-[#BAE6FD]',
  },
  {
    icon: ShieldAlert,
    badge: 'Psychology Guard',
    title: 'Tilt & Revenge Trade Interceptor',
    description: 'When consecutive losses trigger emotional sizing or rapid re-entries, PipBud flags tilt in real time and enforces cooling-off protocols to preserve account equity.',
    accent: 'text-[#F43F5E]',
    pillClass: 'border-[#F43F5E]/30 text-[#FECDD3]',
  },
  {
    icon: LineChart,
    badge: 'Web Studio',
    title: 'Liquid Glass Analytics & Reflection',
    description: 'Access app.pipbud.xyz for institutional-grade equity curves, MAE/MFE analytics, R-Multiple distributions, and our Apple Journal-style trade reflection notepad.',
    accent: 'text-[#8B5CF6]',
    pillClass: 'border-[#8B5CF6]/30 text-[#DDD6FE]',
  },
  {
    icon: Trophy,
    badge: 'Meritocracy',
    title: '7-Level Verified Forum Channels',
    description: 'Discuss setups exclusively with traders who hold your audited skill rank or higher. Every trade shared is backed by cryptographic broker logs—never hearsay.',
    accent: 'text-[#F59E0B]',
    pillClass: 'border-[#F59E0B]/30 text-[#FDE68A]',
  },
  {
    icon: Link2,
    badge: 'Broker Integration',
    title: 'MT4, MT5 & Prop Firm Read-Only Sync',
    description: 'Connect via read-only investor credentials or statement imports. PipBud automatically marks verified trades with legitimate funded account credentials.',
    accent: 'text-[#22C55E]',
    pillClass: 'border-[#22C55E]/30 text-[#BBF7D0]',
  },
];

export default function FeaturesGrid() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] text-[#E7E9EA] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(109,40,217,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#DDD6FE] mb-5 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span>Complete Feature Matrix</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5"
          >
            Engineered for Discipline.{' '}
            <span className="bg-gradient-to-r from-[#DDD6FE] via-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              Built for Execution.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#71767B] font-normal leading-relaxed"
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
              className="glass-thick rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl glass-regular border border-white/14 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <feat.icon className={`w-5 h-5 ${feat.accent}`} />
                  </div>
                  <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full glass-ultrathin border ${feat.pillClass}`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-[#DDD6FE] transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#71767B] leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/6 flex items-center justify-between text-xs text-[#71767B]">
                <span className="flex items-center gap-1.5 text-white/70 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  Active Feature
                </span>
                <a
                  href={appUrl}
                  className="inline-flex items-center gap-1 text-[#A78BFA] hover:text-white transition-colors"
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