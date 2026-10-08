'use client';

import { motion } from 'framer-motion';
import { Send, Brain, Trophy, ShieldCheck, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react';

const pillars = [
  {
    icon: Send,
    title: 'Sub-Second Logging',
    subtitle: 'Telegram-First Speed',
    description: 'Send a voice note, chart screenshot, or raw command to @PipBudBot. AI vision and NLP parse entry, stop, target, and risk in under 2 seconds.',
    accent: 'text-[#8B5CF6]',
    borderHover: 'hover:border-[#8B5CF6]/40',
  },
  {
    icon: Brain,
    title: 'AI Trade Audits',
    subtitle: 'Pre-Trade & Post-Trade Guard',
    description: 'Get immediate feedback on emotional tilt, revenge tendencies, or oversized risk before entering. AI checks historical setup edge in real-time.',
    accent: 'text-[#38BDF8]',
    borderHover: 'hover:border-[#38BDF8]/40',
  },
  {
    icon: Trophy,
    title: '7 Skill Levels',
    subtitle: 'Gated Trader Channels',
    description: 'From L1 Market Explorer to L7 Sovereign. Every single member in your channel has earned their seat through audited broker execution.',
    accent: 'text-[#F59E0B]',
    borderHover: 'hover:border-[#F59E0B]/40',
  },
  {
    icon: ShieldCheck,
    title: 'Anti-Shortfall Protocol',
    subtitle: 'Automated Integrity Engine',
    description: 'Breach max drawdown or dip below required win-rate tolerances, and you are automatically demoted. Zero fake gurus, zero photoshopped PnLs.',
    accent: 'text-[#22C55E]',
    borderHover: 'hover:border-[#22C55E]/40',
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
    <section id="solution" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] text-[#E7E9EA] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.14)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#A78BFA] mb-5 shadow-sm"
          >
            <Zap className="w-4 h-4 text-[#A78BFA]" />
            <span>The PipBud Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5"
          >
            The Trading Operating System for{' '}
            <span className="bg-gradient-to-r from-[#DDD6FE] via-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              Disciplined Capital.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#71767B] font-normal leading-relaxed"
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
              className={`glass-thick rounded-2xl p-6 border border-white/10 ${pillar.borderHover} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl glass-regular border border-white/14 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <pillar.icon className={`w-6 h-6 ${pillar.accent}`} />
                </div>

                <div className="text-[11px] font-semibold text-[#71767B] uppercase tracking-wider mb-1">
                  {pillar.subtitle}
                </div>

                <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-[#DDD6FE] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#71767B] leading-relaxed font-normal">
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl glass-regular border border-white/10 mb-14"
        >
          {highlights.map((item) => (
            <div key={item.label} className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-[#DDD6FE] mb-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-[#71767B]">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Action Link */}
        <div className="text-center">
          <a
            href={appUrl}
            className="btn-primary h-12 px-8 text-sm font-semibold rounded-full inline-flex items-center gap-2 shadow-[0_4px_24px_rgba(139,92,246,0.35)]"
          >
            <span>Explore App Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}