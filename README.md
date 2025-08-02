# ByteCart+ - Smart Perishable Items Tracker

## Introduction

ByteCart+ is a modern web application designed to help users manage and track their perishable items like groceries and medicines. It provides an intelligent inventory management system that prevents food waste and ensures you never miss important expiration dates.

## The Problem

Every year, millions of people waste food and money because they forget about items in their refrigerator or pantry that have expired. This problem affects:
- **Home cooks** who buy fresh ingredients but forget to use them
- **Busy families** who struggle to keep track of multiple items
- **Health-conscious individuals** who need to monitor medicine expiration dates
- **Anyone** who wants to reduce food waste and save money

ByteCart+ solves this problem by providing a simple, intuitive way to track expiration dates and receive timely reminders.

## Main Features

### 🛒 Smart Inventory Management
- Add items with photos, quantities, and expiration dates
- Categorize items as groceries or medicines
- Add personal notes for each item
- View all your items in an organized grid layout

### ⏰ Expiration Tracking
- Automatic calculation of days until expiration
- Color-coded status indicators (Good, Expiring Soon, Expired)
- Sort items by expiration date to prioritize usage

### 🔔 Smart Reminders
- Email notifications for items expiring within 1-2 days
- Dashboard notifications showing expiring items count
- Daily automated checks to ensure you never miss important dates

### 📊 Dashboard Analytics
- Overview of total items, expiring items, and expired items
- Visual statistics to understand your inventory
- Quick insights into your consumption patterns

### 🔍 Search and Filter
- Search items by name
- Filter by item type (grocery/medicine)
- Filter by status (all, good, expiring, expired)
- Sort items by various criteria

### 📱 Responsive Design
- Works perfectly on desktop, tablet, and mobile devices
- Modern, clean interface that's easy to navigate
- Fast loading times and smooth animations

## How to Use ByteCart+

### Getting Started

1. **Create an Account**
   - Visit the landing page and click "Get Started"
   - Fill in your name, email, and password
   - Click "Register" to create your account

2. **Log In**
   - Enter your email and password
   - Click "Login" to access your dashboard

### Managing Your Items

1. **Adding New Items**
   - Click the "Add Item" button on your dashboard
   - Fill in the item details:
     - **Name**: Enter the item name (e.g., "Milk", "Aspirin")
     - **Type**: Select "Grocery" or "Medicine"
     - **Quantity**: Enter how many units you have
     - **Expiry Date**: Select when the item expires
     - **Notes**: Add any additional information (optional)
     - **Image**: Upload a photo of the item (optional)
   - Click "Add Item" to save

2. **Viewing Your Items**
   - All your items appear on the dashboard
   - Items are color-coded by status:
     - **Green**: Good (not expiring soon)
     - **Yellow**: Expiring Soon (within 2 days)
     - **Red**: Expired
   - Use the search bar to find specific items
   - Click "Filters" to sort and filter your items

3. **Editing Items**
   - Click the edit icon on any item card
   - Modify any details you want to change
   - Click "Update Item" to save changes

4. **Deleting Items**
   - Click the delete icon on any item card
   - Confirm the deletion in the popup dialog

### Using Filters and Search

1. **Search by Name**
   - Type in the search bar at the top of the dashboard
   - Results update automatically as you type

2. **Filter Options**
   - Click the "Filters" button to open filter options
   - **Type Filter**: Show only groceries or medicines
   - **Status Filter**: Show items by their expiration status
   - **Sort Options**: Arrange items by name, expiry date, or date added

### Understanding Notifications

1. **Dashboard Notifications**
   - The notification bell shows how many items are expiring soon
   - Click the bell to see details about expiring items

2. **Email Reminders**
   - You'll receive emails for items expiring within 1-2 days
   - Check your email regularly for these important reminders

### Profile and Settings

1. **View Profile**
   - Click your profile picture in the top right
   - Select "Profile" to view your account information

2. **Change Password**
   - Go to "Settings" from the profile menu
   - Enter your current password and new password
   - Click "Update Password" to save changes

## Tools and Technologies Used

### Backend (Node.js/Express)
- **Express.js**: Web framework for building the API
- **MongoDB**: Database for storing user and item data
- **Mongoose**: Object modeling for MongoDB
- **JWT**: Authentication and authorization
- **bcryptjs**: Password hashing and security
- **Cloudinary**: Image upload and storage
- **Multer**: File upload handling
- **Nodemailer**: Email service for reminders
- **CORS**: Cross-origin resource sharing

### Frontend (React/Next.js)
- **Next.js 14**: React framework with App Router
- **React 18**: User interface library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **Radix UI**: Accessible UI components
- **Lucide React**: Icon library
- **Recharts**: Chart and data visualization
- **Sonner**: Toast notifications

### Development Tools
- **Vite**: Fast build tool for development
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Installation and Setup

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- Email service (for reminders)

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with your configuration
4. Start the development server: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:3000`

## Contributing

We welcome contributions to ByteCart+! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help using ByteCart+, please contact us through the application or create an issue on our repository.

---

**ByteCart+** - Making food waste a thing of the past, one item at a time. 