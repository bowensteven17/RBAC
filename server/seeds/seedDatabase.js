const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Default roles with permissions
const defaultRoles = [
  {
    name: 'ADMIN',
    isCore: true,
    permissions: {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: true, subFeatures: { users: true, roles: true, permissions: true, logs: true } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: true } },
      users: { enabled: true, subFeatures: { 'all-users': true, 'add-user': true, 'user-roles': true } },
      config: { enabled: true, subFeatures: { system: true, database: true, api: true, security: true } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    }
  },
  {
    name: 'Legal',
    isCore: true,
    permissions: {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: false } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: false } },
      users: { enabled: false, subFeatures: { 'all-users': false, 'add-user': false, 'user-roles': false } },
      config: { enabled: false, subFeatures: { system: false, database: false, api: false, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    }
  },
  {
    name: 'Non-Legal',
    isCore: true,
    permissions: {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: false } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: false, analytics: false } },
      users: { enabled: false, subFeatures: { 'all-users': false, 'add-user': false, 'user-roles': false } },
      config: { enabled: false, subFeatures: { system: false, database: false, api: false, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: false, finance: false, arts: true, sports: true, entertainment: true } }
    }
  },
  {
    name: 'Viewer',
    isCore: true,
    permissions: {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': false } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: false } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: false } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: false, analytics: false } },
      users: { enabled: false, subFeatures: { 'all-users': false, 'add-user': false, 'user-roles': false } },
      config: { enabled: false, subFeatures: { system: false, database: false, api: false, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: false, finance: false, arts: true, sports: true, entertainment: true } }
    }
  },
  {
    name: 'Editor',
    isCore: true,
    permissions: {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: true } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: true } },
      users: { enabled: true, subFeatures: { 'all-users': true, 'add-user': false, 'user-roles': false } },
      config: { enabled: true, subFeatures: { system: true, database: false, api: true, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    }
  },
  {
    name: 'Sub-Admin',
    isCore: true,
    permissions: {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: true, subFeatures: { users: true, roles: true, permissions: false, logs: true } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: true } },
      users: { enabled: true, subFeatures: { 'all-users': true, 'add-user': true, 'user-roles': true } },
      config: { enabled: true, subFeatures: { system: true, database: true, api: true, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    }
  }
];

// Default admin user
const defaultAdminUser = {
  email: 'admin@rbac.com',
  password: 'admin123',
  name: 'System Administrator',
  role: 'ADMIN',
  isActive: true
};

// Additional test users
const testUsers = [
  {
    email: 'legal@rbac.com',
    password: 'legal123',
    name: 'Legal User',
    role: 'Legal',
    isActive: true
  },
  {
    email: 'viewer@rbac.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'Viewer',
    isActive: true
  },
  {
    email: 'editor@rbac.com',
    password: 'editor123',
    name: 'Editor User',
    role: 'Editor',
    isActive: true
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Role.deleteMany({});
    await User.deleteMany({});

    // Create roles
    console.log('📝 Creating roles...');
    const createdRoles = await Role.insertMany(defaultRoles);
    console.log(`✅ Created ${createdRoles.length} roles`);

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await User.create(defaultAdminUser);
    console.log(`✅ Created admin user: ${adminUser.email}`);

    // Create test users
    console.log('👥 Creating test users...');
    const createdUsers = await User.insertMany(testUsers);
    console.log(`✅ Created ${createdUsers.length} test users`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('ADMIN:');
    console.log('  Email: admin@rbac.com');
    console.log('  Password: admin123');
    console.log('  Role: ADMIN (Full Access)');
    console.log('');
    console.log('LEGAL USER:');
    console.log('  Email: legal@rbac.com');
    console.log('  Password: legal123');
    console.log('  Role: Legal');
    console.log('');
    console.log('VIEWER USER:');
    console.log('  Email: viewer@rbac.com');
    console.log('  Password: viewer123');
    console.log('  Role: Viewer (Limited Access)');
    console.log('');
    console.log('EDITOR USER:');
    console.log('  Email: editor@rbac.com');
    console.log('  Password: editor123');
    console.log('  Role: Editor (Extended Access)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
const runSeeder = async () => {
  await connectDB();
  await seedDatabase();
  await mongoose.connection.close();
  console.log('\n🔌 Database connection closed');
  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  runSeeder();
}

module.exports = { seedDatabase, connectDB };