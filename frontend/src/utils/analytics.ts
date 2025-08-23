import config from '../config';

// Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class Analytics {
  private initialized = false;

  constructor() {
    if (config.analytics.enabled && config.analytics.gaTrackingId) {
      this.initialize();
    }
  }

  private initialize() {
    if (this.initialized || typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.gaTrackingId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', config.analytics.gaTrackingId, {
      send_page_view: false, // We'll send page views manually
      anonymize_ip: true, // GDPR compliance
    });

    // Load Google Tag Manager if configured
    if (config.analytics.gtmId) {
      this.loadGTM();
    }

    this.initialized = true;
  }

  private loadGTM() {
    // Google Tag Manager
    (function(w: any, d: Document, s: string, l: string, i: string) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s) as HTMLScriptElement;
      const dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode?.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', config.analytics.gtmId);

    // GTM noscript
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${config.analytics.gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  // Track page view
  trackPageView(path?: string, title?: string) {
    if (!this.initialized || !config.analytics.enabled) return;

    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }

  // Track custom events
  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (!this.initialized || !config.analytics.enabled) return;

    window.gtag('event', eventName, {
      ...parameters,
      event_category: parameters?.category || 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
    });
  }

  // Track conversions
  trackConversion(conversionType: string, value?: number, currency: string = 'GBP') {
    if (!this.initialized || !config.analytics.enabled) return;

    window.gtag('event', 'conversion', {
      send_to: config.analytics.gaTrackingId,
      value: value,
      currency: currency,
      conversion_type: conversionType,
    });

    // Also track as custom event
    this.trackEvent('conversion', {
      category: 'conversion',
      label: conversionType,
      value: value,
    });
  }

  // Track form submissions
  trackFormSubmission(formName: string, formData?: Record<string, any>) {
    if (!this.initialized || !config.analytics.enabled) return;

    this.trackEvent('form_submit', {
      category: 'form',
      label: formName,
      form_name: formName,
      ...formData,
    });
  }

  // Track errors
  trackError(error: Error, fatal: boolean = false) {
    if (!this.initialized || !config.analytics.enabled) return;

    window.gtag('event', 'exception', {
      description: error.message,
      fatal: fatal,
      error_stack: error.stack,
    });
  }

  // Track timing
  trackTiming(category: string, variable: string, value: number, label?: string) {
    if (!this.initialized || !config.analytics.enabled) return;

    window.gtag('event', 'timing_complete', {
      name: variable,
      value: Math.round(value),
      event_category: category,
      event_label: label,
    });
  }

  // Track user properties
  setUserProperties(properties: Record<string, any>) {
    if (!this.initialized || !config.analytics.enabled) return;

    window.gtag('set', 'user_properties', properties);
  }

  // Track search
  trackSearch(searchTerm: string, resultsCount?: number) {
    if (!this.initialized || !config.analytics.enabled) return;

    this.trackEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      category: 'engagement',
    });
  }

  // Track social interactions
  trackSocial(network: string, action: string, target?: string) {
    if (!this.initialized || !config.analytics.enabled) return;

    this.trackEvent('social', {
      social_network: network,
      social_action: action,
      social_target: target,
      category: 'social',
    });
  }

  // E-commerce tracking
  trackEcommerce(action: string, data: any) {
    if (!this.initialized || !config.analytics.enabled) return;

    switch (action) {
      case 'view_item':
        window.gtag('event', 'view_item', {
          currency: 'GBP',
          value: data.value,
          items: data.items,
        });
        break;
      
      case 'add_to_cart':
        window.gtag('event', 'add_to_cart', {
          currency: 'GBP',
          value: data.value,
          items: data.items,
        });
        break;
      
      case 'begin_checkout':
        window.gtag('event', 'begin_checkout', {
          currency: 'GBP',
          value: data.value,
          items: data.items,
        });
        break;
      
      case 'purchase':
        window.gtag('event', 'purchase', {
          transaction_id: data.transaction_id,
          value: data.value,
          currency: 'GBP',
          items: data.items,
        });
        break;
    }
  }

  // Enhanced measurement
  trackScroll(percentage: number) {
    if (!this.initialized || !config.analytics.enabled) return;

    this.trackEvent('scroll', {
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
    });
  }

  trackEngagement(duration: number) {
    if (!this.initialized || !config.analytics.enabled) return;

    this.trackEvent('user_engagement', {
      category: 'engagement',
      engagement_time_msec: duration,
    });
  }

  // Privacy-compliant tracking
  setConsentMode(consent: {
    analytics_storage?: 'granted' | 'denied';
    ad_storage?: 'granted' | 'denied';
    functionality_storage?: 'granted' | 'denied';
    personalization_storage?: 'granted' | 'denied';
  }) {
    if (!this.initialized) return;

    window.gtag('consent', 'update', consent);
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export convenience functions
export const trackPageView = (path?: string, title?: string) => 
  analytics.trackPageView(path, title);

export const trackEvent = (eventName: string, parameters?: Record<string, any>) =>
  analytics.trackEvent(eventName, parameters);

export const trackConversion = (conversionType: string, value?: number) =>
  analytics.trackConversion(conversionType, value);

export const trackFormSubmission = (formName: string, formData?: Record<string, any>) =>
  analytics.trackFormSubmission(formName, formData);

export const trackError = (error: Error, fatal?: boolean) =>
  analytics.trackError(error, fatal);

export const trackTiming = (category: string, variable: string, value: number, label?: string) =>
  analytics.trackTiming(category, variable, value, label);

export const setUserProperties = (properties: Record<string, any>) =>
  analytics.setUserProperties(properties);

export const trackSearch = (searchTerm: string, resultsCount?: number) =>
  analytics.trackSearch(searchTerm, resultsCount);

export const trackSocial = (network: string, action: string, target?: string) =>
  analytics.trackSocial(network, action, target);

export const trackEcommerce = (action: string, data: any) =>
  analytics.trackEcommerce(action, data);

export const trackScroll = (percentage: number) =>
  analytics.trackScroll(percentage);

export const trackEngagement = (duration: number) =>
  analytics.trackEngagement(duration);

export const setConsentMode = (consent: any) =>
  analytics.setConsentMode(consent);

export default analytics;