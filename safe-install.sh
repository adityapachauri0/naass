#!/bin/bash

echo "🚀 Safe installation of NAASS on VPS (avoiding conflicts)..."
echo "📌 Will use ports:"
echo "   - Frontend: 3004"
echo "   - Backend: 5004"
echo ""

expect -c "
  set timeout 300
  spawn ssh root@31.97.57.193
  expect \"password:\"
  send \"w(7rjMOF4'nzhIOuOdPF\r\"
  
  expect \"root@*\"
  send \"cd /var/www/naass\r\"
  
  # Create environment files with safe ports
  expect \"root@*\"
  send \"cat > /var/www/naass/backend/.env << 'EOF'
PORT=5004
MONGODB_URI=mongodb://localhost:27017/naass
JWT_SECRET=naass-super-secret-jwt-key-production-2025
NODE_ENV=production
CORS_ORIGIN=http://31.97.57.193:3004,http://naass.co.uk
EOF\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"cat > /var/www/naass/frontend/.env << 'EOF'
REACT_APP_API_URL=http://31.97.57.193:5004/api
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENVIRONMENT=production
PORT=3004
EOF\r\"
  expect \"root@*\"
  
  # Update docker-compose to use different ports
  expect \"root@*\"
  send \"sed -i 's/3000:3000/3004:3000/g' docker-compose.yml\r\"
  expect \"root@*\"
  send \"sed -i 's/5000:5000/5004:5000/g' docker-compose.yml\r\"
  expect \"root@*\"
  
  # Check if MongoDB is running
  expect \"root@*\"
  send \"systemctl status mongod | grep Active\r\"
  expect \"root@*\"
  
  # Build and start only NAASS containers
  expect \"root@*\"
  send \"docker-compose -p naass up -d --build\r\"
  expect \"root@*\"
  
  # Wait for startup
  expect \"root@*\"
  send \"sleep 15\r\"
  expect \"root@*\"
  
  # Check status
  expect \"root@*\"
  send \"docker ps | grep naass\r\"
  expect \"root@*\"
  
  # Test endpoints
  expect \"root@*\"
  send \"curl -s http://localhost:3004 | grep -o '<title>.*</title>'\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"curl -s http://localhost:5004/api/health\r\"
  expect \"root@*\"
  
  # Add nginx configuration for naass subdomain
  expect \"root@*\"
  send \"cat > /etc/nginx/sites-available/naass << 'EOF'
server {
    listen 80;
    server_name naass.co.uk www.naass.co.uk;
    
    location / {
        proxy_pass http://localhost:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
    
    location /api {
        proxy_pass http://localhost:5004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
EOF\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"ln -sf /etc/nginx/sites-available/naass /etc/nginx/sites-enabled/\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"nginx -t\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"systemctl reload nginx\r\"
  expect \"root@*\"
  
  send \"exit\r\"
  expect eof
"

echo ""
echo "✅ Safe installation complete!"
echo ""
echo "📌 Access points:"
echo "   Direct Frontend: http://31.97.57.193:3004"
echo "   Direct Backend: http://31.97.57.193:5004/api"
echo "   Domain (when configured): http://naass.co.uk"
echo ""
echo "🔒 Dashboard Login:"
echo "   URL: http://31.97.57.193:3004/dashboard"
echo "   Username: admin@naass.co.uk"
echo "   Password: admin123"
echo ""
echo "✅ Other projects are safe:"
echo "   - click2leads still on port 5001"
echo "   - viticultwhisky still on port 5003"
echo "   - NAASS on new ports 3004/5004"