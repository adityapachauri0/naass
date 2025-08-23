import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{ 
          transformOrigin: '0%',
          background: `linear-gradient(90deg, #ff10f0 0%, #00d4ff ${scrollProgress}%, #39ff14 100%)`,
          boxShadow: '0 2px 10px rgba(255, 16, 240, 0.5)',
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        className="fixed top-0 left-0 right-0 h-4 z-[99] origin-left blur-xl"
        style={{ 
          transformOrigin: '0%',
          background: `linear-gradient(90deg, #ff10f0 0%, #00d4ff ${scrollProgress}%, #39ff14 100%)`,
          opacity: 0.5,
        }}
      />
    </>
  );
};

export default ScrollIndicator;