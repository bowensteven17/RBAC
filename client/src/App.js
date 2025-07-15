import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Main from './pages/Main';
import RBACSettings from './components/RBACSettings';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user.role) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <div className="unauthorized">
      <h1>403 - Unauthorized</h1>
      <p>You don't have permission to access this page.</p>
    </div>;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings/rbac" 
              element={
                <ProtectedRoute allowedRoles={['Sub-Admin', 'Legal']}>
                  <RBACSettings />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;