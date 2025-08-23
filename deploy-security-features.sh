#!/bin/bash

echo "🔒 Deploying NAASS Security & Isolation Features to VPS..."
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

expect -c "
  set timeout 600
  spawn ssh root@31.97.57.193
  expect \"password:\"
  send \"w(7rjMOF4'nzhIOuOdPF\r\"
  
  expect \"root@*\"
  send \"cd /var/www/naass\r\"
  
  # Pull latest changes
  expect \"root@*\"
  send \"git pull origin main\r\"
  expect \"root@*\"
  
  # Install new dependencies
  expect \"root@*\"
  send \"cd backend && npm install compression express-mongo-sanitize ioredis rate-limit-redis\r\"
  expect \"root@*\"
  
  # Create logs directory
  expect \"root@*\"
  send \"mkdir -p /var/www/naass/logs\r\"
  expect \"root@*\"
  
  # Create nginx cache directory
  expect \"root@*\"
  send \"mkdir -p /var/cache/nginx/naass\r\"
  expect \"root@*\"
  send \"chown -R www-data:www-data /var/cache/nginx/naass\r\"
  expect \"root@*\"
  
  # Backup current configuration
  expect \"root@*\"
  send \"cp /var/www/naass/backend/.env /var/www/naass/backend/.env.backup.\$(date +%Y%m%d)\r\"
  expect \"root@*\"
  
  # Update environment variables
  expect \"root@*\"
  send \"cat >> /var/www/naass/backend/.env << 'EOL'

# Enhanced Security Configuration
ENABLE_REDIS_CACHE=false
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ENABLE_COMPRESSION=true
COMPRESSION_LEVEL=6
ENABLE_IP_TRACKING=true
LOG_LEVEL=info
LOG_FILE=/var/www/naass/logs/app.log
CORS_ALLOWED_ORIGINS=https://naass.co.uk,https://www.naass.co.uk
EOL\r\"
  expect \"root@*\"
  
  # Copy nginx configuration
  expect \"root@*\"
  send \"cp /etc/nginx/sites-available/naass-app /etc/nginx/sites-available/naass-app.backup.\$(date +%Y%m%d)\r\"
  expect \"root@*\"
  
  # Update nginx configuration with enhanced features
  expect \"root@*\"
  send \"cat > /etc/nginx/sites-available/naass-app << 'EOF'
# NAASS Application - Enhanced Configuration
server {
    listen 80;
    server_name naass.co.uk www.naass.co.uk;
    return 301 https://\\\$server_name\\\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name naass.co.uk www.naass.co.uk;
    
    ssl_certificate /etc/letsencrypt/live/naass.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/naass.co.uk/privkey.pem;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
    gzip_comp_level 6;
    
    # Security headers
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection \"1; mode=block\" always;
    
    # Frontend proxy
    location / {
        proxy_pass http://127.0.0.1:3007;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
    }
    
    # Backend API proxy
    location /api {
        proxy_pass http://127.0.0.1:5007;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
    }
    
    # Static file caching
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3007;
        expires 30d;
        add_header Cache-Control \"public, immutable\";
    }
}
EOF\r\"
  expect \"root@*\"
  
  # Test nginx configuration
  expect \"root@*\"
  send \"nginx -t\r\"
  expect \"root@*\"
  
  # Reload nginx
  expect \"root@*\"
  send \"systemctl reload nginx\r\"
  expect \"root@*\"
  
  # Make scripts executable
  expect \"root@*\"
  send \"chmod +x /var/www/naass/scripts/*.sh\r\"
  expect \"root@*\"
  send \"chmod +x /var/www/naass/scripts/*.js\r\"
  expect \"root@*\"
  
  # Update PM2 ecosystem configuration
  expect \"root@*\"
  send \"pm2 delete naass-backend naass-frontend 2>/dev/null || true\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"cd /var/www/naass && pm2 start ecosystem.config.js\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"pm2 save\r\"
  expect \"root@*\"
  
  # Set up basic cron for backup (optional)
  expect \"root@*\"
  send \"(crontab -l 2>/dev/null | grep -v 'naass/scripts/backup'; echo '0 2 * * * /var/www/naass/scripts/backup-production.sh >> /var/www/naass/logs/backup.log 2>&1') | crontab -\r\"
  expect \"root@*\"
  
  # Create backup directory
  expect \"root@*\"
  send \"mkdir -p /var/backups/naass\r\"
  expect \"root@*\"
  
  # Test the health endpoint
  expect \"root@*\"
  send \"curl -s http://localhost:5007/api/health | jq\r\"
  expect \"root@*\"
  
  # Show PM2 status
  expect \"root@*\"
  send \"pm2 status | grep naass\r\"
  expect \"root@*\"
  
  send \"exit\r\"
  expect eof
"

echo ""
echo -e "${GREEN}✅ NAASS Security & Isolation Features Deployed!${NC}"
echo ""
echo "📊 Features Enabled:"
echo "  ✅ Helmet.js security headers"
echo "  ✅ CORS with strict origin control"
echo "  ✅ Compression middleware"
echo "  ✅ Rate limiting (100 req/15min)"
echo "  ✅ MongoDB sanitization"
echo "  ✅ PM2 auto-restart & memory limits"
echo "  ✅ Nginx gzip compression"
echo "  ✅ Static file caching (30 days)"
echo "  ✅ Backup scripts ready"
echo "  ✅ Cleanup scripts ready"
echo "  ✅ Health monitoring"
echo ""
echo "🔒 Security Configuration:"
echo "  - Database: naass_db (isolated)"
echo "  - Ports: 5007 (backend), 3007 (frontend)"
echo "  - Max memory: 500MB (backend), 300MB (frontend)"
echo "  - Auto-restart: Enabled"
echo "  - Rate limiting: Active"
echo "  - HTTPS: Enforced"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "  1. Enable Redis caching when ready: ENABLE_REDIS_CACHE=true"
echo "  2. Configure email settings for notifications"
echo "  3. Set up monitoring (Sentry, etc.)"
echo "  4. Run backup manually: /var/www/naass/scripts/backup-production.sh"
echo ""
echo "🌐 Access: https://naass.co.uk"
echo "📊 Dashboard: https://naass.co.uk/dashboard"