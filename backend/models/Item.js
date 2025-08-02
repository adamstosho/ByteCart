const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['grocery', 'medicine'],
    required: [true, 'Item type is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

itemSchema.index({ userId: 1, expiryDate: 1 });

module.exports = mongoose.model('Item', itemSchema); 