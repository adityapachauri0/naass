import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, ChevronDown, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch {
      // Silently handle; the backend can be connected later
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with NAASS for a free lead generation consultation. Email us at info@naass.co.uk or fill out our contact form for a response within 24 hours."
        keywords="contact NAASS, lead generation consultation, UK lead generation enquiry, email NAASS, get in touch, free consultation, lead generation quote"
      />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">

          {/* Hero */}
          <section className="container mx-auto px-4 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-6">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">Free Consultation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 leading-tight">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you have a question about our services or you are ready to start generating leads, we would love to hear from you. Get in touch and we will respond within 24 hours.
              </p>
            </motion.div>
          </section>

          {/* Contact Info Cards */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Mail className="w-6 h-6 text-orange-500" />,
                    title: 'Email',
                    detail: 'info@naass.co.uk',
                    sub: 'We aim to reply within 24 hours',
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-orange-500" />,
                    title: 'Location',
                    detail: 'London, United Kingdom',
                    sub: 'Serving clients nationwide',
                  },
                  {
                    icon: <Clock className="w-6 h-6 text-orange-500" />,
                    title: 'Business Hours',
                    detail: 'Mon - Fri, 9am - 6pm',
                    sub: 'GMT / BST',
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center mb-3">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-orange-500 font-medium mb-1">{card.detail}</p>
                    <p className="text-gray-500 text-sm">{card.sub}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="bg-gray-50 py-16 mb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <motion.div {...fadeUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Send Us a Message</h2>
                  <p className="text-gray-600 text-center mb-8">
                    Fill out the form below and a member of our team will be in touch shortly.
                  </p>
                </motion.div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-8 bg-white border border-orange-100 rounded-2xl"
                  >
                    <div className="flex justify-center mb-4">
                      <Send className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent</h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for getting in touch. We will respond within 24 hours on business days.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    {...fadeUp}
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="Your phone number"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Interest <span className="text-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors appearance-none bg-white"
                        >
                          <option value="">Select a service</option>
                          <option value="ECO 4">ECO 4</option>
                          <option value="Housing Disrepair">Housing Disrepair</option>
                          <option value="Life Insurance">Life Insurance</option>
                          <option value="Google PPC">Google PPC</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.form>
                )}
              </div>
            </div>
          </section>

          {/* FAQ Mini-Section */}
          <section className="container mx-auto px-4 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              </motion.div>
              <div className="space-y-4">
                {[
                  {
                    question: 'How quickly will you respond?',
                    answer: 'Within 24 hours on business days. Most enquiries receive a response the same working day.',
                  },
                  {
                    question: 'Is the consultation free?',
                    answer: 'Yes, completely free and no-obligation. We will discuss your requirements, explain how our lead generation process works, and put together a tailored proposal at no cost.',
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 text-center">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-bold text-orange-500 mb-4">Prefer to Get Started Straight Away?</h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  If you already know what you need, skip the form and request a free quote directly. We will have a bespoke lead generation proposal ready for you within 24 hours.
                </p>
                <Link
                  href="/get-started"
                  className="inline-block px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Request a Free Quote
                </Link>
              </motion.div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
