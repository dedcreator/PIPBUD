'use client';

import { motion } from 'framer-motion';
import { Send, Camera, Trophy, ArrowRight, ShieldCheck, Zap, Sliders } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Send,
    title: 'Open Telegram or Web App',
    badge: 'Instant Setup',
    description: 'Launch @PipBudBot on Telegram or sign in at app.pipbud.xyz. Zero lengthy onboarding forms or credit card hurdles.',
    accent: 'text-[#C2410C]',
  },
  {
    icon: Camera,
    step: '02',
    title: 'Log Trades in Under 2 Seconds',
    badge: 'Multi-Modal',
    description: 'Dictate a voice note, forward a chart screenshot, or send standard text syntax. PipBud parses lot size, pair, risk, and setup tags automatically.',
    accent: 'text-[#0F766E]',
  },
  {
    icon: Sliders,
    step: '03',
    title: 'Audits & Logs Verified Edge',
    badge: 'Telemetry Engine',
    description: 'PipBud calculates your Win Rate, Profit Factor, Expectancy, and Max Drawdown against real broker data. Get real-time tilt interventions.',
    accent: 'text-[#1C1917]',
  },
  {
    icon: Trophy,
    step: '04',
    title: 'Ascend the 7-Tier Meritocracy',
    badge: 'Legitimacy',
    description: 'Maintain strict risk tolerances to unlock higher skill tier channels. Fall short of your tier’s discipline limits, and you are automatically relegated.',
    accent: 'text-[#15803D]',
  },
];

export default function HowItWorks() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF9] text-[#1C1917] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E7E5E4] text-[#1C1917] mb-5 shadow-2xs"
          >
            <Zap className="w-4 h-4 text-[#C2410C]" />
            <span>Workflow & Ascent</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15] mb-5"
          >
            From First Trade to{' '}
            <span className="text-[#C2410C]">
              Verified Sovereign.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#78716C] font-normal leading-relaxed"
          >
            How serious traders build their track record, eliminate emotional blind spots, and earn their place among verified peers.
          </motion.p>
        </div>

        {/* 4 Steps Horizontal / Grid Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-3xl p-6 border border-[#E7E5E4] hover:border-[#D6D3D1] transition-all duration-300 relative group flex flex-col justify-between hover:-translate-y-1 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#1C1917] group-hover:scale-105 transition-transform">
                    <step.icon className={`w-5 h-5 ${step.accent}`} />
                  </div>
                  <span className="text-xl font-bold font-mono text-[#D6D3D1] group-hover:text-[#1C1917] transition-colors">
                    {step.step}
                  </span>
                </div>

                <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[#78716C] inline-block mb-2">
                  {step.badge}
                </span>

                <h3 className="text-base font-bold text-[#1C1917] mb-2 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={appUrl}
            className="btn-primary h-12 px-8 text-sm font-semibold rounded-full inline-flex items-center gap-2 shadow-xs"
          >
            <span>Launch App Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}