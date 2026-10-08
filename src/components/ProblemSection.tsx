'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, FileSpreadsheet, Flame, EyeOff, ShieldAlert, Brain } from 'lucide-react';

const problems = [
  {
    icon: FileSpreadsheet,
    badge: 'Friction',
    title: 'Tedious Spreadsheets & Notebooks',
    description: 'Manual Excel sheets and notebooks are painful to maintain mid-session. Over 80% of traders quit journaling within weeks, losing their historical edge data.',
    tagColor: 'text-[#D97706]',
  },
  {
    icon: Flame,
    badge: 'Psychology',
    title: 'Silent Tilt & Revenge Sizing',
    description: 'FOMO, revenge entries, and moving stop-losses happen in seconds. Trading in isolation means no one intervenes before emotion wipes out weeks of discipline.',
    tagColor: 'text-[#B91C1C]',
  },
  {
    icon: EyeOff,
    badge: 'Deception',
    title: 'Fake Gurus & Fabricated PnLs',
    description: 'Social feeds and trading Discords are saturated with inspect-element profits and demo flexing. Real audited track records are virtually nonexistent.',
    tagColor: 'text-[#C2410C]',
  },
  {
    icon: Brain,
    badge: 'Execution',
    title: 'Invisible Risk & Strategy Leaks',
    description: 'Most traders cannot state their true Profit Factor, expectancy per setup, or max historical drawdown. Without audited analytics, you repeat the same structural mistakes.',
    tagColor: 'text-[#0F766E]',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF9] text-[#1C1917] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#D97706] mb-5 shadow-2xs"
          >
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
            <span>The Retail Trading Reality</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15] mb-5"
          >
            Trading Without Audited Data is{' '}
            <span className="text-[#B91C1C]">
              Trading Blind.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#78716C] font-normal leading-relaxed"
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
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E5E4] shadow-xs transition-all duration-300 relative group hover:-translate-y-1 hover:border-[#D6D3D1]"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#1C1917] group-hover:scale-105 transition-transform">
                  <prob.icon className={`w-6 h-6 ${prob.tagColor}`} />
                </div>

                <span className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] ${prob.tagColor}`}>
                  {prob.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] mb-2 tracking-tight">
                {prob.title}
              </h3>

              <p className="text-sm text-[#78716C] leading-relaxed font-normal">
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
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#E7E5E4] text-xs sm:text-sm text-[#1C1917] shadow-2xs">
            <ShieldAlert className="w-4 h-4 text-[#C2410C]" />
            <span>PipBud replaces chaos with instant logging and a verified meritocracy.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}