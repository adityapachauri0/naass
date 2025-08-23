const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website'
  },
  ipAddress: String,
  userAgent: String,
  location: {
    city: String,
    region: String,
    country: String,
    lat: Number,
    lng: Number
  },
  sessionId: String,
  progress: {
    type: Number,
    default: 100
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

module.exports = mongoose.model('Lead', leadSchema);