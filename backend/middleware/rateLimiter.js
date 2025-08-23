const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

// Redis client configuration
const redisClient = process.env.ENABLE_REDIS_CACHE === 'true' 
  ? new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      db: process.env.REDIS_DB || 1, // Use DB 1 for NAASS
    })
  : null;

// Create rate limiter with optional Redis store
const createLimiter = (options) => {
  const config = {
    windowMs: options.windowMs,
    max: options.max,
    message: options.message,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: options.message,
        retryAfter: Math.ceil(options.windowMs / 1000)
      });
    }
  };

  // Use Redis store if available
  if (redisClient) {
    config.store = new RedisStore({
      client: redisClient,
      prefix: 'naass_rl:',
    });
  }

  return rateLimit(config);
};

// General API rate limiter (100 requests per 15 minutes)
const generalApiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Auth rate limiter (5 attempts per 15 minutes)
const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later.'
});

// Contact form rate limiter (10 submissions per hour)
const contactSubmissionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many contact form submissions, please try again later.'
});

// Lead submission rate limiter (20 per hour)
const leadSubmissionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: 'Too many lead submissions, please try again later.'
});

// Draft save rate limiter (100 per hour)
const draftSaveLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many draft saves, please slow down.'
});

// Export rate limiter (10 exports per hour)
const exportLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many export requests, please try again later.'
});

// Strict rate limiter for sensitive operations (2 per hour)
const strictLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 2,
  message: 'Too many sensitive operation attempts, please try again later.'
});

module.exports = {
  generalApiLimiter,
  authLimiter,
  contactSubmissionLimiter,
  leadSubmissionLimiter,
  draftSaveLimiter,
  exportLimiter,
  strictLimiter
};