'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TiersSection from '@/components/TiersSection';
import AntiShortfallSection from '@/components/AntiShortfallSection';
import ForumShowcaseSection from '@/components/ForumShowcaseSection';
import TelegramBotSection from '@/components/TelegramBotSection';
import WebJournalPreviewSection from '@/components/WebJournalPreviewSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import CommunityFeed from '@/components/CommunityFeed';
import { useAuth } from '@/context/AuthContext';
import { PostCardSkeleton } from '@/components/SkeletonLoader';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [showPublicSite, setShowPublicSite] = useState(false);

  // Perceived performance loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <div className="h-12 w-48 bg-[#E7E5E4]/60 rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
            <div className="lg:col-span-8 space-y-4">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
            <div className="hidden lg:block lg:col-span-4 space-y-4">
              <div className="h-48 bg-[#E7E5E4]/60 rounded-2xl animate-pulse" />
              <div className="h-36 bg-[#E7E5E4]/60 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // If user is authenticated and hasn't toggled to public view:
  // Render the Reddit & Quora style community Q&A and trade intel hub
  if (user && !showPublicSite) {
    return <CommunityFeed onSwitchToPublic={() => setShowPublicSite(true)} />;
  }

  // Public Landing Page (with convenient return to feed controls for authenticated traders)
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-[#FED7AA] selection:text-[#9A3412]">
      <Navbar onReturnToFeed={() => setShowPublicSite(false)} />

      {/* Prominent Top Banner right below Navbar */}
      {user && showPublicSite && (
        <div className="pt-16">
          <div className="bg-[#1C1917] text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#292524] shadow-md relative z-30">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              <span className="text-[#A8A29E] hidden sm:inline">You are viewing the Public Marketing Site as</span>
              <span className="font-bold text-[#FAFAF9]">@{user.username}</span>
              <span
                className="px-1.5 py-0.2 rounded text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: user.tier_color || '#C2410C' }}
              >
                Level {user.skill_level}
              </span>
            </div>
            <button
              onClick={() => setShowPublicSite(false)}
              className="h-8 px-4 bg-[#C2410C] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ml-auto"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Return to Community Feed &rarr;</span>
            </button>
          </div>
        </div>
      )}

      {/* Convenient Floating Button (safe above mobile nav dock) */}
      {user && showPublicSite && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setShowPublicSite(false)}
            className="px-4 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold shadow-xl inline-flex items-center gap-2 transition-all active:scale-95 border border-[#44403C] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#C2410C]" />
            <span>Return to Feed</span>
          </button>
        </div>
      )}
      <HeroSection />
      <TiersSection />
      <AntiShortfallSection />
      <ForumShowcaseSection />
      <TelegramBotSection />
      <WebJournalPreviewSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}