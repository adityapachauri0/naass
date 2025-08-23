#!/bin/bash

# NAASS Cron Setup Script
# Sets up automated maintenance tasks

echo "🕒 Setting up NAASS automated maintenance tasks..."

# Create cron job file
CRON_FILE="/etc/cron.d/naass-maintenance"

# Create the cron configuration
cat > ${CRON_FILE} <<EOF
# NAASS Automated Maintenance Tasks
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Daily backup at 2:00 AM
0 2 * * * root /var/www/naass/scripts/backup-production.sh >> /var/www/naass/logs/backup.log 2>&1

# Database cleanup every Sunday at 3:00 AM
0 3 * * 0 root cd /var/www/naass && /usr/bin/node scripts/cleanup-maintenance.js >> /var/www/naass/logs/maintenance.log 2>&1

# PM2 log rotation daily at 4:00 AM
0 4 * * * root pm2 flush >> /var/www/naass/logs/pm2-flush.log 2>&1

# Check and restart if needed every 6 hours
0 */6 * * * root /var/www/naass/scripts/health-check.sh >> /var/www/naass/logs/health-check.log 2>&1

# Clear nginx cache weekly on Monday at 1:00 AM
0 1 * * 1 root rm -rf /var/cache/nginx/naass/* && nginx -s reload

# MongoDB optimization monthly on 1st at 5:00 AM
0 5 1 * * root mongosh naass_db --eval "db.runCommand({compact:'leads'})" >> /var/www/naass/logs/mongo-compact.log 2>&1

EOF

# Set proper permissions
chmod 644 ${CRON_FILE}

echo "✅ Cron jobs configured in ${CRON_FILE}"

# Create health check script
cat > /var/www/naass/scripts/health-check.sh <<'EOF'
#!/bin/bash

# NAASS Health Check Script
API_URL="http://localhost:5007/api/health"
MAX_RETRIES=3
RETRY_COUNT=0

check_health() {
    response=$(curl -s -o /dev/null -w "%{http_code}" ${API_URL})
    if [ "$response" != "200" ]; then
        return 1
    fi
    return 0
}

while [ ${RETRY_COUNT} -lt ${MAX_RETRIES} ]; do
    if check_health; then
        echo "[$(date)] Health check passed"
        exit 0
    else
        echo "[$(date)] Health check failed, attempt $((RETRY_COUNT + 1))/${MAX_RETRIES}"
        RETRY_COUNT=$((RETRY_COUNT + 1))
        sleep 10
    fi
done

# If we get here, health checks failed
echo "[$(date)] Health check failed after ${MAX_RETRIES} attempts, restarting services..."
pm2 restart naass-backend
pm2 restart naass-frontend

# Wait and check again
sleep 30
if check_health; then
    echo "[$(date)] Services restarted successfully"
else
    echo "[$(date)] Services still unhealthy after restart, sending alert..."
    # Add alerting logic here (email, Slack, etc.)
fi
EOF

chmod +x /var/www/naass/scripts/health-check.sh

# Create log rotation configuration
cat > /etc/logrotate.d/naass <<EOF
/var/www/naass/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 root root
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}

/var/log/nginx/naass_*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        nginx -s reload
    endscript
}
EOF

echo "✅ Log rotation configured"

# Reload cron service
systemctl reload cron

echo "🎉 NAASS automated maintenance setup complete!"
echo ""
echo "Configured tasks:"
echo "  ✅ Daily backups at 2:00 AM"
echo "  ✅ Weekly database cleanup on Sundays at 3:00 AM"
echo "  ✅ Daily PM2 log rotation at 4:00 AM"
echo "  ✅ Health checks every 6 hours"
echo "  ✅ Weekly nginx cache clearing on Mondays"
echo "  ✅ Monthly MongoDB optimization"
echo "  ✅ Log rotation for all services"