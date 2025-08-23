const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const getClientIp = require('../utils/getClientIp');
const axios = require('axios');

// Save or update a draft
router.post('/:formType/draft', async (req, res) => {
  try {
    const { formType } = req.params;
    const { key, data } = req.body;
    
    if (!key || !data) {
      return res.status(400).json({
        success: false,
        message: 'Key and data are required'
      });
    }
    
    // Validate form type
    if (!['lead', 'quiz', 'contact'].includes(formType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form type'
      });
    }
    
    // Get session info
    const sessionId = req.sessionID || req.cookies?.sessionId || `anonymous_${Date.now()}`;
    let ipAddress = getClientIp(req);
    const userAgent = req.get('user-agent');
    
    // Get location data from IP
    let location = null;
    
    // If localhost, try to get public IP for testing
    if (ipAddress === '::1' || ipAddress === '127.0.0.1' || ipAddress === '::ffff:127.0.0.1') {
      try {
        const response = await axios.get('https://api.ipify.org?format=json', { timeout: 2000 });
        ipAddress = response.data.ip || ipAddress;
      } catch (error) {
        console.log('Could not fetch public IP, using local:', ipAddress);
      }
    }
    
    // Get location data
    if (ipAddress && ipAddress !== 'unknown' && !ipAddress.includes('127.0.0.1') && !ipAddress.includes('::1')) {
      try {
        const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`, { timeout: 2000 });
        if (geoResponse.data.status === 'success') {
          location = {
            city: geoResponse.data.city,
            region: geoResponse.data.regionName,
            country: geoResponse.data.country,
            lat: geoResponse.data.lat,
            lng: geoResponse.data.lon
          };
        }
      } catch (error) {
        console.log('Could not fetch location data');
      }
    }
    
    // Find existing draft or create new one
    let draft = await Draft.findOne({ key, formType });
    
    if (draft) {
      // Update existing draft
      draft.data = data;
      draft.sessionId = sessionId;
      draft.ipAddress = ipAddress;
      draft.userAgent = userAgent;
      draft.location = location;
      draft.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Reset expiry
      
      // Calculate progress
      draft.calculateProgress();
      
      await draft.save();
    } else {
      // Create new draft
      draft = new Draft({
        key,
        formType,
        data,
        sessionId,
        ipAddress,
        userAgent,
        location
      });
      
      // Calculate progress
      draft.calculateProgress();
      
      await draft.save();
    }
    
    console.log('Draft saved:', {
      id: draft._id,
      formType,
      progress: draft.progress,
      ipAddress,
      location
    });
    
    res.json({
      success: true,
      message: 'Draft saved successfully',
      draftId: draft._id,
      progress: draft.progress
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save draft'
    });
  }
});

// Get a draft
router.get('/:formType/draft', async (req, res) => {
  try {
    const { formType } = req.params;
    const { key } = req.query;
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: 'Key is required'
      });
    }
    
    // Validate form type
    if (!['lead', 'quiz', 'contact'].includes(formType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form type'
      });
    }
    
    const draft = await Draft.findOne({ key, formType });
    
    if (!draft) {
      return res.json({
        success: true,
        draft: null
      });
    }
    
    // Update expiry on access
    draft.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await draft.save();
    
    res.json({
      success: true,
      draft: {
        id: draft._id,
        data: draft.data,
        progress: draft.progress,
        updatedAt: draft.updatedAt,
        createdAt: draft.createdAt
      }
    });
  } catch (error) {
    console.error('Error fetching draft:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch draft'
    });
  }
});

// Delete a draft
router.delete('/:formType/draft', async (req, res) => {
  try {
    const { formType } = req.params;
    const { key } = req.query;
    
    if (!key) {
      return res.status(400).json({
        success: false,
        message: 'Key is required'
      });
    }
    
    // Validate form type
    if (!['lead', 'quiz', 'contact'].includes(formType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form type'
      });
    }
    
    const result = await Draft.deleteOne({ key, formType });
    
    res.json({
      success: true,
      message: result.deletedCount > 0 ? 'Draft deleted successfully' : 'No draft found',
      deleted: result.deletedCount > 0
    });
  } catch (error) {
    console.error('Error deleting draft:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete draft'
    });
  }
});

// Get all drafts (admin only - for dashboard)
router.get('/all', async (req, res) => {
  try {
    const drafts = await Draft.find({})
      .sort({ updatedAt: -1 })
      .limit(100);
    
    res.json({
      success: true,
      drafts: drafts.map(draft => ({
        _id: draft._id,
        key: draft.key,
        formType: draft.formType,
        data: draft.data,
        progress: draft.progress,
        sessionId: draft.sessionId,
        ipAddress: draft.ipAddress,
        location: draft.location,
        createdAt: draft.createdAt,
        updatedAt: draft.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching all drafts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch drafts'
    });
  }
});

// Bulk delete drafts (admin only)
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No draft IDs provided'
      });
    }
    
    const result = await Draft.deleteMany({ _id: { $in: ids } });
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} drafts`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error bulk deleting drafts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete drafts'
    });
  }
});

module.exports = router;