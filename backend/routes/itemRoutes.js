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

router.use(authMiddleware);

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
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

router.post('/', addItem);

router.get('/', getItems);

router.get('/expiring', getExpiringItems);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router; 