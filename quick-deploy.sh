#!/bin/bash

echo "🚀 Quick deployment of login fix..."

ssh root@31.97.57.193 "
cd /var/www/naass && \
git pull origin main && \
cd frontend && \
REACT_APP_API_URL=https://naass.co.uk/api npm run build && \
pm2 restart naass-frontend naass-backend && \
echo '✅ Deployment complete!' && \
curl -s -X POST http://localhost:5007/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{\"username\":\"admin\",\"password\":\"admin123\"}' | grep -q success && \
echo '✅ Login API test successful!' || echo '❌ Login API test failed'
"

echo ""
echo "🔐 Login credentials:"
echo "   URL: https://naass.co.uk/dashboard"
echo "   Username: admin"
echo "   Password: admin123"