import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Neon floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.1) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.1) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'conic-gradient(from 180deg, rgba(249,115,22,0.15), rgba(249,115,22,0.2), rgba(249,115,22,0.15), rgba(249,115,22,0.2), rgba(249,115,22,0.15))',
          filter: 'blur(60px)',
        }}
      />

      {/* Neon lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.line
          x1="10%"
          y1="10%"
          x2="30%"
          y2="30%"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.line
          x1="70%"
          y1="20%"
          x2="90%"
          y2="40%"
          stroke="url(#gradient2)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.line
          x1="20%"
          y1="70%"
          x2="40%"
          y2="90%"
          stroke="url(#gradient3)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Grid pattern with neon effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0, 0 0',
        }}
      />
      
      {/* Animated dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: '#f97316',
            boxShadow: '0 0 10px #f97316',
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;