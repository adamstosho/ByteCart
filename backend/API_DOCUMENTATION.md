# ByteCart+ API Documentation

## Base URL
```
http://localhost:5001
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "User already exists"
}
```

---

### 2. Login User
**POST** `/api/auth/login`

**Description:** Authenticate existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

---

## 📦 Items Endpoints (Protected)

### 3. Add New Item
**POST** `/api/items`

**Description:** Add a new perishable item

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Organic Milk",
  "type": "grocery",
  "quantity": 2,
  "expiryDate": "2024-01-15",
  "notes": "Whole milk from local farm",
  "imageUrl": "https://example.com/milk.jpg"
}
```

**Response (201 Created):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "Organic Milk",
  "type": "grocery",
  "quantity": 2,
  "expiryDate": "2024-01-15T00:00:00.000Z",
  "notes": "Whole milk from local farm",
  "imageUrl": "https://example.com/milk.jpg",
  "createdAt": "2024-01-10T10:30:00.000Z",
  "updatedAt": "2024-01-10T10:30:00.000Z"
}
```

---

### 4. Get All User Items
**GET** `/api/items`

**Description:** Retrieve all items for the authenticated user

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Organic Milk",
    "type": "grocery",
    "quantity": 2,
    "expiryDate": "2024-01-15T00:00:00.000Z",
    "notes": "Whole milk from local farm",
    "imageUrl": "https://example.com/milk.jpg",
    "createdAt": "2024-01-10T10:30:00.000Z",
    "updatedAt": "2024-01-10T10:30:00.000Z"
  },
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d2",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Aspirin",
    "type": "medicine",
    "quantity": 1,
    "expiryDate": "2024-06-15T00:00:00.000Z",
    "notes": "500mg tablets",
    "imageUrl": "",
    "createdAt": "2024-01-10T11:00:00.000Z",
    "updatedAt": "2024-01-10T11:00:00.000Z"
  }
]
```

---

### 5. Get Expiring Items
**GET** `/api/items/expiring`

**Description:** Get items expiring within 3-7 days

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Organic Milk",
    "type": "grocery",
    "quantity": 2,
    "expiryDate": "2024-01-15T00:00:00.000Z",
    "notes": "Whole milk from local farm",
    "imageUrl": "https://example.com/milk.jpg",
    "createdAt": "2024-01-10T10:30:00.000Z",
    "updatedAt": "2024-01-10T10:30:00.000Z"
  }
]
```

---

### 6. Update Item
**PUT** `/api/items/:id`

**Description:** Update an existing item

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Organic Milk Updated",
  "type": "grocery",
  "quantity": 3,
  "expiryDate": "2024-01-20",
  "notes": "Updated notes",
  "imageUrl": "https://example.com/new-milk.jpg"
}
```

**Response (200 OK):**
```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "Organic Milk Updated",
  "type": "grocery",
  "quantity": 3,
  "expiryDate": "2024-01-20T00:00:00.000Z",
  "notes": "Updated notes",
  "imageUrl": "https://example.com/new-milk.jpg",
  "createdAt": "2024-01-10T10:30:00.000Z",
  "updatedAt": "2024-01-10T12:00:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Item not found"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Not authorized"
}
```

---

### 7. Delete Item
**DELETE** `/api/items/:id`

**Description:** Delete an item

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Item removed"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Item not found"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "message": "Not authorized"
}
```

---

## 🏥 Health Check

### 8. Health Check
**GET** `/health`

**Description:** Check if the server is running

**Response (200 OK):**
```json
{
  "message": "ByteCart+ Backend is running!",
  "timestamp": "2024-01-10T10:30:00.000Z",
  "environment": "development"
}
```

---

## 📋 Data Models

### User Model
```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required, min 6 chars, hashed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Item Model
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User, required)",
  "name": "String (required)",
  "type": "String (enum: 'grocery' | 'medicine', required)",
  "quantity": "Number (required, min 1)",
  "expiryDate": "Date (required)",
  "notes": "String (optional)",
  "imageUrl": "String (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🔧 Error Responses

### Common Error Formats

**400 Bad Request:**
```json
{
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "message": "No token, authorization denied"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Server Error"
}
```

---

## 📝 Usage Examples

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Add Item (with token):**
```bash
curl -X POST http://localhost:5001/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Milk",
    "type": "grocery",
    "quantity": 1,
    "expiryDate": "2024-01-15",
    "notes": "Organic whole milk"
  }'
```

### Using JavaScript/Fetch

**Register User:**
```javascript
const response = await fetch('http://localhost:5001/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data);
```

**Get Items (with token):**
```javascript
const response = await fetch('http://localhost:5001/api/items', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  }
});

const items = await response.json();
console.log(items);
```

---

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for passwords
- **Email Reminders**: Automatic notifications for expiring items
- **Image Upload**: Cloudinary integration for item images
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Detailed error messages
- **CORS Support**: Cross-origin resource sharing enabled
- **Rate Limiting**: Optional rate limiting for API protection

---

## ✅ Test Results

All endpoints have been tested and verified to work correctly:

| Endpoint | Status | Test Result |
|----------|--------|-------------|
| **Health Check** | ✅ Working | Server running on port 5001 |
| **User Registration** | ✅ Working | User created successfully |
| **User Login** | ✅ Working | Authentication successful |
| **Add Item** | ✅ Working | Item created with proper validation |
| **Get All Items** | ✅ Working | Retrieved user items correctly |
| **Get Expiring Items** | ✅ Working | Filtered expiring items (3-7 days) |
| **Update Item** | ✅ Working | Item updated with authorization check |
| **Delete Item** | ✅ Working | Item deleted with proper cleanup |

### Test Environment
- **Server Port**: 5001
- **Database**: MongoDB Atlas (Connected)
- **Email Service**: Gmail SMTP (Configured)
- **Image Storage**: Cloudinary (Ready)
- **Authentication**: JWT (Working)

### Test Script
A comprehensive test script (`test-endpoints.js`) is included to verify all endpoints:
```bash
node test-endpoints.js
``` 