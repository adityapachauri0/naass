#!/bin/bash

# NAASS Lead Generation Platform - Local Development Startup Script

echo "🚀 Starting NAASS Lead Generation Platform..."
echo "============================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use. Please stop the process using it."
        return 1
    fi
    return 0
}

# Check if ports are available
echo -e "${BLUE}Checking ports...${NC}"
check_port 3007
FRONTEND_PORT_STATUS=$?
check_port 5007
BACKEND_PORT_STATUS=$?

if [ $FRONTEND_PORT_STATUS -ne 0 ] || [ $BACKEND_PORT_STATUS -ne 0 ]; then
    echo "❌ Please free up the required ports and try again."
    exit 1
fi

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd ../frontend
npm install

# Start MongoDB (if not running)
echo -e "${BLUE}Checking MongoDB...${NC}"
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /tmp/mongodb.log --dbpath /usr/local/var/mongodb
fi

# Start backend server
echo -e "${GREEN}Starting backend server on port 5007...${NC}"
cd ../backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${GREEN}Starting frontend on port 3007...${NC}"
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "============================================"
echo -e "${GREEN}✅ NAASS Platform is running!${NC}"
echo ""
echo "Frontend: http://localhost:3007"
echo "Backend API: http://localhost:5007"
echo "Health Check: http://localhost:5007/api/health"
echo ""
echo "Press Ctrl+C to stop all services"
echo "============================================"

# Wait for user to stop
wait $FRONTEND_PID
wait $BACKEND_PID