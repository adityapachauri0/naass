import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BarChart2, Target, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function GooglePPCPage() {
  return (
    <>
      <SEOHead
        title="Google PPC Management Services"
        description="Expert Google Ads management from NAASS. We create and optimise PPC campaigns that deliver qualified leads at the lowest cost per acquisition."
        keywords="Google PPC management UK, Google Ads management, PPC lead generation, Google Ads agency, pay per click management, PPC campaign optimisation"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">

          {/* Hero */}
          <section className="container mx-auto px-4 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-6">
                <Search className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Results-Driven Google Ads Management</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                Google PPC Management Services
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Every pound of your Google Ads budget should be working hard. NAASS manages your PPC campaigns with a single focus: generating qualified leads at the lowest possible cost per acquisition, with full transparency on spend and performance at every step.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Started Today
              </Link>
            </motion.div>
          </section>

          {/* Our PPC Approach */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our PPC Approach</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    Many businesses waste significant budget on Google Ads because their campaigns are built around brand awareness rather than lead generation. At NAASS, we take a fundamentally different approach. Every element of your campaign — from keyword selection and ad copy to landing page design and conversion tracking — is engineered with a single objective in mind: acquiring the highest-quality leads at the most efficient cost.
                  </p>
                  <p className="text-gray-600 text-lg">
                    We begin with a thorough audit of your existing account (or a blank-canvas build for new advertisers), identify waste, and implement a structure aligned to your specific service areas and target geographies. We use a combination of exact match and phrase match keywords, negative keyword lists refined over thousands of hours of campaign management, and smart bidding strategies calibrated to your actual conversion data.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* What We Manage */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Manage</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Search className="w-6 h-6 text-orange-500" />,
                    title: 'Search Campaigns',
                    desc: 'Capture high-intent prospects at the exact moment they are searching for your services. We build tightly themed ad groups, write compelling ad copy, and continuously test to maximise click-through rates and quality scores.',
                  },
                  {
                    icon: <Target className="w-6 h-6 text-orange-500" />,
                    title: 'Remarketing Campaigns',
                    desc: 'Re-engage visitors who have already shown interest in your services but did not convert. Remarketing typically delivers a significantly lower cost per lead than prospecting campaigns, making it an essential part of any PPC strategy.',
                  },
                  {
                    icon: <BarChart2 className="w-6 h-6 text-orange-500" />,
                    title: 'Performance Max',
                    desc: 'We strategically deploy Google\'s Performance Max campaigns where appropriate, building rich asset libraries and audience signals that allow Google\'s machine learning to find conversions across Search, Display, YouTube, and Gmail.',
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-orange-500" />,
                    title: 'Landing Page Optimisation',
                    desc: 'A great ad is only half the equation. We design and optimise conversion-focused landing pages that match the intent of your keywords, reduce friction, and compel visitors to submit an enquiry.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Results-Driven */}
          <section className="bg-orange-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Transparent, Results-Driven Reporting</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    We believe you should always know exactly how your budget is performing. Every client receives access to a live reporting dashboard that shows impressions, clicks, conversions, cost per lead, and return on ad spend — updated in real time. Our monthly strategy calls walk you through performance trends and the optimisations we have implemented to keep your campaigns moving in the right direction.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Weekly performance summaries with actionable commentary',
                      'Full access to your Google Ads account — you own the data, always',
                      'Conversion tracking set up across all lead sources including calls, forms, and chat',
                      'Regular A/B testing of ad copy, bidding strategies, and landing pages',
                      'Monthly strategy reviews with clear recommendations for the next period',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Industries We Serve */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Our Google PPC management service is particularly well-suited to regulated and competitive sectors where the cost per click is high and campaign structure is critical. We have extensive experience managing accounts in the following verticals:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Legal & Claims Management', 'Financial Services', 'Energy & Utilities',
                    'Home Improvement', 'Healthcare & Insurance', 'Property & Letting',
                  ].map((industry, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <TrendingUp className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">{industry}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Ready to Get More from Google Ads?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Whether you are starting from scratch or looking to rescue a struggling account, NAASS can help. Get in touch for a free PPC audit and discover how much more your budget could be achieving.
                </p>
                <Link
                  href="/get-started"
                  className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Request a Free Quote
                </Link>
              </motion.div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
