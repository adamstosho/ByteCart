# ByteCart+ Backend

A Node.js backend for tracking perishable groceries and medicines with expiry reminders.

## Features

- User authentication (JWT)
- CRUD operations for items
- Expiry date tracking
- Email reminders
- Optional image uploads (Cloudinary)
- MongoDB Atlas integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000

JWT_SECRET=yourSuperSecretKeyChangeThisInProduction
JWT_EXPIRES_IN=7d

MONGODB_URI=mongodb+srv://yourUser:yourPassword@cluster.mongodb.net/bytecart

CLOUDINARY_CLOUD_NAME=yourCloudName
CLOUDINARY_API_KEY=yourApiKey
CLOUDINARY_API_SECRET=yourApiSecret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourEmail@gmail.com
EMAIL_PASS=yourAppPassword

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=ByteCart <noreply@bytecart.com>

RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Items (Protected Routes)
- `POST /api/items` - Add new item
- `GET /api/items` - Get all user items
- `GET /api/items/expiring` - Get items expiring soon (3-7 days)
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Health Check
- `GET /health` - Server health check

## Request Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Add Item
```json
POST /api/items
Authorization: Bearer <token>
{
  "name": "Milk",
  "type": "grocery",
  "quantity": 1,
  "expiryDate": "2024-01-15",
  "notes": "Organic whole milk"
}
```

## Project Structure

```
/backend
  ├── config/
  │   └── db.js
  ├── controllers/
  │   ├── authController.js
  │   └── itemController.js
  ├── middlewares/
  │   ├── authMiddleware.js
  │   └── errorHandler.js
  ├── models/
  │   ├── User.js
  │   └── Item.js
  ├── routes/
  │   ├── authRoutes.js
  │   └── itemRoutes.js
  ├── utils/
  │   ├── cloudinary.js
  │   ├── emailService.js
  │   ├── generateToken.js
  │   └── reminderService.js
  ├── server.js
  └── package.json
```

## Features

- **JWT Authentication**: Secure user authentication
- **MongoDB Integration**: Scalable database solution
- **Email Reminders**: Automatic notifications for expiring items
- **Image Upload**: Optional Cloudinary integration
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin resource sharing
- **Production Ready**: Environment-based configuration 