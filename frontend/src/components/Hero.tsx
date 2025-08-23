import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users, Award, Zap } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    { label: 'Leads Generated', value: 50000, suffix: '+', icon: TrendingUp, color: 'from-neon-pink to-neon-purple' },
    { label: 'Happy Clients', value: 200, suffix: '+', icon: Users, color: 'from-neon-blue to-secondary-400' },
    { label: 'Success Rate', value: 95, suffix: '%', icon: Award, color: 'from-neon-green to-neon-yellow' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-neon-pink via-neon-purple to-primary-600 rounded-full blur-3xl opacity-30"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-neon-blue via-secondary-400 to-neon-green rounded-full blur-3xl opacity-30"
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-neon-pink to-neon-blue rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              boxShadow: '0 0 20px rgba(255, 16, 240, 0.8)',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-6 border border-neon-pink/30"
            >
              <Sparkles className="w-5 h-5 text-neon-yellow animate-pulse" />
              <span className="text-white font-medium">
                Creating Monumental Customer Growth
              </span>
              <Zap className="w-5 h-5 text-neon-blue animate-pulse" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              See what your business
              <br />
              <span className="gradient-text-warm">can do with </span>
              <span className="gradient-text">NAASS Leads</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              We'll Generate You <span className="text-neon-pink font-semibold">Quality Digital Leads</span> Without Risk. 
              Specialising in online lead generation with <span className="text-neon-blue font-semibold">tailored strategies</span> that 
              connect your brand with the right audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group btn-neon text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-neon-pink inline-block"
              >
                <span>Get A Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-dark text-white px-10 py-5 rounded-full font-bold text-lg border border-white/20 hover:border-neon-blue/50 transition-all duration-300 hover:shadow-neon-blue inline-block"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass rounded-3xl p-8 text-center border border-white/10 hover:border-neon-pink/50 transition-all duration-300 card-hover"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 animate-pulse`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  {inView && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <p className="text-white/80 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-12 border-2 border-neon-pink/50 rounded-full flex justify-center glow-hover"
            >
              <div className="w-2 h-4 bg-gradient-to-b from-neon-pink to-neon-blue rounded-full mt-2 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;