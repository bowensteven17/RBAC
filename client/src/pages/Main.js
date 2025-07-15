import React from 'react';
import '../styles/Main.css';

function Main() {
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
          {/* Header Content (e.g., Page Title) */}
          <h1>Dashboard</h1>
        </header>

        <div className="content-area">
          {/* Your Dashboard Content Goes Here */}
          <p>Welcome to your dashboard!  Add your components and content here.</p>
        </div>
      </main>

    </div>
  );
}

export default Main;