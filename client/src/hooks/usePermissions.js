import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { rbacService } from '../services/rbacService';

export const usePermissions = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserPermissions = async () => {
      if (!user?.role) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await rbacService.getRoleByName(user.role);
        
        if (response.success) {
          setPermissions(response.data.permissions || {});
        } else {
          setError('Failed to load permissions');
        }
      } catch (error) {
        console.error('Error loading permissions:', error);
        setError('Failed to load permissions');
        setPermissions({});
      } finally {
        setLoading(false);
      }
    };

    loadUserPermissions();
  }, [user?.role]);

  const hasPermission = (feature, subFeature = null) => {
    // If permissions are loading or there's an error, allow access to prevent blocking
    if (loading || error) return true;
    
    // If no permissions loaded, deny access
    if (!permissions || Object.keys(permissions).length === 0) return false;
    
    if (!permissions[feature]) return false;
    
    const featurePermission = permissions[feature];
    
    // Check main feature permission
    if (!featurePermission.enabled) return false;
    
    // If no sub-feature specified, return main feature permission
    if (!subFeature) return true;
    
    // Check sub-feature permission
    return featurePermission.subFeatures?.[subFeature] === true;
  };

  const canAccessRoute = (routeConfig) => {
    if (!routeConfig.requiredFeature) return true;
    
    return hasPermission(routeConfig.requiredFeature, routeConfig.requiredSubFeature);
  };

  return {
    permissions,
    loading,
    error,
    hasPermission,
    canAccessRoute
  };
};

export default usePermissions;