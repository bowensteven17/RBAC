import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Forbidden = ({ requiredFeature, requiredSubFeature }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <FontAwesomeIcon 
          icon={faExclamationTriangle} 
          style={{
            fontSize: '60px',
            color: '#dc3545',
            marginBottom: '20px'
          }}
        />
        
        <h1 style={{
          fontSize: '48px',
          color: '#dc3545',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          403
        </h1>
        
        <h2 style={{
          fontSize: '24px',
          color: '#333',
          marginBottom: '20px'
        }}>
          Access Forbidden
        </h2>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '10px',
          lineHeight: '1.5'
        }}>
          Sorry, you don't have permission to access this page.
        </p>
        
        {requiredFeature && (
          <p style={{
            fontSize: '14px',
            color: '#888',
            marginBottom: '20px'
          }}>
            Required access: <strong>{requiredFeature}</strong>
            {requiredSubFeature && <span> → <strong>{requiredSubFeature}</strong></span>}
          </p>
        )}
        
        <p style={{
          fontSize: '14px',
          color: '#888',
          marginBottom: '30px'
        }}>
          Your current role: <strong>{user?.role}</strong>
        </p>
        
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Forbidden;