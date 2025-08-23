const express = require('express');
const router = express.Router();

// Simple authentication for demo
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // In production, use proper authentication with bcrypt and JWT
  if (username === 'admin' && password === 'admin123') {
    res.json({ 
      success: true,
      token: 'demo-token-' + Date.now(),
      user: { username: 'admin' }
    });
  } else {
    res.status(401).json({ 
      success: false,
      error: 'Invalid credentials' 
    });
  }
});

module.exports = router;