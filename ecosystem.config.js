module.exports = {
  apps: [
    {
      name: 'naass-backend',
      script: './backend/server.js',
      cwd: '/var/www/naass',
      instances: 1,
      exec_mode: 'fork',
      
      // Resource limits
      max_memory_restart: '500M', // Restart if memory exceeds 500MB
      
      // Environment variables
      env: {
        PORT: 5007,
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://localhost:27017/naass_db',
        JWT_SECRET: 'naass-secret-key-5007-production-2025',
        CORS_ORIGIN: 'https://naass.co.uk,https://www.naass.co.uk',
        ENABLE_REDIS_CACHE: 'false',
        REDIS_HOST: 'localhost',
        REDIS_PORT: 6379,
        REDIS_DB: 1
      },
      
      // Restart policies
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      autorestart: true,
      
      // Logging
      error_file: '/var/www/naass/logs/backend-error.log',
      out_file: '/var/www/naass/logs/backend-out.log',
      log_file: '/var/www/naass/logs/backend-combined.log',
      time: true,
      merge_logs: true,
      
      // Watch for file changes (disabled in production)
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git'],
      
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Monitoring
      instance_var: 'INSTANCE_ID',
      
      // Cron-like restart (optional - restart daily at 3 AM)
      // cron_restart: '0 3 * * *',
    },
    {
      name: 'naass-frontend',
      script: 'npx',
      args: 'serve -s build -l 3007',
      cwd: '/var/www/naass/frontend',
      instances: 1,
      exec_mode: 'fork',
      
      // Resource limits
      max_memory_restart: '300M',
      
      // Environment
      env: {
        PORT: 3007,
        NODE_ENV: 'production'
      },
      
      // Restart policies
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      autorestart: true,
      
      // Logging
      error_file: '/var/www/naass/logs/frontend-error.log',
      out_file: '/var/www/naass/logs/frontend-out.log',
      log_file: '/var/www/naass/logs/frontend-combined.log',
      time: true,
      
      // Watch disabled in production
      watch: false,
      
      // Graceful shutdown
      kill_timeout: 3000,
    }
  ],
  
  // Deploy configuration (optional)
  deploy: {
    production: {
      user: 'root',
      host: '31.97.57.193',
      ref: 'origin/main',
      repo: 'https://github.com/adityapachauri0/naass.git',
      path: '/var/www/naass',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-deploy-local': 'echo "Deploying to production server"'
    }
  }
};