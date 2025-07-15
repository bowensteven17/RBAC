import React from 'react';
import '../styles/Main.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Main() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          {/* Your Logo or App Name */}
          <img src="/path/to/your/logo.svg" alt="Logo" className="logo" />
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <a href="#" className="nav-link active">
                <i className="icon home-icon"></i>
                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="icon discover-icon"></i>
                <span>Discover</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="icon spaces-icon"></i>
                <span>Spaces</span>
              </a>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <a href="#" className="nav-link">
            <i className="icon account-icon"></i>
            <span>Account</span>
          </a>
          <a href="#" className="nav-link">
            <i className="icon upgrade-icon"></i>
            <span>Upgrade</span>
          </a>
          <a href="#" className="nav-link">
            <i className="icon install-icon"></i>
            <span>Install</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h1>Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">Welcome, {user?.name}!</span>
              <span className="user-role">({user?.role})</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <i className="icon logout-icon"></i>
              Logout
            </button>
          </div>
        </header>

        <div className="content-area">
          {/* Your Dashboard Content Goes Here */}
          <div className="welcome-section">
            <h2>Welcome to your dashboard!</h2>
            <p>You are logged in as: <strong>{user?.name}</strong></p>
            <p>Your role: <strong>{user?.role}</strong></p>
            <p>Email: <strong>{user?.email}</strong></p>
          </div>
          
          <div className="dashboard-cards">
            <div className="card">
              <h3>Quick Actions</h3>
              <p>Add your components and content here.</p>
            </div>
            
            {user?.role === 'ADMIN' && (
              <div className="card admin-card">
                <h3>Admin Panel</h3>
                <p>Admin-only content visible here.</p>
                <button className="btn-primary">Manage Users</button>
              </div>
            )}
            
            <div className="card">
              <h3>Recent Activity</h3>
              <p>Your recent activities will appear here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;