import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Sparkles, 
  Mail, 
  Clock, 
  ArrowRight,
  Phone,
  MessageSquare,
  Calendar,
  Zap,
  Trophy,
  Star,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "We typically respond within 2-4 hours during business hours",
    "Check your email for a confirmation message",
    "Our team is already reviewing your requirements",
    "You can expect a personalized solution tailored to your needs"
  ];

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      if (confetti) {
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
        });
      }
    }, 250);

    // Show content after a delay
    setTimeout(() => setShowContent(true), 500);

    // Rotate tips
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, []);

  const nextSteps = [
    {
      icon: Mail,
      title: "Check Your Email",
      description: "We've sent a confirmation to your inbox",
      delay: 0.2
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Our team will contact you within 24 hours",
      delay: 0.3
    },
    {
      icon: MessageSquare,
      title: "Personalized Solution",
      description: "We'll prepare a custom strategy for your business",
      delay: 0.4
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      description: "Book a consultation at your convenience",
      delay: 0.5
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Heart },
    { number: "98%", label: "Success Rate", icon: Trophy },
    { number: "24/7", label: "Support", icon: Zap },
    { number: "5★", label: "Average Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-gray-500/10 to-gray-500/10" />
        <div className="absolute inset-0 mesh-gradient opacity-30 animate-gradient-xy" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              {/* Success Message */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className="inline-flex items-center justify-center w-24 h-24 mb-6"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-accent-500 to-gray-600 rounded-full blur-xl opacity-50"
                    />
                    <CheckCircle className="relative w-24 h-24 text-gray-500" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-6xl font-bold text-orange-500 mb-4"
                >
                  Thank You!
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-orange-500/80 mb-2"
                >
                  Your submission has been received successfully
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-2 text-gray-700"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg">We're excited to work with you!</span>
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>

              {/* Animated tip banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-12"
              >
                <div className="glass rounded-2xl p-4 border border-gray-400/30">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTip}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center text-orange-500/70 flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-orange-500" />
                      {tips[currentTip]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-orange-500 text-center mb-8">
                  What Happens Next?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {nextSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + step.delay }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass rounded-xl p-6 border border-white/10 hover:border-gray-400/50 transition-all duration-300"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                        className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl flex items-center justify-center mb-4"
                      >
                        <step.icon className="w-6 h-6 text-gray-700" />
                      </motion.div>
                      <h3 className="text-orange-500 font-semibold mb-2">{step.title}</h3>
                      <p className="text-orange-500/60 text-sm">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-12"
              >
                <div className="glass rounded-3xl p-8 border border-gray-400/20">
                  <h3 className="text-xl font-bold text-orange-500 text-center mb-6">
                    Why Businesses Choose NAASS
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: 1.4 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="text-center"
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        >
                          <stat.icon className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                        </motion.div>
                        <div className="text-2xl font-bold text-orange-500">{stat.number}</div>
                        <div className="text-orange-500/60 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-gradient-to-r from-accent-500 to-gray-600 text-orange-500 rounded-xl font-semibold hover:shadow-xl hover:shadow-gray-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Back to Home
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+442012345678"
                  className="px-8 py-4 glass border border-gray-400/30 text-orange-500 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </motion.a>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="text-center mt-12 text-orange-500/60"
              >
                <p className="mb-2">Need immediate assistance?</p>
                <p className="text-orange-500">
                  📧 info@naass.co.uk | 📱 +44 20 1234 5678
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThankYou;