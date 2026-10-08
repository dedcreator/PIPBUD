'use client';

import Link from 'next/link';
import { ShieldCheck, Send, BarChart3, MessageSquare, ExternalLink, FileText } from 'lucide-react';
import PipbudLogo from './PipbudLogo';

export default function Footer() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <footer className="bg-[#000000] text-[#71767B] border-t border-white/10 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <PipbudLogo size="md" />
            <p className="text-xs text-[#71767B] max-w-sm leading-relaxed">
              PipBud combines an effortless automated journal on Telegram with a 7-tier verified trader messaging forum. Real execution. Real records. Zero fake gurus.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#22C55E] glass-ultrathin border border-[#22C55E]/30 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Anti-Shortfall Engine: Fall short, get removed.</span>
            </div>
          </div>

          {/* Ecosystem Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={appUrl}
                  className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-[#DDD6FE]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Web App Terminal</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/PipBudBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Telegram Bot Journal</span>
                </a>
              </li>
              <li>
                <a
                  href={`${appUrl}/journal`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Web Journal Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href={`${appUrl}/forum`}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>7-Tier Trader Forum</span>
                </a>
              </li>
              <li>
                <a
                  href="/PipBud_Liquid_Glass_Design_System_v3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#A78BFA] font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>Liquid Glass PDF Spec (v3.0)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* The 7 Tiers Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              The 7 Tiers
            </h4>
            <ul className="space-y-2 text-xs text-[#71767B]">
              <li className="text-[#A1A1AA]">Level 1: Market Explorer</li>
              <li className="text-[#60A5FA]">Level 2: Discipline Apprentice</li>
              <li className="text-[#22C55E]">Level 3: Consistent Operator</li>
              <li className="text-[#14B8A6]">Level 4: Risk Sentinel</li>
              <li className="text-[#F59E0B]">Level 5: Capital Allocator</li>
              <li className="text-[#E879F9]">Level 6: Market Maestro</li>
              <li className="text-[#DDD6FE] font-semibold">Level 7: Institutional Sovereign</li>
            </ul>
          </div>

          {/* Governance & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              Governance &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-[#71767B]">Cryptographic Trade Hashing</span>
              </li>
              <li>
                <span className="text-[#71767B]">Zero Paid Rankings Rule</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rule Statement */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71767B]">
          <p>
            GOVERNANCE: Businesses and traders can never pay for ratings, badges, or tier access. Every position is mathematically earned.
          </p>
          <p>&copy; {new Date().getFullYear()} PipBud Capital Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}