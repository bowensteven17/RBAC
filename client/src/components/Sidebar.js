import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items with nested subcategories
  const navigationItems = [
    { 
      name: 'Home', 
      icon: faHouse, 
      path: '/', 
      roles: ['Legal', 'Non-Legal', 'Viewer', 'Editor', 'Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'Dashboard', icon: faChartSimple, path: '/dashboard' },
        { name: 'Recent Activity', icon: faChartLine, path: '/recent' },
        { name: 'Quick Actions', icon: faStar, path: '/quick-actions' }
      ]
    },
    { 
      name: 'Discover', 
      icon: faGlobe, 
      path: '/discover', 
      roles: ['Legal', 'Non-Legal', 'Viewer', 'Editor', 'Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'For You', icon: faStar, path: '/discover/for-you' },
        { name: 'Top', icon: faArrowTrendUp, path: '/discover/top' },
        { name: 'Tech & Science', icon: faLaptop, path: '/discover/tech' },
        { name: 'Finance', icon: faDollarSign, path: '/discover/finance' },
        { name: 'Arts & Culture', icon: faImage, path: '/discover/arts' },
        { name: 'Sports', icon: faGamepad, path: '/discover/sports' },
        { name: 'Entertainment', icon: faUtensils, path: '/discover/entertainment' }
      ]
    },
    { 
      name: 'Conversational', 
      icon: faComments, 
      path: '/conversational', 
      roles: ['Legal', 'Non-Legal', 'Viewer', 'Editor', 'Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'Chat Interface', icon: faComments, path: '/conversational/chat' },
        { name: 'Message History', icon: faFileText, path: '/conversational/history' },
        { name: 'AI Assistant', icon: faUser, path: '/conversational/assistant' }
      ]
    },
    { 
      name: 'Visualize', 
      icon: faChartSimple, 
      path: '/visualize', 
      roles: ['Legal', 'Non-Legal', 'Viewer', 'Editor', 'Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'Charts', icon: faChartBar, path: '/visualize/charts' },
        { name: 'Reports', icon: faFileText, path: '/visualize/reports' },
        { name: 'Analytics', icon: faChartLine, path: '/visualize/analytics' }
      ]
    },
    { 
      name: 'Config', 
      icon: faGear, 
      path: '/config', 
      roles: ['Editor', 'Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'System Settings', icon: faGears, path: '/config/system' },
        { name: 'Database Config', icon: faDatabase, path: '/config/database' },
        { name: 'API Settings', icon: faCloud, path: '/config/api' },
        { name: 'Security', icon: faLock, path: '/config/security' }
      ]
    },
    { 
      name: 'Users', 
      icon: faUsers, 
      path: '/users', 
      roles: ['Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'All Users', icon: faUsers, path: '/users/all' },
        { name: 'Add User', icon: faPlus, path: '/users/add' },
        { name: 'User Roles', icon: faUserCheck, path: '/users/roles' }
      ]
    },
    { 
      name: 'Admin', 
      icon: faShield, 
      path: '/admin', 
      roles: ['Sub-Admin', 'ADMIN'],
      subcategories: [
        { name: 'User Management', icon: faUsers, path: '/admin/users' },
        { name: 'Role Settings', icon: faUserCheck, path: '/admin/roles' },
        { name: 'Permissions', icon: faLock, path: '/admin/permissions' },
        { name: 'System Logs', icon: faFileText, path: '/admin/logs' }
      ]
    },
    { 
      name: 'Settings', 
      icon: faGears, 
      path: '/settings', 
      roles: ['ADMIN'],
      subcategories: [
        { name: 'Profile Settings', icon: faUser, path: '/settings/profile' },
        { name: 'RBAC Settings', icon: faShield, path: '/settings/rbac' },
        { name: 'Preferences', icon: faCog, path: '/settings/preferences' },
        { name: 'Notifications', icon: faBell, path: '/settings/notifications' }
      ]
    }
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role)
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
              {expandedPanel.subcategories?.map((subcat, index) => (
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