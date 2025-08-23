#!/bin/bash

echo "🚀 Installing NAASS on VPS from GitHub..."

# First, let's check Docker installation
expect -c "
  set timeout 300
  spawn ssh root@31.97.57.193
  expect \"password:\"
  send \"w(7rjMOF4'nzhIOuOdPF\r\"
  
  # Navigate to the project
  expect \"root@*\"
  send \"cd /var/www/naass\r\"
  
  # Pull latest changes from GitHub
  expect \"root@*\"
  send \"git pull origin main\r\"
  
  # Check and install Docker if needed
  expect \"root@*\"
  send \"which docker || (curl -fsSL https://get.docker.com | sh)\r\"
  expect \"root@*\"
  
  # Check Docker Compose
  expect \"root@*\"
  send \"which docker-compose || apt-get install -y docker-compose\r\"
  expect \"root@*\"
  
  # Create backend .env file
  expect \"root@*\"
  send \"cat > /var/www/naass/backend/.env << 'EOF'
PORT=5000
MONGODB_URI=mongodb://naass_mongo:27017/naass
JWT_SECRET=naass-super-secret-jwt-key-production-2025
NODE_ENV=production
CORS_ORIGIN=http://31.97.57.193:3000
EOF\r\"
  expect \"root@*\"
  
  # Create frontend .env file
  expect \"root@*\"
  send \"cat > /var/www/naass/frontend/.env << 'EOF'
REACT_APP_API_URL=http://31.97.57.193:5000/api
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_ENVIRONMENT=production
EOF\r\"
  expect \"root@*\"
  
  # Stop any existing containers
  expect \"root@*\"
  send \"docker-compose down\r\"
  expect \"root@*\"
  
  # Build and start the application
  expect \"root@*\"
  send \"docker-compose up -d --build\r\"
  expect \"root@*\"
  
  # Wait for containers to start
  expect \"root@*\"
  send \"sleep 10\r\"
  expect \"root@*\"
  
  # Check container status
  expect \"root@*\"
  send \"docker-compose ps\r\"
  expect \"root@*\"
  
  # Test the application
  expect \"root@*\"
  send \"curl -s http://localhost:3000 | head -n 5\r\"
  expect \"root@*\"
  
  expect \"root@*\"
  send \"curl -s http://localhost:5000/api/health\r\"
  expect \"root@*\"
  
  send \"exit\r\"
  expect eof
"

echo "✅ Installation complete!"
echo ""
echo "📌 Access your application at:"
echo "   Frontend: http://31.97.57.193:3000"
echo "   Backend API: http://31.97.57.193:5000/api"
echo "   Dashboard: http://31.97.57.193:3000/dashboard"
echo ""
echo "📝 Default admin credentials:"
echo "   Username: admin@naass.co.uk"
echo "   Password: admin123"