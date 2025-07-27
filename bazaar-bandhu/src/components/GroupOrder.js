import React, { useState, useEffect } from 'react';
import './GroupOrder.css';

const GroupOrder = ({ currentUser }) => {
  const [groupOrders, setGroupOrders] = useState([]);
  const [joinedOrders, setJoinedOrders] = useState([]);

  // Sample group orders data
  const sampleGroupOrders = [
    {
      id: 1,
      title: "Bulk Vegetable Order - Week 1",
      supplier: "Fresh Vegetables Co.",
      category: "Vegetables",
      description: "Weekly bulk order for fresh vegetables. Join to get better prices!",
      targetAmount: 50000,
      currentAmount: 32000,
      minOrder: 2000,
      deadline: "2024-01-15",
      organizer: "Rajesh Kumar",
      participants: 16,
      status: "active",
      items: [
        { name: "Onions", quantity: "100kg", price: "₹30/kg" },
        { name: "Tomatoes", quantity: "80kg", price: "₹40/kg" },
        { name: "Potatoes", quantity: "120kg", price: "₹25/kg" }
      ],
      benefits: ["15% bulk discount", "Free delivery", "Quality guarantee"]
    },
    {
      id: 2,
      title: "Spices & Masala Combo",
      supplier: "Spice Masters Ltd.",
      category: "Spices & Masala",
      description: "Monthly spices order with premium quality masalas for street food",
      targetAmount: 30000,
      currentAmount: 24500,
      minOrder: 1500,
      deadline: "2024-01-20",
      organizer: "Priya Sharma",
      participants: 12,
      status: "active",
      items: [
        { name: "Garam Masala", quantity: "10kg", price: "₹200/kg" },
        { name: "Chaat Masala", quantity: "8kg", price: "₹180/kg" },
        { name: "Red Chili Powder", quantity: "15kg", price: "₹150/kg" }
      ],
      benefits: ["20% bulk discount", "Premium quality", "Extended shelf life"]
    },
    {
      id: 3,
      title: "Cooking Oil Bulk Purchase",
      supplier: "Oil & Ghee Suppliers",
      category: "Cooking Oil",
      description: "High-quality cooking oil for commercial use at wholesale prices",
      targetAmount: 40000,
      currentAmount: 15000,
      minOrder: 2500,
      deadline: "2024-01-18",
      organizer: "Amit Singh",
      participants: 6,
      status: "active",
      items: [
        { name: "Mustard Oil", quantity: "50L", price: "₹120/L" },
        { name: "Sunflower Oil", quantity: "80L", price: "₹110/L" },
        { name: "Pure Ghee", quantity: "20L", price: "₹400/L" }
      ],
      benefits: ["12% bulk discount", "Same day delivery", "Quality tested"]
    },
    {
      id: 4,
      title: "Packaging Materials Bundle",
      supplier: "Packaging Solutions Pro",
      category: "Packaging",
      description: "Eco-friendly packaging materials for sustainable food service",
      targetAmount: 25000,
      currentAmount: 22000,
      minOrder: 1000,
      deadline: "2024-01-12",
      organizer: "Sunita Devi",
      participants: 22,
      status: "closing_soon",
      items: [
        { name: "Paper Plates", quantity: "5000 pcs", price: "₹3/pc" },
        { name: "Food Containers", quantity: "2000 pcs", price: "₹8/pc" },
        { name: "Disposable Cups", quantity: "3000 pcs", price: "₹2/pc" }
      ],
      benefits: ["25% bulk discount", "Eco-friendly", "Custom branding available"]
    }
  ];

  useEffect(() => {
    // Initialize group orders if not already in localStorage
    const existingOrders = localStorage.getItem('bazaarBandhu_groupOrders');
    if (!existingOrders) {
      localStorage.setItem('bazaarBandhu_groupOrders', JSON.stringify(sampleGroupOrders));
      setGroupOrders(sampleGroupOrders);
    } else {
      setGroupOrders(JSON.parse(existingOrders));
    }

    // Load user's joined orders
    const userJoinedOrders = localStorage.getItem(`bazaarBandhu_joinedOrders_${currentUser.id}`);
    if (userJoinedOrders) {
      setJoinedOrders(JSON.parse(userJoinedOrders));
    }
  }, [currentUser.id]);

  const joinOrder = (orderId, orderAmount) => {
    if (orderAmount < groupOrders.find(order => order.id === orderId).minOrder) {
      alert(`Minimum order amount is ₹${groupOrders.find(order => order.id === orderId).minOrder}`);
      return;
    }

    const orderToJoin = groupOrders.find(order => order.id === orderId);
    const joinedOrder = {
      orderId,
      orderTitle: orderToJoin.title,
      supplier: orderToJoin.supplier,
      amount: orderAmount,
      joinedAt: new Date().toISOString(),
      status: 'joined'
    };

    const updatedJoinedOrders = [...joinedOrders, joinedOrder];
    setJoinedOrders(updatedJoinedOrders);
    localStorage.setItem(`bazaarBandhu_joinedOrders_${currentUser.id}`, JSON.stringify(updatedJoinedOrders));

    // Update group order current amount
    const updatedGroupOrders = groupOrders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          currentAmount: order.currentAmount + orderAmount,
          participants: order.participants + 1
        };
      }
      return order;
    });

    setGroupOrders(updatedGroupOrders);
    localStorage.setItem('bazaarBandhu_groupOrders', JSON.stringify(updatedGroupOrders));

    alert('Successfully joined the group order!');
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'closing_soon': return '#FF9800';
      case 'completed': return '#2196F3';
      default: return '#757575';
    }
  };

  const isOrderJoined = (orderId) => {
    return joinedOrders.some(order => order.orderId === orderId);
  };

  return (
    <div className="group-order-container">
      <div className="group-order-header">
        <h2>🛒 Group Orders</h2>
        <p>Join group orders to get better prices and bulk discounts</p>
      </div>

      <div className="order-stats">
        <div className="stat-item">
          <span className="stat-number">{groupOrders.length}</span>
          <span className="stat-label">Active Orders</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{joinedOrders.length}</span>
          <span className="stat-label">Orders Joined</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            ₹{joinedOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
          </span>
          <span className="stat-label">Total Invested</span>
        </div>
      </div>

      <div className="group-orders-grid">
        {groupOrders.map(order => (
          <div key={order.id} className="group-order-card">
            <div className="order-header">
              <h3>{order.title}</h3>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="order-supplier">
              <span className="supplier-name">📦 {order.supplier}</span>
              <span className="category-tag">{order.category}</span>
            </div>

            <p className="order-description">{order.description}</p>

            <div className="order-progress">
              <div className="progress-info">
                <span>Progress: ₹{order.currentAmount.toLocaleString()} / ₹{order.targetAmount.toLocaleString()}</span>
                <span>{Math.round(calculateProgress(order.currentAmount, order.targetAmount))}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${calculateProgress(order.currentAmount, order.targetAmount)}%` }}
                ></div>
              </div>
            </div>

            <div className="order-details">
              <div className="detail-row">
                <span>👥 Participants:</span>
                <span>{order.participants}</span>
              </div>
              <div className="detail-row">
                <span>💰 Min Order:</span>
                <span>₹{order.minOrder.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span>📅 Deadline:</span>
                <span>{new Date(order.deadline).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>👨‍💼 Organizer:</span>
                <span>{order.organizer}</span>
              </div>
            </div>

            <div className="order-items">
              <h4>📋 Items Included:</h4>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-details">{item.quantity} @ {item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-benefits">
              <h4>✨ Benefits:</h4>
              <ul>
                {order.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="order-actions">
              {isOrderJoined(order.id) ? (
                <div className="joined-status">
                  <span className="joined-badge">✅ Already Joined</span>
                </div>
              ) : (
                <div className="join-form">
                  <input
                    type="number"
                    placeholder={`Min ₹${order.minOrder}`}
                    min={order.minOrder}
                    id={`amount-${order.id}`}
                    className="amount-input"
                  />
                  <button
                    className="join-btn"
                    onClick={() => {
                      const amount = parseInt(document.getElementById(`amount-${order.id}`).value);
                      if (amount) {
                        joinOrder(order.id, amount);
                      } else {
                        alert('Please enter a valid amount');
                      }
                    }}
                  >
                    🤝 Join Order
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {joinedOrders.length > 0 && (
        <div className="joined-orders-section">
          <h3>📋 Your Joined Orders</h3>
          <div className="joined-orders-list">
            {joinedOrders.map((order, index) => (
              <div key={index} className="joined-order-item">
                <div className="joined-order-info">
                  <h4>{order.orderTitle}</h4>
                  <p>Supplier: {order.supplier}</p>
                  <p>Amount: ₹{order.amount.toLocaleString()}</p>
                  <p>Joined: {new Date(order.joinedAt).toLocaleDateString()}</p>
                </div>
                <span className="joined-status-badge">{order.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupOrder;