import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rbacService } from '../services/rbacService';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Viewer'); // Default role
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Load available roles on component mount
  useEffect(() => {
    const loadRoles = async () => {
      try {
        setRolesLoading(true);
        const response = await rbacService.getAllRoles();
        
        if (response.success) {
          // Filter out admin roles and roles that shouldn't be available for registration
          const adminRoles = ['ADMIN', 'Sub-Admin'];
          const filteredRoles = response.data
            .filter(role => !adminRoles.includes(role.name))
            .map(role => role.name);
          
          setAvailableRoles(filteredRoles);
          
          // Set default role to first available role or 'Viewer'
          if (filteredRoles.length > 0) {
            setRole(filteredRoles.includes('Viewer') ? 'Viewer' : filteredRoles[0]);
          }
        }
      } catch (error) {
        console.error('Error loading roles:', error);
        // If no roles are available, show error message
        setError('Unable to load available roles. The system may not be properly initialized.');
        setAvailableRoles([]);
      } finally {
        setRolesLoading(false);
      }
    };

    loadRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email format (e.g., user@example.com)");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: username, // Backend expects 'name', but your form uses 'username'
          password,
          role
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Use auth context to set user data
        login(data.user, data.token);
        
        // Log success
        console.log('Registration successful:', data.user);
        
        // Redirect to main page
        navigate('/login');
      } else {
        if (data.code === 'RBAC_NOT_INITIALIZED') {
          setError('The system is not properly initialized. Please contact the administrator to set up user roles.');
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading || rolesLoading}
            required
          >
            {rolesLoading ? (
              <option value="">Loading roles...</option>
            ) : (
              <>
                {availableRoles.map(roleName => (
                  <option key={roleName} value={roleName}>
                    {roleName}
                  </option>
                ))}
              </>
            )}
          </select>
          {rolesLoading && <small className="loading-text">Loading available roles...</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || rolesLoading || availableRoles.length === 0}>
          {loading ? 'Creating Account...' : rolesLoading ? 'Loading...' : availableRoles.length === 0 ? 'No Roles Available' : 'Register'}
        </button>
      </form>
      
      <div className="login-link">
        Already have an account? <Link to="/login">Click here to login</Link>
      </div>
    </div>
  );
}

export default Register;