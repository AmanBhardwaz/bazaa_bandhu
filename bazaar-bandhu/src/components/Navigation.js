import React from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, setCurrentPage, currentUser, onLogout }) => {
  const navItems = [
    { id: 'suppliers', label: '📋 Suppliers', icon: '📋' },
    { id: 'groupOrder', label: '🛒 Group Orders', icon: '🛒' },
    { id: 'orderHistory', label: '📊 Order History', icon: '📊' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-user-info">
        <span className="user-greeting">Welcome, {currentUser?.name}!</span>
        <span className="user-type">{currentUser?.type}</span>
      </div>
      
      <div className="nav-items">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      
      <button className="logout-btn" onClick={onLogout}>
        🚪 Logout
      </button>
    </nav>
  );
};

export default Navigation;