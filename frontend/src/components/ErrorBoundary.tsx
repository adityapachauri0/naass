import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import config from '../config';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorCount = this.state.errorCount + 1;
    
    // Log error to console in development
    if (config.environment.isDevelopment) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Log to error tracking service (e.g., Sentry)
    if (config.sentry.enabled && typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          component: 'ErrorBoundary',
          errorCount: errorCount.toString(),
        },
      });
    }

    // Update state
    this.setState({
      error,
      errorInfo,
      errorCount,
    });

    // Store error in localStorage for debugging
    if (typeof window !== 'undefined') {
      const errorLog = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      try {
        const existingErrors = JSON.parse(localStorage.getItem('errorLog') || '[]');
        existingErrors.push(errorLog);
        // Keep only last 10 errors
        if (existingErrors.length > 10) {
          existingErrors.shift();
        }
        localStorage.setItem('errorLog', JSON.stringify(existingErrors));
      } catch (e) {
        console.error('Failed to store error log:', e);
      }
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    // Clear error log if too many errors
    if (this.state.errorCount > 5) {
      localStorage.removeItem('errorLog');
      window.location.href = '/';
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="fixed inset-0 mesh-gradient opacity-30 animate-gradient-xy" />
          <div className="fixed inset-0 bg-black/50" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl w-full"
          >
            <div className="glass-dark rounded-3xl p-8 md:p-12 border border-red-500/20">
              {/* Error Icon */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
              </motion.div>

              {/* Error Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-white/70 text-center mb-8">
                We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
              </p>

              {/* Error Details (Development Only) */}
              {config.environment.isDevelopment && this.state.error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <h3 className="text-red-400 font-semibold mb-2">Error Details:</h3>
                  <p className="text-red-300 text-sm font-mono break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="text-red-400 cursor-pointer text-sm">
                        Component Stack
                      </summary>
                      <pre className="mt-2 text-red-300 text-xs overflow-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleReset}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-purple-500/25 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleGoHome}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </motion.button>
              </div>

              {/* Contact Support */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/60 text-center text-sm">
                  If this problem persists, please contact our support team
                </p>
                <a
                  href={`mailto:${config.contact.email}?subject=Error Report&body=Error: ${this.state.error?.message || 'Unknown error'}`}
                  className="flex items-center justify-center gap-2 text-neon-purple hover:text-neon-pink transition-colors mt-2"
                >
                  <Mail className="w-4 h-4" />
                  {config.contact.email}
                </a>
              </div>

              {/* Error Count Warning */}
              {this.state.errorCount > 3 && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-500 text-sm text-center">
                    Multiple errors detected. Consider refreshing the page.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;