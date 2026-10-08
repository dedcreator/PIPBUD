// PIPBUD 7-Level Trader Meritocracy Specifications
// Re-keyed according to Liquid Glass v3.0 Specification

export interface TraderTier {
  level: number;
  name: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  minTrades: number;
  minWinRate: number;
  minProfitFactor: number;
  maxDrawdown: number;
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
    name: 'Market Explorer',
    badge: 'L1 Market Explorer',
    title: 'Market Explorer Desk',
    tagline: 'Broker connection, telemetry calibration & basic risk control',
    description: 'Entry-level audited environment for emerging traders learning to log every trade, manage stop-losses, and eliminate revenge trading.',
    minTrades: 5,
    minWinRate: 0.0,
    minProfitFactor: 0.0,
    maxDrawdown: 25.0,
    color: '#A1A1AA',
    badgeBg: 'rgba(161, 161, 170, 0.12)',
    badgeText: '#A1A1AA',
    activeTradersCount: 1420,
    unlockedChannels: [
      { name: 'explorer-welcome', topic: 'Orientation, bot commands, and onboarding guide.', icon: 'sparkles' },
      { name: 'journal-basics', topic: 'Best practices for screenshots, entry tags, and trade notes.', icon: 'file-text' },
      { name: 'risk-discipline', topic: 'The 1% risk rule, stop placement, and sizing calculators.', icon: 'shield-alert' },
    ],
    perks: [
      'Telegram auto-logging via chat, photo, and voice',
      'Basic AI trade pre-validation (/coach validate)',
      'Read-only Community Feed, standard journaling',
    ],
    relegationCondition: 'Account registration only. Zero risk of demotion at this base tier.',
  },
  {
    level: 2,
    name: 'Discipline Apprentice',
    badge: 'L2 Discipline Apprentice',
    title: 'Discipline Apprentice Hub',
    tagline: 'Consistency habits and structured setup cataloging',
    description: 'Traders with at least 20 logged trades who respect basic risk parameters and maintain rule compliance >= 80%.',
    minTrades: 20,
    minWinRate: 40.0,
    minProfitFactor: 1.10,
    maxDrawdown: 12.0,
    color: '#60A5FA',
    badgeBg: 'rgba(96, 165, 250, 0.12)',
    badgeText: '#60A5FA',
    activeTradersCount: 840,
    unlockedChannels: [
      { name: 'apprentice-chat', topic: 'Strategy discussion and community trade ideas.', icon: 'message-square' },
      { name: 'trade-reviews', topic: 'Post-trade autopsies, mistake dissecting, and win reviews.', icon: 'search' },
      { name: 'orderblock-setups', topic: 'Refining Market Structure Shift and Order Block entries.', icon: 'layers' },
    ],
    perks: [
      'Post creation in Community Feed; comment replies',
      'Automated Risk-to-Reward ratio analysis',
      'Weekly performance debrief via Telegram & Email',
    ],
    relegationCondition: 'Max Drawdown > 12% or rule compliance < 80% triggers removal back to Level 1.',
  },
  {
    level: 3,
    name: 'Consistent Operator',
    badge: 'L3 Consistent Operator',
    title: 'Consistent Operator Room',
    tagline: 'Positive expectancy and disciplined execution',
    description: 'Traders with statistically proven edge across 50+ trades, positive expectancy (>0.2R per trade), and Max DD < 8%.',
    minTrades: 50,
    minWinRate: 45.0,
    minProfitFactor: 1.30,
    maxDrawdown: 8.0,
    color: '#22C55E',
    badgeBg: 'rgba(34, 197, 94, 0.12)',
    badgeText: '#22C55E',
    activeTradersCount: 460,
    unlockedChannels: [
      { name: 'consistent-flow', topic: 'High-expectancy setups (1:2+ R:R) with verified confluences.', icon: 'target' },
      { name: 'fvg-liquidity-sweeps', topic: 'Fair Value Gap imbalances and Asian session sweep executions.', icon: 'droplet' },
      { name: 'daily-bias', topic: 'London & NY Killzone bias updates before session opens.', icon: 'compass' },
    ],
    perks: [
      'Trader Forum channel messages; screenshot attachments',
      'Interactive Web Journal equity curve & setup heatmaps',
      'Access to #consistent-flow and #daily-bias',
    ],
    relegationCondition: 'Drawdown > 8.0% or negative expectancy demotes back to Apprentice.',
  },
  {
    level: 4,
    name: 'Risk Sentinel',
    badge: 'L4 Risk Sentinel',
    title: 'Risk Sentinel Floor',
    tagline: '100+ trades audited, Sharpe > 1.25, zero rule liquidations',
    description: 'Traders with 100+ trades audited, Sharpe ratio > 1.25, and zero rule-breach liquidations on live capital.',
    minTrades: 100,
    minWinRate: 50.0,
    minProfitFactor: 1.55,
    maxDrawdown: 5.0,
    color: '#14B8A6',
    badgeBg: 'rgba(20, 184, 166, 0.12)',
    badgeText: '#14B8A6',
    activeTradersCount: 285,
    unlockedChannels: [
      { name: 'risk-sentinel-floor', topic: 'Live execution desk for verified risk sentinels.', icon: 'award' },
      { name: 'live-tape-reading', topic: 'Real-time liquidity and order flow commentary during NY killzone.', icon: 'activity' },
      { name: 'payout-proofs', topic: 'Audited payout certificates and prop firm withdrawals.', icon: 'dollar-sign' },
    ],
    perks: [
      'Full public profile verification mark; priority feed placement',
      'Interactive trade embeds directly inside forum messages',
      'Zero-tolerance room: 100% verified peers only',
    ],
    relegationCondition: 'Sharpe ratio < 1.25 or drawdown > 5.0% results in immediate demotion.',
  },
  {
    level: 5,
    name: 'Capital Allocator',
    badge: 'L5 Capital Allocator',
    title: 'Capital Allocator Syndicate',
    tagline: 'Passed prop firm challenge certificate or audited $50K+ live capital',
    description: 'Verified prop firm funded traders or verified $50K+ live capital operators with strict drawdown compliance.',
    minTrades: 150,
    minWinRate: 55.0,
    minProfitFactor: 1.85,
    maxDrawdown: 4.5,
    color: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeText: '#F59E0B',
    activeTradersCount: 110,
    unlockedChannels: [
      { name: 'capital-allocations', topic: 'High-conviction intraday swings and institutional liquidity targets.', icon: 'gem' },
      { name: 'institutional-orderflow', topic: 'CME commitment of traders (COT) and central bank flows.', icon: 'bar-chart-2' },
      { name: 'macro-yields', topic: 'US10Y Treasury yield spreads and cross-asset correlations.', icon: 'globe' },
    ],
    perks: [
      'Can host pinned strategy threads; verified P&L ledger sharing',
      'Priority AI deep trade autopsy engine',
      'Exclusive access to #capital-allocations',
    ],
    relegationCondition: 'Max Drawdown > 4.5% drops Tier Health. Immediate demotion on shortfall.',
  },
  {
    level: 6,
    name: 'Market Maestro',
    badge: 'L6 Market Maestro',
    title: 'Market Maestro Sanctum',
    tagline: '250+ audited trades over 6+ months, Profit Factor >= 1.85',
    description: 'Veteran traders with audited multi-month profitability on PipBud, holding over 250 verified trades and profit factor >= 1.85.',
    minTrades: 250,
    minWinRate: 60.0,
    minProfitFactor: 1.85,
    maxDrawdown: 3.5,
    color: '#E879F9',
    badgeBg: 'rgba(232, 121, 249, 0.12)',
    badgeText: '#E879F9',
    activeTradersCount: 38,
    unlockedChannels: [
      { name: 'maestro-sanctum', topic: 'Strategy audits, statistical anomalies, and live masterminds.', icon: 'crown' },
      { name: 'live-audio-huddle', topic: 'Voice huddle room during major market opens & CPI/FOMC.', icon: 'mic', isVoice: true },
      { name: 'strategy-audits', topic: 'Peer review of trading plans, backtests, and execution edge.', icon: 'cpu' },
    ],
    perks: [
      'Mentor badge; private high-frequency channel; strategy syndication',
      'Ability to host and lead live audio trading huddles',
      'Personalized mentor profile with audited performance graph',
    ],
    relegationCondition: 'Failure to maintain PF >= 1.85 or DD > 3.5% demotes back to Level 5.',
  },
  {
    level: 7,
    name: 'Institutional Sovereign',
    badge: 'L7 Sovereign',
    title: 'Institutional Sovereign Syndicate',
    tagline: 'Top 0.5% global alpha rank, $250K+ verified capital, Sortino > 2.2',
    description: 'The pinnacle of trading execution. Top 0.5% global alpha, verified $250K+ live capital, Sortino > 2.2, and audited desk pass rate.',
    minTrades: 400,
    minWinRate: 65.0,
    minProfitFactor: 2.50,
    maxDrawdown: 2.8,
    color: '#8B5CF6',
    badgeBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(245, 243, 255, 0.25))',
    badgeText: '#F5F3FF',
    activeTradersCount: 14,
    unlockedChannels: [
      { name: 'sovereign-sanctuary', topic: 'Direct desk-to-desk coordination and deep liquidity intelligence.', icon: 'landmark' },
      { name: 'whale-tape', topic: 'Large block trades, institutional sweeps, and dark liquidity pools.', icon: 'anchor' },
      { name: 'syndicate-allocations', topic: 'Prop firm allocation partnerships and institutional capital.', icon: 'briefcase' },
    ],
    perks: [
      'Institutional Desk status, algorithmic signal broadcasting, VIP forum badge',
      'Custom Telegram bot command suites and priority backend pipeline',
      'Level 7 violet-to-ice ring and border on profile and forum',
    ],
    relegationCondition: 'Zero tolerance: Any single trade violation or drawdown > 2.8% results in immediate removal.',
  },
];
