import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
  onLoad?: () => void;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23333"%3E%3C/rect%3E%3C/svg%3E',
  srcSet,
  sizes,
  onLoad,
  priority = false,
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority, loading]);

  // Preload image
  useEffect(() => {
    if (imageSrc !== placeholder) {
      const img = new Image();
      img.src = imageSrc;
      if (srcSet) {
        img.srcset = srcSet;
      }
      img.onload = () => {
        setImageLoaded(true);
        if (onLoad) {
          onLoad();
        }
      };
    }
  }, [imageSrc, srcSet, placeholder, onLoad]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder with blur effect */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"
          style={{
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      {/* Main Image */}
      <motion.img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        srcSet={srcSet}
        sizes={sizes}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setImageLoaded(true)}
        decoding={priority ? 'sync' : 'async'}
        // SEO and Accessibility
        itemProp="image"
        {...(width && height && {
          style: {
            aspectRatio: `${width}/${height}`,
          },
        })}
      />
      
      {/* Loading shimmer effect */}
      {!imageLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}
    </div>
  );
};

export default OptimizedImage;