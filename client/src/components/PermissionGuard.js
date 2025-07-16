import React from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { useAuth } from '../context/AuthContext';

const PermissionGuard = ({ 
  children, 
  requiredFeature, 
  requiredSubFeature = null,
  fallback = null,
  adminOnly = false 
}) => {
  const { hasPermission, loading } = usePermissions();
  const { user } = useAuth();

  if (loading) {
    return fallback || <div>Loading...</div>;
  }

  // Check admin-only access
  if (adminOnly && user?.role !== 'ADMIN') {
    return fallback;
  }

  // Check feature-based permissions
  if (requiredFeature && !hasPermission(requiredFeature, requiredSubFeature)) {
    return fallback;
  }

  return children;
};

export default PermissionGuard;