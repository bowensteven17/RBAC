import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faGlobe, 
  faGear, 
  faChartSimple, 
  faShield, 
  faGears, 
  faUsers,
  faSignOutAlt,
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
  faComments
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items with feature-based permissions
  const navigationItems = [
    { 
      name: 'Home', 
      icon: faHouse, 
      path: '/', 
      feature: 'home',
      subcategories: [
        { name: 'Dashboard', icon: faChartSimple, path: '/dashboard', feature: 'home', subFeature: 'dashboard' },
        { name: 'Recent Activity', icon: faChartLine, path: '/recent', feature: 'home', subFeature: 'recent' },
        { name: 'Quick Actions', icon: faStar, path: '/quick-actions', feature: 'home', subFeature: 'quick-actions' }
      ]
    },
    { 
      name: 'Discover', 
      icon: faGlobe, 
      path: '/discover', 
      feature: 'discover',
      subcategories: [
        { name: 'For You', icon: faStar, path: '/discover/for-you', feature: 'discover', subFeature: 'for-you' },
        { name: 'Top', icon: faArrowTrendUp, path: '/discover/top', feature: 'discover', subFeature: 'top' },
        { name: 'Tech & Science', icon: faLaptop, path: '/discover/tech', feature: 'discover', subFeature: 'tech' },
        { name: 'Finance', icon: faDollarSign, path: '/discover/finance', feature: 'discover', subFeature: 'finance' },
        { name: 'Arts & Culture', icon: faImage, path: '/discover/arts', feature: 'discover', subFeature: 'arts' },
        { name: 'Sports', icon: faGamepad, path: '/discover/sports', feature: 'discover', subFeature: 'sports' },
        { name: 'Entertainment', icon: faUtensils, path: '/discover/entertainment', feature: 'discover', subFeature: 'entertainment' }
      ]
    },
    { 
      name: 'Conversational', 
      icon: faComments, 
      path: '/conversational', 
      feature: 'conversational',
      subcategories: [
        { name: 'Chat Interface', icon: faComments, path: '/conversational/chat', feature: 'conversational', subFeature: 'chat' },
        { name: 'Message History', icon: faFileText, path: '/conversational/history', feature: 'conversational', subFeature: 'history' },
        { name: 'AI Assistant', icon: faUser, path: '/conversational/assistant', feature: 'conversational', subFeature: 'assistant' }
      ]
    },
    { 
      name: 'Visualize', 
      icon: faChartSimple, 
      path: '/visualize', 
      feature: 'visualize',
      subcategories: [
        { name: 'Charts', icon: faChartBar, path: '/visualize/charts', feature: 'visualize', subFeature: 'charts' },
        { name: 'Reports', icon: faFileText, path: '/visualize/reports', feature: 'visualize', subFeature: 'reports' },
        { name: 'Analytics', icon: faChartLine, path: '/visualize/analytics', feature: 'visualize', subFeature: 'analytics' }
      ]
    },
    { 
      name: 'Config', 
      icon: faGear, 
      path: '/config', 
      feature: 'config',
      subcategories: [
        { name: 'System Settings', icon: faGears, path: '/config/system', feature: 'config', subFeature: 'system' },
        { name: 'Database Config', icon: faDatabase, path: '/config/database', feature: 'config', subFeature: 'database' },
        { name: 'API Settings', icon: faCloud, path: '/config/api', feature: 'config', subFeature: 'api' },
        { name: 'Security', icon: faLock, path: '/config/security', feature: 'config', subFeature: 'security' }
      ]
    },
    { 
      name: 'Users', 
      icon: faUsers, 
      path: '/users', 
      feature: 'users',
      subcategories: [
        { name: 'All Users', icon: faUsers, path: '/users/all', feature: 'users', subFeature: 'all-users' },
        { name: 'Add User', icon: faPlus, path: '/users/add', feature: 'users', subFeature: 'add-user' },
        { name: 'User Roles', icon: faUserCheck, path: '/users/roles', feature: 'users', subFeature: 'user-roles' }
      ]
    },
    { 
      name: 'Admin', 
      icon: faShield, 
      path: '/admin', 
      feature: 'admin',
      subcategories: [
        { name: 'User Management', icon: faUsers, path: '/admin/users', feature: 'admin', subFeature: 'users' },
        { name: 'Role Settings', icon: faUserCheck, path: '/admin/roles', feature: 'admin', subFeature: 'roles' },
        { name: 'Permissions', icon: faLock, path: '/admin/permissions', feature: 'admin', subFeature: 'permissions' },
        { name: 'System Logs', icon: faFileText, path: '/admin/logs', feature: 'admin', subFeature: 'logs' }
      ]
    },
    { 
      name: 'Settings', 
      icon: faGears, 
      path: '/settings', 
      feature: 'settings',
      subcategories: [
        { name: 'Profile Settings', icon: faUser, path: '/settings/profile', feature: 'settings', subFeature: 'profile' },
        { name: 'RBAC Settings', icon: faShield, path: '/settings/rbac', feature: 'admin', subFeature: 'roles' },
        { name: 'Preferences', icon: faCog, path: '/settings/preferences', feature: 'settings', subFeature: 'preferences' },
        { name: 'Notifications', icon: faBell, path: '/settings/notifications', feature: 'settings', subFeature: 'notifications' }
      ]
    }
  ];

  // Filter navigation items based on user permissions
  const filteredNavItems = navigationItems.filter(item => 
    hasPermission(item.feature)
  );

  const handleItemHover = (item, index) => {
    setHoveredItem(index);
    setExpandedPanel(item);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
    setExpandedPanel(null);
  };

  const handleSubcategoryClick = (path) => {
    navigate(path);
    setExpandedPanel(null);
    setHoveredItem(null);
  };

  return (
    <>
      {/* Perplexity-style Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo-icon">
              <FontAwesomeIcon icon={faChartSimple} />
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {filteredNavItems.map((item, index) => (
              <li 
                key={index} 
                className="nav-item"
                onMouseEnter={() => handleItemHover(item, index)}
                onMouseLeave={handleItemLeave}
              >
                <button 
                  className={`nav-link ${window.location.pathname === item.path ? 'active' : ''} ${hoveredItem === index ? 'hovered' : ''}`}
                  onClick={() => navigate(item.path)}
                  title={item.name}
                >
                  <div className="nav-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                </button>
                <span className="nav-tooltip">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>
          <button 
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </aside>

      {/* Expandable Panel */}
      {expandedPanel && (
        <div 
          className="expanded-panel"
          onMouseEnter={() => setExpandedPanel(expandedPanel)}
          onMouseLeave={handleItemLeave}
        >
          <div className="panel-header">
            <div className="panel-title">
              <FontAwesomeIcon icon={expandedPanel.icon} />
              <span>{expandedPanel.name}</span>
            </div>
          </div>
          
          <div className="panel-content">
            <ul className="subcategory-list">
              {expandedPanel.subcategories?.filter(subcat => 
                hasPermission(subcat.feature, subcat.subFeature)
              ).map((subcat, index) => (
                <li key={index} className="subcategory-item">
                  <button 
                    className="subcategory-link"
                    onClick={() => handleSubcategoryClick(subcat.path)}
                  >
                    <FontAwesomeIcon icon={subcat.icon} className="subcat-icon" />
                    <span>{subcat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;