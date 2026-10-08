'use client';

import { motion } from 'framer-motion';
import { Send, Trophy, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    icon: Send,
    title: 'Sub-Second Logging',
    subtitle: 'Telegram-First Speed',
    description: 'Send voice notes, chart screenshots, or standard syntax to @PipBudBot. Automated telemetry parsers extract entry, stop, target, and risk in under 2 seconds.',
    accent: 'text-[#C2410C]',
  },
  {
    icon: ShieldCheck,
    title: 'Execution Guardrails',
    subtitle: 'Pre-Trade & Post-Trade Risk Rules',
    description: 'Get immediate enforcement on maximum risk parameters, daily drawdown thresholds, and strategy rules before pulling the trigger on any setup.',
    accent: 'text-[#0F766E]',
  },
  {
    icon: Trophy,
    title: '7 Skill Levels',
    subtitle: 'Gated Trader Channels',
    description: 'From L1 Market Explorer to L7 Sovereign. Every single member in your channel has earned their seat through audited broker execution.',
    accent: 'text-[#D97706]',
  },
  {
    icon: CheckCircle2,
    title: 'Anti-Shortfall Protocol',
    subtitle: 'Automated Integrity Engine',
    description: 'Breach max drawdown or dip below required win-rate tolerances, and you are automatically demoted. Zero fake gurus, zero photoshopped PnLs.',
    accent: 'text-[#15803D]',
  },
];

const highlights = [
  { value: '< 2s', label: 'Average Log Speed', desc: 'Voice, screenshot, or text' },
  { value: '100%', label: 'Audited Trades', desc: 'Cryptographically verified' },
  { value: '7 Tiers', label: 'Skill Meritocracy', desc: 'Never bought, only earned' },
  { value: 'Zero', label: 'Paid Gurus', desc: 'Integrity by mathematical code' },
];

export default function SolutionSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="solution" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF9] text-[#1C1917] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#C2410C] mb-5 shadow-2xs"
          >
            <Zap className="w-4 h-4 text-[#C2410C]" />
            <span>The PipBud Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15] mb-5"
          >
            The Trading Operating System for{' '}
            <span className="text-[#C2410C]">
              Disciplined Capital.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#78716C] font-normal leading-relaxed"
          >
            PipBud pairs zero-friction Telegram trade journaling with an unforgiving 7-tier meritocracy that eliminates noise and proves your trading edge.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-[#E7E5E4] shadow-xs transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#D6D3D1]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <pillar.icon className={`w-6 h-6 ${pillar.accent}`} />
                </div>

                <div className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider mb-1">
                  {pillar.subtitle}
                </div>

                <h3 className="text-lg font-bold text-[#1C1917] mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl bg-white border border-[#E7E5E4] shadow-xs mb-14"
        >
          {highlights.map((item) => (
            <div key={item.label} className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight mb-1 font-mono">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-[#44403C] mb-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-[#78716C]">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action Link */}
        <div className="text-center">
          <a
            href={appUrl}
            className="btn-primary h-12 px-8 text-sm font-semibold rounded-full inline-flex items-center gap-2 shadow-xs"
          >
            <span>Explore App Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}