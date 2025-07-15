import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom'; //  Import Link from React Router

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //  Add your login logic here (e.g., API call)
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>

      <div className="signup-link">
        Don't have an account? <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;