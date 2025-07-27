import React, { useState, useEffect } from 'react';
import './LoginRegister.css';

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'vendor'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize demo users if not already present
    const existingUsers = localStorage.getItem('bazaarBandhu_users');
    if (!existingUsers) {
      const demoUsers = [
        {
          id: 'demo1',
          name: 'Demo Vendor',
          email: 'demo@vendor.com',
          password: 'demo123',
          type: 'vendor',
          joinedAt: new Date().toISOString()
        },
        {
          id: 'demo2',
          name: 'Rajesh Kumar',
          email: 'rajesh@vendor.com',
          password: 'rajesh123',
          type: 'vendor',
          joinedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('bazaarBandhu_users', JSON.stringify(demoUsers));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('bazaarBandhu_users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Register logic
      if (!formData.name) {
        setError('Please enter your name');
        return;
      }

      const users = JSON.parse(localStorage.getItem('bazaarBandhu_users') || '[]');
      
      // Check if user already exists
      if (users.find(u => u.email === formData.email)) {
        setError('User with this email already exists');
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.type,
        joinedAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('bazaarBandhu_users', JSON.stringify(users));
      onLogin(newUser);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? '🔐 Login' : '📝 Register'}</h2>
          <p>Join the street food vendor network</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="type">Account Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="vendor">Street Food Vendor</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? '🔑 Login' : '🚀 Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="switch-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '', type: 'vendor' });
              }}
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>

        <div className="demo-info">
          <h4>🎯 Demo Credentials:</h4>
          <p><strong>Email:</strong> demo@vendor.com</p>
          <p><strong>Password:</strong> demo123</p>
          <small>Or create a new account to get started!</small>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;