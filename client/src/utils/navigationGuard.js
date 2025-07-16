import { rbacService } from '../services/rbacService';

// Route permission mappings
export const ROUTE_PERMISSIONS = {
  '/': { feature: 'home' },
  '/dashboard': { feature: 'home', subFeature: 'dashboard' },
  '/settings': { feature: 'settings' },
  '/settings/profile': { feature: 'settings', subFeature: 'profile' },
  '/settings/rbac': { feature: 'admin', subFeature: 'roles' },
  '/admin': { feature: 'admin' },
  '/admin/users': { feature: 'admin', subFeature: 'users' },
  '/users': { feature: 'users', subFeature: 'all-users' },
  '/users/add': { feature: 'users', subFeature: 'add-user' },
  '/analytics': { feature: 'visualize', subFeature: 'analytics' },
  '/reports': { feature: 'visualize', subFeature: 'reports' },
  '/config': { feature: 'config' },
  '/discover': { feature: 'discover' },
  '/chat': { feature: 'conversational', subFeature: 'chat' }
};

// Check if user can access a specific route
export const canAccessRoute = async (userRole, pathname) => {
  const routePermission = ROUTE_PERMISSIONS[pathname];
  
  if (!routePermission) {
    // Allow access to routes without specific permissions
    return true;
  }

  try {
    const response = await rbacService.getRoleByName(userRole);
    
    if (!response.success) {
      return false;
    }

    const permissions = response.data.permissions || {};
    const featurePermission = permissions[routePermission.feature];

    if (!featurePermission || !featurePermission.enabled) {
      return false;
    }

    if (routePermission.subFeature) {
      return featurePermission.subFeatures?.[routePermission.subFeature] === true;
    }

    return true;
  } catch (error) {
    console.error('Error checking route permissions:', error);
    return false;
  }
};

// Protected navigation function
export const navigateWithPermissionCheck = async (navigate, userRole, pathname) => {
  const hasAccess = await canAccessRoute(userRole, pathname);
  
  if (hasAccess) {
    navigate(pathname);
  } else {
    // Redirect to a 403 page or show error
    console.warn(`Access denied to ${pathname} for role ${userRole}`);
    // You could navigate to a 403 page here
  }
};

export default {
  ROUTE_PERMISSIONS,
  canAccessRoute,
  navigateWithPermissionCheck
};