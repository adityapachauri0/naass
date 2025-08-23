// Performance monitoring and Web Vitals tracking

interface PerformanceData {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  inp?: number; // Interaction to Next Paint
}

class PerformanceMonitor {
  private performanceData: PerformanceData = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializeObservers();
      this.measureWebVitals();
    }
  }

  private initializeObservers() {
    try {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
        if (lcpValue) {
          this.performanceData.lcp = lcpValue;
          this.reportToAnalytics('LCP', lcpValue);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const firstInput = entries[0] as any;
        if (firstInput) {
          const fidValue = firstInput.processingStart - firstInput.startTime;
          this.performanceData.fid = fidValue;
          this.reportToAnalytics('FID', fidValue);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Observe Cumulative Layout Shift
      let clsValue = 0;
      let clsEntries: any[] = [];
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsEntries.push(entry);
            clsValue += (entry as any).value;
          }
        }
        this.performanceData.cls = clsValue;
        this.reportToAnalytics('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      this.observer = lcpObserver;
    } catch (error) {
      console.error('Failed to initialize performance observers:', error);
    }
  }

  private measureWebVitals() {
    if (typeof window !== 'undefined' && window.performance) {
      // Measure First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        const fcpValue = fcpEntry.startTime;
        this.performanceData.fcp = fcpValue;
        this.reportToAnalytics('FCP', fcpValue);
      }

      // Measure Time to First Byte
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0];
        const ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart;
        this.performanceData.ttfb = ttfbValue;
        this.reportToAnalytics('TTFB', ttfbValue);
      }

      // Measure Interaction to Next Paint (INP)
      this.measureINP();
    }
  }

  private measureINP() {
    const interactions: number[] = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ((entry as any).interactionId) {
          interactions.push(entry.duration);
          // Get the 98th percentile as INP
          interactions.sort((a, b) => b - a);
          const p98Index = Math.floor(interactions.length * 0.98);
          const inpValue = interactions[p98Index] || 0;
          this.performanceData.inp = inpValue;
          this.reportToAnalytics('INP', inpValue);
        }
      }
    });

    try {
      observer.observe({ type: 'event', buffered: true });
    } catch {
      // Fallback for browsers that don't support event timing
    }
  }

  private reportToAnalytics(metric: string, value: number) {
    // Report to Google Analytics or other analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metric,
        value: Math.round(value),
        non_interaction: true,
      });
    }

    // Log performance data
    this.logPerformance(metric, value);
  }

  private logPerformance(metric: string, value: number) {
    const rating = this.getRating(metric, value);
    const color = rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'orange' : 'red';
    
    console.log(
      `%c[Performance] ${metric}: ${value.toFixed(2)}ms (${rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }

  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, { good: number; poor: number }> = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  public getPerformanceData(): PerformanceData {
    return this.performanceData;
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = () => {
  if (!performanceMonitor && typeof window !== 'undefined') {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const getPerformanceData = () => {
  return performanceMonitor?.getPerformanceData() || {};
};

// Utility function to measure component render time
export const measureComponentPerformance = (componentName: string) => {
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;

  return {
    start: () => performance.mark(startMark),
    end: () => {
      performance.mark(endMark);
      performance.measure(measureName, startMark, endMark);
      
      const measure = performance.getEntriesByName(measureName)[0];
      if (measure) {
        console.log(
          `%c[Component Performance] ${componentName}: ${measure.duration.toFixed(2)}ms`,
          'color: blue; font-weight: bold;'
        );
      }
      
      // Clean up marks and measures
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
    },
  };
};

// Prefetch resources for better performance
export const prefetchResources = (urls: string[]) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  }
};

// Resource hints for critical resources
export const addResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
    { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
};

export default {
  initializePerformanceMonitoring,
  getPerformanceData,
  measureComponentPerformance,
  prefetchResources,
  addResourceHints,
};