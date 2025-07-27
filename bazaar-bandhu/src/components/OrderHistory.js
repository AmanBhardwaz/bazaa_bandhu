import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = ({ currentUser }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // Load user's order history from localStorage
    const joinedOrders = JSON.parse(localStorage.getItem(`bazaarBandhu_joinedOrders_${currentUser.id}`) || '[]');
    
    // Create sample order history with different statuses
    const sampleOrderHistory = [
      {
        id: 1,
        orderId: 1,
        orderTitle: "Bulk Vegetable Order - Week 1",
        supplier: "Fresh Vegetables Co.",
        amount: 3500,
        joinedAt: "2024-01-01T10:00:00.000Z",
        status: 'delivered',
        deliveryDate: "2024-01-08T14:30:00.000Z",
        items: [
          { name: "Onions", quantity: "15kg", price: "₹30/kg" },
          { name: "Tomatoes", quantity: "10kg", price: "₹40/kg" },
          { name: "Potatoes", quantity: "20kg", price: "₹25/kg" }
        ],
        rating: 5,
        feedback: "Excellent quality vegetables, very fresh!"
      },
      {
        id: 2,
        orderId: 2,
        orderTitle: "Spices & Masala Combo",
        supplier: "Spice Masters Ltd.",
        amount: 2800,
        joinedAt: "2023-12-15T09:15:00.000Z",
        status: 'delivered',
        deliveryDate: "2023-12-22T11:00:00.000Z",
        items: [
          { name: "Garam Masala", quantity: "2kg", price: "₹200/kg" },
          { name: "Chaat Masala", quantity: "1.5kg", price: "₹180/kg" },
          { name: "Red Chili Powder", quantity: "3kg", price: "₹150/kg" }
        ],
        rating: 4,
        feedback: "Good quality spices, authentic taste"
      },
      {
        id: 3,
        orderId: 3,
        orderTitle: "Cooking Oil Bulk Purchase",
        supplier: "Oil & Ghee Suppliers",
        amount: 4200,
        joinedAt: "2023-12-01T16:20:00.000Z",
        status: 'delivered',
        deliveryDate: "2023-12-10T13:45:00.000Z",
        items: [
          { name: "Mustard Oil", quantity: "15L", price: "₹120/L" },
          { name: "Sunflower Oil", quantity: "20L", price: "₹110/L" }
        ],
        rating: 5,
        feedback: "Premium quality oil, great for commercial use"
      },
      {
        id: 4,
        orderId: 4,
        orderTitle: "Packaging Materials Bundle",
        supplier: "Packaging Solutions Pro",
        amount: 1800,
        joinedAt: "2023-11-20T14:10:00.000Z",
        status: 'cancelled',
        items: [
          { name: "Paper Plates", quantity: "500 pcs", price: "₹3/pc" },
          { name: "Food Containers", quantity: "200 pcs", price: "₹8/pc" }
        ],
        cancelReason: "Order didn't reach minimum target"
      }
    ];

    // Combine sample history with actual joined orders
    const combinedHistory = [
      ...sampleOrderHistory,
      ...joinedOrders.map((order, index) => ({
        ...order,
        id: sampleOrderHistory.length + index + 1,
        status: order.status || 'processing',
        items: [{ name: "Group Order Item", quantity: "N/A", price: `₹${order.amount}` }]
      }))
    ];

    setOrderHistory(combinedHistory);
    setFilteredOrders(combinedHistory);
  }, [currentUser.id]);

  useEffect(() => {
    let filtered = orderHistory;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.joinedAt) - new Date(a.joinedAt);
        case 'amount':
          return b.amount - a.amount;
        case 'supplier':
          return a.supplier.localeCompare(b.supplier);
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orderHistory, filterStatus, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#4CAF50';
      case 'processing': return '#2196F3';
      case 'joined': return '#FF9800';
      case 'cancelled': return '#f44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'processing': return '⏳';
      case 'joined': return '🔄';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? '⭐' : '☆');
    }
    return stars.join('');
  };

  const calculateTotalSpent = () => {
    return orderHistory.reduce((total, order) => {
      return order.status !== 'cancelled' ? total + order.amount : total;
    }, 0);
  };

  const getOrderStats = () => {
    const stats = {
      total: orderHistory.length,
      delivered: orderHistory.filter(o => o.status === 'delivered').length,
      processing: orderHistory.filter(o => o.status === 'processing' || o.status === 'joined').length,
      cancelled: orderHistory.filter(o => o.status === 'cancelled').length
    };
    return stats;
  };

  const stats = getOrderStats();

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h2>📊 Order History</h2>
        <p>Track all your past orders and transactions</p>
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Orders</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.delivered}</span>
          <span className="stat-label">Delivered</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.processing}</span>
          <span className="stat-label">Processing</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">₹{calculateTotalSpent().toLocaleString()}</span>
          <span className="stat-label">Total Spent</span>
        </div>
      </div>

      <div className="history-filters">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="delivered">Delivered</option>
            <option value="processing">Processing</option>
            <option value="joined">Joined</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="date">Date (Newest First)</option>
            <option value="amount">Amount (High to Low)</option>
            <option value="supplier">Supplier Name</option>
          </select>
        </div>
      </div>

      <div className="order-history-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-history-item">
            <div className="order-header">
              <div className="order-title-section">
                <h3>{order.orderTitle}</h3>
                <span className="order-id">Order #{order.id}</span>
              </div>
              <div className="order-status-section">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusIcon(order.status)} {order.status.toUpperCase()}
                </span>
                <span className="order-amount">₹{order.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="order-details">
              <div className="detail-row">
                <span className="label">📦 Supplier:</span>
                <span className="value">{order.supplier}</span>
              </div>
              <div className="detail-row">
                <span className="label">📅 Order Date:</span>
                <span className="value">{new Date(order.joinedAt).toLocaleDateString()}</span>
              </div>
              {order.deliveryDate && (
                <div className="detail-row">
                  <span className="label">🚚 Delivered:</span>
                  <span className="value">{new Date(order.deliveryDate).toLocaleDateString()}</span>
                </div>
              )}
              {order.cancelReason && (
                <div className="detail-row">
                  <span className="label">❌ Cancel Reason:</span>
                  <span className="value">{order.cancelReason}</span>
                </div>
              )}
            </div>

            <div className="order-items">
              <h4>📋 Items:</h4>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-details">{item.quantity} @ {item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {order.rating && (
              <div className="order-rating">
                <div className="rating-section">
                  <span className="label">⭐ Rating:</span>
                  <span className="stars">{renderStars(order.rating)}</span>
                  <span className="rating-number">({order.rating}/5)</span>
                </div>
                {order.feedback && (
                  <div className="feedback-section">
                    <span className="label">💬 Feedback:</span>
                    <p className="feedback-text">"{order.feedback}"</p>
                  </div>
                )}
              </div>
            )}

            <div className="order-actions">
              {order.status === 'delivered' && !order.rating && (
                <button className="rate-btn">⭐ Rate Order</button>
              )}
              {order.status === 'processing' && (
                <button className="track-btn">📍 Track Order</button>
              )}
              <button className="reorder-btn">🔄 Reorder</button>
              <button className="download-btn">📄 Download Invoice</button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-orders">
          <h3>📭 No orders found</h3>
          <p>
            {filterStatus === 'all' 
              ? "You haven't placed any orders yet. Start by joining a group order!"
              : `No orders with status "${filterStatus}" found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;