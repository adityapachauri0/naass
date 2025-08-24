import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'ECO 4 Leads', href: '#' },
      { name: 'Housing Disrepair', href: '#' },
      { name: 'Life Insurance', href: '#' },
      { name: 'Google PPC', href: '#' },
      { name: 'Social Media Ads', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Process', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', isRoute: true },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '/privacy#cookies', isRoute: true },
      { name: 'GDPR Compliance', href: '/privacy#gdpr', isRoute: true },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                {/* Cursor icon similar to favicon */}
                <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="white"
                    className="transform"
                    style={{ transform: 'rotate(345deg)' }}
                  >
                    <path d="M3 3l18 9-9 2-2 9z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-3xl font-black text-orange-500 tracking-wider">
                    NAASS
                  </span>
                  <span className="text-xs text-orange-500 font-medium tracking-widest uppercase">
                    Leads
                  </span>
                </div>
              </div>
              
              <p className="text-orange-500/60 mb-6 max-w-sm">
                Creating monumental customer growth through the acquisition of quality leads. 
                We'll Generate You Quality Digital Leads Without Risk.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-orange-500" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-orange-500 font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-orange-500/60 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-orange-500 font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-orange-500/60 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Legal Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-orange-500 font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-orange-500/60 hover:text-orange-500 transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-orange-500/60 hover:text-orange-500 transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-700" />
              <span className="text-orange-500/80">info@naass.co.uk</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-700" />
              <span className="text-orange-500/80">+44 20 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <span className="text-orange-500/80">London, United Kingdom</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-orange-500/60 text-sm">
              © {currentYear} NAASS. All rights reserved.
            </p>
            <p className="text-orange-500/60 text-sm">
              Crafted with passion for growth
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;