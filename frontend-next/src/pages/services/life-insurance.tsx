import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RelatedServices from '../../components/RelatedServices';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, CheckCircle, Users, TrendingUp, ShieldCheck } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function LifeInsurancePage() {
  return (
    <>
      <SEOHead
        title="Life Insurance Lead Generation"
        description="Premium life insurance leads from NAASS. Connect with qualified prospects actively seeking life cover, critical illness, and income protection in the UK."
        keywords="life insurance leads UK, life cover leads, critical illness leads, income protection leads, life insurance broker leads, term life insurance leads"
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
                <Heart className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Premium Protection Insurance Leads</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                Life Insurance Lead Generation
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Stop chasing cold prospects. NAASS delivers life insurance leads from individuals who are actively researching and comparing cover options right now. Our rigorous qualification process means your advisers spend their time speaking with genuine, motivated buyers.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Started Today
              </Link>
            </motion.div>
          </section>

          {/* Our Life Insurance Leads */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Life Insurance Leads</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    We generate life insurance leads through a combination of paid search, social media advertising, and content marketing. Every individual who submits an enquiry has voluntarily requested information about life cover — there is no cold calling, no data scraping, and no purchased lists involved in our process.
                  </p>
                  <p className="text-gray-600 text-lg">
                    Before a lead reaches your team, we capture key information including the type of cover required, age, smoking status, and the level of sum assured the prospect has in mind. This data allows your advisers to prepare tailored quotes before they even pick up the phone, dramatically improving the quality of the first conversation and the likelihood of conversion.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Types of Cover */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Types of Cover We Generate Leads For</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
                    title: 'Term Life Insurance',
                    desc: 'Prospects seeking straightforward level-term or decreasing-term policies, often triggered by a new mortgage, marriage, or the birth of a child. These leads are highly motivated and frequently convert quickly.',
                  },
                  {
                    icon: <Heart className="w-6 h-6 text-orange-500" />,
                    title: 'Critical Illness Cover',
                    desc: 'Individuals looking to protect their income and lifestyle against serious diagnoses such as cancer, heart attack, and stroke. Critical illness enquiries tend to come from slightly older demographics with higher disposable income.',
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
                    title: 'Income Protection',
                    desc: 'Self-employed individuals and professionals seeking long-term income protection in the event of illness or disability. This is a growing market with strong demand driven by awareness campaigns.',
                  },
                  {
                    icon: <Users className="w-6 h-6 text-orange-500" />,
                    title: 'Whole of Life & Over 50s Plans',
                    desc: 'Enquiries from older prospects seeking guaranteed acceptance policies for funeral planning or estate purposes. These leads have a clear, specific need and typically have a shorter decision-making cycle.',
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

          {/* Lead Quality Guarantee */}
          <section className="bg-orange-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Lead Quality Guarantee</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    We understand that poor-quality leads waste your advisers' time and erode team morale. That is why we have built quality assurance into every stage of our lead generation process. All leads are generated with explicit consent under UK GDPR, and we offer a straightforward replacement policy for any leads that fail to meet the agreed qualification criteria.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'All prospects have actively requested information about life insurance or protection cover',
                      'Key data fields — age, smoking status, cover type, and desired sum assured — are captured at point of enquiry',
                      'Leads are delivered exclusively to one firm and never recycled or resold',
                      'GDPR-compliant consent is recorded at source with full audit trail',
                      'Replacement leads issued for contacts who are unreachable or significantly misrepresent their circumstances',
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

          {/* How It Works */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { step: '1', title: 'Choose Your Lead Type', desc: 'Select the cover types and prospect profile that align with your product range and adviser expertise.' },
                    { step: '2', title: 'We Generate & Qualify', desc: 'Our campaigns run continuously, generating fresh enquiries that are screened against your agreed criteria before delivery.' },
                    { step: '3', title: 'Convert & Grow', desc: 'Receive leads in real time via your preferred channel, follow up promptly, and watch your policy book grow.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm"
                    >
                      <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Services */}
          <RelatedServices currentSlug="life-insurance" />

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Grow Your Life Insurance Book Today</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Whether you are an independent financial adviser, a broker, or a direct insurer, NAASS can build a bespoke lead flow that aligns with your product range and compliance requirements. Get in touch for a free consultation.
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
