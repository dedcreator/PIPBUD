'use client';

import { motion } from 'framer-motion';
import { Send, Camera, Brain, Trophy, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Send,
    title: 'Open Telegram or Web App',
    badge: 'Instant Setup',
    description: 'Launch @PipBudBot on Telegram or sign in at app.pipbud.xyz. Zero lengthy onboarding forms or credit card hurdles.',
    accent: 'text-[#8B5CF6]',
  },
  {
    icon: Camera,
    step: '02',
    title: 'Log Trades in Under 2 Seconds',
    badge: 'Multi-Modal',
    description: 'Dictate a voice note, forward a chart screenshot, or send standard text syntax. PipBud parses lot size, pair, risk, and setup tags automatically.',
    accent: 'text-[#38BDF8]',
  },
  {
    icon: Brain,
    step: '03',
    title: 'AI Audits & Logs Real Edge',
    badge: 'Neural Engine',
    description: 'PipBud calculates your Win Rate, Profit Factor, Expectancy, and Max Drawdown against real broker data. Get real-time tilt interventions.',
    accent: 'text-[#A78BFA]',
  },
  {
    icon: Trophy,
    step: '04',
    title: 'Ascend the 7-Tier Meritocracy',
    badge: 'Legitimacy',
    description: 'Maintain strict risk tolerances to unlock higher skill tier channels. Fall short of your tier’s discipline limits, and you are automatically relegated.',
    accent: 'text-[#22C55E]',
  },
];

export default function HowItWorks() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] text-[#E7E9EA] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(circle,rgba(109,40,217,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#DDD6FE] mb-5 shadow-sm"
          >
            <Zap className="w-4 h-4 text-[#A78BFA]" />
            <span>Workflow & Ascent</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5"
          >
            From First Trade to{' '}
            <span className="bg-gradient-to-r from-[#DDD6FE] via-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
              Verified Sovereign.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#71767B] font-normal leading-relaxed"
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
              className="glass-thick rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative group flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl glass-regular border border-white/14 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <step.icon className={`w-5 h-5 ${step.accent}`} />
                  </div>
                  <span className="text-xl font-extrabold text-white/20 font-mono group-hover:text-white/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full glass-ultrathin border border-white/10 text-[#DDD6FE] inline-block mb-3">
                  {step.badge}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-[#DDD6FE] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#71767B] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-white/6 flex items-center gap-1.5 text-[11px] text-[#22C55E]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Automated Execution</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="glass-violet rounded-3xl p-8 sm:p-10 border border-[#8B5CF6]/30 text-center max-w-3xl mx-auto shadow-[0_8px_32px_rgba(139,92,246,0.2)]"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Start Your Audited Record Today
          </h3>
          <p className="text-xs sm:text-sm text-[#DDD6FE] max-w-xl mx-auto mb-6 leading-relaxed">
            Every trade you log builds your verifiable track record. Free to start, no credit card required, instant Telegram bot deployment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-11 px-7 btn-primary text-xs sm:text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Launch @PipBudBot</span>
            </a>
            <a
              href={appUrl}
              className="w-full sm:w-auto h-11 px-7 btn-secondary text-xs sm:text-sm font-medium rounded-full inline-flex items-center justify-center gap-2"
            >
              <span>Open Web Studio</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}