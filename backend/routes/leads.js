const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// GET /api/leads - Get all leads (protected route in production)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: leads,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads'
    });
  }
});

// GET /api/leads/stats - Get lead statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalLeads = await Lead.countDocuments();
    const todayLeads = await Lead.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    const serviceStats = await Lead.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        total: totalLeads,
        today: todayLeads,
        byStatus: stats,
        topServices: serviceStats
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// PUT /api/leads/:id - Update lead status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lead'
    });
  }
});

// PATCH /api/leads/:id - Update lead status
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const lead = await Lead.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      data: lead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lead'
    });
  }
});

// DELETE /api/leads/:id - Delete a lead
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const lead = await Lead.findByIdAndDelete(id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting lead'
    });
  }
});

// POST /api/leads/bulk-delete - Bulk delete leads
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No lead IDs provided'
      });
    }
    
    const result = await Lead.deleteMany({ _id: { $in: ids } });
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} leads`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error bulk deleting leads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete leads'
    });
  }
});

module.exports = router;