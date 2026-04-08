import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, Home, Heart, Monitor, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const services = [
  { name: 'ECO 4 Leads', href: '/services/eco-4', icon: Zap },
  { name: 'Housing Disrepair', href: '/services/housing-disrepair', icon: Home },
  { name: 'Life Insurance', href: '/services/life-insurance', icon: Heart },
  { name: 'Google PPC', href: '/services/google-ppc', icon: Monitor },
  { name: 'Social Media Ads', href: '/services/social-media', icon: Share2 },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-3 shadow-black' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -3, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-500 rounded-full flex items-center justify-center shadow-lg shadow-gray-500/50"
                >
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="white"
                    className="transform" style={{ transform: 'rotate(345deg)' }}
                    role="img" aria-label="NAASS Leads logo"
                  >
                    <path d="M3 3l18 9-9 2-2 9z" />
                  </svg>
                </motion.div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-3xl font-black text-orange-500 tracking-wider">NAASS</span>
                <span className="text-xs text-orange-500 font-medium tracking-widest uppercase">Leads</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.slice(0, 1).map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative text-orange-500/90 hover:text-orange-500 transition-all duration-200 font-medium group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-600 group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="relative text-orange-500/90 hover:text-orange-500 transition-all duration-200 font-medium group flex items-center gap-1"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-600 group-hover:w-full transition-all duration-300" />
              </motion.button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors"
                      >
                        <service.icon className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700 text-sm font-medium">{service.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.slice(1).map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 2) * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative text-orange-500/90 hover:text-orange-500 transition-all duration-200 font-medium group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-gray-600 group-hover:w-full transition-all duration-300" />
                </motion.span>
              </Link>
            ))}

            <Link
              href="/get-started"
              className="px-5 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-orange-500 p-2 rounded-lg glass hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 glass-dark rounded-2xl p-4"
            >
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-orange-500/90 hover:text-orange-500 transition-colors font-medium hover:pl-2"
                >
                  Home
                </Link>

                <div className="border-t border-white/10 pt-2">
                  <span className="text-orange-500/60 text-xs font-semibold uppercase tracking-wider">Services</span>
                  <div className="flex flex-col space-y-2 mt-2 pl-3">
                    {services.map(service => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-orange-500/90 hover:text-orange-500 transition-colors text-sm flex items-center gap-2"
                      >
                        <service.icon className="w-3.5 h-3.5" />
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2 flex flex-col space-y-3">
                  {navItems.slice(1).map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-orange-500/90 hover:text-orange-500 transition-colors font-medium hover:pl-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/get-started"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-5 py-3 bg-orange-500 text-white rounded-lg font-medium mt-2"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
