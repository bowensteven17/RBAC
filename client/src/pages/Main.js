import React from 'react';
import '../styles/Main.css';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartSimple, 
  faShield, 
  faUsers,
  faGear
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';

function Main() {
  const { user } = useAuth();

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
          </div>
          
          <div className="dashboard-cards">
            <div className="card">
              <div className="card-header">
                <FontAwesomeIcon icon={faChartSimple} className="card-icon" />
                <h3>Quick Actions</h3>
              </div>
              <p>Add your components and content here.</p>
            </div>
            
            {user?.role === 'ADMIN' && (
              <div className="card admin-card">
                <div className="card-header">
                  <FontAwesomeIcon icon={faShield} className="card-icon" />
                  <h3>Admin Panel</h3>
                </div>
                <p>Admin-only content visible here.</p>
                <button className="btn-primary">
                  <FontAwesomeIcon icon={faUsers} />
                  Manage Users
                </button>
              </div>
            )}
            
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