const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const { checkExpiringItems } = require('./utils/reminderService');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

app.get('/health', (req, res) => {
  res.json({ message: 'ByteCart+ Backend is running!' });
});
app.get('/', (req, res) => {
  res.json({ message: 'ByteCart+ Backend is running!' });
});

app.use(errorHandler);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

setInterval(() => {
  const now = new Date();
  if (now.getHours() === 9 && now.getMinutes() === 0) {
    checkExpiringItems();
  }
}, 60000);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});
