// Centralized configuration management
interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  environment: {
    name: string;
    isDevelopment: boolean;
    isProduction: boolean;
    isStaging: boolean;
    debug: boolean;
  };
  analytics: {
    gaTrackingId: string;
    gtmId: string;
    enabled: boolean;
  };
  security: {
    enableCSP: boolean;
    allowedOrigins: string[];
  };
  features: {
    autoSave: {
      enabled: boolean;
      interval: number;
    };
    analytics: boolean;
    performanceMonitoring: boolean;
  };
  contact: {
    email: string;
    phone: string;
  };
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  sentry: {
    dsn: string;
    environment: string;
    enabled: boolean;
  };
  rateLimit: {
    requests: number;
    window: number;
  };
  session: {
    timeout: number;
    rememberMeDuration: number;
  };
}

const getEnvironment = (): string => {
  return process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';
};

const config: Config = {
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5007/api',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10),
  },
  environment: {
    name: getEnvironment(),
    isDevelopment: getEnvironment() === 'development',
    isProduction: getEnvironment() === 'production',
    isStaging: getEnvironment() === 'staging',
    debug: process.env.REACT_APP_DEBUG === 'true',
  },
  analytics: {
    gaTrackingId: process.env.REACT_APP_GA_TRACKING_ID || '',
    gtmId: process.env.REACT_APP_GTM_ID || '',
    enabled: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  },
  security: {
    enableCSP: process.env.REACT_APP_ENABLE_CSP === 'true',
    allowedOrigins: process.env.REACT_APP_ALLOWED_ORIGINS?.split(',') || ['https://naass.co.uk'],
  },
  features: {
    autoSave: {
      enabled: process.env.REACT_APP_ENABLE_AUTOSAVE !== 'false',
      interval: parseInt(process.env.REACT_APP_AUTOSAVE_INTERVAL || '1500', 10),
    },
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS !== 'false',
    performanceMonitoring: process.env.REACT_APP_ENABLE_PERFORMANCE_MONITORING !== 'false',
  },
  contact: {
    email: process.env.REACT_APP_CONTACT_EMAIL || 'info@naass.co.uk',
    phone: process.env.REACT_APP_PHONE_NUMBER || '+44 20 1234 5678',
  },
  social: {
    facebook: process.env.REACT_APP_FACEBOOK_URL || 'https://facebook.com/naass',
    twitter: process.env.REACT_APP_TWITTER_URL || 'https://twitter.com/naass',
    linkedin: process.env.REACT_APP_LINKEDIN_URL || 'https://linkedin.com/company/naass',
    instagram: process.env.REACT_APP_INSTAGRAM_URL || 'https://instagram.com/naass',
  },
  sentry: {
    dsn: process.env.REACT_APP_SENTRY_DSN || '',
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || getEnvironment(),
    enabled: !!process.env.REACT_APP_SENTRY_DSN && getEnvironment() !== 'development',
  },
  rateLimit: {
    requests: parseInt(process.env.REACT_APP_RATE_LIMIT_REQUESTS || '100', 10),
    window: parseInt(process.env.REACT_APP_RATE_LIMIT_WINDOW || '900000', 10),
  },
  session: {
    timeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT || '1800000', 10),
    rememberMeDuration: parseInt(process.env.REACT_APP_REMEMBER_ME_DURATION || '604800000', 10),
  },
};

// Validate required configuration
const validateConfig = (): void => {
  const errors: string[] = [];

  if (config.environment.isProduction) {
    if (!config.api.baseUrl || config.api.baseUrl.includes('localhost')) {
      errors.push('Production API URL must not use localhost');
    }
    if (!config.analytics.gaTrackingId) {
      errors.push('Google Analytics tracking ID is required for production');
    }
    if (!config.sentry.dsn) {
      console.warn('Sentry DSN not configured for production');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
};

// Run validation
if (config.environment.isProduction) {
  validateConfig();
}

export default config;
export { getEnvironment, validateConfig };