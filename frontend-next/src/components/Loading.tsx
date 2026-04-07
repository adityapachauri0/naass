import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ 
  fullScreen = false, 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const dotSizes = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Logo Animation */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`${sizeClasses[size]} bg-gradient-to-br from-gray-500 to-gray-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50`}
      >
        <svg 
          width={size === 'small' ? 16 : size === 'medium' ? 24 : 32}
          height={size === 'small' ? 16 : size === 'medium' ? 24 : 32}
          viewBox="0 0 24 24" 
          fill="white"
          className="transform"
          style={{ transform: 'rotate(345deg)' }}
        >
          <path d="M3 3l18 9-9 2-2 9z" />
        </svg>
      </motion.div>

      {/* Loading Dots */}
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${dotSizes[size]} bg-gradient-to-r from-black to-black rounded-full`}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Loading Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-orange-500/70 text-sm font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="absolute inset-0 mesh-gradient opacity-30 animate-gradient-xy" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
};

// Skeleton Loading Component
export const Skeleton: React.FC<{
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave';
  width?: string | number;
  height?: string | number;
}> = ({ 
  className = '', 
  variant = 'rectangular',
  animation = 'pulse',
  width,
  height,
}) => {
  const baseClasses = 'bg-white/10';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Page Loading Component
export const PageLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 mesh-gradient opacity-30 animate-gradient-xy" />
      <div className="fixed inset-0 bg-black/50" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-12">
          <Skeleton width={150} height={40} />
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} width={80} height={32} />
            ))}
          </div>
        </div>

        {/* Hero Skeleton */}
        <div className="mb-20">
          <Skeleton className="mb-4" width="60%" height={48} />
          <Skeleton className="mb-2" width="80%" height={24} />
          <Skeleton className="mb-8" width="70%" height={24} />
          <div className="flex gap-4">
            <Skeleton width={120} height={48} />
            <Skeleton width={120} height={48} />
          </div>
        </div>

        {/* Content Skeletons */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass rounded-xl p-6">
              <Skeleton variant="circular" width={64} height={64} className="mb-4" />
              <Skeleton className="mb-2" height={28} />
              <Skeleton className="mb-1" height={20} />
              <Skeleton className="mb-1" height={20} />
              <Skeleton width="60%" height={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;