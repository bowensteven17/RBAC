import React, { useState, useEffect } from 'react';
import '../styles/RBACSettings.css';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faGlobe, 
  faGear, 
  faChartSimple, 
  faShield, 
  faGears, 
  faUsers,
  faStar,
  faArrowTrendUp,
  faLaptop,
  faDollarSign,
  faImage,
  faGamepad,
  faUtensils,
  faPlus,
  faFileText,
  faDatabase,
  faCloud,
  faLock,
  faUserCheck,
  faUser,
  faCog,
  faChartLine,
  faChartBar,
  faBell,
  faSave,
  faEdit,
  faCheck,
  faComments,
  faTimes,
  faTrash,
  faExclamationTriangle,
  faChevronDown,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

function RBACSettings() {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState('');
  const [collapsedFeatures, setCollapsedFeatures] = useState({});

  // Available roles - now as state so we can add/remove
  const [roles, setRoles] = useState([
    'Legal',
    'Non-Legal', 
    'Viewer',
    'Editor',
    'Sub-Admin'
  ]);

  // Features and their sub-features
  const features = [
    {
      name: 'Home',
      icon: faHouse,
      key: 'home',
      subFeatures: [
        { name: 'Dashboard', icon: faChartSimple, key: 'dashboard' },
        { name: 'Recent Activity', icon: faChartLine, key: 'recent' },
        { name: 'Quick Actions', icon: faStar, key: 'quick-actions' }
      ]
    },
    {
      name: 'Settings',
      icon: faGears,
      key: 'settings',
      subFeatures: [
        { name: 'Profile Settings', icon: faUser, key: 'profile' },
        { name: 'Preferences', icon: faCog, key: 'preferences' },
        { name: 'Notifications', icon: faBell, key: 'notifications' }
      ]
    },
    {
      name: 'Admin',
      icon: faShield,
      key: 'admin',
      subFeatures: [
        { name: 'User Management', icon: faUsers, key: 'users' },
        { name: 'Role Settings', icon: faUserCheck, key: 'roles' },
        { name: 'Permissions', icon: faLock, key: 'permissions' },
        { name: 'System Logs', icon: faFileText, key: 'logs' }
      ]
    },
    {
      name: 'Conversational',
      icon: faComments,
      key: 'conversational',
      subFeatures: [
        { name: 'Chat Interface', icon: faComments, key: 'chat' },
        { name: 'Message History', icon: faFileText, key: 'history' },
        { name: 'AI Assistant', icon: faUser, key: 'assistant' }
      ]
    },
    {
      name: 'Visualize',
      icon: faChartSimple,
      key: 'visualize',
      subFeatures: [
        { name: 'Charts', icon: faChartBar, key: 'charts' },
        { name: 'Reports', icon: faFileText, key: 'reports' },
        { name: 'Analytics', icon: faChartLine, key: 'analytics' }
      ]
    },
    {
      name: 'Users',
      icon: faUsers,
      key: 'users',
      subFeatures: [
        { name: 'All Users', icon: faUsers, key: 'all-users' },
        { name: 'Add User', icon: faPlus, key: 'add-user' },
        { name: 'User Roles', icon: faUserCheck, key: 'user-roles' }
      ]
    },
    {
      name: 'Config',
      icon: faGear,
      key: 'config',
      subFeatures: [
        { name: 'System Settings', icon: faGears, key: 'system' },
        { name: 'Database Config', icon: faDatabase, key: 'database' },
        { name: 'API Settings', icon: faCloud, key: 'api' },
        { name: 'Security', icon: faLock, key: 'security' }
      ]
    },
    {
      name: 'Discover',
      icon: faGlobe,
      key: 'discover',
      subFeatures: [
        { name: 'For You', icon: faStar, key: 'for-you' },
        { name: 'Top', icon: faArrowTrendUp, key: 'top' },
        { name: 'Tech & Science', icon: faLaptop, key: 'tech' },
        { name: 'Finance', icon: faDollarSign, key: 'finance' },
        { name: 'Arts & Culture', icon: faImage, key: 'arts' },
        { name: 'Sports', icon: faGamepad, key: 'sports' },
        { name: 'Entertainment', icon: faUtensils, key: 'entertainment' }
      ]
    }
  ];

  // Default permissions - you can load this from your backend
  const defaultPermissions = {
    'Legal': {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: false } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: false } },
      users: { enabled: false, subFeatures: { 'all-users': false, 'add-user': false, 'user-roles': false } },
      config: { enabled: false, subFeatures: { system: false, database: false, api: false, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    },
    'Non-Legal': {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: false } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: false, analytics: false } },
      users: { enabled: false, subFeatures: { 'all-users': false, 'add-user': false, 'user-roles': false } },
      config: { enabled: false, subFeatures: { system: false, database: false, api: false, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: false, finance: false, arts: true, sports: true, entertainment: true } }
    },
    'Viewer': {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': false } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: false } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: false } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: false, analytics: false } },
      users: { enabled: false, subFeatures: { 'all-users': false, 'add-user': false, 'user-roles': false } },
      config: { enabled: false, subFeatures: { system: false, database: false, api: false, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: false, finance: false, arts: true, sports: true, entertainment: true } }
    },
    'Editor': {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: false, subFeatures: { users: false, roles: false, permissions: false, logs: true } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: true } },
      users: { enabled: true, subFeatures: { 'all-users': true, 'add-user': false, 'user-roles': false } },
      config: { enabled: true, subFeatures: { system: true, database: false, api: true, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    },
    'Sub-Admin': {
      home: { enabled: true, subFeatures: { dashboard: true, recent: true, 'quick-actions': true } },
      settings: { enabled: true, subFeatures: { profile: true, preferences: true, notifications: true } },
      admin: { enabled: true, subFeatures: { users: true, roles: true, permissions: false, logs: true } },
      conversational: { enabled: true, subFeatures: { chat: true, history: true, assistant: true } },
      visualize: { enabled: true, subFeatures: { charts: true, reports: true, analytics: true } },
      users: { enabled: true, subFeatures: { 'all-users': true, 'add-user': true, 'user-roles': true } },
      config: { enabled: true, subFeatures: { system: true, database: true, api: true, security: false } },
      discover: { enabled: true, subFeatures: { 'for-you': true, top: true, tech: true, finance: true, arts: true, sports: true, entertainment: true } }
    }
  };

  useEffect(() => {
    // Initialize permissions from default or load from backend
    setPermissions(defaultPermissions);
    
    // Initialize all features as collapsed by default
    const initialCollapsedState = {};
    features.forEach(feature => {
      initialCollapsedState[feature.key] = true; // true = collapsed
    });
    setCollapsedFeatures(initialCollapsedState);
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setHasChanges(false);
  };

  const toggleFeatureCollapse = (featureKey) => {
    setCollapsedFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const handleFeatureToggle = (featureKey) => {
    if (!selectedRole) return;

    const newPermissions = { ...permissions };
    const currentEnabled = newPermissions[selectedRole][featureKey].enabled;
    
    newPermissions[selectedRole][featureKey].enabled = !currentEnabled;
    
    // If disabling main feature, disable all sub-features
    if (!currentEnabled === false) {
      Object.keys(newPermissions[selectedRole][featureKey].subFeatures).forEach(subKey => {
        newPermissions[selectedRole][featureKey].subFeatures[subKey] = false;
      });
    }

    setPermissions(newPermissions);
    setHasChanges(true);
  };

  const handleSubFeatureToggle = (featureKey, subFeatureKey) => {
    if (!selectedRole) return;

    const newPermissions = { ...permissions };
    const currentEnabled = newPermissions[selectedRole][featureKey].subFeatures[subFeatureKey];
    
    newPermissions[selectedRole][featureKey].subFeatures[subFeatureKey] = !currentEnabled;
    
    // If enabling sub-feature, ensure main feature is enabled
    if (!currentEnabled === true) {
      newPermissions[selectedRole][featureKey].enabled = true;
    }

    setPermissions(newPermissions);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would save to your backend
    console.log('Saving permissions:', permissions);
    setHasChanges(false);
    
    // Show success message
    alert('Permissions saved successfully!');
  };

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      alert('Please enter a role name');
      return;
    }

    if (roles.includes(newRoleName.trim())) {
      alert('Role already exists');
      return;
    }

    setIsCreatingRole(true);
    
    // Add new role to the list
    const updatedRoles = [...roles, newRoleName.trim()];
    setRoles(updatedRoles);
    
    // Initialize permissions for new role (all disabled by default)
    const newRolePermissions = {};
    features.forEach(feature => {
      newRolePermissions[feature.key] = {
        enabled: false,
        subFeatures: {}
      };
      feature.subFeatures.forEach(subFeature => {
        newRolePermissions[feature.key].subFeatures[subFeature.key] = false;
      });
    });
    
    setPermissions(prev => ({
      ...prev,
      [newRoleName.trim()]: newRolePermissions
    }));
    
    // Select the new role and close the create form
    setSelectedRole(newRoleName.trim());
    setNewRoleName('');
    setShowCreateRole(false);
    setIsCreatingRole(false);
    setHasChanges(true);
    
    console.log('Created new role:', newRoleName.trim());
  };

  const handleCancelCreate = () => {
    setNewRoleName('');
    setShowCreateRole(false);
  };

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const handleDeleteRole = () => {
    if (!roleToDelete) return;

    // Prevent deleting core roles
    const coreRoles = ['Legal', 'Non-Legal', 'Viewer', 'Editor', 'Sub-Admin'];
    if (coreRoles.includes(roleToDelete)) {
      alert('Cannot delete core system roles');
      setShowDeleteConfirm(false);
      setRoleToDelete('');
      return;
    }

    // Remove role from the list
    const updatedRoles = roles.filter(role => role !== roleToDelete);
    setRoles(updatedRoles);
    
    // Remove permissions for deleted role
    const updatedPermissions = { ...permissions };
    delete updatedPermissions[roleToDelete];
    setPermissions(updatedPermissions);
    
    // Clear selection if deleted role was selected
    if (selectedRole === roleToDelete) {
      setSelectedRole('');
    }
    
    setShowDeleteConfirm(false);
    setRoleToDelete('');
    setHasChanges(true);
    
    console.log('Deleted role:', roleToDelete);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setRoleToDelete('');
  };

  const getCurrentRolePermissions = () => {
    return selectedRole ? permissions[selectedRole] || {} : {};
  };

  const getSubFeatureCount = (featureKey) => {
    const rolePermissions = getCurrentRolePermissions();
    const featurePermission = rolePermissions[featureKey] || { subFeatures: {} };
    const enabledCount = Object.values(featurePermission.subFeatures).filter(Boolean).length;
    const totalCount = features.find(f => f.key === featureKey)?.subFeatures.length || 0;
    return { enabled: enabledCount, total: totalCount };
  };

  return (
    <div className="dashboard-container">
      {/* Reusable Sidebar Component */}
      <Sidebar />
      
      <div className="rbac-settings-container">
        <div className="rbac-header">
          <div className="header-content">
            <div className="header-left">
              <FontAwesomeIcon icon={faShield} className="header-icon" />
              <div>
                <h1>Role-Based Access Control</h1>
                <p>Manage permissions for different user roles</p>
              </div>
            </div>
            <div className="header-actions">
              {hasChanges && (
                <button className="save-button" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} />
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rbac-content">
          <div className="role-selector-section">
            <div className="role-selector-card">
              <div className="card-header-with-actions">
                <h3>
                  <FontAwesomeIcon icon={faEdit} />
                  Select Role to Edit
                </h3>
                {user?.role === 'ADMIN' && (
                  <button 
                    className="create-role-btn"
                    onClick={() => setShowCreateRole(true)}
                    title="Create New Role"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
              <div className="role-dropdown-container">
                <select 
                  className="role-dropdown"
                  value={selectedRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                >
                  <option value="">Choose a role...</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {selectedRole && user?.role === 'ADMIN' && (
                  <button 
                    className="delete-role-btn"
                    onClick={() => handleDeleteClick(selectedRole)}
                    title="Delete Role"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
              <div className="role-status-area">
                {selectedRole ? (
                  <div className="selected-role-info">
                    <FontAwesomeIcon icon={faCheck} className="check-icon" />
                    <span>Configuring permissions for <strong>{selectedRole}</strong></span>
                  </div>
                ) : (
                  <div className="no-role-selected">
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    <span>Select a role above to configure its permissions</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Create New Role Modal */}
          {showCreateRole && (
            <div className="modal-overlay">
              <div className="create-role-modal">
                <div className="modal-header">
                  <h3>
                    <FontAwesomeIcon icon={faPlus} />
                    Create New Role
                  </h3>
                  <button 
                    className="modal-close"
                    onClick={handleCancelCreate}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="newRoleName">Role Name</label>
                    <input
                      id="newRoleName"
                      type="text"
                      className="role-input"
                      placeholder="Enter role name (e.g., Marketing, HR, etc.)"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCreateRole()}
                      autoFocus
                    />
                  </div>
                  <div className="modal-note">
                    <FontAwesomeIcon icon={faCheck} className="note-icon" />
                    <span>New roles start with all permissions disabled. You can configure them after creation.</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="btn-secondary"
                    onClick={handleCancelCreate}
                    disabled={isCreatingRole}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={handleCreateRole}
                    disabled={isCreatingRole || !newRoleName.trim()}
                  >
                    {isCreatingRole ? (
                      <>
                        <FontAwesomeIcon icon={faSave} className="spinning" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPlus} />
                        Create Role
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Role Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="modal-overlay">
              <div className="delete-confirm-modal">
                <div className="modal-header">
                  <h3>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    Delete Role
                  </h3>
                  <button 
                    className="modal-close"
                    onClick={handleCancelDelete}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="warning-message">
                    <p>Are you sure you want to delete the role <strong>"{roleToDelete}"</strong>?</p>
                    <p className="warning-text">This action cannot be undone. All permissions for this role will be permanently removed.</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    className="btn-secondary"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={handleDeleteRole}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete Role
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedRole && (
            <div className="permissions-section">
              <div className="permissions-header">
                <h3>Feature Permissions for {selectedRole}</h3>
                <p>Enable or disable features and their sub-components</p>
              </div>

              <div className="features-grid">
                {features.map(feature => {
                  const rolePermissions = getCurrentRolePermissions();
                  const featurePermission = rolePermissions[feature.key] || { enabled: false, subFeatures: {} };
                  const isCollapsed = collapsedFeatures[feature.key];
                  const subFeatureCount = getSubFeatureCount(feature.key);
                  
                  return (
                    <div key={feature.key} className="feature-card">
                      <div className="feature-header">
                        <div className="feature-info">
                          <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                          <div className="feature-text">
                            <span className="feature-name">{feature.name}</span>
                            <span className="feature-count">
                              {subFeatureCount.enabled}/{subFeatureCount.total} enabled
                            </span>
                          </div>
                        </div>
                        <div className="feature-controls">
                          <button
                            className="collapse-btn"
                            onClick={() => toggleFeatureCollapse(feature.key)}
                            title={isCollapsed ? 'Expand sub-features' : 'Collapse sub-features'}
                          >
                            <FontAwesomeIcon 
                              icon={isCollapsed ? faChevronRight : faChevronDown} 
                              className="collapse-icon"
                            />
                          </button>
                          <label className="permission-toggle">
                            <input
                              type="checkbox"
                              checked={featurePermission.enabled}
                              onChange={() => handleFeatureToggle(feature.key)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>

                      {featurePermission.enabled && !isCollapsed && (
                        <div className="sub-features">
                          {feature.subFeatures.map(subFeature => (
                            <div key={subFeature.key} className="sub-feature-item">
                              <div className="sub-feature-info">
                                <FontAwesomeIcon icon={subFeature.icon} className="sub-feature-icon" />
                                <span className="sub-feature-name">{subFeature.name}</span>
                              </div>
                              <label className="permission-checkbox">
                                <input
                                  type="checkbox"
                                  checked={featurePermission.subFeatures[subFeature.key] || false}
                                  onChange={() => handleSubFeatureToggle(feature.key, subFeature.key)}
                                />
                                <span className="checkbox-custom"></span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!selectedRole && (
            <div className="empty-state">
              <FontAwesomeIcon icon={faShield} className="empty-icon" />
              <h3>Select a Role to Begin</h3>
              <p>Choose a role from the dropdown above to configure its permissions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RBACSettings;