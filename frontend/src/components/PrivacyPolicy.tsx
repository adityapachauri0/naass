import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Cookie, 
  Database, 
  MapPin, 
  Clock, 
  Eye, 
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Info,
  FileText,
  Server,
  Users,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const lastUpdated = "January 2025";
  const effectiveDate = "January 1, 2025";

  const sections = [
    { id: 'overview', title: 'Overview', icon: Shield },
    { id: 'data-collection', title: 'Data We Collect', icon: Database },
    { id: 'auto-save', title: 'Auto-Save Feature', icon: Clock },
    { id: 'cookies', title: 'Cookies Policy', icon: Cookie },
    { id: 'gdpr', title: 'GDPR Rights', icon: FileText },
    { id: 'data-usage', title: 'How We Use Data', icon: Eye },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects */}
      <div className="fixed inset-0 mesh-gradient opacity-30 animate-gradient-xy" />
      <div className="fixed inset-0 bg-black/50" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-purple/20 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/10 backdrop-blur-md bg-black/50 sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-neon-purple" />
                <span className="text-white font-bold text-xl">Privacy Policy</span>
              </div>
              <div className="text-white/60 text-sm">
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
        >
          <div className="glass-dark rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-4 text-sm">Quick Navigation</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center gap-2 text-white/60 hover:text-neon-purple transition-colors text-sm w-full text-left"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Privacy Policy & GDPR Compliance
              </h1>
              <p className="text-xl text-white/80">
                Your privacy is important to us. This policy explains how we collect, use, and protect your data.
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-white/60 text-sm">
                <span>Effective: {effectiveDate}</span>
                <span>•</span>
                <span>GDPR Compliant</span>
                <span>•</span>
                <span>ISO 27001 Standards</span>
              </div>
            </div>

            {/* Overview Section */}
            <section id="overview" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-neon-purple" />
                  <h2 className="text-3xl font-bold text-white">Overview</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed mb-4">
                    NAASS ("we", "our", or "us") is committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                    and use our services.
                  </p>
                  <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-neon-purple mt-0.5" />
                      <div>
                        <h4 className="text-white font-semibold mb-2">Key Principles</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                          <li>• We only collect data necessary for our services</li>
                          <li>• Your data is encrypted and securely stored</li>
                          <li>• You have full control over your personal information</li>
                          <li>• We never sell your data to third parties</li>
                          <li>• We comply with GDPR and other privacy regulations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Data Collection Section */}
            <section id="data-collection" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-8 h-8 text-neon-blue" />
                  <h2 className="text-3xl font-bold text-white">Data We Collect</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-neon-pink" />
                      Personal Information
                    </h3>
                    <p className="text-white/70 mb-3">
                      When you submit forms on our website, we collect:
                    </p>
                    <ul className="space-y-2 text-white/60 ml-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Name and contact details (email, phone number)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Company name and business information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Service preferences and requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                        <span>Messages and inquiries you send to us</span>
                      </li>
                    </ul>
                  </div>

                  {/* Technical Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Server className="w-5 h-5 text-neon-purple" />
                      Technical Information
                    </h3>
                    <p className="text-white/70 mb-3">
                      We automatically collect certain technical data:
                    </p>
                    <ul className="space-y-2 text-white/60 ml-6">
                      <li className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-neon-pink mt-0.5" />
                        <span>IP address and approximate geographic location (country/city level)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-neon-blue mt-0.5" />
                        <span>Browser type, version, and device information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="w-4 h-4 text-neon-purple mt-0.5" />
                        <span>Pages visited and time spent on our website</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Database className="w-4 h-4 text-neon-pink mt-0.5" />
                        <span>Form interaction data (for auto-save functionality)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Auto-Save Feature Section */}
            <section id="auto-save" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-neon-pink" />
                  <h2 className="text-3xl font-bold text-white">How Auto-Save Works</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Intelligent Form Protection</h3>
                    <p className="text-white/80 mb-4">
                      Our auto-save feature is designed to prevent data loss and improve your experience:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-neon-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-neon-purple" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Automatic Saving</h4>
                            <p className="text-white/60 text-sm">
                              Form data is automatically saved every 1.5 seconds as you type
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-neon-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Database className="w-4 h-4 text-neon-blue" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Session-Based Storage</h4>
                            <p className="text-white/60 text-sm">
                              Each session gets a unique identifier to track your progress
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-neon-pink/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Shield className="w-4 h-4 text-neon-pink" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">Secure Encryption</h4>
                            <p className="text-white/60 text-sm">
                              All saved data is encrypted using AES-256 encryption
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold mb-1">7-Day Retention</h4>
                            <p className="text-white/60 text-sm">
                              Draft data is automatically deleted after 7 days
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h4 className="text-white font-semibold mb-3">What Gets Saved:</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Form field values (name, email, phone, company, message)</li>
                      <li>• Timestamp of last modification</li>
                      <li>• Session identifier (randomly generated)</li>
                      <li>• IP address for security and session management</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <p className="text-yellow-500 text-sm">
                          <strong>Note:</strong> You can disable auto-save at any time using the toggle in the contact form or through privacy settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Cookies Policy Section */}
            <section id="cookies" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Cookie className="w-8 h-8 text-neon-purple" />
                  <h2 className="text-3xl font-bold text-white">Cookies Policy</h2>
                </div>
                
                <p className="text-white/80 mb-6">
                  We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic.
                </p>

                <div className="space-y-4">
                  {/* Essential Cookies */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-green-400 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Essential Cookies (Always Active)</h4>
                        <p className="text-white/70 text-sm mb-2">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                        <ul className="space-y-1 text-white/60 text-sm ml-4">
                          <li>• Session management and security</li>
                          <li>• Privacy consent preferences</li>
                          <li>• Form submission tracking</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Analytics Cookies (Optional)</h4>
                        <p className="text-white/70 text-sm mb-2">
                          Help us understand how visitors interact with our website.
                        </p>
                        <ul className="space-y-1 text-white/60 text-sm ml-4">
                          <li>• Google Analytics for traffic analysis</li>
                          <li>• Page view tracking and user flow</li>
                          <li>• Performance monitoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Settings className="w-5 h-5 text-purple-400 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Marketing Cookies (Optional)</h4>
                        <p className="text-white/70 text-sm mb-2">
                          Used to deliver relevant advertisements and track campaign effectiveness.
                        </p>
                        <ul className="space-y-1 text-white/60 text-sm ml-4">
                          <li>• Retargeting and remarketing</li>
                          <li>• Campaign performance tracking</li>
                          <li>• Personalized content delivery</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <p className="text-white/70 text-sm">
                    You can manage your cookie preferences at any time by clicking the privacy settings button 
                    in the bottom-left corner of any page.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* GDPR Rights Section */}
            <section id="gdpr" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-neon-blue" />
                  <h2 className="text-3xl font-bold text-white">Your GDPR Rights</h2>
                </div>
                
                <p className="text-white/80 mb-6">
                  Under the General Data Protection Regulation (GDPR), you have the following rights:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Right to Access
                    </h4>
                    <p className="text-white/60 text-sm">
                      Request a copy of the personal data we hold about you.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Right to Rectification
                    </h4>
                    <p className="text-white/60 text-sm">
                      Request correction of any inaccurate or incomplete personal data.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Right to Erasure
                    </h4>
                    <p className="text-white/60 text-sm">
                      Request deletion of your personal data ("right to be forgotten").
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Right to Data Portability
                    </h4>
                    <p className="text-white/60 text-sm">
                      Receive your data in a structured, machine-readable format.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Right to Object
                    </h4>
                    <p className="text-white/60 text-sm">
                      Object to processing of your personal data for certain purposes.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Right to Withdraw Consent
                    </h4>
                    <p className="text-white/60 text-sm">
                      Withdraw consent at any time where we rely on consent to process data.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-xl">
                  <p className="text-white/80 text-sm">
                    To exercise any of these rights, please contact our Data Protection Officer at 
                    <a href="mailto:privacy@naass.co.uk" className="text-neon-blue hover:text-neon-purple ml-1">
                      privacy@naass.co.uk
                    </a>
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Data Usage Section */}
            <section id="data-usage" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="w-8 h-8 text-neon-pink" />
                  <h2 className="text-3xl font-bold text-white">How We Use Your Data</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-purple rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Service Delivery</h4>
                      <p className="text-white/60 text-sm">
                        Process your inquiries and provide the services you request
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Communication</h4>
                      <p className="text-white/60 text-sm">
                        Send you updates, newsletters, and respond to your queries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-pink rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Improvement</h4>
                      <p className="text-white/60 text-sm">
                        Analyze usage patterns to improve our website and services
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Legal Compliance</h4>
                      <p className="text-white/60 text-sm">
                        Comply with legal obligations and protect our legitimate interests
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Security Section */}
            <section id="security" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-green-400" />
                  <h2 className="text-3xl font-bold text-white">Data Security</h2>
                </div>
                
                <p className="text-white/80 mb-6">
                  We implement industry-standard security measures to protect your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Encryption</h4>
                      <p className="text-white/60 text-sm">
                        AES-256 encryption for data at rest and TLS 1.3 for data in transit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Access Control</h4>
                      <p className="text-white/60 text-sm">
                        Strict access controls and authentication requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Secure Hosting</h4>
                      <p className="text-white/60 text-sm">
                        ISO 27001 certified data centers with 24/7 monitoring
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Regular Audits</h4>
                      <p className="text-white/60 text-sm">
                        Regular security audits and penetration testing
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass-dark rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-8 h-8 text-neon-purple" />
                  <h2 className="text-3xl font-bold text-white">Contact Us</h2>
                </div>
                
                <p className="text-white/80 mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3">Data Protection Officer</h4>
                    <div className="space-y-2 text-white/60 text-sm">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        privacy@naass.co.uk
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        +44 20 1234 5678
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        London, United Kingdom
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-3">Supervisory Authority</h4>
                    <div className="space-y-2 text-white/60 text-sm">
                      <p className="mb-2">
                        You have the right to lodge a complaint with:
                      </p>
                      <p className="font-semibold text-white">
                        Information Commissioner's Office (ICO)
                      </p>
                      <a 
                        href="https://ico.org.uk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:text-neon-purple"
                      >
                        www.ico.org.uk
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Updates Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-8 border-t border-white/10"
            >
              <p className="text-white/60 text-sm">
                This Privacy Policy was last updated on {lastUpdated}. 
                We may update this policy from time to time, and will notify you of any significant changes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;