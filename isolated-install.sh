#!/bin/bash

echo "🚀 Installing NAASS in complete isolation..."
echo "📌 Configuration:"
echo "   - Frontend: Port 3007 (PM2)"
echo "   - Backend: Port 5007 (PM2)" 
echo "   - Separate PM2 instance"
echo "   - Separate nginx config"
echo ""

expect -c "
  set timeout 600
  spawn ssh root@31.97.57.193
  expect \"password:\"
  send \"w(7rjMOF4'nzhIOuOdPF\r\"
  
  expect \"root@*\"
  send \"cd /var/www/naass\r\"
  
  # Install Node.js dependencies for backend
  expect \"root@*\"
  send \"cd /var/www/naass/backend && npm install\r\"
  expect \"root@*\"
  
  # Create backend .env with port 5007
  expect \"root@*\"
  send \"cat > /var/www/naass/backend/.env << 'EOF'
PORT=5007
MONGODB_URI=mongodb://localhost:27017/naass_db
JWT_SECRET=naass-secret-key-5007-production-2025
NODE_ENV=production
CORS_ORIGIN=http://31.97.57.193:3007,http://naass.co.uk,https://naass.co.uk
EOF\r\"
  expect \"root@*\"
  
  # Install Node.js dependencies for frontend
  expect \"root@*\"
  send \"cd /var/www/naass/frontend && npm install\r\"
  expect \"root@*\"
  
  # Create frontend .env with port 3007
  expect \"root@*\"
  send \"cat > /var/www/naass/frontend/.env << 'EOF'
PORT=3007
REACT_APP_API_URL=http://31.97.57.193:5007/api
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENVIRONMENT=production
EOF\r\"
  expect \"root@*\"
  
  # Build frontend
  expect \"root@*\"
  send \"cd /var/www/naass/frontend && npm run build\r\"
  expect \"root@*\"
  
  # Create PM2 ecosystem file for NAASS
  expect \"root@*\"
  send \"cat > /var/www/naass/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'naass-backend',
      script: '/var/www/naass/backend/server.js',
      cwd: '/var/www/naass/backend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 5007,
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://localhost:27017/naass_db',
        JWT_SECRET: 'naass-secret-key-5007-production-2025',
        CORS_ORIGIN: 'http://31.97.57.193:3007,http://naass.co.uk,https://naass.co.uk'
      },
      error_file: '/var/www/naass/logs/backend-error.log',
      out_file: '/var/www/naass/logs/backend-out.log',
      log_file: '/var/www/naass/logs/backend-combined.log',
      time: true
    },
    {
      name: 'naass-frontend',
      script: 'npx',
      args: 'serve -s build -l 3007',
      cwd: '/var/www/naass/frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        PORT: 3007
      },
      error_file: '/var/www/naass/logs/frontend-error.log',
      out_file: '/var/www/naass/logs/frontend-out.log',
      log_file: '/var/www/naass/logs/frontend-combined.log',
      time: true
    }
  ]
};
EOF\r\"
  expect \"root@*\"
  
  # Create logs directory
  expect \"root@*\"
  send \"mkdir -p /var/www/naass/logs\r\"
  expect \"root@*\"
  
  # Install serve globally if not installed
  expect \"root@*\"
  send \"npm install -g serve\r\"
  expect \"root@*\"
  
  # Stop any existing NAASS PM2 processes
  expect \"root@*\"
  send \"pm2 delete naass-backend naass-frontend 2>/dev/null || true\r\"
  expect \"root@*\"
  
  # Start with PM2
  expect \"root@*\"
  send \"cd /var/www/naass && pm2 start ecosystem.config.js\r\"
  expect \"root@*\"
  
  # Save PM2 configuration
  expect \"root@*\"
  send \"pm2 save\r\"
  expect \"root@*\"
  
  # Setup PM2 startup
  expect \"root@*\"
  send \"pm2 startup | tail -n 1 | bash\r\"
  expect \"root@*\"
  
  # Check PM2 status
  expect \"root@*\"
  send \"pm2 list\r\"
  expect \"root@*\"
  
  # Create separate nginx config for NAASS
  expect \"root@*\"
  send \"cat > /etc/nginx/sites-available/naass-app << 'EOF'
# NAASS Application - Isolated Configuration
server {
    listen 80;
    server_name naass.co.uk www.naass.co.uk;
    
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
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3007;
        expires 30d;
        add_header Cache-Control \"public, immutable\";
    }
}
EOF\r\"
  expect \"root@*\"
  
  # Enable nginx site
  expect \"root@*\"
  send \"ln -sf /etc/nginx/sites-available/naass-app /etc/nginx/sites-enabled/\r\"
  expect \"root@*\"
  
  # Test nginx configuration
  expect \"root@*\"
  send \"nginx -t\r\"
  expect \"root@*\"
  
  # Reload nginx
  expect \"root@*\"
  send \"systemctl reload nginx\r\"
  expect \"root@*\"
  
  # Test the endpoints
  expect \"root@*\"
  send \"sleep 5\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"curl -I http://localhost:3007\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"curl http://localhost:5007/api/health\r\"
  expect \"root@*\"
  
  # Show PM2 logs
  expect \"root@*\"
  send \"pm2 logs --lines 5\r\"
  expect \"root@*\"
  
  send \"exit\r\"
  expect eof
"

echo ""
echo "✅ NAASS installed in complete isolation!"
echo ""
echo "📌 Access Points:"
echo "   Direct Frontend: http://31.97.57.193:3007"
echo "   Direct Backend API: http://31.97.57.193:5007/api"
echo "   Via Domain: http://naass.co.uk (when DNS configured)"
echo ""
echo "🔒 Dashboard Access:"
echo "   URL: http://31.97.57.193:3007/dashboard"
echo "   Username: admin@naass.co.uk"
echo "   Password: admin123"
echo ""
echo "🛡️ Complete Isolation:"
echo "   ✅ Separate PM2 processes (naass-backend, naass-frontend)"
echo "   ✅ Separate ports (3007, 5007)"
echo "   ✅ Separate nginx config (naass-app)"
echo "   ✅ Separate MongoDB database (naass_db)"
echo "   ✅ Separate log files (/var/www/naass/logs/)"
echo ""
echo "📊 PM2 Commands:"
echo "   pm2 status          - Check status"
echo "   pm2 logs naass-backend  - Backend logs"
echo "   pm2 logs naass-frontend - Frontend logs"
echo "   pm2 restart naass-backend"
echo "   pm2 restart naass-frontend"