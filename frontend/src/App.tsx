import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ContactWithAutoSave from './components/ContactWithAutoSave';
import MultiStepContact from './components/MultiStepContact';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import ScrollIndicator from './components/ScrollIndicator';
import DashboardEnhanced from './components/Dashboard/DashboardEnhanced';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ThankYou from './components/ThankYou';
import PrivacyConsent from './components/PrivacyConsent/PrivacyConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import SEO from './components/SEO/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import Loading, { PageLoading } from './components/Loading';
import { trackPageView } from './utils/analytics';
import config from './config';

// Analytics tracking component
function AnalyticsTracker() {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);
  
  return null;
}

function App() {
  const [consentSettings, setConsentSettings] = useState<any>(null);
  
  // Log app initialization
  useEffect(() => {
    console.log(`NAASS App v1.0.0 - Environment: ${config.environment.name}`);
    
    // Check for browser compatibility
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported');
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <AnalyticsTracker />
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={
          <Suspense fallback={<PageLoading />}>
            <SEO />
            <div className="min-h-screen relative bg-white overflow-hidden">
            {/* Removed gradient background */}
            
            {/* Clean white background */}
            <div className="fixed inset-0 bg-white" />
            
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#000000',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                },
              }}
            />
            
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
          </Suspense>
        } />
        
        {/* Login Page */}
        <Route path="/login" element={
          <Suspense fallback={<Loading fullScreen />}>
            <SEO 
              title="Admin Login"
              description="Secure admin login for NAASS dashboard. Access lead management and analytics."
              noindex={true}
            />
            <Login />
          </Suspense>
        } />
        
        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          <Suspense fallback={<Loading fullScreen />}>
            <ProtectedRoute>
              <SEO 
                title="Dashboard"
                description="NAASS admin dashboard for lead management."
                noindex={true}
              />
              <DashboardEnhanced />
            </ProtectedRoute>
          </Suspense>
        } />
        
        {/* Thank You Page */}
        <Route path="/thank-you" element={
          <Suspense fallback={<Loading fullScreen />}>
            <SEO 
              title="Thank You"
              description="Thank you for contacting NAASS. We'll get back to you soon with quality lead generation solutions."
              noindex={true}
            />
            <ThankYou />
          </Suspense>
        } />
        
        {/* Privacy Policy Page */}
        <Route path="/privacy" element={
          <Suspense fallback={<Loading fullScreen />}>
            <SEO 
              title="Privacy Policy & GDPR"
              description="NAASS Privacy Policy, GDPR compliance, cookie policy, and data protection. Learn how we protect your personal information and respect your privacy rights."
              keywords="privacy policy, GDPR, data protection, cookies policy, personal data, privacy rights, data security, NAASS privacy"
            />
            <PrivacyPolicy />
          </Suspense>
        } />
        
        {/* Multi-Step Contact Form Page */}
        <Route path="/get-started" element={
          <Suspense fallback={<Loading fullScreen />}>
            <SEO 
              title="Get Started - Multi-Step Form"
              description="Get started with NAASS lead generation services. Complete our detailed form to help us understand your business needs."
            />
            <div className="min-h-screen relative bg-white overflow-hidden">
              <div className="fixed inset-0 bg-white" />
              <FloatingElements />
              <ScrollIndicator />
              <div className="relative z-10">
                <Navbar />
                <MultiStepContact />
                <Footer />
              </div>
            </div>
          </Suspense>
        } />
        </Routes>
      </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;