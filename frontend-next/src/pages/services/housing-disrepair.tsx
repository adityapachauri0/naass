import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Users, ClipboardList, TrendingUp } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HousingDisrepairPage() {
  return (
    <>
      <SEOHead
        title="Housing Disrepair Lead Generation"
        description="Quality housing disrepair leads from NAASS. We connect you with tenants seeking compensation for landlord negligence, damp, mould, and structural issues."
        keywords="housing disrepair leads, tenant compensation leads, disrepair claims leads UK, damp and mould leads, housing claims, landlord negligence leads"
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
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Verified Tenant Compensation Leads</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                Housing Disrepair Lead Generation
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We connect law firms and claims management companies with tenants who have reported unresolved maintenance issues to their landlord. Every housing disrepair lead is pre-screened for claim viability, ensuring your team spends time on cases that convert.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Started Today
              </Link>
            </motion.div>
          </section>

          {/* What Are Housing Disrepair Leads */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Housing Disrepair Leads?</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    Under the Homes (Fitness for Human Habitation) Act 2018 and the Landlord and Tenant Act 1985, social housing tenants and private renters have the legal right to live in a property that is maintained to a habitable standard. When landlords fail to carry out repairs within a reasonable timeframe, tenants may be entitled to compensation and an order for works to be completed.
                  </p>
                  <p className="text-gray-600 text-lg">
                    A housing disrepair lead is a tenant who has reported a maintenance issue to their landlord, received an inadequate response or no response at all, and is actively seeking legal advice about their options. NAASS identifies these individuals through targeted digital campaigns and qualifies each enquiry against key claim criteria before forwarding it to your team.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Types of Claims */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Types of Disrepair Claims We Cover</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
                    title: 'Damp & Mould',
                    desc: 'Rising and penetrating damp, condensation, and black mould growth are among the most common disrepair complaints. These issues carry serious health implications and are frequently upheld in court.',
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-orange-500" />,
                    title: 'Structural Defects',
                    desc: 'Cracked walls, subsidence, failing roofs, and damaged foundations fall under a landlord\'s statutory repair obligations. Tenants affected by structural issues often have strong claims for compensation.',
                  },
                  {
                    icon: <ClipboardList className="w-6 h-6 text-orange-500" />,
                    title: 'Heating & Hot Water Failures',
                    desc: 'Broken boilers, faulty radiators, and persistent lack of hot water constitute a breach of the landlord\'s duty to maintain installations. These claims are well-documented and straightforward to pursue.',
                  },
                  {
                    icon: <Users className="w-6 h-6 text-orange-500" />,
                    title: 'Pest Infestations & Drainage',
                    desc: 'Rodent and insect infestations caused by structural gaps, as well as blocked or defective drainage systems, are actionable under disrepair law when reported and left unresolved.',
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

          {/* Lead Generation Process */}
          <section className="bg-orange-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Lead Generation Process</h2>
                  <p className="text-gray-600 text-lg mb-8">
                    We use a structured funnel to ensure every lead passed to your firm is genuinely qualified and has a viable claim history. Our process involves four key stages:
                  </p>
                  <div className="space-y-4">
                    {[
                      { step: '01', title: 'Tenant Identification', desc: 'Targeted social media and search campaigns reach tenants who are actively searching for legal help or experiencing housing issues.' },
                      { step: '02', title: 'Initial Qualification', desc: 'A digital questionnaire establishes tenure type, landlord type (council, housing association, or private), the nature of the disrepair, and how long the issue has persisted.' },
                      { step: '03', title: 'Notification Confirmation', desc: 'We verify that the tenant has formally notified their landlord of the issue — a critical requirement for a valid disrepair claim.' },
                      { step: '04', title: 'Live Transfer or Data Delivery', desc: 'Qualified leads are delivered in real time via your preferred method — live phone transfer, email, or CRM webhook — so your team can act immediately.' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm"
                      >
                        <span className="text-2xl font-black text-orange-500/30 flex-shrink-0 w-10">{item.step}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Why Choose NAASS */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose NAASS for Housing Disrepair Leads?</h2>
                <p className="text-gray-600 text-lg mb-6">
                  The housing disrepair market is competitive, and the quality of leads varies enormously between providers. At NAASS, we apply strict eligibility filters that mirror the legal criteria your case handlers use. We do not sell recycled data or shared leads — every enquiry is generated specifically for your firm and delivered exclusively. Our performance-based model means we are as invested in your conversion rate as you are.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Exclusive', desc: 'Each lead sent to one firm only' },
                    { title: 'Pre-Qualified', desc: 'Landlord notification confirmed' },
                    { title: 'Compliant', desc: 'GDPR-consent recorded at source' },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                      <h3 className="text-orange-500 font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
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
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Start Receiving Housing Disrepair Leads</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Whether you're a claims management company or a solicitors' firm looking to grow your housing disrepair caseload, NAASS can deliver a consistent volume of pre-qualified leads. Get in touch for a free consultation.
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
