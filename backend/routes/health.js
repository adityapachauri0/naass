const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET /api/health - Health check endpoint
router.get('/', (req, res) => {
  const healthCheck = {
    success: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  };

  res.status(200).json(healthCheck);
});

module.exports = router;