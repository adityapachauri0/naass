import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, CheckCircle, Users, TrendingUp, Target, Handshake, Award } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About NAASS"
        description="Learn about NAASS, a UK-based lead generation and digital marketing agency delivering quality ECO 4, Housing Disrepair, and Life Insurance leads to businesses across the United Kingdom."
        keywords="about NAASS, UK lead generation agency, digital marketing agency London, ECO 4 leads, housing disrepair leads, life insurance leads, lead generation company UK"
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
                <Users className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">UK Lead Generation Specialists</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                About NAASS
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We help UK businesses grow by connecting them with pre-qualified prospects who are ready to convert. Transparent, data-driven, and results-focused.
              </p>
              <Link
                href="/get-started"
                className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
              >
                Get Started Today
              </Link>
            </motion.div>
          </section>

          {/* Who We Are */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    NAASS is a UK-based lead generation agency specialising in connecting businesses with pre-qualified prospects across multiple sectors including ECO 4 energy efficiency, housing disrepair claims, and life insurance. Based in London, we serve clients nationwide.
                  </p>
                  <p className="text-gray-600 text-lg">
                    Our team combines deep expertise in digital marketing, paid media, and conversion optimisation to deliver leads that genuinely move the needle for our clients. Whether you are an installer looking for ECO 4 referrals or a solicitor seeking housing disrepair cases, we build bespoke campaigns tailored to your exact requirements.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg mb-4">
                  To deliver measurable business growth through high-quality, ethically sourced leads that convert. We believe lead generation should be transparent, data-driven, and results-focused.
                </p>
                <p className="text-gray-600 text-lg">
                  Every campaign we run is built around accountability. We track performance at every stage, share the data openly with our clients, and continuously refine our approach so that your cost per acquisition keeps falling and your pipeline keeps growing.
                </p>
              </motion.div>
            </div>
          </section>

          {/* What Sets Us Apart */}
          <section className="bg-orange-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What Sets Us Apart</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <ShieldCheck className="w-6 h-6 text-orange-500" />,
                      title: 'Exclusive Leads',
                      desc: 'Every lead we generate is exclusive to your business. We never share or resell prospects to multiple buyers, ensuring you have the best possible chance of conversion without competing for attention.',
                    },
                    {
                      icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
                      title: 'Pre-Qualification',
                      desc: 'Our rigorous screening process filters out unqualified enquiries before they reach you. Each prospect is verified against key eligibility criteria, saving your team time and boosting your conversion rates.',
                    },
                    {
                      icon: <Zap className="w-6 h-6 text-orange-500" />,
                      title: 'Real-Time Delivery',
                      desc: 'Leads are delivered instantly to your CRM or email via secure webhooks. Speed matters in lead conversion, and we ensure your team can follow up while interest is at its peak.',
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
                      title: 'Performance Focus',
                      desc: 'We continuously optimise every campaign based on real conversion data. Our approach is never set-and-forget; we analyse, iterate, and improve so that lead quality strengthens over time.',
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
            </div>
          </section>

          {/* Our Services */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                <p className="text-gray-600 text-lg mb-8">
                  We generate high-quality leads across a range of sectors, combining targeted paid media, SEO, and social campaigns to connect your business with the right prospects.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'ECO 4 Leads', href: '/services/eco-4', desc: 'Pre-qualified homeowners eligible for government-funded energy efficiency improvements.' },
                  { title: 'Housing Disrepair', href: '/services/housing-disrepair', desc: 'Tenants with legitimate disrepair claims ready for legal consultation.' },
                  { title: 'Life Insurance', href: '/services/life-insurance', desc: 'Prospects actively seeking life insurance quotes and policy comparisons.' },
                  { title: 'Google PPC', href: '/services/google-ppc', desc: 'High-intent leads captured through precision Google Ads campaigns.' },
                  { title: 'Social Media', href: '/services/social-media', desc: 'Engaged audiences converted into qualified leads via social platforms.' },
                ].map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={service.href}
                      className="block p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all group"
                    >
                      <h3 className="text-orange-500 font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.desc}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <Handshake className="w-6 h-6 text-orange-500" />, title: 'Partnership', desc: 'We treat every client relationship as a long-term collaboration, not a transaction.' },
                    { icon: <Target className="w-6 h-6 text-orange-500" />, title: 'Precision', desc: 'Data informs every decision we make, from targeting to optimisation.' },
                    { icon: <TrendingUp className="w-6 h-6 text-orange-500" />, title: 'Growth', desc: 'Your success is our benchmark. We measure ourselves by your results.' },
                    { icon: <Award className="w-6 h-6 text-orange-500" />, title: 'Integrity', desc: 'Ethical sourcing, honest reporting, and transparent communication at all times.' },
                  ].map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center p-6 bg-white border border-orange-100 rounded-2xl"
                    >
                      <div className="flex justify-center mb-3">{value.icon}</div>
                      <h3 className="text-orange-500 font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Ready to Grow Your Business?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Get in touch today for a free, no-obligation consultation. We will put together a bespoke lead generation strategy tailored to your sector, coverage area, and growth targets.
                </p>
                <Link
                  href="/get-started"
                  className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
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
