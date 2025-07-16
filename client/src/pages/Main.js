import React, { useState } from 'react';
import '../styles/Main.css';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartSimple, 
  faShield, 
  faUsers,
  faGear,
  faGears
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import PermissionGuard from '../components/PermissionGuard';
import { usePermissions } from '../hooks/usePermissions';
import { rbacService } from '../services/rbacService';

function Main() {
  const { user } = useAuth();
  const { error } = usePermissions();
  const [initializingRBAC, setInitializingRBAC] = useState(false);

  const handleInitializeRBAC = async () => {
    try {
      setInitializingRBAC(true);
      await rbacService.initializeRBAC();
      alert('RBAC system initialized successfully! Please refresh the page.');
      window.location.reload();
    } catch (error) {
      console.error('Error initializing RBAC:', error);
      alert('Failed to initialize RBAC system. Please try again.');
    } finally {
      setInitializingRBAC(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Reusable Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="header-subtitle">Welcome back, {user?.name}!</p>
          </div>
          <div className="header-right">
            <div className="user-badge">
              <span className="role-badge">{user?.role}</span>
            </div>
          </div>
        </header>

        <div className="content-area">
          <div className="welcome-section">
            <h2>Welcome to your dashboard!</h2>
            <p>You are logged in as: <strong>{user?.name}</strong></p>
            <p>Your role: <strong>{user?.role}</strong></p>
            <p>Email: <strong>{user?.email}</strong></p>
            
            {error && (
              <div style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                padding: '10px',
                marginTop: '10px',
                borderRadius: '5px',
                border: '1px solid #ffeaa7'
              }}>
                <strong>⚠️ RBAC System Not Initialized</strong>
                <p>The role-based access control system needs to be set up.</p>
                {user?.role === 'ADMIN' && (
                  <button 
                    onClick={handleInitializeRBAC}
                    disabled={initializingRBAC}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: initializingRBAC ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <FontAwesomeIcon icon={faGears} style={{ marginRight: '5px' }} />
                    {initializingRBAC ? 'Initializing...' : 'Initialize RBAC System'}
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="dashboard-cards">
            <div className="card">
              <div className="card-header">
                <FontAwesomeIcon icon={faChartSimple} className="card-icon" />
                <h3>Quick Actions</h3>
              </div>
              <p>Add your components and content here.</p>
            </div>
            
            <PermissionGuard requiredFeature="admin">
              <div className="card admin-card">
                <div className="card-header">
                  <FontAwesomeIcon icon={faShield} className="card-icon" />
                  <h3>Admin Panel</h3>
                </div>
                <p>Admin-only content visible here.</p>
                <PermissionGuard requiredFeature="admin" requiredSubFeature="users">
                  <button className="btn-primary">
                    <FontAwesomeIcon icon={faUsers} />
                    Manage Users
                  </button>
                </PermissionGuard>
              </div>
            </PermissionGuard>
            
            <div className="card">
              <div className="card-header">
                <FontAwesomeIcon icon={faGear} className="card-icon" />
                <h3>Recent Activity</h3>
              </div>
              <p>Your recent activities will appear here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;