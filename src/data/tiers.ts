// PIPBUD 7-Level Trader Meritocracy Specifications

export interface TraderTier {
  level: number;
  name: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  minTrades: number;
  minWinRate: number; // percentage e.g. 50
  minProfitFactor: number; // e.g. 1.55
  maxDrawdown: number; // max allowed percentage e.g. 5.0
  color: string;
  badgeBg: string;
  badgeText: string;
  activeTradersCount: number;
  unlockedChannels: {
    name: string;
    topic: string;
    icon: string;
    isVoice?: boolean;
  }[];
  perks: string[];
  relegationCondition: string;
}

export const TRADER_TIERS: TraderTier[] = [
  {
    level: 1,
    name: 'Novice Trader',
    badge: '🌱 Level 1: Novice',
    title: 'Novice Desk',
    tagline: 'Foundations, logging discipline & basic risk control',
    description: 'Entry-level environment for emerging traders learning to log every trade, manage stop-losses, and eliminate revenge trading.',
    minTrades: 0,
    minWinRate: 0.0,
    minProfitFactor: 0.0,
    maxDrawdown: 25.0,
    color: '#78716C',
    badgeBg: '#F5F5F4',
    badgeText: '#44403C',
    activeTradersCount: 1420,
    unlockedChannels: [
      { name: 'novice-welcome', topic: 'Orientation, bot commands, and onboarding guide.', icon: 'sparkles' },
      { name: 'journal-basics', topic: 'Best practices for screenshots, entry tags, and trade notes.', icon: 'file-text' },
      { name: 'risk-discipline', topic: 'The 1% risk rule, stop placement, and sizing calculators.', icon: 'shield-alert' },
    ],
    perks: [
      'Telegram auto-logging via chat, photo, and voice',
      'Basic AI trade pre-validation (/coach validate)',
      'Access to #novice-welcome and #risk-discipline',
    ],
    relegationCondition: 'Account registration only. Zero risk of demotion at this base tier.',
  },
  {
    level: 2,
    name: 'Apprentice Trader',
    badge: '⚡ Level 2: Apprentice',
    title: 'Apprentice Hub',
    tagline: 'Consistency habits and structured setup cataloging',
    description: 'Traders with at least 25 logged trades who respect basic risk parameters and maintain active journal discipline.',
    minTrades: 25,
    minWinRate: 40.0,
    minProfitFactor: 1.10,
    maxDrawdown: 12.0,
    color: '#2563EB',
    badgeBg: '#EFF6FF',
    badgeText: '#1D4ED8',
    activeTradersCount: 840,
    unlockedChannels: [
      { name: 'apprentice-chat', topic: 'Strategy discussion and community trade ideas.', icon: 'message-square' },
      { name: 'trade-reviews', topic: 'Post-trade autopsies, mistake dissecting, and win reviews.', icon: 'search' },
      { name: 'orderblock-setups', topic: 'Refining Market Structure Shift and Order Block entries.', icon: 'layers' },
    ],
    perks: [
      'Automated Risk-to-Reward ratio analysis',
      'Weekly performance and coaching debrief via Telegram & Email',
      'Access to Level 2 Apprentice Hub channels',
    ],
    relegationCondition: 'Max Drawdown > 12% or 3 consecutive trades without stop-loss triggers removal back to Level 1.',
  },
  {
    level: 3,
    name: 'Consistent Trader',
    badge: '🎯 Level 3: Consistent',
    title: 'Consistent Breakeven+ Room',
    tagline: 'Positive expectancy and disciplined execution',
    description: 'Traders with statistically proven edge across 50+ trades, maintaining positive profit factor and strict drawdown adherence.',
    minTrades: 50,
    minWinRate: 45.0,
    minProfitFactor: 1.30,
    maxDrawdown: 9.0,
    color: '#0F766E',
    badgeBg: '#F0FDFA',
    badgeText: '#0F766E',
    activeTradersCount: 460,
    unlockedChannels: [
      { name: 'consistent-flow', topic: 'High-expectancy setups (1:2+ R:R) with verified confluences.', icon: 'target' },
      { name: 'fvg-liquidity-sweeps', topic: 'Fair Value Gap imbalances and Asian session sweep executions.', icon: 'droplet' },
      { name: 'daily-bias', topic: 'London & NY Killzone bias updates before session opens.', icon: 'compass' },
    ],
    perks: [
      'Verified Consistent Trader badge on web and forum',
      'Interactive Web Journal equity curve & setup heatmaps',
      'Access to #consistent-flow and #daily-bias',
    ],
    relegationCondition: 'Drawdown > 9.0% or win rate < 40% degrades Tier Health. At 0%, demoted to Apprentice.',
  },
  {
    level: 4,
    name: 'Funded Pro',
    badge: '🛡️ Level 4: Funded Pro',
    title: 'Funded & Prop Floor',
    tagline: 'Rigorous prop firm rules & live capital execution',
    description: 'Traders managing funded live accounts (FTMO, FundedNext, MFF, Live Broker) adhering to strict 5% max drawdown rules.',
    minTrades: 80,
    minWinRate: 50.0,
    minProfitFactor: 1.55,
    maxDrawdown: 5.0,
    color: '#7C3AED',
    badgeBg: '#F5F3FF',
    badgeText: '#6D28D9',
    activeTradersCount: 285,
    unlockedChannels: [
      { name: 'funded-floor', topic: 'Live execution desk for verified funded operators.', icon: 'award' },
      { name: 'live-tape-reading', topic: 'Real-time liquidity and order flow commentary during NY killzone.', icon: 'activity' },
      { name: 'payout-proofs', topic: 'Audited payout certificates and prop firm withdrawals.', icon: 'dollar-sign' },
    ],
    perks: [
      'Verified Funded Pro badge and broker certification banner',
      'Interactive trade embeds directly inside forum messages',
      'Zero-tolerance room: 100% verified peers only',
    ],
    relegationCondition: 'Prop firm daily drawdown > 4% or overall drawdown > 5.0% results in immediate removal from #funded-floor.',
  },
  {
    level: 5,
    name: 'Elite Alpha',
    badge: '💎 Level 5: Elite Alpha',
    title: 'Elite Alpha Syndicate Desk',
    tagline: 'High-conviction compounding & macro order flow',
    description: 'Top-tier discretionary and algorithmic traders with 150+ verified trades, profit factor > 1.85, and pristine capital protection.',
    minTrades: 150,
    minWinRate: 56.0,
    minProfitFactor: 1.85,
    maxDrawdown: 4.0,
    color: '#D97706',
    badgeBg: '#FFFBEB',
    badgeText: '#B45309',
    activeTradersCount: 110,
    unlockedChannels: [
      { name: 'elite-alpha-desk', topic: 'High-conviction intraday swings and institutional liquidity targets.', icon: 'gem' },
      { name: 'institutional-orderflow', topic: 'CME commitment of traders (COT) and central bank flows.', icon: 'bar-chart-2' },
      { name: 'macro-yields', topic: 'US10Y Treasury yield spreads and cross-asset correlations.', icon: 'globe' },
    ],
    perks: [
      'PineScript indicator & algo code block attachments in chat',
      'Priority AI deep trade autopsy engine',
      'Exclusive access to #elite-alpha-desk',
    ],
    relegationCondition: 'Max Drawdown > 4.0% drops Tier Health. Immediate demotion on shortfall.',
  },
  {
    level: 6,
    name: 'Master Mentor',
    badge: '👑 Level 6: Master Mentor',
    title: 'Master Mentor Sanctum',
    tagline: '6+ months audited track record & verified leadership',
    description: 'Veteran traders with audited multi-month profitability on PipBud, holding over 250 verified trades and a community trust score > 4.8.',
    minTrades: 250,
    minWinRate: 62.0,
    minProfitFactor: 2.20,
    maxDrawdown: 3.5,
    color: '#EA580C',
    badgeBg: '#FFF7ED',
    badgeText: '#C2410C',
    activeTradersCount: 38,
    unlockedChannels: [
      { name: 'mentor-sanctum', topic: 'Strategy audits, statistical anomalies, and live masterminds.', icon: 'crown' },
      { name: 'live-audio-huddle', topic: 'Voice huddle room during major market opens & CPI/FOMC.', icon: 'mic', isVoice: true },
      { name: 'strategy-audits', topic: 'Peer review of trading plans, backtests, and execution edge.', icon: 'cpu' },
    ],
    perks: [
      'Ability to host and lead live audio trading huddles',
      'Pin high-conviction setups to channel headers',
      'Personalized mentor profile with audited performance graph',
    ],
    relegationCondition: 'Failure to maintain PF > 2.0 or DD > 3.5% demotes back to Level 5.',
  },
  {
    level: 7,
    name: 'Market Titan',
    badge: '🏛️ Level 7: Market Titan',
    title: 'Titan Whale Syndicate',
    tagline: 'Top 0.5% institutional desks & seven-figure operators',
    description: 'The pinnacle of trading execution. 400+ verified trades, audited 7-figure accounts, and zero unmanaged risk violations.',
    minTrades: 400,
    minWinRate: 66.0,
    minProfitFactor: 2.65,
    maxDrawdown: 2.8,
    color: '#C2410C',
    badgeBg: '#FFF7ED',
    badgeText: '#9A3412',
    activeTradersCount: 14,
    unlockedChannels: [
      { name: 'titan-inner-sanctuary', topic: 'Direct desk-to-desk coordination and deep liquidity intelligence.', icon: 'landmark' },
      { name: 'whale-tape', topic: 'Large block trades, institutional sweeps, and dark liquidity pools.', icon: 'anchor' },
      { name: 'syndicate-allocations', topic: 'Prop firm allocation partnerships and institutional capital.', icon: 'briefcase' },
    ],
    perks: [
      'Direct private access to the Titan Whale Syndicate room',
      'Custom Telegram bot command suites and priority backend pipeline',
      'Titan gold wordmark badge in all community channels',
    ],
    relegationCondition: 'Zero tolerance: Any single trade violation or drawdown > 2.8% results in immediate removal.',
  },
];
