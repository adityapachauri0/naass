import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import config from '../config';

// Types
interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

interface ApiResponseError {
  message?: string;
  error?: string;
  code?: string;
  [key: string]: any;
}

interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryCondition?: (error: AxiosError) => boolean;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: number;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request queue for rate limiting
let requestQueue: Array<() => void> = [];
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 5;

// Rate limiting
const rateLimiter = {
  tokens: config.rateLimit.requests,
  lastRefill: Date.now(),
  refillRate: config.rateLimit.window,
  
  consume(): boolean {
    this.refill();
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  },
  
  refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = Math.floor(timePassed / this.refillRate * config.rateLimit.requests);
    
    if (tokensToAdd > 0) {
      this.tokens = Math.min(config.rateLimit.requests, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  },
};

// Request interceptor
api.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    // Wait for rate limit
    while (!rateLimiter.consume()) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Add auth token if available
    const token = localStorage.getItem('adminToken');
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracking
    requestConfig.headers['X-Request-ID'] = generateRequestId();
    
    // Add timestamp
    requestConfig.headers['X-Request-Time'] = new Date().toISOString();

    // Log request in development
    if (config.environment.debug) {
      console.log('API Request:', {
        method: requestConfig.method,
        url: requestConfig.url,
        data: requestConfig.data,
        headers: requestConfig.headers,
      });
    }

    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (config.environment.debug) {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
    }

    return response;
  },
  async (error: AxiosError<ApiResponseError>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Handle network errors
    if (!error.response) {
      const apiError: ApiError = {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(apiError);
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('adminToken');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        break;

      case 403:
        // Forbidden
        const forbiddenError: ApiError = {
          message: 'You do not have permission to perform this action.',
          code: 'FORBIDDEN',
          status: 403,
        };
        return Promise.reject(forbiddenError);

      case 429:
        // Too Many Requests - implement retry with exponential backoff
        if (!originalRequest._retry || originalRequest._retry < 3) {
          originalRequest._retry = (originalRequest._retry || 0) + 1;
          const delay = Math.pow(2, originalRequest._retry) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return api(originalRequest);
        }
        break;

      case 500:
      case 502:
      case 503:
      case 504:
        // Server errors - retry once after delay
        if (!originalRequest._retry) {
          originalRequest._retry = 1;
          await new Promise(resolve => setTimeout(resolve, 2000));
          return api(originalRequest);
        }
        break;
    }

    // Format error response
    const responseData = error.response?.data || {};
    const apiError: ApiError = {
      message: responseData.message || responseData.error || 'An error occurred',
      code: responseData.code || error.code,
      status: error.response?.status,
      details: responseData,
    };

    // Log error
    if (config.environment.debug) {
      console.error('API Error:', apiError);
    }

    // Report to error tracking
    if (config.sentry.enabled && typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: {
          api_error: true,
          status: error.response?.status,
          url: error.config?.url,
        },
        extra: {
          request: {
            method: error.config?.method,
            url: error.config?.url,
            data: error.config?.data,
          },
          response: error.response?.data,
        },
      });
    }

    return Promise.reject(apiError);
  }
);

// Helper functions
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// API methods with retry logic
const apiService = {
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.delete<T>(url, config);
    return response.data;
  },

  // Batch requests
  async batch(requests: Array<() => Promise<any>>): Promise<any[]> {
    return Promise.all(requests.map(request => request().catch(error => ({ error }))));
  },

  // Upload file
  async upload(url: string, file: File, onProgress?: (progress: number) => void): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  },

  // Download file
  async download(url: string, filename?: string): Promise<void> {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },
};

// Export specific API endpoints
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    apiService.post('/auth/login', credentials),
  
  logout: () =>
    apiService.post('/auth/logout'),
  
  verify: () =>
    apiService.get('/auth/verify'),
};

export const contactAPI = {
  submit: (data: any) =>
    apiService.post('/contact', data),
  
  getSubmissions: () =>
    apiService.get('/submissions'),
  
  deleteSubmission: (id: string) =>
    apiService.delete(`/submissions/${id}`),
  
  updateStatus: (id: string, status: string) =>
    apiService.patch(`/submissions/${id}`, { status }),
};

export const draftAPI = {
  save: (key: string, data: any) =>
    apiService.post('/drafts/save', { key, formData: data }),
  
  get: (key: string) =>
    apiService.get(`/drafts/${key}`),
  
  delete: (key: string) =>
    apiService.delete(`/drafts/${key}`),
};

export default apiService;