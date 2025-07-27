import React, { useState, useEffect } from 'react';
import './SupplierList.css';

const SupplierList = ({ currentUser }) => {
  const [suppliers] = useState([
    {
      id: 1,
      name: "Fresh Vegetables Co.",
      category: "Vegetables",
      rating: 4.8,
      price: "₹50-200/kg",
      location: "Wholesale Market, Delhi",
      verified: true,
      description: "Premium quality fresh vegetables sourced directly from farms",
      contact: "+91 98765 43210",
      specialties: ["Onions", "Tomatoes", "Potatoes", "Leafy Greens"]
    },
    {
      id: 2,
      name: "Spice Masters Ltd.",
      category: "Spices & Masala",
      rating: 4.9,
      price: "₹100-500/kg",
      location: "Khari Baoli, Delhi",
      verified: true,
      description: "Authentic Indian spices and masalas for street food vendors",
      contact: "+91 87654 32109",
      specialties: ["Garam Masala", "Chaat Masala", "Red Chili", "Turmeric"]
    },
    {
      id: 3,
      name: "Oil & Ghee Suppliers",
      category: "Cooking Oil",
      rating: 4.6,
      price: "₹80-150/L",
      location: "Industrial Area, Gurgaon",
      verified: true,
      description: "High-quality cooking oils and pure ghee for commercial use",
      contact: "+91 76543 21098",
      specialties: ["Mustard Oil", "Sunflower Oil", "Pure Ghee", "Coconut Oil"]
    },
    {
      id: 4,
      name: "Flour & Grains Hub",
      category: "Flour & Grains",
      rating: 4.7,
      price: "₹30-80/kg",
      location: "Grain Market, Faridabad",
      verified: true,
      description: "Fresh flour and grains milled daily for consistent quality",
      contact: "+91 65432 10987",
      specialties: ["Wheat Flour", "Rice", "Besan", "Semolina"]
    },
    {
      id: 5,
      name: "Dairy Fresh Products",
      category: "Dairy",
      rating: 4.5,
      price: "₹40-120/L",
      location: "Dairy Colony, Noida",
      verified: true,
      description: "Fresh dairy products delivered daily to your location",
      contact: "+91 54321 09876",
      specialties: ["Fresh Milk", "Paneer", "Curd", "Butter"]
    },
    {
      id: 6,
      name: "Packaging Solutions Pro",
      category: "Packaging",
      rating: 4.4,
      price: "₹2-15/piece",
      location: "Industrial Estate, Delhi",
      verified: true,
      description: "Eco-friendly packaging solutions for street food vendors",
      contact: "+91 43210 98765",
      specialties: ["Paper Plates", "Food Containers", "Bags", "Disposable Cups"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);

  const categories = ['All', ...new Set(suppliers.map(supplier => supplier.category))];

  useEffect(() => {
    let filtered = suppliers;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(supplier => supplier.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredSuppliers(filtered);
  }, [searchTerm, selectedCategory, suppliers]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join('');
  };

  return (
    <div className="supplier-list-container">
      <div className="supplier-header">
        <h2>🏪 Verified Suppliers</h2>
        <p>Connect with trusted suppliers for your street food business</p>
      </div>

      <div className="supplier-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search suppliers, products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="suppliers-grid">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="supplier-card">
            <div className="supplier-header-card">
              <h3>{supplier.name}</h3>
              {supplier.verified && <span className="verified-badge">✅ Verified</span>}
            </div>

            <div className="supplier-category">
              <span className="category-tag">{supplier.category}</span>
            </div>

            <div className="supplier-rating">
              <span className="stars">{renderStars(supplier.rating)}</span>
              <span className="rating-number">({supplier.rating})</span>
            </div>

            <div className="supplier-info">
              <p className="description">{supplier.description}</p>
              
              <div className="info-row">
                <span className="label">💰 Price Range:</span>
                <span className="value">{supplier.price}</span>
              </div>

              <div className="info-row">
                <span className="label">📍 Location:</span>
                <span className="value">{supplier.location}</span>
              </div>

              <div className="info-row">
                <span className="label">📞 Contact:</span>
                <span className="value">{supplier.contact}</span>
              </div>

              <div className="specialties">
                <span className="label">🎯 Specialties:</span>
                <div className="specialty-tags">
                  {supplier.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="supplier-actions">
              <button className="contact-btn">📞 Contact</button>
              <button className="order-btn">🛒 Add to Group Order</button>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="no-results">
          <h3>🔍 No suppliers found</h3>
          <p>Try adjusting your search terms or category filter</p>
        </div>
      )}

      <div className="supplier-stats">
        <div className="stat-card">
          <h4>📊 Quick Stats</h4>
          <p><strong>{suppliers.length}</strong> Verified Suppliers</p>
          <p><strong>{categories.length - 1}</strong> Categories Available</p>
          <p><strong>100%</strong> Verified Partners</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;