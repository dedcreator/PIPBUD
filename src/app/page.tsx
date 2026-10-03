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

  // Public Landing Page (with return pill if authenticated trader is browsing public site)
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-[#FED7AA] selection:text-[#9A3412]">
      {user && showPublicSite && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setShowPublicSite(false)}
            className="px-4 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-semibold shadow-lg inline-flex items-center gap-2 transition-all active:scale-95 border border-[#44403C]"
          >
            <MessageSquare className="w-4 h-4 text-[#C2410C]" />
            <span>Return to Community Feed</span>
          </button>
        </div>
      )}

      <Navbar />
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