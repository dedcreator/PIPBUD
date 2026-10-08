'use client';

import Link from 'next/link';
import { ShieldCheck, Send, BarChart3, MessageSquare, ExternalLink, FileText } from 'lucide-react';
import PipbudLogo from './PipbudLogo';

export default function Footer() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz';

  return (
    <footer className="bg-[#FAFAF9] text-[#78716C] border-t border-[#E7E5E4] pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <PipbudLogo size="md" />
            <p className="text-xs text-[#78716C] max-w-sm leading-relaxed">
              PipBud combines an effortless automated journal on Telegram with a 7-tier verified trader messaging forum. Real execution. Real records. Zero fake gurus.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#15803D] bg-white border border-[#E7E5E4] px-3 py-1.5 rounded-full w-fit shadow-sm">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#15803D]" />
              <span className="font-medium">Anti-Shortfall Engine: Fall short, get removed.</span>
            </div>
          </div>

          {/* Ecosystem Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#1C1917] uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={appUrl}
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 font-medium text-[#1C1917]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#1C1917]" />
                  <span>Web App Terminal</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/PipBudBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#78716C]" />
                  <span>Telegram Bot Journal</span>
                </a>
              </li>
              <li>
                <a
                  href={`${appUrl}/journal`}
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Web Journal Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href={`${appUrl}/forum`}
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#78716C]" />
                  <span>7-Tier Trader Forum</span>
                </a>
              </li>
              <li>
                <a
                  href="/PipBud_Liquid_Glass_Design_System_v3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 text-[#78716C] font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-[#78716C]" />
                  <span>Liquid Glass PDF Spec (v3.0)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* The 7 Tiers Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#1C1917] uppercase tracking-wider">
              The 7 Tiers
            </h4>
            <ul className="space-y-2 text-xs text-[#78716C]">
              <li className="text-[#78716C]">Level 1: Market Explorer</li>
              <li className="text-[#2563EB]">Level 2: Discipline Apprentice</li>
              <li className="text-[#15803D]">Level 3: Consistent Operator</li>
              <li className="text-[#0D9488]">Level 4: Risk Sentinel</li>
              <li className="text-[#D97706]">Level 5: Capital Allocator</li>
              <li className="text-[#9333EA]">Level 6: Market Maestro</li>
              <li className="text-[#1C1917] font-semibold">Level 7: Institutional Sovereign</li>
            </ul>
          </div>

          {/* Governance & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#1C1917] uppercase tracking-wider">
              Governance &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#1C1917] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1C1917] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-[#78716C]">Cryptographic Trade Hashing</span>
              </li>
              <li>
                <span className="text-[#78716C]">Zero Paid Rankings Rule</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rule Statement */}
        <div className="pt-8 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C]">
          <p>
            GOVERNANCE: Businesses and traders can never pay for ratings, badges, or tier access. Every position is mathematically earned.
          </p>
          <p>&copy; {new Date().getFullYear()} PipBud Capital Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}