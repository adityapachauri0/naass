import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Share2, Target, Users, BarChart2, CheckCircle, Zap } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function SocialMediaPage() {
  return (
    <>
      <SEOHead
        title="Social Media Advertising Services"
        description="Targeted social media advertising from NAASS. We run high-converting campaigns on Facebook, Instagram, LinkedIn, and TikTok to generate quality leads."
        keywords="social media advertising UK, Facebook ads lead generation, social media marketing, Instagram advertising, LinkedIn advertising, TikTok ads UK, paid social media"
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
                <Share2 className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Multi-Platform Paid Social Campaigns</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                Social Media Advertising Services
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Your potential customers are spending hours every day on social media. NAASS places your brand in front of precisely the right audiences at exactly the right moment — with creative that stops the scroll and funnels that convert attention into qualified leads.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Started Today
              </Link>
            </motion.div>
          </section>

          {/* Platforms We Cover */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Platforms We Advertise On</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        platform: 'Facebook & Instagram',
                        desc: 'With over 40 million active users in the UK, Meta\'s platforms offer unparalleled reach and the most sophisticated audience targeting available in paid social. We use lead generation forms, conversion campaigns, and retargeting to build a consistent pipeline of enquiries at a competitive cost per lead.',
                      },
                      {
                        platform: 'LinkedIn',
                        desc: 'For B2B clients and professional services, LinkedIn provides access to decision-makers by job title, company size, seniority, and industry. We run thought leadership campaigns, lead gen form ads, and Conversation Ads to generate high-value B2B enquiries.',
                      },
                      {
                        platform: 'TikTok',
                        desc: 'TikTok\'s explosive growth in the UK has created a significant opportunity for brands willing to invest in authentic, creative short-form video. We produce and manage TikTok campaigns that reach younger demographics and deliver surprisingly strong lead generation results for the right offers.',
                      },
                      {
                        platform: 'YouTube & Google Display',
                        desc: 'Video pre-roll and display advertising complement your paid search campaigns by building brand familiarity and re-engaging warm audiences across Google\'s vast display network, keeping your brand top of mind throughout the buyer\'s journey.',
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-orange-500 font-bold text-lg mb-3">{item.platform}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach to Social Media Advertising</h2>
                <p className="text-gray-600 text-lg mb-4">
                  Effective paid social is not about boosting posts or running generic awareness campaigns. It is about understanding your audience deeply, crafting creative that resonates, building funnels that guide prospects from curiosity to commitment, and continuously testing and optimising to improve performance over time.
                </p>
                <p className="text-gray-600 text-lg mb-8">
                  Every campaign we manage begins with a detailed audience research phase. We map out your ideal customer's demographics, interests, behaviours, and pain points, then build audience segments that reflect those characteristics. This foundation ensures your ad spend reaches people who are genuinely likely to become customers, rather than generating clicks that never convert.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: <Target className="w-5 h-5 text-orange-500" />, title: 'Audience Strategy', desc: 'Custom and lookalike audiences built from your existing customer data, plus interest and behaviour-based prospecting segments.' },
                    { icon: <Zap className="w-5 h-5 text-orange-500" />, title: 'Creative Production', desc: 'Scroll-stopping static images, carousel ads, and short-form video content tailored to each platform\'s format and audience expectations.' },
                    { icon: <BarChart2 className="w-5 h-5 text-orange-500" />, title: 'Funnel Architecture', desc: 'Full-funnel campaign structures covering awareness, consideration, and conversion stages — with retargeting sequences that nurture prospects through to enquiry.' },
                    { icon: <Users className="w-5 h-5 text-orange-500" />, title: 'Continuous Testing', desc: 'Systematic A/B testing of audiences, creatives, ad copy, and landing pages — with learnings fed back into campaign improvements every week.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                    >
                      <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Targeting Capabilities */}
          <section className="bg-orange-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Targeting Capabilities</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    The power of social media advertising lies in its precision. Unlike broadcast media, we can reach your ideal customer based on an extraordinarily granular set of criteria, ensuring your budget is concentrated on the audiences most likely to convert.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Geographic targeting at national, regional, or postcode level',
                      'Demographic filtering by age, gender, relationship status, and life events',
                      'Interest and behaviour targeting based on browsing history and platform activity',
                      'Job title, industry, and company size targeting via LinkedIn',
                      'Custom audiences built from your email lists, website visitors, or CRM data',
                      'Lookalike audiences modelled on your highest-value existing customers',
                      'Retargeting sequences for website visitors, video viewers, and form openers',
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

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Let's Build Your Social Media Lead Machine</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Whether you are new to paid social or looking to improve the performance of existing campaigns, NAASS can design and manage a strategy that delivers measurable results. Contact us today for a free strategy consultation.
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
