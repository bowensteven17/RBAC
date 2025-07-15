import React, { useState, useEffect } from 'react';
import '../styles/RBACSettings.css';
import Sidebar from './Sidebar';
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
  faComments
} from '@fortawesome/free-solid-svg-icons';

function RBACSettings() {
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Available roles
  const roles = [
    'Legal',
    'Non-Legal', 
    'Viewer',
    'Editor',
    'Sub-Admin'
  ];

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
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setHasChanges(false);
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

  const getCurrentRolePermissions = () => {
    return selectedRole ? permissions[selectedRole] || {} : {};
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
          {hasChanges && (
            <button className="save-button" onClick={handleSave}>
              <FontAwesomeIcon icon={faSave} />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="rbac-content">
        <div className="role-selector-section">
          <div className="role-selector-card">
            <h3>
              <FontAwesomeIcon icon={faEdit} />
              Select Role to Edit
            </h3>
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
            </div>
            {selectedRole && (
              <div className="selected-role-info">
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
                <span>Configuring permissions for <strong>{selectedRole}</strong></span>
              </div>
            )}
          </div>
        </div>

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
                
                return (
                  <div key={feature.key} className="feature-card">
                    <div className="feature-header">
                      <div className="feature-info">
                        <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                        <span className="feature-name">{feature.name}</span>
                      </div>
                      <label className="permission-toggle">
                        <input
                          type="checkbox"
                          checked={featurePermission.enabled}
                          onChange={() => handleFeatureToggle(feature.key)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    {featurePermission.enabled && (
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