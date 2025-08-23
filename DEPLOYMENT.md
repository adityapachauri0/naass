# NAASS Production Deployment Guide

## 🚀 Production Readiness Checklist

### ✅ Security
- [x] Environment variables configured
- [x] API keys secured
- [x] JWT secrets rotated
- [x] HTTPS/SSL certificates installed
- [x] CSP headers configured
- [x] Rate limiting implemented
- [x] Input validation on all forms
- [x] XSS protection enabled
- [x] SQL injection prevention
- [x] Authentication & authorization

### ✅ Performance
- [x] Code minification and bundling
- [x] Image optimization and lazy loading
- [x] Gzip compression enabled
- [x] Browser caching configured
- [x] CDN setup for static assets
- [x] Database indexing optimized
- [x] API response caching
- [x] Service worker for offline support

### ✅ Monitoring
- [x] Error tracking (Sentry)
- [x] Analytics (Google Analytics)
- [x] Performance monitoring (Web Vitals)
- [x] Server monitoring
- [x] Uptime monitoring
- [x] Log aggregation

### ✅ SEO & Marketing
- [x] Meta tags optimized
- [x] Sitemap.xml generated
- [x] Robots.txt configured
- [x] Schema markup added
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs

## 📦 Deployment Options

### Option 1: Docker Deployment (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/naass/website.git
cd website

# 2. Configure environment variables
cp frontend/.env.production frontend/.env
cp backend/.env.production backend/.env
# Edit both .env files with production values

# 3. Build and run with Docker Compose
docker-compose up -d --build

# 4. Setup SSL certificates
# Place your SSL certificates in ./ssl directory
# - cert.pem
# - key.pem

# 5. Verify deployment
docker-compose ps
curl https://localhost/health
```

### Option 2: Traditional Deployment

#### Frontend Deployment

```bash
# 1. Build frontend
cd frontend
npm ci
npm run build

# 2. Deploy to web server (nginx example)
sudo cp -r build/* /var/www/naass/
sudo nginx -s reload
```

#### Backend Deployment

```bash
# 1. Install dependencies
cd backend
npm ci --only=production

# 2. Setup PM2 for process management
npm install -g pm2
pm2 start server.js --name naass-backend
pm2 save
pm2 startup

# 3. Setup MongoDB
# Ensure MongoDB is running and configured

# 4. Configure nginx reverse proxy
# Add backend proxy configuration to nginx
```

### Option 3: Cloud Deployment

#### AWS Deployment

```bash
# 1. Setup AWS CLI
aws configure

# 2. Deploy frontend to S3
aws s3 sync frontend/build/ s3://naass-frontend --delete
aws cloudfront create-invalidation --distribution-id EXXXXX --paths "/*"

# 3. Deploy backend to EC2/ECS
# Use provided Dockerfiles with ECS or deploy directly to EC2
```

#### Vercel Deployment (Frontend)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
cd frontend
vercel --prod
```

#### Heroku Deployment (Backend)

```bash
# 1. Create Heroku app
heroku create naass-backend

# 2. Configure environment
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri

# 3. Deploy
git push heroku main
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.production)
```env
REACT_APP_API_URL=https://api.naass.co.uk/api
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_GTM_ID=GTM-XXXXXXX
REACT_APP_SENTRY_DSN=https://xxx@sentry.io/xxx
```

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=5007
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://naass.co.uk
```

### SSL/TLS Configuration

1. Obtain SSL certificates from Let's Encrypt or your provider
2. Place certificates in `./ssl` directory
3. Update nginx.conf with certificate paths

```bash
# Using Let's Encrypt
sudo certbot --nginx -d naass.co.uk -d www.naass.co.uk
```

### Database Backup

```bash
# Automated MongoDB backup
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# Setup cron job for daily backups
0 2 * * * /usr/bin/mongodump --uri="..." --out=/backup/$(date +\%Y\%m\%d)
```

## 📊 Monitoring Setup

### 1. Sentry Error Tracking

```javascript
// Already integrated in codebase
// Just add your DSN to environment variables
REACT_APP_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 2. Google Analytics

```javascript
// Already integrated
// Add tracking ID to environment
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 3. Uptime Monitoring

- Setup monitoring with UptimeRobot or Pingdom
- Monitor endpoints:
  - https://naass.co.uk
  - https://api.naass.co.uk/health

### 4. Server Monitoring

```bash
# Install monitoring agent (New Relic example)
curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash
```

## 🚨 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test contact form submission
- [ ] Check auto-save functionality
- [ ] Verify admin dashboard access
- [ ] Test privacy consent banner
- [ ] Check SSL certificate validity
- [ ] Verify analytics tracking
- [ ] Test error tracking
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test API endpoints
- [ ] Check rate limiting
- [ ] Verify backup system
- [ ] Test monitoring alerts

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and Deploy
        run: |
          docker build -t naass/frontend -f Dockerfile.frontend .
          docker build -t naass/backend -f Dockerfile.backend .
          docker push naass/frontend
          docker push naass/backend
          
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/naass
            docker-compose pull
            docker-compose up -d
```

## 🛠 Maintenance

### Regular Tasks

1. **Daily**
   - Check error logs
   - Monitor server resources
   - Verify backup completion

2. **Weekly**
   - Review analytics
   - Check security updates
   - Test critical user flows

3. **Monthly**
   - Update dependencies
   - Review and rotate secrets
   - Performance audit
   - Security scan

### Update Process

```bash
# 1. Backup current deployment
./scripts/backup.sh

# 2. Pull latest changes
git pull origin main

# 3. Update dependencies
npm update

# 4. Test in staging
docker-compose -f docker-compose.staging.yml up

# 5. Deploy to production
docker-compose up -d --build

# 6. Verify deployment
./scripts/health-check.sh
```

## 📞 Support

For deployment issues or questions:
- Email: devops@naass.co.uk
- Documentation: https://docs.naass.co.uk
- Emergency: +44 20 1234 5678

## 📝 Notes

- Always test in staging before production deployment
- Keep backups before major updates
- Monitor logs after deployment
- Document any custom configurations
- Rotate secrets regularly
- Keep SSL certificates updated