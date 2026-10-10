import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, AlertTriangle, CheckCircle, Ban, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Trader Meritocracy Rules — PipBud',
  description:
    'Terms of service, fair usage standards, and Zero-Tolerance Anti-Shortfall demotion rules for the PipBud platform and @PipBudBot.',
  alternates: {
    canonical: 'https://pipbud.xyz/terms',
  },
  openGraph: {
    title: 'Terms of Service & Trader Meritocracy Rules — PipBud',
    description:
      'Terms of service, fair usage standards, and Zero-Tolerance Anti-Shortfall demotion rules for the PipBud platform.',
    url: 'https://pipbud.xyz/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white font-outfit">Terms of Service</h1>
          </div>
          <p className="text-gray-400 mb-8">Last updated: {new Date().getFullYear()}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By using PipBud ("the Bot"), you agree to these Terms of Service. 
                If you do not agree, do not use the Bot.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">2. Service Description</h2>
              <p className="text-gray-400 leading-relaxed">
                PipBud is a trading journal and AI coaching assistant available on Telegram. 
                The Bot provides trade logging, performance analytics, and AI-powered insights.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">3. Important Disclaimer</h2>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <p className="text-gray-300 leading-relaxed font-medium">
                  PipBud is an analytical tool, NOT financial advice. Trading forex, crypto, 
                  and other instruments involves substantial risk of loss. Past performance 
                  does not guarantee future results. The AI coach provides suggestions based 
                  on your historical data — always use your own judgment.
                </p>
              </div>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">4. User Responsibilities</h2>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
                <li>You are responsible for all trading decisions</li>
                <li>You agree not to misuse or exploit the Bot</li>
                <li>You retain ownership of your trading data</li>
                <li>You will not use the Bot for illegal activities</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">5. Service Availability</h2>
              <p className="text-gray-400 leading-relaxed">
                PipBud is provided "as is" without warranty. We strive for uptime but 
                do not guarantee uninterrupted service. The Bot may be updated or 
                modified without notice.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">6. Free & Paid Services</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium">Free Tier</h3>
                    <p className="text-gray-400 text-sm">Unlimited trades, AI validation, basic analytics. Free forever.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium">Pro Tier (Coming Soon)</h3>
                    <p className="text-gray-400 text-sm">Advanced features, priority support. Pricing TBD.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                PipBud and its creators shall not be liable for any trading losses, 
                damages, or consequences arising from the use of this service. 
                You use the Bot at your own risk.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">8. Termination</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to terminate or suspend access to the Bot for 
                any user violating these terms. You may stop using the Bot at any time.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">9. Governing Law</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">
                These terms are governed by applicable laws. Any disputes shall be 
                resolved through good-faith negotiation first.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">10. Contact</h2>
              <p className="text-gray-400">
                Questions? Contact us at{' '}
                <a href="mailto:legal@pipbud.io" className="text-purple-400 hover:text-purple-300">
                  legal@pipbud.xyz
                </a>
              </p>
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