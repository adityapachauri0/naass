import SEOHead from '../../components/SEOHead';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Home, Heart, Monitor, Share2, ArrowRight } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const services = [
  {
    icon: <Zap className="w-7 h-7 text-orange-500" />,
    title: 'ECO 4 Leads',
    href: '/services/eco-4',
    description:
      'We generate pre-qualified ECO 4 leads from homeowners and tenants who meet the eligibility criteria for government-funded energy efficiency improvements. Every lead is screened for property type, tenure, and benefit status before it reaches your team, so your installers spend less time qualifying and more time booking surveys.',
  },
  {
    icon: <Home className="w-7 h-7 text-orange-500" />,
    title: 'Housing Disrepair',
    href: '/services/housing-disrepair',
    description:
      'Our housing disrepair lead generation connects solicitors and claims management firms with tenants who have legitimate disrepair issues in their rented properties. Each prospect is verified against key criteria including tenancy length, landlord notification, and the nature of the disrepair before being delivered to your team.',
  },
  {
    icon: <Heart className="w-7 h-7 text-orange-500" />,
    title: 'Life Insurance',
    href: '/services/life-insurance',
    description:
      'We supply exclusive life insurance leads from individuals actively seeking quotes and policy comparisons. Our campaigns target prospects at key life stages, including new homeowners, growing families, and professionals reviewing their financial protection, ensuring your advisers speak with people who are genuinely ready to buy.',
  },
  {
    icon: <Monitor className="w-7 h-7 text-orange-500" />,
    title: 'Google PPC Management',
    href: '/services/google-ppc',
    description:
      'Our Google PPC management service captures high-intent search traffic and converts it into qualified leads for your business. We handle keyword research, ad copy, bid strategy, and landing page optimisation to maximise your return on ad spend while keeping your cost per acquisition as low as possible.',
  },
  {
    icon: <Share2 className="w-7 h-7 text-orange-500" />,
    title: 'Social Media Advertising',
    href: '/services/social-media',
    description:
      'We run targeted social media advertising campaigns across Facebook, Instagram, and TikTok to generate qualified leads at scale. From creative production to audience segmentation and retargeting, we manage the entire funnel so you receive a steady flow of prospects who are primed to convert.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title="Our Services"
        description="NAASS offers premium lead generation services across ECO 4, housing disrepair, life insurance, Google PPC management, and social media advertising. Explore our full range of UK lead generation solutions."
        keywords="lead generation services UK, ECO 4 leads, housing disrepair leads, life insurance leads, Google PPC management, social media advertising, UK digital marketing services, NAASS services"
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
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services' },
                ]}
              />
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                Our Services
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                From exclusive lead generation to full-service paid media management, NAASS provides the tools and expertise UK businesses need to build a reliable pipeline of qualified prospects. Explore our services below to find the right solution for your sector.
              </p>
            </motion.div>
          </section>

          {/* Service Cards */}
          <section className="container mx-auto px-4 mb-20">
            <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={service.href}
                    className="block p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                          {service.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                          Learn more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Ready to Get Started?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Whether you need a steady flow of ECO 4 leads or a fully managed PPC campaign, we will build a bespoke strategy around your business goals. Get in touch today for a free, no-obligation consultation.
                </p>
                <Link
                  href="/get-started"
                  className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
                >
                  Get Started Today
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
