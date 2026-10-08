'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, FileSpreadsheet, Brain, Flame, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';

const problems = [
  {
    icon: FileSpreadsheet,
    badge: 'Friction',
    title: 'Tedious Spreadsheets & Notebooks',
    description: 'Manual Excel sheets and notebooks are painful to maintain mid-session. Over 80% of traders quit journaling within weeks, losing their historical edge data.',
    tagColor: 'text-[#F59E0B]',
    borderGlow: 'hover:border-[#F59E0B]/30',
  },
  {
    icon: Flame,
    badge: 'Psychology',
    title: 'Silent Tilt & Revenge Sizing',
    description: 'FOMO, revenge entries, and moving stop-losses happen in seconds. Trading in isolation means no one intervenes before emotion wipes out weeks of discipline.',
    tagColor: 'text-[#F43F5E]',
    borderGlow: 'hover:border-[#F43F5E]/30',
  },
  {
    icon: EyeOff,
    badge: 'Deception',
    title: 'Fake Gurus & Fabricated PnLs',
    description: 'Social feeds and trading Discords are saturated with inspected element inspect-element profits and demo flexing. Real audited track records are virtually nonexistent.',
    tagColor: 'text-[#A78BFA]',
    borderGlow: 'hover:border-[#A78BFA]/30',
  },
  {
    icon: Brain,
    badge: 'Execution',
    title: 'Invisible Risk & Strategy Leaks',
    description: 'Most traders cannot state their true Profit Factor, expectancy per setup, or max historical drawdown. Without audited analytics, you repeat the same structural mistakes.',
    tagColor: 'text-[#38BDF8]',
    borderGlow: 'hover:border-[#38BDF8]/30',
  },
];

export default function ProblemSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="problem" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] text-[#E7E9EA] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(109,40,217,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#F59E0B] mb-5 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
            <span>The Retail Trading Reality</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5"
          >
            Trading Without Audited Data is{' '}
            <span className="bg-gradient-to-r from-[#F43F5E] via-[#F59E0B] to-[#A78BFA] bg-clip-text text-transparent">
              Trading Blind.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#71767B] font-normal leading-relaxed"
          >
            95% of retail traders never fail because their technical analysis was wrong. They fail because of friction, emotional tilt, and zero objective risk accountability.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {problems.map((prob, i) => (
            <motion.div
              key={prob.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`glass-thick rounded-2xl p-6 sm:p-8 border border-white/10 ${prob.borderGlow} transition-all duration-300 relative group hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl glass-regular border border-white/14 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <prob.icon className={`w-6 h-6 ${prob.tagColor}`} />
                </div>
                <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full glass-ultrathin border border-white/10 ${prob.tagColor}`}>
                  {prob.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#DDD6FE] transition-colors">
                {prob.title}
              </h3>

              <p className="text-sm text-[#71767B] leading-relaxed font-normal">
                {prob.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition Anchor Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-violet border border-[#8B5CF6]/30 text-xs sm:text-sm text-[#DDD6FE]">
            <ShieldAlert className="w-4 h-4 text-[#A78BFA]" />
            <span>PipBud replaces chaos with instant logging and a verified meritocracy.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}