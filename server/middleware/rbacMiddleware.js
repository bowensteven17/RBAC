const Role = require('../models/Role');

// Middleware to ensure RBAC is initialized
const ensureRBACInitialized = async (req, res, next) => {
  try {
    const roleCount = await Role.countDocuments();
    
    if (roleCount === 0) {
      return res.status(400).json({
        success: false,
        message: 'RBAC system not initialized. Please contact administrator.',
        code: 'RBAC_NOT_INITIALIZED'
      });
    }
    
    next();
  } catch (error) {
    console.error('RBAC middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  ensureRBACInitialized
};