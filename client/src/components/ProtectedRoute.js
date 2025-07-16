import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';
import Forbidden from './Forbidden';

const ProtectedRoute = ({ 
  children, 
  requiredFeature = null, 
  requiredSubFeature = null,
  adminOnly = false 
}) => {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const { canAccessRoute, loading: permissionsLoading } = usePermissions();

  // Show loading while checking authentication or permissions
  if (authLoading || permissionsLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Check admin-only routes
  if (adminOnly && user?.role !== 'ADMIN' && user?.role !== 'admin') {
    return <Forbidden requiredFeature="Admin Access" />;
  }

  // Check feature-based permissions
  if (requiredFeature) {
    const routeConfig = {
      requiredFeature,
      requiredSubFeature
    };

    if (!canAccessRoute(routeConfig)) {
      return (
        <Forbidden 
          requiredFeature={requiredFeature} 
          requiredSubFeature={requiredSubFeature} 
        />
      );
    }
  }

  return children;
};

export default ProtectedRoute;