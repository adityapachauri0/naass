const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    index: true
  },
  formType: {
    type: String,
    required: true,
    enum: ['lead', 'contact', 'quiz'],
    default: 'contact'
  },
  data: {
    type: Object,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  location: {
    city: String,
    region: String,
    country: String,
    lat: Number,
    lng: Number
  },
  progress: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    index: { expireAfterSeconds: 0 }
  }
}, {
  timestamps: true
});

// Compound index for unique drafts per form type
draftSchema.index({ key: 1, formType: 1 }, { unique: true });

// Instance methods
draftSchema.methods.calculateProgress = function() {
  const fields = ['name', 'email', 'company', 'phone', 'service', 'message'];
  const filledFields = fields.filter(field => 
    this.data[field] && this.data[field].toString().trim() !== ''
  );
  this.progress = Math.round((filledFields.length / fields.length) * 100);
  return this.progress;
};

// Static methods
draftSchema.statics.cleanupExpired = async function() {
  return await this.deleteMany({ expiresAt: { $lt: new Date() } });
};

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;