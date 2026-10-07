'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PipbudLogo from './PipbudLogo';
import { ShieldCheck, Send, MessageSquare, BarChart3 } from 'lucide-react';

export default function Footer() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);
  }, []);

  // When running installed as a PWA, hide footer completely so it looks like a native app
  if (isStandalone) {
    return null;
  }

  return (
    <footer className="bg-[#FAFAF9] border-t border-[#E7E5E4] pt-16 pb-28 md:pb-12 text-xs text-[#78716C] pwa:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <PipbudLogo size="md" />
            <p className="text-xs text-[#44403C] max-w-sm leading-relaxed">
              PipBud combines an effortless automated journal on Telegram with a 7-tier verified trader messaging forum. Real execution. Real records. Zero fake gurus.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#0F766E] bg-[#F0FDFA] border border-[#CCFBF1] px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Anti-Shortfall Engine: Fall short, get removed.</span>
            </div>
          </div>

          {/* Ecosystem Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#1C1917] uppercase tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/feed" className="hover:text-[#C2410C] transition-colors flex items-center gap-1.5 font-semibold text-[#1C1917]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Web App Terminal</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/PipBudBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C2410C] transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Telegram Bot Journal</span>
                </a>
              </li>
              <li>
                <Link href="/journal" className="hover:text-[#C2410C] transition-colors flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Web Journal Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-[#C2410C] transition-colors flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>7-Tier Trader Forum</span>
                </Link>
              </li>
              <li>
                <a
                  href="/PipBud_Design_System.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C2410C] transition-colors flex items-center gap-1.5 text-[#0F766E] font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Design System Specification (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* The 7 Tiers Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#1C1917] uppercase tracking-wider">
              The 7 Tiers
            </h4>
            <ul className="space-y-2 text-xs text-[#44403C]">
              <li>Level 1: Novice Desk</li>
              <li>Level 2: Apprentice Hub</li>
              <li>Level 3: Consistent Breakeven+</li>
              <li>Level 4: Funded &amp; Prop Floor</li>
              <li>Level 5: Elite Alpha Desk</li>
              <li>Level 6: Master Mentor Sanctum</li>
              <li>Level 7: Market Titan Syndicate</li>
            </ul>
          </div>

          {/* Governance & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#1C1917] uppercase tracking-wider">
              Governance &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#C2410C] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C2410C] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-[#A8A29E]">NDPR Data Compliance</span>
              </li>
              <li>
                <span className="text-[#A8A29E]">Zero Paid Rankings Rule</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rule Statement */}
        <div className="pt-8 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A8A29E]">
          <p>
            RULE: Businesses and traders can never pay for ratings, badges, or tier access. Every position is mathematically earned.
          </p>
          <p>&copy; {new Date().getFullYear()} PipBud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}