const Item = require('../models/Item');

// @desc    Add new item
// @route   POST /api/items
// @access  Private
const addItem = async (req, res) => {
  try {
    const { name, type, quantity, expiryDate, notes, imageUrl } = req.body;

    const item = await Item.create({
      userId: req.user._id,
      name,
      type,
      quantity,
      expiryDate,
      notes: notes || '',
      imageUrl: imageUrl || ''
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all user items
// @route   GET /api/items
// @access  Private
const getItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id }).sort({ expiryDate: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get expiring items (3-7 days)
// @route   GET /api/items/expiring
// @access  Private
const getExpiringItems = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));
    const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

    const expiringItems = await Item.find({
      userId: req.user._id,
      expiryDate: {
        $gte: threeDaysFromNow,
        $lte: sevenDaysFromNow
      }
    }).sort({ expiryDate: 1 });

    res.json(expiringItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
const updateItem = async (req, res) => {
  try {
    const { name, type, quantity, expiryDate, notes, imageUrl } = req.body;

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item belongs to user
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        quantity,
        expiryDate,
        notes: notes || '',
        imageUrl: imageUrl || ''
      },
      { new: true, runValidators: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item belongs to user
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItem,
  getItems,
  getExpiringItems,
  updateItem,
  deleteItem
}; 