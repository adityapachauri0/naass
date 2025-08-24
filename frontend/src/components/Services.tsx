import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Target, 
  Globe, 
  Users, 
  Zap,
  Home,
  Heart,
  Building
} from 'lucide-react';

const Services: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: Target,
      title: 'One Lead At a Time',
      description: 'Every lead is more than just a number—it\'s an opportunity to grow your business. We craft tailored strategies that connect your brand with the right audience.',
      color: 'from-gray-500 to-gray-500',
    },
    {
      icon: Globe,
      title: 'On a Grand Scale',
      description: 'We don\'t just generate leads—we scale your business to new heights with cutting-edge technology and creative solutions.',
      color: 'from-gray-500 to-gray-500',
    },
    {
      icon: Users,
      title: 'Affiliate Network',
      description: 'Years of expertise with a proven track record. Our comprehensive network of affiliates has been carefully selected and robustly tested.',
      color: 'from-gray-500 to-gray-500',
    },
  ];

  const sectors = [
    { icon: Zap, name: 'ECO 4', description: 'Energy efficiency schemes' },
    { icon: Home, name: 'Housing Disrepair', description: 'Property claim leads' },
    { icon: Heart, name: 'Life Insurance', description: 'Insurance lead generation' },
    { icon: Building, name: '& Many More', description: 'Custom campaigns' },
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            What We Do
          </h2>
          <p className="text-xl text-orange-500/80 max-w-3xl mx-auto">
            We'll Generate You Quality Digital Leads Without Risk
          </p>
        </motion.div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">{service.title}</h3>
              <p className="text-orange-500/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Sectors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-orange-500 mb-8 text-center">
            Sectors We Operate In
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-300">
                  <sector.icon className="w-10 h-10 text-gray-700" />
                </div>
                <h4 className="text-xl font-semibold text-orange-500 mb-2">{sector.name}</h4>
                <p className="text-orange-500/60 text-sm">{sector.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="text-center mt-8 text-orange-500/80 text-lg font-medium"
          >
            If you need a campaign, we can build it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;