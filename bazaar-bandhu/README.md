# 🏪 BazaarBandhu - Street Food Vendor Network

BazaarBandhu is a React-based web application designed to help street food vendors connect with verified suppliers, join group orders for better prices, and manage their purchasing history. This is a demo application that uses local storage for data persistence.

## ✨ Features

### 🔐 Authentication System
- **Login/Register**: Secure user authentication with local storage
- **Demo Credentials**: Pre-loaded demo account for testing
- **User Types**: Support for vendors and suppliers

### 📋 Supplier Management
- **Verified Suppliers**: Browse a curated list of trusted suppliers
- **Detailed Information**: View supplier ratings, prices, contact details, and specialties
- **Search & Filter**: Find suppliers by name, category, or products
- **Categories**: Vegetables, Spices & Masala, Cooking Oil, Flour & Grains, Dairy, Packaging

### 🛒 Group Orders
- **Join Group Orders**: Participate in bulk orders for better prices
- **Progress Tracking**: Real-time progress bars showing order completion
- **Order Details**: View items, benefits, deadlines, and organizer information
- **Minimum Order Requirements**: Enforced minimum order amounts
- **Order Status**: Active, closing soon, and completed order statuses

### 📊 Order History
- **Complete History**: Track all past orders and transactions
- **Status Tracking**: Delivered, processing, joined, and cancelled orders
- **Filtering & Sorting**: Filter by status and sort by date, amount, or supplier
- **Order Details**: View items, ratings, feedback, and delivery information
- **Statistics**: Total orders, spending, and order status breakdown

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Styling**: Clean, professional interface with gradients and animations
- **Interactive Elements**: Hover effects, smooth transitions, and intuitive navigation
- **Emoji Integration**: Friendly icons throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd bazaar-bandhu
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 🎯 Demo Usage

### Quick Start with Demo Account
1. Open the application
2. Use the demo credentials:
   - **Email**: `demo@vendor.com`
   - **Password**: `demo123`
3. Explore all features as a street food vendor

### Creating a New Account
1. Click "Register here" on the login page
2. Fill in your details
3. Choose account type (Vendor or Supplier)
4. Start using the application

## 📱 Application Flow

### 1. Authentication
- Login with existing credentials or register a new account
- Demo users are automatically created for testing

### 2. Supplier Discovery
- Browse verified suppliers in the "Suppliers" tab
- Use search and category filters to find specific suppliers
- View detailed supplier information including ratings and specialties

### 3. Group Orders
- Navigate to "Group Orders" to see available bulk orders
- Join orders by entering your desired amount (must meet minimum requirements)
- Track your joined orders and their progress

### 4. Order History
- View all your past orders in "Order History"
- Filter orders by status and sort by various criteria
- See detailed information about each order including ratings and feedback

## 🗂️ Data Storage

The application uses **localStorage** for data persistence:
- **Users**: `bazaarBandhu_users`
- **Current User**: `bazaarBandhu_currentUser`
- **Group Orders**: `bazaarBandhu_groupOrders`
- **User Orders**: `bazaarBandhu_joinedOrders_{userId}`

## 🛠️ Technical Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React useState and useEffect
- **Data Storage**: Browser localStorage
- **Build Tool**: Create React App

## 📁 Project Structure

```
bazaar-bandhu/
├── public/
├── src/
│   ├── components/
│   │   ├── LoginRegister.js & .css
│   │   ├── Navigation.js & .css
│   │   ├── SupplierList.js & .css
│   │   ├── GroupOrder.js & .css
│   │   └── OrderHistory.js & .css
│   ├── App.js & .css
│   └── index.js & .css
├── package.json
└── README.md
```

## 🎨 Key Components

### LoginRegister
- Handles user authentication
- Switches between login and registration modes
- Initializes demo users

### Navigation
- Provides navigation between different sections
- Shows current user information
- Responsive design for mobile devices

### SupplierList
- Displays verified suppliers with detailed information
- Search and filter functionality
- Responsive grid layout

### GroupOrder
- Shows available group orders
- Handles joining orders with validation
- Progress tracking and statistics

### OrderHistory
- Complete order history with filtering
- Order status tracking
- Detailed order information display

## 🎪 Demo Data

The application includes realistic demo data:
- **6 Verified Suppliers** across different categories
- **4 Active Group Orders** with various progress levels
- **Sample Order History** with different statuses
- **Demo User Accounts** for immediate testing

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience with grid layouts
- **Tablet**: Optimized layouts with adjusted spacing
- **Mobile**: Single-column layouts with touch-friendly interfaces

## 🔧 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## 🌟 Features in Detail

### Supplier Verification System
All suppliers are marked as "verified" with detailed information including:
- Contact details and location
- Price ranges for products
- Customer ratings with star display
- Product specialties and categories

### Group Order Benefits
- **Bulk Discounts**: 12-25% savings on group orders
- **Free Delivery**: Available on larger orders
- **Quality Guarantee**: Assured product quality
- **Minimum Order Protection**: Orders only proceed if targets are met

### Order Status System
- **Processing**: Order placed but not yet delivered
- **Delivered**: Order completed successfully
- **Joined**: Participating in active group order
- **Cancelled**: Order cancelled due to various reasons

## 🚀 Future Enhancements

Potential improvements for a production version:
- Real-time notifications
- Payment integration
- Supplier rating system
- Chat functionality
- GPS-based supplier discovery
- Inventory tracking
- Multi-language support

## 📄 License

This is a demo application created for educational purposes.

## 🤝 Contributing

This is a demo project, but feedback and suggestions are welcome!

---

**BazaarBandhu** - Connecting street food vendors with the best suppliers! 🏪✨
