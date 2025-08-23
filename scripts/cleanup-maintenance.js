#!/usr/bin/env node

/**
 * NAASS Database Cleanup and Maintenance Script
 * Run this script periodically to clean up old data and optimize database
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/naass_db';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas
const draftSchema = new mongoose.Schema({
  key: String,
  formType: String,
  data: mongoose.Schema.Types.Mixed,
  progress: Number,
  sessionId: String,
  ipAddress: String,
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date
});

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  service: String,
  message: String,
  status: String,
  source: String,
  ipAddress: String,
  location: mongoose.Schema.Types.Mixed,
  createdAt: Date,
  updatedAt: Date
});

const Draft = mongoose.model('Draft', draftSchema);
const Lead = mongoose.model('Lead', leadSchema);

// Cleanup functions
async function cleanupOldDrafts() {
  console.log('🧹 Cleaning up old drafts...');
  
  // Delete drafts older than 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const result = await Draft.deleteMany({
    createdAt: { $lt: thirtyDaysAgo }
  });
  
  console.log(`✅ Deleted ${result.deletedCount} old drafts`);
  return result.deletedCount;
}

async function cleanupExpiredDrafts() {
  console.log('🧹 Cleaning up expired drafts...');
  
  const now = new Date();
  const result = await Draft.deleteMany({
    expiresAt: { $lt: now }
  });
  
  console.log(`✅ Deleted ${result.deletedCount} expired drafts`);
  return result.deletedCount;
}

async function cleanupRejectedLeads() {
  console.log('🧹 Cleaning up old rejected leads...');
  
  // Delete rejected leads older than 90 days
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const result = await Lead.deleteMany({
    status: 'rejected',
    updatedAt: { $lt: ninetyDaysAgo }
  });
  
  console.log(`✅ Deleted ${result.deletedCount} old rejected leads`);
  return result.deletedCount;
}

async function archiveOldLeads() {
  console.log('📦 Archiving old converted leads...');
  
  // Archive converted leads older than 180 days
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);
  
  const leadsToArchive = await Lead.find({
    status: 'converted',
    updatedAt: { $lt: sixMonthsAgo },
    archived: { $ne: true }
  });
  
  // Mark as archived instead of deleting
  const result = await Lead.updateMany(
    {
      status: 'converted',
      updatedAt: { $lt: sixMonthsAgo },
      archived: { $ne: true }
    },
    {
      $set: { archived: true, archivedAt: new Date() }
    }
  );
  
  console.log(`✅ Archived ${result.modifiedCount} old converted leads`);
  return result.modifiedCount;
}

async function getDatabaseStats() {
  console.log('📊 Collecting database statistics...');
  
  const stats = await mongoose.connection.db.stats();
  const collections = await mongoose.connection.db.listCollections().toArray();
  
  console.log('\n📈 Database Statistics:');
  console.log(`   Database: ${mongoose.connection.name}`);
  console.log(`   Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Storage: ${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Collections: ${collections.length}`);
  console.log(`   Objects: ${stats.objects}`);
  
  // Collection-specific stats
  const draftCount = await Draft.countDocuments();
  const leadCount = await Lead.countDocuments();
  const leadsByStatus = await Lead.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  console.log('\n📋 Collection Statistics:');
  console.log(`   Drafts: ${draftCount}`);
  console.log(`   Leads: ${leadCount}`);
  console.log('   Leads by Status:');
  leadsByStatus.forEach(status => {
    console.log(`     - ${status._id || 'unknown'}: ${status.count}`);
  });
  
  return stats;
}

async function optimizeIndexes() {
  console.log('🔧 Optimizing database indexes...');
  
  // Ensure indexes exist
  await Draft.collection.createIndex({ key: 1, formType: 1 }, { unique: true, background: true });
  await Draft.collection.createIndex({ createdAt: 1 }, { background: true });
  await Draft.collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, background: true });
  
  await Lead.collection.createIndex({ email: 1 }, { background: true });
  await Lead.collection.createIndex({ status: 1 }, { background: true });
  await Lead.collection.createIndex({ createdAt: -1 }, { background: true });
  await Lead.collection.createIndex({ status: 1, createdAt: -1 }, { background: true });
  
  console.log('✅ Indexes optimized');
}

async function compactDatabase() {
  console.log('🗜️ Compacting database...');
  
  try {
    // Run compact command for each collection
    await mongoose.connection.db.command({ compact: 'drafts' });
    await mongoose.connection.db.command({ compact: 'leads' });
    console.log('✅ Database compacted');
  } catch (error) {
    console.log('⚠️ Compact not supported or failed:', error.message);
  }
}

// Main cleanup function
async function runMaintenance() {
  console.log('🚀 Starting NAASS Database Maintenance...');
  console.log('========================================');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log('');
  
  try {
    // Get initial stats
    await getDatabaseStats();
    
    // Run cleanup tasks
    const deletedDrafts = await cleanupOldDrafts();
    const expiredDrafts = await cleanupExpiredDrafts();
    const rejectedLeads = await cleanupRejectedLeads();
    const archivedLeads = await archiveOldLeads();
    
    // Optimize database
    await optimizeIndexes();
    await compactDatabase();
    
    // Get final stats
    console.log('\n📊 Final Statistics:');
    await getDatabaseStats();
    
    // Summary
    console.log('\n✅ Maintenance Complete!');
    console.log('========================================');
    console.log(`Total Drafts Deleted: ${deletedDrafts + expiredDrafts}`);
    console.log(`Total Leads Cleaned: ${rejectedLeads}`);
    console.log(`Total Leads Archived: ${archivedLeads}`);
    console.log('========================================');
    
  } catch (error) {
    console.error('❌ Maintenance failed:', error);
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run maintenance
runMaintenance();