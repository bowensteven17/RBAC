const mongoose = require('mongoose');
const User = require('../models/User');
const Role = require('../models/Role');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rbac', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Check database status
const checkDatabase = async () => {
  try {
    console.log('🔍 Checking database status...\n');

    // Check roles
    const roleCount = await Role.countDocuments();
    console.log(`📝 Roles in database: ${roleCount}`);
    
    if (roleCount > 0) {
      const roles = await Role.find({}, 'name isCore').sort({ name: 1 });
      roles.forEach(role => {
        console.log(`  • ${role.name} ${role.isCore ? '(Core)' : ''}`);
      });
    }

    console.log('');

    // Check users
    const userCount = await User.countDocuments();
    console.log(`👥 Users in database: ${userCount}`);
    
    if (userCount > 0) {
      const users = await User.find({}, 'email name role isActive').sort({ role: 1 });
      users.forEach(user => {
        console.log(`  • ${user.email} - ${user.name} (${user.role}) ${user.isActive ? '✅' : '❌'}`);
      });
    }

    console.log('');

    // Check if RBAC is properly initialized
    const adminRole = await Role.findOne({ name: 'ADMIN' });
    const adminUser = await User.findOne({ role: 'ADMIN' });
    
    if (adminRole && adminUser) {
      console.log('✅ RBAC system is properly initialized');
      console.log(`   Admin user: ${adminUser.email}`);
    } else {
      console.log('❌ RBAC system needs initialization');
      if (!adminRole) console.log('   Missing: ADMIN role');
      if (!adminUser) console.log('   Missing: Admin user');
      console.log('   Run: npm run seed');
    }

  } catch (error) {
    console.error('❌ Error checking database:', error);
  }
};

// Run checker
const runChecker = async () => {
  await connectDB();
  await checkDatabase();
  await mongoose.connection.close();
  console.log('\n🔌 Database connection closed');
  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  runChecker();
}

module.exports = { checkDatabase };