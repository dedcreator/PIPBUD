'use client';

import { motion } from 'framer-motion';
import { Brain, BarChart3, Shield, Zap, Bot, MessageCircle, Target, Eye, Camera, LineChart, TrendingUp, Clock, ArrowRight } from 'lucide-react';

interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
  lightColor: string;
  iconBg: string;
  iconColor: string;
  badge: string;
}

interface VisualMockupProps {
  type: 'analytics' | 'coach' | 'psychology' | 'default';
}

const features: Feature[] = [
  {
    icon: MessageCircle,
    title: 'Log Trades Instantly',
    description: 'Send screenshots, voice notes, or text to Telegram. PipBud parses everything automatically using AI.',
    color: 'from-purple-500 to-purple-700',
    lightColor: 'from-purple-50 to-purple-100/30',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badge: 'AI-Powered',
  },
  {
    icon: Brain,
    title: 'AI Trade Coach',
    description: 'Get GO/NO-GO signals before entering trades. AI validates against your strategy and historical patterns.',
    color: 'from-blue-500 to-blue-700',
    lightColor: 'from-blue-50 to-blue-100/30',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: 'Real-time',
  },
  {
    icon: Eye,
    title: 'Psychology Detection',
    description: 'AI detects tilt, revenge trading, FOMO, and overtrading. Get warnings before you make emotional decisions.',
    color: 'from-rose-500 to-rose-700',
    lightColor: 'from-rose-50 to-rose-100/30',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    badge: 'Behavioral',
  },
  {
    icon: BarChart3,
    title: 'Visual Analytics',
    description: 'Beautiful charts: equity curves, heatmaps, win rates, setup distribution. See your edge clearly.',
    color: 'from-emerald-500 to-emerald-700',
    lightColor: 'from-emerald-50 to-emerald-100/30',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    badge: 'Professional',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Kelly Criterion position sizing, daily loss limits, drawdown alerts. Protect your capital.',
    color: 'from-amber-500 to-amber-700',
    lightColor: 'from-amber-50 to-amber-100/30',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badge: 'Protection',
  },
  {
    icon: Bot,
    title: 'Auto Trade Import',
    description: 'Connect MT5, Binance, or upload broker statements. Trades auto-populate your journal.',
    color: 'from-cyan-500 to-cyan-700',
    lightColor: 'from-cyan-50 to-cyan-100/30',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    badge: 'Integration',
  },
];

// Mock visual components for demo
const VisualMockup = ({ type }: VisualMockupProps) => {
  if (type === 'analytics') {
    return (
      <div className="relative w-full h-48 bg-gradient-to-br from-purple-50/80 to-purple-100/30 rounded-xl overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-xs font-medium text-purple-600">Equity Curve</div>
              <div className="text-lg font-bold text-[#1a1410]">+24.7%</div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <div className="w-2 h-2 rounded-full bg-purple-300" />
              <div className="w-2 h-2 rounded-full bg-purple-200" />
            </div>
          </div>
          <div className="relative h-20">
            <svg className="w-full h-full" viewBox="0 0 200 80">
              <path d="M0 60 L20 55 L40 40 L60 45 L80 30 L100 35 L120 20 L140 25 L160 15 L180 20 L200 10" 
                stroke="#7C3AED" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M0 60 L20 55 L40 40 L60 45 L80 30 L100 35 L120 20 L140 25 L160 15 L180 20 L200 10" 
                stroke="url(#grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-between text-[8px] text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'coach') {
    return (
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-50/80 to-blue-100/30 rounded-xl overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Brain className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-blue-600">AI Coach</div>
              <div className="text-sm font-semibold text-[#1a1410]">Trade Analysis</div>
            </div>
            <div className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-medium rounded-full">
              GO Signal
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="font-medium">Entry:</span>
              <span>$1.2456</span>
              <span className="text-gray-400">•</span>
              <span className="font-medium">Confidence:</span>
              <span className="text-green-600 font-semibold">87%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1 font-light">
              Stop Loss: $1.2380 • Take Profit: $1.2580
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'psychology') {
    return (
      <div className="relative w-full h-48 bg-gradient-to-br from-rose-50/80 to-rose-100/30 rounded-xl overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
              <Eye className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-rose-600">Psychology Monitor</div>
              <div className="text-sm font-semibold text-[#1a1410]">Emotional State</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2">
              <div className="text-[10px] text-gray-500 font-light">Stress Level</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-amber-400 rounded-full" />
                </div>
                <span className="text-xs font-medium text-amber-600">75%</span>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2">
              <div className="text-[10px] text-gray-500 font-light">Risk of Tilt</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-green-400 rounded-full" />
                </div>
                <span className="text-xs font-medium text-green-600">25%</span>
              </div>
            </div>
          </div>
          <div className="mt-2 px-3 py-1.5 bg-rose-50/80 border border-rose-200/30 rounded-lg text-xs text-rose-700 font-light">
            ⚠️ FOMO detected - Stick to your strategy
          </div>
        </div>
      </div>
    );
  }

  // Default visual
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-purple-50/80 to-purple-100/30 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-sm font-medium text-purple-600">Interactive Demo</div>
          <div className="text-xs text-gray-400 font-light">Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative py-28 px-4 overflow-hidden bg-[#fcf9f6]">
      {/* Paper texture */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/20 via-blue-100/10 to-transparent rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-50/20 via-emerald-100/10 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-100/50 rounded-full px-5 py-2 mb-6 shadow-[0_2px_20px_rgba(139,92,246,0.06)]"
          >
            <Zap className="w-4 h-4 text-purple-500" />
            <span className="text-purple-700 text-sm font-medium tracking-wide">Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-[1.05] tracking-tight"
          >
            <span className="text-[#1a1410] font-serif">
              Everything You Need to
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent font-serif italic">
                Trade Smarter
              </span>
              <svg className="absolute -bottom-3 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C40 2 80 2 120 6C160 10 180 4 198 8" stroke="url(#featuresGradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="featuresGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9333EA"/>
                    <stop offset="50%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#6D28D9"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-light"
          >
            PipBud combines AI coaching, trade journaling, and analytics 
            in one elegant Telegram bot. No downloads required.
          </motion.p>
        </div>

        {/* Features Grid with Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            // Determine which visual to show
            let visualType: 'analytics' | 'coach' | 'psychology' | 'default' = 'default';
            if (feature.title.includes('Analytics')) visualType = 'analytics';
            else if (feature.title.includes('Coach')) visualType = 'coach';
            else if (feature.title.includes('Psychology')) visualType = 'psychology';
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-100/30 hover:border-purple-200/50 transition-all duration-500 hover:-translate-y-2 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.08)]"
              >
                {/* Decorative top bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent group-hover:w-20 transition-all duration-500 z-10" />
                
                {/* Visual Mockup */}
                <div className="p-4 pb-0">
                  <VisualMockup type={visualType} />
                </div>
                
                {/* Content */}
                <div className="p-5 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.lightColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-5 h-5 ${feature.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#1a1410] font-semibold text-base tracking-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r ${feature.lightColor} ${feature.iconColor} border border-purple-100/30`}>
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/60 backdrop-blur-sm rounded-full border border-purple-100/30">
            <span className="text-sm text-gray-600 font-light">
              Ready to experience these features?
            </span>
            <a
              href="https://t.me/PipBudBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors group"
            >
              Try PipBud Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fcf9f6] via-[#fcf9f6]/80 to-transparent pointer-events-none" />
    </section>
  );
}