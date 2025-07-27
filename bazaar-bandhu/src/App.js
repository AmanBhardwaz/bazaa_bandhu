import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import LoginRegister from './components/LoginRegister';
import SupplierList from './components/SupplierList';
import GroupOrder from './components/GroupOrder';
import OrderHistory from './components/OrderHistory';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('bazaarBandhu_currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentPage('suppliers');
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('bazaarBandhu_currentUser', JSON.stringify(user));
    setCurrentPage('suppliers');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bazaarBandhu_currentUser');
    setCurrentPage('login');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginRegister onLogin={handleLogin} />;
      case 'suppliers':
        return <SupplierList currentUser={currentUser} />;
      case 'groupOrder':
        return <GroupOrder currentUser={currentUser} />;
      case 'orderHistory':
        return <OrderHistory currentUser={currentUser} />;
      default:
        return <SupplierList currentUser={currentUser} />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏪 BazaarBandhu</h1>
        <p>Street Food Vendor Network</p>
      </header>
      
      {currentUser && (
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      
      <main className="app-main">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
