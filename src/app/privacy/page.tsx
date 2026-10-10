import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Trader Data Protection — PipBud',
  description:
    'Learn how PipBud protects your trading journal, broker investor keys, and Telegram credentials with our Anti-DM Shield and privacy architecture.',
  alternates: {
    canonical: 'https://pipbud.xyz/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Trader Data Protection — PipBud',
    description:
      'Learn how PipBud protects your trading journal, broker investor keys, and Telegram credentials.',
    url: 'https://pipbud.xyz/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white font-outfit">Privacy Policy</h1>
          </div>
          <p className="text-gray-400 mb-8">Last updated: {new Date().getFullYear()}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">1. Data We Collect</h2>
              <p className="text-gray-400 leading-relaxed">
                PipBud collects only the data necessary to provide our trading journal service:
              </p>
              <ul className="text-gray-400 space-y-2 mt-3 list-disc pl-5">
                <li><strong>Telegram User ID</strong> - To identify your account</li>
                <li><strong>Trade Data</strong> - Pairs, directions, setups, prices, screenshots you share</li>
                <li><strong>Strategy Rules</strong> - If you choose to set them</li>
                <li><strong>Email Address</strong> - Only if you enable email notifications</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Data</h2>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
                <li>Log and organize your trades</li>
                <li>Provide AI-powered trade analysis and coaching</li>
                <li>Generate performance statistics and reports</li>
                <li>Send email summaries (only if enabled)</li>
                <li>Improve our AI coaching algorithms</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">3. Data Storage & Security</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                {[
                  { icon: Database, text: 'Your data is stored securely in PostgreSQL databases' },
                  { icon: Lock, text: 'All communications are encrypted via HTTPS' },
                  { icon: Eye, text: 'We never share your trading data with third parties' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                    <item.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">4. AI Processing</h2>
              <p className="text-gray-400 leading-relaxed">
                When you use AI features (trade validation, coaching, parsing), your trade data 
                is sent to Groq's API for processing. Groq does not store or train on your data. 
                No personal information is shared with the AI provider.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
                <li><strong>Delete your data</strong> - Use /delete command or contact us</li>
                <li><strong>Export your data</strong> - Request a copy of your trade history</li>
                <li><strong>Opt out</strong> - Stop using the bot anytime. Your data will be deleted</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">6. Contact</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 text-purple-400" />
                <a href="mailto:privacy@pipbud.io" className="text-purple-400 hover:text-purple-300">
                  privacy@pipbud.xyz
                </a>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}