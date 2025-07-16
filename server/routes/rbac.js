const express = require('express');
const Role = require('../models/Role');
const router = express.Router();

// @route   GET /api/rbac/roles
// @desc    Get all roles
// @access  Private
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find().select('name isCore permissions');
    res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    console.error('Get roles error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/rbac/roles/:name
// @desc    Get role by name
// @access  Private
router.get('/roles/:name', async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.params.name });
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error('Get role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/rbac/roles
// @desc    Create new role
// @access  Private (Admin only)
router.post('/roles', async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Role name is required'
      });
    }

    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: 'Role already exists'
      });
    }

    const role = await Role.create({
      name,
      permissions: permissions || new Map()
    });

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: role
    });
  } catch (error) {
    console.error('Create role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/rbac/roles/:name
// @desc    Update role permissions
// @access  Private (Admin only)
router.put('/roles/:name', async (req, res) => {
  try {
    const { permissions } = req.body;
    const roleName = req.params.name;

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    role.permissions = permissions;
    await role.save();

    res.status(200).json({
      success: true,
      message: 'Role permissions updated successfully',
      data: role
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/rbac/roles/:name
// @desc    Delete role
// @access  Private (Admin only)
router.delete('/roles/:name', async (req, res) => {
  try {
    const roleName = req.params.name;

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    // Prevent deletion of core roles
    if (role.isCore) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete core system roles'
      });
    }

    await Role.deleteOne({ name: roleName });

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error) {
    console.error('Delete role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/rbac/initialize
// @desc    Initialize default roles and permissions
// @access  Private (Admin only)
router.post('/initialize', async (req, res) => {
  try {
    // Default features structure
    const features = {
      home: {
        enabled: false,
        subFeatures: {
          dashboard: false,
          recent: false,
          'quick-actions': false
        }
      },
      settings: {
        enabled: false,
        subFeatures: {
          profile: false,
          preferences: false,
          notifications: false
        }
      },
      admin: {
        enabled: false,
        subFeatures: {
          users: false,
          roles: false,
          permissions: false,
          logs: false
        }
      },
      conversational: {
        enabled: false,
        subFeatures: {
          chat: false,
          history: false,
          assistant: false
        }
      },
      visualize: {
        enabled: false,
        subFeatures: {
          charts: false,
          reports: false,
          analytics: false
        }
      },
      users: {
        enabled: false,
        subFeatures: {
          'all-users': false,
          'add-user': false,
          'user-roles': false
        }
      },
      config: {
        enabled: false,
        subFeatures: {
          system: false,
          database: false,
          api: false,
          security: false
        }
      },
      discover: {
        enabled: false,
        subFeatures: {
          'for-you': false,
          top: false,
          tech: false,
          finance: false,
          arts: false,
          sports: false,
          entertainment: false
        }
      }
    };

    // Default role permissions
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

    // Clear existing roles and create new ones
    await Role.deleteMany({});
    await Role.insertMany(defaultRoles);

    res.status(200).json({
      success: true,
      message: 'RBAC system initialized successfully',
      data: { rolesCreated: defaultRoles.length }
    });
  } catch (error) {
    console.error('Initialize RBAC error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;