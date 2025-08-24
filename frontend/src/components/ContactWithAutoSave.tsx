import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Loader2, Save, Check, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAutoSave } from '../hooks/useAutoSave';
import AutoSaveIndicator from './AutoSaveIndicator';
import config from '../config';

interface ContactWithAutoSaveProps {
  consentSettings?: {
    analytics: boolean;
    autoSave: boolean;
    marketing: boolean;
    necessary: boolean;
  };
}

const ContactWithAutoSave: React.FC<ContactWithAutoSaveProps> = ({ consentSettings }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate unique key for this user session
  const sessionKey = React.useMemo(() => {
    let key = sessionStorage.getItem('contactFormKey');
    if (!key) {
      key = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('contactFormKey', key);
    }
    return key;
  }, []);

  // Auto-save hook - only enable if consent is given
  const {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    error,
    isEnabled,
    clearSavedData,
    restoreData,
    toggleConsent
  } = useAutoSave(formData, {
    key: sessionKey,
    debounceMs: 1500,
    endpoint: config.api.baseUrl,
    enabled: consentSettings?.autoSave !== false, // Enable by default or based on consent
    onRestore: (data) => {
      setFormData(data);
      toast.success('Previous form data restored');
    },
    onSave: () => {
      console.log('Form auto-saved');
    }
  });

  const services = [
    'ECO 4 Leads',
    'Housing Disrepair Leads', 
    'Life Insurance Leads',
    'Google PPC',
    'Social Media Advertising',
    'Native Advertising',
    'Custom Campaign',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${config.api.baseUrl}/contact`, formData);
      
      if (response.data.success) {
        toast.success('Thank you! We\'ll get back to you soon.');
        
        // Clear auto-saved data after successful submission
        await clearSavedData();
        
        // Store form data in sessionStorage for thank you page
        sessionStorage.setItem('submittedName', formData.name);
        sessionStorage.setItem('submittedEmail', formData.email);
        
        // Redirect to thank you page
        navigate('/thank-you');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate form completion percentage
  const calculateProgress = () => {
    const fields = ['name', 'email', 'phone', 'company', 'service', 'message'];
    const filledFields = fields.filter(field => formData[field as keyof typeof formData]?.trim() !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <section id="contact" className="py-20 relative">
      {/* Auto-save indicator */}
      <AutoSaveIndicator
        isSaving={isSaving}
        lastSaved={lastSaved}
        hasUnsavedChanges={hasUnsavedChanges}
        error={error}
        isEnabled={isEnabled}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
            Get A Quote
          </h2>
          <p className="text-xl text-orange-500/80 max-w-3xl mx-auto">
            Ready to grow your business? Let's discuss how we can help you generate quality leads.
          </p>
          
          {/* Progress indicator */}
          {progress > 0 && progress < 100 && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-orange-500/60">Form Progress</span>
                <span className="text-sm text-orange-500/60">{progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-accent-500 to-gray-600"
                />
              </div>
            </div>
          )}

          {/* Auto-save toggle */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <label className="flex items-center gap-2 text-orange-500/70 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => toggleConsent(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <Save className="w-4 h-4" />
              <span>Auto-save enabled</span>
            </label>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="+44 20 1234 5678"
                  />
                </div>
                
                <div>
                  <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Your Company Ltd"
                  />
                </div>
              </div>

              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Service Interested In *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 focus:outline-none focus:border-gray-400 transition-colors"
                >
                  <option value="" className="bg-gray-500">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-gray-500">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-orange-500/80 mb-2 text-sm font-medium">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border-2 border-black/30 rounded-xl text-orange-500 placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent-500 to-gray-600 text-orange-500 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-gray-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">
                Let's Start Growing Your Business
              </h3>
              <p className="text-orange-500/70 mb-8">
                Ready to take your lead generation to the next level? 
                Get in touch with us today and let's discuss how we can help you achieve your goals.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold mb-1">Email Us</h4>
                  <p className="text-orange-500/60">info@naass.co.uk</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold mb-1">Call Us</h4>
                  <p className="text-orange-500/60">+44 20 1234 5678</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-orange-500 font-semibold mb-1">Visit Us</h4>
                  <p className="text-orange-500/60">London, United Kingdom</p>
                </div>
              </motion.div>
            </div>

            {/* Features Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-gray-400/20"
            >
              <h4 className="text-xl font-bold text-orange-500 mb-2">
                Smart Form Features
              </h4>
              <ul className="space-y-2 text-orange-500/70 text-sm">
                <li className="flex items-center gap-2">
                  <Save className="w-4 h-4 text-gray-500" />
                  Auto-save as you type
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-500" />
                  Never lose your progress
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  Secure data handling
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gray-500" />
                  Fast response time
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactWithAutoSave;