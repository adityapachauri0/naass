import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'David',
      role: 'CEO, HDR company',
      content: 'Our leads have drastically improved in both quantity and quality. Their expertise in social and Google PPC has exceeded our expectations, driving real growth for our business.',
      rating: 5,
    },
    {
      name: 'Ali',
      role: 'Marketing Director',
      content: 'This team delivered outstanding results across social, native, and search campaigns. They understood our needs and made a measurable impact on our business.',
      rating: 5,
    },
    {
      name: 'Lewis',
      role: 'Business Owner',
      content: 'Their dedication and tailored approach were unmatched. They treated our business like their own and delivered solutions that worked.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-orange-500/80 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-gray-700/30 mb-6" />
              
              {/* Content */}
              <p className="text-orange-500/90 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-lg">
                    {testimonials[currentIndex].name[0]}
                  </span>
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-orange-500/60">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white/10 backdrop-blur-sm p-3 rounded-full text-orange-500 hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white/10 backdrop-blur-sm p-3 rounded-full text-orange-500 hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-accent-500 to-gray-600'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;