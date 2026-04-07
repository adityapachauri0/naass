import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, Users, TrendingUp, Home, Leaf } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Eco4Page() {
  return (
    <>
      <SEOHead
        title="ECO 4 Lead Generation Services"
        description="Get high-quality ECO 4 leads from NAASS. We generate qualified leads for energy efficiency improvements, boiler upgrades, and insulation services across the UK."
        keywords="ECO 4 leads, energy efficiency leads, ECO scheme leads UK, boiler upgrade leads, insulation leads, ECO 4 scheme, free boiler leads, energy grants UK"
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
                <Leaf className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Government-backed ECO 4 Scheme</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                ECO 4 Lead Generation Services
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with homeowners who qualify for government-funded energy efficiency improvements. Our ECO 4 leads are pre-screened, verified, and ready to convert — helping you grow your installation business without the hassle of cold outreach.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Started Today
              </Link>
            </motion.div>
          </section>

          {/* What are ECO 4 Leads */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are ECO 4 Leads?</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    The Energy Company Obligation (ECO 4) is the UK government's flagship scheme designed to help low-income and fuel-poor households reduce their energy bills through free or heavily subsidised home improvements. Qualifying measures include first-time central heating, loft insulation, cavity wall insulation, solid wall insulation, and heat pump installations.
                  </p>
                  <p className="text-gray-600 text-lg">
                    An ECO 4 lead is a homeowner or tenant who has been identified as potentially eligible for these grant-funded improvements. Our leads are generated through targeted digital campaigns and rigorous pre-qualification, ensuring that every enquiry you receive has a genuine need and meets the core eligibility criteria before it reaches your team.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* How We Generate ECO 4 Leads */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">How We Generate ECO 4 Leads</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
                    title: 'Targeted Paid Media',
                    desc: 'We run precision-targeted Facebook, Instagram, and Google campaigns aimed at households in the correct income bands and property types most likely to qualify under ECO 4 criteria.',
                  },
                  {
                    icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
                    title: 'Real-Time Pre-Qualification',
                    desc: 'Every prospect completes a multi-step qualification survey covering tenure, benefits status, EPC rating, and property type — filtering out ineligible enquiries before they reach you.',
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-orange-500" />,
                    title: 'Instant Lead Delivery',
                    desc: 'Qualified leads are delivered to your CRM or email in real time via webhook or our secure portal, so your team can follow up while interest is at its peak.',
                  },
                  {
                    icon: <Users className="w-6 h-6 text-orange-500" />,
                    title: 'Ongoing Optimisation',
                    desc: 'Our campaigns are continuously analysed and refined based on conversion data, meaning lead quality improves over time as we learn what works best for your specific offering.',
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

          {/* Who Qualifies */}
          <section className="bg-orange-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Qualifies for ECO 4?</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Our pre-qualification process focuses on the eligibility criteria set by Ofgem. The leads we deliver typically meet one or more of the following conditions:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Households receiving means-tested benefits such as Universal Credit, Pension Credit, or Child Tax Credit',
                      'Properties with an EPC rating of D, E, F, or G — indicating poor energy efficiency',
                      'Owner-occupiers and private tenants in eligible postcodes across England, Wales, and Scotland',
                      'Low-income households identified under the Local Authority Flexible Eligibility (LA Flex) route',
                      'Fuel-poor households spending a disproportionate share of income on energy costs',
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

          {/* Benefits */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Our ECO 4 Leads</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Unlike bought lists or generic enquiries, every NAASS ECO 4 lead is generated fresh for your business. We never recycle aged leads or resell the same prospect to multiple installers simultaneously. Our clients consistently report survey-to-installation conversion rates that exceed industry averages, driven by the quality of our pre-screening and the speed of our delivery.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Pre-Screened', desc: 'Each lead verified against ECO 4 eligibility criteria' },
                    { title: 'Real-Time', desc: 'Delivered instantly so you can follow up at the right moment' },
                    { title: 'UK Nationwide', desc: 'Coverage across England, Scotland, and Wales' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center p-6 bg-white border border-orange-100 rounded-2xl"
                    >
                      <h3 className="text-orange-500 font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Ready to Scale Your ECO 4 Installation Business?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Join the growing number of UK installers who trust NAASS for a consistent pipeline of verified ECO 4 leads. Request a free quote today and we'll put together a bespoke lead package for your coverage area.
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
