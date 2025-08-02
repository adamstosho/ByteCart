const express = require('express');
const {
  addItem,
  getItems,
  getExpiringItems,
  updateItem,
  deleteItem
} = require('../controllers/itemController');
const { upload, uploadToCloudinary } = require('../utils/cloudinary');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Upload image
router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file);
    
    res.json({
      success: true,
      imageUrl: result.secure_url,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

// Add new item
router.post('/', addItem);

// Get all user items
router.get('/', getItems);

// Get expiring items
router.get('/expiring', getExpiringItems);

// Update item
router.put('/:id', updateItem);

// Delete item
router.delete('/:id', deleteItem);

module.exports = router; 