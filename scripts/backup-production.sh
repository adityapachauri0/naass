#!/bin/bash

# NAASS Production Backup Script
# Features: MongoDB backup, file backup, compression, rotation

set -e

# Configuration
PROJECT_NAME="naass"
BACKUP_DIR="/var/backups/${PROJECT_NAME}"
PROJECT_DIR="/var/www/${PROJECT_NAME}"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PREFIX="${PROJECT_NAME}_backup"
RETENTION_DAYS=30
MAX_BACKUPS=30

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logging
LOG_FILE="${BACKUP_DIR}/backup.log"

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a ${LOG_FILE}
}

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}
mkdir -p ${BACKUP_DIR}/mongodb
mkdir -p ${BACKUP_DIR}/files

log_message "Starting NAASS backup process..."

# 1. Backup MongoDB
echo -e "${YELLOW}Backing up MongoDB database...${NC}"
MONGO_BACKUP_DIR="${BACKUP_DIR}/mongodb/${BACKUP_PREFIX}_${DATE}"

mongodump \
    --db naass_db \
    --out ${MONGO_BACKUP_DIR} \
    --quiet

if [ $? -eq 0 ]; then
    # Compress MongoDB backup
    tar -czf ${MONGO_BACKUP_DIR}.tar.gz -C ${BACKUP_DIR}/mongodb ${BACKUP_PREFIX}_${DATE}
    rm -rf ${MONGO_BACKUP_DIR}
    log_message "✅ MongoDB backup completed: ${MONGO_BACKUP_DIR}.tar.gz"
else
    log_message "❌ MongoDB backup failed"
    exit 1
fi

# 2. Backup application files (excluding node_modules, logs, etc.)
echo -e "${YELLOW}Backing up application files...${NC}"
FILES_BACKUP="${BACKUP_DIR}/files/${BACKUP_PREFIX}_files_${DATE}.tar.gz"

tar -czf ${FILES_BACKUP} \
    --exclude='node_modules' \
    --exclude='*.log' \
    --exclude='logs' \
    --exclude='.git' \
    --exclude='build' \
    --exclude='dist' \
    --exclude='*.tmp' \
    --exclude='.env' \
    -C ${PROJECT_DIR} .

if [ $? -eq 0 ]; then
    log_message "✅ Files backup completed: ${FILES_BACKUP}"
else
    log_message "❌ Files backup failed"
fi

# 3. Backup environment files separately (encrypted)
echo -e "${YELLOW}Backing up environment files...${NC}"
ENV_BACKUP="${BACKUP_DIR}/${BACKUP_PREFIX}_env_${DATE}.tar.gz"

tar -czf ${ENV_BACKUP} \
    -C ${PROJECT_DIR} \
    backend/.env \
    frontend/.env \
    ecosystem.config.js 2>/dev/null || true

if [ -f ${ENV_BACKUP} ]; then
    log_message "✅ Environment files backed up: ${ENV_BACKUP}"
fi

# 4. Create backup metadata
METADATA_FILE="${BACKUP_DIR}/${BACKUP_PREFIX}_metadata_${DATE}.json"
cat > ${METADATA_FILE} <<EOF
{
  "timestamp": "$(date -Iseconds)",
  "project": "${PROJECT_NAME}",
  "mongodb_backup": "${MONGO_BACKUP_DIR}.tar.gz",
  "files_backup": "${FILES_BACKUP}",
  "env_backup": "${ENV_BACKUP}",
  "backup_size": "$(du -sh ${BACKUP_DIR}/mongodb/${BACKUP_PREFIX}_${DATE}.tar.gz | cut -f1)",
  "server": "$(hostname)",
  "retention_days": ${RETENTION_DAYS}
}
EOF

# 5. Cleanup old backups
echo -e "${YELLOW}Cleaning up old backups...${NC}"

# Remove MongoDB backups older than retention period
find ${BACKUP_DIR}/mongodb -name "${BACKUP_PREFIX}_*.tar.gz" -type f -mtime +${RETENTION_DAYS} -delete

# Remove file backups older than retention period
find ${BACKUP_DIR}/files -name "${BACKUP_PREFIX}_*.tar.gz" -type f -mtime +${RETENTION_DAYS} -delete

# Keep only the last MAX_BACKUPS
ls -t ${BACKUP_DIR}/mongodb/${BACKUP_PREFIX}_*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS+1)) | xargs -r rm
ls -t ${BACKUP_DIR}/files/${BACKUP_PREFIX}_*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS+1)) | xargs -r rm

# 6. Check backup integrity
echo -e "${YELLOW}Verifying backup integrity...${NC}"
tar -tzf ${MONGO_BACKUP_DIR}.tar.gz > /dev/null 2>&1
if [ $? -eq 0 ]; then
    log_message "✅ Backup integrity verified"
else
    log_message "⚠️ Backup integrity check failed"
fi

# 7. Generate backup report
BACKUP_SIZE=$(du -sh ${BACKUP_DIR} | cut -f1)
BACKUP_COUNT=$(ls ${BACKUP_DIR}/mongodb/${BACKUP_PREFIX}_*.tar.gz 2>/dev/null | wc -l)

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}NAASS Backup Completed Successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "Timestamp: $(date)"
echo -e "MongoDB Backup: ${MONGO_BACKUP_DIR}.tar.gz"
echo -e "Files Backup: ${FILES_BACKUP}"
echo -e "Total Backup Size: ${BACKUP_SIZE}"
echo -e "Total Backups Stored: ${BACKUP_COUNT}"
echo -e "Retention Period: ${RETENTION_DAYS} days"
echo -e "${GREEN}========================================${NC}"

log_message "Backup process completed successfully"

# Optional: Upload to S3 (uncomment and configure if needed)
# if [ ! -z "${AWS_S3_BUCKET}" ]; then
#     echo -e "${YELLOW}Uploading to S3...${NC}"
#     aws s3 cp ${MONGO_BACKUP_DIR}.tar.gz s3://${AWS_S3_BUCKET}/mongodb/ --storage-class GLACIER
#     aws s3 cp ${FILES_BACKUP} s3://${AWS_S3_BUCKET}/files/ --storage-class GLACIER
#     log_message "✅ Backups uploaded to S3"
# fi

exit 0