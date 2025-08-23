#!/bin/bash

# NAASS VPS Deployment Script
# This script sets up the complete NAASS application on the VPS

echo "🚀 Starting NAASS deployment to VPS..."

# Server connection details
SERVER="root@31.97.57.193"
PASSWORD='w(7rjMOF4'"'"'nzhIOuOdPF'
APP_DIR="/var/www/naass"

# Create expect script for automated deployment
cat > /tmp/deploy-naass.exp << 'EOF'
#!/usr/bin/expect -f

set timeout 300
spawn ssh root@31.97.57.193

expect "password:"
send "w(7rjMOF4'nzhIOuOdPF\r"

expect "root@*"
send "cd /var/www/naass\r"

# Check if Docker is installed
expect "root@*"
send "docker --version 2>/dev/null || echo 'DOCKER_NOT_FOUND'\r"

expect {
    "DOCKER_NOT_FOUND" {
        send "echo '📦 Installing Docker...'\r"
        expect "root@*"
        send "apt-get update\r"
        expect "root@*"
        send "apt-get install -y docker.io docker-compose\r"
        expect "root@*"
        send "systemctl start docker\r"
        expect "root@*"
        send "systemctl enable docker\r"
        expect "root@*"
    }
    "Docker version" {
        send "echo '✅ Docker already installed'\r"
        expect "root@*"
    }
}

# Create environment files
send "echo '🔧 Setting up environment variables...'\r"
expect "root@*"

# Backend .env
send "cat > /var/www/naass/backend/.env << 'ENVFILE'\r"
expect ">"
send "PORT=5000\r"
expect ">"
send "MONGODB_URI=mongodb://naass_mongo:27017/naass\r"
expect ">"
send "JWT_SECRET=naass-jwt-secret-key-2025-production\r"
expect ">"
send "NODE_ENV=production\r"
expect ">"
send "CORS_ORIGIN=https://naass.co.uk\r"
expect ">"
send "ENVFILE\r"
expect "root@*"

# Frontend .env
send "cat > /var/www/naass/frontend/.env << 'ENVFILE'\r"
expect ">"
send "REACT_APP_API_URL=https://naass.co.uk/api\r"
expect ">"
send "REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX\r"
expect ">"
send "REACT_APP_ENVIRONMENT=production\r"
expect ">"
send "ENVFILE\r"
expect "root@*"

# Stop any existing containers
send "echo '🛑 Stopping existing containers...'\r"
expect "root@*"
send "docker-compose down 2>/dev/null || true\r"
expect "root@*"

# Build and start with Docker Compose
send "echo '🏗️ Building Docker images...'\r"
expect "root@*"
send "docker-compose build --no-cache\r"
expect "root@*"

send "echo '🚀 Starting application...'\r"
expect "root@*"
send "docker-compose up -d\r"
expect "root@*"

# Check container status
send "echo '📊 Checking container status...'\r"
expect "root@*"
send "docker-compose ps\r"
expect "root@*"

# Set up nginx reverse proxy (if nginx is installed)
send "echo '🔧 Setting up nginx...'\r"
expect "root@*"
send "nginx -v 2>/dev/null || echo 'NGINX_NOT_FOUND'\r"

expect {
    "NGINX_NOT_FOUND" {
        send "echo '📦 Installing nginx...'\r"
        expect "root@*"
        send "apt-get install -y nginx certbot python3-certbot-nginx\r"
        expect "root@*"
    }
    "nginx version" {
        send "echo '✅ Nginx already installed'\r"
        expect "root@*"
    }
}

# Create nginx configuration
send "cat > /etc/nginx/sites-available/naass << 'NGINXCONF'\r"
expect ">"
send "server {\r"
expect ">"
send "    listen 80;\r"
expect ">"
send "    server_name naass.co.uk www.naass.co.uk;\r"
expect ">"
send "\r"
expect ">"
send "    location / {\r"
expect ">"
send "        proxy_pass http://localhost:3000;\r"
expect ">"
send "        proxy_http_version 1.1;\r"
expect ">"
send "        proxy_set_header Upgrade \$http_upgrade;\r"
expect ">"
send "        proxy_set_header Connection 'upgrade';\r"
expect ">"
send "        proxy_set_header Host \$host;\r"
expect ">"
send "        proxy_cache_bypass \$http_upgrade;\r"
expect ">"
send "    }\r"
expect ">"
send "\r"
expect ">"
send "    location /api {\r"
expect ">"
send "        proxy_pass http://localhost:5000;\r"
expect ">"
send "        proxy_http_version 1.1;\r"
expect ">"
send "        proxy_set_header Upgrade \$http_upgrade;\r"
expect ">"
send "        proxy_set_header Connection 'upgrade';\r"
expect ">"
send "        proxy_set_header Host \$host;\r"
expect ">"
send "        proxy_cache_bypass \$http_upgrade;\r"
expect ">"
send "    }\r"
expect ">"
send "}\r"
expect ">"
send "NGINXCONF\r"
expect "root@*"

# Enable the site
send "ln -sf /etc/nginx/sites-available/naass /etc/nginx/sites-enabled/\r"
expect "root@*"
send "nginx -t\r"
expect "root@*"
send "systemctl reload nginx\r"
expect "root@*"

# Check application status
send "echo '\r'\r"
expect "root@*"
send "echo '✅ Deployment complete! Checking status...'\r"
expect "root@*"
send "echo '===================================='\r"
expect "root@*"
send "docker-compose ps\r"
expect "root@*"
send "echo '===================================='\r"
expect "root@*"
send "curl -I http://localhost:3000 2>/dev/null | head -n 1\r"
expect "root@*"
send "curl -I http://localhost:5000/api/health 2>/dev/null | head -n 1\r"
expect "root@*"

send "echo '\r'\r"
expect "root@*"
send "echo '🎉 NAASS is now deployed!'\r"
expect "root@*"
send "echo 'Frontend: http://naass.co.uk (or server IP)'\r"
expect "root@*"
send "echo 'Backend API: http://naass.co.uk/api'\r"
expect "root@*"
send "echo '\r'\r"
expect "root@*"
send "echo 'To set up SSL, run: certbot --nginx -d naass.co.uk -d www.naass.co.uk'\r"
expect "root@*"

send "exit\r"
expect eof
EOF

# Make the expect script executable and run it
chmod +x /tmp/deploy-naass.exp
/tmp/deploy-naass.exp

echo "✅ Deployment script completed!"
echo ""
echo "Next steps:"
echo "1. Point your domain (naass.co.uk) to IP: 31.97.57.193"
echo "2. Run SSL setup on the server: certbot --nginx -d naass.co.uk -d www.naass.co.uk"
echo "3. Update Google Analytics tracking ID in frontend/.env"
echo "4. Access your application at https://naass.co.uk"