'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  User,
  Send,
  AlertOctagon,
  Bot,
  Sliders
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function MobileNavDock() {
  const pathname = usePathname();
  const { user } = useAuth();

  // On the forum chat page, hide the bottom nav dock to give 100% full screen
  // to the live chat stream, trade cards, and keyboard input
  if (pathname === '/forum') {
    return null;
  }

  // If user is logged in, show Web Journal and 7-Tier Forum
  // If user is logged out, show public landing navigations & Log In
  const navItems = user
    ? [
        {
          label: 'Home',
          href: '/',
          icon: Home,
          isActive: pathname === '/',
        },
        {
          label: 'Journal',
          href: '/journal',
          icon: BarChart3,
          isActive: pathname === '/journal',
        },
        {
          label: 'Forum',
          href: '/forum',
          icon: MessageSquare,
          badge: `L${user.skill_level}`,
          isActive: pathname === '/forum',
        },
        {
          label: 'Tiers',
          href: '/#tiers',
          icon: ShieldCheck,
          isActive: pathname === '/#tiers',
        },
        {
          label: 'Settings',
          href: '/settings',
          icon: Sliders,
          tierBadge: `L${user.skill_level}`,
          isActive: pathname === '/settings',
        },
      ]
    : [
        {
          label: 'Home',
          href: '/',
          icon: Home,
          isActive: pathname === '/',
        },
        {
          label: '7 Tiers',
          href: '/#tiers',
          icon: ShieldCheck,
          isActive: pathname === '/#tiers',
        },
        {
          label: 'Bot',
          href: '/#bot',
          icon: Send,
          isActive: pathname === '/#bot',
        },
        {
          label: 'Rules',
          href: '/#legitimacy',
          icon: AlertOctagon,
          isActive: pathname === '/#legitimacy',
        },
        {
          label: 'Log In',
          href: '/login',
          icon: User,
          isActive: pathname === '/login',
        },
      ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAFAF9]/95 backdrop-blur-md border-t border-[#E7E5E4] px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(28,25,23,0.06)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
                active ? 'text-[#C2410C]' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              {/* Active Pip Indicator */}
              {active && (
                <span className="absolute -top-2 w-8 h-1 bg-[#C2410C] rounded-full shadow-[0_2px_8px_rgba(194,65,12,0.4)]" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
                {item.tierBadge && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-[#C2410C] text-white text-[9px] font-bold rounded-full border border-white">
                    {item.tierBadge}
                  </span>
                )}
                {item.badge && !item.tierBadge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#0F766E] text-white text-[8px] font-bold rounded-full border border-white">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] mt-1 font-medium tracking-tight ${active ? 'font-bold text-[#C2410C]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
