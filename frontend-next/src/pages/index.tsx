import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import ContactWithAutoSave from '../components/ContactWithAutoSave';
import Footer from '../components/Footer';
import FloatingElements from '../components/FloatingElements';
import ScrollIndicator from '../components/ScrollIndicator';
import PrivacyConsent from '../components/PrivacyConsent/PrivacyConsent';

export default function Home() {
  const [consentSettings, setConsentSettings] = useState<any>(null);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen relative bg-white overflow-hidden">
        {/* Clean white background */}
        <div className="fixed inset-0 bg-white" />

        <FloatingElements />
        <ScrollIndicator />

        {/* Privacy Consent Component */}
        <PrivacyConsent onConsentUpdate={setConsentSettings} />

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Services />
          <About />
          <Testimonials />
          <ContactWithAutoSave consentSettings={consentSettings} />
          <Footer />
        </div>
      </div>
    </>
  );
}
