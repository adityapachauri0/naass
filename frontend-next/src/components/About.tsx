import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Target, Handshake, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const values = [
    {
      icon: Heart,
      title: 'We Care',
      description: 'More than just marketers—we\'re partners invested in your success',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Data-driven strategies that connect with the right audience',
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'Collaboration, transparency, and genuine passion for what we do',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Meaningful impact that drives real business growth',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6">
              Work with a team <span className="gradient-text">who cares</span>
            </h2>
            
            <p className="text-orange-500/80 text-lg mb-8 leading-relaxed">
              At NAASS, we're more than just marketers—we're partners invested in your success. 
              Our team takes the time to understand your business, your goals, and your audience 
              to create personalized strategies that truly deliver.
            </p>

            <p className="text-orange-500/80 text-lg mb-8 leading-relaxed">
              Every campaign we launch is crafted with care, ensuring not just results but 
              meaningful impact. With a focus on collaboration, transparency, and a genuine 
              passion for what we do, we're here to grow your brand and support your vision 
              every step of the way.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-accent-500 to-gray-600 text-orange-500 px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-gray-500/25 transition-all duration-300"
            >
              Learn More About Us
            </motion.button>
          </motion.div>

          {/* Right Content - Values Grid */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center group"
              >
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-gray-500/30 group-hover:to-gray-500/30 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-orange-500 mb-2">{value.title}</h3>
                <p className="text-orange-500/60 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 glass rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-orange-500 mb-4">
            When you work with us, you work with a team who truly cares about your success.
          </h3>
          <p className="text-orange-500/70 text-lg max-w-3xl mx-auto">
            With years of expertise and a proven track record, we've helped businesses 
            across multiple sectors achieve extraordinary growth through quality lead generation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;