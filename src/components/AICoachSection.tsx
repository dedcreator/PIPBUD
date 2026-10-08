'use client';

import { motion } from 'framer-motion';
import { Brain, Bot, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Clock, Zap, ArrowRight, MessageSquare } from 'lucide-react';

export default function AICoachSection() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <section id="ai-coach" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] text-[#E7E9EA] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Story & Benefits */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-ultrathin border border-white/14 text-[#38BDF8] mb-5 shadow-sm"
            >
              <Brain className="w-4 h-4 text-[#38BDF8]" />
              <span>24/7 AI Trading Partner</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-5"
            >
              Your Personal Hedge Fund Risk Manager,{' '}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#A78BFA] to-[#8B5CF6] bg-clip-text text-transparent">
                Always Awake.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-[#71767B] font-normal leading-relaxed mb-8"
            >
              Most traders repeat the same errors because nobody questions their impulses. PipBud acts as an objective, emotionless audit layer that evaluates your plan before your capital enters the market.
            </motion.p>

            {/* Checklist */}
            <div className="space-y-4 mb-8">
              {[
                { title: 'Pre-Trade GO / NO-GO Checks', desc: 'Validates risk-reward ratio, economic news windows, and daily loss caps.' },
                { title: 'Multi-Modal Voice & Screenshot Parsing', desc: 'Analyzes candlestick charts, TradingView links, and spoken trade rationale.' },
                { title: 'Subconscious Tilt Interception', desc: 'Flags revenge sizing and rapid re-entries before accounts blow up.' },
                { title: 'Historical Edge Attribution', desc: 'Identifies which pairs and sessions generate 80% of your real profits.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-lg glass-regular border border-white/14 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-[#71767B] font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={appUrl}
                className="btn-primary h-11 px-7 text-xs sm:text-sm font-semibold rounded-full inline-flex items-center justify-center gap-2"
              >
                <span>Try AI Coach in App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/PipBudBot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-11 px-6 text-xs sm:text-sm font-medium rounded-full inline-flex items-center justify-center gap-2"
              >
                <Bot className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Test in @PipBudBot</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Liquid Glass AI Dialogue Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-thick rounded-3xl p-6 sm:p-7 border border-white/14 shadow-[0_16px_48px_rgba(0,0,0,0.8)] relative"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/8 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-violet flex items-center justify-center text-[#A78BFA]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>PipBud AI Coach</span>
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    </div>
                    <div className="text-[11px] text-[#71767B]">xAI Grok & Llama Engine • Active</div>
                  </div>
                </div>
                <div className="text-[11px] font-mono px-2.5 py-1 rounded-full glass-ultrathin border border-white/10 text-[#22C55E]">
                  RISK: OPTIMAL
                </div>
              </div>

              {/* Chat Dialogue Bubbles */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Trader Message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm p-4 glass-violet border border-[#8B5CF6]/30 text-white">
                    <div className="text-[10px] text-[#DDD6FE] uppercase font-bold mb-1 tracking-wider">
                      Trader • EURUSD Long Setup
                    </div>
                    <p className="leading-relaxed">
                      "Going Long EURUSD at 1.0845. Stop loss at 1.0825 (20 pips), Target at 1.0905 (60 pips). 1.5 lots. London Open liquidity sweep confirmed."
                    </p>
                  </div>
                </div>

                {/* AI Coach Response */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg glass-regular flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#A78BFA]" />
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm p-4.5 glass-regular border border-white/12 text-[#E7E9EA]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        GO SIGNAL • GRADE A SETUP
                      </span>
                      <span className="text-[10px] text-[#71767B] font-mono">1:3.0 R:R</span>
                    </div>

                    <p className="text-xs text-[#E7E9EA] leading-relaxed mb-3">
                      Risk exposure is <span className="text-white font-semibold">$300 (0.6% equity)</span>, comfortably under your 1.5% rule. Setup adheres to your historical London sweep playbook (68% win-rate on 42 audited trades).
                    </p>

                    {/* Metrics Badge Row */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/8 text-center text-[10px]">
                      <div className="p-1.5 rounded-lg glass-ultrathin">
                        <div className="text-[#71767B]">Tilt Risk</div>
                        <div className="font-semibold text-[#22C55E]">0.0%</div>
                      </div>
                      <div className="p-1.5 rounded-lg glass-ultrathin">
                        <div className="text-[#71767B]">Expectancy</div>
                        <div className="font-semibold text-white">+1.48 R</div>
                      </div>
                      <div className="p-1.5 rounded-lg glass-ultrathin">
                        <div className="text-[#71767B]">Tier Health</div>
                        <div className="font-semibold text-[#A78BFA]">100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3.5 border-t border-white/8 flex items-center justify-between text-[11px] text-[#71767B]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                  Audited in 0.4s
                </span>
                <span>Powered by PipBud Neural Core</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}