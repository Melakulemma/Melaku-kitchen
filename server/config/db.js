const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    console.log('--- Database Startup ---');
    console.log('Phase 1: Attempting MongoDB Atlas Connection...');
    
    // First attempt: REAL MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
      connectTimeoutMS: 10000,
    });
    
    console.log(`✅ SUCCESS: Connected to Atlas Cluster (${conn.connection.host})`);
    console.log('-------------------------');
  } catch (error) {
    console.warn('⚠️ WARNING: MongoDB Atlas connection failed or timed out.');
    console.log('Phase 2: Starting Fallback In-Memory Database...');
    
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      const seedAdmin = require('./seeder');
      await seedAdmin();
      console.log('✅ SUCCESS: In-Memory Database is active (Temporary Session)');
      console.log('TIP: Check your Atlas IP Whitelist/Network connection to fix persistent storage.');
      console.log('-------------------------');
    } catch (fallbackError) {
      console.error('❌ CRITICAL: Both Atlas and Fallback DB failed!');
      process.exit(1);
    }
  }
};

module.exports = connectDB;