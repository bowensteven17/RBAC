const API_BASE_URL = 'http://localhost:5000/api/rbac';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// RBAC Service functions
export const rbacService = {
  // Get all roles
  getAllRoles: async () => {
    return await apiRequest('/roles');
  },

  // Get role by name
  getRoleByName: async (name) => {
    return await apiRequest(`/roles/${name}`);
  },

  // Create new role
  createRole: async (name, permissions = {}) => {
    return await apiRequest('/roles', {
      method: 'POST',
      body: JSON.stringify({ name, permissions }),
    });
  },

  // Update role permissions
  updateRolePermissions: async (name, permissions) => {
    return await apiRequest(`/roles/${name}`, {
      method: 'PUT',
      body: JSON.stringify({ permissions }),
    });
  },

  // Delete role
  deleteRole: async (name) => {
    return await apiRequest(`/roles/${name}`, {
      method: 'DELETE',
    });
  },

  // Initialize default roles and permissions
  initializeRBAC: async () => {
    return await apiRequest('/initialize', {
      method: 'POST',
    });
  },
};

export default rbacService;