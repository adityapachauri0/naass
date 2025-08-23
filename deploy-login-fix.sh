#!/bin/bash

echo "🚀 Deploying NAASS login fix to VPS..."
echo ""

expect -c "
  set timeout 300
  spawn ssh root@31.97.57.193
  expect \"password:\"
  send \"w(7rjMOF4'nzhIOuOdPF\r\"
  
  expect \"root@*\"
  send \"cd /var/www/naass/frontend\r\"
  
  # Pull latest changes
  expect \"root@*\"
  send \"git pull origin main\r\"
  expect \"root@*\"
  
  # Install dependencies (in case any were added)
  expect \"root@*\"
  send \"npm install --legacy-peer-deps\r\"
  expect \"root@*\"
  
  # Build with production environment
  expect \"root@*\"
  send \"REACT_APP_API_URL=https://naass.co.uk/api npm run build\r\"
  expect \"root@*\"
  
  # Restart frontend PM2 process
  expect \"root@*\"
  send \"pm2 restart naass-frontend\r\"
  expect \"root@*\"
  
  # Check status
  expect \"root@*\"
  send \"pm2 status | grep naass\r\"
  expect \"root@*\"
  
  # Test the login endpoint
  expect \"root@*\"
  send \"curl -X POST http://localhost:5007/api/auth/login -H 'Content-Type: application/json' -d '{\\\"username\\\":\\\"admin\\\",\\\"password\\\":\\\"admin123\\\"}'\r\"
  expect \"root@*\"
  
  send \"exit\r\"
  expect eof
"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔐 Login credentials:"
echo "   URL: https://naass.co.uk/dashboard"
echo "   Username: admin"
echo "   Password: admin123"