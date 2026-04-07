import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Home, Heart, Monitor, Share2 } from 'lucide-react';

const allServices = [
  { name: 'ECO 4 Leads', href: '/services/eco-4', icon: Zap, desc: 'Government-backed energy efficiency leads' },
  { name: 'Housing Disrepair', href: '/services/housing-disrepair', icon: Home, desc: 'Tenant compensation claim leads' },
  { name: 'Life Insurance', href: '/services/life-insurance', icon: Heart, desc: 'Qualified life cover prospect leads' },
  { name: 'Google PPC', href: '/services/google-ppc', icon: Monitor, desc: 'Expert Google Ads campaign management' },
  { name: 'Social Media Ads', href: '/services/social-media', icon: Share2, desc: 'Targeted social media advertising' },
];

interface RelatedServicesProps {
  currentSlug: string;
}

const RelatedServices: React.FC<RelatedServicesProps> = ({ currentSlug }) => {
  const related = allServices.filter(s => s.href !== `/services/${currentSlug}`);

  return (
    <section className="container mx-auto px-4 mb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Our Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((service, i) => (
              <Link key={service.href} href={service.href} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-gray-500 text-sm">{service.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedServices;
