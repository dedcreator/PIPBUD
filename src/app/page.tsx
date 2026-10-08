'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import AICoachSection from '@/components/AICoachSection';
import HowItWorks from '@/components/HowItWorks';
import TiersSection from '@/components/TiersSection';
import AntiShortfallSection from '@/components/AntiShortfallSection';
import ForumShowcaseSection from '@/components/ForumShowcaseSection';
import TelegramBotSection from '@/components/TelegramBotSection';
import WebJournalPreviewSection from '@/components/WebJournalPreviewSection';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-[#E7E9EA] selection:bg-[#8B5CF6]/40 selection:text-white relative">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesGrid />
      <AICoachSection />
      <HowItWorks />
      <TiersSection />
      <AntiShortfallSection />
      <ForumShowcaseSection />
      <TelegramBotSection />
      <WebJournalPreviewSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}