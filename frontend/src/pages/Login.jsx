import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import BASE_URL from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Handle changes in the form fields
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request to login API
    const res = await fetch(`${BASE_URL}/api/client/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

    const data = await res.json();

    if (res.ok) {
      alert('Login successful');

      // Store client details in localStorage
      localStorage.setItem('client', JSON.stringify(data.client)); // Store the full client object, which includes `id`, `name`, `email`, etc.

      // Navigate based on user role
      if (formData.email.endsWith('@admin.com')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert(data.message); // Show the error message from API
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate('/register')} className="auth-switch">
          Don’t have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;
