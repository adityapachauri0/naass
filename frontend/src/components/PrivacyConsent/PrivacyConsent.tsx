import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Cookie, 
  Database, 
  MapPin, 
  X, 
  Check,
  AlertCircle,
  Lock,
  Eye,
  Settings
} from 'lucide-react';

interface ConsentSettings {
  analytics: boolean;
  autoSave: boolean;
  marketing: boolean;
  necessary: boolean; // Always true
}

interface PrivacyConsentProps {
  onConsentUpdate?: (settings: ConsentSettings) => void;
}

const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ onConsentUpdate }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    analytics: false,
    autoSave: false,
    marketing: false,
    necessary: true
  });

  useEffect(() => {
    // Check if user has already made a consent choice
    const consentData = localStorage.getItem('privacyConsent');
    const consentTimestamp = localStorage.getItem('privacyConsentTimestamp');
    
    if (!consentData) {
      // First visit - show banner
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const savedSettings = JSON.parse(consentData);
        setSettings(savedSettings);
        
        // Check if consent is older than 365 days (GDPR recommendation)
        if (consentTimestamp) {
          const timestamp = parseInt(consentTimestamp, 10);
          const daysSinceConsent = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
          if (daysSinceConsent > 365) {
            setShowBanner(true); // Re-ask for consent after a year
          }
        }
      } catch (error) {
        console.error('Error loading consent settings:', error);
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = (newSettings: ConsentSettings) => {
    localStorage.setItem('privacyConsent', JSON.stringify(newSettings));
    localStorage.setItem('privacyConsentTimestamp', Date.now().toString());
    
    // Update auto-save consent separately for the auto-save hook
    localStorage.setItem('autoSaveConsent', newSettings.autoSave.toString());
    
    if (onConsentUpdate) {
      onConsentUpdate(newSettings);
    }
  };

  const handleAcceptAll = () => {
    const newSettings = {
      analytics: true,
      autoSave: true,
      marketing: true,
      necessary: true
    };
    setSettings(newSettings);
    saveConsent(newSettings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newSettings = {
      analytics: false,
      autoSave: false,
      marketing: false,
      necessary: true
    };
    setSettings(newSettings);
    saveConsent(newSettings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    saveConsent(settings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const toggleSetting = (key: keyof Omit<ConsentSettings, 'necessary'>) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {/* Main Privacy Banner - Absolute Center */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setShowBanner(false)}
            />
            
            {/* Privacy Banner - Absolute Center */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="glass-dark rounded-xl p-4 border border-white/10 shadow-2xl max-w-md w-full">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-5 h-5 text-neon-purple mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">
                    Privacy Settings
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    We use cookies to enhance your experience. This includes auto-saving form data and collecting analytics.
                    <a href="/privacy" className="text-neon-purple hover:text-neon-pink underline ml-1">Privacy Policy</a>
                  </p>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>
              
              {/* Compact Feature Icons */}
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-neon-blue" />
                  <span className="text-xs text-white/60">Auto-Save</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neon-pink" />
                  <span className="text-xs text-white/60">Analytics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cookie className="w-3.5 h-3.5 text-neon-purple" />
                  <span className="text-xs text-white/60">Cookies</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
                >
                  Settings
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white rounded-lg font-medium transition-all"
                >
                  Accept All
                </button>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl glass-dark rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-lg">
                    <Settings className="w-5 h-5 text-neon-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Privacy Settings</h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Settings Options */}
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies (Always On) */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Essential Cookies</h3>
                        <p className="text-white/60 text-sm">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="sr-only"
                      />
                      <div className="w-12 h-6 bg-green-500 rounded-full opacity-50"></div>
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-neon-blue mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Analytics</h3>
                        <p className="text-white/60 text-sm">
                          Help us understand how visitors interact with our website to improve user experience.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting('analytics')}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        checked={settings.analytics}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        settings.analytics ? 'bg-neon-purple' : 'bg-white/20'
                      }`}></div>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.analytics ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Auto-Save */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-neon-pink mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Auto-Save</h3>
                        <p className="text-white/60 text-sm">
                          Automatically save your form progress to prevent data loss. Includes IP address for session management.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting('autoSave')}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        checked={settings.autoSave}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        settings.autoSave ? 'bg-neon-purple' : 'bg-white/20'
                      }`}></div>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>

                {/* Marketing */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Cookie className="w-5 h-5 text-neon-purple mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Marketing</h3>
                        <p className="text-white/60 text-sm">
                          Used to deliver personalized advertisements and measure campaign effectiveness.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSetting('marketing')}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        checked={settings.marketing}
                        onChange={() => {}}
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        settings.marketing ? 'bg-neon-purple' : 'bg-white/20'
                      }`}></div>
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings.marketing ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-xl mb-6">
                <p className="text-white/80 text-sm">
                  <span className="font-semibold">Note:</span> Essential cookies are always enabled as they are necessary for the website to function. 
                  You can change your preferences at any time by clicking the privacy settings link in the footer.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white rounded-xl font-semibold transition-all"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  Accept All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Privacy Settings Button (Always Visible) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 left-4 z-40 p-3 glass-dark rounded-full border border-white/10 hover:border-neon-purple/50 transition-all group"
        title="Privacy Settings"
      >
        <Shield className="w-5 h-5 text-white/60 group-hover:text-neon-purple transition-colors" />
      </motion.button>
    </>
  );
};

export default PrivacyConsent;