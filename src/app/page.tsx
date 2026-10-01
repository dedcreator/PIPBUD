'use client';

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-[#FED7AA] selection:text-[#9A3412]">
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