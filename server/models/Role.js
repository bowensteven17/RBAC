const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    trim: true
  },
  isCore: {
    type: Boolean,
    default: false
  },
  permissions: {
    type: Map,
    of: {
      enabled: {
        type: Boolean,
        default: false
      },
      subFeatures: {
        type: Map,
        of: Boolean
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);